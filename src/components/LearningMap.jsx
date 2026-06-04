import { Maximize2, Minus, Plus } from "lucide-react";
import { useLmsStore, flattenLessons } from "../store/useLmsStore.js";

export default function LearningMap() {
  const { course, activeLayerId, activeLessonId, activeBlockKey, zoom, setZoom, selectLayer, selectLesson } = useLmsStore();
  const architecture = course.architecture;
  const lessons = flattenLessons();
  const activeLesson = lessons.find((lesson) => lesson.id === activeLessonId);
  const relatedBlockKeys = new Set(activeLesson?.relatedBlocks?.map((item) => item.blockKey) || []);

  function selectByLabel(label, fallbackModuleId, blockKey) {
    const moduleId = moduleFor(fallbackModuleId);
    const normalizedLabel = normalize(label);
    const lesson = lessons.find((item) => normalize(item.title) === normalizedLabel)
      || lessons.find((item) => normalize(item.title).startsWith(normalizedLabel))
      || lessons.find((item) => normalize(item.title).includes(normalizedLabel))
      || lessons.find((item) => item.moduleId === moduleId);

    if (lesson) {
      selectLesson(lesson.id, blockKey);
      return;
    }

    selectLayer(moduleId, blockKey);
  }

  return (
    <section className="architecture-panel pinakaa-panel">
      <div className="architecture-toolbar">
        <div className="legend">
          <span><i className="blue" /> Studio tools</span>
          <span><i className="orange" /> Middleware</span>
          <span><i className="green" /> Base software</span>
          <span><i className="gold" /> Cross-cutting pillars</span>
        </div>
        <div className="zoom-controls">
          <button onClick={() => setZoom(zoom - 0.08)} aria-label="Zoom out"><Minus className="h-4 w-4" /></button>
          <span>{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom(zoom + 0.08)} aria-label="Zoom in"><Plus className="h-4 w-4" /></button>
          <button onClick={() => setZoom(1)} aria-label="Fit map"><Maximize2 className="h-4 w-4" /></button>
        </div>
      </div>

      <div className="architecture-canvas pinakaa-canvas">
        <div className="architecture-inner pinakaa-inner" style={{ transform: `scale(${zoom})` }}>
          <aside
            className={`vertical-pillar left ${activeBlockKey === blockKey("module", architecture.pillars[0].id) ? "active" : ""} ${relatedBlockKeys.has(blockKey("module", architecture.pillars[0].id)) ? "related" : ""}`}
          >
            <button
              className={`pillar-main ${activeBlockKey === blockKey("module", architecture.pillars[0].id) ? "active" : ""} ${relatedBlockKeys.has(blockKey("module", architecture.pillars[0].id)) ? "related" : ""}`}
              onClick={() => selectLayer(architecture.pillars[0].id, blockKey("module", architecture.pillars[0].id))}
            >
              <strong>{architecture.pillars[0].title}</strong>
            </button>
            <div className="pillar-tokens">
              {pillarItems(architecture.pillars[0]).map((item) => (
                <button
                  key={item}
                  className={`pillar-token ${activeBlockKey === blockKey("item", item) ? "active" : ""} ${relatedBlockKeys.has(blockKey("item", item)) ? "related" : ""}`}
                  onClick={() => selectByLabel(item, architecture.pillars[0].id, blockKey("item", item))}
                >
                  {item}
                </button>
              ))}
            </div>
          </aside>

          <main className="pinakaa-stack">
            <button
              className={`studio-title ${activeBlockKey === blockKey("module", "pinakaa-overview") ? "active" : ""}`}
              onClick={() => selectLayer("pinakaa-overview", blockKey("module", "pinakaa-overview"))}
            >
              {architecture.title}
            </button>

            {architecture.layers.map((layer) => (
              <section
                key={layer.id}
                className={`pinakaa-layer ${layer.id} ${isLayerActive(layer, activeLayerId) ? "active" : ""}`}
                style={{ "--layer-color": layer.color }}
              >
                {layer.id !== "studio-tools" ? (
                  <button
                    className={`pinakaa-layer-title ${activeBlockKey === blockKey("module", moduleFor(layer.id)) ? "active" : ""} ${relatedBlockKeys.has(blockKey("module", moduleFor(layer.id))) ? "related" : ""}`}
                    onClick={() => selectLayer(moduleFor(layer.id), blockKey("module", moduleFor(layer.id)))}
                  >
                    {layer.title}
                  </button>
                ) : null}

                <div className="pinakaa-section-grid" data-count={layer.sections.length}>
                  {layer.sections.map((section) => (
                    <article key={section.id} className="pinakaa-section">
                      <button
                        className={`pinakaa-section-title ${activeBlockKey === blockKey("section", section.id) ? "active" : ""} ${relatedBlockKeys.has(blockKey("section", section.id)) ? "related" : ""}`}
                        onClick={() => selectByLabel(section.title, section.id, blockKey("section", section.id))}
                      >
                        {section.title}
                      </button>
                      <div className="pinakaa-items">
                        {section.items.map((item) => {
                          const lesson = lessons.find((candidate) => normalize(candidate.title) === normalize(item));
                          const key = blockKey("item", item);
                          const selected = activeBlockKey === key || (!activeBlockKey && lesson?.id === activeLessonId);
                          const related = relatedBlockKeys.has(key);
                          return (
                            <button
                              key={item}
                              className={`pinakaa-item ${selected ? "active" : ""} ${related ? "related" : ""}`}
                              onClick={() => selectByLabel(item, section.id, key)}
                              title={item}
                            >
                              {item}
                            </button>
                          );
                        })}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </main>

          <aside
            className={`vertical-pillar right ${activeBlockKey === blockKey("module", architecture.pillars[1].id) ? "active" : ""} ${relatedBlockKeys.has(blockKey("module", architecture.pillars[1].id)) ? "related" : ""}`}
          >
            <button
              className={`pillar-main ${activeBlockKey === blockKey("module", architecture.pillars[1].id) ? "active" : ""} ${relatedBlockKeys.has(blockKey("module", architecture.pillars[1].id)) ? "related" : ""}`}
              onClick={() => selectLayer(architecture.pillars[1].id, blockKey("module", architecture.pillars[1].id))}
            >
              <strong>{architecture.pillars[1].title}</strong>
            </button>
            <div className="pillar-tokens">
              {pillarItems(architecture.pillars[1]).map((item) => (
                <button
                  key={item}
                  className={`pillar-token ${activeBlockKey === blockKey("item", item) ? "active" : ""} ${relatedBlockKeys.has(blockKey("item", item)) ? "related" : ""}`}
                  onClick={() => selectByLabel(item, architecture.pillars[1].id, blockKey("item", item))}
                >
                  {item}
                </button>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function normalize(value) {
  return String(value).toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function blockKey(type, value) {
  return `${type}:${normalize(value)}`;
}

function pillarItems(pillar) {
  if (pillar.id === "cluster-monitoring") {
    return ["Prometheus", "Ganglia", "Suparikshan", "C-CHAKSHU"];
  }

  return ["Privacy", "Safety", "Security", "Open Source & Indigenous Frameworks"];
}

function moduleFor(id) {
  const map = {
    "studio-tools": "pinakaa-overview",
    "performance-benchmarks": "performance-benchmarks",
    applications: "applications",
    "visualization-tools": "visualization-tools",
    "dev-tools": "dev-tools",
    "middleware-management": "middleware-management",
    "communication-libraries": "communication-libraries",
    "provisioning-resource-management": "provisioning-resource-management",
    "ai-frameworks": "ai-frameworks",
    "file-system": "file-system",
    "base-system-software": "base-system-software",
    "drivers-os": "drivers-os",
    toolchain: "toolchain",
    "math-libraries": "math-libraries",
    "compilers-transpilers": "compilers-transpilers",
    "parallel-programming-models": "parallel-programming-models"
  };

  return map[id] || id;
}

function isLayerActive(layer, activeLayerId) {
  if (layer.id === activeLayerId) return true;
  return layer.sections.some((section) => moduleFor(section.id) === activeLayerId);
}
