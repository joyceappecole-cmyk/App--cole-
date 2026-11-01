export type FacultyId =
  | 'medecine_sante'
  | 'droit'
  | 'informatique'
  | 'sciences_ingenierie'
  | 'eco_gestion'
  | 'agronomie_env'
  | 'sciences_education'
  | 'sciences_sociales_humaines'
  | 'pharmacie'
  | 'sciences_infirmieres'
  | 'architecture'
  | 'communication_journalisme'
  | 'sciences_politiques'
  | 'energie_renouvelable'
  | 'petrole_gaz'
  | 'etudes_bibliques_theologie'
  | 'autre'
  // Legacy aliases
  | 'sciences'
  | 'medecine'
  | 'lettres';

export interface Faculty {
  id: FacultyId;
  name: string;
  badge: string;
  description: string;
  color: string;
  defaultSubjects: string[];
  recommendedKeywords: string[];
}

export interface Chapter {
  id: string;
  courseId: string;
  title: string;
  order: number;
  isCompleted: boolean;
  notesSummary: string;
  keyPoints: string[];
}

export interface Course {
  id: string;
  title: string;
  subject: string;
  description?: string;
  createdAt: string;
  createdAtTimestamp: number;
  hasPdf: boolean;
  pdfFileName?: string;
  pdfFileSize?: number;
  pdfFileId?: string;
  code?: string;
  facultyId?: string;
  facultyName?: string;
  semester?: string;
  ects?: number;
  chapterCount?: number;
  completedChapters?: number;
  color?: string;
  lastRevised?: string;
  chapters?: Chapter[];
}

// A. Fiches de révision
export interface SummarySheet {
  id: string;
  title: string;
  subject: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  facultyId?: string;
  isExample?: boolean;
}

// B. Flashcards avec Répétition Espacée (SRS)
export type MasteryRating = 'difficile' | 'moyen' | 'facile' | 'nouveau';

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  subject: string;
  nextReviewDate: string; // Format YYYY-MM-DD
  intervalDays: number;
  lastReviewedAt?: string;
  masteryLevel: MasteryRating;
  reviewCount: number;
  courseId?: string;
  courseTitle?: string;
  facultyId?: string;
  keyFormulaOrArticle?: string;
  isExample?: boolean;
}

// C. Quiz (QCM)
export interface QuizQuestion {
  id: string;
  statement: string; // Énoncé
  options: string[]; // Propositions
  correctIndex: number; // Réponse correcte
  explanation?: string; // Explication facultative
  subject: string; // Matière
  courseTitle?: string;
  facultyId?: string;
  question?: string; // Legacy alias for statement
  isExample?: boolean;
}

export interface QuizAttempt {
  id: string;
  subject: string;
  score: number;
  total: number;
  percentage: number;
  date: string;
}

// Programme d'examen personnalisé & Tâches
export interface ExamPlan {
  id: string;
  examName: string;
  subject: string;
  examDate: string; // YYYY-MM-DD
  chapters: string; // Chapitres séparés par virgules ou lignes
  dailyMinutes: number;
  personalGoal: string;
  createdAt: string;
}

export interface PlanTask {
  id: string;
  title: string;
  subject: string;
  dueDate: string; // YYYY-MM-DD
  durationMinutes: number;
  completed: boolean;
  completedAt?: string;
  examPlanId?: string;
}

export interface StudyTip {
  id: string;
  title: string;
  technique: string;
  description: string;
  actionableStep: string;
}

export interface ScheduleItem {
  id: string;
  title: string;
  courseTitle: string;
  type: 'flashcards' | 'quiz' | 'fiche' | 'cours';
  durationMinutes: number;
  dateStr: string;
  completed: boolean;
}

// Recommandations de Bibliothèques Numériques Externes
export interface DigitalLibraryEntry {
  id: string;
  name: string;
  description: string;
  coveredDomains: string;
  language: string;
  url: string;
  accessTerms: string;
  facultyId: FacultyId;
  countryNote?: string;
}

export interface DigitalLibraryResource {
  id: string;
  name: string;
  category: string;
  description: string;
  url: string;
  isFreeAccess: boolean;
  faculties: string;
  facultyIds: string[];
}

export interface StudentProfile {
  name: string;
  country: string;
  university?: string; // Facultatif
  facultyId: FacultyId;
  facultyName: string;
  studyLevel: string;
  mainSubjects: string[];
  preferredLanguage: string;
  targetExamPeriod?: string;
  weeklyTargetHours?: number;
  notificationsEnabled?: boolean;
  avatarUrl?: string; // Photo importée ou emoji d'avatar
  joyMood?: string; // Humeur de joie ('souriant' | 'rayonnant' | 'motive' | 'paisible' | 'reconnaissant')
}

// Notifications dans l'application
export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  type: 'reminder' | 'biblical' | 'exam' | 'system' | 'wisdom';
  linkTab?: string;
}

// Modèles pour l'Étude Biblique
export interface BibleVerse {
  chapter: number;
  verse: number;
  text: string;
}

export interface BibleBook {
  id: string;
  name: string;
  testament: 'Ancien' | 'Nouveau';
  category: 'Pentateuque' | 'Historique' | 'Poétique & Sagesse' | 'Prophètes' | 'Évangiles' | 'Épîtres & Actes' | 'Prophétie';
  chaptersCount: number;
  description: string;
  chapters: Record<number, BibleVerse[]>;
}

export interface BibleProphecy {
  id: string;
  title: string;
  category: 'Naissance & Origine' | 'Ministère & Miracles' | 'Trahison & Passion' | 'Résurrection & Gloire' | 'Sacerdoce & Règne';
  otReference: string;
  otText: string;
  otContext: string;
  ntReference: string;
  ntText: string;
  fulfillmentExplanation: string;
}

export interface WisdomVerse {
  id: string;
  theme: 'Sagesse & Intelligence' | 'Travail & Études' | 'Paix & Anxiété' | 'Patience & Maîtrise de soi' | 'Humilité & Vérité' | 'Persévérance';
  reference: string;
  text: string;
  practicalReflection: string;
}

export interface BibleStudyGuideMethod {
  id: string;
  name: string;
  acronym?: string;
  subtitle: string;
  description: string;
  steps: {
    step: string;
    description: string;
    guidingQuestions: string[];
  }[];
  exampleApplication: string;
}

export interface BibleDailyReadingPlan {
  day: number;
  theme: string;
  passage: string;
  keyVerse: string;
  meditationPrompt: string;
  isCompleted?: boolean;
}

export interface BibleContradiction {
  id: string;
  title: string;
  category: 'Récits des Origines' | 'Chronologie & Histoire' | 'Évangiles & Passion' | 'Doctrine & Théologie';
  passageA: {
    reference: string;
    text: string;
  };
  passageB: {
    reference: string;
    text: string;
  };
  reflectionQuestion: string;
  studentHint: string;
  harmonizationKeys: {
    historicalContext: string;
    linguisticInsight: string;
    theologicalResolution: string;
  };
}

