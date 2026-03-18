'use client'

import { useEffect, useState, KeyboardEvent } from 'react'

interface Education {
  id: string
  school: string
  degree: string
  field: string
  gpa: string | null
  startDate: string
  endDate: string | null
  description: string | null
  coursework: string[]
  current: boolean
  order: number
}

const emptyForm = {
  school: '',
  degree: '',
  field: '',
  gpa: '',
  startDate: '',
  endDate: '',
  description: '',
  coursework: [] as string[],
  current: false,
}

export default function AdminEducation() {
  const [education, setEducation] = useState<Education[]>([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [courseInput, setCourseInput] = useState('')

  const fetchData = () => {
    fetch('/api/admin/education')
      .then((res) => res.json())
      .then(setEducation)
      .catch(console.error)
  }

  useEffect(() => { fetchData() }, [])

  const showMessage = (msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddCourse = () => {
    const trimmed = courseInput.trim()
    if (trimmed && !form.coursework.includes(trimmed)) {
      setForm((prev) => ({ ...prev, coursework: [...prev.coursework, trimmed] }))
      setCourseInput('')
    }
  }

  const handleCourseKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddCourse()
    }
  }

  const handleRemoveCourse = (course: string) => {
    setForm((prev) => ({
      ...prev,
      coursework: prev.coursework.filter((c) => c !== course),
    }))
  }

  const handleAdd = () => {
    setForm(emptyForm)
    setCourseInput('')
    setEditingId(null)
    setShowForm(true)
  }

  const handleEdit = (edu: Education) => {
    setForm({
      school: edu.school,
      degree: edu.degree,
      field: edu.field,
      gpa: edu.gpa ?? '',
      startDate: edu.startDate,
      endDate: edu.endDate ?? '',
      description: edu.description ?? '',
      coursework: edu.coursework ?? [],
      current: edu.current,
    })
    setCourseInput('')
    setEditingId(edu.id)
    setShowForm(true)
  }

  const handleCancel = () => {
    setForm(emptyForm)
    setCourseInput('')
    setEditingId(null)
    setShowForm(false)
  }

  const handleSave = async () => {
    if (!form.school || !form.degree || !form.field || !form.startDate) {
      showMessage('Please fill in School, Degree, Field, and Start Date')
      return
    }

    setSaving(true)

    try {
      const method = editingId ? 'PUT' : 'POST'
      const body = editingId ? { ...form, id: editingId } : form

      const res = await fetch('/api/admin/education', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (res.ok) {
        showMessage(editingId ? 'Education updated!' : 'Education added!')
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
    if (!confirm('Are you sure you want to delete this education entry?')) return

    try {
      const res = await fetch(`/api/admin/education?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        showMessage('Education deleted')
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
          <h1 className="font-heading text-3xl font-bold text-text-primary mb-2">Education</h1>
          <p className="text-sm text-text-dim">Manage your academic background</p>
        </div>
        {!showForm && (
          <button
            onClick={handleAdd}
            className="px-6 py-3 bg-gradient-to-r from-accent to-accent-violet text-bg-primary font-semibold text-sm rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,255,0.25)]"
          >
            + Add Education
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
            {editingId ? 'Edit Education' : 'Add New Education'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className={labelClass}>School / University *</label>
              <input
                value={form.school}
                onChange={(e) => handleChange('school', e.target.value)}
                placeholder="University of Maryland, Baltimore County"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClass}>Degree *</label>
              <input
                value={form.degree}
                onChange={(e) => handleChange('degree', e.target.value)}
                placeholder="Master of Science"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClass}>Field of Study *</label>
              <input
                value={form.field}
                onChange={(e) => handleChange('field', e.target.value)}
                placeholder="Software Engineering"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClass}>GPA</label>
              <input
                value={form.gpa}
                onChange={(e) => handleChange('gpa', e.target.value)}
                placeholder="3.91 / 4.0"
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className={labelClass}>Start Date *</label>
                <input
                  value={form.startDate}
                  onChange={(e) => handleChange('startDate', e.target.value)}
                  placeholder="2019"
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelClass}>End Date</label>
                <input
                  value={form.endDate}
                  onChange={(e) => handleChange('endDate', e.target.value)}
                  placeholder="2021"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.current}
                  onChange={(e) => handleChange('current', e.target.checked)}
                  className="w-4 h-4 accent-accent"
                />
                <span className={labelClass}>Currently enrolled</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-6">
            <label className={labelClass}>Description</label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
              placeholder="Research focus, achievements, honors..."
              className={`${inputClass} resize-y`}
            />
          </div>

          {/* Coursework / Highlights */}
          <div className="flex flex-col gap-2 mt-6">
            <label className={labelClass}>Coursework / Highlights</label>
            <div className="flex gap-2">
              <input
                value={courseInput}
                onChange={(e) => setCourseInput(e.target.value)}
                onKeyDown={handleCourseKeyDown}
                placeholder="Type a course or highlight and press Enter"
                className={`${inputClass} flex-1`}
              />
              <button
                type="button"
                onClick={handleAddCourse}
                className="px-4 py-3 bg-accent/10 border border-accent/20 text-accent text-sm font-medium rounded-xl transition-all hover:bg-accent/20"
              >
                Add
              </button>
            </div>

            {form.coursework.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {form.coursework.map((course) => (
                  <span
                    key={course}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/[0.06] border border-accent/15 rounded-lg text-xs text-accent font-mono"
                  >
                    {course}
                    <button
                      type="button"
                      onClick={() => handleRemoveCourse(course)}
                      className="text-accent/50 hover:text-accent-red transition-colors ml-0.5"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-3 bg-gradient-to-r from-accent to-accent-violet text-bg-primary font-semibold text-sm rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,255,0.25)] disabled:opacity-50"
            >
              {saving ? 'Saving...' : editingId ? 'Update' : 'Add Education'}
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
        {education.map((edu) => (
          <div
            key={edu.id}
            className="bg-glass border border-glass-border rounded-2xl p-6 backdrop-blur-xl transition-all duration-300 hover:border-glass-border-hover"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="font-mono text-[0.7rem] text-accent tracking-wider mb-1">
                  {edu.startDate} — {edu.endDate ?? 'Present'}
                  {edu.current && (
                    <span className="ml-2 px-2 py-0.5 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full text-[0.6rem]">
                      Current
                    </span>
                  )}
                </div>
                <h3 className="font-heading text-xl font-semibold text-text-primary mb-0.5">
                  {edu.degree} in {edu.field}
                </h3>
                <div className="text-sm text-text-dim mb-1">
                  {edu.school}
                  {edu.gpa && (
                    <span className="ml-2 text-accent font-mono text-xs">GPA: {edu.gpa}</span>
                  )}
                </div>
                {edu.description && (
                  <p className="text-sm text-text-muted leading-relaxed mt-2">
                    {edu.description}
                  </p>
                )}
                {edu.coursework && edu.coursework.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {edu.coursework.map((course) => (
                      <span
                        key={course}
                        className="px-2.5 py-1 bg-accent/[0.05] border border-accent/10 rounded-md text-[0.6rem] text-accent/70 font-mono"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => handleEdit(edu)}
                  className="px-4 py-2 bg-accent/[0.06] border border-accent/10 rounded-lg text-xs text-accent font-medium transition-all duration-200 hover:bg-accent/10"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(edu.id)}
                  className="px-4 py-2 bg-accent-red/[0.06] border border-accent-red/10 rounded-lg text-xs text-accent-red font-medium transition-all duration-200 hover:bg-accent-red/10"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {education.length === 0 && (
          <div className="text-center py-12 text-text-muted text-sm">
            No education added yet. Click &quot;Add Education&quot; to get started.
          </div>
        )}
      </div>
    </div>
  )
}