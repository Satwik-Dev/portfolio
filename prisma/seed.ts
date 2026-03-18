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

  // ─── PROFILE ─────────────────────────────────────────────────────────────────
  const profile = await prisma.profile.upsert({
    where: { id: 'default-profile' },
    update: {},
    create: {
      id: 'default-profile',
      name: 'Satwik Alla',
      title: 'FULL STACK SOFTWARE ENGINEER',
      subtitle: 'Building scalable systems that matter',
      bio: `I build AI systems that don't just work — they scale. As the founding engineer at Spirit AI, I architected the entire tech stack from scratch: backend infrastructure with FastAPI and PostgreSQL delivering sub-200ms API responses, responsive web applications with Next.js and Three.js implementing real-time WebSocket communication, and complete DevOps pipelines with Docker and automated CI/CD.

My journey started at BYJU'S during the pandemic peak, where I designed 20+ RESTful and GraphQL APIs supporting 100K+ concurrent users across three educational platforms. I engineered middleware that slashed API response times by 30%, migrated email systems to AWS SES boosting delivery rates from 85% to 98%, and learned that scaling isn't just about handling more users — it's about maintaining performance while everything grows exponentially.

With a Master's in Software Engineering at UMBC (3.91 GPA) and a BTech from IIT Bhubaneswar, I specialize in architecting production-grade systems that handle massive scale, rapid full-stack development, real-time communication infrastructure, and AI application development.`,
      email: 'allasatwik93@gmail.com',
      phone: '14109054899',
      location: 'New York City Metropolitan Area',
      github: 'https://github.com/Satwik-Dev',
      linkedin: 'https://www.linkedin.com/in/satwik-alla',
      twitter: null,
      
      // Hero Stats
      yearsExperience: '3+',
      projectsDelivered: '10+',
      clientSatisfaction: '99%',
      
      // About Section — Recruiter-focused achievement metrics
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
      metric4Label: 'APIs Designed & Deployed',
    },
  })
  console.log('✅ Profile created')

  // ─── PROJECTS ────────────────────────────────────────────────────────────────
  const projects = [
    {
      title: 'SBOM Manager',
      description: 'A cloud-hosted full-stack platform for generating, managing, and analyzing Software Bills of Materials across iOS, Android, macOS, Windows, and Linux. Features automated vulnerability scanning powered by Anchore Syft, SPDX/CycloneDX export, interactive dashboards, and JWT-secured authentication with Supabase.',
      category: 'Supply Chain Security',
      tags: ['FastAPI', 'React 19', 'TypeScript', 'Supabase', 'PostgreSQL', 'Anchore Syft', 'Tailwind CSS', 'Zustand'],
      demoUrl: 'https://sbommanager.vercel.app',
      githubUrl: 'https://github.com/Satwik-Dev/SBOM_manager_final',
      stats: {
        'Lines of Code': '15K+',
        'API Endpoints': '20+',
        'Platforms': '5',
        'Export Formats': '2',
      },
      featured: true,
      order: 0,
    },
    {
      title: 'Quiz Planner',
      description: 'An intelligent learning management system leveraging Google Gemini AI to automatically generate customized quizzes from study materials. Features real-time grading with instant feedback, performance analytics dashboards, multiple question types (MCQ, True/False, Short Answer), and an NLP-based fallback engine when the API is unavailable.',
      category: 'AI-Powered EdTech',
      tags: ['Flask', 'React 19', 'MongoDB', 'Google Gemini', 'JWT', 'Python', 'Bootstrap', 'REST API'],
      demoUrl: 'https://quiz-planner-frontend.vercel.app',
      githubUrl: 'https://github.com/Satwik-Dev/Quiz-Planner',
      stats: {
        'Lines of Code': '8K+',
        'API Endpoints': '15+',
        'Question Types': '3',
        'AI Model': 'Gemini 2.0',
      },
      featured: true,
      order: 1,
    },
    {
      title: 'CDC Streaming Pipeline',
      description: 'A production-grade real-time Change Data Capture pipeline that streams database changes from PostgreSQL through Debezium and Apache Kafka into HDFS for analytics. Orchestrated with Apache Airflow DAGs, fully containerized with Docker Compose (10+ services), and includes Hive for SQL-based querying on streamed data.',
      category: 'Data Engineering',
      tags: ['PostgreSQL', 'Debezium', 'Apache Kafka', 'HDFS', 'Apache Airflow', 'Hive', 'Docker', 'Python'],
      demoUrl: null,
      githubUrl: 'https://github.com/Satwik-Dev/cdc-streaming-pipeline',
      stats: {
        'Docker Services': '10+',
        'Pipeline': 'Real-time CDC',
        'Orchestration': 'Airflow DAGs',
        'Analytics': 'Hive SQL',
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

  // ─── EXPERIENCES ─────────────────────────────────────────────────────────────
  const experiences = [
    {
      company: 'Cosmo AGI, LLC / Spirit AI',
      position: 'Lead Software Engineer / Founding Engineer',
      startDate: 'Oct 2025',
      endDate: null,
      current: true,
      description: 'Architecting production backend with FastAPI, PostgreSQL, Redis, and vector DB delivering sub-200ms APIs. Built responsive web app with Next.js 14, React 18, TypeScript, and Three.js with real-time WebSocket streaming. Established DevOps with Docker, CI/CD on Vercel, and Sentry/Prometheus monitoring.',
      order: 0,
    },
    {
      company: 'University of Maryland Baltimore County',
      position: 'Software Engineering Graduate Assistant',
      startDate: 'Jan 2025',
      endDate: 'Dec 2025',
      current: false,
      description: 'Conducted research on the Digital Nutrition Label project for ethical software transparency. Developed Python automation scripts evaluating software ethics across 56 technical attributes for 25 wellness applications. Assessed 50+ assignments and supported 30+ graduate students as a teaching assistant.',
      order: 1,
    },
    {
      company: 'BYJU\'S',
      position: 'Software Development Engineer',
      startDate: 'Jun 2022',
      endDate: 'May 2023',
      current: false,
      description: 'Designed 20+ RESTful and GraphQL APIs for 3 educational platforms supporting 100K+ concurrent users with 99.5% uptime. Engineered middleware reducing API response time by 30%. Migrated email system to AWS SES improving delivery rates from 85% to 98%.',
      order: 2,
    },
    {
      company: 'ODC — Odisha Design Council',
      position: 'Web Developer',
      startDate: 'Jan 2022',
      endDate: 'Jun 2022',
      current: false,
      description: 'Built full-stack event management platform with React.js and PostgreSQL for a statewide design conference showcasing 50+ speakers. Implemented registration system for 500+ attendees with real-time seat tracking. Led team of 5 developers through agile sprints.',
      order: 3,
    },
    {
      company: 'Ceremorphic, Inc.',
      position: 'Microprocessor Designer Intern',
      startDate: 'May 2021',
      endDate: 'Jul 2021',
      current: false,
      description: 'Designed timing optimization algorithms for Floating Point Units using C and Assembly language. Collaborated on RISC-V processor pipeline architecture with design validation and simulation testing.',
      order: 4,
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

  // ─── SKILLS ──────────────────────────────────────────────────────────────────
  // Images will be uploaded to /public/images/ as skill.png or skill.svg
  const skills = [
    // Languages
    { name: 'Python', category: 'Languages', level: 95, order: 0, logoUrl: '/images/python.png' },
    { name: 'Java', category: 'Languages', level: 85, order: 1, logoUrl: '/images/java.png' },
    { name: 'JavaScript', category: 'Languages', level: 95, order: 2, logoUrl: '/images/javascript.svg' },
    { name: 'TypeScript', category: 'Languages', level: 95, order: 3, logoUrl: '/images/typescript.svg' },
    { name: 'Ruby', category: 'Languages', level: 80, order: 4, logoUrl: '/images/ruby.svg' },
    { name: 'C', category: 'Languages', level: 75, order: 5, logoUrl: '/images/c.png' },
    { name: 'C++', category: 'Languages', level: 78, order: 6, logoUrl: '/images/cplusplus.svg' },
    { name: 'HTML', category: 'Languages', level: 98, order: 7, logoUrl: '/images/html.svg' },
    { name: 'CSS', category: 'Languages', level: 95, order: 8, logoUrl: '/images/css.svg' },

    // Frontend
    { name: 'React.js', category: 'Frontend', level: 95, order: 9, logoUrl: '/images/react.svg' },
    { name: 'Next.js', category: 'Frontend', level: 92, order: 10, logoUrl: '/images/nextjs.svg' },
    { name: 'Three.js', category: 'Frontend', level: 80, order: 11, logoUrl: '/images/three.svg' },
    { name: 'Tailwind CSS', category: 'Frontend', level: 92, order: 12, logoUrl: '/images/tailwindcss.svg' },

    // Backend
    { name: 'Node.js', category: 'Backend', level: 90, order: 13, logoUrl: '/images/nodejs.png' },
    { name: 'FastAPI', category: 'Backend', level: 90, order: 14, logoUrl: '/images/fastapi.svg' },
    { name: 'Django', category: 'Backend', level: 82, order: 15, logoUrl: '/images/django.svg' },
    { name: 'Flask', category: 'Backend', level: 85, order: 16, logoUrl: '/images/flask.png' },
    { name: 'Ruby on Rails', category: 'Backend', level: 80, order: 17, logoUrl: '/images/rubyonrails.png' },
    { name: 'RESTful API', category: 'Backend', level: 95, order: 18, logoUrl: '/images/restapi.png' },

    // Databases
    { name: 'PostgreSQL', category: 'Databases', level: 92, order: 19, logoUrl: '/images/postgresql.svg' },
    { name: 'Redis', category: 'Databases', level: 82, order: 20, logoUrl: '/images/redis.svg' },
    { name: 'MongoDB', category: 'Databases', level: 88, order: 21, logoUrl: '/images/mongodb.svg' },
    { name: 'Supabase', category: 'Databases', level: 85, order: 22, logoUrl: '/images/supabase.png' },

    // Cloud & DevOps
    { name: 'Docker', category: 'Cloud & DevOps', level: 88, order: 23, logoUrl: '/images/docker.svg' },
    { name: 'AWS', category: 'Cloud & DevOps', level: 85, order: 24, logoUrl: '/images/aws.png' },
    { name: 'GCP', category: 'Cloud & DevOps', level: 75, order: 25, logoUrl: '/images/gcp.png' },
    { name: 'Git', category: 'Cloud & DevOps', level: 95, order: 26, logoUrl: '/images/git.svg' },
    { name: 'GitHub Actions', category: 'Cloud & DevOps', level: 85, order: 27, logoUrl: '/images/githubactions.svg' },

    // Tools & Platforms
    { name: 'Sentry', category: 'Tools & Platforms', level: 82, order: 28, logoUrl: '/images/sentry.svg' },
    { name: 'Prometheus', category: 'Tools & Platforms', level: 78, order: 29, logoUrl: '/images/prometheus.svg' },
    { name: 'VS Code', category: 'Tools & Platforms', level: 95, order: 30, logoUrl: '/images/vscode.png' },
    { name: 'Figma', category: 'Tools & Platforms', level: 75, order: 31, logoUrl: '/images/figma.png' },
    { name: 'Postman', category: 'Tools & Platforms', level: 90, order: 32, logoUrl: '/images/postman.png' },

    // AI & Data
    { name: 'LLMs', category: 'AI & Data', level: 85, order: 33, logoUrl: '/images/llms.png' },
    { name: 'Apache Kafka', category: 'AI & Data', level: 78, order: 34, logoUrl: '/images/kafka.png' },
    { name: 'Apache Airflow', category: 'AI & Data', level: 75, order: 35, logoUrl: '/images/airflow.png' },
    { name: 'Prisma', category: 'AI & Data', level: 88, order: 36, logoUrl: '/images/prisma.png' },
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

  // ─── EDUCATION ───────────────────────────────────────────────────────────────
  const educationData = [
    {
      school: 'University of Maryland, Baltimore County',
      degree: 'Master of Science',
      field: 'Software Engineering',
      gpa: '3.91 / 4.0',
      startDate: 'Jan 2024',
      endDate: 'Dec 2025',
      current: false,
      description: 'Research on ethical software development through the Digital Nutrition Label project. Graduate Assistant in Software Engineering Capstone course. Focus on distributed systems, AI integration, and scalable cloud-native architecture.',
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
    {
      school: 'IIT Bhubaneswar',
      degree: 'Bachelor of Technology',
      field: 'Electrical Engineering',
      gpa: '3.2/4.0',
      startDate: 'July 2018',
      endDate: 'May 2022',
      current: false,
      description: 'Strong foundation in engineering fundamentals, algorithms, and low-level systems. E-Summit Publicity Coordinator. Transitioned into software engineering with web development and microprocessor design projects.',
      coursework: [
        'Data Structures & Algorithms',
        'Computer Networks',
        'Digital Signal Processing',
        'Microprocessor Design',
        'Control Systems',
        'Embedded Systems',
      ],
      order: 1,
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