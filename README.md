# HPC Learning Studio

A portable static learning site for **Introduction to High Performance Computing**. It uses React, Vite, Tailwind CSS, lucide icons, and Zustand for in-memory interface state only.

There is no API server, database, registration, learner ID, URL routing, or progress storage. The app behaves like a focused wiki with an LMS-style shell: learners choose a layer, select a topic, read the lesson, and move forward or backward with the `<` and `>` controls.

## Features

- Three-pane interface inspired by the provided HPC architecture design.
- Left sidebar for learning layers, topic navigation, and search.
- Center architecture map with clickable HPC stack layers and zoom controls.
- Right reader panel with concepts, objectives, examples, diagrams, and stack context.
- Stable URL bar while navigating; all interaction happens in memory.
- Single-port local development on port `5000`.
- Fully static production output that can run from a file, USB drive, GitHub Pages, Netlify, Vercel static hosting, or any plain web server.
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

The build creates:

```text
dist/index.html
portable/hpc-learning-studio.html
```

`portable/hpc-learning-studio.html` is a single-file version of the site. It can be opened directly in a browser without a Node server.

## Preview Build

```bash
npm run preview
```

Open:

```text
http://localhost:5000
```

## Content Format

Course content lives in:

```text
src/content/courses/introduction-hpc/
  course.json
  module-1.md
  module-2.md
  module-3.md
  module-4.md
  module-5.md
  module-6.md
  module-7.md
  module-8.md
```

Each `module-*.md` file starts with JSON frontmatter between `---` markers. Lessons support overview text, learning objectives, paragraphs, diagrams, examples, code blocks, summaries, quiz data, and flashcard data. The current interface presents the learning content as a static guided reader.

## Static Hosting

This repository is GitHub-deployable:

- Build command: `npm run build`
- Publish directory: `dist`
- Runtime server: none

The Vite base path is relative, so the built site works from repository subpaths and simple static hosts.
