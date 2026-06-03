import { CheckCircle2, Lock, Map, Minus, Plus, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useLmsStore } from "../store/useLmsStore.js";
import { moduleProgress } from "../lib/selectors.js";

const positions = [
  { x: 40, y: 80 },
  { x: 286, y: 80 },
  { x: 532, y: 80 },
  { x: 778, y: 80 },
  { x: 40, y: 310 },
  { x: 286, y: 310 },
  { x: 532, y: 310 },
  { x: 778, y: 310 }
];

export default function LearningMap() {
  const { course, progress, analytics, activeLessonId, setActiveLesson, zoom, setZoom } = useLmsStore();
  const modules = course?.modules || [];
  const activeModuleId = modules.find((module) => module.lessons.some((lesson) => lesson.id === activeLessonId))?.id;

  return (
    <section className="map-panel">
      <div className="map-toolbar">
        <div>
          <h2>Interactive Learning Map</h2>
          <p>Click a module or lesson node to continue through the HPC dependency path.</p>
        </div>
        <div className="zoom-controls" aria-label="Map zoom controls">
          <button onClick={() => setZoom(zoom - 0.1)} aria-label="Zoom out"><Minus className="h-4 w-4" /></button>
          <span>{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom(zoom + 0.1)} aria-label="Zoom in"><Plus className="h-4 w-4" /></button>
        </div>
      </div>

      <div className="map-canvas">
        <div className="map-inner" style={{ transform: `scale(${zoom})` }}>
          <svg className="dependency-lines" viewBox="0 0 1020 500" aria-hidden="true">
            {modules.slice(1).map((module, index) => {
              const from = positions[index];
              const to = positions[index + 1];
              return (
                <path
                  key={module.id}
                  d={`M ${from.x + 170} ${from.y + 76} C ${from.x + 220} ${from.y + 76}, ${to.x - 60} ${to.y + 76}, ${to.x} ${to.y + 76}`}
                  fill="none"
                  stroke={module.id === activeModuleId ? "#1f6feb" : "#c9d7e8"}
                  strokeWidth="4"
                  strokeDasharray={module.id === activeModuleId ? "0" : "10 10"}
                />
              );
            })}
          </svg>

          {modules.map((module, index) => {
            const pos = positions[index];
            const percent = Math.round(moduleProgress(module, progress) * 100);
            const active = module.id === activeModuleId;
            const complete = percent === 100;
            const recommended = analytics?.recommendedLesson?.moduleId === module.id;

            return (
              <motion.div
                key={module.id}
                className={`map-node ${active ? "active" : ""} ${complete ? "complete" : ""}`}
                style={{ left: pos.x, top: pos.y, borderColor: module.color }}
                whileHover={{ y: -4 }}
                onClick={() => setActiveLesson(module.lessons[0]?.id)}
              >
                <div className="node-icon" style={{ background: module.color }}>
                  {complete ? <CheckCircle2 className="h-5 w-5" /> : recommended ? <Search className="h-5 w-5" /> : <Map className="h-5 w-5" />}
                </div>
                <div className="node-body">
                  <span>Module {module.order}</span>
                  <strong>{module.title}</strong>
                  <small>{module.estimatedMinutes} min · {percent}%</small>
                </div>
                <div className="lesson-dots">
                  {module.lessons.map((lesson) => {
                    const done = progress?.lessons?.[lesson.id]?.completed;
                    return (
                      <button
                        key={lesson.id}
                        className={lesson.id === activeLessonId ? "selected" : done ? "done" : ""}
                        title={lesson.title}
                        onClick={(event) => {
                          event.stopPropagation();
                          setActiveLesson(lesson.id);
                        }}
                      />
                    );
                  })}
                </div>
                {!complete && module.dependencies?.length ? <Lock className="node-lock h-4 w-4" /> : null}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
