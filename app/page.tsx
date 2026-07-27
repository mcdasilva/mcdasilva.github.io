import Link from 'next/link';
import HeroCarousel, { type HeroSlide } from '@/components/HeroCarousel';
import Artwork from '@/components/Artwork';
import ArtistStatementToggle from '@/components/ArtistStatementToggle';
import { contact, getProjects, intro, type Project } from '@/data/site';

const artistStatementSummary =
  'My work moves between traditional and digital media to explore memory, home, loss, and belonging. I am interested in how ordinary places and objects become meaningful through their relationships with one another, giving form to memories, emotions, and experiences that are difficult to put into words.';

const fullArtistStatement = [
  'Some experiences resist language. We know what they feel like, yet the moment we try to explain them, words get lost in translation: the strange feeling of returning somewhere that no longer exists the way we remember it, or the nostalgia of remembering a childhood afternoon are some examples. This portfolio is my attempt to give those experiences a physical form, building spaces where they can be felt instead of explained.',
  "To do that, my art is driven by a simple belief: individual elements become meaningful only when they work together, allowing the whole to communicate something greater than the sum of its parts. For instance, a chair or a clothesline are not remarkable on their own. Yet, when placed in the right relationship with one another, they can carry the weight of places we've left or people we've lost. Throughout my pieces, the objects are intentionally ordinary. Their purpose is never to attract attention individually, but to support the overall atmosphere.",
  'A great part of this portfolio was inspired by my experience growing up in Brazil. The landscapes, domestic rituals, and financial limitations shaped the way I understand beauty, hardship, and belonging. They appear throughout my work not as literal reconstructions of memories, but as environments that remain emotionally faithful to them. Memory simplifies, exaggerates, and forgets; this portfolio embraces that process.',
  <>The presented artworks never began with an image. They began with a feeling that refused to leave me. From there, I gradually constructed an environment around that emotion, constantly adjusting the space until it communicated what words could not. For my digital work, I used the 3D software <em>Blender</em> because it allowed me to control every aspect of the renderings within a single creative space, from modeling to post-processing. My traditional work followed the same process through different materials, using soft pastels, charcoal, and oil paint.</>,
  'One characteristic deliberately shared across this collection is visual hierarchy. I never want everything to reveal itself at once. I believe reflection requires attention, and attention requires time; I want to reward that time. I intentionally hide details so that the longer someone spends with a piece, the more they notice. I also leave enough room for viewers to build their own emotional interpretation of the work. Every spectator brings different perspectives, and those also become part of the experience.',
  <>My visual language is informed by filmmakers such as Jordan Peele and Ari Aster, and films like <em>Pan’s Labyrinth</em> (2006) and <em>Silent Hill</em> (2006), which taught me how places and ordinary details can carry emotion and psychological tension. I was also inspired by the contemporary 3D artists Gabriel Massan and Pedro Conti, whose work draws from Brazilian and diasporic experiences while reimagining them through their own artistic perspectives.</>,
  'Ultimately, I hope this portfolio is experienced the same way it was created: not as a compilation of individual images, but as a series of emotional spaces. If viewers leave remembering how these environments made them feel rather than the individual objects they contained, then the work has done exactly what I hoped it would do.'
];

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
        respectRatio={false}
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
            <p className="mt-5 text-xs uppercase tracking-[.14em] text-amber sm:text-sm sm:tracking-[.18em]">
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
          <ArtistStatementToggle
            summary={artistStatementSummary}
            fullStatement={fullArtistStatement}
          />
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
