'use client'

import { useRef, MouseEvent } from 'react'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hoverGlow?: boolean
}

export default function GlassCard({ children, className = '', hoverGlow = true }: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!hoverGlow || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    cardRef.current.style.setProperty('--glow-x', `${x}px`)
    cardRef.current.style.setProperty('--glow-y', `${y}px`)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`
        relative overflow-hidden rounded-2xl
        bg-glass border border-glass-border
        backdrop-blur-xl
        transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
        hover:border-glass-border-hover hover:-translate-y-1
        hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)]
        ${hoverGlow ? 'group' : ''}
        ${className}
      `}
    >
      {hoverGlow && (
        <div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
          style={{
            background: 'radial-gradient(400px circle at var(--glow-x) var(--glow-y), rgba(0,212,255,0.06), transparent 40%)',
          }}
        />
      )}
      {children}
    </div>
  )
}