'use client'

import { useEffect, useState } from 'react'

interface Experience {
  id: string
  company: string
  role: string
  location: string | null
  startDate: string
  endDate: string | null
  description: string
  sortOrder: number
}

const emptyForm: Omit<Experience, 'id' | 'sortOrder'> = {
  company: '',
  role: '',
  location: '',
  startDate: '',
  endDate: '',
  description: '',
}

export default function AdminExperience() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const fetchData = () => {
    fetch('/api/admin/experience')
      .then((res) => res.json())
      .then(setExperiences)
      .catch(console.error)
  }

  useEffect(() => { fetchData() }, [])

  const showMessage = (msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleAdd = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(true)
  }

  const handleEdit = (exp: Experience) => {
    setForm({
      company: exp.company,
      role: exp.role,
      location: exp.location ?? '',
      startDate: exp.startDate,
      endDate: exp.endDate ?? '',
      description: exp.description,
    })
    setEditingId(exp.id)
    setShowForm(true)
  }

  const handleCancel = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(false)
  }

  const handleSave = async () => {
    if (!form.company || !form.role || !form.startDate || !form.description) {
      showMessage('Please fill in all required fields')
      return
    }

    setSaving(true)

    try {
      const method = editingId ? 'PUT' : 'POST'
      const body = editingId ? { ...form, id: editingId } : form

      const res = await fetch('/api/admin/experience', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (res.ok) {
        showMessage(editingId ? 'Experience updated!' : 'Experience added!')
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
    if (!confirm('Are you sure you want to delete this experience?')) return

    try {
      const res = await fetch(`/api/admin/experience?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        showMessage('Experience deleted')
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
          <h1 className="font-heading text-3xl font-bold text-text-primary mb-2">Experience</h1>
          <p className="text-sm text-text-dim">Manage your work history</p>
        </div>
        {!showForm && (
          <button
            onClick={handleAdd}
            className="px-6 py-3 bg-gradient-to-r from-accent to-accent-violet text-bg-primary font-semibold text-sm rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,255,0.25)]"
          >
            + Add Experience
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
            {editingId ? 'Edit Experience' : 'Add New Experience'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Company *</label>
              <input
                value={form.company}
                onChange={(e) => handleChange('company', e.target.value)}
                placeholder="Company name"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClass}>Role *</label>
              <input
                value={form.role}
                onChange={(e) => handleChange('role', e.target.value)}
                placeholder="Job title"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClass}>Location</label>
              <input
                value={form.location ?? ''}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="City, State"
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className={labelClass}>Start Date *</label>
                <input
                  value={form.startDate}
                  onChange={(e) => handleChange('startDate', e.target.value)}
                  placeholder="2025"
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelClass}>End Date</label>
                <input
                  value={form.endDate ?? ''}
                  onChange={(e) => handleChange('endDate', e.target.value)}
                  placeholder="Present"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-6">
            <label className={labelClass}>Description *</label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={4}
              placeholder="Describe your role and achievements..."
              className={`${inputClass} resize-y`}
            />
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-3 bg-gradient-to-r from-accent to-accent-violet text-bg-primary font-semibold text-sm rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,255,0.25)] disabled:opacity-50"
            >
              {saving ? 'Saving...' : editingId ? 'Update' : 'Add Experience'}
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
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="bg-glass border border-glass-border rounded-2xl p-6 backdrop-blur-xl transition-all duration-300 hover:border-glass-border-hover"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="font-mono text-[0.7rem] text-accent tracking-wider mb-1">
                  {exp.startDate} — {exp.endDate ?? 'Present'}
                </div>
                <h3 className="font-heading text-xl font-semibold text-text-primary mb-1">
                  {exp.role}
                </h3>
                <div className="text-sm text-text-dim mb-3">
                  {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                </div>
                <p className="text-sm text-text-muted leading-relaxed">
                  {exp.description}
                </p>
              </div>

              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => handleEdit(exp)}
                  className="px-4 py-2 bg-accent/[0.06] border border-accent/10 rounded-lg text-xs text-accent font-medium transition-all duration-200 hover:bg-accent/10"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="px-4 py-2 bg-accent-red/[0.06] border border-accent-red/10 rounded-lg text-xs text-accent-red font-medium transition-all duration-200 hover:bg-accent-red/10"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {experiences.length === 0 && (
          <div className="text-center py-12 text-text-muted text-sm">
            No experiences added yet. Click &quot;Add Experience&quot; to get started.
          </div>
        )}
      </div>
    </div>
  )
}