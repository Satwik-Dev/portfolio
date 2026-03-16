import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const projects = await prisma.project.findMany({ orderBy: { order: 'asc' } })
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
      category: data.category || 'Web Application',
      tags: data.tags || [],
      imageUrl: data.imageUrl || null,
      demoUrl: data.demoUrl || null,
      githubUrl: data.githubUrl || null,
      stats: data.stats || null,
      featured: data.featured || false,
      order: data.order !== undefined ? data.order : count,
    },
  })

  return NextResponse.json(project)
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await req.json()

  // If only order is being updated (for reordering)
  if (data.order !== undefined && Object.keys(data).length === 2) {
    const project = await prisma.project.update({
      where: { id: data.id },
      data: { order: data.order },
    })
    return NextResponse.json(project)
  }

  // Full update
  const project = await prisma.project.update({
    where: { id: data.id },
    data: {
      title: data.title,
      description: data.description,
      category: data.category || 'Web Application',
      tags: data.tags || [],
      imageUrl: data.imageUrl || null,
      demoUrl: data.demoUrl || null,
      githubUrl: data.githubUrl || null,
      stats: data.stats || null,
      featured: data.featured || false,
      ...(data.order !== undefined && { order: data.order }),
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