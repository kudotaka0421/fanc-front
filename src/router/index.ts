import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import ConfirmAccount from "../pages/ConfirmAccount/ConfirmAccount"; // ConfirmAccountコンポーネントのパスに応じて変更してください
import Login from "../pages/Login/Login.vue";
import Lp from "../pages/Lp/Lp.vue";
import Counselings from "../pages/Counselings/Counselings.vue";
import CounselingCreate from "../pages/CounselingCreate/CounselingCreate.vue";
import Users from "../pages/Users/Users.vue";
import UserCreate from "../pages/UserCreate/UserCreate.vue";
import UserDetail from "../pages/UserDetail/UserDetail.vue";
import SchoolDetail from "../pages/SchoolDetail/SchoolDetail.vue";
import Schools from "../pages/Schools/Schools.vue";
import SchoolCreate from "../pages/SchoolCreate/SchoolCreate.vue";
import SchoolEdit from "../pages/SchoolEdit/SchoolEdit.vue";
import Tags from "../pages/Tags/Tags.vue";
import TagCreate from "../pages/TagCreate/TagCreate.vue";
import TagDetail from "../pages/TagDetail/TagDetail.vue";

import Signup from "../pages/Signup/Signup.vue";

import Error from "../pages/Error/Error.vue";
import { createAxiosInstance } from "@/utils/axiosinstance";
import { useMeStore } from "@/store/me";
import { userRole } from "@/types/user";

const axiosInstance = createAxiosInstance();

const routes: RouteRecordRaw[] = [
    {
        path: "/signup",
        name: "Signup",
        component: Signup,
    },
    {
        path: "/confirm-account/:token",
        name: "ConfirmAccount",
        component: ConfirmAccount,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/lp",
        name: "Lp",
        component: Lp,
    },
    {
        path: "/counselings",
        name: "Counselings",
        component: Counselings,
        meta: {
            requiresAuth: true,
            allowedRoles: [userRole.Admin, userRole.Staff],
        },
    },
    {
        path: "/counselingCreate",
        name: "CounselingCreate",
        component: CounselingCreate,
        meta: {
            requiresAuth: true,
            allowedRoles: [userRole.Admin],
        },
    },

    {
        path: "/userCreate",
        name: "UserCreate",
        component: UserCreate,
        meta: {
            requiresAuth: true,
            allowedRoles: [userRole.Admin],
        },
    },
    {
        path: "/users",
        name: "Users",
        component: Users,
        meta: {
            requiresAuth: true,
            allowedRoles: [userRole.Admin],
        },
    },
    {
        path: "/users/:userId",
        name: "UserDetail",
        component: UserDetail,
        meta: {
            requiresAuth: true,
            allowedRoles: [userRole.Admin],
        },
    },
    {
        path: "/schools",
        name: "Schools",
        component: Schools,
        meta: {
            requiresAuth: true,
            allowedRoles: [userRole.Admin],
        },
    },
    {
        path: "/schools/:schoolId",
        name: "SchoolDetail",
        component: SchoolDetail,
        meta: {
            requiresAuth: true,
            allowedRoles: [userRole.Admin],
        },
    },
    {
        path: "/schoolCreate",
        name: "SchoolCreate",
        component: SchoolCreate,
        meta: {
            requiresAuth: true,
            allowedRoles: [userRole.Admin],
        },
    },
    {
        path: "/schools/:schoolId/edit",
        name: "SchoolEdit",
        component: SchoolEdit,
        meta: {
            requiresAuth: true,
            allowedRoles: [userRole.Admin],
        },
    },
    {
        path: "/tags",
        name: "Tags",
        component: Tags,
        meta: {
            requiresAuth: true,
            allowedRoles: [userRole.Admin],
        },
    },
    {
        path: "/tagCreate",
        name: "TagCreate",
        component: TagCreate,
        meta: {
            requiresAuth: true,
            allowedRoles: [userRole.Admin],
        },
    },
    {
        path: "/tags/:tagId",
        name: "TagDetail",
        component: TagDetail,
        meta: {
            requiresAuth: true,
            allowedRoles: [userRole.Admin],
        },
    },
    {
        path: "/error",
        name: "Error",
        component: Error,
    },
    {
        path: "/:catchAll(.*)",
        name: "NotFound",
        component: Error,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const fetchMe = async () => {
    const meStore = useMeStore();
    try {
        const { data } = await axiosInstance.get("/me");
        meStore.setMe(data);
    } catch (err) {
        window.location.href = "/error";
    }
};

router.beforeEach(async (to, from, next) => {
    const meStore = useMeStore();

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        await fetchMe();

        // 認証チェック
        if (!meStore.me.isAuthenticated) {
            window.location.href = "/error";
            return;
        }

        // 権限チェック
        if (to.meta.allowedRoles) {
            if (
                Array.isArray(to.meta.allowedRoles) &&
                !to.meta.allowedRoles.includes(meStore.me.role)
            ) {
                window.location.href = "/error";
                return;
            }
        }

        next();
    } else {
        next();
    }
});

router.afterEach((to) => {
    if (to.name === "NotFound") {
        window.location.href = "/error";
    }
});

export default router;
