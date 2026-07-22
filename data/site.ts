import fs from 'fs';
import path from 'path';

export type Artwork = {
  src: string;
  alt: string;
  ratio: string;
  type: string;
  caption?: string;
  poster?: string;
  placeholder?: boolean;
  position?: string;
};

export type ProjectCategory = 'Horror' | 'Concept Art' | 'Environment Design';
export type ToolKey = 'blender';

export type ToolLogo = {
  id: ToolKey;
  name: string;
  logo: string;
  fallback: string;
};

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  medium: string;
  tools: ToolKey[];
  dimensions: string;
  summary: string;
  description: string;
  hero: Artwork;
  gallery: Artwork[];
  credits: string;
  collaborators: string;
};

type ProjectRecord = Omit<Project, 'hero' | 'gallery'> & {
  artworkFolder: string;
  fallbackBasename: string;
  artworkType: string;
  artworkPosition?: string;
};

const art = (
  src: string,
  alt: string,
  ratio = '16:9',
  type = 'final image',
  options: Pick<Artwork, 'placeholder' | 'position'> = {},
): Artwork => ({ src, alt, ratio, type, ...options });

const publicArtworkPath = (folder: string) =>
  path.join(process.cwd(), 'public', 'artwork', folder);

const sortedPngFiles = (folder: string) => {
  const directory = publicArtworkPath(folder);

  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter(
      (entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.png'),
    )
    .map((entry) => entry.name)
    .sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }),
    );
};

const projectImages = (
  folder: string,
  fallbackBasename: string,
  type = 'final image',
  position?: string,
): Artwork[] => {
  const files = sortedPngFiles(folder);

  if (files.length === 0) {
    return [
      art(
        `/artwork/${folder}/${fallbackBasename}-01.png`,
        `${fallbackBasename}-01.png`,
        '16:9',
        `final image; add PNG files to public/artwork/${folder}/`,
        { placeholder: true },
      ),
    ];
  }

  return files.map((file) =>
    art(`/artwork/${folder}/${file}`, file, '16:9', type, { position }),
  );
};

const resolveProject = ({
  artworkFolder,
  fallbackBasename,
  artworkType,
  artworkPosition,
  ...project
}: ProjectRecord): Project => {
  const gallery = projectImages(
    artworkFolder,
    fallbackBasename,
    artworkType,
    artworkPosition,
  );

  return {
    ...project,
    hero: gallery[0],
    gallery,
  };
};

export const projectCategories: ProjectCategory[] = [
  'Horror',
  'Concept Art',
  'Environment Design',
];

export const toolLogos: Record<ToolKey, ToolLogo> = {
  blender: {
    id: 'blender',
    name: 'Blender',
    logo: '/logos/blender/logo.png',
    fallback: 'B',
  },
};

export const contact = {
  email: 'mcdasilva2025@gmail.com',
  location: 'United States / Brazil',
};

export const intro =
  'I create digital environments and objects that translate memory, emotion, and place into spatial experiences.';

export const aboutIntro =
  'Matheus Coutinho da Silva is a Brazilian artist and creative technologist whose work combines digital environments, computation, architecture, and physical making. His practice explores memory, place, migration, domestic space, and emotional atmosphere.';

const projectRecords: ProjectRecord[] = [
  {
    slug: 'the-watchers',
    title: 'The Watchers',
    category: 'Horror',
    year: 'June 2025',
    medium: 'Digital sculpture',
    tools: ['blender'],
    dimensions: 'Variable',
    summary:
      'Figural observers emerging from darkness, attention, and unease.',
    description:
      'A sculptural study of being seen, using enlarged eyes, textured surfaces, and theatrical darkness.',
    artworkFolder: 'horror/the-watchers',
    fallbackBasename: 'the-watchers',
    artworkType: 'horror sculpture final image',
    credits: 'All work by Matheus Coutinho da Silva.',
    collaborators: 'No additional collaborators listed.',
  },
  {
    slug: 'masquerade',
    title: 'Masquerade',
    category: 'Horror',
    year: 'June 2026',
    medium: 'Digital horror image sequence',
    tools: ['blender'],
    dimensions: 'Variable image series',
    summary:
      'A staged horror sequence about concealment, performance, and the instability of identity.',
    description:
      'Masquerade approaches horror through ritualized surfaces, theatrical darkness, and figures that feel both ceremonial and unsafe.',
    artworkFolder: 'horror/masquerade',
    fallbackBasename: 'masquerade',
    artworkType: 'horror final image',
    credits: 'All work by Matheus Coutinho da Silva.',
    collaborators: 'No additional collaborators listed.',
  },
  {
    slug: 'a-mothers-despair',
    title: "A Mother's Despair",
    category: 'Horror',
    year: 'June 2025',
    medium: 'Digital sculpture',
    tools: ['blender'],
    dimensions: 'Variable',
    summary: 'A study of grief, exhaustion, and inherited emotion.',
    description:
      'The portrait is shaped through weight, facial tension, surface fatigue, and subdued light.',
    artworkFolder: 'horror/a-mothers-despair',
    fallbackBasename: 'a-mothers-despair',
    artworkType: 'horror sculpture final image',
    credits: 'All work by Matheus Coutinho da Silva.',
    collaborators: 'No additional collaborators listed.',
  },
  {
    slug: 'its-time-to-go',
    title: "It's Time to Go",
    category: 'Concept Art',
    year: 'June 2026',
    medium: 'Concept art keyframes',
    tools: ['blender'],
    dimensions: 'Variable image series',
    summary:
      'A cinematic departure scene centered on urgency, threshold, and emotional release.',
    description:
      "It's Time to Go frames departure as an atmospheric event, using composition, light, and gesture to hold a moment just before movement.",
    artworkFolder: 'concept-art/its-time-to-go',
    fallbackBasename: 'its-time-to-go',
    artworkType: 'concept art final image',
    credits: 'All work by Matheus Coutinho da Silva.',
    collaborators: 'No additional collaborators listed.',
  },
  {
    slug: 'vigil',
    title: 'Vigil',
    category: 'Concept Art',
    year: 'June 2026',
    medium: 'Concept art keyframes',
    tools: ['blender'],
    dimensions: 'Variable image series',
    summary:
      'A watchful scene built around waiting, silence, and restrained tension.',
    description:
      'Vigil studies a held state of attention through stillness, distance, and a controlled cinematic palette.',
    artworkFolder: 'concept-art/vigil',
    fallbackBasename: 'vigil',
    artworkType: 'concept art final image',
    credits: 'All work by Matheus Coutinho da Silva.',
    collaborators: 'No additional collaborators listed.',
  },
  {
    slug: 'not-yet',
    title: 'Not Yet',
    category: 'Concept Art',
    year: 'May 2026',
    medium: 'Concept art sequence',
    tools: ['blender'],
    dimensions: 'Variable image series',
    summary:
      'A meditation on anticipation and the distance between pressure and release.',
    description:
      'Not Yet holds a suspended moment through cinematic restraint, emotional tension, and the expectation of an event that has not arrived.',
    artworkFolder: 'concept-art/not-yet',
    fallbackBasename: 'not-yet',
    artworkType: 'concept art final image',
    credits: 'All work by Matheus Coutinho da Silva.',
    collaborators: 'No additional collaborators listed.',
  },
  {
    slug: 'unbound',
    title: 'Unbound',
    category: 'Concept Art',
    year: 'May 2026',
    medium: 'Concept art keyframes',
    tools: ['blender'],
    dimensions: 'Variable image series',
    summary:
      'A release from constraint shown through motion, material rupture, and atmosphere.',
    description:
      'Unbound explores the moment a form leaves containment, using light, suspended movement, and visual tension to suggest transformation.',
    artworkFolder: 'concept-art/unbound',
    fallbackBasename: 'unbound',
    artworkType: 'concept art final image',
    artworkPosition: '82% 50%',
    credits: 'All work by Matheus Coutinho da Silva.',
    collaborators: 'No additional collaborators listed.',
  },
  {
    slug: 'the-way-ive-grown',
    title: "The Way I've Grown",
    category: 'Environment Design',
    year: 'July 2026',
    medium: 'Digital environment',
    tools: ['blender'],
    dimensions: 'Variable image series',
    summary:
      'A remembered backyard reconstructed as a quiet meditation on growth.',
    description:
      'This work uses plants, chairs, unfinished walls, and late sunlight to translate family memory into a cinematic scene.',
    artworkFolder: 'environment-design/the-way-ive-grown',
    fallbackBasename: 'the-way-ive-grown',
    artworkType: 'environment design final image',
    credits: 'All work by Matheus Coutinho da Silva.',
    collaborators: 'No additional collaborators listed.',
  },
  {
    slug: 'na-casa-de-titia',
    title: "Na Casa de Titia (At Auntie's House)",
    category: 'Environment Design',
    year: 'June 2026',
    medium: 'Digital environment',
    tools: ['blender'],
    dimensions: 'Variable image series',
    summary:
      'A domestic environment shaped by hospitality, memory, and the quiet intimacy of family space.',
    description:
      "Na Casa de Titia reconstructs an aunt's home as an emotional interior, using thresholds, furniture, surfaces, and afternoon light to suggest remembered presence.",
    artworkFolder: 'environment-design/na-casa-de-titia',
    fallbackBasename: 'na-casa-de-titia',
    artworkType: 'environment design final image',
    credits: 'All work by Matheus Coutinho da Silva.',
    collaborators: 'No additional collaborators listed.',
  },
  {
    slug: 'depois-da-chuva',
    title: 'Depois da Chuva (After the Rain)',
    category: 'Environment Design',
    year: 'July 2026',
    medium: 'Digital environment',
    tools: ['blender'],
    dimensions: 'Variable image series',
    summary:
      'A post-rain environment focused on wet surfaces, softened sound, and charged quiet.',
    description:
      'Depois da Chuva studies the atmosphere after rainfall, where domestic space becomes reflective, hushed, and emotionally suspended.',
    artworkFolder: 'environment-design/depois-da-chuva',
    fallbackBasename: 'depois-da-chuva',
    artworkType: 'environment design final image',
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

export const getProjects = () => projectRecords.map(resolveProject);

export const getProject = (slug: string) =>
  getProjects().find((project) => project.slug === slug);
