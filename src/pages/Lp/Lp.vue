<template>
    <div>LPページ(テスト)</div>
    <div class="flex flex-1 gap-x-4 self-stretch justify-end lg:gap-x-6">
        <div class="flex items-center gap-x-4 lg:gap-x-6">
            <div class="space-y-12">
                <div class="h-10">
                    <div class="flex items-center justify-end gap-x-6">
                        <button
                            type="submit"
                            class="hover:bg-indigo-500 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            @click="goToSignUp"
                        >
                            新規登録
                        </button>
                        <button
                            type="submit"
                            class="rounded-md bg-red-100 px-3 py-2 text-sm font-semibold hover:bg-red-100 text-red-700 shadow-sm bg-red-200 focus-visible:outline"
                            @click="goToLogin"
                        >
                            ログイン
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="w-full">
        <img class="mx-auto w-auto" :src="img" alt="Your Company" />
    </div>
</template>
<script setup lang="ts">
import { useLp } from "./useLp";

const { img, goToSignUp, goToLogin } = useLp();
</script>
