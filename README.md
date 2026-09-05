# TeachAI — Don't just learn. Be taught.

> **Bharat Academix AI Innovation Hackathon 2026**  
> **Challenge:** *AI Teacher: Build a Human-Like AI Educator That Teaches Through Video*  
> **Tagline:** *"Don't just learn. Be taught."*

---

## 1. Overview
**TeachAI** is an adaptive, human-like AI educator that moves beyond passive chatbots and static video libraries. It creates a personalized digital classroom for every student. By ingesting study material (textbooks, PDFs, notes) and understanding the student's background, TeachAI generates a time-budgeted curriculum, teaches using a synchronized voice & video teacher avatar, interacts via subject-aware live simulations, diagnoses misconceptions, adapts its pedagogical strategy in real-time, and issues actionable cognitive learning reports.

---

## 2. Problem Statement
- **Generic AI Chatbots**: Dump text answers without checking if the student actually understands the underlying causality.
- **Static Video Courses**: Non-interactive; if a student holds a misconception (e.g. confusing inverse with direct proportionality), the video simply keeps playing.
- **One-Size-Fits-All LMS**: Lacks pedagogical adaptation, real-time diagnostic checks, and multilingual voice flexibility.

---

## 3. The Solution & Core Teaching Loop
TeachAI embodies the genuine 8-stage pedagogical loop of a master 1-on-1 tutor:

$$\text{UNDERSTAND} \longrightarrow \text{PLAN} \longrightarrow \text{EXPLAIN} \longrightarrow \text{DEMONSTRATE} \longrightarrow \text{QUESTION} \longrightarrow \text{EVALUATE} \longrightarrow \text{ADAPT} \longrightarrow \text{CONTINUE}$$

1. **UNDERSTAND**: Ingests textbook chapters or notes (RAG) and assesses learner level, language, and available time budget.
2. **PLAN**: Synthesizes a structured, time-budgeted concept map prioritizing high-yield intuition.
3. **EXPLAIN**: Delivers voice and video teaching with synchronized, karaoke-style subtitles in English, Hindi, or Hinglish.
4. **DEMONSTRATE**: Drives a live, subject-aware interactive simulation (e.g. Ohm's Law Circuit Laboratory with electron flow).
5. **QUESTION**: Natural pause checkpoints asking diagnostic conceptual questions.
6. **EVALUATE**: Identifies flawed mental models rather than a blunt "incorrect".
7. **ADAPT**: Morphs the teaching strategy (e.g. shifts to a Hydraulic Water-Pipe model) and re-tests recovery.
8. **CONTINUE**: Logs resolved misconceptions, updates learner memory, and progresses along the curriculum tree.

---

## 4. Key Features
- **Cinematic AI Classroom Interface**: Floating neural signals, dark space aesthetic, and zero dashboard clutter.
- **Procedural Animated AI Teacher Persona**: Lifelike avatar with mouth lip-sync reactivity, eye blinking, dynamic brow expressions, and audio wave HUD.
- **Live Circuit Physics Simulator**: Interactive Voltage ($V$) and Resistance ($R$) sliders, live electron drift velocity, ammeter, and lightbulb brightness glow.
- **Misconception Diagnosis Engine**: Pinpoints flawed proportionality assumptions, shifts pedagogical strategy, and tracks understanding confidence recovery.
- **Multilingual Synchronized Audio Engine**: Instant switching between **English**, **Hindi (हिंदी)**, and **Hinglish** with zero context loss.
- **RAG Grounding Verification**: Interactive drawer displaying exact NCERT Class 10 Physics textbook citations, page numbers, and relevance scores.
- **Comprehensive Learning Report**: Mastery radar chart, qualitative teacher feedback, resolved misconception log, and printable certificate.
- **Jury Presentation Mode**: 7-stage instant navigation bar and a 60-second automated guided walkthrough.

---

## 5. User Flow
```
[Landing Page] ──> [Upload Material / Topic] ──> [Learner Profile] ──> [AI Planning]
                                                                             │
┌────────────────────────────────────────────────────────────────────────────┘
▼
[AI Classroom] ──> [Interactive Check] ──> (Wrong Answer Trap) ──> [Misconception Detected]
                                                                             │
┌────────────────────────────────────────────────────────────────────────────┘
▼
[Hydraulic Analogy Re-explanation] ──> [1-Question Recovery] ──> [Final 5-Question Quiz]
                                                                             │
┌────────────────────────────────────────────────────────────────────────────┘
▼
[Comprehensive Learning Report & Mastery Radar] ──> [Curriculum Path / Certificate]
```

---

## 6. Architecture & File Structure
```
src/
├── components/
│   ├── common/             # Header, Footer, JuryBar, StudentMemoryDrawer, CurriculumPathDrawer
│   ├── landing/            # HeroSection, TeachingLoopVisualizer, FeatureGrid
│   ├── onboarding/         # CreateLessonModal, MaterialUploadZone, LearnerProfileSelector
│   ├── planning/           # AiThinkingVisualizer
│   ├── classroom/          # ClassroomView, TeacherVideoAvatar, AudioWaveform, SubtitleDisplay,
│   │                       # TeachingCanvas, PhysicsCircuitCanvas, WaterPipeAnalogyCanvas, RagGroundingDrawer
│   ├── interactive/        # QuestionModal, MisconceptionAlertCard
│   ├── assessment/         # FinalAssessmentView
│   └── report/             # LearningReportView, MasteryRadarChart
├── data/                   # demoLessons, sampleRagSources, translations
├── services/               # aiService, ragService, speechService, assessmentService
├── store/                  # useLessonStore, useTeacherStore, useDemoStore
├── types/                  # lesson.ts, teacher.ts, assessment.ts
├── App.tsx
├── main.tsx
└── index.css
```

---

## 7. AI / LLM Integration
- Extensible AI service abstraction (`src/services/aiService.ts`).
- Supports zero-latency realistic offline state machines (guaranteed reliability during hackathon jury evaluation) as well as live Google Gemini / OpenAI APIs via `VITE_GEMINI_API_KEY`.

---

## 8. RAG (Retrieval-Augmented Generation) Architecture
- **Chunking & Indexing**: Ingests textbooks, extracts definitions, formulas, and diagrams.
- **Grounded Citations**: The UI displays direct references to verified sources (e.g. NCERT Class 10 Physics Chapter 12).
- **Transparency**: Clear labeling between direct textbook context and conceptual derivations.

---

## 9. Personalization & Learner Memory
- Remembers student profile (Aarav Sharma), dominant learning styles (Visual & Analogies), and past completed modules (Electric Charge, Current Flow, Potential Difference).
- Targets specific areas for reinforcement (Formula scaling with wire geometry).

---

## 10. Adaptive Teaching & Misconception Engine
- **The Benchmark Scenario**:
  - *Question*: "If resistance increases while voltage stays constant, what happens to current?"
  - *Misconception Choice*: "It increases."
  - *Diagnosis*: "You may be treating resistance and current as directly proportional."
  - *Strategy Shift*: Shifts from abstract formula to the Hydraulic Water Pipe Constriction Analogy.
  - *Mathematical Anchor*: Proves $I = V / R \implies R \uparrow \ \implies I \downarrow$.
  - *Retest*: Doubling $R$ cuts $I$ in half $\rightarrow$ Recovery confirmed!

---

## 11. Multilingual Support
- Real-time switching between:
  - **English**: Standard terminology.
  - **Hindi (हिंदी)**: शुद्ध हिंदी उच्चारण और शब्दावली।
  - **Hinglish**: Natural bilingual pedagogical conversational flow.
- Synchronized with browser Web Speech synthesis and karaoke subtitle highlighting.

---

## 12. Tech Stack
- **Frontend Core**: React 18, TypeScript (Strict Mode)
- **Bundler & Dev Server**: Vite 6
- **Styling**: Tailwind CSS, Custom Glassmorphism, CSS Canvas Animations
- **Icons**: Lucide React
- **Audio & Speech**: Web Speech API (`SpeechSynthesis`), HTML5 Web Audio API
- **Celebration Effects**: Canvas Confetti

---

## 13. Environment Variables
Create a `.env` file in the root directory (refer to `.env.example`):
```env
VITE_GEMINI_API_KEY=your_optional_gemini_api_key
VITE_APP_NAME="TeachAI"
```

---

## 14. Local Setup Instructions
```bash
# 1. Clone repository
git clone https://github.com/your-username/teachai.git
cd teachai

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

---

## 15. Vercel Deployment Guide
1. Push the repository to GitHub.
2. Log into [Vercel](https://vercel.com) and click **Add New Project**.
3. Import the `teachai` repository.
4. Framework Preset: **Vite**.
5. Build Command: `npm run build`.
6. Output Directory: `dist`.
7. Click **Deploy**. The included `vercel.json` ensures full SPA rewrite support.

---

## 16. Demo Mode Guide for Hackathon Judges
- Use the **Jury Presentation Bar** pinned at the top:
  - `[01 INPUT]`: View document ingestion & learner configuration.
  - `[02 PLAN]`: Watch real-time cognitive time budgeting.
  - `[03 TEACH]`: Experience the AI video avatar & live circuit simulator.
  - `[04 CHECK]`: Select the intentional wrong answer ("It increases").
  - `[05 ADAPT]`: Watch the AI diagnose the misconception & shift to the water-pipe analogy.
  - `[06 ASSESS]`: Complete the multimodal 5-question quiz.
  - `[07 REPORT]`: Review the mastery radar chart, qualitative teacher notes, and certificate.
- Or click **"Run 60s Guided Demo"** for a fully automated walkthrough!

---

## 17. Limitations & Future Scope
- **Future Scope**:
  - Live WebRTC audio streaming with ultra-low latency streaming avatar models (e.g. HeyGen / Tavus backend integration).
  - AR/3D circuit breadboarding via Three.js / WebGL.
  - Automated voice input for student oral answers via Whisper API.

---

## 18. License
Built with passion for the **Bharat Academix AI Innovation Hackathon 2026**.
