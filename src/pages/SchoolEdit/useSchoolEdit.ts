import { useAlertStore } from "@/store/alert";
import { School } from "@/types/school";
import { Tag } from "@/types/tag";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { createAxiosInstance } from "@/utils/axiosinstance";
import { useMeStore } from "@/store/me";

export function useSchoolEdit() {
    const alertStore = useAlertStore();
    const router = useRouter();
    const schoolId = location.pathname.split("/")[2];
    const axiosInstance = createAxiosInstance();
    const meStore = useMeStore();
    const pages = [
        { name: "スクール一覧", href: "/schools", current: false },
        { name: "スクール詳細", href: `/schools/${schoolId}`, current: false },
        { name: "スクール編集", href: "", current: false },
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

    const tagOptions = ref<Tag[]>([]);

    const goToSchoolDetail = () => {
        router.push(`/schools/${schoolId}`);
    };

    const fetchSchool = async () => {
        try {
            const { data } = await axiosInstance.get(`school/${schoolId}`);
            school.value = data;
        } catch (err) {
            alertStore.showErrorAlert();
        }
    };

    const fetchMe = async () => {
        try {
            const { data } = await axiosInstance.get("/me");
            meStore.setMe(data);
        } catch (err) {
            window.location.href = "/error";
            return;
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

    const updateSchool = async (params: School) => {
        try {
            await axiosInstance.put(`school/${schoolId}`, params);
            goToSchoolDetail();
            alertStore.showSuccessAlert();
        } catch (err) {
            alertStore.showErrorAlert();
        }
    };

    onMounted(async () => {
        await fetchMe();
        await fetchTagOptions();
        await fetchSchool();
    });

    return { pages, school, tagOptions, updateSchool, goToSchoolDetail };
}
