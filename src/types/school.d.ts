export type Tag = {
    id: number;
    name: string;
};

export type School = {
    id: number;
    isShow: boolean; // 画面表示
    name: string; // スクール名
    monthlyFee: string; //月額料金
    termNum: string; //期間(数値)
    termUnit: number; // 1:週, 2:月
    remarks?: string; //備考
    overview: string; //概要
    imageLinks: string[]; // 画像付きリンク
    link: string; //リンク(ボタンやメールリンクに使用)
    recommendations: string[]; //おすすめポイント
    features: string[]; //特徴
    tags: Tag[]; //タグ
    selectedTagIds: number[]; //選択されたタグのID
    mailText: string; //メール本文
};
