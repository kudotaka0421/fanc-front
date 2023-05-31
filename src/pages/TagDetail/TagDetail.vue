<template>
    <Breadcrumbs :pages="pages" />
    <TagForm
        :tag="tag"
        :form-type="formType"
        @changeMode="changeMode"
        @delete="deleteTag"
        @update="updateTag"
    />
</template>

<script setup lang="ts">
import Breadcrumbs from "../../components/Breadcrumbs.vue";
import TagForm from "../../components/Tag/TagForm.vue";

import { useTagDetail } from "./useTagDetail";

const { pages, tag, formType, changeMode, updateTag, deleteTag } =
    useTagDetail();
</script>
