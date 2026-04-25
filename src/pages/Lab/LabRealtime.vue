<template>
    <div class="p-8 max-w-4xl mx-auto">
        <router-link to="/lab" class="text-sm text-blue-600 hover:underline">
            ← Lab トップへ
        </router-link>
        <h1 class="mt-4 text-2xl font-bold">#10 SSE Realtime</h1>
        <p class="mt-2 text-sm text-gray-500">
            <code class="rounded bg-gray-100 px-1">EventSource</code>
            でサーバとの SSE 接続を張る。サーバ側 broker は
            <span class="font-semibold">subscribers map[id]chan</span>
            を持ち、publish 時に全 channel へ fan-out する。
            <span class="font-semibold">2 タブ</span>
            で開いて片方から publish すると、両方のタブにメッセージが届くのが見える。
        </p>

        <section class="mt-6 rounded-md border border-gray-200 p-4">
            <h2 class="font-semibold">接続</h2>
            <div class="mt-3 flex flex-wrap items-center gap-3 text-sm">
                <span
                    class="rounded px-3 py-1 text-sm font-bold"
                    :class="statusBadgeClass"
                >
                    {{ status }}
                </span>
                <span v-if="subscriberId" class="font-mono text-xs text-gray-500">
                    subscriberId = {{ subscriberId }}
                </span>
                <button
                    type="button"
                    class="rounded bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50"
                    :disabled="status === 'CONNECTED' || status === 'CONNECTING'"
                    @click="connect"
                >
                    接続
                </button>
                <button
                    type="button"
                    class="rounded bg-gray-600 px-4 py-2 text-sm text-white disabled:opacity-50"
                    :disabled="status !== 'CONNECTED'"
                    @click="disconnect"
                >
                    切断
                </button>
                <span class="ml-auto text-xs text-gray-400">
                    stats ポーリング 2s
                </span>
            </div>
            <div class="mt-3 flex gap-6 text-xs text-gray-500">
                <span>接続中 subscribers: <strong>{{ stats.subscribers }}</strong></span>
                <span>累計送信: <strong>{{ stats.totalSent }}</strong></span>
            </div>
        </section>

        <section class="mt-6 rounded-md border border-gray-200 p-4">
            <h2 class="font-semibold">送信</h2>
            <form class="mt-3 flex flex-wrap items-center gap-3" @submit.prevent="publish">
                <input
                    v-model="message"
                    type="text"
                    placeholder="メッセージ"
                    class="flex-1 min-w-[16rem] rounded border border-gray-300 px-3 py-2 text-sm"
                />
                <button
                    type="submit"
                    class="rounded bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50"
                    :disabled="!message || publishing"
                >
                    publish
                </button>
                <button
                    type="button"
                    class="rounded bg-gray-100 px-3 py-2 text-xs hover:bg-gray-200"
                    :disabled="publishing"
                    @click="publishBurst"
                >
                    5 連投
                </button>
            </form>
            <p v-if="lastPublish" class="mt-2 text-xs text-gray-500">
                last: id={{ lastPublish.id }} / 配信 {{ lastPublish.subscribers - lastPublish.dropped }} 人
                <span v-if="lastPublish.dropped > 0" class="text-orange-600">
                    （drop {{ lastPublish.dropped }}）
                </span>
            </p>
        </section>

        <section class="mt-6 rounded-md border border-gray-200 p-4">
            <h2 class="font-semibold">受信ログ（新しい順）</h2>
            <ul
                class="mt-2 max-h-80 overflow-auto rounded bg-gray-50 p-2 font-mono text-xs"
            >
                <li
                    v-for="(line, i) in log"
                    :key="i"
                    :class="line.kind === 'system' ? 'text-gray-500' : 'text-gray-800'"
                >
                    <span class="text-gray-400">[{{ line.time }}]</span>
                    <span v-if="line.kind === 'event'" class="ml-2 text-blue-700">#{{ line.id }}</span>
                    <span class="ml-2">{{ line.text }}</span>
                </li>
                <li v-if="!log.length" class="text-gray-400">
                    接続するとここに受信メッセージが流れます
                </li>
            </ul>
        </section>
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import axios from "axios";

type Status = "DISCONNECTED" | "CONNECTING" | "CONNECTED" | "ERROR";
type LogLine = {
    time: string;
    kind: "system" | "event";
    id?: number;
    text: string;
};
type Stats = { subscribers: number; totalSent: number };
type PublishResp = { id: number; subscribers: number; dropped: number };
type EventPayload = { id: number; message: string; publishedAt: string };
type HelloPayload = { subscriberId: number };

const apiBase = import.meta.env.VITE_APP_API_BASE_URL as string;

const status = ref<Status>("DISCONNECTED");
const subscriberId = ref<number | null>(null);
const message = ref("hello");
const publishing = ref(false);
const lastPublish = ref<PublishResp | null>(null);
const stats = ref<Stats>({ subscribers: 0, totalSent: 0 });
const log = ref<LogLine[]>([]);

let es: EventSource | null = null;
let statsTimer: number | undefined;

const statusBadgeClass = computed(() => {
    switch (status.value) {
        case "CONNECTED":
            return "bg-green-100 text-green-800";
        case "CONNECTING":
            return "bg-yellow-100 text-yellow-800";
        case "ERROR":
            return "bg-red-100 text-red-800";
        default:
            return "bg-gray-100 text-gray-700";
    }
});

const pushLog = (kind: LogLine["kind"], text: string, id?: number) => {
    log.value.unshift({
        time: new Date().toLocaleTimeString(),
        kind,
        id,
        text,
    });
    if (log.value.length > 100) log.value.pop();
};

const connect = () => {
    if (es) return;
    status.value = "CONNECTING";
    pushLog("system", "connecting…");
    es = new EventSource(`${apiBase}/lab/realtime/stream`);

    es.addEventListener("hello", (ev) => {
        try {
            const data = JSON.parse((ev as MessageEvent).data) as HelloPayload;
            subscriberId.value = data.subscriberId;
            status.value = "CONNECTED";
            pushLog("system", `connected (subscriberId=${data.subscriberId})`);
        } catch {
            // 壊れた hello は無視（接続自体は確立しているはず）
            status.value = "CONNECTED";
        }
    });

    // デフォルトの message イベント。サーバ側で event: 指定なしで送るとここに来る。
    es.onmessage = (ev) => {
        try {
            const data = JSON.parse(ev.data) as EventPayload;
            pushLog("event", `${data.message}`, data.id);
        } catch {
            pushLog("system", `parse error: ${ev.data}`);
        }
    };

    es.onerror = () => {
        // EventSource は自動再接続するので、ここで close せず status だけ更新
        status.value = "ERROR";
        pushLog("system", "error / 自動再接続待ち");
    };
};

const disconnect = () => {
    if (!es) return;
    es.close();
    es = null;
    subscriberId.value = null;
    status.value = "DISCONNECTED";
    pushLog("system", "disconnected");
};

const publish = async () => {
    if (!message.value || publishing.value) return;
    publishing.value = true;
    try {
        const { data } = await axios.post<PublishResp>(
            `${apiBase}/lab/realtime/publish`,
            { message: message.value }
        );
        lastPublish.value = data;
    } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        pushLog("system", `publish error: ${msg}`);
    } finally {
        publishing.value = false;
    }
};

// 5 連投。subscribers 全員に同じバッファ容量を埋める負荷を軽くかけて drop を観察する用。
const publishBurst = async () => {
    publishing.value = true;
    try {
        for (let i = 0; i < 5; i++) {
            await axios.post(`${apiBase}/lab/realtime/publish`, {
                message: `burst-${i + 1}`,
            });
        }
    } finally {
        publishing.value = false;
    }
};

const fetchStats = async () => {
    try {
        const { data } = await axios.get<Stats>(`${apiBase}/lab/realtime/stats`);
        stats.value = data;
    } catch {
        // 一時的に取れなくても UI は壊さない
    }
};

onMounted(() => {
    fetchStats();
    statsTimer = window.setInterval(fetchStats, 2000);
});

onBeforeUnmount(() => {
    if (statsTimer !== undefined) window.clearInterval(statsTimer);
    disconnect();
});
</script>
