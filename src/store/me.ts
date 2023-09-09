import { defineStore } from "pinia";
import { UserRole, userRole } from "@/types/user"; // user.ts から必要な部分をインポート

const meDefault = {
    name: "",
    email: "",
    isAuthenticated: false,
    role: 1 as UserRole,
};

export const useMeStore = defineStore("me", {
    state: () => {
        const me = {
            name: "",
            email: "",
            isAuthenticated: false,
            role: userRole.Normal as UserRole,
        };

        return {
            me: me,
        };
    },
    getters: {
        isStaffOrAdmin(): boolean {
            return (
                this.me.role === userRole.Staff ||
                this.me.role === userRole.Admin
            );
        },
    },
    actions: {
        setMe(me: any) {
            this.me = me;
        },

        resetMe() {
            this.me = meDefault;
        },
    },
});
