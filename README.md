# Pablo's Personal Website

A terminal-inspired personal portfolio built with Next.js, TypeScript, Tailwind CSS, and Framer Motion-style window animations.

The site is designed like a small desktop environment where visitors can open draggable windows, use terminal commands, search through sections with a fuzzy finder, and explore projects, experience, music, and contact information.

## Features

- Draggable desktop-style windows
- Interactive terminal commands
- Fuzzy finder for opening site sections
- Data-driven project and experience sections
- Contact form window
- Terminal/OS-inspired visual style

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Phosphor Icons
- Netlify / Vercel-ready deployment

## Project Structure

```txt
components/       Reusable UI windows and interactive components
data/             Central data sources for projects, experience, and windows
src/app/          Next.js app router pages, layout, and global styles
ascii/            ASCII art used throughout the terminal-style interface
public/           Static assets such as sounds and resume files
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Editing Content

Most portfolio content should now be edited from the `data/` folder instead of directly inside JSX components.

- Add or edit projects in `data/projects.ts`
- Add or edit experience entries in `data/experience.ts`
- Add or edit searchable/openable windows in `data/windows.ts`

This keeps the portfolio easier to update as new projects, roles, and sections are added.
