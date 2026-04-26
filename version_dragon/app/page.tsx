import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-black overflow-x-hidden">
      <div id="home" className="scroll-mt-0">
        <Hero />
      </div>

      <div id="about" className="scroll-mt-20">
        <About />
      </div>

      <div id="skills" className="scroll-mt-20">
        <Skills />
      </div>

      <div id="projects" className="scroll-mt-20">
        <Projects />
      </div>

      <div id="experience" className="scroll-mt-20">
        <Experience />
      </div>

      <div id="contact" className="scroll-mt-20">
        <Contact />
      </div>

      <Footer />
      <ChatBot />
    </main>
  );
}
