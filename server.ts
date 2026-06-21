import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialization utility for Gemini API to ensure no crash on startup if key is missing
let aiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required. Configure this via the Secrets panel in the AI Studio UI.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// ══════════ API ROUTES ══════════

// Gemini Chat Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history, partnerName } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGemini();

    const partner = partnerName || "Veltrixa AI Assistant";
    const systemInstruction = 
      `You are ${partner}, a helpful and friendly contact on the Veltrixa social platform. ` +
      `Speak naturally, match your specified identity and vibe, keep responses chat-like and concise, ` +
      `and use appropriate emojis from time to time. Do not expose that you are an AI assistant unless the user asks or if your partner identity is specifically an AI contact (e.g., Code Assistant AI).`;

    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction,
      }
    });

    // Populate history
    if (history && Array.isArray(history)) {
      let promptContext = "";
      for (const turn of history) {
        if (turn.sender === "user") {
          promptContext += `User: ${turn.text}\n`;
        } else {
          promptContext += `${partner}: ${turn.text}\n`;
        }
      }
      promptContext += `User: ${message}\n${partner}:`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: promptContext,
        config: {
          systemInstruction,
        }
      });

      return res.json({ reply: response.text, text: response.text });
    } else {
      const response = await chat.sendMessage({ message });
      return res.json({ reply: response.text, text: response.text });
    }
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({ error: error.message || "Failed to process chat" });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// ══════════ VITE MIDDLEWARE SETUP ══════════
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite in development mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving static files in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Veltrixa Server] Running on http://0.0.0.0:${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
