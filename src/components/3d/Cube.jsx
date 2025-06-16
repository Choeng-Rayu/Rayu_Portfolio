import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/three'

export function Cube({ position = [0, 0, 0], ...props }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  // Continuous rotation animation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.3
    }
  })

  // Spring animation for hover and click effects
  const { scale, color } = useSpring({
    scale: clicked ? 1.5 : hovered ? 1.2 : 1,
    color: clicked ? '#ff6b6b' : hovered ? '#4ecdc4' : '#61dafb',
    config: { mass: 1, tension: 280, friction: 60 }
  })

  return (
    <animated.mesh
      ref={meshRef}
      position={position}
      scale={scale}
      onClick={() => setClicked(!clicked)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
      receiveShadow
      {...props}
    >
      <boxGeometry args={[1, 1, 1]} />
      <animated.meshStandardMaterial 
        color={color}
        roughness={0.3}
        metalness={0.1}
      />
    </animated.mesh>
  )
}
