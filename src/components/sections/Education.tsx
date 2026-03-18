'use client'

import SectionWrapper from '@/components/ui/SectionWrapper'
import GlassCard from '@/components/ui/GlassCard'
import GradientText from '@/components/ui/GradientText'

interface Education {
  id: string
  school: string
  degree: string
  field: string
  gpa: string | null
  startDate: string
  endDate: string | null
  description: string | null
  coursework: string[]
  current: boolean
  order: number
}

interface EducationProps {
  education: Education[]
}

export default function Education({ education }: EducationProps) {
  if (!education || education.length === 0) return null

  return (
    <SectionWrapper id="education">
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="sr flex items-center gap-4 font-mono text-[0.68rem] text-accent tracking-[0.3em] uppercase mb-4 justify-center">
            <span className="w-8 h-px bg-accent" />
            Education
          </div>
          <h2
            className="sr font-heading font-extrabold leading-[1.05] tracking-tight"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 212, 255, 0.2)',
            }}
          >
            Academic<br />
            <GradientText>Foundation.</GradientText>
          </h2>
        </div>

        {/* Education cards */}
        <div className="flex flex-col gap-8">
          {education.map((edu) => (
            <div key={edu.id} className="sr">
              <GlassCard className="p-8 md:p-10 relative overflow-hidden group">
                {/* Accent top border */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent via-accent-violet to-transparent" />

                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-start">
                  {/* Left — main info */}
                  <div>
                    {/* Date range */}
                    <div className="font-mono text-[0.7rem] text-accent tracking-[0.15em] mb-3">
                      {edu.startDate} — {edu.endDate ?? 'Present'}
                      {edu.current && (
                        <span className="ml-2 px-2 py-0.5 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full text-[0.6rem]">
                          Current
                        </span>
                      )}
                    </div>

                    {/* Degree + Field */}
                    <h3
                      className="font-heading text-2xl md:text-3xl font-bold mb-1"
                      style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)' }}
                    >
                      {edu.degree}
                      <span className="text-text-primary/60 font-normal"> in </span>
                      <span className="bg-gradient-to-r from-accent to-accent-violet bg-clip-text text-transparent">
                        {edu.field}
                      </span>
                    </h3>

                    {/* School */}
                    <div className="flex items-center gap-2 text-lg text-text-primary/75 font-light mt-1">
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-accent/50">
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path d="M12 14l9-5-9-5-9 5 9 5zM12 14v7m0 0l-3 3m3-3l3 3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {edu.school}
                    </div>

                    {/* Description */}
                    {edu.description && (
                      <p
                        className="text-base text-text-primary/70 font-light leading-relaxed mt-4 max-w-2xl"
                        style={{ textShadow: '0 1px 6px rgba(0, 0, 0, 0.3)' }}
                      >
                        {edu.description}
                      </p>
                    )}

                    {/* Coursework / Highlights */}
                    {edu.coursework && edu.coursework.length > 0 && (
                      <div className="mt-5">
                        <div className="font-mono text-[0.6rem] text-text-muted uppercase tracking-[0.2em] mb-2.5">
                          Key Coursework & Highlights
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {edu.coursework.map((course) => (
                            <span
                              key={course}
                              className="px-3 py-1.5 bg-accent/[0.05] border border-accent/15 rounded-lg text-xs text-accent/80 font-mono transition-all duration-300 hover:bg-accent/10 hover:border-accent/25"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right — GPA badge */}
                  {edu.gpa && (
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-accent/10 to-accent-violet/10 border border-accent/20 flex flex-col items-center justify-center transition-all duration-500 group-hover:border-accent/40 group-hover:shadow-[0_0_30px_rgba(0,212,255,0.15)]">
                          <div
                            className="font-display text-3xl md:text-4xl font-bold text-accent leading-none"
                            style={{ textShadow: '0 0 20px rgba(0, 212, 255, 0.5)' }}
                          >
                            {edu.gpa.split('/')[0]?.trim() ?? edu.gpa}
                          </div>
                          <div className="font-mono text-[0.55rem] text-text-muted uppercase tracking-wider mt-1">
                            GPA
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}