const HF_DATASET = 'amkyawdev/kyaw-mm-v1-dataset';
const HF_API_BASE = 'https://datasets-server.huggingface.co';
const DATASET_TOTAL_ROWS = 1060000; // approximate train split size

/**
 * Fetch relevant Myanmar text passages from the HuggingFace dataset.
 * Strategy:
 *   1. Try full-text search if the index is ready
 *   2. Fall back to random sampling from the dataset
 */
async function fetchDatasetContext(userQuery: string, count = 5): Promise<string[]> {
  const passages: string[] = [];

  try {
    // Strategy 1: Try HuggingFace search API (best quality)
    const searchUrl = `${HF_API_BASE}/search?dataset=${HF_DATASET}&config=default&split=train&query=${encodeURIComponent(userQuery)}&length=${count}`;
    const searchResp = await fetch(searchUrl, { signal: AbortSignal.timeout(4000) });

    if (searchResp.ok) {
      const data = await searchResp.json();
      for (const row of data.rows || []) {
        const msgs = row?.row?.messages;
        if (Array.isArray(msgs) && msgs.length >= 3 && msgs[2]?.content) {
          passages.push(msgs[2].content);
        }
      }
    }
  } catch {
    // Search not available — fall through to sampling
  }

  // Strategy 2: Random sampling (reliable fallback)
  if (passages.length < 2) {
    try {
      const offset = Math.floor(Math.random() * (DATASET_TOTAL_ROWS - count));
      const rowsUrl = `${HF_API_BASE}/rows?dataset=${HF_DATASET}&config=default&split=train&offset=${offset}&length=${count}`;
      const rowsResp = await fetch(rowsUrl, { signal: AbortSignal.timeout(5000) });

      if (rowsResp.ok) {
        const data = await rowsResp.json();
        for (const row of data.rows || []) {
          const msgs = row?.row?.messages;
          if (Array.isArray(msgs) && msgs.length >= 3 && msgs[2]?.content) {
            passages.push(msgs[2].content);
          }
        }
      }
    } catch {
      // Dataset unreachable — will proceed without context
    }
  }

  return passages;
}

export default async function handler(request: any, response: any) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, model } = request.body;
  const groqApiKey = process.env.GROQ_API_KEY;
  const defaultModel = 'llama-3.3-70b-versatile';

  if (!groqApiKey) {
    return response.status(500).json({ error: 'GROQ_API_KEY not configured' });
  }

  // Extract the latest user message for context search
  const lastUserMsg = [...messages].reverse().find((m: any) => m.role === 'user');
  const userQuery = lastUserMsg?.content || '';

  // Fetch relevant passages from the dataset
  const passages = await fetchDatasetContext(userQuery);

  // Build the system message with dataset context
  let systemContent = 'You are a helpful Myanmar AI Assistant. When user says "\u101f\u102d\u102f\u1004\u103a\u1038" (which is a Burmese greeting meaning "hi" or "hello"), respond with a friendly greeting like "\u101f\u102d\u102f\u1004\u103a\u1038\u1015\u102b\u104a \u1014\u1031\u1000\u1031\u102c\u1004\u103a\u1038\u101c\u102c\u1038\u104a \u1018\u102c\u1019\u103b\u102c\u1038 \u1000\u1030\u100a\u102e\u1015\u1031\u1038\u101b\u1019\u101c\u1032\u104b" or "\u101f\u102d\u102f\u1004\u103a\u1038! \u1014\u1031\u1000\u1031\u102c\u1004\u103a\u1038\u101c\u102c\u1038\u104b" Never confuse "\u101f\u102d\u102f\u1004\u103a\u1038" with Taiwan - it is a greeting in Burmese language. Always respond in Myanmar (Burmese) language.';

  if (passages.length > 0) {
    const contextBlock = passages
      .map((p, i) => `[${i + 1}] ${p}`)
      .join('\n');
    systemContent += `\n\nYou have access to a Myanmar knowledge base. Use the following reference passages to inform your responses when relevant. Do not copy them word for word — use them as context to give accurate, natural answers in Myanmar:\n\n${contextBlock}`;
  }

  const systemMessage = { role: 'system', content: systemContent };
  const allMessages = [systemMessage, ...messages];

  try {
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model || defaultModel,
        messages: allMessages,
        stream: true,
      }),
    });

    response.setHeader('Content-Type', 'text/event-stream');
    response.setHeader('Cache-Control', 'no-cache');
    response.setHeader('Connection', 'keep-alive');

    if (!groqResponse.body) {
      throw new Error('No response body from Groq');
    }

    const reader = groqResponse.body.getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      response.write(value);
    }

    response.end();
  } catch (error) {
    console.error('Groq API error:', error);
    response.status(500).json({ error: 'Failed to get response from AI' });
  }
}
