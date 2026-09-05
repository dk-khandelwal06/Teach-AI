import { LessonPlan } from '../types/lesson';
import { AssessmentQuestion } from '../types/assessment';
import { samplePhysicsKnowledgeSource } from './sampleRagSources';

export const ohmsLawLessonPlan: LessonPlan = {
  id: 'lesson-ohms-law-01',
  topicTitle: "Ohm's Law & Circuit Intuition",
  topicCategory: 'physics',
  learnerProfile: {
    level: 'beginner',
    language: 'hinglish',
    timeAvailable: '5min',
    goal: 'understand',
    style: 'visual_explanation',
    studentName: 'Aarav'
  },
  knowledgeSource: samplePhysicsKnowledgeSource,
  estimatedMinutes: 5,
  curriculumPath: {
    unit: 'Unit 4: Electricity & Magnetism',
    steps: [
      { id: 'step-1', title: 'Electric Charge (Q)', status: 'completed', score: 95 },
      { id: 'step-2', title: 'Electric Current (I)', status: 'completed', score: 90 },
      { id: 'step-3', title: 'Potential Difference (V)', status: 'completed', score: 85 },
      { id: 'step-4', title: "Ohm's Law & Resistance (R)", status: 'current' },
      { id: 'step-5', title: 'Series & Parallel Circuits', status: 'locked' },
      { id: 'step-6', title: 'Electrical Power & Heating', status: 'locked' }
    ]
  },
  sections: [
    {
      id: 'sec-intro',
      order: 1,
      title: '01 — The Big Idea',
      subtitle: 'What makes electricity flow?',
      durationSec: 35,
      conceptKey: 'electric_potential_and_current',
      canvasType: 'circuit_sim',
      teachingObjective: 'Establish physical intuition for Voltage as push and Current as rate of flow.',
      speechScript: {
        en: "Welcome back! Today, we aren't just memorizing formulas—we are going to truly understand how electricity flows. Think about what happens when you turn on a flashlight. Electric charge starts moving through the circuit. But what actually pushes those charges, and what tries to stop them? Let's explore the triangle of Voltage, Current, and Resistance.",
        hi: "नमस्ते! आज हम सिर्फ सूत्रों को याद नहीं करेंगे—हम असल में समझेंगे कि बिजली कैसे बहती है। सोचिए जब आप टॉर्च चालू करते हैं, तो क्या होता है? सर्किट में चार्ज बहना शुरू हो जाता है। लेकिन इन चार्ज को कौन धकेलता है और कौन रोकता है? आइए वोल्टेज, करंट और रेजिस्टेंस के रिश्ते को समझते हैं।",
        hinglish: "Welcome back! Aaj hum sirf formulas ratenge nahi—hum genuinely understand karenge ki circuit me electricity kaise flow hoti hai. Jab aap ek switch on karte ho, toh charges flow hona start karte hain. Lekin unhe aage push kaun karta hai, aur unhe roktah kaun hai? Let's explore the core relationship between Voltage, Current, aur Resistance."
      },
      visualHighlights: ['Battery = Electrical Pressure (V)', 'Wire = Electron Conductor', 'Bulb = Resistor Load'],
      canvasData: {
        voltage: 6,
        resistance: 10,
        current: 0.6
      },
      groundedChunkId: 'chunk-12-1'
    },
    {
      id: 'sec-voltage-current',
      order: 2,
      title: '02 — Voltage & Current',
      subtitle: 'The Push vs The Flow Rate',
      durationSec: 45,
      conceptKey: 'voltage_current_relation',
      canvasType: 'circuit_sim',
      teachingObjective: 'Demonstrate that higher Voltage results in faster electron drift (Current).',
      speechScript: {
        en: "Look at the circuit canvas. Voltage, measured in Volts, is the electrical push or potential difference supplied by the battery. Current, measured in Amperes, is the actual rate of electron flow. Notice what happens when we increase the voltage slider from 3 Volts to 12 Volts: the electrons drift much faster and the lightbulb glows brightly!",
        hi: "सर्किट कैनवास पर ध्यान दीजिए। वोल्टेज बैटरी द्वारा दिया गया धक्का या विद्युत विभवांतर है, जिसे वोल्ट में मापा जाता है। करंट इलेक्ट्रॉनों के बहने की दर है, जिसे एम्पीयर में मापा जाता है। जब हम वोल्टेज को 3V से 12V तक बढ़ाते हैं, तो इलेक्ट्रॉन तेजी से दौड़ते हैं और बल्ब तेज चमकने लगता है!",
        hinglish: "Classroom canvas par dhyan dijiye. Voltage, jo Volts me measure hota hai, wo battery dwara diya gaya electrical push hai. Aur Current, jo Amperes me measure hota hai, wo electrons ke flow hone ki actual speed ya rate hai. Agar hum voltage ko 3V se 12V badhate hain, toh electrons fast drift karte hain aur bulb instantly brighter glow karta hai!"
      },
      visualHighlights: ['V = Potential Difference', 'I = Electron Flow Rate', 'Higher V → Higher I'],
      canvasData: {
        voltage: 12,
        resistance: 10,
        current: 1.2
      },
      groundedChunkId: 'chunk-12-2'
    },
    {
      id: 'sec-resistance',
      order: 3,
      title: '03 — The Obstacle: Resistance',
      subtitle: 'Why charges face friction',
      durationSec: 40,
      conceptKey: 'resistance_concept',
      canvasType: 'circuit_sim',
      teachingObjective: 'Introduce Resistance as the material property opposing charge motion.',
      speechScript: {
        en: "Now, wires and components are not empty highways. As electrons move, they collide with atoms inside the conductor. This opposition to the flow of charge is called Resistance, measured in Ohms. If you increase resistance, you make it harder for electrons to pass through.",
        hi: "लेकिन तार खाली सड़क नहीं होते। जब इलेक्ट्रॉन आगे बढ़ते हैं, तो वे धातु के परमाणुओं से टकराते हैं। धारा के इस विरोध को रेजिस्टेंस (प्रतिरोध) कहते हैं, जिसका मात्रक ओम (Ω) है। रेजिस्टेंस जितना ज्यादा होगा, इलेक्ट्रॉनों के लिए निकलना उतना ही कठिन होगा।",
        hinglish: "Lekin conductor ke andar khali highway nahi hota. Jaise hi electrons aage badhte hain, wo conductor ke atoms se collide karte hain. Is opposition ya rukawat ko hum Resistance kehte hain, jiska unit Ohm (Ω) hota hai. Resistance badhane se electrons ke liye pass hona mushkil ho jata hai."
      },
      visualHighlights: ['Resistance (R) in Ohms (Ω)', 'Collisions impede drift velocity', 'Higher R → More friction'],
      canvasData: {
        voltage: 12,
        resistance: 30,
        current: 0.4
      },
      groundedChunkId: 'chunk-12-3'
    },
    {
      id: 'sec-check',
      order: 4,
      title: '04 — Understanding Check',
      subtitle: 'Testing your mental model',
      durationSec: 25,
      conceptKey: 'ohms_law_proportionality',
      canvasType: 'circuit_sim',
      teachingObjective: 'Trigger active retrieval and diagnose any direct vs inverse proportionality misconceptions.',
      speechScript: {
        en: "Let's do a quick check before we continue to ensure you have the right intuition. Take your time to answer.",
        hi: "आगे बढ़ने से पहले एक त्वरित समझ की जांच करते हैं। अपना समय लें और उत्तर दें।",
        hinglish: "Aage badhne se pehle ek quick understanding check karte hain taaki aapka conceptual foundation strong rahe. Think carefully and answer!"
      },
      visualHighlights: ['Active Retrieval', 'Misconception Diagnostic'],
      canvasData: {
        voltage: 12,
        resistance: 30,
        current: 0.4
      },
      groundedChunkId: 'chunk-12-3'
    }
  ],
  checkpoints: [
    {
      id: 'check-01',
      sectionId: 'sec-check',
      conceptTarget: 'inverse_proportionality_I_and_R',
      promptEn: 'If resistance increases while voltage stays constant, what happens to current?',
      promptHi: 'यदि वोल्टेज स्थिर रहे और रेजिस्टेंस (प्रतिरोध) बढ़ जाए, तो करंट के साथ क्या होगा?',
      promptHinglish: 'Agar voltage constant rahe aur resistance increase ho jaye, toh current ke sath kya hoga?',
      options: [
        {
          id: 'opt-increase',
          label: 'A',
          textEn: 'It increases',
          textHi: 'यह बढ़ जाता है',
          textHinglish: 'Ye increase ho jayega',
          isCorrect: false,
          isMisconceptionTrap: true,
          trapDiagnosis: {
            wrongAnswerId: 'opt-increase',
            diagnosedConcept: 'Direct Proportionality Misconception',
            misconceptionLabel: 'Treating Resistance & Current as directly proportional',
            explanationEn: "Let's look at that again. You may be treating resistance and current as directly proportional. But remember, resistance means 'opposition to flow'. If there is more opposition with the same push, current must decrease!",
            explanationHi: 'आइए इसे फिर से देखते हैं। आप शायद रेजिस्टेंस और करंट को सीधे आनुपातिक (directly proportional) मान रहे हैं। लेकिन याद रखें, रेजिस्टेंस का मतलब \'रुकावट\' है। जब धक्का उतना ही है और रुकावट बढ़ जाए, तो करंट कम होगा!',
            explanationHinglish: "Let's look at that again! Aap shayad resistance aur current ko directly proportional samajh rahe hain. Par yaad rakhiye, resistance ka matlab 'opposition ya rukawat' hota hai. Agar push (voltage) wahi hai par rukawat badh gayi, toh current kam hona chahiye, badhna nahi!",
            shiftStrategy: 'Conceptual explanation → Real-world Hydraulic (Water-Pipe) Analogy',
            adaptiveCanvas: 'water_pipe_analogy',
            adaptiveAnalogy: {
              title: 'The Water-Pipe & Valve Analogy',
              analogyText: 'Think of Voltage as the water pressure in a tank. Current is the rate of water flowing out. Resistance is a constriction valve squeezing the pipe. If you squeeze the valve tighter (more resistance) while water pressure is unchanged, less water flows out per second!',
              formulaHighlight: 'I = \\frac{V}{R} \\quad \\implies \\quad R \\uparrow \\ \\implies \\ I \\downarrow',
              physicsParams: {
                voltage: 12,
                resistance: 40,
                current: 0.3
              }
            },
            retestQuestion: {
              id: 'retest-01',
              question: 'If voltage stays constant and resistance doubles (2×), what happens to the current?',
              questionHi: 'यदि वोल्टेज स्थिर रहे और प्रतिरोध दोगुना (2×) हो जाए, तो करंट पर क्या प्रभाव पड़ेगा?',
              questionHinglish: 'Agar voltage constant rahe aur resistance double (2×) ho jaye, toh current par kya asar hoga?',
              options: [
                {
                  id: 'retest-opt-1',
                  text: 'Current gets halved (divided by 2)',
                  textHi: 'करंट आधा (1/2) हो जाएगा',
                  textHinglish: 'Current half (1/2) ho jayega',
                  isCorrect: true,
                  rationale: 'Correct! Because I = V/R, doubling R cuts I in half.'
                },
                {
                  id: 'retest-opt-2',
                  text: 'Current doubles (2×)',
                  textHi: 'करंट दोगुना हो जाएगा',
                  textHinglish: 'Current double ho jayega',
                  isCorrect: false,
                  rationale: 'Remember, current and resistance are inversely related.'
                },
                {
                  id: 'retest-opt-3',
                  text: 'Current stays unchanged',
                  textHi: 'करंट अपरिवर्तित रहेगा',
                  textHinglish: 'Current same rahega',
                  isCorrect: false,
                  rationale: 'Current depends directly on resistance.'
                }
              ]
            }
          }
        },
        {
          id: 'opt-decrease',
          label: 'B',
          textEn: 'It decreases',
          textHi: 'यह घट जाता है',
          textHinglish: 'Ye decrease ho jayega',
          isCorrect: true
        },
        {
          id: 'opt-same',
          label: 'C',
          textEn: 'It stays the same',
          textHi: 'यह समान रहता है',
          textHinglish: 'Ye same rahega',
          isCorrect: false
        },
        {
          id: 'opt-unsure',
          label: 'D',
          textEn: "I'm not sure",
          textHi: 'मुझे यकीन नहीं है',
          textHinglish: 'Mujhe confirm nahi pata',
          isCorrect: false
        }
      ]
    }
  ]
};

export const demoAssessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'quiz-01',
    questionNumber: 1,
    type: 'conceptual',
    conceptTag: "Ohm's Law Foundation",
    difficulty: 'easy',
    question: {
      en: "According to Ohm's Law, what is the mathematical relationship between Potential Difference (V), Current (I), and Resistance (R)?",
      hi: "ओम के नियम के अनुसार, विभवांतर (V), धारा (I) और प्रतिरोध (R) के बीच क्या गणितीय संबंध है?",
      hinglish: "Ohm's Law ke according Potential Difference (V), Current (I), aur Resistance (R) ke beech ka mathematical formula kya hai?"
    },
    options: [
      {
        id: 'q1-a',
        text: {
          en: 'V = I × R (or I = V / R)',
          hi: 'V = I × R (या I = V / R)',
          hinglish: 'V = I × R (ya I = V / R)'
        },
        isCorrect: true
      },
      {
        id: 'q1-b',
        text: {
          en: 'V = I / R',
          hi: 'V = I / R',
          hinglish: 'V = I / R'
        },
        isCorrect: false
      },
      {
        id: 'q1-c',
        text: {
          en: 'R = V × I',
          hi: 'R = V × I',
          hinglish: 'R = V × I'
        },
        isCorrect: false
      },
      {
        id: 'q1-d',
        text: {
          en: 'I = V × R²',
          hi: 'I = V × R²',
          hinglish: 'I = V × R²'
        },
        isCorrect: false
      }
    ],
    explanation: {
      en: "Ohm's Law states that V = I·R, which gives I = V/R and R = V/I. Potential difference across the conductor is directly proportional to current.",
      hi: "ओम का नियम कहता है कि V = I·R। अतः I = V/R और R = V/I होता है।",
      hinglish: "Ohm's Law state karta hai ki V = I × R. Isliye I = V / R aur R = V / I."
    },
    groundedQuote: "V ∝ I or V / I = constant = R (NCERT Class 10 Physics, Ch 12, Page 203)",
    formulaHint: "V = I × R"
  },
  {
    id: 'quiz-02',
    questionNumber: 2,
    type: 'calculation',
    conceptTag: 'Numerical Application',
    difficulty: 'medium',
    question: {
      en: 'A 12V car battery is connected across an electric headlamp bulb of resistance 4 Ω. How much current flows through the bulb?',
      hi: 'एक 12V की कार बैटरी 4 Ω प्रतिरोध वाले हेडलैंप बल्ब से जुड़ी है। बल्ब में से कितना करंट बहेगा?',
      hinglish: 'Ek 12V car battery ko 4 Ω resistance wale lamp se connect kiya gaya hai. Lamp me se kitna current flow hoga?'
    },
    options: [
      {
        id: 'q2-a',
        text: {
          en: '48 A',
          hi: '48 A',
          hinglish: '48 A'
        },
        isCorrect: false
      },
      {
        id: 'q2-b',
        text: {
          en: '3.0 A',
          hi: '3.0 A',
          hinglish: '3.0 A'
        },
        isCorrect: true
      },
      {
        id: 'q2-c',
        text: {
          en: '0.33 A',
          hi: '0.33 A',
          hinglish: '0.33 A'
        },
        isCorrect: false
      },
      {
        id: 'q2-d',
        text: {
          en: '16 A',
          hi: '16 A',
          hinglish: '16 A'
        },
        isCorrect: false
      }
    ],
    explanation: {
      en: 'Using Ohm\'s Law: I = V / R = 12 V / 4 Ω = 3.0 Amperes.',
      hi: 'ओम के नियम से: I = V / R = 12 V / 4 Ω = 3.0 A।',
      hinglish: 'Ohm\'s Law use karke: I = V / R = 12 / 4 = 3.0 Amperes.'
    },
    formulaHint: 'I = V / R'
  },
  {
    id: 'quiz-03',
    questionNumber: 3,
    type: 'conceptual',
    conceptTag: 'Inverse Proportionality Mastery',
    difficulty: 'medium',
    question: {
      en: 'In an experiment, if you keep the Voltage source constant and replace a copper wire with a thinner nichrome wire that has 3× higher resistance, the current in the circuit will:',
      hi: 'एक प्रयोग में, यदि वोल्टेज को स्थिर रखते हुए 3 गुना अधिक प्रतिरोध वाला तार लगाया जाए, तो सर्किट में करंट:',
      hinglish: 'Agar hum voltage constant rakhein aur 3× jyada resistance wala wire use karein, toh circuit ka current:'
    },
    options: [
      {
        id: 'q3-a',
        text: {
          en: 'Decrease to 1/3rd of its initial value',
          hi: 'अपने प्रारंभिक मान का 1/3 हो जाएगा',
          hinglish: 'Apne initial value ka 1/3rd ho jayega'
        },
        isCorrect: true
      },
      {
        id: 'q3-b',
        text: {
          en: 'Triple (increase 3×)',
          hi: 'तीन गुना (3×) बढ़ जाएगा',
          hinglish: 'Triple (3×) ho jayega'
        },
        isCorrect: false
      },
      {
        id: 'q3-c',
        text: {
          en: 'Remain exactly the same',
          hi: 'बिल्कुल समान रहेगा',
          hinglish: 'Bilkul same rahega'
        },
        isCorrect: false
      },
      {
        id: 'q3-d',
        text: {
          en: 'Drop to zero immediately',
          hi: 'तुरंत शून्य हो जाएगा',
          hinglish: 'Direct zero ho jayega'
        },
        isCorrect: false
      }
    ],
    explanation: {
      en: 'Current is inversely proportional to resistance (I ∝ 1/R). If R increases by 3 times, I drops to 1/3rd.',
      hi: 'करंट प्रतिरोध के व्युत्क्रमानुपाती (inversely proportional) होता है। यदि R 3 गुना बढ़ेगा, तो I 1/3 हो जाएगा।',
      hinglish: 'Current resistance ke inversely proportional hota hai (I ∝ 1/R). Isliye R 3x hone par Current 1/3rd ho jata hai.'
    },
    groundedQuote: "Current through a resistor is inversely proportional to its resistance. (NCERT Ch 12, Page 204)"
  },
  {
    id: 'quiz-04',
    questionNumber: 4,
    type: 'diagram',
    conceptTag: 'V-I Characteristic Graph',
    difficulty: 'medium',
    question: {
      en: 'What does the slope of a Voltage (V) vs Current (I) straight-line graph represent for an ohmic metallic conductor?',
      hi: 'एक धात्विक चालक के लिए वोल्टेज (V) बनाम करंट (I) ग्राफ का ढलान (slope) क्या दर्शाता है?',
      hinglish: 'Ek ohmic metallic conductor ke V vs I graph ka slope (ढलान) kya represent karta hai?'
    },
    options: [
      {
        id: 'q4-a',
        text: {
          en: 'Resistance (R = ΔV / ΔI)',
          hi: 'प्रतिरोध (R = ΔV / ΔI)',
          hinglish: 'Resistance (R = ΔV / ΔI)'
        },
        isCorrect: true
      },
      {
        id: 'q4-b',
        text: {
          en: 'Total Electric Charge (Q)',
          hi: 'कुल विद्युत आवेश (Q)',
          hinglish: 'Total Electric Charge (Q)'
        },
        isCorrect: false
      },
      {
        id: 'q4-c',
        text: {
          en: 'Drift Velocity of Protons',
          hi: 'प्रोटॉन का अपवाह वेग',
          hinglish: 'Protons ki drift velocity'
        },
        isCorrect: false
      },
      {
        id: 'q4-d',
        text: {
          en: 'Heat Capacity',
          hi: 'ऊष्मा धारिता',
          hinglish: 'Heat Capacity'
        },
        isCorrect: false
      }
    ],
    explanation: {
      en: 'On a V vs I plot, Slope = ΔV / ΔI = R (Resistance in Ohms). A steeper line means higher resistance.',
      hi: 'V बनाम I ग्राफ पर, ढलान (Slope) = ΔV / ΔI = R (प्रतिरोध) होता है।',
      hinglish: 'V vs I graph par slope = ΔV / ΔI = R hota hai. Jitna steep line, utna zyada resistance!'
    },
    formulaHint: 'Slope = ΔV / ΔI = R'
  },
  {
    id: 'quiz-05',
    questionNumber: 5,
    type: 'conceptual',
    conceptTag: 'Physical Factors of Resistance',
    difficulty: 'hard',
    question: {
      en: 'If you stretch a uniform cylindrical copper wire to double (2×) its length while conserving its total volume (which halves its cross-sectional area A), what is the new resistance compared to original R?',
      hi: 'यदि किसी तांबे के तार को खींचकर उसकी लंबाई दोगुनी (2×) कर दी जाए (जिससे उसका क्षेत्रफल आधा हो जाए), तो नया प्रतिरोध कितना होगा?',
      hinglish: 'Agar ek copper wire ko stretch karke length double (2×) kar di jaye aur volume constant rahe (area half ho jaye), toh new resistance kitna hoga?'
    },
    options: [
      {
        id: 'q5-a',
        text: {
          en: '4 × R (Quadrupled)',
          hi: '4 × R (चार गुना)',
          hinglish: '4 × R (Chaar guna / 4 times)'
        },
        isCorrect: true
      },
      {
        id: 'q5-b',
        text: {
          en: '2 × R (Doubled)',
          hi: '2 × R (दोगुना)',
          hinglish: '2 × R (Double)'
        },
        isCorrect: false
      },
      {
        id: 'q5-c',
        text: {
          en: 'R / 2 (Halved)',
          hi: 'R / 2 (आधा)',
          hinglish: 'R / 2 (Aadha)'
        },
        isCorrect: false
      },
      {
        id: 'q5-d',
        text: {
          en: 'Remains unchanged',
          hi: 'अपरिवर्तित रहेगा',
          hinglish: 'Same rahega'
        },
        isCorrect: false
      }
    ],
    explanation: {
      en: 'R = ρ(L/A). When stretched to 2L, area becomes A/2. New R\' = ρ(2L / (A/2)) = 4 × ρ(L/A) = 4R.',
      hi: 'R = ρ(L/A)। जब लंबाई 2L होती है तो क्षेत्रफल A/2 हो जाता है। नया प्रतिरोध R\' = 4R होगा।',
      hinglish: 'R = ρ(L/A). Jab length 2L aur area A/2 hota hai toh R\' = 4 × (ρL/A) = 4R ho jata hai!'
    },
    formulaHint: "R' = ρ (2L) / (A/2) = 4 R"
  }
];
