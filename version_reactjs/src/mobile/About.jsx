import React from 'react';
import { expertiseItems } from '../repo/aboutData';

const About = () => {
  return (
    <section id="about" className="mobile-section mobile-about">
      <div className="section-header">
        <h2>About Me</h2>
        <div className="section-line"></div>
      </div>

      <div className="about-content">
        <p className="about-intro">
          I'm <span>Choeng Rayu</span> I was born in Kampong Speu province in poor family, but I have never regretted it. To avoid that I motivated myself to study hard and support my family back because I believe only study can change my life. I’m educated at a public school for my general education. I graduated from high school in 2023 with overall grade B. Additionally, I am a curious personal who really love science so much since I was young and I have talent which related to digital technology field. I always research about science including mechanic of car, technology, robotic, healthy, watches, history of famous people or rich people and general knowledge but mostly technology. Moreover, after I have applied in many scholarships, I have been awarded the Techo Digital Talent scholarship for a bachelor's degree at the Cambodia Academy of Digital Technology.
        </p>

        <p className="about-text">
          With experiences in <span>HTML, CSS, JavaScript, Java, C++, and C, Flutter</span>, I'm dedicated to crafting efficient, user-friendly applications that solve real-world problems through clean, maintainable code.
            <br />
            <br />Please download my <span>CV or View on Github</span> for more information about me.
        </p>

        {/* Skills Grid */}
        <div className="expertise-section">
          <h3>What I Do</h3>
          <div className="expertise-grid">
            {expertiseItems.slice(0, 8).map((item, index) => (
              <div key={index} className="expertise-item">
                <span className="expertise-icon">💻</span>
                <span className="expertise-name">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="education-section">
          <h3>Education</h3>
          <div className="education-card">
            <div className="edu-icon">🎓</div>
            <div className="edu-info">
              <h4>Software Engineering</h4>
              <p>Cambodia Academy of Digital Technology (CADT)</p>
              <span className="edu-year">2023 - Present (3rd Year)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
