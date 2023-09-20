<template>
    <div class="px-4 sm:px-6 lg:px-8">
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

const router = useRouter();

type Props = {
    counselings: Counseling[];
};

const props = defineProps<Props>();

const goToCounselingDetail = (counselingId: number) => {
    router.push(`/counselings/${counselingId}`);
};

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
