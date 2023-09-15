import { useMeStore } from "@/store/me";
import { useAlertStore } from "@/store/alert";
import { User } from "@/types/user";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { createAxiosInstance } from "@/utils/axiosinstance";

export function useUsers() {
    const alertStore = useAlertStore();
    const pages = [{ name: "ユーザー一覧", href: "/users", current: true }];
    const router = useRouter();
    const axiosInstance = createAxiosInstance();
    const meStore = useMeStore();

    const users = ref<User[]>([]);

    const fetchMe = async () => {
        try {
            const { data } = await axiosInstance.get("/me");
            meStore.setMe(data);
        } catch (err) {
            window.location.href = "/error";
            return;
        }
    };

    const fetchUsers = async () => {
        try {
            const { data } = await axiosInstance.get("/user");
            users.value = data;
        } catch (err) {
            alertStore.showErrorAlert();
        }
    };

    onMounted(async () => {
        await fetchMe();
        await fetchUsers();
    });

    return { pages, users };
}
