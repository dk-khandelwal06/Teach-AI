import React from 'react';
import { useLesson } from './store/useLessonStore';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { JuryBar } from './components/common/JuryBar';
import { StudentMemoryDrawer } from './components/common/StudentMemoryDrawer';
import { CurriculumPathDrawer } from './components/common/CurriculumPathDrawer';

// Landing Page Components
import { HeroSection } from './components/landing/HeroSection';
import { TeachingLoopVisualizer } from './components/landing/TeachingLoopVisualizer';
import { FeatureGrid } from './components/landing/FeatureGrid';

// Onboarding & Planning
import { CreateLessonModal } from './components/onboarding/CreateLessonModal';
import { AiThinkingVisualizer } from './components/planning/AiThinkingVisualizer';

// Classroom & Teaching Room
import { ClassroomView } from './components/classroom/ClassroomView';

// Interactive Checks & Misconception Engine
import { QuestionModal } from './components/interactive/QuestionModal';
import { MisconceptionAlertCard } from './components/interactive/MisconceptionAlertCard';

// Assessment & Report
import { FinalAssessmentView } from './components/assessment/FinalAssessmentView';
import { LearningReportView } from './components/report/LearningReportView';

export function App() {
  const { currentView } = useLesson();

  return (
    <div className="min-h-screen flex flex-col bg-space-950 text-slate-100 font-sans selection:bg-cyan-electric/20 selection:text-cyan-electric">
      
      {/* 1. Dedicated Hackathon Presentation Bar (For Judges) */}
      <JuryBar />

      {/* 2. Application Header */}
      <Header />

      {/* 3. Dynamic View Routing */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <>
            <HeroSection />
            <TeachingLoopVisualizer />
            <FeatureGrid />
          </>
        )}

        {currentView === 'onboarding' && <CreateLessonModal />}
        {currentView === 'planning' && <AiThinkingVisualizer />}
        {currentView === 'classroom' && <ClassroomView />}
        {currentView === 'check' && <QuestionModal />}
        {currentView === 'misconception' && <MisconceptionAlertCard />}
        {currentView === 'assessment' && <FinalAssessmentView />}
        {currentView === 'report' && <LearningReportView />}
      </main>

      {/* 4. Global Modals & Drawers */}
      <StudentMemoryDrawer />
      <CurriculumPathDrawer />

      {/* 5. Minimal Futuristic Footer */}
      <Footer />

    </div>
  );
}

export default App;
