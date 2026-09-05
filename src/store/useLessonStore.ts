import { useState, useEffect } from 'react';
import { LessonPlan, LearnerProfile, KnowledgeSource } from '../types/lesson';
import { AssessmentQuestion, UserAssessmentResponse, LearningReportData } from '../types/assessment';
import { ohmsLawLessonPlan, demoAssessmentQuestions } from '../data/demoLessons';
import { samplePhysicsKnowledgeSource } from '../data/sampleRagSources';
import { assessmentService } from '../services/assessmentService';

export type AppView = 
  | 'landing' 
  | 'onboarding' 
  | 'planning' 
  | 'classroom' 
  | 'check' 
  | 'misconception' 
  | 'retest' 
  | 'assessment' 
  | 'report';

export interface LessonStoreState {
  currentView: AppView;
  lessonPlan: LessonPlan;
  currentSectionIndex: number;
  activeCheckpointIndex: number;
  userResponses: UserAssessmentResponse[];
  misconceptionEncountered: boolean;
  misconceptionResolved: boolean;
  learnerProfile: LearnerProfile;
  knowledgeSource: KnowledgeSource;
  assessmentQuestions: AssessmentQuestion[];
  learningReport: LearningReportData | null;
  circuitVoltage: number;
  circuitResistance: number;
  isRAGDrawerOpen: boolean;
  isMemoryModalOpen: boolean;
  isCurriculumPathOpen: boolean;
}

let state: LessonStoreState = {
  currentView: 'landing',
  lessonPlan: ohmsLawLessonPlan,
  currentSectionIndex: 0,
  activeCheckpointIndex: 0,
  userResponses: [],
  misconceptionEncountered: false,
  misconceptionResolved: false,
  learnerProfile: ohmsLawLessonPlan.learnerProfile,
  knowledgeSource: samplePhysicsKnowledgeSource,
  assessmentQuestions: demoAssessmentQuestions,
  learningReport: null,
  circuitVoltage: 12,
  circuitResistance: 10,
  isRAGDrawerOpen: false,
  isMemoryModalOpen: false,
  isCurriculumPathOpen: false
};

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach(l => l());
}

export const lessonStore = {
  getState: () => state,

  setView: (view: AppView) => {
    state = { ...state, currentView: view };
    notify();
  },

  setLearnerProfile: (profile: Partial<LearnerProfile>) => {
    state = {
      ...state,
      learnerProfile: { ...state.learnerProfile, ...profile }
    };
    notify();
  },

  setKnowledgeSource: (source: KnowledgeSource) => {
    state = { ...state, knowledgeSource: source };
    notify();
  },

  setLessonPlan: (plan: LessonPlan) => {
    state = {
      ...state,
      lessonPlan: plan,
      currentSectionIndex: 0,
      activeCheckpointIndex: 0,
      misconceptionEncountered: false,
      misconceptionResolved: false,
      learningReport: null
    };
    notify();
  },

  goToSection: (index: number) => {
    if (index >= 0 && index < state.lessonPlan.sections.length) {
      state = {
        ...state,
        currentSectionIndex: index,
        currentView: 'classroom'
      };
      notify();
    }
  },

  nextSection: () => {
    if (state.currentSectionIndex < state.lessonPlan.sections.length - 1) {
      state = {
        ...state,
        currentSectionIndex: state.currentSectionIndex + 1,
        currentView: 'classroom'
      };
      notify();
    } else {
      // Go to check or assessment
      state = { ...state, currentView: 'check' };
      notify();
    }
  },

  prevSection: () => {
    if (state.currentSectionIndex > 0) {
      state = {
        ...state,
        currentSectionIndex: state.currentSectionIndex - 1,
        currentView: 'classroom'
      };
      notify();
    }
  },

  setCircuitParams: (voltage: number, resistance: number) => {
    state = {
      ...state,
      circuitVoltage: voltage,
      circuitResistance: resistance
    };
    notify();
  },

  triggerMisconception: () => {
    state = {
      ...state,
      misconceptionEncountered: true,
      currentView: 'misconception'
    };
    notify();
  },

  resolveMisconception: () => {
    state = {
      ...state,
      misconceptionResolved: true,
      currentView: 'assessment'
    };
    notify();
  },

  recordAssessmentAnswer: (questionId: string, optionId: string, isCorrect: boolean) => {
    const existingIdx = state.userResponses.findIndex(r => r.questionId === questionId);
    const newResponse: UserAssessmentResponse = {
      questionId,
      selectedOptionId: optionId,
      isCorrect,
      timeSpentSeconds: 12
    };

    let updated = [...state.userResponses];
    if (existingIdx >= 0) {
      updated[existingIdx] = newResponse;
    } else {
      updated.push(newResponse);
    }

    state = { ...state, userResponses: updated };
    notify();
  },

  finalizeAssessment: () => {
    const report = assessmentService.calculateReport(
      state.assessmentQuestions,
      state.userResponses,
      state.misconceptionEncountered,
      state.misconceptionResolved
    );
    state = {
      ...state,
      learningReport: report,
      currentView: 'report'
    };
    notify();
  },

  setRAGDrawerOpen: (open: boolean) => {
    state = { ...state, isRAGDrawerOpen: open };
    notify();
  },

  setMemoryModalOpen: (open: boolean) => {
    state = { ...state, isMemoryModalOpen: open };
    notify();
  },

  setCurriculumPathOpen: (open: boolean) => {
    state = { ...state, isCurriculumPathOpen: open };
    notify();
  },

  resetLesson: () => {
    state = {
      ...state,
      currentView: 'classroom',
      currentSectionIndex: 0,
      activeCheckpointIndex: 0,
      userResponses: [],
      misconceptionEncountered: false,
      misconceptionResolved: false,
      learningReport: null,
      circuitVoltage: 12,
      circuitResistance: 10
    };
    notify();
  }
};

export function useLesson() {
  const [storeState, setStoreState] = useState<LessonStoreState>(lessonStore.getState());

  useEffect(() => {
    const listener = () => setStoreState(lessonStore.getState());
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return {
    ...storeState,
    setView: lessonStore.setView,
    setLearnerProfile: lessonStore.setLearnerProfile,
    setKnowledgeSource: lessonStore.setKnowledgeSource,
    setLessonPlan: lessonStore.setLessonPlan,
    goToSection: lessonStore.goToSection,
    nextSection: lessonStore.nextSection,
    prevSection: lessonStore.prevSection,
    setCircuitParams: lessonStore.setCircuitParams,
    triggerMisconception: lessonStore.triggerMisconception,
    resolveMisconception: lessonStore.resolveMisconception,
    recordAssessmentAnswer: lessonStore.recordAssessmentAnswer,
    finalizeAssessment: lessonStore.finalizeAssessment,
    setRAGDrawerOpen: lessonStore.setRAGDrawerOpen,
    setMemoryModalOpen: lessonStore.setMemoryModalOpen,
    setCurriculumPathOpen: lessonStore.setCurriculumPathOpen,
    resetLesson: lessonStore.resetLesson
  };
}
