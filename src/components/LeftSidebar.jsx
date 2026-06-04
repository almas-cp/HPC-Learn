import { BookOpen, ChevronDown, PanelLeftClose, PanelLeftOpen, Search } from "lucide-react";
import { useLmsStore } from "../store/useLmsStore.js";

export default function LeftSidebar() {
  const { course, activeLayerId, activeLessonId, search, sidebarCollapsed, setSearch, toggleSidebar, selectLayer, selectLesson } = useLmsStore();
  const query = search.trim().toLowerCase();
  const visibleLayers = course.modules.map((layer) => ({
    ...layer,
    lessons: layer.lessons.filter((lesson) =>
      searchableText(layer, lesson).includes(query)
    )
  })).filter((layer) => !query || layer.lessons.length);
  const resultCount = visibleLayers.reduce((sum, layer) => sum + layer.lessons.length, 0);

  return (
    <aside className={`layer-sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
      <div className="brand-row">
        <BookOpen className="h-6 w-6" />
        <span>AMD PINAKAA Studio</span>
        <button
          className="sidebar-toggle"
          onClick={toggleSidebar}
          aria-label={sidebarCollapsed ? "Expand learning sidebar" : "Collapse learning sidebar"}
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>
      </div>

      {!sidebarCollapsed ? (
        <>
          <div className="sidebar-label">Architecture Lessons</div>
          <label className="search-box">
            <Search className="h-4 w-4" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search PINAKAA blocks" />
          </label>
          {query ? (
            <div className="search-summary">
              <strong>{resultCount}</strong>
              <span>{resultCount === 1 ? "matching topic" : "matching topics"}</span>
            </div>
          ) : null}
        </>
      ) : null}

      <div className="layer-list">
        {visibleLayers.map((layer) => {
          const expanded = !sidebarCollapsed && (layer.id === activeLayerId || query);
          return (
            <section key={layer.id} className={`layer-section ${layer.id === activeLayerId ? "active" : ""}`}>
              <button className="layer-button" onClick={() => selectLayer(layer.id)} title={layer.title}>
                <span className="layer-icon" style={{ color: layer.color }}>◈</span>
                <strong>{layer.order}. {layer.title}</strong>
                <ChevronDown className={`h-4 w-4 ${expanded ? "open" : ""}`} />
              </button>

              {expanded ? (
                <div className="topic-list">
                  {layer.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      className={`topic-button ${lesson.id === activeLessonId ? "active" : ""} ${query ? "with-preview" : ""}`}
                      onClick={() => selectLesson(lesson.id)}
                    >
                      <span />
                      <strong>{lesson.title}</strong>
                      {query ? <small>{previewFor(lesson, query)}</small> : null}
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

function searchableText(layer, lesson) {
  return [
    layer.title,
    lesson.title,
    lesson.overview,
    lesson.relatedBlocks?.map((item) => item.label).join(" "),
    lesson.glossary?.map((item) => `${item.term} ${item.definition}`).join(" "),
    lesson.checks?.join(" ")
  ].filter(Boolean).join(" ").toLowerCase();
}

function previewFor(lesson, query) {
  const sources = [
    lesson.overview,
    ...(lesson.glossary || []).map((item) => `${item.term}: ${item.definition}`),
    ...(lesson.relatedBlocks || []).map((item) => `${item.relation}: ${item.label}`),
    ...(lesson.checks || [])
  ];
  const match = sources.find((source) => source.toLowerCase().includes(query)) || lesson.overview;
  return match.length > 96 ? `${match.slice(0, 93)}...` : match;
}
