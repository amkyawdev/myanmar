export default async function handler(request: any, response: any) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, model } = request.body;
  const groqApiKey = process.env.GROQ_API_KEY;
  const defaultModel = 'llama-3.3-70b-versatile';

  // Add system message for proper Burmese greeting handling
  const systemMessage = {
    role: 'system',
    content: 'You are a helpful Myanmar AI Assistant. When user says "ဟိုင်း" (which is a Burmese greeting meaning "hi" or "hello"), respond with a friendly greeting like "ဟိုင်းပါ၊ နေကောင်းလား၊ ဘာများ ကူညီပေးရမလဲ။" or "ဟိုင်း! နေကောင်းလား။" Never confuse "ဟိုင်း" with Taiwan - it is a greeting in Burmese language.'
  };

  // Combine system message with user messages
  const allMessages = [systemMessage, ...messages];

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
