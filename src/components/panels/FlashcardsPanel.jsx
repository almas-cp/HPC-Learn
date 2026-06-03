import { ArrowLeft, ArrowRight, Check, RotateCw } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLmsStore } from "../../store/useLmsStore.js";

export default function FlashcardsPanel({ lesson, progress }) {
  const { reviewFlashcard } = useLmsStore();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setIndex(0);
    setFlipped(false);
  }, [lesson?.id]);

  if (!lesson) return null;

  const card = lesson.flashcards[index];
  const review = progress?.flashcardReviews?.[card?.id];

  return (
    <div className="side-card">
      <div className="card-heading"><RotateCw className="h-5 w-5 text-blue" /> Flashcards</div>
      <div className="flashcard-count">{index + 1} / {lesson.flashcards.length}</div>

      <button
        className="flashcard"
        onClick={() => setFlipped(!flipped)}
      >
        <motion.div
          key={flipped ? "back" : "front"}
          initial={{ opacity: 0, rotateX: -8 }}
          animate={{ opacity: 1, rotateX: 0 }}
          transition={{ duration: 0.2 }}
        >
          <span>{flipped ? "Answer" : "Question"}</span>
          <strong>{flipped ? card.back : card.front}</strong>
        </motion.div>
      </button>

      <div className="flashcard-actions">
        <button onClick={() => { setIndex(Math.max(0, index - 1)); setFlipped(false); }}><ArrowLeft className="h-4 w-4" /></button>
        <button onClick={() => reviewFlashcard(lesson.id, card.id, "again")}>Again</button>
        <button onClick={() => reviewFlashcard(lesson.id, card.id, "known")}><Check className="h-4 w-4" /> Known</button>
        <button onClick={() => { setIndex(Math.min(lesson.flashcards.length - 1, index + 1)); setFlipped(false); }}><ArrowRight className="h-4 w-4" /></button>
      </div>

      <p className="side-copy">Last rating: {review?.rating || "not reviewed yet"}</p>
    </div>
  );
}
