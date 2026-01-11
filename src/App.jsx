import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '../src/components/pages/Header.jsx'
import ChatBot from './ChatBot'
import About from '../src/components/pages/About.jsx'
import { Scene3D } from './components/Scene3D'
import Skills from '../src/components/pages/Skills.jsx'
import Projects from '../src/components/pages/Projects.jsx'
import Contact from '../src/components/pages/Contact.jsx'
import './App.css'
import './styles/mobile.css'
import PointerEffect from './PointerEffect.jsx'
import Footer from '../src/components/pages/Footer.jsx'
import SplashCursorPointer from './SplashCursorPointer.jsx'
import TextAnimation from './components/pages/TypeAnimation.jsx'
import { useMobile } from './hooks/useMobile.js'
import MobileLayout from './mobile/MobileLayout.jsx'

// Mobile components
import MobileAbout from './mobile/About.jsx'
import MobileSkills from './mobile/Skills.jsx'
import MobileProjects from './mobile/Project.jsx'
import MobileContact from './mobile/Contact.jsx'

function App() {
  const { isMobile } = useMobile();

  return (
    <BrowserRouter>
      {/* Header only shows on desktop, mobile has its own navigation */}
      {!isMobile && <Header />}
      
      {/* ChatBot appears on all pages */}
      <ChatBot />
      
      {/* Hide heavy pointer effects on mobile for better performance */}
      {!isMobile && <SplashCursorPointer />}
      {!isMobile && <PointerEffect />}

      <Routes>
        <Route path="/" element={
          isMobile ? (
            <MobileLayout />
          ) : (
            <div className="app">
              {/* 3D Scene Background */}
              <Scene3D />

              <div className="welcome-message">
                <TextAnimation
                  strings={[
                    "Welcome to my Portfolio!",
                    'Explore my projects and skills',
                    'Interact with the 3D objects',
                    'Thank you for visiting!',
                  ]}
                  typeSpeed={50}
                  backSpeed={30}
                  motionProps={{
                    initial: { opacity: 0, scale: 0.8 },
                    animate: { opacity: 1, scale: 1 },
                    transition: { type: "spring", stiffness: 100 }
                  }}
                />
              </div>
            </div>
          )
        } />
        {/* Responsive routes - mobile uses mobile components, desktop uses desktop components */}
        <Route path="/about" element={isMobile ? <MobileLayout /> : <About />} />
        <Route path="/skills" element={isMobile ? <MobileLayout /> : <Skills />} />
        <Route path="/projects" element={isMobile ? <MobileLayout /> : <Projects />} />
        <Route path="/contact" element={isMobile ? <MobileLayout /> : <Contact />} />
      </Routes>
      
      {/* Footer only shows on desktop */}
      {!isMobile && <Footer />}
    </BrowserRouter>
    
  )
}

export default App
