import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const education = await prisma.education.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(education)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await req.json()
  const count = await prisma.education.count()

  const education = await prisma.education.create({
    data: {
      school: data.school,
      degree: data.degree,
      field: data.field,
      gpa: data.gpa || null,
      startDate: data.startDate,
      endDate: data.endDate || null,
      description: data.description || null,
      coursework: data.coursework || [],
      current: data.current || false,
      order: count,
    },
  })

  return NextResponse.json(education)
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await req.json()

  const education = await prisma.education.update({
    where: { id: data.id },
    data: {
      school: data.school,
      degree: data.degree,
      field: data.field,
      gpa: data.gpa || null,
      startDate: data.startDate,
      endDate: data.endDate || null,
      description: data.description || null,
      coursework: data.coursework || [],
      current: data.current || false,
      order: data.order,
    },
  })

  return NextResponse.json(education)
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

  await prisma.education.delete({ where: { id } })
  return NextResponse.json({ success: true })
}