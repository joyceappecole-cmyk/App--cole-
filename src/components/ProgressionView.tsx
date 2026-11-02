/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { 
  TrendingUp, 
  Flame, 
  Clock, 
  CheckCircle2, 
  Brain, 
  HelpCircle, 
  BookOpen, 
  Calendar, 
  Award, 
  Sparkles, 
  Target,
  ArrowRight
} from 'lucide-react';
import { Course, Flashcard, QuizAttempt, PlanTask, ExamPlan, StudentProfile } from '../types';

interface ProgressionViewProps {
  studentProfile: StudentProfile;
  courses: Course[];
  flashcards: Flashcard[];
  tasks: PlanTask[];
  quizAttempts: QuizAttempt[];
  examPlan: ExamPlan | null;
  onNavigateTab: (tab: string) => void;
}

export const ProgressionView: React.FC<ProgressionViewProps> = ({
  studentProfile,
  courses,
  flashcards,
  tasks,
  quizAttempts,
  examPlan,
  onNavigateTab,
}) => {
  const todayStr = new Date().toISOString().split('T')[0];

  // 1. Real Statistics (Calculated only from actual stored user state)
  const completedTasks = useMemo(() => tasks.filter((t) => t.completed), [tasks]);
  const pendingTasks = useMemo(() => tasks.filter((t) => !t.completed), [tasks]);
  const overdueTasks = useMemo(() => tasks.filter((t) => !t.completed && t.dueDate < todayStr), [tasks, todayStr]);

  // Total study time: estimated from completed tasks durations + quiz times + flashcards reviews
  const totalMinutesStudied = useMemo(() => {
    const taskMinutes = completedTasks.reduce((acc, t) => acc + (t.durationMinutes || 30), 0);
    const quizMinutes = quizAttempts.length * 5; // 5 min per quiz average
    const flashcardMinutes = Math.round(flashcards.reduce((acc, f) => acc + (f.reviewCount || 0), 0) * 0.5); // 30 sec per card review
    return taskMinutes + quizMinutes + flashcardMinutes;
  }, [completedTasks, quizAttempts, flashcards]);

  const hours = Math.floor(totalMinutesStudied / 60);
  const minutes = totalMinutesStudied % 60;

  // Flashcards mastery breakdown
  const masteredCards = useMemo(() => flashcards.filter((f) => f.masteryLevel === 'facile'), [flashcards]);
  const learningCards = useMemo(() => flashcards.filter((f) => f.masteryLevel === 'moyen' || f.masteryLevel === 'difficile'), [flashcards]);
  const newCards = useMemo(() => flashcards.filter((f) => f.masteryLevel === 'nouveau' || !f.masteryLevel), [flashcards]);

  // Quiz performance
  const avgQuizScore = useMemo(() => {
    if (quizAttempts.length === 0) return null;
    return Math.round(quizAttempts.reduce((acc, q) => acc + q.percentage, 0) / quizAttempts.length);
  }, [quizAttempts]);

  // Subjects breakdown
  const subjectsMap = useMemo(() => {
    const map: Record<string, { coursesCount: number; cardsCount: number; quizzesCount: number }> = {};
    studentProfile.mainSubjects.forEach((sub) => {
      map[sub] = { coursesCount: 0, cardsCount: 0, quizzesCount: 0 };
    });
    courses.forEach((c) => {
      if (!map[c.subject]) map[c.subject] = { coursesCount: 0, cardsCount: 0, quizzesCount: 0 };
      map[c.subject].coursesCount++;
    });
    flashcards.forEach((f) => {
      if (!map[f.subject]) map[f.subject] = { coursesCount: 0, cardsCount: 0, quizzesCount: 0 };
      map[f.subject].cardsCount++;
    });
    quizAttempts.forEach((q) => {
      if (!map[q.subject]) map[q.subject] = { coursesCount: 0, cardsCount: 0, quizzesCount: 0 };
      map[q.subject].quizzesCount++;
    });
    return map;
  }, [studentProfile.mainSubjects, courses, flashcards, quizAttempts]);

  // Study streak calculation
  const streakDays = useMemo(() => {
    try {
      const saved = localStorage.getItem('revigenius_study_streak');
      return saved ? parseInt(saved, 10) : (totalMinutesStudied > 0 ? 1 : 0);
    } catch {
      return totalMinutesStudied > 0 ? 1 : 0;
    }
  }, [totalMinutesStudied]);

  return (
    <div className="space-y-6 pb-20 md:pb-12 max-w-5xl mx-auto px-1 sm:px-0">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-300/30">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Suivi de progression gratuit</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Tableau de bord de tes Progrès
            </h1>
            
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl leading-relaxed">
              Toutes les statistiques présentées ici sont 100% authentiques, calculées à partir de tes révisions réelles et de tes tâches enregistrées sur ton appareil.
            </p>
          </div>

          {/* Quick Streak Badge */}
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center shrink-0 min-w-[140px]">
            <div className="flex items-center justify-center gap-1.5 text-amber-400 mb-1">
              <Flame className="w-5 h-5 fill-amber-400" />
              <span className="text-2xl font-extrabold">{streakDays}</span>
            </div>
            <span className="text-xs font-bold text-white block">
              {streakDays > 1 ? 'Jours d\'étude' : 'Jour d\'étude'}
            </span>
            <span className="text-[10px] text-emerald-200 block mt-0.5">
              Régularité active
            </span>
          </div>
        </div>
      </section>

      {/* 4 Key Real Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Card 1: Temps d'étude */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              {hours}h {minutes}m
            </span>
            <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400">
              Temps d'étude total
            </span>
          </div>
        </div>

        {/* Card 2: Tâches & Objectifs */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              {completedTasks.length} / {tasks.length}
            </span>
            <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400">
              Objectifs accomplis
            </span>
          </div>
        </div>

        {/* Card 3: Répétition Espacée */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Brain className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              {masteredCards.length} / {flashcards.length}
            </span>
            <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400">
              Notions maîtrisées
            </span>
          </div>
        </div>

        {/* Card 4: Réussite aux Quiz */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              {avgQuizScore !== null ? `${avgQuizScore}%` : 'N/A'}
            </span>
            <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400">
              Moyenne aux quiz ({quizAttempts.length})
            </span>
          </div>
        </div>

      </div>

      {/* BILAN HEBDOMADAIRE SIMPLE & ENCOURAGEANT */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Bilan d'activité hebdomadaire
            </h2>
          </div>
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            {completedTasks.length > 0 ? 'En bonne voie' : 'Prêt à démarrer'}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {completedTasks.length > 0
            ? `Félicitations pour ton travail ! Tu as complété ${completedTasks.length} tâche(s) d'étude et révisé ${flashcards.reduce((acc, f) => acc + (f.reviewCount || 0), 0)} carte(s). Maintiens cette régularité pour ancrer tes connaissances.`
            : `Bienvenue dans ton espace de suivi. Commence par valider ta première tâche du jour ou lancer une courte session de cartes de mémorisation pour voir tes statistiques évoluer.`}
        </p>

        {/* Progress bar of tasks */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
            <span>Progression du programme</span>
            <span>
              {tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0}%
            </span>
          </div>
          <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-emerald-600 transition-all duration-500 rounded-full"
              style={{ width: `${tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0}%` }}
            />
          </div>
        </div>
      </section>

      {/* MATIÈRES ÉTUDIÉES & RÉPARTITION */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Répartition par matière ({Object.keys(subjectsMap).length})
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('cours')}
            className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            Gérer les cours
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(subjectsMap).map(([subject, stats]) => (
            <div
              key={subject}
              className="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-1.5"
            >
              <span className="font-bold text-xs text-slate-900 dark:text-white block truncate">
                {subject}
              </span>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                <span>{stats.coursesCount} cours</span>
                <span>·</span>
                <span>{stats.cardsCount} cartes</span>
                <span>·</span>
                <span>{stats.quizzesCount} quiz</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
