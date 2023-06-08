<template>
    <Breadcrumbs :pages="pages" />
    <SchoolForm
        form-type="edit"
        :school="school"
        :tag-options="tagOptions"
        @update="updateSchool"
        @cancel="goToSchoolDetail"
    />
</template>

<script setup lang="ts">
import Breadcrumbs from "../../components/Breadcrumbs.vue";
import SchoolForm from "../../components/School/SchoolForm.vue";

import { useSchoolEdit } from "./useSchoolEdit";

const { pages, school, tagOptions, updateSchool, goToSchoolDetail } =
    useSchoolEdit();
</script>
