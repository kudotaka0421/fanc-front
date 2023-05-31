<template>
    <Breadcrumbs :pages="pages" />
    <TagList :tags="tags" />
</template>

<script setup lang="ts">
import Breadcrumbs from "../../components/Breadcrumbs.vue";
import TagList from "../../components/Tag/TagList.vue";

import { useTags } from "./useTags";

const { pages, tags } = useTags();
</script>
