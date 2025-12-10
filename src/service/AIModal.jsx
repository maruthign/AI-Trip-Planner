// src/service/AIModal.jsx
import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * WARNING: Using API key in client code exposes it to users.
 * Move this call to a server endpoint for production.
 */

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
if (!apiKey) {
  console.warn("VITE_GOOGLE_GEMINI_AI_API_KEY is not set in environment");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

// default generation config — tweak as needed
const defaultGenerationConfig = {
  temperature: 0.9,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  // responseMimeType usually not needed for REST/SDK responses; keep JSON in prompt instruct
};

/**
 * generateFromPrompt(prompt)
 * - sends a single prompt to Gemini 2.5 Flash (generateContent)
 * - returns the cleaned textual output (string) and raw response
 */
export async function generateFromPrompt(prompt) {
  try {
    const contents = [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ];

    // Use SDK generateContent method (returns a response stream or object depending on SDK version)
    const res = await model.generateContent({
      contents,
      generationConfig: defaultGenerationConfig,
    });

    // The SDK's returned shape may vary. Try common shapes and extract text.
    let outText = "";

    // 1) res?.response?.text() (SDK chat-style)
    try {
      if (res?.response && typeof res.response.text === "function") {
        outText = res.response.text();
      }
    } catch (e) {
      // ignore
    }

    // 2) res?.candidates (some SDK shapes)
    if (!outText && Array.isArray(res?.candidates) && res.candidates.length) {
      outText = res.candidates.map((c) => c?.content || c?.text || "").join("\n");
    }

    // 3) res?.output or res?.outputs
    if (!outText && Array.isArray(res?.output) && res.output.length) {
      outText = res.output
        .map((o) => {
          if (typeof o === "string") return o;
          if (Array.isArray(o?.content)) return o.content.map((p) => p?.text || "").join("");
          return o?.text || o?.content || "";
        })
        .join("\n");
    }

    // 4) fallback: JSON stringify
    if (!outText) {
      outText = JSON.stringify(res);
    }

    return { text: outText, raw: res };
  } catch (err) {
    console.error("generateFromPrompt error:", err);
    throw err;
  }
}