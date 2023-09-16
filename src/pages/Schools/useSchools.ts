import { useRouter } from "vue-router";
import { School } from "@/types/school";
import { ref, onMounted } from "vue";
import { useAlertStore } from "@/store/alert";
import { createAxiosInstance } from "@/utils/axiosinstance";

export function useSchools() {
    const alertStore = useAlertStore();
    const router = useRouter();
    const pages = [{ name: "スクール一覧", href: "/schools", current: true }];
    const axiosInstance = createAxiosInstance();

    const schools = ref<School[]>([]);

    const fetchSchools = async () => {
        try {
            const { data } = await axiosInstance.get("school");
            schools.value = data;
        } catch (err) {
            alertStore.showErrorAlert();
        }
    };

    onMounted(async () => {
        await fetchSchools();
    });

    return { pages, schools };
}
