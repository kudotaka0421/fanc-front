<template>
    <div class="p-8 max-w-3xl mx-auto">
        <router-link to="/lab" class="text-sm text-blue-600 hover:underline">
            ← Lab トップへ
        </router-link>
        <h1 class="mt-4 text-2xl font-bold">{{ title }}</h1>
        <p class="mt-2 text-gray-500">このトピックはまだ未実装です。</p>
    </div>
</template>

<script setup lang="ts">
defineProps<{ title: string }>();
</script>
