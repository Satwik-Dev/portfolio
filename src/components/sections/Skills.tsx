'use client'

import SectionWrapper from '@/components/ui/SectionWrapper'
import GlassCard from '@/components/ui/GlassCard'
import GradientText from '@/components/ui/GradientText'

interface Skill {
  id: string
  name: string
  icon: string | null
  subText: string | null
  category: string
  sortOrder: number
}

interface Competency {
  id: string
  title: string
  items: string[]
  sortOrder: number
}

interface SkillsProps {
  skills: Skill[]
  competencies: Competency[]
}

export default function Skills({ skills, competencies }: SkillsProps) {
  return (
    <SectionWrapper id="skills">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
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

        {/* Skills Grid */}
        <div className="sr grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {skills.map((skill) => (
            <GlassCard key={skill.id} className="p-6 text-center group relative">
              {/* Bottom border reveal */}
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-accent to-accent-violet scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

              <span className="text-3xl block mb-3">
                {skill.icon ?? '⚡'}
              </span>
              <div className="text-sm font-medium text-text-primary mb-1">
                {skill.name}
              </div>
              <div className="font-mono text-[0.68rem] text-text-muted">
                {skill.subText}
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Core Competencies */}
        <div className="sr grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {competencies.map((comp) => (
            <GlassCard key={comp.id} className="p-7">
              <h3 className="font-heading text-lg font-semibold text-text-primary mb-4">
                {comp.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {comp.items.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-[0.65rem] text-text-dim px-2.5 py-1.5 bg-accent/[0.04] border border-accent/[0.06] rounded"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}