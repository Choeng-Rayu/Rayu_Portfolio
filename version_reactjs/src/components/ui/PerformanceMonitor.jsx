import React, { useState, useEffect } from 'react'
import './PerformanceMonitor.css'

export function PerformanceMonitor() {
  const [fps, setFps] = useState(0)
  const [memory, setMemory] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    
    const updateStats = () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)))
        frameCount = 0
        lastTime = currentTime
        
        // Memory usage (if available)
        if (performance.memory) {
          setMemory(Math.round(performance.memory.usedJSHeapSize / 1048576))
        }
      }
      
      requestAnimationFrame(updateStats)
    }
    
    updateStats()
  }, [])

  return (
    <div className={`performance-monitor ${isVisible ? 'visible' : ''}`}>
      <button 
        className="perf-toggle"
        onClick={() => setIsVisible(!isVisible)}
        title="Toggle Performance Monitor"
      >
        📊
      </button>
      
      <div className="perf-stats">
        <div className="stat">
          <span className="label">FPS:</span>
          <span className={`value ${fps < 30 ? 'low' : fps < 50 ? 'medium' : 'high'}`}>
            {fps}
          </span>
        </div>
        
        {memory > 0 && (
          <div className="stat">
            <span className="label">Memory:</span>
            <span className="value">{memory}MB</span>
          </div>
        )}
        
        <div className="stat">
          <span className="label">WebGL:</span>
          <span className="value">
            {window.WebGLRenderingContext ? '✓' : '✗'}
          </span>
        </div>
      </div>
    </div>
  )
}
