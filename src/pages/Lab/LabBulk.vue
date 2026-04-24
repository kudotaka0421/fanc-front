<template>
    <div class="p-8 max-w-4xl mx-auto">
        <router-link to="/lab" class="text-sm text-blue-600 hover:underline">
            ← Lab トップへ
        </router-link>
        <h1 class="mt-4 text-2xl font-bold">#8 Postgres Bulk</h1>
        <p class="mt-2 text-sm text-gray-500">
            CSV (<code class="rounded bg-gray-100 px-1"
                >name,email,score</code
            >) を backend に送り、
            <span class="font-semibold">pgx.CopyFrom (COPY FROM STDIN)</span> と
            <span class="font-semibold">1 件ずつの INSERT ループ</span>
            で同じデータを投入して所要時間を比較する。件数を増やすほど COPY
            が圧倒する。
        </p>

        <section class="mt-6 rounded-md border border-gray-200 p-4">
            <h2 class="font-semibold">CSV 準備</h2>
            <p class="mt-1 text-xs text-gray-500">
                ファイルを選ぶか、件数を指定してブラウザ側で合成する（いちいち CSV
                を手作りするのが面倒なので用意）。
            </p>
            <div class="mt-3 flex flex-wrap items-center gap-3 text-sm">
                <input type="file" accept=".csv" @change="onFileChange" />
                <span class="text-gray-400">or</span>
                <label class="flex items-center gap-1">
                    <span class="text-xs text-gray-500">生成件数</span>
                    <input
                        v-model.number="genCount"
                        type="number"
                        min="1"
                        max="100000"
                        class="w-24 rounded border border-gray-300 p-1 text-sm"
                    />
                </label>
                <button
                    type="button"
                    class="rounded bg-gray-100 px-3 py-1 text-xs hover:bg-gray-200"
                    @click="generateCSV"
                >
                    生成してセット
                </button>
                <span v-if="file" class="text-xs text-gray-600">
                    {{ file.name }} ({{ humanSize(file.size) }})
                </span>
            </div>
        </section>

        <section class="mt-6 rounded-md border border-gray-200 p-4">
            <h2 class="font-semibold">投入</h2>
            <div class="mt-3 flex flex-wrap items-center gap-3 text-sm">
                <div class="inline-flex rounded border border-gray-300">
                    <button
                        type="button"
                        class="px-3 py-1 text-xs"
                        :class="
                            method === 'copy'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700'
                        "
                        @click="method = 'copy'"
                    >
                        COPY 方式
                    </button>
                    <button
                        type="button"
                        class="border-l border-gray-300 px-3 py-1 text-xs"
                        :class="
                            method === 'insert'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700'
                        "
                        @click="method = 'insert'"
                    >
                        INSERT ループ
                    </button>
                </div>
                <button
                    type="button"
                    class="rounded bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50"
                    :disabled="busy || !file"
                    @click="runImport"
                >
                    投入を実行
                </button>
                <button
                    type="button"
                    class="rounded bg-gray-100 px-3 py-2 text-xs hover:bg-gray-200"
                    @click="fetchCount"
                >
                    現在件数を確認
                </button>
                <span v-if="count !== null" class="text-xs text-gray-500">
                    bulk_samples: {{ count }} 行
                </span>
            </div>
            <p class="mt-3 text-xs text-gray-400">
                投入前に backend 側で <code>TRUNCATE</code>
                するので、実行のたびに「 0 行から全件投入」で時間を比較できる。
            </p>
        </section>

        <section
            v-if="results.length"
            class="mt-6 rounded-md border border-gray-200 p-4"
        >
            <h2 class="font-semibold">結果（新しい順）</h2>
            <table class="mt-2 w-full text-sm">
                <thead class="text-left text-xs text-gray-500">
                    <tr>
                        <th class="py-1">method</th>
                        <th class="py-1">rows</th>
                        <th class="py-1">elapsed</th>
                        <th class="py-1">rows/ms</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(r, i) in results"
                        :key="i"
                        class="border-t border-gray-100"
                    >
                        <td class="py-1 font-mono">
                            <span
                                class="rounded px-2 py-0.5 text-xs"
                                :class="
                                    r.method === 'copy'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-orange-100 text-orange-800'
                                "
                            >
                                {{ r.method }}
                            </span>
                        </td>
                        <td class="py-1">{{ r.rows }}</td>
                        <td class="py-1 font-semibold">
                            {{ r.elapsedMs }} ms
                        </td>
                        <td class="py-1 text-gray-600">{{ r.rowsPerMs }}</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <section class="mt-6 rounded-md border border-gray-200 p-4">
            <h2 class="font-semibold">Log</h2>
            <ul
                class="mt-2 max-h-48 overflow-auto rounded bg-gray-50 p-2 font-mono text-xs"
            >
                <li
                    v-for="(line, i) in log"
                    :key="i"
                    :class="
                        line.level === 'error'
                            ? 'text-red-600'
                            : 'text-gray-700'
                    "
                >
                    [{{ line.level }}] {{ line.msg }}
                </li>
                <li v-if="!log.length" class="text-gray-400">
                    実行するとここにログが出ます
                </li>
            </ul>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

type Method = "copy" | "insert";
type ImportResp = {
    method: Method;
    rows: number;
    elapsedMs: number;
    rowsPerMs: string;
};
type CountResp = { count: number };
type LogLine = { level: "info" | "error"; msg: string };

const apiBase = import.meta.env.VITE_APP_API_BASE_URL as string;

const file = ref<File | null>(null);
const method = ref<Method>("copy");
const genCount = ref(10000);
const results = ref<ImportResp[]>([]);
const count = ref<number | null>(null);
const log = ref<LogLine[]>([]);
const busy = ref(false);

const pushLog = (level: LogLine["level"], msg: string) => {
    log.value.unshift({ level, msg });
    if (log.value.length > 50) log.value.pop();
};

const humanSize = (n: number) => {
    if (n < 1024) return `${n} B`;
    if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
    return `${(n / 1024 / 1024).toFixed(1)} MB`;
};

const onFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    file.value = target.files?.[0] ?? null;
};

// CSV 手作りが面倒なのでブラウザで合成してそのまま File にしてセットする。
// name / email は決定的に、score だけランダムにしておけば内容は十分。
const generateCSV = () => {
    const n = Math.max(1, Math.min(100000, genCount.value | 0));
    const lines = ["name,email,score"];
    for (let i = 1; i <= n; i++) {
        const score = Math.floor(Math.random() * 100);
        lines.push(`user${i},user${i}@example.com,${score}`);
    }
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    file.value = new File([blob], `bulk_${n}.csv`, { type: "text/csv" });
    pushLog("info", `generated CSV: ${n} rows`);
};

const runImport = async () => {
    if (!file.value) return;
    busy.value = true;
    try {
        const form = new FormData();
        form.append("file", file.value);
        form.append("method", method.value);
        const { data } = await axios.post<ImportResp>(
            `${apiBase}/lab/bulk`,
            form
        );
        results.value.unshift(data);
        if (results.value.length > 20) results.value.pop();
        pushLog(
            "info",
            `import method=${data.method} rows=${data.rows} elapsed=${data.elapsedMs}ms rows/ms=${data.rowsPerMs}`
        );
        await fetchCount();
    } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        pushLog("error", `import: ${msg}`);
    } finally {
        busy.value = false;
    }
};

const fetchCount = async () => {
    try {
        const { data } = await axios.get<CountResp>(`${apiBase}/lab/bulk/count`);
        count.value = data.count;
    } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        pushLog("error", `count: ${msg}`);
    }
};
</script>
