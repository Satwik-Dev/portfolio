'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function ParticleAvatar() {
  const particlesRef = useRef<THREE.Points>(null)
  const { viewport, mouse } = useThree()
  
  // Create anatomically correct human figure - SCALED DOWN for perfect fit
  const { positions, colors, originalPositions } = useMemo(() => {
    const particleCount = 7000
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const originalPositions = new Float32Array(particleCount * 3)
    
    // REDUCED SIZE - Human proportions (70% of previous size)
    const scale = 0.7  // Master scale factor
    
    let idx = 0
    
    // Helper function to create ellipsoid particles
    const createEllipsoid = (
      centerX: number,
      centerY: number,
      centerZ: number,
      radiusX: number,
      radiusY: number,
      radiusZ: number,
      count: number
    ) => {
      for (let i = 0; i < count; i++) {
        if (idx >= particleCount) break
        
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        const r = Math.cbrt(Math.random())
        
        const x = centerX + r * radiusX * Math.sin(phi) * Math.cos(theta)
        const y = centerY + r * radiusY * Math.cos(phi)
        const z = centerZ + r * radiusZ * Math.sin(phi) * Math.sin(theta)
        
        positions[idx * 3] = x
        positions[idx * 3 + 1] = y
        positions[idx * 3 + 2] = z
        
        originalPositions[idx * 3] = x
        originalPositions[idx * 3 + 1] = y
        originalPositions[idx * 3 + 2] = z
        
        // Color gradient
        const normalizedX = (x + 0.6) / 1.2
        const cyan = new THREE.Color(0x00d4ff)
        const orange = new THREE.Color(0xff9955)
        const color = new THREE.Color().lerpColors(cyan, orange, normalizedX)
        
        colors[idx * 3] = color.r
        colors[idx * 3 + 1] = color.g
        colors[idx * 3 + 2] = color.b
        
        idx++
      }
    }
    
    // Create cylinder particles (for limbs)
    const createCylinder = (
      baseX: number,
      baseY: number,
      baseZ: number,
      topX: number,
      topY: number,
      topZ: number,
      radius: number,
      count: number
    ) => {
      for (let i = 0; i < count; i++) {
        if (idx >= particleCount) break
        
        const t = Math.random()
        const theta = Math.random() * Math.PI * 2
        const r = Math.sqrt(Math.random()) * radius
        
        const x = baseX + t * (topX - baseX) + r * Math.cos(theta)
        const y = baseY + t * (topY - baseY)
        const z = baseZ + t * (topZ - baseZ) + r * Math.sin(theta)
        
        positions[idx * 3] = x
        positions[idx * 3 + 1] = y
        positions[idx * 3 + 2] = z
        
        originalPositions[idx * 3] = x
        originalPositions[idx * 3 + 1] = y
        originalPositions[idx * 3 + 2] = z
        
        const normalizedX = (x + 0.6) / 1.2
        const cyan = new THREE.Color(0x00d4ff)
        const orange = new THREE.Color(0xff9955)
        const color = new THREE.Color().lerpColors(cyan, orange, normalizedX)
        
        colors[idx * 3] = color.r
        colors[idx * 3 + 1] = color.g
        colors[idx * 3 + 2] = color.b
        
        idx++
      }
    }
    
    // All measurements scaled down by 70%
    
    // 1. HEAD
    createEllipsoid(0, 0.7, 0, 0.12 * scale, 0.15 * scale, 0.12 * scale, 800)
    
    // 2. NECK
    createCylinder(0, 0.6, 0, 0, 0.67, 0, 0.05 * scale, 100)
    
    // 3. UPPER TORSO
    createEllipsoid(0, 0.42, 0, 0.18 * scale, 0.22 * scale, 0.12 * scale, 1000)
    
    // 4. LOWER TORSO
    createEllipsoid(0, 0.18, 0, 0.14 * scale, 0.18 * scale, 0.1 * scale, 800)
    
    // 5. PELVIS
    createEllipsoid(0, 0.0, 0, 0.15 * scale, 0.12 * scale, 0.1 * scale, 600)
    
    // 6. LEFT UPPER ARM
    createCylinder(-0.22 * scale, 0.46, 0, -0.35 * scale, 0.25, 0.05 * scale, 0.05 * scale, 350)
    
    // 7. LEFT FOREARM
    createCylinder(-0.35 * scale, 0.25, 0.05 * scale, -0.42 * scale, 0.04, 0.08 * scale, 0.04 * scale, 300)
    
    // 8. LEFT HAND
    createEllipsoid(-0.45 * scale, -0.04, 0.08 * scale, 0.04 * scale, 0.06 * scale, 0.03 * scale, 150)
    
    // 9. RIGHT UPPER ARM
    createCylinder(0.22 * scale, 0.46, 0, 0.35 * scale, 0.25, 0.05 * scale, 0.05 * scale, 350)
    
    // 10. RIGHT FOREARM
    createCylinder(0.35 * scale, 0.25, 0.05 * scale, 0.42 * scale, 0.04, 0.08 * scale, 0.04 * scale, 300)
    
    // 11. RIGHT HAND
    createEllipsoid(0.45 * scale, -0.04, 0.08 * scale, 0.04 * scale, 0.06 * scale, 0.03 * scale, 150)
    
    // 12. LEFT THIGH
    createCylinder(-0.12 * scale, -0.04, 0, -0.14 * scale, -0.39, 0, 0.08 * scale, 550)
    
    // 13. LEFT CALF
    createCylinder(-0.14 * scale, -0.39, 0, -0.12 * scale, -0.74, 0.02 * scale, 0.06 * scale, 500)
    
    // 14. LEFT FOOT
    createEllipsoid(-0.12 * scale, -0.81, 0.08 * scale, 0.05 * scale, 0.04 * scale, 0.12 * scale, 200)
    
    // 15. RIGHT THIGH
    createCylinder(0.12 * scale, -0.04, 0, 0.14 * scale, -0.39, 0, 0.08 * scale, 550)
    
    // 16. RIGHT CALF
    createCylinder(0.14 * scale, -0.39, 0, 0.12 * scale, -0.74, 0.02 * scale, 0.06 * scale, 500)
    
    // 17. RIGHT FOOT
    createEllipsoid(0.12 * scale, -0.81, 0.08 * scale, 0.05 * scale, 0.04 * scale, 0.12 * scale, 200)
    
    console.log(`Created ${idx} particles in human figure (scaled: ${scale})`)
    
    return { positions, colors, originalPositions }
  }, [])
  
  // Animate particles with dissolution effect
  useFrame((state) => {
    if (!particlesRef.current) return
    
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
    const time = state.clock.getElapsedTime()
    
    const mouseX = mouse.x * viewport.width / 2
    const mouseY = mouse.y * viewport.height / 2
    
    for (let i = 0; i < positions.length / 3; i++) {
      const i3 = i * 3
      
      const originalX = originalPositions[i3]
      const originalY = originalPositions[i3 + 1]
      const originalZ = originalPositions[i3 + 2]
      
      // Distance from mouse cursor
      const dx = originalX - mouseX
      const dy = originalY - mouseY
      const distanceFromMouse = Math.sqrt(dx * dx + dy * dy)
      
      // Dissolution effects
      const dissolveFactor = Math.max(0, 1 - distanceFromMouse / 1.2)
      const sideDissolve = Math.max(0, (originalX + 0.5) / 1.0)
      const totalDissolve = dissolveFactor * 0.65 + sideDissolve * 0.35
      
      // Floating animation
      const floatY = Math.sin(time * 0.4 + i * 0.008) * 0.012
      const floatX = Math.cos(time * 0.25 + i * 0.012) * 0.008
      
      // Dispersion effect
      const dispersionX = originalX * (1 + totalDissolve * 2.5)
      const dispersionY = originalY + totalDissolve * 1.5 + Math.sin(time * 0.5 + i * 0.08) * totalDissolve * 0.35
      const dispersionZ = originalZ + totalDissolve * 1.3
      
      // Smooth interpolation
      const smoothness = 0.07
      positions[i3] += (dispersionX + floatX - positions[i3]) * smoothness
      positions[i3 + 1] += (dispersionY + floatY - positions[i3 + 1]) * smoothness
      positions[i3 + 2] += (dispersionZ - positions[i3 + 2]) * smoothness
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true
    particlesRef.current.rotation.y = Math.sin(time * 0.12) * 0.12
  })
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.020}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}