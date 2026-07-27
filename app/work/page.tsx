import ProjectPanel from '@/components/ProjectPanel';
import { getProjects, projectCategories } from '@/data/site';

export const metadata = {
  title: 'Work',
};

const categoryId = (category: string) =>
  category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function Work() {
  const projects = getProjects();

  return (
    <section id="work-top" className="mx-auto max-w-7xl px-5 py-32">
      <div className="grid gap-12 md:grid-cols-[.7fr_2fr]">
        <div className="md:sticky md:top-28 md:self-start">
          <h1 className="font-serif text-6xl">Work</h1>
          <p className="mt-6 text-muted">
            Artwork organized into Horror, Concept Art, and Environment Design.
          </p>
          <nav
            aria-label="Work categories"
            className="mt-10 flex flex-wrap gap-3 md:flex-col md:items-start"
          >
            {projectCategories.map((category) => (
              <a
                key={category}
                href={`#${categoryId(category)}`}
                className="border-b border-line pb-1 text-xs uppercase tracking-[.18em] text-amber hover:border-amber hover:text-bone"
              >
                {category}
              </a>
            ))}
          </nav>
        </div>
        <div className="space-y-20">
          {projectCategories.map((category) => {
            const categoryProjects = projects.filter(
              (project) => project.category === category,
            );

            return (
              <section
                key={category}
                id={categoryId(category)}
                className="scroll-mt-28"
              >
                <div className="mb-8 flex items-end justify-between gap-6 border-b border-line pb-4">
                  <h2 className="font-serif text-4xl">{category}</h2>
                  <p className="text-xs uppercase tracking-[.18em] text-muted">
                    {String(categoryProjects.length).padStart(2, '0')} Projects
                  </p>
                </div>
                <div className="grid gap-10 sm:grid-cols-2">
                  {categoryProjects.map((project, index) => (
                    <ProjectPanel
                      key={project.slug}
                      p={project}
                      i={index}
                      showTools
                    />
                  ))}
                </div>
              </section>
            );
          })}
          <div className="border-t border-line pt-8 text-right">
            <a
              href="#work-top"
              className="text-xs uppercase tracking-[.18em] text-amber hover:text-bone"
            >
              Back to Top
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
