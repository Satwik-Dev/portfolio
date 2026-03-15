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
      // Hero Stats
      yearsExperience: data.yearsExperience,
      projectsDelivered: data.projectsDelivered,
      clientSatisfaction: data.clientSatisfaction,
      // About Section
      avatarUrl: data.avatarUrl,
      aboutTitle: data.aboutTitle,
      aboutBadge: data.aboutBadge,
      metric1Value: data.metric1Value,
      metric1Label: data.metric1Label,
      metric2Value: data.metric2Value,
      metric2Label: data.metric2Label,
      metric3Value: data.metric3Value,
      metric3Label: data.metric3Label,
      metric4Value: data.metric4Value,
      metric4Label: data.metric4Label,
    },
  })

  return NextResponse.json(updated)
}