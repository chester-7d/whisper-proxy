const express = require("express");
const multer = require("multer");
const cors = require("cors");
const OpenAI = require("openai");
const fs = require("fs");
const path = require("path");

const app = express();
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const upload = multer({ dest: uploadDir });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(cors());

app.get("/", (req, res) => res.send("Whisper proxy running."));

app.post("/transcribe", upload.single("audio"), async (req, res) => {
  try {
    const oldPath = req.file.path;
    const mimeType = req.file.mimetype || "";
    const ext = mimeType.includes("ogg") ? ".ogg"
              : mimeType.includes("mp4") ? ".mp4"
              : mimeType.includes("mpeg") ? ".mp3"
              : ".webm";
    const newPath = oldPath + ext;
    fs.renameSync(oldPath, newPath);

    console.log("Received file:", req.file.originalname, "mime:", mimeType, "ext used:", ext);

    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(newPath),
      model: "whisper-1",
      language: "en"
    });

    fs.unlinkSync(newPath);
    res.json({ text: transcription.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Whisper proxy running on port " + PORT));
```
