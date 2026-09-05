import React from 'react';
import { Sparkles, Terminal, Code2, Cpu, Globe, ShieldCheck } from 'lucide-react';
import { useDemo } from '../../store/useDemoStore';
import { useLesson } from '../../store/useLessonStore';

export const Footer: React.FC = () => {
  const { jumpToStep, startAutoDemo } = useDemo();
  const { setView } = useLesson();

  return (
    <footer className="border-t border-space-800 bg-space-950 text-space-400 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand & Purpose */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-electric/10 border border-cyan-electric/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cyan-electric" />
            </div>
            <span className="font-display font-bold text-white text-base">Teach<span className="text-cyan-brand">AI</span></span>
          </div>
          <p className="text-xs text-space-400 leading-relaxed">
            An adaptive AI teacher built for personalized learning. Not a chatbot—a human-like personal classroom that diagnoses misconceptions in real-time.
          </p>
          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-space-900 border border-space-800 text-[11px] font-mono text-cyan-brand">
            <ShieldCheck className="w-3.5 h-3.5" /> Bharat Academix Hackathon 2026
          </div>
        </div>

        {/* Teaching Architecture */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200">
            Teaching Pipeline
          </h4>
          <ul className="space-y-1.5 text-xs text-space-400 font-mono">
            <li className="hover:text-cyan-electric transition-colors">01 • RAG Ingestion & Chunking</li>
            <li className="hover:text-cyan-electric transition-colors">02 • Cognitive Time Budgeting</li>
            <li className="hover:text-cyan-electric transition-colors">03 • Multilingual Voice Synthesis</li>
            <li className="hover:text-cyan-electric transition-colors">04 • Interactive Circuit Sim</li>
            <li className="hover:text-cyan-electric transition-colors">05 • Misconception Detection</li>
          </ul>
        </div>

        {/* Quick Jury Navigation */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200">
            Judging Quick Jump
          </h4>
          <ul className="space-y-1.5 text-xs text-space-400">
            <li>
              <button 
                onClick={() => jumpToStep(2)} 
                className="hover:text-cyan-electric transition-colors text-left"
              >
                → 03 AI Teaching Room (Ohm's Law)
              </button>
            </li>
            <li>
              <button 
                onClick={() => jumpToStep(4)} 
                className="hover:text-amber-400 transition-colors text-left"
              >
                → 05 Misconception & Adaptation Demo
              </button>
            </li>
            <li>
              <button 
                onClick={() => jumpToStep(6)} 
                className="hover:text-teach-emerald transition-colors text-left"
              >
                → 07 Learning Report & Mastery Radar
              </button>
            </li>
            <li>
              <button 
                onClick={startAutoDemo} 
                className="text-cyan-electric font-medium hover:underline text-left"
              >
                ▶ Run 60-Second Auto Demo
              </button>
            </li>
          </ul>
        </div>

        {/* Stack & Tech */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200">
            Technology Stack
          </h4>
          <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
            <span className="px-2 py-0.5 rounded bg-space-900 border border-space-800 text-space-300">React 18</span>
            <span className="px-2 py-0.5 rounded bg-space-900 border border-space-800 text-space-300">TypeScript</span>
            <span className="px-2 py-0.5 rounded bg-space-900 border border-space-800 text-space-300">Tailwind CSS</span>
            <span className="px-2 py-0.5 rounded bg-space-900 border border-space-800 text-space-300">Web Speech API</span>
            <span className="px-2 py-0.5 rounded bg-space-900 border border-space-800 text-space-300">Web Audio Synth</span>
            <span className="px-2 py-0.5 rounded bg-space-900 border border-space-800 text-space-300">Vercel Ready</span>
          </div>
          <p className="text-[11px] text-space-500">
            © 2026 TeachAI • Built for Bharat Academix Innovation Hackathon
          </p>
        </div>

      </div>
    </footer>
  );
};
