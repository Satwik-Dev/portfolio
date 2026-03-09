'use client'

import SectionWrapper from '@/components/ui/SectionWrapper'
import GlassCard from '@/components/ui/GlassCard'
import GradientText from '@/components/ui/GradientText'

interface Experience {
  id: string
  company: string
  role: string
  location: string | null
  startDate: string
  endDate: string | null
  description: string
  sortOrder: number
}

interface AboutProps {
  bio: string
  experiences: Experience[]
}

export default function About({ bio, experiences }: AboutProps) {
  return (
    <SectionWrapper id="about" eyebrow="About">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 max-w-[1300px] mx-auto items-start">
        {/* Left - Portrait */}
        <div className="sr">
          <div className="relative mb-10">
            <div className="w-full max-w-[440px] mx-auto lg:mx-0 aspect-[3/4] rounded-2xl bg-gradient-to-br from-bg-elevated to-[#0c1322] border border-glass-border relative overflow-hidden flex items-center justify-center">
              {/* Neural lines */}
              <div className="absolute inset-0 overflow-hidden">
                {[20, 40, 60, 80].map((top, i) => (
                  <div
                    key={i}
                    className="absolute left-[-10%] w-[120%] h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent"
                    style={{
                      top: `${top}%`,
                      animation: `nodeLineMove 4s ease-in-out infinite`,
                      animationDelay: `${-i * 0.8}s`,
                    }}
                  />
                ))}
              </div>
              {/* Initials */}
              <span className="relative z-10 font-heading text-[8rem] font-black bg-gradient-to-br from-accent/12 to-accent-violet/8 bg-clip-text text-transparent select-none">
                SA
              </span>
            </div>

            {/* Badge */}
            <div className="absolute -bottom-4 right-4 lg:right-0 bg-glass backdrop-blur-2xl border border-glass-border rounded-xl px-4 py-3 font-mono text-[0.7rem] text-accent flex items-center gap-2 z-10">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_8px_rgba(0,255,136,0.5)]" />
              Founding Engineer @ Spirit AI
            </div>
          </div>
        </div>

        {/* Right - Content */}
        <div>
          <h2 className="sr font-heading font-extrabold leading-[1.05] tracking-tight mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)' }}>
            Building the future,<br />
            <GradientText>one system at a time.</GradientText>
          </h2>

          <div className="sr space-y-4 text-lg text-text-dim font-light leading-relaxed mb-10">
            {bio.split('\n').filter(Boolean).map((paragraph, i) => (
              <p key={i} dangerouslySetInnerHTML={{
                __html: paragraph
                  .replace(/BYJU'S/g, '<strong class="text-text-primary font-medium">BYJU\'S</strong>')
                  .replace(/Spirit AI/g, '<strong class="text-text-primary font-medium">Spirit AI</strong>')
                  .replace(/Master's in Software Engineering at UMBC/g, '<strong class="text-text-primary font-medium">Master\'s in Software Engineering at UMBC</strong>')
                  .replace(/founding engineer/gi, '<strong class="text-text-primary font-medium">founding engineer</strong>')
              }} />
            ))}
          </div>

          {/* Metrics */}
          <div className="sr grid grid-cols-2 gap-4 mb-10">
            {[
              { value: '100K+', label: 'Concurrent Users Served' },
              { value: '<200ms', label: 'API Response Time' },
              { value: '3.91', label: 'GPA @ UMBC' },
              { value: '20+', label: 'APIs Designed' },
            ].map((metric) => (
              <GlassCard key={metric.label} className="p-5">
                <div className="font-display text-4xl text-accent leading-none">
                  {metric.value}
                </div>
                <div className="text-[0.75rem] text-text-muted uppercase tracking-[0.12em] mt-1.5">
                  {metric.label}
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Timeline */}
          <div className="sr relative pl-8">
            {/* Gradient line */}
            <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-accent via-accent-violet to-transparent" />

            {experiences.map((exp, i) => (
              <div key={exp.id} className="relative pb-8 pl-6 last:pb-0">
                {/* Dot */}
                <div className="absolute -left-[1.56rem] top-1.5 w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_rgba(0,212,255,0.25)]" />

                <div className="font-mono text-[0.7rem] text-accent tracking-[0.15em] mb-1">
                  {exp.startDate} — {exp.endDate ?? 'Present'}
                </div>
                <div className="font-heading text-xl font-semibold mb-0.5">
                  {exp.role}
                </div>
                <div className="text-sm text-text-dim font-light">
                  {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}