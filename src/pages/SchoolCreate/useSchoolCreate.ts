import { School } from "../../types/school";

export function useSchoolCreate() {
    const pages = [
        { name: "スクールを探す", href: "/schools", current: false },
        { name: "スクール新規作成", href: "schoolCreate", current: true },
    ];

    const school: School = {
        id: 0,
        status: 0, //ステータス(enum 0:非表示, 1:表示)
        name: "", // スクール名
        monthlyFee: 0, //月額料金
        termNum: 0, //期間(数値)
        termUnit: "", //期間(単位)
        overview: "", //概要
        remarks: "", //備考
        imageLink: [], // 画像付きリンク
        link: "", //リンク(ボタンやメールリンクに使用)
        recommendations: [], //おすすめポイント
        features: [], //特徴
        tags: [], //タグ
        selectedTagIds: [], //選択されたタグのID
        mailText: "", //メール本文
    };

    return { pages, school };
}
