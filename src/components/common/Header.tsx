import React from 'react';
import { useLesson } from '../../store/useLessonStore';
import { useTeacher } from '../../store/useTeacherStore';
import { uiTranslations } from '../../data/translations';
import { Volume2, VolumeX, Sparkles, User, BookOpen, Layers, Play } from 'lucide-react';
import { TeachingLanguage } from '../../types/lesson';

export const Header: React.FC = () => {
  const { 
    currentView, 
    setView, 
    learnerProfile, 
    setMemoryModalOpen, 
    setCurriculumPathOpen,
    setRAGDrawerOpen 
  } = useLesson();
  const { language, setLanguage, isMuted, setMuted, presence } = useTeacher();
  const t = uiTranslations[language] || uiTranslations.en;

  const handleLanguageChange = (lang: TeachingLanguage) => {
    setLanguage(lang);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-space-700/80 bg-space-950/80 backdrop-blur-xl px-4 sm:px-6 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo & Tagline */}
        <div 
          onClick={() => setView('landing')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-electric to-teach-accent p-[1px] shadow-cyan-sm transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-space-900 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-electric animate-pulse-subtle" />
            </div>
            <div className="absolute -inset-1 bg-cyan-electric/20 rounded-xl blur-sm -z-10 group-hover:bg-cyan-electric/30 transition-colors" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-cyan-electric transition-colors">
                Teach<span className="text-cyan-brand">AI</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-deep/30 text-cyan-electric border border-cyan-electric/30">
                v1.0 • HACKATHON 2026
              </span>
            </div>
            <p className="hidden md:block text-[11px] font-medium text-space-400 tracking-wide">
              {t.brandTagline}
            </p>
          </div>
        </div>

        {/* Center: Live Presence / Context (in Classroom or Assessment) */}
        {currentView !== 'landing' && currentView !== 'onboarding' && (
          <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 rounded-full bg-space-900/90 border border-space-700">
            <span className="flex h-2 w-2 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                presence === 'ADAPTING' ? 'bg-amber-400' : 'bg-cyan-electric'
              }`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${
                presence === 'ADAPTING' ? 'bg-amber-400' : 'bg-cyan-electric'
              }`} />
            </span>
            <span className="text-xs font-mono text-space-300">
              Topic: <strong className="text-slate-100">Ohm's Law</strong> • Class 10 Physics
            </span>
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Grounded Source Quick Button */}
          {currentView !== 'landing' && (
            <button
              onClick={() => setRAGDrawerOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-space-850 hover:bg-space-800 border border-space-700 text-xs text-space-300 hover:text-white transition-all"
              title="View NCERT Textbook citations"
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-brand" />
              <span className="hidden sm:inline font-mono text-[11px]">RAG Source</span>
            </button>
          )}

          {/* Curriculum Path Map */}
          {currentView !== 'landing' && (
            <button
              onClick={() => setCurriculumPathOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-space-850 hover:bg-space-800 border border-space-700 text-xs text-space-300 hover:text-white transition-all"
              title="View Curriculum Path"
            >
              <Layers className="w-3.5 h-3.5 text-teach-indigo" />
              <span className="hidden sm:inline font-mono text-[11px]">Curriculum</span>
            </button>
          )}

          {/* Student Memory Profile */}
          <button
            onClick={() => setMemoryModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-space-850 hover:bg-space-800 border border-space-700 text-xs text-space-300 hover:text-white transition-all"
            title="Learner Memory Profile"
          >
            <User className="w-3.5 h-3.5 text-cyan-electric" />
            <span className="hidden sm:inline font-medium text-slate-200">
              {learnerProfile.studentName || 'Learner'}
            </span>
          </button>

          {/* Language Selector */}
          <div className="flex items-center bg-space-900 p-0.5 rounded-lg border border-space-700 text-xs font-medium">
            <button
              onClick={() => handleLanguageChange('en')}
              className={`px-2 py-1 rounded-md transition-all ${
                language === 'en'
                  ? 'bg-cyan-electric/20 text-cyan-electric font-semibold'
                  : 'text-space-400 hover:text-slate-200'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => handleLanguageChange('hi')}
              className={`px-2 py-1 rounded-md transition-all ${
                language === 'hi'
                  ? 'bg-cyan-electric/20 text-cyan-electric font-semibold'
                  : 'text-space-400 hover:text-slate-200'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => handleLanguageChange('hinglish')}
              className={`px-2 py-1 rounded-md transition-all ${
                language === 'hinglish'
                  ? 'bg-cyan-electric/20 text-cyan-electric font-semibold'
                  : 'text-space-400 hover:text-slate-200'
              }`}
            >
              Hinglish
            </button>
          </div>

          {/* Audio Mute / Unmute */}
          <button
            onClick={() => setMuted(!isMuted)}
            className={`p-2 rounded-lg border transition-all ${
              isMuted
                ? 'bg-rose-950/40 border-rose-800/60 text-rose-400 hover:bg-rose-900/50'
                : 'bg-space-850 border-space-700 text-cyan-electric hover:bg-space-800 hover:border-cyan-electric/40'
            }`}
            title={isMuted ? 'Unmute AI Voice' : 'Mute AI Voice'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Primary Action if on Landing */}
          {currentView === 'landing' && (
            <button
              onClick={() => setView('onboarding')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-electric to-teach-accent text-space-950 font-semibold text-xs shadow-cyan-sm hover:opacity-95 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{t.startLearning}</span>
            </button>
          )}

        </div>
      </div>
    </header>
  );
};
