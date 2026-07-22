import Artwork from '@/components/Artwork';
import { aboutIntro, contact } from '@/data/site';

export const metadata = {
  title: 'About',
  description:
    'About Matheus Coutinho da Silva, Brazilian artist and creative technologist.',
};

export default function About() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-32">
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
              interactive environments, architectural visualization, and
              spatial storytelling.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-3xl text-bone">Education</h2>
            <p>
              B.Sc. in Computer Science, Federal University of Lavras, Brazil -
              2018-2025
            </p>
          </section>
          <section>
            <h2 className="font-serif text-3xl text-bone">Skills</h2>
            <p>
              Blender, ZBrush, Maya, Substance 3D, JavaScript, Python, GLSL,
              p5.js, Three.js, Photoshop, Illustrator, InDesign, Unreal Engine,
              AutoCAD, Premiere, FL Studio.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-3xl text-bone">Contact</h2>
            <p>
              <a className="text-amber" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>{' '}
              - {contact.location}
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
