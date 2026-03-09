import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const skills = await prisma.skill.findMany({ orderBy: { sortOrder: 'asc' } })
  return NextResponse.json(skills)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await req.json()
  const count = await prisma.skill.count()

  const skill = await prisma.skill.create({
    data: {
      name: data.name,
      icon: data.icon || null,
      subText: data.subText || null,
      category: data.category,
      sortOrder: count,
    },
  })

  return NextResponse.json(skill)
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await req.json()

  const skill = await prisma.skill.update({
    where: { id: data.id },
    data: {
      name: data.name,
      icon: data.icon || null,
      subText: data.subText || null,
      category: data.category,
      sortOrder: data.sortOrder,
    },
  })

  return NextResponse.json(skill)
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

  await prisma.skill.delete({ where: { id } })
  return NextResponse.json({ success: true })
}