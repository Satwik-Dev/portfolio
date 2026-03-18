import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create admin user
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10)
  
  const user = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@example.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@example.com',
      password: hashedPassword,
    },
  })
  console.log('✅ Admin user created:', user.email)

  // Create or update profile
  const profile = await prisma.profile.upsert({
    where: { id: 'default-profile' },
    update: {},
    create: {
      id: 'default-profile',
      name: 'Satwik Alla',
      title: 'FULL STACK ENGINEER',
      subtitle: 'Building scalable systems that matter',
      bio: `I'm a Full Stack Engineer with a passion for creating exceptional digital experiences. Currently a founding engineer at Spirit AI, where I architect and build cutting-edge AI-powered applications.

With expertise spanning frontend to backend, cloud infrastructure to AI/ML integration, I specialize in transforming complex technical challenges into elegant, scalable solutions. My work has served over 100K+ concurrent users with sub-200ms response times.

I hold a Master's in Software Engineering from UMBC with a 3.91 GPA, and have extensive experience at companies like BYJU'S, where I built systems that impacted millions of students worldwide.`,
      email: 'allasatwik93@gmail.com',
      phone: '+1 (XXX) XXX-XXXX',
      location: 'Baltimore, MD',
      github: 'https://github.com/satwik',
      linkedin: 'https://linkedin.com/in/satwik',
      twitter: 'https://twitter.com/satwik',
      
      // Hero Stats
      yearsExperience: '3+',
      projectsDelivered: '10+',
      clientSatisfaction: '99%',
      
      // About Section
      avatarUrl: '/profile-photo.png',
      aboutTitle: 'Building the future, one system at a time.',
      aboutBadge: 'Founding Engineer @ Spirit AI',
      metric1Value: '100K+',
      metric1Label: 'Concurrent Users Served',
      metric2Value: '<200ms',
      metric2Label: 'API Response Time',
      metric3Value: '3.91',
      metric3Label: 'GPA @ UMBC',
      metric4Value: '20+',
      metric4Label: 'APIs Designed',
    },
  })
  console.log('✅ Profile created')

  // Sample Projects
  const projects = [
    {
      title: 'AI-Powered Learning Platform',
      description: 'Architected and deployed a scalable AI tutoring system serving 100K+ concurrent users. Built microservices architecture with React frontend, Node.js backend, and AWS infrastructure. Integrated GPT-4 for personalized learning experiences.',
      category: 'Full Stack',
      tags: ['React', 'Node.js', 'TypeScript', 'AWS', 'OpenAI', 'PostgreSQL', 'Redis'],
      stats: {
        'Users': '100K+',
        'Uptime': '99.9%',
        'Response': '<200ms',
      },
      featured: true,
      order: 0,
    },
    {
      title: 'Real-Time Analytics Dashboard',
      description: 'Built enterprise-grade analytics platform processing 1M+ events/day. Implemented WebSocket connections for real-time data visualization. Designed responsive UI with advanced charting and filtering capabilities.',
      category: 'Dashboard',
      tags: ['Next.js', 'TypeScript', 'Socket.io', 'D3.js', 'MongoDB', 'Docker'],
      stats: {
        'Events/Day': '1M+',
        'Latency': '<50ms',
        'Charts': '20+',
      },
      featured: true,
      order: 1,
    },
    {
      title: 'E-Commerce SaaS Platform',
      description: 'Developed multi-tenant e-commerce platform with custom checkout flows, inventory management, and payment processing. Integrated Stripe, automated order fulfillment, and built admin dashboard for merchant management.',
      category: 'SaaS Platform',
      tags: ['React', 'Express', 'Stripe', 'PostgreSQL', 'AWS S3', 'Tailwind CSS'],
      stats: {
        'Merchants': '500+',
        'Transactions': '$2M+',
        'Conversion': '12%',
      },
      featured: false,
      order: 2,
    },
  ]

  for (const projectData of projects) {
    await prisma.project.upsert({
      where: { id: `project-${projectData.order}` },
      update: {},
      create: {
        id: `project-${projectData.order}`,
        ...projectData,
      },
    })
  }
  console.log(`✅ ${projects.length} projects created`)

  // Experiences — update via admin panel for your real data
  const experiences = [
    {
      company: 'Spirit AI',
      position: 'Founding Engineer',
      startDate: '2024',
      endDate: null,
      current: true,
      description: 'Architecting scalable AI-powered applications from the ground up. Leading full-stack development with Next.js, Python, and cloud infrastructure.',
      order: 0,
    },
    {
      company: 'BYJU\'S',
      position: 'Software Engineer',
      startDate: '2021',
      endDate: '2024',
      current: false,
      description: 'Built learning systems impacting millions of students worldwide. Designed APIs handling 100K+ concurrent users with sub-200ms response times.',
      order: 1,
    },
  ]

  for (const expData of experiences) {
    await prisma.experience.upsert({
      where: { id: `exp-${expData.order}` },
      update: {},
      create: {
        id: `exp-${expData.order}`,
        ...expData,
      },
    })
  }
  console.log(`✅ ${experiences.length} experiences created`)

  // Skills with LOCAL image paths from /public/images/
  // You can upload your tech logo images to /public/images/ folder
  // Naming convention: /images/react.webp, /images/nextjs.webp, etc.
  const skills = [
    // Frontend Technologies
    { 
      name: 'React', 
      category: 'Frontend', 
      level: 95, 
      order: 0,
      logoUrl: '/images/react.svg'
    },
    { 
      name: 'Next.js', 
      category: 'Frontend', 
      level: 92, 
      order: 1,
      logoUrl: '/images/nextjs.svg'
    },
    { 
      name: 'TypeScript', 
      category: 'Frontend', 
      level: 95, 
      order: 2,
      logoUrl: '/images/typescript.svg'
    },
    { 
      name: 'JavaScript', 
      category: 'Frontend', 
      level: 98, 
      order: 3,
      logoUrl: '/images/javascript.svg'
    },
    { 
      name: 'Tailwind CSS', 
      category: 'Frontend', 
      level: 90, 
      order: 4,
      logoUrl: '/images/tailwindcss.svg'
    },
    { 
      name: 'HTML5', 
      category: 'Frontend', 
      level: 98, 
      order: 5,
      logoUrl: '/images/html5.svg'
    },
    { 
      name: 'CSS3', 
      category: 'Frontend', 
      level: 95, 
      order: 6,
      logoUrl: '/images/css.svg'
    },
    { 
      name: 'Three.js', 
      category: 'Frontend', 
      level: 95, 
      order: 7,
      logoUrl: '/images/three.svg'
    },
    
    // Backend Technologies
    { 
      name: 'Python', 
      category: 'Backend', 
      level: 85, 
      order: 8,
      logoUrl: '/images/python.svg'
    },
    { 
      name: 'FastAPI', 
      category: 'Backend', 
      level: 82, 
      order: 9,
      logoUrl: '/images/fastapi.svg'
    },
    { 
      name: 'Django', 
      category: 'Backend', 
      level: 82, 
      order: 10,
      logoUrl: '/images/django.svg'
    },
    { 
      name: 'Ruby', 
      category: 'Backend', 
      level: 82, 
      order: 11,
      logoUrl: '/images/ruby.svg'
    },
    { 
      name: 'C++', 
      category: 'Backend', 
      level: 82, 
      order: 12,
      logoUrl: '/images/cplusplus.svg'
    },
    
    // Databases
    { 
      name: 'PostgreSQL', 
      category: 'Database', 
      level: 88, 
      order: 13,
      logoUrl: '/images/postgresql.svg'
    },
    { 
      name: 'MongoDB', 
      category: 'Database', 
      level: 90, 
      order: 14,
      logoUrl: '/images/mongodb.svg'
    },
    { 
      name: 'Redis', 
      category: 'Database', 
      level: 82, 
      order: 15,
      logoUrl: '/images/redis.svg'
    },
    
    // Cloud & DevOps
    { 
      name: 'AWS', 
      category: 'Cloud & DevOps', 
      level: 85, 
      order: 16,
      logoUrl: '/images/aws.png'
    },
    { 
      name: 'Docker', 
      category: 'Cloud & DevOps', 
      level: 88, 
      order: 17,
      logoUrl: '/images/docker.svg'
    },
    { 
      name: 'GitHub Actions', 
      category: 'Cloud & DevOps', 
      level: 85, 
      order: 18,
      logoUrl: '/images/githubactions.svg'
    },
    { 
      name: 'Git', 
      category: 'Cloud & DevOps', 
      level: 95, 
      order: 19,
      logoUrl: '/images/git.svg'
    },
    { 
      name: 'Sentry', 
      category: 'Cloud & DevOps', 
      level: 95, 
      order: 20,
      logoUrl: '/images/sentry.svg'
    },
    { 
      name: 'Prometheus', 
      category: 'Cloud & DevOps', 
      level: 80, 
      order: 21,
      logoUrl: '/images/prometheus.svg'
    },
  ]

  for (const skillData of skills) {
    await prisma.skill.upsert({
      where: { id: `skill-${skillData.order}` },
      update: {},
      create: {
        id: `skill-${skillData.order}`,
        ...skillData,
      },
    })
  }
  console.log(`✅ ${skills.length} skills created`)

  // Education
  const educationData = [
    {
      school: 'University of Maryland, Baltimore County',
      degree: 'Master of Science',
      field: 'Software Engineering',
      gpa: '3.91 / 4.0',
      startDate: '2019',
      endDate: '2021',
      current: false,
      description: 'Research focus on distributed systems, software architecture, and scalable cloud-native applications. Completed thesis on real-time data pipeline optimization.',
      coursework: [
        'Distributed Systems',
        'Software Architecture',
        'Cloud Computing',
        'Machine Learning',
        'Database Management',
        'Agile Development',
        'Algorithm Design',
      ],
      order: 0,
    },
  ]

  for (const eduData of educationData) {
    await prisma.education.upsert({
      where: { id: `edu-${eduData.order}` },
      update: {},
      create: {
        id: `edu-${eduData.order}`,
        ...eduData,
      },
    })
  }
  console.log(`✅ ${educationData.length} education entries created`)

  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })