import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import SchoolPage from "../pages/SchoolPage.vue";
import CounselingPage from "../pages/CounselingPage.vue";
import StaffsPage from "../pages/Staff/StaffsPage.vue";
import StaffCreatePage from "../pages/Staff/StaffCreatePage.vue";

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
    {
        path: "/staffs",
        name: "Staffs",
        component: StaffsPage,
    },
    {
        path: "/staffCreate",
        name: "StaffCreate",
        component: StaffCreatePage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
