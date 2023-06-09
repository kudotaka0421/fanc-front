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
                            >名前<span
                                v-show="!isViewMode"
                                class="ml-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                                >必須</span
                            ></label
                        >
                        <div class="mt-2 h-14">
                            <input
                                v-if="!isViewMode"
                                v-model="user.name"
                                type="text"
                                name="name"
                                id="name"
                                autocomplete="name"
                                @input="inputValue('name')"
                                class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                :class="[
                                    !isInitialForm.name && hasInvalidName
                                        ? 'ring-red-300 focus:ring-red-500 bg-red-100'
                                        : 'ring-gray-300 focus:ring-indigo-600',
                                ]"
                            />
                            <div
                                v-else
                                class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                {{ user.name }}
                            </div>
                            <p
                                v-if="!isInitialForm.name && isEmptyName"
                                class="mt-2 text-sm text-red-600"
                                id="first-name-error"
                            >
                                名前を入力してください
                            </p>
                            <p
                                v-if="!isInitialForm.name && isLengthOverName"
                                class="mt-2 text-sm text-red-600"
                                id="last-name-error"
                            >
                                名前は50文字以内で入力してください
                            </p>
                        </div>
                    </div>

                    <!-- [TODO] 管理画面のユーザーフォームの場合は表示、
                    ユーザーが新規登録する際はセレクトを非表示にしてroleは初期値の1(ユーザー)で固定する -->
                    <div class="sm:col-span-2">
                        <label
                            for="first-name"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >権限</label
                        >
                        <div class="mt-2 h-20">
                            <select
                                id="role"
                                name="termUnit"
                                v-model="user.role"
                                class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                <option
                                    v-for="role in roleOptions"
                                    :key="role.id"
                                    :value="role.id"
                                >
                                    {{ role.value }}
                                </option>
                            </select>
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
                                v-model="user.email"
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
                                {{ user.email }}
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

                    <div class="sm:col-span-4">
                        <label
                            for="email"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >パスワード<span
                                v-show="!isViewMode"
                                class="ml-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                                >必須</span
                            ></label
                        >
                        <div class="relative mt-2 h-20">
                            <input
                                v-if="!isViewMode"
                                v-model="user.password"
                                id="password"
                                name="password"
                                type="text"
                                autocomplete="password"
                                @input="inputValue('password')"
                                class="p-2 block w-full rounded-md border-0 py-1.5 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                :class="[
                                    !isInitialForm.password &&
                                    hasInvalidPassword
                                        ? 'ring-red-300 focus:ring-red-500 bg-red-100'
                                        : 'ring-gray-300 focus:ring-indigo-600',
                                ]"
                            />
                            <div
                                v-else
                                class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                {{ user.password }}
                            </div>
                            <p
                                v-if="
                                    !isInitialForm.password && isEmptyPassword
                                "
                                class="mt-2 text-sm text-red-600"
                                id="email-error"
                            >
                                パスワードを入力してください
                            </p>

                            <p
                                v-if="
                                    !isInitialForm.password && isInvalidPassword
                                "
                                class="mt-2 text-sm text-red-600"
                                id="email-error"
                            >
                                パスワードは英数字両方を含む8文字以上で入力してください
                            </p>

                            <p
                                v-if="
                                    !isInitialForm.password &&
                                    isLengthOverPassword
                                "
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
                v-if="!isViewMode && !user.id"
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
                v-if="!isViewMode && user.id"
                type="submit"
                class="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-gray-500"
                @click.stop="clickCancel"
            >
                キャンセル
            </button>
            <button
                v-if="!isViewMode && user.id"
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

type User = {
    id?: number;
    name: string;
    email: string;
    role: number;
    password: string;
};

type FormType = "create" | "edit" | "view";

type Props = {
    user: User;
    formType: FormType;
};

const props = defineProps<Props>();

const isViewMode = computed(() => {
    return props.formType === "view";
});

const user = ref<User>({ ...props.user });

const isInitialForm = reactive({
    name: true,
    email: true,
    password: true,
});

const roleOptions = [
    { id: 1, value: "ユーザー" },
    { id: 2, value: "スタッフ" },
    { id: 3, value: "管理者" },
];

//name バリデーション
const isEmptyName = computed(() => {
    return user.value.name === "";
});
const isLengthOverName = computed(() => {
    return !isEmptyName.value && user.value.name.length > 50;
});
const hasInvalidName = computed(() => {
    return isEmptyName.value || isLengthOverName.value;
});

// password バリデーション
const isEmptyPassword = computed(() => {
    return user.value.password === "";
});
const isLengthOverPassword = computed(() => {
    return !isEmptyPassword.value && user.value.password.length > 225;
});
const isInvalidPassword = computed(() => {
    return (
        !isEmptyPassword.value &&
        (!/(?=.*[0-9])(?=.*[a-zA-Z])/.test(user.value.password) ||
            user.value.password.length < 8)
    );
});
const hasInvalidPassword = computed(() => {
    return (
        isEmptyPassword.value ||
        isInvalidPassword.value ||
        isLengthOverPassword.value
    );
});

// email バリデーション
const isEmptyEmail = computed(() => {
    return user.value.email === "";
});
const isLengthOverEmail = computed(() => {
    return !isEmptyEmail.value && user.value.email.length > 225;
});
const hasInvalidEmail = computed(() => {
    return isEmptyEmail.value || isLengthOverEmail.value;
});

const hasInvalidValue = computed(() => {
    return (
        hasInvalidEmail.value ||
        hasInvalidName.value ||
        hasInvalidPassword.value
    );
});

const emits = defineEmits(["create", "update", "delete", "change-mode"]);

const clickCreate = () => {
    emits("create", user.value);
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
    user.value = { ...props.user };
};

const changeMode = (type: string) => {
    emits("change-mode", type);
};

const clickUpdate = () => {
    emits("update", user.value);
};

const inputValue = (key: string) => {
    isInitialForm[key] = false;
};

watch(
    () => props.user,
    (newUser) => {
        user.value = { ...newUser };
    },
    { deep: true }
);
</script>
