'use client'

import { useRef, MouseEvent } from 'react'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'outline'
}

export default function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  variant = 'primary',
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLElement>(null)

  const handleMouseMove = (e: MouseEvent) => {
    if (!btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    btnRef.current.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`
  }

  const handleMouseLeave = () => {
    if (!btnRef.current) return
    btnRef.current.style.transform = 'translate(0, 0)'
  }

  const baseStyles = `
    inline-flex items-center gap-2.5 px-8 py-4 rounded-full
    font-medium text-sm tracking-wide
    transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
    cursor-pointer no-underline
  `

  const variants = {
    primary: `
      bg-gradient-to-r from-accent to-accent-violet text-bg-primary font-semibold
      shadow-[0_0_40px_rgba(0,212,255,0.25),0_0_80px_rgba(0,212,255,0.1)]
      hover:shadow-[0_0_60px_rgba(0,212,255,0.35),0_0_120px_rgba(0,212,255,0.15)]
      hover:scale-[1.02]
    `,
    outline: `
      bg-transparent text-text-primary border border-glass-border-hover
      backdrop-blur-xl
      hover:border-accent hover:bg-accent-subtle
      hover:shadow-[0_0_30px_rgba(0,212,255,0.15)]
    `,
  }

  const props = {
    ref: btnRef as any,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className: `${baseStyles} ${variants[variant]} ${className}`,
    onClick,
  }

  if (href) {
    return <a href={href} {...props}>{children}</a>
  }

  return <button {...props}>{children}</button>
}