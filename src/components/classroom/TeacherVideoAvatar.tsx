import React, { useEffect, useRef } from 'react';
import { useTeacher } from '../../store/useTeacherStore';
import { AudioWaveformVisualizer } from './AudioWaveformVisualizer';
import { Sparkles, Brain, Volume2, VolumeX, Mic, Eye } from 'lucide-react';

export const TeacherVideoAvatar: React.FC = () => {
  const { presence, expression, isSpeaking, isMuted, setMuted } = useTeacher();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;
    let blinkProgress = 0;
    let nextBlink = 120;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2 - 10;

      // Subtle breathing / posture sway
      const swayY = Math.sin(frame * 0.03) * 2;
      const swayX = Math.cos(frame * 0.015) * 1.5;

      // 1. Studio Backdrop Halo
      const bgGrad = ctx.createRadialGradient(cx, cy, 30, cx, cy, 180);
      if (presence === 'ADAPTING') {
        bgGrad.addColorStop(0, 'rgba(245, 158, 11, 0.18)');
        bgGrad.addColorStop(1, 'rgba(11, 17, 36, 0.95)');
      } else {
        bgGrad.addColorStop(0, 'rgba(0, 242, 254, 0.15)');
        bgGrad.addColorStop(1, 'rgba(11, 17, 36, 0.95)');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // 2. Shoulders / Professional Attire
      ctx.fillStyle = '#0F172A';
      ctx.beginPath();
      ctx.ellipse(cx + swayX, h + 30 + swayY, 130, 80, 0, Math.PI, 0, true);
      ctx.fill();

      // Blazer Collar & Accent
      ctx.strokeStyle = presence === 'ADAPTING' ? '#F59E0B' : '#00F2FE';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx - 35, h - 30);
      ctx.lineTo(cx, h + 10);
      ctx.lineTo(cx + 35, h - 30);
      ctx.stroke();

      // 3. Neck
      ctx.fillStyle = '#E2B89A';
      ctx.beginPath();
      ctx.roundRect(cx - 16 + swayX, cy + 45 + swayY, 32, 45, 6);
      ctx.fill();

      // 4. Head Silhouette / Skin Tone
      const skinGrad = ctx.createLinearGradient(cx - 50, cy - 60, cx + 50, cy + 60);
      skinGrad.addColorStop(0, '#F5D0B5');
      skinGrad.addColorStop(1, '#E2B89A');
      ctx.fillStyle = skinGrad;
      ctx.beginPath();
      ctx.ellipse(cx + swayX, cy + swayY, 52, 64, 0, 0, Math.PI * 2);
      ctx.fill();

      // Subtle shadow under jaw
      ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
      ctx.beginPath();
      ctx.ellipse(cx + swayX, cy + 50 + swayY, 30, 12, 0, 0, Math.PI * 2);
      ctx.fill();

      // 5. Hair (Refined, professional educator styling)
      ctx.fillStyle = '#1E1B24';
      ctx.beginPath();
      ctx.ellipse(cx + swayX, cy - 30 + swayY, 58, 48, 0, Math.PI, 0, false);
      ctx.fill();

      // Hair side strands
      ctx.beginPath();
      ctx.ellipse(cx - 50 + swayX, cy + 10 + swayY, 14, 45, 0.2, 0, Math.PI * 2);
      ctx.ellipse(cx + 50 + swayX, cy + 10 + swayY, 14, 45, -0.2, 0, Math.PI * 2);
      ctx.fill();

      // 6. Eyebrows (Expression Adaptive)
      ctx.strokeStyle = '#2E2836';
      ctx.lineWidth = 3;
      ctx.beginPath();
      if (expression === 'inquiring' || presence === 'CHECKING') {
        // Left eyebrow raised
        ctx.moveTo(cx - 32 + swayX, cy - 18 + swayY);
        ctx.quadraticCurveTo(cx - 20 + swayX, cy - 24 + swayY, cx - 8 + swayX, cy - 16 + swayY);
        ctx.moveTo(cx + 8 + swayX, cy - 15 + swayY);
        ctx.quadraticCurveTo(cx + 20 + swayX, cy - 19 + swayY, cx + 32 + swayX, cy - 14 + swayY);
      } else if (expression === 'concerned' || presence === 'ADAPTING') {
        // Empathetic, supportive brow
        ctx.moveTo(cx - 32 + swayX, cy - 14 + swayY);
        ctx.quadraticCurveTo(cx - 20 + swayX, cy - 19 + swayY, cx - 8 + swayX, cy - 12 + swayY);
        ctx.moveTo(cx + 8 + swayX, cy - 12 + swayY);
        ctx.quadraticCurveTo(cx + 20 + swayX, cy - 19 + swayY, cx + 32 + swayX, cy - 14 + swayY);
      } else {
        // Friendly neutral
        ctx.moveTo(cx - 32 + swayX, cy - 15 + swayY);
        ctx.quadraticCurveTo(cx - 20 + swayX, cy - 20 + swayY, cx - 8 + swayX, cy - 14 + swayY);
        ctx.moveTo(cx + 8 + swayX, cy - 14 + swayY);
        ctx.quadraticCurveTo(cx + 20 + swayX, cy - 20 + swayY, cx + 32 + swayX, cy - 15 + swayY);
      }
      ctx.stroke();

      // 7. Eyes & Blinking
      if (frame > nextBlink) {
        blinkProgress += 0.2;
        if (blinkProgress >= Math.PI) {
          blinkProgress = 0;
          nextBlink = frame + 90 + Math.random() * 120;
        }
      }
      const eyeOpenness = Math.max(0.1, 1 - Math.sin(blinkProgress));

      const drawEye = (ex: number, ey: number) => {
        // Sclera
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.ellipse(ex + swayX, ey + swayY, 10, 6 * eyeOpenness, 0, 0, Math.PI * 2);
        ctx.fill();

        if (eyeOpenness > 0.3) {
          // Iris (intelligent hazel/cyan tint)
          ctx.fillStyle = '#2C5364';
          ctx.beginPath();
          ctx.arc(ex + swayX, ey + swayY, 4.5 * eyeOpenness, 0, Math.PI * 2);
          ctx.fill();

          // Pupil
          ctx.fillStyle = '#070B16';
          ctx.beginPath();
          ctx.arc(ex + swayX, ey + swayY, 2.2 * eyeOpenness, 0, Math.PI * 2);
          ctx.fill();

          // Catchlight
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(ex - 1.5 + swayX, ey - 1.5 + swayY, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      };

      drawEye(cx - 20, cy - 4);
      drawEye(cx + 20, cy - 4);

      // 8. Nose
      ctx.strokeStyle = 'rgba(180, 120, 90, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx + swayX, cy - 2 + swayY);
      ctx.lineTo(cx - 2 + swayX, cy + 18 + swayY);
      ctx.lineTo(cx + 4 + swayX, cy + 18 + swayY);
      ctx.stroke();

      // 9. Mouth (Lip-Sync Dynamic reactive to speech)
      const mouthY = cy + 34 + swayY;
      let mouthOpen = 2;
      if (isSpeaking) {
        // Natural phoneme oscillation
        mouthOpen = 3 + Math.abs(Math.sin(frame * 0.28)) * 8;
      }

      ctx.fillStyle = '#C86B6B';
      ctx.beginPath();
      if (mouthOpen > 4) {
        // Open speaking mouth with teeth hint
        ctx.ellipse(cx + swayX, mouthY, 12, mouthOpen, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(cx - 6 + swayX, mouthY - mouthOpen + 1, 12, 2.5);
      } else {
        // Closed gentle smile
        ctx.beginPath();
        ctx.arc(cx + swayX, mouthY - 4, 14, 0.2 * Math.PI, 0.8 * Math.PI, false);
        ctx.strokeStyle = '#B85555';
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      // 10. Intelligent Neural Beacon Ring around avatar (Subtle aura)
      ctx.strokeStyle = presence === 'ADAPTING' 
        ? 'rgba(245, 158, 11, 0.4)' 
        : isSpeaking 
        ? 'rgba(0, 242, 254, 0.4)' 
        : 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(cx, cy, 110, frame * 0.008, frame * 0.008 + Math.PI * 1.8);
      ctx.stroke();
      ctx.setLineDash([]);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [presence, expression, isSpeaking]);

  return (
    <div className="relative rounded-2xl bg-space-950 border border-space-800 overflow-hidden shadow-card-dark flex flex-col items-center justify-between p-4">
      
      {/* Top Presence & Studio HUD */}
      <div className="w-full flex items-center justify-between z-10">
        
        {/* Teacher ID badge */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-space-900/90 border border-space-700/80 backdrop-blur-md text-xs font-mono">
          <div className="w-2 h-2 rounded-full bg-cyan-electric animate-pulse" />
          <span className="font-semibold text-slate-100">Dr. Maya AI</span>
          <span className="text-[10px] text-space-400">Teacher Persona</span>
        </div>

        {/* Audio Mute Quick Toggle */}
        <button
          onClick={() => setMuted(!isMuted)}
          className={`p-1.5 rounded-lg border transition-all ${
            isMuted
              ? 'bg-rose-950/60 border-rose-800 text-rose-300'
              : 'bg-space-900 border-space-700 text-cyan-electric hover:bg-space-800'
          }`}
          title={isMuted ? 'Unmute Teacher' : 'Mute Teacher'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>

      </div>

      {/* Main Procedural Avatar Canvas */}
      <div className="relative my-2">
        <canvas
          ref={canvasRef}
          width={300}
          height={260}
          className="w-full max-w-[280px] h-[240px] rounded-2xl"
        />

        {/* Status Overlay Badge */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
          <div className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase backdrop-blur-md border shadow-sm ${
            presence === 'ADAPTING'
              ? 'bg-amber-500/20 text-amber-300 border-amber-400/50 animate-pulse'
              : presence === 'CHECKING'
              ? 'bg-indigo-500/20 text-indigo-300 border-indigo-400/50'
              : isSpeaking
              ? 'bg-cyan-electric/20 text-cyan-electric border-cyan-electric/50'
              : 'bg-space-900/90 text-space-400 border-space-700'
          }`}>
            {presence === 'ADAPTING' 
              ? '● ADAPTING EXPLANATION' 
              : presence === 'CHECKING' 
              ? '● WAITING FOR STUDENT...' 
              : isSpeaking 
              ? '● EXPLAINING' 
              : '● LISTENING'}
          </div>
        </div>
      </div>

      {/* Bottom Live Waveform Visualizer */}
      <div className="w-full flex items-center justify-between gap-2 pt-2 border-t border-space-800/80">
        <div className="flex items-center gap-1 text-[11px] font-mono text-space-400">
          <Mic className="w-3 h-3 text-cyan-electric" />
          <span>VOICE SYNTHESIS</span>
        </div>

        <AudioWaveformVisualizer isSpeaking={isSpeaking} />
      </div>

    </div>
  );
};
