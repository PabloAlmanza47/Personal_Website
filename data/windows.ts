export type WindowName = "about" | "projects" | "experience" | "music";

export type WindowItem = {
  name: WindowName;
  label: string;
  path: string;
};

export const windowItems: WindowItem[] = [
  { name: "about", label: "about", path: "/information/about" },
  { name: "projects", label: "projects", path: "/information/projects" },
  { name: "experience", label: "experience", path: "/information/experience" },
  { name: "music", label: "music", path: "/music" },
];

export const openableWindowNames = windowItems.map((item) => item.name);
