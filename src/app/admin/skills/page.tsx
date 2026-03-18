'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface Skill {
  id: string
  name: string
  category: string
  level: number
  logoUrl: string | null
  order: number
}

interface SkillForm {
  name: string
  category: string
  level: number
  logoUrl: string
}

const emptyForm: SkillForm = {
  name: '',
  category: 'Frontend',
  level: 80,
  logoUrl: '',
}

const categories = [
  { value: 'Frontend', label: 'Frontend' },
  { value: 'Backend', label: 'Backend' },
  { value: 'Database', label: 'Database' },
  { value: 'Cloud & DevOps', label: 'Cloud & DevOps' },
  { value: 'AI / ML', label: 'AI / ML' },
  { value: 'Other', label: 'Other' },
]

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [form, setForm] = useState<SkillForm>(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const fetchData = () => {
    fetch('/api/admin/skills')
      .then((res) => res.json())
      .then(setSkills)
      .catch(console.error)
  }

  useEffect(() => { fetchData() }, [])

  const showMessage = (msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleChange = (field: keyof SkillForm, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleAdd = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(true)
  }

  const handleEdit = (skill: Skill) => {
    setForm({
      name: skill.name,
      category: skill.category,
      level: skill.level,
      logoUrl: skill.logoUrl ?? '',
    })
    setEditingId(skill.id)
    setShowForm(true)
  }

  const handleCancel = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(false)
  }

  const handleSave = async () => {
    if (!form.name || !form.category) {
      showMessage('Name and category are required')
      return
    }

    setSaving(true)

    const payload = editingId ? { ...form, id: editingId } : form

    try {
      const res = await fetch('/api/admin/skills', {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        showMessage(editingId ? 'Skill updated!' : 'Skill added!')
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
    if (!confirm('Are you sure you want to delete this skill?')) return

    try {
      const res = await fetch(`/api/admin/skills?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        showMessage('Skill deleted')
        fetchData()
      }
    } catch {
      showMessage('Failed to delete')
    }
  }

  const inputClass = "w-full bg-bg-elevated border border-glass-border rounded-xl px-4 py-3 font-body text-sm text-text-primary outline-none transition-all duration-300 placeholder:text-text-muted focus:border-accent focus:shadow-[0_0_0_3px_rgba(0,212,255,0.08)]"
  const labelClass = "font-mono text-[0.68rem] font-medium text-text-muted uppercase tracking-[0.15em]"

  // Group by category
  const grouped = categories.map((cat) => ({
    ...cat,
    skills: skills.filter((s) => s.category === cat.value),
  })).filter((g) => g.skills.length > 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-text-primary mb-2">Skills</h1>
          <p className="text-sm text-text-dim">Manage your technical skills &amp; tech stack</p>
        </div>
        {!showForm && (
          <button
            onClick={handleAdd}
            className="px-6 py-3 bg-gradient-to-r from-accent to-accent-violet text-bg-primary font-semibold text-sm rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,255,0.25)]"
          >
            + Add Skill
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
            {editingId ? 'Edit Skill' : 'Add New Skill'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Skill Name *</label>
              <input
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="React"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClass}>Category *</label>
              <select
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className={inputClass}
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClass}>Logo URL</label>
              <input
                value={form.logoUrl}
                onChange={(e) => handleChange('logoUrl', e.target.value)}
                placeholder="/images/react.svg"
                className={inputClass}
              />
              <p className="text-[0.6rem] text-text-muted font-mono">
                Path to logo in /public/images/ — e.g. /images/react.svg
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClass}>Skill Level (0–100)</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={form.level}
                  onChange={(e) => handleChange('level', parseInt(e.target.value))}
                  className="flex-1 accent-accent h-2"
                />
                <span className="font-mono text-sm text-accent w-10 text-right">{form.level}%</span>
              </div>
            </div>
          </div>

          {/* Logo preview */}
          {form.logoUrl && (
            <div className="mt-4 flex items-center gap-3 p-3 bg-bg-elevated/50 rounded-xl border border-glass-border w-fit">
              <Image
                src={form.logoUrl}
                alt="Logo preview"
                width={32}
                height={32}
                className="object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none'
                }}
              />
              <span className="text-xs text-text-muted font-mono">{form.logoUrl}</span>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-3 bg-gradient-to-r from-accent to-accent-violet text-bg-primary font-semibold text-sm rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,255,0.25)] disabled:opacity-50"
            >
              {saving ? 'Saving...' : editingId ? 'Update' : 'Add Skill'}
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

      {/* Grouped List */}
      <div className="flex flex-col gap-8">
        {grouped.map((group) => (
          <div key={group.value}>
            <div className="flex items-center gap-3 mb-4">
              <h3 className="font-mono text-xs text-accent tracking-[0.2em] uppercase">
                {group.label}
              </h3>
              <span className="px-2 py-0.5 bg-accent/10 border border-accent/20 text-accent text-[0.6rem] font-mono rounded-full">
                {group.skills.length}
              </span>
              <span className="flex-1 h-px bg-glass-border" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {group.skills.map((skill) => (
                <div
                  key={skill.id}
                  className="bg-glass border border-glass-border rounded-xl p-4 backdrop-blur-xl transition-all duration-300 hover:border-glass-border-hover flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Logo or fallback */}
                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                      {skill.logoUrl ? (
                        <Image
                          src={skill.logoUrl}
                          alt={skill.name}
                          width={28}
                          height={28}
                          className="object-contain"
                        />
                      ) : (
                        <span className="text-lg">⚡</span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="text-sm font-medium text-text-primary truncate">{skill.name}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="w-16 h-1 bg-bg-elevated rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-accent to-accent-violet rounded-full"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <span className="font-mono text-[0.58rem] text-text-muted">{skill.level}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-1.5 shrink-0">
                    <button
                      onClick={() => handleEdit(skill)}
                      className="p-2 bg-accent/[0.06] border border-accent/10 rounded-lg text-accent transition-all duration-200 hover:bg-accent/10"
                      title="Edit"
                    >
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                        <path d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(skill.id)}
                      className="p-2 bg-accent-red/[0.06] border border-accent-red/10 rounded-lg text-accent-red transition-all duration-200 hover:bg-accent-red/10"
                      title="Delete"
                    >
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {skills.length === 0 && (
          <div className="text-center py-12 text-text-muted text-sm">
            No skills added yet. Click &quot;Add Skill&quot; to get started.
          </div>
        )}
      </div>
    </div>
  )
}