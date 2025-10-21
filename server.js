// server.js（index.htmlがルートにある場合）

import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json());

// ✅ 静的ファイルをプロジェクト直下から配信（例: CSSやJS）
app.use(express.static(process.cwd()));

// ✅ トップページ（/）で index.html を返す
app.get("/", (req, res) => {
  const filePath = path.join(process.cwd(), "index.html");
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send("index.html not found");
  }
});

// ✅ seatmap.html も返す
app.get("/seatmap.html", (req, res) => {
  const filePath = path.join(process.cwd(), "seatmap.html");
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send("seatmap.html not found");
  }
});

// ✅ 挙手APIの例
app.post("/api/raise-hand", async (req, res) => {
  try {
    const { studentId, question } = req.body;
    if (!studentId) {
      return res.status(400).json({ error: "studentId is required" });
    }

    console.log(`🔔 挙手: ${studentId} (${question || "質問なし"})`);
    res.json({ message: "挙手を受け付けました" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Vercelではlisten()しない
export default app;
