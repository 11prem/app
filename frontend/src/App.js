import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AnimatedBackground from './components/AnimatedBackground';
import Header from './components/Header';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Education from './sections/Education';
import Resume from './sections/Resume';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import { Toaster } from './components/ui/toaster';

const Portfolio = () => {
  // Wake up backend on page load
  useEffect(() => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    if (BACKEND_URL) {
      fetch(BACKEND_URL)
        .then(() => console.log('Backend warmed up'))
        .catch(() => console.log('Backend warming up...'));
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-900">
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Resume />
        <Contact />
        <Footer />
      </div>
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;