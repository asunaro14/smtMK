//
// 全ページに共通の処理
//

if (!App) {
    var App = {};
}

// ------------------------------------------------------------
// アプリの初期設定
// ------------------------------------------------------------
$(document).bind("mobileinit", function () {
	//$.mobile.hashListeningEnabled = false;
	$.mobile.ajaxEnabled = false;
    // DOMのキャッシュを有効化（全ページをキャッシュ）・・・リソース圧迫の恐れ
    //    $.mobile.page.prototype.options.domCache = true;

    // クロスドメインのアクセスを許可
    $.support.cors = true;
    $.mobile.allowCrossDomainPages = true;

    // ハッシュベースの長いURLをクリーンなURLに変換するか否か
    //    $.mobile.pushStateEnabled = false;

    // Touchイベントの使用可否判定
    var div = document.createElement('div');
    div.setAttribute('ontouchstart', 'return');
    App.hasTouch = (typeof div.ontouchstart === 'function');
    console.log("done : MobileInit : hasTouch " + (App.hasTouch ? "true" : "false"));
    console.log("[" + App.createDateTime() + "]");

});

// ------------------------------------------------------------
// 【onInit】があれば「pageinit」イベント発火時に実行
// ------------------------------------------------------------
$(document).on("pageinit", function (e) {
    try {
        var work = e.target.baseURI.split("/");
        var pageName = work[work.length - 1].split(".")[0];
        var pageObj = eval(pageName);

        // onInit
        if (pageObj.onInit) {
            pageObj.onInit();
            console.log("done : " + pageName + ".onInit");
        }

        // data
        if (pageObj.data) {
            pageObj.dataDic = {};
            jQuery.each(pageObj.data, function (i, item) {
                pageObj.dataDic["item-" + item.number] = item;
            });
            console.log("--- dataDic ---");
            console.log(pageObj.dataDic);
        }
    } catch (err) {
        alert(err.message);
    }
});

// ------------------------------------------------------------
// 【beforeshow】があれば「pagebeforeshow」イベント発火時に実行
// ------------------------------------------------------------
$(document).on("pagebeforeshow", function (e) {
    try {
        // 自ページ名の取得
        var work = e.target.baseURI.split("/");
        var pageName = work[work.length - 1].split(".")[0];

        // スケジュールデータに自ページ名を反映（他ページから戻ってきたケースに対応するため）
        if (pageName.indexOf("_") > 0) {
            var schedule = App.loadObject("schedule");
            schedule.start = pageName.split("_")[1];
            schedule.category = schedule.code + schedule.start;
            console.log("【スケジュールデータの更新】");
            console.log(schedule);
            App.saveObject("schedule", schedule);
        }

        // アプリに「onBeforeShow」メソッドがあれば実行
        var onBeforeShowName = pageName + ".onBeforeShow";
        var onBeforeShow = eval(onBeforeShowName);
        if (onBeforeShow) {
            onBeforeShow();
            console.log("done : " + onBeforeShowName);
        };

        // エンターキーのイベントリスナー
        $('input').on("keyup", function (e) {
            if (e.keyCode == 13) {
                var id = e.target.id;
                var num = e.target.id.split("item-")[1];
                App.nextFocus(pageName, num);
            } else {
//                console.log(e.keyCode + " : " + String.fromCharCode(e.keyCode));
            }
        });

    } catch (err) {
        alert(err.message);
    }
});

// ------------------------------------------------------------
// 【show】があれば「pageshow」イベント発火時に実行
// ------------------------------------------------------------
$(document).on("pageshow", function (e) {
    try {
        var work = e.target.baseURI.split("/");
        var pageName = work[work.length - 1].split(".")[0];
        var onShowName = pageName + ".onShow";
        var onShow = eval(onShowName);
        if (onShow) {
            onShow();
            console.log("done : " + onShowName);
        };
        console.log("[" + App.createDateTime() + "]");

    } catch (err) {
        alert(err.message);
    }
});

// ------------------------------------------------------------
// ローカルストレージ
// ------------------------------------------------------------
App.saveObject = function (key, obj) {
    var val = "";
    if (typeof obj == "object") {
        val = JSON.stringify(obj);
        localStorage.setItem(key, val);
    } else {
        App.alert("エラー", "オブジェクトでない変数が渡されました");
    }
    return false;
};
App.loadObject = function (key) {
    try {
        var val = localStorage.getItem(key) || "{}";
        var obj = JSON.parse(val);
        return obj;
    } catch (err) {
        alert(err.mesage);
        return {};
    }
};
App.clearObject = function () {
    try {
        localStorage.clear();
    } catch (err) {
        alert(err.mesage);
    }
};

// ------------------------------------------------------------
// エンターキーで項目移動
// ------------------------------------------------------------
App.nextFocus = function (pageName, num) {

    // 現在フォーカス中の項目オブジェクトを取得
    var dataDic = eval(pageName).dataDic;
    var field = dataDic["item-" + num] || {};

    // フォーカスの遷移
    if (field.enterNext) {
        $("#item-" + field.enterNext).focus();
    } else {
        $("#item-" + num).blur();
    }
};

// ------------------------------------------------------------
// 回答データを取得し、設問オブジェクトに保存
// ------------------------------------------------------------ 
App.getAns = function (num, def) {

    if (num == "96" || num == "98") { num = 94; }
    var row = App.getRow(num);
    //row.ans = App.getValue(num, def) || "";
    row.ans = App.getValue(num, def).trim() || "";

    // スコアの保存
    if (row.sum && (!isNaN(row.ans) || row.calc)) {
        row.score = row.calc ? row.calc(row.ans) : Number(row.ans);
    }
    console.log("[回答データの保存] item-" + num + " : " + row.title + " : " + row.ans);
    console.log(row);
};

// ------------------------------------------------------------
// フォーム上からの値取得
// ------------------------------------------------------------
App.getValue = function (num, def) {
    var row = App.getRow(num);
    var type = row.type;
    var val = "";
/*
    // 選択系パーツ
    ◎"SV": App.createVerticalRadio,  // Single Vertical（単一選択・縦並び・塗りつぶし型）
    ◎"SV2": App.createVerticalRadio2,// Single Vertical（単一選択・縦並び・ラジオボタン型）
    ◎"SH": App.createSwitch,         // Single Horizontal（単一選択・横並び・塗りつぶし型）
    ◎"MV": App.createVerticalMulti,  // Multi Vertical（複数選択・縦並び・チェックボックス型）
    ◎"MV2": App.createVerticalMulti2,// Multi Vertical（複数選択・縦並び・チェックボックス型・ダブル型）
    ◎"MH": App.createToggle,         // Multi Horizontal（複数選択・横並び・塗りつぶし型）
    ◎"FV": App.createVerticalFlip,   // Flip Vertical（フリップスイッチ）

    // 入力系パーツ
    ◎"IN": App.createNumber,         // Input Number
    －"IS": App.createSlider,         // Input Slider
    ◎"IT": App.createText,           // Input Text
    ◎"IA": App.createTextArea,       // Input TextArea
    ◎"IP": App.createPassword,       // Input Password
    ◎"ID": App.createDate,           // Input Date
    －"II": App.createImage,          // Input Image

    // 表示系パーツ
    －"DT": App.createDispText,       // Display Text
    －"DN": App.createDispNumber,     // Display Number（計算結果をマーク付きで表示）
    －"DS": App.createDispSelect,     // Display Select（判定結果をマーク付きで表示）

    // スペシャルパーツ
    ◎"SP94": App.createSP94,         // Special Parts 94
*/
    if (type == "SV" || type == "SV2" || type == "SH") {
        var chkd = $("input[name='item-" + num + "']:checked");
        val = chkd[0] ? chkd[0].value : "";

    } else if (type == "FV") {
        var chkd = $("#item-" + num + " option:selected");
        val = chkd[0] ? chkd[0].value : "";

    } else if (type == "MV" || type == "MV2" || type == "MH") {
        // name属性が「item-2」でid属性が「item-21」「item-22」などの要素を検索する
        var chkd = $("input[name='item-" + num + "'][id!='item-" + num + "']");
        var ary = [];
        for (i = 0; i < chkd.length; i++) {
            ary.push(chkd[i].checked ? "Yes":"No");
        }
        // 回答配列にその他テキストを追加
        if (type == "MV" && row.elseText !== undefined) {
            ary.push(row.elseText || "");
        }else if(type == "MV2") {
            ary.push(row.elseText19 || "");
            ary.push(row.elseText28 || "");
        }
        val = ary.join(",");

    } else if (type == "IN" || type == "IT" || type == "IP") {
        val = $("#item-" + num).val();

    } else if (type == "ID") {
        val = $("#item-" + num).val();
        //console.log("#item-" + num);
        console.log("日付：" + val);
        if(val){
            var d = new Date(val);
            val = [
                d.getFullYear(),
                ("0" + (d.getMonth() + 1)).substr(-2, 2),
                ("0" + d.getDate()).substr(-2, 2)
            ].join("-");
        }

    } else if (type == "IA") {
        val = $("#item-" + num).val();
        val = val.replace(/\n/g, "\\n");

    } else if (type == "SP94") {
        var chkd94 = $("input[name='item-94']:checked");
        var chkd96 = $("input[name='item-96']:checked");
        var chkd98 = $("input[name='item-98']:checked");
        var val94 = chkd94.length > 0 ? String(chkd94[0].value) : "";
        var val96 = chkd96.length > 0 ? String(chkd96[0].value) : "";
        var val98 = chkd98.length > 0 ? String(chkd98[0].value) : "";
        val = (val94 != "" && val96 != "" && val98 != "") ? [val94, val96, val98].join(",") : "";

    } else {
        // 何もしない
        console.log(row);
    }
    return val;
};

// ------------------------------------------------------------
// 行データの取得
// ------------------------------------------------------------ 
App.getRow = function (num) {
    var work = location.href.split("/");
    var pageName = work[work.length - 1].split(".")[0];
    var data = eval(pageName).data;
    var row = {};
    jQuery.each(data, function (i, item) {
        if (item.number == num) {
            row = item;
            return false;
        }
    });
    return row;
};

// ------------------------------------------------------------
// 候補辞書の作成
// ------------------------------------------------------------
App.createDictionary = function (row) {
    var dic = {};
    jQuery.each(row.options.split(","), function (i, item) {
        var work = item.split(":");
        dic[work[0]] = work[1];
    });
    return dic;
};

// ------------------------------------------------------------
// ページ遷移
// ------------------------------------------------------------
App.changePage = function (url, msg) {
    if (msg) {
        // メッセージをトースト表示
        App.toast(msg);
    } else {
        $('[data-role="page"]').addClass('ui-disabled');//ページを無効にする
        $.mobile.loading("show");        
    }

    // 評価ページへの遷移ならヒストリをカウント
    //popupのCloseをすると、その後popupが表示されなくなるため、popupのページ分も合わせて2を基準にしている(退院時・BBSで不具合が起きるため)
    if (url.indexOf("entry_") == 0) {
        if (App.pageHistory) {
            //App.pageHistory += 1;
            App.pageHistory += 2;
        } else {
            //App.pageHistory = 1;
            App.pageHistory = 2;
        }
    }
    setTimeout(function () {
        $.mobile.changePage(url, { transition: "slide" });
        setTimeout(function () {
            $('[data-role="page"]').removeClass('ui-disabled');//ページを有効にする
        }, 200);
    }, 200);
};

// ------------------------------------------------------------
// 問診画面の戻るボタン(患者が入力するページ以外)
// ------------------------------------------------------------
App.backPage = function () {
    if (App.pageHistory == 2) {//最初のページの場合、一つ前のページに戻る
        history.back();
    } else {//2ページ目以降の場合
        App.pageHistory -= 2;
        history.go(-2);
    }
    
};

// ------------------------------------------------------------
// アラート表示
// ------------------------------------------------------------
App.alert = function (title, message, conf) {
    var work = location.href.split("/");
    var pageName = work[work.length - 1].split(".")[0];    
    var alertPage = $("#" + pageName + "_alert");
    if (alertPage.size() < 1) {
        alert(title + "\n" + message);
    } else {
        $("#" + pageName + "_alertTitle").text(title);
        $("#" + pageName + "_alertMessage").html(message);
        $("#" + pageName + "_confirm3").hide();
        $("#" + pageName + "_confirm2").hide();
        $("#" + pageName + "_confirm1").hide();
        $("#" + pageName + "_confirm0").hide();
        $("#" + pageName + "_confirm").hide();
        if (conf) {
            if (conf.confirm3) {
                $("#" + pageName + "_confirm3").show();
            }
            if (conf.confirm2) {
                $("#" + pageName + "_confirm2").show();
            }
            if (conf.confirm1) {
                $("#" + pageName + "_confirm1").show();
            }
            if (conf.confirm0) {
                $("#" + pageName + "_confirm0").show();
            }
            if (conf.onclose) {
                $("#" + pageName + "_confirm").show();          // OKボタンを表示
                alertPage.popup({ afterclose: conf.onclose });  // aftercloseイベントハンドラを設置
            }
        } else {
            $("#" + pageName + "_confirm").show();              // OKボタンを表示
        }
        alertPage.popup("open", {
            transition: "pop",
        });
    }
};

// ------------------------------------------------------------
// フォーム画面の共通処理
// ------------------------------------------------------------
App.setForm = function (id, isLogin) {
    try {
        var category = App.loadObject("schedule").category;

        var obj = eval(id);
        var name = "#" + id;
        var formData = {};

        if (!isLogin) {
            if (!category) {
                App.alert("エラー", "カテゴリが特定できません");
                return false;
            }

            // ローカルストレージからデータ取得
            var schedule = App.getSchedule();                               // スケジュール
            var patients = App.loadObject("patients");                      // 全患者データ
            var patientIndex = App.loadObject("patientIndex").index || 0;   // 選択された患者のインデックス
            var patient = patients.rows[patientIndex];                      // 対象患者の鑑データ
            var ansData = App.loadObject("answers_" + patient.sec);         // 対象患者の全回答データ
            formData = ansData[category] || {};                             // フォームの回答データ
            console.log("-- patient --");
            console.log(patient);
            console.log("-- ansData --");
            console.log(ansData);
            console.log("-- formData --");
            console.log(formData);

            // タイトル
            var titleText = "【" + schedule.name + "】 " + obj.title;
            $(name + "_Title").text(titleText);

            // ヘッダ部
            var noData = "<span style='font-size:13px; font-weight:bold; color:#F00;'>未登録</span>";
            $(name + "_Number").html(patient.number || noData);
            $(name + "_ID").html(patient.id || noData);
            $(name + "_Initial").html(patient.initial || noData);
            $(name + "_Sex").text(patient.sex || "");
            $(name + "_Side").text(patient.side || "");
        }

        // フォーム部
        jQuery.each(obj.data, function (i, row) {
            row.ans = formData[row.number] || "";

            // 見出し
            $(name + "_cap" + row.number).html(row.title);
            if (row.require) {
                // 必須マーク（最も近い先祖要素のtdに適用）
                $(name + "_cap" + row.number).closest("td").addClass("inputRequire");
            }

            // フォーム部品
            var part = App.createPart(row);
            $(name + "_ans" + row.number).html(part);
            if (row.image) {
                var width = row.imageWidth || 440;
                var img = "<img src='../image/" + row.image + "' style='margin:10px; max-width:" + width + "px;' />";
                $(name + "_ans" + row.number + "-img").html(img);
            }

            // 動画
            if (row.movie) {
                var movie = App.createMovie(id, row);
                $(name + "_ans" + row.number + "-img").html(movie);
            }
        });
        $(name + "_answerArea").trigger("create");
        App.formData = formData;

        // ラジオボタンの反転処理
        App.setRadioActive();

    } catch (err) {
        alert(err.message);
    }
};

// ------------------------------------------------------------
// 必須項目のチェック
// ------------------------------------------------------------
App.checkRequire = function () {
    var requireError = [];
    try {
        var schedule = App.loadObject("schedule") || {};                // スケジュール
        var work = location.href.split("/");
        var pageName = work[work.length - 1].split(".")[0];
        var data = eval(pageName).data;
        var nextPage = eval(pageName).nextPage;
        jQuery.each(data, function (i, row) {
            if (row.type.charAt(0) != "D" && row.require) {
                if (row.type.charAt(0) == "I" && !row.ans) {
                    requireError.push(row.title);
                } else {
                    var err = true;
                    var ary = row.ans ? row.ans.split(",") : [];
                    if (ary.length < 1) {
                        // 未回答ならエラー
                        requireError.push(row.title);
                    } else if (ary.length == 1) {
                        // 選択肢が１つなら「Yes」でも「No」でもOK

                    } else {
                        // 選択肢が２つ以上なら「No」でない回答が含まれていればOK
                        for (i = 0; i < ary.length; i++) {
                            if (ary[i] != "No") { err = false; }
                        }
                        if (err) {
                            requireError.push(row.title);
                        }
                    }
                }
            }
        });
        if (requireError.length > 0) {
            // 必須チェックＮＧ
            console.log("-- 必須チェックNG --");
            console.log(data);
            var ngFields = requireError.join("、");
            App.alert(
                "登録確認",
                "次の必須項目が未入力です。<br/>（" + ngFields + "）<br/><br/>このまま一時登録しますか？<br/><br/>",
                { confirm1: true, confirm0: true }      // App.alertでのボタン制御
            );
        } else {
            // 必須チェックＯＫ
            console.log("-- 必須チェックOK --");
            var score = App.saveData(data, false);       // 第二パラメータは「一時登録」かどうかを示すフラグ
            var schedule = App.loadObject("schedule") || {};                // スケジュール
            if (["19", "21", "30", "55", "101"].indexOf(schedule.start) > -1) {
                App.alert(
                    "登録確認",
                    "入力結果を登録しました。（" + score + "点）<br/><br/>",
                    nextPage ? { confirm3: true, confirm2: true, confirm0: true } : { confirm2: true, confirm0: true }  // App.alertでのボタン制御
                );
            } else {
                App.alert(
                    "登録確認",
                    "入力結果を登録しました。<br/><br/>",
                    nextPage ? { confirm3: true, confirm2: true, confirm0: true } : { confirm2: true, confirm0: true }  // App.alertでのボタン制御
                );
            }
        }
    } catch (err) {
        alert(err.message);
    }
};

// ------------------------------------------------------------
// データのセーブ
// ------------------------------------------------------------
App.saveData = function (data, isTemp) {

    // 登録済みのデータをロード
    var schedule = App.loadObject("schedule") || {};                // スケジュール
    var patients = App.loadObject("patients");                      // 全患者データ
    var patientIndex = App.loadObject("patientIndex").index || 0;   // 選択された患者のインデックス
    var patient = patients.rows[patientIndex];                      // 対象患者の鑑データ
    var ansData = App.loadObject("answers_" + patient.sec);         // 対象患者の全回答データ

    // 回答データ
    var answers = {};
    for (i = 0; i < data.length; i++) {
        var item = data[i];
        answers[item.number] = item.ans;        
    }
    ansData[schedule.category] = answers;

    // 鑑データ（patient）のステータスを更新
    console.log("-- patient status --");
    var totalScore = "";
    if (isTemp) {
        patient["score" + schedule.category] = "一時登録";
    } else {

        // スコア集計
          if (["19", "21", "30", "55", "101"].indexOf(schedule.start) > -1) {
            console.log(data);
            totalScore = 0;
            jQuery.each(data, function (i, row) {
                if (row.sum && row.score) {
                    totalScore += (row.score || 0);
                }
            });
        }
        var result = (totalScore === "") ? "済" : totalScore;
        patient["score" + schedule.category] = "登録済:" + result;
    }

    // 症例一覧（patients）のステータスを更新
    var scheduleDic = {
        "A": ["A01", "A15"],
        "B": ["B19", "B21", "B30", "B36", "B55", "B101"],
        "C": ["C30"],
        "D": ["D20", "D30", "D36", "D101"],
        "E": ["E19", "E21", "E30", "E36", "E55", "E101"],
        "F": ["F19", "F21", "F30", "F36", "F55", "F101"],
        "G": ["G19", "G21", "G30", "G36", "G55", "G101"],
        "H": ["H19", "H21", "H30", "H36", "H55", "H101"]
    };
    var sch = scheduleDic[schedule.code];
    var scAns = { "0": 0, "1": 0, "2": 0 };     // ステータス（未／一時／済）の個数カウント用配列
    for (i = 0; i < sch.length; i += 1) {
        var sc = patient["score" + sch[i]] || "";
        var scMode = sc.split(":")[0];
        if (scMode == "登録済") { scAns["2"] += 1; }
        else if (scMode == "一時登録") { scAns["1"] += 1; }
        else { scAns["0"] += 1; }
    }

    if (scAns["2"] == sch.length) { patient["status" + schedule.code] = "済"; }
    else if (scAns["2"] > 0) { patient["status" + schedule.code] = "一時登録"; }
    else if (scAns["1"] > 0) { patient["status" + schedule.code] = "一時登録"; }
    else { patient["status" + schedule.code] = ""; }

    // 患者情報を鑑データに反映
    if (schedule.category == "A01") {
        console.log("-- answer of A01 --");
        console.log(answers);
        patient.number = answers["4"] || "";    // 登録番号
        patient.sex = answers["10"] || "";      // 性別
        patient.side = answers["11"] || "";     // 患側
        // 対象患者データのD20の登録番号に反映
        if (ansData["D20"]) {
            ansData["D20"]["20-02"] = patient.number;
            console.log("-- ansData[D20] --");
            console.log(ansData["D20"]);
        }

    } else if (schedule.category == "D20") {
        console.log("-- answer of D20 --");
        console.log(answers);
        patient.number = answers["20-02"] || ""; // 登録番号
        // 対象患者データのA01の登録番号に反映
        if (ansData["A01"]) {
            ansData["A01"]["4"] = patient.number;
            console.log("-- ansData[A01] --");
            console.log(ansData["A01"]);
        }
    }

    // 回答データ（answers）を上書き保存
    console.log("-- updated ansData --");
    console.log(ansData);
    App.saveObject("answers_" + patient.sec, ansData);

    // 患者鑑データ（patients）を上書き保存
    patients.rows[patientIndex] = patient;
    App.saveObject("patients", patients);

    return totalScore;
};

// ------------------------------------------------------------
// 回答データの特定項目を更新
// ------------------------------------------------------------
App.updateData = function (patientIndex, category, qid, val) {
    var patients = App.loadObject("patients");              // 全患者データ
    var patient = patients.rows[patientIndex];              // 対象患者の鑑データ
    var ansData = App.loadObject("answers_" + patient.sec); // 対象患者の全回答データ
    var categoryAnswers = ansData[category] || {};          // 当該カテゴリの回答

    // 対象設問の回答を更新
    categoryAnswers[qid] = val;
    ansData[category] = categoryAnswers;
    console.log("-- update CategoryAnswers ---");
    console.log(ansData);
    App.saveObject("answers_" + patient.sec, ansData);
};

// ------------------------------------------------------------
// 確認画面後のアクション
// ------------------------------------------------------------
App.afterConfirm = function (ans) {
    var work = location.href.split("/");
    var pageName = work[work.length - 1].split(".")[0];
    var data = eval(pageName).data;
    switch (ans) {
        case 4: // 4:前のページに戻る

            alert("前のページに戻る");

            history.back();
            break;

        case 3: // 3:次のページに進む

            // 次のURLを作成
            var nextPage = eval(pageName).nextPage;

            // 処理中のスケジュールを更新
            var schedule = App.loadObject("schedule");
            var category = schedule.category;       // "A01"のようなカテゴリ番号
            var code = category.substr(0, 1);       // "A"のようなカテゴリコード
            var start = nextPage.substr(6, 2);      // "01"のような開始番号
            App.saveObject("schedule", { category: code + start, code: code, start: start });

            // 画面遷移
            App.changePage(nextPage);
            break;

        case 2: // 2:メニューに戻る
            setTimeout(function () {
                history.go(-1 * App.pageHistory);
            }, 300);
            break;

        case 1: // 1:一時登録してメニューに戻る
            App.saveData(data, true);    // 第二パラメータは「一時登録」を意味するフラグ
            setTimeout(function () {
                history.go(-1 * App.pageHistory);
            }, 300);
            break;

        case 0: // 0:キャンセル
            history.back();//popupのcloseを外したため追加
            break;

        default:
            break;
    }
};

// ------------------------------------------------------------
// 日時のフォーマット　「YYYY/MM/DD hh:mm:ss」形式
// ------------------------------------------------------------
App.createDateTime = function () {
    var dt = new Date();
    var datetime = [
        dt.getFullYear() + "/",
        ("0" + (dt.getMonth() + 1)).substr(-2, 2) + "/",
        ("0" + dt.getDate()).substr(-2, 2) + " ",
        ("0" + dt.getHours()).substr(-2, 2) + ":",
        ("0" + dt.getMinutes()).substr(-2, 2) + ":",
        ("0" + dt.getSeconds()).substr(-2, 2)
    ].join("");
    return datetime;
};

// ------------------------------------------------------------
// トースト表示
// ------------------------------------------------------------
App.toast = function (message) {
    var box = $("<div class='ui-loader ui-overlay-shadow ui-body-a ui-corner-all'>" + message + "</div>");
    box.css({
        "padding": "7px 25px 7px 25px",
        "display": "block",
        "opacity": 0.9,
        "color": "#222"
    });
    box.appendTo($.mobile.pageContainer);
    box.css({
        "top": Math.floor(($(window).height() - box.height()) / 2),
        "left": Math.floor(($(window).width() - box.width()) / 2)
    });
    box.delay(1500);
    box.fadeOut(1000, function () {
        $(this).remove();
    });
};
