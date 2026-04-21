<template>
    <div class="p-8 max-w-3xl mx-auto">
        <router-link
            to="/lab"
            class="text-sm text-blue-600 hover:underline"
        >
            ← Lab トップへ
        </router-link>
        <h1 class="mt-4 text-2xl font-bold">#2 SQS + Worker</h1>
        <p class="mt-2 text-sm text-gray-500">
            POST された本文を SQS `lab-primary` に publish。別コンテナで動く
            worker プロセスが long polling で受信し、1 秒のダミー処理後に
            DeleteMessage。本文に
            <code class="rounded bg-gray-100 px-1">fail</code>
            を含む場合は削除せず、visibility timeout (10s) 切れによる
            再配信 × 3 回後に DLQ へ移動する（redrive policy）。
        </p>

        <section class="mt-6 rounded-md border border-gray-200 p-4">
            <h2 class="font-semibold">Publish</h2>
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
                    送信
                </button>
                <button
                    type="button"
                    class="rounded bg-orange-500 px-4 py-2 text-sm text-white disabled:opacity-50"
                    :disabled="busy"
                    @click="publishFail"
                >
                    fail 付きで送信（DLQ 行き確認用）
                </button>
                <button
                    type="button"
                    class="rounded bg-gray-600 px-4 py-2 text-sm text-white disabled:opacity-50"
                    :disabled="busy"
                    @click="publishBurst"
                >
                    10 件 burst
                </button>
            </div>
        </section>

        <section class="mt-6 rounded-md border border-gray-200 p-4">
            <div class="flex items-center justify-between">
                <h2 class="font-semibold">Queue Stats</h2>
                <label class="text-xs text-gray-600">
                    <input
                        v-model="autoRefresh"
                        type="checkbox"
                        class="mr-1"
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
                        <th class="py-1 text-right">delayed</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-t border-gray-100">
                        <td class="py-1 font-mono text-xs">lab-primary</td>
                        <td class="py-1 text-right">
                            {{ stats?.primary?.visible ?? "-" }}
                        </td>
                        <td class="py-1 text-right">
                            {{ stats?.primary?.inFlight ?? "-" }}
                        </td>
                        <td class="py-1 text-right">
                            {{ stats?.primary?.delayed ?? "-" }}
                        </td>
                    </tr>
                    <tr class="border-t border-gray-100">
                        <td class="py-1 font-mono text-xs">lab-dlq</td>
                        <td class="py-1 text-right">
                            {{ stats?.dlq?.visible ?? "-" }}
                        </td>
                        <td class="py-1 text-right">
                            {{ stats?.dlq?.inFlight ?? "-" }}
                        </td>
                        <td class="py-1 text-right">
                            {{ stats?.dlq?.delayed ?? "-" }}
                        </td>
                    </tr>
                </tbody>
            </table>
            <p class="mt-2 text-xs text-gray-400">
                ApproximateNumberOfMessages 系の値は結果整合性なので、数秒の
                遅れがある。
            </p>
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
                    publish するとここにログが出ます
                </li>
            </ul>
        </section>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import axios from "axios";

type QueueAttr = { visible: number; inFlight: number; delayed: number };
type Stats = { primary: QueueAttr; dlq: QueueAttr };
type LogLine = { level: "info" | "error"; msg: string };

const apiBase = import.meta.env.VITE_APP_API_BASE_URL as string;

const messageBody = ref("hello from lab");
const stats = ref<Stats | null>(null);
const log = ref<LogLine[]>([]);
const busy = ref(false);
const autoRefresh = ref(true);
let timer: number | undefined;

const pushLog = (level: LogLine["level"], msg: string) => {
    log.value.unshift({ level, msg });
    if (log.value.length > 50) log.value.pop();
};

const loadStats = async () => {
    try {
        const { data } = await axios.get(`${apiBase}/lab/sqs/stats`);
        stats.value = data;
    } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        pushLog("error", `stats: ${msg}`);
    }
};

const publish = async (body: string) => {
    busy.value = true;
    try {
        const { data } = await axios.post(`${apiBase}/lab/sqs/publish`, {
            body,
        });
        pushLog(
            "info",
            `publish ok: ${data.messageId.slice(0, 12)}... body=${body}`
        );
    } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        pushLog("error", `publish: ${msg}`);
    } finally {
        busy.value = false;
    }
    await loadStats();
};

const publishFail = async () => {
    const body = `fail ${new Date().toISOString()}`;
    await publish(body);
};

const publishBurst = async () => {
    busy.value = true;
    try {
        const requests = Array.from({ length: 10 }, (_, i) =>
            axios.post(`${apiBase}/lab/sqs/publish`, {
                body: `burst-${i} ${new Date().toISOString()}`,
            })
        );
        await Promise.all(requests);
        pushLog("info", "burst: 10 件 publish 完了");
    } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        pushLog("error", `burst: ${msg}`);
    } finally {
        busy.value = false;
    }
    await loadStats();
};

onMounted(() => {
    loadStats();
    timer = window.setInterval(() => {
        if (autoRefresh.value) loadStats();
    }, 2000);
});

onUnmounted(() => {
    if (timer) clearInterval(timer);
});
</script>
