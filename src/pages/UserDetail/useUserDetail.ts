import axios from "axios";
import { useAlertStore } from "../../store/alert";
import { ref, onMounted } from "vue";
import { userRole, User } from "../../types/user";
import { useRouter } from "vue-router";

export function useUserDetail() {
    const alertStore = useAlertStore();
    const router = useRouter();
    const pages = [
        { name: "ユーザ一覧", href: "/users", current: false },
        { name: "ユーザー詳細", href: "", current: true },
    ];
    const userId = location.pathname.split("/")[2];

    const user = ref<User>({
        id: 0,
        name: "",
        email: "",
        role: userRole.Normal,
    });

    const formType = ref<"view" | "edit">("view");

    const changeMode = (mode: "view" | "edit") => {
        formType.value = mode;
    };

    const fetchUser = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:8080/api/user/${userId}`
            );
            user.value = data;
        } catch (err) {
            alertStore.showErrorAlert();
        }
    };

    const updateUser = async (params: User) => {
        try {
            await axios.put(`http://localhost:8080/api/user/${userId}`, params);
            await fetchUser();
            formType.value = "view";
            alertStore.showSuccessAlert();
        } catch (err) {
            alertStore.showErrorAlert();
        }
    };

    const deleteUser = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/user/${userId}`);
            await fetchUser();
            alertStore.showSuccessAlert();
            router.push("/users");
        } catch (err) {
            alertStore.showErrorAlert();
        }
    };

    onMounted(async () => {
        fetchUser();
    });

    return { pages, user, formType, changeMode, updateUser, deleteUser };
}
