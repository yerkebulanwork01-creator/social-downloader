import express from "express";
import cors from "cors";
import ytdl from "ytdl-core";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// / → index.html көрсету
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// YouTube видео жүктеу
app.post("/download", async (req, res) => {
  const { url } = req.body;
  if (!url || !ytdl.validateURL(url)) return res.status(400).send("Invalid YouTube URL");

  try {
    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title.replace(/[^a-zA-Z0-9 ]/g, "");
    res.setHeader("Content-Disposition", `attachment; filename="${title}.mp4"`);
    res.setHeader("Content-Type", "video/mp4");

    ytdl(url, { format: "mp4" }).pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error downloading YouTube video");
  }
});

// Серверді бастау
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
