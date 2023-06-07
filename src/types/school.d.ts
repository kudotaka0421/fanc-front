export type Tag = {
    id: number;
    text: string;
};

export type School = {
    id: number | null;
    isShow: boolean; // 画面表示
    name: string; // スクール名
    monthlyFee: string; //月額料金
    termNum: string; //期間(数値)
    termUnit: number; // 1:週, 2:月
    remarks: string; //備考
    overview: string; //概要
    imageLinks: string[]; // 画像付きリンク
    link: string; //リンク(ボタンやメールリンクに使用)
    recommendations: string[]; //おすすめポイント
    features: string[]; //特徴
    tags: Tag[]; //選択されたタグ一覧
    selectedTagIds: number[]; //選択されたタグのID
};

// ↑から「tags: Tag[]; //タグ」を削除した内容
export type SchoolParams = {
    id: number | null;
    isShow: boolean; // 画面表示
    name: string; // スクール名
    monthlyFee: number; //月額料金
    termNum: number; //期間(数値)
    termUnit: number; // 1:週, 2:月
    remarks: string | null; //備考
    overview: string; //概要
    imageLinks: string[]; // 画像付きリンク
    link: string; //リンク(ボタンやメールリンクに使用)
    recommendations: string[]; //おすすめポイント
    features: string[]; //特徴
    selectedTagIds: number[]; //選択されたタグのID
};
