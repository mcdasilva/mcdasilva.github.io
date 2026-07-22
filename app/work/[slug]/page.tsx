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
    <article id={`${project.slug}-top`} className="px-5 py-32">
      <section className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[.8fr_1.6fr]">
        <div>
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
            <div>
              <dt className="text-amber">Software</dt>
              <dd>{project.software}</dd>
            </div>
          </dl>
          <p className="mt-8 leading-relaxed text-bone">
            {project.description}
          </p>
        </div>
        <Artwork
          art={project.hero}
          priority
          sizes="(max-width: 768px) 100vw, 65vw"
          className="min-h-[45vh]"
        />
      </section>

      <section className="mx-auto mt-20 max-w-7xl">
        <h2 className="font-serif text-4xl">Final Work</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {project.gallery.map((item) => (
            <Artwork key={item.src} art={item} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 grid max-w-7xl gap-12 border-t border-line pt-16 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-4xl">Credits</h2>
          <p className="mt-5 text-muted">{project.credits}</p>
        </div>
        <div>
          <h2 className="font-serif text-4xl">Collaborators</h2>
          <p className="mt-5 text-muted">{project.collaborators}</p>
        </div>
      </section>

      <nav className="mx-auto mt-20 grid max-w-7xl gap-5 border-t border-line pt-8 text-xs uppercase tracking-[.18em] text-amber sm:grid-cols-2">
        <Link href={`/work/${previous.slug}`}>Previous: {previous.title}</Link>
        <Link href={`/work/${next.slug}`} className="sm:text-right">
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
