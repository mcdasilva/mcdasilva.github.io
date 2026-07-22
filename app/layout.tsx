import './globals.css';
import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import Header from '@/components/Header';
import PageShell from '@/components/PageShell';

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['400', '500', '600'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mcdasilva.github.io'),
  title: {
    default: 'Matheus Coutinho da Silva - Artist + Creative Technologist',
    template: '%s - Matheus Coutinho da Silva',
  },
  description:
    'Dark cinematic MFA visualization portfolio of digital environments, sculpture, creative coding, and material studies.',
  openGraph: {
    title: 'Matheus Coutinho da Silva Portfolio',
    description:
      'Artist + Creative Technologist portfolio for MFA Visualization applications.',
    type: 'website',
    url: 'https://mcdasilva.github.io',
    images: ['/artwork/horror/the-watchers/the-watchers-01.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${inter.variable}`}>
      <body className="grain font-sans">
        <Header />
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
