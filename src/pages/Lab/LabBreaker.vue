<template>
    <div class="p-8 max-w-4xl mx-auto">
        <router-link to="/lab" class="text-sm text-blue-600 hover:underline">
            ← Lab トップへ
        </router-link>
        <h1 class="mt-4 text-2xl font-bold">#9 Circuit Breaker</h1>
        <p class="mt-2 text-sm text-gray-500">
            <code class="rounded bg-gray-100 px-1">sony/gobreaker</code>
            で同プロセス内 mock upstream を保護する。失敗モードを ON にして
            <span class="font-semibold">呼び出す</span> を連打すると、
            3 連続失敗で <span class="font-semibold">Closed → Open</span>、
            5 秒経つと <span class="font-semibold">Half-Open</span>、
            probe 成功で <span class="font-semibold">Closed</span>
            に戻る流れが観察できる。
        </p>

        <section class="mt-6 rounded-md border border-gray-200 p-4">
            <h2 class="font-semibold">状態</h2>
            <div class="mt-3 flex flex-wrap items-center gap-3 text-sm">
                <span
                    class="rounded px-3 py-1 text-sm font-bold"
                    :class="stateBadgeClass"
                >
                    {{ state }}
                </span>
                <span class="text-xs text-gray-500">
                    reqs {{ counts.Requests }} / success
                    {{ counts.TotalSuccesses }} / fail
                    {{ counts.TotalFailures }} / consecFail
                    {{ counts.ConsecutiveFailures }}
                </span>
                <span class="ml-auto text-xs text-gray-400">
                    ポーリング間隔 1s
                </span>
            </div>
        </section>

        <section class="mt-6 rounded-md border border-gray-200 p-4">
            <h2 class="font-semibold">操作</h2>
            <div class="mt-3 flex flex-wrap items-center gap-3 text-sm">
                <label class="inline-flex items-center gap-2">
                    <input
                        type="checkbox"
                        class="h-4 w-4"
                        :checked="failMode"
                        @change="toggleFail"
                    />
                    <span>失敗モード（ON = mock が 500 を返す）</span>
                </label>
                <button
                    type="button"
                    class="rounded bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50"
                    :disabled="busy"
                    @click="callOnce"
                >
                    呼び出す
                </button>
                <button
                    type="button"
                    class="rounded bg-gray-100 px-3 py-2 text-xs hover:bg-gray-200"
                    :disabled="busy"
                    @click="callBurst"
                >
                    10 連打
                </button>
            </div>
            <p class="mt-3 text-xs text-gray-400">
                失敗モード ON → 連打 → Open に落ちる。そのまま連打すると
                <code class="rounded bg-gray-100 px-1">source=breaker</code>
                （breaker が手前で短絡、upstream に到達していない）で返る。
                5 秒待つと Half-Open に戻り、1 回だけ probe が通る。
            </p>
        </section>

        <section
            v-if="calls.length"
            class="mt-6 rounded-md border border-gray-200 p-4"
        >
            <h2 class="font-semibold">呼び出し履歴（新しい順）</h2>
            <table class="mt-2 w-full text-sm">
                <thead class="text-left text-xs text-gray-500">
                    <tr>
                        <th class="py-1">time</th>
                        <th class="py-1">ok</th>
                        <th class="py-1">source</th>
                        <th class="py-1">state</th>
                        <th class="py-1">elapsed</th>
                        <th class="py-1">error / body</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(c, i) in calls"
                        :key="i"
                        class="border-t border-gray-100"
                    >
                        <td class="py-1 font-mono text-xs text-gray-500">
                            {{ c.time }}
                        </td>
                        <td class="py-1">
                            <span
                                class="rounded px-2 py-0.5 text-xs"
                                :class="
                                    c.ok
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                "
                            >
                                {{ c.ok ? "OK" : "NG" }}
                            </span>
                        </td>
                        <td class="py-1 font-mono text-xs">
                            <span
                                class="rounded px-2 py-0.5"
                                :class="
                                    c.source === 'breaker'
                                        ? 'bg-orange-100 text-orange-800'
                                        : 'bg-gray-100 text-gray-700'
                                "
                            >
                                {{ c.source }}
                            </span>
                        </td>
                        <td class="py-1 font-mono text-xs">{{ c.state }}</td>
                        <td class="py-1 text-xs text-gray-600">
                            {{ c.elapsedMs }} ms
                        </td>
                        <td
                            class="py-1 font-mono text-xs text-gray-600 truncate max-w-xs"
                        >
                            {{ c.error || c.body }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>

        <section
            v-if="transitions.length"
            class="mt-6 rounded-md border border-gray-200 p-4"
        >
            <h2 class="font-semibold">状態遷移</h2>
            <ul class="mt-2 space-y-1 font-mono text-xs text-gray-700">
                <li v-for="(t, i) in transitions" :key="i">
                    {{ t.at }} :
                    <span class="rounded bg-gray-100 px-1">{{ t.from }}</span>
                    → <span class="rounded bg-gray-100 px-1">{{ t.to }}</span>
                </li>
            </ul>
        </section>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from "vue";
import axios from "axios";

type Counts = {
    Requests: number;
    TotalSuccesses: number;
    TotalFailures: number;
    ConsecutiveSuccesses: number;
    ConsecutiveFailures: number;
};
type Transition = { at: string; from: string; to: string };
type StateResp = {
    state: string;
    counts: Counts;
    failMode: boolean;
    transitions: Transition[];
};
type CallResp = {
    ok: boolean;
    source: "upstream" | "breaker";
    httpStatus?: number;
    body?: string;
    error?: string;
    state: string;
    counts: Counts;
    elapsedMs: number;
};
type CallRow = CallResp & { time: string };

const apiBase = import.meta.env.VITE_APP_API_BASE_URL as string;

const state = ref<string>("unknown");
const counts = ref<Counts>({
    Requests: 0,
    TotalSuccesses: 0,
    TotalFailures: 0,
    ConsecutiveSuccesses: 0,
    ConsecutiveFailures: 0,
});
const failMode = ref(false);
const transitions = ref<Transition[]>([]);
const calls = ref<CallRow[]>([]);
const busy = ref(false);

const stateBadgeClass = computed(() => {
    switch (state.value) {
        case "closed":
            return "bg-green-100 text-green-800";
        case "open":
            return "bg-red-100 text-red-800";
        case "half-open":
            return "bg-yellow-100 text-yellow-800";
        default:
            return "bg-gray-100 text-gray-700";
    }
});

const pushCall = (r: CallResp) => {
    calls.value.unshift({ ...r, time: new Date().toLocaleTimeString() });
    if (calls.value.length > 30) calls.value.pop();
};

const fetchState = async () => {
    try {
        const { data } = await axios.get<StateResp>(
            `${apiBase}/lab/breaker/state`
        );
        state.value = data.state;
        counts.value = data.counts;
        failMode.value = data.failMode;
        transitions.value = [...data.transitions].reverse().slice(0, 20);
    } catch {
        state.value = "unreachable";
    }
};

const callOnce = async () => {
    busy.value = true;
    try {
        const { data } = await axios.get<CallResp>(`${apiBase}/lab/breaker/call`);
        pushCall(data);
        state.value = data.state;
        counts.value = data.counts;
    } finally {
        busy.value = false;
    }
};

// 10 連打。breaker は連続失敗カウントが要なので、逐次で投げる。
const callBurst = async () => {
    busy.value = true;
    try {
        for (let i = 0; i < 10; i++) {
            const { data } = await axios.get<CallResp>(
                `${apiBase}/lab/breaker/call`
            );
            pushCall(data);
            state.value = data.state;
            counts.value = data.counts;
        }
    } finally {
        busy.value = false;
    }
};

const toggleFail = async () => {
    const { data } = await axios.post<{ failMode: boolean }>(
        `${apiBase}/lab/breaker/toggle-fail`
    );
    failMode.value = data.failMode;
};

let timer: number | undefined;
onMounted(() => {
    fetchState();
    timer = window.setInterval(fetchState, 1000);
});
onBeforeUnmount(() => {
    if (timer !== undefined) window.clearInterval(timer);
});
</script>
