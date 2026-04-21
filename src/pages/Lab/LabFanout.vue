<template>
    <div class="p-8 max-w-3xl mx-auto">
        <router-link
            to="/lab"
            class="text-sm text-blue-600 hover:underline"
        >
            ← Lab トップへ
        </router-link>
        <h1 class="mt-4 text-2xl font-bold">#3 SNS → SQS Fanout</h1>
        <p class="mt-2 text-sm text-gray-500">
            1 回の SNS <code class="rounded bg-gray-100 px-1">Publish</code> で
            subscribe されている 2 つの SQS キュー（<code class="rounded bg-gray-100 px-1">lab-primary</code> /
            <code class="rounded bg-gray-100 px-1">lab-audit</code>）に同じメッセージが配信される。
            worker プロセスは両キューを独立した goroutine で long polling しており、
            送信直後に両キューの visible 件数が +1 → 処理されて 0 に戻る挙動が観察できる。
        </p>

        <section class="mt-6 rounded-md border border-gray-200 p-4">
            <h2 class="font-semibold">Publish to SNS topic</h2>
            <textarea
                v-model="messageBody"
                class="mt-2 w-full rounded border border-gray-300 p-2 font-mono text-sm"
                rows="2"
                placeholder="任意のメッセージ本文"
            ></textarea>
            <div class="mt-2 flex flex-wrap gap-2">
                <button
                    type="button"
                    class="rounded bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50"
                    :disabled="!messageBody || busy"
                    @click="publish(messageBody)"
                >
                    SNS Publish
                </button>
                <button
                    type="button"
                    class="rounded bg-gray-600 px-4 py-2 text-sm text-white disabled:opacity-50"
                    :disabled="busy"
                    @click="publishBurst"
                >
                    5 件 burst
                </button>
            </div>
        </section>

        <section class="mt-6 rounded-md border border-gray-200 p-4">
            <div class="flex items-center justify-between">
                <h2 class="font-semibold">Queue Stats (fanout targets)</h2>
                <label class="flex items-center gap-1 text-xs text-gray-600">
                    <input
                        v-model="autoRefresh"
                        type="checkbox"
                    />
                    auto-refresh (2s)
                </label>
            </div>
            <table class="mt-3 w-full text-sm">
                <thead class="text-left text-xs text-gray-500">
                    <tr>
                        <th class="py-1">queue</th>
                        <th class="py-1 text-right">visible</th>
                        <th class="py-1 text-right">inFlight</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="q in stats"
                        :key="q.name"
                        class="border-t border-gray-100"
                    >
                        <td class="py-1 font-mono text-xs">{{ q.name }}</td>
                        <td class="py-1 text-right">{{ q.visible }}</td>
                        <td class="py-1 text-right">{{ q.inFlight }}</td>
                    </tr>
                    <tr v-if="!stats.length">
                        <td
                            class="py-2 text-xs text-gray-400"
                            colspan="3"
                        >
                            stats 取得中…
                        </td>
                    </tr>
                </tbody>
            </table>
            <p class="mt-2 text-xs text-gray-400">
                ApproximateNumberOfMessages 系の値は結果整合性なので、数秒の
                遅延がある。publish 直後は両キューがほぼ同時に +1 される。
            </p>
        </section>

        <section
            v-if="log.length"
            class="mt-6 rounded-md border border-gray-200 p-4"
        >
            <h2 class="font-semibold">Log</h2>
            <ul class="mt-2 max-h-48 overflow-auto rounded bg-gray-50 p-2 text-xs font-mono">
                <li
                    v-for="(line, i) in log"
                    :key="i"
                    :class="line.level === 'error' ? 'text-red-600' : 'text-gray-700'"
                >
                    [{{ line.level }}] {{ line.msg }}
                </li>
            </ul>
        </section>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import axios from "axios";

type QueueStat = { name: string; visible: number; inFlight: number };
type LogLine = { level: "info" | "error"; msg: string };

const apiBase = import.meta.env.VITE_APP_API_BASE_URL as string;

const messageBody = ref("hello from fanout");
const busy = ref(false);
const stats = ref<QueueStat[]>([]);
const log = ref<LogLine[]>([]);
const autoRefresh = ref(true);
let timer: ReturnType<typeof setInterval> | null = null;

const pushLog = (level: LogLine["level"], msg: string) => {
    log.value.unshift({ level, msg });
    if (log.value.length > 30) log.value.pop();
};

const loadStats = async () => {
    try {
        const { data } = await axios.get(`${apiBase}/lab/sns/stats`);
        stats.value = data.queues ?? [];
    } catch (e) {
        pushLog(
            "error",
            `stats: ${e instanceof Error ? e.message : String(e)}`
        );
    }
};

const publish = async (body: string) => {
    if (!body) return;
    busy.value = true;
    try {
        const { data } = await axios.post(`${apiBase}/lab/sns/publish`, {
            body,
        });
        pushLog("info", `published: ${data.messageId}`);
        await loadStats();
    } catch (e) {
        pushLog(
            "error",
            `publish: ${e instanceof Error ? e.message : String(e)}`
        );
    } finally {
        busy.value = false;
    }
};

const publishBurst = async () => {
    busy.value = true;
    try {
        for (let i = 1; i <= 5; i++) {
            await axios.post(`${apiBase}/lab/sns/publish`, {
                body: `burst ${i}/5 @ ${new Date().toISOString()}`,
            });
        }
        pushLog("info", "burst 5 published");
        await loadStats();
    } catch (e) {
        pushLog(
            "error",
            `burst: ${e instanceof Error ? e.message : String(e)}`
        );
    } finally {
        busy.value = false;
    }
};

const startTimer = () => {
    if (timer) return;
    timer = setInterval(loadStats, 2000);
};
const stopTimer = () => {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
};

watch(autoRefresh, (on) => {
    if (on) startTimer();
    else stopTimer();
});

onMounted(() => {
    loadStats();
    if (autoRefresh.value) startTimer();
});
onUnmounted(stopTimer);
</script>
