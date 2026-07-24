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
  'I work across traditional and digital media, combining art and technology to create environments that translate feelings into experiences.';

export const aboutIntro =
  'Matheus Coutinho da Silva is a Brazilian artist and creative technologist working across traditional and digital media. With a background in computer science, his practice brings together 3D visualization, programming, drawing, and painting. His interdisciplinary approach grew from an interest in using both artistic and computational tools as forms of creative expression.';

const projectRecords: ProjectRecord[] = [
  {
    slug: 'the-watchers',
    title: 'The Watchers',
    category: 'Horror',
    year: 'June 2026',
    medium: 'Blender',
    tools: ['blender'],
    dimensions: '1920 × 1080 px',
    summary:
      'Figural observers emerging from darkness, attention, and unease.',
    description:
      'The Watchers grew from my experience with xenophobia and the persistent \
      feeling of being watched as an outsider. Drawing from psychological horror, \
      I transformed that unease into a wall of concealed eyes: an ambiguous presence \
      where observation becomes judgment, and simply being seen begins to feel threatening.',
    artworkFolder: 'horror/the-watchers',
    fallbackBasename: 'the-watchers',
    artworkType: 'horror sculpture final image',
    credits:
            'Concept, composition, wall and eye-socket modeling/sculpting, custom fog material, lighting, and rendering by Matheus Coutinho da Silva.\n\n' +
            'Third-party assets:\n'+
            '       Eye models: Tiny Eye add-on by Tiny Nocky\n' +
            '       Wall material: “Rotten Human Skin” by Dennis Hafemann, sourced through BlenderKit',
    collaborators: 'No additional collaborators listed.',
  },
  {
    slug: 'masquerade',
    title: 'Masquerade',
    category: 'Horror',
    year: 'June 2026',
    medium: 'Blender',
    tools: ['blender'],
    dimensions: '1920 × 1080 px',
    summary:
      'A staged horror sequence about concealment, performance, and the instability of identity.',
    description:
      'Masquerade explores the distance between appearance and identity.\
       Emerging from darkness, its figures remain obscured by shadow, blur, \
       and distance, reflecting how we know others only through fragments. \
       The work considers the masks we wear and asks how much of anyone, \
       including ourselves, we can ever truly know.',
    artworkFolder: 'horror/masquerade',
    fallbackBasename: 'masquerade',
    artworkType: 'horror final image',
    credits:
            'Concept, composition, modeling, custom fog material, sculpting, shading, lighting, and rendering by Matheus Coutinho da Silva.\n\n' +
            'Third-party assets:\n'+
            '       Porcelain texture: “Porcelain Cracks” by Jonathan Ramos, sourced through BlenderKit\n' +
            '       Pedestal material: “Worn Matte Concrete Ground Texture” by Poliigon',
    collaborators: 'No additional collaborators listed.',
  },
  {
    slug: 'a-mothers-despair',
    title: "A Mother's Despair",
    category: 'Horror',
    year: 'June 2026',
    medium: 'Blender',
    tools: ['blender'],
    dimensions: '1920 × 1080 px',
    summary: 'A study of grief, exhaustion, and inherited emotion.',
    description:
      'Built around the moment when horror overwhelms language, \
      this piece explores the instant when grief becomes too immense to contain. \
      Inspired by the emotional intensity of <em>Hereditary</em> (2018), I used expression, lighting, \
      and motion to capture not the scream itself, but the moment just before it fully forms.',
    artworkFolder: 'horror/a-mothers-despair',
    fallbackBasename: 'a-mothers-despair',
    artworkType: 'horror sculpture final image',
    credits:
            'Concept, composition, modeling, sculpting, shading, lighting, and rendering by Matheus Coutinho da Silva.\n\n' +
            'Third-party assets:\n'+
            '       Skin texture: sourced from 3D Scan Store’s Free 3D Head Model.',
    collaborators: 'No additional collaborators listed.',
  },
  {
    slug: 'its-time-to-go',
    title: "It's Time to Go",
    category: 'Concept Art',
    year: 'June 2026',
    medium: 'Blender',
    tools: ['blender'],
    dimensions: '1920 × 1080 px',
    summary:
      'A cinematic departure scene centered on urgency, threshold, and emotional release.',
    description:
      "This piece explores the intersection between loneliness and peace. \
      The empty chair symbolizes both absence and belonging, \
      surrounded by a landscape that feels like a fading memory of family, love, and home. \
      It reflects the quiet acceptance that some chapters must end, and the peace \
      of carrying what we leave behind with us.",
    artworkFolder: 'concept-art/its-time-to-go',
    fallbackBasename: 'its-time-to-go',
    artworkType: 'concept art final image',
    credits:
            'Concept, composition, modeling, custom fog material, shading, lighting, and rendering by Matheus Coutinho da Silva.\n\n' +
            'Third-party assets:\n'+
            '       HDRIs: “Kiara 8 Sunset” and “Umhlanga Sunrise” by Greg Zaal, sourced from Poly Haven.\n' +
            '       Water and wood materials: sourced through BlenderKit.\n' +
            '       Vegetation asset: sourced through BlenderKit.\n' +
            '       Soil material: “Flat Grass Texture” by Poliigon',
    collaborators: 'No additional collaborators listed.',
  },
  {
    slug: 'vigil',
    title: 'Vigil',
    category: 'Concept Art',
    year: 'June 2026',
    medium: 'Blender',
    tools: ['blender'],
    dimensions: '1920 × 1080 px',
    summary:
      'A watchful scene built around waiting, silence, and restrained tension.',
    description:
      'Vigil explores remembrance as something quiet, fragile, and ongoing. \
      Candles emerge from the darkness like memories: some are distant and fading, \
      while others still burn brightly. The work reflects on grief not only as \
      mourning what is gone, but as honoring what remains and keeping a light \
      alive for what continues to live within us.',
    artworkFolder: 'concept-art/vigil',
    fallbackBasename: 'vigil',
    artworkType: 'concept art final image',
    credits:
            'Concept, composition, modeling, custom fog material, sculpting, shading, lighting, and rendering by Matheus Coutinho da Silva.\n\n' +
            'Third-party assets:\n'+
            '       Materials: sourced through BlenderKit.\n' +
            '       Flame image: sourced from FreeIconsPNG.',
    collaborators: 'No additional collaborators listed.',
  },
  {
    slug: 'not-yet',
    title: 'Not Yet',
    category: 'Concept Art',
    year: 'May 2026',
    medium: 'Blender',
    tools: ['blender'],
    dimensions: '1920 × 1080 px',
    summary:
      'A meditation on anticipation and the distance between pressure and release.',
    description:
      'This piece explores anxiety through a balloon and needle caught in a cycle of near-collision. \
      The impact never comes, yet the balloon recoils as if danger were inevitable. \
      Its fear becomes more powerful than the threat itself, reflecting the exhausting \
      uncertainty of anticipating something that may never happen.',
    artworkFolder: 'concept-art/not-yet',
    fallbackBasename: 'not-yet',
    artworkType: 'concept art final image',
    credits:
            'Concept, composition, modeling, custom balloon and fog materials, shading, lighting, and rendering by Matheus Coutinho da Silva.\n\n' +
            'Third-party assets:\n'+
            '       Floor anchor material: “Matte Brushed Metal Texture,” sourced from Poliigon.\n' +
            '       Additional materials: sourced through BlenderKit.',
    collaborators: 'No additional collaborators listed.',
  },
  {
    slug: 'unbound',
    title: 'Unbound',
    category: 'Concept Art',
    year: 'May 2026',
    medium: 'Blender',
    tools: ['blender'],
    dimensions: '1920 × 1080 px',
    summary:
      'A release from constraint shown through motion, material rupture, and atmosphere.',
    description:
      'This piece explores the bittersweet moment when freedom becomes possible, \
      yet doubt makes us hesitate. The lock is already open and the chains are \
      not attached, suggesting that some barriers hold us even after they lose \
      their power. <em>Unbound</em> shows that sometimes the hardest part of breaking free is realizing we already can.',
    artworkFolder: 'concept-art/unbound',
    fallbackBasename: 'unbound',
    artworkType: 'concept art final image',
    artworkPosition: '85% 50%',
    credits:
            'Concept, composition, modeling, custom fog material, shading, lighting, rendering by Matheus Coutinho da Silva.\n\n' +
            'Third-party assets:\n'+
            '       Additional materials: sourced through BlenderKit.',
    collaborators: 'No additional collaborators listed.',
  },
  {
    slug: 'the-way-ive-grown',
    title: "The Way I've Grown",
    category: 'Environment Design',
    year: 'July 2026',
    medium: 'Blender',
    tools: ['blender'],
    dimensions: '1920 × 1080 px',
    summary:
      'A remembered backyard reconstructed as a quiet meditation on growth.',
    description:
      'You don’t realize you’re making memories while you’re living them. \
      Growing up in Brazil, these were ordinary afternoons: laundry drying outside, \
      a bicycle in the yard, worn paths through the grass. Only after leaving home did \
      I understand how these small, everyday things shaped my sense of comfort, family, and belonging.',
    artworkFolder: 'environment-design/the-way-ive-grown',
    fallbackBasename: 'the-way-ive-grown',
    artworkType: 'environment design final image',
    credits:
            'Concept, composition, custom fog material, house modeling, environment design, scene assembly, lighting, rendering, and post-processing by Matheus Coutinho da Silva.\n\n' +
            'Third-party assets:\n'+
            '       HDRI: “Spruit Sunrise” by Greg Zaal, sourced from Poly Haven.\n' +
            '       Power pole model: “Power Pole Street” by henriquecgtrader, sourced from CGTrader.\n' +
            '       Clothesline and clothing models: “Clothes Line” by Fridge, sourced from Sketchfab.\n' +
            '       Other 3D models: sourced from BlenderKit.\n' +
            '       Vegetation assets: Botaniq add-on.\n' +
            '       Selected materials: Materialiq add-on.',
    collaborators: 'No additional collaborators listed.',
  },
  {
    slug: 'na-casa-de-titia',
    title: "Na Casa de Titia (At Auntie's House)",
    category: 'Environment Design',
    year: 'June 2026',
    medium: 'Blender',
    tools: ['blender'],
    dimensions: '1920 × 1080 px',
    summary:
      'A domestic environment shaped by hospitality, memory, and the quiet intimacy of family space.',
    description:
      "<em>Na Casa de Titia</em> reflects the warmth of Brazilian domestic life through \
      memories of coffee, lace, gardens, and conversations in the afternoon. \
      Rather than reconstructing one especific place, I assembled fragments of many. \
      The scene explores how memory idealizes home, preserving not spaces \
      exactly as they were, but how they felt.",
    artworkFolder: 'environment-design/na-casa-de-titia',
    fallbackBasename: 'na-casa-de-titia',
    artworkType: 'environment design final image',
    credits:
            'Concept, composition, custom fog material, primary environment and object modeling, scene assembly, lighting, rendering, and post-processing by Matheus Coutinho da Silva.\n\n' +
            'Third-party assets:\n'+
            '       HDRI: “Alps Field” by Andreas Mischok, sourced from Poly Haven.\n' +
            '       Lace material: “Lace Band 4” by Dovydas Alvydas, sourced from BlenderKit.\n' +
            '       Coffee texture: “Coffee Foam Atlas Texture, Black and Brown,” sourced from Poliigon.\n' +
            '       Grass texture: “Flat Grass Texture,” sourced from Poliigon.\n' +
            '       Some materials and models: sourced from BlenderKit, Materialiq add-on, and Interniq add-on.\n' +
            '       Vegetation, plants, rocks, and selected environmental assets: Botaniq add-on.',
    collaborators: 'No additional collaborators listed.',
  },
  {
    slug: 'depois-da-chuva',
    title: 'Depois da Chuva (After the Rain)',
    category: 'Environment Design',
    year: 'July 2026',
    medium: 'Blender',
    tools: ['blender'],
    dimensions: '1920 × 1080 px',
    summary:
      'A post-rain environment focused on wet surfaces, softened sound, and charged quiet.',
    description:
      '<em>Depois da Chuva</em> captures a moment I remember vividly from Brazil: \
      the strange stillness after a rainstorm, when wet concrete reflects the returning light, \
      mangoes lie scattered across the ground, and the smell of damp earth fills the air. \
      The scene recreates that brief pause before everyday life resumes.',
    artworkFolder: 'environment-design/depois-da-chuva',
    fallbackBasename: 'depois-da-chuva',
    artworkType: 'environment design final image',
    credits:
            'Concept, composition, custom fog material, house and architectural modeling, metal fences, handrails, scene assembly, lighting, rendering, and post-processing by Matheus Coutinho da Silva.\n\n' +
            'Third-party assets:\n'+
            '       HDRI: “Belfast Farmhouse” by Dimitrios Savva and Jarod Guest, sourced from Poly Haven.\n' +
            '       Materials: Materialiq add-on and BlenderKit.\n' +
            '       Vegetation assets: Botaniq add-on.\n' +
            '       Interior and prop assets: Interniq add-on and BlenderKit.\n' +
            '       Stairs, windows, and doors: Archimesh add-on.',
    collaborators: 'No additional collaborators listed.',
  },
];

export const getProjects = () => projectRecords.map(resolveProject);

export const getProject = (slug: string) =>
  getProjects().find((project) => project.slug === slug);
