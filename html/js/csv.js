//
// ＣＳＶ出力
//
var Csv = {};

// デバッグモードの設定（リリース時はFalseにすること）
Csv.isTest = false;

// カテゴリ配列（47要素）
Csv.categories = [

    //---- 患者インデックス --------------------// ※回答データは存在しないが、CSVの見出し作成用に便宜上ここで定義
    { code: "000", header: "", columns: ["登録順", "患者登録番号", "患者ID", "イニシャル"] },

    //---- A:症例 --------------------//
    { code: "A01", header: "症例_", columns: ["記入日", "適確基準_初回", "適確基準_OA", "除外基準_認知症", "除外基準_RA", "除外基準_HTO", "除外基準_骨折", "登録番号", "生年月日", "手術時年齢", "身長", "体重", "BMI", "性別", "患側", "原疾患", "原疾患_その他_内容", "既往手術", "既往手術_あり_内容", "反対側_なし", "反対側_OA", "反対側_RA", "反対側_外傷", "反対側_THA", "反対側_TKA", "反対側_その他_選択", "反対側_その他_内容"] },
    { code: "A15", header: "症例_", columns: ["人種", "手術日", "術者", "手術"] },

    //---- B:術前 --------------------//
    { code: "B19", header: "術前_", columns: ["UCLA"] },
    { code: "B21", header: "術前_", columns: ["Charnley", "アライメント_角度", "アライメント_判定", "アライメント_点数", "動揺性_内外距離", "動揺性_内外", "動揺性_点数", "動揺性_前後距離", "動揺性_前後", "動揺性_点数", "合計_膝状態"] },
    { code: "B30", header: "術前_", columns: ["可動域", "可動域点数", "屈曲角度", "屈曲角度点数", "伸展角度", "伸展角度点数"] },
    { code: "B36", header: "術前_", columns: ["疼痛有無", "疼痛1_area", "疼痛1_side", "疼痛1_x", "疼痛1_y", "疼痛2_area", "疼痛2_side", "疼痛2_x", "疼痛2_y", "疼痛3_area", "疼痛3_side", "疼痛3_x", "疼痛3_y", "疼痛4_area", "疼痛4_side", "疼痛4_x", "疼痛4_y", "疼痛5_area", "疼痛5_side", "疼痛5_x", "疼痛5_y", "疼痛6_area", "疼痛6_side", "疼痛6_x", "疼痛6_y", "疼痛7_area", "疼痛7_side", "疼痛7_x", "疼痛7_y", "疼痛8_area", "疼痛8_side", "疼痛8_x", "疼痛8_y", "疼痛9_area", "疼痛9_side", "疼痛9_x", "疼痛9_y", "疼痛10_area", "疼痛10_side", "疼痛10_x", "疼痛10_y", "疼痛画像", "所見"] },
    { code: "B39", header: "術前_", columns: ["HKA"] },
    { code: "B40", header: "術前_", columns: ["PCO", "MaxAP", "PCOR", "FTPO"] },
    //{ code: "B55", header: "術前_", columns: ["疼痛_歩行", "階段疼痛", "違和感", "合計_膝症状", "満足度_椅子", "満足度_腹臥位", "満足度_起立時", "満足度_家事", "満足度_娯楽", "合計_満足度", "期待", "期待_通常動作", "期待_レジャー", "合計_期待", "歩行時_器具", "補助_車椅子", "補助_歩行器", "補助_松葉杖2本", "補助_T字杖2本", "補助_松葉杖1本", "補助_T字杖1本", "補助_サポーター", "補助_その他_選択", "補助_その他_内容", "合計_補助", "膝が悪いため", "立位時間", "歩行時間", "合計_歩行機能", "段差歩行時", "進行方向変更時", "階段昇降時", "起立時", "乗降時_車", "横向移動時", "合計_基本動作", "踏み台", "買い物時", "しゃがみこむ時", "ひざまづく時", "走る時", "合計_応用動作", "スイミング", "ゴルフ", "サイクリング", "園芸作業", "ボーリング", "テニス", "ウォーキング", "ダンス", "ストレッチ", "娯楽_その他_選択", "娯楽_その他_内容", "ウェイトリフティング", "レッグエクステンション", "ステップマシン", "エアロバイク", "レッグプレス", "ジョギング", "エリプティカルトレーナー", "エアロビクス", "筋トレ_その他_選択", "筋トレ_その他_内容", "運動1", "運動1_困難度", "運動1_点数", "運動2", "運動2_困難度", "運動2_点数", "運動3", "運動3_困難度", "運動3_点数", "合計_運動"] },
    { code: "B55", header: "術前_", columns: ["疼痛_歩行", "階段疼痛", "違和感", "合計_膝症状", "満足度_椅子", "満足度_腹臥位", "満足度_起立時", "満足度_家事", "満足度_娯楽", "合計_満足度", "期待", "期待_通常動作", "期待_レジャー", "合計_期待", "歩行時_器具", "補助_車椅子", "補助_歩行器", "補助_松葉杖2本", "補助_T字杖2本", "補助_松葉杖1本", "補助_T字杖1本", "補助_サポーター", "補助_その他_選択", "補助_その他_内容", "合計_補助", "膝が悪いため", "立位時間", "歩行時間", "合計_歩行機能", "段差歩行時", "進行方向変更時", "階段昇降時", "起立時", "乗降時_車", "横向移動時", "合計_基本動作", "踏み台", "買い物時", "しゃがみこむ時", "ひざまづく時", "走る時", "合計_応用動作", "スイミング", "ゴルフ", "サイクリング", "園芸作業", "ボーリング", "テニス", "ウォーキング", "ダンス", "ストレッチ", "ゲートボール", "ハイキング", "ウェイトリフティング", "レッグエクステンション", "ステップマシン", "エアロバイク", "レッグプレス", "ジョギング", "エリプティカルトレーナー", "エアロビクス", "運動1", "運動1_困難度", "運動1_点数", "運動2", "運動2_困難度", "運動2_点数", "運動3", "運動3_困難度", "運動3_点数", "合計_運動"] },
    { code: "B101", header: "術前_", columns: ["BBS立位保持", "BBS両手前方", "BBS拾い上げ", "BBS振り返り", "BBS方向転換", "BBS方向転換_注釈", "BBS踏み台昇降", "BBSタンデム立位_患側後", "BBSタンデム立位_健側後", "BBS片足立位_患側", "BBS片足立位_健側", "BBS"] },

    //---- C:１週間 --------------------//
    { code: "C30", header: "1週_", columns: ["可動域", "可動域点数", "屈曲角度", "屈曲角度点数", "伸展角度", "伸展角度点数"] },

    //---- D:退院時 --------------------//
    { code: "D20", header: "退院_", columns: ["記入日", "登録番号", "術者", "手術日", "手術時間", "術中出欠量", "皮切量", "SurgicalApproach", "使用ジグ", "大腿骨遠位内側", "大腿骨遠位外側", "大腿骨遠位Measured", "大腿骨遠位Gap", "大腿骨後顆内側", "大腿骨後顆外側", "大腿骨後顆Measured", "大腿骨後顆Gap", "脛骨近位内側", "脛骨近位外側", "脛骨近位Measured", "脛骨近位Gap", "Whiteside", "ParaTibResection", "CEA", "SEA", "PCA", "AntRef", "PostRef", "IntermediateRef", "LargerSize", "SmallerSize", "APAxis", "AkagiLine", "伸展GAP内側", "伸展GAP外側", "屈曲GAP内側", "屈曲GAP外側", "大腿骨使用機種", "大腿骨固定", "タイプ", "大腿骨タイプその他", "材質", "大腿骨サイズ", "脛骨固定", "脛骨ベアリング", "脛骨インサート", "脛骨インサートその他", "脛骨サイズ", "膝蓋骨インプラント"] },
    { code: "D30", header: "退院_", columns: ["可動域", "可動域点数", "屈曲角度", "屈曲角度点数", "伸展角度", "伸展角度点数"] },
    { code: "D36", header: "退院_", columns: ["疼痛有無", "疼痛1_area", "疼痛1_side", "疼痛1_x", "疼痛1_y", "疼痛2_area", "疼痛2_side", "疼痛2_x", "疼痛2_y", "疼痛3_area", "疼痛3_side", "疼痛3_x", "疼痛3_y", "疼痛4_area", "疼痛4_side", "疼痛4_x", "疼痛4_y", "疼痛5_area", "疼痛5_side", "疼痛5_x", "疼痛5_y", "疼痛6_area", "疼痛6_side", "疼痛6_x", "疼痛6_y", "疼痛7_area", "疼痛7_side", "疼痛7_x", "疼痛7_y", "疼痛8_area", "疼痛8_side", "疼痛8_x", "疼痛8_y", "疼痛9_area", "疼痛9_side", "疼痛9_x", "疼痛9_y", "疼痛10_area", "疼痛10_side", "疼痛10_x", "疼痛10_y", "疼痛画像", "所見"] },
    { code: "D101", header: "退院_", columns: ["BBS立位保持", "BBS両手前方", "BBS拾い上げ", "BBS振り返り", "BBS方向転換", "BBS方向転換_注釈", "BBS踏み台昇降", "BBSタンデム立位_患側後", "BBSタンデム立位_健側後", "BBS片足立位_患側", "BBS片足立位_健側", "BBS"] },

    //---- E:３か月 --------------------//
    { code: "E19", header: "3m_", columns: ["UCLA"] },
    { code: "E21", header: "3m_", columns: ["Charnley", "アライメント_角度", "アライメント_判定", "アライメント_点数", "動揺性_内外距離", "動揺性_内外", "動揺性_点数", "動揺性_前後距離", "動揺性_前後", "動揺性_点数", "合計_膝状態"] },
    { code: "E30", header: "3m_", columns: ["可動域", "可動域点数", "屈曲角度", "屈曲角度点数", "伸展角度", "伸展角度点数"] },
    { code: "E36", header: "3m_", columns: ["疼痛有無", "疼痛1_area", "疼痛1_side", "疼痛1_x", "疼痛1_y", "疼痛2_area", "疼痛2_side", "疼痛2_x", "疼痛2_y", "疼痛3_area", "疼痛3_side", "疼痛3_x", "疼痛3_y", "疼痛4_area", "疼痛4_side", "疼痛4_x", "疼痛4_y", "疼痛5_area", "疼痛5_side", "疼痛5_x", "疼痛5_y", "疼痛6_area", "疼痛6_side", "疼痛6_x", "疼痛6_y", "疼痛7_area", "疼痛7_side", "疼痛7_x", "疼痛7_y", "疼痛8_area", "疼痛8_side", "疼痛8_x", "疼痛8_y", "疼痛9_area", "疼痛9_side", "疼痛9_x", "疼痛9_y", "疼痛10_area", "疼痛10_side", "疼痛10_x", "疼痛10_y", "疼痛画像", "所見"] },
    //{ code: "E55", header: "3m_", columns: ["疼痛_歩行", "階段疼痛", "違和感", "合計_膝症状", "満足度_椅子", "満足度_腹臥位", "満足度_起立時", "満足度_家事", "満足度_娯楽", "合計_満足度", "期待", "期待_通常動作", "期待_レジャー", "合計_期待", "歩行時_器具", "補助_車椅子", "補助_歩行器", "補助_松葉杖2本", "補助_T字杖2本", "補助_松葉杖1本", "補助_T字杖1本", "補助_サポーター", "補助_その他_選択", "補助_その他_内容", "合計_補助", "膝が悪いため", "立位時間", "歩行時間", "合計_歩行機能", "段差歩行時", "進行方向変更時", "階段昇降時", "起立時", "乗降時_車", "横向移動時", "合計_基本動作", "踏み台", "買い物時", "しゃがみこむ時", "ひざまづく時", "走る時", "合計_応用動作", "スイミング", "ゴルフ", "サイクリング", "園芸作業", "ボーリング", "テニス", "ウォーキング", "ダンス", "ストレッチ", "娯楽_その他_選択", "娯楽_その他_内容", "ウェイトリフティング", "レッグエクステンション", "ステップマシン", "エアロバイク", "レッグプレス", "ジョギング", "エリプティカルトレーナー", "エアロビクス", "筋トレ_その他_選択", "筋トレ_その他_内容", "運動1", "運動1_困難度", "運動1_点数", "運動2", "運動2_困難度", "運動2_点数", "運動3", "運動3_困難度", "運動3_点数", "合計_運動"] },
    { code: "E55", header: "3m_", columns: ["疼痛_歩行", "階段疼痛", "違和感", "合計_膝症状", "満足度_椅子", "満足度_腹臥位", "満足度_起立時", "満足度_家事", "満足度_娯楽", "合計_満足度", "期待", "期待_通常動作", "期待_レジャー", "合計_期待", "歩行時_器具", "補助_車椅子", "補助_歩行器", "補助_松葉杖2本", "補助_T字杖2本", "補助_松葉杖1本", "補助_T字杖1本", "補助_サポーター", "補助_その他_選択", "補助_その他_内容", "合計_補助", "膝が悪いため", "立位時間", "歩行時間", "合計_歩行機能", "段差歩行時", "進行方向変更時", "階段昇降時", "起立時", "乗降時_車", "横向移動時", "合計_基本動作", "踏み台", "買い物時", "しゃがみこむ時", "ひざまづく時", "走る時", "合計_応用動作", "スイミング", "ゴルフ", "サイクリング", "園芸作業", "ボーリング", "テニス", "ウォーキング", "ダンス", "ストレッチ", "ゲートボール", "ハイキング", "ウェイトリフティング", "レッグエクステンション", "ステップマシン", "エアロバイク", "レッグプレス", "ジョギング", "エリプティカルトレーナー", "エアロビクス", "運動1", "運動1_困難度", "運動1_点数", "運動2", "運動2_困難度", "運動2_点数", "運動3", "運動3_困難度", "運動3_点数", "合計_運動"] },
    { code: "E101", header: "3m_", columns: ["BBS立位保持", "BBS両手前方", "BBS拾い上げ", "BBS振り返り", "BBS方向転換", "BBS方向転換_注釈", "BBS踏み台昇降", "BBSタンデム立位_患側後", "BBSタンデム立位_健側後", "BBS片足立位_患側", "BBS片足立位_健側", "BBS"] },

    //---- F:６か月 --------------------//
    { code: "F19", header: "6m_", columns: ["UCLA"] },
    { code: "F21", header: "6m_", columns: ["Charnley", "アライメント_角度", "アライメント_判定", "アライメント_点数", "動揺性_内外距離", "動揺性_内外", "動揺性_点数", "動揺性_前後距離", "動揺性_前後", "動揺性_点数", "合計_膝状態"] },
    { code: "F30", header: "6m_", columns: ["可動域", "可動域点数", "屈曲角度", "屈曲角度点数", "伸展角度", "伸展角度点数"] },
    { code: "F36", header: "6m_", columns: ["疼痛有無", "疼痛1_area", "疼痛1_side", "疼痛1_x", "疼痛1_y", "疼痛2_area", "疼痛2_side", "疼痛2_x", "疼痛2_y", "疼痛3_area", "疼痛3_side", "疼痛3_x", "疼痛3_y", "疼痛4_area", "疼痛4_side", "疼痛4_x", "疼痛4_y", "疼痛5_area", "疼痛5_side", "疼痛5_x", "疼痛5_y", "疼痛6_area", "疼痛6_side", "疼痛6_x", "疼痛6_y", "疼痛7_area", "疼痛7_side", "疼痛7_x", "疼痛7_y", "疼痛8_area", "疼痛8_side", "疼痛8_x", "疼痛8_y", "疼痛9_area", "疼痛9_side", "疼痛9_x", "疼痛9_y", "疼痛10_area", "疼痛10_side", "疼痛10_x", "疼痛10_y", "疼痛画像", "所見"] },
    //{ code: "F55", header: "6m_", columns: ["疼痛_歩行", "階段疼痛", "違和感", "合計_膝症状", "満足度_椅子", "満足度_腹臥位", "満足度_起立時", "満足度_家事", "満足度_娯楽", "合計_満足度", "期待", "期待_通常動作", "期待_レジャー", "合計_期待", "歩行時_器具", "補助_車椅子", "補助_歩行器", "補助_松葉杖2本", "補助_T字杖2本", "補助_松葉杖1本", "補助_T字杖1本", "補助_サポーター", "補助_その他_選択", "補助_その他_内容", "合計_補助", "膝が悪いため", "立位時間", "歩行時間", "合計_歩行機能", "段差歩行時", "進行方向変更時", "階段昇降時", "起立時", "乗降時_車", "横向移動時", "合計_基本動作", "踏み台", "買い物時", "しゃがみこむ時", "ひざまづく時", "走る時", "合計_応用動作", "スイミング", "ゴルフ", "サイクリング", "園芸作業", "ボーリング", "テニス", "ウォーキング", "ダンス", "ストレッチ", "娯楽_その他_選択", "娯楽_その他_内容", "ウェイトリフティング", "レッグエクステンション", "ステップマシン", "エアロバイク", "レッグプレス", "ジョギング", "エリプティカルトレーナー", "エアロビクス", "筋トレ_その他_選択", "筋トレ_その他_内容", "運動1", "運動1_困難度", "運動1_点数", "運動2", "運動2_困難度", "運動2_点数", "運動3", "運動3_困難度", "運動3_点数", "合計_運動"] },
    { code: "F55", header: "6m_", columns: ["疼痛_歩行", "階段疼痛", "違和感", "合計_膝症状", "満足度_椅子", "満足度_腹臥位", "満足度_起立時", "満足度_家事", "満足度_娯楽", "合計_満足度", "期待", "期待_通常動作", "期待_レジャー", "合計_期待", "歩行時_器具", "補助_車椅子", "補助_歩行器", "補助_松葉杖2本", "補助_T字杖2本", "補助_松葉杖1本", "補助_T字杖1本", "補助_サポーター", "補助_その他_選択", "補助_その他_内容", "合計_補助", "膝が悪いため", "立位時間", "歩行時間", "合計_歩行機能", "段差歩行時", "進行方向変更時", "階段昇降時", "起立時", "乗降時_車", "横向移動時", "合計_基本動作", "踏み台", "買い物時", "しゃがみこむ時", "ひざまづく時", "走る時", "合計_応用動作", "スイミング", "ゴルフ", "サイクリング", "園芸作業", "ボーリング", "テニス", "ウォーキング", "ダンス", "ストレッチ", "ゲートボール", "ハイキング", "ウェイトリフティング", "レッグエクステンション", "ステップマシン", "エアロバイク", "レッグプレス", "ジョギング", "エリプティカルトレーナー", "エアロビクス", "運動1", "運動1_困難度", "運動1_点数", "運動2", "運動2_困難度", "運動2_点数", "運動3", "運動3_困難度", "運動3_点数", "合計_運動"] },
    { code: "F101", header: "6m_", columns: ["BBS立位保持", "BBS両手前方", "BBS拾い上げ", "BBS振り返り", "BBS方向転換", "BBS方向転換_注釈", "BBS踏み台昇降", "BBSタンデム立位_患側後", "BBSタンデム立位_健側後", "BBS片足立位_患側", "BBS片足立位_健側", "BBS"] },

    //---- G:12か月 --------------------//
    { code: "G19", header: "12m_", columns: ["UCLA"] },
    { code: "G21", header: "12m_", columns: ["Charnley", "アライメント_角度", "アライメント_判定", "アライメント_点数", "動揺性_内外距離", "動揺性_内外", "動揺性_点数", "動揺性_前後距離", "動揺性_前後", "動揺性_点数", "合計_膝状態"] },
    { code: "G30", header: "12m_", columns: ["可動域", "可動域点数", "屈曲角度", "屈曲角度点数", "伸展角度", "伸展角度点数"] },
    { code: "G36", header: "12m_", columns: ["疼痛有無", "疼痛1_area", "疼痛1_side", "疼痛1_x", "疼痛1_y", "疼痛2_area", "疼痛2_side", "疼痛2_x", "疼痛2_y", "疼痛3_area", "疼痛3_side", "疼痛3_x", "疼痛3_y", "疼痛4_area", "疼痛4_side", "疼痛4_x", "疼痛4_y", "疼痛5_area", "疼痛5_side", "疼痛5_x", "疼痛5_y", "疼痛6_area", "疼痛6_side", "疼痛6_x", "疼痛6_y", "疼痛7_area", "疼痛7_side", "疼痛7_x", "疼痛7_y", "疼痛8_area", "疼痛8_side", "疼痛8_x", "疼痛8_y", "疼痛9_area", "疼痛9_side", "疼痛9_x", "疼痛9_y", "疼痛10_area", "疼痛10_side", "疼痛10_x", "疼痛10_y", "疼痛画像", "所見"] },
    { code: "G39", header: "12m_", columns: ["HKA"] },
    { code: "G40", header: "12m_", columns: ["PCO", "MaxAP", "PCOR", "FTPO"] },
    { code: "G44", header: "12m_", columns: ["mFCA", "mTCA"] },
    { code: "G46", header: "12m_", columns: ["γangle", "δangle", "LatFTA"] },
    //{ code: "G55", header: "12m_", columns: ["疼痛_歩行", "階段疼痛", "違和感", "合計_膝症状", "満足度_椅子", "満足度_腹臥位", "満足度_起立時", "満足度_家事", "満足度_娯楽", "合計_満足度", "期待", "期待_通常動作", "期待_レジャー", "合計_期待", "歩行時_器具", "補助_車椅子", "補助_歩行器", "補助_松葉杖2本", "補助_T字杖2本", "補助_松葉杖1本", "補助_T字杖1本", "補助_サポーター", "補助_その他_選択", "補助_その他_内容", "合計_補助", "膝が悪いため", "立位時間", "歩行時間", "合計_歩行機能", "段差歩行時", "進行方向変更時", "階段昇降時", "起立時", "乗降時_車", "横向移動時", "合計_基本動作", "踏み台", "買い物時", "しゃがみこむ時", "ひざまづく時", "走る時", "合計_応用動作", "スイミング", "ゴルフ", "サイクリング", "園芸作業", "ボーリング", "テニス", "ウォーキング", "ダンス", "ストレッチ", "娯楽_その他_選択", "娯楽_その他_内容", "ウェイトリフティング", "レッグエクステンション", "ステップマシン", "エアロバイク", "レッグプレス", "ジョギング", "エリプティカルトレーナー", "エアロビクス", "筋トレ_その他_選択", "筋トレ_その他_内容", "運動1", "運動1_困難度", "運動1_点数", "運動2", "運動2_困難度", "運動2_点数", "運動3", "運動3_困難度", "運動3_点数", "合計_運動"] },
    { code: "G55", header: "12m_", columns: ["疼痛_歩行", "階段疼痛", "違和感", "合計_膝症状", "満足度_椅子", "満足度_腹臥位", "満足度_起立時", "満足度_家事", "満足度_娯楽", "合計_満足度", "期待", "期待_通常動作", "期待_レジャー", "合計_期待", "歩行時_器具", "補助_車椅子", "補助_歩行器", "補助_松葉杖2本", "補助_T字杖2本", "補助_松葉杖1本", "補助_T字杖1本", "補助_サポーター", "補助_その他_選択", "補助_その他_内容", "合計_補助", "膝が悪いため", "立位時間", "歩行時間", "合計_歩行機能", "段差歩行時", "進行方向変更時", "階段昇降時", "起立時", "乗降時_車", "横向移動時", "合計_基本動作", "踏み台", "買い物時", "しゃがみこむ時", "ひざまづく時", "走る時", "合計_応用動作", "スイミング", "ゴルフ", "サイクリング", "園芸作業", "ボーリング", "テニス", "ウォーキング", "ダンス", "ストレッチ", "ゲートボール", "ハイキング", "ウェイトリフティング", "レッグエクステンション", "ステップマシン", "エアロバイク", "レッグプレス", "ジョギング", "エリプティカルトレーナー", "エアロビクス", "運動1", "運動1_困難度", "運動1_点数", "運動2", "運動2_困難度", "運動2_点数", "運動3", "運動3_困難度", "運動3_点数", "合計_運動"] },
    { code: "G101", header: "12m_", columns: ["BBS立位保持", "BBS両手前方", "BBS拾い上げ", "BBS振り返り", "BBS方向転換", "BBS方向転換_注釈", "BBS踏み台昇降", "BBSタンデム立位_患側後", "BBSタンデム立位_健側後", "BBS片足立位_患側", "BBS片足立位_健側", "BBS"] },

    //---- H:24か月 --------------------//
    { code: "H19", header: "24m_", columns: ["UCLA"] },
    { code: "H21", header: "24m_", columns: ["Charnley", "アライメント_角度", "アライメント_判定", "アライメント_点数", "動揺性_内外距離", "動揺性_内外", "動揺性_点数", "動揺性_前後距離", "動揺性_前後", "動揺性_点数", "合計_膝状態"] },
    { code: "H30", header: "24m_", columns: ["可動域", "可動域点数", "屈曲角度", "屈曲角度点数", "伸展角度", "伸展角度点数"] },
    { code: "H36", header: "24m_", columns: ["疼痛有無", "疼痛1_area", "疼痛1_side", "疼痛1_x", "疼痛1_y", "疼痛2_area", "疼痛2_side", "疼痛2_x", "疼痛2_y", "疼痛3_area", "疼痛3_side", "疼痛3_x", "疼痛3_y", "疼痛4_area", "疼痛4_side", "疼痛4_x", "疼痛4_y", "疼痛5_area", "疼痛5_side", "疼痛5_x", "疼痛5_y", "疼痛6_area", "疼痛6_side", "疼痛6_x", "疼痛6_y", "疼痛7_area", "疼痛7_side", "疼痛7_x", "疼痛7_y", "疼痛8_area", "疼痛8_side", "疼痛8_x", "疼痛8_y", "疼痛9_area", "疼痛9_side", "疼痛9_x", "疼痛9_y", "疼痛10_area", "疼痛10_side", "疼痛10_x", "疼痛10_y", "疼痛画像", "所見"] },
    { code: "H39", header: "24m_", columns: ["HKA"] },
    { code: "H40", header: "24m_", columns: ["PCO", "MaxAP", "PCOR", "FTPO"] },
    { code: "H44", header: "24m_", columns: ["mFCA", "mTCA"] },
    { code: "H46", header: "24m_", columns: ["γangle", "δangle", "LatFTA"] },
    //{ code: "H55", header: "24m_", columns: ["疼痛_歩行", "階段疼痛", "違和感", "合計_膝症状", "満足度_椅子", "満足度_腹臥位", "満足度_起立時", "満足度_家事", "満足度_娯楽", "合計_満足度", "期待", "期待_通常動作", "期待_レジャー", "合計_期待", "歩行時_器具", "補助_車椅子", "補助_歩行器", "補助_松葉杖2本", "補助_T字杖2本", "補助_松葉杖1本", "補助_T字杖1本", "補助_サポーター", "補助_その他_選択", "補助_その他_内容", "合計_補助", "膝が悪いため", "立位時間", "歩行時間", "合計_歩行機能", "段差歩行時", "進行方向変更時", "階段昇降時", "起立時", "乗降時_車", "横向移動時", "合計_基本動作", "踏み台", "買い物時", "しゃがみこむ時", "ひざまづく時", "走る時", "合計_応用動作", "スイミング", "ゴルフ", "サイクリング", "園芸作業", "ボーリング", "テニス", "ウォーキング", "ダンス", "ストレッチ", "娯楽_その他_選択", "娯楽_その他_内容", "ウェイトリフティング", "レッグエクステンション", "ステップマシン", "エアロバイク", "レッグプレス", "ジョギング", "エリプティカルトレーナー", "エアロビクス", "筋トレ_その他_選択", "筋トレ_その他_内容", "運動1", "運動1_困難度", "運動1_点数", "運動2", "運動2_困難度", "運動2_点数", "運動3", "運動3_困難度", "運動3_点数", "合計_運動"] },
    { code: "H55", header: "24m_", columns: ["疼痛_歩行", "階段疼痛", "違和感", "合計_膝症状", "満足度_椅子", "満足度_腹臥位", "満足度_起立時", "満足度_家事", "満足度_娯楽", "合計_満足度", "期待", "期待_通常動作", "期待_レジャー", "合計_期待", "歩行時_器具", "補助_車椅子", "補助_歩行器", "補助_松葉杖2本", "補助_T字杖2本", "補助_松葉杖1本", "補助_T字杖1本", "補助_サポーター", "補助_その他_選択", "補助_その他_内容", "合計_補助", "膝が悪いため", "立位時間", "歩行時間", "合計_歩行機能", "段差歩行時", "進行方向変更時", "階段昇降時", "起立時", "乗降時_車", "横向移動時", "合計_基本動作", "踏み台", "買い物時", "しゃがみこむ時", "ひざまづく時", "走る時", "合計_応用動作", "スイミング", "ゴルフ", "サイクリング", "園芸作業", "ボーリング", "テニス", "ウォーキング", "ダンス", "ストレッチ", "ゲートボール", "ハイキング", "ウェイトリフティング", "レッグエクステンション", "ステップマシン", "エアロバイク", "レッグプレス", "ジョギング", "エリプティカルトレーナー", "エアロビクス", "運動1", "運動1_困難度", "運動1_点数", "運動2", "運動2_困難度", "運動2_点数", "運動3", "運動3_困難度", "運動3_点数", "合計_運動"] },
    { code: "H101", header: "24m_", columns: ["BBS立位保持", "BBS両手前方", "BBS拾い上げ", "BBS振り返り", "BBS方向転換", "BBS方向転換_注釈", "BBS踏み台昇降", "BBSタンデム立位_患側後", "BBSタンデム立位_健側後", "BBS片足立位_患側", "BBS片足立位_健側", "BBS"] }

];

Csv.output = function () {

    // 【０】初期化
    Csv.header = [];        // CSV見出し行の格納用配列
    Csv.rows = [];          // CSVレコードの格納用配列
    Csv.totalTitle = Csv.isTest ? "合計：" : "";

    // 【１】CSVの見出し行を作成
    $.each(Csv.categories, function (i, cat) {
        var head = cat.header;
        var cols = cat.columns;
        $.each(cols, function (i, col) {
            Csv.header.push(head + col);
        });
    });

    // 【２】症例ごとのレコードを作成
    var patientsData = App.loadObject("patients");
    $.each(patientsData.rows, function (index, item) {
        Csv.rows.push({
            patient: {
                sec: item.sec,              // 連番
                number: item.number,        // 患者登録番号
                //id: item.id,                // 患者ID
                id: "",                // 患者ID
                initial: item.initial,      // イニシャル
            },
            data: {}                        // 回答データの格納場所
        });
    });

    // 【３】回答データを「症例別・カテゴリ別」に集約
    $.each(Csv.rows, function (index, row) {

        var sec = row.patient.sec;
        console.log("【Patients " + sec + "】");
        // 症例ごとの回答
        var answers = App.loadObject("answers_" + row.patient.sec);

        // カテゴリ記号順に変換実行
        $.each(Csv.categories, function (index, category) {
            category.sec = sec;
            var code = category.code;
            var ans = answers[code];                        // 回答オブジェクト ・・・ { "1": "2015-02-13", "2": "Yes,No", ... }
            //console.log(code + "山田3" + answers[code]);
            var data = Csv.convertAnswers(ans, category);   // 変換結果の配列　 ・・・ ["2015-02-13", "Yes", "No", "No", "Yes", ... ]
            row.data[code] = data;                          // 結果を格納　　　 ・・・ data["A01"] = ["2015-02-13", "Yes", "No", "No", "Yes", ... ]
            console.log({ code: code, cols: category.columns.length, data: data, source: ans });
        });
    });

    // 【４】最終結果を出力（症例ごとに１レコード化）
    $.each(Csv.rows, function (index, row) {
        var csvRow = [];
        // 患者インデックスの出力
        Csv.pushAll(csvRow, row.patient, ["sec", "number", "id", "initial"]);
        // 回答データの出力
        $.each(Csv.categories, function (i, cat) {
            if (cat.code != "000") {
                Csv.pushAll(csvRow, row.data[cat.code]);
            }
            //console.log(cat.code+"山田2" + row.data[cat.code]);
        });
        row.csvRow = csvRow;
    });
    console.log(Csv.rows);

    // 【５】最終的な出力用のCSVテキストを作成
    var csvDatas = [];
    csvDatas.push(Csv.header.join(","));        // 見出し行（カンマ区切り）
    $.each(Csv.rows, function (i, rec) {
        csvDatas.push(rec.csvRow.join(","));    // データ行（カンマ区切り）
    });
    var csvText = csvDatas.join("\r\n");        // 最終結果（改行区切り）

    // 【６】ネイティブ連携（作成したデータ配列「Csv.texts」をネイティブに渡す）
    var loginID = $("#item-Login1").val();//ログインIDを取得

    var dt = new Date();
    var fileName = [
        //"data_",
        loginID,
        '_',
        dt.getFullYear(),
        ("0" + (dt.getMonth() + 1)).substr(-2, 2),
        ("0" + dt.getDate()).substr(-2, 2),
        ("0" + dt.getHours()).substr(-2, 2),
        ("0" + dt.getMinutes()).substr(-2, 2),
        //("0" + dt.getSeconds()).substr(-2, 2),
        ".csv"
    ].join("");
    //alert(fileName);




    // 【７】CSVファイルのダウンロード 

    if (Csv.isTest) {
        //Webテスト用
        Csv.downloadFile(csvText, fileName);
        $.mobile.loading("hide");
        $('[data-role="page"]').removeClass('ui-disabled');//ページを有効にする
    } else {
        //モバイル端末用
        var imageData = App.loadObject("imageData");            // 元の保存データ（全画像）
        //Resonanceにローカルcsv pngファイル作成依頼
        //Resonance.request({ method: 'App.createCSV', csvText: csvText, csvFileName: fileName, imageData: imageData, callback: 'Csv.exeLater' });
        Resonance.request({ method: 'App.createCSV', csvText: csvText, csvFileName: fileName, callback: 'Csv.exeLater' });
    }
    /*
    if (Csv.isTest) {
        var dt = new Date();
        var fileName = [
            "data_",
            dt.getFullYear(),
            ("0" + (dt.getMonth() + 1)).substr(-2, 2),
            ("0" + dt.getDate()).substr(-2, 2),
            ("0" + dt.getHours()).substr(-2, 2),
            ("0" + dt.getMinutes()).substr(-2, 2),
            ("0" + dt.getSeconds()).substr(-2, 2),
            ".csv"
        ].join("");
        Csv.downloadFile(csvText, fileName);
    }
    */
};

//ネイティブでの処理、終了後のCSVファイルの保存結果判定
Csv.exeLater = function (obj) {
    if (obj.csvResult) {//csv出力に失敗した場合
        App.alert("出力エラー", obj.csvResult);
    } else if (obj.pngResult) {//画像出力に失敗した場合
        App.alert("出力エラー", obj.pngResult);
    } else {//成功した場合
        App.alert("ＣＳＶ出力", "ＣＳＶファイルを生成しました");
    }
    $.mobile.loading("hide");
    $('[data-role="page"]').removeClass('ui-disabled');//ページを有効にする
};
// 配列への連続Push
Csv.pushAll = function (ary, obj, keys) {
    if (keys) {
        // オブジェクト型（連想配列）
        $.each(keys, function (i, key) {
            var val = obj[key];
            if (typeof val == "number") {
                ary.push(val);
            } else {
                val = val.replace(/\"/g, "”");
                ary.push('"' + val + '"');
            }
        });
    } else {
        // 通常の配列
        $.each(obj, function (i, el) { ary.push(el); });
    }
};

// フォームごとのデータ変換 
Csv.convertAnswers = function (ans, category) {
    var ary = [];

    // CSV出力用の回答データを作成
    for (key in ans) {                      // フォーム内の全設問について連続実行（key:設問番号）
        var data = ans[key];                // 回答データ（生データ）
        var func = Csv.functions[key];      // 設問番号に対応する変換関数を取得
        if (func) {
            func(ary, data, ans, category); // 変換処理（ary：結果出力先配列、data：回答データ、ans：全回答データ）
        }
    }

    // 回答要素数をチェック
    var columns = category.columns.length;
    if (ary.length != columns && category.code != "000") {
        // 不備があればエラーデータとしてコンソール出力
        console.log({ code: category.code, errData: ary, length: ary.length });
        // CSVの全列に空文字をセット ・・・一時登録のデータもCSVに出力して欲しいとの要望のため、回答数が0の場合のみ空白をセット　20150310　山田
        //ary = [];
        //for (i = 0; i < columns; i++) { ary.push(""); }

        if (ary.length == 0) {
            ary = [];
            for (i = 0; i < columns; i++) { ary.push(""); }
        }
    }

    return ary;
};

// ファイル・ダウンロード（http://d.hatena.ne.jp/do_aki/20130225/1361763613）
Csv.downloadFile = function (csvText, fileName) {

    // BOM付きCSVファイルの元となるBlobを作成
    var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    var blob = new Blob([bom, csvText], { type: 'text/csv' });

    // (4) BlobURLを構築
    var url = (window.URL || window.webkitURL).createObjectURL(blob);

    // (5) Blob URL をダウンロードさせるリンクを作る
    var a = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
    a.href = url;
    a.download = fileName;

    // (6) リンクを自動クリック
    var e = document.createEvent("MouseEvents");
    e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
};


//------------------------------------------------------------
// 変換関数の共通部品
//------------------------------------------------------------

// 何もせずスルーする
Csv.none = function () {
};

// そのまま出力
Csv.direct = function (ary, data, ans) {
    ary.push(data);
};

// カンマで分割し要素数の分だけ出力
Csv.splitData = function (ary, data, ans) {
    var d = data.split(",");
    $.each(d, function (index, item) {
        ary.push(item);
    });
};

// カンマで分割し要素数の分だけ出力するとともに、Yesを１、Noを０に変換
Csv.splitAndConv = function (ary, data, asn) {
    var dic = { "Yes": "1", "No": "0" };
    var d = data.split(",");
    $.each(d, function (index, item) {
        var val = dic[item] || "";
        ary.push(val);
    });
};

// 文字型ならゼロを出力 空白の場合は空白のまま登録するように変更 20150313　山田
Csv.stringToZero = function (ary, data) {
    var val = $.isNumeric(data) ? data : "0";
    val = data ? val : "";
    ary.push(val);
};

// 指定された項目の値を合算
Csv.sum = function (ans, nums) {
    var total = 0;
    //var sumNotFlg = false;
    try {
        $.each(nums, function (i, num) {
            if (!ans[num]) { total = "N/A"; return false; }//空白がある場合N/Aを返す 20150313　山田
            var val = $.isNumeric(ans[num]) ? ans[num] : "0";
            total += Number(val);
        });
    } catch (e) {
        console.log(e.message);
        //total = 0;
        total = "N/A";
    }
    return total;
};

//------------------------------------------------------------
//
// 変換関数
//
//------------------------------------------------------------
Csv.functions = {

    // 症例背景（1～14）--------------------------------------------------------------------------------
    "1": Csv.direct,
    "2": Csv.splitData,
    "3": Csv.splitAndConv,
    "4": Csv.direct,
    "5": Csv.direct,
    "6": Csv.direct,
    "7": Csv.direct,
    "8": Csv.direct,
    "9": Csv.direct,
    "10": Csv.direct,
    "11": Csv.direct,
    "12": function (ary, data, ans) { ary.push(data); ary.push(ans["12-else"] || ""); },
    "12-else": Csv.none,
    "13": function (ary, data, ans) { ary.push(data); ary.push(ans["13-else"] || ""); },
    "13-else": Csv.none,
    "14": function (ary, data, ans) { Csv.splitData(ary, data, ans); ary.push(ans["14-else"] || ""); },
    "14-else": Csv.none,

    // NKSS基本情報（15～18）--------------------------------------------------------------------------------
    "15": Csv.direct,
    "16": Csv.direct,
    "17": Csv.direct,
    "18": Csv.direct,

    // UCLA（19）--------------------------------------------------------------------------------
    "19": Csv.direct,

    // 退院時報告（20-01～20-42）--------------------------------------------------------------------------------
    "20-01": Csv.direct,
    "20-02": Csv.direct,
    "20-03": Csv.direct,
    "20-04": Csv.direct,
    "20-05": Csv.direct,
    "20-06": Csv.direct,
    "20-07": Csv.direct,
    "20-08": Csv.direct,
    "20-09": Csv.direct,
    //"20-10": Csv.direct, //説明文で使用しているIDのため、CSV出力はしない　コメント化
    "20-11": Csv.direct,
    "20-12": Csv.direct,
    "20-13": Csv.splitData,
    "20-14": Csv.direct,
    "20-15": Csv.direct,
    "20-16": Csv.splitData,
    "20-17": Csv.direct,
    "20-18": Csv.direct,
    "20-19": Csv.splitData,
    "20-20": Csv.splitData,
    "20-21a": Csv.splitData,
    "20-21b": Csv.splitData,
    "20-22": Csv.splitData,
    "20-25": Csv.direct,
    "20-26": Csv.direct,
    "20-28": Csv.direct,
    "20-29": Csv.direct,
    "20-31": Csv.direct,
    "20-32": Csv.direct,
    "20-33": Csv.direct,
    "20-33": function (ary, data, ans) { ary.push(data); ary.push(ans["20-33-else"] || ""); },
    "20-34": Csv.direct,
    "20-35": Csv.direct,
    "20-38": Csv.direct,
    "20-39": Csv.direct,
    "20-40": Csv.direct,
    "20-40": function (ary, data, ans) { ary.push(data); ary.push(ans["20-40-else"] || ""); },
    "20-41": Csv.direct,
    "20-42": Csv.direct,

    // NKSS膝の状態（21～29）--------------------------------------------------------------------------------
    "21": Csv.direct,
    //    "22": function (ary, data, ans) { var dic = { "1": "内反", "2": "外反" }; ary.push(dic[data]); },
    "23": function (ary, data, ans) {
        ary.push(ans["23"] || "");              // 角度を出力
        var rank = "";
        var score = 0;
        var mode = ans["22"] || "1";            // 内反外反区分
        var val = Number(ans["23"] || "0");     // 角度
        if (mode == "1") { val = val * (-1); }  // 内反ならマイナス値
        if (val < 2) { rank = "2"; score = -10; }
        else if (val <= 10) { rank = "1"; score = 25; }
        else { rank = "3"; score = -10; }
        var rankDic = { "1": "正常", "2": "内反", "3": "外反" };
        //角度が未入力の場合空白をセット 20150313　山田
        if (!ans["23"]) {
            ary.push("");                // 判定文字を出力
            ary.push("");                   // スコアを出力            
        } else {
            ary.push(rankDic[rank]);                // 判定文字を出力
            ary.push("" + score);                   // スコアを出力
        }
        Csv.total = score;
    },
    "25": function (ary, data, ans) {
        ary.push(ans["25"] || "");
        var rank = "";
        var score = 0;
        var val = Number(ans["25"] || "0");
        if (val == 0) { rank = "1"; score = 15; }
        else if (val < 5) { rank = "2"; score = 10; }
        else if (val == 5) { rank = "3"; score = 5; }
        else { rank = "4"; score = 0; }
        var rankDic = { "1": "正常", "2": "軽度", "3": "中等度", "4": "高度" };
        //距離が未入力の場合空白をセット 20150313　山田
        if (!ans["25"]) {
            ary.push("");                // 判定文字を出力
            ary.push("");                   // スコアを出力            
        } else {
            ary.push(rankDic[rank]);
            ary.push("" + score);
        }
        Csv.total += score;
    },
    "27": function (ary, data, ans) {
        ary.push(ans["27"] || "");
        var rank = "";
        var score = 0;
        var val = Number(ans["27"] || "0");
        if (val == 0) { rank = "1"; score = 10; }
        else if (val <= 5) { rank = "2"; score = 5; }
        else { rank = "3"; score = 0; }
        var rankDic = { "1": "正常", "2": "中等度", "3": "高度" };
        //距離が未入力の場合空白をセット 20150313　山田
        if (!ans["27"]) {
            ary.push("");                // 判定文字を出力
            ary.push("");                   // スコアを出力            
        } else {
            ary.push(rankDic[rank]);
            ary.push("" + score);
        }
        // 合計スコア
        Csv.total += score;
        //角度・距離が未入力の場合N/Aをセット 20150313
        if (!ans["23"] || !ans["25"] || !ans["27"]) {
            Csv.total = "N/A";
        }
        ary.push("" + Csv.total);
    },

    // 関節可動域（30～35）
    "30": function (ary, data, ans) {
        ary.push(ans["30"] || "");
        var val = Number(ans["30"] || "0");
        var ansVal = Math.floor(val / 5);
        if (ansVal < 0) { ansVal = 0; }
        if (!ans["30"]) { ansVal = ""; } //未入力の場合空白をセット 20150313　山田
        ary.push("" + ansVal);
    },
    "32": function (ary, data, ans) {
        ary.push(ans["32"] || "");
        var val = Number(ans["32"] || "0");
        var ansVal = 0;
        if (val <= 0) { ansVal = 0; }
        else if (val <= 5) { ansVal = -2; }
        else if (val <= 10) { ansVal = -5; }
        else if (val <= 15) { ansVal = -10; }
        else { ansVal = -15; }
        if (!ans["32"]) { ansVal = ""; } //未入力の場合空白をセット 20150313　山田
        ary.push("" + ansVal);
    },
    "34": function (ary, data, ans) {
        ary.push(ans["34"] || "");
        var val = Number(ans["34"] || "0");
        var ansVal = 0;
        if (val < 10) { ansVal = -5; }
        else if (val <= 20) { ansVal = -10; }
        else { ansVal = -15; }
        if (!ans["34"]) { ansVal = ""; } //未入力の場合空白をセット 20150313　山田
        ary.push("" + ansVal);
    },

    // 疼痛（36～38）--------------------------------------------------------------------------------
    "36": function (ary, data, ans, category) {
        // 有無の出力
        var dic = { "1": "有", "2": "無" };
        ary.push(dic[data] || "");

        // 点座標の出力
        var pains = ans["37"] ? ans["37"].split(",") : [];
        for (i = pains.length; i < 10; i++) {
            pains.push(":::");
        }
        for (i = 0; i < 10; i++) {
            var w = pains[i].split(":");
            ary.push(w[1]);       // area
            ary.push(w[0]);       // side
            ary.push(w[2]);       // x
            ary.push(w[3]);       // y
        }

        // 画像名の出力
        ary.push(["", category.sec, "_", category.header, "Pain.png"].join(""));

        // 所感の出力
        ary.push(ans["38"] || "");
    },

    // 膝関節正面アライメント（39）--------------------------------------------------------------------------------
    "39": Csv.direct,

    // 膝関節側面アライメント（40～43）--------------------------------------------------------------------------------
    "40": Csv.direct,
    "41": Csv.direct,
    "42": Csv.direct,
    "43": Csv.direct,

    // 人工関節正面アライメント（44～45）--------------------------------------------------------------------------------
    "44": Csv.direct,
    "45": Csv.direct,

    // 人工関節側面アライメント（46～48）--------------------------------------------------------------------------------
    "46": Csv.direct,
    "47": Csv.direct,
    "48": Csv.direct,

    // NKSS術前術後（55～100）--------------------------------------------------------------------------------
    "55": Csv.direct,
    "56": Csv.direct,
    "57": function (ary, data, ans) {
        ary.push(data);
        //58
        ary.push(Csv.totalTitle + Csv.sum(ans, ["55", "56", "57"]));
    },
    "59": Csv.direct,
    "60": Csv.direct,
    "61": Csv.direct,
    "62": Csv.direct,
    "63": function (ary, data, ans) {
        ary.push(data);
        //64
        ary.push(Csv.totalTitle + Csv.sum(ans, ["59", "60", "61", "62", "63"]));
    },
    "65": Csv.direct,
    "66": Csv.direct,
    "67": function (ary, data, ans) {
        ary.push(data);
        //68
        ary.push(Csv.totalTitle + Csv.sum(ans, ["65", "66", "67"]));
    },
    "69": Csv.direct,
    "70": Csv.direct,
    "71": function (ary, data, ans) {
        ary.push(data);
        //72
        ary.push(Csv.totalTitle + Csv.sum(ans, ["69", "70", "71"]));
    },
    "73": Csv.direct,
    "74": function (ary, data, ans) {

        // Yes/Noとその他テキストの分割（その他テキストがない場合、要素数を埋め合わせ）
        var w = data.split(",");
        if (w.length < 9) {
            for (i = w.length; i < 9; i++) { w.push(""); }
            data = w.join(",");
        }
        Csv.splitData(ary, data, ans);
        // 点数の計算
        var scores = [-10, -8, -8, -6, -4, -4, -2, 0];
        var score = 0;
        jQuery.each(w, function (i, item) {
            if (item == "Yes") {
                var s = scores[i];
                if (s < score) { score = s; }
            }
        });
        score = w[0] ? score : "N/A";//選択されていない場合、N/Aを挿入　20150313　山田
        ary.push(Csv.totalTitle + score);
        Csv.ans74 = score;
    },
    "75": function (ary, data, ans) {
        var dic = { "1": "はい", "2": "いいえ" };
        ary.push(dic[data] || "");
    },
    "76": Csv.direct,
    "77": function (ary, data, ans) {
        ary.push(data);
        // 合計値の計算
        var ans74 = $.isNumeric(ans["74"]) ? Number(ans["74"]) : 0;
        var ans76 = $.isNumeric(ans["76"]) ? Number(ans["76"]) : 0;
        var ans77 = $.isNumeric(ans["77"]) ? Number(ans["77"]) : 0;
        var score = ans74 + ans76 + ans77;
        score = ans["77"] ? score : "N/A";//選択されていない場合、N/Aを挿入　20150313　山田
        ary.push(Csv.totalTitle + score);
    },
    "79": Csv.stringToZero,
    "80": Csv.stringToZero,
    "81": Csv.stringToZero,
    "82": Csv.stringToZero,
    "83": Csv.stringToZero,
    "84": function (ary, data, ans) {
        Csv.stringToZero(ary, data);
        //85
        ary.push(Csv.totalTitle + Csv.sum(ans, ["79", "80", "81", "82", "83", "84"]));
    },
    "86": Csv.stringToZero,
    "87": Csv.stringToZero,
    "88": Csv.stringToZero,
    "90": Csv.stringToZero,
    "91": function (ary, data, ans) {
        Csv.stringToZero(ary, data);
        //92
        ary.push(Csv.totalTitle + Csv.sum(ans, ["86", "87", "88", "90", "91"]));
    },
    "93": function (ary, data, ans) {
        Csv.activeNames = [];
        //var menu = ["スイミング", "ゴルフ（18ホール）", "サイクリング（30分）", "園芸作業", "ボーリング", "テニス", "ウォーキング", "ダンス／バレエ", "ストレッチ運動（筋肉をほぐす運動）", "その他", "ウェイトリフティング", "レッグエクステンション", "ステップマシン", "エアロバイク（固定式自転こぎ）", "レッグプレス", "ジョギング", "エリプティカル・トレーナー", "エアロビクス", "その他", "", ""];
        var menu = ["スイミング", "ゴルフ（18ホール）", "サイクリング（30分）", "園芸作業", "ボーリング", "テニス", "ウォーキング", "ダンス／バレエ", "ストレッチ運動（筋肉をほぐす運動）", "ゲートボール", "ハイキング", "ウェイトリフティング", "レッグエクステンション", "ステップマシン", "エアロバイク（固定式自転こぎ）", "レッグプレス", "ジョギング", "エリプティカル・トレーナー", "エアロビクス"];
        //var inp = data ? data.split(",") : ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
        //var inp = data ? data.split(",") : ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
        var inp = data ? data.split(",") : ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
        //var order = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 19, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20]; // 出力順インデックス
        //var order = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]; // 出力順インデックス
        var order = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]; // 出力順インデックス
        $.each(order, function (idx, i) {
            // 「Yes」か「No」を出力
            ary.push(inp[i]);
            // 「Yes」のとき運動名称を記憶
            if (inp[i] == "Yes") { Csv.activeNames.push(menu[i]); }
        });
    },
    "94": function (ary, data, ans) {
        //var dic = { "5": "全く問題ない", "4": "わずかに困難", "3": "少し困難", "2": "困難", "1": "非常に困難", "0": "全くできない（膝が悪いため）", "-1": "いままでにこの動作をしたことがない" };
        var dic = { "5": "問題ない", "4": "少し困難", "3": "ある程度困難", "2": "とても困難", "1": "極めて困難", "0": "できない", "-1": "やったことがない" };
        var scores = data ? data.split(",") : [];
        if (Csv.activeNames.length == 3 && scores.length == 3) {
            $.each(scores, function (index, s) {
                ary.push(Csv.activeNames[index]);   // 選択された運動の名称
                ary.push(dic[s]);                   // 困難の程度（選択肢文字）
                ary.push(s);                        // 困難の程度（数字）
            });
        } else {
            // ダミーのカラムで埋める
            //初期値に空文字を一つ追加しているため、10から9に変更　20150313　山田
            //for (i = 0; i < 10; i++) { ary.push(""); }
            for (i = 0; i < 9; i++) { ary.push(""); }
        }
        // 合計点
        var total = 0;
        $.each(scores, function (idx, s) { total += Number(s); });
        total = (Csv.activeNames.length == 3 && scores.length == 3) ? total : "N/A";
        ary.push(Csv.totalTitle + total);
    },


    // BBS（101b～109）--------------------------------------------------------------------------------
    "101b": Csv.direct,
    "102b": Csv.direct,
    "103b": Csv.direct,
    "104b": Csv.direct,
    "105b": function (ary, data, ans) { ary.push(data); ary.push(ans["105b-text"] || ""); },
    "105b-text": Csv.none,
    "106b": Csv.direct,
    "107b1": Csv.direct,
    "107b2": Csv.direct,
    "108b1": Csv.direct,
    "108b2": function (ary, data, ans) {
        ary.push(data);
        ary.push("" + Csv.sum(ans, ["101b", "102b", "103b", "104b", "105b", "106b", "107b1", "107b2", "108b1", "108b2"]));
    },

    // 終了--------------------------------------------------------------------------------
    "999": ""
};
