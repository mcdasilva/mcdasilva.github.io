import ProjectPanel from '@/components/ProjectPanel';
import { getProjects, projectCategoryGroups } from '@/data/site';

export const metadata = { title: 'Work' };

const categoryId = (...parts: string[]) =>
  parts.join('-').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function Work() {
  const projects = getProjects();

  return (
    <section id="work-top" className="mx-auto max-w-7xl px-5 py-32">
      <div className="grid gap-12 md:grid-cols-[.7fr_2fr]">
        <div className="md:sticky md:top-28 md:self-start">
          <h1 className="font-serif text-6xl">Work</h1>
          <p className="mt-6 text-muted">
            Artwork organized into Traditional Art and Digital Art.
          </p>
          <nav aria-label="Work categories" className="mt-10">
            <ul className="space-y-7">
              {projectCategoryGroups.map(({ category, disciplines }) => (
                <li key={category}>
                  <a href={`#${categoryId(category)}`} className="text-sm uppercase tracking-[.18em] text-amber hover:text-bone">
                    {category}
                  </a>
                  {disciplines.map(({ discipline, subcategories }) => (
                    <div key={discipline || category} className="mt-3 pl-4">
                      {discipline && (
                        <a href={`#${categoryId(category, discipline)}`} className="text-xs uppercase tracking-[.18em] text-bone hover:text-amber">
                          {discipline}
                        </a>
                      )}
                      <ul className={`${discipline ? 'mt-3 pl-4' : ''} space-y-3`}>
                        {subcategories.map((subcategory) => (
                          <li key={subcategory}>
                            <a
                              href={`#${categoryId(category, discipline || '', subcategory)}`}
                              className="inline-block border-b border-line pb-1 text-xs uppercase tracking-[.18em] text-muted hover:border-amber hover:text-bone"
                            >
                              {subcategory}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="space-y-24">
          {projectCategoryGroups.map(({ category, disciplines }) => (
            <section key={category} id={categoryId(category)} className="scroll-mt-28" aria-labelledby={`${categoryId(category)}-heading`}>
              <h2 id={`${categoryId(category)}-heading`} className="mb-10 font-serif text-4xl uppercase text-amber">
                {category}
              </h2>
              <div className="space-y-20 pl-4 md:pl-6">
                {disciplines.map(({ discipline, subcategories }) => (
                  <section
                    key={discipline || category}
                    id={discipline ? categoryId(category, discipline) : undefined}
                    className="scroll-mt-28"
                    aria-labelledby={discipline ? `${categoryId(category, discipline)}-heading` : undefined}
                  >
                    {discipline && (
                      <h3 id={`${categoryId(category, discipline)}-heading`} className="mb-8 font-serif text-3xl">
                        {discipline}
                      </h3>
                    )}
                    <div className="space-y-20 pl-4 md:pl-6">
                      {subcategories.map((subcategory) => {
                        const subcategoryProjects = projects.filter(
                          (project) => project.category === category &&
                            project.discipline === discipline &&
                            project.subcategory === subcategory,
                        );
                        const id = categoryId(category, discipline || '', subcategory);
                        const Heading = discipline ? 'h4' : 'h3';

                        return (
                          <section key={subcategory} id={id} className="scroll-mt-28" aria-labelledby={`${id}-heading`}>
                            <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-line pb-4">
                              <Heading id={`${id}-heading`} className="font-serif text-3xl">{subcategory}</Heading>
                              <p className="shrink-0 text-xs uppercase tracking-[.18em] text-muted">
                                {String(subcategoryProjects.length).padStart(2, '0')}{' '}
                                {subcategoryProjects.length === 1 ? 'Project' : 'Projects'}
                              </p>
                            </div>
                            <div className="grid gap-10 sm:grid-cols-2">
                              {subcategoryProjects.map((project, index) => (
                                <ProjectPanel key={project.slug} p={project} i={index} headingLevel={discipline ? 5 : 4} showTools />
                              ))}
                            </div>
                          </section>
                        );
                      })}
                    </div>
                  </section>
                ))}
              </div>
            </section>
          ))}
          <div className="border-t border-line pt-8 text-right">
            <a href="#work-top" className="text-xs uppercase tracking-[.18em] text-amber hover:text-bone">
              Back to Top
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
