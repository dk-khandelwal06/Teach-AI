import { useState, useEffect } from 'react';
import { lessonStore, AppView } from './useLessonStore';
import { teacherStore } from './useTeacherStore';

export interface DemoStep {
  stepNumber: string;
  id: string;
  name: string;
  targetView: AppView;
  description: string;
}

export const DEMO_STAGES: DemoStep[] = [
  {
    stepNumber: '01',
    id: 'input',
    name: 'INPUT',
    targetView: 'onboarding',
    description: 'Learner profile & RAG knowledge source ingestion'
  },
  {
    stepNumber: '02',
    id: 'plan',
    name: 'PLAN',
    targetView: 'planning',
    description: 'AI cognitive mapping & time-budgeted curriculum generation'
  },
  {
    stepNumber: '03',
    id: 'teach',
    name: 'TEACH',
    targetView: 'classroom',
    description: 'Human-like teacher video avatar with live interactive circuit canvas'
  },
  {
    stepNumber: '04',
    id: 'check',
    name: 'CHECK',
    targetView: 'check',
    description: 'Interactive question checkpoint diagnosing understanding'
  },
  {
    stepNumber: '05',
    id: 'adapt',
    name: 'ADAPT',
    targetView: 'misconception',
    description: 'Misconception detected: Shifts to Hydraulic Analogy & re-tests'
  },
  {
    stepNumber: '06',
    id: 'assess',
    name: 'ASSESS',
    targetView: 'assessment',
    description: 'Multimodal 5-question final mastery evaluation'
  },
  {
    stepNumber: '07',
    id: 'report',
    name: 'REPORT',
    targetView: 'report',
    description: 'Qualitative teacher insights, mastery radar & recommended next step'
  }
];

export interface DemoStoreState {
  isAutoPlaying: boolean;
  currentStepIndex: number;
  isJuryBarVisible: boolean;
}

let demoState: DemoStoreState = {
  isAutoPlaying: false,
  currentStepIndex: 0,
  isJuryBarVisible: true
};

let autoPlayTimer: any = null;
const demoListeners = new Set<() => void>();

function notifyDemo() {
  demoListeners.forEach(l => l());
}

export const demoStore = {
  getState: () => demoState,

  jumpToStep: (index: number) => {
    if (index >= 0 && index < DEMO_STAGES.length) {
      demoState = { ...demoState, currentStepIndex: index, isAutoPlaying: false };
      if (autoPlayTimer) clearInterval(autoPlayTimer);

      const target = DEMO_STAGES[index];
      lessonStore.setView(target.targetView);

      // Trigger suitable speech/presence for jury demo
      if (target.id === 'plan') {
        teacherStore.setPresence('PLANNING');
      } else if (target.id === 'teach') {
        teacherStore.setPresence('EXPLAINING');
      } else if (target.id === 'check') {
        teacherStore.setPresence('CHECKING');
      } else if (target.id === 'adapt') {
        teacherStore.setPresence('ADAPTING');
        lessonStore.triggerMisconception();
      } else if (target.id === 'assess') {
        teacherStore.setPresence('CHECKING');
      } else if (target.id === 'report') {
        teacherStore.setPresence('CELEBRATING');
        lessonStore.finalizeAssessment();
      }

      notifyDemo();
    }
  },

  startAutoDemo: () => {
    if (autoPlayTimer) clearInterval(autoPlayTimer);

    demoState = { ...demoState, isAutoPlaying: true, currentStepIndex: 0 };
    lessonStore.setView(DEMO_STAGES[0].targetView);
    notifyDemo();

    let step = 0;
    autoPlayTimer = setInterval(() => {
      step++;
      if (step < DEMO_STAGES.length) {
        demoStore.jumpToStep(step);
      } else {
        demoStore.stopAutoDemo();
      }
    }, 8500); // 8.5 seconds per stage for guided walkthrough
  },

  stopAutoDemo: () => {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
    demoState = { ...demoState, isAutoPlaying: false };
    notifyDemo();
  },

  toggleJuryBar: () => {
    demoState = { ...demoState, isJuryBarVisible: !demoState.isJuryBarVisible };
    notifyDemo();
  }
};

export function useDemo() {
  const [storeState, setStoreState] = useState<DemoStoreState>(demoStore.getState());

  useEffect(() => {
    const listener = () => setStoreState(demoStore.getState());
    demoListeners.add(listener);
    return () => {
      demoListeners.delete(listener);
    };
  }, []);

  return {
    ...storeState,
    stages: DEMO_STAGES,
    jumpToStep: demoStore.jumpToStep,
    startAutoDemo: demoStore.startAutoDemo,
    stopAutoDemo: demoStore.stopAutoDemo,
    toggleJuryBar: demoStore.toggleJuryBar
  };
}
