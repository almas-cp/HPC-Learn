import { CheckCircle2, HelpCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useLmsStore } from "../../store/useLmsStore.js";

export default function QuizPanel({ lesson }) {
  const { submitQuiz } = useLmsStore();
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setAnswers({});
    setSubmitted(false);
  }, [lesson?.id]);

  if (!lesson) return null;

  const score = lesson.quiz.reduce((sum, question) => sum + (answers[question.id] === question.answer ? 1 : 0), 0);

  return (
    <div className="side-card">
      <div className="card-heading"><HelpCircle className="h-5 w-5 text-blue" /> Quick Quiz</div>
      <div className="quiz-score">{submitted ? `${score} / ${lesson.quiz.length}` : `${Object.keys(answers).length} / ${lesson.quiz.length} answered`}</div>

      <div className="quiz-list">
        {lesson.quiz.map((question, index) => (
          <div key={question.id} className="quiz-question">
            <strong>{index + 1}. {question.question}</strong>
            {question.choices.map((choice, choiceIndex) => {
              const selected = answers[question.id] === choiceIndex;
              const correct = submitted && question.answer === choiceIndex;
              const wrong = submitted && selected && question.answer !== choiceIndex;
              return (
                <button
                  key={choice}
                  className={`choice ${selected ? "selected" : ""} ${correct ? "correct" : ""} ${wrong ? "wrong" : ""}`}
                  onClick={() => !submitted && setAnswers({ ...answers, [question.id]: choiceIndex })}
                >
                  {correct ? <CheckCircle2 className="h-4 w-4" /> : wrong ? <XCircle className="h-4 w-4" /> : <span />}
                  {choice}
                </button>
              );
            })}
            {submitted ? <p className="feedback">{question.explanation}</p> : null}
          </div>
        ))}
      </div>

      <button
        className="panel-button"
        disabled={Object.keys(answers).length !== lesson.quiz.length}
        onClick={() => {
          if (!submitted) {
            setSubmitted(true);
            submitQuiz(lesson.id, answers, score, lesson.quiz.length);
          } else {
            setSubmitted(false);
            setAnswers({});
          }
        }}
      >
        {submitted ? "Retry Quiz" : "Submit Answers"}
      </button>
    </div>
  );
}
