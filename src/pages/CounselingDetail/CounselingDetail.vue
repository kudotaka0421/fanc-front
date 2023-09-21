<template>
    <Breadcrumbs :pages="pages" />
    <CounselingForm
        :form-type="formType"
        :counseling="counseling"
        :school-options="schoolOptions"
        :user-options="userOptions"
        @changeMode="changeMode"
        @update="updateCounseling"
        @delete="deleteCounseling"
    />/>
</template>

<script setup lang="ts">
import CounselingForm from "@/components/Counseling/CounselingForm.vue";
import Breadcrumbs from "../../components/Breadcrumbs.vue";

import { useCounselingDetail } from "./useCounselingDetail";

const {
    pages,
    counseling,
    formType,
    changeMode,
    schoolOptions,
    userOptions,
    updateCounseling,
    deleteCounseling,
} = useCounselingDetail();
</script>
