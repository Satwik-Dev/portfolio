'use client'

import { useEffect, useState } from 'react'

interface Stats {
  experiences: number
  projects: number
  skills: number
  competencies: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then(setStats)
      .catch(console.error)
  }, [])

  const cards = [
    { label: 'Experiences', value: stats?.experiences ?? '—', icon: '💼', href: '/admin/experience' },
    { label: 'Projects', value: stats?.projects ?? '—', icon: '🚀', href: '/admin/projects' },
    { label: 'Skills', value: stats?.skills ?? '—', icon: '⚡', href: '/admin/skills' },
    { label: 'Competencies', value: stats?.competencies ?? '—', icon: '🧠', href: '/admin/competencies' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-text-primary mb-2">Dashboard</h1>
        <p className="text-sm text-text-dim">Manage your portfolio content</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <a
            key={card.label}
            href={card.href}
            className="bg-glass border border-glass-border rounded-2xl p-6 no-underline transition-all duration-300 hover:border-glass-border-hover hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)]"
          >
            <div className="text-3xl mb-3">{card.icon}</div>
            <div className="font-display text-4xl text-accent mb-1">{card.value}</div>
            <div className="text-sm text-text-dim">{card.label}</div>
          </a>
        ))}
      </div>

      <div className="mt-10 bg-glass border border-glass-border rounded-2xl p-6">
        <h2 className="font-heading text-xl font-semibold text-text-primary mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Edit Profile', href: '/admin/profile' },
            { label: 'Add Experience', href: '/admin/experience' },
            { label: 'Add Project', href: '/admin/projects' },
            { label: 'Manage Skills', href: '/admin/skills' },
          ].map((action) => (
            <a
              key={action.label}
              href={action.href}
              className="px-5 py-2.5 bg-accent/[0.06] border border-accent/10 rounded-xl text-sm text-accent font-medium no-underline transition-all duration-200 hover:bg-accent/10 hover:border-accent/20"
            >
              {action.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}