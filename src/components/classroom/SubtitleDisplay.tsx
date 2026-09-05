import React from 'react';
import { useTeacher } from '../../store/useTeacherStore';
import { Subtitles, Volume2 } from 'lucide-react';

export const SubtitleDisplay: React.FC = () => {
  const { currentSubtitle, activeWordIndex, isSpeaking, language } = useTeacher();

  if (!currentSubtitle) {
    return (
      <div className="p-4 rounded-xl bg-space-950/80 border border-space-800 text-center text-xs font-mono text-space-500">
        AI Teacher is preparing audio and visual explanation...
      </div>
    );
  }

  const words = currentSubtitle.split(/\s+/);

  return (
    <div className="p-4 rounded-2xl bg-space-950 border border-cyan-electric/25 shadow-card-dark relative space-y-2">
      
      {/* Subtitle Header Bar */}
      <div className="flex items-center justify-between text-[11px] font-mono text-space-400 border-b border-space-800/80 pb-2">
        <div className="flex items-center gap-1.5 text-cyan-electric font-semibold">
          <Subtitles className="w-3.5 h-3.5" />
          <span>LIVE TEACHER TRANSCRIPT ({language.toUpperCase()})</span>
        </div>

        {isSpeaking && (
          <span className="flex items-center gap-1 text-[10px] text-teach-accent animate-pulse font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-teach-accent" />
            SYNCHRONIZED SPEECH
          </span>
        )}
      </div>

      {/* Karaoke-Style Spoken Text */}
      <div className="text-sm sm:text-base leading-relaxed text-space-200 min-h-[48px] flex flex-wrap gap-x-1.5 gap-y-1">
        {words.map((word, idx) => {
          const isActive = idx === activeWordIndex;
          const isPassed = idx < activeWordIndex;

          return (
            <span
              key={`${word}-${idx}`}
              className={`transition-all duration-150 rounded px-0.5 ${
                isActive
                  ? 'subtitle-active-word bg-cyan-electric/20 text-cyan-electric font-bold scale-105'
                  : isPassed
                  ? 'text-white'
                  : 'text-space-400'
              }`}
            >
              {word}
            </span>
          );
        })}
      </div>

    </div>
  );
};
