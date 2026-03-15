'use client';

import { useEffect, useRef, useState } from 'react';

interface Sparkle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
  vx: number;
  vy: number;
  color: string;
}

const SPARKLE_COLORS = ['#FF99C8', '#CFBAF0', '#9ED2D6', '#FCB1D1', '#FFF9E1'];

export function SparkleTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const sparkles: Sparkle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let throttle = 0;
    const handleMouseMove = (e: MouseEvent) => {
      throttle++;
      if (throttle % 3 !== 0) return;

      for (let i = 0; i < 2; i++) {
        sparkles.push({
          x: e.clientX + (Math.random() - 0.5) * 16,
          y: e.clientY + (Math.random() - 0.5) * 16,
          size: Math.random() * 6 + 3,
          opacity: 0.8 + Math.random() * 0.2,
          rotation: Math.random() * 360,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const drawStar = (cx: number, cy: number, size: number, rotation: number, color: string, opacity: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(angle - 0.3) * size * 0.4, Math.sin(angle - 0.3) * size * 0.4);
        ctx.lineTo(Math.cos(angle) * size, Math.sin(angle) * size);
        ctx.lineTo(Math.cos(angle + 0.3) * size * 0.4, Math.sin(angle + 0.3) * size * 0.4);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.x += s.vx;
        s.y += s.vy;
        s.opacity -= 0.015;
        s.rotation += 2;
        s.size *= 0.98;

        if (s.opacity <= 0) {
          sparkles.splice(i, 1);
          continue;
        }

        drawStar(s.x, s.y, s.size, s.rotation, s.color, s.opacity);
      }

      // Limit sparkle count
      if (sparkles.length > 80) {
        sparkles.splice(0, sparkles.length - 80);
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9998] pointer-events-none"
      data-testid="sparkle-trail"
    />
  );
}
