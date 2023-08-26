<template>
    <div>LPページ(仮)</div>

    <div class="flex h-16 shrink-0 items-center">
        <img class="h-8 w-auto" :src="img" alt="Your Company" />
    </div>
</template>
<script setup lang="ts">
import { useLp } from "./useLp";

const { img } = useLp();
</script>
