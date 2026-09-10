import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import PageShell from '@/components/PageShell';
import SiteFooter from '@/components/SiteFooter';

export const metadata: Metadata = {
  metadataBase: new URL('https://mcdasilva.github.io'),
  title: {
    default: 'Matheus Coutinho da Silva - Artist + Creative Technologist',
    template: '%s - Matheus Coutinho da Silva',
  },
  description:
    'Matheus Coutinho da Silva Visualization Portfolio - Explore work across 3D design and traditional media.',
  openGraph: {
    title: 'Matheus Coutinho da Silva - Artist + Creative Technologist',
    description:
      'Matheus Coutinho da Silva Visualization Portfolio - Explore work across 3D design and traditional media.',
    type: 'website',
    url: 'https://mcdasilva.github.io',
    images: ['/artwork/3d-design/horror/the-watchers/the-watchers-01.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="grain font-sans">
        <Header />
        <PageShell>{children}</PageShell>
        <SiteFooter />
      </body>
    </html>
  );
}
