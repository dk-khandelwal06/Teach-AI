import React, { useEffect, useRef, useState } from 'react';
import { Waves, Sliders, ArrowDown, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';

export const WaterPipeAnalogyCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [constriction, setConstriction] = useState<number>(65); // 0 (wide) to 90 (tightly squeezed)

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let waterOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // 1. Water Tank / Pump on Left (Voltage Pressure)
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(20, 30, 80, 140);
      ctx.strokeStyle = '#00F2FE';
      ctx.lineWidth = 2;
      ctx.strokeRect(20, 30, 80, 140);

      // Water Level in Tank
      ctx.fillStyle = 'rgba(0, 242, 254, 0.4)';
      ctx.fillRect(22, 50, 76, 118);

      ctx.fillStyle = '#00F2FE';
      ctx.font = 'bold 11px monospace';
      ctx.fillText('WATER TANK', 26, 45);
      ctx.fillText('PUMP = V', 32, 110);
      ctx.font = '9px monospace';
      ctx.fillText('(Pressure)', 34, 125);

      // 2. Horizontal Pipe
      const pipeY = 85;
      const pipeH = 50;

      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.fillRect(100, pipeY, w - 160, pipeH);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(100, pipeY);
      ctx.lineTo(w - 60, pipeY);
      ctx.moveTo(100, pipeY + pipeH);
      ctx.lineTo(w - 60, pipeY + pipeH);
      ctx.stroke();

      // 3. Squeeze Clamp / Valve in Middle (Resistance)
      const valveX = w / 2 - 10;
      const squeezeAmount = (constriction / 100) * 18; // pipe constriction

      // Valve clamp body
      ctx.fillStyle = '#F59E0B';
      ctx.strokeStyle = '#F59E0B';
      ctx.fillRect(valveX - 15, pipeY - 25, 30, 25 + squeezeAmount);
      ctx.fillRect(valveX - 15, pipeY + pipeH - squeezeAmount, 30, 25 + squeezeAmount);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 10px monospace';
      ctx.fillText('VALVE (R)', valveX - 25, pipeY - 30);
      ctx.fillText('SQUEEZE', valveX - 22, pipeY - 15);

      // 4. Animated Water Stream (Current flow rate)
      const effectiveFlowRate = Math.max(0.3, (100 - constriction) / 25);
      waterOffset = (waterOffset + effectiveFlowRate) % 20;

      // Draw flowing water drops / waves
      ctx.fillStyle = '#0AE4BA';
      const numDrops = 14;
      for (let i = 0; i < numDrops; i++) {
        const dx = 105 + ((waterOffset + i * 22) % (w - 170));
        // Calculate y with constriction pinching
        let dy = pipeY + pipeH / 2;
        if (Math.abs(dx - valveX) < 25) {
          // Inside constriction zone
          dy = pipeY + pipeH / 2 + Math.sin(dx * 0.2) * (8 - squeezeAmount * 0.3);
        } else {
          dy = pipeY + pipeH / 2 + Math.sin(dx * 0.1) * 12;
        }

        ctx.beginPath();
        const dropRadius = Math.max(1.5, 4 - (constriction / 100) * 2.2);
        ctx.arc(dx, dy, dropRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5. Outflow Spout (Current Rate output)
      const outX = w - 60;
      ctx.fillStyle = '#0AE4BA';
      ctx.font = 'bold 11px monospace';
      ctx.fillText('FLOW (I)', outX - 10, pipeY - 10);
      ctx.fillText(`${((100 - constriction) / 50).toFixed(2)} L/s`, outX - 10, pipeY + pipeH + 20);

      // Water pouring down
      ctx.strokeStyle = '#0AE4BA';
      ctx.lineWidth = Math.max(1.5, 6 - (constriction / 100) * 4.5);
      ctx.beginPath();
      ctx.moveTo(outX, pipeY + pipeH / 2);
      ctx.quadraticCurveTo(outX + 20, pipeY + pipeH + 30, outX + 25, pipeY + pipeH + 60);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [constriction]);

  return (
    <div className="rounded-2xl bg-space-950 border border-amber-500/40 p-4 space-y-4 shadow-card-glow">
      
      {/* Analogy Diagnostic Banner */}
      <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs">
        <div className="flex items-center gap-2 text-amber-300 font-semibold">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Pedagogical Analogy: Water-Pipe Hydraulic Model</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
          ADAPTIVE STRATEGY
        </span>
      </div>

      {/* Hydraulic Simulator Canvas */}
      <div className="relative rounded-xl bg-space-900/80 border border-space-800 flex items-center justify-center p-2">
        <canvas
          ref={canvasRef}
          width={520}
          height={200}
          className="w-full max-w-[500px] h-[190px]"
        />
      </div>

      {/* Interactive Constriction Valve Slider */}
      <div className="p-3 rounded-xl bg-space-900 border border-space-800 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-amber-400 font-bold flex items-center gap-1">
            <Sliders className="w-3.5 h-3.5" /> Squeeze Pipe Constriction (Resistance R): {constriction}%
          </span>
          <span className="text-teach-emerald font-bold">
            Current Flow: {((100 - constriction) / 50).toFixed(2)} L/s
          </span>
        </div>
        <input
          type="range"
          min={10}
          max={90}
          step={5}
          value={constriction}
          onChange={(e) => setConstriction(Number(e.target.value))}
          className="w-full h-2 bg-space-950 rounded-lg appearance-none cursor-pointer accent-amber-400"
        />
        <div className="flex justify-between text-[10px] font-mono text-space-400">
          <span>Wide Open (Low R → High Flow I)</span>
          <span>Tightly Squeezed (High R → Tiny Flow I)</span>
        </div>
      </div>

      {/* Mathematical Conclusion */}
      <div className="p-3 rounded-xl bg-space-900/90 border border-space-750 flex items-center justify-between text-xs font-mono">
        <span className="text-space-300">
          Physical Law: <strong className="text-white">I = V / R</strong>
        </span>
        <span className="text-amber-300 font-bold">
          As Resistance (R) increases ↑, Current (I) MUST decrease ↓
        </span>
      </div>

    </div>
  );
};
