import { ChevronLeft, ChevronRight, Layers, Map, PanelLeft } from "lucide-react";
import { useLmsStore, findLayer, findLesson, getAdjacentLessons } from "./store/useLmsStore.js";
import LeftSidebar from "./components/LeftSidebar.jsx";
import LearningMap from "./components/LearningMap.jsx";
import RightSidebar from "./components/RightSidebar.jsx";

export default function App() {
  const { course, activeLayerId, activeLessonId, previousLesson, nextLesson } = useLmsStore();
  const activeLayer = findLayer(activeLayerId);
  const activeLesson = findLesson(activeLessonId);
  const { previous, next } = getAdjacentLessons(activeLessonId);

  return (
    <div className="wiki-shell">
      <LeftSidebar />

      <main className="map-stage">
        <header className="map-header">
          <div>
            <h1>HPC Architecture Map</h1>
            <p>Explore the HPC software stack from hardware foundation to advanced applications.</p>
          </div>
          <div className="header-tabs" aria-label="Primary sections">
            <span><PanelLeft className="h-4 w-4" /> Layers</span>
            <span className="active"><Map className="h-4 w-4" /> Map</span>
            <span><Layers className="h-4 w-4" /> Reader</span>
          </div>
        </header>

        <LearningMap />
      </main>

      <RightSidebar lesson={activeLesson} layer={activeLayer} />

      <nav className="bottom-nav" aria-label="Sequential topic navigation">
        <button className="nav-arrow" onClick={previousLesson} disabled={!previous} aria-label="Previous topic">
          <ChevronLeft className="h-5 w-5" />
          Previous
        </button>
        <div className="nav-context">
          <span>Layer {activeLayer?.order}: {activeLayer?.title}</span>
          <strong>{activeLesson?.title}</strong>
          <small>{course.title}</small>
        </div>
        <button className="nav-arrow primary" onClick={nextLesson} disabled={!next} aria-label="Next topic">
          Next
          <ChevronRight className="h-5 w-5" />
        </button>
      </nav>
    </div>
  );
}
