import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const [experiences, projects, skills, competencies] = await Promise.all([
    prisma.experience.count(),
    prisma.project.count(),
    prisma.skill.count(),
    prisma.competency.count(),
  ])

  return NextResponse.json({ experiences, projects, skills, competencies })
}