//
// ＰＮＧ出力
//
var Png = {};

// デバッグモードの設定（リリース時はFalseにすること）
Png.isTest = false;

// iPadに保存するため
Png.saveImageiOS = function (base64, fileName) {
    Resonance.request({ method: 'App.createImage', base64: base64, fileName: fileName, callback: 'Png.exeLater' });
};

Png.exeLater = function (obj) {
    if(obj.pngResult){//画像出力に失敗した場合
        App.alert("出力エラー", obj.pngResult);
    }else{
        //成功した場合　何もしない
    }    
};

// Canvas画像のBase64データをローカル保存
Png.saveImage = function (canvas, fileName) {
    var imageData = App.loadObject("imageData");            // 元の保存データ（全画像）
    imageData[fileName] = canvas.toDataURL("image/png");    // Base64をセット
    App.saveObject("imageData", imageData);
};

// ローカルストレージからBase64データを取得
Png.loadImage = function (fileName) {
    var imageData = App.loadObject("imageData");            // 元の保存データ（全画像）
    var base64 = imageData[fileName] || "";                 // 該当データ
    return base64;
};

// PNGファイル化してダウンロード
Png.downloadImage = function (base64, fileName) {
    if (base64) {
        var blob = Png.base64toBlob(base64);
        Png.downloadPngFile(blob, fileName);
    }
};

// Base64データをBlob化
Png.base64toBlob = function (_base64) {
    var tmp = _base64.split(',');
    var data = atob(tmp[1]);
    var mime = tmp[0].split(':')[1].split(';')[0];
    var arr = new Uint8Array(data.length);
    for (i = 0; i < data.length; i++) { arr[i] = data.charCodeAt(i); }
    var blob = new Blob([arr], { type: mime });
    return blob;
};

// BlobデータをPNGファイルとしてダウンロード
Png.downloadPngFile = function (_blob, _file) {
    var url = (window.URL || window.webkitURL);
    var data = url.createObjectURL(_blob);
    var e = document.createEvent("MouseEvents");
    e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    var a = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
    a.href = data;
    a.download = _file;
    a.dispatchEvent(e);
};

// blobデータをPNGファイルとしてローカル保存
Png.saveBlob = function (_file) {
    // Titaniumのファイルシステムに保存する方法（実際はResonanceに渡す必要がある）
    // ※参考サイト　http://blog.nipx.jp/archives/4785
    try {
        // 先頭のMymeTypeを除去
        var imgData = App.base64;
        var iData = imgData.replace(/^.*,/, '');
        
        //ここからTitanium で実装
        var base64 = Ti.Utils.base64decode(iData);
        var file = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, _file);
        file.write(base64);
    } catch (e) {
        alert(e.message);
    }

    // iTunes経由でのファイル共有を可能にする設定
    // ※参考サイト　https://developer.appcelerator.com/question/152741/file-sharing-in-app
    // ・plistで「Application supports iTunes file sharing」を「YES」にする
    // ・Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'ファイル名.csv');
};
