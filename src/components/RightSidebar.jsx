import { BookOpen, Brain, ClipboardList, GraduationCap, Layers, Trophy } from "lucide-react";
import { useLmsStore } from "../store/useLmsStore.js";
import StudyPanel from "./panels/StudyPanel.jsx";
import QuizPanel from "./panels/QuizPanel.jsx";
import FlashcardsPanel from "./panels/FlashcardsPanel.jsx";
import MasteryPanel from "./panels/MasteryPanel.jsx";

const tabs = [
  { id: "study", label: "Study", icon: GraduationCap },
  { id: "quiz", label: "Quiz", icon: Brain },
  { id: "flashcards", label: "Flashcards", icon: ClipboardList },
  { id: "mastery", label: "Mastery", icon: Trophy }
];

export default function RightSidebar({ lesson, progress, analytics }) {
  const { activeTab, setActiveTab } = useLmsStore();

  return (
    <aside className="right-sidebar">
      <div className="tab-row">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button key={tab.id} className={activeTab === tab.id ? "active" : ""} onClick={() => setActiveTab(tab.id)}>
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="panel-stack">
        {activeTab === "study" && <StudyPanel lesson={lesson} progress={progress} />}
        {activeTab === "quiz" && <QuizPanel lesson={lesson} />}
        {activeTab === "flashcards" && <FlashcardsPanel lesson={lesson} progress={progress} />}
        {activeTab === "mastery" && <MasteryPanel analytics={analytics} />}

        <div className="side-card compact">
          <div className="card-heading"><Layers className="h-4 w-4 text-blue" /> Current Focus</div>
          <strong>{lesson?.moduleTitle}</strong>
          <p>{lesson?.title}</p>
        </div>

        <div className="side-card compact">
          <div className="card-heading"><BookOpen className="h-4 w-4 text-green" /> Saved Progress</div>
          <p>Progress, quiz attempts, notes, flashcard reviews, and time spent are written to the server for this learner ID.</p>
        </div>
      </div>
    </aside>
  );
}
