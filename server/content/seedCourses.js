import { db, json } from "../db/database.js";
import { loadCourses } from "./loadCourses.js";

const upsertCourse = db.prepare(`
  INSERT INTO Courses (id, title, description, level, estimated_minutes, metadata)
  VALUES (@id, @title, @description, @level, @estimatedMinutes, @metadata)
  ON CONFLICT(id) DO UPDATE SET
    title=excluded.title,
    description=excluded.description,
    level=excluded.level,
    estimated_minutes=excluded.estimated_minutes,
    metadata=excluded.metadata
`);

const upsertModule = db.prepare(`
  INSERT INTO Modules (id, course_id, title, description, position, estimated_minutes, metadata)
  VALUES (@id, @courseId, @title, @description, @position, @estimatedMinutes, @metadata)
  ON CONFLICT(id) DO UPDATE SET
    title=excluded.title,
    description=excluded.description,
    position=excluded.position,
    estimated_minutes=excluded.estimated_minutes,
    metadata=excluded.metadata
`);

const upsertLesson = db.prepare(`
  INSERT INTO Lessons (id, module_id, course_id, title, overview, lesson_type, position, estimated_minutes, content, quiz, flashcards, metadata)
  VALUES (@id, @moduleId, @courseId, @title, @overview, @lessonType, @position, @estimatedMinutes, @content, @quiz, @flashcards, @metadata)
  ON CONFLICT(id) DO UPDATE SET
    title=excluded.title,
    overview=excluded.overview,
    lesson_type=excluded.lesson_type,
    position=excluded.position,
    estimated_minutes=excluded.estimated_minutes,
    content=excluded.content,
    quiz=excluded.quiz,
    flashcards=excluded.flashcards,
    metadata=excluded.metadata
`);

export function seedCourses() {
  const courses = loadCourses();

  const transaction = db.transaction(() => {
    for (const course of courses) {
      const estimatedMinutes = course.modules.reduce(
        (sum, module) => sum + (module.estimatedMinutes || 0),
        0
      );

      upsertCourse.run({
        id: course.id,
        title: course.title,
        description: course.description,
        level: course.level,
        estimatedMinutes,
        metadata: json({
          slug: course.slug,
          outcomes: course.outcomes,
          prerequisites: course.prerequisites,
          accent: course.accent
        })
      });

      for (const module of course.modules) {
        upsertModule.run({
          id: module.id,
          courseId: course.id,
          title: module.title,
          description: module.description,
          position: module.order,
          estimatedMinutes: module.estimatedMinutes,
          metadata: json({
            outcomes: module.outcomes,
            color: module.color,
            dependencies: module.dependencies || []
          })
        });

        for (const lesson of module.lessons) {
          upsertLesson.run({
            id: lesson.id,
            moduleId: module.id,
            courseId: course.id,
            title: lesson.title,
            overview: lesson.overview,
            lessonType: lesson.lessonType,
            position: lesson.order,
            estimatedMinutes: lesson.estimatedMinutes,
            content: json(lesson.content),
            quiz: json(lesson.quiz),
            flashcards: json(lesson.flashcards),
            metadata: json({
              learningObjectives: lesson.learningObjectives,
              summary: lesson.summary,
              diagram: lesson.diagram,
              videoUrl: lesson.videoUrl,
              examples: lesson.examples || []
            })
          });
        }
      }
    }
  });

  transaction();
  return courses.length;
}
