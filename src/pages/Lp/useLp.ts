import { useRouter } from "vue-router";

export function useLp() {
    const router = useRouter();
    const img =
        "https://images.microcms-assets.io/assets/e3ac696edd424fde8f059de7938110e9/c7f85e6091124738ab57bebbf8530f52/samuraiengineer.jpeg?w=640";

    const goToSignUp = () => {
        router.push("/signup");
    };

    const goToLogin = () => {
        router.push("/login");
    };

    return { img, goToSignUp, goToLogin };
}
