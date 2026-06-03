import { Check, Code2, ExternalLink, Network, PlayCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { useLmsStore } from "../store/useLmsStore.js";

export default function LessonWorkspace({ lesson, progress }) {
  const { completeLesson } = useLmsStore();
  const startedAt = useRef(Date.now());

  useEffect(() => {
    startedAt.current = Date.now();
  }, [lesson?.id]);

  if (!lesson) return null;

  const complete = progress?.lessons?.[lesson.id]?.completed;

  return (
    <section className="lesson-workspace">
      <div className="lesson-title-row">
        <div>
          <span>{lesson.moduleTitle}</span>
          <h2>{lesson.title}</h2>
          <p>{lesson.overview}</p>
        </div>
        <button
          className={`complete-button ${complete ? "done" : ""}`}
          onClick={() => completeLesson(lesson.id, Math.max(30, Math.round((Date.now() - startedAt.current) / 1000)))}
        >
          <Check className="h-4 w-4" />
          {complete ? "Completed" : "Mark Complete"}
        </button>
      </div>

      <div className="objective-grid">
        {lesson.learningObjectives.map((objective) => (
          <div key={objective} className="objective-item">
            <Check className="h-4 w-4" />
            {objective}
          </div>
        ))}
      </div>

      <div className="content-stack">
        {lesson.videoUrl ? (
          <div className="video-shell">
            <div>
              <PlayCircle className="h-5 w-5" />
              Video lesson
            </div>
            <a href={lesson.videoUrl} target="_blank" rel="noreferrer">Open video <ExternalLink className="h-4 w-4" /></a>
          </div>
        ) : null}

        {lesson.content.map((block, index) => (
          <ContentBlock key={`${block.type}-${index}`} block={block} />
        ))}
      </div>

      <div className="summary-box">
        <strong>Lesson summary</strong>
        <p>{lesson.summary}</p>
      </div>
    </section>
  );
}

function ContentBlock({ block }) {
  if (block.type === "paragraph") return <p className="lesson-paragraph">{block.body}</p>;

  if (block.type === "code") {
    return (
      <div className="code-block">
        <div><Code2 className="h-4 w-4" /> {block.language}</div>
        <pre><code>{block.body}</code></pre>
      </div>
    );
  }

  if (block.type === "example") {
    return (
      <div className="example-block">
        <strong>Example</strong>
        <p>{block.body}</p>
      </div>
    );
  }

  if (block.type === "diagram") {
    return (
      <div className="diagram-block">
        <div className="diagram-title"><Network className="h-4 w-4" /> {block.title}</div>
        <div className="diagram-row">
          {block.nodes.map((node, index) => (
            <div key={node} className="diagram-node">
              <span>{index + 1}</span>
              {node}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
