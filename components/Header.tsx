'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const nav = [
  ['/work', 'Work'],
  ['/about', 'About'],
  ['/cv', 'CV'],
];

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-line bg-ink/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 text-xs tracking-[.18em]">
        <Link
          href="/"
          className="max-w-[68vw] text-[11px] leading-tight tracking-[.08em] text-bone sm:max-w-none sm:text-xs sm:tracking-[.14em]"
        >
          Matheus Coutinho da Silva
        </Link>
        <button
          className="uppercase text-muted hover:text-bone md:hidden"
          aria-expanded={open}
          aria-controls="site-navigation"
          onClick={() => setOpen(!open)}
        >
          Menu
        </button>
        <div
          id="site-navigation"
          className={`${
            open ? 'flex' : 'hidden'
          } absolute left-0 top-full w-full flex-col gap-4 border-b border-line bg-ink p-5 uppercase md:static md:flex md:w-auto md:flex-row md:border-0 md:bg-transparent md:p-0`}
        >
          {nav.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={
                path === href || path.startsWith(`${href}/`)
                  ? 'text-amber underline underline-offset-4'
                  : 'text-muted hover:text-bone'
              }
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
