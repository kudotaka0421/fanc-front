export type Tag = {
    id: number;
    name: string;
};

export type School = {
    id: number;
    status: number; //ステータス(enum 0:非表示, 1:表示)
    name: string; // スクール名
    monthlyFee: number; //月額料金
    termNum: number; //期間(数値)
    termUnit: string; //期間(単位)
    overview: string; //概要
    remarks?: string; //備考
    imageLink: string[]; // 画像付きリンク
    link: string; //リンク(ボタンやメールリンクに使用)
    recommendations: string[]; //おすすめポイント
    features: string[]; //特徴
    tags: Tag[]; //タグ
    selectedTagIds: number[]; //選択されたタグのID
    mailText: string; //メール本文
};
