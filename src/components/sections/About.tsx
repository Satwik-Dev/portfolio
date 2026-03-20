'use client'

import SectionWrapper from '@/components/ui/SectionWrapper'
import GlassCard from '@/components/ui/GlassCard'
import GradientText from '@/components/ui/GradientText'
import Image from 'next/image'

interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string | null
  description: string | null
  current: boolean
  order: number
}

interface AboutProps {
  bio: string
  experiences: Experience[]
  avatarUrl?: string | null
  aboutTitle: string
  aboutBadge: string
  metric1Value: string
  metric1Label: string
  metric2Value: string
  metric2Label: string
  metric3Value: string
  metric3Label: string
  metric4Value: string
  metric4Label: string
}

export default function About({ 
  bio, 
  experiences, 
  avatarUrl,
  aboutTitle,
  aboutBadge,
  metric1Value,
  metric1Label,
  metric2Value,
  metric2Label,
  metric3Value,
  metric3Label,
  metric4Value,
  metric4Label
}: AboutProps) {
  const nameParts = aboutTitle.split(',')
  
  return (
    <SectionWrapper id="about" eyebrow="About">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 max-w-[1300px] mx-auto items-start">
        {/* Left - Portrait */}
        <div className="sr">
          <div className="relative mb-10">
            <div className="w-full max-w-[440px] mx-auto lg:mx-0 aspect-[3/4] rounded-2xl bg-gradient-to-br from-bg-elevated to-[#0c1322] border border-glass-border relative overflow-hidden group">
              
              {avatarUrl ? (
                <>
                  {/* Background glow */}
                  <div className="absolute -inset-20 bg-gradient-radial from-accent/12 via-accent-violet/6 to-transparent blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                  
                  {/* Color integration overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/12 via-transparent to-accent-violet/12 mix-blend-overlay z-10 pointer-events-none" />
                  
                  {/* Edge fades for seamless integration */}
                  <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-bg-primary to-transparent z-10 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent z-10 pointer-events-none" />
                  <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" />
                  
                  {/* Profile Image */}
                  <div className="relative w-full h-full">
                    <Image
                      src={avatarUrl}
                      alt="Profile"
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
                  
                  {/* Particle overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.06)_0%,transparent_50%)] opacity-40 pointer-events-none z-10" />
                  
                  {/* Corner accents */}
                  <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-accent/50 pointer-events-none z-30 transition-all duration-500 group-hover:scale-110 group-hover:border-accent/70 shadow-[0_0_10px_rgba(0,212,255,0.3)]" />
                  <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-accent/50 pointer-events-none z-30 transition-all duration-500 group-hover:scale-110 group-hover:border-accent/70 shadow-[0_0_10px_rgba(0,212,255,0.3)]" />
                  <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-accent-violet/50 pointer-events-none z-30 transition-all duration-500 group-hover:scale-110 group-hover:border-accent-violet/70 shadow-[0_0_10px_rgba(123,97,255,0.3)]" />
                  <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-accent-violet/50 pointer-events-none z-30 transition-all duration-500 group-hover:scale-110 group-hover:border-accent-violet/70 shadow-[0_0_10px_rgba(123,97,255,0.3)]" />
                </>
              ) : (
                <>
                  {/* Neural lines - fallback if no image */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[20, 40, 60, 80].map((top, idx) => (
                      <div
                        key={idx}
                        className="absolute left-[-10%] w-[120%] h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent"
                        style={{
                          top: `${top}%`,
                          animation: `nodeLineMove 4s ease-in-out infinite`,
                          animationDelay: `${-idx * 0.8}s`,
                        }}
                      />
                    ))}
                  </div>
                  {/* Initials */}
                  <span className="relative z-10 font-heading text-[8rem] font-black bg-gradient-to-br from-accent/12 to-accent-violet/8 bg-clip-text text-transparent select-none flex items-center justify-center h-full">
                    SA
                  </span>
                </>
              )}
            </div>

            {/* Badge - Dynamic */}
            <div className="absolute -bottom-4 right-4 lg:right-0 bg-glass backdrop-blur-2xl border border-glass-border rounded-xl px-4 py-3 font-mono text-[0.7rem] text-accent flex items-center gap-2 z-10">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_8px_rgba(0,255,136,0.5)]" />
              {aboutBadge}
            </div>
          </div>
        </div>

        {/* Right - Content */}
        <div>
          <h2 
            className="sr font-heading font-extrabold leading-[1.05] tracking-tight mb-6" 
            style={{ 
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 212, 255, 0.2)'
            }}
          >
            {nameParts[0]}{nameParts.length > 1 && ','}<br />
            <GradientText>{nameParts.slice(1).join(',').trim() || 'one system at a time.'}</GradientText>
          </h2>

          <div 
            className="sr space-y-4 text-xl text-text-primary/85 font-light leading-relaxed mb-10" 
            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}
          >
            {bio.split('\n').filter(Boolean).map((paragraph, idx) => (
              <p key={idx} dangerouslySetInnerHTML={{
                __html: paragraph
                  .replace(/BYJU'S/g, '<strong class="text-text-primary font-medium">BYJU\'S</strong>')
                  .replace(/Cosmo AGI, LLC/g, '<strong class="text-text-primary font-medium">Cosmo AGI, LLC</strong>')
                  .replace(/Lead Software Engineer/g, '<strong class="text-text-primary font-medium">Lead Software Engineer</strong>')
                  .replace(/UMBC/g, '<strong class="text-text-primary font-medium">UMBC</strong>')
                  .replace(/IIT Bhubaneswar/g, '<strong class="text-text-primary font-medium">IIT Bhubaneswar</strong>')
              }} />
            ))}
          </div>

          {/* Achievement Stats — Recruiter-focused */}
          <div className="sr grid grid-cols-2 gap-4 mb-12">
            <GlassCard className="p-5 group/stat hover:border-accent/30 transition-all duration-300">
              <div 
                className="font-display text-5xl text-accent leading-none group-hover/stat:drop-shadow-[0_0_12px_rgba(0,212,255,0.4)] transition-all duration-300" 
                style={{ textShadow: '0 0 20px rgba(0, 212, 255, 0.6), 0 4px 10px rgba(0, 0, 0, 0.5)' }}
              >
                {metric1Value}
              </div>
              <div className="text-sm text-text-primary/75 uppercase tracking-wider font-medium mt-1.5">
                {metric1Label}
              </div>
            </GlassCard>
            
            <GlassCard className="p-5 group/stat hover:border-accent/30 transition-all duration-300">
              <div 
                className="font-display text-5xl text-accent leading-none group-hover/stat:drop-shadow-[0_0_12px_rgba(0,212,255,0.4)] transition-all duration-300" 
                style={{ textShadow: '0 0 20px rgba(0, 212, 255, 0.6), 0 4px 10px rgba(0, 0, 0, 0.5)' }}
              >
                {metric2Value}
              </div>
              <div className="text-sm text-text-primary/75 uppercase tracking-wider font-medium mt-1.5">
                {metric2Label}
              </div>
            </GlassCard>
            
            <GlassCard className="p-5 group/stat hover:border-accent/30 transition-all duration-300">
              <div 
                className="font-display text-5xl text-accent leading-none group-hover/stat:drop-shadow-[0_0_12px_rgba(0,212,255,0.4)] transition-all duration-300" 
                style={{ textShadow: '0 0 20px rgba(0, 212, 255, 0.6), 0 4px 10px rgba(0, 0, 0, 0.5)' }}
              >
                {metric3Value}
              </div>
              <div className="text-sm text-text-primary/75 uppercase tracking-wider font-medium mt-1.5">
                {metric3Label}
              </div>
            </GlassCard>
            
            <GlassCard className="p-5 group/stat hover:border-accent/30 transition-all duration-300">
              <div 
                className="font-display text-5xl text-accent leading-none group-hover/stat:drop-shadow-[0_0_12px_rgba(0,212,255,0.4)] transition-all duration-300" 
                style={{ textShadow: '0 0 20px rgba(0, 212, 255, 0.6), 0 4px 10px rgba(0, 0, 0, 0.5)' }}
              >
                {metric4Value}
              </div>
              <div className="text-sm text-text-primary/75 uppercase tracking-wider font-medium mt-1.5">
                {metric4Label}
              </div>
            </GlassCard>
          </div>

          {/* Work Experience Timeline — Full history */}
          <div className="sr">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[0.65rem] text-accent tracking-[0.25em] uppercase">
                Experience
              </span>
              <span className="flex-1 h-px bg-gradient-to-r from-accent/20 to-transparent" />
            </div>

            <div className="relative pl-8">
              {/* Gradient line */}
              <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-accent via-accent-violet to-transparent" />

              {experiences.map((exp) => (
                <div key={exp.id} className="relative pb-8 pl-6 last:pb-0 group/exp">
                  {/* Dot */}
                  <div className="absolute -left-[1.56rem] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-accent bg-bg-primary shadow-[0_0_10px_rgba(0,212,255,0.3)] group-hover/exp:bg-accent group-hover/exp:shadow-[0_0_16px_rgba(0,212,255,0.5)] transition-all duration-300" />

                  <div className="font-mono text-[0.7rem] text-accent/80 tracking-[0.15em] mb-1">
                    {exp.startDate} — {exp.endDate ?? 'Present'}
                    {exp.current && (
                      <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 bg-accent/10 border border-accent/20 rounded-full text-[0.6rem] text-accent">
                        <span className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
                        Current
                      </span>
                    )}
                  </div>
                  <div 
                    className="font-heading text-xl font-semibold mb-0.5 group-hover/exp:text-accent transition-colors duration-300" 
                    style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)' }}
                  >
                    {exp.position}
                  </div>
                  <div className="flex items-center gap-2 text-base text-text-primary/75 font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-violet/50" />
                    {exp.company}
                  </div>
                  {exp.description && (
                    <p className="text-sm text-text-dim/80 font-light mt-2 leading-relaxed max-w-lg">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}