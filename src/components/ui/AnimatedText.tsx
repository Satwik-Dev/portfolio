'use client'

import { useEffect, useRef } from 'react'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
}

export default function AnimatedText({ text, className = '', delay = 0 }: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const spans = entry.target.querySelectorAll('.char')
            spans.forEach((span, i) => {
              setTimeout(() => {
                (span as HTMLElement).style.opacity = '1'
                ;(span as HTMLElement).style.transform = 'translateY(0)'
              }, delay + i * 30)
            })
          }
        })
      },
      { threshold: 0.5 }
    )

    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={containerRef} className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="char inline-block transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
          style={{ opacity: 0, transform: 'translateY(40px)' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  )
}