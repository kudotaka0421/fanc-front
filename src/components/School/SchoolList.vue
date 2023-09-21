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
                                    スクール名
                                </th>
                                <th
                                    scope="col"
                                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                >
                                    月額料金(税込)
                                </th>
                                <th
                                    scope="col"
                                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                >
                                    期間
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            class="hover:cursor-pointer divide-y divide-gray-200"
                        >
                            <tr
                                v-for="school in schools"
                                :key="school.id || school.link"
                                @click="
                                    school.id && goToSchoolDetail(school.id)
                                "
                            >
                                <td
                                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
                                >
                                    {{ school.name }}
                                </td>

                                <td
                                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
                                >
                                    {{ school.monthlyFee }}円 〜
                                </td>

                                <td
                                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
                                >
                                    {{
                                        getTermLabel(
                                            school.termUnit,
                                            school.termNum
                                        )
                                    }}
                                    〜
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
import { School } from "@/types/school";

const router = useRouter();

type Props = {
    schools: School[];
};

const props = defineProps<Props>();

const goToSchoolDetail = (schoolId: number) => {
    router.push(`/schools/${schoolId}`);
};

const getTermLabel = (termUnit: number, termNum: string) => {
    switch (termUnit) {
        case 1:
            return `${termNum}週間`;
        case 2:
            return `${termNum}ヶ月`;
        default:
            return "";
    }
};
</script>
