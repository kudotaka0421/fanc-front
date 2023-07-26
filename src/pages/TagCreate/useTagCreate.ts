import { useAlertStore } from "@/store/alert";
import { useRouter } from "vue-router";
import { Tag } from "@/types/tag";
import { onMounted } from "vue";
import { createAxiosInstance } from "@/utils/axiosinstance";
import { useMeStore } from "@/store/me";

export function useTagCreate() {
    const alertStore = useAlertStore();
    const router = useRouter();
    const axiosInstance = createAxiosInstance();
    const meStore = useMeStore();

    const pages = [
        { name: "タグ一覧", href: "/tags", current: false },
        { name: "タグ新規作成", href: "tagCreate", current: true },
    ];

    const tag = {
        id: 0,
        text: "",
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

    const createTag = async (params: Tag) => {
        try {
            await axiosInstance.post("tag", params);
            alertStore.showSuccessAlert();
            router.push("/tags");
        } catch (err) {
            alertStore.showErrorAlert();
        }
    };

    onMounted(async () => {
        await fetchMe();
    });
    return { pages, tag, createTag };
}
