<template>
    <form>
        <div class="space-y-12">
            <div class="space-y-12">
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
                        v-if="meStore.isAdmin"
                        type="submit"
                        class="rounded-md bg-red-100 px-3 py-2 text-sm font-semibold hover:bg-red-100 text-red-700 shadow-sm bg-red-200 focus-visible:outline"
                        @click.prevent="clickDelete"
                    >
                        削除
                    </button>
                </div>
            </div>

            <div class="border-gray-900/10 pb-12">
                <div
                    class="mt- grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
                >
                    <div class="sm:col-span-4">
                        <label
                            for="first-name"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >相談者名<span
                                v-show="!isViewMode"
                                class="ml-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                                >必須</span
                            ></label
                        >
                        <div class="mt-2 h-14">
                            <input
                                v-if="!isViewMode"
                                v-model="counselingVal.counseleeName"
                                type="text"
                                name="school-name"
                                id="school-name"
                                @input="inputValue('counseleeName')"
                                class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                :class="[
                                    !isInitialForm.counseleeName &&
                                    hasInvalidCounseleeName
                                        ? 'ring-red-300 focus:ring-red-500 bg-red-100'
                                        : 'ring-gray-300 focus:ring-indigo-600',
                                ]"
                            />
                            <div
                                v-else
                                class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                {{ counselingVal.counseleeName }}
                            </div>
                            <p
                                v-if="
                                    !isInitialForm.counseleeName &&
                                    isEmptyCounseleeName
                                "
                                class="mt-2 text-sm text-red-600"
                                id="name-error"
                            >
                                相談者名を入力してください
                            </p>
                            <p
                                v-if="
                                    !isInitialForm.counseleeName &&
                                    isLengthOverCounseleeName
                                "
                                class="mt-2 text-sm text-red-600"
                                id="last-name-error"
                            >
                                相談者名は50文字以内で入力してください
                            </p>
                        </div>
                    </div>

                    <div class="sm:col-span-1">
                        <label
                            for="first-name"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >ステータス</label
                        >
                        <div class="mt-2 h-20">
                            <select
                                v-if="!isViewMode"
                                id="status"
                                name="status"
                                v-model="counselingVal.status"
                                class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                <option
                                    v-for="status in statusOptions"
                                    :key="status.id"
                                    :value="status.id"
                                >
                                    {{ status.value }}
                                </option>
                            </select>
                            <div
                                v-else
                                class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                {{ statusRoleLabel }}
                            </div>
                        </div>
                    </div>

                    <div class="sm:col-span-4">
                        <label
                            for="email"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >Emaii<span
                                v-show="!isViewMode"
                                class="ml-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                                >必須</span
                            ></label
                        >
                        <div class="relative mt-2 h-20">
                            <input
                                v-if="!isViewMode"
                                v-model="counselingVal.email"
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
                                {{ counselingVal.email }}
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

                    <div class="sm:col-span-1">
                        <label
                            for="first-name"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >担当者<span
                                v-show="!isViewMode"
                                class="ml-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                                >必須</span
                            ></label
                        >
                        <div class="mt-2 h-20">
                            <select
                                v-if="
                                    !isViewMode &&
                                    userOptions.length &&
                                    counselingVal.user
                                "
                                id="userName"
                                name="userName"
                                v-model="counselingVal.user.id"
                                class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                <option
                                    v-for="user in userOptions"
                                    :key="user.id"
                                    :value="user.id"
                                >
                                    {{ user.name }}
                                </option>
                            </select>
                            <div
                                v-else
                                class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                {{
                                    counselingVal.user
                                        ? counselingVal.user.name
                                        : ""
                                }}
                            </div>
                        </div>
                    </div>

                    <div class="sm:col-span-4">
                        <label
                            for="date-picker"
                            class="block text-sm font-medium leading-6 text-gray-900"
                        >
                            日時<span
                                v-show="!isViewMode"
                                class="ml-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                                >必須</span
                            >
                        </label>
                        <div
                            v-if="isViewMode"
                            class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                            {{
                                counseling.date
                                    ? formatDate(counseling.date)
                                    : ""
                            }}
                        </div>
                        <div v-else>
                            <v-date-picker
                                v-model="counselingVal.date"
                                class="p-2 block w-full rounded-md border-0 py-1.5 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                is24hr
                                mode="dateTime"
                                :disabled="true"
                            ></v-date-picker>
                        </div>
                    </div>

                    <div class="col-span-full">
                        <label
                            for="first-name"
                            class="block text-sm font-medium leading-6 text-gray4-900"
                            >提案するスクール
                        </label>
                        <div class="grid grid-cols-4 gap-4 mt-2">
                            <div
                                v-for="school in schoolOptions"
                                :key="school.id || 'unknown'"
                                class="flex items-center"
                            >
                                <input
                                    type="checkbox"
                                    :value="school.id"
                                    :id="school.name"
                                    :disabled="isViewMode"
                                    class="hover:cursor-pointer"
                                    v-model="counselingVal.selectedSchoolIds"
                                />
                                <label
                                    :for="school.name"
                                    class="ml-2 hover:cursor-pointer"
                                    >{{ school.name }}</label
                                >
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-20 col-span-full">
                    <label
                        for="email"
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >メッセージ<span
                            v-show="!isViewMode"
                            class="ml-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                            >必須</span
                        ></label
                    >

                    <div class="mt-2">
                        <textarea
                            v-if="!isViewMode"
                            v-model="counselingVal.message"
                            @input="inputValue('message')"
                            id="message"
                            name="message"
                            rows="3"
                            class="mt-2 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            :class="[
                                !isInitialForm.message && hasInvalidMessage
                                    ? 'ring-red-300 focus:ring-red-500 bg-red-100'
                                    : 'ring-gray-300 focus:ring-indigo-600',
                            ]"
                        />
                        <div
                            v-else
                            class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                            {{ counselingVal.message }}
                        </div>

                        <p
                            v-if="!isInitialForm.message && isEmptyMessage"
                            class="mt-2 text-sm text-red-600"
                            id="email-error"
                        >
                            メッセージを入力してください
                        </p>
                        <p
                            v-if="!isInitialForm.message && isLengthOverMessage"
                            class="mt-2 text-sm text-red-600"
                            id="last-name-error"
                        >
                            メッセージは1000文字以内で入力してください
                        </p>
                    </div>
                </div>

                <div class="mt-20 col-span-full">
                    <label
                        for="first-name"
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >備考</label
                    >
                    <div class="mt-2">
                        <textarea
                            v-if="!isViewMode"
                            v-model="counselingVal.remarks"
                            @input="inputValue('remarks')"
                            id="remarks"
                            name="remarks"
                            rows="1"
                            class="mt-2 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            :class="[
                                !isInitialForm.remarks && hasInvalidRemarks
                                    ? 'ring-red-300 focus:ring-red-500 bg-red-100'
                                    : 'ring-gray-300 focus:ring-indigo-600',
                            ]"
                        />
                        <div
                            v-else
                            class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                            {{ counselingVal.remarks }}
                        </div>
                        <p
                            v-if="!isInitialForm.remarks && isLengthOverRemarks"
                            class="mt-2 text-sm text-red-600"
                            id="last-name-error"
                        >
                            備考は1000文字以内で入力してください
                        </p>
                    </div>
                </div>
            </div>

            <div class="mt-6 flex items-center justify-end gap-x-6">
                <button
                    v-if="!isViewMode && !counselingVal.id"
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
                    v-if="!isViewMode && counseling.id"
                    type="submit"
                    class="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-gray-500"
                    @click.stop="clickCancel"
                >
                    キャンセル
                </button>
                <button
                    v-if="!isViewMode && counseling.id"
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
        </div>
    </form>
</template>

<script setup lang="ts">
import { defineProps, ref, computed, reactive, watch } from "vue";
import { Counseling, counselingsStatus } from "@/types/counseling";
import { School } from "@/types/school";
import { User } from "@/types/user";
import { formatDate } from "@/utils/formatDate";
import { useMeStore } from "@/store/me";

import cloneDeep from "lodash/cloneDeep";

type FormType = "create" | "edit" | "view";

type Props = {
    counseling: Counseling;
    formType: FormType;
    schoolOptions: School[];
    userOptions: User[];
};
const meStore = useMeStore();

const emits = defineEmits([
    "create",
    "update",
    "cancel",
    "delete",
    "change-mode",
]);

const props = defineProps<Props>();

const isViewMode = computed(() => {
    return props.formType === "view";
});

const counselingVal = ref<Counseling>(
    JSON.parse(JSON.stringify(props.counseling))
); // deep copy

const statusOptions = [
    { id: 1, value: "実施前" },
    { id: 2, value: "実施完了" },
    { id: 3, value: "キャンセル" },
];

const statusRoleLabel = computed(() => {
    switch (counselingVal.value.status) {
        case counselingsStatus.Ready:
            return "実施前";
        case counselingsStatus.Completed:
            return "実施完了";
        case counselingsStatus.Canceled:
            return "キャンセル";
        default:
            return "";
    }
});

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
    counselingVal.value = { ...props.counseling };
};

const clickUpdate = () => {
    const dateStr =
        counselingVal.value.date instanceof Date
            ? counselingVal.value.date.toISOString()
            : counselingVal.value.date;

    const params = {
        id: counselingVal.value?.id,
        counseleeName: counselingVal.value.counseleeName,
        email: counselingVal.value.email,
        date: dateStr,
        status: counselingVal.value.status,
        remarks: counselingVal.value.remarks,
        message: counselingVal.value.message,
        userId: counselingVal.value.user?.id,
        schoolIds: counselingVal.value.selectedSchoolIds,
    };

    if (
        (props.counseling.status == counselingsStatus.Ready &&
            params.status == counselingsStatus.Completed) ||
        (props.counseling.status == counselingsStatus.Canceled &&
            params.status == counselingsStatus.Completed)
    ) {
        if (
            window.confirm(
                "ステータスが「実施完了」に更新すると、相談者にカウンセリング完了メールが送信されます。こちらの内容でよろしいですか？"
            )
        ) {
            emits("update", params);
        } else {
            return;
        }
    } else {
        emits("update", params);
    }
};

const changeMode = (type: string) => {
    emits("change-mode", type);
};

// counseleeName バリデーション
const isEmptyCounseleeName = computed(() => {
    return counselingVal.value.counseleeName === "";
});
const isLengthOverCounseleeName = computed(() => {
    return (
        !isEmptyCounseleeName.value &&
        counselingVal.value.counseleeName.length > 50
    );
});
const hasInvalidCounseleeName = computed(() => {
    return isEmptyCounseleeName.value || isLengthOverCounseleeName.value;
});

// email バリデーション
const isEmptyEmail = computed(() => {
    return counselingVal.value.email === "";
});
const isLengthOverEmail = computed(() => {
    return !isEmptyEmail.value && counselingVal.value.email.length > 225;
});
const hasInvalidEmail = computed(() => {
    return isEmptyEmail.value || isLengthOverEmail.value;
});

// user バリデーション
const isEmptyUser = computed(() => {
    return counselingVal.value.user?.id === undefined;
});
const hasInvalidUser = computed(() => {
    return isEmptyUser.value;
});

// date バリデーション
const isEmptyDate = computed(() => {
    return counselingVal.value.date === null;
});
const hasInvalidDate = computed(() => {
    return isEmptyDate.value;
});

// message バリデーション

const isEmptyMessage = computed(() => {
    return counselingVal.value.message === "";
});

const isLengthOverMessage = computed(() => {
    return !isEmptyMessage.value && counselingVal.value.message.length > 1000;
});
const hasInvalidMessage = computed(() => {
    return isEmptyMessage.value || isLengthOverMessage.value;
});

// remarks バリデーション
const isLengthOverRemarks = computed(() => {
    return (
        counselingVal.value.remarks && counselingVal.value.remarks.length > 1000
    );
});
const hasInvalidRemarks = computed(() => {
    return isLengthOverRemarks.value;
});

const hasInvalidValue = computed(() => {
    return (
        hasInvalidCounseleeName.value ||
        hasInvalidEmail.value ||
        hasInvalidRemarks.value ||
        hasInvalidMessage.value ||
        hasInvalidUser.value ||
        hasInvalidDate.value
    );
});

const isInitialForm = reactive({
    counseleeName: true,
    email: true,
    remarks: true,
    message: true,
});

const inputValue = (key: string) => {
    isInitialForm[key as keyof typeof isInitialForm] = false;
};

const clickCreate = () => {
    // Goでも扱えるような形に変換
    const dateStr = counselingVal.value.date?.toISOString();

    const params = {
        id: counselingVal.value?.id,
        counseleeName: counselingVal.value.counseleeName,
        email: counselingVal.value.email,
        date: dateStr,
        status: counselingVal.value.status,
        remarks: counselingVal.value.remarks,
        message: counselingVal.value.message,
        userId: counselingVal.value.user?.id,
        schoolIds: counselingVal.value.selectedSchoolIds,
    };

    if (params.status == counselingsStatus.Completed) {
        if (
            window.confirm(
                "ステータスが「実施完了」で作成すると、相談者にカウンセリング完了メールが送信されます。こちらの内容でよろしいですか？"
            )
        ) {
            emits("create", params);
        } else {
            return;
        }
    } else {
        emits("create", params);
    }
};

watch(
    () => props.counseling,
    (newCounseling) => {
        counselingVal.value = cloneDeep(newCounseling);
    },
    { deep: true }
);
</script>
