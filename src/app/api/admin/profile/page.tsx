'use client'

import { useEffect, useState } from 'react'

interface ProfileData {
  id: string
  name: string
  title: string
  subtitle: string | null
  bio: string
  email: string
  phone: string | null
  linkedin: string | null
  github: string | null
  twitter: string | null
  location: string | null
  avatarUrl: string | null
  resumeUrl: string | null
}

export default function AdminProfile() {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/admin/profile')
      .then((res) => res.json())
      .then(setProfile)
      .catch(console.error)
  }, [])

  const handleChange = (field: keyof ProfileData, value: string) => {
    if (!profile) return
    setProfile({ ...profile, [field]: value })
  }

  const handleSave = async () => {
    if (!profile) return
    setSaving(true)
    setMessage('')

    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      })

      if (res.ok) {
        setMessage('Profile saved successfully!')
      } else {
        setMessage('Failed to save profile')
      }
    } catch {
      setMessage('Failed to save profile')
    }

    setSaving(false)
    setTimeout(() => setMessage(''), 3000)
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="font-mono text-sm text-accent animate-pulse">Loading profile...</div>
      </div>
    )
  }

  const inputClass = "w-full bg-bg-elevated border border-glass-border rounded-xl px-4 py-3 font-body text-sm text-text-primary outline-none transition-all duration-300 placeholder:text-text-muted focus:border-accent focus:shadow-[0_0_0_3px_rgba(0,212,255,0.08)]"
  const labelClass = "font-mono text-[0.68rem] font-medium text-text-muted uppercase tracking-[0.15em]"

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-text-primary mb-2">Edit Profile</h1>
          <p className="text-sm text-text-dim">Update your personal information</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 bg-gradient-to-r from-accent to-accent-violet text-bg-primary font-semibold text-sm rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,255,0.25)] disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {message && (
        <div className={`mb-6 px-4 py-3 rounded-xl text-sm text-center ${
          message.includes('success')
            ? 'bg-green-500/10 border border-green-500/20 text-green-400'
            : 'bg-accent-red/10 border border-accent-red/20 text-accent-red'
        }`}>
          {message}
        </div>
      )}

      <div className="bg-glass border border-glass-border rounded-2xl p-8 backdrop-blur-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className={labelClass}>Full Name</label>
            <input
              value={profile.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Your name"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClass}>Title</label>
            <input
              value={profile.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="AI Full Stack Engineer"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClass}>Subtitle (Hero Section)</label>
            <input
              value={profile.subtitle ?? ''}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              placeholder="AI FULL STACK ENGINEER"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClass}>Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="your@email.com"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClass}>Phone</label>
            <input
              value={profile.phone ?? ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="1234567890"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClass}>Location</label>
            <input
              value={profile.location ?? ''}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="New York City"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClass}>LinkedIn URL</label>
            <input
              value={profile.linkedin ?? ''}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              placeholder="https://linkedin.com/in/..."
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClass}>GitHub URL</label>
            <input
              value={profile.github ?? ''}
              onChange={(e) => handleChange('github', e.target.value)}
              placeholder="https://github.com/..."
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClass}>Twitter URL</label>
            <input
              value={profile.twitter ?? ''}
              onChange={(e) => handleChange('twitter', e.target.value)}
              placeholder="https://twitter.com/..."
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClass}>Avatar URL</label>
            <input
              value={profile.avatarUrl ?? ''}
              onChange={(e) => handleChange('avatarUrl', e.target.value)}
              placeholder="https://..."
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-6">
          <label className={labelClass}>Bio</label>
          <textarea
            value={profile.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
            rows={8}
            placeholder="Tell your story..."
            className={`${inputClass} resize-y`}
          />
        </div>
      </div>
    </div>
  )
}