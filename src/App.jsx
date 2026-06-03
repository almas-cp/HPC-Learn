import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Loader2 } from "lucide-react";
import { useLmsStore } from "./store/useLmsStore.js";
import { findLesson } from "./lib/selectors.js";
import LeftSidebar from "./components/LeftSidebar.jsx";
import LearningMap from "./components/LearningMap.jsx";
import LessonWorkspace from "./components/LessonWorkspace.jsx";
import RightSidebar from "./components/RightSidebar.jsx";

export default function App() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    course,
    progress,
    analytics,
    activeLessonId,
    loading,
    error,
    loadBootstrap,
    setActiveLesson
  } = useLmsStore();

  useEffect(() => {
    loadBootstrap(courseId, lessonId);
    // Initial lesson ID seeds direct deep links; later lesson changes are handled by the route sync effect below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, loadBootstrap]);

  useEffect(() => {
    if (!course || !lessonId || lessonId === activeLessonId) return;
    setActiveLesson(lessonId);
  }, [course, lessonId, activeLessonId, setActiveLesson]);

  useEffect(() => {
    if (!course || !activeLessonId) return;
    const target = `/course/${course.id}/lesson/${activeLessonId}`;
    if (location.pathname !== target) navigate(target, { replace: true });
  }, [course, activeLessonId, location.pathname, navigate]);

  const activeLesson = findLesson(course, activeLessonId);

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-panel text-ink">
        <div className="flex items-center gap-3 rounded-lg border border-line bg-white px-5 py-4 shadow-soft">
          <Loader2 className="h-5 w-5 animate-spin text-blue" />
          Loading learning studio
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid min-h-screen place-items-center bg-panel p-6 text-ink">
        <div className="max-w-lg rounded-lg border border-red-200 bg-white p-5 shadow-soft">
          <div className="mb-2 flex items-center gap-2 font-semibold text-red-700">
            <BookOpen className="h-5 w-5" />
            LMS failed to load
          </div>
          <p className="text-sm text-slate-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <LeftSidebar onSelectLesson={setActiveLesson} />
      <main className="main-stage">
        <header className="stage-header">
          <div>
            <h1>HPC Learning Studio</h1>
            <p>{course?.title}</p>
          </div>
          <div className="header-metric">
            <span>{analytics?.courseCompletion || 0}%</span>
            <small>course completion</small>
          </div>
        </header>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLesson?.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="stage-scroll"
          >
            <LearningMap />
            <LessonWorkspace lesson={activeLesson} progress={progress} />
          </motion.div>
        </AnimatePresence>
      </main>
      <RightSidebar lesson={activeLesson} progress={progress} analytics={analytics} />
    </div>
  );
}
