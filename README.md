# HPC Learning Studio

A complete miniature LMS for the sample course **Introduction to High Performance Computing**. The frontend is a static Vite build, and learner progress is dynamic through an Express REST API backed by SQLite.

## Features

- React + Vite + Tailwind CSS app shell inspired by the provided three-pane learning path UI.
- React Router course and lesson URLs.
- Zustand learner state and API synchronization.
- Framer Motion roadmap and flashcard animations.
- Recharts mastery analytics.
- Express REST API with generated learner IDs and cookie/localStorage continuity.
- SQLite schema for `Learners`, `Courses`, `Modules`, `Lessons`, `QuizAttempts`, `FlashcardReviews`, and `Progress`.
- File-backed content engine: add a course folder under `server/courses/` without changing code.

## Local Development

```bash
npm install
npm run dev
```

Frontend: `http://localhost:5173`
API: `http://localhost:4000`

The first visit creates a learner ID in localStorage and the backend upserts a matching learner record. Progress survives refreshes and follows the same learner ID.

## Production

```bash
npm install
npm run build
npm start
```

The Express server serves `dist/` and the API from the same process.

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

## API Routes

- `GET /api/health`
- `GET /api/courses`
- `GET /api/courses/:courseId`
- `GET /api/bootstrap`
- `GET /api/progress/:courseId`
- `POST /api/progress/visit`
- `POST /api/progress/complete`
- `POST /api/quiz/attempt`
- `POST /api/flashcards/review`
- `POST /api/notes`

All API calls identify the learner through `x-learner-id` and a `learner_id` cookie.

## GitHub-Deployable Options

This repository can be pushed directly to GitHub.

- Render: use `render.yaml`; Render runs `npm install && npm run build`, then `npm start`.
- Docker hosts: build from the included `Dockerfile`.
- Static frontend only: `npm run build` produces `dist/`, but server-backed progress requires deploying the Express API too.

For durable production storage, mount/persist `server/data/lms.sqlite` or set `DATABASE_PATH` to a persistent SQLite volume path.
