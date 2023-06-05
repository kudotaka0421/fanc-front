import { ref, onMounted } from "vue";
import { School } from "../../types/school";
export function useSchoolDetail() {
    const pages = [
        { name: "スクールを検索する", href: "/schools", current: false },
        { name: "スクール詳細", href: "", current: true },
    ];

    const school = ref<School>({
        id: 0,
        isShow: true,
        name: "",
        monthlyFee: "",
        termNum: "",
        termUnit: 1,
        overview: "",
        remarks: "",
        imageLinks: [],
        link: "",
        recommendations: ["a", "a", "a"],
        features: [],
        tags: [],
        selectedTagIds: [],
        mailText: "",
    });

    const mockSchoolData = ref<School>({
        id: 1,
        isShow: true,
        name: "サンプルTECHスクール",
        monthlyFee: "20000",
        termNum: "10",
        termUnit: 1,
        overview: `サンプルTECHスクールは、サンプル株式会社が運営するプログラミングスクールです。
        これまでに1000人以上の生徒を輩出しており、そのうち卒業生の9割が転職に成功しています。
        また、サンプル株式会社は、サンプルグループの中核企業であり、
        そのため、卒業生の約8割がサンプル株式会社に就職しています。`,
        imageLinks: [
            `<a href="https://px.a8.net/svt/ejp?a8mat=3T8NMV+BSI33M+4R90+5ZMCH" rel="nofollow">
            <img border="0" width="600" height="500" alt="" src="https://www29.a8.net/svt/bgt?aid=230511271713&wid=001&eno=01&mid=s00000022194001006000&mc=1"></a>
            <img border="0" width="1" height="1" src="https://www17.a8.net/0.gif?a8mat=3T8NMV+BSI33M+4R90+5ZMCH" alt="">`,
            `
                 <a href="https://px.a8.net/svt/ejp?a8mat=3T8NMV+BSI33M+4R90+609HT" rel="nofollow">
                <img border="0" width="300" height="180" alt="" src="https://www21.a8.net/svt/bgt?aid=230511271713&wid=001&eno=01&mid=s00000022194001009000&mc=1"></a>
                <img border="0" width="1" height="1" src="https://www19.a8.net/0.gif?a8mat=3T8NMV+BSI33M+4R90+609HT" alt="">`,
        ],
        link: "https://px.a8.net/svt/ejp?a8mat=3T8NMV+BSI33M+4R90+5YZ77",
        recommendations: [
            "自分のペースでプログラミングの基礎を学びたい人",
            "将来的なキャリアのためにスキルを身に付けたい人",
            "転職で使うポートフォリオを作成したい人",
        ],

        features: [
            "給付金制度活用で受講料が最大70",
            "対象者は実質価格197,340円~受講できる",
            "転職出来なければ全額返金保証あるので安心",
        ],
        tags: [
            { id: 1, name: "オンライン通学可能" },
            { id: 2, name: "就職に強い" },
            { id: 3, name: "働きながら学習可能" },
        ],
        selectedTagIds: [1, 2, 3],
        mailText: "aaa",
    });

    const fetchSchool = async () => {
        try {
            // ここでfetchのapiを叩く
            school.value = mockSchoolData.value;
        } catch (err) {
            // エラー処理かく
        }
    };

    onMounted(async () => {
        fetchSchool();
    });

    return { pages, school };
}
