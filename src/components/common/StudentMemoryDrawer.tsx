import React from 'react';
import { useLesson } from '../../store/useLessonStore';
import { X, User, Brain, Shield, Award, CheckCircle2, AlertTriangle, Clock, History, Sparkles } from 'lucide-react';

export const StudentMemoryDrawer: React.FC = () => {
  const { isMemoryModalOpen, setMemoryModalOpen, learnerProfile } = useLesson();

  if (!isMemoryModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-space-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-space-900 border border-cyan-electric/30 p-6 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-space-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-electric/15 border border-cyan-electric/30 flex items-center justify-center text-cyan-electric">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-lg">
                Learner Memory & Profile
              </h3>
              <p className="text-xs text-space-400 font-mono">
                Persistent AI Student Model • Adaptive Context
              </p>
            </div>
          </div>

          <button
            onClick={() => setMemoryModalOpen(false)}
            className="p-1.5 rounded-lg text-space-400 hover:text-white hover:bg-space-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Core Attributes */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-space-850 border border-space-800 space-y-1">
            <span className="text-space-400 uppercase font-mono text-[10px]">Student Name</span>
            <p className="font-semibold text-white text-sm">{learnerProfile.studentName || 'Aarav Sharma'}</p>
          </div>
          <div className="p-3 rounded-xl bg-space-850 border border-space-800 space-y-1">
            <span className="text-space-400 uppercase font-mono text-[10px]">Learner Level</span>
            <p className="font-semibold text-cyan-brand capitalize text-sm">{learnerProfile.level}</p>
          </div>
          <div className="p-3 rounded-xl bg-space-850 border border-space-800 space-y-1">
            <span className="text-space-400 uppercase font-mono text-[10px]">Preferred Language</span>
            <p className="font-semibold text-white capitalize text-sm">{learnerProfile.language}</p>
          </div>
          <div className="p-3 rounded-xl bg-space-850 border border-space-800 space-y-1">
            <span className="text-space-400 uppercase font-mono text-[10px]">Dominant Style</span>
            <p className="font-semibold text-white capitalize text-sm">Visual & Analogies</p>
          </div>
        </div>

        {/* Cognitive Diagnostics */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-semibold uppercase text-space-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-electric" />
            AI Teacher's Cognitive Assessment
          </h4>

          <div className="space-y-2">
            <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-semibold text-emerald-300">Strong Conceptual Intuition</span>
                <p className="text-[11px] text-space-300">Grasps physical push (Voltage) and flow rate (Current) immediately when visualized.</p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-800/40 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-semibold text-amber-300">Target for Reinforcement</span>
                <p className="text-[11px] text-space-300">Inverse proportionality formula application ($I = V/R$) and cross-sectional wire scaling.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Lesson History */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-semibold uppercase text-space-400 flex items-center gap-1.5">
            <History className="w-3.5 h-3.5 text-space-400" />
            Recent Completed Modules
          </span>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-space-800 border border-space-700 text-space-300 flex items-center gap-1">
              ✓ Electric Charge (95%)
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-space-800 border border-space-700 text-space-300 flex items-center gap-1">
              ✓ Current Flow (90%)
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-space-800 border border-space-700 text-space-300 flex items-center gap-1">
              ✓ Potential Difference (85%)
            </span>
          </div>
        </div>

        {/* Action */}
        <div className="pt-2">
          <button
            onClick={() => setMemoryModalOpen(false)}
            className="w-full py-2.5 rounded-xl bg-space-800 hover:bg-space-700 text-slate-200 font-medium text-xs border border-space-700 transition-colors"
          >
            Close Profile
          </button>
        </div>

      </div>
    </div>
  );
};
