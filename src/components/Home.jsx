
import React, { useEffect, useRef, useState } from "react";
import TextAnimation from "./TypeAnimation"; // Import your TextAnimation component
import { motion } from 'framer-motion';
import { SiZenn } from "react-icons/si";

const STAR_COUNT = 100;
const BASE_RADIUS = 360;
const STAR_COLOR = "#e7eaff";
const LINE_COLOR = "rgba(120,160,255,0.13)";
const GLOW_COLOR = "#7adfff";

function randomAngle() {
  return Math.random() * Math.PI * 10;
}

function randomRadius() {
  return BASE_RADIUS + Math.random() * 200;
}

// function makeStars(count) {
//   let stars = [];
//   const sampleUrls = [
//     { url: "https://en.wikipedia.org/wiki/Star", title: "Wikipedia: Star" },
//     { url: "https://www.nasa.gov", title: "NASA" },
//     { url: "https://hubblesite.org", title: "Hubble Site" },
//     { url: "https://www.space.com", title: "Space.com" },
//     { url: "https://exoplanets.nasa.gov", title: "NASA Exoplanets" },
//   ];
//   for (let i = 0; i < count; i++) {
//     stars.push({
//       baseAngle: randomAngle(),
//       angle: randomAngle(),
//       radius: randomRadius(),
//       speed: (Math.random() - 0.5) * 0.0012 + 0.001,
//       twinkle: Math.random() * Math.PI * 2,
//       url: sampleUrls[i % sampleUrls.length].url,
//       title: sampleUrls[i % sampleUrls.length].title,
//     });
//   }
//   return stars;
// }
//all colors are rendom
function makeStars(count) {
  let stars = [];
  const sampleUrls = [
    { url: "https://en.wikipedia.org/wiki/Star", title: "Wikipedia: Star" },
    { url: "https://www.nasa.gov", title: "NASA" },
    { url: "https://hubblesite.org", title: "Hubble Site" },
    { url: "https://www.space.com", title: "Space.com" },
    { url: "https://exoplanets.nasa.gov", title: "NASA Exoplanets" },
  ];
  for (let i = 0; i < count; i++) {
    let color, glowColor;
    // 90% chance for nebula colors (blues, purples, pinks), 10% chance for bright white
    if (Math.random() < 0.9) {
      // Nebula colors: hues between 200 (blue) and 320 (pink)
      const hue = 200 + Math.random() * 120; // 200-320
      const saturation = 60 + Math.random() * 40; // 60-100%
      const lightness = 40 + Math.random() * 30; // 40-70%
      color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      // Glow is brighter and more saturated
      glowColor = `hsl(${hue}, ${Math.min(saturation + 20, 100)}%, ${Math.min(lightness + 20, 80)}%)`;
    } else {
      // Bright white star (low saturation, high lightness)
      const hue = Math.random() * 360; // Any hue, since saturation is low
      const saturation = 10 + Math.random() * 20; // 10-30%
      const lightness = 85 + Math.random() * 15; // 85-100%
      color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      glowColor = `hsl(${hue}, ${saturation + 10}%, ${lightness - 10}%)`;
    }

    stars.push({
      baseAngle: randomAngle(),
      angle: randomAngle(),
      radius: randomRadius(),
      speed: (Math.random() - 0.5) * 0.0012 + 0.001,
      twinkle: Math.random() * Math.PI * 2,
      url: sampleUrls[i % sampleUrls.length].url,
      title: sampleUrls[i % sampleUrls.length].title,
      color: color,
      glowColor: glowColor, // Store glow color
    });
  }
  return stars;
}

export default function UnderstandTheUniverse() {
  const canvasRef = useRef(null);
  const starsRef = useRef(makeStars(STAR_COUNT));
  const [rotation, setRotation] = useState(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const starPositions = useRef([]);
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let ww, wh;

    function resize() {
      ww = canvas.width = window.innerWidth * window.devicePixelRatio;
      wh = canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    }
    resize();
    window.addEventListener("resize", resize);

    function drawFrame() {
      ctx.clearRect(0, 0, ww, wh);
      const cx = ww / 2, cy = wh / 2;

      // Glow effect core
      // let grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, BASE_RADIUS * 2.4);
      // grad.addColorStop(0, "rgba(75,110,255,0.24)");
      // grad.addColorStop(1, "rgba(10,12,18,0.0)");
      // ctx.beginPath();
      // ctx.arc(cx, cy, BASE_RADIUS * 2.45, 0, Math.PI * 2);
      // ctx.fillStyle = grad;
      // ctx.fill();

      // add color
      let grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, BASE_RADIUS * 2.4);
      grad.addColorStop(0, "rgba(100, 80, 180, 0.3)"); // Soft purple-blue glow
      grad.addColorStop(0.5, "rgba(120, 100, 200, 0.15)"); // Mid-range purple
      grad.addColorStop(1, "rgba(10, 12, 18, 0.0)"); // Fade to transparent
      ctx.beginPath();
      ctx.arc(cx, cy, BASE_RADIUS * 2.45, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      starPositions.current = [];

      // Draw lines
      for (let i = 0; i < STAR_COUNT; i++) {
        const star = starsRef.current[i];
        star.angle += star.speed;
        ctx.save();
        ctx.strokeStyle = LINE_COLOR;
        ctx.globalAlpha = 0.18 + 0.09 * Math.sin(Date.now() / 1600 + i);
        ctx.shadowColor = GLOW_COLOR;
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        const tx = cx + Math.cos(star.angle + rotation) * star.radius;
        const ty = cy + Math.sin(star.angle + rotation) * star.radius;
        ctx.lineTo(tx, ty);
        ctx.lineWidth = 1.3 + 0.25 * Math.sin(i + Date.now() / 1200);
        ctx.stroke();
        ctx.restore();
      }

      // Draw stars and store positions
      // for (let i = 0; i < STAR_COUNT; i++) {
      //   const star = starsRef.current[i];
      //   const tx = cx + Math.cos(star.angle + rotation) * star.radius;
      //   const ty = cy + Math.sin(star.angle + rotation) * star.radius;
      //   ctx.save();
      //   const tw = 1.1 + Math.sin(Date.now() / 800 + star.twinkle + i) * 0.37;
      //   ctx.globalAlpha = 0.85 + 0.12 * Math.cos(Date.now()/550 + star.twinkle + i*1.2);
      //   ctx.beginPath();
      //   ctx.arc(tx, ty, 3.2 * tw, 0, Math.PI * 2);
      //   ctx.fillStyle = STAR_COLOR;
      //   ctx.shadowColor = GLOW_COLOR;
      //   ctx.shadowBlur = 24+6 * tw;
      //   ctx.fill();
      //   ctx.restore();
      //   starPositions.current.push({ x: tx, y: ty, url: star.url, title: star.title });
      // }

      //add color
      // Draw stars and store positions
    for (let i = 0; i < STAR_COUNT; i++) {
      const star = starsRef.current[i];
      const tx = cx + Math.cos(star.angle + rotation) * star.radius;
      const ty = cy + Math.sin(star.angle + rotation) * star.radius;
      ctx.save();
      const tw = 1.1 + Math.sin(Date.now() / 800 + star.twinkle + i) * 0.37;
      ctx.globalAlpha = 0.85 + 0.12 * Math.cos(Date.now() / 550 + star.twinkle + i * 1.2);
      ctx.beginPath();
      ctx.arc(tx, ty, 3.5 * tw, 0, Math.PI * 2); // Keeping 5.0 from your previous request
      ctx.fillStyle = star.color; // Use star-specific color
      ctx.shadowColor = star.glowColor; // Use star-specific glow color
      ctx.shadowBlur = 35 * tw; // Increased to 35 for stronger nebula glow
      ctx.fill();
      ctx.restore();
      starPositions.current.push({ x: tx, y: ty, url: star.url, title: star.title });
    }
    }

    // Click handler for stars
    function handleClick(e) {
      const rect = canvas.getBoundingClientRect();
      const clickX = (e.clientX - rect.left) * window.devicePixelRatio;
      const clickY = (e.clientY - rect.top) * window.devicePixelRatio;

      for (const star of starPositions.current) {
        const dx = clickX - star.x;
        const dy = clickY - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 10) {
          window.open(star.url, "_blank");
          break;
        }
      }
    }

    // Pointer event handlers for swiping and tooltip
    function handlePointerDown(e) {
      isDragging.current = true;
      lastX.current = e.clientX;
    }

    function handlePointerMove(e) {
      const rect = canvas.getBoundingClientRect();
      const pointerX = (e.clientX - rect.left) * window.devicePixelRatio;
      const pointerY = (e.clientY - rect.top) * window.devicePixelRatio;

      // Check for star hover
      let foundStar = null;
      for (const star of starPositions.current) {
        const dx = pointerX - star.x;
        const dy = pointerY - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 10) {
          foundStar = {
            title: star.title,
            x: e.clientX,
            y: e.clientY,
          };
          break;
        }
      }
      setTooltip(foundStar);

      // Handle swipe
      if (isDragging.current) {
        const deltaX = e.clientX - lastX.current;
        setRotation((prev) => prev + deltaX * 0.005);
        lastX.current = e.clientX;
      }
    }

    function handlePointerUp() {
      isDragging.current = false;
    }

    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointerleave", () => {
      isDragging.current = false;
      setTooltip(null);
    });

    let stop = false;
    function loop() {
      drawFrame();
      if (!stop) requestAnimationFrame(loop);
    }
    loop();

    return () => {
      stop = true;
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointerleave", handlePointerUp);
    };
  }, [rotation]);

  return (
    <section
      id="home"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: -1,
        pointerEvents: "none",
      }}
      aria-label="Understand the Universe Animation Section"
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 0,
          display: "block",
          cursor: "pointer",
          pointerEvents: "auto",
        }}
      />
      {tooltip && (
        <div
          style={{
            position: "absolute",
            background: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
            padding: "5px 10px",
            borderRadius: "4px",
            fontSize: "0.9rem",
            pointerEvents: "none",
            left: `${tooltip.x + 10}px`,
            top: `${tooltip.y - 10}px`,
            zIndex: 3,
          }}
        >
          {tooltip.title}
        </div>
      )}
      <div
        style={{
          position: "relative",
          width: "100%",
          color: "#fff",
          zIndex: 2,
          fontFamily: "Inter, Arial, sans-serif",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: 400,
          padding: "0 5vw",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            letterSpacing: "-0.04em",
            opacity: 0.95,
            textShadow:
              "0 0 16px #79defc99, 0 0 8px #5cbdf90a, 0 0 3px #fff1, 0 1px 0 #3337",
          }}
        >
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >


            {/* this for text typing  for homepage*/}
              {/* ABOUT <span>ME</span>  */}
              {/* <div style={{ marginTop: "-150px", left: "0",fontStyle: "bold", position: "absolute" }}>
                <TextAnimation
                  strings={[
                    "Welcome To My Website!",
                    "I'm a freelance web developer.",
                    "Want to create your own website?",
                  ]}
                  typeSpeed={40}
                  backSpeed={20}
                  motionProps={{
                    initial: { opacity: 0, scale: 0.8 },
                    animate: { opacity: 1, scale: 1 },
                    transition: { type: "spring", stiffness: 100 }
                  }}
                />
               </div> */}
          </motion.h2>

        </span>
        <span
          style={{
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            letterSpacing: "-0.04em",
            opacity: 0.95,
            textShadow:
              "0 0 16px #79defc99, 0 0 8px #5cbdf90a, 0 0 3px #fff1, 0 1px 0 #3337",
          }}
        >
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            //fontSize={{SiZenn: 1}}
          >
            {/* ABOUT <span>ME</span> */}



            {/* This is for home page     */}
            {/* <div style={{ top: "0px", marginLeft: "-350px", position: "absolute" }}>
              Universe
            </div> */}
          </motion.h2>

        </span>
      </div>
    </section>
  );
}






