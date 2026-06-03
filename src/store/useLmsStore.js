import { create } from "zustand";
import { courses } from "../content/hpcCourse.js";

const course = courses[0];
const firstLessonId = course.modules[0]?.lessons[0]?.id || null;

export const useLmsStore = create((set, get) => ({
  course,
  activeLayerId: course.modules[0]?.id || null,
  activeLessonId: firstLessonId,
  search: "",
  zoom: 1,

  setSearch: (search) => set({ search }),
  setZoom: (zoom) => set({ zoom: Math.max(0.82, Math.min(1.18, zoom)) }),

  selectLayer: (layerId) => {
    const layer = course.modules.find((module) => module.id === layerId);
    set({
      activeLayerId: layerId,
      activeLessonId: layer?.lessons[0]?.id || get().activeLessonId
    });
  },

  selectLesson: (lessonId) => {
    const lesson = findLesson(lessonId);
    if (!lesson) return;
    set({
      activeLayerId: lesson.moduleId,
      activeLessonId: lesson.id
    });
  },

  nextLesson: () => {
    const lessons = flattenLessons();
    const index = lessons.findIndex((lesson) => lesson.id === get().activeLessonId);
    const next = lessons[Math.min(lessons.length - 1, index + 1)];
    if (next) get().selectLesson(next.id);
  },

  previousLesson: () => {
    const lessons = flattenLessons();
    const index = lessons.findIndex((lesson) => lesson.id === get().activeLessonId);
    const previous = lessons[Math.max(0, index - 1)];
    if (previous) get().selectLesson(previous.id);
  }
}));

export function flattenLessons() {
  return course.modules.flatMap((module) =>
    module.lessons.map((lesson) => ({
      ...lesson,
      moduleId: module.id,
      moduleTitle: module.title,
      moduleOrder: module.order,
      moduleColor: module.color
    }))
  );
}

export function findLesson(lessonId) {
  return flattenLessons().find((lesson) => lesson.id === lessonId) || flattenLessons()[0];
}

export function findLayer(layerId) {
  return course.modules.find((module) => module.id === layerId) || course.modules[0];
}

export function getAdjacentLessons(lessonId) {
  const lessons = flattenLessons();
  const index = lessons.findIndex((lesson) => lesson.id === lessonId);
  return {
    previous: index > 0 ? lessons[index - 1] : null,
    next: index >= 0 && index < lessons.length - 1 ? lessons[index + 1] : null
  };
}
