import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const profile = await prisma.profile.findFirst()
  return NextResponse.json(profile)
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await req.json()
  const profile = await prisma.profile.findFirst()

  if (!profile) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
  }

  const updated = await prisma.profile.update({
    where: { id: profile.id },
    data: {
      name: data.name,
      title: data.title,
      subtitle: data.subtitle,
      bio: data.bio,
      email: data.email,
      phone: data.phone,
      linkedin: data.linkedin,
      github: data.github,
      twitter: data.twitter,
      location: data.location,
      avatarUrl: data.avatarUrl,
      resumeUrl: data.resumeUrl,
    },
  })

  return NextResponse.json(updated)
}