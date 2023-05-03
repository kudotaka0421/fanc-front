<template>
    <Breadcrumbs :pages="pages" />
    <StaffList :staffs="staffs" />
</template>

<script setup lang="ts">
import Breadcrumbs from "../../components/Breadcrumbs.vue";
import StaffList from "../../components/Staff/StaffList.vue";
import { useStaffs } from "./useStaffs";

const { pages, staffs } = useStaffs();
</script>
