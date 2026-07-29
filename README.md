# Pablo Almanza — Personal Portfolio

A terminal and desktop-inspired portfolio built with Next.js, TypeScript, Tailwind CSS, and Motion.

The interface preserves the interactive operating-system concept while making the core portfolio accessible through the original About window, terminal commands, fuzzy navigation, and persistent dock shortcuts.

## Portfolio content

The portfolio currently highlights:

- Production software experience at PowerDB
- An incoming Junior Software Developer role at Frogslayer
- Website Development Lead work for Texas A&M SHPE
- SHPE Connect as the featured full-stack project
- Teaching and mentorship experience at Texas A&M

## Features

- Original terminal-styled About window as the opening experience
- Draggable desktop windows and mobile full-screen panels
- Interactive terminal commands and fuzzy finder
- Data-driven project and experience sections
- Responsive dock navigation
- Spotify currently-playing window
- Server-routed contact form
- Reduced-motion and keyboard-focus support

## Tech stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Motion
- Phosphor Icons
- Netlify / Vercel-compatible deployment

## Project structure

```txt
components/       Reusable windows and interactive UI
data/             Typed portfolio content and window registry
src/app/          App Router pages, API routes, metadata, and global styles
ascii/            ASCII art used by the terminal interface
public/           Static assets, sounds, and resume.pdf
```

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

Copy `.env.example` to `.env.local` and configure:

```bash
CONTACT_WEBHOOK_URL=
```

`CONTACT_WEBHOOK_URL` is used only by the server-side `/api/contact` route. The contact form returns a direct-email fallback message when it is not configured.

## Updating content

Most portfolio updates should be made in the `data/` directory:

- `data/experience.ts` — companies, roles, dates, technologies, and highlights
- `data/projects.ts` — featured and secondary projects
- `data/windows.ts` — terminal and fuzzy-finder window registry

Replace `public/resume.pdf` whenever the downloadable resume changes.

## Validation

```bash
npm run lint
npm run build
```
