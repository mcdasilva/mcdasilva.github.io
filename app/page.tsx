import Link from 'next/link';
import HeroCarousel, { type HeroSlide } from '@/components/HeroCarousel';
import ProjectPanel from '@/components/ProjectPanel';
import { contact, getProjects, intro, selectedSlugs } from '@/data/site';

const uniqueSlides = (slides: HeroSlide[]) => {
  const seen = new Set<string>();

  return slides.filter((slide) => {
    if (seen.has(slide.src)) return false;
    seen.add(slide.src);
    return true;
  });
};

export default function Home() {
  const projects = getProjects();
  const selected = selectedSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter(Boolean);
  const gallerySlides = projects.flatMap((project) => {
    const projectSlides: HeroSlide[] = [];

    project.gallery.forEach((item) => {
      if (item.placeholder || item.src.endsWith('.mp4')) return;

      projectSlides.push({
        src: item.src,
        alt: item.alt,
        title: project.title,
        meta: item.caption ?? item.alt,
        ratio: item.ratio,
        type: item.type,
        exists: true,
        position: item.position,
      });
    });

    return projectSlides;
  });
  const heroSlides = uniqueSlides(gallerySlides);

  return (
    <>
      <section className="relative isolate min-h-[92vh] overflow-hidden px-5 pt-24">
        {heroSlides.length > 0 ? (
          <HeroCarousel slides={heroSlides} />
        ) : (
          <div className="absolute inset-0 -z-20 flex items-center justify-center bg-coal p-6 text-center">
            <div>
              <p className="font-serif text-2xl text-bone">Project artwork</p>
              <p className="mt-3 text-xs uppercase tracking-[.18em] text-amber">
                Recommended 16:9
              </p>
              <p className="mt-2 text-sm text-muted">
                Add project PNGs to the artwork folders to populate the
                homepage carousel.
              </p>
            </div>
          </div>
        )}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/75 via-ink/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-ink/65 via-transparent to-transparent" />
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
              className="mt-8 inline-block text-xs uppercase tracking-[.18em] text-amber transition-colors duration-300 ease-out hover:text-bone"
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
            className="text-xs uppercase tracking-[.18em] text-amber transition-colors duration-300 ease-out hover:text-bone"
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
