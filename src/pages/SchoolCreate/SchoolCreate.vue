<template>
    <Breadcrumbs :pages="pages" />
    <SchoolForm
        form-type="create"
        :school="school"
        :tag-options="tagOptions"
        @create="createSchool"
    />
</template>

<script setup lang="ts">
import Breadcrumbs from "../../components/Breadcrumbs.vue";
import SchoolForm from "../../components/School/SchoolForm.vue";

import { useSchoolCreate } from "./useSchoolCreate";

const { pages, school, tagOptions, createSchool } = useSchoolCreate();
</script>
