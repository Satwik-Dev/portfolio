'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError('Invalid email or password')
      setLoading(false)
    } else {
      router.push('/admin')
    }
  }

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-heading text-4xl font-bold text-text-primary mb-2">
            Admin Panel
          </h1>
          <p className="font-mono text-sm text-text-dim tracking-wider">
            Portfolio Management System
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-glass border border-glass-border rounded-2xl p-8 backdrop-blur-xl"
        >
          {error && (
            <div className="mb-6 px-4 py-3 bg-accent-red/10 border border-accent-red/20 rounded-lg text-accent-red text-sm text-center">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-1.5 mb-5">
            <label className="font-mono text-[0.68rem] font-medium text-text-muted uppercase tracking-[0.15em]">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              className="bg-bg-elevated border border-glass-border rounded-xl px-4 py-3.5 font-body text-sm text-text-primary outline-none transition-all duration-300 placeholder:text-text-muted focus:border-accent focus:shadow-[0_0_0_3px_rgba(0,212,255,0.08)]"
            />
          </div>

          <div className="flex flex-col gap-1.5 mb-8">
            <label className="font-mono text-[0.68rem] font-medium text-text-muted uppercase tracking-[0.15em]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="bg-bg-elevated border border-glass-border rounded-xl px-4 py-3.5 font-body text-sm text-text-primary outline-none transition-all duration-300 placeholder:text-text-muted focus:border-accent focus:shadow-[0_0_0_3px_rgba(0,212,255,0.08)]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-accent to-accent-violet text-bg-primary font-semibold text-sm rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,255,0.25)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}