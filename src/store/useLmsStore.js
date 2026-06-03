import { create } from "zustand";
import { api } from "../api/client.js";

export const useLmsStore = create((set, get) => ({
  learner: null,
  courses: [],
  course: null,
  progress: null,
  analytics: null,
  activeLessonId: null,
  activeTab: "study",
  search: "",
  zoom: 0.82,
  loading: true,
  error: "",

  loadBootstrap: async (courseId, routeLessonId) => {
    set({ loading: true, error: "" });
    try {
      const data = await api(`/api/bootstrap${courseId ? `?courseId=${courseId}` : ""}`);
      const lessonId = routeLessonId || data.analytics?.recommendedLesson?.id || firstLessonId(data.course);
      set({
        learner: data.learner,
        courses: data.courses,
        course: data.course,
        progress: data.progress,
        analytics: data.analytics,
        activeLessonId: lessonId,
        loading: false
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

  visitLesson: async (lessonId, seconds = 0) => {
    const courseId = get().course?.id;
    if (!lessonId || !courseId) return;
    const data = await api("/api/progress/visit", {
      method: "POST",
      body: JSON.stringify({ courseId, lessonId, seconds })
    });
    set({ progress: data.progress, analytics: data.analytics });
  },

  completeLesson: async (lessonId, seconds = 0) => {
    const courseId = get().course?.id;
    const data = await api("/api/progress/complete", {
      method: "POST",
      body: JSON.stringify({ courseId, lessonId, seconds })
    });
    set({ progress: data.progress, analytics: data.analytics });
  },

  submitQuiz: async (lessonId, answers, score, total) => {
    const courseId = get().course?.id;
    const data = await api("/api/quiz/attempt", {
      method: "POST",
      body: JSON.stringify({ courseId, lessonId, answers, score, total })
    });
    set({ progress: data.progress, analytics: data.analytics });
  },

  reviewFlashcard: async (lessonId, flashcardId, rating) => {
    const courseId = get().course?.id;
    const data = await api("/api/flashcards/review", {
      method: "POST",
      body: JSON.stringify({ courseId, lessonId, flashcardId, rating })
    });
    set({ progress: data.progress, analytics: data.analytics });
  },

  saveNotes: async (lessonId, notes) => {
    await api("/api/notes", {
      method: "POST",
      body: JSON.stringify({ lessonId, notes })
    });
    const progress = get().progress || {};
    set({
      progress: {
        ...progress,
        notes: {
          ...(progress.notes || {}),
          [lessonId]: { notes, updatedAt: new Date().toISOString() }
        }
      }
    });
  }
}));

function firstLessonId(course) {
  return course?.modules?.[0]?.lessons?.[0]?.id || null;
}
