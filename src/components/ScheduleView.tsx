import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Clock, 
  Target, 
  AlertCircle, 
  CheckCircle2, 
  Circle, 
  Plus, 
  Edit2, 
  Trash2, 
  Bell, 
  BellOff, 
  TrendingUp, 
  BarChart2, 
  BookOpen, 
  Brain, 
  HelpCircle, 
  Sparkles,
  X,
  Award
} from 'lucide-react';
import { ExamPlan, PlanTask, QuizAttempt, Flashcard, Course, FacultyId } from '../types';
import { getFacultyTabConfig } from '../data/facultySpecialization';

interface ScheduleViewProps {
  examPlan: ExamPlan | null;
  onUpdateExamPlan: (plan: ExamPlan) => void;
  tasks: PlanTask[];
  onAddTask: (task: PlanTask) => void;
  onUpdateTask: (task: PlanTask) => void;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  // Real stats sources
  quizAttempts: QuizAttempt[];
  flashcards: Flashcard[];
  courses: Course[];
  availableSubjects: string[];
  facultyId?: FacultyId | string;
  facultyBadge?: string;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  examPlan,
  onUpdateExamPlan,
  tasks,
  onAddTask,
  onUpdateTask,
  onToggleTask,
  onDeleteTask,
  quizAttempts,
  flashcards,
  courses,
  availableSubjects,
  facultyId,
  facultyBadge,
}) => {
  const tabConfig = getFacultyTabConfig(facultyId);
  // Section toggle: 'programme' | 'stats'
  const [activeSection, setActiveSection] = useState<'programme' | 'stats'>('programme');

  // Exam Plan Form modal
  const [isEditingPlan, setIsEditingPlan] = useState(false);
  const [examName, setExamName] = useState(examPlan?.examName || '');
  const [examSubject, setExamSubject] = useState(examPlan?.subject || '');
  const [examDate, setExamDate] = useState(examPlan?.examDate || '');
  const [examChapters, setExamChapters] = useState(examPlan?.chapters || '');
  const [dailyMinutes, setDailyMinutes] = useState(examPlan?.dailyMinutes || 60);
  const [personalGoal, setPersonalGoal] = useState(examPlan?.personalGoal || '');

  // Task Form modal
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [editingTask, setEditingTask] = useState<PlanTask | null>(null);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskSubject, setTaskSubject] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskDuration, setTaskDuration] = useState(30);

  // Notifications State (System capabilities detection)
  const [notificationStatus, setNotificationStatus] = useState<string>(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission;
    }
    return 'unsupported';
  });
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Today's date YYYY-MM-DD
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  // Categorize tasks: Overdue, Upcoming, Completed
  const { overdueTasks, upcomingTasks, completedTasks } = useMemo(() => {
    const overdue: PlanTask[] = [];
    const upcoming: PlanTask[] = [];
    const completed: PlanTask[] = [];

    tasks.forEach((t) => {
      if (t.completed) {
        completed.push(t);
      } else if (t.dueDate < todayStr) {
        overdue.push(t);
      } else {
        upcoming.push(t);
      }
    });

    // Sort upcoming by due date ascending
    upcoming.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    overdue.sort((a, b) => a.dueDate.localeCompare(b.dueDate));

    return { overdueTasks: overdue, upcomingTasks: upcoming, completedTasks: completed };
  }, [tasks, todayStr]);

  // Days left until exam
  const daysUntilExam = useMemo(() => {
    if (!examPlan?.examDate) return null;
    const diff = new Date(examPlan.examDate).getTime() - new Date(todayStr).getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  }, [examPlan, todayStr]);

  // Real statistics calculation based solely on recorded activity
  const realStats = useMemo(() => {
    const totalQuizzes = quizAttempts.length;
    const avgScore =
      totalQuizzes > 0
        ? Math.round(quizAttempts.reduce((acc, q) => acc + q.percentage, 0) / totalQuizzes)
        : null;

    const totalFlashcardsReviewed = flashcards.reduce((acc, f) => acc + (f.reviewCount || 0), 0);
    const completedTasksCount = completedTasks.length;
    const totalSessions = totalQuizzes + totalFlashcardsReviewed + completedTasksCount;

    // Subject activity frequency
    const freq: Record<string, number> = {};
    quizAttempts.forEach((q) => {
      freq[q.subject] = (freq[q.subject] || 0) + 1;
    });
    flashcards.forEach((f) => {
      if (f.reviewCount > 0) {
        freq[f.subject] = (freq[f.subject] || 0) + f.reviewCount;
      }
    });
    completedTasks.forEach((t) => {
      freq[t.subject] = (freq[t.subject] || 0) + 1;
    });

    const sortedSubjects = Object.entries(freq).sort((a, b) => b[1] - a[1]);

    const hasAnyActivity = totalQuizzes > 0 || totalFlashcardsReviewed > 0 || completedTasksCount > 0;

    return {
      totalQuizzes,
      avgScore,
      totalFlashcardsReviewed,
      totalSessions,
      sortedSubjects,
      hasAnyActivity,
    };
  }, [quizAttempts, flashcards, completedTasks]);

  // Save Exam Plan
  const handleSaveExamPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!examName.trim() || !examDate) return;

    const newPlan: ExamPlan = {
      id: examPlan?.id || `plan-${Date.now()}`,
      examName: examName.trim(),
      subject: examSubject.trim() || availableSubjects[0] || 'Matière générale',
      examDate,
      chapters: examChapters.trim(),
      dailyMinutes: Number(dailyMinutes) || 60,
      personalGoal: personalGoal.trim(),
      createdAt: examPlan?.createdAt || new Date().toISOString(),
    };

    onUpdateExamPlan(newPlan);
    setIsEditingPlan(false);
  };

  // Save Task
  const handleSaveTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim() || !taskDueDate) return;

    if (editingTask) {
      onUpdateTask({
        ...editingTask,
        title: taskTitle.trim(),
        subject: taskSubject.trim() || availableSubjects[0] || 'Matière générale',
        dueDate: taskDueDate,
        durationMinutes: Number(taskDuration) || 30,
      });
      setEditingTask(null);
    } else {
      const newTask: PlanTask = {
        id: `task-${Date.now()}`,
        title: taskTitle.trim(),
        subject: taskSubject.trim() || availableSubjects[0] || 'Matière générale',
        dueDate: taskDueDate,
        durationMinutes: Number(taskDuration) || 30,
        completed: false,
        examPlanId: examPlan?.id,
      };
      onAddTask(newTask);
      setIsCreatingTask(false);
    }

    setTaskTitle('');
    setTaskDueDate('');
  };

  // Request Notifications (honest capability check)
  const handleRequestNotifications = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      setNotificationMsg('Les notifications système ne sont pas prises en charge par votre navigateur.');
      return;
    }

    try {
      const res = await Notification.requestPermission();
      setNotificationStatus(res);
      if (res === 'granted') {
        new Notification('RéviGenius - Rappels activés', {
          body: 'Tes rappels de révision sont prêts. Chaque séance te rapproche de tes objectifs !',
          icon: '/icon.svg',
        });
        setNotificationMsg('Rappels activés avec succès sur cet appareil.');
      } else {
        setNotificationMsg('Autorisation refusée. Vous pouvez utiliser les alertes visuelles intégrées dans RéviGenius.');
      }
    } catch {
      setNotificationMsg('Impossible d\'activer les notifications sur ce navigateur.');
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-12 max-w-4xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {tabConfig.tabs.programme.full}
            </h1>
            {facultyBadge && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                {facultyBadge}
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {tabConfig.tabs.programme.hint} — planifie tes révisions et épreuves sans documents hors-sujet.
          </p>
        </div>

        {/* Section switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-200/70 dark:bg-slate-800/80 rounded-2xl self-start sm:self-auto w-full sm:w-auto">
          <button
            onClick={() => setActiveSection('programme')}
            className={`flex-1 sm:flex-initial py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 min-h-[36px] cursor-pointer ${
              activeSection === 'programme'
                ? 'bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span>Mon Programme ({tasks.filter((t) => !t.completed).length})</span>
          </button>

          <button
            onClick={() => setActiveSection('stats')}
            className={`flex-1 sm:flex-initial py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 min-h-[36px] cursor-pointer ${
              activeSection === 'stats'
                ? 'bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5 shrink-0" />
            <span>Statistiques réelles</span>
          </button>
        </div>
      </div>

      {/* ==================================================== */}
      {/* SECTION 1 : PROGRAMME D'EXAMEN & TÂCHES              */}
      {/* ==================================================== */}
      {activeSection === 'programme' && (
        <div className="space-y-6">
          
          {/* Exam Goal Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-700 dark:text-emerald-400">
                    Objectif d'examen ciblé
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    {examPlan?.examName || 'Session d\'examens semestrielle'}
                  </h2>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{examPlan?.subject || 'Toutes matières'}</span>
                    <span>·</span>
                    <span>Échéance : {examPlan?.examDate || 'Non définie'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                {daysUntilExam !== null && (
                  <div className="px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                    <span className="block text-sm font-extrabold font-mono text-emerald-700 dark:text-emerald-400 tabular-nums">
                      {daysUntilExam > 0 ? `J-${daysUntilExam}` : daysUntilExam === 0 ? 'Aujourd\'hui !' : 'Terminé'}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">avant l'examen</span>
                  </div>
                )}

                <button
                  onClick={() => {
                    setExamName(examPlan?.examName || '');
                    setExamSubject(examPlan?.subject || availableSubjects[0] || '');
                    setExamDate(examPlan?.examDate || '');
                    setExamChapters(examPlan?.chapters || '');
                    setDailyMinutes(examPlan?.dailyMinutes || 60);
                    setPersonalGoal(examPlan?.personalGoal || '');
                    setIsEditingPlan(true);
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 min-h-[40px] cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Configurer l'examen</span>
                </button>
              </div>
            </div>

            {/* Daily commitment & Goals info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="font-semibold text-slate-500 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  Temps d'étude quotidien visé :
                </span>
                <p className="font-bold text-slate-900 font-mono text-sm">
                  {examPlan?.dailyMinutes || 60} minutes par jour
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="font-semibold text-slate-500 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Objectif personnel :
                </span>
                <p className="font-medium text-slate-800 line-clamp-2">
                  {examPlan?.personalGoal || 'Valider toutes les épreuves du semestre sans rattrapage.'}
                </p>
              </div>
            </div>

            {/* Chapters list if any */}
            {examPlan?.chapters && (
              <div className="pt-2 text-xs text-slate-600">
                <strong className="block text-slate-900 mb-1">Chapitres au programme :</strong>
                <p className="whitespace-pre-line bg-slate-50 p-3 rounded-xl border border-slate-100 font-mono text-[11px] leading-relaxed">
                  {examPlan.chapters}
                </p>
              </div>
            )}
          </div>

          {/* Tasks Section Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Tâches et planning de révision
              </h3>
              <p className="text-xs text-slate-500">
                Coche les sessions réalisées au fur et à mesure.
              </p>
            </div>

            <button
              onClick={() => {
                setTaskTitle('');
                setTaskSubject(availableSubjects[0] || '');
                setTaskDueDate(todayStr);
                setTaskDuration(30);
                setEditingTask(null);
                setIsCreatingTask(true);
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all shadow-xs min-h-[40px]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Ajouter une tâche</span>
            </button>
          </div>

          {/* 1. Tâches en retard (Alert) */}
          {overdueTasks.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-700">
                <AlertCircle className="w-4 h-4" />
                <span>Tâches en retard ({overdueTasks.length})</span>
              </div>

              <div className="space-y-2">
                {overdueTasks.map((t) => (
                  <div
                    key={t.id}
                    className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onToggleTask(t.id)}
                        className="text-slate-400 hover:text-emerald-600 transition-colors shrink-0"
                        title="Marquer comme terminée"
                      >
                        <Circle className="w-5 h-5 text-rose-400" />
                      </button>
                      <div>
                        <span className="font-bold text-rose-950 block">{t.title}</span>
                        <div className="flex items-center gap-2 text-[11px] text-rose-700 mt-0.5">
                          <span>{t.subject}</span>
                          <span>·</span>
                          <span className="font-mono tabular-nums">{t.durationMinutes} min</span>
                          <span>·</span>
                          <span className="font-semibold">Échéance dépassée : {t.dueDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => {
                          setEditingTask(t);
                          setTaskTitle(t.title);
                          setTaskSubject(t.subject);
                          setTaskDueDate(t.dueDate);
                          setTaskDuration(t.durationMinutes);
                          setIsCreatingTask(true);
                        }}
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-white/80"
                        title="Modifier"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteTask(t.id)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-white/80"
                        title="Supprimer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Prochaines révisions */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Prochaines révisions ({upcomingTasks.length})
            </h4>

            {upcomingTasks.length > 0 ? (
              <div className="space-y-2">
                {upcomingTasks.map((t) => {
                  const isToday = t.dueDate === todayStr;
                  return (
                    <div
                      key={t.id}
                      className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 text-xs ${
                        isToday ? 'bg-emerald-50/50 border-emerald-300' : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onToggleTask(t.id)}
                          className="text-slate-300 hover:text-emerald-600 transition-colors shrink-0"
                          title="Marquer comme terminée"
                        >
                          <Circle className="w-5 h-5 text-slate-300 hover:text-emerald-600" />
                        </button>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">{t.title}</span>
                            {isToday && (
                              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                                Aujourd'hui
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                            <span>{t.subject}</span>
                            <span>·</span>
                            <span className="font-mono tabular-nums">{t.durationMinutes} min</span>
                            <span>·</span>
                            <span>Date prévue : {t.dueDate}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => {
                            setEditingTask(t);
                            setTaskTitle(t.title);
                            setTaskSubject(t.subject);
                            setTaskDueDate(t.dueDate);
                            setTaskDuration(t.durationMinutes);
                            setIsCreatingTask(true);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteTask(t.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic py-2">
                Toutes les prochaines révisions sont à jour !
              </p>
            )}
          </div>

          {/* 3. Tâches terminées */}
          {completedTasks.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Tâches terminées ({completedTasks.length})
              </h4>
              <div className="space-y-1.5">
                {completedTasks.slice(0, 5).map((t) => (
                  <div
                    key={t.id}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs opacity-75"
                  >
                    <div className="flex items-center gap-2.5">
                      <button onClick={() => onToggleTask(t.id)} className="text-emerald-600">
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      <span className="line-through text-slate-500">{t.title}</span>
                      <span className="text-[10px] text-slate-400">({t.subject})</span>
                    </div>

                    <button
                      onClick={() => onDeleteTask(t.id)}
                      className="text-slate-300 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notification / Rappels section */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-600" />
                <h4 className="text-sm font-bold text-slate-900">
                  Rappels d'étude sur cet appareil
                </h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
                Active les rappels locaux via les notifications du navigateur pour ne pas oublier tes sessions programmées.
              </p>
              {notificationMsg && (
                <p className="text-xs font-semibold text-emerald-700 mt-1">
                  {notificationMsg}
                </p>
              )}
            </div>

            <div>
              {notificationStatus === 'granted' ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Rappels autorisés
                </span>
              ) : notificationStatus === 'unsupported' ? (
                <span className="text-xs text-slate-400 italic">
                  Non supporté par ce navigateur
                </span>
              ) : (
                <button
                  onClick={handleRequestNotifications}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-xs min-h-[40px] flex items-center gap-2"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Activer les rappels</span>
                </button>
              )}
            </div>
          </div>

        </div>
      )}

      {/* ==================================================== */}
      {/* SECTION 2 : STATISTIQUES RÉELLES                    */}
      {/* ==================================================== */}
      {activeSection === 'stats' && (
        <div className="space-y-6">
          
          {!realStats.hasAnyActivity ? (
            /* Message d'encouragement si aucune donnée */
            <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Tu n'as pas encore commencé tes révisions
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                Lance ton premier quiz, révise quelques flashcards ou coche une tâche de ton programme pour voir apparaître tes statistiques réelles d'apprentissage !
              </p>
            </div>
          ) : (
            /* Statistiques réelles consolidées */
            <div className="space-y-6">
              
              {/* Key Indicators Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Quiz effectués
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                    {realStats.totalQuizzes}
                  </span>
                  <span className="block text-[11px] text-slate-500 mt-1">
                    Évaluations QCM
                  </span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Score moyen
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono tabular-nums">
                    {realStats.avgScore !== null ? `${realStats.avgScore}%` : 'N/A'}
                  </span>
                  <span className="block text-[11px] text-slate-500 mt-1">
                    {realStats.avgScore !== null ? `~${((realStats.avgScore / 100) * 20).toFixed(1)} / 20` : 'En attente'}
                  </span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Flashcards révisées
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-blue-700 font-mono tabular-nums">
                    {realStats.totalFlashcardsReviewed}
                  </span>
                  <span className="block text-[11px] text-slate-500 mt-1">
                    Répétitions actives
                  </span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Sessions totales
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-indigo-700 font-mono tabular-nums">
                    {realStats.totalSessions}
                  </span>
                  <span className="block text-[11px] text-slate-500 mt-1">
                    Activités enregistrées
                  </span>
                </div>
              </div>

              {/* Matières les plus travaillées */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">
                    Matières les plus travaillées
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    Calculé d'après tes actions réelles
                  </span>
                </div>

                {realStats.sortedSubjects.length > 0 ? (
                  <div className="space-y-3">
                    {realStats.sortedSubjects.map(([subName, count], idx) => {
                      const maxCount = realStats.sortedSubjects[0][1] || 1;
                      const barPercent = Math.round((count / maxCount) * 100);
                      return (
                        <div key={subName} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-slate-800">
                              {idx + 1}. {subName}
                            </span>
                            <span className="font-mono text-slate-500 tabular-nums">
                              {count} interaction{count > 1 ? 's' : ''}
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-emerald-600 h-2 rounded-full transition-all"
                              style={{ width: `${barPercent}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">
                    Aucune matière révisée pour le moment.
                  </p>
                )}
              </div>

              {/* Évolution chronologique des résultats de quiz */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-slate-900">
                  Évolution des résultats de quiz
                </h3>

                {quizAttempts.length > 0 ? (
                  <div className="space-y-2">
                    {quizAttempts.map((attempt, index) => (
                      <div
                        key={attempt.id}
                        className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[11px] shrink-0">
                            #{index + 1}
                          </span>
                          <div>
                            <span className="font-bold text-slate-900 block">{attempt.subject}</span>
                            <span className="text-[11px] text-slate-400">{attempt.date}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-mono font-bold text-emerald-700 text-sm">
                            {attempt.percentage}%
                          </span>
                          <span className="block text-[11px] text-slate-500 font-mono">
                            {attempt.score} / {attempt.total}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">
                    Passe des quiz pour visualiser ta courbe de progression.
                  </p>
                )}
              </div>

            </div>
          )}

        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL : EDIT EXAM PLAN                               */}
      {/* ==================================================== */}
      {isEditingPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
              <h3 className="text-base font-bold text-slate-900">Configurer mon programme d'examen</h3>
              <button onClick={() => setIsEditingPlan(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveExamPlan} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nom de l'examen</label>
                <input
                  type="text"
                  placeholder="Ex: Partiels de Droit Constitutionnel, Examen Final PASS..."
                  value={examName}
                  onChange={(e) => setExamName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Matière principale</label>
                  <select
                    value={examSubject}
                    onChange={(e) => setExamSubject(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {availableSubjects.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Date de l'examen</label>
                  <input
                    type="date"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Temps disponible chaque jour (minutes)</label>
                <input
                  type="number"
                  min={15}
                  max={480}
                  step={15}
                  value={dailyMinutes}
                  onChange={(e) => setDailyMinutes(Number(e.target.value))}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Chapitres à réviser</label>
                <textarea
                  rows={3}
                  placeholder="Liste des chapitres ou parties clés du cours..."
                  value={examChapters}
                  onChange={(e) => setExamChapters(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Objectifs personnels</label>
                <input
                  type="text"
                  placeholder="Ex: Obtenir une note >= 14/20 pour valider avec mention"
                  value={personalGoal}
                  onChange={(e) => setPersonalGoal(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditingPlan(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700"
                >
                  Enregistrer l'examen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL : CREATE OR EDIT TASK                          */}
      {/* ==================================================== */}
      {isCreatingTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                {editingTask ? 'Modifier la tâche' : 'Ajouter une tâche de révision'}
              </h3>
              <button onClick={() => setIsCreatingTask(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTask} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Intitulé de la tâche</label>
                <input
                  type="text"
                  placeholder="Ex: Révise les fiches du chapitre 2 et fais 15 flashcards"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Matière</label>
                  <select
                    value={taskSubject}
                    onChange={(e) => setTaskSubject(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {availableSubjects.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Durée (minutes)</label>
                  <select
                    value={taskDuration}
                    onChange={(e) => setTaskDuration(Number(e.target.value))}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value={15}>15 minutes</option>
                    <option value={25}>25 minutes (Pomodoro)</option>
                    <option value={45}>45 minutes</option>
                    <option value={60}>60 minutes</option>
                    <option value={90}>90 minutes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Date d'échéance</label>
                <input
                  type="date"
                  value={taskDueDate}
                  onChange={(e) => setTaskDueDate(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreatingTask(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700"
                >
                  {editingTask ? 'Mettre à jour' : 'Enregistrer la tâche'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
