import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import School from "../pages/School.vue";
import Counseling from "../pages/Counseling.vue";
import Staffs from "../pages/Staffs/Staffs.vue";
import StaffDetail from "../pages/StaffDetail/StaffDetail.vue";
import StaffCreate from "../pages/StaffCreate/StaffCreate.vue";
import SchoolDetail from "../pages/SchoolDetail/SchoolDetail.vue";
import Schools from "../pages/Schools/Schools.vue";
import SchoolCreate from "../pages/SchoolCreate/SchoolCreate.vue";

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
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
