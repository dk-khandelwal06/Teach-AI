import React from 'react';
import { useLesson } from '../../store/useLessonStore';
import { X, CheckCircle2, Circle, Lock, AlertCircle, ArrowRight, BookOpen } from 'lucide-react';

export const CurriculumPathDrawer: React.FC = () => {
  const { isCurriculumPathOpen, setCurriculumPathOpen, lessonPlan, goToSection, setView } = useLesson();

  if (!isCurriculumPathOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-space-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-2xl bg-space-900 border border-cyan-electric/30 p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-space-800 pb-4">
          <div>
            <span className="text-xs font-mono uppercase text-cyan-brand">Curriculum Architecture</span>
            <h3 className="font-display font-bold text-white text-lg">
              {lessonPlan.curriculumPath.unit}
            </h3>
          </div>

          <button
            onClick={() => setCurriculumPathOpen(false)}
            className="p-1.5 rounded-lg text-space-400 hover:text-white hover:bg-space-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Curriculum Stepper */}
        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-space-700">
          {lessonPlan.curriculumPath.steps.map((step) => {
            const isCompleted = step.status === 'completed';
            const isCurrent = step.status === 'current';
            const isWeak = step.status === 'weak';
            const isLocked = step.status === 'locked';

            return (
              <div key={step.id} className="relative flex items-start gap-4">
                {/* Status Icon */}
                <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center ${
                  isCompleted
                    ? 'bg-emerald-500 text-space-950'
                    : isCurrent
                    ? 'bg-cyan-electric text-space-950 ring-4 ring-cyan-electric/20 animate-pulse'
                    : isWeak
                    ? 'bg-amber-500 text-space-950'
                    : 'bg-space-800 text-space-500 border border-space-700'
                }`}>
                  {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                  {isCurrent && <div className="w-2 h-2 rounded-full bg-space-950" />}
                  {isWeak && <AlertCircle className="w-3.5 h-3.5" />}
                  {isLocked && <Lock className="w-3 h-3" />}
                </div>

                {/* Content Card */}
                <div className={`flex-1 p-3.5 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-space-850 border-cyan-electric/40 shadow-cyan-sm'
                    : isCompleted
                    ? 'bg-space-900/80 border-space-800 opacity-90'
                    : 'bg-space-950/40 border-space-800/60 opacity-60'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-slate-100">{step.title}</span>
                    {step.score && (
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        {step.score}% Score
                      </span>
                    )}
                    {isCurrent && (
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-electric/20 text-cyan-electric font-bold">
                        ACTIVE LESSON
                      </span>
                    )}
                  </div>

                  {isCurrent && (
                    <div className="mt-2.5 pt-2 border-t border-space-800 flex items-center justify-between">
                      <p className="text-xs text-space-400 font-mono">5 Sections • 1 Diagnostic Check</p>
                      <button
                        onClick={() => {
                          setCurriculumPathOpen(false);
                          setView('classroom');
                        }}
                        className="flex items-center gap-1 text-xs font-semibold text-cyan-brand hover:underline"
                      >
                        Enter Room <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-2">
          <button
            onClick={() => setCurriculumPathOpen(false)}
            className="w-full py-2.5 rounded-xl bg-space-800 hover:bg-space-700 text-slate-200 font-medium text-xs border border-space-700 transition-colors"
          >
            Back to Classroom
          </button>
        </div>

      </div>
    </div>
  );
};
