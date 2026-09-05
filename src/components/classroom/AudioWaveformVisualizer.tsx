import React, { useEffect, useRef } from 'react';

interface AudioWaveformVisualizerProps {
  isSpeaking: boolean;
  barColor?: string;
}

export const AudioWaveformVisualizer: React.FC<AudioWaveformVisualizerProps> = ({
  isSpeaking,
  barColor = '#00F2FE'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const numBars = 32;
      const barWidth = width / numBars - 2;

      for (let i = 0; i < numBars; i++) {
        let barHeight = 4;
        if (isSpeaking) {
          // Dynamic harmonic audio wave simulation
          const freq = (i / numBars) * Math.PI * 4 + phase;
          const amp = Math.sin(freq) * 0.5 + 0.5;
          const noise = Math.sin(freq * 2.3 + phase * 1.5) * 0.3;
          barHeight = Math.max(6, (amp + noise) * (height - 8));
        }

        const x = i * (barWidth + 2);
        const y = (height - barHeight) / 2;

        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        gradient.addColorStop(0, '#00F2FE');
        gradient.addColorStop(0.5, '#0AE4BA');
        gradient.addColorStop(1, '#3B82F6');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 2);
        ctx.fill();
      }

      phase += 0.08;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isSpeaking]);

  return (
    <canvas
      ref={canvasRef}
      width={240}
      height={36}
      className="w-full max-w-[220px] h-9"
    />
  );
};
