<template>
    <div class="p-8 max-w-4xl mx-auto">
        <router-link to="/lab" class="text-sm text-blue-600 hover:underline">
            ← Lab トップへ
        </router-link>
        <h1 class="mt-4 text-2xl font-bold">#7 Postgres パーティショニング</h1>
        <p class="mt-2 text-sm text-gray-500">
            <code class="rounded bg-gray-100 px-1">events</code>
            テーブルは
            <code class="rounded bg-gray-100 px-1">event_at</code>
            を key にした月次 RANGE パーティション（2025-11〜2026-04 +
            default）。 1 万件のテスト data を投入済み。
            <code class="rounded bg-gray-100 px-1"
                >GET /lab/partition?from=&amp;to=</code
            >
            を叩くと件数・EXPLAIN ANALYZE に加え「どの partition が scan
            されたか」 が返る。範囲を狭めていくと scan 対象の partition が減って
            <span class="font-semibold">partition pruning</span>
            の効果が視認できる。
        </p>

        <section class="mt-6 rounded-md border border-gray-200 p-4">
            <div class="flex flex-wrap items-end gap-3">
                <label class="flex flex-col text-sm">
                    <span class="text-xs text-gray-500">from</span>
                    <input
                        v-model="from"
                        type="date"
                        class="mt-1 rounded border border-gray-300 p-2 text-sm"
                    />
                </label>
                <label class="flex flex-col text-sm">
                    <span class="text-xs text-gray-500">to（未満）</span>
                    <input
                        v-model="to"
                        type="date"
                        class="mt-1 rounded border border-gray-300 p-2 text-sm"
                    />
                </label>
                <button
                    type="button"
                    class="rounded bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50"
                    :disabled="busy || !from || !to"
                    @click="runQuery"
                >
                    実行
                </button>
                <div class="flex gap-1 text-xs">
                    <button
                        type="button"
                        class="rounded bg-gray-100 px-2 py-1 hover:bg-gray-200"
                        @click="applyPreset('month')"
                    >
                        1 ヶ月
                    </button>
                    <button
                        type="button"
                        class="rounded bg-gray-100 px-2 py-1 hover:bg-gray-200"
                        @click="applyPreset('quarter')"
                    >
                        3 ヶ月
                    </button>
                    <button
                        type="button"
                        class="rounded bg-gray-100 px-2 py-1 hover:bg-gray-200"
                        @click="applyPreset('all')"
                    >
                        全範囲
                    </button>
                </div>
            </div>
            <p class="mt-3 text-xs text-gray-400">
                from ≤ event_at &lt; to の半開区間。範囲を狭くすると scan される
                partition が減る。
            </p>
        </section>

        <section
            v-if="result"
            class="mt-6 rounded-md border border-gray-200 p-4"
        >
            <div class="flex flex-wrap items-center gap-4 text-sm">
                <span>
                    件数:
                    <span class="font-semibold">{{ result.count }}</span>
                </span>
                <span>
                    所要:
                    <span class="font-semibold">{{ result.elapsedMs }} ms</span>
                </span>
                <span>
                    scan 対象:
                    <span class="font-semibold"
                        >{{ result.scannedPartitions.length }} /
                        {{ result.partitions.length }}</span
                    >
                </span>
            </div>

            <h2 class="mt-4 font-semibold">Partitions</h2>
            <p class="text-xs text-gray-400">
                青が scan されたもの、灰が pruning で枝刈りされたもの。
            </p>
            <ul class="mt-2 flex flex-wrap gap-2">
                <li
                    v-for="p in result.partitions"
                    :key="p.name"
                    class="rounded border px-2 py-1 font-mono text-xs"
                    :class="
                        p.scanned
                            ? 'border-blue-400 bg-blue-50 text-blue-800'
                            : 'border-gray-200 bg-gray-50 text-gray-400 line-through'
                    "
                >
                    {{ p.name }}
                </li>
            </ul>

            <h2 class="mt-4 font-semibold">EXPLAIN ANALYZE</h2>
            <pre
                class="mt-2 max-h-96 overflow-auto rounded bg-gray-900 p-3 text-xs text-gray-100"
            ><code>{{ result.explain }}</code></pre>
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

type Partition = { name: string; scanned: boolean };
type PartitionResp = {
    from: string;
    to: string;
    count: number;
    elapsedMs: number;
    partitions: Partition[];
    scannedPartitions: string[];
    explain: string;
};
type LogLine = { level: "info" | "error"; msg: string };

const apiBase = import.meta.env.VITE_APP_API_BASE_URL as string;

// seed のカバー範囲。初期値はその中から 1 ヶ月ぶん。
const seedStart = "2025-11-01";
const seedEnd = "2026-05-01";

const from = ref("2026-02-01");
const to = ref("2026-03-01");
const result = ref<PartitionResp | null>(null);
const log = ref<LogLine[]>([]);
const busy = ref(false);

const pushLog = (level: LogLine["level"], msg: string) => {
    log.value.unshift({ level, msg });
    if (log.value.length > 50) log.value.pop();
};

const applyPreset = (preset: "month" | "quarter" | "all") => {
    if (preset === "month") {
        from.value = "2026-02-01";
        to.value = "2026-03-01";
    } else if (preset === "quarter") {
        from.value = "2026-01-01";
        to.value = "2026-04-01";
    } else {
        from.value = seedStart;
        to.value = seedEnd;
    }
};

const runQuery = async () => {
    busy.value = true;
    try {
        const { data } = await axios.get<PartitionResp>(
            `${apiBase}/lab/partition`,
            { params: { from: from.value, to: to.value } }
        );
        result.value = data;
        pushLog(
            "info",
            `GET partition from=${from.value} to=${to.value} → ${data.count} rows / ${data.elapsedMs} ms / scanned ${data.scannedPartitions.length}`
        );
    } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        pushLog("error", `query: ${msg}`);
    } finally {
        busy.value = false;
    }
};
</script>
