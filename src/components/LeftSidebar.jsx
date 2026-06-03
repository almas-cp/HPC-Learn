import { BookOpen, CheckCircle2, Circle, RotateCcw, Search, Target } from "lucide-react";
import { useLmsStore } from "../store/useLmsStore.js";
import { flattenLessons, moduleProgress } from "../lib/selectors.js";

export default function LeftSidebar({ onSelectLesson }) {
  const { course, progress, analytics, activeLessonId, search, setSearch, createNewLearner } = useLmsStore();
  const lessons = flattenLessons(course);
  const visibleModules = course?.modules?.map((module) => ({
    ...module,
    lessons: module.lessons.filter((lesson) =>
      `${module.title} ${lesson.title} ${lesson.overview}`.toLowerCase().includes(search.toLowerCase())
    )
  })).filter((module) => module.lessons.length) || [];

  const resumeLesson = analytics?.recommendedLesson || lessons.find((lesson) => lesson.id === activeLessonId);

  return (
    <aside className="left-sidebar">
      <div className="brand-row">
        <BookOpen className="h-6 w-6" />
        <span>Learning Path</span>
      </div>

      <div className="progress-card">
        <div className="flex items-center justify-between">
          <span>Your Progress</span>
          <strong>{analytics?.completedLessons || 0} / {analytics?.totalLessons || 0}</strong>
        </div>
        <div className="progress-track">
          <span style={{ width: `${analytics?.courseCompletion || 0}%` }} />
        </div>
        <div className="text-right text-xs text-slate-500">{analytics?.courseCompletion || 0}%</div>
      </div>

      <label className="search-box">
        <Search className="h-4 w-4" />
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search lessons" />
      </label>

      <button className="resume-button" onClick={() => resumeLesson && onSelectLesson(resumeLesson.id)}>
        <Target className="h-4 w-4" />
        Resume Learning
      </button>

      <div className="module-list">
        {visibleModules.map((module) => {
          const percent = Math.round(moduleProgress(module, progress) * 100);
          return (
            <section key={module.id} className="module-section">
              <div className="module-heading">
                <span>{module.order}</span>
                <div>
                  <strong>{module.title}</strong>
                  <small>{percent}% complete</small>
                </div>
              </div>
              {module.lessons.map((lesson) => {
                const complete = progress?.lessons?.[lesson.id]?.completed;
                const active = lesson.id === activeLessonId;
                return (
                  <button
                    key={lesson.id}
                    className={`lesson-nav ${active ? "active" : ""}`}
                    onClick={() => onSelectLesson(lesson.id)}
                  >
                    {complete ? <CheckCircle2 className="h-4 w-4 text-green" /> : <Circle className="h-4 w-4" />}
                    <span>{lesson.title}</span>
                    <small>{lesson.estimatedMinutes} min</small>
                  </button>
                );
              })}
            </section>
          );
        })}
      </div>

      <button
        className="reset-button"
        onClick={createNewLearner}
      >
        <RotateCcw className="h-4 w-4" />
        New Learner
      </button>
    </aside>
  );
}
