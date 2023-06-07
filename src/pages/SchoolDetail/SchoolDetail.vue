<template>
    <Breadcrumbs :pages="pages" />
    <School :school="school" :is-detail-page="true" />
</template>

<script setup lang="ts">
import Breadcrumbs from "../../components/Breadcrumbs.vue";
import School from "../../components/School/School.vue";

import { useSchoolDetail } from "./useSchoolDetail";

const { pages, school } = useSchoolDetail();
</script>
