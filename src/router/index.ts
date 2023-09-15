import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import ConfirmAccount from "../pages/ConfirmAccount/ConfirmAccount"; // ConfirmAccountコンポーネントのパスに応じて変更してください
import Login from "../pages/Login/Login.vue";
import Lp from "../pages/Lp/Lp.vue";
import Counselings from "../pages/Counselings/Counselings.vue";
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
    },
    {
        path: "/userCreate",
        name: "UserCreate",
        component: UserCreate,
    },
    {
        path: "/users",
        name: "Users",
        component: Users,
    },
    {
        path: "/users/:userId",
        name: "UserDetail",
        component: UserDetail,
    },
    {
        path: "/schools",
        name: "Schools",
        component: Schools,
    },
    {
        path: "/schools/:schoolId",
        name: "SchoolDetail",
        component: SchoolDetail,
    },
    {
        path: "/schoolCreate",
        name: "SchoolCreate",
        component: SchoolCreate,
    },
    {
        path: "/schools/:schoolId/edit",
        name: "SchoolEdit",
        component: SchoolEdit,
    },
    {
        path: "/tags",
        name: "Tags",
        component: Tags,
    },
    {
        path: "/tagCreate",
        name: "TagCreate",
        component: TagCreate,
    },
    {
        path: "/tags/:tagId",
        name: "TagDetail",
        component: TagDetail,
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

router.afterEach((to) => {
    if (to.name === "NotFound") {
        window.location.href = "/error";
    }
});

export default router;
