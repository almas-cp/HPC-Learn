import { db, parseJson } from "../db/database.js";

const courseRows = db.prepare("SELECT * FROM Courses ORDER BY title");
const moduleRows = db.prepare("SELECT * FROM Modules WHERE course_id = ? ORDER BY position");
const lessonRows = db.prepare("SELECT * FROM Lessons WHERE course_id = ? ORDER BY position");

export function getCourses() {
  return courseRows.all().map(mapCourseRow);
}

export function getCourse(courseId) {
  const course = db.prepare("SELECT * FROM Courses WHERE id = ?").get(courseId);
  if (!course) return null;

  const modules = moduleRows.all(courseId).map((module) => ({
    ...mapModuleRow(module),
    lessons: []
  }));

  const moduleMap = new Map(modules.map((module) => [module.id, module]));
  for (const lesson of lessonRows.all(courseId).map(mapLessonRow)) {
    moduleMap.get(lesson.moduleId)?.lessons.push(lesson);
  }

  return {
    ...mapCourseRow(course),
    modules
  };
}

export function getLesson(lessonId) {
  const row = db.prepare("SELECT * FROM Lessons WHERE id = ?").get(lessonId);
  return row ? mapLessonRow(row) : null;
}

function mapCourseRow(row) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    level: row.level,
    estimatedMinutes: row.estimated_minutes,
    ...parseJson(row.metadata)
  };
}

function mapModuleRow(row) {
  return {
    id: row.id,
    courseId: row.course_id,
    title: row.title,
    description: row.description,
    order: row.position,
    estimatedMinutes: row.estimated_minutes,
    ...parseJson(row.metadata)
  };
}

function mapLessonRow(row) {
  const metadata = parseJson(row.metadata);
  return {
    id: row.id,
    moduleId: row.module_id,
    courseId: row.course_id,
    title: row.title,
    overview: row.overview,
    lessonType: row.lesson_type,
    order: row.position,
    estimatedMinutes: row.estimated_minutes,
    content: parseJson(row.content, []),
    quiz: parseJson(row.quiz, []),
    flashcards: parseJson(row.flashcards, []),
    learningObjectives: metadata.learningObjectives || [],
    summary: metadata.summary || "",
    diagram: metadata.diagram,
    videoUrl: metadata.videoUrl,
    examples: metadata.examples || []
  };
}
