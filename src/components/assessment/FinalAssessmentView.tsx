import React, { useState, useEffect } from 'react';
import { useLesson } from '../../store/useLessonStore';
import { useTeacher } from '../../store/useTeacherStore';
import { demoAssessmentQuestions } from '../../data/demoLessons';
import { CheckCircle2, XCircle, ArrowRight, HelpCircle, Sparkles, BookOpen, Quote, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export const FinalAssessmentView: React.FC = () => {
  const { 
    recordAssessmentAnswer, 
    finalizeAssessment, 
    userResponses 
  } = useLesson();
  const { speakText, language, setPresence } = useTeacher();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);

  const questions = demoAssessmentQuestions;
  const currentQ = questions[currentQuestionIndex];

  useEffect(() => {
    setPresence('CHECKING', 'analyzing');
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);

    const prompt = currentQ.question[language] || currentQ.question.en;
    speakText(`Question ${currentQ.questionNumber} of 5: ${prompt}`);
  }, [currentQuestionIndex, language]);

  const handleSelectOption = (optId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionId(optId);
  };

  const handleCheckAnswer = () => {
    if (!selectedOptionId) return;
    setIsAnswerSubmitted(true);

    const chosenOpt = currentQ.options.find(o => o.id === selectedOptionId);
    const isCorrect = chosenOpt ? chosenOpt.isCorrect : false;

    recordAssessmentAnswer(currentQ.id, selectedOptionId, isCorrect);

    if (isCorrect) {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.8 }
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Completed all 5 questions
      finalizeAssessment();
    }
  };

  const qText = currentQ.question[language] || currentQ.question.en;
  const explanationText = currentQ.explanation[language] || currentQ.explanation.en;

  return (
    <div className="min-h-[calc(100vh-140px)] py-8 px-4 sm:px-6 flex items-center justify-center bg-mesh-gradient">
      <div className="w-full max-w-3xl rounded-3xl bg-space-900 border border-cyan-electric/30 p-6 sm:p-8 shadow-2xl shadow-cyan-electric/10 space-y-6 animate-fadeIn">
        
        {/* Assessment Header & Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-cyan-brand font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-cyan-electric" />
              Final Comprehensive Assessment
            </span>
            <span className="text-space-300 font-bold">
              Question {currentQ.questionNumber} of {questions.length}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-1.5">
            {questions.map((q, i) => (
              <div
                key={q.id}
                className={`h-2 flex-1 rounded-full transition-all ${
                  i < currentQuestionIndex
                    ? 'bg-teach-emerald'
                    : i === currentQuestionIndex
                    ? 'bg-cyan-electric ring-2 ring-cyan-electric/30'
                    : 'bg-space-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Question Card */}
        <div className="p-5 rounded-2xl bg-space-950 border border-space-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="px-2.5 py-0.5 rounded bg-space-850 text-cyan-electric border border-space-700">
              {currentQ.conceptTag}
            </span>
            <span className="text-space-400 capitalize">
              Difficulty: <strong className="text-white">{currentQ.difficulty}</strong>
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-semibold text-slate-100 leading-relaxed">
            {qText}
          </h3>

          {currentQ.formulaHint && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-space-900 border border-space-750 text-[11px] font-mono text-amber-400">
              Hint: {currentQ.formulaHint}
            </div>
          )}
        </div>

        {/* Options */}
        <div className="space-y-2.5">
          {currentQ.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            const optText = opt.text[language] || opt.text.en;

            let borderClasses = 'bg-space-950 border-space-800 text-space-300 hover:border-space-700 hover:text-white';
            if (isAnswerSubmitted) {
              if (opt.isCorrect) {
                borderClasses = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold';
              } else if (isSelected && !opt.isCorrect) {
                borderClasses = 'bg-rose-950/60 border-rose-500 text-rose-200';
              }
            } else if (isSelected) {
              borderClasses = 'bg-cyan-electric/15 border-cyan-electric text-white font-semibold shadow-cyan-sm';
            }

            return (
              <button
                key={opt.id}
                type="button"
                disabled={isAnswerSubmitted}
                onClick={() => handleSelectOption(opt.id)}
                className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between group ${borderClasses}`}
              >
                <span>{optText}</span>

                {isAnswerSubmitted && opt.isCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
                {isAnswerSubmitted && isSelected && !opt.isCorrect && (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Reveal (After submit) */}
        {isAnswerSubmitted && (
          <div className="p-4 rounded-2xl bg-space-950 border border-space-750 space-y-2 animate-fadeIn text-xs">
            <span className="font-mono text-[10px] text-cyan-brand uppercase tracking-wider block">
              Teacher's Rationale & Grounded Citation:
            </span>
            <p className="text-space-300 leading-relaxed">
              {explanationText}
            </p>
            {currentQ.groundedQuote && (
              <p className="text-[11px] font-mono text-space-400 italic pt-1 border-t border-space-800">
                "{currentQ.groundedQuote}"
              </p>
            )}
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-2">
          {!isAnswerSubmitted ? (
            <button
              onClick={handleCheckAnswer}
              disabled={!selectedOptionId}
              className="w-full py-4 rounded-xl bg-cyan-electric disabled:opacity-40 text-space-950 font-bold text-sm shadow-cyan-sm hover:opacity-95 transition-all cursor-pointer"
            >
              Verify Answer →
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-electric via-teach-accent to-cyan-electric bg-[length:200%_auto] text-space-950 font-bold text-sm shadow-cyan-glow flex items-center justify-center gap-2 hover:scale-[1.01] transition-all cursor-pointer"
            >
              <span>{currentQuestionIndex < questions.length - 1 ? 'Next Question →' : 'Generate Learning Report 🎉'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
