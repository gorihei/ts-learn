# TypeScript環境構築

1. nodeのインストール
   1. voltaを使用
      1. `volta install node` バージョンを指定しない場合は最新のLTSがインストールされる
2. プロジェクトディレクトリ作成
   1. package.jsonの作成
      1. `npm init --yes`
   2. `"type": "module"`の追記
3. TypeScriptのインストール
   1. `npm install --save-dev typescript @types/node`
      1. typescriptと@types/nodeをインストール
         1. @types/node はJavaScriptライブラリの型定義ライブラリ。TypeScriptで型情報を保管できるようにするためのもの。
         2. 参考[「@types/」から始まる名前のパッケージとは](https://qiita.com/pepo/items/81e2b71b624633ba272e)
         3. `--save-dev`はライブラリローカル(対象のプロジェクト)にインストールするオプション。`-g`指定でグローバルにインストールされる。`--save-dev`と`-g`のどちらも指定しなかった場合はローカルインストールになる。
4. tsconfig.jsonの作成
   1. `npx tsc --init`
   2. TypeScriptCompilerの初期化コマンド。tsconfig.jsonのテンプレートを作成してくれる。
   3. ズラズラとコンパイルオプションが定義されており、適用したいオプションをコメントアウトを解除して有効化する。
      1. `"target"`に`"es2020"`を指定(トランスパイルするバージョンを指定)
      2. `"module"`に`"esnext"`を指定(モジュールに関連する構文をどう取り扱うかを決めるオプション。別に変更しなくても問題ない。)
      3. `"moduleResolution"`に`"node"`を指定(npmでインストールしたモジュールをTypeScriptが認識できるようにする)
      4. `"outDir"`に`"{任意のパス}"`を指定(TSCでコンパイルされたJSファイルの出力パス)
      5. `"compilerOptions"`とは別セクションに`"include"`セクションを追加し、`["./src/**\*.ts"]`を追加(コンパイル対象のファイルの読込み設定。src/以下の\*.tsファイル全てをコンパイル対象に設定)
5. ESLintとPrettirのインストール
   1. `"npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-prettier prettier"`
      1. `.eslintrc.json`と`.prettierrc.json`を作成して設定を記述。
