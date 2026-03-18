'use client'

import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { signOut } from 'next-auth/react'

const sidebarLinks = [
  { label: 'Dashboard', href: '/admin', icon: '📊' },
  { label: 'Profile', href: '/admin/profile', icon: '👤' },
  { label: 'Experience', href: '/admin/experience', icon: '💼' },
  { label: 'Education', href: '/admin/education', icon: '🎓' },
  { label: 'Projects', href: '/admin/projects', icon: '🚀' },
  { label: 'Skills', href: '/admin/skills', icon: '⚡' },
  { label: 'Competencies', href: '/admin/competencies', icon: '🧠' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === 'unauthenticated' && pathname !== '/admin/login') {
      router.push('/admin/login')
    }
  }, [status, pathname, router])

  // Show login page without admin layout
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  // Loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="font-mono text-sm text-accent tracking-wider animate-pulse">
          Loading...
        </div>
      </div>
    )
  }

  // Not authenticated
  if (!session) {
    return null
  }

  return (
    <div className="relative z-[100000] min-h-screen bg-bg-primary flex">
      {/* Sidebar */}
      <aside className="w-64 bg-bg-elevated border-r border-glass-border flex flex-col fixed h-full">
        <div className="p-6 border-b border-glass-border">
          <h2 className="font-heading text-xl font-bold text-text-primary">Admin</h2>
          <p className="font-mono text-[0.65rem] text-text-muted tracking-wider mt-1">
            Portfolio CMS
          </p>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium no-underline transition-all duration-200 ${
                  isActive
                    ? 'bg-accent/10 text-accent border border-accent/20'
                    : 'text-text-dim hover:text-text-primary hover:bg-glass border border-transparent'
                }`}
              >
                <span className="text-lg">{link.icon}</span>
                {link.label}
              </a>
            )
          })}
        </nav>

        <div className="p-4 border-t border-glass-border">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent text-xs font-bold">
              {session.user?.name?.charAt(0) ?? 'A'}
            </div>
            <div>
              <div className="text-sm text-text-primary font-medium">{session.user?.name}</div>
              <div className="text-[0.65rem] text-text-muted">{session.user?.email}</div>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="w-full px-4 py-2.5 text-sm text-text-dim bg-glass border border-glass-border rounded-xl hover:text-accent-red hover:border-accent-red/20 transition-all duration-200"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  )
}