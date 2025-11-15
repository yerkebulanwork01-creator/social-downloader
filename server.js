import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Статикалық файлдарды беру
app.use(express.static(__dirname));

// / маршруты → index.html көрсету
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Видео жүктеу API
app.post("/download", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).send("No URL provided");

  try {
    // Мысал үшін TikTok видео URL
    const response = await fetch(url);
    if (!response.ok) return res.status(400).send("Video not found");

    const contentType = response.headers.get("content-type") || "video/mp4";
    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", "attachment; filename=video.mp4");

    response.body.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error while downloading video");
  }
});

// Серверді бастау
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
