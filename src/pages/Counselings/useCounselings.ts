import { useAlertStore } from "@/store/alert";
import { Counseling } from "@/types/counseling";
import { ref, onMounted } from "vue";
import { createAxiosInstance } from "@/utils/axiosinstance";

export function useCounselings() {
    const alertStore = useAlertStore();

    const pages = [
        { name: "カウンセリング一覧", href: "/counselings", current: true },
    ];
    const axiosInstance = createAxiosInstance();

    const counselings = ref<Counseling[]>([]);

    const fetchCounselings = async () => {
        try {
            const { data } = await axiosInstance.get("/counseling");
            counselings.value = data;
        } catch (err) {
            alertStore.showErrorAlert();
        }
    };

    onMounted(async () => {
        await fetchCounselings();
    });

    return { pages, counselings };
}
