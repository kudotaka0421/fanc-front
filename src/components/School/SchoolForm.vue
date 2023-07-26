<template>
    <form>
        <div class="space-y-12">
            <div class="border-b border-gray-900/10 pb-12">
                <div
                    class="mt- grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
                >
                    <div class="sm:col-span-5">
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
                                v-model="schoolVal.name"
                                type="text"
                                name="school-name"
                                id="school-name"
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
                                {{ schoolVal.name }}
                            </div>
                            <p
                                v-if="!isInitialForm.name && isEmptyName"
                                class="mt-2 text-sm text-red-600"
                                id="name-error"
                            >
                                スクール名を入力してください
                            </p>
                            <p
                                v-if="!isInitialForm.name && isLengthOverName"
                                class="mt-2 text-sm text-red-600"
                                id="last-name-error"
                            >
                                スクール名は50文字以内で入力してください
                            </p>
                        </div>
                    </div>

                    <div class="sm:col-span-1">
                        <label
                            for="last-name"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >画面表示</label
                        >
                        <div class="mt-4 h-14">
                            <Switch
                                v-model="schoolVal.isShow"
                                :class="[
                                    schoolVal.isShow
                                        ? 'bg-indigo-600'
                                        : 'bg-gray-200',
                                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2',
                                ]"
                            >
                                <span class="sr-only">Use setting</span>
                                <span
                                    :class="[
                                        schoolVal.isShow
                                            ? 'translate-x-5'
                                            : 'translate-x-0',
                                        'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                                    ]"
                                >
                                    <span
                                        :class="[
                                            schoolVal.isShow
                                                ? 'opacity-0 duration-100 ease-out'
                                                : 'opacity-100 duration-200 ease-in',
                                            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
                                        ]"
                                        aria-hidden="true"
                                    >
                                        <svg
                                            class="h-3 w-3 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 12 12"
                                        >
                                            <path
                                                d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                    </span>
                                    <span
                                        :class="[
                                            schoolVal.isShow
                                                ? 'opacity-100 duration-200 ease-in'
                                                : 'opacity-0 duration-100 ease-out',
                                            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
                                        ]"
                                        aria-hidden="true"
                                    >
                                        <svg
                                            class="h-3 w-3 text-indigo-600"
                                            fill="currentColor"
                                            viewBox="0 0 12 12"
                                        >
                                            <path
                                                d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"
                                            />
                                        </svg>
                                    </span>
                                </span>
                            </Switch>
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
                            <input
                                v-if="!isViewMode"
                                v-model="schoolVal.monthlyFee"
                                type="text"
                                name="monthlyFee"
                                id="monthlyFee "
                                @input="
                                    checkMonthlyFeeValue();
                                    inputValue('monthlyFee');
                                "
                                class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                :class="[
                                    !isInitialForm.monthlyFee &&
                                    hasInvalidMonthlyFee
                                        ? 'ring-red-300 focus:ring-red-500 bg-red-100'
                                        : 'ring-gray-300 focus:ring-indigo-600',
                                ]"
                            />
                            <div
                                v-else
                                class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                {{ schoolVal.monthlyFee }}
                            </div>
                            <p
                                v-if="
                                    !isInitialForm.monthlyFee &&
                                    isEmptyMonthlyFee
                                "
                                class="mt-2 text-sm text-red-600"
                                id="monthly-fee"
                            >
                                月額料金を入力してください
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
                        <div class="mt-2 h-20">
                            <input
                                v-if="!isViewMode"
                                v-model="schoolVal.termNum"
                                type="text"
                                name="termNum"
                                id="termNum"
                                @input="
                                    checkTermNumValue();
                                    inputValue('termNum');
                                "
                                class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                :class="[
                                    !isInitialForm.termNum && hasInvalidTermNum
                                        ? 'ring-red-300 focus:ring-red-500 bg-red-100'
                                        : 'ring-gray-300 focus:ring-indigo-600',
                                ]"
                            />
                            <div
                                v-else
                                class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                {{ schoolVal.termNum }}
                            </div>
                            <p
                                v-if="!isInitialForm.termNum && isEmptyTermNum"
                                class="mt-2 text-sm text-red-600"
                                id="first-name-error"
                            >
                                期間(数値)を入力してください
                            </p>
                        </div>
                    </div>
                    <div class="sm:col-span-2">
                        <label
                            for="first-name"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >期間(単位)</label
                        >
                        <div class="mt-2 h-20">
                            <select
                                id="termUnit"
                                name="termUnit"
                                v-model="schoolVal.termUnit"
                                class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                <option
                                    v-for="termUnit in termUnits"
                                    :key="termUnit.id"
                                    :value="termUnit.id"
                                >
                                    {{ termUnit.value }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="col-span-full">
                        <label
                            for="first-name"
                            class="block text-sm font-medium leading-6 text-gray4-900"
                            >タグ
                        </label>
                        <div class="grid grid-cols-4 gap-4 mt-2">
                            <div
                                v-for="tag in tagOptions"
                                :key="tag.id"
                                class="flex items-center"
                            >
                                <input
                                    type="checkbox"
                                    :value="tag.id"
                                    :id="tag.text"
                                    class="hover:cursor-pointer"
                                    v-model="schoolVal.selectedTagIds"
                                />
                                <label
                                    :for="tag.text"
                                    class="ml-2 hover:cursor-pointer"
                                    >{{ tag.text }}</label
                                >
                            </div>
                        </div>
                    </div>

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
                                >1<span
                                    v-show="!isViewMode"
                                    class="ml-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                                    >必須</span
                                ></label
                            >

                            <textarea
                                v-if="!isViewMode"
                                v-model="schoolVal.imageLinks[0]"
                                type="text"
                                name="imageLink1"
                                id="imageLink1"
                                @input="inputValue('imageLink1')"
                                rows="10"
                                class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                :class="[
                                    !isInitialForm.imageLink1 &&
                                    hasInvalidImageLink1
                                        ? 'ring-red-300 focus:ring-red-500 bg-red-100'
                                        : 'ring-gray-300 focus:ring-indigo-600',
                                ]"
                            />
                            <div
                                v-else
                                class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                {{ schoolVal.imageLinks[0] }}
                            </div>
                            <p
                                v-if="
                                    !isInitialForm.imageLink1 &&
                                    isEmptyImageLink1
                                "
                                class="mt-2 text-sm text-red-600"
                            >
                                画像付きリンクタグ1を入力してください
                            </p>
                            <p
                                v-if="
                                    !isInitialForm.imageLink1 &&
                                    isLengthOverImageLink1
                                "
                                class="mt-2 text-sm text-red-600"
                            >
                                画像付きリンクタグ1は1000文字以内で入力してください
                            </p>
                        </div>
                    </div>
                    <div class="mt-20 col-span-full">
                        2
                        <textarea
                            v-if="!isViewMode"
                            v-model="schoolVal.imageLinks[1]"
                            type="text"
                            name="imageLink2"
                            id="imageLink2"
                            @input="inputValue('imageLink2')"
                            rows="10"
                            class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            :class="[
                                !isInitialForm.imageLink2 &&
                                hasInvalidImageLink2
                                    ? 'ring-red-300 focus:ring-red-500 bg-red-100'
                                    : 'ring-gray-300 focus:ring-indigo-600',
                            ]"
                        />
                        <div
                            v-else
                            class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                            {{ schoolVal.imageLinks[1] }}
                        </div>
                        <p
                            v-if="
                                !isInitialForm.imageLink2 &&
                                isLengthOverImageLink2
                            "
                            class="mt-2 text-sm text-red-600"
                        >
                            画像付きリンクタグ1は1000文字以内で入力してください
                        </p>
                    </div>
                </div>
                <div class="mt-20 col-span-full">
                    3
                    <textarea
                        v-if="!isViewMode"
                        v-model="schoolVal.imageLinks[2]"
                        type="text"
                        name="imageLink3"
                        id="imageLink3"
                        @input="inputValue('imageLink3')"
                        rows="10"
                        class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        :class="[
                            !isInitialForm.imageLink3 && hasInvalidImageLink3
                                ? 'ring-red-300 focus:ring-red-500 bg-red-100'
                                : 'ring-gray-300 focus:ring-indigo-600',
                        ]"
                    />
                    <div
                        v-else
                        class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                        {{ schoolVal.imageLinks[2] }}
                    </div>
                    <p
                        v-if="
                            !isInitialForm.imageLink3 && isLengthOverImageLink3
                        "
                        class="mt-2 text-sm text-red-600"
                    >
                        画像付きリンクタグ3は1000文字以内で入力してください
                    </p>
                </div>
            </div>

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
                        v-if="!isViewMode"
                        v-model="schoolVal.overview"
                        id="school-overview"
                        name="school-overview"
                        rows="10"
                        class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        :class="[
                            !isInitialForm.overview && hasInvalidOverview
                                ? 'ring-red-300 focus:ring-red-500 bg-red-100'
                                : 'ring-gray-300 focus:ring-indigo-600',
                        ]"
                        @input="inputValue('overview')"
                    />

                    <div
                        v-else
                        class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                        {{ schoolVal.overview }}
                    </div>
                    <p
                        v-if="!isInitialForm.overview && isEmptyOverview"
                        class="mt-2 text-sm text-red-600"
                        id="overview-error"
                    >
                        概要を入力してください
                    </p>
                    <p
                        v-if="!isInitialForm.overview && isLengthOverOverview"
                        class="mt-2 text-sm text-red-600"
                        id="last-name-error"
                    >
                        概要は1000文字以内で入力してください
                    </p>
                </div>
            </div>

            <div class="mt-20 col-span-full">
                <label
                    for="about"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >おすすめ</label
                >
                <div class="mt-2">
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
                            v-model="schoolVal.recommendations[0]"
                            type="text"
                            name="recommendation1"
                            id="recommendation1"
                            @input="inputValue('recommendation1')"
                            class="mb-3 mt-1 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            :class="[
                                !isInitialForm.recommendation1 &&
                                hasInvalidRecommendation1
                                    ? 'ring-red-300 focus:ring-red-500 bg-red-100'
                                    : 'ring-gray-300 focus:ring-indigo-600',
                            ]"
                        />
                        <div
                            v-else
                            class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                            {{ schoolVal.recommendations[0] }}
                        </div>
                        <p
                            v-if="
                                !isInitialForm.recommendation1 &&
                                isEmptyRecommendation1
                            "
                            class="mt-2 text-sm text-red-600"
                        >
                            おすすめ1を入力してください
                        </p>
                        <p
                            v-if="
                                !isInitialForm.recommendation1 &&
                                isLengthOverRecommendation1
                            "
                            class="mt-2 text-sm text-red-600"
                        >
                            おすすめ1は100文字以内で入力してください
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
                            v-model="schoolVal.recommendations[1]"
                            type="text"
                            id="recommendation1"
                            @input="inputValue('recommendation2')"
                            class="p-2 mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            :class="[
                                !isInitialForm.recommendation2 &&
                                hasInvalidRecommendation2
                                    ? 'ring-red-300 focus:ring-red-500 bg-red-100'
                                    : 'ring-gray-300 focus:ring-indigo-600',
                            ]"
                        />
                        <div
                            v-else
                            class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                            {{ schoolVal.recommendations[1] }}
                        </div>
                        <p
                            v-if="
                                !isInitialForm.recommendation2 &&
                                isEmptyRecommendation2
                            "
                            class="mt-2 text-sm text-red-600"
                        >
                            おすすめ2を入力してください
                        </p>
                        <p
                            v-if="
                                !isInitialForm.recommendation2 &&
                                isLengthOverRecommendation2
                            "
                            class="mt-2 text-sm text-red-600"
                        >
                            おすすめ2は100文字以内で入力してください
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
                            v-model="schoolVal.recommendations[2]"
                            type="text"
                            name="recommendation3"
                            id="recommendation3"
                            @input="inputValue('recommendation3')"
                            class="p-2 mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            :class="[
                                !isInitialForm.recommendation3 &&
                                hasInvalidRecommendation3
                                    ? 'ring-red-300 focus:ring-red-500 bg-red-100'
                                    : 'ring-gray-300 focus:ring-indigo-600',
                            ]"
                        />
                        <div
                            v-else
                            class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                            {{ schoolVal.recommendations[2] }}
                        </div>
                        <p
                            v-if="
                                !isInitialForm.recommendation3 &&
                                isEmptyRecommendation3
                            "
                            class="mt-2 text-sm text-red-600"
                        >
                            おすすめ3を入力してください
                        </p>
                        <p
                            v-if="
                                !isInitialForm.recommendation3 &&
                                isLengthOverRecommendation3
                            "
                            class="mt-2 text-sm text-red-600"
                        >
                            おすすめ3は100文字以内で入力してください
                        </p>
                    </div>
                </div>
            </div>

            <div class="mt-20 col-span-full">
                <label
                    for="about"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >特徴</label
                >
                <div class="mt-2">
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
                            v-model="schoolVal.features[0]"
                            type="text"
                            name="feature1"
                            id="feature1"
                            @input="inputValue('feature1')"
                            class="mb-3 mt-1 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            :class="[
                                !isInitialForm.feature1 && hasInvalidFeature1
                                    ? 'ring-red-300 focus:ring-red-500 bg-red-100'
                                    : 'ring-gray-300 focus:ring-indigo-600',
                            ]"
                        />
                        <div
                            v-else
                            class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                            {{ schoolVal.features[0] }}
                        </div>
                        <p
                            v-if="!isInitialForm.feature1 && isEmptyFeature1"
                            class="mt-2 text-sm text-red-600"
                        >
                            特徴1を入力してください
                        </p>
                        <p
                            v-if="
                                !isInitialForm.feature1 && isLengthOverFeature1
                            "
                            class="mt-2 text-sm text-red-600"
                        >
                            特徴1は100文字以内で入力してください
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
                            v-model="schoolVal.features[1]"
                            type="text"
                            name="feature2"
                            id="feature2"
                            @input="inputValue('feature2')"
                            class="p-2 mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            :class="[
                                !isInitialForm.feature2 && hasInvalidFeature2
                                    ? 'ring-red-300 focus:ring-red-500 bg-red-100'
                                    : 'ring-gray-300 focus:ring-indigo-600',
                            ]"
                        />
                        <div
                            v-else
                            class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                            {{ schoolVal.features[1] }}
                        </div>
                        <p
                            v-if="!isInitialForm.feature2 && isEmptyFeature2"
                            class="mt-2 text-sm text-red-600"
                        >
                            特徴2を入力してください
                        </p>
                        <p
                            v-if="
                                !isInitialForm.feature2 && isLengthOverFeature2
                            "
                            class="mt-2 text-sm text-red-600"
                        >
                            特徴2は100文字以内で入力してください
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
                            v-model="schoolVal.features[2]"
                            type="text"
                            name="feature3"
                            id="feature3"
                            @input="inputValue('feature3')"
                            class="p-2 mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            :class="[
                                !isInitialForm.feature3 && hasInvalidFeature3
                                    ? 'ring-red-300 focus:ring-red-500 bg-red-100'
                                    : 'ring-gray-300 focus:ring-indigo-600',
                            ]"
                        />
                        <div
                            v-else
                            class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                            {{ schoolVal.features[2] }}
                        </div>
                        <p
                            v-if="!isInitialForm.feature3 && isEmptyFeature3"
                            class="mt-2 text-sm text-red-600"
                        >
                            特徴3を入力してください
                        </p>
                        <p
                            v-if="
                                !isInitialForm.feature3 && isLengthOverFeature3
                            "
                            class="mt-2 text-sm text-red-600"
                        >
                            特徴3は100文字以内で入力してください
                        </p>
                    </div>
                </div>

                <div class="mt-20 col-span-full">
                    <label
                        for="first-name"
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >リンク<span
                            v-show="!isViewMode"
                            class="ml-2 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                            >必須</span
                        ></label
                    >
                    <div class="mt-2">
                        <textarea
                            v-if="!isViewMode"
                            v-model="schoolVal.link"
                            id="link"
                            name="link"
                            rows="3"
                            @input="inputValue('link')"
                            class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            :class="[
                                !isInitialForm.link && hasInvalidLink
                                    ? 'ring-red-300 focus:ring-red-500 bg-red-100'
                                    : 'ring-gray-300 focus:ring-indigo-600',
                            ]"
                        />
                        <div
                            v-else
                            class="bg-slate-200 p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                            {{ schoolVal.link }}
                        </div>
                        <p
                            v-if="!isInitialForm.link && isEmptyLink"
                            class="mt-2 text-sm text-red-600"
                            id="name-error"
                        >
                            リンクを入力してください
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
                            v-model="schoolVal.remarks"
                            @input="inputValue('remarks')"
                            id="remarks"
                            name="remarks"
                            rows="3"
                            class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                            {{ schoolVal.remarks }}
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
                    v-if="!isViewMode && !schoolVal.id"
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
                    v-if="!isViewMode && schoolVal.id"
                    type="submit"
                    class="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-gray-500"
                    @click.stop="clickCancel"
                >
                    キャンセル
                </button>
                <button
                    v-if="!isViewMode && schoolVal.id"
                    type="submit"
                    class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    @click.prevent="clickUpdate"
                >
                    更新
                </button>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { Switch } from "@headlessui/vue";
import { defineProps, ref, computed, reactive, watch } from "vue";
import { School } from "../../types/school";
import { Tag } from "../../types/tag";

type FormType = "create" | "edit" | "view";

type Props = {
    school: School;
    formType: FormType;
    tagOptions: Tag[];
};

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

const termUnits = [
    { id: 1, value: "週" },
    { id: 2, value: "月" },
];

const schoolVal = ref<School>(JSON.parse(JSON.stringify(props.school))); // deep copy

// name バリデーション
const isEmptyName = computed(() => {
    return schoolVal.value.name === "";
});
const isLengthOverName = computed(() => {
    return !isEmptyName.value && schoolVal.value.name.length > 50;
});
const hasInvalidName = computed(() => {
    return isEmptyName.value || isLengthOverName.value;
});

// monthlyFee バリデーション
const isEmptyMonthlyFee = computed(() => {
    return schoolVal.value.monthlyFee === "";
});
const hasInvalidMonthlyFee = computed(() => {
    return isEmptyMonthlyFee.value;
});
const checkMonthlyFeeValue = () => {
    while (
        schoolVal.value.monthlyFee.length > 1 &&
        schoolVal.value.monthlyFee.startsWith("0")
    ) {
        schoolVal.value.monthlyFee = schoolVal.value.monthlyFee.substring(1);
    }
    // Ensure input is within range and is an integer
    let numValue = parseInt(schoolVal.value.monthlyFee);
    if (isNaN(numValue)) {
        schoolVal.value.monthlyFee = "";
    } else if (numValue < 0) {
        schoolVal.value.monthlyFee = "0";
    } else if (numValue > 10000000) {
        schoolVal.value.monthlyFee = "10000000";
    } else {
        schoolVal.value.monthlyFee = "" + numValue;
    }
};

// termNum バリデーション
const isEmptyTermNum = computed(() => {
    return schoolVal.value.termNum === "";
});
const hasInvalidTermNum = computed(() => {
    return isEmptyTermNum.value;
});
const checkTermNumValue = () => {
    while (
        schoolVal.value.termNum.length > 1 &&
        schoolVal.value.termNum.startsWith("0")
    ) {
        schoolVal.value.termNum = schoolVal.value.termNum.substring(1);
    }
    // Ensure input is within range and is an integer
    let numValue = parseInt(schoolVal.value.termNum);
    if (isNaN(numValue)) {
        schoolVal.value.termNum = "";
    } else if (numValue < 0) {
        schoolVal.value.termNum = "0";
    } else if (numValue > 100) {
        schoolVal.value.termNum = "100";
    } else {
        schoolVal.value.termNum = "" + numValue;
    }
};

// overview バリデーション
const isEmptyOverview = computed(() => {
    return schoolVal.value.overview === "";
});
const isLengthOverOverview = computed(() => {
    return !isEmptyOverview.value && schoolVal.value.overview.length > 1000;
});
const hasInvalidOverview = computed(() => {
    return isEmptyOverview.value || isLengthOverOverview.value;
});

// linkバリデーション
const isEmptyLink = computed(() => {
    return schoolVal.value.link === "";
});
const hasInvalidLink = computed(() => {
    return isEmptyLink.value;
});

// remarks バリデーション
const isLengthOverRemarks = computed(() => {
    return schoolVal.value.remarks && schoolVal.value.remarks.length > 1000;
});
const hasInvalidRemarks = computed(() => {
    return isLengthOverRemarks.value;
});

// recommendation1 バリデーション
const isEmptyRecommendation1 = computed(() => {
    return schoolVal.value.recommendations[0] === "";
});
const isLengthOverRecommendation1 = computed(() => {
    return (
        !isEmptyRecommendation1.value &&
        schoolVal.value.recommendations[0].length > 100
    );
});
const hasInvalidRecommendation1 = computed(() => {
    return isEmptyRecommendation1.value || isLengthOverRecommendation1.value;
});
// recommendation2 バリデーション
const isEmptyRecommendation2 = computed(() => {
    return schoolVal.value.recommendations[1] === "";
});
const isLengthOverRecommendation2 = computed(() => {
    return (
        !isEmptyRecommendation1.value &&
        schoolVal.value.recommendations[1].length > 100
    );
});
const hasInvalidRecommendation2 = computed(() => {
    return isEmptyRecommendation2.value || isLengthOverRecommendation2.value;
});
// recommendation3 バリデーション
const isEmptyRecommendation3 = computed(() => {
    return schoolVal.value.recommendations[2] === "";
});
const isLengthOverRecommendation3 = computed(() => {
    return (
        !isEmptyRecommendation1.value &&
        schoolVal.value.recommendations[2].length > 100
    );
});
const hasInvalidRecommendation3 = computed(() => {
    return isEmptyRecommendation3.value || isLengthOverRecommendation3.value;
});

// feature1 バリデーション
const isEmptyFeature1 = computed(() => {
    return schoolVal.value.features[0] === "";
});
const isLengthOverFeature1 = computed(() => {
    return !isEmptyFeature1.value && schoolVal.value.features[0].length > 100;
});
const hasInvalidFeature1 = computed(() => {
    return isEmptyFeature1.value || isLengthOverFeature1.value;
});
// feature2 バリデーション
const isEmptyFeature2 = computed(() => {
    return schoolVal.value.features[1] === "";
});
const isLengthOverFeature2 = computed(() => {
    return !isEmptyFeature2.value && schoolVal.value.features[1].length > 100;
});
const hasInvalidFeature2 = computed(() => {
    return isEmptyFeature2.value || isLengthOverFeature2.value;
});
// feature3 バリデーション
const isEmptyFeature3 = computed(() => {
    return schoolVal.value.features[2] === "";
});
const isLengthOverFeature3 = computed(() => {
    return !isEmptyFeature3.value && schoolVal.value.features[2].length > 100;
});
const hasInvalidFeature3 = computed(() => {
    return isEmptyFeature3.value || isLengthOverFeature3.value;
});

// imageLink1 バリデーション
const isEmptyImageLink1 = computed(() => {
    return schoolVal.value.imageLinks[0] === "";
});
const isLengthOverImageLink1 = computed(() => {
    return (
        !isEmptyImageLink1.value && schoolVal.value.imageLinks[0].length > 1000
    );
});
const hasInvalidImageLink1 = computed(() => {
    return isEmptyImageLink1.value || isLengthOverImageLink1.value;
});
// imageLink2 バリデーション
const isLengthOverImageLink2 = computed(() => {
    return schoolVal.value.imageLinks[1].length > 1000;
});
const hasInvalidImageLink2 = computed(() => {
    return isLengthOverImageLink2.value;
});
// imageLink3 バリデーション
const isLengthOverImageLink3 = computed(() => {
    return schoolVal.value.imageLinks[2].length > 1000;
});
const hasInvalidImageLink3 = computed(() => {
    return isLengthOverImageLink3.value;
});

const hasInvalidValue = computed(() => {
    return (
        hasInvalidName.value ||
        hasInvalidMonthlyFee.value ||
        hasInvalidTermNum.value ||
        hasInvalidOverview.value ||
        hasInvalidLink.value ||
        hasInvalidRemarks.value ||
        hasInvalidRecommendation1.value ||
        hasInvalidRecommendation2.value ||
        hasInvalidRecommendation3.value ||
        hasInvalidFeature1.value ||
        hasInvalidFeature2.value ||
        hasInvalidFeature3.value ||
        hasInvalidImageLink1.value ||
        hasInvalidImageLink2.value ||
        hasInvalidImageLink3.value
    );
});

const clickCreate = () => {
    const params = {
        id: schoolVal.value.id,
        isShow: schoolVal.value.isShow,
        name: schoolVal.value.name,
        monthlyFee: Number(schoolVal.value.monthlyFee),
        termNum: Number(schoolVal.value.termNum),
        termUnit: Number(schoolVal.value.termUnit),
        remarks:
            schoolVal.value.remarks === "" ? null : schoolVal.value.remarks,
        overview: schoolVal.value.overview,
        imageLinks: schoolVal.value.imageLinks,
        link: schoolVal.value.link,
        recommendations: schoolVal.value.recommendations,
        features: schoolVal.value.features,
        selectedTagIds: schoolVal.value.selectedTagIds,
    };

    emits("create", params);
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
    emits("cancel");
};

const changeMode = (type: string) => {
    emits("change-mode", type);
};

const clickUpdate = () => {
    emits("update", schoolVal.value);
};

const isInitialForm = reactive({
    name: true,
    monthlyFee: true,
    termNum: true,
    overview: true,
    link: true,
    remarks: true,
    recommendation1: true,
    recommendation2: true,
    recommendation3: true,
    feature1: true,
    feature2: true,
    feature3: true,
    imageLink1: true,
    imageLink2: true,
    imageLink3: true,
});

const inputValue = (key: string) => {
    isInitialForm[key as keyof typeof isInitialForm] = false;
};

watch(
    () => props.school,
    (newSchool) => {
        schoolVal.value = { ...newSchool };
    },
    { deep: true }
);
</script>
