import type { TechLink } from "./projects";

export type ExperienceItem = {
  title: string;
  url: string;
  tech: TechLink[];
  description: string;
};

export const experienceItems: ExperienceItem[] = [
  {
    title: "Engineering Summer Bridge Program",
    url: "https://tamushpe.org/",
    tech: [
      { name: "Python", url: "https://www.python.org" },
      { name: "Git/GitHub", url: "https://www.github.com" },
      { name: "Numpy", url: "https://numpy.org" },
    ],
    description:
      "Executed a rigorous 160-hour immersive mentorship program, accelerating the academic transition of 4 incoming engineering students into a high-intensity university environment.",
  },
  {
    title: "Engineering Peer Teacher",
    url: "https://tamucolorstack.com/",
    tech: [
      { name: "Python", url: "https://www.python.org" },
      { name: "Matplotlib", url: "https://matplotlib.org" },
      { name: "Numpy", url: "https://numpy.org" },
    ],
    description:
      "Serve as an academic mentor for 60+ students per week in Engineering Lab 1 Computation, bridging the gap between instructors and students to support learning in Python programming and computational thinking.",
  },
  {
    title: "Society of Hispanic Professional Engineers",
    url: "https://pablosweb.netlify.app/",
    tech: [
      { name: "TypeScript", url: "https://www.typescriptlang.org" },
      { name: "React", url: "https://react.dev" },
      { name: "Next.js", url: "https://nextjs.org" },
    ],
    description:
      "Architected and maintained a central web platform serving 500+ active members, implementing UI/UX optimizations and improving the member-facing web experience.",
  },
];
