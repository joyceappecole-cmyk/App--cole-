/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Brain, 
  HelpCircle, 
  Calendar, 
  TrendingUp, 
  Bot, 
  Sparkles, 
  Lightbulb, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Flame, 
  Bookmark, 
  AlertCircle, 
  Smile, 
  Scroll, 
  Compass, 
  Play, 
  Check, 
  Info,
  Crown
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
  onOpenBeginnerTour?: () => void;
  onOpenPremiumModal?: () => void;
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
  onOpenBeginnerTour,
  onOpenPremiumModal,
}) => {
  const tabConfig = getFacultyTabConfig(studentProfile.facultyId);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const todayStr = new Date().toISOString().split('T')[0];

  // 1. Real calculated metrics (never fabricated)
  const todayTasks = useMemo(() => {
    return tasks.filter((t) => t.dueDate === todayStr || (!t.completed && t.dueDate < todayStr));
  }, [tasks, todayStr]);

  const overdueTasksCount = useMemo(() => {
    return tasks.filter((t) => !t.completed && t.dueDate < todayStr).length;
  }, [tasks, todayStr]);

  const cardsToReviewToday = useMemo(() => {
    return flashcards.filter((f) => {
      if (f.masteryLevel === 'nouveau') return true;
      if (!f.nextReviewDate) return true;
      return f.nextReviewDate <= todayStr;
    });
  }, [flashcards, todayStr]);

  const totalQuizzes = quizAttempts.length;
  const avgQuizScore = totalQuizzes > 0
    ? Math.round(quizAttempts.reduce((acc, q) => acc + q.percentage, 0) / totalQuizzes)
    : null;

  // 2. Coach d'accompagnement gratuit : Recommandations basées sur les données réelles
  const coachRecommendation = useMemo(() => {
    if (cardsToReviewToday.length > 0) {
      return {
        title: 'Mémorisation prioritaire du jour',
        actionText: `Tu as ${cardsToReviewToday.length} carte(s) à revoir pour consolider ta mémoire à long terme.`,
        buttonLabel: 'Réviser mes cartes (SRS)',
        targetAction: () => onNavigateTab('revisions'),
      };
    }
    if (todayTasks.length > 0) {
      const firstTask = todayTasks[0];
      return {
        title: 'Tâche prioritaire de ton planning',
        actionText: `Progresse aujourd'hui sur : « ${firstTask.title} » (${firstTask.subject}).`,
        buttonLabel: 'Consulter mon planning',
        targetAction: () => onNavigateTab('programme'),
      };
    }
    if (quizAttempts.length === 0 && courses.length > 0) {
      return {
        title: 'Auto-évaluation recommandée',
        actionText: 'Valide tes connaissances récentes en passant un premier quiz d\'entraînement.',
        buttonLabel: 'Lancer un quiz d\'entraînement',
        targetAction: () => onOpenQuiz(),
      };
    }
    return {
      title: 'Consolidation de tes fiches',
      actionText: `Consulte tes fiches de cours en ${studentProfile.facultyName || 'ta filière'}.`,
      buttonLabel: 'Parcourir mes fiches de cours',
      targetAction: () => onNavigateTab('revisions'),
    };
  }, [cardsToReviewToday, todayTasks, quizAttempts, courses, studentProfile.facultyName, onNavigateTab, onOpenQuiz]);

  const studentFirstName = studentProfile.name && studentProfile.name.trim() && studentProfile.name.trim() !== 'Étudiant'
    ? studentProfile.name.trim().split(' ')[0]
    : '';

  return (
    <div className="space-y-6 pb-20 md:pb-12 max-w-6xl mx-auto px-1 sm:px-0">
      
      {/* ========================================================================= */}
      {/* 1. NOUVEAU BANDEAU D'ACCUEIL & MESSAGE PERSONNALISÉ                       */}
      {/* ========================================================================= */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-xs relative overflow-hidden transition-colors">
        
        {/* Subtle geometric background accents */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-emerald-100/40 dark:from-emerald-900/20 via-teal-50/30 dark:via-teal-900/10 to-transparent rounded-full blur-2xl pointer-events-none -mr-20 -mt-20" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* User profile & Greeting */}
          <div className="flex items-start gap-4">
            <div className="relative group shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-emerald-50 dark:bg-emerald-950/40 p-1 border border-emerald-100 dark:border-emerald-900/60 shadow-xs flex items-center justify-center">
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

              {/* Joy confetti button */}
              <button
                type="button"
                onClick={() => fireJoyConfetti(0.2, 0.35, 45)}
                className="absolute -bottom-1 -right-1 bg-amber-400 hover:bg-amber-300 text-slate-900 p-1 rounded-full shadow-md text-xs cursor-pointer active:scale-90 transition-transform"
                title="Célébrer la joie d'étudier !"
              >
                ✨
              </button>
            </div>

            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium flex-wrap">
                {studentProfile.university && (
                  <>
                    <span>{studentProfile.university}</span>
                    <span aria-hidden="true">·</span>
                  </>
                )}
                <span>{studentProfile.studyLevel}</span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">{studentProfile.facultyName}</span>
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                {studentFirstName 
                  ? `Bonjour ${studentFirstName} ! Prêt à progresser aujourd'hui ?`
                  : 'Bonjour ! Bienvenue sur Revigenuis. Prêt à progresser aujourd\'hui ?'}
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
                « Comprends tes cours. Maîtrise tes connaissances. Réussis tes examens. »
              </p>
            </div>
          </div>

          {/* Primary Action Button: COMMENCER À ÉTUDIER */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <button
              onClick={() => onNavigateTab('revisions')}
              className="px-6 py-3.5 rounded-2xl text-sm sm:text-base font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Commencer à étudier</span>
            </button>

            {/* Beginner Mode Tour Trigger */}
            {onOpenBeginnerTour && (
              <button
                onClick={onOpenBeginnerTour}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer min-h-[38px]"
                title="Tutoriel interactif pour débutant"
              >
                <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Mode débutant (Guide pas à pas)</span>
              </button>
            )}
          </div>

        </div>

        {/* Strips: Prochain objectif & Activités prévues */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          
          {/* Prochain Objectif */}
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <Bookmark className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div className="min-w-0">
              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 block">Prochain objectif :</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 truncate block">
                {examPlan?.examName || studentProfile.targetExamPeriod || 'Examens de session'}
              </span>
            </div>
          </div>

          {/* Activités prévues aujourd'hui */}
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <div className="min-w-0">
              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 block">Aujourd'hui :</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 truncate block">
                {cardsToReviewToday.length} carte(s) à revoir • {todayTasks.length} tâche(s) au planning
              </span>
            </div>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 2. LES CINQ FONCTIONNALITÉS PRINCIPALES (SECTION 2)                      */}
      {/* ========================================================================= */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              Fonctionnalités principales
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Accès direct et intuitif à tous tes outils d'apprentissage
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hidden sm:inline">
            100% Hors-ligne
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          
          {/* 1. MES RÉVISIONS */}
          <button
            onClick={() => onNavigateTab('revisions')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all text-left flex flex-col justify-between min-h-[135px] group cursor-pointer active:scale-[0.99]"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-emerald-100/70 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300">
                Fiches
              </span>
            </div>
            <div className="mt-3">
              <span className="block text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                1. MES RÉVISIONS
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium line-clamp-2 mt-0.5">
                {sheets.length} fiche(s) synthétique(s) & mémorisation espacée.
              </span>
            </div>
          </button>

          {/* 2. MON ASSISTANT IA */}
          <button
            onClick={() => {
              if (onOpenPremiumModal) onOpenPremiumModal();
              else onNavigateTab('revisions');
            }}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-md transition-all text-left flex flex-col justify-between min-h-[135px] group cursor-pointer active:scale-[0.99]"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Bot className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-purple-100/70 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Futur</span>
              </span>
            </div>
            <div className="mt-3">
              <span className="block text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                2. MON ASSISTANT IA
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium line-clamp-2 mt-0.5">
                Conseils méthodologiques & aperçu des fonctionnalités Premium.
              </span>
            </div>
          </button>

          {/* 3. MES EXERCICES */}
          <button
            onClick={onOpenQuiz}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all text-left flex flex-col justify-between min-h-[135px] group cursor-pointer active:scale-[0.99]"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <HelpCircle className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-blue-100/70 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300">
                Quiz
              </span>
            </div>
            <div className="mt-3">
              <span className="block text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                3. MES EXERCICES
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium line-clamp-2 mt-0.5">
                QCM interactifs, entraînements et auto-évaluation instantanée.
              </span>
            </div>
          </button>

          {/* 4. MON PLANNING */}
          <button
            onClick={onOpenSchedule}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-md transition-all text-left flex flex-col justify-between min-h-[135px] group cursor-pointer active:scale-[0.99]"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-indigo-100/70 dark:bg-indigo-950/70 text-indigo-800 dark:text-indigo-300">
                Horaires
              </span>
            </div>
            <div className="mt-3">
              <span className="block text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                4. MON PLANNING
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium line-clamp-2 mt-0.5">
                Horaires de travail, tâches du jour et compte à rebours d'examen.
              </span>
            </div>
          </button>

          {/* 5. MA PROGRESSION */}
          <button
            onClick={() => onNavigateTab('progression')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-500 hover:shadow-md transition-all text-left flex flex-col justify-between min-h-[135px] group sm:col-span-2 lg:col-span-1 cursor-pointer active:scale-[0.99]"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-amber-100/70 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300">
                Bilan
              </span>
            </div>
            <div className="mt-3">
              <span className="block text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                5. MA PROGRESSION
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium line-clamp-2 mt-0.5">
                Statistiques authentiques, jours d'étude et régularité hebdomadaire.
              </span>
            </div>
          </button>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. COACH D'ACCOMPAGNEMENT GRATUIT (SECTION 4)                             */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-md relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-300/30">
                  Coach d'accompagnement gratuit
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                « Bonjour ! Voici ton programme du jour. »
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl leading-relaxed">
                {coachRecommendation.actionText}
              </p>
            </div>
          </div>

          <button
            onClick={coachRecommendation.targetAction}
            className="self-start sm:self-auto px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-white text-emerald-950 hover:bg-emerald-50 active:scale-95 transition-all shadow-md flex items-center gap-1.5 shrink-0 cursor-pointer min-h-[42px]"
          >
            <span>{coachRecommendation.buttonLabel}</span>
            <ArrowRight className="w-4 h-4 text-emerald-700" />
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. MODULE SPÉCIAL POUR ÉTUDIANTS BIBLIQUES (SI DOMAINE CHOISI)            */}
      {/* ========================================================================= */}
      {studentProfile.facultyId === 'etudes_bibliques_theologie' && (
        <section className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 text-white rounded-3xl p-5 sm:p-6 shadow-md relative overflow-hidden border border-amber-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-amber-400/20 border border-amber-300/30 flex items-center justify-center text-amber-200 shrink-0">
                <Scroll className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-400/20 text-amber-200 border border-amber-300/30">
                  Centre d'études bibliques
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-white">
                  Bible Numérique Intégrée (Louis Segond 1910)
                </h3>
                <p className="text-xs text-amber-100/90 max-w-xl">
                  Accède aux 66 livres complets hors-ligne, aux prophéties accomplies (AT ➔ NT), aux versets de sagesse et aux études.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => onNavigateTab('bible-numerique')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-amber-100 text-amber-950 font-bold text-xs shadow-md active:scale-95 transition-all cursor-pointer whitespace-nowrap min-h-[40px]"
              >
                <BookOpen className="w-4 h-4 text-amber-700" />
                <span>Ouvrir la Bible (66 livres)</span>
              </button>

              <button
                onClick={() => onNavigateTab('espace-biblique')}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs shadow-md active:scale-95 transition-all cursor-pointer whitespace-nowrap min-h-[40px]"
              >
                <span>Études & Exégèse</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 5. ACTIVITÉS PRÉVUES & STATISTIQUES RÉELLES                              */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        
        {/* Tâches du jour */}
        <section className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Activités & tâches du jour
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {todayTasks.length} activité(s) planifiée(s) aujourd'hui
              </p>
            </div>
            <button
              onClick={onOpenSchedule}
              className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              Gérer le planning
            </button>
          </div>

          <div className="space-y-2">
            {todayTasks.length > 0 ? (
              todayTasks.slice(0, 4).map((t) => (
                <div
                  key={t.id}
                  onClick={onOpenSchedule}
                  className="p-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${t.completed ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <div className="min-w-0">
                      <span className={`font-bold block truncate ${t.completed ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                        {t.title}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        {t.subject} · {t.durationMinutes} min
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                </div>
              ))
            ) : (
              <div className="py-6 text-center space-y-1">
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Aucune tâche urgente en attente !
                </p>
                <p className="text-[11px] text-slate-400">
                  Profite de ce temps libre pour réviser tes cartes de mémorisation ou lire une fiche de cours.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Bilan rapide de progression */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Ta Progression
              </h3>
              <button
                onClick={() => onNavigateTab('progression')}
                className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
              >
                Détails
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-slate-600 dark:text-slate-400">Quiz passés :</span>
                <span className="font-extrabold text-slate-900 dark:text-white font-mono">
                  {totalQuizzes} ({avgQuizScore !== null ? `${avgQuizScore}%` : 'N/A'})
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-slate-600 dark:text-slate-400">Notions maîtrisées :</span>
                <span className="font-extrabold text-slate-900 dark:text-white font-mono">
                  {flashcards.filter((f) => f.masteryLevel === 'facile').length} / {flashcards.length}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-slate-600 dark:text-slate-400">Fiches consultables :</span>
                <span className="font-extrabold text-slate-900 dark:text-white font-mono">
                  {sheets.length}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('progression')}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px]"
          >
            <span>Consulter mon bilan hebdomadaire</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </section>

      </div>

    </div>
  );
};
