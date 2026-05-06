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

  try {
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model || defaultModel,
        messages: messages,
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
