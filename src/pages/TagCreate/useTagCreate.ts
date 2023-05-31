import axios from "axios";
import { useAlertStore } from "../../store/alert";
import { useRouter } from "vue-router";
import { Tag } from "../../types/tag";

export function useTagCreate() {
    const alertStore = useAlertStore();
    const router = useRouter();

    const pages = [
        { name: "タグ一覧", href: "/tags", current: false },
        { name: "タグ新規作成", href: "tagCreate", current: true },
    ];

    const tag = {
        text: "",
    };

    const createTag = async (params: Tag) => {
        try {
            await axios.post("http://localhost:8080/api/tag", params);
            alertStore.showSuccessAlert();
            router.push("/tags");
        } catch (err) {
            alertStore.showErrorAlert();
        }
    };
    return { pages, tag, createTag };
}
