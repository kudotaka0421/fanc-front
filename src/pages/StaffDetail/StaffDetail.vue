<template>
    <Breadcrumbs :pages="pages" />
    <StaffForm :staff="staff" :form-type="formType" />
</template>

<script setup lang="ts">
import Breadcrumbs from "../../components/Breadcrumbs.vue";
import StaffForm from "../../components/Staff/StaffForm.vue";

import { useStaffDetail } from "./useStaffDetail";

const { pages, staff, formType } = useStaffDetail();
</script>
