import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { LanguageProvider } from '@/hooks/useLanguage'
import { ThemeProvider } from '@/hooks/useTheme'

const plusJakarta = localFont({
  src: './fonts/PlusJakartaSans-latin.woff2',
  variable: '--font-heading',
  display: 'swap',
  weight: '400 800',
})

const inter = localFont({
  src: './fonts/Inter-latin.woff2',
  variable: '--font-body',
  display: 'swap',
  weight: '400 700',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://alfianariston.vercel.app'),
  title: '| ARSTN Porto |',
  description:
    'Explore the portfolio of Alfian Ariston Noor, an Informatics Engineering graduate from Universitas Stikubank Semarang interested in Artificial Intelligence, Web Development, and Data Analytics.',
  openGraph: {
    title: 'ALFIAN ARISTON NOOR | Informatics Graduate & Aspiring AI Specialist',
    description:
      'Explore the portfolio of Alfian Ariston Noor, an Informatics Engineering graduate interested in AI, Web Development, and Data Analytics.',
    url: 'https://alfianariston.vercel.app',
    siteName: 'ALFIAN ARISTON NOOR',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ALFIAN ARISTON NOOR | Informatics Graduate & Aspiring AI Specialist',
    description:
      'Explore the portfolio of Alfian Ariston Noor, an Informatics Engineering graduate interested in AI, Web Development, and Data Analytics.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${plusJakarta.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-primary text-text-primary">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
