<template>
    <div class="bg-gradient-to-b from-blue-100 to-white min-h-screen font-sans">
        <!-- ヘッダーセクション -->
        <header class="bg-blue-400 p-5 shadow-md">
            <div
                class="container mx-auto flex justify-between items-center"
            ></div>
            <div class="text-center">
                <h1 class="text-4xl font-extrabold text-white mb-5">Fanc</h1>
                <p class="text-xl text-white">
                    あなたに最適なプログラミングスクールをご提案します
                </p>
            </div>
        </header>

        <div class="logo text-white font-extrabold text-2xl mt-10">
            <img
                class="mx-auto h-auto w-full md:w-[700px]"
                src="/writing-at-desk.jpg"
                alt="Your Company"
            />
        </div>

        <section
            class="py-20 flex flex-col sm:flex-row justify-center items-start"
        >
            <div class="flex-1 mx-auto px-12 mb-8 sm:mb-0 mt-10">
                <h2
                    class="text-4xl font-extrabold mb-8 text-blue-600 text-center border-b-4 border-blue-600 pb-2 mx-auto"
                >
                    サービスの特徴
                </h2>
                <ul class="space-y-6 text-base pl-10 list-decimal">
                    <li class="text-lg">
                        実際にプログラミングスクールに通いwebエンジニアへの転職を成功させた現役エンジニアがカウンセリングを行います。
                    </li>
                    <li class="text-lg">
                        数あるプログラミングスクールと、コースの中からあなたにマッチしたものをご提案します。
                    </li>
                    <li class="text-lg">
                        プログラミングスクールに通う前の心構え、おすすめの学習方法、就職活動のコツなどもお伝えします。
                    </li>
                </ul>

                <h2
                    class="text-4xl font-extrabold my-8 text-blue-600 text-center border-b-4 border-blue-600 pb-2 mx-auto mt-20 mb-5"
                >
                    ご利用の流れ
                </h2>
                <ul class="space-y-4 text-base pl-10 list-decimal">
                    <li class="text-lg">
                        本ページからカウンセリング日時を予約する。
                        <ul class="list-disc pl-5 space-y-2">
                            <li class="text-base">
                                カウンセリングは1回50分で5000円(税込)となり事前決済制となります。
                            </li>
                        </ul>
                    </li>
                    <li class="text-lg">
                        予約した日時でオンラインカウンセリングを受ける。
                        <ul class="list-disc pl-5 space-y-2">
                            <li class="text-base">
                                まずはあなたの希望や悩みをしっかりと聞いたうえで、おすすめのスクールの紹介します。
                            </li>
                        </ul>
                    </li>
                    <li class="text-lg">
                        カウンセリング終了後担当者からのメールを受け取る。
                        <ul class="list-disc pl-5 space-y-2">
                            <li class="text-base">
                                <!-- カウンセリング内容をもとにご紹介したスクールの詳細情報と、担当者からの応援メッセージをメールにて送信いたします。 -->
                                カウンセリング内容をまとめた内容と、担当者からの応援メッセージをメールにて送信いたします。
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div
                class="flex-1 jicoo-widget px-4 mb-8 sm:mb-0"
                data-url="https://www.jicoo.com/event_types/oippgJO-MPhM/widget"
                style="width: 100%; height: 720px"
            ></div>
        </section>
        <footer class="bg-blue-400 text-white p-10">
            <div class="container mx-auto flex justify-end items-center">
                <nav>
                    <ul class="flex space-x-6">
                        <li>
                            <a href="#" class="text-white hover:underline"
                                >運営情報</a
                            >
                        </li>
                        <li>
                            <a
                                href="https://docs.google.com/forms/d/e/1FAIpQLSc1vyVWM_fWrP6KPTmVEPgjGBEtENeIJT7GRFadG51eVUYqEw/viewform"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="text-white hover:underline"
                                >お問い合わせ</a
                            >
                        </li>
                        <li>
                            <a
                                href="/terms-of-service"
                                class="text-white hover:underline"
                                >利用規約</a
                            >
                        </li>
                        <li>
                            <a
                                href="/privacy-policy"
                                class="text-white hover:underline"
                                >プライバシーポリシー</a
                            >
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
// こちらに必要なスクリプトを追加してください。
</script>
