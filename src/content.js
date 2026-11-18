// ─────────────────────────────────────────────────────────────
//  All site copy lives here. Edit this file to make it yours.
//  Everything marked as placeholder is safe to replace.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Your Name',
  role: 'Designer & engineer',
  location: 'City, Country',
  // IANA timezone used for the live clock in the nav, e.g. 'Asia/Shanghai', 'America/New_York'
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  availability: 'Open to select projects from early 2027',
  email: 'hello@example.com',
  socials: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'Read.cv', href: 'https://read.cv/' },
    { label: 'Instagram', href: 'https://www.instagram.com/' },
  ],
}

export const hero = {
  eyebrow: 'Portfolio — Archive of work, 2019 → now',
  // Rendered as: line one, then an italic second line
  headline: ['Building things', 'meant to last.'],
  intro:
    'I design and build software, interfaces and small worlds in 3D — work that sits somewhere between product, engineering and craft.',
  currently: 'Currently designing tools for creative teams at Studio Placeholder.',
}

export const about = {
  statement:
    'Good work is patient. I care about the details most people never notice — the timing of a transition, the weight of a word, the half-second before something loads.',
  paragraphs: [
    'Placeholder: a short paragraph about your background. Where you started, what pulled you toward design and code, and the thread that ties your work together.',
    'Placeholder: a second paragraph about how you work — the kinds of teams, problems and collaborations you do your best work in.',
  ],
  disciplines: [
    { title: 'Software', detail: 'React, TypeScript, Node, WebGL' },
    { title: 'Product design', detail: 'Research, systems, prototyping' },
    { title: '3D & motion', detail: 'Three.js, Blender, After Effects' },
    { title: 'Creative tech', detail: 'Installations, generative tools' },
  ],
}

// Categories used by the filter on the Work section
export const categories = ['Software', 'Product', 'Visual', 'Creative tech']

export const projects = [
  {
    slug: 'temporal-engine',
    title: 'Temporal Engine',
    year: '2026',
    category: 'Software',
    client: 'Personal project',
    role: 'Design & engineering',
    summary: 'A visual engine for exploring time-series data as navigable, spatial landscapes.',
    challenge:
      'Placeholder: what problem were you solving, and for whom? Keep it to two or three sentences.',
    approach:
      'Placeholder: how you approached it — key decisions, constraints and the tools you chose.',
    outcome:
      'Placeholder: what happened as a result. Numbers, quotes or what you learned all work well here.',
    tags: ['Three.js', 'React', 'WebGL', 'Data viz'],
    link: '',
    // Optional: path to an image in /public, e.g. '/work/temporal.jpg'
    image: '',
    color: '#c9b79c',
  },
  {
    slug: 'field-notes',
    title: 'Field Notes',
    year: '2025',
    category: 'Product',
    client: 'Studio Placeholder',
    role: 'Lead product designer',
    summary: 'Redesigning a research tool used by 4,000 teams to capture and share observations.',
    challenge: 'Placeholder: describe the challenge.',
    approach: 'Placeholder: describe your approach.',
    outcome: 'Placeholder: describe the outcome.',
    tags: ['UX research', 'Design systems', 'Figma'],
    link: '',
    image: '',
    color: '#a9b3a1',
  },
  {
    slug: 'slow-light',
    title: 'Slow Light',
    year: '2025',
    category: 'Visual',
    client: 'Exhibition commission',
    role: '3D & motion',
    summary: 'A series of rendered stills and loops studying how light moves through glass over a day.',
    challenge: 'Placeholder: describe the challenge.',
    approach: 'Placeholder: describe your approach.',
    outcome: 'Placeholder: describe the outcome.',
    tags: ['Blender', 'Cycles', 'Motion'],
    link: '',
    image: '',
    color: '#d6c6b8',
  },
  {
    slug: 'echo-room',
    title: 'Echo Room',
    year: '2024',
    category: 'Creative tech',
    client: 'Placeholder Museum',
    role: 'Creative technologist',
    summary: 'An interactive installation where visitors’ footsteps leave fading traces of sound and light.',
    challenge: 'Placeholder: describe the challenge.',
    approach: 'Placeholder: describe your approach.',
    outcome: 'Placeholder: describe the outcome.',
    tags: ['TouchDesigner', 'Web Audio', 'Sensors'],
    link: '',
    image: '',
    color: '#b7aebf',
  },
  {
    slug: 'ledger',
    title: 'Ledger',
    year: '2023',
    category: 'Software',
    client: 'Fintech startup',
    role: 'Front-end engineer',
    summary: 'A fast, accessible dashboard for small businesses to understand their cash flow.',
    challenge: 'Placeholder: describe the challenge.',
    approach: 'Placeholder: describe your approach.',
    outcome: 'Placeholder: describe the outcome.',
    tags: ['TypeScript', 'React', 'Accessibility'],
    link: '',
    image: '',
    color: '#c4bba5',
  },
  {
    slug: 'atlas-onboarding',
    title: 'Atlas Onboarding',
    year: '2022',
    category: 'Product',
    client: 'SaaS company',
    role: 'Product designer',
    summary: 'Rethinking first-run onboarding, cutting time-to-first-value from days to minutes.',
    challenge: 'Placeholder: describe the challenge.',
    approach: 'Placeholder: describe your approach.',
    outcome: 'Placeholder: describe the outcome.',
    tags: ['Onboarding', 'Prototyping', 'Experimentation'],
    link: '',
    image: '',
    color: '#aebcc2',
  },
]

export const experience = [
  {
    start: '2024',
    end: 'Now',
    title: 'Senior Product Designer',
    org: 'Studio Placeholder',
    detail: 'Placeholder: one line about what you do here and what you’re proud of.',
  },
  {
    start: '2022',
    end: '2024',
    title: 'Design Engineer',
    org: 'Company Placeholder',
    detail: 'Placeholder: one line about the role and its impact.',
  },
  {
    start: '2020',
    end: '2022',
    title: 'Front-end Developer',
    org: 'Agency Placeholder',
    detail: 'Placeholder: one line about the role and its impact.',
  },
  {
    start: '2016',
    end: '2020',
    title: 'B.A. Interaction Design',
    org: 'University Placeholder',
    detail: 'Placeholder: focus, thesis or honours.',
  },
]

export const toolkit = [
  { group: 'Design', items: ['Figma', 'Prototyping', 'Design systems', 'User research'] },
  { group: 'Engineering', items: ['React', 'TypeScript', 'Node', 'Three.js / R3F'] },
  { group: '3D & motion', items: ['Blender', 'After Effects', 'GLSL', 'Framer Motion'] },
]

export const contact = {
  headline: ['Let’s make something', 'worth the time.'],
  note: 'For projects, collaborations or just to say hello — I reply within a couple of days.',
}
