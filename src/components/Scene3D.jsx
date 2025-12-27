import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Grid, Stars } from '@react-three/drei'
import { Cube } from './3d/Cube'
import { Sphere } from './3d/Sphere'
import { Torus } from './3d/Torus'
import { Particles } from './3d/Particles'
import { Lighting } from './3d/Lighting'

// Loading fallback component
function Loader() {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: 'white',
      fontSize: '18px',
      fontFamily: 'Arial, sans-serif'
    }}>
      Loading 3D Scene...
    </div>
  )
}

// Simple mobile background component
function MobileBackground() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated gradient orbs for mobile */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '150px',
        height: '150px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '30%',
        right: '15%',
        width: '120px',
        height: '120px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite reverse',
      }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'pulse 4s ease-in-out infinite',
      }} />
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
        }
      `}</style>
    </div>
  )
}

export function Scene3D() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Show simplified background on mobile for better performance
  if (isMobile) {
    return <MobileBackground />;
  }

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0a0a0a' }}>
      <Canvas
        camera={{
          position: [5, 5, 5],
          fov: 60,
          near: 0.1,
          far: 1000
        }}
        shadows
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <Suspense fallback={null}>
          {/* Lighting Setup */}
          <Lighting />

          {/* Environment and Background */}
          <Environment preset="city" />
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />

          {/* Grid for reference */}
          <Grid
            args={[20, 20]}
            position={[0, -2, 0]}
            cellColor="#333"
            sectionColor="#555"
          />

          {/* Particle System */}
          <Particles count={800} />

          {/* 3D Objects */}
          <Cube position={[-3, 0, 0]} />
          <Sphere position={[3, 0, 0]} />
          <Torus position={[0, 2, 0]} />

          {/* Camera Controls */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={20}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>

      <Suspense fallback={<Loader />}>
        {/* This ensures the loader shows while 3D content loads */}
      </Suspense>
    </div>
  )
}
