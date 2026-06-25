import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    console.log("Incoming Request:");
    console.log(req.body);

    const response = await fetch(process.env.COGITX_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": process.env.COGITX_CLIENT_ID,
        "x-client-secret": process.env.COGITX_CLIENT_SECRET,
      },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();

    console.log("CogitX Response:");
    console.log(text);

    res.status(response.status);

    try {
      res.json(JSON.parse(text));
    } catch {
      res.send(text);
    }

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

app.listen(3001, () => {
  console.log("Proxy running on http://localhost:3001");
});