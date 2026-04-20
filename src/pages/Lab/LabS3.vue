<template>
    <div class="p-8 max-w-3xl mx-auto">
        <router-link
            to="/lab"
            class="text-sm text-blue-600 hover:underline"
        >
            ← Lab トップへ
        </router-link>
        <h1 class="mt-4 text-2xl font-bold">#1 S3 Presigned Multipart</h1>
        <p class="mt-2 text-sm text-gray-500">
            ファイルを {{ PART_MIB }}MiB の chunk に分割し、パートごとに
            presigned URL を取得してブラウザから直接 S3 (LocalStack) に PUT
            する。最後に ETag を集めて CompleteMultipartUpload。
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
                選択中: {{ file.name }} ({{ humanSize(file.size) }},
                パート数 {{ totalParts }})
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
                    ({{ completedParts }}/{{ totalParts }} parts)
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

// S3 multipart は非最終パートに 5MiB 下限がある。
const PART_MIB = 5;
const PART_SIZE = PART_MIB * 1024 * 1024;

type LabObject = { key: string; size: number; lastModified: string };
type LogLine = { level: "info" | "error"; msg: string };

const apiBase = import.meta.env.VITE_APP_API_BASE_URL as string;

const file = ref<File | null>(null);
const uploading = ref(false);
const completedParts = ref(0);
const objects = ref<LabObject[]>([]);
const log = ref<LogLine[]>([]);

const totalParts = computed(() =>
    file.value ? Math.max(1, Math.ceil(file.value.size / PART_SIZE)) : 0
);
const progress = computed(() =>
    totalParts.value === 0
        ? 0
        : (completedParts.value / totalParts.value) * 100
);

const onFileChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    file.value = input.files?.[0] ?? null;
    completedParts.value = 0;
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
    completedParts.value = 0;
    log.value = [];

    let uploadId = "";
    let key = "";
    try {
        pushLog("info", `CreateMultipartUpload: ${f.name} (${humanSize(f.size)})`);
        const createRes = await axios.post(`${apiBase}/lab/s3/multipart/create`, {
            filename: f.name,
            contentType: f.type || "application/octet-stream",
        });
        uploadId = createRes.data.uploadId;
        key = createRes.data.key;
        pushLog("info", `uploadId=${uploadId.slice(0, 12)}... key=${key}`);

        const parts: { partNumber: number; eTag: string }[] = [];
        for (let i = 0; i < totalParts.value; i++) {
            const partNumber = i + 1;
            const start = i * PART_SIZE;
            const end = Math.min(start + PART_SIZE, f.size);
            const chunk = f.slice(start, end);

            const signRes = await axios.post(
                `${apiBase}/lab/s3/multipart/sign-part`,
                { key, uploadId, partNumber }
            );
            const url: string = signRes.data.url;

            const putRes = await fetch(url, {
                method: "PUT",
                body: chunk,
            });
            if (!putRes.ok) {
                throw new Error(
                    `PUT part ${partNumber} failed: HTTP ${putRes.status}`
                );
            }
            const etag = (
                putRes.headers.get("ETag") ||
                putRes.headers.get("etag") ||
                ""
            ).replace(/^"|"$/g, "");
            if (!etag) {
                throw new Error(
                    `part ${partNumber}: ETag not exposed (check S3 CORS ExposeHeaders)`
                );
            }
            parts.push({ partNumber, eTag: etag });
            completedParts.value = partNumber;
            pushLog(
                "info",
                `PUT part ${partNumber}/${totalParts.value} etag=${etag.slice(0, 8)}...`
            );
        }

        pushLog("info", `CompleteMultipartUpload (${parts.length} parts)`);
        const completeRes = await axios.post(
            `${apiBase}/lab/s3/multipart/complete`,
            { key, uploadId, parts }
        );
        pushLog("info", `done: ${completeRes.data.location}`);
        await loadObjects();
    } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        pushLog("error", msg);
        if (uploadId && key) {
            try {
                await axios.post(`${apiBase}/lab/s3/multipart/abort`, {
                    key,
                    uploadId,
                });
                pushLog("info", "AbortMultipartUpload: 中断済み");
            } catch (abortErr) {
                const am =
                    abortErr instanceof Error
                        ? abortErr.message
                        : String(abortErr);
                pushLog("error", `abort failed: ${am}`);
            }
        }
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
