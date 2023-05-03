import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import School from "../pages/School.vue";
import Counseling from "../pages/Counseling.vue";
import Staffs from "../pages/Staffs/Staffs.vue";
import StaffDetail from "../pages/StaffDetail/StaffDetail.vue";
import StaffCreate from "../pages/StaffCreate/StaffCreate.vue";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "School",
        component: School,
    },
    {
        path: "/counseling",
        name: "Counseling",
        component: Counseling,
    },
    {
        path: "/staffs",
        name: "Staffs",
        component: Staffs,
    },
    {
        path: "/staffs/:staffId",
        name: "StaffDetail",
        component: StaffDetail,
    },
    {
        path: "/staffCreate",
        name: "StaffCreate",
        component: StaffCreate,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
