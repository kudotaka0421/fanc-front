import axios from "axios";
import { useRouter } from "vue-router";
import { useAlertStore } from "../../store/alert";
import { School, SchoolParams } from "../../types/school";
import { ref } from "vue";

export function useSchoolCreate() {
    const alertStore = useAlertStore();
    const router = useRouter();

    const pages = [
        { name: "スクールを探す", href: "/schools", current: false },
        { name: "スクール新規作成", href: "schoolCreate", current: true },
    ];

    const school = ref<School>({
        id: null,
        isShow: true,
        name: "",
        monthlyFee: "",
        termNum: "",
        termUnit: 1,
        overview: "",
        remarks: "",
        imageLinks: [],
        link: "",
        recommendations: [],
        features: [],
        tags: [
            { id: 1, name: "オンライン通学可能1" },
            { id: 2, name: "就職に強い1" },
            { id: 3, name: "働きながら学習可能1" },
            { id: 4, name: "オンライン通学可能2" },
            { id: 5, name: "就職に強い2" },
            { id: 6, name: "働きながら学習可能2" },
            { id: 7, name: "オンライン通学可能3" },
            { id: 8, name: "就職に強い3" },
            { id: 9, name: "働きながら学習可能3" },
            { id: 10, name: "オンライン通学可能4" },
            { id: 11, name: "就職に強い4" },
            { id: 12, name: "働きながら学習可能4" },
            { id: 13, name: "オンライン通学可能5" },
            { id: 14, name: "就職に強い5" },
            { id: 15, name: "働きながら学習可能5" },
            { id: 16, name: "オンライン通学可能6" },
            { id: 17, name: "就職に強6" },
            { id: 18, name: "働きながら学習可能6" },
            { id: 19, name: "オンライン通学可能7" },
            { id: 20, name: "就職に強い7" },
            { id: 21, name: "働きながら学習可能7" },
            { id: 22, name: "オンライン通学可能8" },
            { id: 23, name: "就職に強い8" },
            { id: 24, name: "働きながら学習可能8" },
            { id: 25, name: "オンライン通学可能9" },
            { id: 26, name: "就職に強い9" },
            { id: 27, name: "働きながら学習可能9" },
            { id: 28, name: "オンライン通学可能10" },
            { id: 29, name: "就職に強い10" },
            { id: 30, name: "働きながら学習可能10" },
        ],
        selectedTagIds: [],
        mailText: "",
    });

    const createSchool = async (params: SchoolParams) => {
        try {
            await axios.post("http://localhost:8080/api/school", params);
            alertStore.showSuccessAlert();
            router.push("/schools");
        } catch (err) {
            alertStore.showErrorAlert();
        }
    };

    return { pages, school, createSchool };
}
