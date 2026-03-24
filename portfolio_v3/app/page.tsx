import {
  Nav,
  Footer,
  MeshBackgroundSimple,
  Hero,
  About,
  Projects,
  Skills,
  Experience,
  Education,
  Contact,
  ChatBot,
  EmailFloat,
} from "./components";

export default function Home() {
  return (
    <>
      {/* Animated mesh background */}
      <MeshBackgroundSimple />
      
      {/* Navigation */}
      <Nav />
      
      {/* Main content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />
        
        {/* About Section */}
        <About />
        
        {/* Projects Section */}
        <Projects />
        
        {/* Skills Section */}
        <Skills />
        
        {/* Experience Section */}
        <Experience />
        
        {/* Education Section */}
        <Education />
        
        {/* Contact Section */}
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Floating Chat Components */}
      <ChatBot />
      <EmailFloat />
    </>
  );
}
