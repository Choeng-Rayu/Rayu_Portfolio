import React from 'react';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';
import PointerEffect from './PointerEffect';
import './PointerEffect.css';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      {/* PointerEffect added here */}
      <div style={{ minHeight: "100vh" }}>
        <Home />

      </div>
      <PointerEffect />
      <Header />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;