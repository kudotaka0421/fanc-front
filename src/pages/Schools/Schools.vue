<template>
    <Breadcrumbs :pages="pages" />
    <div class="bg-red-600">
        ここに検索フォームを置くここに検索フォームを置くここに検索フォームを置くここに検索フォームを置く
        ここに検索フォームを置くここに検索フォームを置く
    </div>
    <School v-for="school in schools" :school="school" :key="school.id" />
</template>

<script setup lang="ts">
import Breadcrumbs from "../../components/Breadcrumbs.vue";
import School from "../../components/School/School.vue";
import { useSchools } from "./useSchools";

const { pages, schools } = useSchools();
</script>
