import React, { useState } from 'react';
import { useLesson } from '../../store/useLessonStore';
import { useDemo } from '../../store/useDemoStore';
import { Sparkles, Play, ArrowRight, BookOpen, Brain, Zap, CheckCircle2, RefreshCw } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setView } = useLesson();
  const { jumpToStep } = useDemo();
  const [activeSignal, setActiveSignal] = useState<string>('understanding');

  const signals = [
    { id: 'plan', label: 'LESSON PLAN', color: 'text-cyan-electric border-cyan-electric/40 bg-cyan-electric/10' },
    { id: 'knowledge', label: 'KNOWLEDGE SOURCE', color: 'text-teach-accent border-teach-accent/40 bg-teach-accent/10' },
    { id: 'understanding', label: 'UNDERSTANDING CHECK', color: 'text-teach-indigo border-teach-indigo/40 bg-teach-indigo/10' },
    { id: 'misconception', label: 'MISCONCEPTION DETECTED', color: 'text-amber-400 border-amber-400/40 bg-amber-400/10' },
    { id: 'adaptation', label: 'ADAPTATION ENGINE', color: 'text-emerald-400 border-emerald-400/40 bg-emerald-400/10' },
    { id: 'progress', label: 'REAL-TIME MASTERY', color: 'text-cyan-glow border-cyan-glow/40 bg-cyan-glow/10' },
  ];

  return (
    <section className="relative pt-12 pb-20 px-4 sm:px-6 overflow-hidden bg-mesh-gradient">
      
      {/* Background Decorative Ambient Flares */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-cyan-electric/15 via-teach-accent/10 to-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Main Hero Header */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-space-900/90 border border-cyan-electric/30 shadow-cyan-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-brand opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-brand" />
            </span>
            <span className="text-xs font-mono font-semibold text-slate-200 tracking-wide">
              BHARAT ACADEMIX INNOVATION HACKATHON 2026
            </span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-[1.1]">
            Your AI teacher doesn't just answer.{' '}
            <span className="bg-gradient-to-r from-cyan-electric via-teach-accent to-blue-400 bg-clip-text text-transparent">
              It teaches.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-space-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Give TeachAI a topic or your study material. Tell it your level, language, goal, and available time. It builds the lesson, teaches you with video & voice, checks your understanding, and <strong className="text-amber-300 font-semibold">adapts when you struggle</strong>.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            
            <button
              onClick={() => setView('onboarding')}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-electric via-teach-accent to-cyan-electric bg-[length:200%_auto] hover:bg-right transition-all text-space-950 font-bold text-base shadow-cyan-glow hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-5 h-5 fill-space-950" />
              <span>Start Learning</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => jumpToStep(2)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-space-900/90 hover:bg-space-850 text-slate-100 font-semibold text-sm border border-space-700 hover:border-cyan-electric/50 transition-all shadow-card-dark"
            >
              <Play className="w-4 h-4 fill-cyan-electric text-cyan-electric" />
              <span>See How It Teaches (Ohm's Law Demo)</span>
            </button>

          </div>

          {/* Quick highlights */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-4 text-xs font-mono text-space-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-teach-emerald" /> Multilingual (EN, हिंदी, Hinglish)
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-teach-emerald" /> Subject-Aware Interactive Canvas
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-teach-emerald" /> Real Misconception Diagnosis
            </span>
          </div>

        </div>

        {/* Cinematic AI Classroom Floating Stage */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Outer glow frame */}
          <div className="relative rounded-3xl p-1 bg-gradient-to-b from-cyan-electric/30 via-space-800 to-space-950 shadow-2xl shadow-cyan-electric/10">
            
            <div className="relative rounded-[22px] bg-space-950 border border-space-800/80 overflow-hidden">
              
              {/* Top window chrome */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-space-800/80 bg-space-900/60">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-space-400">teachai-classroom.ai/session/ohms-law</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-electric/15 text-cyan-electric border border-cyan-electric/30">
                    ● TEACHER LIVE
                  </span>
                </div>
              </div>

              {/* Classroom Preview Body */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 lg:p-8 bg-space-950/90">
                
                {/* Left: Teacher Persona Stage */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-space-900 to-space-850 border border-space-700/80 relative space-y-4">
                  
                  {/* Avatar Visual Disc with wave pulses */}
                  <div className="relative w-36 h-36 rounded-full p-1 bg-gradient-to-tr from-cyan-electric to-teach-accent shadow-cyan-glow">
                    <div className="w-full h-full rounded-full bg-space-950 flex flex-col items-center justify-center relative overflow-hidden">
                      <div className="w-20 h-20 rounded-full bg-space-850 border border-cyan-electric/40 flex items-center justify-center text-cyan-electric">
                        <Brain className="w-10 h-10 animate-pulse-subtle" />
                      </div>
                      <div className="absolute bottom-2 px-2 py-0.5 rounded-full bg-space-900 border border-space-700 text-[10px] font-mono text-cyan-brand">
                        AI Teacher Dr. Maya
                      </div>
                    </div>

                    {/* Animated audio wave rings */}
                    <div className="absolute -inset-2 rounded-full border border-cyan-electric/30 animate-ping opacity-30 pointer-events-none" />
                  </div>

                  {/* Speech status */}
                  <div className="text-center space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-deep/30 border border-cyan-electric/30 text-xs font-mono text-cyan-electric">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-electric animate-pulse" />
                      EXPLAINING WITH VOICE & VISUALS
                    </div>
                    <p className="text-xs text-space-300 italic pt-1 max-w-xs">
                      "Notice what happens to current when we increase resistance from 10Ω to 30Ω..."
                    </p>
                  </div>

                  {/* Audio Bars preview */}
                  <div className="flex items-center justify-center gap-1 h-6">
                    {[40, 70, 90, 50, 80, 100, 60, 45, 75, 55].map((h, i) => (
                      <div
                        key={i}
                        style={{ height: `${h}%` }}
                        className="w-1 rounded-full bg-gradient-to-t from-cyan-deep to-cyan-electric animate-wave-bar"
                      />
                    ))}
                  </div>

                </div>

                {/* Right: Subject-Aware Canvas & Floating Teaching Signals */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                  
                  {/* Top: Signal Flow Banner */}
                  <div className="p-3.5 rounded-xl bg-space-900/90 border border-space-700/80">
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="text-space-400">INTELLIGENT TEACHING FLOW</span>
                      <span className="text-cyan-brand font-bold">100% REAL-TIME ADAPTIVE</span>
                    </div>
                    
                    {/* Animated Signal Flow Diagram */}
                    <div className="flex items-center justify-between gap-1 text-[11px] font-mono overflow-x-auto py-1">
                      <span className="px-2 py-1 rounded bg-space-800 text-slate-200 border border-space-700">Student</span>
                      <span className="text-cyan-electric">→</span>
                      <span className="px-2 py-1 rounded bg-cyan-electric/20 text-cyan-electric font-semibold border border-cyan-electric/30">AI Teacher</span>
                      <span className="text-cyan-electric">→</span>
                      <span className="px-2 py-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-700">Understanding</span>
                      <span className="text-amber-400">→</span>
                      <span className="px-2 py-1 rounded bg-amber-950 text-amber-300 font-semibold border border-amber-700">Adaptation</span>
                      <span className="text-emerald-400">→</span>
                      <span className="px-2 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">Mastery</span>
                    </div>
                  </div>

                  {/* Middle: Floating Interactive Canvas Miniature */}
                  <div className="p-4 rounded-xl bg-space-900/90 border border-space-700/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-cyan-electric" />
                        <span className="text-xs font-semibold text-white">Live Ohm's Law Circuit Canvas</span>
                      </div>
                      <span className="text-[10px] font-mono text-space-400">I = V / R = 1.20 A</span>
                    </div>

                    <div className="h-20 rounded-lg bg-space-950 border border-space-800 p-2 flex items-center justify-around relative">
                      <div className="text-center">
                        <span className="text-[10px] font-mono text-space-400">Voltage (V)</span>
                        <div className="text-xs font-bold font-mono text-cyan-electric">12 Volts</div>
                      </div>
                      <div className="text-space-600 font-bold font-mono text-sm">÷</div>
                      <div className="text-center">
                        <span className="text-[10px] font-mono text-space-400">Resistance (R)</span>
                        <div className="text-xs font-bold font-mono text-amber-400">10 Ohms</div>
                      </div>
                      <div className="text-space-600 font-bold font-mono text-sm">=</div>
                      <div className="text-center">
                        <span className="text-[10px] font-mono text-space-400">Current (I)</span>
                        <div className="text-xs font-bold font-mono text-teach-emerald">1.20 Amps</div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Floating Signal Tags */}
                  <div className="flex flex-wrap gap-2">
                    {signals.map(s => (
                      <span
                        key={s.id}
                        className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold border ${s.color}`}
                      >
                        {s.label}
                      </span>
                    ))}
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
