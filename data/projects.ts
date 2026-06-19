export type TechLink = {
  name: string;
  url: string;
};

export type Project = {
  title: string;
  url: string;
  tech: TechLink[];
  description: string;
};

export const projects: Project[] = [
  {
    title: "TAMU SHPE Website",
    url: "https://tamushpe.org/",
    tech: [
      { name: "TailwindCSS", url: "https://tailwindcss.com" },
      { name: "TypeScript", url: "https://www.typescriptlang.org" },
      { name: "React", url: "https://react.dev" },
      { name: "Next.js", url: "https://nextjs.org" },
    ],
    description:
      "Developed and deployed a responsive website for a 200+ member engineering organization. Built reusable components using React and TypeScript, improving maintainability and page performance.",
  },
  {
    title: "ColorStack Website",
    url: "https://tamucolorstack.com/",
    tech: [
      { name: "TailwindCSS", url: "https://tailwindcss.com" },
      { name: "TypeScript", url: "https://www.typescriptlang.org" },
      { name: "React", url: "https://react.dev" },
      { name: "Figma", url: "https://www.figma.com" },
    ],
    description:
      "Contributed to the development of a modern organization website, focusing on clean UI and responsive design. Collaborated with a team using Git and GitHub to ship production-ready features.",
  },
  {
    title: "Personal Website",
    url: "https://pablosweb.netlify.app/",
    tech: [
      { name: "TailwindCSS", url: "https://tailwindcss.com" },
      { name: "Netlify", url: "https://www.netlify.com" },
      { name: "Framer Motion", url: "https://www.framer.com/motion" },
      { name: "Next.js", url: "https://nextjs.org" },
    ],
    description:
      "Designed and built a terminal-inspired portfolio using Next.js and Framer Motion. Implemented draggable window components and dynamic UI interactions to create a unique user experience.",
  },
  {
    title: "Tree Chop Mania",
    url: "https://github.com/PabloAlmanza47/Tree_Chop_Mania",
    tech: [
      { name: "Python", url: "https://www.python.org" },
      { name: "Git/GitHub", url: "https://www.github.com" },
    ],
    description:
      "Built a simple game using Python, implementing core game logic and user interaction. Practiced problem-solving and control flow while managing game state and input handling.",
  },
];

export const currentTools = [
  { label: "Terminal", value: "Ghostty" },
  { label: "IDE", value: "Neovim w/ Tmux" },
  { label: "OS", value: "Arch Linux w/ Hyprland" },
];
