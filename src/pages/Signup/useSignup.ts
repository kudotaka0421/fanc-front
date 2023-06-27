import axios from "axios";
import { useAlertStore } from "../../store/alert";
import { User } from "../../types/user";
import { ref } from "vue";
export function useSignup() {
    const alertStore = useAlertStore();

    const isAuthenticationMailSent = ref(false);

    const signup = async (params: User) => {
        try {
            await axios.post("http://localhost:8080/api/user", params);
            alertStore.showSuccessAlert();
            isAuthenticationMailSent.value = true;
        } catch (err) {
            alertStore.showErrorAlert();
        }
    };
    return { signup, isAuthenticationMailSent };
}
