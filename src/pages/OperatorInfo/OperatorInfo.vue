<template>
    <div class="bg-gradient-to-b from-blue-100 to-white min-h-screen font-sans">
        <header class="bg-blue-400 p-5 shadow-md">
            <div
                class="container mx-auto flex justify-between items-center"
            ></div>
            <div class="text-center">
                <h1 class="text-4xl font-extrabold text-white mb-5">Fanc</h1>
                <p class="text-xl text-white">運営情報</p>
            </div>
        </header>
        <div
            class="py-20 flex flex-col md:flex-row justify-center items-center"
        >
            <div class="logo text-white font-extrabold text-2xl mt-10">
                <img
                    class="mx-auto h-auto w-full md:w-[700px]"
                    src="/UserIcon.png"
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
                        運営情報
                    </h2>
                    <p class="mb-4">【運営者名】<br />くどたか</p>
                    <p class="mb-4">
                        【経歴】<br />早稲田(文系)→レバテック(エンジニア人材営業職)→プログラミングスクールで学習→正社員WEBエンジニア→フリーランスWEBエンジニア
                    </p>
                    <p class="mb-4">
                        【メッセージ】<br />
                        営業としてエンジニアの採用支援やキャリア支援をしていた経験と、プログラミングスクールに通って自分自身が営業からエンジニアにキャリアチェンジした経験をもとに、これからエンジニアにチャレンジしようとするあなたをご支援します！
                    </p>

                    <p class="mb-4">
                        【SNS】<br />
                        <a
                            href="https://twitter.com/kudotaka0421"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i
                                class="fab fa-twitter text-blue-400 text-2xl hover:text-blue-500 ml-2.5"
                            ></i>
                        </a>
                    </p>
                </div>
            </section>
        </div>
        <footer class="bg-blue-400 text-white p-10">
            <div class="container mx-auto flex justify-end items-center">
                <nav>
                    <ul class="flex space-x-6">
                        <li>
                            <a
                                href="/operator-info"
                                class="text-white hover:underline"
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
                                target="_blank"
                                class="text-white hover:underline"
                                >利用規約</a
                            >
                        </li>
                        <li>
                            <a
                                href="/privacy-policy"
                                target="_blank"
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
