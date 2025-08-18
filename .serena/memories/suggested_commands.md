# 推奨コマンド

## 開発コマンド

### コア開発コマンド
- `pnpm dev` - Turbopack付きの開発サーバーを起動
- `pnpm build` - 本番用ビルド作成
- `pnpm start` - 本番サーバーを起動

### テスト関連
- `pnpm test` - Vitest（インタラクティブモード）
- `pnpm test:run` - Vitestでテストを一度だけ実行
  - テスト環境: jsdom
  - セットアップファイル: vitest.setup.ts

### コード品質チェック
- `pnpm check` - Biome チェック（エラー表示）
- `pnpm check:fix` - Biome チェック + 自動修正
- `pnpm typecheck` - TypeScript型チェック（tsgoコマンド）

### 必須実行コマンド（タスク完了後）
タスク完了時は必ず以下を実行：
1. `pnpm check:fix` - Biome自動修正
2. `pnpm typecheck` - 型チェック
3. `pnpm test:run` - テスト実行

## システム固有コマンド（Darwin/macOS）

### ファイル操作
- `ls` - ディレクトリ内容表示
- `find` - ファイル検索
- `grep` - テキスト検索
- `cd` - ディレクトリ移動

### Git操作
- `git status` - 変更状況確認
- `git add` - ステージング
- `git commit` - コミット
- `git diff` - 差分確認

### その他
- `cat` - ファイル内容表示
- `head/tail` - ファイル一部表示
- `which` - コマンド場所確認