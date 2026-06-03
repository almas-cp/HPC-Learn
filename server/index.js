import crypto from "node:crypto";
import path from "node:path";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { seedCourses } from "./content/seedCourses.js";
import { getCourse, getCourses, getLesson } from "./services/courseRepository.js";
import {
  completeLesson,
  ensureLearner,
  getAnalytics,
  getProgress,
  markVisited,
  saveFlashcardReview,
  saveNotes,
  saveQuizAttempt
} from "./services/progressService.js";

const app = express();
const port = Number(process.env.PORT || 4000);
const isProduction = process.env.NODE_ENV === "production";
const seededCount = seedCourses();

app.use(cors({
  origin: isProduction ? false : ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true
}));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

app.use((req, res, next) => {
  let learnerId = req.get("x-learner-id") || req.cookies.learner_id;
  if (!learnerId) learnerId = crypto.randomUUID();

  res.cookie("learner_id", learnerId, {
    httpOnly: false,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 365
  });

  req.learner = ensureLearner(learnerId);
  next();
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, coursesSeeded: seededCount });
});

app.get("/api/courses", (_req, res) => {
  res.json({ courses: getCourses() });
});

app.get("/api/courses/:courseId", (req, res) => {
  const course = getCourse(req.params.courseId);
  if (!course) return res.status(404).json({ error: "Course not found" });
  res.json({ course });
});

app.get("/api/bootstrap", (req, res) => {
  const courses = getCourses();
  const courseId = req.query.courseId || courses[0]?.id;
  const course = courseId ? getCourse(courseId) : null;
  const progress = course ? getProgress(req.learner.id, course.id) : null;
  const analytics = course ? getAnalytics(req.learner.id, course.id) : null;

  res.json({
    learner: { id: req.learner.id },
    courses,
    course,
    progress,
    analytics
  });
});

app.get("/api/progress/:courseId", (req, res) => {
  res.json({
    progress: getProgress(req.learner.id, req.params.courseId),
    analytics: getAnalytics(req.learner.id, req.params.courseId)
  });
});

app.post("/api/progress/visit", (req, res) => {
  const lesson = getLesson(req.body.lessonId);
  const progress = markVisited(req.learner.id, req.body.lessonId, Number(req.body.seconds || 0));
  res.json({ progress, analytics: getAnalytics(req.learner.id, req.body.courseId || lesson?.courseId) });
});

app.post("/api/progress/complete", (req, res) => {
  const lesson = getLesson(req.body.lessonId);
  const progress = completeLesson(req.learner.id, req.body.lessonId, Number(req.body.seconds || 0));
  res.json({ progress, analytics: getAnalytics(req.learner.id, req.body.courseId || lesson?.courseId) });
});

app.post("/api/quiz/attempt", (req, res) => {
  const progress = saveQuizAttempt(
    req.learner.id,
    req.body.lessonId,
    req.body.answers || [],
    Number(req.body.score || 0),
    Number(req.body.total || 0)
  );
  res.json({ progress, analytics: getAnalytics(req.learner.id, req.body.courseId) });
});

app.post("/api/flashcards/review", (req, res) => {
  const progress = saveFlashcardReview(req.learner.id, req.body.lessonId, req.body.flashcardId, req.body.rating || "again");
  res.json({ progress, analytics: getAnalytics(req.learner.id, req.body.courseId) });
});

app.post("/api/notes", (req, res) => {
  const note = saveNotes(req.learner.id, req.body.lessonId, req.body.notes || "");
  res.json({ note });
});

if (isProduction) {
  const distPath = path.resolve("dist");
  app.use(express.static(distPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(port, () => {
  console.log(`HPC Learning Studio API listening on http://localhost:${port}`);
});
