import { create } from "zustand";
import { courses, getCourseById } from "../content/hpcCourse.js";

const learnerKey = "hpc-learning-studio-learner-id";
const storageKey = "hpc-learning-studio-progress-v2";

export const useLmsStore = create((set, get) => ({
  learner: null,
  courses,
  course: courses[0],
  progress: emptyProgress(),
  analytics: calculateAnalytics(courses[0], emptyProgress()),
  activeLessonId: null,
  activeTab: "study",
  search: "",
  zoom: 0.82,
  loading: true,
  error: "",

  loadBootstrap: (courseId, routeLessonId) => {
    try {
      const learner = ensureLearner();
      const course = getCourseById(courseId);
      const progress = readProgress();
      const analytics = calculateAnalytics(course, progress);
      const lessonId = routeLessonId || analytics.recommendedLesson?.id || firstLessonId(course);

      set({
        learner,
        courses,
        course,
        progress,
        analytics,
        activeLessonId: lessonId,
        loading: false,
        error: ""
      });

      if (lessonId) get().visitLesson(lessonId, 0);
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  setActiveLesson: (lessonId) => {
    set({ activeLessonId: lessonId });
    get().visitLesson(lessonId, 0);
  },

  setActiveTab: (activeTab) => set({ activeTab }),
  setSearch: (search) => set({ search }),
  setZoom: (zoom) => set({ zoom: Math.max(0.66, Math.min(1.35, zoom)) }),

  visitLesson: (lessonId, seconds = 0) => {
    const course = get().course;
    if (!lessonId || !course) return;

    const progress = cloneProgress(get().progress);
    const current = progress.lessons[lessonId] || {};
    progress.lessons[lessonId] = {
      completed: Boolean(current.completed),
      completedAt: current.completedAt || null,
      timeSpentSeconds: (current.timeSpentSeconds || 0) + seconds,
      lastVisitedAt: new Date().toISOString()
    };
    persistAndSet(set, course, progress);
  },

  completeLesson: (lessonId, seconds = 0) => {
    const course = get().course;
    const progress = cloneProgress(get().progress);
    const current = progress.lessons[lessonId] || {};
    progress.lessons[lessonId] = {
      completed: true,
      completedAt: current.completedAt || new Date().toISOString(),
      timeSpentSeconds: (current.timeSpentSeconds || 0) + seconds,
      lastVisitedAt: new Date().toISOString()
    };
    persistAndSet(set, course, progress);
  },

  submitQuiz: (lessonId, answers, score, total) => {
    const course = get().course;
    const lesson = findLesson(course, lessonId);
    const progress = cloneProgress(get().progress);
    progress.quizAttempts.unshift({
      id: crypto.randomUUID(),
      lessonId,
      moduleId: lesson?.moduleId,
      score,
      total,
      accuracy: total ? score / total : 0,
      answers,
      createdAt: new Date().toISOString()
    });
    persistAndSet(set, course, progress);
  },

  reviewFlashcard: (lessonId, flashcardId, rating) => {
    const course = get().course;
    const progress = cloneProgress(get().progress);
    const current = progress.flashcardReviews[flashcardId] || {};
    progress.flashcardReviews[flashcardId] = {
      lessonId,
      rating,
      reviewCount: (current.reviewCount || 0) + 1,
      lastReviewedAt: new Date().toISOString()
    };
    persistAndSet(set, course, progress);
  },

  saveNotes: (lessonId, notes) => {
    const course = get().course;
    const progress = cloneProgress(get().progress);
    progress.notes[lessonId] = {
      notes,
      updatedAt: new Date().toISOString()
    };
    persistAndSet(set, course, progress);
  }
}));

function ensureLearner() {
  let id = localStorage.getItem(learnerKey);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(learnerKey, id);
  }
  return { id };
}

function emptyProgress() {
  return {
    lessons: {},
    quizAttempts: [],
    flashcardReviews: {},
    notes: {}
  };
}

function readProgress() {
  try {
    return { ...emptyProgress(), ...JSON.parse(localStorage.getItem(storageKey) || "{}") };
  } catch {
    return emptyProgress();
  }
}

function writeProgress(progress) {
  localStorage.setItem(storageKey, JSON.stringify(progress));
}

function cloneProgress(progress) {
  return {
    lessons: { ...(progress?.lessons || {}) },
    quizAttempts: [...(progress?.quizAttempts || [])],
    flashcardReviews: { ...(progress?.flashcardReviews || {}) },
    notes: { ...(progress?.notes || {}) }
  };
}

function persistAndSet(set, course, progress) {
  writeProgress(progress);
  set({
    progress,
    analytics: calculateAnalytics(course, progress)
  });
}

function firstLessonId(course) {
  return course?.modules?.[0]?.lessons?.[0]?.id || null;
}

function flattenLessons(course) {
  return course?.modules?.flatMap((module) => module.lessons) || [];
}

function findLesson(course, lessonId) {
  return flattenLessons(course).find((lesson) => lesson.id === lessonId);
}

function calculateAnalytics(course, progress) {
  const lessons = flattenLessons(course);
  const completedIds = new Set(
    Object.entries(progress.lessons || {})
      .filter(([, value]) => value.completed)
      .map(([lessonId]) => lessonId)
  );
  const totalLessons = lessons.length || 1;
  const completedLessons = completedIds.size;
  const timeSpentSeconds = Object.values(progress.lessons || {})
    .reduce((sum, row) => sum + (row.timeSpentSeconds || 0), 0);

  const latestByLesson = new Map();
  for (const attempt of [...(progress.quizAttempts || [])].reverse()) {
    latestByLesson.set(attempt.lessonId, attempt);
  }
  const attempts = [...latestByLesson.values()];
  const quizScore = attempts.reduce((sum, attempt) => sum + attempt.score, 0);
  const quizTotal = attempts.reduce((sum, attempt) => sum + attempt.total, 0);
  const quizAccuracy = quizTotal ? quizScore / quizTotal : 0;

  const moduleCompletion = (course?.modules || []).map((module) => {
    const moduleAttempts = attempts.filter((attempt) => attempt.moduleId === module.id);
    const moduleScore = moduleAttempts.reduce((sum, attempt) => sum + attempt.score, 0);
    const moduleTotal = moduleAttempts.reduce((sum, attempt) => sum + attempt.total, 0);
    const completed = module.lessons.filter((lesson) => completedIds.has(lesson.id)).length;
    const completion = module.lessons.length ? completed / module.lessons.length : 0;
    const accuracy = moduleTotal ? moduleScore / moduleTotal : 0;

    return {
      id: module.id,
      title: module.title,
      completion,
      accuracy,
      mastery: Math.round((completion * 0.55 + accuracy * 0.45) * 100)
    };
  });

  const lastVisited = Object.entries(progress.lessons || {})
    .sort((a, b) => new Date(b[1].lastVisitedAt) - new Date(a[1].lastVisitedAt))[0]?.[0];
  const lastIndex = lessons.findIndex((lesson) => lesson.id === lastVisited);
  const recommendedLesson =
    lessons.find((lesson, index) => index > lastIndex && !completedIds.has(lesson.id)) ||
    lessons.find((lesson) => !completedIds.has(lesson.id)) ||
    lessons[0];

  const weakAreas = moduleCompletion
    .filter((module) => module.mastery < 72)
    .sort((a, b) => a.mastery - b.mastery)
    .slice(0, 3)
    .map((module) => module.title);

  const flashcardFactor = Math.min(
    Object.keys(progress.flashcardReviews || {}).length / Math.max(totalLessons * 2, 1),
    1
  );
  const masteryScore = Math.round(
    ((completedLessons / totalLessons) * 0.5 + quizAccuracy * 0.4 + flashcardFactor * 0.1) * 100
  );

  return {
    courseCompletion: Math.round((completedLessons / totalLessons) * 100),
    completedLessons,
    totalLessons,
    moduleCompletion,
    quizAccuracy: Math.round(quizAccuracy * 100),
    timeSpentSeconds,
    masteryScore,
    weakAreas,
    recommendedLesson
  };
}
