"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function MeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create gradient background
      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.8
      );
      bgGradient.addColorStop(0, "#0a0a1a");
      bgGradient.addColorStop(1, "#04040D");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Orb 1 - Primary blue (top-left)
      const orb1X = canvas.width * 0.2 + Math.sin(time * 0.7) * 100;
      const orb1Y = canvas.height * 0.25 + Math.cos(time * 0.5) * 80;
      const orb1Gradient = ctx.createRadialGradient(orb1X, orb1Y, 0, orb1X, orb1Y, 400);
      orb1Gradient.addColorStop(0, "rgba(0, 157, 255, 0.3)");
      orb1Gradient.addColorStop(0.5, "rgba(0, 157, 255, 0.1)");
      orb1Gradient.addColorStop(1, "rgba(0, 157, 255, 0)");
      ctx.fillStyle = orb1Gradient;
      ctx.beginPath();
      ctx.arc(orb1X, orb1Y, 400, 0, Math.PI * 2);
      ctx.fill();

      // Orb 2 - Deep navy (bottom-right)
      const orb2X = canvas.width * 0.75 + Math.cos(time * 0.6) * 120;
      const orb2Y = canvas.height * 0.7 + Math.sin(time * 0.8) * 100;
      const orb2Gradient = ctx.createRadialGradient(orb2X, orb2Y, 0, orb2X, orb2Y, 500);
      orb2Gradient.addColorStop(0, "rgba(0, 60, 120, 0.4)");
      orb2Gradient.addColorStop(0.5, "rgba(0, 40, 80, 0.2)");
      orb2Gradient.addColorStop(1, "rgba(0, 20, 40, 0)");
      ctx.fillStyle = orb2Gradient;
      ctx.beginPath();
      ctx.arc(orb2X, orb2Y, 500, 0, Math.PI * 2);
      ctx.fill();

      // Orb 3 - Light blue (center)
      const orb3X = canvas.width * 0.5 + Math.sin(time * 0.4) * 80;
      const orb3Y = canvas.height * 0.5 + Math.cos(time * 0.6) * 60;
      const orb3Gradient = ctx.createRadialGradient(orb3X, orb3Y, 0, orb3X, orb3Y, 350);
      orb3Gradient.addColorStop(0, "rgba(64, 186, 255, 0.2)");
      orb3Gradient.addColorStop(0.5, "rgba(64, 186, 255, 0.08)");
      orb3Gradient.addColorStop(1, "rgba(64, 186, 255, 0)");
      ctx.fillStyle = orb3Gradient;
      ctx.beginPath();
      ctx.arc(orb3X, orb3Y, 350, 0, Math.PI * 2);
      ctx.fill();

      // Small accent orbs
      const accentOrbX = canvas.width * 0.85 + Math.sin(time * 0.3) * 50;
      const accentOrbY = canvas.height * 0.15 + Math.cos(time * 0.4) * 40;
      const accentGradient = ctx.createRadialGradient(accentOrbX, accentOrbY, 0, accentOrbX, accentOrbY, 150);
      accentGradient.addColorStop(0, "rgba(0, 157, 255, 0.15)");
      accentGradient.addColorStop(1, "rgba(0, 157, 255, 0)");
      ctx.fillStyle = accentGradient;
      ctx.beginPath();
      ctx.arc(accentOrbX, accentOrbY, 150, 0, Math.PI * 2);
      ctx.fill();

      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ pointerEvents: "none" }}
    />
  );
}

export function MeshBackgroundSimple() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#04040D] via-[#0a0a1a] to-[#04040D]" />
      
      {/* Animated orbs */}
      <div 
        className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full animate-breathe"
        style={{
          background: "radial-gradient(circle, rgba(0, 157, 255, 0.3) 0%, rgba(0, 157, 255, 0.1) 40%, transparent 70%)",
          transform: "translate(-20%, -10%)",
        }}
      />
      <div 
        className="absolute bottom-0 right-0 w-[900px] h-[900px] rounded-full animate-breathe"
        style={{
          background: "radial-gradient(circle, rgba(0, 60, 120, 0.4) 0%, rgba(0, 40, 80, 0.2) 40%, transparent 70%)",
          transform: "translate(20%, 20%)",
          animationDelay: "-4s",
        }}
      />
      <div 
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full animate-breathe"
        style={{
          background: "radial-gradient(circle, rgba(64, 186, 255, 0.2) 0%, rgba(64, 186, 255, 0.08) 40%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          animationDelay: "-2s",
        }}
      />
      
      {/* Noise overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
