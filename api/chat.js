const { GoogleGenerativeAI } = require('@google/generative-ai');

// gemini-1.5-flash was retired by Google; try current models in order
const MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash'];

const SYSTEM_INSTRUCTION =
  "You are a helpful assistant answering questions about Rafik Manla Hassan based on his resume. Be concise, warm, and professional. Refer to Rafik in the third person. Only use the provided resume context. If something isn't covered, say so honestly.";

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured' });
  }

  // Vercel usually auto-parses JSON body; handle edge case where it's a string
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }

  const { question, context } = body || {};
  if (!question || !context) {
    return res.status(400).json({ error: 'Missing question or context' });
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const prompt = `Resume context:\n${context}\n\nQuestion: ${question}`;

  let lastError;
  for (const modelName of MODELS) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: SYSTEM_INSTRUCTION,
      });
      const result = await model.generateContent(prompt);
      return res.status(200).json({ answer: result.response.text() });
    } catch (err) {
      lastError = err;
      console.error(`Gemini error (${modelName}):`, err.message);
    }
  }

  return res.status(500).json({ error: lastError?.message || 'Generation failed' });
};
