import fs from 'fs';
import path from 'path';
import type { ReactNode } from 'react';
import Artwork from '@/components/Artwork';
import { aboutIntro, contact } from '@/data/site';

export const metadata = {
  title: 'About',
  description:
    'About and curriculum vitae for Matheus Coutinho da Silva, Brazilian artist and creative technologist.',
};

const cvPath = '/Matheus-Coutinho-da-Silva-CV.pdf';

const cvExists = fs.existsSync(
  path.join(process.cwd(), 'public', cvPath.replace(/^\/+/, '')),
);

type ExperienceGroup = {
  title: string;
  details: ReactNode[];
};

type ExperienceItem = {
  organization: string;
  location: string;
  role: string;
  date: string;
  details?: ReactNode[];
  groups?: ExperienceGroup[];
};

const experience: ExperienceItem[] = [
  {
    organization: 'Torus Knot 3D Designs',
    location: 'Goshen, MA, USA',
    role: 'Architectural & 3D Designer',
    date: 'June 2025-Current',
    groups: [
      {
        title: 'Client Project - Commercial Drafting & Shop Drawings',
        details: [
          'Prepared shop drawings and construction documentation for commercial glazing and curtain wall systems.',
          'Produced detailed CAD drawings for fabrication and field installation.',
          'Interpreted architectural plans and specifications to generate accurate submittal packages.',
          'Coordinated with project managers, fabricators, and installers to ensure dimensional accuracy and constructability.',
          'Assisted in revising drawings based on field conditions and engineering review.',
        ],
      },
      {
        title: 'Client Project - Residential Architectural Visualization II',
        details: [
          'Collaborated directly with the client to translate architectural concepts, visual references, and functional requirements into a cohesive residential visualization package.',
          'Developed a detailed 3D model and complete interior sequence encompassing the kitchen, dining and living areas, bedrooms, bathrooms, storage spaces, entry, and courtyard-facing transitions.',
          'Produced high-resolution interior and exterior renderings to communicate spatial organization, circulation, furniture and fixture placement, material finishes, lighting conditions, and the relationship between the residence and its garden areas.',
          'Created a fully animated architectural walkthrough to communicate spatial flow, transitions between rooms, and the overall experience of moving through the residence.',
          'Managed iterative client review and design refinement, using presentation layouts, detail views, and animation previews to support decisions involving storage, fixtures, atmosphere, outdoor use, and the overall visual language of the home.',
        ],
      },
      {
        title: 'Client Project - Residential Architectural Visualization I',
        details: [
          'Communicated directly with the client to refine scope, materials, and design intent.',
          'Delivered architectural visualization solutions through 2D floor plans and detailed 3D building models for residential projects.',
          'Produced architectural renderings including elevations, sectional perspectives, and layout views.',
          'Directed client project from scoping to delivery, including a full residential design visualization with 115+ renderings and layouts, ensuring on-time completion within 4 revision cycles.',
        ],
      },
      {
        title: 'Client Project - Custom Pendant Design & Fabrication',
        details: [
          'Interpreted schematic drawings to construct precise 3D geometry within strict dimension constraints.',
          'Modeled raised-detail elements while preserving fine-detail integrity at small scale.',
          'Generated fabrication-ready file and produced physical 3D printed prototype.',
          'Evaluated material finishes and surface aesthetics based on client specification.',
        ],
      },
      {
        title: 'Commercial Product Modeling & Visualization (E-commerce Clients)',
        details: [
          'Designed and modeled physical consumer products for online retail platforms.',
          'Developed parametric 3D models optimized for additive manufacturing and repeat production.',
          'Created high-resolution photorealistic renderings for product listings and marketing materials.',
          'Integrated real-world scale, material behavior, and manufacturing constraints into model development.',
          'Iterated designs based on customer feedback and production testing.',
        ],
      },
      {
        title: 'Sculptural & Character Modeling Commissions',
        details: [
          <>Produced advanced organic 3D models in <em>Blender</em> with emphasis on anatomical accuracy and surface realism.</>,
          'Conducted lighting and material studies to simulate various production finishes.',
          'Delivered presentation-ready renders for digital publication and client review.',
          'Applied structural reasoning and proportion control to complex organic geometries.',
        ],
      },
    ],
  },
  {
    organization: 'iD Tech Camps - Southern New Hampshire University',
    location: 'Manchester, NH, USA',
    role:
      'On-Campus Instructor: Machine Learning & Roblox Development / Territory Manager',
    date: 'June-August 2025',
    details: [
      <>Instructed 12 students across two tracks: 5 students (ages 7–9) in <em>Roblox</em> game development, and 7 students (ages 13–17) in Python programming, AI fundamentals, and machine learning.</>,
      <>In <em>Python Camp</em>, guided students in building projects such as a Rock-Paper-Scissors ML model and AI-powered assistants, using <em>NumPy</em>, <em>Teachable Machine</em>, and <em>OpenAI</em> tools.</>,
      <>In <em>Roblox Camp</em>, instructed students on game design and monetization, enabling each student to publish their own playable online game by the end of the week.</>,
      'Achieved a 100% student project completion rate; consistently recognized by camp director for strong classroom leadership and adaptability.'
    ],
  },
];

const researchExperience: ExperienceItem[] = [
  {
    organization: 'Amherst College',
    location: 'Amherst, MA, USA',
    role: 'Senior Honor Thesis / NLP Software Engineering Intern',
    date: 'September 2024-May 2025',
    details: [
      'Architected and implemented a modular conversational AI system with support for personality-driven interactions.',
      'Engineered custom components for goal-driven dialogue management, curiosity-based prompting, and emotional response modeling.',
      'Integrated long-term memory and internal state tracking to enable adaptive and context-aware conversations.',
      'Conducted system-level benchmarking and iterative tuning to improve response quality and user engagement.',
      'Synthesized NLP research into actionable system designs, aligning implementation with current trends in LLM behavior modeling.',
      'Authored technical documentation detailing architecture, training processes, and evaluation metrics.',
    ],
  },
  {
    organization: 'Georg-August-Universitaet Goettingen',
    location: 'Goettingen, Lower Saxony, Germany',
    role: 'Student Researcher / NLP Software Engineering Intern',
    date: 'March-August 2024',
    details: [
      'Developed and deployed scalable deep learning pipelines for five core NLP tasks, including semantic matching and paraphrase generation.',
      'Refactored training workflows to support distributed processing across multi-GPU clusters, reducing training time by over 40%.',
      'Applied advanced tuning strategies to increase model performance on benchmark datasets (e.g., +12% on Quora Question Pairs).',
      'Prototyped and validated enhancements to transformer-based model architectures to improve generalization.',
      'Collaborated in a cross-functional team, contributing to codebase maintenance, evaluation scripts, and dataset preprocessing.'
    ],
  },
  {
    organization: 'University of Massachusetts Amherst',
    location: 'Amherst, MA, USA',
    role: 'Research Assistant Intern / NLP Software Engineering Intern',
    date: 'June-July 2023',
    details: [
      'Implemented and trained neural network models to simulate human semantic understanding.',
      'Deployed experiments on HPC clusters and cloud platforms, optimizing model throughput and training stability.',
      'Built reusable tools for data visualization and model diagnostics to support result interpretation',
      'Onboarded lab members to internal tooling by developing onboarding materials and live walkthroughs',
      'Maintained a version-controlled research notebook documenting experiments, outcomes, and key learnings',
    ],
  },
];

const awards = [
  [<>B.A. awarded <em>cum laude</em>, Amherst College</>,"2025"],
  [<>Associate Member Nominee, Sigma Xi - The Scientific Research Honor Society</>,"2025"],
  [<>Scholarship Recipient, Brazilian Student Association (BRASA)</>, "2021"],
  [<>Youth Ambassador, U.S. Department of State</>, "2020"],
  [<>Fellow, Latin American Leadership Academy</>, "2019"],
];

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

export default function About() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-32">
      <section>
        <h1 className="font-serif text-6xl">About</h1>
        <div className="mt-12 grid gap-12 md:grid-cols-[.8fr_1.2fr]">
          <Artwork
            art={{
              src: '/artwork/portrait/portrait.png',
              alt: 'portrait.png',
              ratio: '4:5',
              type: 'black-and-white portrait',
            }}
            priority
            sizes="(max-width: 768px) calc(100vw - 2.5rem), 40vw"
          />
          <div className="space-y-8 text-muted">
            <p className="text-xl leading-relaxed text-bone">{aboutIntro}</p>
            <section>
              <h2 className="font-serif text-3xl text-bone">
                Research Interests
              </h2>
              <p>
                Digital world-building, spatial storytelling, 
                interactive media, creative computation, and participatory experiences.
              </p>
            </section>
            <section>
              <h2 className="font-serif text-3xl text-bone">Education</h2>
              <p>
                Amherst College, Amherst, Massachusetts
                <br />
                B.A. in Computer Science, <em>cum laude</em>, 2025
              </p>
            </section>
            <section>
              <h2 className="font-serif text-3xl text-bone">Skills</h2>
              <dl className="mt-3 space-y-3 pl-4">
                <div>
                  <dt className="text-sm uppercase tracking-[.18em] text-amber">
                    Digital Art
                  </dt>
                  <dd>
                    Blender, AutoCAD, Adobe Acrobat, Java, JavaScript, PHP,
                    Python.
                  </dd>
                </div>
                <div>
                  <dt className="text-sm uppercase tracking-[.18em] text-amber">
                    Traditional Art
                  </dt>
                  <dd>Drawing, painting.</dd>
                </div>
              </dl>
            </section>
            <section>
              <h2 className="font-serif text-3xl text-bone">Contact</h2>
              <p>
                <a
                  className="text-amber transition-colors duration-300 ease-out hover:text-bone"
                  href={`mailto:${contact.email}`}
                >
                  {contact.email}
                </a>{' '}
                - {contact.location}
              </p>
            </section>
          </div>
        </div>
      </section>

      <section id="cv" className="mt-28 border-t border-line pt-20">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row">
          <div>
            <p className="text-xs uppercase tracking-[.2em] text-amber">
              Matheus Coutinho da Silva
            </p>
            <h2 className="mt-4 font-serif text-5xl text-bone sm:text-6xl">
              Curriculum Vitae
            </h2>
          </div>
          {cvExists ? (
            <a
              href={cvPath}
              className="text-xs uppercase tracking-[.18em] text-amber transition-colors duration-300 ease-out hover:text-bone"
            >
              Download PDF <span aria-hidden="true">&#8599;</span>
            </a>
          ) : (
            <p className="text-xs uppercase tracking-[.18em] text-muted">
              CV PDF Placeholder
            </p>
          )}
        </div>

        <div className="mt-16 grid gap-x-14 gap-y-16 lg:grid-cols-2">
          <CVSection title="Professional & Creative Experience">
            <div className="space-y-8">
              {experience.map((item) => (
                <article key={item.organization}>
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
                <article key={item.organization}>
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

          <CVSection title="Awards, Scholarships & Programs">
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
        </div>
      </section>
    </main>
  );
}
