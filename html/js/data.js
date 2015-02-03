﻿var data = {

    "55": {
        number: "55",
        title: "平地歩行時の疼痛",
        description: "平行歩行時の疼痛",
        type: "SH",
        options: "0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:10",
        param: "minText:'痛みなし',maxText:'非常に痛い'",
        sound: "55.mp3",
        require: true
    },

    "56": {
        number: "56",
        title: "階段昇降/坂道歩行時の疼痛",
        description: "階段昇降または坂道歩行時の疼痛",
        type: "SH",
        options: "0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:10",
        param: "minText:'痛みなし',maxText:'非常に痛い'",
        sound: "56.mp3",
        require: true
    },

    "57": {
        number: "57",
        title: "違和感",
        description: "あなたの膝は違和感なく普通の感じがしますか？",
        type: "SH",
        options: "5:いつも,3:ときどき,0:全くない",
        sound: "57.mp3",
        require: true
    },

    "58": {
        number: "58",
        title: "合計：膝の症状",
        description: "合計：膝の症状",
        type: "DN",
        memo: "55から57までの点数合計"
    },

    "59": {
        number: "59",
        title: "椅子に座っている時の満足度",
        description: "椅子に座っている時、膝の痛みに関してどの程度満足していますか?",
        type: "SH",
        options: "8:非常に満足,6:満足,4:普通,2:不満,0:非常に不満",
        sound: "59.mp3",
        require: true
    },

    "60": {
        number: "60",
        title: "横たわっている時の満足度",
        description: "ベッドに横たわっている時、膝の痛みに関してどの程度満足していますか?",
        type: "SH",
        options: "8:非常に満足,6:満足,4:普通,2:不満,0:非常に不満",
        sound: "60.mp3",
        require: true
    },

    "61": {
        number: "61",
        title: "立ち上がる動作の満足度",
        description: "ベッドから立ち上がる動作で、膝の痛みに関してどの程度満足していますか？",
        type: "SH",
        options: "8:非常に満足,6:満足,4:普通,2:不満,0:非常に不満",
        sound: "61.mp3",
        require: true
    },

    "62": {
        number: "62",
        title: "家事を行う際の満足度",
        description: "軽度の家事を行う際、膝の痛みに関してどの程度満足していますか？",
        type: "SH",
        options: "8:非常に満足,6:満足,4:普通,2:不満,0:非常に不満",
        sound: "62.mp3",
        require: true
    },

    "63": {
        number: "63",
        title: "娯楽活動を行う際の満足度",
        description: "お出かけやレジャーなどの娯楽活動を行う際、膝の痛みに関してどの程度満足していますか？",
        type: "SH",
        options: "8:非常に満足,6:満足,4:普通,2:不満,0:非常に不満",
        sound: "63.mp3",
        require: true
    },

    "64": {
        number: "64",
        title: "合計：満足度",
        description: "合計：満足度",
        type: "DN",
        memo: "59から63までの点数合計"
    },

    "65": {
        number: "65",
        title: "痛みがとれることを期待（術前）",
        description: "痛みがとれることを期待していますか？",
        type: "SV",
        options: "1:全く期待していない。,2:少し期待している。,3:多少期待している。,4:適度に期待している。,5:かなり期待している。",
        sound: "65.mp3",
        require: true
    },

    "66": {
        number: "66",
        title: "通常の動作ができることを期待（術前）",
        description: "日常生活で通常の動作ができることを期待していますか？",
        type: "SV",
        options: "1:全く期待していない。,2:少し期待している。,3:多少期待している。,4:適度に期待している。,5:かなり期待している。",
        sound: "66.mp3",
        require: true
    },

    "67": {
        number: "67",
        title: "レジャー等の期待（術前）",
        description: "レジャー、娯楽、スポーツを行えることを期待していますか？",
        type: "SV",
        options: "1:全く期待していない。,2:少し期待している。,3:多少期待している。,4:適度に期待している。,5:かなり期待している。",
        sound: "67.mp3",
        require: true
    },

    "68": {
        number: "68",
        title: "合計：期待度PreOp",
        description: "合計：期待度PreOp",
        type: "DN",
        memo: "65から67までの点数合計"
    },

    "69": {
        number: "69",
        title: "痛みがとれることを期待（術後）",
        description: "人工膝関節置換術による除痛（ 痛みがとれる）効果への期待はいかがでしたか？",
        type: "SV",
        options: "1:期待しすぎていた。思っていたよりも、除痛効果はかなり低かった。,2:期待しすぎていた。思っていたよりも除痛効果は少し低かった。,3:同じくらい。ほぼ期待したとおりの除痛効果が得られた。,4:あまり期待していなかったが、思っていたよりも除痛効果は少し高かった。,5:あまり期待していなかったが、思っていたよりも除痛効果はかなり高かった。",
        sound: "69.mp3",
        require: true
    },

    "70": {
        number: "70",
        title: "通常の動作ができることを期待（術後）",
        description: "日常生活での通常の動作ができることへの期待はいかがでしたか？",
        type: "SV",
        options: "1:期待しすぎていた。思っていたよりも、かなりできなかった。,2:期待しすぎていた。思っていたよりも、少しできなかった。,3:同じくらい。ほぼ期待したとおりの結果が得られた。,4:あまり期待していなかったが、思っていたよりも少しできるようになった。,5:あまり期待していなかったが、思っていたよりもかなりできるようになった。",
        sound: "70.mp3",
        require: true
    },

    "71": {
        number: "71",
        title: "レジャー等の期待（術後）",
        description: "レジャー、娯楽、スポーツを行えることへの期待はいかがでしたか？",
        type: "SV",
        options: "1:期待しすぎていた。思っていたよりも、かなりできなかった。,2:期待しすぎていた。思っていたよりも、少しできなかった。,3:同じくらい。ほぼ期待したとおりの結果が得られた。,4:あまり期待していなかったが、思っていたよりも少しできるようになった。,5:あまり期待していなかったが、思っていたよりもかなりできるようになった。",
        sound: "71.mp3",
        require: true
    },

    "72": {
        number: "72",
        title: "合計：期待度PostOp",
        description: "合計：期待度PostOp",
        type: "DN",
        memo: "69から71までの点数合計"
    },

    "73": {
        number: "73",
        title: "器具に頼らなくても歩く事",
        description: "あなたは杖（つえ）や車いすなどの器具に頼らなくても歩く事ができますか？",
        type: "SH",
        options: "Yes:はい,No:いいえ",
        sound: "73.mp3",
        onclick: "entry_55.goSkip();",
        require: true
    },

    "74": {
        number: "74",
        title: "補助器具",
        description: "いいえの場合、以下のどのような補助器具を使用していますか？（複数回答可）",
        type: "MV",
        options: "1:車いす,2:歩行器／シニアカー／押し車,3:松葉杖2本,4:Ｔ字杖2本,5:松葉杖1本,6:Ｔ字杖1本,7:膝サポーター／装具,8:その他",
        memo: "「器具に頼らなくても歩く事」がいいえの場合、必須入力",
        sound: "74.mp3",
        require: true
    },

    "75": {
        number: "75",
        title: "膝が悪いため",
        description: "あなたが上記の補助機部を使うのは膝が悪いためですか？",
        type: "SH",
        options: "1:はい,2:いいえ",
        sound: "75.mp3",
        require: true
    },

    "76": {
        number: "76",
        title: "どれくらいの時間立てますか",
        description: "あなたはどれくらいの時間立っていることができますか？（膝のぐあいが悪いために座ってしまうまでの時間のことです。補助器具を使用していてもかまいません）",
        type: "SV",
        options: "0:立っていることができない,3:0-5分,6:6-15分,9:16-30分,12:31-60分,15:1時間以上",
        sound: "76.mp3",
        require: true
    },

    "77": {
        number: "77",
        title: "どれくらいの時間あるけますか",
        description: "あなたはどのくらいの時間歩くことができますか？（膝のぐあいが悪いために歩けなくなってしまうまでの時間のことです。補助器具を使用していてもかまいません）",
        type: "SV",
        options: "0:歩くことができない,3:0-5分,6:6-15分,9:16-30分,12:31-60分,15:1時間以上",
        sound: "77.mp3",
        require: true
    },

    "78": {
        number: "78",
        title: "合計：歩行・立位機能",
        description: "合計：歩行・立位機能",
        type: "DN",
        memo: "74から77までの点数合計"
    },

    "79": {
        number: "79",
        title: "段差の有る道を歩く時",
        description: "段差の有る道を歩く時",
        type: "SH",
        options: "5:全く問題ない<br/>　,4:わずかに困難<br/>　,3:少し困難<br/>　,2:困難<br/>　,1:非常に困難<br/>　,0:全くできない<br/>　,-1:いままでにこの動作を<br/>したことがない",
        sound: "79.mp3",
        require: true
    },

    "80": {
        number: "80",
        title: "進行方向を変える時",
        description: "進行方向を変える時",
        type: "SH",
        options: "5:全く問題ない<br/>　,4:わずかに困難<br/>　,3:少し困難<br/>　,2:困難<br/>　,1:非常に困難<br/>　,0:全くできない<br/>　,-1:いままでにこの動作を<br/>したことがない",
        sound: "80.mp3",
        require: true
    },

    "81": {
        number: "81",
        title: "階段を昇り降りする時",
        description: "階段を昇り降りする時",
        type: "SH",
        options: "5:全く問題ない<br/>　,4:わずかに困難<br/>　,3:少し困難<br/>　,2:困難<br/>　,1:非常に困難<br/>　,0:全くできない<br/>　,-1:いままでにこの動作を<br/>したことがない",
        sound: "81.mp3",
        require: true
    },

    "82": {
        number: "82",
        title: "立ち上がる時",
        description: "立ち上がる時",
        type: "SH",
        options: "5:全く問題ない<br/>　,4:わずかに困難<br/>　,3:少し困難<br/>　,2:困難<br/>　,1:非常に困難<br/>　,0:全くできない<br/>　,-1:いままでにこの動作を<br/>したことがない",
        sound: "82.mp3",
        require: true
    },

    "83": {
        number: "83",
        title: "車に乗り降りする時",
        description: "車に乗り降りする時",
        type: "SH",
        options: "5:全く問題ない<br/>　,4:わずかに困難<br/>　,3:少し困難<br/>　,2:困難<br/>　,1:非常に困難<br/>　,0:全くできない<br/>　,-1:いままでにこの動作を<br/>したことがない",
        sound: "83.mp3",
        require: true
    },

    "84": {
        number: "84",
        title: "横向きに移動する時",
        description: "横向きに移動する時",
        type: "SH",
        options: "5:全く問題ない<br/>　,4:わずかに困難<br/>　,3:少し困難<br/>　,2:困難<br/>　,1:非常に困難<br/>　,0:全くできない<br/>　,-1:いままでにこの動作を<br/>したことがない",
        sound: "84.mp3",
        require: true
    },

    "85": {
        number: "85",
        title: "合計：基本的な動作",
        description: "合計：基本的な動作",
        type: "DN",
        memo: "79から84までの点数合計"
    },

    "86": {
        number: "86",
        title: "ハシゴや踏み台に登る時",
        description: "ハシゴや踏み台に登る時",
        type: "SH",
        options: "5:全く問題ない<br/>　,4:わずかに困難<br/>　,3:少し困難<br/>　,2:困難<br/>　,1:非常に困難<br/>　,0:全くできない<br/>　,-1:いままでにこの動作を<br/>したことがない",
        sound: "86.mp3",
        require: true
    },

    "87": {
        number: "87",
        title: "買い物袋を持って歩く時",
        description: "買い物袋を持って200m位歩く時",
        type: "SH",
        options: "5:全く問題ない<br/>　,4:わずかに困難<br/>　,3:少し困難<br/>　,2:困難<br/>　,1:非常に困難<br/>　,0:全くできない<br/>　,-1:いままでにこの動作を<br/>したことがない",
        sound: "87.mp3",
        require: true
    },

    "88": {
        number: "88",
        title: "しゃがみこむ時",
        description: "しゃがみこむ時",
        type: "SH",
        options: "5:全く問題ない<br/>　,4:わずかに困難<br/>　,3:少し困難<br/>　,2:困難<br/>　,1:非常に困難<br/>　,0:全くできない<br/>　,-1:いままでにこの動作を<br/>したことがない",
        sound: "88.mp3",
        require: true
    },

    "89": {
        number: "89",
        title: "歩く時",
        description: "歩く時",
        type: "SH",
        options: "5:全く問題ない<br/>　,4:わずかに困難<br/>　,3:少し困難<br/>　,2:困難<br/>　,1:非常に困難<br/>　,0:全くできない<br/>　,-1:いままでにこの動作を<br/>したことがない",
        require: true
    },

    "90": {
        number: "90",
        title: "ひざまずく時",
        description: "ひざまずく時",
        type: "SH",
        options: "5:全く問題ない<br/>　,4:わずかに困難<br/>　,3:少し困難<br/>　,2:困難<br/>　,1:非常に困難<br/>　,0:全くできない<br/>　,-1:いままでにこの動作を<br/>したことがない",
        sound: "90.mp3",
        require: true
    },

    "91": {
        number: "91",
        title: "走る時",
        description: "走る時",
        type: "SH",
        options: "5:全く問題ない<br/>　,4:わずかに困難<br/>　,3:少し困難<br/>　,2:困難<br/>　,1:非常に困難<br/>　,0:全くできない<br/>　,-1:いままでにこの動作を<br/>したことがない",
        sound: "91.mp3",
        require: true
    },

    "92": {
        number: "92",
        title: "合計：応用的な動作",
        description: "合計：応用的な動作",
        type: "DN",
        memo: "86から91までの点数合計"
    },

    "93": {
        number: "93",
        title: "膝の運動",
        description: "あなたにとって非常に重要だと思う活動を、以下の中から3つ選んでください。 （スポーツや娯楽活動・筋力トレーニングの中からあわせて3つ選んでください。）",
        type: "MV2",
        param: "category1:'スポーツや娯楽活動',category2:'スポーツジムでの器具を使った筋トレ運動',minSelect:3,maxSelect:3",
        options1: "10:スイミング,11:ゴルフ（18ホール）,12:サイクリング（30分）,13:園芸作業,14:ボーリング,15:テニス,16:ウォーキング,17:ダンス／バレエ,18:ストレッチ運動（筋肉をほぐす運動）,19:その他",
        options2: "20:ウェイトリフティング,21:レッグエクステンション,22:ステップマシン,23:エアロバイク（固定式自転こぎ）,24:レッグプレス,25:ジョギング,26:エリプティカル・トレーナー,27:エアロビクス,28:その他",
        memo: "３つまで"
    },

    "94": {
        number: "94",
        title: "困難の程度",
        description: "選択した3つの活動を行う際の困難の程度はどれくらいですか？",
        type: "SP94",
        options: "5:全く問題ない<br/>　,4:わずかに困難<br/>　,3:少し困難<br/>　,2:困難<br/>　,1:非常に困難<br/>　,0:全くできない<br/>（膝が悪いため）,-1:いままでにこの動作<br/>をしたことがない",
        memo: "93で選択された3つの回答を表示"
    },
    /*
                    "95": {
                        number: "95",
                        title: "困難の程度１、選択",
                        description: "[項目番号93から選択された３つの回答のうち一つを表示]",
                        type: "SH",
                        options: "5:全く問題ない,4:わずかに困難,3:少し困難,2:困難,1:非常に困難,0:全くできない（膝が悪いため）,0:いままでこの動作をしたことがない",
                        require: true
                    },
    
                    "96": {
                        number: "96",
                        title: "困難の程度２",
                        description: "困難の程度２",
                        type: "DT",
                        memo: "93で選択された３つの回答のうち一つを表示"
                    },
    
                    "97": {
                        number: "97",
                        title: "困難の程度２、選択",
                        description: "[項目番号93から選択された３つの回答のうち一つを表示]",
                        type: "SH",
                        options: "5:全く問題ない,4:わずかに困難,3:少し困難,2:困難,1:非常に困難,0:全くできない（膝が悪いため）,0:いままでこの動作をしたことがない",
                        require: true
                    },
    
                    "98": {
                        number: "98",
                        title: "困難の程度３",
                        description: "困難の程度３",
                        type: "DT",
                        memo: "93から選択された３つの回答のうち一つを表示"
                    },
    
                    "99": {
                        number: "99",
                        title: "困難の程度３、選択",
                        description: "[項目番号93から選択された３つの回答のうち一つを表示]",
                        type: "SH",
                        options: "5:全く問題ない,4:わずかに困難,3:少し困難,2:困難,1:非常に困難,0:全くできない（膝が悪いため）,0:いままでこの動作をしたことがない",
                        require: true
                    },
    */
    "100": {
        number: "100",
        title: "合計：膝の運動",
        description: "合計：膝の運動",
        type: "DN",
        memo: "困難の程度の点数３つを合計、ただし、困難程度１のみが回答されている場合、その点数を表示、困難程度１と２が回答されている場合、その平均を困難程度３の値として、合計を求める。３つ回答されている場合、３つの合計とする"
    }

};