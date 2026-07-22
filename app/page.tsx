import Link from 'next/link';
import Artwork from '@/components/Artwork';
import ProjectPanel from '@/components/ProjectPanel';
import { contact, intro, projects, selectedSlugs } from '@/data/site';

export default function Home() {
  const selected = selectedSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter(Boolean);

  return (
    <>
      <section className="relative isolate min-h-[92vh] overflow-hidden px-5 pt-24">
        <Artwork
          priority
          showCaption={false}
          sizes="100vw"
          art={{
            src: '/artwork/home/home-hero.png',
            alt: 'home-hero.png',
            ratio: '16:9',
            type: 'full-screen cinematic artwork',
          }}
          className="absolute inset-0 -z-20 h-full w-full border-0"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/20" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-ink via-ink/65 to-transparent" />
        <div className="mx-auto flex min-h-[calc(92vh-6rem)] max-w-7xl items-end pb-20 pt-24 md:pb-28">
          <div className="max-w-2xl">
            <h1 className="font-serif text-5xl leading-none sm:text-6xl md:text-8xl">
              Matheus Coutinho da Silva
            </h1>
            <p className="mt-5 text-sm uppercase tracking-[.18em] text-amber">
              Artist + Creative Technologist
            </p>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-bone">
              {intro}
            </p>
            <Link
              href="/work"
              className="mt-8 inline-block text-xs uppercase tracking-[.18em] text-amber"
            >
              View Work
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-28">
        <div className="mb-12 flex items-end justify-between gap-6">
          <h2 className="font-serif text-5xl">Selected Work</h2>
          <Link
            className="text-xs uppercase tracking-[.18em] text-amber"
            href="/work"
          >
            All Projects
          </Link>
        </div>
        <div className="grid gap-10 md:grid-cols-3">
          {selected.slice(0, 6).map((project, index) =>
            project ? (
              <ProjectPanel key={project.slug} p={project} i={index} />
            ) : null,
          )}
        </div>
      </section>

      <section className="border-y border-line px-5 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
          <h2 className="font-serif text-5xl">Artist Statement</h2>
          <p className="text-xl leading-relaxed text-muted">
            My practice translates memory, domestic space, migration, and
            emotional atmosphere into digital environments, sculptural figures,
            interactive systems, and material studies. I treat visualization as
            a way to build places that are felt before they are fully
            understood.
          </p>
        </div>
      </section>

      <footer className="border-t border-line px-5 py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="font-serif text-2xl text-bone">
            Matheus Coutinho da Silva
          </p>
          <p>
            Contact:{' '}
            <a className="text-bone" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
