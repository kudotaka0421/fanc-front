import axios from "axios";
import { useAlertStore } from "../../store/alert";

import { Tag } from "../../types/tag";

import { ref, onMounted } from "vue";

export function useTags() {
    const pages = [{ name: "タグ一覧", href: "/tags", current: true }];

    const alertStore = useAlertStore();
    const tags = ref<Tag[]>([]);

    const mockTags = [
        {
            id: 1,
            text: "タグ1",
        },
        { id: 2, text: "タグ2" },
        { id: 3, text: "タグ3" },
        { id: 4, text: "タグ4" },
        { id: 5, text: "タグ5" },
        { id: 6, text: "タグ6" },
        { id: 7, text: "タグ7" },
        { id: 8, text: "タグ8" },
        { id: 9, text: "タグ9" },
        { id: 10, text: "タグ10" },
        { id: 11, text: "タグ11" },
        { id: 12, text: "タグ12" },
        { id: 13, text: "タグ13" },
        { id: 14, text: "タグ14" },
        { id: 15, text: "タグ15" },
        { id: 16, text: "タグ16" },
        { id: 17, text: "タグ17" },
        { id: 18, text: "タグ18" },
        { id: 19, text: "タグ19" },
        { id: 20, text: "タグ20" },
        { id: 21, text: "タグ21" },
        { id: 22, text: "タグ22" },
        { id: 23, text: "タグ23" },
        { id: 24, text: "タグ24" },
        { id: 25, text: "タグ25" },
    ];

    const fetchTags = async () => {
        try {
            // TODO API繋ぎこみ時にコメントアウトを外す
            // const { data } = await axios.get("http://localhost:8080/api/tag");
            // tags.value = data;
            tags.value = mockTags;
        } catch (err) {
            alertStore.showErrorAlert();
        }
    };

    onMounted(async () => {
        fetchTags();
    });

    return { pages, tags };
}
