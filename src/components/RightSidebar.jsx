import { BookOpen, Check, ChevronLeft, ChevronRight, Code2, Layers, Lightbulb } from "lucide-react";
import { useLmsStore, getAdjacentLessons } from "../store/useLmsStore.js";

export default function RightSidebar({ lesson, layer }) {
  const { course, previousLesson, nextLesson } = useLmsStore();
  const { previous, next } = getAdjacentLessons(lesson?.id);
  const example = lesson?.content?.find((block) => block.type === "example");
  const code = lesson?.content?.find((block) => block.type === "code");
  const diagram = lesson?.content?.find((block) => block.type === "diagram");

  if (!lesson) return null;

  return (
    <aside className="reader-panel">
      <div className="reader-breadcrumb">
        <button onClick={previousLesson} disabled={!previous} aria-label="Previous topic">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span>{layer?.title}</span>
        <ChevronRight className="h-4 w-4" />
        <strong>{lesson.title}</strong>
      </div>

      <article className="lesson-reader">
        <h1>{lesson.title}</h1>
        <section>
          <h2><Lightbulb className="h-4 w-4" /> Concept</h2>
          <p>{lesson.overview}</p>
          <ul>
            {lesson.content.filter((block) => block.type === "paragraph").slice(0, 2).map((block) => (
              <li key={block.body}>{block.body}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2><Check className="h-4 w-4" /> Key Takeaways</h2>
          <ul className="takeaway-list">
            {lesson.learningObjectives.map((objective) => (
              <li key={objective}>{objective}</li>
            ))}
          </ul>
        </section>

        {example || code ? (
          <section className="reader-example">
            <h2><Code2 className="h-4 w-4" /> Example</h2>
            {example ? <p>{example.body}</p> : null}
            {code ? (
              <pre><code>{code.body}</code></pre>
            ) : null}
          </section>
        ) : null}

        {diagram ? (
          <section className="mini-diagram">
            <h2><Layers className="h-4 w-4" /> {diagram.title}</h2>
            <div>
              {diagram.nodes.map((node) => <span key={node}>{node}</span>)}
            </div>
          </section>
        ) : null}

        <section className="stack-overview">
          <h2><BookOpen className="h-4 w-4" /> Stack Overview</h2>
          {course.modules.slice(0, 6).map((module) => (
            <button
              key={module.id}
              className={module.id === layer?.id ? "active" : ""}
              style={{ "--module-color": module.color }}
            >
              <span>{module.title}</span>
              <small>{module.description}</small>
            </button>
          ))}
        </section>
      </article>

      <div className="reader-nav">
        <button onClick={previousLesson} disabled={!previous}>
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>
        <button onClick={nextLesson} disabled={!next}>
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}
