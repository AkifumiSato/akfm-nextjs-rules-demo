# コードスタイル・規約

## Biome設定による強制スタイル

### JavaScript/TypeScript
- **文字列**: ダブルクォート (`"`) を使用
- **セミコロン**: 常に付ける (`semicolons: "always"`)
- **末尾カンマ**: 常に付ける (`trailingCommas: "all"`)
- **インデント**: 2スペース (`indentWidth: 2`)
- **インデントスタイル**: スペース (`indentStyle: "space"`)

### コード例
```typescript
// 正しい例
const data = {
  name: "example",
  value: 123,
};

export function example(): string {
  return "hello";
}
```

## プロジェクト固有の規約

### ファイル・ディレクトリ構造
- **Container/Presentationalパターン**: 
  - `_containers/` ディレクトリ内に実装
  - Container: `container.tsx` - ビジネスロジック・データ取得
  - Presentation: `presentation.tsx` - UI表示のみ
  - Types: `types.ts` - 型定義
  - Fetcher: `fetcher.ts` - データ取得ロジック
  - Index: `index.ts` - エクスポート用

### テスト規約
- **配置**: コンポーネントと同じディレクトリに配置
- **命名**: `{ファイル名}.test.tsx`
- **パターン**: AAAパターン（Arrange, Act, Assert）を`@akfm/test-utils`の`step()`で実装
- **例**: `app/posts/_containers/posts/presentation.test.tsx`

### 型定義
- TypeScript 5.3.3 使用
- 明示的な型定義を推奨
- Server Componentsには`server-only`制約を使用

## Biome除外設定
以下は Biome チェック対象外：
- `docs/akfm-knowledge/**` - ナレッジベース
- `public/**` - 静的ファイル
- `package.json` - パッケージ定義
- `.next/` - Next.js ビルド出力

## 設計原則
- **Server-First**: Server Componentsを優先
- **データ取得の配置**: データを使用するコンポーネント近くで実行
- **コンポジション**: 適切なコンポーネント分離とコンポジションパターン
- **プログレッシブ強化**: JavaScript無効時でも機能する設計