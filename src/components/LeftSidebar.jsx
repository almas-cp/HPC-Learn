import { BookOpen, ChevronDown, Search } from "lucide-react";
import { useLmsStore } from "../store/useLmsStore.js";

export default function LeftSidebar() {
  const { course, activeLayerId, activeLessonId, search, setSearch, selectLayer, selectLesson } = useLmsStore();
  const query = search.trim().toLowerCase();
  const visibleLayers = course.modules.map((layer) => ({
    ...layer,
    lessons: layer.lessons.filter((lesson) =>
      `${layer.title} ${lesson.title} ${lesson.overview}`.toLowerCase().includes(query)
    )
  })).filter((layer) => !query || layer.lessons.length);

  return (
    <aside className="layer-sidebar">
      <div className="brand-row">
        <BookOpen className="h-6 w-6" />
        <span>HPC Learning Studio</span>
      </div>

      <div className="sidebar-label">Learning Layers</div>
      <label className="search-box">
        <Search className="h-4 w-4" />
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search layers and topics" />
      </label>

      <div className="layer-list">
        {visibleLayers.map((layer) => {
          const expanded = layer.id === activeLayerId || query;
          return (
            <section key={layer.id} className={`layer-section ${layer.id === activeLayerId ? "active" : ""}`}>
              <button className="layer-button" onClick={() => selectLayer(layer.id)}>
                <span className="layer-icon" style={{ color: layer.color }}>◈</span>
                <strong>{layer.order}. {layer.title}</strong>
                <ChevronDown className={`h-4 w-4 ${expanded ? "open" : ""}`} />
              </button>

              {expanded ? (
                <div className="topic-list">
                  {layer.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      className={`topic-button ${lesson.id === activeLessonId ? "active" : ""}`}
                      onClick={() => selectLesson(lesson.id)}
                    >
                      <span />
                      {lesson.title}
                    </button>
                  ))}
                </div>
              ) : null}
            </section>
          );
        })}
      </div>
    </aside>
  );
}
