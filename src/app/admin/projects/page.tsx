'use client'

import { useEffect, useState } from 'react'

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

interface ProjectForm {
  title: string
  description: string
  category: string
  tagsInput: string
  imageUrl: string
  demoUrl: string
  githubUrl: string
  statsInput: string
  featured: boolean
}

const emptyForm: ProjectForm = {
  title: '',
  description: '',
  category: 'Web Application',
  tagsInput: '',
  imageUrl: '',
  demoUrl: '',
  githubUrl: '',
  statsInput: '',
  featured: false,
}

const CATEGORIES = [
  'Web Application',
  'Mobile App',
  'Full Stack',
  'Backend API',
  'Frontend',
  'AI/ML',
  'DevOps',
  'SaaS Platform',
  'E-Commerce',
  'Dashboard',
  'Other'
]

function parseStats(input: string): Record<string, string> | null {
  if (!input.trim()) return null
  try {
    return JSON.parse(input)
  } catch {
    const stats: Record<string, string> = {}
    input.split(',').forEach((pair) => {
      const [key, value] = pair.split(':').map((s) => s.trim())
      if (key && value) stats[key] = value
    })
    return Object.keys(stats).length > 0 ? stats : null
  }
}

function statsToString(stats: Record<string, string> | null): string {
  if (!stats) return ''
  return Object.entries(stats)
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ')
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [form, setForm] = useState<ProjectForm>(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const fetchData = () => {
    fetch('/api/admin/projects')
      .then((res) => res.json())
      .then(setProjects)
      .catch(console.error)
  }

  useEffect(() => { fetchData() }, [])

  const showMessage = (msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleChange = (field: keyof ProjectForm, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleAdd = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(true)
  }

  const handleEdit = (proj: Project) => {
    setForm({
      title: proj.title,
      description: proj.description,
      category: proj.category,
      tagsInput: proj.tags.join(', '),
      imageUrl: proj.imageUrl ?? '',
      demoUrl: proj.demoUrl ?? '',
      githubUrl: proj.githubUrl ?? '',
      statsInput: statsToString(proj.stats),
      featured: proj.featured,
    })
    setEditingId(proj.id)
    setShowForm(true)
  }

  const handleCancel = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(false)
  }

  const handleSave = async () => {
    if (!form.title || !form.description) {
      showMessage('Title and description are required')
      return
    }

    setSaving(true)

    const payload = {
      id: editingId,
      title: form.title,
      description: form.description,
      category: form.category,
      tags: form.tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
      imageUrl: form.imageUrl || null,
      demoUrl: form.demoUrl || null,
      githubUrl: form.githubUrl || null,
      stats: parseStats(form.statsInput),
      featured: form.featured,
    }

    try {
      const res = await fetch('/api/admin/projects', {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        showMessage(editingId ? 'Project updated!' : 'Project added!')
        handleCancel()
        fetchData()
      } else {
        showMessage('Failed to save')
      }
    } catch {
      showMessage('Failed to save')
    }

    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        showMessage('Project deleted')
        fetchData()
      }
    } catch {
      showMessage('Failed to delete')
    }
  }

  const handleReorder = async (id: string, direction: 'up' | 'down') => {
    const index = projects.findIndex(p => p.id === id)
    if (index === -1) return
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === projects.length - 1) return

    const newProjects = [...projects]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    ;[newProjects[index], newProjects[targetIndex]] = [newProjects[targetIndex], newProjects[index]]

    // Update order in database
    const updatePromises = newProjects.map((proj, idx) => 
      fetch('/api/admin/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: proj.id, order: idx }),
      })
    )

    try {
      await Promise.all(updatePromises)
      fetchData()
      showMessage('Order updated')
    } catch {
      showMessage('Failed to reorder')
    }
  }

  const inputClass = "w-full bg-bg-elevated border border-glass-border rounded-xl px-4 py-3 font-body text-sm text-text-primary outline-none transition-all duration-300 placeholder:text-text-muted focus:border-accent focus:shadow-[0_0_0_3px_rgba(0,212,255,0.08)]"
  const labelClass = "font-mono text-[0.68rem] font-medium text-text-muted uppercase tracking-[0.15em] mb-2 block"

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-text-primary mb-2">Projects</h1>
          <p className="text-sm text-text-dim">Manage your portfolio projects — drag to reorder</p>
        </div>
        {!showForm && (
          <button
            onClick={handleAdd}
            className="px-6 py-3 bg-gradient-to-r from-accent to-accent-violet text-bg-primary font-semibold text-sm rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,255,0.25)] hover:scale-105"
          >
            + Add Project
          </button>
        )}
      </div>

      {message && (
        <div className={`mb-6 px-4 py-3 rounded-xl text-sm text-center ${
          message.includes('delete') || message.includes('Failed')
            ? 'bg-accent-red/10 border border-accent-red/20 text-accent-red'
            : 'bg-green-500/10 border border-green-500/20 text-green-400'
        }`}>
          {message}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-glass border border-glass-border rounded-2xl p-8 backdrop-blur-xl mb-8">
          <h2 className="font-heading text-xl font-semibold text-text-primary mb-6">
            {editingId ? '✏️ Edit Project' : '✨ Add New Project'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label className={labelClass}>Project Title *</label>
              <input
                value={form.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="E.g., AI-Powered E-Commerce Platform"
                className={inputClass}
              />
            </div>

            {/* Category */}
            <div>
              <label className={labelClass}>Category *</label>
              <select
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className={inputClass}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Featured Toggle */}
            <div className="flex items-end pb-1">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleChange('featured', !form.featured)}
                  className={`w-12 h-6 rounded-full transition-all duration-300 relative ${
                    form.featured ? 'bg-accent shadow-[0_0_15px_rgba(0,212,255,0.4)]' : 'bg-glass-border'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all duration-300 shadow-lg ${
                      form.featured ? 'left-[26px]' : 'left-0.5'
                    }`}
                  />
                </button>
                <label className="text-sm text-text-dim font-medium">⭐ Featured Project</label>
              </div>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className={labelClass}>Description *</label>
              <textarea
                value={form.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={4}
                placeholder="Describe the project's purpose, tech stack, and impact..."
                className={`${inputClass} resize-y`}
              />
            </div>

            {/* Tags */}
            <div className="md:col-span-2">
              <label className={labelClass}>🏷️ Tech Stack Tags (comma separated)</label>
              <input
                value={form.tagsInput}
                onChange={(e) => handleChange('tagsInput', e.target.value)}
                placeholder="React, Next.js, TypeScript, PostgreSQL, AWS"
                className={inputClass}
              />
              <span className="text-[0.65rem] text-text-muted mt-1 block">
                Add technologies, frameworks, or tools used
              </span>
            </div>

            {/* Stats */}
            <div className="md:col-span-2">
              <label className={labelClass}>📊 Project Stats (optional)</label>
              <input
                value={form.statsInput}
                onChange={(e) => handleChange('statsInput', e.target.value)}
                placeholder="Users: 100K+, Response Time: <50ms, Uptime: 99.9%"
                className={inputClass}
              />
              <span className="text-[0.65rem] text-text-muted mt-1 block">
                Format: Label1: Value1, Label2: Value2
              </span>
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <label className={labelClass}>🖼️ Project Image URL (optional)</label>
              <input
                value={form.imageUrl}
                onChange={(e) => handleChange('imageUrl', e.target.value)}
                placeholder="https://your-image-url.com/project-screenshot.png"
                className={inputClass}
              />
              <span className="text-[0.65rem] text-text-muted mt-1 block">
                Recommended: 1920x1080 or 16:9 aspect ratio
              </span>
            </div>

            {/* Demo URL */}
            <div>
              <label className={labelClass}>🌐 Live Demo URL (optional)</label>
              <input
                value={form.demoUrl}
                onChange={(e) => handleChange('demoUrl', e.target.value)}
                placeholder="https://your-project.com"
                className={inputClass}
              />
            </div>

            {/* GitHub URL */}
            <div>
              <label className={labelClass}>💻 GitHub URL (optional)</label>
              <input
                value={form.githubUrl}
                onChange={(e) => handleChange('githubUrl', e.target.value)}
                placeholder="https://github.com/username/repo"
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-8 py-3 bg-gradient-to-r from-accent to-accent-violet text-bg-primary font-semibold text-sm rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,255,0.25)] hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              {saving ? 'Saving...' : editingId ? '💾 Update Project' : '✨ Add Project'}
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-3 bg-glass border border-glass-border text-text-dim text-sm rounded-xl transition-all duration-200 hover:text-text-primary hover:border-glass-border-hover"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Projects List */}
      <div className="flex flex-col gap-4">
        {projects.map((proj, index) => (
          <div
            key={proj.id}
            className="bg-glass border border-glass-border rounded-2xl p-6 backdrop-blur-xl transition-all duration-300 hover:border-glass-border-hover group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-heading text-xl font-semibold text-text-primary">
                    {proj.title}
                  </h3>
                  {proj.featured && (
                    <span className="px-2.5 py-0.5 bg-accent/10 border border-accent/20 rounded-full text-[0.6rem] text-accent font-medium uppercase tracking-wider">
                      ⭐ Featured
                    </span>
                  )}
                  <span className="px-2.5 py-0.5 bg-glass-border rounded-full text-[0.6rem] text-text-muted font-medium">
                    {proj.category}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[0.6rem] text-accent bg-accent/[0.06] px-2 py-1 rounded border border-accent/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-text-muted leading-relaxed line-clamp-2 mb-3">
                  {proj.description}
                </p>

                {proj.stats && Object.keys(proj.stats).length > 0 && (
                  <div className="flex flex-wrap gap-4 mb-2">
                    {Object.entries(proj.stats as Record<string, string>).map(([label, value]) => (
                      <span key={label} className="text-[0.7rem] text-text-dim">
                        <span className="text-accent font-medium">{value}</span> {label}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex gap-3 text-[0.7rem] text-text-muted">
                  {proj.demoUrl && (
                    <a href={proj.demoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                      🌐 Live Demo
                    </a>
                  )}
                  {proj.githubUrl && (
                    <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                      💻 Source Code
                    </a>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2 shrink-0">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleReorder(proj.id, 'up')}
                    disabled={index === 0}
                    className="p-2 bg-glass border border-glass-border rounded-lg text-text-dim hover:text-accent hover:border-accent/30 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move up"
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleReorder(proj.id, 'down')}
                    disabled={index === projects.length - 1}
                    className="p-2 bg-glass border border-glass-border rounded-lg text-text-dim hover:text-accent hover:border-accent/30 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move down"
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                </div>
                <button
                  onClick={() => handleEdit(proj)}
                  className="px-4 py-2 bg-accent/[0.06] border border-accent/10 rounded-lg text-xs text-accent font-medium transition-all duration-200 hover:bg-accent/10"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(proj.id)}
                  className="px-4 py-2 bg-accent-red/[0.06] border border-accent-red/10 rounded-lg text-xs text-accent-red font-medium transition-all duration-200 hover:bg-accent-red/10"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="text-center py-16 text-text-muted">
            <div className="text-6xl mb-4">📁</div>
            <p className="text-sm">No projects added yet.</p>
            <p className="text-xs mt-2">Click "Add Project" to get started.</p>
          </div>
        )}
      </div>
    </div>
  )
}