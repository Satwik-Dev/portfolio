'use client'

import { useEffect, useRef } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    if (isMobile) return

    let cx = 0, cy = 0, rx = 0, ry = 0

    const handleMouseMove = (e: MouseEvent) => {
      cx = e.clientX
      cy = e.clientY
    }

    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${cx - 6}px`
        cursorRef.current.style.top = `${cy - 6}px`
      }
      rx += (cx - rx) * 0.12
      ry += (cy - ry) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = `${rx - 20}px`
        ringRef.current.style.top = `${ry - 20}px`
      }
      requestAnimationFrame(animate)
    }

    const handleMouseEnter = () => {
      ringRef.current?.classList.add('hovering')
    }

    const handleMouseLeave = () => {
      ringRef.current?.classList.remove('hovering')
    }

    window.addEventListener('mousemove', handleMouseMove)
    const animId = requestAnimationFrame(animate)

    const interactiveEls = document.querySelectorAll('a, button, input, textarea, [data-hover]')
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animId)
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-3 h-3 rounded-full bg-accent pointer-events-none z-[99999] mix-blend-difference"
      />
      <div
        ref={ringRef}
        className="fixed w-10 h-10 rounded-full border border-accent/40 pointer-events-none z-[99998]
                   transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
                   [&.hovering]:w-16 [&.hovering]:h-16 [&.hovering]:border-accent [&.hovering]:bg-accent/5"
        style={{ marginLeft: '0px', marginTop: '0px' }}
      />
    </>
  )
}