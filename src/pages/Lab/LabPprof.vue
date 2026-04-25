<template>
    <div class="p-8 max-w-4xl mx-auto">
        <router-link to="/lab" class="text-sm text-blue-600 hover:underline">
            ← Lab トップへ
        </router-link>
        <h1 class="mt-4 text-2xl font-bold">#11 pprof</h1>
        <p class="mt-2 text-sm text-gray-500">
            <code class="rounded bg-gray-100 px-1">net/http/pprof</code>
            を <span class="font-semibold">:6060</span> で expose し、
            <code class="rounded bg-gray-100 px-1">/api/lab/pprof/heavy</code>
            で SHA-256 ループの CPU 仕事を起動して
            <code class="rounded bg-gray-100 px-1">go tool pprof</code>
            のホットスポット (<code>sha256.block</code>) を flame graph で観察する。
        </p>

        <section class="mt-6 rounded-md border border-gray-200 p-4">
            <h2 class="font-semibold">負荷生成</h2>
            <p class="mt-1 text-xs text-gray-500">
                押した直後に別ターミナルで pprof コマンド (下) を実行するとサンプルが取れる
            </p>
            <div class="mt-3 flex flex-wrap items-center gap-3">
                <button
                    type="button"
                    class="rounded bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50"
                    :disabled="running"
                    @click="run(1)"
                >
                    重い処理 1 回
                </button>
                <button
                    type="button"
                    class="rounded bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50"
                    :disabled="running"
                    @click="run(100)"
                >
                    100 回
                </button>
                <span v-if="running" class="text-xs text-gray-500">実行中…</span>
                <span v-else-if="lastError" class="text-xs text-red-600">
                    error: {{ lastError }}
                </span>
            </div>
            <div
                v-if="lastResult"
                class="mt-3 rounded bg-gray-50 px-3 py-2 font-mono text-xs text-gray-700"
            >
                iterations={{ lastResult.iterations }} /
                elapsed={{ lastResult.elapsedMs }}ms /
                digest={{ lastResult.lastDigest.slice(0, 16) }}…
            </div>
        </section>

        <section class="mt-6 rounded-md border border-gray-200 p-4">
            <h2 class="font-semibold">pprof UI（ブラウザから直接アクセス）</h2>
            <p class="mt-1 text-xs text-gray-500">
                backend を <code>make up-lab</code> で起動していると <code>:6060</code>
                が host に出ている
            </p>
            <ul class="mt-2 space-y-1 text-sm">
                <li>
                    <a
                        href="http://localhost:6060/debug/pprof/"
                        target="_blank"
                        rel="noopener"
                        class="text-blue-600 hover:underline"
                    >
                        http://localhost:6060/debug/pprof/
                    </a>
                    （概要ページ。各 profile への入口）
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
                    （現時点の inuse_space スナップショット）
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
                    （goroutine 一覧。SSE/worker のリーク調査に使う）
                </li>
            </ul>
        </section>

        <section class="mt-6 rounded-md border border-gray-200 p-4">
            <h2 class="font-semibold">go tool pprof コマンド例</h2>
            <p class="mt-1 text-xs text-gray-500">
                「100 回」を押した <strong>直後</strong> に別ターミナルで叩くと、SHA-256 のホットスポットが出る
            </p>
            <pre class="mt-2 overflow-auto rounded bg-gray-50 p-3 text-xs leading-5"><code># (1) CPU profile を 10 秒サンプリング → ブラウザで Flame Graph
go tool pprof -http=:9090 http://localhost:6060/debug/pprof/profile?seconds=10

# (2) Heap (現在のアロケーション)
go tool pprof -http=:9090 http://localhost:6060/debug/pprof/heap

# (3) CLI モードで Top 関数
go tool pprof http://localhost:6060/debug/pprof/profile?seconds=10
(pprof) top10
(pprof) list Heavy   # 行単位の self/cum を表示</code></pre>
        </section>

        <section class="mt-6 rounded-md border border-gray-200 p-4 text-xs text-gray-500">
            <h2 class="font-semibold text-gray-700">本番運用ガード</h2>
            <ul class="mt-2 list-disc space-y-1 pl-5">
                <li>
                    pprof は <code>LAB_PPROF_ENABLED=true</code> 環境変数を opt-in に gate
                    している（<code>docker-compose.lab.yml</code> でのみ有効）。本番イメージは
                    handler 自体は import されているが listener が起動しないので外部から触れない。
                </li>
                <li>
                    本番に出すなら <strong>internal LB のみ</strong>、認証必須、ALB の health check 経路と分離。
                </li>
            </ul>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

type HeavyResp = {
    iterations: number;
    elapsedMs: number;
    lastDigest: string;
};

const apiBase = import.meta.env.VITE_APP_API_BASE_URL as string;

const running = ref(false);
const lastResult = ref<HeavyResp | null>(null);
const lastError = ref<string | null>(null);

const run = async (n: number) => {
    running.value = true;
    lastError.value = null;
    try {
        const { data } = await axios.get<HeavyResp>(
            `${apiBase}/lab/pprof/heavy`,
            {
                params: { n },
                // n=100 でも 5 秒程度の想定だが、CPU の遅いマシンで 30s かかっても落ちないように余裕を持つ
                timeout: 60_000,
            }
        );
        lastResult.value = data;
    } catch (e) {
        lastError.value = e instanceof Error ? e.message : String(e);
    } finally {
        running.value = false;
    }
};
</script>
