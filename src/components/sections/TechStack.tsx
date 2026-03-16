'use client'

import * as THREE from 'three'
import { useRef, useMemo, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { EffectComposer, N8AO } from '@react-three/postprocessing'
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  type RapierRigidBody,
} from '@react-three/rapier'
import SectionWrapper from '@/components/ui/SectionWrapper'
import GradientText from '@/components/ui/GradientText'

const textureLoader = new THREE.TextureLoader()

// Tech stack images - using CDN-hosted logos
const imageUrls = [
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
]

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)

const spheres = [...Array(25)].map(() => ({
  scale: [0.65, 0.75, 0.85, 0.95, 1.05][Math.floor(Math.random() * 5)],
}))

interface SphereProps {
  scale: number
  material: THREE.MeshStandardMaterial
  isActive: boolean
}

function SphereGeo({ scale, material, isActive }: SphereProps) {
  const api = useRef<RapierRigidBody>(null)
  const vec = new THREE.Vector3()
  const r = THREE.MathUtils.randFloatSpread

  useFrame((_state, delta) => {
    if (!isActive || !api.current) return
    delta = Math.min(0.1, delta)
    
    const impulse = vec
      .copy(api.current.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -45 * delta * scale,
          -135 * delta * scale,
          -45 * delta * scale
        )
      )

    api.current.applyImpulse(impulse, true)
  })

  return (
    <RigidBody
      ref={api}
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
      />
    </RigidBody>
  )
}

interface PointerProps {
  isActive: boolean
}

function Pointer({ isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null)
  const vec = new THREE.Vector3()

  useFrame(({ pointer, viewport }) => {
    if (!isActive || !ref.current) return
    
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    )
    ref.current.setNextKinematicTranslation(targetVec)
  })

  return (
    <RigidBody
      ref={ref}
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  )
}

function Scene({ isActive }: { isActive: boolean }) {
  const materials = useMemo(() => {
    return imageUrls.map((url) => {
      const texture = textureLoader.load(url)
      return new THREE.MeshStandardMaterial({
        map: texture,
        emissive: new THREE.Color('#00f5ff'),
        emissiveMap: texture,
        emissiveIntensity: 0.25,
        metalness: 0.6,
        roughness: 0.8,
      })
    })
  }, [])

  return (
    <>
      <ambientLight intensity={0.8} />
      <spotLight
        position={[20, 20, 25]}
        penumbra={1}
        angle={0.2}
        color="#00f5ff"
        castShadow
        shadow-mapSize={[512, 512]}
        intensity={1.5}
      />
      <directionalLight position={[0, 5, -4]} intensity={1.8} color="#00d4ff" />
      <directionalLight position={[-5, -5, 5]} intensity={0.5} color="#6366f1" />
      
      <Physics gravity={[0, 0, 0]}>
        <Pointer isActive={isActive} />
        {spheres.map((props, i) => (
          <SphereGeo
            key={i}
            {...props}
            material={materials[i % materials.length]}
            isActive={isActive}
          />
        ))}
      </Physics>
      
      <Environment preset="city" environmentIntensity={0.4} />
      
      <EffectComposer enableNormalPass={false}>
        <N8AO color="#0a0a0f" aoRadius={2.5} intensity={1.2} />
      </EffectComposer>
    </>
  )
}

export default function TechStack() {
  const [isActive, setIsActive] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    const handleScroll = () => {
      const skillsSection = document.getElementById('skills')
      if (!skillsSection) return
      
      const rect = skillsSection.getBoundingClientRect()
      const isVisible = rect.top < window.innerHeight * 0.7 && rect.bottom > 0
      setIsActive(isVisible)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial state
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (!isMounted) return null

  return (
    <SectionWrapper id="skills">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="sr flex items-center gap-4 font-mono text-[0.68rem] text-accent tracking-[0.3em] uppercase mb-4 justify-center">
            <span className="w-8 h-px bg-accent" />
            Tech Stack
          </div>
          <h2
            className="sr font-heading font-extrabold leading-[1.05] tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)' }}
          >
            Tools I think in.<br />
            <GradientText>Systems I build with.</GradientText>
          </h2>
        </div>

        {/* 3D Interactive Canvas */}
        <div className="sr relative w-full h-[600px] md:h-[700px] rounded-3xl overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary/30 via-bg-primary/50 to-bg-secondary/30 backdrop-blur-sm" />
          
          {/* Accent border glow */}
          <div className="absolute inset-0 rounded-3xl ring-1 ring-accent/20" />
          
          {/* Canvas */}
          <Canvas
            shadows
            gl={{ 
              alpha: true, 
              stencil: false, 
              depth: true, 
              antialias: true,
              powerPreference: 'high-performance'
            }}
            camera={{ position: [0, 0, 20], fov: 35, near: 1, far: 100 }}
            onCreated={(state) => {
              state.gl.toneMappingExposure = 1.5
            }}
            className="cursor-pointer"
          >
            <Suspense fallback={null}>
              <Scene isActive={isActive} />
            </Suspense>
          </Canvas>

          {/* Interaction hint */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
            <div className="px-5 py-2.5 rounded-full bg-bg-primary/80 backdrop-blur-md border border-accent/30">
              <p className="font-mono text-xs text-accent tracking-wider">
                HOVER & INTERACT
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack Grid - Fallback/Additional Info */}
        <div className="sr mt-12 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 opacity-60">
          {[
            'React',
            'Next.js',
            'Node.js',
            'TypeScript',
            'JavaScript',
            'MongoDB',
            'Express',
            'PostgreSQL',
          ].map((tech) => (
            <div
              key={tech}
              className="flex items-center justify-center p-4 rounded-xl bg-bg-secondary/30 border border-white/5 hover:border-accent/30 transition-colors"
            >
              <span className="font-mono text-xs text-text-muted text-center">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}