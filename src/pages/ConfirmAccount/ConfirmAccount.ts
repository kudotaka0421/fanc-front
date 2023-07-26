import axios from "axios";
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { createAxiosInstance } from "@/utils/axiosinstance";

export default {
    name: "ConfirmAccount",
    setup() {
        const router = useRouter();
        const route = useRoute();

        onMounted(async () => {
            const tokenParams = route.params.token;
            const axiosInstance = createAxiosInstance();
            try {
                await axiosInstance.post(`/confirm-account/${tokenParams}`);
                router.push("/login");
            } catch (error) {
                // [TODO]401 Unauthorizedエラーにリダイレクトさせる
                console.log("ConfirmAccount", error);
            }
        });
    },
};
