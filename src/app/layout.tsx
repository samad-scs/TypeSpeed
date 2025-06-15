import type { Metadata } from 'next'

import Providers from '@/components/wrappers/server-provider'

import './globals.css'

export const metadata: Metadata = {
  title: 'TypeSpeed',
  description: 'Test and improve you typing speed!'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`dark antialiased`} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
