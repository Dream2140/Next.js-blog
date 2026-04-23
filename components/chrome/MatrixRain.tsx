"use client";

import { useEffect, useRef } from "react";

const GLYPHS =
  "アァカサタナハマヤャラワガザダバパイィキシチニヒミリギジヂビピウゥクスツヌフムユュルグズブプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789<>/\\{}[]=+*&^%$#@!~?;:|".split(
    "",
  );

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    let width = 0;
    let height = 0;
    let columns = 0;
    let fontSize = 0;
    let animationFrame = 0;
    let drops: { y: number; speed: number; glyph: string }[] = [];

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      width = canvas.width = window.innerWidth * ratio;
      height = canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      fontSize = 16 * ratio;
      columns = Math.floor(width / fontSize);
      drops = new Array(columns).fill(null).map(() => ({
        y: Math.random() * -100,
        speed: 0.3 + Math.random() * 0.7,
        glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      }));
    };

    const tick = () => {
      context.fillStyle = "rgba(29, 32, 33, 0.08)";
      context.fillRect(0, 0, width, height);
      context.font = `${fontSize}px "IBM Plex Mono", monospace`;

      drops.forEach((drop, index) => {
        const x = index * fontSize;
        context.fillStyle = "rgba(184, 187, 38, 0.85)";
        context.fillText(drop.glyph, x, drop.y * fontSize);
        context.fillStyle = "rgba(152, 151, 26, 0.35)";
        context.fillText(drop.glyph, x, (drop.y - 1) * fontSize);
        drop.y += drop.speed;

        if (Math.random() > 0.97) {
          drop.glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }

        if (drop.y * fontSize > height && Math.random() > 0.975) {
          drop.y = Math.random() * -20;
          drop.speed = 0.3 + Math.random() * 0.7;
        }
      });

      animationFrame = window.requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas id="rain" ref={canvasRef} aria-hidden="true" />;
}
