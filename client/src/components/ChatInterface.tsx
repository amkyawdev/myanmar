/**
 * ChatInterface Component
 * Main chat interface with real-time streaming responses
 * Design: Floating chat bubbles with smooth animations
 */

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { SendButton } from './SendButton';
import { StatusAnimation } from './StatusAnimation';
import { ThreeDots } from './ThreeDots';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsStreaming(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
      };

      setMessages((prev) => [...prev, assistantMessage]);

      let buffer = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += new TextDecoder().decode(value);
        const lines = buffer.split('\n');

        for (let i = 0; i < lines.length - 1; i++) {
          const line = lines[i];
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              const chunk = data.choices?.[0]?.delta?.content || '';
              if (chunk) {
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1].content += chunk;
                  return updated;
                });
              }
            } catch {
              // Ignore parse errors
            }
          }
        }

        buffer = lines[lines.length - 1];
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          role: 'assistant',
          content: 'ဆောင်ဆောင်ပါ။ အခုအချိန်မှာ ကျွန်ုပ်ကို ချိတ်ဆက်မရနိုင်ပါ။',
        },
      ]);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  const userBgClass = 'bg-primary text-primary-foreground rounded-3xl rounded-tr-sm';
  const assistantBgClass = 'bg-card text-card-foreground rounded-3xl rounded-tl-sm border border-border';

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                မြန်မာ AI အကူအညီ
              </h2>
              <p className="text-muted-foreground">
                သင်၏မေးခွန်းများကိုမေးမြန်းပါ။ ကျွန်ုပ်သည် ကူညီရန်အဆင်သင့်ဖြစ်ပါသည်။
              </p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}
            >
              <Card
                className={`max-w-xs lg:max-w-md px-4 py-3 ${
                  message.role === 'user' ? userBgClass : assistantBgClass
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </Card>
            </div>
          ))
        )}
        {isStreaming && (
          <div className="flex justify-start animate-in fade-in">
            <Card className={`px-4 py-3 ${assistantBgClass}`}>
              <ThreeDots />
            </Card>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Status Animation */}
      {isStreaming && <StatusAnimation isActive={true} />}

      {/* Input Area */}
      <div className="border-t border-border p-4 bg-background">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
            placeholder="သင်၏မေးခွန်းကိုရေးပါ..."
            disabled={isLoading}
            className="flex-1 rounded-full border-border focus:ring-primary"
          />
          <SendButton isLoading={isLoading} onClick={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;
