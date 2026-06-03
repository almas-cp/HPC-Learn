import courseMeta from "./courses/introduction-hpc/course.json";
import module1 from "./courses/introduction-hpc/module-1.md?raw";
import module2 from "./courses/introduction-hpc/module-2.md?raw";
import module3 from "./courses/introduction-hpc/module-3.md?raw";
import module4 from "./courses/introduction-hpc/module-4.md?raw";
import module5 from "./courses/introduction-hpc/module-5.md?raw";
import module6 from "./courses/introduction-hpc/module-6.md?raw";
import module7 from "./courses/introduction-hpc/module-7.md?raw";
import module8 from "./courses/introduction-hpc/module-8.md?raw";

const moduleSources = [module1, module2, module3, module4, module5, module6, module7, module8];

export const courses = [normalizeCourse(courseMeta, moduleSources)];

export function getCourseById(courseId) {
  return courses.find((course) => course.id === courseId) || courses[0];
}

function normalizeCourse(meta, sources) {
  const modules = sources.map((source, moduleIndex) => {
    const module = parseFrontmatter(source);
    return {
      ...module,
      order: module.order ?? moduleIndex + 1,
      lessons: (module.lessons || []).map((lesson, lessonIndex) => ({
        lessonType: "text",
        estimatedMinutes: 12,
        learningObjectives: [],
        content: [],
        summary: "",
        quiz: [],
        flashcards: [],
        ...lesson,
        order: lesson.order ?? lessonIndex + 1,
        moduleId: module.id,
        moduleTitle: module.title,
        moduleOrder: module.order ?? moduleIndex + 1,
        moduleColor: module.color,
        courseId: meta.id
      }))
    };
  });

  return {
    ...meta,
    estimatedMinutes: modules.reduce((sum, module) => sum + (module.estimatedMinutes || 0), 0),
    modules
  };
}

function parseFrontmatter(source) {
  const match = source.match(/^---\s*([\s\S]*?)\s*---/);
  if (!match) throw new Error("Course module is missing JSON frontmatter.");
  return JSON.parse(match[1]);
}
