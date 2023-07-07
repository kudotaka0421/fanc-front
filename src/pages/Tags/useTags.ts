import axios from "axios";
import { useAlertStore } from "../../store/alert";

import { Tag } from "../../types/tag";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { createAxiosInstance } from "../../utils/axiosinstance";
import router from "../../router";
export function useTags() {
    const pages = [{ name: "タグ一覧", href: "/tags", current: true }];
    const router = useRouter();

    const axiosInstance = createAxiosInstance();

    const alertStore = useAlertStore();
    const tags = ref<Tag[]>([]);

    const fetchMe = async () => {
        // [TODO] ここの中身ちゃんと実装する
        try {
            const { data } = await axiosInstance.get("/me");
            // [todo]
            // 成功したらユーザ情報のセットと、ログインフラグのtrueをpiniaでする
            // tags.value = data;
            console.log("data", data);
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
        await fetchTags();
        await fetchMe();
    });

    return { pages, tags };
}
