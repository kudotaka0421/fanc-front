<template>
    <Breadcrumbs :pages="pages" />
    <StaffForm
        :staff="staff"
        :form-type="formType"
        @changeMode="changeMode"
        @update="updateStaff"
    />
</template>

<script setup lang="ts">
import Breadcrumbs from "../../components/Breadcrumbs.vue";
import StaffForm from "../../components/Staff/StaffForm.vue";

import { useStaffDetail } from "./useStaffDetail";

const { pages, staff, formType, changeMode, updateStaff } = useStaffDetail();
</script>
