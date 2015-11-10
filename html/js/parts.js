//
// ＵＩ部品の作成
//

if (!App) {
    var App = {};
}

// ------------------------------------------------------------
// UI部品の振り分け
// ------------------------------------------------------------
App.createPart = function (row) {
    var partsDic = {

        // 選択系パーツ
        "SV": App.createSV,     // Single Vertical（単一選択・縦並び・塗りつぶし型）
        "SV2": App.createSV2,   // Single Vertical（単一選択・縦並び・ラジオボタン型）
        "SH": App.createSH,     // Single Horizontal（単一選択・横並び・塗りつぶし型）
        "MV": App.createMV,     // Multi Vertical（複数選択・縦並び・チェックボックス型）
        "MV2": App.createMV2,   // Multi Vertical（複数選択・縦並び・チェックボックス型・ダブル型）
        "MH": App.createMH,     // Multi Horizontal（複数選択・横並び・塗りつぶし型）
        "FV": App.createFV,     // Flip Vertical（フリップスイッチ）

        // 入力系パーツ
        "IN": App.createIN,     // Input Number
        "IS": App.createIS,     // Input Slider
        "IT": App.createIT,     // Input Text
        "IA": App.createIA,     // Input TextArea
        "IP": App.createIP,     // Input Password
        "ID": App.createID,     // Input Date
        "II": App.createII,     // Input Image

        // 表示系パーツ
        "DT": App.createDT,     // Display Text
        "DN": App.createDN,     // Display Number（計算結果をマーク付きで表示）
        "DS": App.createDS,     // Display Select（判定結果をマーク付きで表示）

        // スペシャルパーツ
        "SP94": App.createSP94, // Special Parts 94

        // エラー
        "ERR": App.createError  // Error

    };
    var func = partsDic[row.type || "ERR"] || partsDic["ERR"];
    return func(row);
};

// ------------------------------------------------------------
// テンプレート置換
// ------------------------------------------------------------
App.replace = function (format, data) {
    var ans = format;
    jQuery.each(data, function (name, value) {
        var reg = new RegExp("{" + name + "}", "g");
        ans = ans.replace(reg, value);
    });
    return ans;
};

// ------------------------------------------------------------
// スケジュール名取得
// ------------------------------------------------------------
App.getSchedule = function () {
    var dic = { "A": "症例", "B": "術前", "C": "1週間", "D": "退院時", "E": "3か月", "F": "6か月", "G": "12か月", "H": "24か月" };
    var schedule = App.loadObject("schedule") || {};
    schedule.name = dic[schedule.code] || "*ERR*";
    return schedule;
};

// ------------------------------------------------------------
// 複数選択型の回答配列にデフォルトを反映（Yesならchecked）
// ------------------------------------------------------------
App.createCheckAnswers = function (ary, answer) {
    var answers = answer ? answer.split(",") : [];
    for (i = 0; i < ary.length; i += 1) {
        var item = ary[i].split(":");
        if (answers[i] == "Yes") {
            item[2] = "checked";
        }
        ary[i] = item.join(":");
    }
    return ary;
};

// ------------------------------------------------------------
// 単一選択型の回答配列にデフォルトを反映（一致ならchecked）
// ------------------------------------------------------------
App.createRadioAnswers = function (ary, answer) {
    for (i = 0; i < ary.length; i += 1) {
        var item = ary[i].split(":");
        if (item[0] == answer) {
            item[2] = "checked";
        }
        ary[i] = item.join(":");
    }
    return ary;
};

// ------------------------------------------------------------
// ラジオボタンのカスタマイズ　【参考】http://jsfiddle.net/ezanker/2Zgah/1/
// ------------------------------------------------------------
App.setRadioActive = function () {
    setTimeout(function () {
        $(".verticalRadio .ui-radio-off").removeClass("ui-btn-active");
        $(".verticalRadio .ui-radio-on").addClass("ui-btn-active");
    }, 0);
};

// ------------------------------------------------------------
// ラジオボタン（縦並び）SV
// ------------------------------------------------------------
App.createSV = function (row) {
    var param = row.param ? eval("({" + row.param + "})") : {};
    var ary = row.options ? row.options.split(",") : [];
    ary = App.createRadioAnswers(ary, row.ans || "");
    var htmls = [];
	var tmp = "<input type='radio' name='item-{num}' id='item-{num}{val}' value='{val}' {checked} onclick='App.setRadioActive();App.getAns(\"{num}\",\"{val}\");{onclick}' /><label for='item-{num}{val}'>{text}</label>";
	var tag = tmp.replace(/{onclick}/g, row.onclick || "");
	jQuery.each(ary, function (i, val) {
	    var ans = val.split(":");
	    var el = tag.replace(/{num}/g, row.number).replace(/{val}/g, ans[0]).replace(/{text}/g, ans[1]).replace(/{checked}/g, ans[2] || "");
	    htmls.push(el);
	});
	var tags = [
		"<fieldset data-role='controlgroup' data-theme='b' class='verticalRadio' id='item-{num}'>",
		htmls.join(""),
		"</fieldset>"
	].join("");
	var html = tags.replace("{title}", row.title || "（無題）");
	html = html.replace(/{num}/g, row.number);
	return html;
};

// ------------------------------------------------------------
// ラジオボタン（縦並び）SV2
// ------------------------------------------------------------
App.createSV2 = function (row) {
    var param = row.param ? eval("({" + row.param + "})") : {};
    var ary = row.options ? row.options.split(",") : [];
    var htmls = [];
    var tmp = "<input type='radio' name='item-{num}' id='item-{num}{val}' value='{val}' {checked} onclick='App.setRadioActive();App.getAns(\"{num}\",\"{val}\");{onclick}' /><label for='item-{num}{val}'>{text}</label>";
    var tag = tmp.replace(/{onclick}/g, row.onclick || "");
    jQuery.each(ary, function (i, val) {
        var ans = val.split(":");
        var el = tag.replace(/{val}/g, ans[0]).replace(/{text}/g, ans[1]).replace(/{checked}/g, ans[2] || "");
        htmls.push(el);
    });
    var tags = [
		"<fieldset data-role='controlgroup' data-theme='b' id='item-{num}'>",
		htmls.join(""),
		"</fieldset>"
    ].join("");
    var html = tags.replace("{title}", row.title || "（無題）");
    html = html.replace(/{num}/g, row.number);
    return html;
};

// ------------------------------------------------------------
// ラジオボタン（横並び）SH
// ------------------------------------------------------------
App.createSH = function (row) {
    var param = row.param ? eval("({" + row.param + "})") : {};
    var ary = row.options ? row.options.split(",") : [];
    ary = App.createRadioAnswers(ary, row.ans || "");
    var htmls = [];
	var tmp = [
        "<input type='radio' name='item-{num}' id='item-{num}{val}' value='{val}' {checked} onclick='App.getAns(\"{num}\");{onclick}' data-theme='d' />",
        "<label for='item-{num}{val}' style='{style}'>{text}</label>"
	].join("");
	var tag = tmp.replace(/{onclick}/g, row.onclick || "");
	if (ary.length < 6) {
	    tag = tag.replace(/{style}/g, "min-width:100px;");
	}
	jQuery.each(ary, function (i, val) {
		var ans = val.split(":");
		var el = tag.replace(/{val}/g, ans[0]).replace(/{text}/g, ans[1]).replace(/{checked}/g, ans[2] || "");
		htmls.push(el);
	});
	var guide = (param.minText || param.maxText) ? [
        "<table style='width:100%;'>",
        "<tr>",
        "<td style='font-size:18px; font-weight:bold; text-align:left !important;'>" + (param.minText || "") + "</td>",
        "<td style='font-size:18px; font-weight:bold; text-align:right !important;'>" + (param.maxText || "") + "</td>",
        "</tr>",
        "</table>",
	].join("") : "";
	var tags = [
        "<fieldset data-role='controlgroup' data-type='horizontal' data-role='fieldcontain'>",
        guide,
	    htmls.join(""),
	    "</fieldset>",
        "</div>"
	].join("");
	tags = tags.replace("{title}", row.title || "（無題）");
	tags = tags.replace(/{num}/g, row.number);
	return tags;
};

// ------------------------------------------------------------
// チェックボックス（縦並び）MV
// ------------------------------------------------------------
App.createMV = function (row) {
    var param = row.param ? eval("({" + row.param + "})") : {};
    var ary = row.options ? row.options.split(",") : [];
    ary = App.createCheckAnswers(ary, row.ans || "");
    var elseText = "";
    if (row.ans) {
        var ansAry = row.ans.split(",");
        if (ary.length < ansAry.length) {
            elseText = ansAry[ansAry.length -1];
        }
    }
    var htmls = [];
    var tmp = "<input type='checkbox' name='item-{num}' id='item-{num}{val}' value='{val}' {checked} onclick='App.getAns(\"{num}\");App.setRadioActive();{onclick}' /><label for='item-{num}{val}'>{text}</label>";
    var tag = tmp.replace(/{onclick}/g, row.onclick || "");
    jQuery.each(ary, function (i, val) {
        var ans = val.split(":");
        if (ans[1] == "その他" && elseText) {
            ans[1] = ans[1] + "（" + elseText + "）";
        }
        var el = tag.replace(/{val}/g, ans[0]).replace(/{text}/g, ans[1]).replace(/{checked}/g, ans[2] || "");
        htmls.push(el);
    });
    var tags = [
		"<fieldset data-role='controlgroup' data-theme='b' class='verticalCheck' id='item-{num}'>",
		htmls.join(""),
		"</fieldset>"
    ].join("");
    var html = tags.replace("{title}", row.title || "（無題）");
    html = html.replace(/{num}/g, row.number);
    return html;
};

// ------------------------------------------------------------
// チェックボックス（縦並び）MV2
// ------------------------------------------------------------
App.createMV2 = function (row) {
    var param = row.param ? eval("({" + row.param + "})") : {};
    var maxSelect = param.maxSelect || 99;
    var tmp = "<input type='checkbox' name='item-{num}' id='item-{num}{val}' value='{val}' {checked} onclick='App.getAns(\"{num}\");App.setRadioActive();{onclick}' /><label for='item-{num}{val}'>{text}</label>";
    var tag = tmp.replace(/{maxSelect}/g, maxSelect).replace(/{onclick}/g, row.onclick || "");

    // 選択肢配列
    var ary1 = row.options1 ? row.options1.split(",") : [];
    var ary2 = row.options2 ? row.options2.split(",") : [];

    // 回答データの分割
    var leftCount = ary1.length;
    var rightCount = ary2.length;
    var ans1 = [];
    var ans2 = [];
    var elseAns = [];
    if (row.ans) {
        var ary = row.ans.split(",");
        if (ary.length >= leftCount + rightCount) {
            for (i = 0; i < ary.length; i += 1) {
                if (i < leftCount) {
                    ans1.push(ary[i]);
                } else if (i < leftCount + rightCount) {
                    ans2.push(ary[i]);
                } else {
                    elseAns.push(ary[i]);
                }
            }
        }
    }

    // 左ブロック
    var htmls1 = [];
    //htmls1.push("<span style='font-weight:bold; font-size:18px;'>" + param.category1 + "</span>");
    htmls1.push("<span style='font-weight:bold; font-size:18px;'>" + param.category1 + "</span>");
    ary1 = App.createCheckAnswers(ary1, ans1.join(","));
    jQuery.each(ary1, function (i, val) {
        var ans = val.split(":");
        if (ans[1] == "その他" && elseAns[0] && elseAns[0] != " ") {
            ans[1] = ans[1] + "（" + elseAns[0] + "）";
            row.elseText19 = elseAns[0];
        }
        var el = tag.replace(/{val}/g, ans[0]).replace(/{text}/g, ans[1]).replace(/{checked}/g, ans[2] || "");
        htmls1.push(el);
    });
    var tags1 = [
		//"<fieldset data-role='controlgroup' data-theme='b' class='verticalCheck' id='item-{num}a'>",
        "<fieldset data-role='controlgroup' data-theme='b' class='verticalCheck' id='item-{num}a' data-mini='true'>",
		htmls1.join(""),
		"</fieldset>"
    ].join("");
    var html1 = tags1.replace("{title}", row.title || "（無題）");
    html1 = html1.replace(/{num}/g, row.number);

    // 右ブロック
    var htmls2 = [];
    //htmls2.push("<span style='font-weight:bold; font-size:18px;'>" + param.category2 + "</span>");
    htmls2.push("<span style='font-weight:bold; font-size:18px;'>" + param.category2 + "</span>");
    ary2 = App.createCheckAnswers(ary2, ans2.join(","));
    jQuery.each(ary2, function (i, val) {
        var ans = val.split(":");
        if (ans[1] == "その他" && elseAns[1] && elseAns[1] != " ") {
            ans[1] = ans[1] + "（" + elseAns[1] + "）";
            row.elseText28 = elseAns[1];
        }
        var el = tag.replace(/{val}/g, ans[0]).replace(/{text}/g, ans[1]).replace(/{checked}/g, ans[2] || "");
        htmls2.push(el);
    });
    var tags2 = [
        //"<fieldset data-role='controlgroup' data-theme='b' class='verticalCheck' id='item-{num}b'>",
		"<fieldset data-role='controlgroup' data-theme='b' class='verticalCheck' id='item-{num}b' data-mini='true'>",
		htmls2.join(""),
		"</fieldset>"
    ].join("");
    var html2 = tags2.replace("{title}", row.title || "（無題）");
    html2 = html2.replace(/{num}/g, row.number);

    // レイアウト
    var html = [
        "<table style='width:100%'><tr>",
        "<td style='width:50%; vertical-align:top !important;'>" + html1 + "</td>",
        "<td style='width:50%; vertical-align:top !important;'>" + html2 + "</td>",
        "</tr></table>"
    ].join("");

    return html;
};

// ------------------------------------------------------------
// チェックボックス（横並び）MH
// ------------------------------------------------------------
App.createMH = function(row){
    var param = row.param ? eval("({" + row.param + "})") : {};
    var ary = row.options ? row.options.split(",") : [];
    ary = App.createCheckAnswers(ary, row.ans || "");
    console.log(row.ans);
    console.log(ary);
    var htmls = [];
    var tmp = "<input type='checkbox' name='item-{num}' id='item-{num}{val}' value='{val}' {checked} onclick='App.getAns(\"{num}\");App.setRadioActive();{onclick}' /><label for='item-{num}{val}'>{text}</label>";
    var tag = tmp.replace(/{onclick}/g, row.onclick || "");
    jQuery.each(ary, function (i, val) {
        var ans = val.split(":");
        var el = tag.replace(/{num}/g, row.number).replace(/{val}/g, ans[0]).replace(/{text}/g, ans[1]).replace(/{checked}/g, ans[2] || "");
        console.log(el)
        htmls.push(el);
    });
    var tags = [
		"<fieldset data-role='controlgroup' data-type='horizontal' data-role='fieldcontain'>",
		htmls.join(""),
		"</fieldset>"
    ].join("");
    var html = tags.replace("{title}", row.title || "（無題）");
    html = html.replace(/{num}/g, row.number);
    return html;
};

// ------------------------------------------------------------
// フリップスイッチ　FV
// ------------------------------------------------------------
App.createFV = function (row) {
    var param = row.param ? eval("({" + row.param + "})") : {};
    var ary = row.options ? row.options.split(",") : [];
    var htmls = [];
    var tmp = "<div data-role='fieldcontain'><select name='item-{num}' id='item-{num}' data-role='slider' data-theme='a' onchange='App.getAns(\"{num}\");'><option value='No'>No</option><option value='Yes'>Yes</option></select><label for='item-{num}{val}'>{text}</label></div>";
    jQuery.each(ary, function (i, val) {
        var ans = val.split(":");
        var el = tmp.replace(/{val}/g, ans[0]).replace(/{text}/g, ans[1]);
        htmls.push(el);
    });
    var tags = [
		"<fieldset data-role='controlgroup' data-theme='b' class='verticalRadio' id='item-{num}'>",
		htmls.join(""),
		"</fieldset>"
    ].join("");
    var html = tags.replace("{title}", row.title || "（無題）");
    html = html.replace(/{num}/g, row.number);
    return html;
};

// ------------------------------------------------------------
// テキスト入力　IT
// ------------------------------------------------------------
App.createIT = function (row) {
    var param = row.param ? eval("({" + row.param + "})") : {};
    var tags = [
        "<fieldset data-role='fieldcontain' class='inputText'>",
        param.prefix ? "<label for='item-{num}' class='numberPrefix'>{prefix}</label>" : "",
        "<input type='text' name='item-{num}' id='item-{num}' value='{val}' maxlength='{maxlength}' onchange='App.getAns(\"{num}\");{onchange}' />",
        param.unit ? "<label for='item-{num}' class='numberUnit'>{unit}</label>" : "",
        "</fieldset>"
    ].join("");
    if (row.value == "patientNumber" && row.ans == "") {
        var patients = App.loadObject("patients");                      // 全患者データ
        var patientIndex = App.loadObject("patientIndex").index || 0;   // 選択された患者のインデックス
        var patient = patients.rows[patientIndex];                      // 対象患者の鑑データ
        row.ans = patient.number || "";
    }
    tags = tags.replace(/{title}/g, row.title || "（無題）");
    tags = tags.replace(/{num}/g, row.number || "999");
    tags = tags.replace(/{val}/g, (row.ans === "") ? "" : (row.ans || row.value || ""));
    tags = tags.replace(/{maxlength}/g, param.maxlength || 100);
    tags = tags.replace(/{prefix}/g, param.prefix || '');
    tags = tags.replace(/{unit}/g, param.unit || '');
    tags = tags.replace(/{onchange}/g, row.onchange || '');
    return tags;
};

// ------------------------------------------------------------
// テキストエリア　IA
// ------------------------------------------------------------
App.createIA = function (row) {
    var param = row.param ? eval("({" + row.param + "})") : {};
    var tags = [
        "<fieldset data-role='fieldcontain' class='inputText'>",
        "<textarea name='item-{num}' id='item-{num}' style='height:120px;' onchange='App.getAns(\"{num}\");{onchange}'>{val}</textarea>",
        "</fieldset>"
    ].join("");
    var val = row.ans || row.value || "";
    val = val.replace(/\\n/g, "\n");
    tags = tags.replace(/{title}/g, row.title || "（無題）");
    tags = tags.replace(/{num}/g, row.number || "999");
    tags = tags.replace(/{val}/g, val);
    tags = tags.replace(/{onchange}/g, row.onchange || '');
    return tags;
};

// ------------------------------------------------------------
// パスワード入力　IP
// ------------------------------------------------------------
App.createIP = function (row) {
    var param = eval("({" + row.param + "})");
    var tags = [
        "<fieldset data-role='fieldcontain' class='inputText'>",
        "<input type='password' name='item-{num}' id='item-{num}' value='{val}' maxlength='{maxlength}' onchange='App.getAns(\"{num}\");' />",
        "</fieldset>"
    ].join("");
    tags = tags.replace(/{title}/g, row.title);
    tags = tags.replace(/{num}/g, row.number);
    tags = tags.replace(/{val}/g, row.value);
    tags = tags.replace(/{maxlength}/g, param.maxlength || 100);
    return tags;
};

// ------------------------------------------------------------
// 数値入力　IN
// ------------------------------------------------------------
App.createIN = function (row) {
    var param = row.param ? eval("({" + row.param + "})") : {};
    var tags = [
        "<div data-role='fieldcontain' class='inputNumber'>",
        param.prefix ? "<label for='item-{num}' class='numberPrefix'>{prefix}</label>" : "",
        "<input type='tel' name='item-{num}' id='item-{num}' value='{val}' min='{min}' max='{max}' step='{step}' onblur='App.formatNumber(\"{title}\", \"{num}\", \"{min}\", \"{max}\", \"{step}\");' onchange='App.getAns(\"{num}\");{onchange}' />",
        param.unit ? "<label for='item-{num}' class='numberUnit'>{unit}</label>" : "",
        "</div>"
    ].join("");
    tags = tags.replace(/{title}/g, row.title);
    tags = tags.replace(/{num}/g, row.number);
    tags = tags.replace(/{val}/g, row.ans || row.value || "");
    tags = tags.replace(/{min}/g, param.min || 0);
    tags = tags.replace(/{max}/g, param.max || 100);
    tags = tags.replace(/{step}/g, param.step || "0.1");
    tags = tags.replace(/{prefix}/g, param.prefix || '');
    tags = tags.replace(/{onchange}/g, row.onchange || '');
    tags = tags.replace(/{unit}/g, param.unit || '');
    tags = tags.replace("{title}", row.title || "（無題）");
    return tags;
};
App.formatNumber = function (title, num, min, max, step) {
    var val = "";
    try {
        val = $("#item-" + num).val();
        if (val) {
            if (isNaN(val)) {
                App.alert(title || "入力エラー", "数値以外が入力されました", {
                    onclose: function () {
                        $("#item-" + num).val("");
                        $("#item-" + num).focus();
                        App.getAns(num);
                    }
                });
            } else {
                var number = Number(val);
                if (number < min || number > max) {
                    App.alert(title || "入力エラー", "範囲外の値が入力されました", {
                        onclose: function () {
                            $("#item-" + num).val("");
                            $("#item-" + num).focus();
                            App.getAns(num);
                        }
                    });
                } else if (step < 1) {
                    val = App.formatPeriod(val);
                    $("#item-" + num).val(val);
                    App.getAns(num);             // 編集後の結果を保存
                } else {
                    val = String(Math.floor(new Number(val)));
                    $("#item-" + num).val(val);
                    App.getAns(num);             // 編集後の結果を保存
                }
            }
        }
    } catch (err) {
        $("#" + id).val(null);
    }
};
App.formatPeriod = function (val) {
    val = String(Math.floor(new Number(val) * 10) / 10);
    if (val.indexOf(".") < 0) { val += ".0"; }
    return val;
};

// ------------------------------------------------------------
// スライダー入力　IS
// ------------------------------------------------------------
App.createIS = function (row) {
    var param = row.param ? eval("({" + row.param + "})") : {};
    var tags = [
        "<div data-role='fieldcontain' class='inputSlider'>",
        "<table style='margin-left:8%; width:84%; height:20px;'>",
        "<tr>",
        "<td style='text-align:left !important;'>" + (param.minText || param.min) + "</td>",
        "<td style='text-align:right !important;'>" + (param.maxText || param.max) + "</td>",
        "</tr>",
        "</table>",
        "<input type='range' name='item-{num}' id='item-{num}' value='{value}' min='{min}' max='{max}' step='{step}' data-theme='a' data-track-theme='a' />",
        "</div>"
    ].join("");
    tags = tags.replace(/{num}/g, row.number);
    tags = tags.replace(/{value}/g, row.ans || row.value || 0);
    tags = tags.replace(/{min}/g, param.min || 0);
    tags = tags.replace(/{max}/g, param.max || 100);
    tags = tags.replace(/{step}/g, param.step || 1);
    tags = tags.replace("{title}", row.title || "（無題）");
    return tags;
};

// ------------------------------------------------------------
// 日付入力　ID
// ------------------------------------------------------------
App.createID = function (row) {
    var param = row.param ? eval("({" + row.param + "})") : {};
/*    
    var tags = [
        "<div data-role='fieldcontain' class='inputDate'>",
        "<input type='date' name='item-{num}' id='item-{num}' value='{val}' onchange='App.getAns(\"{num}\");' onfocus='{onfocus}' />",
        "</div>"
    ].join("");
*/
    //input type date ではアプリが落ちてしまうため、jQueryのDateBoxを使用する　Ti SDK 3.5だと起きる　
    var tags = [
        "<div data-role='fieldcontain' class='inputDate'>",
        "<input type='text' data-role='datebox' ",
        " data-options='{\"mode\":\"flipbox\", \"overrideHeaderFormat\": \"%Y年%B%-d日(%a)\",\"overrideDateFieldOrder\": [\"y\",\"m\",\"d\"], \"useButton\":false, \"useFocus\":true, \"useClearButton\":true}'",
        " name='item-{num}' id='item-{num}' value='{val}' onchange='App.getAns(\"{num}\");' onfocus='{onfocus}' />",
        "</div>"
    ].join("");
                
    tags = tags.replace(/{num}/g, row.number);
    if (row.ans) {
        console.log("＜日付処理＞");
        console.log(row);

        var disp = row.ans.replace(/-/g, "/");//山田追加20150413
        //tags = tags.replace(/{val}/g, row.ans);
        tags = tags.replace(/{val}/g, disp);
        tags = tags.replace(/{onfocus}/g, "");
    } else if (row.value == "today") {
        var date = new Date();
        var today = [
            date.getFullYear(),
            ("0" + (date.getMonth() + 1)).substr(-2, 2),
            ("0" + date.getDate()).substr(-2, 2)
        ].join("/");
        //].join("-");
        tags = tags.replace(/{val}/g, today);
        tags = tags.replace(/{onfocus}/g, "");
        row.ans = today;
//        tags = tags.replace(/{val}/g, "");
//        tags = tags.replace(/{onfocus}/g, "App.setToday(\"" + row.number + "\");");
//        row.ans = "";
    } else if (row.value) {
        var disp = row.value.replace(/-/g, "/");
        tags = tags.replace(/{val}/g, disp);
        //tags = tags.replace(/{val}/g, row.value);
        tags = tags.replace(/{onfocus}/g, "");
        row.ans = row.value;
    } else {
        tags = tags.replace(/{val}/g, "");
        tags = tags.replace(/{onfocus}/g, "");
    }
    tags = tags.replace("{title}", row.title || "（無題）");
    return tags;
};
App.setToday = function (num) {
    if ($("#item-" + num).val()) {
        return false;
    } else {
        var date = new Date();
        var today = [
            date.getFullYear(),
            ("0" + (date.getMonth() + 1)).substr(-2, 2),
            ("0" + date.getDate()).substr(-2, 2)
        ].join("-");
        $("#item-" + num).val(today);
        var row = App.getRow(num);
        row.ans = today;
        return false;
    }
};

// ------------------------------------------------------------
// 画像入力　II
// ------------------------------------------------------------
App.createII = function (row) {
    var param = row.param ? eval("({" + row.param + "})") : {};
    var tags = [
        "<fieldset data-role='fieldcontain' class='inputText'>",
        "<label for='item-{num}'>{title}:</label>",
        "<input type='text' name='item-{num}' id='item-{num}' value='{val}' maxlength='{maxlength}' />",
        "</fieldset>"
    ];
    tags = tags.replace(/{title}/g, row.title || "（無題）");
    tags = tags.replace(/{num}/g, row.number || "999");
    tags = tags.replace(/{val}/g, row.value || "");
    tags = tags.replace(/{maxlength}/g, param.maxlength || 100);
    return tags;
};

// ------------------------------------------------------------
// テキスト表示　DT
// ------------------------------------------------------------
App.createDT = function (row) {
    var param = row.param ? eval("({" + row.param + "})") : {};
    var tags = [
        "<div id='item-{num}' class='appDisplay'>{val}</div>"
    ].join("");
    tags = tags.replace(/{num}/g, row.number);
    tags = tags.replace(/{val}/g, row.description || "（工事中）");
    tags = tags.replace("{title}", row.title || "（無題）");
    return tags;
};

// ------------------------------------------------------------
// 点数表示　DN
// ------------------------------------------------------------
App.createDN = function (row, val, forceZero) {
    var param = row.param ? eval("({" + row.param + "})") : {};
    var htmls = [];
    var tmp = "";
    if (val === "" || val === null || val === undefined) {
        tmp = "<label class='appDispSelectFalse'>{description}</label>";
    }else if(forceZero || isNaN(val)) {
        console.log("forceZero");
        tmp = "<label class='appDispScore'>{description}{value}</label>";
    } else if (val != 0) {
        console.log("not 0");
        tmp = "<label class='appDispSelectTrue'>{description}{value}</label>";
    } else {
        console.log("else");
        tmp = "<label class='appDispSelectFalse'>{description}</label>";
    }
    var tags = [
        "<div id='item-{num}' class='appDisplay'>",
        tmp,
        "</div>"
    ].join("");
    tags = tags.replace(/{num}/g, row.number);
    tags = tags.replace(/{description}/g, row.description);
    tags = tags.replace(/{value}/g, isNaN(val) ? "" : val);
    return tags;
};

// ------------------------------------------------------------
// 選択表示　DS
// ------------------------------------------------------------
App.createDS = function (row, val) {
    var param = row.param ? eval("({" + row.param + "})") : {};
    var ary = row.options ? row.options.split(",") : [];
    var htmls = [];
    var tmp1 = "<label class='appDispSelectFalse'>{text}</label>";
    var tmp2 = "<label class='appDispSelectTrue'>{text}</label>";
    jQuery.each(ary, function (i, item) {
        var ans = item.split(":");
        var tmp = (ans[0] == val) ? tmp2 : tmp1;
        var el = tmp.replace(/{text}/g, ans[1]);
        htmls.push(el);
    });
    var tags = [
        "<div id='item-{num}' class='appDisplay'>",
		htmls.join("<br/>"),
        "</div>"
    ].join("");
    tags = tags.replace(/{num}/g, row.number);
    return tags;
};

// ------------------------------------------------------------
// スペシャル部品　SP94
// ------------------------------------------------------------
App.createSP94 = function (row) {
    var param = row.param ? eval("({" + row.param + "})") : {};
    var ary = row.options ? row.options.split(",") : [];
    var ansArray = row.ans ? row.ans.split(",") : [];

    // 前の設問（No.93）の回答を取得
    var row93 = App.getRow("93");
    var ary1 = row93.options1.split(",");
    var ary2 = row93.options2.split(",");
    Array.prototype.push.apply(ary1, ary2);
    var ansAry = row93.ans.split(",");
    var yesAry = [];
    for (i = 0; i < ansAry.length; i++) {
        if (ansAry[i] == "Yes") { yesAry.push(ary1[i]); }
    }

    // 当設問（No.94）の回答を取得
    var ansAry94 = row.ans.split(",");

    var row1Title = yesAry[0].split(":")[1];
    if (yesAry[0].split(":")[0] == "19") {
        row1Title = row1Title + "（" + row93.elseText19 + "）";
    }
    var row1 = {
        number: "94",
        ans: ansAry94[0] || "",
        //options: "5:全く問題ない<br/>　,4:わずかに困難<br/>　,3:少し困難<br/>　,2:困難<br/>　,1:非常に困難<br/>　,0:全くできない<br/>（膝が悪いため）,-1:いままでにこの動作<br/>をしたことがない",
        options: "5:問題ない<br/>　,4:少し困難<br/>　,3:ある程度困難<br/>　,2:とても困難<br/>　,1:極めて困難<br/>　,0:できない<br/>(膝が原因),-1:やったことがない<br/>　",
        param: "minText:'<span style=\"font-size:20px; font-weight:bold;\">【１】　" + row1Title + "</span>'",
        require: true
    };
    var tags1 = App.createSH(row1);

    var row2Title = yesAry[1].split(":")[1];
    if (yesAry[1].split(":")[0] == "19") {
        row2Title = row2Title + "（" + row93.elseText19 + "）";
    }
    var row2 = {
        number: "96",
        ans: ansAry94[1] || "",
        options: "5:問題ない<br/>　,4:少し困難<br/>　,3:ある程度困難<br/>　,2:とても困難<br/>　,1:極めて困難<br/>　,0:できない<br/>(膝が原因),-1:やったことがない<br/>　",
        param: "minText:'<span style=\"font-size:20px; font-weight:bold;\">【２】　" + row2Title + "</span>'",
        require: true
    };
    var tags2 = App.createSH(row2);

    var row3Title = yesAry[2].split(":")[1];
    if (yesAry[2].split(":")[0] == "19") {
        row3Title = row3Title + "（" + row93.elseText19 + "）";
    }
    if (yesAry[2].split(":")[0] == "28") {
        row3Title = row3Title + "（" + row93.elseText28 + "）";
    }
    var row3 = {
        number: "98",
        ans: ansAry94[2] || "",
        options: "5:問題ない<br/>　,4:少し困難<br/>　,3:ある程度困難<br/>　,2:とても困難<br/>　,1:極めて困難<br/>　,0:できない<br/>(膝が原因),-1:やったことがない<br/>　",
        param: "minText:'<span style=\"font-size:20px; font-weight:bold;\">【３】　" + row3Title + "</span>'",
        require: true
    };
    var tags3 = App.createSH(row3);

    var htmls = [ tags1, tags2, tags3 ].join("<br/>");
    return htmls;
};

// ------------------------------------------------------------
// エラー部品
// ------------------------------------------------------------
App.createError = function (row) {
    var param = eval("({" + row.param + "})");
    var tags = [
        "<div id='item-{num}'>Error</div>"
    ].join("");
    tags = tags.replace(/{num}/g, row.number);
    tags = tags.replace("{title}", row.title || "（無題）");
    return tags;
};

// ------------------------------------------------------------
// サウンドプレーヤ
// ------------------------------------------------------------
App.createSoundPlayer = function (row) {
    if (!row.sound) { return ""; }
    var id = "appPlayer_" + row.number;
    var tags = [
        "<audio src='../sound/" + row.sound + "' preload id='" + id + "' />",
        "<div data-role='controlgroup' data-type='horizontal'>",
        "<a href='javascript:App.soundPlay(\"" + id + "\");' data-role='button' data-theme='d' data-icon='arrow-r' data-iconpos='top'>再生</a>",
//        "<a href='javascript:App.soundPause(\"" + id + "\");' data-role='button' data-theme='d' data-icon='check' data-iconpos='top'>一時停止</a>",
        "<a href='javascript:App.soundStop(\"" + id + "\");' data-role='button' data-theme='d' data-icon='delete' data-iconpos='top'>停止</a>",
        "</div>"
    ].join("");
    return tags;
};
App.soundPlay = function (id) {
    $("#" + id).trigger("play");
};
App.soundPause = function (id) {
    $("#" + id).trigger("pause");
};
App.soundStop = function (id) {
    $("#" + id).trigger("pause");
    $("#" + id).prop("currentTime", 0);
};

// ------------------------------------------------------------
// ビデオプレーヤ
// ------------------------------------------------------------
App.createMovie = function (id, row) {
    var movieID = id + "_ans" + row.number + "-movie";
    var imageID = id + "_ans" + row.number + "-image";
    //    var src = (row.movie.indexOf("http") == 0) ? row.movie : window.URL.createObjectURL(row.movie);
    //var src = (row.movie.indexOf("http") == 0) ? row.movie : "../movie/short/" + row.movie;
    
    
    var src = "../movie/short/" + row.movie;
    var imageSrc = "../image/" + row.image;
    
    //var src = (row.movie.indexOf("http") == 0) ? row.movie : row.movie;
    //var src = row.movie;
    
    console.log("movieSrc = " + src);
    //alert("movieSrc = " + src);
    /*
    var movie = [
        "<video width='240' height='135' id='" + movieID + "' preload='metadata'>",
        "<source src='" + src + "' type='video/mp4'>",
        "</video>",
        "<a href='javascript:App.moviePlay(\"" + movieID + "\");' data-role='button' data-icon='arrow-r' data-mini='true'>再生</a>",
        "<a href='javascript:App.movieStop(\"" + movieID + "\");' data-role='button' data-icon='delete' data-mini='true'>停止</a>",
        "<a href='javascript:App.movieFull(\"" + movieID + "\");' data-role='button' data-icon='search' data-mini='true'>フルスクリーン</a>"
    ].join("");
    */    
    
    var movie = [
    /*
        "<video width='240' height='135' id='" + movieID + "' preload='metadata'>",
        "<source src='" + src + "' type='video/mp4'>",
        "</video>",    
        */
        "<img src=" + imageSrc + " width='240' height='135' id='" + imageID + "' />",
        //"<a href='javascript:App.moviePlay(\"" + movieID + "\");' data-role='button' data-icon='arrow-r' data-mini='true'>再生</a>",
        "<a href='javascript:App.moviePlayPop(\"" + movieID + "\",\"" + src + "\");' data-role='button' data-icon='arrow-r' data-mini='true'>再生</a>"
        //,
        //"<a href='javascript:App.movieStop(\"" + movieID + "\");' data-role='button' data-icon='delete' data-mini='true'>停止</a>",
        //"<a href='javascript:App.movieFull(\"" + movieID + "\");' data-role='button' data-icon='search' data-mini='true'>フルスクリーン</a>"
    ].join("");

    //alert("<a href='javascript:App.moviePlay(\"" + movieID + "\"," + src + ");' data-role='button' data-icon='arrow-r' data-mini='true'>再生</a>");
    //alert("<a href='javascript:App.moviePlay(\"" + movieID + "\");' data-role='button' data-icon='arrow-r' data-mini='true'>再生</a>");
    return movie;
};
App.movieLoad = function (id) {
    var v = $("#" + id).get(0);
    v.load();
};
//動画再生popを表示
App.moviePlayPop = function (id,src) {
    App.entry_101_movieID = id;//popを開いた直後に動画を再生させるためグローバル変数にidを保持
    var movie = [
        //"<video width='240' height='135' id='" + id + "' preload='metadata'>",
        "<video width='400' height='250' id='" + id + "' preload='metadata'>",
        "<source src='" + src + "' type='video/mp4'>",
        "</video>",
        //"<a href='javascript:App.moviePlay(\"" + id + "\");' data-role='button' data-icon='arrow-r' data-mini='true'>再生</a>",
        "<a href='javascript:App.moviePlay(\"" + id + "\");' data-role='button' data-mini='true'>▶︎</a>",
        "<a href='javascript:App.movieFull(\"" + id + "\");' data-role='button' data-mini='true'>フルスクリーン</a>"
    ].join("");
    
    $("#entry_101_movieimg").html(movie);
    $("#entry_101_movieimg").trigger("create");
    $("#entry_101_moviepop").popup("open", { transition: "pop" });    
};
//動画の自動再生
App.moviePlay = function (id) {
    var v = $("#" + id).get(0);
    v.play();
};
App.movieStop = function (id) {
    var v = $("#" + id).get(0);
    //alert(id);
    v.pause();
    v.currentTime = 0;
};
App.movieFull = function (id) {
    var v = $("#" + id).get(0);
    if (v.requestFullScreen) {
        v.requestFullScreen();
    } else if (v.mozRequestFullScreen) {
        v.mozRequestFullScreen();
    } else if (v.webkitRequestFullScreen) {
        v.webkitRequestFullScreen();
    } else if (v.webkitEnterFullscreen) {
        v.webkitEnterFullscreen();
    } else {
        alert("フルスクリーン表示には未対応です");
    }
};
