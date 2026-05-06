/**
 * StatusAnimation Component
 * Displays real-time status updates during API streaming
 * Design: Smooth text transitions reflecting actual API processing steps
 */

import { useEffect, useState } from 'react';

interface StatusAnimationProps {
  isActive: boolean;
}

const statuses = [
  'တွေးနေသည်...',        // Thinking
  'ရှာနေသည်...',          // Searching
  'ဖန်တီးနေသည်...',      // Creating
  'ဘာသာပြန်နေသည်...',    // Translating
  'ရေးသားနေသည်...',      // Writing
];

export function StatusAnimation({ isActive }: StatusAnimationProps) {
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statuses.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <div className="inline-flex items-center gap-1">
        <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
      </div>
      <span className="transition-all duration-300">
        {statuses[statusIndex]}
      </span>
    </div>
  );
}

export default StatusAnimation;
