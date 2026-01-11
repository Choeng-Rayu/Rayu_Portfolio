import { Code2, Rocket, Users } from 'lucide-react';
import { mobileHighlights } from '../repo/aboutData';

const About = () => {
  const iconMap = {
    Code2: <Code2 size={32} />,
    Rocket: <Rocket size={32} />,
    Users: <Users size={32} />,
  };

  const highlights = mobileHighlights;

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Hello! I'm Rayu, a passionate full-stack developer specializing in building
              exceptional digital experiences. I have a strong foundation in modern web
              technologies and a commitment to writing clean, efficient code.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              My expertise lies in creating innovative web applications using React,
              JavaScript, Node.js, and other cutting-edge technologies. I'm constantly
              learning and adapting to new technologies to stay at the forefront of
              web development.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              When I'm not coding, I enjoy exploring new technologies, contributing to
              open-source projects, and sharing knowledge with the developer community.
            </p>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-8 shadow-xl">
              <div className="aspect-square bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center text-white text-6xl font-bold">
                R
              </div>
            </div>
            <div className="absolute inset-0 bg-blue-600 rounded-2xl transform rotate-3 opacity-20"></div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="p-8 bg-gray-50 rounded-xl hover:shadow-lg transition-all hover:-translate-y-2 duration-300"
            >
              <div className="text-blue-600 mb-4">{iconMap[highlight.icon]}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {highlight.title}
              </h3>
              <p className="text-gray-600">{highlight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
