import { KnowledgeSource } from '../types/lesson';

export const samplePhysicsKnowledgeSource: KnowledgeSource = {
  id: 'source-physics-class10-ch12',
  name: 'Physics_Class_10_Electricity.pdf',
  fileType: 'pdf',
  fileSize: '12.4 MB',
  status: 'ready',
  summary: 'NCERT Class 10 Physics - Chapter 12: Electricity. Covers electric current, potential difference, Ohm\'s law, resistance factors, series/parallel combinations, and Joule\'s heating law.',
  extractedConcepts: [
    'Electric Potential Difference (V = W/Q)',
    'Electric Current (I = Q/t)',
    'Ohm\'s Law (V = IR)',
    'Electrical Resistance (R = ρL/A)',
    'Hydraulic Analogy of Circuits',
    'Factors Affecting Resistance',
    'Electrical Power (P = VI = I²R)'
  ],
  ragChunks: [
    {
      id: 'chunk-12-1',
      sectionTitle: '12.2 Electric Potential and Potential Difference',
      pageNumber: 201,
      content: 'Electric potential difference between two points in an electric circuit carrying some current is defined as the work done to move a unit charge from one point to the other. Potential difference (V) = Work done (W) / Charge (Q). The SI unit of electric potential difference is volt (V), named after Alessandro Volta.',
      keyFormulas: ['V = W / Q', '1 V = 1 J / 1 C'],
      relevanceScore: 0.94
    },
    {
      id: 'chunk-12-2',
      sectionTitle: '12.3 Ohm\'s Law and Resistance',
      pageNumber: 203,
      content: 'In 1827, a German physicist Georg Simon Ohm found out the relationship between the current (I) flowing in a metallic wire and the potential difference across its terminals. The potential difference across the ends of a given metallic wire in an electric circuit is directly proportional to the current flowing through it, provided its temperature remains the same. V ∝ I or V / I = constant = R. R is a constant for the given metallic wire at a given temperature and is called its resistance.',
      keyFormulas: ['V = I × R', 'I = V / R', 'R = V / I'],
      relevanceScore: 0.99
    },
    {
      id: 'chunk-12-3',
      sectionTitle: '12.3.1 Physical Meaning of Resistance',
      pageNumber: 204,
      content: 'It is the property of a conductor to resist the flow of charges through it. Its SI unit is ohm, represented by the Greek letter Ω. According to Ohm\'s law, R = V / I. If the potential difference across the two ends of a conductor is 1 V and the current through it is 1 A, then the resistance R of the conductor is 1 Ω. Current through a resistor is inversely proportional to its resistance. If the resistance is doubled, the current gets halved.',
      keyFormulas: ['1 Ω = 1 V / 1 A', 'I ∝ 1 / R (for constant V)'],
      relevanceScore: 0.98
    },
    {
      id: 'chunk-12-4',
      sectionTitle: '12.4 Factors on which the Resistance of a Conductor Depends',
      pageNumber: 206,
      content: 'Resistance of a uniform metallic conductor is directly proportional to its length (l) and inversely proportional to the area of cross-section (A). R = ρ(l / A), where ρ (rho) is a constant of proportionality and is called the electrical resistivity of the material.',
      keyFormulas: ['R = ρ × (L / A)', 'ρ = R × A / L (Unit: Ω·m)'],
      relevanceScore: 0.91
    }
  ]
};

export const sampleTopicsList = [
  {
    id: 'topic-ohms-law',
    title: "Ohm's Law & Circuit Intuition",
    category: 'physics',
    subject: 'Physics',
    grade: 'Class 10 / High School',
    description: 'Master the core relationship between Voltage, Current, and Resistance with interactive simulations and misconception corrections.',
    duration: '5 min',
    tags: ['NCERT', 'CBSE', 'Electricity', 'High Yield']
  },
  {
    id: 'topic-calculus-derivatives',
    title: 'Intuitive Derivatives & Rate of Change',
    category: 'mathematics',
    subject: 'Mathematics',
    grade: 'Class 11-12 / Calculus I',
    description: 'Visualize tangents, limits, and rates of change geometrically before memorizing mechanical power rules.',
    duration: '10 min',
    tags: ['Calculus', 'Limits', 'Geometric Intuition']
  },
  {
    id: 'topic-photosynthesis',
    title: 'Light Dependent Reactions & Calvin Cycle',
    category: 'biology',
    subject: 'Biology',
    grade: 'Class 11 / NEET',
    description: 'Track photon absorption, electron transport chain in the thylakoid membrane, and ATP/NADPH generation.',
    duration: '8 min',
    tags: ['Botany', 'NEET', 'Bioenergetics']
  },
  {
    id: 'topic-binary-search',
    title: 'Binary Search: Divide & Conquer',
    category: 'computer_science',
    subject: 'Computer Science',
    grade: 'DSA / Interviews',
    description: 'Understand $O(\\log N)$ array partitioning, off-by-one pointer invariant bugs, and binary search on answer spaces.',
    duration: '6 min',
    tags: ['Algorithms', 'LeetCode', 'DSA']
  }
];
