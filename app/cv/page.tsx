import CurriculumVitae from '@/components/CurriculumVitae';

export const metadata = { title: 'CV' };

export default function CV() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-32">
      <CurriculumVitae standalone />
    </main>
  );
}
