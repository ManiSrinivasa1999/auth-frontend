import type { Metadata } from 'next'
import './globals.css'
import './lib/axios'

export const metadata: Metadata = {
  title: 'Authentication App',
  description: 'Authentication App',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
