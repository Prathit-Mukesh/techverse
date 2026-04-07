import './globals.css'

export const metadata = {
  title: 'TechVerse — Understand How Technology Works',
  description: 'The simplest place on the internet to understand how the modern world works. Learn how electricity, AI, internet, cameras, and 35+ technologies work through simple language, diagrams, and animations.',
  keywords: 'technology education, how things work, electricity, AI, internet, engineering, science, learn technology',
  openGraph: {
    title: 'TechVerse — Understand How Technology Works',
    description: 'Learn how 35+ technologies work — from electricity to AI — through simple language, visual diagrams, and interactive animations.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechVerse — The Simplest Way to Understand Technology',
    description: 'From electricity to AI, learn how the modern world works.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
