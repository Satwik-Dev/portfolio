'use client'

import { useEffect, useState } from 'react'

interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  imageUrl: string | null
  liveUrl: string | null
  githubUrl: string | null
  stats: Record<string, string> | null
  featured: boolean
  sortOrder: number
}

interface ProjectForm {
  title: string
  description: string
  tagsInput: string
  imageUrl: string
  liveUrl: string
  githubUrl: string
  statsInput: string
  featured: boolean
}

const emptyForm: ProjectForm = {
  title: '',
  description: '',
  tagsInput: '',
  imageUrl: '',
  liveUrl: '',
  githubUrl: '',
  statsInput: '',
  featured: false,
}

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
      tagsInput: proj.tags.join(', '),
      imageUrl: proj.imageUrl ?? '',
      liveUrl: proj.liveUrl ?? '',
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
      tags: form.tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
      imageUrl: form.imageUrl || null,
      liveUrl: form.liveUrl || null,
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

  const inputClass = "w-full bg-bg-elevated border border-glass-border rounded-xl px-4 py-3 font-body text-sm text-text-primary outline-none transition-all duration-300 placeholder:text-text-muted focus:border-accent focus:shadow-[0_0_0_3px_rgba(0,212,255,0.08)]"
  const labelClass = "font-mono text-[0.68rem] font-medium text-text-muted uppercase tracking-[0.15em]"

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-text-primary mb-2">Projects</h1>
          <p className="text-sm text-text-dim">Manage your portfolio projects</p>
        </div>
        {!showForm && (
          <button
            onClick={handleAdd}
            className="px-6 py-3 bg-gradient-to-r from-accent to-accent-violet text-bg-primary font-semibold text-sm rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,255,0.25)]"
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
            {editingId ? 'Edit Project' : 'Add New Project'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className={labelClass}>Title *</label>
              <input
                value={form.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Project title"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label className={labelClass}>Description *</label>
              <textarea
                value={form.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={4}
                placeholder="Describe the project..."
                className={`${inputClass} resize-y`}
              />
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label className={labelClass}>Tags (comma separated)</label>
              <input
                value={form.tagsInput}
                onChange={(e) => handleChange('tagsInput', e.target.value)}
                placeholder="React, Python, AWS, Docker"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label className={labelClass}>Stats (comma separated — Label: Value)</label>
              <input
                value={form.statsInput}
                onChange={(e) => handleChange('statsInput', e.target.value)}
                placeholder="Users: 100K+, Uptime: 99.5%, Speed: 30%"
                className={inputClass}
              />
              <span className="text-[0.6rem] text-text-muted">
                Format: Label1: Value1, Label2: Value2
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClass}>Live URL</label>
              <input
                value={form.liveUrl}
                onChange={(e) => handleChange('liveUrl', e.target.value)}
                placeholder="https://project.com"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClass}>GitHub URL</label>
              <input
                value={form.githubUrl}
                onChange={(e) => handleChange('githubUrl', e.target.value)}
                placeholder="https://github.com/..."
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClass}>Image URL</label>
              <input
                value={form.imageUrl}
                onChange={(e) => handleChange('imageUrl', e.target.value)}
                placeholder="https://..."
                className={inputClass}
              />
            </div>

            <div className="flex items-center gap-3 self-end pb-1">
              <button
                type="button"
                onClick={() => handleChange('featured', !form.featured)}
                className={`w-12 h-6 rounded-full transition-all duration-300 relative ${
                  form.featured ? 'bg-accent' : 'bg-glass-border'
                }`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all duration-300 ${
                    form.featured ? 'left-[26px]' : 'left-0.5'
                  }`}
                />
              </button>
              <label className="text-sm text-text-dim">Featured project</label>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-3 bg-gradient-to-r from-accent to-accent-violet text-bg-primary font-semibold text-sm rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,255,0.25)] disabled:opacity-50"
            >
              {saving ? 'Saving...' : editingId ? 'Update' : 'Add Project'}
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

      {/* List */}
      <div className="flex flex-col gap-4">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-glass border border-glass-border rounded-2xl p-6 backdrop-blur-xl transition-all duration-300 hover:border-glass-border-hover"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-heading text-xl font-semibold text-text-primary">
                    {proj.title}
                  </h3>
                  {proj.featured && (
                    <span className="px-2.5 py-0.5 bg-accent/10 border border-accent/20 rounded-full text-[0.6rem] text-accent font-medium uppercase tracking-wider">
                      Featured
                    </span>
                  )}
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

                <p className="text-sm text-text-muted leading-relaxed line-clamp-2">
                  {proj.description}
                </p>

                {proj.stats && (
                  <div className="flex flex-wrap gap-4 mt-3">
                    {Object.entries(proj.stats as Record<string, string>).map(([label, value]) => (
                      <span key={label} className="text-[0.7rem] text-text-dim">
                        <span className="text-accent font-medium">{value}</span> {label}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-2 shrink-0">
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
          <div className="text-center py-12 text-text-muted text-sm">
            No projects added yet. Click &quot;Add Project&quot; to get started.
          </div>
        )}
      </div>
    </div>
  )
}