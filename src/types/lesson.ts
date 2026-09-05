export type LearnerLevel = 'beginner' | 'intermediate' | 'advanced';
export type TeachingLanguage = 'en' | 'hi' | 'hinglish';
export type AvailableTime = '5min' | '20min' | '60min' | '7days';
export type LearningGoal = 
  | 'understand' 
  | 'exam_prep' 
  | 'interview_prep' 
  | 'practice' 
  | 'revise' 
  | 'deep_dive';

export type LearningStyle = 
  | 'simple_examples' 
  | 'visual_explanation' 
  | 'step_by_step' 
  | 'socratic' 
  | 'technical';

export interface LearnerProfile {
  level: LearnerLevel;
  language: TeachingLanguage;
  timeAvailable: AvailableTime;
  goal: LearningGoal;
  style: LearningStyle;
  studentName?: string;
}

export interface RagChunk {
  id: string;
  sectionTitle: string;
  pageNumber: number;
  content: string;
  keyFormulas?: string[];
  relevanceScore: number;
  diagramUrl?: string;
}

export interface KnowledgeSource {
  id: string;
  name: string;
  fileType: 'pdf' | 'docx' | 'notes' | 'topic' | 'textbook' | 'paper';
  fileSize: string;
  status: 'processing' | 'indexed' | 'ready';
  extractedConcepts: string[];
  ragChunks: RagChunk[];
  summary: string;
}

export type CanvasType = 
  | 'circuit_sim' 
  | 'water_pipe_analogy' 
  | 'math_graph' 
  | 'formula_breakdown' 
  | 'rag_grounding' 
  | 'code_execution';

export interface LessonSection {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  durationSec: number;
  conceptKey: string;
  canvasType: CanvasType;
  teachingObjective: string;
  speechScript: {
    en: string;
    hi: string;
    hinglish: string;
  };
  visualHighlights: string[];
  canvasData?: Record<string, any>;
  groundedChunkId?: string;
}

export interface MisconceptionDiagnosis {
  wrongAnswerId: string;
  diagnosedConcept: string;
  misconceptionLabel: string;
  explanationEn: string;
  explanationHi: string;
  explanationHinglish: string;
  shiftStrategy: string;
  adaptiveCanvas: CanvasType;
  adaptiveAnalogy: {
    title: string;
    analogyText: string;
    formulaHighlight: string;
    physicsParams: {
      voltage: number;
      resistance: number;
      current: number;
    };
  };
  retestQuestion: {
    id: string;
    question: string;
    questionHi: string;
    questionHinglish: string;
    options: {
      id: string;
      text: string;
      textHi: string;
      textHinglish: string;
      isCorrect: boolean;
      rationale: string;
    }[];
  };
}

export interface InteractiveCheck {
  id: string;
  sectionId: string;
  promptEn: string;
  promptHi: string;
  promptHinglish: string;
  conceptTarget: string;
  options: {
    id: string;
    label: string;
    textEn: string;
    textHi: string;
    textHinglish: string;
    isCorrect: boolean;
    isMisconceptionTrap?: boolean;
    trapDiagnosis?: MisconceptionDiagnosis;
  }[];
}

export interface LessonPlan {
  id: string;
  topicTitle: string;
  topicCategory: 'physics' | 'mathematics' | 'biology' | 'computer_science';
  learnerProfile: LearnerProfile;
  knowledgeSource: KnowledgeSource;
  estimatedMinutes: number;
  sections: LessonSection[];
  checkpoints: InteractiveCheck[];
  curriculumPath: {
    unit: string;
    steps: {
      id: string;
      title: string;
      status: 'completed' | 'current' | 'weak' | 'locked';
      score?: number;
    }[];
  };
}
