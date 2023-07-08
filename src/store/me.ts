import { defineStore } from "pinia";
const meDefault = {
    name: "",
    email: "",
    isAuthenticated: false,
    role: 1,
};

export const useMeStore = defineStore("me", {
    state: () => {
        const me = {
            name: "",
            email: "",
            isAuthenticated: false,
            role: 1,
        };

        return {
            me: me,
        };
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
