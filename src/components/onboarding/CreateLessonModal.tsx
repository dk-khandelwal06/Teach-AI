import React, { useState } from 'react';
import { useLesson } from '../../store/useLessonStore';
import { useTeacher } from '../../store/useTeacherStore';
import { MaterialUploadZone } from './MaterialUploadZone';
import { LearnerProfileSelector } from './LearnerProfileSelector';
import { samplePhysicsKnowledgeSource, sampleTopicsList } from '../../data/sampleRagSources';
import { KnowledgeSource } from '../../types/lesson';
import { Sparkles, ArrowRight, BookOpen, Search, ArrowLeft, Layers, Check } from 'lucide-react';

export const CreateLessonModal: React.FC = () => {
  const { 
    learnerProfile, 
    setLearnerProfile, 
    setKnowledgeSource, 
    knowledgeSource, 
    setView 
  } = useLesson();
  const { setLanguage } = useTeacher();

  const [inputMode, setInputMode] = useState<'upload' | 'topic'>('upload');
  const [topicQuery, setTopicQuery] = useState<string>("Ohm's Law & Circuit Intuition");
  const [activeStep, setActiveStep] = useState<number>(1); // 1: Knowledge/Topic, 2: Learner Profile

  const handleSourceSelected = (source: KnowledgeSource) => {
    setKnowledgeSource(source);
  };

  const handleBuildLesson = () => {
    setLanguage(learnerProfile.language);
    setView('planning');
  };

  return (
    <div className="min-h-[calc(100vh-140px)] py-10 px-4 sm:px-6 flex items-center justify-center bg-mesh-gradient">
      <div className="w-full max-w-2xl rounded-3xl bg-space-900 border border-cyan-electric/25 p-6 sm:p-8 shadow-2xl shadow-cyan-electric/10 space-y-8">
        
        {/* Header with Step Tracker */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-cyan-brand font-semibold uppercase tracking-wider">
              AI Classroom Onboarding
            </span>
            <span className="text-space-400">
              Step {activeStep} of 2
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className={`h-1.5 flex-1 rounded-full ${activeStep >= 1 ? 'bg-cyan-electric' : 'bg-space-800'}`} />
            <div className={`h-1.5 flex-1 rounded-full ${activeStep >= 2 ? 'bg-cyan-electric' : 'bg-space-800'}`} />
          </div>

          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            {activeStep === 1 ? "Let's choose what to learn." : "Tell me how you learn best."}
          </h2>
          <p className="text-xs sm:text-sm text-space-300">
            {activeStep === 1 
              ? "Upload notes/textbook chapters for grounded learning, or pick a high-yield curriculum topic."
              : "Your AI teacher customizes explanation speed, analogies, and language to match your goal."}
          </p>
        </div>

        {/* Step 1: Input Choice (Upload vs Topic Search) */}
        {activeStep === 1 && (
          <div className="space-y-6">
            
            {/* Mode Toggle */}
            <div className="grid grid-cols-2 p-1 rounded-xl bg-space-950 border border-space-800 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setInputMode('upload')}
                className={`py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all ${
                  inputMode === 'upload'
                    ? 'bg-space-850 text-cyan-electric border border-cyan-electric/30 shadow-sm'
                    : 'text-space-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Upload Material (RAG)</span>
              </button>

              <button
                type="button"
                onClick={() => setInputMode('topic')}
                className={`py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all ${
                  inputMode === 'topic'
                    ? 'bg-space-850 text-cyan-electric border border-cyan-electric/30 shadow-sm'
                    : 'text-space-400 hover:text-slate-200'
                }`}
              >
                <Search className="w-4 h-4" />
                <span>Teach me a Topic</span>
              </button>
            </div>

            {/* Upload Zone */}
            {inputMode === 'upload' ? (
              <MaterialUploadZone
                onSourceSelected={handleSourceSelected}
                selectedSource={knowledgeSource}
              />
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-semibold text-space-300">
                    Search or Enter Topic:
                  </label>
                  <input
                    type="text"
                    value={topicQuery}
                    onChange={(e) => setTopicQuery(e.target.value)}
                    placeholder="e.g. Ohm's Law, Calculus Derivatives, Photosynthesis..."
                    className="w-full px-4 py-3 rounded-xl bg-space-950 border border-space-700 text-white placeholder:text-space-500 text-sm focus:outline-none focus:border-cyan-electric focus:ring-1 focus:ring-cyan-electric"
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-space-400 uppercase">
                    Curated Benchmarks:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {sampleTopicsList.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setTopicQuery(item.title);
                          handleSourceSelected(samplePhysicsKnowledgeSource);
                        }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          topicQuery === item.title
                            ? 'bg-cyan-electric/10 border-cyan-electric text-white'
                            : 'bg-space-950 border-space-800 text-space-300 hover:border-space-700'
                        }`}
                      >
                        <div className="text-xs font-bold text-white">{item.title}</div>
                        <div className="text-[10px] text-cyan-brand font-mono">{item.subject} • {item.duration}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Next Button */}
            <button
              onClick={() => setActiveStep(2)}
              className="w-full py-3.5 rounded-xl bg-cyan-electric text-space-950 font-bold text-sm flex items-center justify-center gap-2 shadow-cyan-sm hover:opacity-95 transition-all"
            >
              <span>Next: Set Learner Profile</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        )}

        {/* Step 2: Learner Profile & Configuration */}
        {activeStep === 2 && (
          <div className="space-y-6">
            
            <LearnerProfileSelector
              profile={learnerProfile}
              onChange={(updated) => setLearnerProfile(updated)}
            />

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveStep(1)}
                className="px-4 py-3.5 rounded-xl bg-space-800 hover:bg-space-700 text-space-300 font-semibold text-xs border border-space-700 flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>

              <button
                type="button"
                onClick={handleBuildLesson}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-cyan-electric via-teach-accent to-cyan-electric bg-[length:200%_auto] text-space-950 font-bold text-sm flex items-center justify-center gap-2 shadow-cyan-glow hover:scale-[1.01] transition-all"
              >
                <Sparkles className="w-4 h-4 fill-current" />
                <span>Build My Lesson →</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
