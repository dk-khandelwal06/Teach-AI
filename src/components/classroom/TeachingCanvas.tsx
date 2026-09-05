import React, { useState } from 'react';
import { PhysicsCircuitCanvas } from './PhysicsCircuitCanvas';
import { WaterPipeAnalogyCanvas } from './WaterPipeAnalogyCanvas';
import { useLesson } from '../../store/useLessonStore';
import { Zap, Waves, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

export const TeachingCanvas: React.FC = () => {
  const { currentView, lessonPlan, currentSectionIndex, setRAGDrawerOpen } = useLesson();
  const currentSection = lessonPlan.sections[currentSectionIndex] || lessonPlan.sections[0];

  const [activeTab, setActiveTab] = useState<'circuit' | 'analogy' | 'notes'>(
    currentView === 'misconception' || currentSection.canvasType === 'water_pipe_analogy' 
      ? 'analogy' 
      : 'circuit'
  );

  return (
    <div className="space-y-4">
      
      {/* Tab Switcher & Section Context Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-1.5 rounded-xl bg-space-900 border border-space-800">
        
        {/* Left: Tab Buttons */}
        <div className="flex items-center gap-1 text-xs font-mono font-semibold">
          <button
            onClick={() => setActiveTab('circuit')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'circuit'
                ? 'bg-cyan-electric/20 text-cyan-electric border border-cyan-electric/40 shadow-sm'
                : 'text-space-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Circuit Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab('analogy')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'analogy'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-space-400 hover:text-slate-200'
            }`}
          >
            <Waves className="w-3.5 h-3.5" />
            <span>Water-Pipe Analogy</span>
          </button>

          <button
            onClick={() => setRAGDrawerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-space-400 hover:text-slate-200 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-teach-accent" />
            <span>Grounded Source (NCERT)</span>
          </button>
        </div>

        {/* Right: Active Section Objective */}
        <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-space-400">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-brand" />
          <span>{currentSection.teachingObjective}</span>
        </div>

      </div>

      {/* Render Active Interactive Canvas */}
      {activeTab === 'circuit' && <PhysicsCircuitCanvas />}
      {activeTab === 'analogy' && <WaterPipeAnalogyCanvas />}

    </div>
  );
};
