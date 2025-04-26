import React from 'react';
import { motion } from 'framer-motion';
import profileImage from '../assets/nang2.jpg';
import { FaDownload, FaCode, FaGraduationCap, FaBriefcase, FaLaptopCode } from 'react-icons/fa';
import { BsJustify } from 'react-icons/bs';

function About() {
  const expertiseItems = [
    { name: "Teaching Skills", icon: <FaCode /> },
    { name: "HTML & CSS", icon: <FaCode /> },
    { name: "JavaScript", icon: <FaCode /> },
    { name: "Java Programming", icon: <FaCode /> },
    { name: "Building Chat Bot in Telegram", icon: <FaCode /> },
    { name: "C++", icon: <FaCode /> },
    { name: "C", icon: <FaCode /> }
       
  ];

  return (
    <section className="about-section" id="about">
      {/* Main About Section */}
      <div className="about-container">
        <motion.div
          className="about-image"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="image-wrapper">
            <img src={profileImage} alt="Profile" />
            <div className="image-border"></div>
          </div>
        </motion.div>
        
        <motion.div
          className="about-content"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            ABOUT <span>ME</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            I'm <span>Choeng Rayu</span> I was born in Kampong Speu province in poor family, but I have never regretted it. To avoid that I motivated myself to study hard and support my family back because I believe only study can change my life. I’m educated at a public school for my general education. I graduated from high school in 2023 with overall grade B. Additionally, I am a curious personal who really love science so much since I was young and I have talent which related to digital technology field. I always research about science including mechanic of car, technology, robotic, healthy, watches, history of famous people or rich people and general knowledge but mostly technology. Moreover, after I have applied in many scholarships, I have been awarded the Techo Digital Talent scholarship for a bachelor's degree at the Cambodia Academy of Digital Technology.

          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            
            With experiences in <span>HTML, CSS, JavaScript, Java, C++, and C</span>, I'm dedicated to crafting efficient, user-friendly applications that solve real-world problems through clean, maintainable code.
            <br />
            <br />Please download my <span>CV</span> for more information about me.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <a 
              href="https://drive.google.com/uc?export=download&id=1nsf1lkeDqp0i5Md9cn272b1fhiYwRlfs" 
              download
              className="cv-button"
            >
              <FaDownload /> DOWNLOAD CV
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Expertise Section */}
      <motion.div
        className="expertise-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      >
        <h3><FaLaptopCode /> MY EXPERTISE</h3>
        <div className="expertise-grid">
          {expertiseItems.map((item, index) => (
            <motion.div
              key={index}
              className="expertise-item"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="expertise-icon">{item.icon}</div>
              <p>{item.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Experience and Education Sections */}
<div className="timeline-container">
  {/* Education Section - moved to the top */}
  <motion.div
    className="education-section"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
  >
    <h3><FaGraduationCap /> EDUCATION</h3>

    <div className="timeline-item">
        <div className="timeline-content">
          <h4>Hun Sen Borey 100 Knong High School</h4>
          <p className="degree">Baccalauréat (Bac II), Grade B</p>
          <p className="date">24 November 2023</p>
          <div className="description">
            <p>Graduated with solid academic foundation that sparked my interest in technology and led me to pursue Computer Science.</p>
          </div>
          <button className='cv-button' onClick={() => window.open('https://verify.gov.kh/verify/ba1d31fd9f3c2853edd973e955cc7845e484a182774a5d12568f7caeea471ac3?key=0037327bb0844bf7691ae5c882a2bc1e4933739b4dfc16d53c89558900a590fc', '_blank')}>
            Reference
            </button>
        </div>
    </div>
    
    <div className="timeline">
      <div className="timeline-item">
        <div className="timeline-content">
          <h4>Cambodia Academy of Digital Technology</h4>
          <p className="degree">Bachelor's in Computer Science (currently year 2)</p>
          <p className="date">January 2024 – Present</p>
          <div className="description">
            <p>Specializing in Software Engineering with focus on:</p>
            <ul>
              <li>Programming languages: Java, C++, C</li>
              <li>Web development: React.js, HTML, CSS</li>
              <li>Applying theory to practical projects</li>
            </ul>
          </div>
          <button className='cv-button' onClick={() => window.open('https://verify.gov.kh/verify/3b35764c208b34af1c95ab3a09f5b2aefa7332b65e98b1c8e184eb635e9508f2?key=2c43a7002735a6333689d5088412f4f870c205535bdc92913e892b21bf5bd44a', '_blank')}>
            Reference
            </button>
        </div>
      </div>
      {/* ALCPP */}
      <div className="timeline-item">
        <div className="timeline-content">
          <h4>Joint ALCPP Program In The Capacity Specialists </h4>
          <p className="degree">This is program aim to develop soft skill and becoming a professional work space </p>
          <p className="date">1 November 2024 - (waiting internship to graduate)</p>
          <div className="description">
          <p>This program is designed to provide students with the skills and knowledge necessary to become professional in the workplace:  It is a 5-months program (3 months for Study in class and 2 for internship) that focuses on developing soft skills such as teamwork, communication, Growth mindset, critical thinking, self-discipline and problem-solving. The program also provides students with the opportunity to gain practical experience by working in a professional environment. The program is designed to be flexible.</p>
          </div>
          <button className='cv-button' onClick={() => window.open('https://drive.google.com/file/d/1nsf1lkeDqp0i5Md9cn272b1fhiYwRlfs/view?usp=sharing', '_blank')}>
            Reference
            </button>
        </div>
      </div>
    </div>
  </motion.div>

  {/* Work and Volunteer Experience - moved below Education */}
  <motion.div
    className="experience-section"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
  >
    <h3><FaBriefcase /> WORK & VOLUNTEER EXPERIENCE</h3>
    
    <div className="timeline">
      <div className="timeline-item">
        <div className="timeline-content">
          <h4>Teaching</h4>
          <p className="role">Tutor Mathematics</p>
          <p className="date">2024 – February 2025</p>
          <div className="description">
            <p>Part-Time Math Tutor for Grade 4 and Grade 8 Students</p>
            <ul>
              <li>Conducted one-on-one tutoring sessions at students' homes</li>
              <li>Focused on improving mathematical concepts and problem-solving skills</li>
              <li>Provided homework assistance and test/exam preparation</li>
            </ul>
          </div>
        
          <button className='cv-button' onClick={() => window.open('https://drive.google.com/file/d/1nsf1lkeDqp0i5Md9cn272b1fhiYwRlfs/view?usp=sharing', '_blank')}>
            Reference
            </button>
        </div>
      </div>
      
      <div className="timeline-item">
        <div className="timeline-content">
          <h4>Volunteer</h4>
          <p className="role">Khoding-Hero Volunteer Program</p>
          <p className="date">04/8/2024 – 4/9/2024</p>
          <div className="description">
            <p>Led a three-member team teaching 700 students at Samky High School in Siem Reap Province</p>
            <ul>
              <li>Taught ICT and coding with Scratch</li>
              <li>Managed digital registration, testing, and attendance tracking</li>
              <li>Inspired students to explore Digital Technology careers</li>
              <li>Taught English for Extra classes in the Evening </li>
            </ul>
          </div>
          
          <button className='cv-button' onClick={() => window.open('https://drive.google.com/file/d/1nsf1lkeDqp0i5Md9cn272b1fhiYwRlfs/view?usp=sharing', '_blank')}>
            Reference
            </button>
        </div>
      </div>

      <div className="timeline-item">
        <div className="timeline-content">
          <h4>Volunteer</h4>
          <p className="role">Digital Government Forum</p>
          <p className="date">11/3/2024 – 13/3/2024</p>
          <div className="description">
            <p>Role: Crowd team</p>
            <ul>
              <li>Informed attendees about the forum's achievements and key highlights.</li>
              <li>Directed participants to various areas of the venue and answered their questions.</li>
              <li>Facilitated interactions between attendees and exhibitors, promoting showcased technologies to enhance engagement and overall experience.</li>
            </ul>
          </div>

          <button className='cv-button' onClick={() => window.open('https://drive.google.com/file/d/1nsf1lkeDqp0i5Md9cn272b1fhiYwRlfs/view?usp=sharing', '_blank')}>
            Reference
            </button>

        </div>
      </div>

      <div className="timeline-item">
        <div className="timeline-content">
          <h4>Volunteer</h4>
          <p className="role"></p>
          <p className="date">11/3/2024 – 13/3/2024</p>
          <div className="description">
            <p>Role: Crowd team</p>
            <ul>
              <li>Informed attendees about the forum's achievements and key highlights.</li>
              <li>Directed participants to various areas of the venue and answered their questions.</li>
              <li>Facilitated interactions between attendees and exhibitors, promoting showcased technologies to enhance engagement and overall experience.</li>
            </ul>
          </div>

          <button className='cv-button' onClick={() => window.open('https://drive.google.com/file/d/1nsf1lkeDqp0i5Md9cn272b1fhiYwRlfs/view?usp=sharing', '_blank')}>
            Reference
            </button>

        </div>
      </div>

    </div>
  </motion.div>
</div>

      {/* Styles */}
      <style jsx>{`
        .about-section {
          color: #fff;
          padding: 80px 20px;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          overflow: hidden;
        }
        
        .about-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%);
          z-index: -1;
        }

        .about-container {
          display: flex;
          gap: 60px;
          align-items: center;
          margin-bottom: 80px;
          position: relative;
        }

        .about-image {
          flex: 1;
          position: relative;
        }
        
        .image-wrapper {
          position: relative;
          width: 100%;
          max-width: 400px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 30px rgba(0, 0, 0, 0.3);
        }
        
        .image-wrapper img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.5s ease;
          position: relative;
          z-index: 1;
        }
        
        .image-border {
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          border: 2px solid #d4af37;
          border-radius: 25px;
          z-index: 0;
          animation: pulse 6s infinite;
        }
        
        @keyframes pulse {
          0% { opacity: 0.7; }
          50% { opacity: 0.3; }
          100% { opacity: 0.7; }
        }

        .about-content {
          flex: 1;
          text-align: left;
        }
        
        .about-content h2 {
          font-size: 2.5rem;
          margin-bottom: 25px;
          position: relative;
          display: inline-block;
        }
        
        .about-content h2 span {
          color: #d4af37;
        }
        
        .about-content h2::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 70px;
          height: 4px;
          background: linear-gradient(90deg, #d4af37, transparent);
          border-radius: 2px;
        }
        
        .about-content p {
          font-size: 1.1rem;
          line-height: 1.8;
          margin-bottom: 20px;
          color: #ddd;
        }
        
        .about-content p span {
          color: #d4af37;
          font-weight: 500;
        }

        .cv-button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          color: #d4af37;
          border: 2px solid #d4af37;
          padding: 12px 25px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          border-radius: 30px;
          margin-top: 20px;
          text-decoration: none;
        }
        
        .cv-button:hover {
          background: #d4af37;
          color: #1a1a1a;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(212, 175, 55, 0.3);
        }

        /* Expertise Section */
        .expertise-section {
          margin-bottom: 80px;
          text-align: center;
        }
        
        .expertise-section h3 {
          font-size: 1.8rem;
          margin-bottom: 40px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          position: relative;
        }
        
        .expertise-section h3::after {
          content: '';
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 3px;
          background: linear-gradient(90deg, transparent, #d4af37, transparent);
        }
        
        .expertise-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 20px;
          margin-top: 30px;
        }
        
        .expertise-item {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 15px;
          padding: 25px 20px;
          text-align: center;
          transition: all 0.3s ease;
          border: 1px solid rgba(212, 175, 55, 0.2);
          backdrop-filter: blur(5px);
        }
        
        .expertise-item:hover {
          background: rgba(212, 175, 55, 0.1);
          border-color: #d4af37;
          transform: translateY(-5px);
        }
        
        .expertise-icon {
          font-size: 2rem;
          color: #d4af37;
          margin-bottom: 15px;
        }
        
        .expertise-item p {
          font-size: 1.1rem;
          font-weight: 500;
          margin: 0;
        }

        /* Timeline Sections */
        .timeline-container {
          display: flex;
          flex-direction: column;
          gap: 40px;
          position: relative;
        }

        .timeline-container::before {
          display: none;
        }
        
        .experience-section, 
        .education-section {
          width: 100%;
        }
        
        .experience-section h3,
        .education-section h3 {
          font-size: 1.8rem;
          margin-bottom: 40px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        
        .timeline {
          position: relative;
          padding-left: 30px;
        }
        
        .timeline::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 2px;
          background: linear-gradient(to bottom, #d4af37, transparent);
        }
        
        .timeline-item {
          position: relative;
          margin-bottom: 40px;
        }
        
        .timeline-item::before {
          content: '';
          position: absolute;
          left: -38px;
          top: 5px;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: #d4af37;
          box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.2);
          z-index: 1;
        }
        
        .timeline-content {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 10px;
          padding: 25px;
          border-left: 3px solid #d4af37;
          transition: all 0.3s ease;
        }
        
        .timeline-item:hover .timeline-content {
          background: rgba(255, 255, 255, 0.07);
          transform: translateX(5px);
        }
        
        .timeline-content h4 {
          font-size: 1.3rem;
          margin-bottom: 5px;
          color: #fff;
        }
        
        .timeline-content .role,
        .timeline-content .degree {
          font-size: 1rem;
          color: #d4af37;
          margin-bottom: 5px;
          font-weight: 500;
        }
        
        .timeline-content .date {
          font-size: 0.9rem;
          color: #aaa;
          margin-bottom: 15px;
          display: inline-block;
          background: rgba(212, 175, 55, 0.1);
          padding: 3px 10px;
          border-radius: 20px;
        }
        
        .timeline-content .description {
          font-size: 0.95rem;
          color: #ccc;
          line-height: 1.7;
        }
        
        .timeline-content ul {
          padding-left: 20px;
          margin-top: 10px;
        }
        
        .timeline-content li {
          margin-bottom: 8px;
        }

        @media (max-width: 992px) {
          .about-container {
            flex-direction: column;
            text-align: center;
          }
          
          .about-content h2::after {
            left: 50%;
            transform: translateX(-50%);
          }
          
          .timeline-container {
            grid-template-columns: 1fr;
          }
          
          .timeline-container::before {
            display: none;
          }
          
          .expertise-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          }
        }
        
        @media (max-width: 768px) {
          .about-section {
            padding: 60px 15px;
          }
          
          .about-content h2 {
            font-size: 2rem;
          }
          
          .expertise-section h3,
          .experience-section h3,
          .education-section h3 {
            font-size: 1.5rem;
          }
          
          .timeline-content {
            padding: 20px;
          }
        }
      `}</style>
    </section>
  );
}

export default About;