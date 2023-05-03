<template>
    <Breadcrumbs :pages="pages" />
    <StaffForm :staff="staff" @create="createStaff" />
</template>

<script setup lang="ts">
import Breadcrumbs from "../../components/Breadcrumbs.vue";
import StaffForm from "../../components/Staff/StaffForm.vue";

import { useStaffCreate } from "./useStaffCreate";

const { pages, staff, createStaff } = useStaffCreate();
</script>
