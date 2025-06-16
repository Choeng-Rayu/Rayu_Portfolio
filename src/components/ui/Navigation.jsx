import React from 'react'
import './Navigation.css'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleAboutClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <nav className="navigation">
      <ul className="nav-links">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><a href="#about" onClick={handleAboutClick}>About</a></li>
      </ul>
    </nav>
  )
}