'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useMouse } from '@/hooks/useMouse'

function Particles() {
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const mouse = useMouse()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isSmall = useMediaQuery('(max-width: 480px)')

  const count = isSmall ? 120 : isMobile ? 180 : 300
  const spread = 80
  const maxDist = 12

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel: { x: number; y: number; z: number }[] = []
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread
      vel.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
      })
    }
    return { positions: pos, velocities: vel }
  }, [count, spread])

  const linePositions = useMemo(() => {
    return new Float32Array(count * count * 6)
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return

    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array

    // Update particle positions
    for (let i = 0; i < count; i++) {
      pos[i * 3] += velocities[i].x
      pos[i * 3 + 1] += velocities[i].y
      pos[i * 3 + 2] += velocities[i].z

      for (let a = 0; a < 3; a++) {
        if (Math.abs(pos[i * 3 + a]) > spread / 2) {
          if (a === 0) velocities[i].x *= -1
          if (a === 1) velocities[i].y *= -1
          if (a === 2) velocities[i].z *= -1
        }
      }
    }

    // Update connections
    const lp = linesRef.current.geometry.attributes.position.array as Float32Array
    let lineIdx = 0

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = pos[i * 3] - pos[j * 3]
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1]
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (dist < maxDist && lineIdx < linePositions.length - 6) {
          lp[lineIdx++] = pos[i * 3]
          lp[lineIdx++] = pos[i * 3 + 1]
          lp[lineIdx++] = pos[i * 3 + 2]
          lp[lineIdx++] = pos[j * 3]
          lp[lineIdx++] = pos[j * 3 + 1]
          lp[lineIdx++] = pos[j * 3 + 2]
        }
      }
    }

    for (let i = lineIdx; i < lp.length; i++) lp[i] = 0

    pointsRef.current.geometry.attributes.position.needsUpdate = true
    linesRef.current.geometry.attributes.position.needsUpdate = true

    // Camera follows mouse
    state.camera.position.x += (mouse.normalizedX * 5 - state.camera.position.x) * 0.02
    state.camera.position.y += (mouse.normalizedY * 3 - state.camera.position.y) * 0.02
    state.camera.lookAt(0, 0, 0)
  })

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          color="#00d4ff"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </>
  )
}

export default function NeuralField() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 50], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Particles />
      </Canvas>
    </div>
  )
}