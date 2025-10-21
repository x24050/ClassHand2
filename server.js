// server.js (Vercel対応版)

import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json());

// ✅ publicフォルダを静的ファイルとして提供
app.use(express.static("public"));

// ✅ トップページ（/）で index.html を返す
app.get("/", (req, res) => {
  const filePath = path.join(process.cwd(), "public", "index.html");
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send("index.html not found");
  }
});

// ✅ seatmap.html も提供
app.get("/seatmap.html", (req, res) => {
  const filePath = path.join(process.cwd(), "public", "seatmap.html");
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send("seatmap.html not found");
  }
});

// ✅ 挙手API（例）
app.post("/api/raise-hand", async (req, res) => {
  try {
    const { studentId, question } = req.body;
    if (!studentId) {
      return res.status(400).json({ error: "studentId is required" });
    }

    console.log(`🔔 挙手: ${studentId} (${question || "質問なし"})`);

    // 必要であればWebhook通知をここに追加
    // await fetch(webhookURL, { ... })

    res.json({ message: "挙手を受け付けました" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Vercelでは listen() は不要
// app.listen(3000, "0.0.0.0", () => console.log("Server running on http://localhost:3000"));

// ✅ Vercelで必要なexport
export default app;
