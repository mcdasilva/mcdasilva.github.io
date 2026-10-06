import fs from 'fs';
import path from 'path';
import type { ReactNode } from 'react';
import { experience, researchExperience, awards, exhibitions, selectedSkills, mentoring } from '@/data/cv';

const cvPath = '/Matheus-Coutinho-da-Silva-CV.pdf';

const cvExists = fs.existsSync(
  path.join(process.cwd(), 'public', cvPath.replace(/^\/+/, '')),
);

function CVSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h3 className="border-b border-line pb-3 font-serif text-3xl text-bone">
        {title}
      </h3>
      <div className="mt-5 text-muted">{children}</div>
    </section>
  );
}

export default function CurriculumVitae({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? 'h1' : 'h2';
  return (
      <section id="cv" className={standalone ? '' : 'mt-28 border-t border-line pt-20'}>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row">
          <div>
            <p className="text-xs uppercase tracking-[.2em] text-amber">
              Matheus Coutinho da Silva
            </p>
            <Heading className="mt-4 font-serif text-5xl text-bone sm:text-6xl">
              Curriculum Vitae
            </Heading>
          </div>
          {cvExists && (
            <a
              href={cvPath}
              className="text-xs uppercase tracking-[.18em] text-amber transition-colors duration-300 ease-out hover:text-bone"
            >
              Download PDF <span aria-hidden="true">&#8599;</span>
            </a>
          )}
        </div>

        <div className="mt-16 grid gap-x-14 gap-y-16 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <CVSection title="Curated Exhibitions">
              <div className="space-y-6">
                {exhibitions.map((item) => (
                  <article key={item.title} className="grid gap-2 sm:grid-cols-[1fr_auto] sm:gap-8">
                    <div>
                      <h4 className="text-bone">{item.kind} Exhibition, <em>{item.title}</em></h4>
                      <p>{item.description}</p>
                      <p>{item.venue}</p>
                    </div>
                    <p className="text-sm text-amber">{item.date}</p>
                  </article>
                ))}
              </div>
            </CVSection>
          </div>
          <CVSection title="Professional & Creative Experience">
            <div className="space-y-8">
              {experience.map((item) => (
                <article key={`${item.organization}-${item.date}`}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h4 className="text-bone">{item.organization}</h4>
                      <p className="text-sm text-muted">{item.location}</p>
                      <p className="mt-1 italic">{item.role}</p>
                    </div>
                    <p className="text-sm uppercase tracking-[.14em] text-amber">
                      {item.date}
                    </p>
                  </div>
                  {item.groups ? (
                    <div className="mt-5 space-y-6">
                      {item.groups.map((group) => (
                        <section key={group.title}>
                          <h5 className="italic text-bone">{group.title}</h5>
                          <ul className="mt-2 list-disc space-y-2 pl-5">
                            {group.details.map((detail, detailIndex) => (
                              <li key={detailIndex}>{detail}</li>
                            ))}
                          </ul>
                        </section>
                      ))}
                    </div>
                  ) : (
                    <ul className="mt-4 list-disc space-y-2 pl-5">
                      {item.details?.map((detail, detailIndex) => (
                        <li key={detailIndex}>{detail}</li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </CVSection>

          <CVSection title="Research & Software Engineering">
            <div className="space-y-8">
              {researchExperience.map((item) => (
                <article key={`${item.organization}-${item.date}`}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h4 className="text-bone">{item.organization}</h4>
                      <p className="text-sm text-muted">{item.location}</p>
                      <p className="mt-1 italic">{item.role}</p>
                    </div>
                    <p className="text-sm uppercase tracking-[.14em] text-amber">
                      {item.date}
                    </p>
                  </div>
                  <ul className="mt-4 list-disc space-y-2 pl-5">
                    {item.details?.map((detail, detailIndex) => (
                      <li key={detailIndex}>{detail}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </CVSection>

          <CVSection title="Mentoring and Leadership Experience">
            <h4 className="text-bone">{mentoring.organization}</h4>
            <p>{mentoring.location}</p>
            <p className="mt-1 italic">{mentoring.role}</p>
            <p className="mt-2 text-sm text-amber">{mentoring.date}</p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              {mentoring.details?.map((detail, index) => <li key={index}>{detail}</li>)}
            </ul>
          </CVSection>
          <CVSection title="Scholarships, Certifications & Awards">
            <dl className="space-y-3">
              {awards.map(([item, year], index) => (
                <div
                  key={index}
                  className="grid gap-1 sm:grid-cols-[1fr_auto] sm:gap-6"
                >
                  <dt>{item}</dt>
                  <dd className="text-sm uppercase tracking-[.14em] text-amber">
                    {year}
                  </dd>
                </div>
              ))}
            </dl>
          </CVSection>
          <CVSection title="Selected Skills">
            <dl className="space-y-4">
              {selectedSkills.map(([label, value]) => (
                <div key={label}><dt className="text-bone">{label}</dt><dd>{value}</dd></div>
              ))}
            </dl>
          </CVSection>
        </div>
      </section>
  );
}
