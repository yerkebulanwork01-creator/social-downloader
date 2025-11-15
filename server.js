import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Статикалық файлдарды беру
app.use(express.static(__dirname));

// Егер / ашылса index.html көрсету
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// API endpoint (мысалы видео жүктеу)
app.post("/download", (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).send("No URL provided");
    res.send("Video download endpoint works!");
});

// Серверді бастау
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
