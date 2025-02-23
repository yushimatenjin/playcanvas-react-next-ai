# PlayCanvas React Next.js デモ

このプロジェクトは、PlayCanvasとReact、Next.jsを組み合わせた3Dウェブアプリケーションのデモンストレーションです。最新のウェブ技術を活用して、インタラクティブな3D体験を提供します。

## 🌟 主な機能

- **glb-viewer**: 3DモデルをGLB形式で表示
- **motion**: フレーマーモーションを使用したアニメーション制御
- **physics**: PlayCanvasの物理エンジンを活用
- **splat-viewer**: 点群データの表示

## 🛠 技術スタック

- [Next.js](https://nextjs.org/) (v15.0.3)
- [React](https://reactjs.org/) (v18.3.1)
- [PlayCanvas React](https://github.com/playcanvas/react)
- [Motion](https://motion.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🚀 始め方

1. リポジトリをクローン:
```bash
git clone git@github.com:yushimatenjin/playcanvas-react-next-ai.git
cd playcanvas-react-next-ai
```

2. 依存関係のインストール:
```bash
bun install
```

3. 開発サーバーの起動:
```bash
bun run dev
```

4. ブラウザで [http://localhost:3000](http://localhost:3000) を開く

## 📦 プロジェクト構造

```
app/
├── glb-viewer/     # GLBモデルビューワー
├── motion/         # モーション制御機能
├── physics/        # 物理シミュレーション
└── splat-viewer/   # Gaussian Splatビューワー
```

## 🧪 スクリプト

- `bun run dev`: 開発サーバーの起動
- `bun run build`: プロダクションビルドの作成
- `bun run start`: プロダクションサーバーの起動
- `bun run lint`: リントチェックの実行
- `bun run format`: コードフォーマットの実行
- `bun run check-types`: 型チェックの実行


*このREADMEはAIによって作成されました。*
