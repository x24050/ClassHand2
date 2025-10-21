// server.js (変更後)

import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import fs from "fs"; // ファイルシステムモジュールを追加
import path from "path"; // pathモジュールを追加

dotenv.config();

const app = express();
app.use(express.json());
// app.use(express.static("public")); // 削除！

// 授業ごとのWebhookマッピング
// ... (webhookMap の定義)

// ルートパス ( / ) へのアクセスで、index.html の内容を返す（もしあれば）
// もし、seatmap.html へのリンクが唯一のフロントエンドであれば、このルートは省略可能
/*
app.get("/", (req, res) => {
    // 例: プロジェクトルートに index.html がある場合
    res.sendFile(path.join(process.cwd(), "index.html"));
});
*/

// seatmap.html へのアクセスで、seatmap.html の内容を返す
app.get("/seatmap.html", (req, res) => {
    // プロジェクトルートに seatmap.html があることを想定
    const filePath = path.join(process.cwd(), "seatmap.html");

    // ファイルが存在するか確認
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send("File Not Found");
    }
});

// 挙手API
app.post("/api/raise-hand", async (req, res) => {
// ... (既存の /api/raise-hand のロジック)
});

app.listen(3000, "0.0.0.0", () =>
  console.log("Server running on http://localhost:3000")
);