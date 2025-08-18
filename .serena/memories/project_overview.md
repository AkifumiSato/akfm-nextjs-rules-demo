# プロジェクト概要

## プロジェクトの目的
「Next.jsの考え方」をAgentルール（Claude）に適用するデモプロジェクト。
[Next.jsの考え方](https://zenn.dev/akfm/books/nextjs-basic-principle)をAgent（Claude）のルール経由で実装時に参照させることで、Agentにakfmの思想を反映することを目指したプロジェクト。

## 技術スタック
- **フレームワーク**: Next.js (最新版) with App Router
- **スタイリング**: Tailwind CSS v4
- **テスト**: Vitest + React Testing Library (jsdom環境)
- **リンティング・フォーマット**: Biome
- **パッケージマネージャー**: pnpm
- **TypeScript**: 5.3.3
- **特殊ライブラリ**: 
  - `dataloader` (2.2.3) - データ取得最適化
  - `server-only` (0.0.1) - Server Components制約
  - `@akfm/test-utils` (0.1.1) - テストユーティリティ

## プロジェクト構造
```
.
├── app/                  # Next.js App Routerページとコンポーネント
│   ├── posts/           # 投稿一覧・詳細機能
│   │   ├── _containers/ # Container/Presentationalパターン
│   │   └── [id]/        # 動的ルート（投稿詳細）
│   ├── lib/             # 共通ライブラリ
│   ├── layout.tsx       # ルートレイアウト
│   └── page.tsx         # ホームページ
├── docs/akfm-knowledge/ # ドキュメント・ナレッジベース（Biome対象外）
│   ├── articles/        # 単体記事
│   └── nextjs-basic-principle/ # Next.js基本原理ガイド
├── CLAUDE.md           # Claude Code用プロジェクト指針
└── 各種設定ファイル
```

## 主要機能
- 投稿一覧・詳細ページ
- Container/Presentationalパターン実装
- Server-onlyコンポーネントサポート
- DataLoaderパターンによるデータ取得最適化
- 日本語サポート（layout.tsx でlang="ja"）

## システム情報
- **OS**: Darwin (macOS)
- **パッケージマネージャー**: pnpm
- **Git**: 利用中（main ブランチ）