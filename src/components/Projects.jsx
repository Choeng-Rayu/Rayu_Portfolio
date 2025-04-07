import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const projects = [
    // { 
    //   title: 'Banking Management System (Back end only)', 
    //   description: 'A secure digital banking platform with transaction tracking, user accounts, and admin dashboard.',
    //   tags: ['React', 'Node.js', 'MongoDB', 'JWT Auth'],
    //   accentColor: '#00ff88'
    // },
    { 
      title: 'Portfolio Site', 
      description: 'Interactive portfolio with 3D elements and smooth animations showcasing my work.',
      tags: ['Next.js', 'Framer Motion'],
      accentColor: '#0095ff'
    },
    { 
      title: 'E-Commerce Platform (Full Stack But not Public)', 
      description: 'Full-featured with cart, payments, and inventory management.',
      tags: ['Java Programming', 'Swing', 'MySQL'],
      accentColor: '#ff00aa'
    },
    { 
      title: 'Students Management System (Back end only)', 
      description: 'As the first project for foundation year, this system manages student records, grades, and academic records including payments.',
      tags: ['Language: C'],
      accentColor: '#ff9500'
    },
    { 
      title: 'E-Commerce Platform (back end only', 
      description: 'As the Second project, this platform manages product listings, user accounts, order process, history, and payment management.',
      tags: ['Solidity', 'Web3.js', 'Ethereum'],
      accentColor: '#7700ff'
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <section 
      id="projects" 
      ref={ref}
      className="projects-section"
      style={{ background: 'radial-gradient(circle at center, #0a0a0a 0%, #000000 100%)' }}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
          }}
          className="section-header"
        >
          <h2>
            <span className="gradient-text">Featured</span> Projects
          </h2>
          <p className="subtitle">Innovative solutions built with cutting-edge technology</p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={container}
          className="projects-grid"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={item}
              className="project-card"
              whileHover={{ y: -10 }}
              style={{ '--accent': project.accentColor }}
            >
              <div className="card-glow"></div>
              <div className="card-content">
                <div className="card-header">
                  <h3>{project.title}</h3>
                  <div className="card-number">{String(index + 1).padStart(2, '0')}</div>
                </div>
                <p>{project.description}</p>
                <div className="tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="card-footer">
                  <button className="demo-button">Live Demo</button>
                  <button className="code-button">View Code</button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, transition: { delay: 1 } }
          }}
          className="cta"
        >
          
        </motion.div>
      </div>

      <style jsx>{`
        .projects-section {
          padding: 100px 20px;
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .projects-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 30%, rgba(0, 255, 136, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(0, 149, 255, 0.05) 0%, transparent 40%);
          z-index: 0;
        }

        .section-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        h2 {
          font-size: 3.5rem;
          margin: 0 0 15px;
          font-weight: 800;
          letter-spacing: -1px;
        }

        .gradient-text {
          background: linear-gradient(90deg, #00ff88, #0095ff);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .subtitle {
          font-size: 1.2rem;
          color: rgba(255,255,255,0.7);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
          margin-bottom: 80px;
        }

        .project-card {
          background: rgba(20, 20, 20, 0.8);
          border-radius: 16px;
          padding: 2px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          transition: all 0.3s ease;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .project-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 2px;
          background: linear-gradient(45deg, var(--accent), transparent);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .card-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, var(--accent), transparent 70%);
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .project-card:hover .card-glow {
          opacity: 0.1;
        }

        .card-content {
          background: rgba(15, 15, 15, 0.9);
          border-radius: 14px;
          padding: 30px;
          height: 100%;
          backdrop-filter: blur(10px);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .project-card h3 {
          font-size: 1.5rem;
          margin: 0;
          color: #fff;
          font-weight: 600;
        }

        .card-number {
          font-size: 1rem;
          font-weight: 700;
          color: var(--accent);
          opacity: 0.6;
        }

        .project-card p {
          color: rgba(255,255,255,0.8);
          line-height: 1.6;
          margin-bottom: 25px;
          font-size: 1rem;
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 25px;
        }

        .tag {
          background: rgba(255,255,255,0.1);
          color: #fff;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
          backdrop-filter: blur(5px);
        }

        .card-footer {
          display: flex;
          gap: 15px;
        }

        button {
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .demo-button {
          background: var(--accent);
          color: #000;
        }

        .demo-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px color-mix(in srgb, var(--accent) 30%, transparent);
        }

        .code-button {
          background: transparent;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .code-button:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.4);
        }

        .cta {
          text-align: center;
          margin-top: 60px;
        }

        .cta p {
          color: rgba(255,255,255,0.7);
          margin-bottom: 20px;
          font-size: 1.1rem;
        }

        .contact-button {
          background: transparent;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.2);
          padding: 12px 30px;
          border-radius: 30px;
          font-size: 1rem;
          position: relative;
          overflow: hidden;
        }

        .contact-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, #00ff88, #0095ff);
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .contact-button:hover::before {
          opacity: 1;
        }

        @media (max-width: 768px) {
          h2 {
            font-size: 2.5rem;
          }

          .projects-grid {
            grid-template-columns: 1fr;
          }

          .card-footer {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;