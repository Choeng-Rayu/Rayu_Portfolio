// import React, { useEffect, useRef } from "react";

// const STAR_COUNT = 60;
// const BASE_RADIUS = 120;
// const STAR_COLOR = "#e7eaff";
// const LINE_COLOR = "rgba(120,160,255,0.13)";
// const GLOW_COLOR = "#7adfff";

// function randomAngle() {
//   return Math.random() * Math.PI * 2;
// }

// function randomRadius() {
//   return BASE_RADIUS + Math.random() * 85;
// }

// function makeStars(count) {
//   let stars = [];
//   for (let i = 0; i < count; i++) {
//     stars.push({
//       baseAngle: randomAngle(),
//       angle: randomAngle(),
//       radius: randomRadius(),
//       speed: (Math.random() - 0.5) * 0.0012 + 0.001,
//       twinkle: Math.random() * Math.PI * 2,
//     });
//   }
//   return stars;
// }

// export default function UnderstandTheUniverse() {
//   const canvasRef = useRef(null);
//   const starsRef = useRef(makeStars(STAR_COUNT));

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     let ww, wh;

//     function resize() {
//       ww = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
//       wh = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
//     }
//     resize();
//     window.addEventListener("resize", resize);

//     function drawFrame() {
//       ctx.clearRect(0, 0, ww, wh);
//       const cx = ww / 2, cy = wh / 2;

//       // Glow effect core
//       let grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, BASE_RADIUS * 2.4);
//       grad.addColorStop(0, "rgba(75,110,255,0.24)");
//       grad.addColorStop(1, "rgba(10,12,18,0.0)");
//       ctx.beginPath();
//       ctx.arc(cx, cy, BASE_RADIUS * 2.45, 0, Math.PI * 2);
//       ctx.fillStyle = grad;
//       ctx.fill();

//       // Animate & Draw lines and stars
//       for (let i = 0; i < STAR_COUNT; i++) {
//         const star = starsRef.current[i];
//         // Animate angle
//         star.angle += star.speed;
//         // Line
//         ctx.save();
//         ctx.strokeStyle = LINE_COLOR;
//         ctx.globalAlpha = 0.18 + 0.09 * Math.sin(Date.now() / 1600 + i);
//         ctx.shadowColor = GLOW_COLOR;
//         ctx.shadowBlur = 16;
//         ctx.beginPath();
//         ctx.moveTo(cx, cy);
//         const tx = cx + Math.cos(star.angle) * star.radius;
//         const ty = cy + Math.sin(star.angle) * star.radius;
//         ctx.lineTo(tx, ty);
//         ctx.lineWidth = 1.3 + 0.25 * Math.sin(i + Date.now() / 1200);
//         ctx.stroke();
//         ctx.restore();
//       }
//       for (let i = 0; i < STAR_COUNT; i++) {
//         const star = starsRef.current[i];
//         // Star position
//         const tx = cx + Math.cos(star.angle) * star.radius;
//         const ty = cy + Math.sin(star.angle) * star.radius;
//         ctx.save();
//         const tw = 1.1 + Math.sin(Date.now() / 800 + star.twinkle + i) * 0.37;
//         ctx.globalAlpha = 0.85 + 0.12 * Math.cos(Date.now()/550 + star.twinkle + i*1.2);
//         ctx.beginPath();
//         ctx.arc(tx, ty, 3.2 * tw, 0, Math.PI * 2);
//         ctx.fillStyle = STAR_COLOR;
//         ctx.shadowColor = GLOW_COLOR;
//         ctx.shadowBlur = 24 * tw;
//         ctx.fill();
//         ctx.restore();
//       }
//     }

//     let stop = false;
//     function loop() {
//       drawFrame();
//       if (!stop) requestAnimationFrame(loop);
//     }
//     loop();
//     return () => {
//       stop = true;
//       window.removeEventListener("resize", resize);
//     };
//   }, []);

//   return (
//     <section
//       style={{
//         position: "relative",
//         width: "100%",
//         height: "440px",
//         background: "#0d0d0d",
//         overflow: "hidden",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//       aria-label="Understand the Universe Animation Section"
//     >
//       <canvas
//         ref={canvasRef}
//         style={{
//           position: "absolute",
//           width: "100%",
//           height: "100%",
//           top: 0,
//           left: 0,
//           zIndex: 0,
//           display: "block",
//         }}
//       />
//       <div
//         style={{
//           position: "relative",
//           width: "100%",
//           color: "#fff",
//           zIndex: 2,
//           fontFamily: "Inter, Arial, sans-serif",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           fontWeight: 400,
//           padding: "0 8vw",
//         }}
//       >
//         <span
//           style={{
//             fontSize: "2.6rem",
//             letterSpacing: "-0.04em",
//             opacity: 0.95,
//             textShadow:
//               "0 0 16px #79defc99, 0 0 8px #5cbdf90a, 0 0 3px #fff1, 0 1px 0 #3337",
//           }}
//         >
//           Understand
//         </span>
//         <span
//           style={{
//             fontSize: "2.6rem",
//             letterSpacing: "-0.04em",
//             opacity: 0.95,
//             textShadow:
//               "0 0 16px #79defc99, 0 0 8px #5cbdf90a, 0 0 3px #fff1, 0 1px 0 #3337",
//           }}
//         >
//           The Universe
//         </span>
//       </div>
//     </section>
//   );
// }
















//For grok generated

import React, { useEffect, useRef, useState } from "react";
import TextAnimation from "./TypeAnimation"; // Import your TextAnimation component
import { motion } from 'framer-motion';
import { SiZenn } from "react-icons/si";

const STAR_COUNT = 60;
const BASE_RADIUS = 360;
const STAR_COLOR = "#e7eaff";
const LINE_COLOR = "rgba(120,160,255,0.13)";
const GLOW_COLOR = "#7adfff";

function randomAngle() {
  return Math.random() * Math.PI * 2;
}

function randomRadius() {
  return BASE_RADIUS + Math.random() * 85;
}

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
    stars.push({
      baseAngle: randomAngle(),
      angle: randomAngle(),
      radius: randomRadius(),
      speed: (Math.random() - 0.5) * 0.0012 + 0.001,
      twinkle: Math.random() * Math.PI * 2,
      url: sampleUrls[i % sampleUrls.length].url,
      title: sampleUrls[i % sampleUrls.length].title,
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
      let grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, BASE_RADIUS * 2.4);
      grad.addColorStop(0, "rgba(75,110,255,0.24)");
      grad.addColorStop(1, "rgba(10,12,18,0.0)");
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
      for (let i = 0; i < STAR_COUNT; i++) {
        const star = starsRef.current[i];
        const tx = cx + Math.cos(star.angle + rotation) * star.radius;
        const ty = cy + Math.sin(star.angle + rotation) * star.radius;
        ctx.save();
        const tw = 1.1 + Math.sin(Date.now() / 800 + star.twinkle + i) * 0.37;
        ctx.globalAlpha = 0.85 + 0.12 * Math.cos(Date.now()/550 + star.twinkle + i*1.2);
        ctx.beginPath();
        ctx.arc(tx, ty, 3.2 * tw, 0, Math.PI * 2);
        ctx.fillStyle = STAR_COLOR;
        ctx.shadowColor = GLOW_COLOR;
        ctx.shadowBlur = 24 * tw;
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
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        //background: "#0d0d0d",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
              {/* ABOUT <span>ME</span> */}
              <div style={{ marginTop: "-150px", left: "0",fontStyle: "bold", position: "absolute" }}>
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
               </div>
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
            <div style={{ top: "0px", marginLeft: "-350px", position: "absolute" }}>
              Universe
            </div>
          </motion.h2>

        </span>
      </div>
    </section>
  );
}











// For Grok but no full screen
// import React, { useEffect, useRef, useState } from "react";
// import TextAnimation from "./TypeAnimation"; // Import your TextAnimation component

// const STAR_COUNT = 60;
// const BASE_RADIUS = 280;
// const STAR_COLOR = "#e7eaff";
// const LINE_COLOR = "rgba(120,160,255,0.13)";
// const GLOW_COLOR = "#7adfff";

// function randomAngle() {
//   return Math.random() * Math.PI * 2;
// }

// function randomRadius() {
//   return BASE_RADIUS + Math.random() * 85;
// }

// function makeStars(count) {
//   let stars = [];
//   // Sample URLs for stars (customize as needed)
//   const sampleUrls = [
//     "https://en.wikipedia.org/wiki/Star",
//     "https://www.nasa.gov",
//     "https://hubblesite.org",
//     "https://www.space.com",
//     "https://exoplanets.nasa.gov",
//   ];
//   for (let i = 0; i < count; i++) {
//     stars.push({
//       baseAngle: randomAngle(),
//       angle: randomAngle(),
//       radius: randomRadius(),
//       speed: (Math.random() - 0.5) * 0.0012 + 0.001,
//       twinkle: Math.random() * Math.PI * 2,
//       url: sampleUrls[i % sampleUrls.length] || "https://example.com", // Fallback URL
//     });
//   }
//   return stars;
// }

// export default function UnderstandTheUniverse() {
//   const canvasRef = useRef(null);
//   const starsRef = useRef(makeStars(STAR_COUNT));
//   const [rotation, setRotation] = useState(0);
//   const isDragging = useRef(false);
//   const lastX = useRef(0);
//   const starPositions = useRef([]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     let ww, wh;

//     function resize() {
//       ww = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
//       wh = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
//       //wh = canvas.height = "100vh";
//     }
//     resize();
//     window.addEventListener("resize", resize);

//     function drawFrame() {
//       ctx.clearRect(0, 0, ww, wh);
//       const cx = ww / 2, cy = wh / 2;

//       // Glow effect core
//       let grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, BASE_RADIUS * 2.4);
//       grad.addColorStop(0, "rgba(75,110,255,0.24)");
//       grad.addColorStop(1, "rgba(10,12,18,0.0)");
//       ctx.beginPath();
//       ctx.arc(cx, cy, BASE_RADIUS * 2.45, 0, Math.PI * 2);
//       ctx.fillStyle = grad;
//       ctx.fill();

//       starPositions.current = []; // Reset star positions for click detection

//       // Draw lines
//       for (let i = 0; i < STAR_COUNT; i++) {
//         const star = starsRef.current[i];
//         star.angle += star.speed;
//         ctx.save();
//         ctx.strokeStyle = LINE_COLOR;
//         ctx.globalAlpha = 0.18 + 0.09 * Math.sin(Date.now() / 1600 + i);
//         ctx.shadowColor = GLOW_COLOR;
//         ctx.shadowBlur = 16;
//         ctx.beginPath();
//         ctx.moveTo(cx, cy);
//         const tx = cx + Math.cos(star.angle + rotation) * star.radius;
//         const ty = cy + Math.sin(star.angle + rotation) * star.radius;
//         ctx.lineTo(tx, ty);
//         ctx.lineWidth = 1.3 + 0.25 * Math.sin(i + Date.now() / 1200);
//         ctx.stroke();
//         ctx.restore();
//       }

//       // Draw stars and store positions
//       for (let i = 0; i < STAR_COUNT; i++) {
//         const star = starsRef.current[i];
//         const tx = cx + Math.cos(star.angle + rotation) * star.radius;
//         const ty = cy + Math.sin(star.angle + rotation) * star.radius;
//         ctx.save();
//         const tw = 1.1 + Math.sin(Date.now() / 800 + star.twinkle + i) * 0.37;
//         ctx.globalAlpha = 0.85 + 0.12 * Math.cos(Date.now()/550 + star.twinkle + i*1.2);
//         ctx.beginPath();
//         ctx.arc(tx, ty, 3.2 * tw, 0, Math.PI * 2);
//         ctx.fillStyle = STAR_COLOR;
//         ctx.shadowColor = GLOW_COLOR;
//         ctx.shadowBlur = 24 * tw;
//         ctx.fill();
//         ctx.restore();
//         starPositions.current.push({ x: tx, y: ty, url: star.url });
//       }
//     }

//     // Click handler for stars
//     function handleClick(e) {
//       const rect = canvas.getBoundingClientRect();
//       const clickX = (e.clientX - rect.left) * window.devicePixelRatio;
//       const clickY = (e.clientY - rect.top) * window.devicePixelRatio;

//       for (const star of starPositions.current) {
//         const dx = clickX - star.x;
//         const dy = clickY - star.y;
//         const distance = Math.sqrt(dx * dx + dy * dy);
//         if (distance < 10) { // Click radius for stars
//           window.open(star.url, "_blank"); // Open URL in new tab
//           // onClick={() => scrollToSection('#about')}
//           break;
//         }
//       }
//     }

//     // Pointer event handlers for swiping
//     function handlePointerDown(e) {
//       isDragging.current = true;
//       lastX.current = e.clientX;
//     }

//     function handlePointerMove(e) {
//       if (isDragging.current) {
//         const deltaX = e.clientX - lastX.current;
//         setRotation((prev) => prev + deltaX * 0.005); // Adjust rotation sensitivity
//         lastX.current = e.clientX;
//       }
//     }

//     function handlePointerUp() {
//       isDragging.current = false;
//     }

//     canvas.addEventListener("click", handleClick);
//     canvas.addEventListener("pointerdown", handlePointerDown);
//     canvas.addEventListener("pointermove", handlePointerMove);
//     canvas.addEventListener("pointerup", handlePointerUp);
//     canvas.addEventListener("pointerleave", handlePointerUp);

//     let stop = false;
//     function loop() {
//       drawFrame();
//       if (!stop) requestAnimationFrame(loop);
//     }
//     loop();

//     return () => {
//       stop = true;
//       window.removeEventListener("resize", resize);
//       canvas.removeEventListener("click", handleClick);
//       canvas.removeEventListener("pointerdown", handlePointerDown);
//       canvas.removeEventListener("pointermove", handlePointerMove);
//       canvas.removeEventListener("pointerup", handlePointerUp);
//       canvas.removeEventListener("pointerleave", handlePointerUp);
//     };
//   }, [rotation]);

//   return (
//     <section id="home"
//       style={{
//         position: "relative",
//         width: "100%",
//         //height: "440px",
//         height: "100vh",
//         background: "black",
//         overflow: "hidden",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//       aria-label="Understand the Universe Animation Section"
//     >
//       <canvas
//         ref={canvasRef}
//         style={{
//           position: "absolute",
//           width: "100%",
//           height: "100%",
//           top: 0,
//           left: 0,
//           zIndex: 0,
//           display: "block",
//           cursor: "grab",
//         }}
//       />
//       <div
//         style={{
//           position: "relative",
//           width: "100%",
//           color: "#fff",
//           zIndex: 2,
//           fontFamily: "Inter, Arial, sans-serif",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           fontWeight: 400,
//           padding: "0 8vw",
//         }}
//       >
//         <span
//           style={{
//             fontSize: "2.6rem",
//             letterSpacing: "-0.04em",
//             opacity: 0.95,
//             justifyContent: "center",
//             textShadow:
//               "0 0 16px #79defc99, 0 0 8px #5cbdf90a, 0 0 3px #fff1, 0 1px 0 #3337",
//           }}
//         >

//           <TextAnimation
//                 strings={[
//                   "Welcome To My Website!",
//                   "I'm work as freelance web developer.",
//                   "Want to create your own website?",
//                 ]}
//                 typeSpeed={40}
//                 backSpeed={20}
//                 motionProps={{
//                   initial: { opacity: 0, scale: 0.8 },
//                   animate: { opacity: 1, scale: 1 },
//                   transition: { type: "spring", stiffness: 100 }
//                 }}
//           />

//         </span>
//         <span
//           style={{
//             fontSize: "2.6rem",
//             letterSpacing: "-0.04em",
//             opacity: 0.95,
//             textShadow:
//               "0 0 16px #79defc99, 0 0 8px #5cbdf90a, 0 0 3px #fff1, 0 1px 0 #3337",
//           }}
//         >

//           {/* can add text here */}


//         </span>
//       </div>
//     </section>
//   );
// }
















// //DeapSeek generated

// import React, { useEffect, useRef, useState } from "react";

// const STAR_COUNT = 60;
// const BASE_RADIUS = 360; // Increased from 120 to 360 (3x)
// const STAR_COLOR = "#e7eaff";
// const LINE_COLOR = "rgba(120,160,255,0.13)";
// const GLOW_COLOR = "#7adfff";
// const AUTO_ROTATION_SPEED = 0.00058; // Slow rotation speed

// const STAR_DATA = Array.from({ length: STAR_COUNT }, (_, i) => ({
//   id: i,
//   title: `Star Link ${i + 1}`,
//   url: `https://example.com/star${i + 1}`,
//   baseAngle: Math.random() * Math.PI * 2,
//   radius: BASE_RADIUS + Math.random() * 255, // Adjusted spread for larger radius
//   twinkle: Math.random() * Math.PI * 2,
// }));

// function UnderstandTheUniverse() {
//   const canvasRef = useRef(null);
//   const containerRef = useRef(null);
//   const starsRef = useRef(STAR_DATA);
//   const [hoveredStar, setHoveredStar] = useState(null);
//   const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [startY, setStartY] = useState(0);
//   const globalRotation = useRef(0);

//   const handleStarClick = (url) => {
//     window.open(url, '_blank');
//   };

//   const handleMouseMove = (e) => {
//     if (!canvasRef.current || isDragging) return;
    
//     const canvas = canvasRef.current;
//     const rect = canvas.getBoundingClientRect();
//     const x = (e.clientX - rect.left) * (canvas.width / rect.width);
//     const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    
//     const cx = canvas.width / 2;
//     const cy = canvas.height / 2;
    
//     let foundStar = null;
//     for (let i = 0; i < STAR_COUNT; i++) {
//       const star = starsRef.current[i];
//       const angle = star.baseAngle + globalRotation.current;
//       const tx = cx + Math.cos(angle) * star.radius;
//       const ty = cy + Math.sin(angle) * star.radius;
//       const distance = Math.sqrt((x - tx) ** 2 + (y - ty) ** 2);
      
//       if (distance < 20) {
//         foundStar = star;
//         setTooltipPos({ x: e.clientX, y: e.clientY - 30 });
//         break;
//       }
//     }
    
//     setHoveredStar(foundStar);
//   };

//   const handlePointerDown = (e) => {
//     setIsDragging(true);
//     setStartX(e.clientX || e.touches[0].clientX);
//     setStartY(e.clientY || e.touches[0].clientY);
//     setHoveredStar(null);
//   };

//   const handlePointerMove = (e) => {
//     if (!isDragging) return;
    
//     const currentX = e.clientX || (e.touches && e.touches[0].clientX);
//     const currentY = e.clientY || (e.touches && e.touches[0].clientY);
    
//     if (currentX && currentY) {
//       const dx = currentX - startX;
//       globalRotation.current += dx * 0.002;
//       setStartX(currentX);
//       setStartY(currentY);
//     }
//   };

//   const handlePointerUp = () => {
//     setIsDragging(false);
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     let ww, wh;

//     function resize() {
//       ww = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
//       wh = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
//     }
//     resize();
//     window.addEventListener("resize", resize);

//     function drawFrame() {
//       ctx.clearRect(0, 0, ww, wh);
//       const cx = ww / 2, cy = wh / 2;

//       // Automated rotation
//       if (!isDragging) {
//         globalRotation.current += AUTO_ROTATION_SPEED;
//       }

//       // Glow effect
//       let grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, BASE_RADIUS * 2.4);
//       grad.addColorStop(0, "rgba(75,110,255,0.24)");
//       grad.addColorStop(1, "rgba(10,12,18,0.0)");
//       ctx.beginPath();
//       ctx.arc(cx, cy, BASE_RADIUS * 2.45, 0, Math.PI * 2);
//       ctx.fillStyle = grad;
//       ctx.fill();

//       // Draw connections
//       for (let i = 0; i < STAR_COUNT; i++) {
//         const star = starsRef.current[i];
//         const angle = star.baseAngle + globalRotation.current;
//         ctx.save();
//         ctx.strokeStyle = LINE_COLOR;
//         ctx.globalAlpha = 0.18 + 0.09 * Math.sin(Date.now() / 1600 + i);
//         ctx.shadowColor = GLOW_COLOR;
//         ctx.shadowBlur = 16;
//         ctx.beginPath();
//         ctx.moveTo(cx, cy);
//         const tx = cx + Math.cos(angle) * star.radius;
//         const ty = cy + Math.sin(angle) * star.radius;
//         ctx.lineTo(tx, ty);
//         ctx.lineWidth = 1.3 + 0.25 * Math.sin(i + Date.now() / 1200);
//         ctx.stroke();
//         ctx.restore();
//       }

//       // Draw stars
//       for (let i = 0; i < STAR_COUNT; i++) {
//         const star = starsRef.current[i];
//         const angle = star.baseAngle + globalRotation.current;
//         const tx = cx + Math.cos(angle) * star.radius;
//         const ty = cy + Math.sin(angle) * star.radius;
        
//         ctx.save();
//         const tw = 1.1 + Math.sin(Date.now() / 800 + star.twinkle + i) * 0.37;
//         ctx.globalAlpha = 0.85 + 0.12 * Math.cos(Date.now()/550 + star.twinkle + i*1.2);
//         ctx.beginPath();
//         ctx.arc(tx, ty, 4 * tw, 0, Math.PI * 2);
        
//         if (hoveredStar?.id === star.id) {
//           ctx.fillStyle = "#ffffff";
//           ctx.shadowBlur = 38 * tw;
//         } else {
//           ctx.fillStyle = STAR_COLOR;
//           ctx.shadowBlur = 28 * tw;
//         }
        
//         ctx.shadowColor = GLOW_COLOR;
//         ctx.fill();
//         ctx.restore();
//       }
//     }

//     let animationFrame;
//     const animate = () => {
//       drawFrame();
//       animationFrame = requestAnimationFrame(animate);
//     };
//     animate();

//     return () => {
//       cancelAnimationFrame(animationFrame);
//       window.removeEventListener("resize", resize);
//     };
//   }, [hoveredStar, isDragging]);

//   return (
//     <section
//       ref={containerRef}
//       style={{
//         position: "relative",
//         width: "100vw",
//         height: "100vh",
//         background: "#0d0d0d",
//         overflow: "hidden",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         cursor: isDragging ? "grabbing" : "default",
//       }}
//       onMouseMove={handleMouseMove}
//       onMouseLeave={() => setHoveredStar(null)}
//       onMouseDown={handlePointerDown}
//       onMouseUp={handlePointerUp}
//       onTouchStart={handlePointerDown}
//       onTouchMove={handlePointerMove}
//       onTouchEnd={handlePointerUp}
//     >
//       <canvas
//         ref={canvasRef}
//         style={{
//           position: "absolute",
//           width: "100%",
//           height: "100%",
//           top: 0,
//           left: 0,
//           zIndex: 0,
//           display: "block",
//           touchAction: "none",
//         }}
//         onClick={(e) => {
//           if (hoveredStar && !isDragging) {
//             handleStarClick(hoveredStar.url);
//           }
//         }}
//       />
      
//       {hoveredStar && (
//         <div
//           style={{
//             position: "absolute",
//             left: `${tooltipPos.x}px`,
//             top: `${tooltipPos.y}px`,
//             backgroundColor: "rgba(0, 0, 0, 0.7)",
//             color: "white",
//             padding: "5px 10px",
//             borderRadius: "4px",
//             fontSize: "14px",
//             pointerEvents: "none",
//             zIndex: 10,
//             transform: "translateX(-50%)",
//             whiteSpace: "nowrap",
//           }}
//         >
//           {hoveredStar.title}
//         </div>
//       )}
      
//       <div
//         style={{
//           position: "relative",
//           width: "100%",
//           color: "#fff",
//           zIndex: 2,
//           fontFamily: "Inter, Arial, sans-serif",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           fontWeight: 400,
//           padding: "0 8vw",
//           pointerEvents: "none",
//         }}
//       >
//         <span
//           style={{
//             fontSize: "clamp(1.5rem, 4vw, 2.6rem)",
//             letterSpacing: "-0.04em",
//             opacity: 0.95,
//             textShadow:
//               "0 0 16px #79defc99, 0 0 8px #5cbdf90a, 0 0 3px #fff1, 0 1px 0 #3337",
//           }}
//         >
//           Understand
//         </span>
//         <span
//           style={{
//             fontSize: "clamp(1.5rem, 4vw, 2.6rem)",
//             letterSpacing: "-0.04em",
//             opacity: 0.95,
//             textShadow:
//               "0 0 16px #79defc99, 0 0 8px #5cbdf90a, 0 0 3px #fff1, 0 1px 0 #3337",
//           }}
//         >
//           The Universe
//         </span>
//       </div>
//     </section>
//   );
// }

// export default UnderstandTheUniverse;