import type { Metadata } from 'next'
import { Space_Grotesk, Playfair_Display, JetBrains_Mono, Bebas_Neue } from 'next/font/google'
import SessionProvider from '@/components/providers/SessionProvider'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Satwik Alla — AI Full Stack Engineer',
  description:
    'AI Full Stack Engineer crafting intelligent systems at the intersection of artificial intelligence, design, and modern web architecture.',
  openGraph: {
    title: 'Satwik Alla — AI Full Stack Engineer',
    description:
      'Building AI systems that scale. Full-stack engineer specializing in LLM integrations, real-time systems, and scalable cloud architectures.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${playfair.variable} ${jetbrains.variable} ${bebas.variable}`}
    >
      <body className="font-body">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}