import React from 'react';
import { useLesson } from '../../store/useLessonStore';
import { X, BookOpen, Quote, ShieldCheck, CheckCircle2, FileText, Search } from 'lucide-react';

export const RagGroundingDrawer: React.FC = () => {
  const { isRAGDrawerOpen, setRAGDrawerOpen, knowledgeSource } = useLesson();

  if (!isRAGDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-space-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-2xl bg-space-900 border border-cyan-electric/30 p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-space-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teach-accent/15 border border-teach-accent/30 flex items-center justify-center text-teach-accent">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-white text-lg">
                  RAG Grounding Verification
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800">
                  VERIFIED SOURCE
                </span>
              </div>
              <p className="text-xs text-space-400 font-mono">
                Direct Citations from "{knowledgeSource.name}" ({knowledgeSource.fileSize})
              </p>
            </div>
          </div>

          <button
            onClick={() => setRAGDrawerOpen(false)}
            className="p-1.5 rounded-lg text-space-400 hover:text-white hover:bg-space-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Source Summary */}
        <div className="p-3.5 rounded-xl bg-space-850 border border-space-800 space-y-1.5 text-xs">
          <span className="font-mono text-[10px] text-space-400 uppercase">Document Ingestion Summary:</span>
          <p className="text-space-300 leading-relaxed">{knowledgeSource.summary}</p>
        </div>

        {/* Chunks List with Citations */}
        <div className="space-y-4">
          <h4 className="text-xs font-mono font-semibold uppercase text-space-300 flex items-center gap-1.5">
            <Quote className="w-3.5 h-3.5 text-cyan-electric" />
            Active Vector Chunks & Text Passages
          </h4>

          <div className="space-y-3">
            {knowledgeSource.ragChunks.map((chunk) => (
              <div
                key={chunk.id}
                className="p-4 rounded-xl bg-space-950 border border-space-800 hover:border-cyan-electric/30 space-y-2.5 transition-all"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-100">{chunk.sectionTitle}</span>
                  <span className="text-[10px] font-mono text-cyan-brand px-2 py-0.5 rounded bg-space-900 border border-space-800">
                    Page {chunk.pageNumber} • Match {Math.round(chunk.relevanceScore * 100)}%
                  </span>
                </div>

                <blockquote className="text-xs text-space-300 border-l-2 border-cyan-electric/40 pl-3 italic leading-relaxed">
                  "{chunk.content}"
                </blockquote>

                {chunk.keyFormulas && chunk.keyFormulas.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {chunk.keyFormulas.map((f, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-space-900 text-amber-300 border border-amber-500/20"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2">
          <button
            onClick={() => setRAGDrawerOpen(false)}
            className="w-full py-2.5 rounded-xl bg-space-800 hover:bg-space-700 text-slate-200 font-medium text-xs border border-space-700 transition-colors"
          >
            Close Grounding View
          </button>
        </div>

      </div>
    </div>
  );
};
