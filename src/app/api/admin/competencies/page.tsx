'use client'

import { useEffect, useState } from 'react'

interface Competency {
  id: string
  title: string
  items: string[]
  sortOrder: number
}

interface CompForm {
  title: string
  itemsInput: string
}

const emptyForm: CompForm = {
  title: '',
  itemsInput: '',
}

export default function AdminCompetencies() {
  const [competencies, setCompetencies] = useState<Competency[]>([])
  const [form, setForm] = useState<CompForm>(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const fetchData = () => {
    fetch('/api/admin/competencies')
      .then((res) => res.json())
      .then(setCompetencies)
      .catch(console.error)
  }

  useEffect(() => { fetchData() }, [])

  const showMessage = (msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleChange = (field: keyof CompForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleAdd = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(true)
  }

  const handleEdit = (comp: Competency) => {
    setForm({
      title: comp.title,
      itemsInput: comp.items.join(', '),
    })
    setEditingId(comp.id)
    setShowForm(true)
  }

  const handleCancel = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(false)
  }

  const handleSave = async () => {
    if (!form.title) {
      showMessage('Title is required')
      return
    }

    setSaving(true)

    const payload = {
      id: editingId,
      title: form.title,
      items: form.itemsInput.split(',').map((i) => i.trim()).filter(Boolean),
    }

    try {
      const res = await fetch('/api/admin/competencies', {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        showMessage(editingId ? 'Competency updated!' : 'Competency added!')
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
    if (!confirm('Are you sure you want to delete this competency?')) return

    try {
      const res = await fetch(`/api/admin/competencies?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        showMessage('Competency deleted')
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
          <h1 className="font-heading text-3xl font-bold text-text-primary mb-2">Competencies</h1>
          <p className="text-sm text-text-dim">Manage your core competency groups</p>
        </div>
        {!showForm && (
          <button
            onClick={handleAdd}
            className="px-6 py-3 bg-gradient-to-r from-accent to-accent-violet text-bg-primary font-semibold text-sm rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,255,0.25)]"
          >
            + Add Competency
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
            {editingId ? 'Edit Competency' : 'Add New Competency'}
          </h2>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Title *</label>
              <input
                value={form.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="AI & Intelligence"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClass}>Items (comma separated)</label>
              <textarea
                value={form.itemsInput}
                onChange={(e) => handleChange('itemsInput', e.target.value)}
                rows={3}
                placeholder="LLM Integration, RAG Systems, Vector Search, NLP"
                className={`${inputClass} resize-y`}
              />
              <span className="text-[0.6rem] text-text-muted">
                Each comma-separated item becomes a tag in the competency card
              </span>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-3 bg-gradient-to-r from-accent to-accent-violet text-bg-primary font-semibold text-sm rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,255,0.25)] disabled:opacity-50"
            >
              {saving ? 'Saving...' : editingId ? 'Update' : 'Add Competency'}
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
        {competencies.map((comp) => (
          <div
            key={comp.id}
            className="bg-glass border border-glass-border rounded-2xl p-6 backdrop-blur-xl transition-all duration-300 hover:border-glass-border-hover"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-heading text-xl font-semibold text-text-primary mb-3">
                  {comp.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {comp.items.map((item) => (
                    <span
                      key={item}
                      className="font-mono text-[0.65rem] text-text-dim px-2.5 py-1.5 bg-accent/[0.04] border border-accent/[0.06] rounded"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => handleEdit(comp)}
                  className="px-4 py-2 bg-accent/[0.06] border border-accent/10 rounded-lg text-xs text-accent font-medium transition-all duration-200 hover:bg-accent/10"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(comp.id)}
                  className="px-4 py-2 bg-accent-red/[0.06] border border-accent-red/10 rounded-lg text-xs text-accent-red font-medium transition-all duration-200 hover:bg-accent-red/10"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {competencies.length === 0 && (
          <div className="text-center py-12 text-text-muted text-sm">
            No competencies added yet. Click &quot;Add Competency&quot; to get started.
          </div>
        )}
      </div>
    </div>
  )
}