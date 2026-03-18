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
import GlassCard from '@/components/ui/GlassCard'
import GradientText from '@/components/ui/GradientText'
import Image from 'next/image'

// ─── TYPES ──────────────────────────────────────────────────────────────────
interface Skill {
  id: string
  name: string
  category: string
  level: number
  logoUrl: string | null
  order: number
}

interface TechStackProps {
  skills?: Skill[]
}

// ─── BRAND COLORS + DRAW MODES ──────────────────────────────────────────────
const BRAND: Record<string, { color: string; abbr: string; draw?: string }> = {
  React:            { color: '#61DAFB', abbr: 'Re', draw: 'react' },
  TypeScript:       { color: '#3178C6', abbr: 'TS', draw: 'ts' },
  JavaScript:       { color: '#F7DF1E', abbr: 'JS', draw: 'js' },
  'Node.js':        { color: '#68A063', abbr: 'No', draw: 'node' },
  'Next.js':        { color: '#000000', abbr: 'Nx', draw: 'next' },
  PostgreSQL:       { color: '#336791', abbr: 'PG', draw: 'pg' },
  MongoDB:          { color: '#47A248', abbr: 'Mo', draw: 'mongo' },
  Express:          { color: '#444444', abbr: 'Ex', draw: 'text' },
  Python:           { color: '#3776AB', abbr: 'Py', draw: 'text' },
  FastAPI:          { color: '#009688', abbr: 'FA', draw: 'text' },
  Django:           { color: '#092E20', abbr: 'Dj', draw: 'text' },
  Ruby:             { color: '#CC342D', abbr: 'Rb', draw: 'text' },
  'C++':            { color: '#00599C', abbr: 'C+', draw: 'text' },
  Docker:           { color: '#2496ED', abbr: 'Dk', draw: 'text' },
  AWS:              { color: '#FF9900', abbr: 'AW', draw: 'text' },
  Redis:            { color: '#DC382D', abbr: 'Rd', draw: 'text' },
  GraphQL:          { color: '#E10098', abbr: 'GQ', draw: 'text' },
  'Tailwind CSS':   { color: '#06B6D4', abbr: 'Tw', draw: 'text' },
  Tailwind:         { color: '#06B6D4', abbr: 'Tw', draw: 'text' },
  Prisma:           { color: '#2D3748', abbr: 'Pr', draw: 'text' },
  Git:              { color: '#F05032', abbr: 'Gt', draw: 'text' },
  'GitHub Actions': { color: '#2088FF', abbr: 'GA', draw: 'text' },
  GSAP:             { color: '#88CE02', abbr: 'GS', draw: 'text' },
  Firebase:         { color: '#FFCA28', abbr: 'Fi', draw: 'text' },
  'Three.js':       { color: '#049EF4', abbr: '3D', draw: 'text' },
  Figma:            { color: '#F24E1E', abbr: 'Fg', draw: 'text' },
  Sentry:           { color: '#362D59', abbr: 'Se', draw: 'text' },
  Prometheus:       { color: '#E6522C', abbr: 'Pm', draw: 'text' },
  Kubernetes:       { color: '#326CE5', abbr: 'K8', draw: 'text' },
  MySQL:            { color: '#4479A1', abbr: 'SQ', draw: 'text' },
  Rust:             { color: '#CE422B', abbr: 'Rs', draw: 'text' },
  Go:               { color: '#00ADD8', abbr: 'Go', draw: 'text' },
  Nginx:            { color: '#009639', abbr: 'Ng', draw: 'text' },
  Linux:            { color: '#FCC624', abbr: 'Lx', draw: 'text' },
  Vercel:           { color: '#000000', abbr: 'Vc', draw: 'next' },
  'Framer Motion':  { color: '#0055FF', abbr: 'FM', draw: 'text' },
  HTML5:            { color: '#E34F26', abbr: 'HT', draw: 'text' },
  CSS3:             { color: '#1572B6', abbr: 'CS', draw: 'text' },
}

const DEFAULT_TECHS = [
  'React', 'TypeScript', 'Node.js', 'Next.js',
  'PostgreSQL', 'MongoDB', 'Express', 'JavaScript',
  'Python', 'FastAPI', 'Django', 'Ruby', 'C++',
  'Redis', 'AWS', 'Docker', 'GitHub Actions',
  'Git', 'Sentry', 'Prometheus',
]

// ─── CANVAS TEXTURE GENERATOR ───────────────────────────────────────────────
function createTechTexture(name: string): THREE.CanvasTexture {
  const S = 512
  const C = S / 2
  const canvas = document.createElement('canvas')
  canvas.width = S
  canvas.height = S
  const ctx = canvas.getContext('2d')!

  const brand = BRAND[name] ?? {
    color: '#555555',
    abbr: name.slice(0, 2).toUpperCase(),
    draw: 'text',
  }
  const { color, abbr } = brand
  const drawType = brand.draw ?? 'text'

  // ── White sphere base with radial gradient for 3D depth ──
  const bg = ctx.createRadialGradient(C * 0.85, C * 0.7, 0, C, C, C)
  bg.addColorStop(0, '#ffffff')
  bg.addColorStop(0.45, '#f8f8f8')
  bg.addColorStop(0.75, '#eeeeee')
  bg.addColorStop(1, '#d8d8d8')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, S, S)

  // ── Subtle specular highlight ──
  const hl = ctx.createRadialGradient(C * 0.7, C * 0.55, 0, C * 0.7, C * 0.55, C * 0.45)
  hl.addColorStop(0, 'rgba(255,255,255,0.7)')
  hl.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = hl
  ctx.fillRect(0, 0, S, S)

  // ── Draw logo based on type ──
  switch (drawType) {
    case 'react':  drawReactAtom(ctx, C, C, color); break
    case 'ts':     drawSquareBadge(ctx, C, C, color, 'TS', '#ffffff'); break
    case 'js':     drawSquareBadge(ctx, C, C, color, 'JS', '#000000'); break
    case 'node':   drawHexBadge(ctx, C, C, color, 'N'); break
    case 'next':   drawCircleBadge(ctx, C, C, '#000000', 'N', '#ffffff'); break
    case 'pg':     drawShieldBadge(ctx, C, C, color, 'P'); break
    case 'mongo':  drawLeaf(ctx, C, C, color); break
    default:       drawStyledText(ctx, C, C, color, abbr); break
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// ── React Atom Icon ──
function drawReactAtom(ctx: CanvasRenderingContext2D, cx: number, cy: number, color: string) {
  const r = 110
  ctx.strokeStyle = color
  ctx.lineWidth = 5.5
  ctx.lineCap = 'round'
  for (let i = 0; i < 3; i++) {
    ctx.save()
    ctx.translate(cx, cy)
    ctx.rotate((i * Math.PI) / 3)
    ctx.beginPath()
    ctx.ellipse(0, 0, r, r * 0.38, 0, 0, Math.PI * 2)
    ctx.stroke()
    ctx.restore()
  }
  ctx.beginPath()
  ctx.arc(cx, cy, 12, 0, Math.PI * 2)
  ctx.fillStyle = color
  ctx.fill()
}

// ── Square Badge (TS, JS) ──
function drawSquareBadge(
  ctx: CanvasRenderingContext2D, cx: number, cy: number,
  bg: string, text: string, textColor: string
) {
  const size = 150, radius = 22, x = cx - size / 2, y = cy - size / 2
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + size - radius, y)
  ctx.quadraticCurveTo(x + size, y, x + size, y + radius)
  ctx.lineTo(x + size, y + size - radius)
  ctx.quadraticCurveTo(x + size, y + size, x + size - radius, y + size)
  ctx.lineTo(x + radius, y + size)
  ctx.quadraticCurveTo(x, y + size, x, y + size - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
  ctx.fillStyle = bg
  ctx.fill()
  ctx.fillStyle = textColor
  ctx.font = 'bold 90px "Segoe UI", system-ui, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, cx, cy + 4)
}

// ── Hex Badge (Node.js) ──
function drawHexBadge(ctx: CanvasRenderingContext2D, cx: number, cy: number, color: string, text: string) {
  const r = 90
  ctx.beginPath()
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 2
    const x = cx + r * Math.cos(angle)
    const y = cy + r * Math.sin(angle)
    if (i === 0) ctx.moveTo(x, y) ; else ctx.lineTo(x, y)
  }
  ctx.closePath()
  ctx.fillStyle = color
  ctx.fill()
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 100px "Segoe UI", system-ui, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, cx, cy + 4)
}

// ── Circle Badge (Next.js, Vercel) ──
function drawCircleBadge(
  ctx: CanvasRenderingContext2D, cx: number, cy: number,
  bg: string, text: string, textColor: string
) {
  ctx.beginPath()
  ctx.arc(cx, cy, 85, 0, Math.PI * 2)
  ctx.fillStyle = bg
  ctx.fill()
  ctx.fillStyle = textColor
  ctx.font = 'bold 100px "Segoe UI", system-ui, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, cx, cy + 4)
}

// ── Shield Badge (PostgreSQL) ──
function drawShieldBadge(ctx: CanvasRenderingContext2D, cx: number, cy: number, color: string, text: string) {
  const w = 130, h = 160
  ctx.beginPath()
  ctx.moveTo(cx, cy - h / 2)
  ctx.quadraticCurveTo(cx + w / 2, cy - h / 2, cx + w / 2, cy - h / 4)
  ctx.lineTo(cx + w / 2, cy + h / 6)
  ctx.quadraticCurveTo(cx + w / 2, cy + h / 2, cx, cy + h / 2 + 10)
  ctx.quadraticCurveTo(cx - w / 2, cy + h / 2, cx - w / 2, cy + h / 6)
  ctx.lineTo(cx - w / 2, cy - h / 4)
  ctx.quadraticCurveTo(cx - w / 2, cy - h / 2, cx, cy - h / 2)
  ctx.closePath()
  ctx.fillStyle = color
  ctx.fill()
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 95px "Segoe UI", system-ui, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, cx, cy + 6)
}

// ── Leaf Shape (MongoDB) ──
function drawLeaf(ctx: CanvasRenderingContext2D, cx: number, cy: number, color: string) {
  ctx.save()
  ctx.translate(cx, cy)
  ctx.beginPath()
  ctx.moveTo(0, -100)
  ctx.bezierCurveTo(60, -70, 75, 20, 40, 80)
  ctx.quadraticCurveTo(15, 110, 0, 105)
  ctx.quadraticCurveTo(-15, 110, -40, 80)
  ctx.bezierCurveTo(-75, 20, -60, -70, 0, -100)
  ctx.closePath()
  ctx.fillStyle = color
  ctx.fill()
  ctx.beginPath()
  ctx.moveTo(0, -70)
  ctx.quadraticCurveTo(3, 20, 0, 85)
  ctx.strokeStyle = '#2d7a32'
  ctx.lineWidth = 5
  ctx.stroke()
  ctx.restore()
}

// ── Styled Text Fallback ──
function drawStyledText(ctx: CanvasRenderingContext2D, cx: number, cy: number, color: string, text: string) {
  ctx.beginPath()
  ctx.arc(cx, cy, 80, 0, Math.PI * 2)
  ctx.fillStyle = color + '20'
  ctx.fill()
  ctx.strokeStyle = color + '50'
  ctx.lineWidth = 3
  ctx.stroke()
  ctx.fillStyle = color
  ctx.font = `bold ${text.length > 2 ? 72 : 90}px "Segoe UI", system-ui, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, cx, cy + 3)
}

// ─── SHARED GEOMETRY ────────────────────────────────────────────────────────
const sphereGeometry = new THREE.SphereGeometry(1, 28, 28)

// ─── 3D COMPONENTS ──────────────────────────────────────────────────────────
interface SphereGeoProps {
  scale: number
  material: THREE.MeshPhysicalMaterial
  isActive: boolean
}

function SphereGeo({ scale, material, isActive }: SphereGeoProps) {
  const api = useRef<RapierRigidBody>(null)
  const vec = useMemo(() => new THREE.Vector3(), [])
  const impulseVec = useMemo(() => new THREE.Vector3(), [])
  const r = THREE.MathUtils.randFloatSpread

  useFrame((_state, delta) => {
    if (!isActive || !api.current) return
    delta = Math.min(0.1, delta)

    const pos = api.current.translation()
    vec.set(pos.x, pos.y, pos.z)

    const impulse = impulseVec
      .copy(vec)
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
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
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  )
}

function Pointer({ isActive }: { isActive: boolean }) {
  const ref = useRef<RapierRigidBody>(null)
  const vec = useMemo(() => new THREE.Vector3(), [])

  useFrame(({ pointer, viewport }) => {
    if (!isActive || !ref.current) return
    vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    )
    ref.current.setNextKinematicTranslation(vec)
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

// ─── SCENE ──────────────────────────────────────────────────────────────────
function Scene({
  isActive,
  techNames,
  sphereCount,
}: {
  isActive: boolean
  techNames: string[]
  sphereCount: number
}) {
  const materials = useMemo(() => {
    if (typeof window === 'undefined') return []
    return techNames.map((name) => {
      const texture = createTechTexture(name)
      return new THREE.MeshPhysicalMaterial({
        map: texture,
        emissive: new THREE.Color('#ffffff'),
        emissiveMap: texture,
        emissiveIntensity: 0.25,
        metalness: 0.1,
        roughness: 0.6,
        clearcoat: 0.4,
        clearcoatRoughness: 0.25,
      })
    })
  }, [techNames])

  const sphereConfigs = useMemo(
    () =>
      [...Array(sphereCount)].map(() => ({
        scale: [0.65, 0.8, 0.9, 1.0, 1.1][Math.floor(Math.random() * 5)],
      })),
    [sphereCount]
  )

  if (materials.length === 0) return null

  return (
    <>
      <ambientLight intensity={1} />
      <spotLight
        position={[20, 20, 25]}
        penumbra={1}
        angle={0.2}
        color="white"
        castShadow
        shadow-mapSize={[512, 512]}
        intensity={2}
      />
      <directionalLight position={[0, 5, -4]} intensity={2} />
      <directionalLight position={[-10, -5, 5]} intensity={0.5} color="#a5b4fc" />

      <Physics gravity={[0, 0, 0]}>
        <Pointer isActive={isActive} />
        {sphereConfigs.map((props, i) => (
          <SphereGeo
            key={i}
            scale={props.scale}
            material={materials[i % materials.length]}
            isActive={isActive}
          />
        ))}
      </Physics>

      <Environment preset="city" environmentIntensity={0.5} />

      <EffectComposer enableNormalPass={false}>
        <N8AO color="#0a0014" aoRadius={2} intensity={1.15} />
      </EffectComposer>
    </>
  )
}

// ─── SKILLS GRID WITH LOGOS ─────────────────────────────────────────────────
function SkillsGrid({ skills }: { skills: Skill[] }) {
  // Group skills by category
  const grouped = useMemo(() => {
    const map: Record<string, Skill[]> = {}
    for (const skill of skills) {
      if (!map[skill.category]) map[skill.category] = []
      map[skill.category].push(skill)
    }
    return Object.entries(map)
  }, [skills])

  return (
    <div className="mt-16 space-y-10">
      {grouped.map(([category, categorySkills]) => (
        <div key={category}>
          {/* Category label */}
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[0.65rem] text-accent tracking-[0.25em] uppercase">
              {category}
            </span>
            <span className="flex-1 h-px bg-gradient-to-r from-accent/20 to-transparent" />
          </div>

          {/* Skills row */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {categorySkills.map((skill) => {
              const brand = BRAND[skill.name]
              return (
                <GlassCard
                  key={skill.id}
                  className="p-4 text-center group relative"
                >
                  {/* Hover bottom accent */}
                  <div
                    className="absolute bottom-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ backgroundColor: brand?.color ?? '#888' }}
                  />

                  {/* Logo */}
                  <div className="w-10 h-10 mx-auto mb-2 relative flex items-center justify-center">
                    {skill.logoUrl ? (
                      <Image
                        src={skill.logoUrl}
                        alt={skill.name}
                        width={40}
                        height={40}
                        className="object-contain drop-shadow-[0_2px_8px_rgba(0,212,255,0.15)] group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <span
                        className="text-lg font-bold"
                        style={{ color: brand?.color ?? '#888' }}
                      >
                        {brand?.abbr ?? skill.name.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <div className="text-[0.7rem] font-medium text-text-primary/80 group-hover:text-text-primary transition-colors leading-tight">
                    {skill.name}
                  </div>
                </GlassCard>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────
export default function TechStack({ skills }: TechStackProps) {
  const [isActive, setIsActive] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  const techNames = useMemo(() => {
    if (skills && skills.length > 0) {
      return Array.from(new Set(skills.map((s) => s.name)))
    }
    return DEFAULT_TECHS
  }, [skills])

  const sphereCount = Math.max(40, techNames.length * 2)

  useEffect(() => {
    setIsMounted(true)

    const handleScroll = () => {
      const section = document.getElementById('skills')
      if (!section) return
      const rect = section.getBoundingClientRect()
      setIsActive(rect.top < window.innerHeight * 0.8 && rect.bottom > -100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // SSR placeholder
  if (!isMounted) {
    return (
      <SectionWrapper id="skills">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center gap-4 font-mono text-[0.68rem] text-accent tracking-[0.3em] uppercase mb-4 justify-center">
              <span className="w-8 h-px bg-accent" />
              Tech Stack
            </div>
            <h2
              className="font-heading font-extrabold leading-[1.05] tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)' }}
            >
              Tools I think in.
              <br />
              <GradientText>Systems I build with.</GradientText>
            </h2>
          </div>
          <div className="relative w-full h-[600px] md:h-[700px] rounded-3xl overflow-hidden" />
        </div>
      </SectionWrapper>
    )
  }

  return (
    <SectionWrapper id="skills">
      <div className="max-w-[1400px] mx-auto">
        {/* ── Section Header ── */}
        <div className="text-center mb-12">
          <div className="sr flex items-center gap-4 font-mono text-[0.68rem] text-accent tracking-[0.3em] uppercase mb-4 justify-center">
            <span className="w-8 h-px bg-accent" />
            Tech Stack
          </div>
          <h2
            className="sr font-heading font-extrabold leading-[1.05] tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)' }}
          >
            Tools I think in.
            <br />
            <GradientText>Systems I build with.</GradientText>
          </h2>
        </div>

        {/* ── 3D Physics Canvas ── */}
        <div className="sr relative w-full h-[600px] md:h-[700px] rounded-3xl overflow-hidden">
          <Canvas
            shadows
            gl={{
              alpha: true,
              stencil: false,
              depth: false,
              antialias: false,
            }}
            camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
            onCreated={(state) => {
              state.gl.toneMappingExposure = 1.5
              state.gl.setClearColor(0x000000, 0)
            }}
            style={{ background: 'transparent' }}
            className="cursor-grab active:cursor-grabbing"
          >
            <Suspense fallback={null}>
              <Scene
                isActive={isActive}
                techNames={techNames}
                sphereCount={sphereCount}
              />
            </Suspense>
          </Canvas>

          {/* Interaction hint */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none select-none">
            <div className="px-5 py-2.5 rounded-full bg-bg-primary/70 backdrop-blur-md border border-accent/20">
              <p className="font-mono text-[0.65rem] text-accent/60 tracking-widest uppercase">
                Move cursor to interact
              </p>
            </div>
          </div>
        </div>

        {/* ── Skills Grid with Logos from /public/images/ ── */}
        {skills && skills.length > 0 && (
          <div className="sr">
            <SkillsGrid skills={skills} />
          </div>
        )}
      </div>
    </SectionWrapper>
  )
}