"use client";

import { BookOpenIcon, FeatherIcon } from "@phosphor-icons/react";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg px-4">
      <div className="relative flex flex-col items-center">
        {/* Glow ring pulsing behind the icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-primary/10 animate-ping" />
        </div>

        {/* Book icon with page-flip animation */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-wood bg-surface flex items-center justify-center shadow-glow">
          <BookOpenIcon size={36} className="text-primary animate-[flip_1.8s_ease-in-out_infinite]" />
        </div>

        {/* Feather accent, drifting */}
        <FeatherIcon
          size={20}
          className="absolute -top-2 -right-3 text-dim animate-[drift_2.4s_ease-in-out_infinite]"
        />

        {/* Text */}
        <p className="mt-6 font-display text-lg sm:text-xl text-glow">Scriptorium</p>
        <p className="mt-1 font-body text-xs sm:text-sm text-dim tracking-wide">
          Turning the page<span className="animate-[dots_1.4s_steps(4)_infinite]"></span>
        </p>

        {/* Three-dot rhythm under the text, as a fallback/companion to the ::after dots */}
        <div className="flex gap-1.5 mt-4">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
        </div>
      </div>

      {/* Keyframes for the custom animations */}
      <style>{`
        @keyframes flip {
          0%, 100% { transform: rotateY(0deg); }
          50% { transform: rotateY(180deg); }
        }
        @keyframes drift {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
          50% { transform: translateY(-6px) rotate(12deg); opacity: 1; }
        }
        @keyframes dots {
          0% { content: ''; }
          25% { content: '.'; }
          50% { content: '..'; }
          75% { content: '...'; }
          100% { content: ''; }
        }
      `}</style>
    </div>
  );
};

export default Loading;