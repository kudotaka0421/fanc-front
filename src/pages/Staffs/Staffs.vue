<template>
    <Breadcrumbs :pages="pages" />
    <StaffList :staffs="staffs" />
</template>

<script setup lang="ts">
import Breadcrumbs from "../../components/Breadcrumbs.vue";
import StaffList from "../../components/Staff/StaffList.vue";

const pages = [{ name: "スタッフ一覧", href: "staffs", current: true }];

// TODO Mockデータのため不要になったら削除する
const staffs = [
    {
        id: 1,
        firstName: "1-サンプル",
        lastName: "太郎",
        firstNameKana: "サンプル",
        lastNameKana: "タロウ",
        email: "sample@test.com",
    },
    {
        id: 2,
        firstName: "2-サンプル",
        lastName: "太郎",
        firstNameKana: "サンプル",
        lastNameKana: "タロウ",
        email: "sample@test.com",
    },
    {
        id: 3,
        firstName: "3-サンプル",
        lastName: "太郎",
        firstNameKana: "サンプル",
        lastNameKana: "タロウ",
        email: "sample@test.com",
    },
    {
        id: 4,
        firstName: "4-サンプル",
        lastName: "太郎",
        firstNameKana: "サンプル",
        lastNameKana: "タロウ",
        email: "sample@test.com",
    },
    {
        id: 5,
        firstName: "5-サンプル",
        lastName: "太郎",
        firstNameKana: "サンプル",
        lastNameKana: "タロウ",
        email: "sample@test.com",
    },
];
</script>
