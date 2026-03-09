'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { useMouse } from '@/hooks/useMouse'

function OrbitRing({ radius, speed, color, dotColor }: {
  radius: number
  speed: number
  color: string
  dotColor: string
}) {
  const ringRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.y = state.clock.elapsedTime * speed
    }
  })

  const points = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius))
    }
    return pts
  }, [radius])

  const lineGeo = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [points])

  return (
    <group ref={ringRef}>
      <primitive object={new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.15 }))} />
      <mesh position={[radius, 0, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color={dotColor} />
      </mesh>
    </group>
  )
}

function FloatingLabel({ position, text }: { position: [number, number, number]; text: string }) {
  return (
    <Html position={position} center zIndexRange={[50, 0]} style={{ pointerEvents: 'none' }}>
      <div className="px-3 py-1.5 bg-[rgba(10,18,32,0.8)] border border-glass-border rounded-md backdrop-blur-xl font-mono text-[0.65rem] text-text-dim tracking-wider whitespace-nowrap animate-float select-none">
        {text}
      </div>
    </Html>
  )
}

function CoreSphere() {
  const coreRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05)
    }
  })

  return (
    <mesh ref={coreRef}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshBasicMaterial color="#00d4ff" transparent opacity={0.08} />
    </mesh>
  )
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null)
  const mouse = useMouse()

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += (mouse.normalizedX * 0.5 - groupRef.current.rotation.y) * 0.02
      groupRef.current.rotation.x += (mouse.normalizedY * 0.3 - groupRef.current.rotation.x) * 0.02
    }
  })

  return (
    <group ref={groupRef}>
      <CoreSphere />

      <group rotation={[1.2, 0.3, 0]}>
        <OrbitRing radius={3} speed={0.4} color="#00d4ff" dotColor="#00d4ff" />
      </group>
      <group rotation={[0.9, -0.2, 0.5]}>
        <OrbitRing radius={3.8} speed={-0.25} color="#7b61ff" dotColor="#7b61ff" />
      </group>
      <group rotation={[1.5, 0.7, 0.2]}>
        <OrbitRing radius={2.5} speed={0.55} color="#00d4ff" dotColor="#00d4ff" />
      </group>

      <FloatingLabel position={[3.2, 1.8, 0]} text="FastAPI" />
      <FloatingLabel position={[-3, -1.2, 0.5]} text="Next.js" />
      <FloatingLabel position={[2.5, -2, -0.5]} text="PyTorch" />
      <FloatingLabel position={[-2.8, 2, -0.3]} text="Three.js" />
    </group>
  )
}

export default function HeroOrbit() {
  return (
    <div className="w-full h-full overflow-visible">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ overflow: 'visible' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}