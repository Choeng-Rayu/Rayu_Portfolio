
import React, { useEffect, useRef, useState } from "react";
import TextAnimation from "./TypeAnimation"; // Import your TextAnimation component
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaRocket, FaLaptopCode, FaGithub, FaLinkedin, FaDownload } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const STAR_COUNT = 150;
const BASE_RADIUS = 360;
const STAR_COLOR = "#e7eaff";
const LINE_COLOR = "rgba(120,160,255,0.13)";
const GLOW_COLOR = "#7adfff";
const PARTICLE_COUNT = 50;
const FLOATING_SHAPES_COUNT = 8;

function randomAngle() {
  return Math.random() * Math.PI * 10;
}

function randomRadius() {
  return BASE_RADIUS + Math.random() * 200;
}

function createFloatingParticles(count) {
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`,
    });
  }
  return particles;
}

function createFloatingShapes(count) {
  const shapes = [];
  const shapeTypes = ['circle', 'triangle', 'square', 'diamond'];
  for (let i = 0; i < count; i++) {
    shapes.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 40 + 20,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
      type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
      color: `hsla(${Math.random() * 60 + 200}, 70%, 60%, 0.1)`,
      borderColor: `hsla(${Math.random() * 60 + 200}, 70%, 60%, 0.3)`,
    });
  }
  return shapes;
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
  const particlesRef = useRef(createFloatingParticles(PARTICLE_COUNT));
  const shapesRef = useRef(createFloatingShapes(FLOATING_SHAPES_COUNT));
  const [rotation, setRotation] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHomeVisible, setIsHomeVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const starPositions = useRef([]);
  const [tooltip, setTooltip] = useState(null);

  // Initialize loading effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll detection to hide home content when scrolling to other sections
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Hide home content when scrolled past 50% of viewport height
      const threshold = window.innerHeight * 0.5;
      setIsHomeVisible(currentScrollY < threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

      // Enhanced background with multiple gradients
      const time = Date.now() * 0.001;

      // Dynamic background gradient
      let bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(ww, wh));
      bgGrad.addColorStop(0, `hsla(${240 + Math.sin(time * 0.5) * 20}, 70%, 5%, 1)`);
      bgGrad.addColorStop(0.5, `hsla(${260 + Math.cos(time * 0.3) * 15}, 60%, 3%, 1)`);
      bgGrad.addColorStop(1, "rgba(0, 0, 0, 1)");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, ww, wh);

      // Draw floating particles (reduce when not on home)
      if (isHomeVisible) {
        particlesRef.current.forEach((particle, i) => {
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Wrap around screen
          if (particle.x < 0) particle.x = ww;
          if (particle.x > ww) particle.x = 0;
          if (particle.y < 0) particle.y = wh;
          if (particle.y > wh) particle.y = 0;

          ctx.save();
          ctx.globalAlpha = particle.opacity * (0.5 + 0.5 * Math.sin(time + i));
          ctx.fillStyle = particle.color;
          ctx.shadowColor = particle.color;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
      }

      // Draw floating shapes (reduce when not on home)
      if (isHomeVisible) {
        shapesRef.current.forEach((shape) => {
          shape.x += shape.vx;
          shape.y += shape.vy;
          shape.rotation += shape.rotationSpeed;

          // Wrap around screen
          if (shape.x < -shape.size) shape.x = ww + shape.size;
          if (shape.x > ww + shape.size) shape.x = -shape.size;
          if (shape.y < -shape.size) shape.y = wh + shape.size;
          if (shape.y > wh + shape.size) shape.y = -shape.size;

          ctx.save();
          ctx.translate(shape.x, shape.y);
          ctx.rotate((shape.rotation * Math.PI) / 180);
          ctx.fillStyle = shape.color;
          ctx.strokeStyle = shape.borderColor;
          ctx.lineWidth = 2;

          // Draw different shapes
          ctx.beginPath();
          switch (shape.type) {
            case 'circle':
              ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
              break;
            case 'square':
              ctx.rect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
              break;
            case 'triangle':
              ctx.moveTo(0, -shape.size / 2);
              ctx.lineTo(-shape.size / 2, shape.size / 2);
              ctx.lineTo(shape.size / 2, shape.size / 2);
              ctx.closePath();
              break;
            case 'diamond':
              ctx.moveTo(0, -shape.size / 2);
              ctx.lineTo(shape.size / 2, 0);
              ctx.lineTo(0, shape.size / 2);
              ctx.lineTo(-shape.size / 2, 0);
              ctx.closePath();
              break;
          }
          ctx.fill();
          ctx.stroke();
          ctx.restore();
        });
      }

      // Enhanced central glow with pulsing effect
      let grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, BASE_RADIUS * 2.4);
      const pulse = 0.3 + 0.2 * Math.sin(time * 2);
      grad.addColorStop(0, `rgba(100, 80, 180, ${pulse})`);
      grad.addColorStop(0.3, `rgba(120, 100, 200, ${pulse * 0.7})`);
      grad.addColorStop(0.6, `rgba(80, 120, 255, ${pulse * 0.4})`);
      grad.addColorStop(1, "rgba(10, 12, 18, 0.0)");
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

      // Update mouse position for effects
      setMousePos({ x: e.clientX, y: e.clientY });

      // Mouse attraction effect on particles (only when home is visible)
      if (isHomeVisible) {
        particlesRef.current.forEach(particle => {
          const dx = pointerX - particle.x;
          const dy = pointerY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            const force = (100 - distance) / 100;
            particle.vx += (dx / distance) * force * 0.01;
            particle.vy += (dy / distance) * force * 0.01;
          }
        });
      }

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
      
      <motion.canvas
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
        animate={{
          opacity: isHomeVisible ? 1 : 0.3,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
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
      {/* Main Content Overlay */}
      <motion.div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          pointerEvents: "none",
          padding: "0 2rem",
        }}
        animate={{
          opacity: isHomeVisible ? 1 : 0,
          y: isHomeVisible ? 0 : -50,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            textAlign: "center",
            maxWidth: "800px",
            position: "relative",
          }}
        >
          {/* Glitch Effect Title */}
          <motion.h1
            style={{
              fontSize: "clamp(3rem, 8vw, 6rem)",
              fontWeight: 900,
              background: "linear-gradient(45deg, #00f5ff, #ff00ff, #00ff00, #ffff00)",
              backgroundSize: "400% 400%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "gradientShift 3s ease-in-out infinite",
              textShadow: "0 0 30px rgba(0, 245, 255, 0.5)",
              marginBottom: "1rem",
              letterSpacing: "-0.02em",
            }}
            animate={{
              textShadow: [
                "0 0 30px rgba(0, 245, 255, 0.5)",
                "0 0 50px rgba(255, 0, 255, 0.7)",
                "0 0 30px rgba(0, 255, 0, 0.5)",
                "0 0 30px rgba(0, 245, 255, 0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            CHOENG RAYU
          </motion.h1>

          {/* Animated Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            style={{
              fontSize: "clamp(1.2rem, 3vw, 2rem)",
              color: "#ffffff",
              marginBottom: "2rem",
              textShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
            }}
          >
            <TextAnimation
              strings={[
                "🚀 Full-Stack Developer",
                "💻 Problem Solver",
              ]}
              typeSpeed={50}
              backSpeed={30}
              loop={true}
              motionProps={{
                initial: { opacity: 0, scale: 0.8 },
                animate: { opacity: 1, scale: 1 },
                transition: { type: "spring", stiffness: 100 }
              }}
            />
          </motion.div>

          {/* Floating Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            style={{
              display: "flex",
              gap: "1.5rem",
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: "3rem",
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: "linear-gradient(45deg, #667eea, #764ba2)",
                border: "none",
                padding: "1rem 2rem",
                borderRadius: "50px",
                color: "white",
                fontSize: "1.1rem",
                fontWeight: 600,
                cursor: "pointer",
                pointerEvents: "auto",
                boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
              onClick={() => {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <FaRocket /> Explore My Work
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: "linear-gradient(45deg, #f093fb, #f5576c)",
                border: "none",
                padding: "1rem 2rem",
                borderRadius: "50px",
                color: "white",
                fontSize: "1.1rem",
                fontWeight: 600,
                cursor: "pointer",
                pointerEvents: "auto",
                boxShadow: "0 10px 30px rgba(245, 87, 108, 0.4)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <FaCode /> Let's Connect
            </motion.button>
          </motion.div>

          {/* Floating Social Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            style={{
              display: "flex",
              gap: "2rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {[
              { icon: FaGithub, url: "https://github.com/Choeng-Rayu", color: "#333" },
              { icon: FaLinkedin, url: "https://www.linkedin.com/in/rayu-choeng-351243335/", color: "#0077b5" },
              { icon: FaDownload, url: "https://drive.google.com/uc?export=download&id=1OMPpxq4KtLMBqRY9sbYQ5qd0Pxnazpgg", color: "#ff6b6b" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -10 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: `linear-gradient(45deg, ${social.color}, ${social.color}aa)`,
                  color: "white",
                  fontSize: "1.5rem",
                  textDecoration: "none",
                  pointerEvents: "auto",
                  boxShadow: `0 10px 30px ${social.color}40`,
                }}
                animate={{
                  boxShadow: [
                    `0 10px 30px ${social.color}40`,
                    `0 15px 40px ${social.color}60`,
                    `0 10px 30px ${social.color}40`,
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
              >
                <social.icon />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Floating Tech Icons */}
        <AnimatePresence>
          {isLoaded && (
            <>
              {[FaCode, FaLaptopCode, HiSparkles].map((Icon, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                    scale: [1, 1.2, 1],
                    x: Math.sin(Date.now() * 0.001 + index) * 20,
                    y: Math.cos(Date.now() * 0.001 + index) * 20,
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                    ease: "easeInOut"
                  }}
                  style={{
                    position: "absolute",
                    top: `${20 + index * 25}%`,
                    left: `${10 + index * 30}%`,
                    fontSize: "2rem",
                    color: `hsl(${200 + index * 60}, 70%, 60%)`,
                    pointerEvents: "none",
                    filter: "drop-shadow(0 0 10px currentColor)",
                  }}
                >
                  <Icon />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3 }}
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: "0.9rem",
          }}
        >
          <span>Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              width: "2px",
              height: "30px",
              background: "linear-gradient(to bottom, transparent, #fff, transparent)",
              borderRadius: "1px",
            }}
          />
        </motion.div>
      </motion.div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  );
}






