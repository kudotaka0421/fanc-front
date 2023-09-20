import { useRouter } from "vue-router";
import { useAlertStore } from "@/store/alert";
import { Counseling, CounselingParams } from "@/types/counseling";
import { School } from "@/types/school";
import { User, userRole } from "@/types/user";
import { ref, onMounted } from "vue";
import { createAxiosInstance } from "@/utils/axiosinstance";

export function useCounselingCreate() {
    const alertStore = useAlertStore();
    const router = useRouter();
    const axiosInstance = createAxiosInstance();

    const pages = [
        { name: "カウンセリング一覧", href: "/counselings", current: false },
        {
            name: "カウンセリング新規作成",
            href: "counselingCreate",
            current: true,
        },
    ];

    const counseling = ref<Counseling>({
        id: null,
        counseleeName: "",
        email: "",
        status: 1,
        date: null,
        remarks: "",
        message: "",
        user: {
            name: "",
            email: "",
            password: "",
            role: userRole.Staff,
        },
        selectedSchoolIds: [],
    });

    const schoolOptions = ref<School[]>([]);
    const userOptions = ref<User[]>([]);

    const createCounseling = async (params: CounselingParams) => {
        debugger;
        try {
            await axiosInstance.post("counseling", params);
            alertStore.showSuccessAlert();
            router.push("/counselings");
        } catch (err) {
            alertStore.showErrorAlert();
        }
    };

    const fetchSchoolOptions = async () => {
        try {
            const { data } = await axiosInstance.get("school");
            schoolOptions.value = data;
        } catch (err) {
            alertStore.showErrorAlert();
        }
    };

    const fetchUserOptions = async () => {
        try {
            const { data } = await axiosInstance.get("/user");
            userOptions.value = data;
        } catch (err) {
            alertStore.showErrorAlert();
        }
    };

    onMounted(async () => {
        await fetchSchoolOptions();
        await fetchUserOptions();
    });
    return { pages, counseling, schoolOptions, userOptions, createCounseling };
}
