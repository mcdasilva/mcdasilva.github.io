import Link from 'next/link';
import Artwork from './Artwork';
import type { Project } from '@/data/site';

type ProjectPanelProps = {
  p: Project;
  i: number;
  showTools?: boolean;
  headingLevel?: 3 | 4;
};

export default function ProjectPanel({
  p,
  i,
  showTools = false,
  headingLevel = 3,
}: ProjectPanelProps) {
  const Heading = headingLevel === 4 ? 'h4' : 'h3';

  return (
    <Link
      href={`/work/${p.slug}`}
      className="group block transition-colors duration-300 ease-out"
    >
      <Artwork
        art={p.hero}
        tools={showTools ? p.tools : undefined}
        respectRatio={false}
        className={i % 3 === 0 ? 'md:aspect-[4/5]' : 'md:aspect-[5/4]'}
      />
      <div className="mt-3 flex gap-4">
        <span className="text-xs text-amber">
          {String(i + 1).padStart(2, '0')}
        </span>
        <div>
          <Heading className="font-serif text-2xl transition-colors duration-300 ease-out group-hover:text-amber">
            {p.title}
          </Heading>
        </div>
      </div>
      <p className="mt-2 max-w-sm text-sm text-muted">{p.summary}</p>
    </Link>
  );
}
