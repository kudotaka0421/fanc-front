<template>
    <div>
        <Breadcrumbs :pages="pages" />
        <h1>カウンセリング一覧</h1>
        TODOここに実装する
    </div>
</template>

<script setup lang="ts">
import Breadcrumbs from "../../components/Breadcrumbs.vue";

import { useCounselings } from "./useCounselings";

const { pages } = useCounselings();
</script>
