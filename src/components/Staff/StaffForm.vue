<template>
    <form>
        <div class="space-y-12">
            <div class="border-b border-gray-900/10 pb-12">
                <div
                    class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
                >
                    <div class="sm:col-span-3">
                        <label
                            for="first-name"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >姓<span
                                class="ml-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                                >必須</span
                            ></label
                        >
                        <div class="mt-2 h-14">
                            <input
                                v-model="staff.FirstName"
                                type="text"
                                name="first-name"
                                id="first-name"
                                autocomplete="given-name"
                                @input="inputValue('FirstName')"
                                class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                :class="[
                                    !isInitialForm.FirstName &&
                                    hasInvalidFirstName
                                        ? 'ring-red-300 focus:ring-red-500 bg-red-100'
                                        : 'ring-gray-300 focus:ring-indigo-600',
                                ]"
                            />
                            <p
                                v-if="
                                    !isInitialForm.FirstName && isEmptyFirstName
                                "
                                class="mt-2 text-sm text-red-600"
                                id="first-name-error"
                            >
                                姓を入力してください
                            </p>
                            <p
                                v-if="
                                    !isInitialForm.FirstName &&
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
                                class="ml-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                                >必須</span
                            ></label
                        >
                        <div class="mt-2 h-14">
                            <input
                                v-model="staff.LastName"
                                type="text"
                                name="last-name"
                                id="last-name"
                                autocomplete="family-name"
                                @input="inputValue('LastName')"
                                class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                :class="[
                                    !isInitialForm.LastName &&
                                    hasInvalidLastName
                                        ? 'ring-red-300 focus:ring-red-500 bg-red-100'
                                        : 'ring-gray-300 focus:ring-indigo-600',
                                ]"
                            />
                            <p
                                v-if="
                                    !isInitialForm.LastName && isEmptyLastName
                                "
                                class="mt-2 text-sm text-red-600"
                                id="last-name-error"
                            >
                                名を入力してください
                            </p>
                            <p
                                v-if="
                                    !isInitialForm.LastName &&
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
                                class="ml-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                                >必須</span
                            ></label
                        >
                        <div class="mt-2 h-20">
                            <input
                                v-model="staff.FirstNameKana"
                                type="text"
                                name="first-name"
                                id="first-name"
                                autocomplete="given-name"
                                @input="inputValue('FirstNameKana')"
                                class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                :class="[
                                    !isInitialForm.FirstNameKana &&
                                    hasInvalidFirstNameKana
                                        ? 'ring-red-300 focus:ring-red-500 bg-red-100'
                                        : 'ring-gray-300 focus:ring-indigo-600',
                                ]"
                            />
                            <p
                                v-if="
                                    !isInitialForm.FirstNameKana &&
                                    isEmptyFirstNameKana
                                "
                                class="mt-2 text-sm text-red-600"
                                id="first-name-error"
                            >
                                姓(ヨミガナ)を入力してください
                            </p>
                            <p
                                v-if="
                                    !isInitialForm.FirstNameKana &&
                                    isLengthOverFirstNameKana
                                "
                                class="mt-2 text-sm text-red-600"
                                id="first-name-error"
                            >
                                姓(ヨミガナ)は50文字以内で入力してください
                            </p>
                            <p
                                v-if="
                                    !isInitialForm.FirstNameKana &&
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
                                class="ml-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                                >必須</span
                            ></label
                        >
                        <div class="mt-2 h-20">
                            <input
                                v-model="staff.LastNameKana"
                                type="text"
                                name="last-name"
                                id="last-name"
                                autocomplete="family-name"
                                @input="inputValue('LastNameKana')"
                                class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                :class="[
                                    !isInitialForm.LastNameKana &&
                                    hasInvalidLastNameKana
                                        ? 'ring-red-300 focus:ring-red-500 bg-red-100'
                                        : 'ring-gray-300 focus:ring-indigo-600',
                                ]"
                            />
                            <p
                                v-if="
                                    !isInitialForm.LastNameKana &&
                                    isEmptyLastNameKana
                                "
                                class="mt-2 text-sm text-red-600"
                                id="last-name-error"
                            >
                                名(ヨミガナ)を入力してください
                            </p>
                            <p
                                v-if="
                                    !isInitialForm.LastNameKana &&
                                    isLengthOverLastNameKana
                                "
                                class="mt-2 text-sm text-red-600"
                                id="last-name-error"
                            >
                                名(ヨミガナ)は50文字以内で入力してください
                            </p>
                            <p
                                v-if="
                                    !isInitialForm.LastNameKana &&
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
                                class="ml-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                                >必須</span
                            ></label
                        >
                        <div class="relative mt-2 h-20">
                            <input
                                v-model="staff.Mail"
                                id="email"
                                name="email"
                                type="email"
                                autocomplete="email"
                                @input="inputValue('Mail')"
                                class="p-2 block w-full rounded-md border-0 py-1.5 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                :class="[
                                    !isInitialForm.Mail && hasInvalidMail
                                        ? 'ring-red-300 focus:ring-red-500 bg-red-100'
                                        : 'ring-gray-300 focus:ring-indigo-600',
                                ]"
                            />
                            <p
                                v-if="!isInitialForm.Mail && isEmptyMail"
                                class="mt-2 text-sm text-red-600"
                                id="email-error"
                            >
                                メールアドレスを入力してください
                            </p>
                            <p
                                v-if="!isInitialForm.Mail && isLengthOverMail"
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
            <!-- TODO editモードの場合は、ここに「編集/保存/キャンセル」ボタンを設定 -->
            <button
                :disabled="hasInvalidValue"
                type="submit"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                :class="[
                    hasInvalidValue ? 'opacity-30' : 'hover:bg-indigo-500',
                ]"
                @click="create"
            >
                新規作成
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { defineProps, ref, computed, reactive } from "vue";

interface Staff {
    FirstName: string;
    LastName: string;
    FirstNameKana: string;
    LastNameKana: string;
    Mail: string;
}

interface Props {
    staff: Staff;
}

const props = defineProps<Props>();

const staff = ref<Staff>({
    FirstName: props.staff.FirstName,
    LastName: props.staff.LastName,
    FirstNameKana: props.staff.FirstNameKana,
    LastNameKana: props.staff.LastNameKana,
    Mail: props.staff.Mail,
});

const isInitialForm = reactive({
    FirstName: true,
    LastName: true,
    FirstNameKana: true,
    LastNameKana: true,
    Mail: true,
});

//FirstName バリデーション
const isEmptyFirstName = computed(() => {
    return staff.value.FirstName === "";
});
const isLengthOverFirstName = computed(() => {
    return !isEmptyFirstName.value && staff.value.FirstName.length > 50;
});
const hasInvalidFirstName = computed(() => {
    return isEmptyFirstName.value || isLengthOverFirstName.value;
});

//LastName バリデーション
const isEmptyLastName = computed(() => {
    return staff.value.LastName === "";
});
const isLengthOverLastName = computed(() => {
    return !isEmptyLastName.value && staff.value.LastName.length > 50;
});
const hasInvalidLastName = computed(() => {
    return isEmptyLastName.value || isLengthOverLastName.value;
});

//FirstNameKana バリデーション
const isEmptyFirstNameKana = computed(() => {
    return staff.value.FirstNameKana === "";
});
const isLengthOverFirstNameKana = computed(() => {
    return !isEmptyFirstNameKana.value && staff.value.FirstNameKana.length > 50;
});
const isInvalidFirstNameKana = computed(() => {
    return (
        !isEmptyFirstNameKana.value &&
        !!staff.value.FirstNameKana.match(/[^ァ-ヶー　]+$/)
    );
});
const hasInvalidFirstNameKana = computed(() => {
    return (
        isEmptyFirstNameKana.value ||
        isLengthOverFirstNameKana.value ||
        isInvalidFirstNameKana.value
    );
});

//LastNameKana バリデーション
const isEmptyLastNameKana = computed(() => {
    return staff.value.LastNameKana === "";
});
const isLengthOverLastNameKana = computed(() => {
    return !isEmptyLastNameKana.value && staff.value.LastNameKana.length > 50;
});
const isInvalidLastNameKana = computed(() => {
    return (
        !isEmptyLastNameKana.value &&
        !!staff.value.LastNameKana.match(/[^ァ-ヶー　]+$/)
    );
});
const hasInvalidLastNameKana = computed(() => {
    return (
        isEmptyLastNameKana.value ||
        isLengthOverLastNameKana.value ||
        isInvalidLastNameKana.value
    );
});

// Mail バリデーション
const isEmptyMail = computed(() => {
    return staff.value.Mail === "";
});
const isLengthOverMail = computed(() => {
    return !isEmptyMail.value && staff.value.Mail.length > 225;
});
const hasInvalidMail = computed(() => {
    return isEmptyMail.value || isLengthOverMail.value;
});

const hasInvalidValue = computed(() => {
    return (
        hasInvalidMail.value ||
        hasInvalidFirstName.value ||
        hasInvalidLastName.value ||
        hasInvalidFirstNameKana.value ||
        hasInvalidLastNameKana.value
    );
});

const create = () => {
    // TODO ここに処理を追加
    // console.log(staff.value);
};

const inputValue = (key: string) => {
    isInitialForm[key] = false;
};
</script>
