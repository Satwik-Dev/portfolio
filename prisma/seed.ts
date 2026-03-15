import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)

  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
    },
  })

  // Seed initial profile with hero stats
  await prisma.profile.upsert({
    where: { id: 'main-profile' },
    update: {},
    create: {
      id: 'main-profile',
      name: 'Satwik Alla',
      title: 'Full Stack Engineer',
      subtitle: 'FULL STACK ENGINEER',
      bio: "I build fast, beautiful, and scalable web applications. Obsessed with clean code, exceptional UX, and delivering products that exceed expectations. Let's create something remarkable.",
      email: 'allasatwik93@gmail.com',
      phone: '4109054899',
      linkedin: 'https://www.linkedin.com/in/satwik-alla',
      github: 'https://github.com/satwikalla',
      location: 'New York City Metropolitan Area',
      // Hero Stats
      yearsExperience: '3+',
      projectsDelivered: '10+',
      clientSatisfaction: '99%',
    },
  })

  // Seed experiences - using 'position' and 'order'
  const experiences = [
    {
      company: 'Spirit AI / Cosmo AGI, LLC',
      position: 'Lead Software Engineer — Founding Engineer',
      startDate: '2025',
      endDate: null,
      current: true,
      description: 'Architected production backend using FastAPI with async Python, PostgreSQL, Redis, and vector database delivering sub-200ms APIs. Built responsive web apps with Next.js 14, React 18, TypeScript, and Three.js with real-time WebSocket communication.',
      order: 0,
    },
    {
      company: 'University of Maryland Baltimore County',
      position: 'Graduate Research & Teaching Assistant',
      startDate: '2024',
      endDate: '2025',
      current: false,
      description: 'Conducted research on the Digital Nutrition Label project for ethical software transparency. Assessed 50+ assignments and supported 30+ graduate students in software engineering capstone.',
      order: 1,
    },
    {
      company: "BYJU'S",
      position: 'Software Development Engineer',
      startDate: '2022',
      endDate: '2023',
      current: false,
      description: 'Designed 20+ RESTful and GraphQL APIs for 3 educational platforms supporting 100K+ concurrent users with 99.5% uptime. Engineered middleware reducing API response time by 30%.',
      order: 2,
    },
    {
      company: 'Odisha Design Council',
      position: 'Web Developer',
      startDate: '2021',
      endDate: '2022',
      current: false,
      description: 'Developed full-stack event management platform using React.js and PostgreSQL for statewide design conference showcasing 50+ speakers with 500+ attendee registration.',
      order: 3,
    },
  ]

  for (const exp of experiences) {
    await prisma.experience.create({ data: exp })
  }

  // Seed projects - add 'category' field
  const projects = [
    {
      title: 'Spirit AI — Real-Time Conversational AI Platform',
      description: 'Architected entire tech stack as founding engineer for a pre-seed AI startup. Built production backend with async Python, 3D visualizations with Three.js, real-time WebSocket streaming, vector database semantic search, and enterprise-grade security.',
      category: 'AI / Full Stack',
      tags: ['FastAPI', 'Next.js 14', 'Three.js', 'PostgreSQL', 'Redis', 'WebSocket'],
      featured: true,
      order: 0,
    },
    {
      title: 'EdTech Platform — High-Scale API Architecture',
      description: 'Designed and deployed 20+ RESTful and GraphQL APIs for 3 educational platforms supporting 100K+ concurrent users. Engineered middleware reducing response times by 30% and migrated email infrastructure improving delivery from 85% to 98%.',
      category: 'Backend / API',
      tags: ['Ruby on Rails', 'GraphQL', 'AWS SES', 'REST API'],
      featured: true,
      order: 1,
    },
    {
      title: 'Digital Nutrition Label — Ethical Software Research',
      description: 'Advanced research on software transparency at UMBC Ethical Software Lab. Developed automation scripts evaluating software ethics across privacy, monetization, and resource consumption for 25 health applications across 56 technical attributes.',
      category: 'Research',
      tags: ['Python', 'Research', 'Data Analysis', 'Ethics'],
      featured: true,
      order: 2,
    },
  ]

  for (const proj of projects) {
    await prisma.project.create({ data: proj })
  }

  // Seed skills - remove icon and subText, use 'order'
  const skills = [
    { name: 'Python', category: 'Backend', level: 95, order: 0 },
    { name: 'React & Next.js', category: 'Frontend', level: 90, order: 1 },
    { name: 'TypeScript', category: 'Frontend', level: 90, order: 2 },
    { name: 'FastAPI', category: 'Backend', level: 90, order: 3 },
    { name: 'PostgreSQL', category: 'Database', level: 85, order: 4 },
    { name: 'Three.js', category: 'Frontend', level: 80, order: 5 },
    { name: 'Docker', category: 'DevOps', level: 85, order: 6 },
    { name: 'AWS', category: 'DevOps', level: 80, order: 7 },
    { name: 'Redis', category: 'Database', level: 80, order: 8 },
    { name: 'WebSocket', category: 'Backend', level: 85, order: 9 },
    { name: 'GraphQL', category: 'Backend', level: 85, order: 10 },
    { name: 'Tailwind CSS', category: 'Frontend', level: 90, order: 11 },
  ]

  for (const skill of skills) {
    await prisma.skill.create({ data: skill })
  }

  // Seed competencies - use 'description' instead of 'items', use 'order'
  const competencies = [
    {
      title: 'AI & Machine Learning',
      description: 'LLM Integration, RAG Systems, Vector Search, Natural Language Processing, Prompt Engineering, and AI-powered features.',
      icon: '🧠',
      order: 0,
    },
    {
      title: 'Architecture & Scale',
      description: 'Microservices design, RESTful & GraphQL APIs, Event-Driven systems, Rate Limiting, Redis Caching, and Load Balancing.',
      icon: '🏗️',
      order: 1,
    },
    {
      title: 'Frontend Excellence',
      description: 'React 18, Next.js 14, Three.js 3D Graphics, Tailwind CSS, WCAG AA Accessibility, and Responsive Design.',
      icon: '✨',
      order: 2,
    },
  ]

  for (const comp of competencies) {
    await prisma.competency.create({ data: comp })
  }

  console.log('✅ Seed completed successfully!')
  console.log('📧 Admin Login: admin@example.com')
  console.log('🔑 Admin Password: admin123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })