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

const experience = [
  {
    organization: 'Torus Knot 3D Designs',
    location: 'Goshen, MA, USA',
    role: 'Architectural & 3D Designer',
    date: 'June 2025-Current',
    details: [
      'Prepared commercial drafting and shop drawings for glazing and curtain wall systems.',
      'Produced client-facing architectural visualization packages, including floor plans, 3D building models, renderings, elevations, sectional perspectives, and layout views.',
      'Modeled custom pendant designs and fabrication-ready 3D printed prototypes with attention to material finish, dimensional constraints, and production needs.',
      'Created e-commerce product models, photorealistic renderings, and sculptural or character modeling commissions.',
    ],
  },
  {
    organization: 'iD Tech Camps - Southern New Hampshire University',
    location: 'Manchester, NH, USA',
    role:
      'On-Campus Instructor: Machine Learning & Roblox Development / Territory Manager',
    date: 'June-August 2025',
    details: [
      'Taught students ages 7-19 Python programming, AI fundamentals, machine learning, Roblox game development, and monetization.',
      'Guided students through projects including Rock-Paper-Scissors machine learning models and AI-powered assistants.',
      'Achieved a 100% student project completion rate while managing classroom leadership and student support.',
    ],
  },
];

const researchExperience = [
  {
    organization: 'Amherst College',
    location: 'Amherst, MA, USA',
    role: 'Senior Honor Thesis / NLP Software Engineering Intern',
    date: 'September 2024-May 2025',
    details: [
      'Explored whether conversational AI can develop its own personality, opinions, and exhibition of traits such as creativity, subjectivity, and curiosity.',
      'Designed and implemented modular conversational agent components for goal-driven dialogue management, curiosity-based prompting, emotional response modeling, memory, and adaptive context-aware conversations.',
      'Synthesized NLP research into actionable system designs, documentation, evaluation metrics, training processes, and experimental frameworks.',
    ],
  },
  {
    organization: 'Georg-August-Universitat Gottingen',
    location: 'Gottingen, Lower Saxony, Germany',
    role: 'Student Researcher / NLP Software Engineering Intern',
    date: 'March-August 2024',
    details: [
      'Collaborated on a team-driven project to develop and optimize language models across sentiment analysis, paragraph similarity, semantic textual similarity, paraphrase detection, and paraphrase generation.',
      'Developed scalable deep learning pipelines and core BERT/RBART models for distributed processing across multi-GPU clusters.',
      'Improved Quora Question Pairs task accuracy through hyperparameter tuning, k-fold cross-validation, and transformer-based architecture experiments.',
    ],
  },
  {
    organization: 'University of Massachusetts Amherst',
    location: 'Amherst, MA, USA',
    role: 'Research Assistant Intern / NLP Software Engineering Intern',
    date: 'June-July 2023',
    details: [
      'Developed and trained deep learning models to emulate how humans connect word structures to meanings and simulate human semantic understanding.',
      'Used high-performance computing clusters and cloud-based tools such as Google Colab to conduct experiments and optimize model throughput, performance, and training stability.',
      'Built reusable tools for data visualization, model diagnostics, and research workflow support.',
    ],
  },
];

const awards = [
  [
    <>
      B.A. awarded <em>cum laude</em>, Amherst College
    </>,
    "2025",
  ],
  [
    <>Associate Member Nominee, Sigma Xi, The Scientific Research Honor Society</>,
    "2025",
  ],
  [<>Scholarship Recipient, Brazilian Student Association (BRASA)</>, "2021"],
  [<>Alumnus, Prep Estudar Fora</>, "2020"],
  [<>Youth Ambassador, U.S. Department of State program for leadership</>, "2020"],
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
          />
          <div className="space-y-8 text-muted">
            <p className="text-xl leading-relaxed text-bone">{aboutIntro}</p>
            <section>
              <h2 className="font-serif text-3xl text-bone">
                Research Interests
              </h2>
              <p>
                Memory, place, migration, domestic space, emotional atmosphere,
                interactive environments, and spatial storytelling.
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
                  <ul className="mt-4 list-disc space-y-2 pl-5">
                    {item.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
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
                    {item.details.map((detail) => (
                      <li key={detail}>{detail}</li>
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
