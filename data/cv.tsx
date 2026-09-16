import type { ReactNode } from 'react';

const collegeVenue = 'Fayerweather Hall, Amherst College, Amherst, MA, USA';
const onlineVenue = 'Online exhibition, BRASA (Brazilian Student Association), Brazil';

export const exhibitions = [
  { kind: 'Solo', title: 'Interactive Art', description: 'Selected creative coding works, curated by BRASA', venue: onlineVenue, date: 'September 2026' },
  { kind: 'Solo', title: 'Environment Design', description: 'Selected 3D works, curated by BRASA', venue: onlineVenue, date: 'August 2026' },
  { kind: 'Group', title: 'Oh, My Dear', description: 'Curated by Professor Robert T. Sweeney', venue: collegeVenue, date: 'August 2026' },
  { kind: 'Solo', title: 'Symbolic Art', description: 'Selected 3D works, curated by BRASA', venue: onlineVenue, date: 'July 2026' },
  { kind: 'Group', title: 'I Saw You First', description: 'Curated by Professor Gabriel Phipps', venue: collegeVenue, date: 'July 2026' },
  { kind: 'Solo', title: 'Horror', description: 'Selected 3D works, curated by BRASA', venue: onlineVenue, date: 'June 2026' },
  { kind: 'Group', title: 'The End of The World', description: 'Curated by Professor Gabriel Phipps', venue: collegeVenue, date: 'April 2026' },
  { kind: 'Group', title: 'Restless', description: 'Curated by Professor David I. Gloman', venue: collegeVenue, date: 'March 2026' },
  { kind: 'Group', title: 'Quiet!', description: 'Curated by Professor Robert T. Sweeney', venue: collegeVenue, date: 'February 2026' },
  { kind: 'Group', title: 'Within', description: 'Curated by Professor Robert T. Sweeney', venue: collegeVenue, date: 'January 2026' },
  { kind: 'Group', title: 'Do Not Trust', description: 'Curated by Professor David I. Gloman', venue: collegeVenue, date: 'December 2025' },
];

export const awards: [ReactNode, string][] = [
  [<>B.A. awarded <em>cum laude</em>. Amherst College.</>, '2025'],
  ['Associate Member Nominee. Sigma Xi – The Scientific Research Honor Society.', '2025'],
  ['1st Place (Individual). Quora Question Pairs Task, Deep Learning Systems Final Competition (Georg-August-Universität Göttingen).', '2024'],
  ['1st Place (Team). Overall Team, Deep Learning Systems Final Competition (Georg-August-Universität Göttingen).', '2024'],
  ['Scholarship Recipient. Brazilian Student Association (BRASA): 12 recipients out of 287 applicants.', '2021'],
  ['Fellow. Prep Estudar Fora. Selective Fundação Estudar program preparing Brazilian students for admission to universities abroad: 46 admitted out of 7,561 applicants.', '2020'],
  ['Finalist. EF Challenge 2020. International public speaking competition focused on global issues: 8 finalists selected out of 1,150 participants.', '2020'],
  ['Youth Ambassador. Youth Ambassadors Program, USA. U.S. Department of State exchange program focused on leadership, civic engagement, and cross-cultural exchange: 50 admitted out of 7,000+ applicants.', '2020'],
  ['Silver medal. Brazilian Biology Olympiad (OBB): only silver medalist from Rio de Janeiro; 47 silver medals out of 125,000 contestants.', '2019'],
  ['Fellow. Clubes de Ciência Brasil (Science Clubs Brazil). Science immersion and mentorship program in which students develop research projects with university researchers: 100 admitted out of 500 applicants.', '2019'],
  ['Golden Feather Student. Awarded to the valedictorian of Colégio Pedro II: 1 out of 255 students.', '2019'],
  ['Fellow. Latin American Leadership Academy, Ecuador: 26 admitted out of 700 applicants.', '2019'],
  ['Finalist. Prêmio Prudential Espírito Comunitário. Brazilian youth volunteerism award recognizing community service initiatives with social impact: 10 finalists out of 1,500+ applicants.', '2019'],
];

export const selectedSkills = [
  ['Programming & Scientific Computing', 'Python, Java, JavaScript, PHP, MATLAB'],
  ['Web Development', 'HTML, CSS, Bootstrap'],
  ['Design & Simulation Tools', 'AutoCAD, Revit, SketchUp, Blender, Roblox Studio, Adobe Acrobat, Processing'],
  ['Development & Tools', 'Git (GitHub), VS Code, Overleaf'],
  ['Data & Analytics', 'Pandas, scikit-learn, TensorFlow, PyTorch, Transformers, SentenceTransformers, Excel'],
  ['Other Competencies', 'Google Colab, HPC clusters'],
  ['Languages', 'Portuguese (native), English (fluent), Spanish (intermediate), French (basic), German (basic)'],
];

export const mentoring: ExperienceItem = {
  organization: 'AI in The Liberal Arts Initiative (Amherst College)',
  location: 'Amherst, MA, USA',
  role: 'AI Tools and Mentorship Intern; Supervisor: Professor Lee Spector',
  date: 'February–December 2023',
  details: [
    'Fostered inclusive and collaborative discussions and activities centered around artificial intelligence, promoting multi-directional interactions between research in AI and various fields within the humanities.',
    'Shared AI and machine learning tools with the campus community.',
    'Created tutorials and led exhibitions on how to use these tools for tasks like automating literary analysis, conducting historical data trends, and generating AI-driven art and multimedia content.',
  ],
};

type ExperienceGroup = {
  title: string;
  details: ReactNode[];
};

type ExperienceItem = {
  organization: string;
  location: string;
  role: string;
  date: string;
  details?: ReactNode[];
  groups?: ExperienceGroup[];
};

export const experience: ExperienceItem[] = [
  {
    organization: 'Torus Knot 3D Designs',
    location: 'Holyoke, MA, USA',
    role: 'Architectural & 3D Designer',
    date: 'June 2025 – Present',
    groups: [
      {
        title: 'Client Project – Custom Furniture Design & Fabrication',
        details: [
          'Designed a custom side table from concept through final client approval.',
          'Refined the 3D model through multiple iterations based on client feedback.',
          'Fabricated the approved designs through 3D printing and prepared components for assembly and finishing.',
          'Executed a multi-stage finishing process involving putty, resin, repeated sanding, priming, and painting to achieve a production-quality finish resembling conventionally manufactured furniture.',
          'Balanced aesthetic intent with printability, surface quality, and fabrication constraints.',
        ],
      },
      {
        title: 'Client Project - Commercial Drafting & Shop Drawings',
        details: [
          'Prepared shop drawings and construction documentation for commercial glazing and curtain wall systems.',
          'Produced detailed CAD drawings for fabrication and field installation.',
          'Interpreted architectural plans and specifications to generate accurate submittal packages.',
          'Coordinated with project managers, fabricators, and installers to ensure dimensional accuracy and constructability.',
          'Assisted in revising drawings based on field conditions and engineering review.',
        ],
      },
      {
        title: 'Client Project - Residential Architectural Visualization II',
        details: [
          'Collaborated directly with the client to translate architectural concepts, visual references, and functional requirements into a cohesive residential visualization package.',
          'Developed a detailed 3D model and complete interior sequence encompassing the kitchen, dining and living areas, bedrooms, bathrooms, storage spaces, entry, and courtyard-facing transitions.',
          'Produced high-resolution interior and exterior renderings to communicate spatial organization, circulation, furniture and fixture placement, material finishes, lighting conditions, and the relationship between the residence and its garden areas.',
          'Created a fully animated architectural walkthrough to communicate spatial flow, transitions between rooms, and the overall experience of moving through the residence.',
          'Managed iterative client review and design refinement, using presentation layouts, detail views, and animation previews to support decisions involving storage, fixtures, atmosphere, outdoor use, and the overall visual language of the home.',
        ],
      },
      {
        title: 'Client Project - Residential Architectural Visualization',
        details: [
          'Communicated directly with the client to refine scope, materials, and design intent.',
          'Delivered architectural visualization solutions through 2D floor plans and detailed 3D building models for residential projects.',
          'Produced architectural renderings including elevations, sectional perspectives, and layout views.',
          'Directed client project from scoping to delivery, including a full residential design visualization with 115+ renderings and layouts, ensuring on-time completion within 4 revision cycles.',
        ],
      },
      {
        title: 'Client Project - Custom Pendant Design & Fabrication',
        details: [
          'Interpreted schematic drawings to construct precise 3D geometry within strict dimension constraints.',
          'Modeled raised-detail elements while preserving fine-detail integrity at small scale.',
          'Generated fabrication-ready file and produced physical 3D printed prototype.',
          'Evaluated material finishes and surface aesthetics based on client specification.',
        ],
      },
      {
        title: 'Commercial Product Modeling & Visualization (E-commerce Clients)',
        details: [
          'Designed and modeled physical consumer products for online retail platforms.',
          'Developed parametric 3D models optimized for additive manufacturing and repeat production.',
          'Created high-resolution photorealistic renderings for product listings and marketing materials.',
          'Integrated real-world scale, material behavior, and manufacturing constraints into model development.',
          'Iterated designs based on customer feedback and production testing.',
        ],
      },
      {
        title: 'Sculptural & Character Modeling Commissions',
        details: [
          <>Produced advanced organic 3D models in <em>Blender</em> with emphasis on anatomical accuracy and surface realism.</>,
          'Conducted lighting and material studies to simulate various production finishes.',
          'Delivered presentation-ready renders for digital publication and client review.',
          'Applied structural reasoning and proportion control to complex organic geometries.',
        ],
      },
    ],
  },
  {
    organization: 'iD Tech Camps - Southern New Hampshire University',
    location: 'Manchester, NH, USA',
    role:
      'On-Campus Instructor: Machine Learning & Roblox Development',
    date: 'June-August 2025',
    details: [
      <>Instructed 12 students across two tracks: 5 students (ages 7–9) in <em>Roblox</em> game development, and 7 students (ages 13–17) in Python programming, AI fundamentals, and machine learning.</>,
      <>In <em>Python Camp</em>, guided students in building projects such as a Rock-Paper-Scissors ML model and AI-powered assistants, using <em>NumPy</em>, <em>Teachable Machine</em>, and <em>OpenAI</em> tools.</>,
      <>In <em>Roblox Camp</em>, instructed students on game design and monetization, enabling each student to publish their own playable online game by the end of the week.</>,
      'Achieved a 100% student project completion rate; consistently recognized by camp director for strong classroom leadership and adaptability.'
    ],
  },
];

export const researchExperience: ExperienceItem[] = [
  {
    organization: 'Amherst College',
    location: 'Amherst, MA, USA',
    role: 'NLP Software Engineering Intern – Conversational AI Systems; Advisors: Professor Jaime Dávila & Lee Spector',
    date: 'September 2024-May 2025',
    details: [
      'Architected and implemented a modular conversational AI system with support for personality-driven interactions.',
      'Engineered custom components for goal-driven dialogue management, curiosity-based prompting, and emotional response modeling.',
      'Integrated long-term memory and internal state tracking to enable adaptive and context-aware conversations.',
      'Conducted system-level benchmarking and iterative tuning to improve response quality and user engagement.',
      'Synthesized NLP research into actionable system designs, aligning implementation with current trends in LLM behavior modeling.',
      'Authored technical documentation detailing architecture, training processes, and evaluation metrics.',
    ],
  },
  {
    organization: 'Georg-August-Universität Göttingen',
    location: 'Göttingen, Lower Saxony, Germany',
    role: 'NLP Software Engineering Intern – Deep Learning Systems; Supervisor: Professor Terry Ruas',
    date: 'March-August 2024',
    details: [
      'Developed and deployed scalable deep learning pipelines for five core NLP tasks, including semantic matching and paraphrase generation.',
      'Refactored training workflows to support distributed processing across multi-GPU clusters, reducing training time by over 40%.',
      'Applied advanced tuning strategies to increase model performance on benchmark datasets (e.g., +12% on Quora Question Pairs).',
      'Prototyped and validated enhancements to transformer-based model architectures to improve generalization.',
      'Collaborated in a cross-functional team, contributing to codebase maintenance, evaluation scripts, and dataset preprocessing.'
    ],
  },
  {
    organization: 'University of Massachusetts Amherst',
    location: 'Amherst, MA, USA',
    role: 'NLP Software Engineering Intern – Word Meaning Modeling; Principal Investigator: Professor Jaime Dávila',
    date: 'June-July 2023',
    details: [
      'Implemented and trained neural network models to simulate human semantic understanding.',
      'Deployed experiments on HPC clusters and cloud platforms, optimizing model throughput and training stability.',
      'Built reusable tools for data visualization and model diagnostics to support result interpretation',
      'Onboarded lab members to internal tooling by developing onboarding materials and live walkthroughs',
      'Maintained a version-controlled research notebook documenting experiments, outcomes, and key learnings',
    ],
  },
  {
    organization: 'Amherst College',
    location: 'Amherst, MA, USA',
    role: 'Java Developer – Lottery Simulation',
    date: 'February–May 2022',
    details: [
      'Created a comprehensive Java-based simulation of a lottery game, which allowed users to engage with a traditional gambling format, emulating real-life betting dynamics.',
      'Implemented a robust betting system that accommodates various wagering options, including two-digit, three-digit, and four-digit combinations, reflecting authentic gameplay.',
      'Established a randomized drawing mechanism to determine winning outcomes, ensuring a fair simulation that mirrors the excitement of actual game rounds.',
      'Managed player bets, funds, and winnings based on predefined odds, enhancing the overall user experience.',
      'Utilized object-oriented programming concepts to enhance code reusability and modularity, facilitating easier maintenance and updates.',
    ],
  },
];

