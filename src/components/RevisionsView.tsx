import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Brain, 
  HelpCircle, 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  RotateCcw, 
  Check, 
  CheckCircle2, 
  X, 
  Calendar, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  AlertCircle,
  Eye,
  Clock,
  BookOpen,
  Award
} from 'lucide-react';
import { SummarySheet, Flashcard, QuizQuestion, QuizAttempt, MasteryRating, FacultyId } from '../types';
import { getFacultyTabConfig } from '../data/facultySpecialization';

interface RevisionsViewProps {
  // Fiches
  sheets: SummarySheet[];
  onAddSheet: (sheet: SummarySheet) => void;
  onUpdateSheet: (sheet: SummarySheet) => void;
  onDeleteSheet: (sheetId: string) => void;
  // Flashcards
  flashcards: Flashcard[];
  onAddFlashcard: (card: Flashcard) => void;
  onRateFlashcard: (cardId: string, rating: 'difficile' | 'moyen' | 'facile') => void;
  onDeleteFlashcard: (cardId: string) => void;
  // Quiz
  quizQuestions: QuizQuestion[];
  quizAttempts: QuizAttempt[];
  onAddQuizQuestion: (q: QuizQuestion) => void;
  onRecordQuizAttempt: (attempt: QuizAttempt) => void;
  availableSubjects: string[];
  facultyId?: FacultyId | string;
  facultyBadge?: string;
}

export const RevisionsView: React.FC<RevisionsViewProps> = ({
  sheets,
  onAddSheet,
  onUpdateSheet,
  onDeleteSheet,
  flashcards,
  onAddFlashcard,
  onRateFlashcard,
  onDeleteFlashcard,
  quizQuestions,
  quizAttempts,
  onAddQuizQuestion,
  onRecordQuizAttempt,
  availableSubjects,
  facultyId,
  facultyBadge,
}) => {
  const tabConfig = getFacultyTabConfig(facultyId);
  // Main sub-tab: 'fiches' | 'flashcards' | 'quiz'
  const [activeTab, setActiveTab] = useState<'fiches' | 'flashcards' | 'quiz'>('fiches');

  // ----------------------------------------------------
  // SECTION A : FICHES DE RÉVISION
  // ----------------------------------------------------
  const [sheetSearch, setSheetSearch] = useState('');
  const [selectedSheetSubject, setSelectedSheetSubject] = useState<string>('all');
  const [viewingSheet, setViewingSheet] = useState<SummarySheet | null>(null);
  const [editingSheet, setEditingSheet] = useState<SummarySheet | null>(null);
  const [isCreatingSheet, setIsCreatingSheet] = useState(false);
  const [sheetToDelete, setSheetToDelete] = useState<SummarySheet | null>(null);

  // Form states for Sheet
  const [sheetTitle, setSheetTitle] = useState('');
  const [sheetSubject, setSheetSubject] = useState('');
  const [sheetContent, setSheetContent] = useState('');

  // ----------------------------------------------------
  // SECTION B : FLASHCARDS
  // ----------------------------------------------------
  const [flashcardSubjectFilter, setFlashcardSubjectFilter] = useState<string>('all');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCreatingFlashcard, setIsCreatingFlashcard] = useState(false);
  const [fcQuestion, setFcQuestion] = useState('');
  const [fcAnswer, setFcAnswer] = useState('');
  const [fcSubject, setFcSubject] = useState('');

  // ----------------------------------------------------
  // SECTION C : QUIZ (QCM)
  // ----------------------------------------------------
  const [isTakingQuiz, setIsTakingQuiz] = useState(false);
  const [quizSubjectFilter, setQuizSubjectFilter] = useState<string>('all');
  const [currentQuizQIndex, setCurrentQuizQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isCreatingQuizQ, setIsCreatingQuizQ] = useState(false);

  // New Quiz Q form
  const [qStatement, setQStatement] = useState('');
  const [qSubject, setQSubject] = useState('');
  const [qOptions, setQOptions] = useState<string[]>(['', '', '', '']);
  const [qCorrectIndex, setQCorrectIndex] = useState(0);
  const [qExplanation, setQExplanation] = useState('');

  // All subjects combined for dropdowns
  const allSubjects = useMemo(() => {
    const set = new Set<string>();
    availableSubjects.forEach((s) => set.add(s));
    sheets.forEach((s) => s.subject && set.add(s.subject));
    flashcards.forEach((f) => f.subject && set.add(f.subject));
    quizQuestions.forEach((q) => q.subject && set.add(q.subject));
    return Array.from(set);
  }, [availableSubjects, sheets, flashcards, quizQuestions]);

  // Filtered Fiches
  const filteredSheets = useMemo(() => {
    return sheets.filter((sheet) => {
      const matchSub = selectedSheetSubject === 'all' || sheet.subject === selectedSheetSubject;
      const q = sheetSearch.toLowerCase();
      const matchSearch =
        !q ||
        sheet.title.toLowerCase().includes(q) ||
        sheet.subject.toLowerCase().includes(q) ||
        sheet.content.toLowerCase().includes(q);
      return matchSub && matchSearch;
    });
  }, [sheets, selectedSheetSubject, sheetSearch]);

  // Filtered Flashcards
  const filteredFlashcards = useMemo(() => {
    return flashcards.filter((f) => {
      return flashcardSubjectFilter === 'all' || f.subject === flashcardSubjectFilter;
    });
  }, [flashcards, flashcardSubjectFilter]);

  const activeCard = filteredFlashcards[currentCardIndex % (filteredFlashcards.length || 1)];

  // Filtered Quiz Questions
  const activeQuizQuestions = useMemo(() => {
    return quizQuestions.filter((q) => {
      return quizSubjectFilter === 'all' || q.subject === quizSubjectFilter;
    });
  }, [quizQuestions, quizSubjectFilter]);

  // ----------------------------------------------------
  // HANDLERS: FICHES
  // ----------------------------------------------------
  const handleOpenCreateSheet = () => {
    setSheetTitle('');
    setSheetSubject(allSubjects[0] || '');
    setSheetContent('');
    setIsCreatingSheet(true);
    setEditingSheet(null);
  };

  const handleOpenEditSheet = (sheet: SummarySheet) => {
    setEditingSheet(sheet);
    setSheetTitle(sheet.title);
    setSheetSubject(sheet.subject);
    setSheetContent(sheet.content);
    setIsCreatingSheet(false);
  };

  const handleSaveSheet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sheetTitle.trim() || !sheetContent.trim()) return;

    const nowStr = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

    if (editingSheet) {
      onUpdateSheet({
        ...editingSheet,
        title: sheetTitle.trim(),
        subject: sheetSubject.trim() || allSubjects[0] || 'Général',
        content: sheetContent.trim(),
        updatedAt: nowStr,
      });
      setEditingSheet(null);
    } else {
      const newSheet: SummarySheet = {
        id: `fiche-${Date.now()}`,
        title: sheetTitle.trim(),
        subject: sheetSubject.trim() || allSubjects[0] || 'Général',
        content: sheetContent.trim(),
        createdAt: nowStr,
        updatedAt: nowStr,
        facultyId: facultyId ? String(facultyId) : undefined,
        isExample: false,
      };
      onAddSheet(newSheet);
      setIsCreatingSheet(false);
    }
  };

  // ----------------------------------------------------
  // HANDLERS: FLASHCARDS
  // ----------------------------------------------------
  const handleNextCard = () => {
    setIsFlipped(false);
    if (filteredFlashcards.length > 0) {
      setCurrentCardIndex((prev) => (prev + 1) % filteredFlashcards.length);
    }
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    if (filteredFlashcards.length > 0) {
      setCurrentCardIndex((prev) => (prev - 1 + filteredFlashcards.length) % filteredFlashcards.length);
    }
  };

  const handleRateCard = (rating: 'difficile' | 'moyen' | 'facile') => {
    if (!activeCard) return;
    onRateFlashcard(activeCard.id, rating);
    handleNextCard();
  };

  const handleSaveFlashcard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fcQuestion.trim() || !fcAnswer.trim()) return;

    const todayStr = new Date().toISOString().split('T')[0];

    const newCard: Flashcard = {
      id: `fc-${Date.now()}`,
      question: fcQuestion.trim(),
      answer: fcAnswer.trim(),
      subject: fcSubject.trim() || allSubjects[0] || 'Général',
      nextReviewDate: todayStr,
      intervalDays: 1,
      masteryLevel: 'nouveau',
      reviewCount: 0,
      facultyId: facultyId ? String(facultyId) : undefined,
      isExample: false,
    };

    onAddFlashcard(newCard);
    setFcQuestion('');
    setFcAnswer('');
    setIsCreatingFlashcard(false);
  };

  // ----------------------------------------------------
  // HANDLERS: QUIZ
  // ----------------------------------------------------
  const handleStartQuiz = () => {
    setCurrentQuizQIndex(0);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setIsTakingQuiz(true);
  };

  const handleSelectQuizOption = (optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuizQIndex]: optionIndex,
    });
  };

  const handleNextQuizQ = () => {
    if (currentQuizQIndex < activeQuizQuestions.length - 1) {
      setCurrentQuizQIndex((prev) => prev + 1);
    }
  };

  const handlePrevQuizQ = () => {
    if (currentQuizQIndex > 0) {
      setCurrentQuizQIndex((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
    let correctCount = 0;
    activeQuizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const total = activeQuizQuestions.length;
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    const nowStr = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

    onRecordQuizAttempt({
      id: `attempt-${Date.now()}`,
      subject: quizSubjectFilter === 'all' ? 'Toutes matières' : quizSubjectFilter,
      score: correctCount,
      total,
      percentage,
      date: nowStr,
    });
  };

  const handleSaveQuizQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qStatement.trim()) return;
    const validOptions = qOptions.map((o) => o.trim()).filter((o) => o.length > 0);
    if (validOptions.length < 2) return;

    const newQ: QuizQuestion = {
      id: `q-${Date.now()}`,
      statement: qStatement.trim(),
      options: validOptions,
      correctIndex: Math.min(qCorrectIndex, validOptions.length - 1),
      explanation: qExplanation.trim() || undefined,
      subject: qSubject.trim() || allSubjects[0] || 'Général',
      facultyId: facultyId ? String(facultyId) : undefined,
      isExample: false,
    };

    onAddQuizQuestion(newQ);
    setQStatement('');
    setQOptions(['', '', '', '']);
    setQExplanation('');
    setIsCreatingQuizQ(false);
  };

  // Quiz Score calculations
  const quizScoreData = useMemo(() => {
    let score = 0;
    activeQuizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) score++;
    });
    const total = activeQuizQuestions.length;
    const noteSur20 = total > 0 ? ((score / total) * 20).toFixed(1) : '0';
    const percent = total > 0 ? Math.round((score / total) * 100) : 0;
    return { score, total, noteSur20, percent };
  }, [activeQuizQuestions, selectedAnswers]);

  return (
    <div className="space-y-6 pb-20 md:pb-12">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {tabConfig.tabs.revisions.full}
            </h1>
            {facultyBadge && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                {facultyBadge}
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {tabConfig.tabs.revisions.hint} — uniquement les fiches, cartes mémo et QCM de ton domaine.
          </p>
        </div>

        {/* Action button corresponding to active sub-tab */}
        {activeTab === 'fiches' && (
          <button
            onClick={handleOpenCreateSheet}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-sm shadow-emerald-600/20 self-start sm:self-auto min-h-[44px] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Créer une fiche</span>
          </button>
        )}

        {activeTab === 'flashcards' && (
          <button
            onClick={() => {
              setFcQuestion('');
              setFcAnswer('');
              setFcSubject(allSubjects[0] || '');
              setIsCreatingFlashcard(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-sm shadow-emerald-600/20 self-start sm:self-auto min-h-[44px] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Créer une flashcard</span>
          </button>
        )}

        {activeTab === 'quiz' && !isTakingQuiz && (
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 self-start sm:self-auto w-full sm:w-auto">
            <button
              onClick={() => {
                setQStatement('');
                setQSubject(allSubjects[0] || '');
                setQOptions(['', '', '', '']);
                setQExplanation('');
                setIsCreatingQuizQ(true);
              }}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 min-h-[44px] cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter une question</span>
            </button>
            <button
              onClick={handleStartQuiz}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm shadow-blue-600/20 min-h-[44px] cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Démarrer le quiz ({activeQuizQuestions.length})</span>
            </button>
          </div>
        )}
      </div>

      {/* Sub-navigation Segmented Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-200/70 dark:bg-slate-800/80 rounded-2xl max-w-xl w-full">
        <button
          onClick={() => {
            setActiveTab('fiches');
            setIsTakingQuiz(false);
          }}
          className={`flex-1 py-2 px-2 sm:px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 min-h-[38px] cursor-pointer ${
            activeTab === 'fiches'
              ? 'bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
          title={tabConfig.tabs.revisions.sheetsTab}
        >
          <FileText className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{tabConfig.tabs.revisions.sheetsTab.split('&')[0].trim()} ({sheets.length})</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('flashcards');
            setIsTakingQuiz(false);
          }}
          className={`flex-1 py-2 px-2 sm:px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 min-h-[38px] cursor-pointer ${
            activeTab === 'flashcards'
              ? 'bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
          title={tabConfig.tabs.revisions.flashcardsTab}
        >
          <Brain className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{tabConfig.tabs.revisions.flashcardsTab.split('(')[0].trim()} ({flashcards.length})</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('quiz');
          }}
          className={`flex-1 py-2 px-2 sm:px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 min-h-[38px] cursor-pointer ${
            activeTab === 'quiz'
              ? 'bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
          title={tabConfig.tabs.revisions.quizTab}
        >
          <HelpCircle className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{tabConfig.tabs.revisions.quizTab.split('&')[0].trim()} ({quizQuestions.length})</span>
        </button>
      </div>


      {/* ==================================================== */}
      {/* SECTION A : FICHES DE RÉVISION                         */}
      {/* ==================================================== */}
      {activeTab === 'fiches' && (
        <div className="space-y-4">
          
          {/* Search & Subject filter */}
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              <button
                onClick={() => setSelectedSheetSubject('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors min-h-[36px] ${
                  selectedSheetSubject === 'all'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Toutes ({sheets.length})
              </button>
              {allSubjects.map((sub) => {
                const count = sheets.filter((s) => s.subject === sub).length;
                if (count === 0) return null;
                return (
                  <button
                    key={sub}
                    onClick={() => setSelectedSheetSubject(sub)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors min-h-[36px] ${
                      selectedSheetSubject === sub
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {sub} ({count})
                  </button>
                );
              })}
            </div>

            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher une fiche ou mot-clé..."
                value={sheetSearch}
                onChange={(e) => setSheetSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Fiches Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSheets.map((sheet) => (
              <div
                key={sheet.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2.5">
                    <span className="font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-100 truncate max-w-[190px]">
                      {sheet.subject}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400">
                      {sheet.updatedAt}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
                    {sheet.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2.5 line-clamp-4 leading-relaxed whitespace-pre-line font-sans">
                    {sheet.content}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setViewingSheet(sheet)}
                    className="flex-1 min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Consulter</span>
                  </button>

                  <button
                    onClick={() => handleOpenEditSheet(sheet)}
                    className="min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors flex items-center justify-center"
                    title="Modifier la fiche"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setSheetToDelete(sheet)}
                    className="min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 transition-colors flex items-center justify-center"
                    title="Supprimer la fiche"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredSheets.length === 0 && (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <h4 className="text-base font-bold text-slate-800">Aucune fiche de révision trouvée</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Crée ta première fiche synthétique pour récapituler un cours clé.
              </p>
            </div>
          )}

        </div>
      )}

      {/* ==================================================== */}
      {/* SECTION B : FLASHCARDS (Répétition Espacée)           */}
      {/* ==================================================== */}
      {activeTab === 'flashcards' && (
        <div className="space-y-6 max-w-2xl mx-auto">
          
          {/* Beginner-friendly explanation of Spaced Repetition */}
          <div className="bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 rounded-2xl p-4 flex items-start gap-3 text-xs">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 shrink-0 mt-0.5">
              <Brain className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-emerald-950 dark:text-emerald-200 text-sm">
                Répétition Intelligente (Mémorisation espacée)
              </h3>
              <p className="text-emerald-800 dark:text-emerald-300 mt-1 leading-relaxed text-[11px]">
                En réactivant une notion juste avant de l'oublier, ton cerveau l'ancre dans la mémoire à long terme. Formule mentalement la réponse, retourne la carte, puis indique ton niveau d'aisance.
              </p>
            </div>
          </div>

          {/* Subject Filter Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <button
              onClick={() => {
                setFlashcardSubjectFilter('all');
                setCurrentCardIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors min-h-[36px] cursor-pointer ${
                flashcardSubjectFilter === 'all'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              Toutes les matières ({flashcards.length})
            </button>
            {allSubjects.map((sub) => {
              const count = flashcards.filter((f) => f.subject === sub).length;
              if (count === 0) return null;
              return (
                <button
                  key={sub}
                  onClick={() => {
                    setFlashcardSubjectFilter(sub);
                    setCurrentCardIndex(0);
                    setIsFlipped(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors min-h-[36px] ${
                    flashcardSubjectFilter === sub
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {sub} ({count})
                </button>
              );
            })}
          </div>

          {/* Interactive Card */}
          {activeCard ? (
            <div className="space-y-4">
              
              {/* Card Meta Bar */}
              <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-medium">
                <span>
                  Carte {currentCardIndex + 1} / {filteredFlashcards.length} · <strong className="text-emerald-800">{activeCard.subject}</strong>
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Calendar className="w-3 h-3" />
                  Prochaine révision : {activeCard.nextReviewDate}
                </span>
              </div>

              {/* Flip Card Container */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="cursor-pointer bg-white dark:bg-slate-900 rounded-3xl p-7 sm:p-10 border-2 border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all shadow-sm min-h-[290px] flex flex-col justify-between relative group select-none"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      {isFlipped ? 'Réponse' : 'Question'}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                      {isFlipped ? 'Dos de carte' : 'Recto (touche pour retourner)'}
                    </span>
                  </div>

                  {!isFlipped ? (
                    <div className="my-6">
                      <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                        {activeCard.question}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">
                        Formule la réponse dans ta tête avant de cliquer.
                      </p>
                    </div>
                  ) : (
                    <div className="my-6 space-y-3">
                      <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-medium whitespace-pre-line">
                        {activeCard.answer}
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{isFlipped ? 'Revoir la question' : 'Retourner la carte'}</span>
                  </span>
                  <span className="font-semibold text-slate-600 dark:text-slate-300">
                    Maîtrise : {activeCard.masteryLevel} (Intervalle : {activeCard.intervalDays} j)
                  </span>
                </div>
              </div>

              {/* Répétition Espacée Evaluation Controls */}
              {isFlipped ? (
                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="block text-center text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Évalue ta restitution (Algorithme de répétition espacée) :
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleRateCard('difficile')}
                      className="py-2.5 px-3 rounded-xl text-xs font-bold text-rose-800 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-950 border border-rose-200 dark:border-rose-800 transition-colors flex flex-col items-center justify-center min-h-[50px] cursor-pointer"
                    >
                      <span>Difficile</span>
                      <span className="text-[10px] font-normal text-rose-600 dark:text-rose-400">Revoir demain (J+1)</span>
                    </button>

                    <button
                      onClick={() => handleRateCard('moyen')}
                      className="py-2.5 px-3 rounded-xl text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-950 border border-amber-200 dark:border-amber-800 transition-colors flex flex-col items-center justify-center min-h-[50px] cursor-pointer"
                    >
                      <span>Moyen</span>
                      <span className="text-[10px] font-normal text-amber-600 dark:text-amber-400">Revoir dans 3 j</span>
                    </button>

                    <button
                      onClick={() => handleRateCard('facile')}
                      className="py-2.5 px-3 rounded-xl text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 transition-colors flex flex-col items-center justify-center min-h-[50px] cursor-pointer"
                    >
                      <span>Facile</span>
                      <span className="text-[10px] font-normal text-emerald-600 dark:text-emerald-400">Revoir dans 7 j</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <button
                    onClick={handlePrevCard}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 min-h-[40px] cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Précédente</span>
                  </button>

                  <button
                    onClick={() => onDeleteFlashcard(activeCard.id)}
                    className="text-xs text-slate-400 hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Supprimer cette carte</span>
                  </button>

                  <button
                    onClick={handleNextCard}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 min-h-[40px] cursor-pointer"
                  >
                    <span>Suivante</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200">
              <Brain className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <h4 className="text-base font-bold text-slate-800">Aucune flashcard dans cette matière</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Crée une nouvelle carte pour démarrer ta session de mémorisation espacée.
              </p>
            </div>
          )}

          {/* Spaced repetition rule note */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs text-slate-600 leading-relaxed">
            <strong className="text-slate-900 block mb-0.5">Fonctionnement du système espacé :</strong>
            Les cartes notées « Difficile » sont programmées plus rapidement (dès le lendemain), tandis que les cartes maîtrisées s'espacent progressivement dans le temps (3 à 7 jours) pour ancrer les connaissances durablement.
          </div>

        </div>
      )}

      {/* ==================================================== */}
      {/* SECTION C : QUIZ (QCM)                               */}
      {/* ==================================================== */}
      {activeTab === 'quiz' && (
        <div className="space-y-6 max-w-2xl mx-auto">
          
          {!isTakingQuiz ? (
            /* Quiz Overview & History */
            <div className="space-y-5">
              
              <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-sky-400">
                  <Award className="w-4 h-4" />
                  <span>Auto-évaluation immédiate (Active Recall)</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Teste tes connaissances sur {activeQuizQuestions.length} questions
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Chaque question propose plusieurs choix avec correction immédiate et explication pédagogique détaillée.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleStartQuiz}
                    disabled={activeQuizQuestions.length === 0}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-md min-h-[44px] flex items-center gap-2"
                  >
                    <span>Lancer la série de questions</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Subject Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                <button
                  onClick={() => setQuizSubjectFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors min-h-[36px] ${
                    quizSubjectFilter === 'all'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Toutes les matières ({quizQuestions.length})
                </button>
                {allSubjects.map((sub) => {
                  const count = quizQuestions.filter((q) => q.subject === sub).length;
                  if (count === 0) return null;
                  return (
                    <button
                      key={sub}
                      onClick={() => setQuizSubjectFilter(sub)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors min-h-[36px] ${
                        quizSubjectFilter === sub
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {sub} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Historique des résultats enregistrés */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4">
                <h3 className="text-sm font-bold text-slate-900">
                  Historique des résultats de quiz enregistrés localement
                </h3>

                {quizAttempts.length > 0 ? (
                  <div className="space-y-2.5">
                    {quizAttempts.map((att) => (
                      <div
                        key={att.id}
                        className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                      >
                        <div>
                          <strong className="text-slate-900 block">{att.subject}</strong>
                          <span className="text-slate-500 text-[11px]">{att.date}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-bold text-emerald-700 text-sm">
                            {att.score} / {att.total} ({att.percentage}%)
                          </span>
                          <span className="block text-[10px] text-slate-400">
                            Note : {((att.score / (att.total || 1)) * 20).toFixed(1)} / 20
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 py-4 text-center italic">
                    Aucun quiz effectué pour le moment. Lance ton premier test ci-dessus !
                  </p>
                )}
              </div>

            </div>
          ) : (
            /* Active Quiz Runner */
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              
              {!quizSubmitted ? (
                /* Question screen */
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pb-2 border-b border-slate-100">
                    <span className="font-semibold text-emerald-700">
                      Question {currentQuizQIndex + 1} sur {activeQuizQuestions.length}
                    </span>
                    <span className="font-medium text-slate-400">
                      Matière : {activeQuizQuestions[currentQuizQIndex]?.subject}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-6 leading-snug">
                    {activeQuizQuestions[currentQuizQIndex]?.statement || activeQuizQuestions[currentQuizQIndex]?.question}
                  </h3>

                  {/* Options */}
                  <div className="space-y-3">
                    {activeQuizQuestions[currentQuizQIndex]?.options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[currentQuizQIndex] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectQuizOption(optIdx)}
                          className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3 min-h-[48px] ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50/70 text-blue-950 font-medium ring-1 ring-blue-600'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                          }`}
                        >
                          <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="text-xs sm:text-sm leading-snug">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Quiz Navigation controls */}
                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={handlePrevQuizQ}
                      disabled={currentQuizQIndex === 0}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Question précédente
                    </button>

                    {currentQuizQIndex < activeQuizQuestions.length - 1 ? (
                      <button
                        onClick={handleNextQuizQ}
                        className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Question suivante
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmitQuiz}
                        className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md"
                      >
                        Valider & voir ma note
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* Results & Explanations Screen */
                <div className="space-y-6">
                  
                  {/* Score Banner */}
                  <div className="text-center p-6 bg-slate-50 rounded-3xl border border-slate-200">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      Résultats du Quiz
                    </span>
                    <div className="text-3xl sm:text-4xl font-extrabold text-emerald-700 font-mono tabular-nums">
                      {quizScoreData.noteSur20} / 20
                    </div>
                    <p className="text-xs text-slate-600 mt-2">
                      Score : <strong className="font-mono">{quizScoreData.score} / {quizScoreData.total}</strong> réponses correctes ({quizScoreData.percent}%)
                    </p>

                    <div className="mt-4 flex justify-center gap-2">
                      <button
                        onClick={handleStartQuiz}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 flex items-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Refaire le quiz</span>
                      </button>
                      <button
                        onClick={() => setIsTakingQuiz(false)}
                        className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700"
                      >
                        Terminer la session
                      </button>
                    </div>
                  </div>

                  {/* Detailed Correction with Explanations */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Correction détaillée et explications :
                    </h4>

                    {activeQuizQuestions.map((q, idx) => {
                      const userAnswer = selectedAnswers[idx];
                      const isCorrect = userAnswer === q.correctIndex;
                      return (
                        <div
                          key={q.id}
                          className={`p-4 rounded-2xl border text-xs space-y-2 ${
                            isCorrect ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50/40 border-rose-200'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-bold text-slate-900">
                              {idx + 1}. {q.statement || q.question}
                            </span>
                            <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] shrink-0 ${
                              isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {isCorrect ? 'Correct (+1)' : 'Erreur (0)'}
                            </span>
                          </div>

                          <div className="text-slate-600 space-y-1">
                            <div>
                              <span>Ta réponse : </span>
                              <strong className={isCorrect ? 'text-emerald-700' : 'text-rose-700'}>
                                {userAnswer !== undefined ? q.options[userAnswer] : 'Non répondue'}
                              </strong>
                            </div>
                            {!isCorrect && (
                              <div>
                                <span>Bonne réponse : </span>
                                <strong className="text-emerald-700">
                                  {q.options[q.correctIndex]}
                                </strong>
                              </div>
                            )}
                          </div>

                          {q.explanation && (
                            <div className="mt-2 pt-2 border-t border-slate-200/60 text-slate-700 text-[11px] leading-relaxed flex items-start gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-semibold text-slate-900">Explication : </span>
                                {q.explanation}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                </div>
              )}

            </div>
          )}

        </div>
      )}

      {/* ==================================================== */}
      {/* MODALS : FICHES & QUIZ CREATION                      */}
      {/* ==================================================== */}

      {/* Modal: View Sheet Full Screen */}
      {viewingSheet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[85vh] flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/60">
              <div>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                  {viewingSheet.subject}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {viewingSheet.title}
                </h3>
              </div>
              <button
                onClick={() => setViewingSheet(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <div className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line font-sans">
                {viewingSheet.content}
              </div>
            </div>

            <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>Dernière mise à jour : {viewingSheet.updatedAt}</span>
              <button
                onClick={() => setViewingSheet(null)}
                className="px-4 py-1.5 rounded-xl font-semibold text-slate-700 bg-white border border-slate-200"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Create or Edit Sheet */}
      {(isCreatingSheet || editingSheet) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                {editingSheet ? 'Modifier la fiche de révision' : 'Créer une fiche de révision'}
              </h3>
              <button
                onClick={() => {
                  setIsCreatingSheet(false);
                  setEditingSheet(null);
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSheet} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Titre de la fiche</label>
                <input
                  type="text"
                  placeholder="Ex: Synthèse Chapitre 3 - Les voies métaboliques"
                  value={sheetTitle}
                  onChange={(e) => setSheetTitle(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Matière</label>
                <select
                  value={sheetSubject}
                  onChange={(e) => setSheetSubject(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {allSubjects.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Contenu de la fiche (Texte & formules)</label>
                <textarea
                  rows={8}
                  placeholder="Rédige les notions clés, définitions indispensables, pièges d'examen..."
                  value={sheetContent}
                  onChange={(e) => setSheetContent(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed font-sans"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingSheet(false);
                    setEditingSheet(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700"
                >
                  {editingSheet ? 'Enregistrer les modifications' : 'Créer la fiche'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal: Delete Sheet */}
      {sheetToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 space-y-4 my-auto shadow-2xl border border-slate-100">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">Supprimer cette fiche ?</h4>
              <p className="text-xs text-slate-500 mt-1">
                La fiche « {sheetToDelete.title} » sera définitivement effacée de ton stockage local.
              </p>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSheetToDelete(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  onDeleteSheet(sheetToDelete.id);
                  setSheetToDelete(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Create Flashcard */}
      {isCreatingFlashcard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Nouvelle flashcard</h3>
              <button onClick={() => setIsCreatingFlashcard(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFlashcard} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Matière</label>
                <select
                  value={fcSubject}
                  onChange={(e) => setFcSubject(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {allSubjects.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Question (Recto)</label>
                <textarea
                  rows={3}
                  placeholder="Ex: Quelle est la différence entre une obligation de moyens et une obligation de résultat ?"
                  value={fcQuestion}
                  onChange={(e) => setFcQuestion(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Réponse (Verso)</label>
                <textarea
                  rows={4}
                  placeholder="Rédige la réponse exacte à mémoriser..."
                  value={fcAnswer}
                  onChange={(e) => setFcAnswer(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreatingFlashcard(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700"
                >
                  Ajouter la flashcard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Create Quiz Question */}
      {isCreatingQuizQ && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
              <h3 className="text-base font-bold text-slate-900">Ajouter une question QCM</h3>
              <button onClick={() => setIsCreatingQuizQ(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuizQuestion} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Matière</label>
                <select
                  value={qSubject}
                  onChange={(e) => setQSubject(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {allSubjects.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Énoncé de la question</label>
                <textarea
                  rows={2}
                  placeholder="Ex: Quel organe sécrète l'insuline dans le corps humain ?"
                  value={qStatement}
                  onChange={(e) => setQStatement(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Propositions (Choisis la bonne réponse)</label>
                <div className="space-y-2">
                  {qOptions.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="correctOpt"
                        checked={qCorrectIndex === i}
                        onChange={() => setQCorrectIndex(i)}
                        className="text-emerald-600"
                      />
                      <input
                        type="text"
                        placeholder={`Option ${String.fromCharCode(65 + i)}`}
                        value={opt}
                        onChange={(e) => {
                          const updated = [...qOptions];
                          updated[i] = e.target.value;
                          setQOptions(updated);
                        }}
                        className="flex-1 text-xs p-2 rounded-lg border border-slate-200 bg-white"
                        required={i < 2}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Explication pédagogique <span className="text-slate-400 font-normal">(Facultative)</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Pourquoi cette réponse est-elle la bonne..."
                  value={qExplanation}
                  onChange={(e) => setQExplanation(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreatingQuizQ(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700"
                >
                  Enregistrer la question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
