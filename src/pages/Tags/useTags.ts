import { useAlertStore } from "@/store/alert";
import { useMeStore } from "@/store/me";
import { Tag } from "@/types/tag";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { createAxiosInstance } from "@/utils/axiosinstance";
export function useTags() {
    const pages = [{ name: "タグ一覧", href: "/tags", current: true }];
    const router = useRouter();

    const axiosInstance = createAxiosInstance();

    const alertStore = useAlertStore();
    const meStore = useMeStore();
    const tags = ref<Tag[]>([]);

    const fetchMe = async () => {
        try {
            const { data } = await axiosInstance.get("/me");
            meStore.setMe(data);
        } catch (err) {
            alertStore.showErrorAlert();
            router.push("/error");
        }
    };

    const fetchTags = async () => {
        try {
            const { data } = await axiosInstance.get("/tag");
            tags.value = data;
        } catch (err) {
            alertStore.showErrorAlert();
            router.push("/lp");
        }
    };

    onMounted(async () => {
        await fetchMe();
        await fetchTags();
    });

    return { pages, tags };
}
