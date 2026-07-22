import fs from 'fs';
import path from 'path';
import { contact } from '@/data/site';

export const metadata = {
  title: 'CV',
  description: 'Curriculum vitae for Matheus Coutinho da Silva.',
};

export default function CV() {
  const cvPath = '/Matheus-Coutinho-da-Silva-CV.pdf';
  const cvExists = fs.existsSync(
    path.join(process.cwd(), 'public', cvPath.replace(/^\/+/, '')),
  );

  return (
    <section className="mx-auto max-w-5xl px-5 py-32">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row">
        <div>
          <p className="text-xs uppercase tracking-[.2em] text-amber">
            Matheus Coutinho da Silva
          </p>
          <h1 className="mt-4 font-serif text-6xl">Curriculum Vitae</h1>
        </div>
        {cvExists ? (
          <a
            href={cvPath}
            className="text-xs uppercase tracking-[.18em] text-amber"
          >
            Download PDF
          </a>
        ) : (
          <p className="text-xs uppercase tracking-[.18em] text-muted">
            CV PDF placeholder
          </p>
        )}
      </div>

      <div className="mt-16 grid gap-12 md:grid-cols-2">
        <section>
          <h2 className="border-b border-line pb-3 font-serif text-3xl">
            Education
          </h2>
          <p className="mt-5 text-muted">
            B.Sc. in Computer Science, Federal University of Lavras, Brazil -
            2018-2025
          </p>
        </section>
        <section>
          <h2 className="border-b border-line pb-3 font-serif text-3xl">
            Experience
          </h2>
          <p className="mt-5 text-muted">
            Freelance 3D Artist / Visual Designer - 2023-Present.
            Architectural visualization, concept art, digital sculpture, and
            interactive projects.
          </p>
        </section>
        <section>
          <h2 className="border-b border-line pb-3 font-serif text-3xl">
            Awards & Achievements
          </h2>
          <p className="mt-5 text-muted">
            Academic Excellence Scholarship - Siames QAs - CryptoArt Marathon
            honorable mention.
          </p>
        </section>
        <section>
          <h2 className="border-b border-line pb-3 font-serif text-3xl">
            Contact
          </h2>
          <p className="mt-5 text-muted">
            Matheus Coutinho da Silva
            <br />
            {contact.email}
            <br />
            {contact.instagram}
          </p>
        </section>
      </div>
    </section>
  );
}
