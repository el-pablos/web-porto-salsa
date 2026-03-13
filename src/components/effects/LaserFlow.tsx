'use client';

import { useEffect, useRef } from 'react';

const FPS_LIMIT = 30;
const FRAME_INTERVAL = 1000 / FPS_LIMIT;

export function LaserFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let lastTime = 0;
    let time = 0;
    let paused = false;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 250);
    };
    window.addEventListener('resize', debouncedResize);

    const lines: Array<{
      x: number;
      y: number;
      angle: number;
      speed: number;
      length: number;
      color: string;
      opacity: number;
    }> = [];

    const colors = [
      'rgba(232, 132, 154, ',
      'rgba(184, 169, 212, ',
      'rgba(244, 184, 193, ',
    ];

    for (let i = 0; i < 10; i++) {
      lines.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        angle: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.6,
        length: 80 + Math.random() * 150,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0.05 + Math.random() * 0.12,
      });
    }

    const animate = (timestamp: number) => {
      if (paused) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      if (timestamp - lastTime < FRAME_INTERVAL) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      lastTime = timestamp;

      ctx.fillStyle = 'rgba(255, 240, 245, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.005;

      lines.forEach((line) => {
        line.angle += Math.sin(time + line.x * 0.001) * 0.02;
        line.x += Math.cos(line.angle) * line.speed;
        line.y += Math.sin(line.angle) * line.speed;

        if (line.x < -100) line.x = canvas.width + 100;
        if (line.x > canvas.width + 100) line.x = -100;
        if (line.y < -100) line.y = canvas.height + 100;
        if (line.y > canvas.height + 100) line.y = -100;

        const endX = line.x + Math.cos(line.angle) * line.length;
        const endY = line.y + Math.sin(line.angle) * line.length;

        const gradient = ctx.createLinearGradient(line.x, line.y, endX, endY);
        gradient.addColorStop(0, `${line.color}0)`);
        gradient.addColorStop(0.5, `${line.color}${line.opacity})`);
        gradient.addColorStop(1, `${line.color}0)`);

        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    const handleVisibilityChange = () => {
      paused = document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', debouncedResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      data-testid="laser-flow"
    />
  );
}
