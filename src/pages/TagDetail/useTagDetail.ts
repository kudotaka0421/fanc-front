import { useAlertStore } from "@/store/alert";
import { Tag } from "@/types/tag";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { createAxiosInstance } from "@/utils/axiosinstance";

export function useTagDetail() {
    const alertStore = useAlertStore();
    const router = useRouter();
    const axiosInstance = createAxiosInstance();

    const pages = [
        { name: "タグ一覧", href: "/tags", current: false },
        { name: "タグ詳細", href: "", current: true },
    ];
    const tagId = location.pathname.split("/")[2];

    const tag = ref<Tag>({
        id: 0,
        text: "",
    });

    const formType = ref<"view" | "edit">("view");

    const changeMode = (mode: "view" | "edit") => {
        formType.value = mode;
    };

    const fetchTag = async () => {
        try {
            const { data } = await axiosInstance.get(`/tag/${tagId}`);
            tag.value = data;
        } catch (err) {
            alertStore.showErrorAlert();
        }
    };

    const updateTag = async (params: Tag) => {
        try {
            await axiosInstance.put(`tag/${tagId}`, params);
            await fetchTag();
            formType.value = "view";
            alertStore.showSuccessAlert();
        } catch (err) {
            alertStore.showErrorAlert();
        }
    };

    const deleteTag = async () => {
        try {
            await axiosInstance.delete(`tag/${tagId}`);
            await fetchTag();
            alertStore.showSuccessAlert();
            router.push("/tags");
        } catch (err) {
            alertStore.showErrorAlert();
        }
    };

    onMounted(async () => {
        await fetchTag();
    });

    return { pages, tag, formType, updateTag, changeMode, deleteTag };
}
