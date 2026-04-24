'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const DragonVisualization: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Article text explaining the concept demo
    const baseText = `The intersection of dynamic rendering and physics-based typography opens new paradigms for digital interaction. In this concept demonstration, an ethereal, kinematic Eastern dragon serves as a living force field. As the entity navigates the viewport, its skeletal structure—driven by inverse kinematics—displaces the surrounding typographic elements in real-time. Each word functions as an independent physical body bound by spring constraints, reacting to the dragon's proximity through calculated distance fields. The resulting visual is enhanced by a post-processing bloom effect, blending a dark neon aura with screen compositing to simulate pure energy. This experiment showcases how modern web technologies can elevate traditional reading experiences into immersive, reactive environments.

By treating typography not as static pixels, but as a fluid medium, we bridge the gap between content and interactive art. The dragon itself is constructed using a series of connected segments, each following the one before it to create a natural, slithering motion. The head tracks the user's input, while the body trails behind, applying a repulsive force to any text it encounters. This repulsive force is calculated based on the distance between each word and the nearest segment of the dragon. When a word falls within the dragon's radius, it is pushed outward, creating a parting effect that mimics a physical interaction.

To maintain readability, the words are constrained by a relaxation algorithm. This algorithm ensures that words do not overlap with each other, pushing neighboring words aside as needed to make room. The result is a dynamic, self-organizing layout that adapts to the dragon's presence. The visual aesthetic is heavily inspired by brutalist and minimalist design principles, combined with a touch of cyberpunk neon. The dark background and subtle text provide a canvas for the vibrant, glowing dragon to stand out, creating a striking contrast.

Ultimately, this project is an exploration of what is possible when we combine physics, typography, and interactive design. It challenges the traditional notion of a web page as a static document, offering a glimpse into a future where content is alive and responsive.`;

    const textContent = baseText.repeat(3);

    type WordData = {
      text: string;
      baseX: number;
      width: number;
      x: number;
      vx: number;
      prevX: number;
      targetX: number;
    };

    type LineData = {
      y: number;
      height: number;
      words: WordData[];
      font: string;
      fillStyle: string;
      shadowBlur?: number;
      shadowColor?: string;
      isTitle?: boolean;
    };

    let lines: LineData[] = [];
    let startX = 0;
    let endX = 0;

    const layoutText = () => {
      lines = [];
      const marginX = width * 0.08;
      let currentY = height * 0.12;

      // --- TITLE LAYOUT ---
      const titleSize = Math.max(28, Math.min(90, width * 0.09));
      const titleFont1 = `400 ${titleSize}px 'Playfair Display', serif`;
      const titleFont2 = `italic 400 ${titleSize}px 'Playfair Display', serif`;

      const layoutLetters = (
        text: string,
        startX: number,
        y: number,
        font: string,
        fillStyle: string,
        height: number,
        shadowBlur = 0,
        shadowColor = ''
      ) => {
        ctx.font = font;
        const words: WordData[] = [];
        for (let i = 0; i < text.length; i++) {
          const char = text[i];
          const prefixWidth = ctx.measureText(text.substring(0, i)).width;
          const charWidth = ctx.measureText(char).width;
          const charX = startX + prefixWidth;
          words.push({
            text: char,
            baseX: charX,
            width: charWidth,
            x: charX,
            vx: 0,
            prevX: charX,
            targetX: charX,
          });
        }
        lines.push({
          y,
          height,
          font,
          fillStyle,
          shadowBlur,
          shadowColor,
          words,
          isTitle: true,
        });
      };

      layoutLetters('KINEMATIC', marginX, currentY, titleFont1, '#E4E3E0', titleSize);
      currentY += titleSize * 0.85;
      layoutLetters(
        'TYPOGRAPHY',
        marginX,
        currentY,
        titleFont2,
        '#ff4500',
        titleSize,
        25,
        'rgba(255,69,0,0.8)'
      );
      currentY += titleSize * 1.4;

      const subFont = `300 10px 'Inter', monospace`;
      ctx.font = subFont;
      const subText = 'Vol. 01 // Interactive Force Fields';
      const subWidth = ctx.measureText(subText).width;
      lines.push({
        y: currentY,
        height: 10,
        font: subFont,
        fillStyle: 'rgba(228, 227, 224, 0.6)',
        words: [
          {
            text: subText,
            baseX: marginX + 100,
            width: subWidth,
            x: marginX + 100,
            vx: 0,
            prevX: marginX + 100,
            targetX: marginX + 100,
          },
        ],
        isTitle: true,
      });

      currentY += Math.min(100, height * 0.12);

      // --- PARAGRAPH LAYOUT ---
      const bodyFont = "300 12px 'Inter', sans-serif";
      ctx.font = bodyFont;
      const marginTop = currentY;
      const marginBottom = height * 0.1;
      const numColumns = width > 1024 ? 3 : width > 768 ? 2 : 1;
      const columnGap = width * 0.06;
      const columnWidth = (width - marginX * 2 - columnGap * (numColumns - 1)) / numColumns;

      let currentColumn = 0;
      startX = marginX;
      endX = startX + columnWidth;
      let y = marginTop;
      const lineHeight = 24;
      let isFull = false;

      const paragraphs = textContent.split('\n');
      for (const p of paragraphs) {
        if (isFull) break;
        const pWords = p.split(' ').filter((w) => w.length > 0);
        let currentLineWords: { text: string; width: number }[] = [];
        let currentLineWidth = 0;
        const spaceWidth = ctx.measureText(' ').width;

        for (const word of pWords) {
          if (isFull) break;
          const metrics = ctx.measureText(word);
          const wordWidth = metrics.width;
          if (currentLineWidth + wordWidth > columnWidth && currentLineWords.length > 0) {
            const extraSpace = columnWidth - currentLineWidth + spaceWidth;
            const spaceAdd = currentLineWords.length > 1 ? extraSpace / (currentLineWords.length - 1) : 0;
            let lineX = startX;
            const finalWords: WordData[] = [];
            currentLineWords.forEach((w) => {
              finalWords.push({
                text: w.text,
                baseX: lineX,
                width: w.width,
                x: lineX,
                vx: 0,
                prevX: lineX,
                targetX: lineX,
              });
              lineX += w.width + spaceWidth + spaceAdd;
            });
            lines.push({
              y,
              height: lineHeight,
              font: bodyFont,
              fillStyle: 'rgba(255, 255, 255, 0.4)',
              words: finalWords,
            });
            y += lineHeight;
            currentLineWords = [];
            currentLineWidth = 0;
            if (y > height - marginBottom) {
              currentColumn++;
              if (currentColumn >= numColumns) {
                isFull = true;
                break;
              }
              startX = marginX + currentColumn * (columnWidth + columnGap);
              endX = startX + columnWidth;
              y = marginTop;
            }
          }
          currentLineWords.push({ text: word, width: wordWidth });
          currentLineWidth += wordWidth + spaceWidth;
        }
        if (currentLineWords.length > 0 && !isFull) {
          let lineX = startX;
          const finalWords: WordData[] = [];
          currentLineWords.forEach((w) => {
            finalWords.push({
              text: w.text,
              baseX: lineX,
              width: w.width,
              x: lineX,
              vx: 0,
              prevX: lineX,
              targetX: lineX,
            });
            lineX += w.width + spaceWidth;
          });
          lines.push({
            y,
            height: lineHeight,
            font: bodyFont,
            fillStyle: 'rgba(255, 255, 255, 0.4)',
            words: finalWords,
          });
          y += lineHeight * 1.5;
          if (y > height - marginBottom) {
            currentColumn++;
            if (currentColumn >= numColumns) {
              isFull = true;
            } else {
              startX = marginX + currentColumn * (columnWidth + columnGap);
              endX = startX + columnWidth;
              y = marginTop;
            }
          }
        }
      }
    };

    layoutText();

    const numSegments = 120;
    const segmentLength = 6;
    const dragonStartX = width * 0.85;
    const dragonStartY = height * 0.18;

    const segments = Array.from({ length: numSegments }, (_, i) => ({
      x: dragonStartX - i * segmentLength * 0.7 + Math.sin(i * 0.09) * 80,
      y: dragonStartY + i * segmentLength * 0.55 + Math.cos(i * 0.09) * 40,
      angle: Math.PI + 0.4,
    }));

    let mouseX = dragonStartX;
    let mouseY = dragonStartY;
    let baseTargetX = dragonStartX;
    let baseTargetY = dragonStartY;
    let targetX = dragonStartX;
    let targetY = dragonStartY;
    let hasMouseInput = false;
    let hasActiveTouch = false;
    let autoAngle = 0;

    const handleMouseMove = (e: MouseEvent) => {
      hasMouseInput = true;
      baseTargetX = e.clientX;
      baseTargetY = e.clientY;
    };

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      hasActiveTouch = true;
      baseTargetX = e.touches[0].clientX;
      baseTargetY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      hasActiveTouch = true;
      baseTargetX = e.touches[0].clientX;
      baseTargetY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      hasActiveTouch = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        width = window.innerWidth;
        height = window.innerHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(dpr, dpr);
        layoutText();
      }, 200);
    };
    window.addEventListener('resize', handleResize);

    let time = 0;
    let collisionNodes: { x: number; y: number; radius: number }[] = [];
    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
    }[] = [];

    let smoothHeadAngle = segments[0].angle;

    const drawDragon = () => {
      collisionNodes = [];
      if (!hasActiveTouch && !hasMouseInput) {
        autoAngle += 0.008;
        baseTargetX = width * 0.5 + Math.sin(autoAngle * 1.1) * width * 0.38;
        baseTargetY = height * 0.5 + Math.sin(autoAngle * 0.7 + 1.0) * height * 0.3;
      }

      targetX = baseTargetX;
      targetY = baseTargetY;
      mouseX += (targetX - mouseX) * 0.12;
      mouseY += (targetY - mouseY) * 0.12;

      segments[0] = { x: mouseX, y: mouseY, angle: smoothHeadAngle };
      for (let i = 1; i < numSegments; i++) {
        const dx = segments[i - 1].x - segments[i].x;
        const dy = segments[i - 1].y - segments[i].y;
        const angle = Math.atan2(dy, dx);
        segments[i] = {
          x: segments[i - 1].x - Math.cos(angle) * segmentLength,
          y: segments[i - 1].y - Math.sin(angle) * segmentLength,
          angle: angle,
        };
      }
      const rawHeadAngle = Math.atan2(
        segments[0].y - segments[1].y,
        segments[0].x - segments[1].x
      );
      let diff = rawHeadAngle - smoothHeadAngle;
      if (diff > Math.PI) diff -= Math.PI * 2;
      if (diff < -Math.PI) diff += Math.PI * 2;
      smoothHeadAngle += diff * 0.18;
      segments[0] = { x: mouseX, y: mouseY, angle: smoothHeadAngle };

      const bodyProfile = (t: number): number => {
        if (t < 0.04) return 14 + (t / 0.04) * 4;
        if (t < 0.12) return 18 - ((t - 0.04) / 0.08) * 4;
        if (t < 0.22) return 14 + ((t - 0.12) / 0.1) * 12;
        if (t < 0.38) return 26 - ((t - 0.22) / 0.16) * 4;
        if (t < 0.6) return 22 - ((t - 0.38) / 0.22) * 6;
        if (t < 0.75) return 16 - ((t - 0.6) / 0.15) * 6;
        return 10 * Math.pow(1 - (t - 0.75) / 0.25, 1.8);
      };

      const dorsalProfile = (t: number): number => {
        if (t < 0.08 || t > 0.85) return 0;
        const core = Math.sin(((t - 0.08) / 0.77) * Math.PI);
        return core * 18 + 4;
      };

      const ventralProfile = (t: number): number => {
        if (t < 0.1 || t > 0.8) return bodyProfile(t) * 0.85;
        return bodyProfile(t) * 0.78;
      };

      const leftPoints: { x: number; y: number }[] = [];
      const rightPoints: { x: number; y: number }[] = [];
      const centerPoints: { x: number; y: number }[] = [];
      const dorsalPts: { x: number; y: number }[] = [];

      const limbSegs = [
        { idx: Math.floor(numSegments * 0.2), side: 1, scale: 1.0 },
        { idx: Math.floor(numSegments * 0.2), side: -1, scale: 1.0 },
        { idx: Math.floor(numSegments * 0.55), side: 1, scale: 0.85 },
        { idx: Math.floor(numSegments * 0.55), side: -1, scale: 0.85 },
      ];

      for (let i = 0; i < numSegments; i++) {
        const seg = segments[i];
        const t = i / numSegments;
        const bw = bodyProfile(t);
        const dh = dorsalProfile(t);
        const vw = ventralProfile(t);
        const nx = Math.cos(seg.angle - Math.PI / 2);
        const ny = Math.sin(seg.angle - Math.PI / 2);

        leftPoints.push({ x: seg.x + nx * bw, y: seg.y + ny * bw });
        rightPoints.push({ x: seg.x - nx * vw, y: seg.y - ny * vw });
        centerPoints.push({ x: seg.x, y: seg.y });
        dorsalPts.push({ x: seg.x + nx * (bw + dh), y: seg.y + ny * (bw + dh) });

        collisionNodes.push({ x: seg.x, y: seg.y, radius: Math.max(bw, vw) + 14 });
      }

      ctx.save();
      ctx.shadowBlur = 18;
      ctx.shadowColor = '#ff4500';
      ctx.globalCompositeOperation = 'screen';

      const strokePath = (fn: () => void, color: string, lw: number) => {
        ctx.beginPath();
        ctx.lineWidth = lw;
        ctx.strokeStyle = color;
        fn();
        ctx.stroke();
      };

      // 1. CROSS-SECTIONAL RINGS
      strokePath(() => {
        const ringStep = 3;
        for (let i = 0; i < numSegments - ringStep; i += ringStep) {
          const t = i / numSegments;
          const bw = bodyProfile(t);
          const vw = ventralProfile(t);
          const dh = dorsalProfile(t);
          const seg = segments[i];
          const nx = Math.cos(seg.angle - Math.PI / 2);
          const ny = Math.sin(seg.angle - Math.PI / 2);

          const d = { x: seg.x + nx * (bw + dh), y: seg.y + ny * (bw + dh) };
          const l = { x: seg.x + nx * bw, y: seg.y + ny * bw };
          const v = { x: seg.x - nx * vw, y: seg.y - ny * vw };

          ctx.moveTo(d.x, d.y);
          ctx.bezierCurveTo(
            l.x + Math.cos(seg.angle) * bw * 0.6,
            l.y + Math.sin(seg.angle) * bw * 0.6,
            v.x + Math.cos(seg.angle) * vw * 0.3,
            v.y + Math.sin(seg.angle) * vw * 0.3,
            v.x,
            v.y
          );
          ctx.bezierCurveTo(
            v.x - Math.cos(seg.angle) * vw * 0.3,
            v.y - Math.sin(seg.angle) * vw * 0.3,
            d.x - Math.cos(seg.angle) * bw * 0.4,
            d.y - Math.sin(seg.angle) * bw * 0.4,
            d.x,
            d.y
          );
        }
      }, 'rgba(255, 80, 0, 0.25)', 0.8);

      // 2. LONGITUDINAL WIRES
      strokePath(() => {
        ctx.moveTo(centerPoints[0].x, centerPoints[0].y);
        for (let i = 1; i < numSegments; i++) ctx.lineTo(centerPoints[i].x, centerPoints[i].y);

        ctx.moveTo(dorsalPts[0].x, dorsalPts[0].y);
        for (let i = 1; i < numSegments; i++) ctx.lineTo(dorsalPts[i].x, dorsalPts[i].y);

        ctx.moveTo(leftPoints[0].x, leftPoints[0].y);
        for (let i = 1; i < numSegments; i++) ctx.lineTo(leftPoints[i].x, leftPoints[i].y);

        ctx.moveTo(rightPoints[0].x, rightPoints[0].y);
        for (let i = 1; i < numSegments; i++) ctx.lineTo(rightPoints[i].x, rightPoints[i].y);

        ctx.moveTo(
          leftPoints[0].x * 0.5 + centerPoints[0].x * 0.5,
          leftPoints[0].y * 0.5 + centerPoints[0].y * 0.5
        );
        for (let i = 1; i < numSegments; i++)
          ctx.lineTo(
            leftPoints[i].x * 0.5 + dorsalPts[i].x * 0.5,
            leftPoints[i].y * 0.5 + dorsalPts[i].y * 0.5
          );
      }, 'rgba(255, 80, 0, 0.55)', 0.9);

      // 3. DIAGONAL BRACING
      strokePath(() => {
        const step = 6;
        for (let i = 0; i < numSegments - step; i += step) {
          const s = step;
          ctx.moveTo(leftPoints[i].x, leftPoints[i].y);
          ctx.lineTo(dorsalPts[i + s].x, dorsalPts[i + s].y);

          ctx.moveTo(dorsalPts[i].x, dorsalPts[i].y);
          ctx.lineTo(leftPoints[i + s].x, leftPoints[i + s].y);

          ctx.moveTo(leftPoints[i].x, leftPoints[i].y);
          ctx.lineTo(rightPoints[i + s].x, rightPoints[i + s].y);

          ctx.moveTo(rightPoints[i].x, rightPoints[i].y);
          ctx.lineTo(dorsalPts[i + s].x, dorsalPts[i + s].y);

          ctx.moveTo(centerPoints[(i + (s / 2)) | 0].x, centerPoints[(i + (s / 2)) | 0].y);
          ctx.lineTo(leftPoints[(i + (s / 2)) | 0].x, leftPoints[(i + (s / 2)) | 0].y);

          ctx.moveTo(centerPoints[(i + (s / 2)) | 0].x, centerPoints[(i + (s / 2)) | 0].y);
          ctx.lineTo(rightPoints[(i + (s / 2)) | 0].x, rightPoints[(i + (s / 2)) | 0].y);
        }
      }, 'rgba(255, 60, 0, 0.22)', 0.6);

      // 4. DORSAL FIN SPINES
      {
        const finStart = Math.floor(numSegments * 0.08);
        const finEnd = Math.floor(numSegments * 0.82);
        const finSpacing = 5;

        type FinSpine = {
          base: { x: number; y: number };
          tip: { x: number; y: number };
          midCtrl: { x: number; y: number };
        };

        const spines: FinSpine[] = [];
        for (let i = finStart; i < finEnd; i += finSpacing) {
          const t = i / numSegments;
          const seg = segments[i];
          const bw = bodyProfile(t);
          const dh = dorsalProfile(t);
          if (dh < 1) continue;

          const nx = Math.cos(seg.angle - Math.PI / 2);
          const ny = Math.sin(seg.angle - Math.PI / 2);

          const leanAngle = seg.angle - Math.PI / 2 - 0.45;
          const spineLen = dh * 1.7 + 8;

          const base = { x: seg.x + nx * bw, y: seg.y + ny * bw };
          const tip = {
            x: base.x + Math.cos(leanAngle) * spineLen,
            y: base.y + Math.sin(leanAngle) * spineLen,
          };
          const midCtrl = {
            x: base.x + Math.cos(leanAngle + 0.25) * spineLen * 0.5,
            y: base.y + Math.sin(leanAngle + 0.25) * spineLen * 0.5,
          };
          spines.push({ base, tip, midCtrl });
        }

        strokePath(() => {
          for (let s = 0; s < spines.length - 1; s++) {
            const a = spines[s];
            const b = spines[s + 1];
            ctx.moveTo(a.tip.x, a.tip.y);
            ctx.quadraticCurveTo(
              (a.tip.x + b.tip.x) / 2 + (a.midCtrl.x - a.base.x) * 0.3,
              (a.tip.y + b.tip.y) / 2 + (a.midCtrl.y - a.base.y) * 0.3,
              b.tip.x,
              b.tip.y
            );
            ctx.moveTo(a.tip.x, a.tip.y);
            ctx.lineTo(b.base.x, b.base.y);
            ctx.moveTo(b.tip.x, b.tip.y);
            ctx.lineTo(a.base.x, a.base.y);
          }
        }, 'rgba(255, 90, 0, 0.30)', 0.7);

        strokePath(() => {
          for (const sp of spines) {
            ctx.moveTo(sp.base.x, sp.base.y);
            ctx.quadraticCurveTo(sp.midCtrl.x, sp.midCtrl.y, sp.tip.x, sp.tip.y);
          }
        }, 'rgba(255, 110, 10, 0.85)', 1.3);
      }

      // 5. CLAWED LIMBS
      {
        const drawLimb = (segIdx: number, side: number, scale: number) => {
          const seg = segments[Math.min(segIdx, numSegments - 1)];
          const t = segIdx / numSegments;
          const bw = bodyProfile(t);
          const nx = Math.cos(seg.angle - Math.PI / 2) * side;
          const ny = Math.sin(seg.angle - Math.PI / 2) * side;
          const fx = Math.cos(seg.angle);
          const fy = Math.sin(seg.angle);

          const shoulder = { x: seg.x + nx * bw, y: seg.y + ny * bw };

          const armLen = 28 * scale;
          const foreLen = 22 * scale;
          const pawLen = 12 * scale;

          const downAngle = 0.9;
          const elbow = {
            x: shoulder.x + nx * armLen * Math.cos(downAngle) - fy * armLen * Math.sin(downAngle) * 0.6,
            y: shoulder.y + ny * armLen * Math.cos(downAngle) + fx * armLen * Math.sin(downAngle) * 0.6,
          };
          const wrist = {
            x: elbow.x + nx * foreLen * 0.5 + fx * foreLen * 0.7,
            y: elbow.y + ny * foreLen * 0.5 + fy * foreLen * 0.7,
          };
          const claws = [-0.5, 0, 0.5].map((offset) => ({
            x: wrist.x + nx * pawLen * 0.4 + fx * pawLen * 0.85 + Math.cos(seg.angle + offset) * pawLen * 0.5,
            y: wrist.y + ny * pawLen * 0.4 + fy * pawLen * 0.85 + Math.sin(seg.angle + offset) * pawLen * 0.5,
          }));

          strokePath(() => {
            ctx.moveTo(shoulder.x, shoulder.y);
            ctx.lineTo(elbow.x, elbow.y);
            ctx.lineTo(wrist.x, wrist.y);
            for (const c of claws) {
              ctx.moveTo(wrist.x, wrist.y);
              ctx.lineTo(c.x, c.y);
            }
            ctx.moveTo(shoulder.x, shoulder.y);
            ctx.lineTo(wrist.x, wrist.y);
          }, 'rgba(255, 90, 10, 0.75)', 1.1);
        };

        for (const limb of limbSegs) drawLimb(limb.idx, limb.side, limb.scale);
      }

      // 6. OUTER SILHOUETTE
      strokePath(() => {
        ctx.moveTo(centerPoints[numSegments - 1].x, centerPoints[numSegments - 1].y);
        for (let i = numSegments - 1; i >= 0; i--) ctx.lineTo(leftPoints[i].x, leftPoints[i].y);

        const hx = segments[0].x;
        const hy = segments[0].y;
        const ha = segments[0].angle;
        const hp = (f: number, l: number) => {
          const nx = Math.cos(ha - Math.PI / 2);
          const ny = Math.sin(ha - Math.PI / 2);
          return {
            x: hx + Math.cos(ha) * f + nx * l,
            y: hy + Math.sin(ha) * f + ny * l,
          };
        };
        const HS = 1.5;
        const headPts = [
          hp(0, 14 * HS),
          hp(-6 * HS, 22 * HS),
          hp(-14 * HS, 34 * HS),
          hp(-4 * HS, 18 * HS),
          hp(-20 * HS, 28 * HS),
          hp(4 * HS, 20 * HS),
          hp(14 * HS, 24 * HS),
          hp(22 * HS, 16 * HS),
          hp(36 * HS, 12 * HS),
          hp(52 * HS, 6 * HS),
          hp(56 * HS, 2 * HS),
          hp(44 * HS, -1 * HS),
          hp(28 * HS, -3 * HS),
          hp(50 * HS, -8 * HS),
          hp(36 * HS, -14 * HS),
          hp(14 * HS, -18 * HS),
          hp(-4 * HS, -20 * HS),
          hp(-16 * HS, -24 * HS),
          hp(0, -12 * HS),
        ];
        for (const p of headPts) ctx.lineTo(p.x, p.y);
        for (let i = 0; i < numSegments; i++) ctx.lineTo(rightPoints[i].x, rightPoints[i].y);
        ctx.lineTo(centerPoints[numSegments - 1].x, centerPoints[numSegments - 1].y);
      }, 'rgba(255, 80, 0, 0.95)', 1.4);

      // 7. HEAD INTERIOR WIREFRAME
      {
        const hx = segments[0].x;
        const hy = segments[0].y;
        const ha = segments[0].angle;
        const HS = 1.5;
        const hp = (f: number, l: number) => ({
          x: hx + Math.cos(ha) * f + Math.cos(ha - Math.PI / 2) * l,
          y: hy + Math.sin(ha) * f + Math.sin(ha - Math.PI / 2) * l,
        });

        const pts = {
          skullTopBack: hp(-6 * HS, 22 * HS),
          skullTopFront: hp(14 * HS, 24 * HS),
          orbitRim: hp(20 * HS, 14 * HS),
          orbitBottom: hp(20 * HS, 2 * HS),
          nasalBridge: hp(22 * HS, 16 * HS),
          snoutTop: hp(36 * HS, 12 * HS),
          premaxilla: hp(52 * HS, 6 * HS),
          upperLip: hp(52 * HS, 2 * HS),
          lowerJawFront: hp(50 * HS, -8 * HS),
          lowerJawMid: hp(36 * HS, -14 * HS),
          jawHinge: hp(14 * HS, -18 * HS),
          cheek: hp(-4 * HS, -20 * HS),
          occiput: hp(-16 * HS, -24 * HS),
          neckBack: hp(0, -12 * HS),
          neckFront: hp(0, 14 * HS),
          mainHornBase: hp(-6 * HS, 22 * HS),
          mainHornTip: hp(-14 * HS, 34 * HS),
          secHornBase: hp(-4 * HS, 18 * HS),
          secHornTip: hp(-20 * HS, 28 * HS),
          zygArch: hp(10 * HS, -8 * HS),
          palate: hp(30 * HS, 4 * HS),
          chin: hp(30 * HS, -12 * HS),
        };

        strokePath(() => {
          ctx.moveTo(pts.skullTopBack.x, pts.skullTopBack.y);
          ctx.lineTo(pts.orbitRim.x, pts.orbitRim.y);
          ctx.moveTo(pts.skullTopFront.x, pts.skullTopFront.y);
          ctx.lineTo(pts.orbitBottom.x, pts.orbitBottom.y);
          ctx.moveTo(pts.skullTopFront.x, pts.skullTopFront.y);
          ctx.lineTo(pts.jawHinge.x, pts.jawHinge.y);
          ctx.moveTo(pts.orbitRim.x, pts.orbitRim.y);
          ctx.lineTo(pts.zygArch.x, pts.zygArch.y);
          ctx.lineTo(pts.jawHinge.x, pts.jawHinge.y);
          ctx.moveTo(pts.nasalBridge.x, pts.nasalBridge.y);
          ctx.lineTo(pts.premaxilla.x, pts.premaxilla.y);
          ctx.moveTo(pts.orbitBottom.x, pts.orbitBottom.y);
          ctx.lineTo(pts.upperLip.x, pts.upperLip.y);
          ctx.moveTo(pts.lowerJawFront.x, pts.lowerJawFront.y);
          ctx.lineTo(pts.jawHinge.x, pts.jawHinge.y);
          ctx.moveTo(pts.lowerJawMid.x, pts.lowerJawMid.y);
          ctx.lineTo(pts.chin.x, pts.chin.y);
          ctx.moveTo(pts.palate.x, pts.palate.y);
          ctx.lineTo(pts.upperLip.x, pts.upperLip.y);
          ctx.moveTo(pts.palate.x, pts.palate.y);
          ctx.lineTo(pts.orbitBottom.x, pts.orbitBottom.y);
          ctx.moveTo(pts.occiput.x, pts.occiput.y);
          ctx.lineTo(pts.jawHinge.x, pts.jawHinge.y);
          ctx.moveTo(pts.occiput.x, pts.occiput.y);
          ctx.lineTo(pts.neckBack.x, pts.neckBack.y);
          ctx.moveTo(pts.neckFront.x, pts.neckFront.y);
          ctx.lineTo(pts.skullTopBack.x, pts.skullTopBack.y);
        }, 'rgba(255, 80, 0, 0.50)', 0.8);

        strokePath(() => {
          ctx.moveTo(pts.mainHornBase.x, pts.mainHornBase.y);
          ctx.lineTo(pts.mainHornTip.x, pts.mainHornTip.y);
          ctx.moveTo(pts.secHornBase.x, pts.secHornBase.y);
          ctx.lineTo(pts.secHornTip.x, pts.secHornTip.y);
          ctx.moveTo(pts.mainHornBase.x, pts.mainHornBase.y);
          ctx.lineTo(pts.secHornTip.x, pts.secHornTip.y);
          ctx.moveTo(pts.occiput.x, pts.occiput.y);
          ctx.lineTo(pts.skullTopBack.x, pts.skullTopBack.y);
        }, 'rgba(255, 120, 20, 0.85)', 1.2);

        strokePath(() => {
          const teethCount = 6;
          for (let t = 0; t < teethCount; t++) {
            const frac = (t + 0.5) / teethCount;
            const tf = frac * 40 * HS;
            const toothTop = hp(14 * HS + tf, 1 * HS);
            const toothBot = hp(14 * HS + tf, -6 * HS);
            ctx.moveTo(toothTop.x, toothTop.y);
            ctx.lineTo(hp(14 * HS + tf, -2 * HS).x, hp(14 * HS + tf, -2 * HS).y);
            ctx.moveTo(toothBot.x, toothBot.y);
            ctx.lineTo(hp(14 * HS + tf, -4 * HS).x, hp(14 * HS + tf, -4 * HS).y);
          }
        }, 'rgba(255, 140, 40, 0.70)', 0.9);

        const eyeCenter = hp(18 * HS, 10 * HS);
        const eyeR = 5 * HS;
        strokePath(() => {
          ctx.arc(eyeCenter.x, eyeCenter.y, eyeR, 0, Math.PI * 2);
          ctx.moveTo(hp(12 * HS, 18 * HS).x, hp(12 * HS, 18 * HS).y);
          ctx.lineTo(hp(26 * HS, 14 * HS).x, hp(26 * HS, 14 * HS).y);
          ctx.moveTo(hp(14 * HS, 4 * HS).x, hp(14 * HS, 4 * HS).y);
          ctx.lineTo(hp(26 * HS, 6 * HS).x, hp(26 * HS, 6 * HS).y);
        }, 'rgba(255, 100, 10, 0.65)', 0.8);

        ctx.beginPath();
        ctx.arc(eyeCenter.x, eyeCenter.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#ffffff';
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(eyeCenter.x, eyeCenter.y, 1.0, 2.5, ha, 0, Math.PI * 2);
        ctx.fillStyle = '#000';
        ctx.shadowBlur = 0;
        ctx.fill();

        ctx.shadowBlur = 18;
        ctx.shadowColor = '#ff4500';
      }

      // 8. WHISKERS
      {
        const hx = segments[0].x;
        const hy = segments[0].y;
        const ha = segments[0].angle;
        const HS = 1.5;
        const hp = (f: number, l: number) => ({
          x: hx + Math.cos(ha) * f + Math.cos(ha - Math.PI / 2) * l,
          y: hy + Math.sin(ha) * f + Math.sin(ha - Math.PI / 2) * l,
        });

        const wSway = Math.sin(time * 0.04) * 0.25;
        const wBase1 = hp(40 * HS, 5 * HS);
        const wBase2 = hp(40 * HS, -5 * HS);
        const wScale = Math.min(1, width / 1100);

        strokePath(() => {
          ctx.moveTo(wBase1.x, wBase1.y);
          ctx.bezierCurveTo(
            hx + Math.cos(ha + 1.2 + wSway) * 90 * wScale,
            hy + Math.sin(ha + 1.2 + wSway) * 90 * wScale,
            hx + Math.cos(ha + 2.0 + wSway) * 160 * wScale,
            hy + Math.sin(ha + 2.0 + wSway) * 160 * wScale,
            hx + Math.cos(ha + 2.6 + wSway) * 220 * wScale,
            hy + Math.sin(ha + 2.6 + wSway) * 220 * wScale
          );
          ctx.moveTo(wBase1.x, wBase1.y);
          ctx.bezierCurveTo(
            hx + Math.cos(ha + 0.9 + wSway) * 60 * wScale,
            hy + Math.sin(ha + 0.9 + wSway) * 60 * wScale,
            hx + Math.cos(ha + 1.5 + wSway) * 110 * wScale,
            hy + Math.sin(ha + 1.5 + wSway) * 110 * wScale,
            hx + Math.cos(ha + 2.0 + wSway) * 160 * wScale,
            hy + Math.sin(ha + 2.0 + wSway) * 160 * wScale
          );
          ctx.moveTo(wBase2.x, wBase2.y);
          ctx.bezierCurveTo(
            hx + Math.cos(ha - 1.2 - wSway) * 90 * wScale,
            hy + Math.sin(ha - 1.2 - wSway) * 90 * wScale,
            hx + Math.cos(ha - 2.0 - wSway) * 160 * wScale,
            hy + Math.sin(ha - 2.0 - wSway) * 160 * wScale,
            hx + Math.cos(ha - 2.6 - wSway) * 220 * wScale,
            hy + Math.sin(ha - 2.6 - wSway) * 220 * wScale
          );
          ctx.moveTo(wBase2.x, wBase2.y);
          ctx.bezierCurveTo(
            hx + Math.cos(ha - 0.9 - wSway) * 60 * wScale,
            hy + Math.sin(ha - 0.9 - wSway) * 60 * wScale,
            hx + Math.cos(ha - 1.5 - wSway) * 110 * wScale,
            hy + Math.sin(ha - 1.5 - wSway) * 110 * wScale,
            hx + Math.cos(ha - 2.0 - wSway) * 160 * wScale,
            hy + Math.sin(ha - 2.0 - wSway) * 160 * wScale
          );
        }, 'rgba(255, 130, 30, 0.75)', 1.0);
      }

      // 9. TAIL FIN
      {
        const finSegs = 12;
        const tailStart = numSegments - finSegs;
        const finTip = centerPoints[numSegments - 1];

        strokePath(() => {
          for (let i = tailStart; i < numSegments - 1; i++) {
            const t = (i - tailStart) / finSegs;
            const seg = segments[i];
            const nx = Math.cos(seg.angle - Math.PI / 2);
            const ny = Math.sin(seg.angle - Math.PI / 2);
            const finH = (1 - t) * 20;
            const finPt = {
              x: seg.x + nx * (bodyProfile(i / numSegments) + finH),
              y: seg.y + ny * (bodyProfile(i / numSegments) + finH),
            };
            ctx.moveTo(finPt.x, finPt.y);
            ctx.lineTo(finTip.x, finTip.y);
            ctx.moveTo(finPt.x, finPt.y);
            ctx.lineTo(dorsalPts[i].x, dorsalPts[i].y);
          }
        }, 'rgba(255, 90, 0, 0.55)', 0.8);
      }

      // 10. PARTICLES
      if (Math.random() < (width < 768 ? 0.2 : 0.4)) {
        const tailSeg = segments[numSegments - 1];
        const maxLife = 80 + Math.random() * 60;
        particles.push({
          x: tailSeg.x + (Math.random() - 0.5) * 8,
          y: tailSeg.y + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          life: maxLife,
          maxLife,
        });
      }
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        const alpha = p.life / p.maxLife;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 80, 0, ${alpha * 0.55})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#ff4500';
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';
      ctx.restore();
    };

    const updateAndDrawText = () => {
      ctx.textBaseline = 'top';
      lines.forEach((line) => {
        ctx.font = line.font;
        ctx.fillStyle = line.fillStyle;
        ctx.shadowBlur = line.shadowBlur || 0;
        ctx.shadowColor = line.shadowColor || 'transparent';
        const lineY = line.y;
        const centerY = lineY + line.height / 2;

        let exclusions: { start: number; end: number }[] = [];
        for (let i = 0; i < collisionNodes.length; i++) {
          const node = collisionNodes[i];
          const r = node.radius + (line.isTitle ? 30 : 15);
          const dy = Math.abs(node.y - centerY);
          if (dy < r) {
            const dx = Math.sqrt(r * r - dy * dy);
            exclusions.push({ start: node.x - dx, end: node.x + dx });
          }
        }
        exclusions.sort((a, b) => a.start - b.start);

        const mergedExclusions: { start: number; end: number }[] = [];
        if (exclusions.length > 0) {
          let current = exclusions[0];
          for (let i = 1; i < exclusions.length; i++) {
            if (exclusions[i].start <= current.end + 40) {
              current.end = Math.max(current.end, exclusions[i].end);
            } else {
              mergedExclusions.push(current);
              current = exclusions[i];
            }
          }
          mergedExclusions.push(current);
        }

        const n = line.words.length;
        if (n === 0) return;
        for (let i = 0; i < n; i++) {
          line.words[i].targetX = line.words[i].baseX;
        }

        const minSpace = line.isTitle ? 0 : ctx.measureText(' ').width;
        for (let iter = 0; iter < (width < 768 ? 30 : 100); iter++) {
          let moved = false;
          for (let e = 0; e < mergedExclusions.length; e++) {
            const excl = mergedExclusions[e];
            for (let i = 0; i < n; i++) {
              const w = line.words[i];
              if (w.targetX + w.width > excl.start + 0.1 && w.targetX < excl.end - 0.1) {
                const baseCx = w.baseX + w.width / 2;
                if (baseCx < (excl.start + excl.end) / 2) {
                  w.targetX = excl.start - w.width - minSpace;
                } else {
                  w.targetX = excl.end + minSpace;
                }
                moved = true;
              }
            }
          }
          for (let i = 1; i < n; i++) {
            const prevEnd = line.words[i - 1].targetX + line.words[i - 1].width + minSpace;
            if (line.words[i].targetX < prevEnd - 0.1) {
              const overlap = prevEnd - line.words[i].targetX;
              line.words[i - 1].targetX -= overlap * 0.5;
              line.words[i].targetX += overlap * 0.5;
              moved = true;
            }
          }
          for (let i = n - 2; i >= 0; i--) {
            const nextStart = line.words[i + 1].targetX - line.words[i].width - minSpace;
            if (line.words[i].targetX > nextStart + 0.1) {
              const overlap = line.words[i].targetX - nextStart;
              line.words[i].targetX -= overlap * 0.5;
              line.words[i + 1].targetX += overlap * 0.5;
              moved = true;
            }
          }
          if (!moved) break;
        }

        for (let i = 0; i < n; i++) {
          const w = line.words[i];
          w.x += (w.targetX - w.x) * (line.isTitle ? 0.15 : 0.25);
          if (Math.abs(w.targetX - w.x) < 0.1) w.x = w.targetX;
        }

        if (!line.isTitle) {
          const drawSpaceWidth = ctx.measureText(' ').width;
          for (let i = 1; i < n; i++) {
            const minX = line.words[i - 1].x + line.words[i - 1].width + drawSpaceWidth;
            if (line.words[i].x < minX) line.words[i].x = minX;
          }
        }

        for (let i = 0; i < n; i++) {
          const w = line.words[i];
          ctx.fillText(w.text, Math.round(w.x), Math.round(lineY));
        }
      });
      ctx.shadowBlur = 0;
      ctx.shadowColor = 'transparent';
    };

    let animationFrameId: number;
    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);

      time += 1;
      updateAndDrawText();
      drawDragon();

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="w-full h-full relative bg-[#000000] overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full cursor-crosshair"
      />
      {/* Premium Footer */}
      <div className="absolute bottom-8 right-12 flex items-center gap-4 pointer-events-none z-10">
        <div className="h-[1px] w-12 bg-white/20"></div>
        <div className="text-white/30 font-mono text-[10px] tracking-[0.4em] font-light uppercase">
          &lt;/
          <span className="text-[#ff4500]/80 font-bold drop-shadow-[0_0_10px_rgba(255,69,0,0.5)]">
            {' '}
            SHAHNAB{' '}
          </span>
          &gt;
        </div>
      </div>
    </motion.div>
  );
};

export default DragonVisualization;
