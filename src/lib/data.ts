// ---------------------------------------------------------------------------
// Site-wide content. Edit the values in this file to update copy across the
// whole portfolio — components read from here rather than hard-coding text.
// ---------------------------------------------------------------------------

export const site = {
  name: "Franco Gabriel Oliveros",
  initials: "FO",
  role: "Backend & AI Engineer",
  claim:
    "I build concurrent backend systems and AI-powered pipelines that stay stable under load.",
  proof:
    "Proven with Draw Collab — a Socket.IO canvas syncing 50+ simultaneous users at sub-200ms latency, with zero state loss on join. I'm now extending that foundation into backend AI engineering and LLM integration.",
  pitch:
    "If you're a technical founder building a live, multi-user AI product who needs someone who won't let concurrency break under real traffic, I'd welcome the chance to connect.",
  // TODO: replace with your real links before deploying.
  email: "franco@example.com",
  linkedin: "https://www.linkedin.com/in/francogabrieloliveros",
  github: "https://github.com/francogabrieloliveros",
  resumeHref: "/resume.pdf",
  location: "Laguna, Philippines",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Proof of Work", href: "/proof-of-work" },
  { label: "Contact", href: "/contact" },
  { label: "About", href: "/about" },
] as const;

export type Project = {
  slug: string;
  title: string;
  blurb: string;
  desc: string;
  tags: string[];
  github: string;
  website?: string;
  metrics?: { label: string; value: string }[];
  note?: string;
};

// Lead case study — kept separate so the Proof of Work page can give it full
// treatment above the secondary grid.
export const leadProject: Project = {
  slug: "draw-collab",
  title: "Draw Collab",
  blurb: "Real-time collaborative canvas, synced across every open tab.",
  desc: "A collaborative drawing app where every stroke is broadcast to the room the instant it's made. Built the Socket.IO event layer to reconcile concurrent drawing actions from many clients at once without dropping or reordering strokes, and to replay full canvas state to anyone joining mid-session.",
  tags: ["JavaScript", "ExpressJS", "Socket.IO", "React", "Tailwind CSS", "Vite"],
  github: "https://github.com/francogabrieloliveros/collaborative-drawing-app-client.git",
  website: "https://collaborative-drawing-app-client.vercel.app/",
  metrics: [
    { label: "Concurrent users", value: "50+" },
    { label: "Sync latency", value: "<200ms" },
    { label: "State loss on join", value: "Zero" },
  ],
  note: "Server has a ~1 minute cold start on the free tier — give it a moment on first load.",
};

export const secondaryProjects: Project[] = [
  {
    slug: "farm-to-table",
    title: "Farm-to-table",
    blurb: "A digital marketplace built for the Philippine Department of Agriculture.",
    desc: "A premium, enterprise-grade digital marketplace developed for the Department of Agriculture (DA). Bridges the gap between local Filipino agricultural producers and citizens with an elegant, transparent, and direct platform for farm-fresh commerce.",
    tags: ["TypeScript", "ExpressJS", "React", "Tailwind CSS", "Vite", "Docker"],
    github: "https://github.com/francogabrieloliveros/farm-to-table.git",
    website: "https://farm-to-table-omega.vercel.app/",
  },
  {
    slug: "chef-bot",
    title: "Chef Bot",
    blurb: "LLM-powered recipe suggestions from whatever's left in the fridge.",
    desc: "Can't think of a dish to cook? Ask Chef Bot. Powered by the Mistral AI API, it recommends recipes based on the ingredients a user has on hand.",
    tags: ["JavaScript", "React", "Mistral AI", "Vite"],
    github: "https://github.com/francogabrieloliveros/chef_bot.git",
    website: "https://chef-bot-three.vercel.app/",
  },
  {
    slug: "palayok",
    title: "Palayok",
    blurb: "Connecting UP Los Baños residents to share surplus food.",
    desc: "A community-driven mobile app that connects UP Los Baños residents to share surplus food and ingredients — reducing waste, one pantry at a time.",
    tags: ["Dart", "Flutter", "Firebase", "GitHub Actions"],
    github: "https://github.com/francogabrieloliveros/palayok.git",
    website: "https://drive.google.com/file/d/1vRMZ6n-WfOYVfO38s8PwoGG8_dqV3tdp/view?usp=sharing",
  },
  {
    slug: "aerio-katharos",
    title: "Aerio Katharos",
    blurb: "Simplex optimization for the cheapest path to a pollution target.",
    desc: "Approximates the smallest cost to meet the pollutant reduction goals of the City of Greenvale. By selecting different mitigation projects, a simplex minimization model returns the optimum cost.",
    tags: ["JavaScript", "React", "Tailwind CSS", "Vite"],
    github: "https://github.com/francogabrieloliveros/greenvale-pollutant-reduction-project",
    website: "https://greenvale-pollutant-reduction-proje.vercel.app/",
  },
  {
    slug: "hugot-hanay",
    title: "Hugot Hanay",
    blurb: "A cryptic word game that treats Filipino as a language of its own.",
    desc: "Inspired by Minute Cryptic, Hugot Hanay tests Filipino knowledge by blending wit, wordplay, and linguistic creativity to highlight that Filipino is not an inferior language.",
    tags: ["JavaScript", "React", "Tailwind CSS", "Vite"],
    github: "https://github.com/francogabrieloliveros/hugot-hanay.git",
    website: "https://hugot-hanay.vercel.app/",
  },
  {
    slug: "gloflex",
    title: "GLOFLEX",
    blurb: "A wearable that turns sign gestures into speech.",
    desc: "An assistive technology device designed to bridge communication barriers between deaf or mute individuals and the wider community, converting predefined sign language gestures into audible speech.",
    tags: ["Arduino", "C"],
    github: "https://github.com/francogabrieloliveros/gloflex.git",
  },
  {
    slug: "hospital-logbook",
    title: "Hospital Logbook",
    blurb: "A desktop system for managing hospital staff, patients, and lab records.",
    desc: "Manages hospital operations with an intuitive UI to record staff, patients, lab exams, and lab requests, while automatically logging every action. Includes a dashboard summarizing all data held by the system.",
    tags: ["Java", "JavaFX", "CSS"],
    github: "https://github.com/francogabrieloliveros/CMSC22_FINAL_PROJECT.git",
  },
  {
    slug: "weather-program",
    title: "Weather Program",
    blurb: "Live weather lookup with a forecast for the next few hours.",
    desc: "Look up the weather anywhere in the world. Typing a city name returns temperature, humidity, an intuitive background, and a short-term forecast.",
    tags: ["JavaScript", "HTML", "CSS"],
    github: "https://github.com/francogabrieloliveros/weather_program.git",
    website: "https://weather-program-steel.vercel.app/",
  },
];

export const skillGroups: { label: string; note?: string; items: string[] }[] = [
  {
    label: "Backend",
    note: "Where the concurrency claim lives",
    items: ["Node.js", "Express.js", "Socket.IO", "MongoDB", "MySQL", "Firebase"],
  },
  {
    label: "AI",
    note: "The foundation I'm extending into",
    items: ["Python", "Mistral AI API", "LLM Integration", "RAG (in progress)", "MCP (in progress)"],
  },
  {
    label: "Frontend",
    items: ["React", "Flutter", "Tailwind CSS", "TypeScript", "JavaScript", "Dart"],
  },
  {
    label: "Tools",
    items: ["Git / GitHub", "Docker", "GitHub Actions", "Linux"],
  },
];

export const languages = ["JavaScript", "TypeScript", "Python", "Dart", "C", "Java", "R"];

export type EducationItem = {
  school: string;
  location: string;
  period: string;
  detail?: string;
  tags?: string[];
};

export const education: EducationItem[] = [
  {
    school: "University of the Philippines Los Baños",
    location: "Laguna, Philippines",
    period: "2024 — Present",
    detail: "BS Computer Science",
    tags: ["JavaScript", "TypeScript", "Dart", "Python", "C", "Java", "R", "React", "Flutter", "ExpressJS", "MySQL"],
  },
  {
    school: "Calamba City Science Integrated School",
    location: "Laguna, Philippines",
    period: "2022 — 2024",
    tags: ["Arduino"],
  },
];

export const capabilities = [
  {
    title: "Real-time, multi-user systems",
    desc: "Event-driven backends that keep shared state consistent as concurrent clients join, act, and leave — the Socket.IO layer behind Draw Collab.",
  },
  {
    title: "AI-powered products",
    desc: "LLM-backed features, from simple API integrations like Chef Bot to the RAG and MCP-driven systems I'm currently building toward.",
  },
  {
    title: "Full-stack delivery",
    desc: "Comfortable owning a feature end to end — React/Flutter interfaces, Express/Node APIs, and the CI/CD to ship them (GitHub Actions, Docker).",
  },
];
