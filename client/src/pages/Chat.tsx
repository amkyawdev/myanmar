/**
 * Chat Page
 * Design: Floating chat interface with animations and real-time streaming
 */

import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ChatInterface } from '@/components/ChatInterface';
import { ArrowLeft, Home } from 'lucide-react';

export default function Chat() {
  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/">
              <a>
                <Button variant="ghost" size="icon">
                  <Home className="w-5 h-5" />
                </Button>
              </a>
            </Link>
            <h1 className="text-xl font-semibold text-foreground">
              မြန်မာ AI အကူအညီ
            </h1>
          </div>
          <div className="text-sm text-muted-foreground">
            Powered by Myanmar Ai
          </div>
        </div>
      </header>

      {/* Chat Interface */}
      <div className="flex-1 overflow-hidden">
        <ChatInterface />
      </div>
    </div>
  );
}
