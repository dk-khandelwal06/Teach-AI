export type QuestionType = 'mcq' | 'calculation' | 'conceptual' | 'diagram' | 'true_false';

export interface AssessmentQuestion {
  id: string;
  questionNumber: number;
  type: QuestionType;
  conceptTag: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: {
    en: string;
    hi: string;
    hinglish: string;
  };
  options: {
    id: string;
    text: {
      en: string;
      hi: string;
      hinglish: string;
    };
    isCorrect: boolean;
  }[];
  explanation: {
    en: string;
    hi: string;
    hinglish: string;
  };
  groundedQuote?: string;
  formulaHint?: string;
}

export interface UserAssessmentResponse {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  timeSpentSeconds: number;
}

export interface LearningReportData {
  overallScorePercentage: number;
  totalQuestions: number;
  correctAnswersCount: number;
  understandingConfidence: number;
  strongConcepts: {
    name: string;
    accuracy: number;
    description: string;
  }[];
  weakConcepts: {
    name: string;
    accuracy: number;
    description: string;
  }[];
  misconceptionsEncountered: {
    name: string;
    wasResolved: boolean;
    initialError: string;
    clarificationGiven: string;
  }[];
  teacherQualitativeFeedback: {
    en: string;
    hi: string;
    hinglish: string;
  };
  recommendedNextAction: {
    en: string;
    hi: string;
    hinglish: string;
  };
  nextRecommendedLesson: {
    title: string;
    category: string;
    estimatedMinutes: number;
    prerequisiteNote: string;
  };
}
