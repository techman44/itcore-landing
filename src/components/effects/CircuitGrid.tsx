"use client";

import { useEffect, useRef, useState } from "react";

export function CircuitGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      setMousePos({ x: -1000, y: -1000 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const gridSize = 50;
    const glowRadius = 200;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scrollY = window.scrollY;

      // Draw vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        for (let y = 0; y <= canvas.height + gridSize; y += gridSize) {
          const worldY = y + scrollY;
          const segmentStartY = y;
          const segmentEndY = y + gridSize;

          // Calculate distance from mouse to this segment
          const closestY = Math.max(segmentStartY, Math.min(mousePos.y, segmentEndY));
          const dist = Math.sqrt(Math.pow(x - mousePos.x, 2) + Math.pow(closestY - mousePos.y, 2));

          if (dist < glowRadius) {
            const intensity = 1 - dist / glowRadius;
            const alpha = intensity * 0.12;

            // Create gradient for the glow effect
            const gradient = ctx.createLinearGradient(x, segmentStartY, x, segmentEndY);

            // Teal color with varying intensity
            const tealColor = `rgba(94, 234, 212, ${alpha})`;
            const orangeColor = `rgba(249, 115, 22, ${alpha * 0.5})`;

            gradient.addColorStop(0, tealColor);
            gradient.addColorStop(0.5, orangeColor);
            gradient.addColorStop(1, tealColor);

            ctx.beginPath();
            ctx.moveTo(x, segmentStartY);
            ctx.lineTo(x, segmentEndY);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1 + intensity;
            ctx.stroke();

            // Add nodes at intersections
            if (y % gridSize === 0 && dist < glowRadius * 0.6) {
              const nodeIntensity = 1 - dist / (glowRadius * 0.6);
              ctx.beginPath();
              ctx.arc(x, y, 1.5 + nodeIntensity * 1.5, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(94, 234, 212, ${nodeIntensity * 0.25})`;
              ctx.fill();
            }
          }
        }
      }

      // Draw horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        for (let x = 0; x <= canvas.width + gridSize; x += gridSize) {
          const segmentStartX = x;
          const segmentEndX = x + gridSize;

          // Calculate distance from mouse to this segment
          const closestX = Math.max(segmentStartX, Math.min(mousePos.x, segmentEndX));
          const dist = Math.sqrt(Math.pow(closestX - mousePos.x, 2) + Math.pow(y - mousePos.y, 2));

          if (dist < glowRadius) {
            const intensity = 1 - dist / glowRadius;
            const alpha = intensity * 0.12;

            const gradient = ctx.createLinearGradient(segmentStartX, y, segmentEndX, y);

            const tealColor = `rgba(94, 234, 212, ${alpha})`;
            const orangeColor = `rgba(249, 115, 22, ${alpha * 0.5})`;

            gradient.addColorStop(0, tealColor);
            gradient.addColorStop(0.5, orangeColor);
            gradient.addColorStop(1, tealColor);

            ctx.beginPath();
            ctx.moveTo(segmentStartX, y);
            ctx.lineTo(segmentEndX, y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1 + intensity;
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePos]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20"
      style={{ opacity: 0.8 }}
    />
  );
}
