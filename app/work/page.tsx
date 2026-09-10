import ProjectPanel from '@/components/ProjectPanel';
import { getProjects, projectCategoryGroups } from '@/data/site';

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
            Artwork organized into 3D Design and Creative Coding.
          </p>
          <nav aria-label="Work categories" className="mt-10">
            <ul className="space-y-7">
              {projectCategoryGroups.map(({ category, subcategories }) => (
                <li key={category}>
                  <a
                    href={`#${categoryId(category)}`}
                    className="text-sm uppercase tracking-[.18em] text-amber hover:text-bone"
                  >
                    {category}
                  </a>
                  <ul className="mt-3 space-y-3 pl-4">
                    {subcategories.map((subcategory) => (
                      <li key={subcategory}>
                        <a
                          href={`#${categoryId(subcategory)}`}
                          className="inline-block border-b border-line pb-1 text-xs uppercase tracking-[.18em] text-muted hover:border-amber hover:text-bone"
                        >
                          {subcategory}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="space-y-24">
          {projectCategoryGroups.map(({ category, subcategories }) => {
            const categoryProjects = projects.filter(
              (project) => project.category === category,
            );

            return (
              <section
                key={category}
                id={categoryId(category)}
                className="scroll-mt-28"
                aria-labelledby={`${categoryId(category)}-heading`}
              >
                <h2
                  id={`${categoryId(category)}-heading`}
                  className="mb-10 font-serif text-4xl uppercase text-amber"
                >
                  {category}
                </h2>
                <div className="space-y-20 pl-4 md:pl-6">
                  {subcategories.map((subcategory) => {
                    const subcategoryProjects = categoryProjects.filter(
                      (project) => project.subcategory === subcategory,
                    );

                    return (
                      <section
                        key={subcategory}
                        id={categoryId(subcategory)}
                        className="scroll-mt-28"
                        aria-labelledby={`${categoryId(subcategory)}-heading`}
                      >
                        <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-line pb-4">
                          <h3
                            id={`${categoryId(subcategory)}-heading`}
                            className="font-serif text-3xl"
                          >
                            {subcategory}
                          </h3>
                          <p className="shrink-0 text-xs uppercase tracking-[.18em] text-muted">
                            {String(subcategoryProjects.length).padStart(2, '0')}{' '}
                            {subcategoryProjects.length === 1 ? 'Project' : 'Projects'}
                          </p>
                        </div>
                        <div className="grid gap-10 sm:grid-cols-2">
                          {subcategoryProjects.map((project, index) => (
                            <ProjectPanel
                              key={project.slug}
                              p={project}
                              i={index}
                              headingLevel={4}
                              showTools
                            />
                          ))}
                        </div>
                      </section>
                    );
                  })}
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
