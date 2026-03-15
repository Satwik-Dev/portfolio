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
  location: string | null
  github: string | null
  linkedin: string | null
  twitter: string | null
  
  // Hero Stats
  yearsExperience: string
  projectsDelivered: string
  clientSatisfaction: string
  
  // About Section
  avatarUrl: string | null
  aboutTitle: string
  aboutBadge: string
  metric1Value: string
  metric1Label: string
  metric2Value: string
  metric2Label: string
  metric3Value: string
  metric3Label: string
  metric4Value: string
  metric4Label: string
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
        setMessage('Profile saved successfully! ✓')
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
          <p className="text-sm text-text-dim">Update your personal information and hero stats</p>
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

      {/* Basic Info Section */}
      <div className="bg-glass border border-glass-border rounded-2xl p-8 backdrop-blur-xl mb-6">
        <h2 className="font-heading text-xl font-semibold text-text-primary mb-6 flex items-center gap-3">
          <span className="text-2xl">👤</span>
          Basic Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className={labelClass}>Full Name</label>
            <input
              value={profile.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Your full name"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClass}>Professional Title</label>
            <input
              value={profile.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Full Stack Engineer"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className={labelClass}>Hero Subtitle (Large Text Below Name)</label>
            <input
              value={profile.subtitle ?? ''}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              placeholder="FULL STACK ENGINEER"
              className={inputClass}
            />
            <p className="text-xs text-text-muted mt-1">This appears as the large text below your name on the hero section</p>
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className={labelClass}>Bio / Description</label>
            <textarea
              value={profile.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              rows={6}
              placeholder="Tell your story... This appears in the About section and can be used throughout the site."
              className={`${inputClass} resize-y`}
            />
          </div>
        </div>
      </div>

      {/* Hero Stats Section */}
      <div className="bg-glass border border-glass-border rounded-2xl p-8 backdrop-blur-xl mb-6">
        <h2 className="font-heading text-xl font-semibold text-text-primary mb-2 flex items-center gap-3">
          <span className="text-2xl">📊</span>
          Hero Statistics
        </h2>
        <p className="text-sm text-text-dim mb-6">These stats appear prominently on your hero section</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <label className={labelClass}>Years Experience</label>
            <input
              value={profile.yearsExperience}
              onChange={(e) => handleChange('yearsExperience', e.target.value)}
              placeholder="3+"
              className={inputClass}
            />
            <p className="text-xs text-text-muted mt-1">Examples: 3+, 5+, 10+</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClass}>Projects Delivered</label>
            <input
              value={profile.projectsDelivered}
              onChange={(e) => handleChange('projectsDelivered', e.target.value)}
              placeholder="10+"
              className={inputClass}
            />
            <p className="text-xs text-text-muted mt-1">Examples: 10+, 25+, 50+</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClass}>Client Satisfaction</label>
            <input
              value={profile.clientSatisfaction}
              onChange={(e) => handleChange('clientSatisfaction', e.target.value)}
              placeholder="99%"
              className={inputClass}
            />
            <p className="text-xs text-text-muted mt-1">Examples: 99%, 100%</p>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="bg-glass border border-glass-border rounded-2xl p-8 backdrop-blur-xl mb-6">
        <h2 className="font-heading text-xl font-semibold text-text-primary mb-6 flex items-center gap-3">
          <span className="text-2xl">📧</span>
          Contact Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              placeholder="+1 (234) 567-8900"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClass}>Location</label>
            <input
              value={profile.location ?? ''}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="San Francisco, CA"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Social Links Section */}
      <div className="bg-glass border border-glass-border rounded-2xl p-8 backdrop-blur-xl">
        <h2 className="font-heading text-xl font-semibold text-text-primary mb-6 flex items-center gap-3">
          <span className="text-2xl">🔗</span>
          Social Links
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className={labelClass}>LinkedIn URL</label>
            <input
              value={profile.linkedin ?? ''}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              placeholder="https://linkedin.com/in/yourprofile"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClass}>GitHub URL</label>
            <input
              value={profile.github ?? ''}
              onChange={(e) => handleChange('github', e.target.value)}
              placeholder="https://github.com/yourusername"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClass}>Twitter / X URL</label>
            <input
              value={profile.twitter ?? ''}
              onChange={(e) => handleChange('twitter', e.target.value)}
              placeholder="https://twitter.com/yourhandle"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-glass border border-glass-border rounded-2xl p-8 backdrop-blur-xl mb-6">
        <h2 className="font-heading text-xl font-semibold text-text-primary mb-2 flex items-center gap-3">
          <span className="text-2xl">🎨</span>
          About Section
        </h2>
        <p className="text-sm text-text-dim mb-6">Customize your About section content</p>
        
        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col gap-2">
            <label className={labelClass}>Profile Photo URL</label>
            <input
              value={profile.avatarUrl ?? ''}
              onChange={(e) => handleChange('avatarUrl', e.target.value)}
              placeholder="https://your-image-url.com/photo.jpg"
              className={inputClass}
            />
            <p className="text-xs text-text-muted mt-1">Upload your image to a service like Imgur or use a direct URL</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClass}>Section Title</label>
            <input
              value={profile.aboutTitle}
              onChange={(e) => handleChange('aboutTitle', e.target.value)}
              placeholder="Building the future, one system at a time."
              className={inputClass}
            />
            <p className="text-xs text-text-muted mt-1">Main heading in the About section</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClass}>Current Role Badge</label>
            <input
              value={profile.aboutBadge}
              onChange={(e) => handleChange('aboutBadge', e.target.value)}
              placeholder="Founding Engineer @ Spirit AI"
              className={inputClass}
            />
            <p className="text-xs text-text-muted mt-1">Shows below your profile photo</p>
          </div>

          {/* Metrics */}
          <div className="mt-4">
            <h3 className="font-mono text-sm font-semibold text-text-primary mb-4">About Metrics (4 Stats Cards)</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Metric 1 */}
              <div className="border border-glass-border rounded-xl p-4">
                <p className="text-xs text-accent mb-3 font-mono uppercase tracking-wider">Metric 1</p>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-text-muted uppercase tracking-wider">Value</label>
                    <input
                      value={profile.metric1Value}
                      onChange={(e) => handleChange('metric1Value', e.target.value)}
                      placeholder="100K+"
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-text-muted uppercase tracking-wider">Label</label>
                    <input
                      value={profile.metric1Label}
                      onChange={(e) => handleChange('metric1Label', e.target.value)}
                      placeholder="Concurrent Users Served"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="border border-glass-border rounded-xl p-4">
                <p className="text-xs text-accent mb-3 font-mono uppercase tracking-wider">Metric 2</p>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-text-muted uppercase tracking-wider">Value</label>
                    <input
                      value={profile.metric2Value}
                      onChange={(e) => handleChange('metric2Value', e.target.value)}
                      placeholder="<200ms"
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-text-muted uppercase tracking-wider">Label</label>
                    <input
                      value={profile.metric2Label}
                      onChange={(e) => handleChange('metric2Label', e.target.value)}
                      placeholder="API Response Time"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* Metric 3 */}
              <div className="border border-glass-border rounded-xl p-4">
                <p className="text-xs text-accent mb-3 font-mono uppercase tracking-wider">Metric 3</p>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-text-muted uppercase tracking-wider">Value</label>
                    <input
                      value={profile.metric3Value}
                      onChange={(e) => handleChange('metric3Value', e.target.value)}
                      placeholder="3.91"
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-text-muted uppercase tracking-wider">Label</label>
                    <input
                      value={profile.metric3Label}
                      onChange={(e) => handleChange('metric3Label', e.target.value)}
                      placeholder="GPA @ UMBC"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* Metric 4 */}
              <div className="border border-glass-border rounded-xl p-4">
                <p className="text-xs text-accent mb-3 font-mono uppercase tracking-wider">Metric 4</p>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-text-muted uppercase tracking-wider">Value</label>
                    <input
                      value={profile.metric4Value}
                      onChange={(e) => handleChange('metric4Value', e.target.value)}
                      placeholder="20+"
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-text-muted uppercase tracking-wider">Label</label>
                    <input
                      value={profile.metric4Label}
                      onChange={(e) => handleChange('metric4Label', e.target.value)}
                      placeholder="APIs Designed"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}