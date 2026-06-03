import { Lightbulb, ListChecks, Notebook } from "lucide-react";
import { useEffect, useState } from "react";
import { useLmsStore } from "../../store/useLmsStore.js";

export default function StudyPanel({ lesson, progress }) {
  const { saveNotes } = useLmsStore();
  const initialNotes = progress?.notes?.[lesson?.id]?.notes || "";
  const [notes, setNotes] = useState(initialNotes);

  useEffect(() => setNotes(initialNotes), [initialNotes]);

  if (!lesson) return null;

  const concepts = lesson.content
    .filter((block) => block.type === "diagram" || block.type === "example")
    .slice(0, 4);

  return (
    <div className="side-card">
      <div className="card-heading"><Lightbulb className="h-5 w-5 text-blue" /> Concepts</div>
      <p className="side-copy">{lesson.overview}</p>
      <ul className="concept-list">
        {concepts.map((concept, index) => (
          <li key={`${concept.type}-${index}`}>
            <span>{concept.type === "diagram" ? "Diagram" : "Example"}</span>
            {concept.title || concept.body}
          </li>
        ))}
      </ul>

      <div className="card-heading mt-5"><ListChecks className="h-5 w-5 text-green" /> Key Takeaways</div>
      <ul className="takeaway-list">
        {lesson.learningObjectives.map((objective) => <li key={objective}>{objective}</li>)}
      </ul>

      <label className="notes-box">
        <span><Notebook className="h-4 w-4" /> Notes</span>
        <textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Write study notes for this lesson" />
      </label>
      <button className="panel-button" onClick={() => saveNotes(lesson.id, notes)}>Save Notes</button>
    </div>
  );
}
