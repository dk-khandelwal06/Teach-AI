import React, { useState } from 'react';
import { Eye, FileCode2, Volume2, Sparkles, HelpCircle, CheckCircle, RefreshCw, ArrowRight } from 'lucide-react';

export const TeachingLoopVisualizer: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(6); // default on Adapt to highlight differentiator

  const loopSteps = [
    {
      num: '01',
      title: 'UNDERSTAND',
      subtitle: 'Knowledge & Profile',
      desc: 'Parses your uploaded PDF/notes or topic. Understands your prior knowledge and available time.',
      icon: Eye,
      color: 'text-cyan-electric border-cyan-electric/40 bg-cyan-electric/10'
    },
    {
      num: '02',
      title: 'PLAN',
      subtitle: 'Cognitive Budgeting',
      desc: 'Builds a time-budgeted concept map. Prioritizes foundational intuition before mechanical formulas.',
      icon: FileCode2,
      color: 'text-cyan-brand border-cyan-brand/40 bg-cyan-brand/10'
    },
    {
      num: '03',
      title: 'EXPLAIN',
      subtitle: 'Multimodal Voice & Video',
      desc: 'Delivers high-clarity voice explanation in English, Hindi, or Hinglish with synchronized subtitles.',
      icon: Volume2,
      color: 'text-teach-indigo border-teach-indigo/40 bg-teach-indigo/10'
    },
    {
      num: '04',
      title: 'DEMONSTRATE',
      subtitle: 'Subject-Aware Canvas',
      desc: 'Renders dynamic interactive circuits, geometric graphs, or code traces that react to slider changes.',
      icon: Sparkles,
      color: 'text-cyan-glow border-cyan-glow/40 bg-cyan-glow/10'
    },
    {
      num: '05',
      title: 'QUESTION',
      subtitle: 'Diagnostic Probing',
      desc: 'Pauses naturally to check whether you truly grasp the cause-and-effect relationship.',
      icon: HelpCircle,
      color: 'text-amber-400 border-amber-400/40 bg-amber-400/10'
    },
    {
      num: '06',
      title: 'EVALUATE',
      subtitle: 'Misconception Classifier',
      desc: 'Analyzes your exact error to identify flawed underlying mental models instead of saying "wrong".',
      icon: CheckCircle,
      color: 'text-rose-400 border-rose-400/40 bg-rose-400/10'
    },
    {
      num: '07',
      title: 'ADAPT',
      subtitle: 'Pedagogical Strategy Shift',
      desc: 'Changes explanation strategy dynamically (e.g. shifts to real-world Water Pipe Analogy) and re-tests.',
      icon: RefreshCw,
      color: 'text-teach-emerald border-teach-emerald/40 bg-teach-emerald/10'
    },
    {
      num: '08',
      title: 'CONTINUE',
      subtitle: 'Cumulative Mastery',
      desc: 'Locks in conceptual recovery, updates learner memory, and progresses along the curriculum tree.',
      icon: ArrowRight,
      color: 'text-blue-400 border-blue-400/40 bg-blue-400/10'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 bg-space-900/40 border-y border-space-800">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-brand">
            The Core Teaching Loop
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            How a genuine teacher actually teaches
          </h2>
          <p className="text-sm text-space-300">
            A chatbot dumps answers. TeachAI guides you through an 8-stage pedagogical loop that adapts when you get stuck.
          </p>
        </div>

        {/* Interactive Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {loopSteps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;

            return (
              <div
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer select-none relative group ${
                  isSelected
                    ? 'bg-space-850 border-cyan-electric/60 shadow-cyan-glow -translate-y-1'
                    : 'bg-space-950/60 border-space-800 hover:border-space-700 hover:bg-space-900/80'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-space-500 group-hover:text-space-400">
                    STAGE {step.num}
                  </span>
                  <div className={`p-2 rounded-xl border ${step.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-display font-bold text-base text-white tracking-wide">
                  {step.title}
                </h3>
                <span className="text-xs font-medium text-cyan-brand block mb-2">
                  {step.subtitle}
                </span>

                <p className="text-xs text-space-300 leading-relaxed">
                  {step.desc}
                </p>

                {isSelected && (
                  <div className="absolute top-2 right-2 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-electric opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-electric" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Step Active Spotlight Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-space-900 via-space-850 to-space-900 border border-cyan-electric/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-card-dark">
          <div className="space-y-1.5 text-left">
            <span className="text-xs font-mono text-cyan-electric font-semibold uppercase">
              Current Spotlight: Stage {loopSteps[activeStep].num} — {loopSteps[activeStep].title}
            </span>
            <h4 className="text-lg font-bold text-white">
              {loopSteps[activeStep].subtitle}
            </h4>
            <p className="text-xs text-space-300 max-w-2xl">
              {loopSteps[activeStep].desc}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : loopSteps.length - 1))}
              className="px-3 py-1.5 rounded-lg bg-space-800 hover:bg-space-700 text-xs font-mono text-space-300 border border-space-700"
            >
              ← Previous
            </button>
            <button
              onClick={() => setActiveStep((prev) => (prev < loopSteps.length - 1 ? prev + 1 : 0))}
              className="px-4 py-1.5 rounded-lg bg-cyan-electric text-space-950 text-xs font-bold font-mono shadow-cyan-sm hover:opacity-95"
            >
              Next Stage →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
