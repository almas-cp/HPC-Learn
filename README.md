# HPC Learning Studio

A complete miniature LMS for the sample course **Introduction to High Performance Computing**. The app is a static Vite build hosted by a single Express process, and learner progress is saved locally in the browser.

## Features

- React + Vite + Tailwind CSS app shell inspired by the provided three-pane learning path UI.
- React Router course and lesson URLs.
- Zustand learner state and API synchronization.
- Framer Motion roadmap and flashcard animations.
- Recharts mastery analytics.
- Generated learner IDs and progress continuity through `localStorage`.
- No registration, no network API layer, and no database required.
- File-backed content engine: add a course folder under `server/courses/` without changing code.

## Local Development

```bash
npm install
npm run dev
```

App and API: `http://localhost:5000`

The first visit creates a learner ID in localStorage. Progress, quiz attempts, notes, flashcard reviews, time spent, and mastery analytics survive refreshes on the same browser/device.

## Production

```bash
npm install
npm run build
npm start
```

The Express server serves `dist/` from the same process.

## Content Format

Create a new course folder:

```text
server/courses/new-course/
  course.json
  module-1.md
  module-2.md
  quiz.json
  flashcards.json
```

`course.json` contains metadata and a `moduleFiles` array. Each `module-*.md` file starts with JSON frontmatter between `---` markers. Lessons support text, diagrams, code blocks, examples, video URLs, quizzes, flashcards, objectives, and summaries.

## GitHub-Deployable Options

This repository can be pushed directly to GitHub.

- Render: use `render.yaml`; Render runs `npm install && npm run build`, then `npm start`.
- Docker hosts: build from the included `Dockerfile`.
- Static frontend only: `npm run build` produces `dist/`; progress is browser-local, so no API or database service is needed.

For multi-device learner sync, add a backend later. This build intentionally keeps learner data local to the user's browser.
