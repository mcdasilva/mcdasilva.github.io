import CurriculumVitae from '@/components/CurriculumVitae';
import Artwork from '@/components/Artwork';
import { aboutIntro, contact } from '@/data/site';

export const metadata = {
  title: 'About',
  description:
    'About and curriculum vitae for Matheus Coutinho da Silva, Brazilian artist and creative technologist.',
};

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
                    AutoCAD, Revit, SketchUp, Blender, Roblox Studio, Adobe Acrobat, Processing
                    Java, JavaScript, PHP, Python.
                  </dd>
                </div>
                <div>
                  <dt className="text-sm uppercase tracking-[.18em] text-amber">
                    Traditional Art
                  </dt>
                  <dd>Charcoal, soft pastels, oil paint, acrylic paint</dd>
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

      <CurriculumVitae />
    </main>
  );
}
