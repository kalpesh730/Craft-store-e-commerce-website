// api/gemini.js - Vercel Serverless Function (Node.js)

// IMPORTANT: This key is only visible to the Vercel server, not the client!
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; 

// Helper to call the Gemini API
async function callGemini(prompt, systemInstruction, jsonMode) {
    // ... (The robust fetch logic from your existing callGemini function goes here) ...
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${GEMINI_API_KEY}`;

    // ... build payload, handle fetch, and return response ...
}

// Default Vercel Function handler
module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    try {
        const { prompt, systemInstruction, jsonMode } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const geminiResponse = await callGemini(prompt, systemInstruction, jsonMode);

        // Return the result back to your frontend
        res.status(200).json(JSON.parse(geminiResponse));

    } catch (error) {
        console.error("API Error:", error);
        // This prevents FUNCTION_INVOCATION_FAILED (500) from crashing without a response
        res.status(500).json({ error: 'Internal AI service error' });
    }
};
