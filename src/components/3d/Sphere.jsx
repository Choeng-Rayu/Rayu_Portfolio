import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/three'

export function Sphere({ position = [0, 0, 0], ...props }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  // Floating animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.3
      meshRef.current.rotation.y += 0.01
    }
  })

  // Spring animation for interactions
  const { scale, color, emissive } = useSpring({
    scale: clicked ? 1.3 : hovered ? 1.1 : 1,
    color: clicked ? '#ff9ff3' : hovered ? '#f368e0' : '#a29bfe',
    emissive: hovered ? '#2d3436' : '#000000',
    config: { mass: 1, tension: 280, friction: 60 }
  })

  return (
    <animated.mesh
      ref={meshRef}
      position={[position[0], position[1], position[2]]}
      scale={scale}
      onClick={() => setClicked(!clicked)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
      receiveShadow
      {...props}
    >
      <sphereGeometry args={[0.8, 32, 32]} />
      <animated.meshStandardMaterial 
        color={color}
        emissive={emissive}
        roughness={0.2}
        metalness={0.8}
      />
    </animated.mesh>
  )
}
