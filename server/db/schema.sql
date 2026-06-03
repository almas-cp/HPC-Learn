CREATE TABLE IF NOT EXISTS Learners (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_seen_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Courses (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  level TEXT NOT NULL,
  estimated_minutes INTEGER NOT NULL,
  metadata TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Modules (
  id TEXT PRIMARY KEY,
  course_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  position INTEGER NOT NULL,
  estimated_minutes INTEGER NOT NULL,
  metadata TEXT NOT NULL,
  FOREIGN KEY (course_id) REFERENCES Courses(id)
);

CREATE TABLE IF NOT EXISTS Lessons (
  id TEXT PRIMARY KEY,
  module_id TEXT NOT NULL,
  course_id TEXT NOT NULL,
  title TEXT NOT NULL,
  overview TEXT NOT NULL,
  lesson_type TEXT NOT NULL,
  position INTEGER NOT NULL,
  estimated_minutes INTEGER NOT NULL,
  content TEXT NOT NULL,
  quiz TEXT NOT NULL,
  flashcards TEXT NOT NULL,
  metadata TEXT NOT NULL,
  FOREIGN KEY (module_id) REFERENCES Modules(id),
  FOREIGN KEY (course_id) REFERENCES Courses(id)
);

CREATE TABLE IF NOT EXISTS Progress (
  learner_id TEXT NOT NULL,
  course_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  completed INTEGER NOT NULL DEFAULT 0,
  time_spent_seconds INTEGER NOT NULL DEFAULT 0,
  last_visited_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  completed_at TEXT,
  PRIMARY KEY (learner_id, lesson_id),
  FOREIGN KEY (learner_id) REFERENCES Learners(id),
  FOREIGN KEY (course_id) REFERENCES Courses(id),
  FOREIGN KEY (lesson_id) REFERENCES Lessons(id)
);

CREATE TABLE IF NOT EXISTS QuizAttempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  learner_id TEXT NOT NULL,
  course_id TEXT NOT NULL,
  module_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  score INTEGER NOT NULL,
  total INTEGER NOT NULL,
  accuracy REAL NOT NULL,
  answers TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (learner_id) REFERENCES Learners(id),
  FOREIGN KEY (lesson_id) REFERENCES Lessons(id)
);

CREATE TABLE IF NOT EXISTS FlashcardReviews (
  learner_id TEXT NOT NULL,
  course_id TEXT NOT NULL,
  module_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  flashcard_id TEXT NOT NULL,
  rating TEXT NOT NULL,
  review_count INTEGER NOT NULL DEFAULT 1,
  last_reviewed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (learner_id, flashcard_id),
  FOREIGN KEY (learner_id) REFERENCES Learners(id),
  FOREIGN KEY (lesson_id) REFERENCES Lessons(id)
);

CREATE TABLE IF NOT EXISTS Notes (
  learner_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  notes TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (learner_id, lesson_id),
  FOREIGN KEY (learner_id) REFERENCES Learners(id),
  FOREIGN KEY (lesson_id) REFERENCES Lessons(id)
);

CREATE TABLE IF NOT EXISTS CourseMastery (
  learner_id TEXT NOT NULL,
  course_id TEXT NOT NULL,
  mastery_score INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (learner_id, course_id),
  FOREIGN KEY (learner_id) REFERENCES Learners(id),
  FOREIGN KEY (course_id) REFERENCES Courses(id)
);
