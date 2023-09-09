import { useRouter } from "vue-router";
import { School } from "@/types/school";
import { ref, onMounted } from "vue";
import { useAlertStore } from "@/store/alert";
import { createAxiosInstance } from "@/utils/axiosinstance";
import { useMeStore } from "@/store/me";

export function useSchools() {
    const alertStore = useAlertStore();
    const router = useRouter();
    const pages = [{ name: "スクール一覧", href: "/schools", current: true }];
    const axiosInstance = createAxiosInstance();
    const meStore = useMeStore();

    const schools = ref<School[]>([]);

    const fetchSchools = async () => {
        try {
            const { data } = await axiosInstance.get("school");
            schools.value = data;
        } catch (err) {
            alertStore.showErrorAlert();
        }
    };

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
        await fetchSchools();
    });

    return { pages, schools };
}
