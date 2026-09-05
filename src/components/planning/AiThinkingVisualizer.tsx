import React, { useState, useEffect } from 'react';
import { useLesson } from '../../store/useLessonStore';
import { useTeacher } from '../../store/useTeacherStore';
import { Sparkles, CheckCircle2, Clock, BookOpen, Brain, ArrowRight, Layers, ShieldCheck } from 'lucide-react';

export const AiThinkingVisualizer: React.FC = () => {
  const { lessonPlan, setView, learnerProfile } = useLesson();
  const { setPresence } = useTeacher();

  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [isPlanningDone, setIsPlanningDone] = useState<boolean>(false);

  const planningStages = [
    { title: 'UNDERSTANDING YOUR GOAL', note: 'Analyzing time constraint & learner background' },
    { title: 'READING YOUR MATERIAL (RAG)', note: 'Extracting formulas, definitions & circuit diagrams' },
    { title: 'MAPPING PREREQUISITE CONCEPTS', note: 'Establishing causal dependencies: Voltage → Resistance → Current' },
    { title: 'ADAPTING TO YOUR LEVEL', note: 'Formulating physical water-pipe analogies & visual simulators' },
    { title: 'SYNTHESIZING INTERACTIVE LESSON', note: 'Calibrating diagnostic checkpoints & misconception traps' }
  ];

  useEffect(() => {
    setPresence('PLANNING');

    const interval = setInterval(() => {
      setCurrentStageIndex((prev) => {
        if (prev < planningStages.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsPlanningDone(true);
          return prev;
        }
      });
    }, 450);

    return () => clearInterval(interval);
  }, []);

  const handleEnterClassroom = () => {
    setPresence('EXPLAINING');
    setView('classroom');
  };

  return (
    <div className="min-h-[calc(100vh-140px)] py-10 px-4 sm:px-6 flex items-center justify-center bg-mesh-gradient">
      <div className="w-full max-w-3xl rounded-3xl bg-space-900 border border-cyan-electric/30 p-6 sm:p-8 shadow-2xl shadow-cyan-electric/15 space-y-8 animate-fadeIn">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-deep/30 border border-cyan-electric/40 text-xs font-mono text-cyan-electric">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            AI COGNITIVE LESSON PLANNER
          </div>

          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            {isPlanningDone ? 'Your Personalized Lesson is Ready' : 'Designing Your Adaptive Lesson...'}
          </h2>
          <p className="text-xs sm:text-sm text-space-300">
            {isPlanningDone 
              ? "I've prioritized the core intuition and causal mental models that matter most for your available time."
              : 'Synthesizing knowledge sources and calibrating diagnostic checkpoints in real time.'}
          </p>
        </div>

        {/* Dynamic Thinking Progress Stepper */}
        <div className="p-5 rounded-2xl bg-space-950 border border-space-800 space-y-3.5">
          {planningStages.map((stage, idx) => {
            const isFinished = idx < currentStageIndex || (idx === currentStageIndex && isPlanningDone);
            const isCurrent = idx === currentStageIndex && !isPlanningDone;
            const isPending = idx > currentStageIndex;

            return (
              <div
                key={stage.title}
                className={`flex items-center justify-between p-2.5 rounded-xl transition-all ${
                  isCurrent
                    ? 'bg-cyan-electric/10 border border-cyan-electric/30 shadow-sm'
                    : 'border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                    isFinished
                      ? 'bg-teach-emerald text-space-950'
                      : isCurrent
                      ? 'bg-cyan-electric text-space-950 animate-pulse'
                      : 'bg-space-800 text-space-500'
                  }`}>
                    {isFinished ? <CheckCircle2 className="w-4 h-4 stroke-[3]" /> : idx + 1}
                  </div>
                  <div>
                    <span className={`text-xs font-mono font-bold ${
                      isFinished || isCurrent ? 'text-white' : 'text-space-500'
                    }`}>
                      {stage.title}
                    </span>
                    <p className="text-[10px] text-space-400 font-mono">
                      {stage.note}
                    </p>
                  </div>
                </div>

                <div className="font-mono text-xs">
                  {isFinished && <span className="text-teach-emerald font-bold">✓ DONE</span>}
                  {isCurrent && <span className="text-cyan-electric animate-pulse">● THINKING...</span>}
                  {isPending && <span className="text-space-600">QUEUED</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Revealed Curriculum Overview (When Done) */}
        {isPlanningDone && (
          <div className="space-y-4 animate-fadeIn">
            
            <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-space-850 border border-space-750 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-space-400">Level:</span>
                <span className="text-cyan-electric font-semibold capitalize">{learnerProfile.level}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-space-400">Language:</span>
                <span className="text-white font-semibold uppercase">{learnerProfile.language}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-space-400">Time Budget:</span>
                <span className="text-amber-400 font-semibold">{learnerProfile.timeAvailable}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-space-400">Source:</span>
                <span className="text-teach-accent font-semibold">{lessonPlan.knowledgeSource.name}</span>
              </div>
            </div>

            {/* Lesson Sections Grid */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-space-400 uppercase tracking-wider block">
                Generated Lesson Timeline (5 Minutes):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {lessonPlan.sections.map((sec) => (
                  <div
                    key={sec.id}
                    className="p-3 rounded-xl bg-space-950 border border-space-800 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-xs text-white">{sec.title}</div>
                      <div className="text-[11px] text-space-400">{sec.subtitle}</div>
                    </div>
                    <span className="text-[11px] font-mono text-cyan-brand">
                      ~{sec.durationSec}s
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enter Classroom Action */}
            <button
              onClick={handleEnterClassroom}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-electric via-teach-accent to-cyan-electric bg-[length:200%_auto] text-space-950 font-bold text-base flex items-center justify-center gap-2 shadow-cyan-glow hover:scale-[1.01] transition-all cursor-pointer"
            >
              <Sparkles className="w-5 h-5 fill-current" />
              <span>Enter AI Classroom Now →</span>
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
