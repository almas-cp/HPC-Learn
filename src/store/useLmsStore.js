import { create } from "zustand";
import { courses } from "../content/hpcCourse.js";

const course = courses[0];
const firstLessonId = course.modules[0]?.lessons[0]?.id || null;
const firstLayerId = course.modules[0]?.id || null;

export const useLmsStore = create((set, get) => ({
  course,
  activeLayerId: firstLayerId,
  activeLessonId: firstLessonId,
  activeBlockKey: firstLayerId ? `module:${firstLayerId}` : null,
  search: "",
  zoom: 1,
  sidebarCollapsed: false,
  readerMode: "study",

  setSearch: (search) => set({ search }),
  setZoom: (zoom) => set({ zoom: Math.max(0.82, Math.min(1.18, zoom)) }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setReaderMode: (readerMode) => set({ readerMode }),

  selectLayer: (layerId, blockKey) => {
    const layer = course.modules.find((module) => module.id === layerId);
    const firstLesson = layer?.lessons[0];
    set({
      activeLayerId: layerId,
      activeLessonId: firstLesson?.id || get().activeLessonId,
      activeBlockKey: blockKey || firstLesson?.blockKey || `module:${layerId}`
    });
  },

  selectLesson: (lessonId, blockKey) => {
    const lesson = findLesson(lessonId);
    if (!lesson) return;
    set({
      activeLayerId: lesson.moduleId,
      activeLessonId: lesson.id,
      activeBlockKey: blockKey || lesson.blockKey || `lesson:${lesson.id}`
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
