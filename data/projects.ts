export type TechLink = {
  name: string;
  url: string;
};

export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  title: string;
  eyebrow: string;
  featured?: boolean;
  tech: TechLink[];
  description: string;
  highlights: string[];
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    title: "SHPE Connect",
    eyebrow: "Featured full-stack platform",
    featured: true,
    tech: [
      { name: "Next.js", url: "https://nextjs.org/" },
      { name: "TypeScript", url: "https://www.typescriptlang.org/" },
      { name: "PostgreSQL", url: "https://www.postgresql.org/" },
      { name: "Prisma", url: "https://www.prisma.io/" },
      { name: "Auth.js", url: "https://authjs.dev/" },
      { name: "Vercel", url: "https://vercel.com/" },
    ],
    description:
      "A member-networking platform for the Texas A&M SHPE chapter, built to help students discover the community, create meaningful profiles, and connect with other current and former members.",
    highlights: [
      "Built authentication, protected routes, role-based access control, member profiles, and a searchable directory.",
      "Designed the product and data model around real chapter workflows, including officer administration, onboarding, opportunities, sponsors, and future career-profile tools.",
    ],
    links: [
      { label: "Live site", url: "https://shpe-connect.vercel.app/" },
    ],
  },
  {
    title: "Texas A&M SHPE Website",
    eyebrow: "Organization platform",
    tech: [
      { name: "Next.js", url: "https://nextjs.org/" },
      { name: "React", url: "https://react.dev/" },
      { name: "TypeScript", url: "https://www.typescriptlang.org/" },
      { name: "Tailwind CSS", url: "https://tailwindcss.com/" },
    ],
    description:
      "The public website for a student engineering organization serving more than 500 members at Texas A&M.",
    highlights: [
      "Maintain reusable components and responsive member-facing pages as Website Development Lead.",
      "Coordinate contributor onboarding, GitHub reviews, and weekly development work across the team.",
    ],
    links: [{ label: "Visit site", url: "https://tamushpe.org/" }],
  },
  {
    title: "Terminal Portfolio",
    eyebrow: "Interactive personal website",
    tech: [
      { name: "Next.js", url: "https://nextjs.org/" },
      { name: "React", url: "https://react.dev/" },
      { name: "Tailwind CSS", url: "https://tailwindcss.com/" },
      { name: "Motion", url: "https://motion.dev/" },
    ],
    description:
      "A desktop-inspired portfolio with draggable windows, terminal commands, fuzzy navigation, responsive panels, and data-driven content.",
    highlights: [
      "Created a reusable window system and keyboard-driven terminal experience without sacrificing direct navigation.",
      "Structured project and experience content as typed data so future updates do not require rewriting components.",
    ],
    links: [
      { label: "Source", url: "https://github.com/PabloAlmanza47/Personal_Website" },
    ],
  },
  {
    title: "Tree Chop Mania",
    eyebrow: "Python terminal game",
    tech: [
      { name: "Python", url: "https://www.python.org/" },
      { name: "Git/GitHub", url: "https://github.com/" },
    ],
    description:
      "A terminal-based progression game focused on game state, durability, leveling, currency, and save-file persistence.",
    highlights: [
      "Implemented a progression loop with player statistics, equipment durability, leveling, and saved state.",
    ],
    links: [
      { label: "Source", url: "https://github.com/PabloAlmanza47/Tree_Chop_Mania" },
    ],
  },
];
