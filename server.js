import express from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();

// ✅ カレントディレクトリ（プロジェクトルート）を静的配信
const rootPath = process.cwd();
app.use(express.static(rootPath));

// ✅ index.html を返す
app.get("/", (req, res) => {
  res.sendFile(path.join(rootPath, "index.html"));
});

// ✅ seatmap.html も直接返す
app.get("/seatmap.html", (req, res) => {
  res.sendFile(path.join(rootPath, "seatmap.html"));
});

// ✅ APIエンドポイント（仮）
app.post("/api/raise-hand", (req, res) => {
  res.json({ message: "挙手を受け付けました" });
});

// ✅ Vercelデプロイ用エクスポート
