/**
 * ThreeDots Animation Component
 * Displays animated three dots for thinking/loading states
 * Design: Gentle, organic animation reflecting AI intelligence
 */

export function ThreeDots() {
  return (
    <div className="flex items-center gap-1">
      <span className="inline-block w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
      <span className="inline-block w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
      <span className="inline-block w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
    </div>
  );
}

export default ThreeDots;
