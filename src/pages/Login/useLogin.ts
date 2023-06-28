import axios from "axios";
import { useAlertStore } from "../../store/alert";
import { LoginParams } from "../../types/auth";

export function useLogin() {
    const alertStore = useAlertStore();

    const login = async (params: LoginParams) => {
        try {
            const response = await axios.post(
                "http://localhost:8080/api/login",
                { email: params.email, password: params.password }
            );
            window.localStorage.setItem("token", response.data.token);
            alertStore.showSuccessAlert();
        } catch (err) {
            console.log(err);
            // [TODO]ここでは「ログインに失敗しました。入力内容を確認のうえ再度お試しください。」に文言を表示するようにする
            alertStore.showErrorAlert();
        }
    };
    return { login };
}
