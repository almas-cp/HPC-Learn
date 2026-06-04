import { Layers, Map, PanelLeft } from "lucide-react";
import { useLmsStore, findLayer, findLesson } from "./store/useLmsStore.js";
import LeftSidebar from "./components/LeftSidebar.jsx";
import LearningMap from "./components/LearningMap.jsx";
import RightSidebar from "./components/RightSidebar.jsx";
import { GlossedText } from "./lib/abbreviations.jsx";

export default function App() {
  const { activeLayerId, activeLessonId, sidebarCollapsed } = useLmsStore();
  const activeLayer = findLayer(activeLayerId);
  const activeLesson = findLesson(activeLessonId);

  return (
    <div className={`wiki-shell ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <LeftSidebar />

      <main className="map-stage">
        <header className="map-header">
          <div>
            <h1><GlossedText text="AMD PINAKAA Studio" /></h1>
            <p><GlossedText text="Learn the HPC and AI ecosystem by clicking the exact blocks in the architecture map." /></p>
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
    </div>
  );
}
