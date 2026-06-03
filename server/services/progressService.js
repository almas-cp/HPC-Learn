import { db, json, parseJson } from "../db/database.js";
import { getCourse, getLesson } from "./courseRepository.js";

const learnerStmt = db.prepare(`
  INSERT INTO Learners (id) VALUES (?)
  ON CONFLICT(id) DO UPDATE SET last_seen_at=CURRENT_TIMESTAMP
`);

export function ensureLearner(learnerId) {
  learnerStmt.run(learnerId);
  return db.prepare("SELECT * FROM Learners WHERE id = ?").get(learnerId);
}

export function markVisited(learnerId, lessonId, seconds = 0) {
  const lesson = getLesson(lessonId);
  if (!lesson) throw new Error("Lesson not found");

  db.prepare(`
    INSERT INTO Progress (learner_id, course_id, lesson_id, time_spent_seconds, last_visited_at)
    VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(learner_id, lesson_id) DO UPDATE SET
      time_spent_seconds=time_spent_seconds + excluded.time_spent_seconds,
      last_visited_at=CURRENT_TIMESTAMP
  `).run(learnerId, lesson.courseId, lessonId, seconds);

  return getProgress(learnerId, lesson.courseId);
}

export function completeLesson(learnerId, lessonId, seconds = 0) {
  const lesson = getLesson(lessonId);
  if (!lesson) throw new Error("Lesson not found");

  db.prepare(`
    INSERT INTO Progress (learner_id, course_id, lesson_id, completed, time_spent_seconds, last_visited_at, completed_at)
    VALUES (?, ?, ?, 1, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT(learner_id, lesson_id) DO UPDATE SET
      completed=1,
      time_spent_seconds=time_spent_seconds + excluded.time_spent_seconds,
      last_visited_at=CURRENT_TIMESTAMP,
      completed_at=COALESCE(completed_at, CURRENT_TIMESTAMP)
  `).run(learnerId, lesson.courseId, lessonId, seconds);

  return getProgress(learnerId, lesson.courseId);
}

export function saveQuizAttempt(learnerId, lessonId, answers, score, total) {
  const lesson = getLesson(lessonId);
  if (!lesson) throw new Error("Lesson not found");

  db.prepare(`
    INSERT INTO QuizAttempts (learner_id, course_id, module_id, lesson_id, score, total, accuracy, answers)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    learnerId,
    lesson.courseId,
    lesson.moduleId,
    lessonId,
    score,
    total,
    total ? score / total : 0,
    json(answers)
  );

  return getProgress(learnerId, lesson.courseId);
}

export function saveFlashcardReview(learnerId, lessonId, flashcardId, rating) {
  const lesson = getLesson(lessonId);
  if (!lesson) throw new Error("Lesson not found");

  db.prepare(`
    INSERT INTO FlashcardReviews (learner_id, course_id, module_id, lesson_id, flashcard_id, rating, review_count, last_reviewed_at)
    VALUES (?, ?, ?, ?, ?, ?, 1, CURRENT_TIMESTAMP)
    ON CONFLICT(learner_id, flashcard_id) DO UPDATE SET
      rating=excluded.rating,
      review_count=review_count + 1,
      last_reviewed_at=CURRENT_TIMESTAMP
  `).run(learnerId, lesson.courseId, lesson.moduleId, lessonId, flashcardId, rating);

  return getProgress(learnerId, lesson.courseId);
}

export function saveNotes(learnerId, lessonId, notes) {
  db.prepare(`
    INSERT INTO Notes (learner_id, lesson_id, notes, updated_at)
    VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(learner_id, lesson_id) DO UPDATE SET
      notes=excluded.notes,
      updated_at=CURRENT_TIMESTAMP
  `).run(learnerId, lessonId, notes);

  return db.prepare("SELECT notes, updated_at FROM Notes WHERE learner_id = ? AND lesson_id = ?")
    .get(learnerId, lessonId);
}

export function getProgress(learnerId, courseId) {
  const progressRows = db.prepare("SELECT * FROM Progress WHERE learner_id = ? AND course_id = ?")
    .all(learnerId, courseId);
  const attempts = db.prepare("SELECT * FROM QuizAttempts WHERE learner_id = ? AND course_id = ? ORDER BY created_at DESC")
    .all(learnerId, courseId);
  const reviews = db.prepare("SELECT * FROM FlashcardReviews WHERE learner_id = ? AND course_id = ?")
    .all(learnerId, courseId);
  const notes = db.prepare(`
    SELECT Notes.lesson_id, Notes.notes, Notes.updated_at
    FROM Notes
    JOIN Lessons ON Lessons.id = Notes.lesson_id
    WHERE Notes.learner_id = ? AND Lessons.course_id = ?
  `).all(learnerId, courseId);

  return {
    lessons: Object.fromEntries(progressRows.map((row) => [row.lesson_id, {
      completed: Boolean(row.completed),
      timeSpentSeconds: row.time_spent_seconds,
      lastVisitedAt: row.last_visited_at,
      completedAt: row.completed_at
    }])),
    quizAttempts: attempts.map((attempt) => ({
      id: attempt.id,
      moduleId: attempt.module_id,
      lessonId: attempt.lesson_id,
      score: attempt.score,
      total: attempt.total,
      accuracy: attempt.accuracy,
      answers: parseJson(attempt.answers, []),
      createdAt: attempt.created_at
    })),
    flashcardReviews: Object.fromEntries(reviews.map((review) => [review.flashcard_id, {
      lessonId: review.lesson_id,
      rating: review.rating,
      reviewCount: review.review_count,
      lastReviewedAt: review.last_reviewed_at
    }])),
    notes: Object.fromEntries(notes.map((note) => [note.lesson_id, {
      notes: note.notes,
      updatedAt: note.updated_at
    }]))
  };
}

export function getAnalytics(learnerId, courseId) {
  const course = getCourse(courseId);
  if (!course) return null;

  const progress = getProgress(learnerId, courseId);
  const lessons = course.modules.flatMap((module) => module.lessons.map((lesson) => ({
    ...lesson,
    moduleTitle: module.title,
    moduleOrder: module.order
  })));

  const completedLessonIds = new Set(
    Object.entries(progress.lessons)
      .filter(([, value]) => value.completed)
      .map(([lessonId]) => lessonId)
  );

  const totalLessons = lessons.length || 1;
  const completedLessons = completedLessonIds.size;
  const totalSeconds = Object.values(progress.lessons)
    .reduce((sum, row) => sum + (row.timeSpentSeconds || 0), 0);

  const latestByLesson = new Map();
  for (const attempt of [...progress.quizAttempts].reverse()) {
    latestByLesson.set(attempt.lessonId, attempt);
  }
  const quizAttempts = [...latestByLesson.values()];
  const quizScore = quizAttempts.reduce((sum, attempt) => sum + attempt.score, 0);
  const quizTotal = quizAttempts.reduce((sum, attempt) => sum + attempt.total, 0);
  const quizAccuracy = quizTotal ? quizScore / quizTotal : 0;

  const moduleCompletion = course.modules.map((module) => {
    const moduleLessons = module.lessons;
    const completed = moduleLessons.filter((lesson) => completedLessonIds.has(lesson.id)).length;
    const moduleAttempts = quizAttempts.filter((attempt) => attempt.moduleId === module.id);
    const moduleScore = moduleAttempts.reduce((sum, attempt) => sum + attempt.score, 0);
    const moduleTotal = moduleAttempts.reduce((sum, attempt) => sum + attempt.total, 0);
    const accuracy = moduleTotal ? moduleScore / moduleTotal : 0;

    return {
      id: module.id,
      title: module.title,
      completion: moduleLessons.length ? completed / moduleLessons.length : 0,
      accuracy,
      mastery: Math.round(((completed / Math.max(moduleLessons.length, 1)) * 0.55 + accuracy * 0.45) * 100)
    };
  });

  const lastVisited = Object.entries(progress.lessons)
    .sort((a, b) => new Date(b[1].lastVisitedAt) - new Date(a[1].lastVisitedAt))[0]?.[0];

  const lastIndex = lessons.findIndex((lesson) => lesson.id === lastVisited);
  const recommendedLesson =
    lessons.find((lesson, index) => index > lastIndex && !completedLessonIds.has(lesson.id)) ||
    lessons.find((lesson) => !completedLessonIds.has(lesson.id)) ||
    lessons[0];

  const weakAreas = moduleCompletion
    .filter((module) => module.mastery < 72)
    .sort((a, b) => a.mastery - b.mastery)
    .slice(0, 3)
    .map((module) => module.title);

  const masteryScore = Math.round(
    ((completedLessons / totalLessons) * 0.5 + quizAccuracy * 0.4 + Math.min(Object.keys(progress.flashcardReviews).length / Math.max(totalLessons * 2, 1), 1) * 0.1) * 100
  );

  db.prepare(`
    INSERT INTO CourseMastery (learner_id, course_id, mastery_score, updated_at)
    VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(learner_id, course_id) DO UPDATE SET
      mastery_score=excluded.mastery_score,
      updated_at=CURRENT_TIMESTAMP
  `).run(learnerId, courseId, masteryScore);

  return {
    courseCompletion: Math.round((completedLessons / totalLessons) * 100),
    completedLessons,
    totalLessons,
    moduleCompletion,
    quizAccuracy: Math.round(quizAccuracy * 100),
    timeSpentSeconds: totalSeconds,
    masteryScore,
    weakAreas,
    recommendedLesson
  };
}
