import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/download", async (req, res) => {
  const { url } = req.body;
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();

    res.setHeader("Content-Type", "video/mp4");
    res.setHeader("Content-Disposition", "attachment; filename=video.mp4");
    res.send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).json({ error: "Download failed" });
  }
});

app.listen(10000, () => console.log("Server running on port 10000"));
