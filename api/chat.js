const { GoogleGenerativeAI } = require('@google/generative-ai');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { question, context } = req.body || {};
  if (!question || !context) return res.status(400).json({ error: 'Missing question or context' });

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: 'You are a helpful assistant answering questions about Rafik Manla Hassan based on his resume. Be concise, warm, and professional. Refer to Rafik in the third person. Only use the provided resume context — if something is not covered, say so honestly rather than guessing.',
    });

    const result = await model.generateContent(
      `Resume context:\n${context}\n\nQuestion: ${question}`
    );

    return res.status(200).json({ answer: result.response.text() });
  } catch (err) {
    console.error('Gemini API error:', err.message);
    return res.status(500).json({ error: 'Failed to generate response' });
  }
};
