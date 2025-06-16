import React, { useState } from 'react'
import './InfoPanel.css'

export function InfoPanel() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`info-panel ${isOpen ? 'open' : ''}`}>
      <button 
        className="info-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle info panel"
      >
        {isOpen ? '×' : 'ℹ'}
      </button>
      
      <div className="info-content">
        <h2>Interactive 3D Scene</h2>
        <div className="info-section">
          <h3>Controls</h3>
          <ul>
            <li><strong>Mouse:</strong> Rotate camera</li>
            <li><strong>Scroll:</strong> Zoom in/out</li>
            <li><strong>Right-click + drag:</strong> Pan</li>
            <li><strong>Click objects:</strong> Interact</li>
          </ul>
        </div>
        
        <div className="info-section">
          <h3>Objects</h3>
          <ul>
            <li><strong>Blue Cube:</strong> Rotating cube with hover effects</li>
            <li><strong>Purple Sphere:</strong> Floating sphere with animations</li>
          </ul>
        </div>
        
        <div className="info-section">
          <h3>Features</h3>
          <ul>
            <li>Real-time 3D rendering</li>
            <li>Interactive animations</li>
            <li>Dynamic lighting</li>
            <li>Responsive design</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
