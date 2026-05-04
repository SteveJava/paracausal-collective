'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  opacityDelta: number;
  hue: number;
  trail: { x: number; y: number }[];
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove);

    const PARTICLE_COUNT = 120;
    const particles: Particle[] = [];

    const hues = [255, 258, 262, 265, 268, 272];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle(canvas));
    }

    function createParticle(canvas: HTMLCanvasElement): Particle {
      const hue = hues[Math.floor(Math.random() * hues.length)];
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4 - 0.1,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.6 + 0.1,
        opacityDelta: (Math.random() - 0.5) * 0.005,
        hue,
        trail: [],
      };
    }

    let frame = 0;

    function draw() {
      if (!ctx || !canvas) return;
      frame++;

      ctx.fillStyle = 'rgba(3, 3, 5, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particles) {
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          const force = (200 - dist) / 200;
          p.vx -= (dx / dist) * force * 0.05;
          p.vy -= (dy / dist) * force * 0.05;
        }

        p.vx *= 0.99;
        p.vy *= 0.99;
        p.x += p.vx;
        p.y += p.vy;

        p.opacity += p.opacityDelta;
        if (p.opacity <= 0.05 || p.opacity >= 0.75) p.opacityDelta *= -1;

        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 12) p.trail.shift();

        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        if (p.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let i = 1; i < p.trail.length; i++) {
            ctx.lineTo(p.trail[i].x, p.trail[i].y);
          }
          ctx.strokeStyle = `hsla(${p.hue}, 80%, 55%, ${p.opacity * 0.25})`;
          ctx.lineWidth = p.radius * 0.5;
          ctx.stroke();
        }

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
        grad.addColorStop(0, `hsla(${p.hue}, 80%, 55%, ${p.opacity})`);
        grad.addColorStop(1, `hsla(${p.hue}, 80%, 40%, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.15;
            const hue = (a.hue + b.hue) / 2;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `hsla(${hue}, 70%, 45%, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      if (frame % 4 === 0) {
        const bx = Math.random() * canvas.width;
        const by = Math.random() * canvas.height;
        const blen = Math.random() * 80 + 20;
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.lineTo(bx + (Math.random() - 0.5) * blen, by + (Math.random() - 0.5) * blen);
        ctx.strokeStyle = `rgba(55, 31, 118, ${Math.random() * 0.1})`;
        ctx.lineWidth = Math.random() * 1.5;
        ctx.stroke();
      }

      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, mixBlendMode: 'screen' }}
    />
  );
}
