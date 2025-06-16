import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navigation } from './components/ui/Navigation'
// ichmport ChatBot from './ChatBot'
import Header from '../src/components/pages/Header.jsx'
import ChatBot from './ChatBot'
import About from '../src/components/pages/About.jsx'
import { Scene3D } from './components/Scene3D'
import Skills from '../src/components/pages/Skills.jsx'
import Projects from '../src/components/pages/Projects.jsx'
import Contact from '../src/components/pages/Contact.jsx'
import './App.css'
import PointerEffect from './PointerEffect.jsx'
import Footer from '../src/components/pages/Footer.jsx'
import SplashCursorPointer from './SplashCursorPointer.jsx'

function App() {
  return (
    <BrowserRouter>
      {/* <Navigation /> */}
      <Header />
      <SplashCursorPointer />
      <PointerEffect/>

      <Routes>
        <Route path="/" element={
          <>
            <ChatBot />
            <div className="app">
              {/* 3D Scene Background */}
              <Scene3D />

              {/* Welcome Message */}
              <div className="welcome-message">
                <h1>Welcome to My Website</h1>
                <p>Interact with the 3D objects and explore the scene</p>
              </div>
            </div>
          </>
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
