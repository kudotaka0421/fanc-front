import axios from "axios";
import { useAlertStore } from "../../store/alert";

import { Tag } from "../../types/tag";

import { ref, onMounted } from "vue";

export function useTags() {
    const pages = [{ name: "タグ一覧", href: "/tags", current: true }];

    const alertStore = useAlertStore();
    const tags = ref<Tag[]>([]);

    const fetchTags = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/api/tag");
            tags.value = data;
        } catch (err) {
            alertStore.showErrorAlert();
        }
    };

    onMounted(async () => {
        fetchTags();
    });

    return { pages, tags };
}
