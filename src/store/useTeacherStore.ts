import { useState, useEffect } from 'react';
import { TeacherPresenceState, TeacherAvatarExpression } from '../types/teacher';
import { TeachingLanguage } from '../types/lesson';
import { speechService } from '../services/speechService';

export interface TeacherStoreState {
  presence: TeacherPresenceState;
  expression: TeacherAvatarExpression;
  language: TeachingLanguage;
  isSpeaking: boolean;
  isMuted: boolean;
  currentSubtitle: string;
  activeWordIndex: number;
  speechAudioLevels: number[];
}

// Simple pub-sub store without external dependency bloat
let state: TeacherStoreState = {
  presence: 'IDLE',
  expression: 'neutral',
  language: 'hinglish',
  isSpeaking: false,
  isMuted: false,
  currentSubtitle: '',
  activeWordIndex: -1,
  speechAudioLevels: [30, 45, 60, 40, 80, 50, 70, 40]
};

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach(l => l());
}

export const teacherStore = {
  getState: () => state,
  
  setPresence: (presence: TeacherPresenceState, expression?: TeacherAvatarExpression) => {
    state = {
      ...state,
      presence,
      expression: expression || (presence === 'EXPLAINING' ? 'speaking' : presence === 'CHECKING' ? 'inquiring' : presence === 'ADAPTING' ? 'concerned' : presence === 'CELEBRATING' ? 'delighted' : 'neutral')
    };
    notify();
  },

  setLanguage: (lang: TeachingLanguage) => {
    state = { ...state, language: lang };
    notify();
  },

  setMuted: (muted: boolean) => {
    state = { ...state, isMuted: muted };
    speechService.setMuted(muted);
    notify();
  },

  speakText: (
    text: string, 
    onEnd?: () => void,
    expression: TeacherAvatarExpression = 'speaking'
  ) => {
    state = {
      ...state,
      isSpeaking: true,
      currentSubtitle: text,
      activeWordIndex: 0,
      expression
    };
    notify();

    speechService.speak(
      text,
      state.language,
      (word, index) => {
        state = { ...state, activeWordIndex: index };
        notify();
      },
      () => {
        state = {
          ...state,
          isSpeaking: false,
          activeWordIndex: -1,
          expression: 'neutral'
        };
        notify();
        if (onEnd) onEnd();
      }
    );
  },

  stopSpeaking: () => {
    speechService.stop();
    state = {
      ...state,
      isSpeaking: false,
      activeWordIndex: -1,
      expression: 'neutral'
    };
    notify();
  },

  setSubtitle: (sub: string) => {
    state = { ...state, currentSubtitle: sub };
    notify();
  }
};

export function useTeacher() {
  const [storeState, setStoreState] = useState<TeacherStoreState>(teacherStore.getState());

  useEffect(() => {
    const listener = () => setStoreState(teacherStore.getState());
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return {
    ...storeState,
    setPresence: teacherStore.setPresence,
    setLanguage: teacherStore.setLanguage,
    setMuted: teacherStore.setMuted,
    speakText: teacherStore.speakText,
    stopSpeaking: teacherStore.stopSpeaking,
    setSubtitle: teacherStore.setSubtitle
  };
}
