'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface NavbarProps {
  name: string
}

const navLinks = [
  { label: 'About', href: '#about' },
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
            ? 'py-3 bg-bg-primary/85 backdrop-blur-[30px] border-b border-glass-border'
            : 'py-5 bg-transparent'
        }`}
      >
        <a
          href="#"
          className="font-heading text-xl font-bold text-text-primary no-underline relative"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          {name}
          <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-gradient-to-r from-accent to-accent-violet" />
        </a>

        <ul className="hidden md:flex items-center gap-10 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleClick(link.href)
                }}
                className="text-xs font-normal text-text-dim tracking-[0.12em] uppercase no-underline transition-colors duration-300 hover:text-accent"
              >
                {link.label}
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
              className="px-6 py-2.5 bg-gradient-to-r from-accent to-accent-violet text-bg-primary rounded-full text-xs font-semibold tracking-[0.1em] uppercase no-underline transition-all duration-400 shadow-[0_0_25px_rgba(0,212,255,0.25)] hover:scale-105 hover:shadow-[0_0_45px_rgba(0,212,255,0.35)]"
            >
              Let&apos;s Talk
            </a>
          </li>
        </ul>

        <button
          className="md:hidden flex flex-col gap-1.5 bg-transparent border-none p-1 cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-[1.5px] bg-text-primary transition-all duration-300 ${
              mobileOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-text-primary transition-all duration-300 ${
              mobileOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-text-primary transition-all duration-300 ${
              mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[8999] bg-bg-primary/97 backdrop-blur-[40px] flex flex-col items-center justify-center gap-10"
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
                className="font-heading text-4xl font-semibold text-text-dim no-underline transition-colors duration-300 hover:text-accent"
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
              className="font-heading text-4xl font-semibold text-accent no-underline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Contact
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}