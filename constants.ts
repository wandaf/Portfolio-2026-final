import { CaseStudy, PlaygroundItem } from './types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 1,
    slug: "mta-open-source",
    title: "MTA Open Source App",
    category: "Data Visualization Design",
    tags: ["UI/UX", "Mobile App"],
    imageUrl: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=2000",
    description: "Designing a web app that visualizes MTA ridership and weather patterns.",
    timeline: "5 Weeks",
    role: "Designer, Developer",
    tools: "Figma, D3.js, CSS, HTML, AfterEffects"
  },
  {
    id: 2,
    slug: "mcdonalds-game",
    title: "McDonald’s Game Design",
    category: "Game & System Design",
    tags: ["Product Design", "Branding"],
    imageUrl: "https://images.unsplash.com/photo-1610484826967-09c5720778c7?auto=format&fit=crop&q=80&w=2000",
    description: "Designing mobile games for Happy Meal campaigns and standardizing a design system in Figma.",
    timeline: "3 Months",
    role: "Lead Game Designer",
    tools: "Figma, Unity, Illustrator"
  },
  {
    id: 3,
    slug: "faceless-affair",
    title: "Faceless Affair",
    category: "Interactive Narrative",
    subhead: "An interactive mystery game",
    tags: ["UX Design", "Game Design"],
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000",
    description: "An interactive mystery game exploring narrative depth through digital interaction.",
    timeline: "8 Weeks",
    role: "UX Designer, Writer",
    tools: "Twine, Figma, Photoshop"
  },
  {
    id: 4,
    slug: "higher-ed-campaign",
    title: "Higher Education Campaign Design",
    category: "Campaign Design",
    subhead: "Designing campaigns for universities",
    tags: ["Social Media", "Web Design"],
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2000",
    description: "Developing cohesive visual identities for academic outreach and engagement.",
    timeline: "6 Months",
    role: "Visual Designer",
    tools: "InDesign, AfterEffects, Figma"
  },
  {
    id: 5,
    slug: "monotype-campaign",
    title: "Monotype Typographic Campaign",
    category: "Typographic Motion",
    subhead: "Designing for Resistance",
    tags: ["Motion Design", "UX Design"],
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=2000",
    description: "A typographic exploration of visual language in social movements.",
    timeline: "4 Weeks",
    role: "Motion Designer",
    tools: "AfterEffects, Cinema 4D, Glyphs"
  },
  {
    id: 6,
    slug: "secret-garden-viz",
    title: "The Secret Garden Data Visualization",
    category: "Information Design",
    subhead: "Exploring literature through data",
    tags: ["Information Design", "Web Design"],
    imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=2000",
    description: "Mapping the linguistic landscape of classic literature.",
    timeline: "5 Weeks",
    role: "Information Designer",
    tools: "D3.js, Python, Figma"
  },
  {
    id: 7,
    slug: "kinetics-branding",
    title: "Kinetics: High-Performance Branding",
    category: "Brand Identity",
    tags: ["Visual Identity", "Typography"],
    imageUrl: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=2000",
    description: "Dynamic brand system for an emerging electric bike manufacturer.",
    timeline: "12 Weeks",
    role: "Brand Strategist",
    tools: "Illustrator, AfterEffects"
  }
];

export const PLAYGROUND_ITEMS: PlaygroundItem[] = [
  { id: 1, title: "Generative Topography", type: "Processing", imageUrl: "https://picsum.photos/seed/pg1/800/800" },
  { id: 2, title: "Abstract Form Study", type: "3D Rendering", imageUrl: "https://picsum.photos/seed/pg2/600/900" },
  { id: 3, title: "Kinetic Typography", type: "Motion", imageUrl: "https://picsum.photos/seed/pg3/900/600" },
  { id: 4, title: "Color Theory Experiment", type: "Web Art", imageUrl: "https://picsum.photos/seed/pg4/700/700" },
  { id: 5, title: "Daily Sketch #42", type: "Illustration", imageUrl: "https://picsum.photos/seed/pg5/800/1000" },
  { id: 6, title: "Glitch Landscape", type: "Photography", imageUrl: "https://picsum.photos/seed/pg6/1000/800" },
  { id: 7, title: "Noise Field 01", type: "Code", imageUrl: "https://picsum.photos/seed/pg7/800/800" },
  { id: 8, title: "Brutalist Layout", type: "Design", imageUrl: "https://picsum.photos/seed/pg8/600/800" },
  { id: 9, title: "Fluid Dynamics", type: "Simulation", imageUrl: "https://picsum.photos/seed/pg9/800/600" },
  { id: 10, title: "Monospaced Dreams", type: "Typography", imageUrl: "https://picsum.photos/seed/pg10/700/700" },
  { id: 11, title: "Neon Gradients", type: "Color", imageUrl: "https://picsum.photos/seed/pg11/800/1100" },
  { id: 12, title: "ASCII Portrait", type: "Code Art", imageUrl: "https://picsum.photos/seed/pg12/1100/800" },
  { id: 13, title: "Recursive Shapes", type: "Processing", imageUrl: "https://picsum.photos/seed/pg13/800/800" },
  { id: 14, title: "Organic Mesh", type: "3D", imageUrl: "https://picsum.photos/seed/pg14/600/900" },
  { id: 15, title: "Digital Bloom", type: "Motion", imageUrl: "https://picsum.photos/seed/pg15/900/600" },
  { id: 16, title: "Pixel Sort Study", type: "Algorithm", imageUrl: "https://picsum.photos/seed/pg16/700/700" },
  { id: 17, title: "Cybernetic Flora", type: "Illustration", imageUrl: "https://picsum.photos/seed/pg17/800/1200" },
  { id: 18, title: "Shadow Play", type: "Photography", imageUrl: "https://picsum.photos/seed/pg18/1200/800" },
  { id: 19, title: "Wave Function", type: "Generative", imageUrl: "https://picsum.photos/seed/pg19/800/800" },
  { id: 20, title: "Modular Grid", type: "System", imageUrl: "https://picsum.photos/seed/pg20/600/800" },
  { id: 21, title: "Particle Drift", type: "Simulation", imageUrl: "https://picsum.photos/seed/pg21/800/600" },
  { id: 22, title: "Ink & Pixel", type: "Mixed Media", imageUrl: "https://picsum.photos/seed/pg22/700/700" },
  { id: 23, title: "Vector Rhythm", type: "Vector", imageUrl: "https://picsum.photos/seed/pg23/800/1000" },
  { id: 24, title: "Dark Matter", type: "3D Render", imageUrl: "https://picsum.photos/seed/pg24/1000/800" }
];