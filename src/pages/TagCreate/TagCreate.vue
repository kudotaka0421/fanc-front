<template>
    <Breadcrumbs :pages="pages" />
    <TagForm :tag="tag" form-type="create" @create="createTag" />
</template>

<script setup lang="ts">
import Breadcrumbs from "../../components/Breadcrumbs.vue";
import TagForm from "../../components/Tag/TagForm.vue";

import { useTagCreate } from "./useTagCreate";

const { pages, tag, createTag } = useTagCreate();
</script>
