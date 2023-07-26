<template>
    <form>
        <div class="space-y-12">
            <div class="h-10">
                <div
                    v-if="isViewMode"
                    class="flex items-center justify-end gap-x-6"
                >
                    <button
                        type="submit"
                        class="hover:bg-indigo-500 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        @click.prevent="clickEdit"
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
                </div>
            </div>

            <div class="border-b border-gray-900/10 pb-12">
                <div
                    class="mt- grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
                >
                    <div class="sm:col-span-4">
                        <label
                            for="text"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >タグ名<span
                                v-show="!isViewMode"
                                class="ml-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                                >必須</span
                            ></label
                        >
                        <div class="relative mt-2 h-20">
                            <input
                                v-if="!isViewMode"
                                v-model="tagVal.text"
                                id="text"
                                name="text"
                                type="text"
                                autocomplete="text"
                                @input="inputValue('text')"
                                class="p-2 block w-full rounded-md border-0 py-1.5 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                :class="[
                                    !isInitialForm.text && hasInvalidText
                                        ? 'ring-red-300 focus:ring-red-500 bg-red-100'
                                        : 'ring-gray-300 focus:ring-indigo-600',
                                ]"
                            />
                            <div
                                v-else
                                class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                {{ tagVal.text }}
                            </div>
                            <p
                                v-if="!isInitialForm.text && isEmptyText"
                                class="mt-2 text-sm text-red-600"
                                id="text-error"
                            >
                                タグ名を入力してください
                            </p>
                            <p
                                v-if="!isInitialForm.text && isLengthOverText"
                                class="mt-2 text-sm text-red-600"
                                id="text-error"
                            >
                                タグ名は50文字以内で入力してください
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
            <button
                v-if="!isViewMode && !tagVal.id"
                :disabled="hasInvalidValue"
                type="submit"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                :class="[
                    hasInvalidValue ? 'opacity-30' : 'hover:bg-indigo-500',
                ]"
                @click.prevent="clickCreate"
            >
                作成する
            </button>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
            <button
                v-if="!isViewMode && tagVal.id"
                type="submit"
                class="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-gray-500"
                @click.stop="clickCancel"
            >
                キャンセル
            </button>
            <button
                v-if="!isViewMode && tagVal.id"
                :disabled="hasInvalidValue"
                type="submit"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                :class="[
                    hasInvalidValue ? 'opacity-30' : 'hover:bg-indigo-500',
                ]"
                @click.prevent="clickUpdate"
            >
                更新
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { defineProps, ref, computed, reactive, watch } from "vue";
import { Tag } from "../../types/tag";

type FormType = "create" | "edit" | "view";

type Props = {
    tag: Tag;
    formType: FormType;
};

const props = defineProps<Props>();

const isViewMode = computed(() => {
    return props.formType === "view";
});

const tagVal = ref<Tag>({ ...props.tag });

const isInitialForm = reactive({
    text: true,
});

// text バリデーション
const isEmptyText = computed(() => {
    return tagVal.value.text === "";
});
const isLengthOverText = computed(() => {
    return !isEmptyText.value && tagVal.value.text.length > 50;
});
const hasInvalidText = computed(() => {
    return isEmptyText.value || isLengthOverText.value;
});

const hasInvalidValue = computed(() => {
    return hasInvalidText.value;
});

const emits = defineEmits(["create", "update", "delete", "change-mode"]);

const clickCreate = () => {
    emits("create", tagVal.value);
};

const clickDelete = () => {
    if (window.confirm("本当に削除しますか？")) {
        emits("delete");
    }
};

const clickEdit = () => {
    changeMode("edit");
};

const clickCancel = () => {
    changeMode("view");
    tagVal.value = { ...props.tag };
};

const changeMode = (type: string) => {
    emits("change-mode", type);
};

const clickUpdate = () => {
    emits("update", tagVal.value);
};

const inputValue = (key: string) => {
    isInitialForm[key as keyof typeof isInitialForm] = false;
};

watch(
    () => props.tag,
    (newTag) => {
        tagVal.value = { ...newTag };
    },
    { deep: true }
);
</script>
