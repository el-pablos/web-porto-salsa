'use client';

import { useEffect, useCallback } from 'react';

interface Spark {
  x: number;
  y: number;
  angle: number;
  speed: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

const COLORS = ['#6C63FF', '#FF6584', '#00D4AA', '#FFB347', '#ffffff'];

export function ClickSpark() {
  const createSparks = useCallback((x: number, y: number) => {
    const canvas = document.getElementById('click-spark-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const sparks: Spark[] = [];
    const sparkCount = 8 + Math.floor(Math.random() * 6);

    for (let i = 0; i < sparkCount; i++) {
      sparks.push({
        x,
        y,
        angle: (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.5,
        speed: 2 + Math.random() * 4,
        life: 1,
        maxLife: 0.4 + Math.random() * 0.3,
        size: 1.5 + Math.random() * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }

    let animId: number;

    const animate = () => {
      let alive = false;

      sparks.forEach((spark) => {
        if (spark.life <= 0) return;
        alive = true;

        spark.x += Math.cos(spark.angle) * spark.speed;
        spark.y += Math.sin(spark.angle) * spark.speed;
        spark.speed *= 0.94;
        spark.life -= 1 / 60 / spark.maxLife;

        const alpha = Math.max(0, spark.life);

        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size * alpha, 0, Math.PI * 2);
        ctx.fillStyle = spark.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });

      if (alive) {
        animId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.id = 'click-spark-canvas';
    canvas.style.cssText = 'position:fixed;inset:0;z-index:9999;pointer-events:none;';
    document.body.appendChild(canvas);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const handleClick = (e: MouseEvent) => {
      createSparks(e.clientX, e.clientY);
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('resize', resize);
      canvas.remove();
    };
  }, [createSparks]);

  return null;
}
