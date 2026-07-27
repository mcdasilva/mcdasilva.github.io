import { notFound } from 'next/navigation';
import Link from 'next/link';
import Artwork from '@/components/Artwork';
import { getProject, getProjects } from '@/data/site';

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);

  return {
    title: project?.title || 'Project',
    description: project?.summary,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);

  if (!project) notFound();

  const projects = getProjects();
  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const previous =
    projects[(currentIndex - 1 + projects.length) % projects.length];
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <article id={`${project.slug}-top`} className="overflow-x-hidden px-5 py-32">
      <Link
        href={`/work/${previous.slug}`}
        aria-label={`Previous project: ${previous.title}`}
        title={`Previous: ${previous.title}`}
        className="fixed left-2 top-1/2 z-40 hidden -translate-y-1/2 px-2 py-4 text-5xl leading-none text-muted transition-colors duration-300 ease-out hover:text-amber md:flex"
      >
        &#8249;
      </Link>
      <Link
        href={`/work/${next.slug}`}
        aria-label={`Next project: ${next.title}`}
        title={`Next: ${next.title}`}
        className="fixed right-2 top-1/2 z-40 hidden -translate-y-1/2 px-2 py-4 text-5xl leading-none text-muted transition-colors duration-300 ease-out hover:text-amber md:flex"
      >
        &#8250;
      </Link>
      <section className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[.8fr_1.6fr]">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[.2em] text-amber">
            {project.year}
          </p>
          <h1 className="mt-4 font-serif text-5xl leading-none sm:text-6xl">
            {project.title}
          </h1>
          <dl className="mt-8 space-y-3 text-sm text-muted">
            <div>
              <dt className="text-amber">Date</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt className="text-amber">Category</dt>
              <dd>{project.category}</dd>
            </div>
            <div>
              <dt className="text-amber">Medium</dt>
              <dd>{project.medium}</dd>
            </div>
            <div>
              <dt className="text-amber">Dimensions / Duration</dt>
              <dd>{project.dimensions}</dd>
            </div>
          </dl>
          <p 
            className="mt-8 leading-relaxed text-bone" dangerouslySetInnerHTML={{ __html: project.description }}>
          </p>
        </div>
        <Artwork
          art={project.hero}
          fit="contain"
          priority
          sizes="(max-width: 768px) calc(100vw - 2.5rem), 65vw"
          className="md:justify-self-center"
          maxDisplayHeight={760}
        />
      </section>

      <section className="mx-auto mt-20 max-w-7xl">
        <h2 className="font-serif text-4xl">Final Work</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {project.gallery.map((item) => (
            <Artwork
              key={item.src}
              art={item}
              fit="contain"
              sizes="(max-width: 768px) calc(100vw - 2.5rem), 45vw"
              maxDisplayHeight={520}
              align="start"
            />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 grid max-w-7xl gap-12 border-t border-line pt-16 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-4xl">Credits</h2>
          <p className="mt-5 text-muted" style={{ whiteSpace: 'pre-wrap' }}>{project.credits}</p>
        </div>
        <div>
          <h2 className="font-serif text-4xl">Collaborators</h2>
          <p className="mt-5 text-muted">{project.collaborators}</p>
        </div>
      </section>

      <nav className="mx-auto mt-20 grid max-w-7xl gap-5 border-t border-line pt-8 text-xs uppercase tracking-[.18em] text-amber sm:grid-cols-2">
        <Link
          href={`/work/${previous.slug}`}
          className="inline-flex w-fit self-start justify-self-start p-0 leading-none transition-colors duration-300 ease-out hover:text-bone"
        >
          Previous: {previous.title}
        </Link>
        <Link
          href={`/work/${next.slug}`}
          className="inline-flex w-fit self-start justify-self-start p-0 leading-none transition-colors duration-300 ease-out hover:text-bone sm:justify-self-end sm:text-right"
        >
          Next: {next.title}
        </Link>
      </nav>
      <div className="mx-auto mt-10 max-w-7xl text-right">
        <a
          href={`#${project.slug}-top`}
          className="text-xs uppercase tracking-[.18em] text-amber hover:text-bone"
        >
          Back to Top
        </a>
      </div>
    </article>
  );
}
