'use client'

import MagneticButton from '@/components/ui/MagneticButton'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Image from 'next/image'

interface HeroProps {
  name: string
  title: string
  subtitle?: string | null
  bio: string
  yearsExperience: string
  projectsDelivered: string
  clientSatisfaction: string
}

export default function Hero({ name, yearsExperience, projectsDelivered, clientSatisfaction }: HeroProps) {  const isMobile = useMediaQuery('(max-width: 1024px)')
  const nameParts = name.split(' ')

  // Eye-catching bio - Replace in admin or use this default
  const displayBio = "I build fast, beautiful, and scalable web applications. Obsessed with clean code, exceptional UX, and delivering products that exceed expectations. Let's create something remarkable."

  return (
    <section id="hero" className="relative min-h-screen flex items-center px-[6vw] pt-24 overflow-hidden">
      {/* Atmospheric background layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs - LESS OPAQUE */}
        <div className="absolute top-20 right-[10%] w-[600px] h-[600px] bg-accent/8 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 left-[5%] w-[500px] h-[500px] bg-accent-violet/8 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center w-full max-w-[1500px] mx-auto gap-20 relative z-10">
        {/* Left - Content */}
        <div className="relative">
          {/* Background glow behind text */}
          <div className="absolute -inset-8 bg-gradient-to-r from-bg-primary/60 via-bg-primary/40 to-transparent blur-2xl -z-10" />
          
          <div
            className="inline-flex items-center gap-3 font-mono text-[0.9rem] text-accent tracking-[0.25em] uppercase mb-10 opacity-0 animate-[fadeSlideUp_1s_0.5s_forwards] drop-shadow-[0_2px_10px_rgba(0,212,255,0.6)]"
          >
            <span className="relative w-3 h-3 bg-accent rounded-full shadow-[0_0_10px_rgba(0,212,255,0.8)]">
              <span className="absolute -inset-1 border-2 border-accent rounded-full animate-ping opacity-75" />
            </span>
            Available for new opportunities
          </div>

          <h1
            className="font-heading font-black leading-[0.9] tracking-tight mb-4 opacity-0 animate-[fadeSlideUp_1.2s_0.7s_forwards]"
            style={{ 
              fontSize: 'clamp(4rem, 9vw, 8rem)',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 212, 255, 0.2)'
            }}
          >
            <span className="block bg-gradient-to-br from-white via-text-primary to-text-primary bg-clip-text text-transparent">
              {nameParts[0]}
            </span>
            <span className="block bg-gradient-to-r from-accent via-accent-violet to-accent bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,212,255,0.5)]">
              {nameParts.slice(1).join(' ')}
            </span>
          </h1>

          {/* Updated title - FULL STACK ENGINEER (not AI) */}
          <div
            className="font-display tracking-[0.15em] text-text-primary/95 mb-10 opacity-0 animate-[fadeSlideUp_1s_0.9s_forwards]"
            style={{ 
              fontSize: 'clamp(1.5rem, 3.5vw, 2.6rem)',
              textShadow: '0 2px 15px rgba(0, 0, 0, 0.6)'
            }}
          >
            FULL STACK ENGINEER
          </div>

          {/* Eye-catching bio */}
          <p 
            className="text-xl font-light text-text-primary/85 max-w-[600px] leading-relaxed mb-12 opacity-0 animate-[fadeSlideUp_1s_1.1s_forwards]"
            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}
          >
            {displayBio}
          </p>

          <div className="flex gap-5 flex-wrap opacity-0 animate-[fadeSlideUp_1s_1.3s_forwards]">
            <MagneticButton href="#projects" variant="primary">
              <span className="text-base font-semibold">View My Work</span>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </MagneticButton>
            <MagneticButton href="#contact" variant="outline">
              <span className="text-base font-semibold">Let&apos;s Collaborate</span>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </MagneticButton>
          </div>

          {/* Dynamic Stats from Database */}
          <div className="flex gap-10 mt-14 opacity-0 animate-[fadeSlideUp_1s_1.5s_forwards]">
            <div>
              <div 
                className="text-5xl font-bold text-accent mb-2"
                style={{ textShadow: '0 0 20px rgba(0, 212, 255, 0.6), 0 4px 10px rgba(0, 0, 0, 0.5)' }}
              >
                {yearsExperience}
              </div>
              <div className="text-sm text-text-primary/75 uppercase tracking-wider font-medium">Years Experience</div>
            </div>
            <div>
              <div 
                className="text-5xl font-bold text-accent mb-2"
                style={{ textShadow: '0 0 20px rgba(0, 212, 255, 0.6), 0 4px 10px rgba(0, 0, 0, 0.5)' }}
              >
                {projectsDelivered}
              </div>
              <div className="text-sm text-text-primary/75 uppercase tracking-wider font-medium">Projects Delivered</div>
            </div>
            <div>
              <div 
                className="text-5xl font-bold text-accent mb-2"
                style={{ textShadow: '0 0 20px rgba(0, 212, 255, 0.6), 0 4px 10px rgba(0, 0, 0, 0.5)' }}
              >
                {clientSatisfaction}
              </div>
              <div className="text-sm text-text-primary/75 uppercase tracking-wider font-medium">Client Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Right - Developer Image */}
        {!isMobile && (
          <div className="relative opacity-0 animate-[fadeIn_1.5s_1s_forwards]">
            <div className="relative w-full h-[650px] group">
              
              {/* Background glow - LESS OPAQUE */}
              <div className="absolute -inset-20 bg-gradient-radial from-accent/15 via-accent-violet/8 to-transparent blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
              
              {/* Main image container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                {/* Color integration overlay - LESS OPAQUE */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-transparent to-accent-violet/15 mix-blend-overlay z-10 pointer-events-none" />
                
                {/* Edge fades */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-bg-primary to-transparent z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent z-10 pointer-events-none" />
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" />
                
                {/* Image */}
                <div className="relative w-full h-full">
                  <Image
                    src="/hero-developer.jpg"
                    alt="Developer workspace"
                    fill
                    className="object-cover object-center mix-blend-lighten opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    priority
                    quality={95}
                  />
                </div>
                
                {/* Scan line */}
                <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden opacity-30">
                  <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent animate-[scanLine_6s_ease-in-out_infinite]" />
                </div>
                
                {/* Particle overlay - LESS OPAQUE */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.08)_0%,transparent_50%)] opacity-40 pointer-events-none z-10" />
              </div>
              
              {/* Floating elements - LESS OPAQUE */}
              <div className="absolute -top-10 -right-10 w-32 h-32 border border-accent/15 rounded-full animate-[float_6s_ease-in-out_infinite]" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 border border-accent-violet/15 rounded-full animate-[float_8s_ease-in-out_infinite]" style={{ animationDelay: '1s' }} />
              
              {/* Corner accents */}
              <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-accent/50 pointer-events-none z-30 transition-all duration-500 group-hover:scale-110 group-hover:border-accent/70 shadow-[0_0_10px_rgba(0,212,255,0.3)]" />
              <div className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-accent/50 pointer-events-none z-30 transition-all duration-500 group-hover:scale-110 group-hover:border-accent/70 shadow-[0_0_10px_rgba(0,212,255,0.3)]" />
              <div className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-accent-violet/50 pointer-events-none z-30 transition-all duration-500 group-hover:scale-110 group-hover:border-accent-violet/70 shadow-[0_0_10px_rgba(123,97,255,0.3)]" />
              <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-accent-violet/50 pointer-events-none z-30 transition-all duration-500 group-hover:scale-110 group-hover:border-accent-violet/70 shadow-[0_0_10px_rgba(123,97,255,0.3)]" />
              
              {/* Status badge */}
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                <div className="flex items-center gap-3 px-6 py-3 bg-bg-elevated/90 backdrop-blur-md border border-accent/40 rounded-full shadow-[0_0_20px_rgba(0,212,255,0.3)]">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-accent shadow-[0_0_10px_rgba(0,212,255,0.8)]"></span>
                  </span>
                  <span className="text-sm font-mono text-accent uppercase tracking-wider font-semibold drop-shadow-[0_2px_8px_rgba(0,212,255,0.6)]">System Active</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Scroll indicator — z-20 to float above the hero image */}
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 opacity-0 animate-[fadeSlideUp_1s_1.8s_forwards]">
        <div className="w-[24px] h-[38px] border-[2px] border-text-primary/60 rounded-xl relative shadow-[0_0_10px_rgba(0,212,255,0.3)]">
          <span className="absolute top-2 left-1/2 -translate-x-1/2 w-[4px] h-2.5 bg-accent rounded-full animate-[scrollWheel_2s_ease-in-out_infinite] shadow-[0_0_8px_rgba(0,212,255,0.8)]" />
        </div>
        <span className="font-mono text-[0.7rem] text-text-primary/70 tracking-[0.3em] uppercase font-medium">
          Scroll to explore
        </span>
      </div>
    </section>
  )
}