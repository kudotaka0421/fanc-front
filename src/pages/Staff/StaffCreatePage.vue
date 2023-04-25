<template>
    <Breadcrumbs :pages="pages" />
    <StaffForm :staff="staff" />
</template>

<script setup lang="ts">
import Breadcrumbs from "../../components/Breadcrumbs.vue";
import StaffForm from "../../components/Staff/StaffForm.vue";

const pages = [
    { name: "スタッフ一覧", href: "staff", current: false },
    { name: "スタッフ新規作成", href: "staffCreate", current: true },
];

const staff = {
    FirstName: "",
    LastName: "",
    FirstNameKana: "",
    LastNameKana: "",
    Mail: "",
};
</script>
