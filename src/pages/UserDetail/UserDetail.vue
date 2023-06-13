<template>
    <Breadcrumbs :pages="pages" />
    <UserForm
        :user="user"
        :form-type="formType"
        @changeMode="changeMode"
        @update="updateUser"
    />/>
</template>

<script setup lang="ts">
import Breadcrumbs from "../../components/Breadcrumbs.vue";
import UserForm from "../../components/User/UserForm.vue";

import { useUserDetail } from "./useUserDetail";

const { pages, user, formType, changeMode, updateUser } = useUserDetail();
</script>
