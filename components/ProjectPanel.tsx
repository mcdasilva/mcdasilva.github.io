import Link from 'next/link';
import Artwork from './Artwork';
import type { Project } from '@/data/site';

export default function ProjectPanel({ p, i }: { p: Project; i: number }) {
  return (
    <Link
      href={`/work/${p.slug}`}
      className="group block transition-colors duration-300 ease-out"
    >
      <Artwork
        art={p.hero}
        className={i % 3 === 0 ? 'md:aspect-[4/5]' : 'md:aspect-[5/4]'}
      />
      <div className="mt-3 flex gap-4">
        <span className="text-xs text-amber">
          {String(i + 1).padStart(2, '0')}
        </span>
        <h3 className="font-serif text-2xl transition-colors duration-300 ease-out group-hover:text-amber">
          {p.title}
        </h3>
      </div>
      <p className="mt-2 max-w-sm text-sm text-muted">{p.summary}</p>
    </Link>
  );
}
