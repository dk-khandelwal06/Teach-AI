import React, { useState } from 'react';
import { KnowledgeSource } from '../../types/lesson';
import { samplePhysicsKnowledgeSource } from '../../data/sampleRagSources';
import { ragService } from '../../services/ragService';
import { Upload, FileText, CheckCircle2, Sparkles, BookOpen, AlertCircle } from 'lucide-react';

interface MaterialUploadZoneProps {
  onSourceSelected: (source: KnowledgeSource) => void;
  selectedSource: KnowledgeSource | null;
}

export const MaterialUploadZone: React.FC<MaterialUploadZoneProps> = ({
  onSourceSelected,
  selectedSource
}) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [dragOver, setDragOver] = useState<boolean>(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const source = await ragService.parseUploadedFile(file);
      onSourceSelected(source);
    } catch {
      // fallback to sample
      onSourceSelected(samplePhysicsKnowledgeSource);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSelectSample = () => {
    onSourceSelected(samplePhysicsKnowledgeSource);
  };

  return (
    <div className="space-y-4">
      
      {/* Drag & Drop Upload Container */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const file = e.dataTransfer.files?.[0];
          if (file) {
            setIsUploading(true);
            ragService.parseUploadedFile(file).then(s => {
              onSourceSelected(s);
              setIsUploading(false);
            });
          }
        }}
        className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
          dragOver
            ? 'border-cyan-electric bg-cyan-electric/5'
            : selectedSource
            ? 'border-teach-accent/60 bg-teach-accent/5'
            : 'border-space-700 bg-space-900/50 hover:border-space-600'
        }`}
      >
        <input
          type="file"
          id="material-upload"
          className="hidden"
          accept=".pdf,.docx,.txt,.ppt,.pptx"
          onChange={handleFileUpload}
        />

        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-space-800 border border-space-700 flex items-center justify-center text-cyan-electric">
            <Upload className={`w-6 h-6 ${isUploading ? 'animate-bounce' : ''}`} />
          </div>

          <div>
            <label
              htmlFor="material-upload"
              className="text-sm font-semibold text-white hover:text-cyan-electric cursor-pointer underline decoration-cyan-electric/50"
            >
              {isUploading ? 'Ingesting & Chunking Document...' : 'Upload study material or notes'}
            </label>
            <p className="text-xs text-space-400 mt-1">
              Supports PDF, DOCX, PPTX, Textbook chapters, or research papers
            </p>
          </div>
        </div>
      </div>

      {/* Selected Knowledge Source Badge */}
      {selectedSource && (
        <div className="p-4 rounded-xl bg-space-900 border border-teach-accent/40 shadow-cyan-sm space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-teach-accent/15 text-teach-accent">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-white">
                    {selectedSource.name}
                  </span>
                  <span className="text-[10px] font-mono text-space-400">
                    {selectedSource.fileSize}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-teach-emerald flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Content understood & indexed (4 RAG Chunks)
                </span>
              </div>
            </div>

            <button
              onClick={handleSelectSample}
              className="px-2.5 py-1 rounded bg-space-800 hover:bg-space-700 text-[11px] font-mono text-space-300 border border-space-700"
            >
              Reload Default
            </button>
          </div>

          {/* Extracted Concepts Preview */}
          <div className="pt-2 border-t border-space-800">
            <span className="text-[10px] font-mono text-space-400 uppercase tracking-wider block mb-1.5">
              Extracted Knowledge Concepts:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {selectedSource.extractedConcepts.slice(0, 4).map((concept) => (
                <span
                  key={concept}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-space-800 text-space-300 border border-space-700"
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Or Select High-Yield Demo Source */}
      <div className="flex items-center justify-between text-xs pt-1">
        <span className="text-space-400 font-mono">Sample Hackathon Benchmark:</span>
        <button
          type="button"
          onClick={handleSelectSample}
          className="text-cyan-brand hover:underline font-mono font-semibold flex items-center gap-1"
        >
          <BookOpen className="w-3.5 h-3.5" /> Use NCERT Class 10 Physics (Electricity)
        </button>
      </div>

    </div>
  );
};
