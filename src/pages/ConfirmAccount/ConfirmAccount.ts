import axios from "axios";
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
    name: "ConfirmAccount",
    setup() {
        const router = useRouter();
        const route = useRoute();

        onMounted(async () => {
            const tokenParams = route.params.token;
            try {
                await axios.post(
                    `http://localhost:8080/api/confirm-account/${tokenParams}`
                );
                router.push("/login");
            } catch (error) {
                // [TODO]401 Unauthorizedエラーにリダイレクトさせる
                console.log("ConfirmAccount", error);
            }
        });
    },
};
