import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const projects = await prisma.project.findMany({ orderBy: { sortOrder: 'asc' } })
  return NextResponse.json(projects)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await req.json()
  const count = await prisma.project.count()

  const project = await prisma.project.create({
    data: {
      title: data.title,
      description: data.description,
      tags: data.tags || [],
      imageUrl: data.imageUrl || null,
      liveUrl: data.liveUrl || null,
      githubUrl: data.githubUrl || null,
      stats: data.stats || null,
      featured: data.featured || false,
      sortOrder: count,
    },
  })

  return NextResponse.json(project)
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await req.json()

  const project = await prisma.project.update({
    where: { id: data.id },
    data: {
      title: data.title,
      description: data.description,
      tags: data.tags || [],
      imageUrl: data.imageUrl || null,
      liveUrl: data.liveUrl || null,
      githubUrl: data.githubUrl || null,
      stats: data.stats || null,
      featured: data.featured || false,
      sortOrder: data.sortOrder,
    },
  })

  return NextResponse.json(project)
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

  await prisma.project.delete({ where: { id } })
  return NextResponse.json({ success: true })
}