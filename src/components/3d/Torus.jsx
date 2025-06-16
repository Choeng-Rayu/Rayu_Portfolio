import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/three'

export function Torus({ position = [0, 2, 0], ...props }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  // Continuous rotation with variable speed
  useFrame((state, delta) => {
    if (meshRef.current) {
      const speed = clicked ? 3 : hovered ? 1.5 : 0.5
      meshRef.current.rotation.x += delta * speed
      meshRef.current.rotation.y += delta * speed * 0.7
      meshRef.current.rotation.z += delta * speed * 0.3
    }
  })

  // Spring animations for interactions
  const { scale, color, wireframe } = useSpring({
    scale: clicked ? 1.4 : hovered ? 1.2 : 1,
    color: clicked ? '#e17055' : hovered ? '#fdcb6e' : '#6c5ce7',
    wireframe: clicked,
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
      <torusGeometry args={[1, 0.4, 16, 100]} />
      <animated.meshStandardMaterial 
        color={color}
        wireframe={wireframe}
        roughness={0.4}
        metalness={0.6}
      />
    </animated.mesh>
  )
}
