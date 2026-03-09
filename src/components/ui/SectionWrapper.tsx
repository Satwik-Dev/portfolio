'use client'

import { useRef, useEffect } from 'react'

interface SectionWrapperProps {
  children: React.ReactNode
  id: string
  className?: string
  eyebrow?: string
}

export default function SectionWrapper({ children, id, className = '', eyebrow }: SectionWrapperProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.sr').forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('sr-visible')
              }, i * 100)
            })
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id={id} className={`relative py-32 px-[6vw] ${className}`}>
      {eyebrow && (
        <div className="sr flex items-center gap-4 font-mono text-[0.68rem] text-accent tracking-[0.3em] uppercase mb-4">
          <span className="w-8 h-px bg-accent" />
          {eyebrow}
        </div>
      )}
      {children}
    </section>
  )
}