import React, { useEffect, useState, useRef } from 'react';

function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSkill, setActiveSkill] = useState(null);
  const skillsRef = useRef(null);

  const skills = [
    { name: 'React.js', description: 'Built this portfolio using React for dynamic, component-based UI.', icon: '⚛️' },
    { name: 'JavaScript', description: 'Used JavaScript for interactivity and logic in the portfolio.', icon: '📜' },
    { name: 'HTML', description: 'Structured the portfolio website with semantic HTML.', icon: '🖊️' },
    { name: 'CSS', description: 'Styled the portfolio with responsive and modern CSS designs.', icon: '🎨' },
    { name: 'Framer Motion', description: 'Added smooth animations for page transitions and effects.', icon: '✨' },
    { name: 'Vite', description: 'Used Vite as the build tool for fast development and production builds.', icon: '⚡' },
    { name: 'Responsive Design', description: 'Ensured the portfolio is mobile-friendly and adapts to all screen sizes.', icon: '📱' },
    { name: 'Git', description: 'Managed version control and collaboration using Git.', icon: '🔀' },
    { name: 'Addintional Skills', description: 'Problem Solving, Ideate, Effective Communication, Critical Thinking, Working With teamates and using AI', icon: '🖊️' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={skillsRef}
      className={`skills-section ${isVisible ? 'visible' : ''}`}
      id="skills"
    >
      <div className="section-header">
        <h2>
          <span className="title-word title-word-1">My</span>{' '}
          <span className="title-word title-word-2">Skills</span>
        </h2>
        <div className="header-decoration"></div>
        <p className="section-subtitle">Technologies I have basic knowledge to build amazing experiences</p>
      </div>
      
      <div className="skills-container">
        {skills.map((skill, index) => (
          <div 
            key={index} 
            className={`skill-item ${activeSkill === index ? 'active' : ''}`}
            onMouseEnter={() => setActiveSkill(index)}
            onMouseLeave={() => setActiveSkill(null)}
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            <div className="skill-icon">{skill.icon}</div>
            <div className="skill-content">
              <h3>{skill.name}</h3>
              <p>{skill.description}</p>
            </div>
            <div className="skill-orb"></div>
            <div className="skill-particles"></div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .skills-section {
          background-color: #000;
          color: #fff;
          padding: 100px 20px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .skills-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.15) 0%, transparent 30%),
            radial-gradient(circle at 80% 70%, rgba(212, 175, 55, 0.15) 0%, transparent 30%);
          z-index: 0;
          animation: float 12s ease-in-out infinite alternate;
        }

        .section-header {
          text-align: center;
          margin-bottom: 80px;
          position: relative;
          z-index: 1;
        }

        h2 {
          font-size: 4rem;
          margin-bottom: 20px;
          font-weight: 700;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 15px;
        }

        .title-word {
          display: inline-block;
          opacity: 0;
          transform: translateY(30px);
        }

        .visible .title-word-1 {
          animation: fadeInUp 0.8s forwards 0.2s;
          color: #fff;
        }

        .visible .title-word-2 {
          animation: fadeInUp 0.8s forwards 0.4s;
          background: linear-gradient(90deg, #d4af37, #f4e5c2);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .header-decoration {
          width: 100px;
          height: 3px;
          background: linear-gradient(90deg, transparent, #d4af37, transparent);
          margin: 0 auto 30px;
          opacity: 0;
          transform: scaleX(0);
          transform-origin: center;
        }

        .visible .header-decoration {
          animation: scaleIn 0.6s forwards 0.8s;
        }

        .section-subtitle {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.3rem;
          max-width: 600px;
          margin: 0 auto;
          opacity: 0;
          transform: translateY(20px);
        }

        .visible .section-subtitle {
          animation: fadeInUp 0.6s forwards 1s;
        }

        .skills-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          max-width: 1200px;
          width: 100%;
          position: relative;
          z-index: 1;
        }

        .skill-item {
          background: rgba(20, 20, 20, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 30px;
          border-radius: 15px;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(50px) scale(0.95);
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        .skills-section.visible .skill-item {
          animation: cardAppear 0.8s forwards;
        }

        .skill-item::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #d4af37, #f4e5c2, #d4af37);
          background-size: 200% 200%;
          z-index: -1;
          border-radius: 16px;
          opacity: 0;
          transition: all 0.5s;
        }

        .skill-item:hover {
          transform: translateY(-10px) scale(1.02) !important;
          box-shadow: 0 15px 30px rgba(212, 175, 55, 0.2);
          border-color: rgba(212, 175, 55, 0.3);
        }

        .skill-item:hover::before {
          opacity: 0.3;
          animation: gradientShift 3s linear infinite;
        }

        .skill-item.active {
          background: rgba(30, 30, 30, 0.9);
        }

        .skill-icon {
          font-size: 3.5rem;
          margin-bottom: 25px;
          transition: all 0.4s;
          filter: drop-shadow(0 0 5px rgba(212, 175, 55, 0.3));
        }

        .skill-item:hover .skill-icon {
          transform: scale(1.2);
          filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.5));
        }

        .skill-content {
          position: relative;
          z-index: 1;
        }

        .skill-item h3 {
          font-size: 1.6rem;
          margin-bottom: 15px;
          color: #fff;
          position: relative;
          display: inline-block;
        }

        .skill-item h3::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 0;
          height: 2px;
          background: #d4af37;
          transition: width 0.4s;
        }

        .skill-item:hover h3::after {
          width: 100%;
        }

        .skill-item p {
          font-size: 1.1rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
          transition: all 0.3s;
        }

        .skill-item:hover p {
          color: rgba(255, 255, 255, 0.9);
        }

        .skill-orb {
          position: absolute;
          top: -20px;
          right: -20px;
          width: 60px;
          height: 60px;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%);
          border-radius: 50%;
          opacity: 0;
          transition: all 0.5s;
        }

        .skill-item:hover .skill-orb {
          opacity: 1;
          transform: scale(1.5);
        }

        .skill-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }

        .skill-item:hover .skill-particles::before {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          background: rgba(212, 175, 55, 0.6);
          border-radius: 50%;
          top: 20%;
          left: 20%;
          animation: particleFloat 3s infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(20px);
          }
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          to {
            opacity: 1;
            transform: scaleX(1);
          }
        }

        @keyframes cardAppear {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes particleFloat {
          0% {
            transform: translate(0, 0);
            opacity: 1;
          }
          100% {
            transform: translate(random(100) - 50px, random(100) - 50px);
            opacity: 0;
          }
        }

        @media (max-width: 768px) {
          h2 {
            font-size: 2.5rem;
          }
          
          .skills-container {
            grid-template-columns: 1fr;
          }
          
          .skill-item {
            padding: 25px;
          }
        }

        @media (max-width: 480px) {
          .section-subtitle {
            font-size: 1rem;
          }
          
          h2 {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
}

export default Skills;