import React, { useState, useEffect } from 'react';
import { useLesson } from '../../store/useLessonStore';
import { useTeacher } from '../../store/useTeacherStore';
import { HelpCircle, Brain, Sparkles, ArrowRight, Clock, AlertTriangle } from 'lucide-react';

export const QuestionModal: React.FC = () => {
  const { lessonPlan, triggerMisconception, setView } = useLesson();
  const { speakText, language, setPresence } = useTeacher();

  const checkpoint = lessonPlan.checkpoints[0];
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  useEffect(() => {
    setPresence('CHECKING', 'inquiring');
    const prompt = language === 'hi' 
      ? checkpoint.promptHi 
      : language === 'hinglish' 
      ? checkpoint.promptHinglish 
      : checkpoint.promptEn;
    speakText(prompt);
  }, [language]);

  const handleSubmitAnswer = () => {
    if (!selectedOptionId) return;

    const opt = checkpoint.options.find(o => o.id === selectedOptionId);
    if (!opt) return;

    if (opt.isMisconceptionTrap) {
      // Intentional incorrect answer triggers misconception diagnosis
      triggerMisconception();
    } else if (opt.isCorrect) {
      // Correct answer proceeds to final assessment
      setPresence('CELEBRATING');
      setView('assessment');
    } else {
      // Unsure or other
      triggerMisconception();
    }
  };

  const promptText = language === 'hi'
    ? checkpoint.promptHi
    : language === 'hinglish'
    ? checkpoint.promptHinglish
    : checkpoint.promptEn;

  return (
    <div className="min-h-[calc(100vh-140px)] py-8 px-4 sm:px-6 flex items-center justify-center bg-mesh-gradient">
      <div className="w-full max-w-2xl rounded-3xl bg-space-900 border border-amber-500/30 p-6 sm:p-8 shadow-2xl shadow-amber-500/10 space-y-6 animate-fadeIn">
        
        {/* Header with Teacher Waiting Indicator */}
        <div className="flex items-center justify-between border-b border-space-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-300">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase text-amber-400 font-bold">
                STAGE 04 • UNDERSTANDING CHECK
              </span>
              <h3 className="font-display font-bold text-white text-lg">
                Quick check before we continue.
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-space-950 border border-space-800 text-xs font-mono text-space-300">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="hidden sm:inline">Your teacher is waiting...</span>
          </div>
        </div>

        {/* Question Prompt */}
        <div className="p-4 rounded-2xl bg-space-950 border border-space-800 space-y-2">
          <span className="text-[11px] font-mono text-cyan-brand uppercase tracking-wider">
            Diagnostic Prompt:
          </span>
          <p className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed">
            {promptText}
          </p>
        </div>

        {/* Options List */}
        <div className="space-y-3">
          {checkpoint.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            const text = language === 'hi' 
              ? opt.textHi 
              : language === 'hinglish' 
              ? opt.textHinglish 
              : opt.textEn;

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedOptionId(opt.id)}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between group ${
                  isSelected
                    ? opt.isMisconceptionTrap
                      ? 'bg-amber-500/15 border-amber-400 text-white shadow-card-glow'
                      : 'bg-cyan-electric/15 border-cyan-electric text-white shadow-cyan-sm'
                    : 'bg-space-950/80 border-space-800 text-space-300 hover:border-space-700 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-xs ${
                    isSelected
                      ? 'bg-amber-400 text-space-950'
                      : 'bg-space-800 text-space-400 group-hover:bg-space-700'
                  }`}>
                    {opt.label}
                  </span>
                  <span className="text-sm font-semibold">{text}</span>
                </div>

                {opt.isMisconceptionTrap && isSelected && (
                  <span className="text-[10px] font-mono text-amber-400 px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800">
                    Misconception Probe
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        <button
          onClick={handleSubmitAnswer}
          disabled={!selectedOptionId}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 disabled:opacity-40 disabled:pointer-events-none text-space-950 font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-[1.01] transition-all cursor-pointer"
        >
          <span>Submit Response to Teacher →</span>
        </button>

      </div>
    </div>
  );
};
