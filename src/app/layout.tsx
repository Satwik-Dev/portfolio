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
  title: 'Satwik Alla - AI Engineer',
  description:
    'AI Engineer building production LLM systems: RAG, long-term memory, semantic caching, model routing, and real-time safety, on FastAPI and vector search.',
  openGraph: {
    title: 'Satwik Alla - AI Engineer',
    description:
      'Founding AI Engineer shipping production LLM systems. RAG, episodic memory, semantic caching, LLM orchestration, and AI safety on FastAPI, Qdrant, and GCP.',
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