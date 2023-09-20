<template>
    <div class="px-4 sm:px-6 lg:px-8">
        <!-- <div class="sm:flex sm:items-center flex-row-reverse">
            <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex justify-end">
                <button
                    type="button"
                    onclick="location.href='userCreate'"
                    class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    新規作成
                </button>
            </div>
        </div> -->
        <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div
                    class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
                >
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th
                                    scope="col"
                                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                >
                                    ステータス
                                </th>
                                <th
                                    scope="col"
                                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                >
                                    日時
                                </th>
                                <th
                                    scope="col"
                                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                >
                                    担当者
                                </th>
                                <th
                                    scope="col"
                                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >
                                    Email
                                </th>
                                <th
                                    scope="col"
                                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                >
                                    相談者名
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            class="hover:cursor-pointer divide-y divide-gray-200"
                        >
                            <tr
                                v-for="counseling in counselings"
                                :key="counseling.id || counseling.email"
                                @click="
                                    counseling.id &&
                                        goToCounselingDetail(counseling.id)
                                "
                            >
                                <td
                                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
                                >
                                    {{
                                        getCounselingsStatusLabel(
                                            counseling.status
                                        )
                                    }}
                                </td>

                                <td
                                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
                                >
                                    {{
                                        counseling.date
                                            ? formatDate(counseling.date)
                                            : ""
                                    }}
                                </td>

                                <td
                                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
                                >
                                    {{ counseling.user?.name }}
                                </td>

                                <td
                                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
                                >
                                    {{ counseling.email }}
                                </td>

                                <td
                                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
                                >
                                    {{ counseling.counseleeName }}
                                </td>

                                <!-- <td
                                    class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                                >
                                    {{ getUserRoleLabel(user.role) }}
                                </td> -->
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import { Counseling, counselingsStatus } from "../../types/counseling";
import { formatDate } from "@/utils/formatDate";
// import { User, userRole } from "../../types/use
// import { counselingsStatus } from "@/types/counseling";

const router = useRouter();

type Props = {
    counselings: Counseling[];
};

const props = defineProps<Props>();

const goToCounselingDetail = (counselingId: number) => {
    router.push(`/counselings/${counselingId}`);
};

// const getUserRoleLabel = (role: number) => {
//     switch (role) {
//         case userRole.Staff:
//             return "スタッフ";
//         case userRole.Admin:
//             return "管理者";
//         default:
//             return "";
//     }
// };

const getCounselingsStatusLabel = (status: number) => {
    switch (status) {
        case counselingsStatus.Ready:
            return "実施前";
        case counselingsStatus.Completed:
            return "完了";
        case counselingsStatus.Canceled:
            return "キャンセル";
        default:
            return "";
    }
};
</script>
