# Nihongo — Learn Japanese the fun way

An interactive Japanese-learning web app: lessons, quizzes, pronunciation practice, and classroom multiplayer. Built with React 19, TypeScript, Vite, and Tailwind CSS 4, and shipped as a single-file static bundle for the UHB10802 course.

## Features

- **Learn & Practice** — vocabulary curriculum with pronunciation (Web Speech) and sound cues
- **Quiz** — timed vocabulary quizzes with scoring and progress tracking
- **Play / Host** — classroom multiplayer quizzes (same-browser via `BroadcastChannel`)
- **Topics & Guidebook** — organized curriculum browsing
- **Leaderboard, Profile & Certificate** — progress, stats, and a shareable certificate

## Tech stack

- React 19 + TypeScript
- Vite 7 (`vite-plugin-singlefile` inlines JS/CSS into one `index.html`)
- Tailwind CSS 4 (via `@tailwindcss/vite`)

## Getting started

```bash
npm install
npm run dev      # start the dev server
```

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |

## Deployment

Hosted on Vercel as a static site. Project name: **nihongo-alt**.

Manual deploys only (no git auto-deploy):

```bash
npm install -g vercel
vercel link --yes --project nihongo-alt   # first time on a machine
vercel --prod
```

Live URL: https://nihongo-alt.vercel.app

## Project structure

```
src/
  components/   shared Shell + UI primitives
  data/         curriculum content
  lib/          progress, multiplayer, sound, speech, hashing
  screens/      Landing, Welcome, Learn, Practice, Quiz, Topics,
                Play, Host, Leaderboard, Certificate, Profile, Guidebook
public/         favicon + image assets
```
