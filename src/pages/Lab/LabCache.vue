<template>
    <div class="p-8 max-w-3xl mx-auto">
        <router-link
            to="/lab"
            class="text-sm text-blue-600 hover:underline"
        >
            ← Lab トップへ
        </router-link>
        <h1 class="mt-4 text-2xl font-bold">#5 Redis Cache-Aside</h1>
        <p class="mt-2 text-sm text-gray-500">
            <code class="rounded bg-gray-100 px-1">GET /lab/cache/schools</code>
            は HIT なら Redis からそのまま、MISS なら MySQL から読み
            Redis に書き戻す典型的な Cache-Aside。DB 側には
            300ms の擬似遅延を入れて HIT/MISS の差を視覚化している。
            TTL は 60 秒。
        </p>

        <section class="mt-6 rounded-md border border-gray-200 p-4">
            <div class="flex flex-wrap items-center gap-3">
                <button
                    type="button"
                    class="rounded bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50"
                    :disabled="busy"
                    @click="fetchSchools"
                >
                    取得
                </button>
                <button
                    type="button"
                    class="rounded bg-gray-600 px-4 py-2 text-sm text-white disabled:opacity-50"
                    :disabled="busy"
                    @click="deleteCache"
                >
                    キャッシュ削除
                </button>

                <span
                    v-if="last"
                    class="inline-flex items-center gap-2 text-sm"
                >
                    <span
                        class="rounded px-2 py-0.5 text-xs font-semibold"
                        :class="
                            last.source === 'cache'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                        "
                    >
                        {{
                            last.source === "cache"
                                ? "Cache HIT"
                                : "Cache MISS"
                        }}
                    </span>
                    <span class="text-gray-600">
                        {{ last.elapsedMs }} ms
                    </span>
                </span>
            </div>
            <p class="mt-3 text-xs text-gray-400">
                取得を連打すると 1 回目は MISS（~300ms）、2 回目以降は
                HIT（数 ms）に切り替わる。キャッシュ削除後は再び MISS に戻る。
            </p>
        </section>

        <section class="mt-6 rounded-md border border-gray-200 p-4">
            <h2 class="font-semibold">結果</h2>
            <table class="mt-3 w-full text-sm">
                <thead class="text-left text-xs text-gray-500">
                    <tr>
                        <th class="py-1">id</th>
                        <th class="py-1">name</th>
                        <th class="py-1 text-right">monthlyFee</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="s in schools"
                        :key="s.id"
                        class="border-t border-gray-100"
                    >
                        <td class="py-1 font-mono text-xs">{{ s.id }}</td>
                        <td class="py-1">{{ s.name }}</td>
                        <td class="py-1 text-right">{{ s.monthlyFee }}</td>
                    </tr>
                    <tr v-if="!schools.length">
                        <td
                            class="py-2 text-xs text-gray-400"
                            colspan="3"
                        >
                            まだ取得していない、または schools テーブルが空。
                        </td>
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
                <li
                    v-if="!log.length"
                    class="text-gray-400"
                >
                    取得するとここにログが出ます
                </li>
            </ul>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

type LabSchool = { id: number; name: string; monthlyFee: number };
type CacheGetRes = {
    source: "cache" | "db";
    elapsedMs: number;
    schools: LabSchool[];
};
type LogLine = { level: "info" | "error"; msg: string };

const apiBase = import.meta.env.VITE_APP_API_BASE_URL as string;

const schools = ref<LabSchool[]>([]);
const last = ref<CacheGetRes | null>(null);
const log = ref<LogLine[]>([]);
const busy = ref(false);

const pushLog = (level: LogLine["level"], msg: string) => {
    log.value.unshift({ level, msg });
    if (log.value.length > 50) log.value.pop();
};

const fetchSchools = async () => {
    busy.value = true;
    try {
        const { data } = await axios.get<CacheGetRes>(
            `${apiBase}/lab/cache/schools`
        );
        last.value = data;
        schools.value = data.schools ?? [];
        pushLog(
            "info",
            `${data.source.toUpperCase()} / ${data.elapsedMs} ms / ${data.schools.length} rows`
        );
    } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        pushLog("error", `fetch: ${msg}`);
    } finally {
        busy.value = false;
    }
};

const deleteCache = async () => {
    busy.value = true;
    try {
        await axios.delete(`${apiBase}/lab/cache/schools`);
        pushLog("info", "cache deleted");
    } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        pushLog("error", `delete: ${msg}`);
    } finally {
        busy.value = false;
    }
};
</script>
