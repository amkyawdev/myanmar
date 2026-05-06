/**
 * SendButton Component
 * Send button with loading state and spinner animation
 * Design: Smooth transitions with visual feedback
 */

import { Button } from '@/components/ui/button';
import { Send, Loader2 } from 'lucide-react';

interface SendButtonProps {
  isLoading: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export function SendButton({ isLoading, disabled = false, onClick }: SendButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || isLoading}
      className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200"
      size="icon"
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Send className="w-4 h-4" />
      )}
    </Button>
  );
}

export default SendButton;
