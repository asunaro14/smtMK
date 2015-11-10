//--------------------------------------------------------------------------------
//   Resonance.jp : Asunaro Co.,Ltd.
//   < JavaScript 1.7 or later >
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
//   Ver 1.2 (2014-06-19)
//   + 外部ドメインへの遷移を自アプリ内で開くかブラウザで開くか選択可能にした（ネイティブ側で指定）
//       Resonance.remotePageViewer = "webview";  // アプリ内で開く
//       Resonance.remotePageViewer = "browser";  // ブラウザで開く（デフォルト）
//   + ネイティブのメッセージボックス表示に対応した
//       ＜Web側からのリクエスト例＞
//       Resonance.alert({
//           title:'実行確認',
//           message:'実行してもよろしいですか？',
//           buttons:'OK,キャンセル',
//           callback:'App.confirm'
//       });
//       ＜コールバック関数の例＞
//       App.confirm = function(obj){
//           alert('Web側に「' + obj.index + '」が返ってきました');
//       };
//--------------------------------------------------------------------------------
//   Ver 1.1 (2014-06-09)
//   - ローカルWebでhistory.back直後のResonance.requestでTi参照エラーが発生する問題
//   + Ti参照エラーなら100ms後にリトライするよう改善（最大10回リトライ）
//--------------------------------------------------------------------------------
//   Ver 1.0 (2014-04-16)
//   + ファーストリリース
//--------------------------------------------------------------------------------

var Resonance = {};

//--------------------------------------------------------------------------------
// ネイティブとWebで兼用する機能
//--------------------------------------------------------------------------------

// 初期処理
(function () {
    // 自URLの取得
    try{
        Resonance.url = window.location.toString();
        Resonance.location = (Resonance.url.indexOf("?") > 0) ?  Resonance.url.split("?")[0] : Resonance.url;
    }catch(e){
        Resonance.url = e.message;
    }
    // コンテンツ種別の判定（ネイティブ／ローカルWeb／リモートWeb）
    try{
        Resonance.isLocal = (Resonance.url.indexOf("file") == 0);
        Resonance.isRemote = (Resonance.url.indexOf("http") == 0);
        Resonance.isNative = (Ti && !Resonance.isLocal) ? true : false;
    }catch(e){
        Resonance.isNative = false;
    }

    // リモートページへの遷移方法
    Resonance.remotePageViewer = "browser";

    // ネイティブによるインクルード（require）への対応
    if(Resonance.isNative){
        module.exports = Resonance;
    }
})();

// デバッグ表示
Resonance.doDebug = function (isDebug) {
    Resonance.isDebug = isDebug || false;
    var msg = [
        "isNative : " + (Resonance.isNative ? "true" : "false"),
        "isLocal : " + (Resonance.isLocal ? "true" : "false"),
        "isRemote : " + (Resonance.isRemote ? "true" : "false")
    ];
    if (Resonance.isDebug) {
        alert(msg.join("\n"));
    }
};

//--------------------------------------------------------------------------------
// ネイティブ専用機能
//--------------------------------------------------------------------------------

// 初期設定
Resonance.init = function(config){
    Resonance.config.remotePageViewer = config.remotePageViewer || "browser";
    // configの属性
    //  - remotePageViewer : "browser" or "webview"(default)
};

// イベントリスナーの設置
Resonance.addEventListener = function (webview) {
    if(Resonance.isLocal || Resonance.isRemote){ return false; }
    if(webview){
        // グローバルで保持
        Resonance.webview = webview;
        // ローカルWeb用のイベントリスナー設置
        Ti.App.addEventListener("ResonanceRequest", function(obj){
            Resonance.exec(obj);
        });
        // リモートWeb用のイベントリスナー設置
        webview.addEventListener("beforeload", function(e){
            var url = e.url || "";
            if(url.indexOf("?resonance=true") > 0){
                // ネイティブ機能の呼び出しを検出
                webview.stopLoading();
                var obj = Resonance.parseRequest(url);
                obj.type = "beforeload";
                Resonance.exec(obj);
            } else if(url.indexOf("http") == 0){
                // 外部ドメインへの遷移要求を検出
                if(Resonance.remotePageViewer != "webview"){
                    webview.stopLoading();
                    Ti.Platform.openURL(url);
                }
            }
        });
    }else{
        alert("Resonance.addEventListenerの引数(WebView)は省略できません");
    }
};

// 受信したリクエスト（URLのクエリーストリング）を解析
Resonance.parseRequest = function(url){
    var obj = {};
    try{
        var ary1 = url.split("?");
        var ary2 = ary1.length > 1 ? ary1[1].split("&") : [];
        var json = "";
        ary2.forEach(function(item){
            var ary3 = item.split("=");
            if(ary3.length == 2){
                if(ary3[0] == "json"){ json = ary3[1]; }
            }
        });
        if(json){
            var jsonText = decodeURIComponent(json);
            obj = JSON.parse(jsonText);
        }
    }catch(e){
        obj = { error: e.message };
    }
    return obj;
};

// ネイティブ機能を実行
Resonance.exec = function(obj){
    var ans = {};
    try{
        var func = eval(obj.method);
        if(typeof func == "function"){
            if(obj.method=='Resonance.alert'){
                Resonance.dialog(obj);
            }else{
                ans = func(obj) || {};
                Resonance.callback(obj, ans);
            }
        }
    }catch(e){
        alert(e.message);
    }
};

// 呼び出し元へのコールバック
Resonance.callback = function(obj, ans){
    if(obj.callback){
        var jsonText = JSON.stringify(ans || {});
        var func = "Resonance.response('" + obj.callback + "','" + jsonText + "')";
        var web = Resonance.webview;    // 初期化処理で保持しておいたWebViewオブジェクト
        web.evalJS(func);               // WebViewに対してコールバック処理をプッシュ
    }
};

// ネイティブによるアラート表示
Resonance.dialog = function(obj){
    var dialog = Ti.UI.createAlertDialog({
        title: obj.title,
        message: obj.message,
        buttonNames: obj.buttons ? obj.buttons.split(',') : ['OK']
    });
    if(obj.callback){
        dialog.addEventListener('click', function(e){
            Resonance.callback(obj, {index: e.index});
        });
    }
    dialog.show();
};

//--------------------------------------------------------------------------------
// Webページ専用機能
//--------------------------------------------------------------------------------

// ネイティブ機能によるアラート表示
Resonance.alert = function(obj){
    obj.method = 'Resonance.alert';
    Resonance.request(obj);
};

// ネイティブに対するリクエスト発行
Resonance.request = function (obj) {
    if(Resonance.isLocal){
        // ローカルの場合は直接Titaniumに通知
        Resonance.tryCount = 0;
        Resonance.tryRequest(obj);
    }
    if(Resonance.isRemote){
        // リモートの場合はクエリーストリングを作成してページ遷移
        var json = JSON.stringify(obj);
        var jsonText = encodeURIComponent(json);
        var url = Resonance.location + "?resonance=true&json=" + jsonText;
        window.location = url;
    }
};

// ローカルコンテンツの「Ti.App.fireEvent」のリトライ（最大10回）
Resonance.tryRequest = function(obj){
	//alert(obj.method);
	//alert(obj.callback);
    try{
        Resonance.tryCount += 1;
        Ti.App.fireEvent("ResonanceRequest", obj);
    } catch(e) {
        if(Resonance.tryCount < 10){
            // リトライ回数が10回未満なら、100ms後にリトライ
            setTimeout(function(){ Resonance.tryRequest(obj); }, 100);
        }else{
            // リトライ回数が上限に達したらエラーメッセージを表示
            alert(e.message);
            return false;
        }
    }    
};

// コールバックレスポンスの受け取り
Resonance.response = function(callback, jsonText){
    try{
        var func = eval(callback);
        var obj = JSON.parse(jsonText);
        func(obj);
    }catch(e){
        alert(e.message);
    }
};
