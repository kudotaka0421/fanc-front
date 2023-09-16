<template>
    <Breadcrumbs :pages="pages" />
    <div class="sm:flex sm:items-center flex-row-reverse">
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex justify-end">
            <button
                type="button"
                onclick="location.href='schoolCreate'"
                class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                作成する
            </button>
        </div>
    </div>
    <School v-for="school in schools" :school="school" :key="school.name" />
</template>

<script setup lang="ts">
import Breadcrumbs from "../../components/Breadcrumbs.vue";
import School from "../../components/School/School.vue";
import { useSchools } from "./useSchools";

const { pages, schools } = useSchools();
</script>
