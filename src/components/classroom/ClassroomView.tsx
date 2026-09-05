import React, { useEffect } from 'react';
import { useLesson } from '../../store/useLessonStore';
import { useTeacher } from '../../store/useTeacherStore';
import { TeacherVideoAvatar } from './TeacherVideoAvatar';
import { SubtitleDisplay } from './SubtitleDisplay';
import { TeachingCanvas } from './TeachingCanvas';
import { LessonTimelineRail } from './LessonTimelineRail';
import { RagGroundingDrawer } from './RagGroundingDrawer';
import { ArrowLeft, ArrowRight, Play, RotateCcw, HelpCircle, Sparkles, BookOpen } from 'lucide-react';

export const ClassroomView: React.FC = () => {
  const { 
    lessonPlan, 
    currentSectionIndex, 
    nextSection, 
    prevSection, 
    setView 
  } = useLesson();
  const { speakText, language, setPresence } = useTeacher();

  const currentSection = lessonPlan.sections[currentSectionIndex] || lessonPlan.sections[0];

  useEffect(() => {
    setPresence('EXPLAINING');
    const script = currentSection.speechScript[language] || currentSection.speechScript.en;
    speakText(script);
  }, [currentSectionIndex, language]);

  const handleReplayExplanation = () => {
    const script = currentSection.speechScript[language] || currentSection.speechScript.en;
    speakText(script);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] py-6 px-4 sm:px-6 max-w-7xl mx-auto space-y-6">
      
      {/* Top Banner with Lesson Topic and Progression */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-space-900 border border-space-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-electric/15 text-cyan-electric border border-cyan-electric/30 uppercase">
              {lessonPlan.topicCategory} • Class 10
            </span>
            <span className="text-xs font-mono text-space-400">
              NCERT Chapter 12 Grounded
            </span>
          </div>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight mt-1">
            {lessonPlan.topicTitle}
          </h2>
        </div>

        {/* Section Action Navigation */}
        <div className="flex items-center gap-2">
          
          <button
            onClick={handleReplayExplanation}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-space-850 hover:bg-space-800 text-xs font-mono text-space-300 border border-space-700 hover:text-white transition-all"
            title="Replay Teacher's Spoken Explanation"
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-electric" />
            <span className="hidden sm:inline">Replay</span>
          </button>

          <button
            onClick={prevSection}
            disabled={currentSectionIndex === 0}
            className="p-2 rounded-xl bg-space-850 hover:bg-space-800 disabled:opacity-40 disabled:pointer-events-none text-space-300 border border-space-700 transition-all"
            title="Previous Section"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <button
            onClick={nextSection}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-electric to-teach-accent text-space-950 font-bold text-xs shadow-cyan-sm hover:opacity-95 transition-all"
          >
            <span>{currentSectionIndex < lessonPlan.sections.length - 1 ? 'Next Section' : 'Understanding Check'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>
      </div>

      {/* Main Grid: Left Column (Teacher Video & Subtitles) + Right Column (Canvas & Timeline) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Teacher Video & Subtitles (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <TeacherVideoAvatar />
          <SubtitleDisplay />
        </div>

        {/* Right Column: Interactive Teaching Canvas & Timeline (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <TeachingCanvas />
          <LessonTimelineRail />
        </div>

      </div>

      {/* Slide-over RAG citation drawer */}
      <RagGroundingDrawer />

    </div>
  );
};
