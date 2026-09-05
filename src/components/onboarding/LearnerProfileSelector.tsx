import React from 'react';
import { LearnerProfile, LearnerLevel, TeachingLanguage, AvailableTime, LearningGoal, LearningStyle } from '../../types/lesson';
import { Clock, Globe, Target, Brain, Gauge } from 'lucide-react';

interface LearnerProfileSelectorProps {
  profile: LearnerProfile;
  onChange: (updated: Partial<LearnerProfile>) => void;
}

export const LearnerProfileSelector: React.FC<LearnerProfileSelectorProps> = ({
  profile,
  onChange
}) => {
  const levels: { id: LearnerLevel; label: string; desc: string }[] = [
    { id: 'beginner', label: 'Beginner', desc: 'No prior background, focus on intuition' },
    { id: 'intermediate', label: 'Intermediate', desc: 'Know basics, build formula application' },
    { id: 'advanced', label: 'Advanced', desc: 'Deep derivations & edge-case mastery' }
  ];

  const languages: { id: TeachingLanguage; label: string; sub: string }[] = [
    { id: 'en', label: 'English', sub: 'Global standard' },
    { id: 'hi', label: 'हिंदी (Hindi)', sub: 'शुद्ध हिंदी उच्चारण' },
    { id: 'hinglish', label: 'Hinglish', sub: 'Intuitive bilingual flow' }
  ];

  const timeOptions: { id: AvailableTime; label: string; note: string }[] = [
    { id: '5min', label: '5 min', note: 'Sprint • High Yield' },
    { id: '20min', label: '20 min', note: 'Standard Deep Lesson' },
    { id: '60min', label: '60 min', note: 'Comprehensive Mastery' }
  ];

  const goals: { id: LearningGoal; label: string }[] = [
    { id: 'understand', label: 'Understand Concepts' },
    { id: 'exam_prep', label: 'Prepare for Exam' },
    { id: 'interview_prep', label: 'Interview Prep' },
    { id: 'practice', label: 'Practice Problems' },
    { id: 'revise', label: 'Quick Revision' },
    { id: 'deep_dive', label: 'Deep Dive' }
  ];

  const styles: { id: LearningStyle; label: string }[] = [
    { id: 'visual_explanation', label: 'Visual & Interactive Canvas' },
    { id: 'simple_examples', label: 'Real-World Analogies' },
    { id: 'step_by_step', label: 'Step-by-Step Derivation' },
    { id: 'socratic', label: 'Socratic Diagnostic' },
    { id: 'technical', label: 'Rigorous Technical' }
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. Level */}
      <div className="space-y-2">
        <label className="text-xs font-mono font-semibold uppercase text-space-300 flex items-center gap-1.5">
          <Gauge className="w-3.5 h-3.5 text-cyan-electric" />
          1. Your Current Level
        </label>
        <div className="grid grid-cols-3 gap-2">
          {levels.map((lvl) => (
            <button
              key={lvl.id}
              type="button"
              onClick={() => onChange({ level: lvl.id })}
              className={`p-3 rounded-xl border text-left transition-all ${
                profile.level === lvl.id
                  ? 'bg-cyan-electric/15 border-cyan-electric text-white shadow-cyan-sm'
                  : 'bg-space-900 border-space-800 text-space-400 hover:text-slate-200 hover:border-space-700'
              }`}
            >
              <div className="font-bold text-xs capitalize">{lvl.label}</div>
              <div className="text-[10px] text-space-400 mt-0.5 leading-tight">{lvl.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Teaching Language */}
      <div className="space-y-2">
        <label className="text-xs font-mono font-semibold uppercase text-space-300 flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-teach-accent" />
          2. Teaching Voice & Language
        </label>
        <div className="grid grid-cols-3 gap-2">
          {languages.map((lang) => (
            <button
              key={lang.id}
              type="button"
              onClick={() => onChange({ language: lang.id })}
              className={`p-3 rounded-xl border text-left transition-all ${
                profile.language === lang.id
                  ? 'bg-teach-accent/15 border-teach-accent text-white shadow-sm'
                  : 'bg-space-900 border-space-800 text-space-400 hover:text-slate-200 hover:border-space-700'
              }`}
            >
              <div className="font-bold text-xs">{lang.label}</div>
              <div className="text-[10px] text-space-400 mt-0.5">{lang.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Available Time */}
      <div className="space-y-2">
        <label className="text-xs font-mono font-semibold uppercase text-space-300 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          3. Available Time Budget
        </label>
        <div className="grid grid-cols-3 gap-2">
          {timeOptions.map((time) => (
            <button
              key={time.id}
              type="button"
              onClick={() => onChange({ timeAvailable: time.id })}
              className={`p-3 rounded-xl border text-center transition-all ${
                profile.timeAvailable === time.id
                  ? 'bg-amber-500/15 border-amber-400 text-white shadow-sm'
                  : 'bg-space-900 border-space-800 text-space-400 hover:text-slate-200 hover:border-space-700'
              }`}
            >
              <div className="font-bold text-xs">{time.label}</div>
              <div className="text-[10px] text-space-400 mt-0.5">{time.note}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Goal & Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        <div className="space-y-2">
          <label className="text-xs font-mono font-semibold uppercase text-space-300 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-teach-indigo" />
            4. Learning Goal
          </label>
          <div className="space-y-1.5">
            {goals.slice(0, 3).map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => onChange({ goal: g.id })}
                className={`w-full p-2.5 rounded-lg border text-left text-xs transition-all ${
                  profile.goal === g.id
                    ? 'bg-indigo-950/60 border-indigo-500 text-white font-semibold'
                    : 'bg-space-900 border-space-800 text-space-400 hover:text-slate-200'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-mono font-semibold uppercase text-space-300 flex items-center gap-1.5">
            <Brain className="w-3.5 h-3.5 text-cyan-brand" />
            5. Pedagogical Style
          </label>
          <div className="space-y-1.5">
            {styles.slice(0, 3).map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onChange({ style: s.id })}
                className={`w-full p-2.5 rounded-lg border text-left text-xs transition-all ${
                  profile.style === s.id
                    ? 'bg-cyan-950/60 border-cyan-500 text-white font-semibold'
                    : 'bg-space-900 border-space-800 text-space-400 hover:text-slate-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
