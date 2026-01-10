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
import MobileHome from './components/pages/MobileHome.jsx'

function App() {
  const { isMobile } = useMobile();

  return (
    <BrowserRouter>
      <Header />
      {/* Hide heavy pointer effects on mobile for better performance */}
      {!isMobile && <SplashCursorPointer />}
      {!isMobile && <PointerEffect />}

      <Routes>
        <Route path="/" element={
          isMobile ? (
            <>
              <ChatBot />
              <MobileHome />
            </>
          ) : (
            <>
              <ChatBot />
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
            </>
          )
        } />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        
      </Routes>
      <Footer />
    </BrowserRouter>
    
  )
}

export default App
