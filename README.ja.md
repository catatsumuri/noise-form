# NOISE / FORM

[English](README.md) | 日本語

Laravel・Inertia・React・TypeScript・Tailwind CSSで構築したスタジオサイトです。`welcome.tsx` を中心にデザインを変更し、記事管理と問い合わせ受付をLaravelが担当します。同じ公開ページを、PHP不要のv0向けプレビューでも表示します。

## 主な変更箇所

| 対象                                                         | ファイル                                         |
| ------------------------------------------------------------ | ------------------------------------------------ |
| トップ：ヒーロー、実績、サービス、紹介、問い合わせ、記事一覧 | `resources/js/pages/welcome.tsx`                 |
| 記事詳細のレイアウト                                         | `resources/js/pages/updates/show.tsx`            |
| 共通の記事propsの型                                          | `resources/js/types/update.ts`                   |
| プレビュー用の架空の記事                                     | `mock/updates.ts`                                |
| 記事・問い合わせのバックエンド                               | `app/Http/Controllers/`、`app/Models/Update.php` |

実績・サービスなどトップページの文言は `welcome.tsx` に直接記述しています。Laravelの記事はDBから取得します。プレビュー用データを変更してもDBには反映されません。

## Laravelで開発する

PHP 8.3以上、Composer、Node 22（CIの使用バージョン）を使用します。ローカルDBの標準設定はSQLiteです。

```bash
git clone https://github.com/catatsumuri/noise-form.git
cd noise-form
composer setup
composer dev
```

`composer setup` はPHP・npmの依存関係をインストールし、未作成なら `.env` を作成、アプリキーを生成して、マイグレーションとLaravel用ビルドを実行します。別のDBを使う場合は先に `.env` を設定してください。`composer dev` はViteを含むLaravelの開発プロセスを起動します。

個別に起動する場合は、別々のターミナルで `php artisan serve` と `npm run dev` を実行します。アプリはLaravelのHTTPサーバーで開きます。Viteはフロントエンドのアセットを配信します。

ローカルで記事サンプルを追加する場合:

```bash
php artisan db:seed --class=UpdateSeeder
```

同じslugの記事が既にあれば、その内容を維持します。このシーダーが作成する著者レコードは、管理者ログイン用のアカウントではありません。

## v0・PHP不要のプレビュー

公開ページのプレビューにはPHPもDBも不要です。

```bash
npm install
npm run dev:preview
```

Viteが表示するURLを開きます。`/` がトップページ、`/updates/{slug}` が `mock/updates.ts` の記事詳細です。

| 用途         | 開発                  | ビルド                  | 設定                                        |
| ------------ | --------------------- | ----------------------- | ------------------------------------------- |
| Laravel      | `npm run dev`         | `npm run build`         | `vite.config.ts` → `vite.laravel.config.ts` |
| v0プレビュー | `npm run dev:preview` | `npm run build:preview` | `vite.preview.config.ts`                    |

v0側のプレビュー環境では、開発コマンドに `npm run dev:preview`、プレビュービルドに `npm run build:preview` を指定します。`npm run dev` はLaravel用アセットサーバーです。外部のv0プロジェクトで実際に選択されている起動設定は未確認です。

`mock/main.tsx` が本番と同じ公開ページを直接読み込みます。プレビュー設定がInertiaを小さな代替実装に差し替え、サンプルのpropsを渡します。リンクは通常のブラウザ遷移を使います。問い合わせ送信はプレビュー用の案内を表示し、保存しません。認証・管理画面はプレビュー対象外です。

画面の実装は共通に保ち、実際のページコンポーネントを編集してください。別のモック画面やNext.jsアプリは作りません。propsやInertia APIを追加するときは、プレビューのデータ・代替実装も合わせて更新します。[プレビューの説明](mock/README.md)と[運用ルール](.ai/rules/inertia-v0-workflow.md)も参照してください。

## ブランチ運用

1. デザイン・プレビューの変更は `v0/design` で行い、そこでコミットします。
2. 変更に関係するプレビューとLaravelの動作を確認します。
3. Laravel側の変更を維持しながら、`v0/design` を `main` にマージします。
4. 変更を公開するときは両ブランチをpushします。

`main` がLaravelの統合ブランチです。プレビュー関連ファイルは両ブランチで保持し、標準のVite設定はLaravel用のまま維持します。v0が別ブランチを作成した場合は、UI変更を確認して先に `v0/design` へ取り込みます。

## バックエンド

| ルート             | 役割                                               |
| ------------------ | -------------------------------------------------- |
| `/`                | `HomeController` が公開済み記事を渡すトップページ  |
| `/updates/{slug}`  | 公開済み記事の詳細                                 |
| `POST /inquiries`  | 問い合わせの検証・保存。1分あたり5リクエストに制限 |
| `/admin/updates`   | 記事の作成・閲覧・編集・削除                       |
| `/admin/inquiries` | 受信した問い合わせの一覧                           |

記事は下書き（`published_at` が空）、予約公開、公開済みに対応しています。公開ページでは公開日時を迎えた記事だけを返します。本文は段落の配列として保存します。画像パスの表示には対応していますが、記事編集画面に画像アップロード機能はありません。

管理ルートのアクセス条件は現在、ログインとメール確認です。管理者ロールによる追加の制限はありません。スターターキット由来の認証・アカウント設定画面も残しています。問い合わせはDBに保存し、現在のコントローラーから通知メールは送信しません。

## チェック

```bash
npm run check          # 整形・Lintの検査
npm run check:fix      # 整形・Lintの自動修正
npm run types:check    # TypeScript
composer lint:check   # PHPの整形検査
composer types:check  # PHPStan
composer test         # PHPの整形検査・PHPStan・PHPUnit
composer ci:check     # フロントエンドの検査後、composer test
```

Laravel Sail環境が起動している場合は、`./vendor/bin/sail composer ci:check` のようにコマンドの前に `./vendor/bin/sail` を付けます。

CIは `main` へのpushとpull requestで `composer setup`、`composer ci:check` を実行します。公開ページやプレビューの代替実装を変更したら、別途 `npm run build:preview` も実行してください。プレビュー出力の `dist/` はGit・整形・Lintの対象外です。

## 引き継いでいる多言語対応

Laravel + React Starter Kit — i18n Editionをベースにしています。認証・設定画面には英語・日本語の翻訳機能を引き継いでいます。公開ページの文言は現在、ページコンポーネントに直接記述しています。

ソース文言を `lang/vendor-patches/source/react.json`、対応する翻訳を `lang/vendor-patches/locales/{locale}.json` に追加し、次のコマンドで再生成します。

```bash
composer patch-vendor
php artisan lang:update
```

生成された `lang/` の出力はGit管理対象外です。[翻訳ルール](.ai/rules/lang.md)と[スターターキット翻訳のパッチ](.ai/rules/starter-kits.md)も参照してください。

## ライセンス

MIT
