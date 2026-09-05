import React, { useState, useEffect } from 'react';
import { useLesson } from '../../store/useLessonStore';
import { useTeacher } from '../../store/useTeacherStore';
import { WaterPipeAnalogyCanvas } from '../classroom/WaterPipeAnalogyCanvas';
import { TeacherVideoAvatar } from '../classroom/TeacherVideoAvatar';
import { SubtitleDisplay } from '../classroom/SubtitleDisplay';
import { AlertTriangle, RefreshCw, Sparkles, CheckCircle2, ArrowRight, Brain, Gauge } from 'lucide-react';

export const MisconceptionAlertCard: React.FC = () => {
  const { resolveMisconception, setView } = useLesson();
  const { speakText, language, setPresence } = useTeacher();

  const [step, setStep] = useState<'diagnose' | 'retest'>('diagnose');
  const [selectedRetestOptionId, setSelectedRetestOptionId] = useState<string | null>(null);
  const [retestSubmitted, setRetestSubmitted] = useState<boolean>(false);

  const diagnosisText = language === 'hi'
    ? "आइए इसे फिर से देखते हैं। आप शायद रेजिस्टेंस और करंट को सीधे आनुपातिक (directly proportional) मान रहे हैं। लेकिन याद रखें, रेजिस्टेंस का मतलब 'रुकावट' है। जब धक्का (Voltage) उतना ही है और रुकावट बढ़ जाए, तो करंट कम होगा!"
    : language === 'hinglish'
    ? "Let's look at that again! Aap shayad resistance aur current ko directly proportional samajh rahe hain. Par yaad rakhiye, resistance ka matlab 'opposition ya rukawat' hota hai. Agar push (voltage) wahi hai par rukawat badh gayi, toh current kam hona chahiye, badhna nahi!"
    : "Let's look at that again. You may be treating resistance and current as directly proportional. But remember, resistance means 'opposition to flow'. If there is more opposition with the same push, current must decrease!";

  useEffect(() => {
    setPresence('ADAPTING', 'concerned');
    speakText(diagnosisText);
  }, [language]);

  const handleRetestSubmit = () => {
    if (!selectedRetestOptionId) return;
    setRetestSubmitted(true);

    if (selectedRetestOptionId === 'retest-opt-1') {
      // Correct!
      setPresence('CELEBRATING', 'delighted');
      speakText(
        language === 'hi'
          ? "बिल्कुल सही! I = V/R के कारण, जब रेजिस्टेंस दोगुना होता है, तो करंट आधा हो जाता है। आपकी गलतफहमी दूर हो गई है!"
          : language === 'hinglish'
          ? "Exact correct answer! Because I = V/R, resistance double hone par current half ho jata hai. Conceptual recovery 100% achieved!"
          : "Exact correct answer! Because I = V/R, doubling resistance cuts current in half. Conceptual breakthrough achieved!"
      );
    }
  };

  const handleProceedToFinalAssessment = () => {
    resolveMisconception();
  };

  return (
    <div className="min-h-[calc(100vh-140px)] py-8 px-4 sm:px-6 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      
      {/* Top Banner: Misconception & Adaptation Notice */}
      <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/50 shadow-card-glow flex flex-wrap items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
            <AlertTriangle className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                ● MISCONCEPTION DETECTED & CLASSIFIED
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300">
                Inverse Proportionality Confusion
              </span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-white">
              "You treated Resistance as a driver rather than an obstacle."
            </h2>
          </div>
        </div>

        {/* Confidence Gauge Shift */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-space-900 border border-amber-500/30">
          <Gauge className="w-5 h-5 text-amber-400" />
          <div>
            <span className="text-[10px] font-mono text-space-400 uppercase">Understanding Confidence</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 rounded-full bg-space-800 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${
                    retestSubmitted && selectedRetestOptionId === 'retest-opt-1'
                      ? 'w-[88%] bg-teach-emerald'
                      : 'w-[62%] bg-amber-400'
                  }`}
                />
              </div>
              <span className="text-xs font-mono font-bold text-white">
                {retestSubmitted && selectedRetestOptionId === 'retest-opt-1' ? '88%' : '62%'}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Grid: Left Column (Teacher Video & Voice) + Right Column (Hydraulic Analogy & Re-test) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Teacher Video & Subtitles */}
        <div className="lg:col-span-5 space-y-4">
          <TeacherVideoAvatar />
          <SubtitleDisplay />

          {/* Adaptation Strategy Metadata */}
          <div className="p-4 rounded-2xl bg-space-950 border border-space-800 space-y-2 text-xs">
            <span className="font-mono text-[10px] text-cyan-brand uppercase tracking-wider">
              AI Pedagogical Adjustment:
            </span>
            <div className="space-y-1 text-space-300 font-mono">
              <div>• Strategy: <strong className="text-white">Conceptual → Hydraulic Water Pipe Analogy</strong></div>
              <div>• Diagnostic Root: <strong className="text-white">Direct vs Inverse Proportionality</strong></div>
              <div>• Target Outcome: <strong className="text-teach-emerald">Grasp I = V/R constraint</strong></div>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Hydraulic Canvas & Follow-up Re-test */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Hydraulic Simulator */}
          <WaterPipeAnalogyCanvas />

          {/* Follow-up Re-test Question Card */}
          <div className="p-5 rounded-2xl bg-space-900 border border-cyan-electric/30 space-y-4 shadow-card-dark">
            
            <div className="flex items-center justify-between border-b border-space-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-electric" />
                <h4 className="font-display font-bold text-white text-sm">
                  Let's test your revised intuition (Re-test):
                </h4>
              </div>
              <span className="text-[10px] font-mono text-cyan-brand px-2 py-0.5 rounded bg-space-950 border border-space-800">
                1-Question Recovery
              </span>
            </div>

            <p className="text-sm font-medium text-slate-100">
              "If voltage stays constant and resistance doubles (2×), what happens to the current?"
            </p>

            {/* Options */}
            <div className="space-y-2">
              {[
                {
                  id: 'retest-opt-1',
                  text: 'Current gets halved (divided by 2)',
                  isCorrect: true,
                  rationale: 'Correct! Because I = V/R, doubling R cuts I in half.'
                },
                {
                  id: 'retest-opt-2',
                  text: 'Current doubles (2×)',
                  isCorrect: false,
                  rationale: 'Remember, current and resistance are inversely related.'
                },
                {
                  id: 'retest-opt-3',
                  text: 'Current stays unchanged',
                  isCorrect: false,
                  rationale: 'Current depends directly on resistance.'
                }
              ].map((opt) => {
                const isSelected = selectedRetestOptionId === opt.id;

                return (
                  <button
                    key={opt.id}
                    disabled={retestSubmitted}
                    onClick={() => setSelectedRetestOptionId(opt.id)}
                    className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                      retestSubmitted && opt.isCorrect
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold'
                        : isSelected
                        ? 'bg-cyan-electric/20 border-cyan-electric text-white font-semibold'
                        : 'bg-space-950 border-space-800 text-space-300 hover:border-space-700'
                    }`}
                  >
                    <span>{opt.text}</span>
                    {retestSubmitted && opt.isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Retest Submit or Next Stage */}
            {!retestSubmitted ? (
              <button
                onClick={handleRetestSubmit}
                disabled={!selectedRetestOptionId}
                className="w-full py-3 rounded-xl bg-cyan-electric disabled:opacity-40 text-space-950 font-bold text-xs shadow-cyan-sm hover:opacity-95 transition-all"
              >
                Verify Understanding Recovery →
              </button>
            ) : (
              <div className="space-y-3 pt-2">
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Misconception Successfully Resolved!</strong> Confidence increased from 62% to 88%.</span>
                </div>

                <button
                  onClick={handleProceedToFinalAssessment}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teach-emerald to-cyan-electric text-space-950 font-bold text-sm shadow-cyan-glow flex items-center justify-center gap-2 hover:scale-[1.01] transition-all cursor-pointer"
                >
                  <span>Proceed to Final Assessment (5 Questions) →</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
