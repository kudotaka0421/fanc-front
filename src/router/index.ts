import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import SchoolPage from "../pages/SchoolPage.vue";
import CounselingPage from "../pages/CounselingPage.vue";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "School",
        component: SchoolPage,
    },
    {
        path: "/counseling",
        name: "Counseling",
        component: CounselingPage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
