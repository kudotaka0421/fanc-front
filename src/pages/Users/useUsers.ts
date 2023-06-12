import axios from "axios";
import { useAlertStore } from "../../store/alert";
import { User } from "../../types/user";
import { ref, onMounted } from "vue";

export function useUsers() {
    const alertStore = useAlertStore();
    const pages = [{ name: "ユーザー一覧", href: "/users", current: true }];

    const users = ref<User[]>([]);

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/api/user");
            users.value = data;
        } catch (err) {
            alertStore.showErrorAlert();
        }
    };

    onMounted(async () => {
        fetchUsers();
    });

    return { pages, users };
}
