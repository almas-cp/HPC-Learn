export function flattenLessons(course) {
  if (!course) return [];
  return course.modules.flatMap((module) =>
    module.lessons.map((lesson) => ({
      ...lesson,
      moduleTitle: module.title,
      moduleOrder: module.order,
      moduleColor: module.color
    }))
  );
}

export function findLesson(course, lessonId) {
  return flattenLessons(course).find((lesson) => lesson.id === lessonId) || null;
}

export function findModule(course, moduleId) {
  return course?.modules?.find((module) => module.id === moduleId) || null;
}

export function formatTime(seconds = 0) {
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return `${hours}h ${rest}m`;
}

export function moduleProgress(module, progress) {
  const completed = module.lessons.filter((lesson) => progress?.lessons?.[lesson.id]?.completed).length;
  return module.lessons.length ? completed / module.lessons.length : 0;
}
