<template>
    <Breadcrumbs :pages="pages" />
    <CounselingForm
        form-type="create"
        :counseling="counseling"
        :school-options="schoolOptions"
        :user-options="userOptions"
        @create="createCounseling"
    />
</template>

<script setup lang="ts">
import Breadcrumbs from "../../components/Breadcrumbs.vue";
import CounselingForm from "../../components/Counseling/CounselingForm.vue";

import { useCounselingCreate } from "./useCounselingCreate";

const { pages, counseling, schoolOptions, userOptions, createCounseling } =
    useCounselingCreate();
</script>
