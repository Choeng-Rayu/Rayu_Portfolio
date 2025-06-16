import React, { Suspense } from 'react'
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

export function Scene3D() {
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
