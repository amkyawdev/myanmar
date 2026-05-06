/**
 * ChatInterface Component
 * Main chat interface with real-time streaming responses
 * Design: Floating chat bubbles with smooth animations
 */

import { useState, useRef, useEffect, useCallback } from 'react';
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
  const messagesRef = useRef<Message[]>([]);

  // Keep ref in sync with state for use in fetch body
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    // Use ref for the fetch body to avoid stale closure
    const currentMessages = [...messagesRef.current, userMessage];

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsStreaming(true);

    const assistantId = (Date.now() + 1).toString();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: currentMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      // Add empty assistant message
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: 'assistant', content: '' },
      ]);

      // Use a single TextDecoder instance for proper multi-byte character handling
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');

        for (let i = 0; i < lines.length - 1; i++) {
          const line = lines[i];
          if (line.startsWith('data: ')) {
            const raw = line.slice(6).trim();
            if (raw === '[DONE]') continue;
            try {
              const data = JSON.parse(raw);
              const chunk = data.choices?.[0]?.delta?.content || '';
              if (chunk) {
                // IMMUTABLE update — create a new message object so React detects the change
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantId
                      ? { ...msg, content: msg.content + chunk }
                      : msg
                  )
                );
              }
            } catch {
              // Ignore parse errors for incomplete JSON
            }
          }
        }

        buffer = lines[lines.length - 1];
      }

      // Flush any remaining bytes from the decoder
      decoder.decode(new Uint8Array(), { stream: false });
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          role: 'assistant',
          content: '\u1006\u1031\u102c\u1004\u103a\\u1006\u1031\u102c\u1004\u103a\u1015\u102b\u104b \u1021\u1001\u102f\u1021\u1001\u103b\u102d\u1014\u103a\u1019\u103e\u102c \u1000\u103b\u103d\u1014\u103a\u102f\u1015\u103a\u1000\u102d\u102f \u1001\u103b\u102d\u1010\u103a\u1006\u1000\u103a\u1019\u101b\u1014\u102d\u102f\u1004\u103a\u1015\u102b\u104b',
        },
      ]);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  }, [input, isLoading]);

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
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
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
            onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
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
