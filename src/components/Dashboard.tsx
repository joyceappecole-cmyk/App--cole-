import React, { useState } from 'react';
import { 
  BookOpen, 
  Brain, 
  HelpCircle, 
  Library, 
  Calendar, 
  Sparkles, 
  Lightbulb, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  RefreshCw, 
  Flame, 
  Bookmark,
  AlertCircle,
  Award,
  FileText,
  Scroll,
  Smile,
  PartyPopper
} from 'lucide-react';
import { Course, Flashcard, ScheduleItem, StudentProfile, StudyTip, PlanTask, QuizAttempt, ExamPlan, SummarySheet } from '../types';
import { fireJoyConfetti } from '../utils/confetti';
import { getFacultyTabConfig } from '../data/facultySpecialization';

interface DashboardProps {
  studentProfile: StudentProfile;
  courses: Course[];
  flashcards: Flashcard[];
  schedule: ScheduleItem[];
  tips: StudyTip[];
  tasks: PlanTask[];
  quizAttempts: QuizAttempt[];
  examPlan: ExamPlan | null;
  sheets: SummarySheet[];
  onNavigateTab: (tab: string) => void;
  onOpenQuiz: () => void;
  onOpenSchedule: () => void;
  onSelectCourse: (course: Course) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  studentProfile,
  courses,
  flashcards,
  schedule,
  tips,
  tasks,
  quizAttempts,
  examPlan,
  sheets,
  onNavigateTab,
  onOpenQuiz,
  onOpenSchedule,
  onSelectCourse,
}) => {
  const tabConfig = getFacultyTabConfig(studentProfile.facultyId);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const currentTip = tips[currentTipIndex % tips.length];

  const handleNextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % tips.length);
  };

  const todayStr = new Date().toISOString().split('T')[0];

  // Overdue tasks
  const overdueTasksCount = tasks.filter((t) => !t.completed && t.dueDate < todayStr).length;
  const upcomingTasksCount = tasks.filter((t) => !t.completed && t.dueDate >= todayStr).length;

  // Real Stats
  const totalQuizzes = quizAttempts.length;
  const avgQuizScore =
    totalQuizzes > 0
      ? Math.round(quizAttempts.reduce((acc, q) => acc + q.percentage, 0) / totalQuizzes)
      : null;

  const masteredFlashcards = flashcards.filter((f) => f.masteryLevel === 'facile' || f.masteryLevel === 'moyen').length;
  const totalReviewed = flashcards.reduce((acc, f) => acc + (f.reviewCount || 0), 0);

  return (
    <div className="space-y-6 pb-20 md:pb-12">
      
      {/* 1. Welcome Header & Motivational Banner */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs relative overflow-hidden transition-colors">
        {/* Subtle geometric background accents */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-emerald-100/40 dark:from-emerald-900/20 via-blue-50/30 dark:via-blue-900/10 to-transparent rounded-full blur-2xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            {/* Photo de profil de l'étudiant ou logo par défaut */}
            <div className="relative group shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-emerald-50/50 dark:bg-emerald-950/40 p-1 border border-emerald-100 dark:border-emerald-900/60 shadow-xs flex items-center justify-center">
                {studentProfile.avatarUrl && studentProfile.avatarUrl.startsWith('data:image') ? (
                  <img
                    src={studentProfile.avatarUrl}
                    alt={studentProfile.name || 'Photo de profil'}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : studentProfile.avatarUrl ? (
                  <span className="text-3xl sm:text-4xl">{studentProfile.avatarUrl}</span>
                ) : (
                  <img
                    src="/logo.png"
                    alt="Logo RéviGenius"
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
              
              {/* Badge d'humeur joyeuse cliquable pour célébrer */}
              <button
                type="button"
                onClick={() => fireJoyConfetti(0.2, 0.35, 45)}
                className="absolute -bottom-1 -right-1 bg-amber-400 hover:bg-amber-300 text-slate-900 p-1 rounded-full shadow-md text-xs cursor-pointer active:scale-90 transition-transform"
                title="Célébrer la joie d'étudier !"
              >
                ✨
              </button>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium flex-wrap">
                {studentProfile.university && (
                  <>
                    <span>{studentProfile.university}</span>
                    <span aria-hidden="true">·</span>
                  </>
                )}
                <span>{studentProfile.country}</span>
                <span aria-hidden="true">·</span>
                <span>{studentProfile.studyLevel}</span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">{studentProfile.facultyName}</span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {studentProfile.name && studentProfile.name.trim() && studentProfile.name.trim() !== 'Étudiant'
                    ? `Bonjour, ${studentProfile.name.trim().split(' ')[0]} !`
                    : 'Bienvenue sur RéviGenius !'}
                </h1>
                <button
                  type="button"
                  onClick={() => fireJoyConfetti(0.3, 0.3, 40)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800 cursor-pointer hover:bg-amber-100 transition-colors"
                  title="Cliquer pour une étincelle de joie !"
                >
                  <Smile className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                  <span>Joie d'apprendre</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium max-w-xl">
                Slogan : <span className="text-emerald-800 dark:text-emerald-300 font-semibold">« Comprends tes cours. Maîtrise tes connaissances. Réussis tes examens. »</span>
              </p>
            </div>
          </div>

          {/* Target Exam info strip */}
          <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-4 border border-slate-200/70 dark:border-slate-700/60 shrink-0 md:min-w-[270px]">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400 mb-1">
              <Bookmark className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Prochain objectif</span>
            </div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
              {examPlan?.examName || studentProfile.targetExamPeriod || 'Examens universitaires'}
            </p>
            <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span>Date ciblée :</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">
                {examPlan?.examDate || 'Session d\'hiver'}
              </span>
            </div>
            {overdueTasksCount > 0 && (
              <div className="mt-2 text-[10px] text-rose-700 dark:text-rose-300 font-semibold bg-rose-50 dark:bg-rose-950/50 px-2 py-0.5 rounded-md border border-rose-200/60 dark:border-rose-800/60 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{overdueTasksCount} tâche(s) en retard</span>
              </div>
            )}
          </div>
        </div>

        {/* Motivating Message Quote */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
            <Flame className="w-4 h-4" />
          </div>
          <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200 tracking-tight">
            « Chaque séance de révision te rapproche de tes objectifs. »
          </p>
        </div>
      </section>

      {/* Module Spécial : Spécialisation de la filière (pour toutes les facultés) */}
      {studentProfile.facultyId !== 'etudes_bibliques_theologie' && (
        <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 text-white rounded-3xl p-6 sm:p-7 shadow-md relative overflow-hidden border border-slate-800">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-400/20 text-emerald-300 border border-emerald-300/30">
                  Filière Spécialisée : {tabConfig.facultyBadge}
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-white">
                  Espace Spécialisé & Documents Exclusifs
                </h2>
                <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                  {tabConfig.domainQuote} Tous vos onglets et contenus sont rigoureusement adaptés : <span className="text-emerald-300 font-semibold">{tabConfig.tabs.cours.full}</span>, <span className="text-emerald-300 font-semibold">{tabConfig.tabs.revisions.full}</span> et <span className="text-emerald-300 font-semibold">{tabConfig.tabs.programme.full}</span>.
                </p>
              </div>
            </div>

            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/80 text-xs shrink-0 max-w-sm">
              <div className="text-[11px] font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>{tabConfig.specializedToolLabel}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {tabConfig.specializedToolDescription}
              </p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-center">
            <button
              onClick={() => onNavigateTab('cours')}
              className="p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-slate-200 font-semibold transition-colors cursor-pointer text-left flex items-center gap-2"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{tabConfig.tabs.cours.full}</span>
            </button>
            <button
              onClick={() => onNavigateTab('revisions')}
              className="p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-slate-200 font-semibold transition-colors cursor-pointer text-left flex items-center gap-2"
            >
              <Brain className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span className="truncate">{tabConfig.tabs.revisions.sheetsTab.split('&')[0].trim()}</span>
            </button>
            <button
              onClick={onOpenQuiz}
              className="p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-slate-200 font-semibold transition-colors cursor-pointer text-left flex items-center gap-2"
            >
              <HelpCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="truncate">{tabConfig.tabs.revisions.quizTab.split('&')[0].trim()}</span>
            </button>
            <button
              onClick={onOpenSchedule}
              className="p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-slate-200 font-semibold transition-colors cursor-pointer text-left flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="truncate">{tabConfig.tabs.programme.short}</span>
            </button>
          </div>
        </section>
      )}

      {/* Module Spécial : Espace Biblique (si étudiant en théologie / études bibliques) */}
      {studentProfile.facultyId === 'etudes_bibliques_theologie' && (
        <section className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 text-white rounded-3xl p-6 sm:p-7 shadow-md relative overflow-hidden border border-amber-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-300/30 flex items-center justify-center text-amber-200 shrink-0">
                <Scroll className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-400/20 text-amber-200 border border-amber-300/30">
                  Centre d'études bibliques
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-white">
                  Ton Espace d'Étude & de Révision Biblique
                </h2>
                <p className="text-xs text-amber-100/90 max-w-xl">
                  Accède à ta Bible installée hors-ligne, aux prophéties accomplies (AT ➔ NT), aux versets de sagesse, au guide d'étude quotidien et au laboratoire des contradictions apparentes.
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('espace-biblique')}
              className="self-start sm:self-auto flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-extrabold text-xs shadow-md active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Ouvrir l'Espace Biblique</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-5 pt-4 border-t border-amber-700/50 grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs text-center">
            <button
              onClick={() => onNavigateTab('espace-biblique')}
              className="p-2.5 rounded-xl bg-amber-950/40 hover:bg-amber-950/60 border border-amber-700/40 text-amber-100 font-semibold transition-colors cursor-pointer"
            >
              📖 Bible installée
            </button>
            <button
              onClick={() => onNavigateTab('espace-biblique')}
              className="p-2.5 rounded-xl bg-amber-950/40 hover:bg-amber-950/60 border border-amber-700/40 text-amber-100 font-semibold transition-colors cursor-pointer"
            >
              📜 Prophéties AT ➔ NT
            </button>
            <button
              onClick={() => onNavigateTab('espace-biblique')}
              className="p-2.5 rounded-xl bg-amber-950/40 hover:bg-amber-950/60 border border-amber-700/40 text-amber-100 font-semibold transition-colors cursor-pointer"
            >
              💎 Versets de sagesse
            </button>
            <button
              onClick={() => onNavigateTab('espace-biblique')}
              className="p-2.5 rounded-xl bg-amber-950/40 hover:bg-amber-950/60 border border-amber-700/40 text-amber-100 font-semibold transition-colors cursor-pointer"
            >
              🗓️ Guide quotidien
            </button>
            <button
              onClick={() => onNavigateTab('espace-biblique')}
              className="p-2.5 rounded-xl bg-amber-950/40 hover:bg-amber-950/60 border border-amber-700/40 text-amber-100 font-semibold transition-colors cursor-pointer col-span-2 sm:col-span-1"
            >
              🧠 Contradictions
            </button>
          </div>
        </section>
      )}

      {/* 2. Conseil d'étude du jour */}
      <section className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-7 shadow-md relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-emerald-300">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-300">
                Conseil d'étude du jour
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white">
                {currentTip.title}
              </h2>
            </div>
          </div>

          <button
            onClick={handleNextTip}
            className="self-start sm:self-auto flex items-center gap-1.5 text-xs font-medium text-emerald-100 bg-white/10 hover:bg-white/20 active:scale-95 transition-all py-1.5 px-3 rounded-xl backdrop-blur-sm min-h-[36px]"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Changer de conseil</span>
          </button>
        </div>

        <div className="text-sm text-emerald-50/90 leading-relaxed mb-4 max-w-3xl">
          {currentTip.description}
        </div>

        <div className="bg-black/20 rounded-2xl p-3.5 border border-white/10 flex items-start gap-2.5 text-xs text-emerald-200">
          <Sparkles className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-white">Action concrète : </span>
            {currentTip.actionableStep}
          </div>
        </div>
      </section>

      {/* 3. Accès Rapides */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
            Accès rapides
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Outils disponibles hors-ligne
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4">
          
          {/* Tile 1: Mes cours */}
          <button
            onClick={() => onNavigateTab('cours')}
            className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all text-left flex flex-col justify-between min-h-[105px] sm:min-h-[110px] group cursor-pointer"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                {tabConfig.tabs.cours.full}
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {courses.length} support{courses.length > 1 ? 's' : ''} PDF
              </span>
            </div>
          </button>

          {/* Tile 2: Réviser */}
          <button
            onClick={() => onNavigateTab('revisions')}
            className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all text-left flex flex-col justify-between min-h-[105px] sm:min-h-[110px] group cursor-pointer"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                {tabConfig.tabs.revisions.full}
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {flashcards.length} cartes · {sheets.length} fiches
              </span>
            </div>
          </button>

          {/* Tile 3: Les Quiz */}
          <button
            onClick={onOpenQuiz}
            className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all text-left flex flex-col justify-between min-h-[105px] sm:min-h-[110px] group cursor-pointer"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                {tabConfig.tabs.revisions.quizTab.split('&')[0].trim()}
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {totalQuizzes > 0 ? `${totalQuizzes} passés (${avgQuizScore}%)` : 'Auto-test interactif'}
              </span>
            </div>
          </button>

          {/* Tile 4: Bibliothèque */}
          <button
            onClick={() => onNavigateTab(studentProfile.facultyId === 'etudes_bibliques_theologie' ? 'espace-biblique' : 'bibliotheque')}
            className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all text-left flex flex-col justify-between min-h-[105px] sm:min-h-[110px] group cursor-pointer"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Library className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                {studentProfile.facultyId === 'etudes_bibliques_theologie' ? 'Espace Biblique' : tabConfig.tabs.bibliotheque.full}
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {studentProfile.facultyId === 'etudes_bibliques_theologie' ? 'Bible, sagesse & exégèse' : 'Portails BU & traités'}
              </span>
            </div>
          </button>

          {/* Tile 5: Mon programme */}
          <button
            onClick={() => onNavigateTab('programme')}
            className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-md transition-all text-left flex flex-col justify-between min-h-[105px] sm:min-h-[110px] group col-span-2 sm:col-span-1 cursor-pointer"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                {tabConfig.tabs.programme.full}
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {upcomingTasksCount} tâche{upcomingTasksCount > 1 ? 's' : ''} à venir
              </span>
            </div>
          </button>

        </div>
      </section>

      {/* 4. Aperçu des Statistiques Réelles & Planning */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        
        {/* Progression & Real stats */}
        <section className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                Aperçu des révisions
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                <span>Données réellement enregistrées</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">Stockage local actif</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xl sm:text-2xl font-extrabold text-emerald-700 dark:text-emerald-400 font-mono tabular-nums">
                {avgQuizScore !== null ? `${avgQuizScore}%` : `${courses.length} cours`}
              </span>
              <span className="block text-[10px] text-slate-400 dark:text-slate-500">
                {avgQuizScore !== null ? 'Moyenne quiz' : 'Support(s) prêts'}
              </span>
            </div>
          </div>

          {/* Three key stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div>
              <span className="block text-base sm:text-lg font-bold text-slate-900 dark:text-white font-mono tabular-nums">
                {totalQuizzes}
              </span>
              <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Quiz passés</span>
            </div>
            <div>
              <span className="block text-base sm:text-lg font-bold text-slate-900 dark:text-white font-mono tabular-nums">
                {totalReviewed}
              </span>
              <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Flashcards</span>
            </div>
            <div>
              <span className="block text-base sm:text-lg font-bold text-slate-900 dark:text-white font-mono tabular-nums">
                {tasks.filter((t) => t.completed).length} / {tasks.length}
              </span>
              <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Tâches validées</span>
            </div>
          </div>

          {/* Course list preview */}
          <div className="pt-2 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Mes supports de cours récents
              </h3>
              <button
                onClick={() => onNavigateTab('cours')}
                className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
              >
                Gérer mes cours
              </button>
            </div>

            <div className="space-y-2.5">
              {courses.slice(0, 3).map((course) => (
                <div
                  key={course.id}
                  onClick={() => {
                    onSelectCourse(course);
                    onNavigateTab('cours');
                  }}
                  className="p-3 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all cursor-pointer flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate block">
                      {course.title}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      <span className="text-emerald-700 dark:text-emerald-400 font-medium">{course.subject}</span>
                      <span>·</span>
                      <span>{course.createdAt}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                      {course.hasPdf ? 'PDF prêt' : 'Notes'}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* Tâches du jour & planning */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between transition-colors">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                Planning d'étude
              </h2>
              <button
                onClick={() => onNavigateTab('programme')}
                className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
              >
                Tout voir
              </button>
            </div>

            <div className="space-y-2.5">
              {tasks.filter((t) => !t.completed).slice(0, 3).map((t) => {
                const isOverdue = t.dueDate < todayStr;
                return (
                  <div
                    key={t.id}
                    className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                      isOverdue 
                        ? 'bg-rose-50/70 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60' 
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-100 dark:border-slate-800'
                    }`}
                  >
                    <Clock className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${isOverdue ? 'text-rose-600 dark:text-rose-400' : 'text-blue-600 dark:text-blue-400'}`} />
                    <div className="min-w-0">
                      <span className={`font-semibold block truncate ${isOverdue ? 'text-rose-950 dark:text-rose-200 font-bold' : 'text-slate-900 dark:text-slate-100'}`}>
                        {t.title}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 block text-[11px] mt-0.5">
                        {t.subject} · {t.dueDate}
                      </span>
                    </div>
                  </div>
                );
              })}

              {tasks.filter((t) => !t.completed).length === 0 && (
                <p className="text-xs text-slate-400 dark:text-slate-500 italic py-4 text-center">
                  Aucune tâche en attente. Tu es à jour !
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => onNavigateTab('revisions')}
              className="w-full min-h-[44px] py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <span>Lancer ma session de révision</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

      </div>

    </div>
  );
};
