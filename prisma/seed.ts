import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const password = process.env.ADMIN_PASSWORD
  if (!password) throw new Error('ADMIN_PASSWORD not set in .env')
  const hashedPassword = await bcrypt.hash(password, 12)

  await prisma.adminUser.upsert({
    where: { email: 'allasatwik93@gmail.com' },
    update: {},
    create: {
      email: 'allasatwik93@gmail.com',
      password: hashedPassword,
      name: 'Satwik Alla',
    },
  })

  // Seed initial profile
  await prisma.profile.upsert({
    where: { id: 'main-profile' },
    update: {},
    create: {
      id: 'main-profile',
      name: 'Satwik Alla',
      title: 'AI Full Stack Engineer',
      subtitle: 'AI FULL STACK ENGINEER',
      bio: "I build AI systems that don't just work — they scale. As the founding engineer at Spirit AI, I architected the entire tech stack: backend infrastructure with FastAPI and PostgreSQL delivering sub-200ms API responses, responsive web applications with Next.js and Three.js implementing real-time WebSocket communication, and complete DevOps pipelines with Docker and automated CI/CD.",
      email: 'allasatwik93@gmail.com',
      phone: '4109054899',
      linkedin: 'https://www.linkedin.com/in/satwik-alla',
      github: 'https://github.com/satwikalla',
      location: 'New York City Metropolitan Area',
    },
  })

  // Seed experiences
  const experiences = [
    {
      company: 'Spirit AI / Cosmo AGI, LLC',
      role: 'Lead Software Engineer — Founding Engineer',
      location: 'Dover, Delaware',
      startDate: '2025',
      endDate: 'Present',
      description: 'Architected production backend using FastAPI with async Python, PostgreSQL, Redis, and vector database delivering sub-200ms APIs. Built responsive web apps with Next.js 14, React 18, TypeScript, and Three.js with real-time WebSocket communication.',
      sortOrder: 0,
    },
    {
      company: 'University of Maryland Baltimore County',
      role: 'Graduate Research & Teaching Assistant',
      location: 'Baltimore, MD',
      startDate: '2025',
      endDate: '2025',
      description: 'Conducted research on the Digital Nutrition Label project for ethical software transparency. Assessed 50+ assignments and supported 30+ graduate students in software engineering capstone.',
      sortOrder: 1,
    },
    {
      company: "BYJU'S",
      role: 'Software Development Engineer',
      location: 'Hyderabad, India',
      startDate: '2022',
      endDate: '2023',
      description: 'Designed 20+ RESTful and GraphQL APIs for 3 educational platforms supporting 100K+ concurrent users with 99.5% uptime. Engineered middleware reducing API response time by 30%.',
      sortOrder: 2,
    },
    {
      company: 'Odisha Design Council',
      role: 'Web Developer',
      location: 'Bhubaneswar, India',
      startDate: '2022',
      endDate: '2022',
      description: 'Developed full-stack event management platform using React.js and PostgreSQL for statewide design conference showcasing 50+ speakers with 500+ attendee registration.',
      sortOrder: 3,
    },
  ]

  for (const exp of experiences) {
    await prisma.experience.create({ data: exp })
  }

  // Seed projects
  const projects = [
    {
      title: 'Spirit AI — Real-Time Conversational AI Platform',
      description: 'Architected entire tech stack as founding engineer for a pre-seed AI startup. Built production backend with async Python, 3D visualizations with Three.js, real-time WebSocket streaming, vector database semantic search, and enterprise-grade security.',
      tags: ['FastAPI', 'Next.js 14', 'Three.js', 'PostgreSQL', 'Redis', 'WebSocket'],
      stats: { 'API Response': '<200MS', 'Accessible': 'WCAG AA', 'Ownership': 'FULL STACK' },
      featured: true,
      sortOrder: 0,
    },
    {
      title: 'EdTech Platform — High-Scale API Architecture',
      description: 'Designed and deployed 20+ RESTful and GraphQL APIs for 3 educational platforms supporting 100K+ concurrent users. Engineered middleware reducing response times by 30% and migrated email infrastructure improving delivery from 85% to 98%.',
      tags: ['Ruby on Rails', 'GraphQL', 'AWS SES', 'REST API'],
      stats: { 'Concurrent Users': '100K+', 'Uptime': '99.5%', 'Faster APIs': '30%' },
      featured: true,
      sortOrder: 1,
    },
    {
      title: 'Digital Nutrition Label — Ethical Software Research',
      description: 'Advanced research on software transparency at UMBC Ethical Software Lab. Developed automation scripts evaluating software ethics across privacy, monetization, and resource consumption for 25 health applications across 56 technical attributes.',
      tags: ['Python', 'Research', 'Data Analysis', 'Ethics'],
      stats: { 'Apps Analyzed': '25', 'Attributes': '56', 'Research': 'CO-AUTHOR' },
      featured: true,
      sortOrder: 2,
    },
  ]

  for (const proj of projects) {
    await prisma.project.create({ data: proj })
  }

  // Seed skills
  const skills = [
    { name: 'Python', icon: '⚡', subText: 'FastAPI · Django · Flask', category: 'backend', sortOrder: 0 },
    { name: 'React & Next.js', icon: '⚛', subText: 'TypeScript · SSR · RSC', category: 'frontend', sortOrder: 1 },
    { name: 'AI / LLM', icon: '🧠', subText: 'LangChain · RAG · Vectors', category: 'ai', sortOrder: 2 },
    { name: 'Cloud & DevOps', icon: '☁️', subText: 'AWS · Docker · CI/CD', category: 'devops', sortOrder: 3 },
    { name: 'Databases', icon: '🗄', subText: 'PostgreSQL · Redis · Vector DB', category: 'backend', sortOrder: 4 },
    { name: '3D & WebGL', icon: '🎨', subText: 'Three.js · Animations', category: 'frontend', sortOrder: 5 },
    { name: 'Security', icon: '🔒', subText: 'JWT · OAuth · CORS', category: 'backend', sortOrder: 6 },
    { name: 'Real-Time', icon: '🚀', subText: 'WebSocket · Streaming', category: 'backend', sortOrder: 7 },
  ]

  for (const skill of skills) {
    await prisma.skill.create({ data: skill })
  }

  // Seed competencies
  const competencies = [
    {
      title: 'AI & Intelligence',
      items: ['LLM Integration', 'RAG Systems', 'Vector Search', 'NLP', 'Computer Vision', 'Prompt Engineering'],
      sortOrder: 0,
    },
    {
      title: 'Architecture & Scale',
      items: ['Microservices', 'REST & GraphQL', 'Event-Driven', 'Rate Limiting', 'Caching (Redis)', 'Load Balancing'],
      sortOrder: 1,
    },
    {
      title: 'Frontend & Experience',
      items: ['React 18', 'Next.js 14', 'Three.js', 'Tailwind CSS', 'WCAG AA', 'Responsive'],
      sortOrder: 2,
    },
  ]

  for (const comp of competencies) {
    await prisma.competency.create({ data: comp })
  }

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })