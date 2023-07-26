import { onMounted } from "vue";
import { useAlertStore } from "@/store/alert";
import { useRouter } from "vue-router";
import { User, userRole } from "@/types/user";
import { createAxiosInstance } from "@/utils/axiosinstance";
import { useMeStore } from "@/store/me";

export function useUserCreate() {
    const alertStore = useAlertStore();
    const router = useRouter();
    const axiosInstance = createAxiosInstance();
    const meStore = useMeStore();

    const pages = [
        { name: "ユーザー一覧", href: "/users", current: false },
        { name: "ユーザー新規作成", href: "userCreate", current: true },
    ];

    const user = {
        name: "",
        email: "",
        password: "",
        role: userRole.Normal,
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

    const createUser = async (params: User) => {
        try {
            await axiosInstance.post("/user", params);
            alertStore.showSuccessAlert();
            router.push("/users");
        } catch (err) {
            alertStore.showErrorAlert();
        }
    };

    onMounted(async () => {
        await fetchMe();
    });

    return { pages, user, createUser };
}
