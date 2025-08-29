# Recipe Memo

## 概要

- レシピのメモを作成できる Web アプリケーション
- 作成したレシピの一覧表示、5 件ごとのページング、レシピ詳細表示、レシピ編集が可能

## URL

https://d5wxd97ayruzz.cloudfront.net/

## 技術スタック

- React 19.1.0
  - UI 構築ライブラリ
- TypeScript 5.8.3
  - JavaScript を拡張した静的型付け言語
- Vite 7.0.0
  - フロントエンドのビルドツール
- S3
  - Simple Storage Serice
  - ビルドしたフロントエンド資材のデプロイ先
- CloudFront
  - コンテンツ配信サービス

## クローン後の利用コマンド例

- 依存パッケージインストール
  - `npm install`
- 動作確認(localhost)
  - `npm run dev`
- ビルド
  - `npm run build`
