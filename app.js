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
    // DOMのキャッシュを有効化（全ページをキャッシュ）・・・リソース圧迫の恐れ
    //    $.mobile.page.prototype.options.domCache = true;

    // クロスドメインのアクセスを許可
    $.support.cors = true;
    $.mobile.allowCrossDomainPages = true;

    // ハッシュベースの長いURLをクリーンなURLに変換するか否か
    //    $.mobile.pushStateEnabled = false;


});

// ------------------------------------------------------------
// ページ遷移
// ------------------------------------------------------------
App.changePage = function (url, msg) {
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
    history.back();
};
App.backPage2 = function () {
    history.go(-3);
    /*
    alert(1);
    setTimeout(function () {
        history.back();
    }, 200);
    setTimeout(function () {
        history.back();
    }, 500);
    setTimeout(function () {
        history.back();
    }, 700);
    */
};