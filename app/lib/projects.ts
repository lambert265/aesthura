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
    slug: "aldgate-residence",
    img: "/project-1.jpg",
    tag: "Residential",
    title: "The Aldgate Residence",
    location: "London",
    year: "2024",
    area: "320 m²",
    scope: "Full interior design, furniture selection, author's supervision",
    description: [
      "A four-storey townhouse in East London, stripped back to its Victorian bones and rebuilt with a quiet material palette of raw plaster, aged brass, and hand-oiled oak.",
      "The brief was simple: a family home that feels calm at 7am and alive at midnight. Every room was designed around natural light — its direction, quality, and how it changes through the day.",
      "Furniture was sourced from European ateliers and paired with bespoke joinery designed in-house. The result is a home that feels collected rather than decorated.",
    ],
  },
  {
    id: 2,
    slug: "maison-verlaine",
    img: "/project-2.jpg",
    tag: "Kitchen",
    title: "Maison Verlaine",
    location: "Paris",
    year: "2024",
    area: "180 m²",
    scope: "Kitchen design, 3D visualisation, documentation",
    description: [
      "A Haussmann-era apartment in the 7th arrondissement, where the kitchen became the heart of the home — a room for cooking, gathering, and lingering.",
      "We worked with a Parisian stone mason to source a single slab of Calacatta marble for the island, and commissioned a local blacksmith for the custom steel range hood.",
      "The cabinetry is painted in a deep sage that shifts between green and grey depending on the light — a colour we mixed specifically for this project.",
    ],
  },
  {
    id: 3,
    slug: "villa-serenova",
    img: "/project-3.jpg",
    tag: "Bathroom",
    title: "Villa Serenova",
    location: "Milan",
    year: "2023",
    area: "45 m²",
    scope: "Bathroom design, material specification, supervision",
    description: [
      "A master bathroom conceived as a private spa — a place of ritual and restoration rather than mere function.",
      "The floor and walls are clad in a single continuous stone, cut and matched so the veining flows uninterrupted from floor to ceiling. A freestanding tub sits at the centre, carved from a solid block of travertine.",
      "Lighting was designed in three layers: ambient, task, and accent — each on a separate circuit so the mood can shift from clinical to candlelit in seconds.",
    ],
  },
  {
    id: 4,
    slug: "dining-room-no9",
    img: "/project-4.jpg",
    tag: "Hospitality",
    title: "The Dining Room at No.9",
    location: "Dubai",
    year: "2023",
    area: "260 m²",
    scope: "Full hospitality interior, FF&E, author's supervision",
    description: [
      "A private members' dining room inside a heritage villa in the Al Wasl district — a space that needed to feel intimate for twelve and expansive for sixty.",
      "We took our cues from the building's 1940s architecture: arched openings, thick walls, and a courtyard that floods the interior with diffused afternoon light.",
      "Custom banquettes in aged leather, hand-knotted rugs, and a ceiling installation of suspended brass rods create a room that feels both ancient and entirely contemporary.",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
