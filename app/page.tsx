import Link from 'next/link';
import HeroCarousel, { type HeroSlide } from '@/components/HeroCarousel';
import Artwork from '@/components/Artwork';
import { contact, getProjects, intro, type Project } from '@/data/site';

const uniqueSlides = (slides: HeroSlide[]) => {
  const seen = new Set<string>();

  return slides.filter((slide) => {
    if (seen.has(slide.src)) return false;
    seen.add(slide.src);
    return true;
  });
};

function FeaturedWorkLink({
  project,
  index,
  className,
  artClassName,
  sizes,
}: {
  project: Project;
  index: number;
  className?: string;
  artClassName?: string;
  sizes: string;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group block transition-colors duration-300 ease-out ${className || ''}`}
    >
      <Artwork
        art={project.hero}
        tools={project.tools}
        className={artClassName}
        sizes={sizes}
      />
      <div className="mt-3 flex gap-4">
        <span className="text-xs text-amber">
          {String(index).padStart(2, '0')}
        </span>
        <div>
          <h3 className="font-serif text-2xl transition-colors duration-300 ease-out group-hover:text-amber">
            {project.title}
          </h3>
        </div>
      </div>
      <p className="mt-2 max-w-md text-sm text-muted">{project.summary}</p>
    </Link>
  );
}

export default function Home() {
  const projects = getProjects();
  const depoisDaChuva = projects.find(
    (project) => project.slug === 'depois-da-chuva',
  );
  const mothersDespair = projects.find(
    (project) => project.slug === 'a-mothers-despair',
  );
  const gallerySlides = projects.flatMap((project) => {
    const projectSlides: HeroSlide[] = [];

    project.gallery.forEach((item) => {
      if (item.placeholder || item.src.endsWith('.mp4')) return;

      projectSlides.push({
        src: item.src,
        alt: item.alt,
        title: project.title,
        meta: project.medium,
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
              <span className="block">Matheus</span>
              <span className="block">Coutinho</span>
              <span className="block whitespace-nowrap">da Silva</span>
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
        <div className="grid gap-12 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[.2em] text-amber">
              Explore the Work
            </p>
            <h2 className="mt-4 font-serif text-5xl">A Focused Glimpse</h2>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted">
              The portfolio moves between atmospheric environment design,
              psychological horror, and emotionally charged digital images.
            </p>
          </div>
          <Link
            className="inline-flex w-fit items-center border border-amber px-5 py-4 text-xs uppercase tracking-[.18em] text-amber transition-colors duration-300 ease-out hover:border-bone hover:text-bone lg:justify-self-end"
            href="/work"
          >
            View All Projects{' '}
            <span aria-hidden="true" className="ml-2">
              &rarr;
            </span>
          </Link>
        </div>
        <div className="mx-auto mt-12 max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] lg:items-start">
            {depoisDaChuva && (
              <FeaturedWorkLink
                project={depoisDaChuva}
                index={1}
                className="min-w-0"
                sizes="(max-width: 1024px) 100vw, 56vw"
              />
            )}
            {mothersDespair && (
              <FeaturedWorkLink
                project={mothersDespair}
                index={2}
                className="min-w-0"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            )}
          </div>
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
