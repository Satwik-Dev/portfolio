'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import emailjs from '@emailjs/browser'
import SectionWrapper from '@/components/ui/SectionWrapper'
import MagneticButton from '@/components/ui/MagneticButton'
import GradientText from '@/components/ui/GradientText'

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  subject: z.string().min(2, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactForm = z.infer<typeof contactSchema>

interface ContactProps {
  email: string
  phone: string | null
  linkedin: string | null
  github: string | null
}

export default function Contact({ email: contactEmail, phone, linkedin, github }: ContactProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactForm) => {
    setStatus('sending')
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      setStatus('sent')
      reset()
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const socials = [
    {
      label: contactEmail,
      href: `mailto:${contactEmail}`,
      icon: (
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
    linkedin && {
      label: 'LinkedIn',
      href: linkedin,
      icon: (
        <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.45 20.45H16.9v-5.57c0-1.33-.02-3.04-1.85-3.04s-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
        </svg>
      ),
    },
    github && {
      label: 'GitHub',
      href: github,
      icon: (
        <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .1-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.14 3 .4c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
    phone && {
      label: `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`,
      href: `tel:${phone}`,
      icon: (
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.81.36 1.6.68 2.34a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.74.32 1.53.55 2.34.68A2 2 0 0122 16.92z" />
        </svg>
      ),
    },
  ].filter(Boolean) as { label: string; href: string; icon: React.ReactNode }[]

  return (
    <SectionWrapper id="contact">
      <div className="max-w-[900px] mx-auto text-center">
        <div className="sr flex items-center gap-4 font-mono text-[0.68rem] text-accent tracking-[0.3em] uppercase mb-4 justify-center">
          <span className="w-8 h-px bg-accent" />
          Contact
        </div>

        <h2
          className="sr font-heading font-black leading-[0.95] tracking-tight mb-6"
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
        >
          Let&apos;s build<br />
          something <GradientText>great.</GradientText>
        </h2>

        <p className="sr text-lg text-text-dim font-light leading-relaxed max-w-[550px] mx-auto mb-10">
          Building something ambitious? Scaling fast? Or just want to talk AI systems
          and scalable architecture over virtual coffee? I&apos;m in.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="sr flex flex-col gap-4 max-w-[600px] mx-auto mb-10 text-left"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[0.68rem] font-medium text-text-muted uppercase tracking-[0.15em]">
                Name
              </label>
              <input
                {...register('name')}
                placeholder="Your name"
                className="bg-glass border border-glass-border rounded-xl px-4 py-3.5 font-body text-sm text-text-primary outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-text-muted focus:border-accent focus:shadow-[0_0_0_3px_rgba(0,212,255,0.08),0_0_30px_rgba(0,212,255,0.15)]"
              />
              {errors.name && (
                <span className="text-accent-red text-xs">{errors.name.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[0.68rem] font-medium text-text-muted uppercase tracking-[0.15em]">
                Email
              </label>
              <input
                {...register('email')}
                placeholder="hello@example.com"
                className="bg-glass border border-glass-border rounded-xl px-4 py-3.5 font-body text-sm text-text-primary outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-text-muted focus:border-accent focus:shadow-[0_0_0_3px_rgba(0,212,255,0.08),0_0_30px_rgba(0,212,255,0.15)]"
              />
              {errors.email && (
                <span className="text-accent-red text-xs">{errors.email.message}</span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[0.68rem] font-medium text-text-muted uppercase tracking-[0.15em]">
              Subject
            </label>
            <input
              {...register('subject')}
              placeholder="Let's collaborate on..."
              className="bg-glass border border-glass-border rounded-xl px-4 py-3.5 font-body text-sm text-text-primary outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-text-muted focus:border-accent focus:shadow-[0_0_0_3px_rgba(0,212,255,0.08),0_0_30px_rgba(0,212,255,0.15)]"
            />
            {errors.subject && (
              <span className="text-accent-red text-xs">{errors.subject.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[0.68rem] font-medium text-text-muted uppercase tracking-[0.15em]">
              Message
            </label>
            <textarea
              {...register('message')}
              rows={5}
              placeholder="Tell me about your project, timeline, and goals..."
              className="bg-glass border border-glass-border rounded-xl px-4 py-3.5 font-body text-sm text-text-primary outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-text-muted resize-y focus:border-accent focus:shadow-[0_0_0_3px_rgba(0,212,255,0.08),0_0_30px_rgba(0,212,255,0.15)]"
            />
            {errors.message && (
              <span className="text-accent-red text-xs">{errors.message.message}</span>
            )}
          </div>

          <div className="flex justify-center mt-2">
            <MagneticButton
              variant="primary"
              onClick={handleSubmit(onSubmit)}
            >
              {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Message Sent!' : status === 'error' ? 'Failed — Try Again' : 'Send Message'}
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </MagneticButton>
          </div>
        </form>

        {/* Socials */}
        <div className="sr flex flex-wrap justify-center gap-3">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('http') ? '_blank' : undefined}
              rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-glass border border-glass-border rounded-full text-text-dim text-sm font-medium no-underline backdrop-blur-xl transition-all duration-300 hover:border-accent hover:text-accent hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
            >
              {social.icon}
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}