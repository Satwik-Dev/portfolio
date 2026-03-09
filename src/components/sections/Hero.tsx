'use client'

import dynamic from 'next/dynamic'
import MagneticButton from '@/components/ui/MagneticButton'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const HeroOrbit = dynamic(() => import('@/components/three/HeroOrbit'), { ssr: false })

interface HeroProps {
  name: string
  title: string
  subtitle?: string | null
  bio: string
}

export default function Hero({ name, title, subtitle, bio }: HeroProps) {
  const isMobile = useMediaQuery('(max-width: 1024px)')
  const nameParts = name.split(' ')

  return (
    <section id="hero" className="relative min-h-screen flex items-center px-[6vw]">
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] items-center w-full max-w-[1400px] mx-auto gap-16">
        {/* Left */}
        <div className="relative">
          <div
            className="inline-flex items-center gap-3 font-mono text-[0.7rem] text-accent tracking-[0.25em] uppercase mb-8 opacity-0 animate-[fadeSlideUp_1s_0.5s_forwards]"
          >
            <span className="relative w-2 h-2 bg-accent rounded-full">
              <span className="absolute -inset-1 border border-accent rounded-full animate-ping opacity-60" />
            </span>
            Open to opportunities
          </div>

          <h1
            className="font-heading font-black leading-[0.92] tracking-tight mb-2 opacity-0 animate-[fadeSlideUp_1.2s_0.7s_forwards]"
            style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)' }}
          >
            <span className="block bg-gradient-to-br from-text-primary to-text-dim bg-clip-text text-transparent">
              {nameParts[0]}
            </span>
            <span className="block bg-gradient-to-r from-accent to-accent-violet bg-clip-text text-transparent">
              {nameParts.slice(1).join(' ')}
            </span>
          </h1>

          <div
            className="font-display tracking-[0.15em] text-text-dim mb-8 opacity-0 animate-[fadeSlideUp_1s_0.9s_forwards]"
            style={{ fontSize: 'clamp(1.2rem, 3vw, 2.2rem)' }}
          >
            {subtitle ?? title}
          </div>

          <p className="text-lg font-light text-text-dim max-w-[520px] leading-relaxed mb-10 opacity-0 animate-[fadeSlideUp_1s_1.1s_forwards]">
            {bio.length > 200 ? bio.substring(0, 200) + '...' : bio}
          </p>

          <div className="flex gap-4 flex-wrap opacity-0 animate-[fadeSlideUp_1s_1.3s_forwards]">
            <MagneticButton href="#projects" variant="primary">
              Explore My Work
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </MagneticButton>
            <MagneticButton href="#contact" variant="outline">
              Get In Touch
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </MagneticButton>
          </div>
        </div>

        {/* Right - 3D Orbit */}
        {!isMobile && (
          <div className="flex justify-center items-center">
            <div className="w-[420px] h-[420px] overflow-visible">
              <HeroOrbit />
            </div>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0 animate-[fadeSlideUp_1s_1.8s_forwards]">
        <div className="w-[22px] h-[34px] border-[1.5px] border-text-muted rounded-xl relative">
          <span className="absolute top-1.5 left-1/2 -translate-x-1/2 w-[3px] h-2 bg-accent rounded-full animate-[scrollWheel_2s_ease-in-out_infinite]" />
        </div>
        <span className="font-mono text-[0.6rem] text-text-muted tracking-[0.3em] uppercase">
          Scroll to explore
        </span>
      </div>
    </section>
  )
}