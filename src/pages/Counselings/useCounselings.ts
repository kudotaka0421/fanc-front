import { useAlertStore } from "@/store/alert";
import { useMeStore } from "@/store/me";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { createAxiosInstance } from "@/utils/axiosinstance";
export function useCounselings() {
    const pages = [
        { name: "カウンセリング一覧", href: "/counselings", current: true },
    ];
    const router = useRouter();

    const axiosInstance = createAxiosInstance();

    const alertStore = useAlertStore();
    const meStore = useMeStore();

    const fetchMe = async () => {
        try {
            const { data } = await axiosInstance.get("/me");
            meStore.setMe(data);
        } catch (err) {
            alertStore.showErrorAlert();
            router.push("/error");
        }
    };

    onMounted(async () => {
        await fetchMe();
    });

    return { pages };
}
