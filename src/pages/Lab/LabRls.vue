<template>
    <div class="p-8 max-w-3xl mx-auto">
        <router-link
            to="/lab"
            class="text-sm text-blue-600 hover:underline"
        >
            ← Lab トップへ
        </router-link>
        <h1 class="mt-4 text-2xl font-bold">#6 Postgres RLS</h1>
        <p class="mt-2 text-sm text-gray-500">
            <code class="rounded bg-gray-100 px-1">GET /lab/rls/samples</code>
            は <code class="rounded bg-gray-100 px-1">X-Tenant-Id</code>
            ヘッダを <code class="rounded bg-gray-100 px-1"
                >SET LOCAL app.current_org_id</code
            >
            に載せて samples を取得する。アプリ側で
            <code class="rounded bg-gray-100 px-1">WHERE</code>
            を書かなくても、RLS policy が自動で絞り込む。テナントを切り替えると
            別テナントのレコードが完全に消えるのが見どころ。
        </p>

        <section class="mt-6 rounded-md border border-gray-200 p-4">
            <label class="block text-sm font-semibold">Tenant</label>
            <select
                v-model="selectedTenantId"
                class="mt-2 w-full rounded border border-gray-300 p-2 text-sm"
                :disabled="!tenants.length"
                @change="fetchSamples"
            >
                <option
                    value=""
                    disabled
                >
                    -- テナントを選択 --
                </option>
                <option
                    v-for="t in tenants"
                    :key="t.id"
                    :value="t.id"
                >
                    {{ t.name }} ({{ t.id.slice(0, 8) }}…)
                </option>
            </select>
            <p class="mt-2 text-xs text-gray-400">
                ドロップダウンの切替は X-Tenant-Id ヘッダの付け替えだけ。
                API 側のクエリは一切変わらない。
            </p>
        </section>

        <section class="mt-6 rounded-md border border-gray-200 p-4">
            <div class="flex items-center justify-between">
                <h2 class="font-semibold">samples</h2>
                <button
                    type="button"
                    class="rounded bg-gray-600 px-3 py-1 text-xs text-white disabled:opacity-50"
                    :disabled="busy || !selectedTenantId"
                    @click="fetchSamples"
                >
                    再取得
                </button>
            </div>
            <table class="mt-3 w-full text-sm">
                <thead class="text-left text-xs text-gray-500">
                    <tr>
                        <th class="py-1">id</th>
                        <th class="py-1">body</th>
                        <th class="py-1">createdAt</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="s in samples"
                        :key="s.id"
                        class="border-t border-gray-100"
                    >
                        <td class="py-1 font-mono text-xs">
                            {{ s.id.slice(0, 8) }}…
                        </td>
                        <td class="py-1">{{ s.body }}</td>
                        <td class="py-1 text-xs text-gray-500">
                            {{ formatTime(s.createdAt) }}
                        </td>
                    </tr>
                    <tr v-if="!samples.length">
                        <td
                            class="py-2 text-xs text-gray-400"
                            colspan="3"
                        >
                            {{
                                selectedTenantId
                                    ? "このテナントに samples はありません"
                                    : "上のドロップダウンからテナントを選んでください"
                            }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>

        <section class="mt-6 rounded-md border border-gray-200 p-4">
            <h2 class="font-semibold">新規 sample 追加</h2>
            <div class="mt-3 flex gap-2">
                <input
                    v-model="newBody"
                    type="text"
                    placeholder="body"
                    class="flex-1 rounded border border-gray-300 p-2 text-sm"
                    :disabled="!selectedTenantId"
                    @keydown.enter="createSample"
                />
                <button
                    type="button"
                    class="rounded bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50"
                    :disabled="busy || !selectedTenantId || !newBody"
                    @click="createSample"
                >
                    追加
                </button>
            </div>
            <p class="mt-2 text-xs text-gray-400">
                org_id はヘッダから決まるのでフォームには出していない。
                WITH CHECK policy が効くので「他テナントに勝手に INSERT」は DB レベルで弾かれる。
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
                    操作するとここにログが出ます
                </li>
            </ul>
        </section>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";

type Tenant = { id: string; name: string };
type Sample = {
    id: string;
    orgId: string;
    body: string;
    createdAt: string;
};
type LogLine = { level: "info" | "error"; msg: string };

const apiBase = import.meta.env.VITE_APP_API_BASE_URL as string;

const tenants = ref<Tenant[]>([]);
const samples = ref<Sample[]>([]);
const selectedTenantId = ref<string>("");
const newBody = ref<string>("");
const log = ref<LogLine[]>([]);
const busy = ref(false);

const pushLog = (level: LogLine["level"], msg: string) => {
    log.value.unshift({ level, msg });
    if (log.value.length > 50) log.value.pop();
};

const formatTime = (iso: string) => {
    try {
        return new Date(iso).toLocaleString("ja-JP");
    } catch {
        return iso;
    }
};

const fetchTenants = async () => {
    try {
        const { data } = await axios.get<Tenant[]>(
            `${apiBase}/lab/rls/tenants`
        );
        tenants.value = data;
        if (!selectedTenantId.value && data.length > 0) {
            selectedTenantId.value = data[0].id;
            await fetchSamples();
        }
    } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        pushLog("error", `tenants: ${msg}`);
    }
};

const fetchSamples = async () => {
    if (!selectedTenantId.value) return;
    busy.value = true;
    try {
        const { data } = await axios.get<Sample[]>(
            `${apiBase}/lab/rls/samples`,
            { headers: { "X-Tenant-Id": selectedTenantId.value } }
        );
        samples.value = data;
        pushLog(
            "info",
            `GET samples (tenant=${selectedTenantId.value.slice(0, 8)}…) / ${
                data.length
            } rows`
        );
    } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        pushLog("error", `samples: ${msg}`);
    } finally {
        busy.value = false;
    }
};

const createSample = async () => {
    if (!selectedTenantId.value || !newBody.value) return;
    busy.value = true;
    try {
        await axios.post(
            `${apiBase}/lab/rls/samples`,
            { body: newBody.value },
            { headers: { "X-Tenant-Id": selectedTenantId.value } }
        );
        pushLog("info", `POST samples: ${newBody.value}`);
        newBody.value = "";
        await fetchSamples();
    } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        pushLog("error", `create: ${msg}`);
    } finally {
        busy.value = false;
    }
};

onMounted(fetchTenants);
</script>
