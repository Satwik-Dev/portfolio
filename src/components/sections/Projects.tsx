'use client'

import SectionWrapper from '@/components/ui/SectionWrapper'
import GlassCard from '@/components/ui/GlassCard'
import GradientText from '@/components/ui/GradientText'

interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  imageUrl: string | null
  liveUrl: string | null
  githubUrl: string | null
  stats: Record<string, string> | null
  featured: boolean
  sortOrder: number
}

interface ProjectsProps {
  projects: Project[]
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <SectionWrapper id="projects">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-[700px] mx-auto mb-16">
          <div className="sr flex items-center gap-4 font-mono text-[0.68rem] text-accent tracking-[0.3em] uppercase mb-4 justify-center">
            <span className="w-8 h-px bg-accent" />
            Selected Work
          </div>
          <h2
            className="sr font-heading font-extrabold leading-[1.05] tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)' }}
          >
            Projects that<br />
            <GradientText>push boundaries.</GradientText>
          </h2>
        </div>

        {/* Project Cards */}
        <div className="flex flex-col gap-10">
          {projects.map((project, index) => (
            <div key={project.id} className="sr">
              <GlassCard className="p-0 overflow-hidden">
                <div className={`grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-0 ${
                  index % 2 !== 0 ? 'lg:[direction:rtl]' : ''
                }`}>
                  {/* Visual */}
                  <div className={`relative w-full aspect-video lg:aspect-auto lg:min-h-[360px] bg-gradient-to-br from-bg-elevated to-[#0f1729] overflow-hidden ${
                    index % 2 !== 0 ? 'lg:[direction:ltr]' : ''
                  }`}>
                    {/* Grid pattern */}
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: 'linear-gradient(rgba(0,212,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.05) 1px, transparent 1px)',
                        backgroundSize: '25px 25px',
                      }}
                    />
                    {/* Project name watermark */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-3xl text-accent/10 tracking-[0.2em] whitespace-nowrap uppercase">
                      {project.title.split('—')[0].trim()}
                    </div>
                    {/* Project image if available */}
                    {project.imageUrl && (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`p-8 lg:p-10 flex flex-col justify-center ${
                    index % 2 !== 0 ? 'lg:[direction:ltr]' : ''
                  }`}>
                    <div className="font-display text-6xl text-accent/8 leading-none mb-3">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[0.62rem] text-accent bg-accent/[0.06] px-3 py-1.5 rounded border border-accent/10 tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-2xl font-bold tracking-tight mb-3">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-text-dim font-light leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Stats */}
                    {project.stats && (
                      <div className="flex flex-wrap gap-6">
                        {Object.entries(project.stats as Record<string, string>).map(([label, value]) => (
                          <div key={label} className="flex flex-col">
                            <span className="font-display text-xl text-accent">
                              {value}
                            </span>
                            <span className="text-[0.65rem] text-text-muted uppercase tracking-[0.1em]">
                              {label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Links */}
                    {(project.liveUrl || project.githubUrl) && (
                      <div className="flex gap-4 mt-6">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs font-semibold text-accent hover:text-text-primary transition-colors duration-300"
                          >
                            View Live
                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path d="M7 17L17 7M17 7H7M17 7v10" />
                            </svg>
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs font-semibold text-text-dim hover:text-text-primary transition-colors duration-300"
                          >
                            Source Code
                            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .1-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.14 3 .4c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}