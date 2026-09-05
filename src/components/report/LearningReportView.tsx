import React, { useEffect, useState } from 'react';
import { useLesson } from '../../store/useLessonStore';
import { useTeacher } from '../../store/useTeacherStore';
import { MasteryRadarChart } from './MasteryRadarChart';
import { 
  Sparkles, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Brain, 
  RotateCcw, 
  BookOpen, 
  Download, 
  Share2,
  FileCheck,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const LearningReportView: React.FC = () => {
  const { learningReport, resetLesson, setView, lessonPlan } = useLesson();
  const { speakText, language, setPresence } = useTeacher();
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState<boolean>(false);
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  const report = learningReport || {
    overallScorePercentage: 88,
    totalQuestions: 5,
    correctAnswersCount: 4,
    understandingConfidence: 88,
    strongConcepts: [
      { name: 'Voltage as Electrical Pressure', accuracy: 100, description: 'Solid physical grasp of potential difference driving charge flow.' },
      { name: 'Current (Rate of Electron Flow)', accuracy: 100, description: 'Solid understanding of charge motion per unit time.' }
    ],
    weakConcepts: [
      { name: 'Resistance Formula Scaling (R = ρL/A)', accuracy: 60, description: 'Area vs length proportional scaling needs 2 practice problems.' }
    ],
    misconceptionsEncountered: [
      {
        name: 'Direct Proportionality Misconception (I vs R)',
        wasResolved: true,
        initialError: 'Selected that Current increases when Resistance increases.',
        clarificationGiven: 'Adapted to Hydraulic Water-Pipe Model and proved I = V/R inverse relationship.'
      }
    ],
    teacherQualitativeFeedback: {
      en: "You have a strong intuitive grasp of electrical potential and current flow. You initially had a common misconception confusing resistance with a driving force, but you quickly mastered the inverse relationship after our water-pipe analogy. Great adaptive progress!",
      hi: "विद्युत विभव और धारा के प्रवाह को लेकर आपकी समझ बहुत अच्छी है। शुरुआत में रेजिस्टेंस को लेकर एक सामान्य गलतफहमी थी, लेकिन पानी के पाइप वाले उदाहरण के बाद आपने व्युत्क्रम संबंध को पूरी तरह समझ लिया। बहुत बढ़िया सुधार!",
      hinglish: "Aapka electrical potential aur current ka intuition kaafi strong hai. Initially resistance ko leke ek common confusion tha ki current badhega, lekin water-pipe analogy ke baad aapne inverse relationship ko accurately grasp kar liya. Outstanding learning curve!"
    },
    recommendedNextAction: {
      en: "Revise Ohm's Law formula scaling with area changes and solve 2 practical circuit problems.",
      hi: "तार के क्षेत्रफल और लंबाई बदलने पर प्रतिरोध के प्रभाव को दोहराएं और 2 अभ्यास प्रश्न हल करें।",
      hinglish: "Ohm's Law formula scaling (R = ρL/A) revise kijiye aur 2 practical circuit problems solve kijiye."
    },
    nextRecommendedLesson: {
      title: "Electrical Power & Joule's Heating (P = VI = I²R)",
      category: "Physics • Class 10 Chapter 12.7",
      estimatedMinutes: 6,
      prerequisiteNote: "Built directly upon Ohm's Law (V = IR) and resistance dissipation."
    }
  };

  useEffect(() => {
    setPresence('CELEBRATING', 'delighted');
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });

    const feedback = report.teacherQualitativeFeedback[language] || report.teacherQualitativeFeedback.en;
    speakText(`Here is what your teacher noticed: ${feedback}`);
  }, [language]);

  const feedbackText = report.teacherQualitativeFeedback[language] || report.teacherQualitativeFeedback.en;
  const nextActionText = report.recommendedNextAction[language] || report.recommendedNextAction.en;

  const handleShareOrCopy = () => {
    navigator.clipboard.writeText(`I just completed "${lessonPlan.topicTitle}" on TeachAI with an understanding score of ${report.overallScorePercentage}%! #TeachAI #BharatAcademix`);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] py-8 px-4 sm:px-6 max-w-6xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Top Heading & Badge */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-space-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-teach-emerald/20 text-teach-emerald border border-teach-emerald/40 uppercase">
              LESSON COMPLETE • ADAPTIVE REPORT
            </span>
            <span className="text-xs font-mono text-space-400">
              NCERT Class 10 Physics Grounded
            </span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight mt-1">
            Here's what your teacher noticed.
          </h2>
        </div>

        {/* Top Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCertificateModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-space-850 hover:bg-space-800 text-xs font-mono text-cyan-electric border border-cyan-electric/30 shadow-sm transition-all"
          >
            <Award className="w-3.5 h-3.5" />
            <span>View Certificate</span>
          </button>

          <button
            onClick={handleShareOrCopy}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-space-850 hover:bg-space-800 text-xs font-mono text-space-300 border border-space-700 transition-all"
          >
            {hasCopied ? <Check className="w-3.5 h-3.5 text-teach-emerald" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{hasCopied ? 'Copied Link!' : 'Share Summary'}</span>
          </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Column: Overall Understanding Score & Radar (5 cols) */}
        <div className="md:col-span-5 space-y-6">
          
          {/* Main Score Circular Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-space-900 to-space-950 border border-cyan-electric/30 shadow-card-dark text-center space-y-4">
            <span className="text-xs font-mono text-space-400 uppercase tracking-wider block">
              Overall Comprehension Mastery
            </span>

            {/* Circular Gauge */}
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="#1E294B"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="url(#reportGrad)"
                  strokeWidth="8"
                  strokeDasharray="264"
                  strokeDashoffset={264 - (264 * report.overallScorePercentage) / 100}
                  strokeLinecap="round"
                  fill="none"
                />
                <defs>
                  <linearGradient id="reportGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00F2FE" />
                    <stop offset="100%" stopColor="#0AE4BA" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display font-extrabold text-3xl text-white">
                  {report.overallScorePercentage}%
                </span>
                <span className="text-[10px] font-mono text-teach-emerald font-semibold uppercase">
                  Mastery
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-space-800">
              <div className="p-2 rounded-xl bg-space-850">
                <span className="text-space-400 text-[10px]">CORRECT</span>
                <div className="font-bold text-white text-sm">{report.correctAnswersCount} / {report.totalQuestions}</div>
              </div>
              <div className="p-2 rounded-xl bg-space-850">
                <span className="text-space-400 text-[10px]">CONFIDENCE</span>
                <div className="font-bold text-cyan-brand text-sm">{report.understandingConfidence}%</div>
              </div>
            </div>
          </div>

          {/* Radar Chart */}
          <MasteryRadarChart score={report.overallScorePercentage} />

        </div>

        {/* Right Column: Teacher Qualitative Insight, Strong/Weak Breakdown & Next Steps (7 cols) */}
        <div className="md:col-span-7 space-y-6">
          
          {/* Teacher Qualitative Feedback Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-tr from-space-900 via-space-850 to-space-900 border border-cyan-electric/30 shadow-card-dark space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-electric font-semibold uppercase">
              <Brain className="w-4 h-4" />
              <span>Teacher Dr. Maya's Qualitative Insight</span>
            </div>

            <blockquote className="text-sm sm:text-base text-slate-100 italic leading-relaxed pl-3 border-l-2 border-cyan-brand">
              "{feedbackText}"
            </blockquote>
          </div>

          {/* Concepts Breakdown (Strong vs Needs Practice) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Strong Concepts */}
            <div className="p-4 rounded-2xl bg-space-950 border border-emerald-900/40 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-teach-emerald uppercase">
                <CheckCircle2 className="w-4 h-4" />
                <span>STRONG MASTERY</span>
              </div>
              <ul className="space-y-1.5 text-xs text-space-300">
                {report.strongConcepts.map((c) => (
                  <li key={c.name} className="flex items-start gap-1.5">
                    <span className="text-teach-emerald font-bold">✓</span>
                    <span>{c.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Needs Practice */}
            <div className="p-4 rounded-2xl bg-space-950 border border-amber-900/40 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase">
                <AlertTriangle className="w-4 h-4" />
                <span>NEEDS REINFORCEMENT</span>
              </div>
              <ul className="space-y-1.5 text-xs text-space-300">
                {report.weakConcepts.map((c) => (
                  <li key={c.name} className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold">△</span>
                    <span>{c.name}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Misconception Resolved Checklist */}
          {report.misconceptionsEncountered.length > 0 && (
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-emerald-300 uppercase flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-teach-emerald" />
                  MISCONCEPTION RESOLUTION LOG
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-teach-emerald text-space-950 font-bold">
                  RESOLVED ✓
                </span>
              </div>

              {report.misconceptionsEncountered.map((m) => (
                <div key={m.name} className="text-xs text-space-300 space-y-1 pt-1">
                  <div className="font-semibold text-white">• {m.name}</div>
                  <p className="text-[11px] text-space-400 pl-3">
                    Adaptive clarification: {m.clarificationGiven}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Recommended Next Step & Next Lesson */}
          <div className="p-5 rounded-2xl bg-space-900 border border-space-800 space-y-3">
            <span className="text-xs font-mono text-cyan-brand uppercase tracking-wider block">
              YOUR PERSONALIZED NEXT STEP
            </span>
            <p className="text-xs sm:text-sm text-space-200 font-medium">
              {nextActionText}
            </p>

            <div className="pt-3 border-t border-space-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-space-400 uppercase">Next Suggested Module:</span>
                <h4 className="font-bold text-xs sm:text-sm text-white">
                  {report.nextRecommendedLesson.title}
                </h4>
              </div>

              <button
                onClick={() => resetLesson()}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-electric to-teach-accent text-space-950 font-bold text-xs shadow-cyan-sm hover:opacity-95 transition-all flex items-center gap-1.5"
              >
                <span>Practice Again</span>
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Certificate Modal */}
      {isCertificateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-space-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-xl rounded-3xl bg-gradient-to-b from-space-900 to-space-950 border-2 border-cyan-electric/40 p-8 shadow-2xl space-y-6 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-electric/20 border border-cyan-electric/40 flex items-center justify-center text-cyan-electric shadow-cyan-sm">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-brand">
                Certificate of Adaptive Mastery
              </span>
              <h3 className="font-display font-extrabold text-2xl text-white">
                TeachAI Verified Learning
              </h3>
            </div>

            <p className="text-xs text-space-300 max-w-md mx-auto leading-relaxed">
              This certifies that <strong className="text-white">Aarav Sharma</strong> has successfully completed the adaptive 1-on-1 module on <strong className="text-cyan-electric">Ohm's Law & Circuit Intuition</strong> with verified misconception resolution and an assessment mastery score of <strong className="text-teach-emerald">88%</strong>.
            </p>

            <div className="p-3 rounded-xl bg-space-850 border border-space-750 inline-flex items-center gap-3 text-xs font-mono text-space-300">
              <span>Date: September 5, 2026</span>
              <span>•</span>
              <span>Issuer: Bharat Academix Hackathon</span>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsCertificateModalOpen(false)}
                className="w-full py-3 rounded-xl bg-cyan-electric text-space-950 font-bold text-xs shadow-cyan-sm"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
