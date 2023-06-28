import axios from "axios";
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
    name: "ConfirmAccount",
    setup() {
        const router = useRouter();
        const route = useRoute();

        onMounted(async () => {
            const token = route.params.token;
            try {
                console.log("ConfirmAccount", token);
                const response = await axios.post(
                    `http://localhost:8080/api/confirm-account/${token}`
                );

                const jwtToken = response.data.token;
                // Save JWT to local storage
                window.localStorage.setItem("jwtToken", jwtToken);

                router.push("/counseling");
            } catch (error) {
                // [TODO]401 Unauthorizedエラーにリダイレクトさせる
                console.log("ConfirmAccount", error);
            }
        });
    },
};
