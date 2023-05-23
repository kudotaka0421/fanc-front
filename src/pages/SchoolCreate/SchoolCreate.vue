<template>
    <Breadcrumbs :pages="pages" />
    <SchoolForm form-type="create" :school="school" />
</template>

<script setup lang="ts">
import Breadcrumbs from "../../components/Breadcrumbs.vue";
import SchoolForm from "../../components/School/SchoolForm.vue";

import { useSchoolCreate } from "./useSchoolCreate";

const { pages, school } = useSchoolCreate();
</script>
