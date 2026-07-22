export type Artwork = {
  src: string;
  alt: string;
  ratio: string;
  type: string;
  caption?: string;
  poster?: string;
};

export type Project = {
  slug: string;
  title: string;
  year: string;
  medium: string;
  software: string;
  dimensions: string;
  summary: string;
  description: string;
  hero: Artwork;
  gallery: Artwork[];
  credits: string;
  collaborators: string;
  series?: {
    title: string;
    metadata: string;
    description: string;
    images: Artwork[];
  }[];
};

const art = (
  src: string,
  alt: string,
  ratio = '16:9',
  type = 'final image',
): Artwork => ({ src, alt, ratio, type, caption: alt });

const video = (
  src: string,
  alt: string,
  poster: string,
  ratio = '16:9',
): Artwork => ({
  src,
  alt,
  ratio,
  type: 'final video',
  caption: alt,
  poster,
});

export const contact = {
  email: 'matheus.c.dasilva@gmail.com',
  instagram: '@matheus.cdasilva',
  location: 'United States / Brazil',
};

export const intro =
  'I create digital environments and objects that translate memory, emotion, and place into spatial experiences.';

export const aboutIntro =
  'Matheus Coutinho da Silva is a Brazilian artist and creative technologist whose work combines digital environments, computation, architecture, and physical making. His practice explores memory, place, migration, domestic space, and emotional atmosphere.';

export const projects: Project[] = [
  {
    slug: 'landscapes-that-raised-me',
    title: 'Landscapes That Raised Me',
    year: '2026',
    medium: 'Ongoing series: digital environments',
    software: 'Blender, Photoshop, Unreal Engine',
    dimensions: 'Variable dimensions',
    summary:
      'Remembered Brazilian domestic landscapes reconstructed through light, objects, and atmosphere.',
    description:
      'An ongoing exploration of places that shaped childhood in Brazil. These environments are not exact replicas but emotional reconstructions assembled from memory, family architecture, domestic routines, and weather.',
    hero: art(
      '/artwork/landscapes/landscapes-hero.png',
      'landscapes-hero.png',
      '16:9',
      'series hero image',
    ),
    gallery: [
      art(
        '/artwork/landscapes/the-way-ive-grown-final-01.png',
        'the-way-ive-grown-final-01.png',
      ),
      art(
        '/artwork/landscapes/depois-da-chuva-final-01.png',
        'depois-da-chuva-final-01.png',
      ),
      art(
        '/artwork/landscapes/na-casa-de-titia-final-01.png',
        'na-casa-de-titia-final-01.png',
      ),
    ],
    credits: 'All work by Matheus Coutinho da Silva.',
    collaborators: 'No additional collaborators listed.',
    series: [
      {
        title: "The Way I've Grown",
        metadata:
          '2026 - Digital environment - Blender - Variable dimensions',
        description:
          "A reconstruction of the backyard of my grandmother's house, where growth appears through furniture, plants, and the feeling of time stretching.",
        images: [
          art(
            '/artwork/landscapes/the-way-ive-grown-final-01.png',
            'the-way-ive-grown-final-01.png',
          ),
        ],
      },
      {
        title: 'Depois da Chuva',
        metadata: '2026 - Digital environment - Blender',
        description:
          'A courtyard after rain, focused on wet walls, softened sound, and the charged quiet after a storm.',
        images: [
          art(
            '/artwork/landscapes/depois-da-chuva-final-01.png',
            'depois-da-chuva-final-01.png',
          ),
        ],
      },
      {
        title: 'Na Casa de Titia',
        metadata: '2026 - Digital environment - Blender',
        description:
          'A domestic interior held between hospitality and memory, composed through thresholds, tiled surfaces, and afternoon light.',
        images: [
          art(
            '/artwork/landscapes/na-casa-de-titia-final-01.png',
            'na-casa-de-titia-final-01.png',
          ),
        ],
      },
    ],
  },
  {
    slug: 'the-way-ive-grown',
    title: "The Way I've Grown",
    year: '2026',
    medium: 'Digital environment',
    software: 'Blender, Photoshop',
    dimensions: 'Variable dimensions',
    summary:
      'A remembered backyard reconstructed as a quiet meditation on growth.',
    description:
      'This work uses plants, chairs, unfinished walls, and late sunlight to translate family memory into a cinematic scene.',
    hero: art(
      '/artwork/landscapes/the-way-ive-grown-final-01.png',
      'the-way-ive-grown-final-01.png',
    ),
    gallery: [
      art(
        '/artwork/landscapes/the-way-ive-grown-final-01.png',
        'the-way-ive-grown-final-01.png',
      ),
    ],
    credits: 'All work by Matheus Coutinho da Silva.',
    collaborators: 'No additional collaborators listed.',
  },
  {
    slug: 'not-yet',
    title: 'Not Yet',
    year: '2026',
    medium: 'Single-channel looping animation, sound',
    software: 'Blender, FL Studio, Audition',
    dimensions: '00:45',
    summary:
      'A meditation on anticipation and the distance between a needle and a balloon.',
    description:
      'Not Yet holds a suspended moment between pressure and release through animation, sound, and cinematic restraint.',
    hero: art(
      '/artwork/not-yet/not-yet-poster.png',
      'not-yet-poster.png',
      '16:9',
      'video poster image',
    ),
    gallery: [
      video(
        '/artwork/not-yet/not-yet-video.mp4',
        'not-yet-video.mp4',
        '/artwork/not-yet/not-yet-poster.png',
      ),
      art(
        '/artwork/not-yet/not-yet-poster.png',
        'not-yet-poster.png',
        '16:9',
        'video poster image',
      ),
    ],
    credits:
      'Animation, sound, and direction by Matheus Coutinho da Silva.',
    collaborators: 'No additional collaborators listed.',
  },
  {
    slug: 'digital-atelier',
    title: 'Digital Atelier',
    year: '2025',
    medium: 'Interactive art / creative coding',
    software: 'WebGL, JavaScript, GLSL, p5.js, Three.js',
    dimensions: 'Browser-based experiments',
    summary:
      'A laboratory for interfaces, particles, generative systems, and coded material behavior.',
    description:
      'Digital Atelier collects interactive experiments where computation becomes a brush for simulating cloth, particles, surfaces, and responsive tools.',
    hero: art(
      '/artwork/digital-atelier/digital-atelier-interface.png',
      'digital-atelier-interface.png',
    ),
    gallery: [
      art(
        '/artwork/digital-atelier/digital-atelier-interface.png',
        'digital-atelier-interface.png',
      ),
      art(
        '/artwork/digital-atelier/digital-atelier-particles.png',
        'digital-atelier-particles.png',
      ),
      art(
        '/artwork/digital-atelier/digital-atelier-generative.png',
        'digital-atelier-generative.png',
      ),
    ],
    credits: 'All experiments by Matheus Coutinho da Silva.',
    collaborators: 'No additional collaborators listed.',
  },
  {
    slug: 'the-watchers',
    title: 'The Watchers',
    year: '2025',
    medium: 'Digital sculpture',
    software: 'ZBrush, Blender, Substance 3D',
    dimensions: 'Variable',
    summary:
      'Figural observers emerging from darkness, attention, and unease.',
    description:
      'A sculptural study of being seen, using enlarged eyes, textured surfaces, and theatrical darkness.',
    hero: art(
      '/artwork/watchers/watchers-final.png',
      'watchers-final.png',
      '4:5',
      'final render',
    ),
    gallery: [
      art(
        '/artwork/watchers/watchers-final.png',
        'watchers-final.png',
        '4:5',
        'final render',
      ),
    ],
    credits: 'All work by Matheus Coutinho da Silva.',
    collaborators: 'No additional collaborators listed.',
  },
  {
    slug: 'a-mothers-despair',
    title: "A Mother's Despair",
    year: '2025',
    medium: 'Digital sculpture',
    software: 'Blender, ZBrush',
    dimensions: 'Variable',
    summary: 'A study of grief, exhaustion, and inherited emotion.',
    description:
      'The portrait is shaped through weight, facial tension, surface fatigue, and subdued light.',
    hero: art(
      '/artwork/mothers-despair/mothers-despair-final.png',
      'mothers-despair-final.png',
      '16:9',
      'final render',
    ),
    gallery: [
      art(
        '/artwork/mothers-despair/mothers-despair-final.png',
        'mothers-despair-final.png',
        '16:9',
        'final render',
      ),
    ],
    credits: 'All work by Matheus Coutinho da Silva.',
    collaborators: 'No additional collaborators listed.',
  },
  {
    slug: 'designed-space',
    title: 'Designed Space',
    year: '2026',
    medium: 'Architectural visualization',
    software: 'AutoCAD, Blender, Photoshop',
    dimensions: 'Plans, renders, walkthrough',
    summary:
      'A designed coastal residence explored through plans, interiors, exteriors, and walkthrough.',
    description:
      'This project frames architecture as atmosphere, moving from measured drawings to cinematic interior and exterior views.',
    hero: art(
      '/artwork/designed-space/designed-space-exterior.png',
      'designed-space-exterior.png',
    ),
    gallery: [
      art(
        '/artwork/designed-space/designed-space-exterior.png',
        'designed-space-exterior.png',
      ),
      art(
        '/artwork/designed-space/designed-space-interior.png',
        'designed-space-interior.png',
      ),
      art(
        '/artwork/designed-space/designed-space-plan.png',
        'designed-space-plan.png',
        '16:9',
        'architectural plan',
      ),
      video(
        '/artwork/designed-space/designed-space-walkthrough.mp4',
        'designed-space-walkthrough.mp4',
        '/artwork/designed-space/designed-space-exterior.png',
      ),
    ],
    credits: 'Design and visualization by Matheus Coutinho da Silva.',
    collaborators: 'No additional collaborators listed.',
  },
  {
    slug: 'material-traditional-studies',
    title: 'Material & Traditional Studies',
    year: '2024-2026',
    medium: 'Drawings, paintings, sculpture, physical studies',
    software: 'Graphite, charcoal, clay, acrylic, Blender',
    dimensions: 'Various',
    summary:
      'Physical studies that inform and correct the digital practice.',
    description:
      'A selection of drawings, paintings, photographs, and sculptural observations used as foundations for digital work.',
    hero: art(
      '/artwork/material-studies/material-studies-hero.png',
      'material-studies-hero.png',
    ),
    gallery: [
      art(
        '/artwork/material-studies/figure-drawing.png',
        'figure-drawing.png',
        '3:4',
        'figure drawing',
      ),
      art(
        '/artwork/material-studies/tree-study.png',
        'tree-study.png',
        '3:4',
        'charcoal study',
      ),
      art(
        '/artwork/material-studies/ceramic-object.png',
        'ceramic-object.png',
        '4:5',
        'object study',
      ),
    ],
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
