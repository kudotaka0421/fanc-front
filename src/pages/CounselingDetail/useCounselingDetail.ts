import { useAlertStore } from "@/store/alert";
import { ref, onMounted } from "vue";
import { Counseling } from "@/types/counseling";
import { User, userRole } from "@/types/user";
import { School } from "@/types/school";
import { createAxiosInstance } from "@/utils/axiosinstance";
// import { useRouter } from "vue-router";

export function useCounselingDetail() {
    const alertStore = useAlertStore();
    // const router = useRouter();
    const axiosInstance = createAxiosInstance();

    const pages = [
        { name: "カウンセリング一覧", href: "/counselings", current: false },
        { name: "カウンセリング詳細", href: "", current: true },
    ];
    const counselingId = location.pathname.split("/")[2];

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

    const formType = ref<"view" | "edit">("view");

    const changeMode = (mode: "view" | "edit") => {
        formType.value = mode;
    };

    const fetchCounseling = async () => {
        try {
            const { data } = await axiosInstance.get(
                `/counseling/${counselingId}`
            );
            counseling.value = data;
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
        await fetchCounseling();
        await fetchSchoolOptions();
        await fetchUserOptions();
    });

    return {
        pages,
        counseling,
        formType,
        changeMode,
        schoolOptions,
        userOptions,
    };
}
