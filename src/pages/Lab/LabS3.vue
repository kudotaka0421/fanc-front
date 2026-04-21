<template>
    <div class="p-8 max-w-3xl mx-auto">
        <router-link
            to="/lab"
            class="text-sm text-blue-600 hover:underline"
        >
            ← Lab トップへ
        </router-link>
        <h1 class="mt-4 text-2xl font-bold">#1 S3 Presigned PUT</h1>
        <p class="mt-2 text-sm text-gray-500">
            backend から発行した presigned URL に対してブラウザが
            ファイル全体を 1 回の PUT で送る single upload 方式。
            B2B SaaS の請求書・経費系（&lt; 100 MB 想定）なら multipart を
            避けて実装を最小化できる。
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
                <h2 class="font-semibold">アップロード済みファイル</h2>
                <button
                    type="button"
                    class="text-xs text-blue-600 hover:underline"
                    @click="loadObjects"
                >
                    再読込
                </button>
            </div>
            <table class="mt-3 w-full text-sm">
                <thead class="text-left text-xs text-gray-500">
                    <tr>
                        <th class="py-1">key</th>
                        <th class="py-1">size</th>
                        <th class="py-1">lastModified</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="obj in objects"
                        :key="obj.key"
                        class="border-t border-gray-100"
                    >
                        <td class="py-1 font-mono text-xs">{{ obj.key }}</td>
                        <td class="py-1">{{ humanSize(obj.size) }}</td>
                        <td class="py-1 text-xs text-gray-500">
                            {{ obj.lastModified }}
                        </td>
                    </tr>
                    <tr v-if="!objects.length">
                        <td
                            class="py-2 text-xs text-gray-400"
                            colspan="3"
                        >
                            まだアップロードされていません。
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import axios from "axios";

type LabObject = { key: string; size: number; lastModified: string };
type LogLine = { level: "info" | "error"; msg: string };

const apiBase = import.meta.env.VITE_APP_API_BASE_URL as string;

const file = ref<File | null>(null);
const uploading = ref(false);
const uploadedBytes = ref(0);
const objects = ref<LabObject[]>([]);
const log = ref<LogLine[]>([]);

const progress = computed(() =>
    file.value && file.value.size > 0
        ? (uploadedBytes.value / file.value.size) * 100
        : 0
);

const onFileChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    file.value = input.files?.[0] ?? null;
    uploadedBytes.value = 0;
    log.value = [];
};

const pushLog = (level: LogLine["level"], msg: string) => {
    log.value.push({ level, msg });
};

const humanSize = (n: number) => {
    if (n < 1024) return `${n} B`;
    if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KiB`;
    if (n < 1024 * 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)} MiB`;
    return `${(n / 1024 / 1024 / 1024).toFixed(2)} GiB`;
};

const loadObjects = async () => {
    const { data } = await axios.get(`${apiBase}/lab/s3/objects`);
    objects.value = data.objects ?? [];
};

const upload = async () => {
    if (!file.value) return;
    const f = file.value;

    uploading.value = true;
    uploadedBytes.value = 0;
    log.value = [];

    try {
        pushLog(
            "info",
            `presign-put: ${f.name} (${humanSize(f.size)}, ${f.type || "application/octet-stream"})`
        );
        const { data } = await axios.post(
            `${apiBase}/lab/s3/presign-put`,
            {
                filename: f.name,
                contentType: f.type || "application/octet-stream",
            }
        );
        const url: string = data.url;
        const key: string = data.key;
        pushLog("info", `key=${key}`);

        // XMLHttpRequest を使うのは fetch だと upload.onprogress 相当の
        // 進捗イベントが取れないため（fetch streams は未サポートなブラウザあり）。
        // axios に任せる手もあるが、axios は Content-Type を自動で付けるため
        // 署名と不一致を起こすリスクがある → 生 XHR を使う。
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

        pushLog("info", "upload done");
        await loadObjects();
    } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        pushLog("error", msg);
    } finally {
        uploading.value = false;
    }
};

onMounted(() => {
    loadObjects().catch((e) => {
        pushLog(
            "error",
            `list failed: ${e instanceof Error ? e.message : String(e)}`
        );
    });
});
</script>
