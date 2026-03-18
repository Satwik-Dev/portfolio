# Satwik Alla — Developer Portfolio

A cinematic developer portfolio with 3D interactive physics, scroll animations, and a database-driven admin panel for content management.

🔗 **Live:** [portfolio-satwikalla.vercel.app](https://portfolio-satwikalla.vercel.app)

---

## Tech Stack

Next.js 14 · React 18 · TypeScript · Tailwind CSS · Three.js · React Three Fiber · Rapier Physics · Framer Motion · GSAP · Prisma · PostgreSQL (Neon) · NextAuth.js · EmailJS · Vercel

## Features

- 3D physics-based tech stack section with logo-textured floating spheres
- Cinematic hero with 16-layer image blending and scan line animations
- Full admin panel with JWT auth for managing all content (profile, projects, skills, experience, education)
- Contact form delivering messages to inbox via EmailJS
- Fully responsive with custom cursor, grain overlay, and neural field background

## Setup

```bash
npm install --legacy-peer-deps
cp .env.example .env       # Add your database URL, admin credentials, EmailJS keys
npx prisma migrate dev
npx prisma db seed
npm run dev
```

## Author

**Satwik Alla** · [LinkedIn](https://www.linkedin.com/in/satwik-alla) · [GitHub](https://github.com/Satwik-Dev) · allasatwik93@gmail.com

## License

MIT License · © 2025 Satwik Alla