export type Artwork = {
  src: string;
  alt: string;
  ratio: string;
  type: string;
  caption?: string;
  poster?: string;
};

export type ProjectCategory = 'Horror' | 'Concept Art' | 'Environment Design';

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  medium: string;
  software: string;
  dimensions: string;
  summary: string;
  description: string;
  hero: Artwork;
  gallery: [Artwork, Artwork, Artwork];
  credits: string;
  collaborators: string;
};

const art = (
  src: string,
  alt: string,
  ratio = '16:9',
  type = 'final image',
): Artwork => ({ src, alt, ratio, type, caption: alt });

const projectImages = (
  folder: string,
  basename: string,
  type = 'final image',
): [Artwork, Artwork, Artwork] => [
  art(`/artwork/${folder}/${basename}-01.png`, `${basename}-01.png`, '16:9', type),
  art(`/artwork/${folder}/${basename}-02.png`, `${basename}-02.png`, '16:9', type),
  art(`/artwork/${folder}/${basename}-03.png`, `${basename}-03.png`, '16:9', type),
];

export const projectCategories: ProjectCategory[] = [
  'Horror',
  'Concept Art',
  'Environment Design',
];

export const contact = {
  email: 'mcdasilva2025@gmail.com',
  location: 'United States / Brazil',
};

export const intro =
  'I create digital environments and objects that translate memory, emotion, and place into spatial experiences.';

export const aboutIntro =
  'Matheus Coutinho da Silva is a Brazilian artist and creative technologist whose work combines digital environments, computation, architecture, and physical making. His practice explores memory, place, migration, domestic space, and emotional atmosphere.';

const watchersImages = projectImages(
  'horror',
  'the-watchers',
  'horror sculpture final image',
);
const masqueradeImages = projectImages(
  'horror',
  'masquerade',
  'horror final image',
);
const mothersDespairImages = projectImages(
  'horror',
  'a-mothers-despair',
  'horror sculpture final image',
);
const itsTimeImages = projectImages(
  'concept-art',
  'its-time-to-go',
  'concept art final image',
);
const vigilImages = projectImages(
  'concept-art',
  'vigil',
  'concept art final image',
);
const notYetImages = projectImages(
  'concept-art',
  'not-yet',
  'concept art final image',
);
const unboundImages = projectImages(
  'concept-art',
  'unbound',
  'concept art final image',
);
const grownImages = projectImages(
  'environment-design',
  'the-way-ive-grown',
  'environment design final image',
);
const titiaImages = projectImages(
  'environment-design',
  'na-casa-de-titia',
  'environment design final image',
);
const depoisImages = projectImages(
  'environment-design',
  'depois-da-chuva',
  'environment design final image',
);

export const projects: Project[] = [
  {
    slug: 'the-watchers',
    title: 'The Watchers',
    category: 'Horror',
    year: '2025',
    medium: 'Digital sculpture',
    software: 'ZBrush, Blender, Substance 3D',
    dimensions: 'Variable',
    summary:
      'Figural observers emerging from darkness, attention, and unease.',
    description:
      'A sculptural study of being seen, using enlarged eyes, textured surfaces, and theatrical darkness.',
    hero: watchersImages[0],
    gallery: watchersImages,
    credits: 'All work by Matheus Coutinho da Silva.',
    collaborators: 'No additional collaborators listed.',
  },
  {
    slug: 'masquerade',
    title: 'Masquerade',
    category: 'Horror',
    year: '2026',
    medium: 'Digital horror image sequence',
    software: 'Blender, ZBrush, Photoshop',
    dimensions: 'Three final images',
    summary:
      'A staged horror sequence about concealment, performance, and the instability of identity.',
    description:
      'Masquerade approaches horror through ritualized surfaces, theatrical darkness, and figures that feel both ceremonial and unsafe.',
    hero: masqueradeImages[0],
    gallery: masqueradeImages,
    credits: 'All work by Matheus Coutinho da Silva.',
    collaborators: 'No additional collaborators listed.',
  },
  {
    slug: 'a-mothers-despair',
    title: "A Mother's Despair",
    category: 'Horror',
    year: '2025',
    medium: 'Digital sculpture',
    software: 'Blender, ZBrush',
    dimensions: 'Variable',
    summary: 'A study of grief, exhaustion, and inherited emotion.',
    description:
      'The portrait is shaped through weight, facial tension, surface fatigue, and subdued light.',
    hero: mothersDespairImages[0],
    gallery: mothersDespairImages,
    credits: 'All work by Matheus Coutinho da Silva.',
    collaborators: 'No additional collaborators listed.',
  },
  {
    slug: 'its-time-to-go',
    title: "It's Time to Go",
    category: 'Concept Art',
    year: '2026',
    medium: 'Concept art keyframes',
    software: 'Blender, Photoshop',
    dimensions: 'Three final images',
    summary:
      'A cinematic departure scene centered on urgency, threshold, and emotional release.',
    description:
      "It's Time to Go frames departure as an atmospheric event, using composition, light, and gesture to hold a moment just before movement.",
    hero: itsTimeImages[0],
    gallery: itsTimeImages,
    credits: 'All work by Matheus Coutinho da Silva.',
    collaborators: 'No additional collaborators listed.',
  },
  {
    slug: 'vigil',
    title: 'Vigil',
    category: 'Concept Art',
    year: '2026',
    medium: 'Concept art keyframes',
    software: 'Blender, Photoshop',
    dimensions: 'Three final images',
    summary:
      'A watchful scene built around waiting, silence, and restrained tension.',
    description:
      'Vigil studies a held state of attention through stillness, distance, and a controlled cinematic palette.',
    hero: vigilImages[0],
    gallery: vigilImages,
    credits: 'All work by Matheus Coutinho da Silva.',
    collaborators: 'No additional collaborators listed.',
  },
  {
    slug: 'not-yet',
    title: 'Not Yet',
    category: 'Concept Art',
    year: '2026',
    medium: 'Concept art sequence',
    software: 'Blender, Photoshop, FL Studio',
    dimensions: 'Three final images',
    summary:
      'A meditation on anticipation and the distance between pressure and release.',
    description:
      'Not Yet holds a suspended moment through cinematic restraint, emotional tension, and the expectation of an event that has not arrived.',
    hero: notYetImages[0],
    gallery: notYetImages,
    credits: 'All work by Matheus Coutinho da Silva.',
    collaborators: 'No additional collaborators listed.',
  },
  {
    slug: 'unbound',
    title: 'Unbound',
    category: 'Concept Art',
    year: '2026',
    medium: 'Concept art keyframes',
    software: 'Blender, Photoshop',
    dimensions: 'Three final images',
    summary:
      'A release from constraint shown through motion, material rupture, and atmosphere.',
    description:
      'Unbound explores the moment a form leaves containment, using light, suspended movement, and visual tension to suggest transformation.',
    hero: unboundImages[0],
    gallery: unboundImages,
    credits: 'All work by Matheus Coutinho da Silva.',
    collaborators: 'No additional collaborators listed.',
  },
  {
    slug: 'the-way-ive-grown',
    title: "The Way I've Grown",
    category: 'Environment Design',
    year: '2026',
    medium: 'Digital environment',
    software: 'Blender, Photoshop',
    dimensions: 'Three final images',
    summary:
      'A remembered backyard reconstructed as a quiet meditation on growth.',
    description:
      'This work uses plants, chairs, unfinished walls, and late sunlight to translate family memory into a cinematic scene.',
    hero: grownImages[0],
    gallery: grownImages,
    credits: 'All work by Matheus Coutinho da Silva.',
    collaborators: 'No additional collaborators listed.',
  },
  {
    slug: 'na-casa-de-titia',
    title: "Na Casa de Titia (At Auntie's House)",
    category: 'Environment Design',
    year: '2026',
    medium: 'Digital environment',
    software: 'Blender, Photoshop',
    dimensions: 'Three final images',
    summary:
      'A domestic environment shaped by hospitality, memory, and the quiet intimacy of family space.',
    description:
      "Na Casa de Titia reconstructs an aunt's home as an emotional interior, using thresholds, furniture, surfaces, and afternoon light to suggest remembered presence.",
    hero: titiaImages[0],
    gallery: titiaImages,
    credits: 'All work by Matheus Coutinho da Silva.',
    collaborators: 'No additional collaborators listed.',
  },
  {
    slug: 'depois-da-chuva',
    title: 'Depois da Chuva (After the Rain)',
    category: 'Environment Design',
    year: '2026',
    medium: 'Digital environment',
    software: 'Blender, Photoshop',
    dimensions: 'Three final images',
    summary:
      'A post-rain environment focused on wet surfaces, softened sound, and charged quiet.',
    description:
      'Depois da Chuva studies the atmosphere after rainfall, where domestic space becomes reflective, hushed, and emotionally suspended.',
    hero: depoisImages[0],
    gallery: depoisImages,
    credits: 'All work by Matheus Coutinho da Silva.',
    collaborators: 'No additional collaborators listed.',
  },
];

export const selectedSlugs = [
  'the-watchers',
  'masquerade',
  'a-mothers-despair',
  'its-time-to-go',
  'vigil',
  'not-yet',
  'unbound',
  'the-way-ive-grown',
  'na-casa-de-titia',
  'depois-da-chuva',
];

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);
