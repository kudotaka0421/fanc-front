import { useRouter } from "vue-router";
import { useAlertStore } from "@/store/alert";
import { School, SchoolParams } from "@/types/school";
import { Tag } from "@/types/tag";
import { ref, onMounted } from "vue";
import { createAxiosInstance } from "@/utils/axiosinstance";

export function useSchoolCreate() {
    const alertStore = useAlertStore();
    const router = useRouter();
    const axiosInstance = createAxiosInstance();

    const pages = [
        { name: "スクール一覧", href: "/schools", current: false },
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

    const tagOptions = ref<Tag[]>([]);

    const createSchool = async (params: SchoolParams) => {
        try {
            await axiosInstance.post("school", params);
            alertStore.showSuccessAlert();
            router.push("/schools");
        } catch (err) {
            alertStore.showErrorAlert();
        }
    };

    const fetchTagOptions = async () => {
        try {
            const { data } = await axiosInstance.get("tag");
            tagOptions.value = data;
        } catch (err) {
            alertStore.showErrorAlert();
        }
    };

    onMounted(async () => {
        await fetchTagOptions();
    });
    return { pages, school, tagOptions, createSchool };
}
