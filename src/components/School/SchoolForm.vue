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
                            >スクール名<span
                                v-show="!isViewMode"
                                class="ml-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                                >必須</span
                            ></label
                        >
                        <div class="mt-2 h-14">
                            <input
                                v-if="!isViewMode"
                                v-model="school.name"
                                type="text"
                                name="first-name"
                                id="school-name"
                                class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <div
                                v-else
                                class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                {{ school.name }}
                            </div>
                            <p
                                class="mt-2 text-sm text-red-600"
                                id="first-name-error"
                            >
                                スクール名を入力してください
                            </p>
                            <p
                                class="mt-2 text-sm text-red-600"
                                id="last-name-error"
                            >
                                スクール名は50文字以内で入力してください
                            </p>
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label
                            for="last-name"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >ステータス</label
                        >
                        <div class="mt-2 h-14">
                            <div
                                class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                ここにトグルを設置
                            </div>
                        </div>
                    </div>

                    <div class="sm:col-span-2">
                        <label
                            for="first-name"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >月額料金<span
                                v-show="!isViewMode"
                                class="ml-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                                >必須</span
                            ></label
                        >
                        <div class="mt-2 h-20">
                            <!-- 【todo】ここのタイプをnumberにする -->
                            <input
                                v-if="!isViewMode"
                                v-model="school.monthlyFee"
                                type="text"
                                name="monthlyFee"
                                id="monthlyFee"
                                class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <div
                                v-else
                                class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                {{ school.monthlyFee }}
                            </div>
                            <p
                                class="mt-2 text-sm text-red-600"
                                id="first-name-error"
                            >
                                月額料金を入力してください
                            </p>
                            <p
                                class="mt-2 text-sm text-red-600"
                                id="first-name-error"
                            >
                                月額料金は10,000,000文字以内で入力してください
                            </p>
                        </div>
                    </div>

                    <div class="sm:col-span-2">
                        <label
                            for="first-name"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >期間(数値)<span
                                v-show="!isViewMode"
                                class="ml-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                                >必須</span
                            ></label
                        >
                        <!-- 【done / 期間(数値)】 -->
                        <div class="mt-2 h-20">
                            <!-- 【todo】ここのタイプをnumberにする -->
                            <input
                                v-if="!isViewMode"
                                v-model="school.termNum"
                                type="text"
                                name="termNum"
                                id="termNum"
                                class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <div
                                v-else
                                class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                {{ school.termNum }}
                            </div>
                            <p
                                class="mt-2 text-sm text-red-600"
                                id="first-name-error"
                            >
                                期間(数値)を入力してください
                            </p>
                            <p
                                class="mt-2 text-sm text-red-600"
                                id="first-name-error"
                            >
                                期間(数値)は100以下で入力してください
                            </p>
                        </div>
                    </div>
                    <!-- 【done / 期間(単位)】 -->
                    <div class="sm:col-span-2">
                        <label
                            for="first-name"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >期間(単位)<span
                                v-show="!isViewMode"
                                class="ml-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                                >必須</span
                            ></label
                        >
                        <div class="mt-2 h-20">
                            <!-- 【todo】ここのタイプをセレクトにする -->
                            <!-- <input
                                v-if="!isViewMode"
                                v-model="school.termUnit"
                                type="text"
                                name="termUnit"
                                id="termUnit"
                                @input="inputValue('termUnit')"
                                class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                :class="[
                                    !isInitialForm.termUnit &&
                                    hasInvalidTermUnit
                                        ? 'ring-red-300 focus:ring-red-500 bg-red-100'
                                        : 'ring-gray-300 focus:ring-indigo-600',
                                ]"
                            /> -->
                            <div
                                class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                ここにセレクトを設置
                            </div>
                        </div>
                    </div>
                    <div>
                        <!-- 【todo】ここと下の幅が空きすぎているので調整する -->
                        <label
                            for="first-name"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >タグ
                        </label>
                    </div>

                    <!-- 【done / タグ】 -->
                    <div class="flex w-full sm:col-span-6">
                        <!-- 【todo】↓これはv-forで回すようにする -->
                        <div class="sm:col-span-2 w-3/12">
                            <fieldset>
                                <div class="mt-6 space-y-6">
                                    <div class="relative flex gap-x-3">
                                        <div class="flex h-6 items-center">
                                            <input
                                                id="comments"
                                                name="comments"
                                                type="checkbox"
                                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div class="text-sm leading-6">
                                            <label
                                                for="comments"
                                                class="font-medium text-gray-900"
                                                >リモートで学習可能</label
                                            >
                                        </div>
                                    </div>
                                    <div class="relative flex gap-x-3">
                                        <div class="flex h-6 items-center">
                                            <input
                                                id="candidates"
                                                name="candidates"
                                                type="checkbox"
                                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div class="text-sm leading-6">
                                            <label
                                                for="candidates"
                                                class="font-medium text-gray-900"
                                                >就職に強い</label
                                            >
                                        </div>
                                    </div>
                                    <div class="relative flex gap-x-3">
                                        <div class="flex h-6 items-center">
                                            <input
                                                id="offers"
                                                name="offers"
                                                type="checkbox"
                                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div class="text-sm leading-6">
                                            <label
                                                for="offers"
                                                class="font-medium text-gray-900"
                                                >働きながら学べる</label
                                            >
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div class="sm:col-span-2 w-3/12">
                            <fieldset>
                                <div class="mt-6 space-y-6">
                                    <div class="relative flex gap-x-3">
                                        <div class="flex h-6 items-center">
                                            <input
                                                id="comments"
                                                name="comments"
                                                type="checkbox"
                                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div class="text-sm leading-6">
                                            <label
                                                for="comments"
                                                class="font-medium text-gray-900"
                                                >リモートで学習可能</label
                                            >
                                        </div>
                                    </div>
                                    <div class="relative flex gap-x-3">
                                        <div class="flex h-6 items-center">
                                            <input
                                                id="candidates"
                                                name="candidates"
                                                type="checkbox"
                                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div class="text-sm leading-6">
                                            <label
                                                for="candidates"
                                                class="font-medium text-gray-900"
                                                >就職に強い</label
                                            >
                                        </div>
                                    </div>
                                    <div class="relative flex gap-x-3">
                                        <div class="flex h-6 items-center">
                                            <input
                                                id="offers"
                                                name="offers"
                                                type="checkbox"
                                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div class="text-sm leading-6">
                                            <label
                                                for="offers"
                                                class="font-medium text-gray-900"
                                                >働きながら学べる</label
                                            >
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div class="sm:col-span-2 w-3/12">
                            <fieldset>
                                <div class="mt-6 space-y-6">
                                    <div class="relative flex gap-x-3">
                                        <div class="flex h-6 items-center">
                                            <input
                                                id="comments"
                                                name="comments"
                                                type="checkbox"
                                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div class="text-sm leading-6">
                                            <label
                                                for="comments"
                                                class="font-medium text-gray-900"
                                                >リモートで学習可能</label
                                            >
                                        </div>
                                    </div>
                                    <div class="relative flex gap-x-3">
                                        <div class="flex h-6 items-center">
                                            <input
                                                id="candidates"
                                                name="candidates"
                                                type="checkbox"
                                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div class="text-sm leading-6">
                                            <label
                                                for="candidates"
                                                class="font-medium text-gray-900"
                                                >就職に強い</label
                                            >
                                        </div>
                                    </div>
                                    <div class="relative flex gap-x-3">
                                        <div class="flex h-6 items-center">
                                            <input
                                                id="offers"
                                                name="offers"
                                                type="checkbox"
                                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div class="text-sm leading-6">
                                            <label
                                                for="offers"
                                                class="font-medium text-gray-900"
                                                >働きながら学べる</label
                                            >
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div class="sm:col-span-2 w-3/12">
                            <fieldset>
                                <div class="mt-6 space-y-6">
                                    <div class="relative flex gap-x-3">
                                        <div class="flex h-6 items-center">
                                            <input
                                                id="comments"
                                                name="comments"
                                                type="checkbox"
                                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div class="text-sm leading-6">
                                            <label
                                                for="comments"
                                                class="font-medium text-gray-900"
                                                >リモートで学習可能</label
                                            >
                                        </div>
                                    </div>
                                    <div class="relative flex gap-x-3">
                                        <div class="flex h-6 items-center">
                                            <input
                                                id="candidates"
                                                name="candidates"
                                                type="checkbox"
                                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div class="text-sm leading-6">
                                            <label
                                                for="candidates"
                                                class="font-medium text-gray-900"
                                                >就職に強い</label
                                            >
                                        </div>
                                    </div>
                                    <div class="relative flex gap-x-3">
                                        <div class="flex h-6 items-center">
                                            <input
                                                id="offers"
                                                name="offers"
                                                type="checkbox"
                                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div class="text-sm leading-6">
                                            <label
                                                for="offers"
                                                class="font-medium text-gray-900"
                                                >働きながら学べる</label
                                            >
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>

                    <!-- 【done /画像付きリンクタグ(imageLink) 】 -->
                    <div class="mt-20 col-span-full">
                        <label
                            for="about"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >画像付きリンクタグ</label
                        >
                        <div class="mt-2">
                            <label
                                for="first-name"
                                class="block text-sm font-medium leading-6 text-gray-900"
                                >1枚目<span
                                    v-show="!isViewMode"
                                    class="ml-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                                    >必須</span
                                ></label
                            >

                            <textarea
                                id="about"
                                name="about"
                                rows="3"
                                class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div class="mt-2">
                            2枚目
                            <textarea
                                id="about"
                                name="about"
                                rows="3"
                                class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div class="mt-2">
                            3枚目
                            <textarea
                                id="about"
                                name="about"
                                rows="3"
                                class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <!-- 【done /概要】 -->
                    <div class="mt-20 col-span-full">
                        <label
                            for="first-name"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >概要<span
                                v-show="!isViewMode"
                                class="ml-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                                >必須</span
                            ></label
                        >
                        <div class="mt-2">
                            <textarea
                                id="about"
                                name="about"
                                rows="3"
                                class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <!-- 【done / おすすめ】 -->
                    <div class="mt-20 col-span-full">
                        <label
                            for="about"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >おすすめ</label
                        >
                        <div class="mt-2">
                            <!-- 【todo】↓ここの中身をおすすめ用に修正する -->
                            <!-- 【todo】↓v-forで書くようにする -->
                            <div class="mt-2 h-14 mb-11">
                                <label
                                    for="first-name"
                                    class="block text-sm font-medium leading-6 text-gray-900"
                                    >1<span
                                        v-show="!isViewMode"
                                        class="ml-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                                        >必須</span
                                    ></label
                                >
                                <input
                                    v-if="!isViewMode"
                                    v-model="school.name"
                                    type="text"
                                    name="first-name"
                                    id="school-name"
                                    class="mb-3 mt-1 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <div
                                    v-else
                                    class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    {{ school.name }}
                                </div>
                                <p
                                    class="mt-2 text-sm text-red-600"
                                    id="first-name-error"
                                >
                                    スクール名を入力してください
                                </p>
                                <p
                                    class="mt-2 text-sm text-red-600"
                                    id="last-name-error"
                                >
                                    スクール名は50文字以内で入力してください
                                </p>
                            </div>
                            <div class="mt-2 h-14 mb-11">
                                <label
                                    for="first-name"
                                    class="block text-sm font-medium leading-6 text-gray-900"
                                    >2<span
                                        v-show="!isViewMode"
                                        class="ml-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                                        >必須</span
                                    ></label
                                >
                                <input
                                    v-if="!isViewMode"
                                    v-model="school.name"
                                    type="text"
                                    name="first-name"
                                    id="school-name"
                                    class="p-2 mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <div
                                    v-else
                                    class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    {{ school.name }}
                                </div>
                                <p
                                    class="mt-2 text-sm text-red-600"
                                    id="first-name-error"
                                >
                                    スクール名を入力してください
                                </p>
                                <p
                                    class="mt-2 text-sm text-red-600"
                                    id="last-name-error"
                                >
                                    スクール名は50文字以内で入力してください
                                </p>
                            </div>
                            <div class="mt-2 h-14 mb-11">
                                <label
                                    for="first-name"
                                    class="block text-sm font-medium leading-6 text-gray-900"
                                    >3<span
                                        v-show="!isViewMode"
                                        class="ml-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                                        >必須</span
                                    ></label
                                >
                                <input
                                    v-if="!isViewMode"
                                    v-model="school.name"
                                    type="text"
                                    name="first-name"
                                    id="school-name"
                                    class="p-2 mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <div
                                    v-else
                                    class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    {{ school.name }}
                                </div>
                                <p
                                    class="mt-2 text-sm text-red-600"
                                    id="first-name-error"
                                >
                                    スクール名を入力してください
                                </p>
                                <p
                                    class="mt-2 text-sm text-red-600"
                                    id="last-name-error"
                                >
                                    スクール名は50文字以内で入力してください
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- 【done / 特徴 -->
                    <div class="mt-20 col-span-full">
                        <label
                            for="about"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >特徴</label
                        >
                        <div class="mt-2">
                            <!-- 【todo】↓ここの中身を特徴用に修正する -->
                            <!-- 【todo】↓v-forで書くようにする -->
                            <div class="mt-2 h-14 mb-11">
                                <label
                                    for="first-name"
                                    class="block text-sm font-medium leading-6 text-gray-900"
                                    >1<span
                                        v-show="!isViewMode"
                                        class="ml-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                                        >必須</span
                                    ></label
                                >
                                <input
                                    v-if="!isViewMode"
                                    v-model="school.name"
                                    type="text"
                                    name="first-name"
                                    id="school-name"
                                    class="mb-3 mt-1 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <div
                                    v-else
                                    class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    {{ school.name }}
                                </div>
                                <p
                                    class="mt-2 text-sm text-red-600"
                                    id="first-name-error"
                                >
                                    スクール名を入力してください
                                </p>
                                <p
                                    class="mt-2 text-sm text-red-600"
                                    id="last-name-error"
                                >
                                    スクール名は50文字以内で入力してください
                                </p>
                            </div>
                            <div class="mt-2 h-14 mb-11">
                                <label
                                    for="first-name"
                                    class="block text-sm font-medium leading-6 text-gray-900"
                                    >2<span
                                        v-show="!isViewMode"
                                        class="ml-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                                        >必須</span
                                    ></label
                                >
                                <input
                                    v-if="!isViewMode"
                                    v-model="school.name"
                                    type="text"
                                    name="first-name"
                                    id="school-name"
                                    class="p-2 mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <div
                                    v-else
                                    class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    {{ school.name }}
                                </div>
                                <p
                                    class="mt-2 text-sm text-red-600"
                                    id="first-name-error"
                                >
                                    スクール名を入力してください
                                </p>
                                <p
                                    class="mt-2 text-sm text-red-600"
                                    id="last-name-error"
                                >
                                    スクール名は50文字以内で入力してください
                                </p>
                            </div>
                            <div class="mt-2 h-14 mb-11">
                                <label
                                    for="first-name"
                                    class="block text-sm font-medium leading-6 text-gray-900"
                                    >3<span
                                        v-show="!isViewMode"
                                        class="ml-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                                        >必須</span
                                    ></label
                                >
                                <input
                                    v-if="!isViewMode"
                                    v-model="school.name"
                                    type="text"
                                    name="first-name"
                                    id="school-name"
                                    @input="inputValue('name')"
                                    class="p-2 mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <div
                                    v-else
                                    class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    {{ school.name }}
                                </div>
                                <p
                                    class="mt-2 text-sm text-red-600"
                                    id="first-name-error"
                                >
                                    スクール名を入力してください
                                </p>
                                <p
                                    class="mt-2 text-sm text-red-600"
                                    id="last-name-error"
                                >
                                    スクール名は50文字以内で入力してください
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- 【done /リンクタグ(link) 】 -->
                    <div class="mt-20 col-span-full">
                        <label
                            for="first-name"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >リンクタグ<span
                                v-show="!isViewMode"
                                class="ml-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                                >必須</span
                            ></label
                        >
                        <div class="mt-2">
                            <textarea
                                id="about"
                                name="about"
                                rows="3"
                                class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <!-- 【done /備考 】 -->
                    <div class="mt-20 col-span-full">
                        <label
                            for="first-name"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >備考</label
                        >
                        <div class="mt-2">
                            <textarea
                                id="about"
                                name="about"
                                rows="3"
                                class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
            <button
                type="submit"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                @click.prevent="clickCreate"
            >
                新規作成
            </button>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
            <button
                type="submit"
                class="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-gray-500"
                @click.stop="clickCancel"
            >
                キャンセル
            </button>
            <button
                type="submit"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                @click.prevent="clickUpdate"
            >
                更新
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { defineProps, ref, computed, reactive, watch } from "vue";
import { School } from "../../types/school";

type FormType = "create" | "edit" | "view";

type Props = {
    school: School;
    formType: FormType;
};

const emits = defineEmits(["create", "update", "delete", "change-mode"]);

const props = defineProps<Props>();

const isViewMode = computed(() => {
    return props.formType === "view";
});

const school = ref<School>({ ...props.school });

const clickCreate = () => {
    emits("create", school.value);
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
    school.value = { ...props.school };
};

const changeMode = (type: string) => {
    emits("change-mode", type);
};

const clickUpdate = () => {
    emits("update", school.value);
};

const inputValue = (key: string) => {
    isInitialForm[key] = false;
};

watch(
    () => props.school,
    (newSchool) => {
        school.value = { ...newSchool };
    },
    { deep: true }
);
</script>
