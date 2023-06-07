import axios from "axios";
import { useRouter } from "vue-router";
import { useAlertStore } from "../../store/alert";
import { School, SchoolParams } from "../../types/school";
import { ref, onMounted } from "vue";

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
        tags: [],
        selectedTagIds: [],
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

    const fetchTags = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/api/tag");
            school.value.tags = data;
        } catch (err) {
            alertStore.showErrorAlert();
        }
    };

    onMounted(async () => {
        fetchTags();
    });
    return { pages, school, createSchool };
}
