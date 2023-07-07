import { ref, computed } from "vue";
import { createAxiosInstance } from "./utils/axiosinstance";

import { CalendarIcon, UsersIcon } from "@heroicons/vue/24/outline";

export function useApp() {
    const axiosInstance = createAxiosInstance();

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

    const fetchMe = async () => {
        console.log("fetchMe");
        try {
            const { data } = await axiosInstance.get("/me");
            // [todo]
            // 成功したらユーザ情報のセットと、ログインフラグのtrueをpiniaでする
            // tags.value = data;
            console.log("data", data);
        } catch (err) {
            console.log("@@@", err);
            // debugger
            // [todo]
            // 失敗したらログインフラグのfalseをpiniaでする
            // alertStore.showErrorAlert();
        }
    };

    const logout = () => {
        // [TODO];
        // そもそもここで実装場所ここで良いのか？ piniaで実装する？
        // ・TOPページに遷移させる
        // ・「ログアウトしました」の文言をアラートで表示させる
        window.localStorage.removeItem("token");
    };

    const isSignUpOrLoginPage = computed(() => {
        // 閲覧にログインが必要なページの場合はtrueを返す
        // これのboolによって、表示文言を変えたり、API通信時にtokenを付与するかどうかを判断する
        const path = window.location.pathname;

        if (path === "/login" || path === "/signup") {
            return false;
        }
        return true;
    });

    return {
        navigation,
        userNavigation,
        handleClick,
        fetchMe,
        logout,
        sidebarOpen,
        isSignUpOrLoginPage,
    };
}
