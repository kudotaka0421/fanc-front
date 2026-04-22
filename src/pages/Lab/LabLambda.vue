<template>
    <div class="p-8 max-w-3xl mx-auto">
        <router-link
            to="/lab"
            class="text-sm text-blue-600 hover:underline"
        >
            ← Lab トップへ
        </router-link>
        <h1 class="mt-4 text-2xl font-bold">#4 Lambda (S3 → Lambda)</h1>
        <p class="mt-2 text-sm text-gray-500">
            <code class="rounded bg-gray-100 px-1">lab-lambda</code> バケットの
            <code class="rounded bg-gray-100 px-1">uploads/</code> に PUT すると、
            S3 イベント通知で Go Lambda が起動し、オブジェクトを GetObject →
            SHA-256 / サイズ / Content-Type を計算して
            <code class="rounded bg-gray-100 px-1">results/{key}.json</code> に書き戻す。
            フロントは results を 2 秒おきに polling し、Lambda の処理完了を観察する。
        </p>

        <section class="mt-6 rounded-md border border-gray-200 p-4">
            <h2 class="font-semibold">アップロード</h2>
            <div class="mt-3 flex items-center gap-3">
                <input
                    type="file"
                    class="text-sm"
                    @change="onFileChange"
                />
                <button
                    type="button"
                    class="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                    :disabled="!file || uploading"
                    @click="upload"
                >
                    {{ uploading ? "アップロード中…" : "アップロード" }}
                </button>
            </div>
            <div
                v-if="file"
                class="mt-3 text-xs text-gray-600"
            >
                選択中: {{ file.name }} ({{ humanSize(file.size) }})
            </div>
            <div
                v-if="uploading || progress > 0"
                class="mt-4"
            >
                <div class="h-2 w-full overflow-hidden rounded bg-gray-200">
                    <div
                        class="h-full bg-blue-500 transition-all"
                        :style="{ width: progress + '%' }"
                    />
                </div>
                <div class="mt-1 text-xs text-gray-500">
                    {{ progress.toFixed(1) }}%
                </div>
            </div>
            <ul
                v-if="log.length"
                class="mt-4 max-h-48 overflow-auto rounded bg-gray-50 p-2 text-xs font-mono"
            >
                <li
                    v-for="(line, i) in log"
                    :key="i"
                    :class="line.level === 'error' ? 'text-red-600' : 'text-gray-700'"
                >
                    [{{ line.level }}] {{ line.msg }}
                </li>
            </ul>
        </section>

        <section class="mt-6 rounded-md border border-gray-200 p-4">
            <div class="flex items-center justify-between">
                <h2 class="font-semibold">Uploads / Results</h2>
                <label class="flex items-center gap-1 text-xs text-gray-600">
                    <input
                        v-model="autoRefresh"
                        type="checkbox"
                    />
                    auto-refresh (2s)
                </label>
            </div>

            <h3 class="mt-3 text-sm font-medium text-gray-700">
                uploads/ ({{ uploads.length }})
            </h3>
            <table class="mt-1 w-full text-sm">
                <thead class="text-left text-xs text-gray-500">
                    <tr>
                        <th class="py-1">key</th>
                        <th class="py-1">size</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="obj in uploads"
                        :key="obj.key"
                        class="border-t border-gray-100"
                    >
                        <td class="py-1 font-mono text-xs">{{ obj.key }}</td>
                        <td class="py-1">{{ humanSize(obj.size) }}</td>
                    </tr>
                    <tr v-if="!uploads.length">
                        <td
                            class="py-2 text-xs text-gray-400"
                            colspan="2"
                        >
                            まだ何もない。
                        </td>
                    </tr>
                </tbody>
            </table>

            <h3 class="mt-4 text-sm font-medium text-gray-700">
                results/ ({{ results.length }})
            </h3>
            <div class="mt-1 space-y-2">
                <div
                    v-for="r in results"
                    :key="r.key"
                    class="rounded border border-gray-100 p-2 text-xs"
                >
                    <div class="font-mono text-gray-600">{{ r.key }}</div>
                    <div
                        v-if="r.payload"
                        class="mt-1 grid grid-cols-2 gap-x-4 gap-y-1 text-gray-700"
                    >
                        <div>size: {{ humanSize(r.payload.size) }}</div>
                        <div>contentType: {{ r.payload.contentType || "-" }}</div>
                        <div class="col-span-2">
                            sha256:
                            <span class="font-mono">{{ r.payload.sha256 }}</span>
                        </div>
                        <div class="col-span-2 text-gray-500">
                            processedAt: {{ r.payload.processedAt }}
                        </div>
                    </div>
                </div>
                <div
                    v-if="!results.length"
                    class="text-xs text-gray-400"
                >
                    Lambda 処理結果はまだない（upload 後、数秒で出現する）。
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import axios from "axios";

type S3Object = { key: string; size: number; lastModified: string };
type ResultPayload = {
    key: string;
    bucket: string;
    size: number;
    contentType: string;
    sha256: string;
    processedAt: string;
};
type Result = {
    key: string;
    size: number;
    lastModified: string;
    payload?: ResultPayload;
};
type LogLine = { level: "info" | "error"; msg: string };

const apiBase = import.meta.env.VITE_APP_API_BASE_URL as string;

const file = ref<File | null>(null);
const uploading = ref(false);
const uploadedBytes = ref(0);
const uploads = ref<S3Object[]>([]);
const results = ref<Result[]>([]);
const log = ref<LogLine[]>([]);
const autoRefresh = ref(true);
let timer: ReturnType<typeof setInterval> | null = null;

const progress = computed(() =>
    file.value && file.value.size > 0
        ? (uploadedBytes.value / file.value.size) * 100
        : 0
);

const humanSize = (n: number) => {
    if (n < 1024) return `${n} B`;
    if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KiB`;
    if (n < 1024 * 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)} MiB`;
    return `${(n / 1024 / 1024 / 1024).toFixed(2)} GiB`;
};

const pushLog = (level: LogLine["level"], msg: string) => {
    log.value.unshift({ level, msg });
    if (log.value.length > 30) log.value.pop();
};

const onFileChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    file.value = input.files?.[0] ?? null;
    uploadedBytes.value = 0;
};

const refresh = async () => {
    try {
        const [u, r] = await Promise.all([
            axios.get(`${apiBase}/lab/lambda/uploads`),
            axios.get(`${apiBase}/lab/lambda/results`),
        ]);
        uploads.value = u.data.uploads ?? [];
        results.value = r.data.results ?? [];
    } catch (e) {
        pushLog(
            "error",
            `refresh: ${e instanceof Error ? e.message : String(e)}`
        );
    }
};

const upload = async () => {
    if (!file.value) return;
    const f = file.value;

    uploading.value = true;
    uploadedBytes.value = 0;

    try {
        pushLog(
            "info",
            `presign-put: ${f.name} (${humanSize(f.size)}, ${f.type || "application/octet-stream"})`
        );
        const { data } = await axios.post(
            `${apiBase}/lab/lambda/presign-put`,
            {
                filename: f.name,
                contentType: f.type || "application/octet-stream",
            }
        );
        const url: string = data.url;
        const key: string = data.key;
        pushLog("info", `key=${key}`);

        await new Promise<void>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("PUT", url);
            xhr.upload.onprogress = (ev) => {
                if (ev.lengthComputable) {
                    uploadedBytes.value = ev.loaded;
                }
            };
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    uploadedBytes.value = f.size;
                    resolve();
                } else {
                    reject(new Error(`PUT failed: HTTP ${xhr.status}`));
                }
            };
            xhr.onerror = () => reject(new Error("PUT network error"));
            xhr.send(f);
        });

        pushLog("info", "upload done — waiting for Lambda to process…");
        await refresh();
    } catch (err) {
        pushLog("error", err instanceof Error ? err.message : String(err));
    } finally {
        uploading.value = false;
    }
};

const startTimer = () => {
    if (timer) return;
    timer = setInterval(refresh, 2000);
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
    refresh();
    if (autoRefresh.value) startTimer();
});
onUnmounted(stopTimer);
</script>
