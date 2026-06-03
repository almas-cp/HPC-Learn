import fs from "node:fs";
import path from "node:path";

const contentRoot = path.resolve("server", "courses");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function parseModuleMarkdown(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const match = raw.match(/^---\s*([\s\S]*?)\s*---/);
  if (!match) {
    throw new Error(`${filePath} must start with JSON frontmatter between --- markers.`);
  }
  return JSON.parse(match[1]);
}

function normalizeCourse(folderName, courseMeta) {
  const folder = path.join(contentRoot, folderName);
  const quizPath = path.join(folder, "quiz.json");
  const flashcardsPath = path.join(folder, "flashcards.json");
  const externalQuiz = fs.existsSync(quizPath) ? readJson(quizPath) : {};
  const externalFlashcards = fs.existsSync(flashcardsPath) ? readJson(flashcardsPath) : {};
  const moduleFiles = courseMeta.moduleFiles?.length
    ? courseMeta.moduleFiles
    : fs.readdirSync(folder).filter((file) => /^module-\d+\.md$/i.test(file)).sort();

  const modules = moduleFiles.map((file, index) => {
    const module = parseModuleMarkdown(path.join(folder, file));
    return {
      ...module,
      order: module.order ?? index + 1,
      lessons: (module.lessons || []).map((lesson, lessonIndex) => {
        const normalizedLesson = {
          lessonType: "text",
          estimatedMinutes: 12,
          learningObjectives: [],
          content: [],
          summary: "",
          ...lesson,
          order: lesson.order ?? lessonIndex + 1,
          moduleId: module.id,
          courseId: courseMeta.id
        };

        return {
          ...normalizedLesson,
          quiz: normalizedLesson.quiz?.length ? normalizedLesson.quiz : (externalQuiz[lesson.id] || []),
          flashcards: normalizedLesson.flashcards?.length ? normalizedLesson.flashcards : (externalFlashcards[lesson.id] || [])
        };
      })
    };
  });

  return {
    ...courseMeta,
    modules
  };
}

export function loadCourses() {
  if (!fs.existsSync(contentRoot)) return [];

  return fs.readdirSync(contentRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const coursePath = path.join(contentRoot, entry.name, "course.json");
      if (!fs.existsSync(coursePath)) return null;
      return normalizeCourse(entry.name, readJson(coursePath));
    })
    .filter(Boolean);
}
