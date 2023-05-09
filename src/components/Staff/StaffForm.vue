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
                    <div class="sm:col-span-3">
                        <label
                            for="first-name"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >姓<span
                                v-show="!isViewMode"
                                class="ml-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                                >必須</span
                            ></label
                        >
                        <div class="mt-2 h-14">
                            <input
                                v-if="!isViewMode"
                                v-model="staff.firstName"
                                type="text"
                                name="first-name"
                                id="first-name"
                                autocomplete="given-name"
                                @input="inputValue('firstName')"
                                class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                :class="[
                                    !isInitialForm.firstName &&
                                    hasInvalidFirstName
                                        ? 'ring-red-300 focus:ring-red-500 bg-red-100'
                                        : 'ring-gray-300 focus:ring-indigo-600',
                                ]"
                            />
                            <div
                                v-else
                                class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                {{ staff.firstName }}
                            </div>
                            <p
                                v-if="
                                    !isInitialForm.firstName && isEmptyFirstName
                                "
                                class="mt-2 text-sm text-red-600"
                                id="first-name-error"
                            >
                                姓を入力してください
                            </p>
                            <p
                                v-if="
                                    !isInitialForm.firstName &&
                                    isLengthOverFirstName
                                "
                                class="mt-2 text-sm text-red-600"
                                id="last-name-error"
                            >
                                姓は50文字以内で入力してください
                            </p>
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label
                            for="last-name"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >名<span
                                v-show="!isViewMode"
                                class="ml-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                                >必須</span
                            ></label
                        >
                        <div class="mt-2 h-14">
                            <input
                                v-if="!isViewMode"
                                v-model="staff.lastName"
                                type="text"
                                name="last-name"
                                id="last-name"
                                autocomplete="family-name"
                                @input="inputValue('lastName')"
                                class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                :class="[
                                    !isInitialForm.lastName &&
                                    hasInvalidLastName
                                        ? 'ring-red-300 focus:ring-red-500 bg-red-100'
                                        : 'ring-gray-300 focus:ring-indigo-600',
                                ]"
                            />
                            <div
                                v-else
                                class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                {{ staff.lastName }}
                            </div>
                            <p
                                v-if="
                                    !isInitialForm.lastName && isEmptyLastName
                                "
                                class="mt-2 text-sm text-red-600"
                                id="last-name-error"
                            >
                                名を入力してください
                            </p>
                            <p
                                v-if="
                                    !isInitialForm.lastName &&
                                    isLengthOverLastName
                                "
                                class="mt-2 text-sm text-red-600"
                                id="last-name-error"
                            >
                                名は50文字以内で入力してください
                            </p>
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label
                            for="first-name"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >姓(ヨミガナ)<span
                                v-show="!isViewMode"
                                class="ml-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                                >必須</span
                            ></label
                        >
                        <div class="mt-2 h-20">
                            <input
                                v-if="!isViewMode"
                                v-model="staff.firstNameKana"
                                type="text"
                                name="first-name"
                                id="first-name"
                                autocomplete="given-name"
                                @input="inputValue('firstNameKana')"
                                class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                :class="[
                                    !isInitialForm.firstNameKana &&
                                    hasInvalidFirstNameKana
                                        ? 'ring-red-300 focus:ring-red-500 bg-red-100'
                                        : 'ring-gray-300 focus:ring-indigo-600',
                                ]"
                            />
                            <div
                                v-else
                                class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                {{ staff.firstNameKana }}
                            </div>
                            <p
                                v-if="
                                    !isInitialForm.firstNameKana &&
                                    isEmptyFirstNameKana
                                "
                                class="mt-2 text-sm text-red-600"
                                id="first-name-error"
                            >
                                姓(ヨミガナ)を入力してください
                            </p>
                            <p
                                v-if="
                                    !isInitialForm.firstNameKana &&
                                    isLengthOverFirstNameKana
                                "
                                class="mt-2 text-sm text-red-600"
                                id="first-name-error"
                            >
                                姓(ヨミガナ)は50文字以内で入力してください
                            </p>
                            <p
                                v-if="
                                    !isInitialForm.firstNameKana &&
                                    isInvalidFirstNameKana
                                "
                                class="mt-2 text-sm text-red-600"
                                id="first-name-error"
                            >
                                全角カタカナで入力してください
                            </p>
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label
                            for="last-name"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >名(ヨミガナ)<span
                                v-show="!isViewMode"
                                class="ml-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                                >必須</span
                            ></label
                        >
                        <div class="mt-2 h-20">
                            <input
                                v-if="!isViewMode"
                                v-model="staff.lastNameKana"
                                type="text"
                                name="last-name"
                                id="last-name"
                                autocomplete="family-name"
                                @input="inputValue('lastNameKana')"
                                class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                :class="[
                                    !isInitialForm.lastNameKana &&
                                    hasInvalidLastNameKana
                                        ? 'ring-red-300 focus:ring-red-500 bg-red-100'
                                        : 'ring-gray-300 focus:ring-indigo-600',
                                ]"
                            />
                            <div
                                v-else
                                class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                {{ staff.lastNameKana }}
                            </div>
                            <p
                                v-if="
                                    !isInitialForm.lastNameKana &&
                                    isEmptyLastNameKana
                                "
                                class="mt-2 text-sm text-red-600"
                                id="last-name-error"
                            >
                                名(ヨミガナ)を入力してください
                            </p>
                            <p
                                v-if="
                                    !isInitialForm.lastNameKana &&
                                    isLengthOverLastNameKana
                                "
                                class="mt-2 text-sm text-red-600"
                                id="last-name-error"
                            >
                                名(ヨミガナ)は50文字以内で入力してください
                            </p>
                            <p
                                v-if="
                                    !isInitialForm.lastNameKana &&
                                    isInvalidLastNameKana
                                "
                                class="mt-2 text-sm text-red-600"
                                id="last-name-error"
                            >
                                全角カタカナで入力してください
                            </p>
                        </div>
                    </div>

                    <div class="sm:col-span-4">
                        <label
                            for="email"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >メールアドレス<span
                                v-show="!isViewMode"
                                class="ml-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                                >必須</span
                            ></label
                        >
                        <div class="relative mt-2 h-20">
                            <input
                                v-if="!isViewMode"
                                v-model="staff.email"
                                id="email"
                                name="email"
                                type="email"
                                autocomplete="email"
                                @input="inputValue('email')"
                                class="p-2 block w-full rounded-md border-0 py-1.5 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                :class="[
                                    !isInitialForm.email && hasInvalidEmail
                                        ? 'ring-red-300 focus:ring-red-500 bg-red-100'
                                        : 'ring-gray-300 focus:ring-indigo-600',
                                ]"
                            />
                            <div
                                v-else
                                class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                {{ staff.email }}
                            </div>
                            <p
                                v-if="!isInitialForm.email && isEmptyEmail"
                                class="mt-2 text-sm text-red-600"
                                id="email-error"
                            >
                                メールアドレスを入力してください
                            </p>
                            <p
                                v-if="!isInitialForm.email && isLengthOverEmail"
                                class="mt-2 text-sm text-red-600"
                                id="email-error"
                            >
                                メールアドレスは225文字以内で入力してください
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
            <button
                v-if="!isViewMode && !staff.id"
                :disabled="hasInvalidValue"
                type="submit"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                :class="[
                    hasInvalidValue ? 'opacity-30' : 'hover:bg-indigo-500',
                ]"
                @click.prevent="clickCreate"
            >
                新規作成
            </button>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
            <button
                v-if="!isViewMode && staff.id"
                type="submit"
                class="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-gray-500"
                @click.stop="clickCancel"
            >
                キャンセル
            </button>
            <button
                v-if="!isViewMode && staff.id"
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

type Staff = {
    id?: number;
    firstName: string;
    lastName: string;
    firstNameKana: string;
    lastNameKana: string;
    email: string;
};

type FormType = "create" | "edit" | "view";

type Props = {
    staff: Staff;
    formType: FormType;
};

const props = defineProps<Props>();

const isViewMode = computed(() => {
    return props.formType === "view";
});

const staff = ref<Staff>({ ...props.staff });

const isInitialForm = reactive({
    firstName: true,
    lastName: true,
    firstNameKana: true,
    lastNameKana: true,
    email: true,
});

//firstName バリデーション
const isEmptyFirstName = computed(() => {
    return staff.value.firstName === "";
});
const isLengthOverFirstName = computed(() => {
    return !isEmptyFirstName.value && staff.value.firstName.length > 50;
});
const hasInvalidFirstName = computed(() => {
    return isEmptyFirstName.value || isLengthOverFirstName.value;
});

//lastName バリデーション
const isEmptyLastName = computed(() => {
    return staff.value.lastName === "";
});
const isLengthOverLastName = computed(() => {
    return !isEmptyLastName.value && staff.value.lastName.length > 50;
});
const hasInvalidLastName = computed(() => {
    return isEmptyLastName.value || isLengthOverLastName.value;
});

//firstNameKana バリデーション
const isEmptyFirstNameKana = computed(() => {
    return staff.value.firstNameKana === "";
});
const isLengthOverFirstNameKana = computed(() => {
    return !isEmptyFirstNameKana.value && staff.value.firstNameKana.length > 50;
});
const isInvalidFirstNameKana = computed(() => {
    return (
        !isEmptyFirstNameKana.value &&
        !!staff.value.firstNameKana.match(/[^ァ-ヶー　]+$/)
    );
});
const hasInvalidFirstNameKana = computed(() => {
    return (
        isEmptyFirstNameKana.value ||
        isLengthOverFirstNameKana.value ||
        isInvalidFirstNameKana.value
    );
});

//lastNameKana バリデーション
const isEmptyLastNameKana = computed(() => {
    return staff.value.lastNameKana === "";
});
const isLengthOverLastNameKana = computed(() => {
    return !isEmptyLastNameKana.value && staff.value.lastNameKana.length > 50;
});
const isInvalidLastNameKana = computed(() => {
    return (
        !isEmptyLastNameKana.value &&
        !!staff.value.lastNameKana.match(/[^ァ-ヶー　]+$/)
    );
});
const hasInvalidLastNameKana = computed(() => {
    return (
        isEmptyLastNameKana.value ||
        isLengthOverLastNameKana.value ||
        isInvalidLastNameKana.value
    );
});

// email バリデーション
const isEmptyEmail = computed(() => {
    return staff.value.email === "";
});
const isLengthOverEmail = computed(() => {
    return !isEmptyEmail.value && staff.value.email.length > 225;
});
const hasInvalidEmail = computed(() => {
    return isEmptyEmail.value || isLengthOverEmail.value;
});

const hasInvalidValue = computed(() => {
    return (
        hasInvalidEmail.value ||
        hasInvalidFirstName.value ||
        hasInvalidLastName.value ||
        hasInvalidFirstNameKana.value ||
        hasInvalidLastNameKana.value
    );
});

const emits = defineEmits(["create", "update", "delete", "change-mode"]);

const clickCreate = () => {
    emits("create", staff.value);
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
    staff.value = { ...props.staff };
};

const changeMode = (type: string) => {
    emits("change-mode", type);
};

const clickUpdate = () => {
    emits("update", staff.value);
};

const inputValue = (key: string) => {
    isInitialForm[key] = false;
};

watch(
    () => props.staff,
    (newStaff) => {
        staff.value = { ...newStaff };
    },
    { deep: true }
);
</script>
