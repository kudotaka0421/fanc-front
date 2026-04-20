<template>
    <div class="p-8 max-w-4xl mx-auto">
        <h1 class="text-2xl font-bold mb-4">Lab</h1>
        <p class="text-gray-600 mb-6">
            やりたい技術を最小構成で触る砂場。各トピックに独立したページがあります。
        </p>
        <ul class="space-y-2">
            <li v-for="topic in topics" :key="topic.path">
                <router-link
                    :to="topic.path"
                    class="block rounded-md border border-gray-200 p-4 hover:bg-gray-50"
                >
                    <div class="font-medium">{{ topic.title }}</div>
                    <div class="text-sm text-gray-500">{{ topic.summary }}</div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
const topics = [
    {
        path: "/lab/s3",
        title: "#1 S3 Presigned Multipart",
        summary: "Presigned URL + multipart upload",
    },
    {
        path: "/lab/queue",
        title: "#2 SQS + Worker",
        summary: "キューイング + 別プロセス worker",
    },
    {
        path: "/lab/fanout",
        title: "#3 SNS → SQS Fanout",
        summary: "1 つの publish を複数の worker に配信",
    },
    {
        path: "/lab/lambda",
        title: "#4 Lambda",
        summary: "S3 PUT イベントで発火する Go Lambda",
    },
    {
        path: "/lab/cache",
        title: "#5 Redis Cache-Aside",
        summary: "Cache-Aside パターンの HIT/MISS 体感",
    },
    {
        path: "/lab/rls",
        title: "#6 Postgres RLS",
        summary: "Row Level Security でマルチテナント分離",
    },
    {
        path: "/lab/partition",
        title: "#7 Postgres パーティショニング",
        summary: "日付レンジパーティション + EXPLAIN",
    },
    {
        path: "/lab/bulk",
        title: "#8 Postgres Bulk",
        summary: "pgx.CopyFrom vs 1 件 INSERT ベンチ",
    },
    {
        path: "/lab/breaker",
        title: "#9 Circuit Breaker",
        summary: "gobreaker の状態遷移を可視化",
    },
    {
        path: "/lab/realtime",
        title: "#10 SSE / WebSocket",
        summary: "サーバーからリアルタイム push",
    },
    {
        path: "/lab/pprof",
        title: "#11 pprof",
        summary: "CPU / heap プロファイル取得",
    },
];
</script>
