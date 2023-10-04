<template>
    <div class="bg-gradient-to-b from-blue-100 to-white min-h-screen font-sans">
        <header class="bg-blue-400 p-5 shadow-md">
            <div class="container mx-auto flex items-center">
                <a href="/lp" class="hover:text-current">
                    <img
                        src="/Fanc-logos.jpeg"
                        alt="Logo"
                        class="md:w-24 md:h-24 w-10 h-10 cursor-pointer hover:opacity-80 transition-opacity duration-200 hidden md:block"
                    />
                </a>
                <div class="flex-grow text-center">
                    <h1 class="text-4xl font-extrabold text-white mb-5">
                        <a href="/lp" class="hover:text-current">Fanc</a>
                    </h1>
                    <p class="text-xl text-white">
                        あなたに最適なプログラミングスクールをご提案します
                    </p>
                </div>
            </div>
        </header>

        <div class="container mx-auto mt-10 mb-10 px-8">
            <h1 class="text-center text-6xl font-bold mb-12">
                特定商取引法に基づく表記
            </h1>
            <table class="border-collapse border-black w-full">
                <tr class="md:table-row flex flex-col">
                    <td
                        class="border px-4 py-2 md:table-cell md:w-1/4 block w-full"
                    >
                        ■：販売業社の名称
                    </td>
                    <td
                        class="border px-4 py-2 md:table-cell md:w-3/4 block w-full"
                    >
                        工藤隆弘
                    </td>
                </tr>

                <tr class="md:table-row flex flex-col">
                    <td
                        class="border px-4 py-2 md:table-cell md:w-1/4 block w-full"
                    >
                        ■：所在地
                    </td>
                    <td
                        class="border px-4 py-2 md:table-cell md:w-3/4 block w-full"
                    >
                        請求があったら遅滞なく開示します
                    </td>
                </tr>
                <tr class="md:table-row flex flex-col">
                    <td
                        class="border px-4 py-2 md:table-cell md:w-1/4 block w-full"
                    >
                        ■：電話番号
                    </td>
                    <td
                        class="border px-4 py-2 md:table-cell md:w-3/4 block w-full"
                    >
                        請求があったら遅滞なく開示します
                    </td>
                </tr>

                <tr class="md:table-row flex flex-col">
                    <td
                        class="border px-4 py-2 md:table-cell md:w-1/4 block w-full"
                    >
                        ■：メールアドレス
                    </td>
                    <td
                        class="border px-4 py-2 md:table-cell md:w-3/4 block w-full"
                    >
                        fanc2023info@gmail.com
                    </td>
                </tr>

                <tr class="md:table-row flex flex-col">
                    <td
                        class="border px-4 py-2 md:table-cell md:w-1/4 block w-full"
                    >
                        ■：運営統括責任者
                    </td>
                    <td
                        class="border px-4 py-2 md:table-cell md:w-3/4 block w-full"
                    >
                        工藤隆弘
                    </td>
                </tr>
                <tr class="md:table-row flex flex-col">
                    <td
                        class="border px-4 py-2 md:table-cell md:w-1/4 block w-full"
                    >
                        ■：追加手数料等の追加料金
                    </td>
                    <td
                        class="border px-4 py-2 md:table-cell md:w-3/4 block w-full"
                    >
                        なし
                    </td>
                </tr>
                <tr class="md:table-row flex flex-col">
                    <td
                        class="border px-4 py-2 md:table-cell md:w-1/4 block w-full"
                    >
                        ■：交換および返品（返金ポリシー）
                    </td>
                    <td
                        class="border px-4 py-2 md:table-cell md:w-3/4 block w-full"
                    >
                        ＜お客様都合のキャンセルの場合＞ <br />
                        決済が完了しカウンセリング日程が確定した後のキャンセルはお受けしておりません。<br />
                        <br />
                        ＜お客様都合以外のキャンセルの場合＞<br />
                        他の日時で実施こ希望の場合は他のカウンセリング日程での対応をご案内させていただきます。<br />
                        返金希望の場合はカウンセリング料金を返金させていただきます。<br />
                    </td>
                </tr>
                <tr class="md:table-row flex flex-col">
                    <td
                        class="border px-4 py-2 md:table-cell md:w-1/4 block w-full"
                    >
                        ■：引渡時期
                    </td>
                    <td
                        class="border px-4 py-2 md:table-cell md:w-3/4 block w-full"
                    >
                        カウンセリング日時の予約が完了した時点で引き渡し完了となります。
                    </td>
                </tr>
                <tr class="md:table-row flex flex-col">
                    <td
                        class="border px-4 py-2 md:table-cell md:w-1/4 block w-full"
                    >
                        ■：受け付け可能な決済手段
                    </td>
                    <td
                        class="border px-4 py-2 md:table-cell md:w-3/4 block w-full"
                    >
                        クレジットカード
                    </td>
                </tr>
                <tr class="md:table-row flex flex-col">
                    <td
                        class="border px-4 py-2 md:table-cell md:w-1/4 block w-full"
                    >
                        ■：決済期間
                    </td>
                    <td
                        class="border px-4 py-2 md:table-cell md:w-3/4 block w-full"
                    >
                        クレジットカード決済会社が処理を完了次第、決済完了となります。
                    </td>
                </tr>

                <tr class="md:table-row flex flex-col">
                    <td
                        class="border px-4 py-2 md:table-cell md:w-1/4 block w-full"
                    >
                        ■：販売価格
                    </td>
                    <td
                        class="border px-4 py-2 md:table-cell md:w-3/4 block w-full"
                    >
                        ¥5,000(税込)
                    </td>
                </tr>
            </table>
        </div>

        <footer class="bg-blue-400 text-white p-10">
            <div class="container mx-auto flex justify-end items-center">
                <nav>
                    <ul class="flex space-x-6">
                        <li>
                            <a
                                href="https://docs.google.com/forms/d/e/1FAIpQLSc1vyVWM_fWrP6KPTmVEPgjGBEtENeIJT7GRFadG51eVUYqEw/viewform"
                                rel="noopener noreferrer"
                                class="hover:text-current text-white hover:underline"
                                >お問い合わせ</a
                            >
                        </li>
                        <li>
                            <a
                                href="/terms-of-service"
                                class="hover:text-current text-white hover:underline"
                                >利用規約</a
                            >
                        </li>
                        <li>
                            <a
                                href="/privacy-policy"
                                class="hover:text-current text-white hover:underline"
                                >プライバシーポリシー</a
                            >
                        </li>
                        <li>
                            <a
                                href="/commercial-transaction-law"
                                class="hover:text-current text-white hover:underline"
                                >特定商取引法に基づく表記</a
                            >
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    </div>
</template>
