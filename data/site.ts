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
  email: 'matheus.c.dasilva@gmail.com',
  instagram: '@matheus.cdasilva',
  location: 'United States / Brazil',
};

export const intro =
  'I create digital environments and objects that translate memory, emotion, and place into spatial experiences.';

export const aboutIntro =
  'Matheus Coutinho da Silva is a Brazilian artist and creative technologist whose work combines digital environments, computation, architecture, and physical making. His practice explores memory, place, migration, domestic space, and emotional atmosphere.';

const landscapesImages = projectImages(
  'environment-design',
  'landscapes-that-raised-me',
  'environment design final image',
);
const grownImages = projectImages(
  'environment-design',
  'the-way-ive-grown',
  'environment design final image',
);
const designedSpaceImages = projectImages(
  'environment-design',
  'designed-space',
  'architectural visualization final image',
);
const notYetImages = projectImages('horror', 'not-yet', 'horror final image');
const watchersImages = projectImages(
  'horror',
  'the-watchers',
  'horror sculpture final image',
);
const mothersDespairImages = projectImages(
  'horror',
  'a-mothers-despair',
  'horror sculpture final image',
);
const atelierImages = projectImages(
  'concept-art',
  'digital-atelier',
  'concept art final image',
);
const materialStudiesImages = projectImages(
  'concept-art',
  'material-traditional-studies',
  'concept art final image',
);

export const projects: Project[] = [
  {
    slug: 'landscapes-that-raised-me',
    title: 'Landscapes That Raised Me',
    category: 'Environment Design',
    year: '2026',
    medium: 'Ongoing series: digital environments',
    software: 'Blender, Photoshop, Unreal Engine',
    dimensions: 'Variable dimensions',
    summary:
      'Remembered Brazilian domestic landscapes reconstructed through light, objects, and atmosphere.',
    description:
      'An ongoing exploration of places that shaped childhood in Brazil. These environments are not exact replicas but emotional reconstructions assembled from memory, family architecture, domestic routines, and weather.',
    hero: landscapesImages[0],
    gallery: landscapesImages,
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
    dimensions: 'Variable dimensions',
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
    slug: 'designed-space',
    title: 'Designed Space',
    category: 'Environment Design',
    year: '2026',
    medium: 'Architectural visualization',
    software: 'AutoCAD, Blender, Photoshop',
    dimensions: 'Plans, renders, walkthrough',
    summary:
      'A designed coastal residence explored through plans, interiors, exteriors, and atmosphere.',
    description:
      'This project frames architecture as atmosphere, moving from measured drawings to cinematic interior and exterior views.',
    hero: designedSpaceImages[0],
    gallery: designedSpaceImages,
    credits: 'Design and visualization by Matheus Coutinho da Silva.',
    collaborators: 'No additional collaborators listed.',
  },
  {
    slug: 'not-yet',
    title: 'Not Yet',
    category: 'Horror',
    year: '2026',
    medium: 'Single-channel animation stills, sound study',
    software: 'Blender, FL Studio, Audition',
    dimensions: '00:45',
    summary:
      'A meditation on anticipation and the distance between a needle and a balloon.',
    description:
      'Not Yet holds a suspended moment between pressure and release through cinematic restraint, sound, and psychological tension.',
    hero: notYetImages[0],
    gallery: notYetImages,
    credits:
      'Animation, sound, and direction by Matheus Coutinho da Silva.',
    collaborators: 'No additional collaborators listed.',
  },
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
    slug: 'digital-atelier',
    title: 'Digital Atelier',
    category: 'Concept Art',
    year: '2025',
    medium: 'Interactive art / creative coding',
    software: 'WebGL, JavaScript, GLSL, p5.js, Three.js',
    dimensions: 'Browser-based experiments',
    summary:
      'A laboratory for interfaces, particles, generative systems, and coded material behavior.',
    description:
      'Digital Atelier collects interactive experiments where computation becomes a brush for simulating cloth, particles, surfaces, and responsive tools.',
    hero: atelierImages[0],
    gallery: atelierImages,
    credits: 'All experiments by Matheus Coutinho da Silva.',
    collaborators: 'No additional collaborators listed.',
  },
  {
    slug: 'material-traditional-studies',
    title: 'Material & Traditional Studies',
    category: 'Concept Art',
    year: '2024-2026',
    medium: 'Drawings, paintings, sculpture, physical studies',
    software: 'Graphite, charcoal, clay, acrylic, Blender',
    dimensions: 'Various',
    summary:
      'Physical studies that inform and correct the digital practice.',
    description:
      'A selection of drawings, paintings, photographs, and sculptural observations used as foundations for digital work.',
    hero: materialStudiesImages[0],
    gallery: materialStudiesImages,
    credits: 'All studies by Matheus Coutinho da Silva.',
    collaborators: 'No additional collaborators listed.',
  },
];

export const selectedSlugs = [
  'landscapes-that-raised-me',
  'not-yet',
  'digital-atelier',
  'the-watchers',
  'a-mothers-despair',
  'designed-space',
  'material-traditional-studies',
];

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);
