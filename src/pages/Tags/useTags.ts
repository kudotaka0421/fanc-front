import { useAlertStore } from "@/store/alert";
import { Tag } from "@/types/tag";
import { ref, onMounted } from "vue";
import { createAxiosInstance } from "@/utils/axiosinstance";
export function useTags() {
    const pages = [{ name: "タグ一覧", href: "/tags", current: true }];

    const axiosInstance = createAxiosInstance();

    const alertStore = useAlertStore();

    const tags = ref<Tag[]>([]);

    const fetchTags = async () => {
        try {
            const { data } = await axiosInstance.get("/tag");
            tags.value = data;
        } catch (err) {
            alertStore.showErrorAlert();
        }
    };

    onMounted(async () => {
        await fetchTags();
    });

    return { pages, tags };
}
