import axios from "axios";
import { ref, onMounted } from "vue";
import { School } from "../../types/school";
import { useAlertStore } from "../../store/alert";
import { useRouter } from "vue-router";

export function useSchoolDetail() {
    const router = useRouter();
    const alertStore = useAlertStore();
    const schoolId = location.pathname.split("/")[2];
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
        //↓「selectedTagIds」これ別に使わないんだよな。。リファクタできたらしたい
        selectedTagIds: [],
    });

    const fetchSchool = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:8080/api/school/${schoolId}`
            );
            school.value = data;
        } catch (err) {
            alertStore.showErrorAlert();
        }
    };

    const deleteSchool = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/school/${schoolId}`);
            alertStore.showSuccessAlert();
            router.push(`/schools`);
        } catch (err) {
            alertStore.showErrorAlert();
        }
    };

    onMounted(async () => {
        fetchSchool();
    });

    return { pages, school, deleteSchool };
}
