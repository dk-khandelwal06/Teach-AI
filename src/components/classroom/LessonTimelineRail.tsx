import React from 'react';
import { useLesson } from '../../store/useLessonStore';
import { useTeacher } from '../../store/useTeacherStore';
import { CheckCircle2, Play, ChevronRight, HelpCircle, Sparkles } from 'lucide-react';

export const LessonTimelineRail: React.FC = () => {
  const { lessonPlan, currentSectionIndex, goToSection, setView } = useLesson();
  const { speakText, language } = useTeacher();

  const handleSelectSection = (idx: number) => {
    goToSection(idx);
    const sec = lessonPlan.sections[idx];
    if (sec) {
      const script = sec.speechScript[language] || sec.speechScript.en;
      speakText(script);
    }
  };

  return (
    <div className="rounded-2xl bg-space-950 border border-space-800 p-4 space-y-3 shadow-card-dark">
      
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-mono border-b border-space-800/80 pb-2.5">
        <span className="text-space-400 font-semibold uppercase tracking-wider">
          Lesson Timeline
        </span>
        <span className="text-cyan-brand font-bold">
          {currentSectionIndex + 1} / {lessonPlan.sections.length}
        </span>
      </div>

      {/* Sections List */}
      <div className="space-y-1.5">
        {lessonPlan.sections.map((sec, idx) => {
          const isCurrent = currentSectionIndex === idx;
          const isCompleted = currentSectionIndex > idx;

          return (
            <button
              key={sec.id}
              onClick={() => handleSelectSection(idx)}
              className={`w-full p-2.5 rounded-xl text-left text-xs transition-all flex items-center justify-between border ${
                isCurrent
                  ? 'bg-cyan-electric/15 border-cyan-electric text-white font-bold shadow-cyan-sm'
                  : isCompleted
                  ? 'bg-space-900/60 border-space-800 text-space-300 hover:text-white'
                  : 'bg-space-950/40 border-space-800/50 text-space-500 hover:text-space-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${
                  isCurrent
                    ? 'bg-cyan-electric text-space-950 font-bold'
                    : isCompleted
                    ? 'bg-teach-emerald text-space-950 font-bold'
                    : 'bg-space-800 text-space-400'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-3 h-3 stroke-[3]" /> : idx + 1}
                </div>

                <div>
                  <div className="font-semibold text-xs leading-tight">{sec.title}</div>
                  <div className="text-[10px] text-space-400 font-normal">{sec.subtitle}</div>
                </div>
              </div>

              <span className="text-[10px] font-mono text-space-500">
                ~{sec.durationSec}s
              </span>
            </button>
          );
        })}
      </div>

      {/* Interactive Checkpoint Shortcut */}
      <div className="pt-2 border-t border-space-800/80">
        <button
          onClick={() => setView('check')}
          className="w-full p-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center justify-between transition-all"
        >
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Understanding Check</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
