<template>
    <div>LPページ(テスト)</div>

    <div class="w-full">
        <img class="mx-auto w-auto" :src="img" alt="Your Company" />
    </div>

    <div
        class="jicoo-widget"
        data-url="https://www.jicoo.com/event_types/oippgJO-MPhM/widget"
        style="
            min-width: 320px;
            height: 720px;
            border: 1px solid #e4e4e4;
            box-sizing: content-box;
        "
    ></div>
</template>
<script setup lang="ts">
import { useLp } from "./useLp";

const { img } = useLp();
</script>
