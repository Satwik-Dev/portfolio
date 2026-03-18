'use client'

import SectionWrapper from '@/components/ui/SectionWrapper'
import GlassCard from '@/components/ui/GlassCard'
import GradientText from '@/components/ui/GradientText'
import Image from 'next/image'
import { useState } from 'react'

interface Project {
  id: string
  title: string
  description: string
  category: string
  tags: string[]
  imageUrl: string | null
  demoUrl: string | null
  githubUrl: string | null
  stats: Record<string, string> | null
  featured: boolean
  order: number
}

interface ProjectsProps {
  projects: Project[]
}

export default function Projects({ projects }: ProjectsProps) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  return (
    <SectionWrapper id="projects">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-[800px] mx-auto mb-20 sr">
          <div className="flex items-center gap-4 font-mono text-[0.7rem] text-accent tracking-[0.25em] uppercase mb-6 justify-center opacity-0 animate-[fadeSlideUp_1s_0.3s_forwards]">
            <span className="w-12 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
            <span className="relative">
              Selected Work
              <span className="absolute -inset-2 bg-accent/10 blur-xl -z-10" />
            </span>
            <span className="w-12 h-px bg-gradient-to-r from-accent via-transparent to-transparent" />
          </div>
          
          <h2
            className="font-heading font-extrabold leading-[1.05] tracking-tight mb-6 opacity-0 animate-[fadeSlideUp_1s_0.5s_forwards]"
            style={{ 
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 212, 255, 0.2)'
            }}
          >
            Projects that<br />
            <GradientText>push boundaries.</GradientText>
          </h2>
          
          <p 
            className="text-xl font-light text-text-primary/75 leading-relaxed opacity-0 animate-[fadeSlideUp_1s_0.7s_forwards]"
            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}
          >
            A showcase of production-grade applications that blend cutting-edge technology with exceptional user experience.
          </p>
        </div>

        {/* Project Cards */}
        <div className="flex flex-col gap-12">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="sr opacity-0 animate-[fadeSlideUp_1s_forwards]"
              style={{ animationDelay: `${0.9 + index * 0.15}s` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <GlassCard className="p-0 overflow-hidden group relative">
                {/* Hover glow effect */}
                <div className={`absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ${
                  hoveredProject === project.id ? 'opacity-100' : ''
                }`} />
                
                <div className={`grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-0 ${
                  index % 2 !== 0 ? 'lg:grid-cols-[1fr_1fr] lg:[direction:rtl]' : ''
                }`}>
                  {/* Visual Side */}
                  <div className={`relative w-full aspect-[16/10] lg:aspect-auto lg:min-h-[500px] overflow-hidden ${
                    index % 2 !== 0 ? 'lg:[direction:ltr]' : ''
                  }`}>
                    {/* Background layers */}
                    <div className="absolute inset-0 bg-gradient-to-br from-bg-elevated via-[#0a1018] to-[#0f1729]" />
                    
                    {/* Animated grid */}
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage: 'linear-gradient(rgba(0,212,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.08) 1px, transparent 1px)',
                        backgroundSize: '30px 30px',
                        backgroundPosition: hoveredProject === project.id ? '15px 15px' : '0 0',
                        transition: 'background-position 0.7s ease',
                      }}
                    />
                    
                    {/* Gradient orbs */}
                    <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-accent/8 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: `${index * 0.5}s` }} />
                    <div className="absolute bottom-1/4 left-1/4 w-[250px] h-[250px] bg-accent-violet/8 rounded-full blur-[90px] animate-pulse" style={{ animationDelay: `${index * 0.5 + 1}s` }} />
                    
                    {/* Project image if available */}
                    {project.imageUrl && (
                      <div className="absolute inset-0">
                        {/* Color integration overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/12 via-transparent to-accent-violet/12 mix-blend-overlay z-10 pointer-events-none" />
                        
                        {/* Edge fades */}
                        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-bg-elevated to-transparent z-10 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-elevated via-bg-elevated/60 to-transparent z-10 pointer-events-none" />
                        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-bg-elevated to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-bg-elevated to-transparent z-10 pointer-events-none" />
                        
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover mix-blend-lighten opacity-70 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700"
                          quality={90}
                        />
                        
                        {/* Scan line */}
                        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden opacity-20">
                          <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent animate-[scanLine_8s_ease-in-out_infinite]" />
                        </div>
                      </div>
                    )}
                    
                    {/* Fallback: Project number watermark */}
                    {!project.imageUrl && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="font-display text-[12rem] font-black bg-gradient-to-br from-accent/10 to-accent-violet/10 bg-clip-text text-transparent select-none tracking-wider">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                      </div>
                    )}
                    
                    {/* Corner tech brackets */}
                    <div className="absolute top-6 left-6 w-20 h-20 border-l-2 border-t-2 border-accent/40 pointer-events-none z-30 transition-all duration-500 group-hover:scale-110 group-hover:border-accent/60 shadow-[0_0_10px_rgba(0,212,255,0.2)]" />
                    <div className="absolute top-6 right-6 w-20 h-20 border-r-2 border-t-2 border-accent/40 pointer-events-none z-30 transition-all duration-500 group-hover:scale-110 group-hover:border-accent/60 shadow-[0_0_10px_rgba(0,212,255,0.2)]" />
                    <div className="absolute bottom-6 left-6 w-20 h-20 border-l-2 border-b-2 border-accent-violet/40 pointer-events-none z-30 transition-all duration-500 group-hover:scale-110 group-hover:border-accent-violet/60 shadow-[0_0_10px_rgba(123,97,255,0.2)]" />
                    <div className="absolute bottom-6 right-6 w-20 h-20 border-r-2 border-b-2 border-accent-violet/40 pointer-events-none z-30 transition-all duration-500 group-hover:scale-110 group-hover:border-accent-violet/60 shadow-[0_0_10px_rgba(123,97,255,0.2)]" />
                  </div>

                  {/* Content Side */}
                  <div className={`p-10 lg:p-12 flex flex-col justify-center relative ${
                    index % 2 !== 0 ? 'lg:[direction:ltr]' : ''
                  }`}>
                    {/* Project number badge */}
                    <div className="absolute top-8 right-8 lg:top-12 lg:right-12">
                      <div className="font-display text-7xl text-accent/10 leading-none select-none">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>

                    {/* Category badge */}
                    <div className="inline-flex items-center gap-2 w-fit mb-6">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_8px_rgba(0,212,255,0.6)]" />
                      <span className="font-mono text-[0.65rem] text-accent tracking-[0.2em] uppercase font-semibold">
                        {project.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 
                      className="font-heading text-4xl font-bold tracking-tight mb-4 group-hover:text-accent transition-colors duration-300" 
                      style={{ textShadow: '0 2px 12px rgba(0, 0, 0, 0.5)' }}
                    >
                      {project.title}
                    </h3>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tags.slice(0, 6).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[0.65rem] text-text-primary/70 bg-accent/[0.06] px-3 py-1.5 rounded-md border border-accent/10 tracking-wide hover:border-accent/30 hover:bg-accent/10 transition-all duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p 
                      className="text-lg text-text-primary/75 font-light leading-relaxed mb-8" 
                      style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)' }}
                    >
                      {project.description}
                    </p>

                    {/* Stats */}
                    {project.stats && Object.keys(project.stats).length > 0 && (
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        {Object.entries(project.stats as Record<string, string>).map(([label, value]) => (
                          <div key={label} className="flex flex-col">
                            <span 
                              className="font-display text-3xl text-accent leading-none mb-1"
                              style={{ textShadow: '0 0 20px rgba(0, 212, 255, 0.5), 0 4px 10px rgba(0, 0, 0, 0.5)' }}
                            >
                              {value}
                            </span>
                            <span className="text-[0.7rem] text-text-primary/65 uppercase tracking-wider font-medium">
                              {label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action Links */}
                    <div className="flex gap-4 flex-wrap">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-accent/10 hover:bg-accent/20 border border-accent/30 hover:border-accent/60 rounded-lg text-sm font-semibold text-accent transition-all duration-300 group/btn shadow-[0_0_20px_rgba(0,212,255,0.2)] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
                        >
                          View Live
                          <svg 
                            width="16" 
                            height="16" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2.5" 
                            viewBox="0 0 24 24"
                            className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300"
                          >
                            <path d="M7 17L17 7M17 7H7M17 7v10" />
                          </svg>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-glass hover:bg-glass/80 border border-glass-border hover:border-glass-border-hover rounded-lg text-sm font-semibold text-text-primary/80 hover:text-text-primary transition-all duration-300 group/btn"
                        >
                          <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .1-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.14 3 .4c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                          </svg>
                          Source Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="sr mt-24 text-center opacity-0 animate-[fadeSlideUp_1s_forwards]" style={{ animationDelay: `${1.5 + projects.length * 0.15}s` }}>
          <div className="inline-flex flex-col items-center gap-6 p-12 bg-glass backdrop-blur-2xl border border-glass-border rounded-2xl relative overflow-hidden group">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10">
              <h3 className="font-heading text-3xl font-bold mb-3">
                Have a project in mind?
              </h3>
              <p className="text-text-primary/70 mb-6 max-w-md">
                Let&apos;s collaborate and build something exceptional together.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent/90 text-bg-primary rounded-lg font-semibold transition-all duration-300 shadow-[0_0_30px_rgba(0,212,255,0.3)] hover:shadow-[0_0_40px_rgba(0,212,255,0.5)] hover:scale-105"
              >
                Get in Touch
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}