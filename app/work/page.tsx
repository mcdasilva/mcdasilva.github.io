import ProjectPanel from '@/components/ProjectPanel';
import { projectCategories, projects } from '@/data/site';

export const metadata = {
  title: 'Work',
};

export default function Work() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-32">
      <div className="grid gap-12 md:grid-cols-[.7fr_2fr]">
        <div>
          <h1 className="font-serif text-6xl">Work</h1>
          <p className="mt-6 text-muted">
            Artwork organized into Horror, Concept Art, and Environment Design.
          </p>
        </div>
        <div className="space-y-20">
          {projectCategories.map((category) => {
            const categoryProjects = projects.filter(
              (project) => project.category === category,
            );

            return (
              <section key={category}>
                <div className="mb-8 flex items-end justify-between gap-6 border-b border-line pb-4">
                  <h2 className="font-serif text-4xl">{category}</h2>
                  <p className="text-xs uppercase tracking-[.18em] text-muted">
                    {String(categoryProjects.length).padStart(2, '0')} Projects
                  </p>
                </div>
                <div className="grid gap-10 sm:grid-cols-2">
                  {categoryProjects.map((project, index) => (
                    <ProjectPanel key={project.slug} p={project} i={index} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
