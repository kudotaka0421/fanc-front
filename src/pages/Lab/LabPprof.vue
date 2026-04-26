<template>
    <div class="p-8 max-w-4xl mx-auto">
        <router-link to="/lab" class="text-sm text-blue-600 hover:underline">
            ← Lab トップへ
        </router-link>
        <h1 class="mt-4 text-2xl font-bold">#11 pprof</h1>
        <p class="mt-2 text-sm text-gray-500">
            <code class="rounded bg-gray-100 px-1">net/http/pprof</code>
            を <span class="font-semibold">:6060</span> で expose し、
            CPU / heap / goroutine の 3 種類の profile を観察する。
            各セクションのボタンで「観察対象」を作り、右側の Runtime 数値や
            <a
                href="http://localhost:6060/debug/pprof/"
                target="_blank"
                rel="noopener"
                class="text-blue-600 hover:underline"
                >/debug/pprof/</a
            >
            の変化を見る。
        </p>

        <!-- Runtime stats（常時表示、Refresh で更新） -->
        <section
            class="mt-6 rounded-md border border-gray-200 bg-amber-50 p-4"
        >
            <div class="flex items-center justify-between">
                <h2 class="font-semibold">Runtime stats</h2>
                <button
                    type="button"
                    class="rounded border border-gray-300 bg-white px-3 py-1 text-xs hover:bg-gray-50"
                    @click="refreshRuntime"
                >
                    Refresh
                </button>
            </div>
            <p class="mt-1 text-xs text-gray-500">
                各操作の前後でこの値を Refresh して変化を観察する
            </p>
            <div
                v-if="runtime"
                class="mt-2 grid grid-cols-4 gap-2 font-mono text-xs"
            >
                <div class="rounded bg-white px-2 py-1">
                    NumGoroutine
                    <div class="text-base font-bold">
                        {{ runtime.numGoroutine }}
                    </div>
                </div>
                <div class="rounded bg-white px-2 py-1">
                    HeapAlloc
                    <div class="text-base font-bold">
                        {{ runtime.heapAllocMB }}MB
                    </div>
                </div>
                <div class="rounded bg-white px-2 py-1">
                    HeapSys
                    <div class="text-base font-bold">
                        {{ runtime.heapSysMB }}MB
                    </div>
                </div>
                <div class="rounded bg-white px-2 py-1">
                    NumGC
                    <div class="text-base font-bold">{{ runtime.numGC }}</div>
                </div>
            </div>
            <div v-else class="mt-2 text-xs text-gray-500">
                まだ取得していない（Refresh を押す）
            </div>
        </section>

        <!-- ① CPU profile -->
        <section class="mt-6 rounded-md border border-gray-200 p-4">
            <h2 class="font-semibold">① CPU 負荷（CPU profile 用）</h2>
            <p class="mt-1 text-xs text-gray-500">
                押した直後に別ターミナルで pprof CPU プロファイルを取ると、
                <code>sha256.block</code>
                が flame graph の最上位に出る
            </p>
            <div class="mt-3 flex flex-wrap items-center gap-3">
                <button
                    type="button"
                    class="rounded bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50"
                    :disabled="busy.heavy"
                    @click="runHeavy(1)"
                >
                    重い処理 1 回
                </button>
                <button
                    type="button"
                    class="rounded bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50"
                    :disabled="busy.heavy"
                    @click="runHeavy(100)"
                >
                    100 回（約 3 秒）
                </button>
                <span v-if="busy.heavy" class="text-xs text-gray-500"
                    >実行中…</span
                >
            </div>
            <div
                v-if="heavyResult"
                class="mt-3 rounded bg-gray-50 px-3 py-2 font-mono text-xs text-gray-700"
            >
                iterations={{ heavyResult.iterations }} / elapsed={{
                    heavyResult.elapsedMs
                }}ms / digest={{ heavyResult.lastDigest.slice(0, 16) }}…
            </div>
        </section>

        <!-- ② Heap profile -->
        <section class="mt-6 rounded-md border border-gray-200 p-4">
            <h2 class="font-semibold">② Heap リーク（heap profile 用）</h2>
            <p class="mt-1 text-xs text-gray-500">
                handler 内 slice に巨大バッファを溜める → heap profile の
                <code>inuse_space</code> に
                <code>HeapLeakStart</code>
                が大きく映る
            </p>
            <div class="mt-3 flex flex-wrap items-center gap-3">
                <button
                    type="button"
                    class="rounded bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50"
                    :disabled="busy.heap"
                    @click="addHeap(10)"
                >
                    +10MB
                </button>
                <button
                    type="button"
                    class="rounded bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50"
                    :disabled="busy.heap"
                    @click="addHeap(100)"
                >
                    +100MB
                </button>
                <button
                    type="button"
                    class="rounded bg-gray-600 px-4 py-2 text-sm text-white disabled:opacity-50"
                    :disabled="busy.heap"
                    @click="resetHeap"
                >
                    Reset + GC
                </button>
            </div>
            <div
                v-if="heapResult"
                class="mt-3 rounded bg-gray-50 px-3 py-2 font-mono text-xs text-gray-700"
            >
                added={{ heapResult.addedMB }}MB / total={{
                    heapResult.totalMB
                }}MB ({{ heapResult.totalChunks }} chunks)
            </div>
        </section>

        <!-- ③ Goroutine profile -->
        <section class="mt-6 rounded-md border border-gray-200 p-4">
            <h2 class="font-semibold">
                ③ Goroutine リーク（goroutine profile 用）
            </h2>
            <p class="mt-1 text-xs text-gray-500">
                <code>&lt;-stop</code> で永久ブロックする goroutine を起動 →
                <code>/debug/pprof/goroutine?debug=1</code>
                で
                <code>handlers.leakedWorker</code>
                が N 個出ているのを確認
            </p>
            <div class="mt-3 flex flex-wrap items-center gap-3">
                <button
                    type="button"
                    class="rounded bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50"
                    :disabled="busy.goroutine"
                    @click="leakGoroutine(100)"
                >
                    +100 goroutine
                </button>
                <button
                    type="button"
                    class="rounded bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50"
                    :disabled="busy.goroutine"
                    @click="leakGoroutine(1000)"
                >
                    +1000 goroutine
                </button>
                <button
                    type="button"
                    class="rounded bg-gray-600 px-4 py-2 text-sm text-white disabled:opacity-50"
                    :disabled="busy.goroutine"
                    @click="stopGoroutines"
                >
                    Stop all
                </button>
            </div>
            <div
                v-if="goroutineResult"
                class="mt-3 rounded bg-gray-50 px-3 py-2 font-mono text-xs text-gray-700"
            >
                started={{ goroutineResult.started }} / NumGoroutine={{
                    goroutineResult.numActive
                }}
            </div>
        </section>

        <section class="mt-6 rounded-md border border-gray-200 p-4">
            <h2 class="font-semibold">pprof UI（ブラウザから直接）</h2>
            <ul class="mt-2 space-y-1 text-sm">
                <li>
                    <a
                        href="http://localhost:6060/debug/pprof/"
                        target="_blank"
                        rel="noopener"
                        class="text-blue-600 hover:underline"
                    >
                        /debug/pprof/
                    </a>
                    （概要・各 profile への入口）
                </li>
                <li>
                    <a
                        href="http://localhost:6060/debug/pprof/heap"
                        target="_blank"
                        rel="noopener"
                        class="text-blue-600 hover:underline"
                    >
                        /debug/pprof/heap
                    </a>
                    （inuse_space スナップショット。② の前後で開いて差を見る）
                </li>
                <li>
                    <a
                        href="http://localhost:6060/debug/pprof/goroutine?debug=1"
                        target="_blank"
                        rel="noopener"
                        class="text-blue-600 hover:underline"
                    >
                        /debug/pprof/goroutine?debug=1
                    </a>
                    （関数ごとの goroutine 数。③ の前後で
                    <code>handlers.leakedWorker</code>
                    の数が変わる）
                </li>
            </ul>
        </section>

        <section class="mt-6 rounded-md border border-gray-200 p-4">
            <h2 class="font-semibold">go tool pprof コマンド例</h2>
            <pre
                class="mt-2 overflow-auto rounded bg-gray-50 p-3 text-xs leading-5"
            ><code># CPU profile を 10 秒サンプリング → ブラウザで Flame Graph
go tool pprof -http=:9090 http://localhost:6060/debug/pprof/profile?seconds=10

# Heap profile (現在の inuse_space)
go tool pprof -http=:9090 http://localhost:6060/debug/pprof/heap

# Goroutine profile（リーク調査）
go tool pprof -http=:9090 http://localhost:6060/debug/pprof/goroutine</code></pre>
        </section>

        <section
            class="mt-6 rounded-md border border-gray-200 p-4 text-xs text-gray-500"
        >
            <h2 class="font-semibold text-gray-700">本番運用ガード</h2>
            <ul class="mt-2 list-disc space-y-1 pl-5">
                <li>
                    pprof は
                    <code>LAB_PPROF_ENABLED=true</code>
                    環境変数で opt-in にしてあり、本番イメージでは listener が起動しないので外部から触れない。
                </li>
                <li>
                    本番に出すなら internal LB のみ、認証必須、ALB の health
                    check 経路と分離。
                </li>
            </ul>
        </section>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import axios from "axios";

type HeavyResp = {
    iterations: number;
    elapsedMs: number;
    lastDigest: string;
};
type HeapResp = { addedMB: number; totalChunks: number; totalMB: number };
type GoroutineResp = { started: number; numActive: number };
type RuntimeResp = {
    numGoroutine: number;
    heapAllocMB: number;
    heapSysMB: number;
    numGC: number;
};

const apiBase = import.meta.env.VITE_APP_API_BASE_URL as string;

const busy = reactive({ heavy: false, heap: false, goroutine: false });
const heavyResult = ref<HeavyResp | null>(null);
const heapResult = ref<HeapResp | null>(null);
const goroutineResult = ref<GoroutineResp | null>(null);
const runtime = ref<RuntimeResp | null>(null);

const refreshRuntime = async () => {
    const { data } = await axios.get<RuntimeResp>(
        `${apiBase}/lab/pprof/runtime`
    );
    runtime.value = data;
};

const runHeavy = async (n: number) => {
    busy.heavy = true;
    try {
        const { data } = await axios.get<HeavyResp>(
            `${apiBase}/lab/pprof/heavy`,
            { params: { n }, timeout: 60_000 }
        );
        heavyResult.value = data;
    } finally {
        busy.heavy = false;
        await refreshRuntime();
    }
};

const addHeap = async (mb: number) => {
    busy.heap = true;
    try {
        const { data } = await axios.post<HeapResp>(
            `${apiBase}/lab/pprof/heap-leak`,
            null,
            { params: { mb } }
        );
        heapResult.value = data;
    } finally {
        busy.heap = false;
        await refreshRuntime();
    }
};

const resetHeap = async () => {
    busy.heap = true;
    try {
        await axios.delete(`${apiBase}/lab/pprof/heap-leak`);
        heapResult.value = null;
    } finally {
        busy.heap = false;
        await refreshRuntime();
    }
};

const leakGoroutine = async (n: number) => {
    busy.goroutine = true;
    try {
        const { data } = await axios.post<GoroutineResp>(
            `${apiBase}/lab/pprof/goroutine-leak`,
            null,
            { params: { n } }
        );
        goroutineResult.value = data;
    } finally {
        busy.goroutine = false;
        await refreshRuntime();
    }
};

const stopGoroutines = async () => {
    busy.goroutine = true;
    try {
        await axios.delete(`${apiBase}/lab/pprof/goroutine-leak`);
        goroutineResult.value = null;
    } finally {
        busy.goroutine = false;
        await refreshRuntime();
    }
};

onMounted(refreshRuntime);
</script>
