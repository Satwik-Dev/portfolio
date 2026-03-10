import { prisma } from '@/lib/prisma'
import dynamic from 'next/dynamic'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import GrainOverlay from '@/components/layout/GrainOverlay'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import Contact from '@/components/sections/Contact'

const NeuralField = dynamic(() => import('@/components/three/NeuralField'), { ssr: false })
const Preloader = dynamic(() => import('@/components/layout/Preloader'), { ssr: false })
const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), { ssr: false })

export default async function Home() {
  const profile = await prisma.profile.findFirst()
  const experiences = await prisma.experience.findMany({ orderBy: { sortOrder: 'asc' } })
  const projects = await prisma.project.findMany({ orderBy: { sortOrder: 'asc' } })
  const skills = await prisma.skill.findMany({ orderBy: { sortOrder: 'asc' } })
  const competencies = await prisma.competency.findMany({ orderBy: { sortOrder: 'asc' } })

  return (
    <>
      <Preloader />
      <CustomCursor />
      <NeuralField />
      <GrainOverlay />
      <Navbar name={profile?.name ?? 'Satwik Alla'} />

      <main className="relative z-[1]">
        <Hero
          name={profile?.name ?? 'Satwik Alla'}
          title={profile?.title ?? 'AI Full Stack Engineer'}
          subtitle={profile?.subtitle}
          bio={profile?.bio ?? ''}
        />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-30" />

        <About
          bio={profile?.bio ?? ''}
          experiences={experiences}
        />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-30" />

        <Projects projects={projects as Array<{ id: string; title: string; description: string; tags: string[]; imageUrl: string | null; liveUrl: string | null; githubUrl: string | null; stats: Record<string, string> | null; featured: boolean; sortOrder: number }>} />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-30" />

        <Skills skills={skills} competencies={competencies} />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-30" />

        <Contact
          email={profile?.email ?? 'allasatwik93@gmail.com'}
          phone={profile?.phone ?? null}
          linkedin={profile?.linkedin ?? null}
          github={profile?.github ?? null}
        />
      </main>

      <Footer />
    </>
  )
}