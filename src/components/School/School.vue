<template>
    <div class="bg-white">
        <div class="pt-6">
            <div
                class="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16"
            >
                <div
                    class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8"
                >
                    <p
                        class="text-5xl font-bold tracking-tight text-gray-900 sm:text-5xl"
                    >
                        {{ school.name }}
                    </p>

                    <div
                        class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:gap-x-8 lg:px-8"
                    >
                        <div
                            v-html="school.imageLinks[0]"
                            class="mt-10 hidden lg:block aspect-h-4 aspect-w-3 overflow-hidden rounded-lg"
                        ></div>
                        <!-- スマホ表示用 -->
                        <div class="block lg:hidden">
                            <div v-html="school.imageLinks[0]"></div>
                        </div>
                    </div>
                </div>

                <div class="lg:row-span-3 lg:mt-20">
                    <span v-if="meStore.isAdmin">
                        <button
                            type="button"
                            class="hover:bg-indigo-500 rounded-md bg-indigo-600 mr-3 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            @click="goToSchoolEdit()"
                        >
                            編集
                        </button>
                        <button
                            type="submit"
                            class="rounded-md bg-red-100 px-3 py-2 text-sm font-semibold hover:bg-red-100 text-red-700 shadow-sm bg-red-200 focus-visible:outline"
                            @click.prevent="clickDelete"
                        >
                            削除
                        </button>
                    </span>
                    <h3 class="mt-5 text-sm font-medium text-gray-900">
                        月額料金(税込)
                    </h3>
                    <p class="text-3xl tracking-tight text-gray-900 mt-2">
                        {{ school.monthlyFee }}円 〜
                    </p>

                    <h2 class="sr-only">Product information</h2>
                    <h3 class="text-sm font-medium text-gray-900 mt-6">期間</h3>
                    <p class="text-3xl tracking-tight text-gray-900 mt-2">
                        {{ termLabel }}
                    </p>

                    <form class="mt-10">
                        <div>
                            <div>
                                <div
                                    v-for="tag in school.tags"
                                    :key="tag.id"
                                    class="mb-1.5"
                                >
                                    <span
                                        class="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200"
                                    >
                                        <svg
                                            class="h-1.5 w-1.5 fill-green-500"
                                            viewBox="0 0 6 6"
                                            aria-hidden="true"
                                        >
                                            <circle cx="3" cy="3" r="3" />
                                        </svg>
                                        {{ tag.text }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div
                        v-html="school.imageLinks[1]"
                        class="mt-10 hidden lg:block aspect-h-4 aspect-w-3 overflow-hidden rounded-lg"
                    ></div>
                </div>

                <div
                    class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6"
                >
                    <div class="mt-2">
                        <h2 class="text-sm font-medium text-gray-900">概要</h2>

                        <div class="mt-4 space-y-6">
                            <p class="text-sm text-gray-600">
                                {{ school.overview }}
                            </p>
                        </div>
                    </div>
                    <div class="mt-10">
                        <h3 class="text-sm font-medium text-gray-900">特徴</h3>

                        <div class="mt-4">
                            <ul
                                role="list"
                                class="list-disc space-y-2 pl-4 text-sm"
                            >
                                <li
                                    v-for="feature in school.features"
                                    :key="feature"
                                    class="text-gray-400"
                                >
                                    <span class="text-gray-600">{{
                                        feature
                                    }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="mt-10">
                        <h3 class="text-sm font-medium text-gray-900">
                            こんな人におすすめ
                        </h3>

                        <div class="mt-4">
                            <ul
                                role="list"
                                class="list-disc space-y-2 pl-4 text-sm"
                            >
                                <li
                                    v-for="recommendation in school.recommendations"
                                    :key="recommendation"
                                    class="text-gray-400"
                                >
                                    <span class="text-gray-600">{{
                                        recommendation
                                    }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div v-if="school.remarks" class="mt-10">
                        <h2 class="text-sm font-medium text-gray-900">
                            備考(登録されていたら表示)
                        </h2>

                        <div class="mt-4 space-y-6">
                            <p class="text-sm text-gray-600">
                                {{ school.remarks }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import { useRouter } from "vue-router";
import { School } from "../../types/school";
import { useMeStore } from "@/store/me";

const emits = defineEmits(["delete"]);

const router = useRouter();
type Props = {
    school: School;
};

const props = defineProps<Props>();

const meStore = useMeStore();

const termLabel = computed(() => {
    switch (props.school.termUnit) {
        case 1:
            return `${props.school.termNum}週間 〜 `;
        case 2:
            return `${props.school.termNum}ヶ月 〜 `;
        default:
            return "";
    }
});

const goToSchoolEdit = () => {
    if (props.school.id) router.push(`/schools/${props.school.id}/edit`);
};

const clickDelete = () => {
    if (window.confirm("本当に削除しますか？")) {
        emits("delete");
    }
};
</script>

<style scoped>
.message {
    text-align: center;
    font-size: 1rem;
    font-weight: bold;
    margin-top: 1rem;
    margin-bottom: 4px;
}
.school_counseling_link {
    margin: auto;
    background-image: -webkit-linear-gradient(45deg, #ffc107 0%, #f76a35 100%);
    background-image: linear-gradient(45deg, #ffc107 0%, #f76a35 100%);
    box-shadow: 0px 10px 13px 0px rgb(255 193 7 / 30%);
    border: 2px solid #ff8707;
    border-radius: 34px;
    color: #fff;
    display: flex;
    justify-content: center;
    font-size: 2rem;
    font-weight: bold;
    position: relative;
    text-decoration: none;
    text-shadow: -1px -1px 1px rgb(0 0 0 / 20%);
    width: 326px;
    height: 54px;
    line-height: 54px;
    overflow: hidden;
    font-size: 1.5rem;
}

.button {
    background-image: linear-gradient(
        -45deg,
        #ffffff,
        #f6f7f8,
        #e8ebee,
        #f6f7f8,
        #ffffff
    );
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
</style>
