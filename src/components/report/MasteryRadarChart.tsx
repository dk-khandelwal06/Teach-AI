import React, { useEffect, useRef } from 'react';

interface MasteryRadarChartProps {
  score: number;
}

export const MasteryRadarChart: React.FC<MasteryRadarChartProps> = ({ score }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const concepts = [
    { label: 'Voltage (V)', value: 0.95 },
    { label: 'Current (I)', value: 0.92 },
    { label: "Ohm's Law", value: 0.88 },
    { label: 'Resistance (R)', value: 0.82 },
    { label: 'Scaling (ρL/A)', value: 0.70 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const radius = 75;
    const total = concepts.length;

    ctx.clearRect(0, 0, w, h);

    // 1. Draw Background Concentric Polygons
    const levels = 4;
    for (let l = 1; l <= levels; l++) {
      const r = (radius / levels) * l;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < total; i++) {
        const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // 2. Draw Spokes
    for (let i = 0; i < total; i++) {
      const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    // 3. Draw Student Mastery Polygon
    ctx.fillStyle = 'rgba(0, 242, 254, 0.25)';
    ctx.strokeStyle = '#00F2FE';
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    for (let i = 0; i < total; i++) {
      const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
      const r = radius * concepts[i].value;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // 4. Draw Vertex Dots
    for (let i = 0; i < total; i++) {
      const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
      const r = radius * concepts[i].value;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      ctx.fillStyle = '#0AE4BA';
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // 5. Draw Labels
    ctx.fillStyle = '#CBD5E1';
    ctx.font = '10px monospace';
    ctx.textAlign = 'center';

    for (let i = 0; i < total; i++) {
      const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
      const lx = cx + Math.cos(angle) * (radius + 18);
      const ly = cy + Math.sin(angle) * (radius + 18) + 3;
      ctx.fillText(concepts[i].label, lx, ly);
    }

  }, [score]);

  return (
    <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-space-950 border border-space-800">
      <span className="text-[10px] font-mono text-cyan-brand uppercase tracking-wider mb-1">
        Concept Mastery Radar
      </span>
      <canvas
        ref={canvasRef}
        width={240}
        height={220}
        className="w-full max-w-[240px] h-[220px]"
      />
    </div>
  );
};
