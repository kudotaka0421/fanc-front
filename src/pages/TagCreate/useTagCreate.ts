import { useAlertStore } from "@/store/alert";
import { useRouter } from "vue-router";
import { Tag } from "@/types/tag";

import { createAxiosInstance } from "@/utils/axiosinstance";

export function useTagCreate() {
    const alertStore = useAlertStore();
    const router = useRouter();
    const axiosInstance = createAxiosInstance();

    const pages = [
        { name: "タグ一覧", href: "/tags", current: false },
        { name: "タグ新規作成", href: "tagCreate", current: true },
    ];

    const tag = {
        id: 0,
        text: "",
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

    return { pages, tag, createTag };
}
