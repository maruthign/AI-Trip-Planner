import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '.env');

// Simple .env parser since we can't assume dotenv is installed
let apiKey = '';
try {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const lines = envContent.split('\n');
    for (const line of lines) {
        if (line.startsWith('VITE_GOOGLE_GEMINI_AI_API_KEY=')) {
            apiKey = line.split('=')[1].trim();
            break;
        }
    }
} catch (e) {
    console.log("Could not read .env file:", e.message);
}

if (!apiKey) {
    console.error("API Key not found in .env");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

const modelsToTest = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-001",
    "gemini-1.5-pro",
    "gemini-pro",
    "gemini-2.5-flash" // Testing user's claim
];

async function testModels() {
    console.log("Testing available models with provided API key...");

    for (const modelName of modelsToTest) {
        try {
            console.log(`\nTesting ${modelName}...`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hello, are you there?");
            const response = await result.response;
            console.log(`✅ SUCCESS: ${modelName} responded.`);
        } catch (error) {
            let msg = error.message;
            if (msg.includes('404')) msg = '404 Not Found';
            if (msg.includes('503')) msg = '503 Service Unavailable';
            console.log(`❌ FAILED: ${modelName} - ${msg}`);
        }
    }
}

testModels();
