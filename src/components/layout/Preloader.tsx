'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 15 + 5
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(() => setDone(true), 400)
          return 100
        }
        return next
      })
    }, 150)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100000] bg-bg-primary flex flex-col items-center justify-center"
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="font-mono text-xs text-accent tracking-[0.3em] uppercase mb-8">
            Initializing Neural Interface
          </div>

          <div className="w-52 h-0.5 bg-text-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent rounded-full shadow-[0_0_15px_rgba(0,212,255,0.25)]"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <div className="font-display text-6xl text-text-primary mt-4 tracking-wider">
            {Math.round(progress)}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}