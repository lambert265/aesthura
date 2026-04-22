export type Project = {
  id: number;
  slug: string;
  img: string;
  tag: string;
  title: string;
  location: string;
  year: string;
  area: string;
  scope: string;
  description: string[];
};

export const projects: Project[] = [
  {
    id: 1,
    slug: "old-gra-residence",
    img: "/project-1.jpg",
    tag: "Residential",
    title: "The Old GRA Residence",
    location: "Port Harcourt",
    year: "2024",
    area: "420 m²",
    scope: "Full interior design, furniture selection, author's supervision",
    description: [
      "A sprawling family home in the Old GRA, Port Harcourt — stripped back and rebuilt with a calm material palette of polished concrete, warm timber, and hand-crafted brass fixtures.",
      "The brief was to create a home that feels grounded in Nigerian craftsmanship while meeting the demands of modern family life. Every room was designed around cross-ventilation and natural light.",
      "Furniture was sourced from local artisans and paired with bespoke joinery designed in-house. The result is a home that feels rooted rather than imported.",
    ],
  },
  {
    id: 2,
    slug: "ikoyi-reception",
    img: "/project-2.jpg",
    tag: "Commercial",
    title: "The Ikoyi Reception",
    location: "Lagos",
    year: "2024",
    area: "95 m²",
    scope: "Commercial interior, furniture selection, documentation",
    description: [
      "A reception and office space in Ikoyi, Lagos — designed to make an immediate impression while remaining functional for daily professional life.",
      "The brief called for a space that communicates authority without coldness. We balanced structured forms with warm material accents to achieve that balance.",
      "Custom joinery and carefully selected furnishings create a cohesive environment that reflects the client's brand identity from the moment you walk in.",
    ],
  },
  {
    id: 3,
    slug: "rumuola-kitchen",
    img: "/project-3.jpg",
    tag: "Kitchen",
    title: "Rumuola Kitchen",
    location: "Port Harcourt",
    year: "2023",
    area: "55 m²",
    scope: "Kitchen design, material specification, supervision",
    description: [
      "A kitchen conceived as the social heart of the home — a space for cooking, entertaining, and gathering rooted in the textures of the Nigerian landscape.",
      "We worked with a local stone supplier to source a slab of Nigerian granite for the countertops, and commissioned a local metalsmith for the custom range hood.",
      "The cabinetry is finished in a deep earth tone that references the laterite soils of the Niger Delta — a colour developed specifically for this project.",
    ],
  },
  {
    id: 4,
    slug: "the-terrace-vi",
    img: "/project-4.jpg",
    tag: "Residential",
    title: "The Terrace, Victoria Island",
    location: "Lagos",
    year: "2023",
    area: "310 m²",
    scope: "Full interior design, FF&E, author's supervision",
    description: [
      "A living space on Victoria Island — designed to feel intimate and personal while remaining expansive enough for entertaining.",
      "We drew inspiration from the textures of the Lagos waterfront: warm timber, woven textiles, and the amber light of the Atlantic at dusk.",
      "Custom furnishings, locally woven textiles, and considered lighting create a space that feels distinctly Nigerian and entirely contemporary.",
    ],
  },
  {
    id: 5,
    slug: "new-gra-penthouse",
    img: "/project-5.jpg",
    tag: "Residential",
    title: "New GRA Penthouse",
    location: "Port Harcourt",
    year: "2024",
    area: "280 m²",
    scope: "Full interior design, 3D visualisation, furniture & decor",
    description: [
      "A top-floor penthouse in the New GRA, Port Harcourt — designed for a young professional couple who wanted a home that felt both refined and deeply personal.",
      "The open-plan living and dining area flows onto a wraparound terrace, blurring the boundary between inside and out. Materials were chosen for their tactility — linen, travertine, and smoked oak.",
      "Every piece of furniture was either custom-made or sourced from Nigerian designers, making this one of our most locally-rooted projects to date.",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
