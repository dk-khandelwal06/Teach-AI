import { KnowledgeSource, RagChunk } from '../types/lesson';
import { samplePhysicsKnowledgeSource } from '../data/sampleRagSources';

export class RagService {
  private static instance: RagService;
  private currentSource: KnowledgeSource = samplePhysicsKnowledgeSource;

  public static getInstance(): RagService {
    if (!RagService.instance) {
      RagService.instance = new RagService();
    }
    return RagService.instance;
  }

  public setSource(source: KnowledgeSource) {
    this.currentSource = source;
  }

  public getSource(): KnowledgeSource {
    return this.currentSource;
  }

  public queryChunks(query: string, limit: number = 3): RagChunk[] {
    const terms = query.toLowerCase().split(/\s+/).filter(t => t.length > 2);
    
    const scored = this.currentSource.ragChunks.map(chunk => {
      let score = 0;
      const text = (chunk.sectionTitle + ' ' + chunk.content + ' ' + (chunk.keyFormulas?.join(' ') || '')).toLowerCase();
      
      terms.forEach(term => {
        if (text.includes(term)) {
          score += 1;
        }
      });

      return {
        ...chunk,
        relevanceScore: Math.min(0.99, 0.6 + score * 0.12)
      };
    });

    return scored.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, limit);
  }

  public getChunkById(id: string): RagChunk | undefined {
    return this.currentSource.ragChunks.find(c => c.id === id);
  }

  public async parseUploadedFile(file: File): Promise<KnowledgeSource> {
    // Simulate RAG ingestion pipeline: chunking, embedding, concept extraction
    await new Promise(r => setTimeout(r, 1200));

    const fileName = file.name;
    const fileType = fileName.endsWith('.pdf') ? 'pdf' : fileName.endsWith('.docx') ? 'docx' : 'notes';
    const fileSize = (file.size / (1024 * 1024)).toFixed(1) + ' MB';

    return {
      id: 'source-' + Date.now(),
      name: fileName,
      fileType,
      fileSize,
      status: 'ready',
      summary: `Parsed knowledge document "${fileName}". Extracted key pedagogical chapters, formulas, and conceptual dependencies.`,
      extractedConcepts: [
        'Fundamental Principles & Definitions',
        'Mathematical Formula Derivations',
        'Experimental Circuit Observations',
        'Physical Invariants & Constraints',
        'Numerical Problem Solving Patterns'
      ],
      ragChunks: [
        {
          id: 'uploaded-chunk-1',
          sectionTitle: 'Section 1: Conceptual Foundations',
          pageNumber: 1,
          content: `Content extracted from ${fileName}. Covers core principles, variables, definitions, and relationships necessary for deep understanding.`,
          keyFormulas: ['V = I × R', 'I = V / R', 'R = ρ(L/A)'],
          relevanceScore: 0.96
        },
        {
          id: 'uploaded-chunk-2',
          sectionTitle: 'Section 2: Cause-and-Effect & Proportionalities',
          pageNumber: 2,
          content: `Analyzing behavior when independent parameters vary. Identifies inverse relationships and common stumbling points for learners.`,
          keyFormulas: ['I ∝ 1/R (for constant V)'],
          relevanceScore: 0.94
        }
      ]
    };
  }
}

export const ragService = RagService.getInstance();
