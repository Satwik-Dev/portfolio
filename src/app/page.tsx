import { prisma } from '@/lib/prisma'
import dynamic from 'next/dynamic'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import GrainOverlay from '@/components/layout/GrainOverlay'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import TechStack from '@/components/sections/TechStack'
import Education from '@/components/sections/Education'
import Contact from '@/components/sections/Contact'

const NeuralField = dynamic(() => import('@/components/three/NeuralField'), { ssr: false })
const Preloader = dynamic(() => import('@/components/layout/Preloader'), { ssr: false })
const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), { ssr: false })
export const revalidate = 0

export default async function Home() {
  const profile = await prisma.profile.findFirst()
  const experiences = await prisma.experience.findMany({ orderBy: { order: 'asc' } })
  const projects = await prisma.project.findMany({ orderBy: { order: 'asc' } })
  const skills = await prisma.skill.findMany({ orderBy: { order: 'asc' } })
  const education = await prisma.education.findMany({ orderBy: { order: 'asc' } })

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
          title={profile?.title ?? 'Full Stack Software Engineer'}
          subtitle={profile?.subtitle}
          bio={profile?.bio ?? ''}
          yearsExperience={profile?.yearsExperience ?? '3+'}
          projectsDelivered={profile?.projectsDelivered ?? '10+'}
          clientSatisfaction={profile?.clientSatisfaction ?? '99%'}
        />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-30" />

        <About
          bio={profile?.bio ?? ''}
          experiences={experiences}
          avatarUrl={profile?.avatarUrl}
          aboutTitle={profile?.aboutTitle ?? 'Building the future, one system at a time.'}
          aboutBadge={profile?.aboutBadge ?? 'Founding Engineer @ Spirit AI'}
          metric1Value={profile?.metric1Value ?? '100K+'}
          metric1Label={profile?.metric1Label ?? 'Concurrent Users Served'}
          metric2Value={profile?.metric2Value ?? '<200ms'}
          metric2Label={profile?.metric2Label ?? 'API Response Time'}
          metric3Value={profile?.metric3Value ?? '3.91'}
          metric3Label={profile?.metric3Label ?? 'GPA @ UMBC'}
          metric4Value={profile?.metric4Value ?? '20+'}
          metric4Label={profile?.metric4Label ?? 'APIs Designed'}
        />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-30" />

        <Education education={education} />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-30" />

        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <Projects projects={projects as any} />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-30" />

        <TechStack skills={skills} />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-30" />

        <Contact
          email={profile?.email ?? 'allasatwik93@gmail.com'}
          phone={profile?.phone ?? '14109054899'}
          linkedin={profile?.linkedin ?? 'https://www.linkedin.com/in/satwik-alla'}
          github={profile?.github ?? 'https://github.com/Satwik-Dev'}
        />
      </main>

      <Footer />
    </>
  )
}