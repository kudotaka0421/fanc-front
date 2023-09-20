<template>
    <Breadcrumbs :pages="pages" />
    <div class="sm:flex sm:items-center flex-row-reverse">
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex justify-end">
            <button
                type="button"
                onclick="location.href='counselingCreate'"
                class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                新規作成
            </button>
        </div>
    </div>
    <CounselingList :counselings="counselings" />
</template>

<script setup lang="ts">
import Breadcrumbs from "../../components/Breadcrumbs.vue";
import CounselingList from "../../components/Counseling/CounselingList.vue";

import { useCounselings } from "./useCounselings";

const { pages, counselings } = useCounselings();
</script>
