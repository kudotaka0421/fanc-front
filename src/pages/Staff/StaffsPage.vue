<template>
    <Breadcrumbs :pages="pages" />
    <a
        href="staffCreate"
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
        新規作成
    </a>
</template>

<script setup lang="ts">
import Breadcrumbs from "../../components/Breadcrumbs.vue";

const pages = [{ name: "スタッフ一覧", href: "staffs", current: true }];
</script>
