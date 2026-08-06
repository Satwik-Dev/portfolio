import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create admin user
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env')
  }
  
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)
  
  const user = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
    },
  })
  console.log('✅ Admin user created:', user.email)

  // ─── PROFILE ─────────────────────────────────────────────────────────────────
  const profileData = {
      name: 'Satwik Alla',
      title: 'AI ENGINEER',
      subtitle: 'Shipping production LLM systems that people actually use',
      bio: `Most engineers call a model. I own everything around the call. As the founding AI Engineer at Cosmo AGI, I built the AI systems behind a companion product end to end: long-term episodic memory with RAG over Qdrant and pgvector, a Redis semantic cache that cut p95 latency 40%, and a token-budgeting engine that cut token costs 30%, all on a FastAPI backend I grew from an empty repo to 64 endpoints and 19 Postgres tables.

That instinct came from BYJU'S, where scaling wasn't optional, it was survival. I owned the backend behind three K-12 platforms handling 100K+ daily requests, collapsed a three-tier architecture to cut API latency 35% and compute cost 20%, and held the on-call pager for all of it. When everything around you is growing exponentially, you learn to build foundations that hold.

UMBC Master's in Software Engineering, 3.91 GPA. IIT Bhubaneswar BTech. I specialize in retrieval, memory, cost, latency, and safety, the layers that turn a raw model into a product that ships and stays standing.`,
      email: 'allasatwik4@gmail.com',
      phone: '14109054899',
      location: 'Washington DC-Baltimore Area',
      github: 'https://github.com/Satwik-Dev',
      linkedin: 'https://www.linkedin.com/in/satwik-alla',
      twitter: null,
      
      // Hero Stats
      yearsExperience: '3+',
      projectsDelivered: '10+',
      clientSatisfaction: '99%',
      
      // About Section
      avatarUrl: '/profile-photo.png',
      aboutTitle: 'Building the future, one system at a time.',
      aboutBadge: 'Founding AI Engineer @ Cosmo AGI',
      metric1Value: '40%',
      metric1Label: 'p95 Latency Reduction',
      metric2Value: '64',
      metric2Label: 'API Endpoints Built',
      metric3Value: '3.91',
      metric3Label: 'GPA @ UMBC',
      metric4Value: '100K+',
      metric4Label: 'Daily Requests Served',
  }

  const profile = await prisma.profile.upsert({
    where: { id: 'default-profile' },
    update: profileData,
    create: { id: 'default-profile', ...profileData },
  })
  console.log('✅ Profile created')

  // ─── PROJECTS ────────────────────────────────────────────────────────────────
  const projects = [
    {
      title: 'SBOM Manager',
      description: 'A cloud-hosted full-stack platform for generating, managing, and analyzing Software Bills of Materials across iOS, Android, macOS, Windows, and Linux. Features automated vulnerability scanning powered by Anchore Syft, SPDX/CycloneDX export, interactive dashboards, and JWT-secured authentication with Supabase.',
      category: 'Supply Chain Security',
      tags: ['FastAPI', 'React 19', 'TypeScript', 'Supabase', 'PostgreSQL', 'Anchore Syft', 'Tailwind CSS', 'Zustand'],
      imageUrl: '/sbom.png',
      demoUrl: 'https://sbommanager.vercel.app',
      githubUrl: 'https://github.com/Satwik-Dev/SBOM_manager_final',
      stats: {
        'Platforms': '5',
        'API Endpoints': '20+',
        'Lines of Code': '15K+',
        'Export Formats': '2',
      },
      featured: true,
      order: 0,
    },
    {
      title: 'AI Quiz Planner',
      description: 'A full-stack RAG-powered learning platform that converts unstructured study materials into tailored quizzes and real-time tutoring. Built an end-to-end retrieval pipeline with LangChain, vector embeddings, and low-latency similarity search over a vector store, with an LLM generating structured JSON quiz schemas and step-by-step explanations. Includes a context-aware chatbot with multi-turn memory.',
      category: 'AI / RAG Systems',
      tags: ['FastAPI', 'LangChain', 'RAG', 'Vector Search', 'React', 'TypeScript', 'Python', 'LLMs'],
      imageUrl: '/quiz-planner.png',
      demoUrl: 'https://quiz-planner-frontend.vercel.app',
      githubUrl: 'https://github.com/Satwik-Dev/Quiz-Planner',
      stats: {
        'Architecture': 'RAG Pipeline',
        'Retrieval': 'Vector Search',
        'Question Types': '3',
        'Chat': 'Multi-turn Memory',
      },
      featured: true,
      order: 1,
    },
    {
      title: 'CDC Streaming Pipeline',
      description: 'A production-grade real-time Change Data Capture pipeline that streams database changes from PostgreSQL through Debezium and Apache Kafka into HDFS for analytics. Orchestrated with Apache Airflow DAGs, fully containerized with Docker Compose (10+ services), and includes Hive for SQL-based querying on streamed data.',
      category: 'Data Engineering',
      tags: ['PostgreSQL', 'Debezium', 'Apache Kafka', 'HDFS', 'Apache Airflow', 'Hive', 'Docker', 'Python'],
      imageUrl: '/cdc.png',
      demoUrl: null,
      githubUrl: 'https://github.com/Satwik-Dev/cdc-streaming-pipeline',
      stats: {
        'Pipeline': 'Real-time CDC',
        'Analytics': 'Hive SQL',
        'Orchestration': 'Airflow DAGs',
        'Docker Services': '10+',
      },
      featured: false,
      order: 2,
    },
  ]

  for (const projectData of projects) {
    await prisma.project.upsert({
      where: { id: `project-${projectData.order}` },
      update: projectData,
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
      company: 'Cosmo AGI',
      position: 'AI Engineer',
      startDate: 'Jun 2025',
      endDate: null,
      current: true,
      description: 'Founding AI engineer on a companion AI product, owning the AI systems end to end: retrieval, memory, caching, model routing, and safety. Architected long-term episodic memory with RAG over Qdrant and pgvector using automated fact extraction and top-k semantic retrieval. Built a Redis semantic cache that skips redundant LLM calls, cutting p95 inference latency 40%, and a context-pruning and token-budgeting engine that cut token costs 30%. Put OpenAI and Gemini behind a single streaming interface for per-persona routing, plus a real-time safety pipeline for moderation, prompt-injection mitigation, and self-harm crisis detection. Built the FastAPI backend from an empty repo to 64 endpoints and 19 Postgres tables on GCP.',
      order: 0,
    },
    {
      company: 'University of Maryland Baltimore County',
      position: 'Teaching Assistant',
      startDate: 'Jan 2025',
      endDate: 'May 2025',
      current: false,
      description: 'Teaching assistant for the SENG 701 Software Engineering Capstone. Directed 10+ student engineering squads through 5-month end-to-end SDLCs for production-grade applications, running weekly sprint reviews, architecture evaluations, and Agile/Scrum ceremonies. Conducted weekly code reviews and architectural audits across Python, Node.js, React, and cloud-hosted systems, mentoring teams on REST API design, model inference integration, data-pipeline structuring, and cloud deployment (AWS/GCP).',
      order: 1,
    },
    {
      company: 'BYJU\'S',
      position: 'Software Development Engineer',
      startDate: 'Jun 2022',
      endDate: 'Dec 2023',
      current: false,
      description: 'Engineered high-throughput Python (Django REST Framework) backend microservices serving three K-12 and test-prep platforms across Andhra Pradesh and Telangana, supporting 30,000 to 100,000+ daily requests under sub-100ms latency SLAs. Led the migration that collapsed a legacy three-tier monolithic middleware architecture, cutting API latency 35% and cloud compute cost 20%. Redesigned schema indexes and query plans across Amazon RDS (PostgreSQL) and MongoDB, reducing bottlenecks 40%. Containerized services with Docker on Kubernetes (EKS), and held the on-call rotation at 99.95% uptime via Prometheus, Grafana, and Coralogix.',
      order: 2,
    },
    {
      company: 'ODC - Odisha Design Council',
      position: 'Full-Stack Software Engineer',
      startDate: 'Jan 2022',
      endDate: 'Jun 2022',
      current: false,
      description: 'Architected and delivered a full-stack web application for a statewide design conference, with real-time seat tracking and registration for 500+ attendees, using React, Next.js, and Tailwind CSS. Built concurrent-safe RESTful backend services in Python and Django REST Framework, using transactional locking and custom indexing to eliminate race conditions during registration spikes. Led a team of 5 developers, established code-review and Git workflows, and shipped ahead of launch on AWS with Docker and GitHub Actions CI/CD.',
      order: 3,
    },
    {
      company: 'Ceremorphic, Inc.',
      position: 'Microprocessor Designer Intern',
      startDate: 'May 2021',
      endDate: 'Jul 2021',
      current: false,
      description: 'Designed timing optimization algorithms for Floating Point Units using C and Assembly. Collaborated on RISC-V processor pipeline architecture with design validation and simulation testing for next-gen microprocessor components.',
      order: 4,
    },
  ]

  for (const expData of experiences) {
    await prisma.experience.upsert({
      where: { id: `exp-${expData.order}` },
      update: expData,
      create: {
        id: `exp-${expData.order}`,
        ...expData,
      },
    })
  }
  console.log(`✅ ${experiences.length} experiences created`)

  // ─── SKILLS ──────────────────────────────────────────────────────────────────
  // All images in /public/images/ — filenames match actual files in repo
  const skills = [
    // AI / ML & LLM Systems  (evidence: Cosmo AGI, AI Quiz Planner)
    { name: 'LLM Orchestration', category: 'AI / ML & LLM Systems', level: 92, order: 0, logoUrl: '/images/llms.jpg' },
    { name: 'RAG', category: 'AI / ML & LLM Systems', level: 92, order: 1, logoUrl: null },
    { name: 'Embeddings', category: 'AI / ML & LLM Systems', level: 90, order: 2, logoUrl: null },
    { name: 'Vector Search', category: 'AI / ML & LLM Systems', level: 90, order: 3, logoUrl: null },
    { name: 'LangChain', category: 'AI / ML & LLM Systems', level: 85, order: 4, logoUrl: null },
    { name: 'LlamaIndex', category: 'AI / ML & LLM Systems', level: 80, order: 5, logoUrl: null },
    { name: 'OpenAI APIs', category: 'AI / ML & LLM Systems', level: 90, order: 6, logoUrl: null },
    { name: 'Gemini Multimodal', category: 'AI / ML & LLM Systems', level: 85, order: 7, logoUrl: null },
    { name: 'Whisper (STT/TTS)', category: 'AI / ML & LLM Systems', level: 80, order: 8, logoUrl: null },
    { name: 'Semantic Caching', category: 'AI / ML & LLM Systems', level: 88, order: 9, logoUrl: null },
    { name: 'Token Management', category: 'AI / ML & LLM Systems', level: 88, order: 10, logoUrl: null },
    { name: 'AI Safety & Moderation', category: 'AI / ML & LLM Systems', level: 82, order: 11, logoUrl: null },
    { name: 'LLMOps', category: 'AI / ML & LLM Systems', level: 85, order: 12, logoUrl: null },

    // Vector & Databases
    { name: 'Qdrant', category: 'Vector & Databases', level: 88, order: 13, logoUrl: null },
    { name: 'pgvector', category: 'Vector & Databases', level: 88, order: 14, logoUrl: null },
    { name: 'Pinecone / FAISS', category: 'Vector & Databases', level: 82, order: 15, logoUrl: null },
    { name: 'PostgreSQL', category: 'Vector & Databases', level: 92, order: 16, logoUrl: '/images/postgresql.png' },
    { name: 'Redis', category: 'Vector & Databases', level: 85, order: 17, logoUrl: '/images/redis.png' },
    { name: 'MongoDB', category: 'Vector & Databases', level: 85, order: 18, logoUrl: '/images/mongodb.png' },

    // Backend & APIs
    { name: 'Python', category: 'Backend & APIs', level: 95, order: 19, logoUrl: '/images/python.jpg' },
    { name: 'FastAPI', category: 'Backend & APIs', level: 92, order: 20, logoUrl: '/images/fastapi.png' },
    { name: 'Django REST', category: 'Backend & APIs', level: 88, order: 21, logoUrl: '/images/django.png' },
    { name: 'Flask', category: 'Backend & APIs', level: 82, order: 22, logoUrl: '/images/flask.png' },
    { name: 'WebSockets', category: 'Backend & APIs', level: 85, order: 23, logoUrl: null },
    { name: 'Celery', category: 'Backend & APIs', level: 80, order: 24, logoUrl: null },
    { name: 'RESTful API', category: 'Backend & APIs', level: 95, order: 25, logoUrl: '/images/restfulapi.png' },
    { name: 'Node.js', category: 'Backend & APIs', level: 82, order: 26, logoUrl: '/images/nodejs.png' },

    // Data Engineering  (evidence: CDC Streaming Pipeline)
    { name: 'Apache Kafka', category: 'Data Engineering', level: 80, order: 27, logoUrl: '/images/kafka.png' },
    { name: 'PySpark', category: 'Data Engineering', level: 78, order: 28, logoUrl: null },
    { name: 'Debezium (CDC)', category: 'Data Engineering', level: 75, order: 29, logoUrl: null },
    { name: 'Hadoop / HDFS', category: 'Data Engineering', level: 72, order: 30, logoUrl: null },
    { name: 'Apache Airflow', category: 'Data Engineering', level: 75, order: 31, logoUrl: '/images/airflow.png' },

    // Cloud & DevOps
    { name: 'GCP', category: 'Cloud & DevOps', level: 82, order: 32, logoUrl: '/images/gcp.png' },
    { name: 'AWS', category: 'Cloud & DevOps', level: 85, order: 33, logoUrl: '/images/aws.png' },
    { name: 'Docker', category: 'Cloud & DevOps', level: 88, order: 34, logoUrl: '/images/docker.png' },
    { name: 'Kubernetes', category: 'Cloud & DevOps', level: 78, order: 35, logoUrl: null },
    { name: 'CI/CD', category: 'Cloud & DevOps', level: 85, order: 36, logoUrl: '/images/githubactions.png' },
    { name: 'Prometheus', category: 'Cloud & DevOps', level: 78, order: 37, logoUrl: '/images/prometheus.png' },
    { name: 'Sentry', category: 'Cloud & DevOps', level: 80, order: 38, logoUrl: '/images/sentry.png' },

    // Frontend & Languages
    { name: 'TypeScript', category: 'Frontend & Languages', level: 90, order: 39, logoUrl: '/images/typescript.png' },
    { name: 'JavaScript', category: 'Frontend & Languages', level: 92, order: 40, logoUrl: '/images/javascript.png' },
    { name: 'React.js', category: 'Frontend & Languages', level: 90, order: 41, logoUrl: '/images/react.png' },
    { name: 'Next.js', category: 'Frontend & Languages', level: 88, order: 42, logoUrl: '/images/nextjs.png' },
    { name: 'Tailwind CSS', category: 'Frontend & Languages', level: 88, order: 43, logoUrl: '/images/tailwindcss.png' },
    { name: 'Java', category: 'Frontend & Languages', level: 78, order: 44, logoUrl: '/images/java.png' },
    { name: 'C / C++', category: 'Frontend & Languages', level: 72, order: 45, logoUrl: '/images/cplusplus.png' },
  ]

  for (const skillData of skills) {
    await prisma.skill.upsert({
      where: { id: `skill-${skillData.order}` },
      update: skillData,
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
      description: 'Teaching assistant for the Software Engineering Capstone course, mentoring 30+ graduate students. Volunteered as research assistant on the Digital Nutrition Label project, evaluating ethical software practices. Coursework focused on distributed systems, AI integration, and scalable cloud-native architecture.',
      coursework: [
        'Advanced Software Engineering',
        'Software Testing & Quality Assurance',
        'Systems Analysis & Design',
        'Software Process Management',
        'Management & Leadership',
        'Software Engineering for AI',
        'Data Engineering',
      ],
      order: 0,
    },
    {
      school: 'Indian Institute of Technology Bhubaneswar',
      degree: 'Bachelor of Technology',
      field: 'Electrical Engineering',
      gpa: '8.03 / 10.0',
      startDate: 'Jul 2018',
      endDate: 'May 2022',
      current: false,
      description: 'Strong foundation in engineering fundamentals, algorithms, and low-level systems. E-Summit Publicity Coordinator. Transitioned into software engineering with web development and microprocessor design projects.',
      coursework: [
        'Data Structures & Algorithms',
        'Digital Signal Processing',
        'Advanced Computer Architecture',
      ],
      order: 1,
    },
  ]

  for (const eduData of educationData) {
    await prisma.education.upsert({
      where: { id: `edu-${eduData.order}` },
      update: eduData,
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