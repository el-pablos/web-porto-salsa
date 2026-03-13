'use client';

import { useEffect, useRef } from 'react';

interface Pixel {
  x: number;
  y: number;
  size: number;
  opacity: number;
  targetOpacity: number;
  speed: number;
  color: string;
}

const PIXEL_COLORS = [
  'rgba(108, 99, 255, ',
  'rgba(255, 101, 132, ',
  'rgba(0, 212, 170, ',
];

export function PixelBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const pixelSize = 4;
    const gap = 40;
    const pixels: Pixel[] = [];

    const cols = Math.ceil(canvas.width / gap);
    const rows = Math.ceil(canvas.height / gap);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (Math.random() > 0.3) continue;
        pixels.push({
          x: i * gap + Math.random() * 10,
          y: j * gap + Math.random() * 10,
          size: pixelSize * (0.5 + Math.random() * 0.5),
          opacity: 0,
          targetOpacity: 0.02 + Math.random() * 0.06,
          speed: 0.002 + Math.random() * 0.005,
          color: PIXEL_COLORS[Math.floor(Math.random() * PIXEL_COLORS.length)],
        });
      }
    }

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      pixels.forEach((pixel) => {
        pixel.opacity = pixel.targetOpacity * (0.5 + 0.5 * Math.sin(time * pixel.speed * 100 + pixel.x + pixel.y));

        ctx.fillStyle = `${pixel.color}${Math.max(0, pixel.opacity)})`;
        ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      data-testid="pixel-background"
    />
  );
}
