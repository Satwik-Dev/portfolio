'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface NavbarProps {
  name: string
}

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Work', href: '#projects' },
  { label: 'Skills', href: '#skills' },
]

export default function Navbar({ name }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[9000] px-8 flex justify-between items-center transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-bg-primary/95 backdrop-blur-[30px] border-b border-glass-border shadow-lg'
            : 'py-6 bg-transparent'
        }`}
      >
        <a
          href="#"
          className="font-heading text-2xl font-bold text-text-primary no-underline relative drop-shadow-[0_2px_8px_rgba(0,212,255,0.3)]"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          {name}
          <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-gradient-to-r from-accent to-accent-violet shadow-[0_0_10px_rgba(0,212,255,0.5)]" />
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-12 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleClick(link.href)
                }}
                className="text-sm font-medium text-text-primary/90 tracking-[0.12em] uppercase no-underline transition-all duration-300 hover:text-accent hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.6)] relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(0,212,255,0.8)]" />
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                handleClick('#contact')
              }}
              className="px-7 py-3 bg-gradient-to-r from-accent to-accent-violet text-bg-primary font-semibold rounded-full text-sm tracking-[0.1em] uppercase no-underline transition-all duration-400 shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:scale-105 hover:shadow-[0_0_50px_rgba(0,212,255,0.6)]"
            >
              Let&apos;s Talk
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 bg-transparent border-none p-1 cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-7 h-[2px] bg-text-primary transition-all duration-300 shadow-[0_0_4px_rgba(0,212,255,0.5)] ${
              mobileOpen ? 'rotate-45 translate-y-[8px]' : ''
            }`}
          />
          <span
            className={`block w-7 h-[2px] bg-text-primary transition-all duration-300 shadow-[0_0_4px_rgba(0,212,255,0.5)] ${
              mobileOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-7 h-[2px] bg-text-primary transition-all duration-300 shadow-[0_0_4px_rgba(0,212,255,0.5)] ${
              mobileOpen ? '-rotate-45 -translate-y-[8px]' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[8999] bg-bg-primary/98 backdrop-blur-[40px] flex flex-col items-center justify-center gap-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleClick(link.href)
                }}
                className="font-heading text-5xl font-semibold text-text-primary no-underline transition-all duration-300 hover:text-accent hover:drop-shadow-[0_0_15px_rgba(0,212,255,0.8)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                handleClick('#contact')
              }}
              className="font-heading text-5xl font-semibold text-accent no-underline drop-shadow-[0_0_15px_rgba(0,212,255,0.8)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Contact
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}