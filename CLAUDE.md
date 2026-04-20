# fanc-front

PitaScho（オンラインカウンセリング相談予約サービス）のカウンセリング管理サービス「fanc」のフロントエンド。

## 技術スタック

- **フレームワーク**: Vue 3.2 + TypeScript 5.0
- **ビルドツール**: Vite 4.2
- **状態管理**: Pinia 2.0
- **ルーティング**: Vue Router 4.0
- **HTTP クライアント**: Axios 1.4
- **UI**: Headless UI Vue, Heroicons Vue, Tailwind CSS 3.3
- **カレンダー**: v-calendar 3.0

## ディレクトリ構造

```
src/
├── components/   UI コンポーネント（Signup, User, Counseling, School, Tag, Login 等）
├── pages/        ページコンポーネント（ルーティング対象）
├── router/       Vue Router 設定
├── store/        Pinia ストア（alert, me）
├── types/        TypeScript 型定義
├── utils/        ユーティリティ関数
├── assets/       静的アセット
├── App.vue       ルートコンポーネント
├── main.ts       エントリーポイント
└── useApp.ts     アプリケーション共通ロジック
```

パスエイリアス: `@/*` → `src/*`

## 主要コマンド

| コマンド | 用途 |
|---------|------|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | 本番ビルド（tsc 型チェック込み） |
| `npm run build:staging` | Staging 向けビルド |
| `npm run build:production` | Production 向けビルド |
| `npm run preview` | ビルド成果物のプレビュー |
| `npm run lint` | ESLint 自動修正 |
| `npm run format` | Prettier 整形 |
| `npm run fix` | lint + format |

※ テストスクリプトは未定義。

## 環境変数

`.env.development` / `.env.staging` / `.env.production` で切替。

- `VITE_APP_API_BASE_URL`: バックエンド API のベース URL

## コーディング規約

- **ESLint**: Vue3 essential + Prettier 統合、TypeScript プロジェクト参照あり
- **Prettier**: printWidth 80, tabWidth 4, ダブルクォート, semicolons あり, trailing comma es5
- **TypeScript**: strict: true, target/module ESNext, isolatedModules

## CI/CD

GitHub Actions（`.github/workflows/frontend.yml`）で PR レビュー（pr-agent）・Lint・Build・S3 デプロイ・CloudFront キャッシュクリア・Slack 通知を実施。現在はトリガーがコメントアウト中（AWS 停止のため）。

- `main` → production、`develop` → staging へデプロイする構成。

## 関連リポジトリ

- [fanc-api](https://github.com/kudotaka0421/fanc-api) — バックエンド API
- [fanc-terraform](https://github.com/kudotaka0421/fanc-terraform) — AWS インフラ
