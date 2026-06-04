import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  Compass,
  Layers,
  Lightbulb,
  Network,
  Target,
  Workflow
} from "lucide-react";
import { useLmsStore, getAdjacentLessons } from "../store/useLmsStore.js";
import { GlossedText, titleWithExpansion } from "../lib/abbreviations.jsx";

export default function RightSidebar({ lesson, layer }) {
  const { previousLesson, nextLesson, selectLesson, readerMode, setReaderMode } = useLmsStore();
  const { previous, next } = getAdjacentLessons(lesson?.id);
  const paragraphs = lesson?.content?.filter((block) => block.type === "paragraph") || [];
  const example = lesson?.content?.find((block) => block.type === "example");
  const code = lesson?.content?.find((block) => block.type === "code");
  const diagram = lesson?.content?.find((block) => block.type === "diagram");
  const sectionLessons = layer?.lessons || [];
  const lessonIndex = sectionLessons.findIndex((item) => item.id === lesson?.id);
  const glossaryTerms = lesson?.glossary || [];
  const relatedBlocks = lesson?.relatedBlocks || [];
  const moduleGlossary = uniqueGlossary(sectionLessons.flatMap((item) => item.glossary || []));

  if (!lesson) return null;

  function scrollToSection(sectionId) {
    document.getElementById(sectionId)?.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  return (
    <aside className="reader-panel">
      <div className="reader-breadcrumb">
        <button onClick={previousLesson} disabled={!previous} aria-label="Previous topic">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span><GlossedText text={layer?.title} /></span>
        <ChevronRight className="h-4 w-4" />
        <strong><GlossedText text={lesson.title} /></strong>
      </div>

      <article className="lesson-reader">
        <header className="reader-hero">
          <div className="reader-kicker">
            <span style={{ "--module-color": layer?.color }}>
              <Layers className="h-3.5 w-3.5" />
              <GlossedText text={layer?.title} />
            </span>
            <span>
              <BookOpen className="h-3.5 w-3.5" />
              {lesson.estimatedMinutes || 6} min
            </span>
            <span>
              <Target className="h-3.5 w-3.5" />
              {lessonIndex >= 0 ? `${lessonIndex + 1}/${sectionLessons.length}` : "Topic"}
            </span>
          </div>
          <h1><GlossedText text={lesson.title} /></h1>
          <p><GlossedText text={lesson.overview} /></p>
        </header>

        <div className="reader-mode-tabs" aria-label="Reader mode">
          <button className={readerMode === "study" ? "active" : ""} onClick={() => setReaderMode("study")}>
            <BookOpen className="h-3.5 w-3.5" /> Study
          </button>
          <button className={readerMode === "glossary" ? "active" : ""} onClick={() => setReaderMode("glossary")}>
            <Network className="h-3.5 w-3.5" /> Glossary
          </button>
        </div>

        {readerMode === "study" ? (
          <>
            <nav className="reader-jumpbar" aria-label="Lesson sections">
              <button onClick={() => scrollToSection("concept")}><Lightbulb className="h-3.5 w-3.5" /> Concept</button>
              <button onClick={() => scrollToSection("outcomes")}><CheckCircle2 className="h-3.5 w-3.5" /> Outcomes</button>
              {lesson.checks?.length ? <button onClick={() => scrollToSection("checks")}><Target className="h-3.5 w-3.5" /> Checks</button> : null}
              {diagram ? <button onClick={() => scrollToSection("path")}><Workflow className="h-3.5 w-3.5" /> Connects</button> : null}
              {relatedBlocks.length ? <button onClick={() => scrollToSection("related")}><Network className="h-3.5 w-3.5" /> Related</button> : null}
              {example || code ? <button onClick={() => scrollToSection("example")}><Code2 className="h-3.5 w-3.5" /> Example</button> : null}
            </nav>

            <section id="concept" className="reader-card concept-card">
              <h2><Lightbulb className="h-4 w-4" /> Concept</h2>
              <div className="reader-copy">
                {paragraphs.map((block) => (
                  <p key={block.body}><GlossedText text={block.body} /></p>
                ))}
              </div>
            </section>

            <section id="outcomes" className="reader-card outcomes-card">
              <h2><CheckCircle2 className="h-4 w-4" /> Key Outcomes</h2>
              <div className="outcome-grid">
                {lesson.learningObjectives.map((objective, index) => (
                  <div key={objective} className="outcome-item">
                    <span>{index + 1}</span>
                    <p><GlossedText text={objective} /></p>
                  </div>
                ))}
              </div>
            </section>

            {lesson.checks?.length ? (
              <section id="checks" className="reader-card checks-card">
                <h2><Target className="h-4 w-4" /> Practical Checks</h2>
                <div className="check-list">
                  {lesson.checks.map((check) => (
                    <div key={check}>
                      <CheckCircle2 className="h-4 w-4" />
                      <p><GlossedText text={check} /></p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {diagram ? (
              <section id="path" className="reader-card path-card">
                <h2><Network className="h-4 w-4" /> How It Connects</h2>
                <div className="path-flow">
                  {diagram.nodes.map((node, index) => (
                    <div key={`${node}-${index}`} className="path-node">
                      <span><GlossedText text={node} /></span>
                      {index < diagram.nodes.length - 1 ? <ArrowRight className="h-4 w-4" /> : null}
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {relatedBlocks.length ? (
              <RelatedBlocks blocks={relatedBlocks} selectLesson={selectLesson} />
            ) : null}

            {example || code ? (
              <section id="example" className="reader-card example-card">
                <h2><Code2 className="h-4 w-4" /> Applied Example</h2>
                {example ? <p><GlossedText text={example.body} /></p> : null}
                {code ? (
                  <pre><code>{code.body}</code></pre>
                ) : null}
              </section>
            ) : null}
          </>
        ) : (
          <>
            <section id="glossary" className="reader-card glossary-card">
              <h2><BookOpen className="h-4 w-4" /> Glossary For This Block</h2>
              <GlossaryList terms={glossaryTerms} />
            </section>

            <section className="reader-card glossary-card">
              <h2><Layers className="h-4 w-4" /> Section Vocabulary</h2>
              <GlossaryList terms={moduleGlossary} />
            </section>

            {relatedBlocks.length ? (
              <RelatedBlocks blocks={relatedBlocks} selectLesson={selectLesson} />
            ) : null}
          </>
        )}

        <section className="reader-card section-map">
          <h2><Compass className="h-4 w-4" /> Section Map</h2>
          <div>
            {sectionLessons.map((item) => (
              <button
                key={item.id}
                className={item.id === lesson.id ? "active" : ""}
                onClick={() => selectLesson(item.id)}
              >
                <span>{item.order}</span>
                <strong><GlossedText text={item.title} /></strong>
              </button>
            ))}
          </div>
        </section>
      </article>

      <div className="reader-nav">
        <button onClick={previousLesson} disabled={!previous}>
          <ChevronLeft className="h-4 w-4" />
          <span>
            <small>Previous</small>
            {previous ? <strong><GlossedText text={previous.title} /></strong> : null}
          </span>
        </button>
        <button onClick={nextLesson} disabled={!next}>
          <span>
            <small>Next</small>
            {next ? <strong><GlossedText text={next.title} /></strong> : null}
          </span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}

function RelatedBlocks({ blocks, selectLesson }) {
  return (
    <section id="related" className="reader-card related-card">
      <h2><Network className="h-4 w-4" /> Related Blocks</h2>
      <div className="related-grid">
        {blocks.map((block) => (
          <button
            key={`${block.relation}-${block.label}`}
            onClick={() => selectLesson(block.lessonId, block.blockKey)}
            title={titleWithExpansion(block.label)}
          >
            <small><GlossedText text={block.relation} /></small>
            <strong><GlossedText text={block.label} /></strong>
            <ArrowRight className="h-4 w-4" />
          </button>
        ))}
      </div>
    </section>
  );
}

function GlossaryList({ terms }) {
  if (!terms.length) {
    return <p>No glossary terms are attached to this topic yet.</p>;
  }

  return (
    <div className="glossary-list">
      {terms.map((item) => (
        <div key={`${item.term}-${item.definition}`}>
          <dt><GlossedText text={item.term} /></dt>
          <dd><GlossedText text={item.definition} /></dd>
        </div>
      ))}
    </div>
  );
}

function uniqueGlossary(terms) {
  const seen = new Set();
  return terms.filter((item) => {
    const key = item.term.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
