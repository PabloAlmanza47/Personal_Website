import type { TechLink } from "./projects";

export type ExperienceStatus = "incoming" | "current" | "past";

export type ExperienceItem = {
  company: string;
  role: string;
  location: string;
  dates: string;
  status: ExperienceStatus;
  url?: string;
  tech: TechLink[];
  highlights: string[];
};

export const experienceItems: ExperienceItem[] = [
  {
    company: "Frogslayer",
    role: "Incoming Junior Software Developer",
    location: "College Station, TX",
    dates: "Starts August 17, 2026",
    status: "incoming",
    url: "https://frogslayer.com/",
    tech: [
      { name: "C#", url: "https://learn.microsoft.com/dotnet/csharp/" },
      { name: "Angular", url: "https://angular.dev/" },
      { name: "TypeScript", url: "https://www.typescriptlang.org/" },
      { name: "SQL", url: "https://www.microsoft.com/sql-server" },
    ],
    highlights: [
      "Will join the College Station engineering team to contribute to custom software delivery, feature development, debugging, testing, and client-facing project work.",
    ],
  },
  {
    company: "PowerDB",
    role: "Part-Time Software Engineer",
    location: "College Station, TX",
    dates: "May 2026 — Present",
    status: "current",
    url: "https://www.megger.com/en-us/products/powerdbtm-pro-asset-and-test-data-management-software",
    tech: [
      { name: "C#", url: "https://learn.microsoft.com/dotnet/csharp/" },
      { name: ".NET", url: "https://dotnet.microsoft.com/" },
      { name: "Angular", url: "https://angular.dev/" },
      { name: "TypeScript", url: "https://www.typescriptlang.org/" },
      { name: "SQL Server", url: "https://www.microsoft.com/sql-server" },
    ],
    highlights: [
      "Diagnosed and resolved defects in a C#/.NET WinForms importer that parses electrical test data into SQL Server, adding null-safe Entity Framework validation to prevent unhandled import exceptions.",
      "Developed a full-stack test-interval override feature across an Angular/TypeScript front end and C# OData API, persisting custom values to SQL Server for dashboard use.",
    ],
  },
  {
    company: "Society of Hispanic Professional Engineers — Texas A&M",
    role: "Website Development Lead",
    location: "College Station, TX",
    dates: "Fall 2024 — Present",
    status: "current",
    url: "https://tamushpe.org/",
    tech: [
      { name: "Next.js", url: "https://nextjs.org/" },
      { name: "React", url: "https://react.dev/" },
      { name: "TypeScript", url: "https://www.typescriptlang.org/" },
      { name: "Tailwind CSS", url: "https://tailwindcss.com/" },
    ],
    highlights: [
      "Architect and maintain the chapter's central web platform for a community of more than 500 members.",
      "Lead weekly technical workshops and onboard more than 10 contributors through codebase walkthroughs, Git workflows, reviews, and sprint-based collaboration.",
    ],
  },
  {
    company: "Texas A&M University",
    role: "Engineering Peer Teacher",
    location: "College Station, TX",
    dates: "August 2025 — May 2026",
    status: "past",
    tech: [
      { name: "Python", url: "https://www.python.org/" },
      { name: "NumPy", url: "https://numpy.org/" },
      { name: "Matplotlib", url: "https://matplotlib.org/" },
    ],
    highlights: [
      "Mentored more than 60 students per week in introductory engineering computation, helping students debug Python programs and strengthen foundational problem-solving skills.",
    ],
  },
  {
    company: "Engineering Summer Bridge Program — Texas A&M",
    role: "Student Mentor",
    location: "College Station, TX",
    dates: "July 2025 — August 2025",
    status: "past",
    tech: [
      { name: "Python", url: "https://www.python.org/" },
      { name: "Git/GitHub", url: "https://github.com/" },
    ],
    highlights: [
      "Mentored four incoming engineering students through a 160-hour summer program covering Python fundamentals, debugging, computational thinking, and Git/GitHub.",
    ],
  },
];
