# HPC Learning Studio

A complete portable LMS for **Introduction to High Performance Computing**. It is a static React/Vite application: no API server, no database, no registration, and no runtime backend.

Learner data is saved in the browser with `localStorage`, so the built app can be copied to a USB drive, opened from `dist/index.html`, or hosted on any static web host.

## Features

- React + Vite + Tailwind CSS app shell inspired by the provided three-pane learning path UI.
- Hash-based React Router URLs that work from `file://`, subfolders, GitHub Pages, Netlify, Vercel static output, or any simple file server.
- Zustand local learner state with a versioned JSON database in `localStorage`.
- Framer Motion roadmap and flashcard animations.
- Recharts mastery analytics.
- Generated learner ID, completed lessons, quiz attempts, flashcard reviews, notes, time spent, and mastery score all stored locally.
- No network API layer and no database required.
- Course content bundled from JSON/Markdown files under `src/content/courses/`.

## Local Development

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:5000
```

## Portable Build

```bash
npm install
npm run build
```

The portable app is generated as a single file in two places:

```text
dist/index.html
portable/hpc-learning-studio.html
```

You can open either file directly in a browser, copy it to a USB drive, send it as a file, or upload it to any static host. Routes use `#/course/...`, so no server-side route fallback is needed.

## Preview Build

```bash
npm run preview
```

Open:

```text
http://localhost:5000
```

## Content Format

Create a new course folder under:

```text
src/content/courses/new-course/
  course.json
  module-1.md
  module-2.md
  quiz.json
  flashcards.json
```

Then import it from `src/content/hpcCourse.js` or create a new content index file. Each `module-*.md` file starts with JSON frontmatter between `---` markers. Lessons support text, diagrams, code blocks, examples, video URLs, quizzes, flashcards, objectives, and summaries.

## Static Hosting

This repository can be pushed directly to GitHub and built by any static host:

- Build command: `npm run build`
- Publish directory: `dist`
- Runtime server: none

For GitHub Pages, publish the `dist/` folder from a workflow or Pages integration. Because the Vite base path is relative and routing uses hashes, the app works from repository subpaths.

## Data Portability

Progress is intentionally device/browser-local. To reset a learner, use the in-app **New Learner** button or clear the browser's localStorage for the site.

The app stores data under:

```text
hpc-learning-studio-local-db-v1
```

The value is plain JSON:

```json
{
  "version": 1,
  "activeLearnerId": "learner-id",
  "learners": {
    "learner-id": {
      "id": "learner-id",
      "createdAt": "ISO timestamp",
      "updatedAt": "ISO timestamp",
      "progress": {
        "lessons": {},
        "quizAttempts": [],
        "flashcardReviews": {},
        "notes": {}
      }
    }
  }
}
```
