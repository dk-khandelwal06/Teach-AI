import React from 'react';
import { BookOpen, Clock, Video, HelpCircle, RefreshCw, BrainCircuit, Globe2, ShieldCheck } from 'lucide-react';
import { useDemo } from '../../store/useDemoStore';

export const FeatureGrid: React.FC = () => {
  const { jumpToStep } = useDemo();

  const features = [
    {
      title: 'Understands your material (RAG)',
      description: 'Upload textbooks, lecture PDFs, or raw notes. TeachAI chunks, indexes, and grounds every explanation with verifiable citations.',
      badge: 'RAG Grounded',
      icon: BookOpen,
      actionText: 'Inspect Citations',
      targetStep: 0
    },
    {
      title: 'Plans around your available time',
      description: 'Got 5 minutes before a quiz or 60 minutes for a deep dive? Cognitive time budgeting prioritizes the highest-yield mental models.',
      badge: 'Time Adaptive',
      icon: Clock,
      actionText: 'View Lesson Planner',
      targetStep: 1
    },
    {
      title: 'Teaches with voice, visuals & video',
      description: 'A human-like teacher persona with realistic speech synthesis in English, Hindi, and Hinglish with live synchronized subtitles.',
      badge: 'Multimodal Avatar',
      icon: Video,
      actionText: 'Enter AI Classroom',
      targetStep: 2
    },
    {
      title: 'Checks whether you actually understand',
      description: 'Natural pauses and diagnostic checkpoint questions test for conceptual depth rather than surface rote memorization.',
      badge: 'Active Retrieval',
      icon: HelpCircle,
      actionText: 'Test Checkpoint',
      targetStep: 3
    },
    {
      title: 'Adapts when you struggle',
      description: 'Detects underlying flawed mental models (e.g. treating resistance as a push) and switches to intuitive hydraulic analogies.',
      badge: 'Misconception Engine',
      icon: RefreshCw,
      actionText: 'Trigger Adaptation',
      targetStep: 4
    },
    {
      title: 'Remembers where you need practice',
      description: 'Maintains a persistent learner memory model of your strengths, recurring pitfalls, and unlocks your custom curriculum path.',
      badge: 'Learner Memory',
      icon: BrainCircuit,
      actionText: 'View Learning Report',
      targetStep: 6
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
      
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-electric">
          Product Capabilities
        </span>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
          Engineered for profound comprehension
        </h2>
        <p className="text-sm text-space-300">
          Every feature is designed to simulate a world-class 1-on-1 human tutor.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat) => {
          const Icon = feat.icon;

          return (
            <div
              key={feat.title}
              className="p-6 rounded-2xl bg-space-900/70 border border-space-800 hover:border-cyan-electric/40 hover:bg-space-850/80 transition-all duration-300 flex flex-col justify-between group shadow-card-dark"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-space-800 border border-space-700 flex items-center justify-center text-cyan-electric group-hover:border-cyan-electric/50 group-hover:scale-105 transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-space-800 text-space-300 border border-space-700">
                    {feat.badge}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-cyan-electric transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-space-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-space-800/80 mt-6">
                <button
                  onClick={() => jumpToStep(feat.targetStep)}
                  className="text-xs font-mono font-semibold text-cyan-brand hover:text-cyan-electric flex items-center gap-1 group-hover:translate-x-1 transition-all"
                >
                  <span>{feat.actionText}</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
