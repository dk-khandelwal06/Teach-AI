export type TeacherPresenceState = 
  | 'IDLE'
  | 'LISTENING'
  | 'PLANNING'
  | 'EXPLAINING'
  | 'CHECKING'
  | 'DIAGNOSING'
  | 'ADAPTING'
  | 'CELEBRATING'
  | 'THINKING';

export type TeacherAvatarExpression = 
  | 'neutral'
  | 'speaking'
  | 'explaining'
  | 'inquiring'
  | 'concerned'
  | 'encouraging'
  | 'delighted'
  | 'analyzing';

export interface TeacherState {
  presence: TeacherPresenceState;
  expression: TeacherAvatarExpression;
  isSpeaking: boolean;
  speechRate: number;
  pitch: number;
  volume: number;
  isMuted: boolean;
  currentSubtitle: string;
  activeWordIndex: number;
  speechQueue: string[];
  audioVisualizerData: number[];
  selectedVoiceName?: string;
}
