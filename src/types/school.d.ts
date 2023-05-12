export type School = {
    id: number;
    status: number; //ステータス(enum 0:非表示, 1:表示)
    name: string; // スクール名
    monthlyFee: number; //月額料金
    termNum: number; //期間値
    termUnit: string; //期間単位(週刊/ヶ月)
    overview: string; //概要
    remarks?: string; //備考
    imageLink: string[]; // 画像付きリンク
    link: string; //リンク(ボタンやメールリンクに使用)
    couponImage: string; //クーポン画像(S3のパス)
    recommendations: string[]; //おすすめポイント
    features: string[]; //特徴
    tags: string[]; //タグ
    // mailText: string; //メール本文
};
