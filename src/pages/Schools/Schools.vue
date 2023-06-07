<template>
    <Breadcrumbs :pages="pages" />
    <div class="sm:flex sm:items-center flex-row-reverse">
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex justify-end">
            <button
                type="button"
                onclick="location.href='schoolCreate'"
                class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                新規作成
            </button>
        </div>
    </div>
    <div class="bg-red-600">
        ここに検索フォームを置くここに検索フォームを置くここに検索フォームを置くここに検索フォームを置く
        ここに検索フォームを置くここに検索フォームを置く
    </div>
    <School v-for="school in schools" :school="school" :key="school.name" />
</template>

<script setup lang="ts">
import Breadcrumbs from "../../components/Breadcrumbs.vue";
import School from "../../components/School/School.vue";
import { useSchools } from "./useSchools";

const { pages, schools } = useSchools();
</script>
