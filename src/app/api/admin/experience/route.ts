import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const experiences = await prisma.experience.findMany({ orderBy: { sortOrder: 'asc' } })
  return NextResponse.json(experiences)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await req.json()
  const count = await prisma.experience.count()

  const experience = await prisma.experience.create({
    data: {
      company: data.company,
      role: data.role,
      location: data.location || null,
      startDate: data.startDate,
      endDate: data.endDate || null,
      description: data.description,
      sortOrder: count,
    },
  })

  return NextResponse.json(experience)
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await req.json()

  const experience = await prisma.experience.update({
    where: { id: data.id },
    data: {
      company: data.company,
      role: data.role,
      location: data.location || null,
      startDate: data.startDate,
      endDate: data.endDate || null,
      description: data.description,
      sortOrder: data.sortOrder,
    },
  })

  return NextResponse.json(experience)
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

  await prisma.experience.delete({ where: { id } })
  return NextResponse.json({ success: true })
}