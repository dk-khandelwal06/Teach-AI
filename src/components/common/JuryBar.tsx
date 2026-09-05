import React from 'react';
import { useDemo, DEMO_STAGES } from '../../store/useDemoStore';
import { Play, Pause, ChevronRight, Sparkles, Award, RotateCcw } from 'lucide-react';

export const JuryBar: React.FC = () => {
  const { 
    currentStepIndex, 
    jumpToStep, 
    isAutoPlaying, 
    startAutoDemo, 
    stopAutoDemo,
    isJuryBarVisible 
  } = useDemo();

  if (!isJuryBarVisible) return null;

  return (
    <div className="bg-gradient-to-r from-space-950 via-space-900 to-space-950 border-b border-cyan-electric/20 px-3 py-1.5 shadow-cyan-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
        
        {/* Left: Jury Label & Auto Demo Trigger */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-electric/15 text-cyan-electric border border-cyan-electric/30 font-mono font-bold tracking-wider text-[10px]">
            <Award className="w-3.5 h-3.5" />
            <span>JURY MODE</span>
          </div>

          <button
            onClick={isAutoPlaying ? stopAutoDemo : startAutoDemo}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
              isAutoPlaying
                ? 'bg-amber-500 text-space-950 animate-pulse'
                : 'bg-space-800 hover:bg-space-700 text-slate-200 border border-space-700 hover:border-cyan-electric/40'
            }`}
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-3 h-3 fill-current" />
                <span>Auto Walkthrough Playing...</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current text-cyan-brand" />
                <span>Run 60s Guided Demo</span>
              </>
            )}
          </button>
        </div>

        {/* Center: 7 Pedagogical Stages Stepper */}
        <div className="flex items-center gap-1 overflow-x-auto py-0.5 scrollbar-none">
          {DEMO_STAGES.map((step, idx) => {
            const isActive = currentStepIndex === idx;
            const isMisconception = step.id === 'adapt';

            return (
              <button
                key={step.id}
                onClick={() => jumpToStep(idx)}
                className={`group flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono transition-all ${
                  isActive
                    ? isMisconception
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-400 font-bold shadow-sm'
                      : 'bg-cyan-electric/20 text-cyan-electric border border-cyan-electric font-bold shadow-cyan-sm'
                    : 'text-space-400 hover:text-slate-200 hover:bg-space-800/80 border border-transparent'
                }`}
                title={step.description}
              >
                <span className={`text-[9px] ${isActive ? 'text-white' : 'text-space-500'}`}>
                  {step.stepNumber}
                </span>
                <span>{step.name}</span>
                {idx < DEMO_STAGES.length - 1 && (
                  <ChevronRight className="w-2.5 h-2.5 text-space-600 group-hover:text-space-400 ml-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Quick Reset */}
        <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-space-400">
          <span className="text-space-500">Loop:</span>
          <span className="text-cyan-brand font-medium">Understand → Adapt → Teach</span>
        </div>

      </div>
    </div>
  );
};
