import axios from "axios";
import { useAlertStore } from "../../store/alert";
import { useRouter } from "vue-router";
import { User } from "../../types/user";

export function useUserCreate() {
    const alertStore = useAlertStore();
    const router = useRouter();

    const pages = [
        { name: "ユーザー一覧", href: "/users", current: false },
        { name: "ユーザー新規作成", href: "userCreate", current: true },
    ];

    const user = {
        name: "",
        email: "",
        password: "",
        role: 1,
    };

    const createUser = async (params: User) => {
        debugger;
        try {
            await axios.post("http://localhost:8080/api/user", params);
            alertStore.showSuccessAlert();
            router.push("/users");
        } catch (err) {
            alertStore.showErrorAlert();
        }
    };
    return { pages, user, createUser };
}
