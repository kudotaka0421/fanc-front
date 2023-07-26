import { ref, computed } from "vue";
import { useAlertStore } from "./store/alert";
import { CalendarIcon, UsersIcon } from "@heroicons/vue/24/outline";
import { useMeStore } from "./store/me";

export function useApp() {
    const meStore = useMeStore();
    const alertStore = useAlertStore();

    const navigation = [
        {
            name: "カウンセリングを予約する",
            href: "#",
            icon: UsersIcon,
            current: false,
        },
        {
            name: "マイページ",
            href: "#",
            icon: UsersIcon,
            current: false,
        },
        // ここから下はstaffかadminのみ表示させる
        {
            name: "スクールを探す",
            href: "/schools",
            icon: CalendarIcon,
            current: false,
        },
        {
            name: "カウンセリング一覧",
            href: "counseling",
            icon: CalendarIcon,
            current: false,
        },
        {
            name: "ユーザー一覧",
            href: "/users",
            icon: CalendarIcon,
            current: false,
        },
        { name: "決済一覧", href: "#", icon: CalendarIcon, current: false },
        { name: "タグ一覧", href: "/tags", icon: CalendarIcon, current: false },
    ];

    const userNavigation = [
        { name: "Your profile", href: "#" },
        { name: "Sign out", href: "#" },
    ];

    const sidebarOpen = ref(false);

    const handleClick = (itemName: string) => {
        if (itemName === "Sign out") {
            logout();
        }
    };

    const logout = () => {
        window.localStorage.removeItem("token");
        meStore.resetMe();
        // [TODO] 成功メッセージは「ログアウトしました」にする。
        alertStore.showSuccessAlert();
        window.location.href = "/lp";
    };

    const isSignUpOrLoginPage = computed(() => {
        // 閲覧にログインが必要なページの場合はtrueを返す
        // これのboolによって、表示文言を変えたり、API通信時にtokenを付与するかどうかを判断する
        const path = window.location.pathname;

        return path === "/login" || path === "/signup";
    });

    const isSignUpOrLoginOrLpPage = computed(() => {
        // 閲覧にログインが必要なページの場合はtrueを返す
        // これのboolによって、表示文言を変えたり、API通信時にtokenを付与するかどうかを判断する
        const path = window.location.pathname;

        return path === "/login" || path === "/signup" || path === "/lp";
    });

    const isAuthenticated = computed(() => {
        const token = window.localStorage.getItem("token");
        return token ? true : false;
    });

    const userName = computed(() => {
        if (meStore.me.name) {
            return `${meStore.me.name}さん`;
        } else {
            return "";
        }
    });

    return {
        navigation,
        userNavigation,
        handleClick,
        logout,
        sidebarOpen,
        isSignUpOrLoginPage,
        isSignUpOrLoginOrLpPage,
        meStore,
        isAuthenticated,
        userName,
    };
}
