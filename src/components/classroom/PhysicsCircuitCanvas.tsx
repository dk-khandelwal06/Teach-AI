import React, { useState, useEffect, useRef } from 'react';
import { useLesson } from '../../store/useLessonStore';
import { Zap, Gauge, Lightbulb, Sliders, Play, RotateCcw, Sparkles } from 'lucide-react';

export const PhysicsCircuitCanvas: React.FC = () => {
  const { circuitVoltage, circuitResistance, setCircuitParams } = useLesson();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Local state for smooth slider manipulation
  const [voltage, setVoltage] = useState<number>(circuitVoltage || 12);
  const [resistance, setResistance] = useState<number>(circuitResistance || 10);

  const current = Number((voltage / Math.max(1, resistance)).toFixed(2));
  const power = Number((voltage * current).toFixed(1));

  const handleVoltageChange = (val: number) => {
    setVoltage(val);
    setCircuitParams(val, resistance);
  };

  const handleResistanceChange = (val: number) => {
    setResistance(val);
    setCircuitParams(voltage, val);
  };

  // Canvas electron flow simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let electronOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Circuit dimensions
      const padX = 40;
      const padY = 30;
      const cw = w - padX * 2;
      const ch = h - padY * 2;

      // 1. Draw Circuit Wire Loop
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.roundRect(padX, padY, cw, ch, 16);
      ctx.stroke();

      // Active glowing wire overlay
      ctx.strokeStyle = '#00F2FE';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#00F2FE';
      ctx.shadowBlur = Math.min(15, current * 6);
      ctx.stroke();
      ctx.shadowBlur = 0; // reset

      // 2. Animate Drifting Electrons along perimeter
      // Speed proportional to current (I = V/R)
      const speed = Math.max(0.4, current * 1.8);
      electronOffset = (electronOffset + speed) % (2 * (cw + ch));

      const numElectrons = 20;
      const perimeter = 2 * (cw + ch);

      for (let i = 0; i < numElectrons; i++) {
        const dist = (electronOffset + (i / numElectrons) * perimeter) % perimeter;
        let ex = padX;
        let ey = padY;

        if (dist < cw) {
          // Top wire: left to right
          ex = padX + dist;
          ey = padY;
        } else if (dist < cw + ch) {
          // Right wire: top to bottom
          ex = padX + cw;
          ey = padY + (dist - cw);
        } else if (dist < cw * 2 + ch) {
          // Bottom wire: right to left
          ex = padX + cw - (dist - (cw + ch));
          ey = padY + ch;
        } else {
          // Left wire: bottom to top
          ex = padX;
          ey = padY + ch - (dist - (cw * 2 + ch));
        }

        // Draw electron particle
        ctx.fillStyle = '#0AE4BA';
        ctx.shadowColor = '#0AE4BA';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(ex, ey, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 3. Draw Battery on Left Wire
      const batY = padY + ch / 2;
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(padX - 12, batY - 24, 24, 48);
      ctx.strokeStyle = '#00F2FE';
      ctx.lineWidth = 2;
      ctx.strokeRect(padX - 12, batY - 24, 24, 48);

      // Battery plates
      ctx.strokeStyle = '#00F2FE';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(padX - 8, batY - 8);
      ctx.lineTo(padX + 8, batY - 8);
      ctx.moveTo(padX - 4, batY + 8);
      ctx.lineTo(padX + 4, batY + 8);
      ctx.stroke();

      ctx.fillStyle = '#00F2FE';
      ctx.font = 'bold 10px monospace';
      ctx.fillText(`+ ${voltage}V`, padX - 18, batY - 30);

      // 4. Draw Resistor on Top Wire
      const resX = padX + cw / 2;
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(resX - 28, padY - 14, 56, 28);
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 2;
      ctx.strokeRect(resX - 28, padY - 14, 56, 28);

      // Resistor Zigzag
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(resX - 22, padY);
      ctx.lineTo(resX - 14, padY - 7);
      ctx.lineTo(resX - 6, padY + 7);
      ctx.lineTo(resX + 2, padY - 7);
      ctx.lineTo(resX + 10, padY + 7);
      ctx.lineTo(resX + 22, padY);
      ctx.stroke();

      ctx.fillStyle = '#F59E0B';
      ctx.font = 'bold 10px monospace';
      ctx.fillText(`${resistance} Ω (R)`, resX - 18, padY - 20);

      // 5. Draw Lightbulb on Bottom Wire (Brightness scales with power)
      const bulbX = padX + cw / 2;
      const bulbY = padY + ch;

      // Glow halo
      const bulbGlow = Math.min(45, (power / 28) * 45);
      const bulbGrad = ctx.createRadialGradient(bulbX, bulbY, 2, bulbX, bulbY, bulbGlow);
      bulbGrad.addColorStop(0, 'rgba(255, 230, 100, 0.9)');
      bulbGrad.addColorStop(0.4, 'rgba(255, 180, 0, 0.4)');
      bulbGrad.addColorStop(1, 'rgba(255, 180, 0, 0)');
      ctx.fillStyle = bulbGrad;
      ctx.beginPath();
      ctx.arc(bulbX, bulbY, bulbGlow, 0, Math.PI * 2);
      ctx.fill();

      // Bulb base
      ctx.fillStyle = '#1E293B';
      ctx.beginPath();
      ctx.arc(bulbX, bulbY, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 6. Draw Ammeter on Right Wire
      const ammeterY = padY + ch / 2;
      const ammeterX = padX + cw;

      ctx.fillStyle = '#0B1124';
      ctx.beginPath();
      ctx.arc(ammeterX, ammeterY, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#10B981';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#10B981';
      ctx.font = 'bold 10px monospace';
      ctx.fillText('A', ammeterX - 4, ammeterY + 4);
      ctx.fillText(`${current}A`, ammeterX + 24, ammeterY + 4);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [voltage, resistance, current, power]);

  return (
    <div className="rounded-2xl bg-space-950 border border-space-800 p-4 space-y-4 shadow-card-dark">
      
      {/* Top Header & Mathematical Invariant */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-space-800/80">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-electric/15 text-cyan-electric">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Live Ohm's Law Circuit Simulation</h4>
            <p className="text-[11px] font-mono text-space-400">Interactive Cause-and-Effect Laboratory</p>
          </div>
        </div>

        {/* Live Equation Pill */}
        <div className="px-3 py-1.5 rounded-xl bg-space-900 border border-cyan-electric/30 flex items-center gap-2 font-mono text-xs">
          <span className="text-cyan-electric font-bold">I</span>
          <span className="text-space-500">=</span>
          <span className="text-cyan-brand font-bold">V ({voltage}V)</span>
          <span className="text-space-500">/</span>
          <span className="text-amber-400 font-bold">R ({resistance}Ω)</span>
          <span className="text-space-500">=</span>
          <span className="text-teach-emerald font-extrabold text-sm">{current} A</span>
        </div>
      </div>

      {/* Circuit Simulation Canvas */}
      <div className="relative rounded-xl bg-space-900/60 border border-space-800 flex items-center justify-center p-2">
        <canvas
          ref={canvasRef}
          width={520}
          height={220}
          className="w-full max-w-[500px] h-[210px]"
        />

        <div className="absolute top-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded bg-space-950/80 text-space-400 border border-space-800">
          ● Electron Drift Active ({Math.round(current * 100)} ms⁻¹)
        </div>
      </div>

      {/* Interactive Controls (Sliders) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
        
        {/* Voltage Slider */}
        <div className="p-3 rounded-xl bg-space-900 border border-space-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-cyan-electric font-semibold flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> Voltage (V): {voltage} V
            </span>
            <span className="text-space-400 text-[10px]">Electrical Push</span>
          </div>
          <input
            type="range"
            min={1}
            max={24}
            step={1}
            value={voltage}
            onChange={(e) => handleVoltageChange(Number(e.target.value))}
            className="w-full h-2 bg-space-950 rounded-lg appearance-none cursor-pointer accent-cyan-electric"
          />
          <div className="flex justify-between text-[10px] font-mono text-space-500">
            <span>1V (Gentle)</span>
            <span>12V (Car Battery)</span>
            <span>24V (High)</span>
          </div>
        </div>

        {/* Resistance Slider */}
        <div className="p-3 rounded-xl bg-space-900 border border-space-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-amber-400 font-semibold flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5" /> Resistance (R): {resistance} Ω
            </span>
            <span className="text-space-400 text-[10px]">Opposition / Friction</span>
          </div>
          <input
            type="range"
            min={2}
            max={50}
            step={2}
            value={resistance}
            onChange={(e) => handleResistanceChange(Number(e.target.value))}
            className="w-full h-2 bg-space-950 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
          <div className="flex justify-between text-[10px] font-mono text-space-500">
            <span>2Ω (Low Obstacle)</span>
            <span>25Ω (Medium)</span>
            <span>50Ω (Heavy Constriction)</span>
          </div>
        </div>

      </div>

    </div>
  );
};
