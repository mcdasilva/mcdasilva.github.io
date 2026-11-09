import type { ReactNode } from 'react';

export const defaultExhibitionCurator = 'BRASA (Brazilian Student Association)';
const onlineVenue = 'Online exhibition, BRASA, Brazil';
// Current BRASA version. When ready, comment out this exhibitions array
// and uncomment the official-curator version directly below it.
export const exhibitions = [
  { kind: 'Group', title: 'Oh, My Dear', curator: '', venue: onlineVenue, date: 'August 2026' },
  { kind: 'Group', title: 'I Saw You First', curator: '', venue: onlineVenue, date: 'July 2026' },
  { kind: 'Group', title: 'The End of The World', curator: '', venue: onlineVenue, date: 'April 2026' },
  { kind: 'Group', title: 'Restless', curator: '', venue: onlineVenue, date: 'March 2026' },
  { kind: 'Group', title: 'Quiet!', curator: '', venue: onlineVenue, date: 'February 2026' },
  { kind: 'Group', title: 'Within', curator: '', venue: onlineVenue, date: 'January 2026' },
  { kind: 'Group', title: 'Do Not Trust', curator: '', venue: onlineVenue, date: 'December 2025' },
];

/* Official-curator version — uncomment when ready.
const collegeVenue = 'Fayerweather Hall, Amherst College, Amherst, MA, USA';
export const exhibitions = [
  { kind: 'Group', title: 'Oh, My Dear', curator: 'Professor Robert T. Sweeney', venue: collegeVenue, date: 'August 2026' },
  { kind: 'Group', title: 'I Saw You First', curator: 'Professor Gabriel Phipps', venue: collegeVenue, date: 'July 2026' },
  { kind: 'Group', title: 'The End of The World', curator: 'Professor Gabriel Phipps', venue: collegeVenue, date: 'April 2026' },
  { kind: 'Group', title: 'Restless', curator: 'Professor David I. Gloman', venue: collegeVenue, date: 'March 2026' },
  { kind: 'Group', title: 'Quiet!', curator: 'Professor Robert T. Sweeney', venue: collegeVenue, date: 'February 2026' },
  { kind: 'Group', title: 'Within', curator: 'Professor Robert T. Sweeney', venue: collegeVenue, date: 'January 2026' },
  { kind: 'Group', title: 'Do Not Trust', curator: 'Professor David I. Gloman', venue: collegeVenue, date: 'December 2025' },
];
*/

export const features = {
  organization: 'BRASA (Brazilian Student Association)',
  location: 'Online, Brazil',
  role: 'Featured Artist',
  date: 'June–October 2026',
  selections: [
    {title: 'Animation', description: 'Selected creative coding works', date: 'October 2026'},
    {title: 'Interactive Art', description: 'Selected creative coding works', date: 'September 2026'},
    {title: 'Environment Design', description: 'Selected 3D works', date: 'August 2026'},
    {title: 'Symbolic Art', description: 'Selected 3D works', date: 'July 2026'},
    {title: 'Horror', description: 'Selected 3D works', date: 'June 2026'},
  ],
};
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
type ExperienceItem = {
  organization: string;
  location: string;
  role: string;
  date: string;
  details?: ReactNode[];
  groups?: {title: string; details: ReactNode[]}[];
};
export const mentoring: ExperienceItem = {
  organization: 'AI in The Liberal Arts Initiative (Amherst College)',
  location: 'Amherst, MA, USA',
  role: 'AI Tools and Mentorship Intern; Supervisor: Professor Lee Spector',
  date: 'February–December 2023',
  details: [
    'Led 5+ campus discussions and demonstrations connecting AI research with applications in the arts and humanities.',
    'Developed 8+ tutorials covering AI applications in literary analysis, historical data analysis, and AI-generated multimedia.',
    'Mentored 25+ students and faculty in using AI and machine learning tools for academic research and creative projects.',
  ],
};
export const experience: ExperienceItem[] = [
  {
    organization: 'Torus Knot 3D Designs', location: 'Holyoke, MA, USA',
    role: 'Architectural & 3D Designer', date: 'June 2025–Present',
    details: [
      'Delivered architectural visualizations, including 115+ renderings and 2 animated walkthroughs totaling 15+ minutes.',
      'Designed 20+ custom furniture, jewelry, and sculptural models, including a life-size table and a 3-foot cockerel sculpture; developed 35+ fabrication-ready models and 15+ physical prototypes.',
      'Prepared 60+ CAD drawing sheets for commercial glazing and curtain wall systems, translating architectural specifications into fabrication and installation documentation.',
    ],
  },
  {
    organization: 'iD Tech Camps', location: 'Manchester, NH, USA',
    role: 'On-Campus Instructor: Machine Learning & Roblox Development', date: 'June–August 2025',
    details: [
      'Instructed 12 students across 2 tracks, teaching Roblox development to 5 students (ages 7–9) and Python, AI, and machine learning to 7 students (ages 13–17).',
      'Guided students in building machine learning models and AI-powered assistants using NumPy, Teachable Machine, and OpenAI tools, as well as playable Roblox games using Roblox Studio.',
      'Achieved a 100% student project completion rate, with every student completing an AI project or publishing a playable game; recognized by camp director for classroom leadership.',
    ],
  },
];
export const researchExperience: ExperienceItem[] = [
  {
    organization: 'Amherst College', location: 'Amherst, MA, USA',
    role: 'Honors Thesis Researcher – Conversational AI System', date: 'September 2024–May 2025',
    details: [
      'Designed and implemented a conversational AI agent integrating 3 core capabilities: personality, emotion, and long-term memory to support adaptive, human-like interactions.',
      'Developed 8 modular components for goal-driven dialogue, emotional response modeling, memory retrieval, and context-aware conversations.',
      'Conducted 100+ experimental conversations to evaluate memory retention, personality consistency, and response quality, refining the agent through iterative testing.',
    ],
  },
  {
    organization: 'Georg-August-Universität Göttingen', location: 'Göttingen, Lower Saxony, Germany',
    role: 'Student Researcher – Deep Learning for Natural Language Processing', date: 'March–August 2024',
    details: [
      'Developed and trained BERT- and BART-based models across 5 NLP tasks, including sentiment analysis, semantic similarity, and paraphrase generation.',
      'Optimized distributed training workflows across multi-GPU clusters, reducing model training time by over 40%.',
      'Improved Quora Question Pairs accuracy from 75.9% to 88.0% through hyperparameter tuning and cross-validation, earning 1st place in the task competition.',
    ],
  },
  {
    organization: 'University of Massachusetts Amherst', location: 'Amherst, MA, USA',
    role: 'Research Assistant Intern – Word Meaning Modeling', date: 'June–July 2023',
    details: [
      'Developed and trained 3+ neural network models to investigate how computers associate word structures with their meanings.',
      'Conducted 50+ experiments using HPC clusters and Google Colab, evaluating model performance and optimizing training workflows.',
      'Built 2+ visualization and diagnostic tools and left written documentation to train current/future research team members in computational workflows and research tools.',
    ],
  },
  {
    organization: 'Amherst College', location: 'Amherst, MA, USA',
    role: 'Java Developer', date: 'February–December 2022',
    details: [
      'Developed a Java Swing application featuring 4 interactive puzzle games, with graphical interfaces, instructions, and navigation.',
      'Built a Java lottery simulation supporting 2-, 3-, and 4-digit betting combinations, with randomized drawings, automated payouts, and player balance management.',
      'Applied object-oriented programming principles across both projects to organize game logic, implement interactive features, and develop reusable, maintainable code.',
    ],
  },
];
