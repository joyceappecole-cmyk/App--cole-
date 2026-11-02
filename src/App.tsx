/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';
import { CoursesView } from './components/CoursesView';
import { RevisionsView } from './components/RevisionsView';
import { ScheduleView } from './components/ScheduleView';
import { LibraryView } from './components/LibraryView';
import { DigitalBibleView } from './components/DigitalBibleView';
import { BiblicalStudiesView } from './components/BiblicalStudiesView';
import { ProfileView } from './components/ProfileView';
import { ProgressionView } from './components/ProgressionView';
import { SettingsView } from './components/SettingsView';
import { QuizModal } from './components/QuizModal';
import { NotificationModal } from './components/NotificationModal';
import { BeginnerTourModal } from './components/BeginnerTourModal';
import { PremiumShowcaseModal } from './components/PremiumShowcaseModal';
import { notificationService } from './services/notificationService';
import { usePWA } from './hooks/usePWA';
import { dbService } from './services/db';
import { 
  INITIAL_COURSES, 
  INITIAL_FLASHCARDS, 
  INITIAL_STUDENT_PROFILE, 
  INITIAL_SUMMARY_SHEETS,
  INITIAL_QUIZ_QUESTIONS,
  INITIAL_QUIZ_ATTEMPTS,
  INITIAL_EXAM_PLAN,
  INITIAL_PLAN_TASKS,
  STUDY_TIPS,
  INITIAL_SCHEDULE
} from './data/mockData';
import { 
  Course, 
  Flashcard, 
  ScheduleItem, 
  StudentProfile, 
  SummarySheet, 
  QuizQuestion, 
  QuizAttempt, 
  ExamPlan, 
  PlanTask 
} from './types';

const STORAGE_KEYS = {
  ONBOARDING_SEEN: 'revigenius_onboarding_seen_v1',
  PROFILE: 'revigenius_student_profile',
  SHEETS: 'revigenius_summary_sheets',
  FLASHCARDS: 'revigenius_flashcards_srs',
  QUIZ_QUESTIONS: 'revigenius_quiz_questions',
  QUIZ_ATTEMPTS: 'revigenius_quiz_attempts',
  EXAM_PLAN: 'revigenius_exam_plan',
  PLAN_TASKS: 'revigenius_plan_tasks',
  THEME_MODE: 'revigenius_theme_mode',
};

export default function App() {
  // Theme state (Clair / Sombre)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME_MODE);
      if (saved) return saved === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem(STORAGE_KEYS.THEME_MODE, 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem(STORAGE_KEYS.THEME_MODE, 'light');
      }
    } catch (e) {
      console.warn('Theme storage error:', e);
    }
  }, [isDarkMode]);

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // PWA & Connectivity
  const { isInstallable, isInstalled, isIOS, isOnline, installApp } = usePWA();

  // Navigation tab
  const [currentTab, setCurrentTab] = useState<string>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const requestedTab = params.get('tab');
      return requestedTab || 'accueil';
    } catch {
      return 'accueil';
    }
  });

  // Onboarding presentation state
  const [showOnboarding, setShowOnboarding] = useState<boolean>(() => {
    try {
      const seen = localStorage.getItem(STORAGE_KEYS.ONBOARDING_SEEN);
      return !seen;
    } catch {
      return true;
    }
  });

  // Modal state for standalone quick quiz
  const [isQuickQuizOpen, setIsQuickQuizOpen] = useState(false);

  // Beginner Mode Tour & Premium Showcase Modals
  const [isBeginnerTourOpen, setIsBeginnerTourOpen] = useState(false);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);

  // Modal state for in-app Notifications & Reminders
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState<number>(() => {
    return notificationService.getUnreadCount();
  });

  useEffect(() => {
    const updateUnread = () => {
      setUnreadNotificationsCount(notificationService.getUnreadCount());
    };
    window.addEventListener('revigenius:new_notification', updateUnread);
    window.addEventListener('revigenius:notifications_updated', updateUnread);
    return () => {
      window.removeEventListener('revigenius:new_notification', updateUnread);
      window.removeEventListener('revigenius:notifications_updated', updateUnread);
    };
  }, []);

  // 1. Student Profile
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Nettoyage : éviter de conserver l'ancien nom d'exemple fictif
        if (parsed.name === 'Alexandre Martin') {
          parsed.name = '';
        }
        return {
          ...INITIAL_STUDENT_PROFILE,
          ...parsed,
        };
      }
      return INITIAL_STUDENT_PROFILE;
    } catch {
      return INITIAL_STUDENT_PROFILE;
    }
  });

  // 2. Courses (IndexedDB)
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);

  useEffect(() => {
    async function loadIndexedDbCourses() {
      try {
        const stored = await dbService.getAllCourses();
        if (stored && stored.length > 0) {
          const loadedCourses: Course[] = stored.map((item) => ({
            id: item.id,
            title: item.title,
            subject: item.subject,
            description: item.description,
            createdAt: item.createdAt,
            createdAtTimestamp: item.createdAtTimestamp,
            hasPdf: item.hasPdf,
            pdfFileName: item.pdfFileName,
            pdfFileSize: item.pdfFileSize,
            pdfFileId: item.pdfFileId,
            facultyId: item.facultyId || studentProfile.facultyId,
            chapterCount: 3,
            completedChapters: 1,
          }));
          setCourses(loadedCourses);
        } else {
          // Seed initial courses into IndexedDB
          for (const initCourse of INITIAL_COURSES) {
            await dbService.saveCourseWithPdf({
              id: initCourse.id,
              title: initCourse.title,
              subject: initCourse.subject,
              description: initCourse.description,
              createdAt: initCourse.createdAt,
              createdAtTimestamp: initCourse.createdAtTimestamp,
              hasPdf: initCourse.hasPdf,
              pdfFileName: initCourse.pdfFileName,
              pdfFileSize: initCourse.pdfFileSize,
              facultyId: initCourse.facultyId,
            });
          }
          setCourses(INITIAL_COURSES);
        }
      } catch (err) {
        console.warn('Could not load from IndexedDB, using local state:', err);
      }
    }

    loadIndexedDbCourses();
  }, [studentProfile.facultyId]);

  // 3. Fiches de révision (Summary Sheets)
  const [sheets, setSheets] = useState<SummarySheet[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SHEETS);
      return saved ? JSON.parse(saved) : INITIAL_SUMMARY_SHEETS;
    } catch {
      return INITIAL_SUMMARY_SHEETS;
    }
  });

  // 4. Flashcards (SRS)
  const [flashcards, setFlashcards] = useState<Flashcard[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FLASHCARDS);
      return saved ? JSON.parse(saved) : INITIAL_FLASHCARDS;
    } catch {
      return INITIAL_FLASHCARDS;
    }
  });

  // 5. Quiz Questions
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUIZ_QUESTIONS);
      return saved ? JSON.parse(saved) : INITIAL_QUIZ_QUESTIONS;
    } catch {
      return INITIAL_QUIZ_QUESTIONS;
    }
  });

  // 6. Quiz Attempts (History)
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUIZ_ATTEMPTS);
      return saved ? JSON.parse(saved) : INITIAL_QUIZ_ATTEMPTS;
    } catch {
      return INITIAL_QUIZ_ATTEMPTS;
    }
  });

  // 7. Exam Plan
  const [examPlan, setExamPlan] = useState<ExamPlan | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EXAM_PLAN);
      return saved ? JSON.parse(saved) : INITIAL_EXAM_PLAN;
    } catch {
      return INITIAL_EXAM_PLAN;
    }
  });

  // 8. Plan Tasks
  const [tasks, setTasks] = useState<PlanTask[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PLAN_TASKS);
      return saved ? JSON.parse(saved) : INITIAL_PLAN_TASKS;
    } catch {
      return INITIAL_PLAN_TASKS;
    }
  });

  // Persist Profile
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(studentProfile));
    } catch (e) {
      console.warn('Storage save error:', e);
    }
  }, [studentProfile]);

  // Persist Sheets
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SHEETS, JSON.stringify(sheets));
    } catch (e) {
      console.warn('Storage save error:', e);
    }
  }, [sheets]);

  // Persist Flashcards
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FLASHCARDS, JSON.stringify(flashcards));
    } catch (e) {
      console.warn('Storage save error:', e);
    }
  }, [flashcards]);

  // Persist Quiz Questions
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.QUIZ_QUESTIONS, JSON.stringify(quizQuestions));
    } catch (e) {
      console.warn('Storage save error:', e);
    }
  }, [quizQuestions]);

  // Persist Quiz Attempts
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.QUIZ_ATTEMPTS, JSON.stringify(quizAttempts));
    } catch (e) {
      console.warn('Storage save error:', e);
    }
  }, [quizAttempts]);

  // Persist Exam Plan
  useEffect(() => {
    try {
      if (examPlan) {
        localStorage.setItem(STORAGE_KEYS.EXAM_PLAN, JSON.stringify(examPlan));
      }
    } catch (e) {
      console.warn('Storage save error:', e);
    }
  }, [examPlan]);

  // Persist Tasks
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PLAN_TASKS, JSON.stringify(tasks));
    } catch (e) {
      console.warn('Storage save error:', e);
    }
  }, [tasks]);

  // Onboarding & Mandatory Configuration Complete
  const handleCompleteOnboarding = (configuredProfile: StudentProfile) => {
    setStudentProfile(configuredProfile);
    setShowOnboarding(false);
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(configuredProfile));
      localStorage.setItem(STORAGE_KEYS.ONBOARDING_SEEN, 'true');
    } catch (e) {
      console.warn('Storage error:', e);
    }
  };

  const handleReplayOnboarding = () => {
    setShowOnboarding(true);
  };

  // Courses Handlers
  const handleCourseAdded = (newCourse: Course) => {
    setCourses((prev) => [newCourse, ...prev]);
  };

  const handleCourseDeleted = (courseId: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
  };

  // Sheets Handlers
  const handleAddSheet = (newSheet: SummarySheet) => {
    setSheets((prev) => [newSheet, ...prev]);
  };

  const handleUpdateSheet = (updated: SummarySheet) => {
    setSheets((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };

  const handleDeleteSheet = (sheetId: string) => {
    setSheets((prev) => prev.filter((s) => s.id !== sheetId));
  };

  // Flashcards Handlers (with Spaced Repetition calculation)
  const handleAddFlashcard = (newCard: Flashcard) => {
    setFlashcards((prev) => [newCard, ...prev]);
  };

  const handleRateFlashcard = (cardId: string, rating: 'difficile' | 'moyen' | 'facile') => {
    const today = new Date();
    setFlashcards((prev) =>
      prev.map((card) => {
        if (card.id !== cardId) return card;

        let intervalDays = 1;
        if (rating === 'difficile') {
          intervalDays = 1; // Revoir dès demain
        } else if (rating === 'moyen') {
          intervalDays = 3; // Revoir dans 3 jours
        } else if (rating === 'facile') {
          intervalDays = Math.max(7, (card.intervalDays || 1) * 2); // Espace croissant
        }

        const nextDate = new Date(today);
        nextDate.setDate(nextDate.getDate() + intervalDays);
        const nextReviewDate = nextDate.toISOString().split('T')[0];

        return {
          ...card,
          masteryLevel: rating,
          intervalDays,
          nextReviewDate,
          reviewCount: (card.reviewCount || 0) + 1,
          lastReviewedAt: today.toISOString().split('T')[0],
        };
      })
    );
  };

  const handleDeleteFlashcard = (cardId: string) => {
    setFlashcards((prev) => prev.filter((f) => f.id !== cardId));
  };

  // Quiz Handlers
  const handleAddQuizQuestion = (newQ: QuizQuestion) => {
    setQuizQuestions((prev) => [...prev, newQ]);
  };

  const handleRecordQuizAttempt = (attempt: QuizAttempt) => {
    setQuizAttempts((prev) => [attempt, ...prev]);
  };

  // Exam Plan & Task Handlers
  const handleUpdateExamPlan = (plan: ExamPlan) => {
    setExamPlan(plan);
  };

  const handleAddTask = (newTask: PlanTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleUpdateTask = (updated: PlanTask) => {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const nowCompleted = !t.completed;
        return {
          ...t,
          completed: nowCompleted,
          completedAt: nowCompleted ? new Date().toISOString() : undefined,
        };
      })
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  // Reset Demo Data
  const handleResetData = async () => {
    setCourses(INITIAL_COURSES);
    setFlashcards(INITIAL_FLASHCARDS);
    setSheets(INITIAL_SUMMARY_SHEETS);
    setQuizQuestions(INITIAL_QUIZ_QUESTIONS);
    setQuizAttempts(INITIAL_QUIZ_ATTEMPTS);
    setExamPlan(INITIAL_EXAM_PLAN);
    setTasks(INITIAL_PLAN_TASKS);
    setStudentProfile(INITIAL_STUDENT_PROFILE);
    try {
      localStorage.removeItem(STORAGE_KEYS.PROFILE);
      localStorage.removeItem(STORAGE_KEYS.SHEETS);
      localStorage.removeItem(STORAGE_KEYS.FLASHCARDS);
      localStorage.removeItem(STORAGE_KEYS.QUIZ_QUESTIONS);
      localStorage.removeItem(STORAGE_KEYS.QUIZ_ATTEMPTS);
      localStorage.removeItem(STORAGE_KEYS.EXAM_PLAN);
      localStorage.removeItem(STORAGE_KEYS.PLAN_TASKS);
    } catch (e) {
      console.warn('Storage reset warning:', e);
    }
  };

  // Restaurer complètement l'application dès la présentation de bienvenue
  const handleRestoreFromBeginning = async () => {
    // 1. Réinitialiser tout l'état React aux valeurs par défaut
    setStudentProfile(INITIAL_STUDENT_PROFILE);
    setCourses(INITIAL_COURSES);
    setSheets(INITIAL_SUMMARY_SHEETS);
    setFlashcards(INITIAL_FLASHCARDS);
    setQuizQuestions(INITIAL_QUIZ_QUESTIONS);
    setQuizAttempts(INITIAL_QUIZ_ATTEMPTS);
    setExamPlan(INITIAL_EXAM_PLAN);
    setTasks(INITIAL_PLAN_TASKS);

    // 2. Nettoyer tout le stockage local de l'utilisateur
    try {
      localStorage.removeItem(STORAGE_KEYS.ONBOARDING_SEEN);
      localStorage.removeItem(STORAGE_KEYS.PROFILE);
      localStorage.removeItem(STORAGE_KEYS.SHEETS);
      localStorage.removeItem(STORAGE_KEYS.FLASHCARDS);
      localStorage.removeItem(STORAGE_KEYS.QUIZ_QUESTIONS);
      localStorage.removeItem(STORAGE_KEYS.QUIZ_ATTEMPTS);
      localStorage.removeItem(STORAGE_KEYS.EXAM_PLAN);
      localStorage.removeItem(STORAGE_KEYS.PLAN_TASKS);
      localStorage.removeItem('revigenius_in_app_notifications_v1');
      localStorage.removeItem('revigenius_notifications_enabled_v1');
      localStorage.removeItem('revigenius_last_reminder_date_v1');
      localStorage.removeItem('revigenius_bible_study_notes');
    } catch (e) {
      console.warn('Storage reset warning:', e);
    }

    // 3. Vider la base IndexedDB et réinsérer les cours de démonstration par défaut
    try {
      await dbService.clearAll();
      for (const initCourse of INITIAL_COURSES) {
        await dbService.saveCourseWithPdf({
          id: initCourse.id,
          title: initCourse.title,
          subject: initCourse.subject,
          description: initCourse.description,
          createdAt: initCourse.createdAt,
          createdAtTimestamp: initCourse.createdAtTimestamp,
          hasPdf: initCourse.hasPdf,
          pdfFileName: initCourse.pdfFileName,
          pdfFileSize: initCourse.pdfFileSize,
          facultyId: initCourse.facultyId,
        });
      }
    } catch (err) {
      console.warn('Erreur réinitialisation IndexedDB:', err);
    }

    // 4. Réinitialiser les notifications par défaut
    notificationService.resetToDefaults();
    setUnreadNotificationsCount(notificationService.getUnreadCount());

    // 5. Basculer vers l'accueil et lancer immédiatement la présentation d'accueil
    setCurrentTab('accueil');
    setShowOnboarding(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col antialiased selection:bg-emerald-100 dark:selection:bg-emerald-950 selection:text-emerald-900 dark:selection:text-emerald-300 font-sans transition-colors duration-200">
      
      {/* 1. Top Bar */}
      <Navbar
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        facultyId={studentProfile.facultyId}
        isInstallable={isInstallable}
        onInstall={installApp}
        isOnline={isOnline}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
        unreadNotificationsCount={unreadNotificationsCount}
        onOpenNotifications={() => setIsNotificationModalOpen(true)}
        isBiblicalStudent={studentProfile.facultyId === 'etudes_bibliques_theologie'}
        studentAvatarUrl={studentProfile.avatarUrl}
        studentJoyMood={studentProfile.joyMood}
      />

      {/* 2. Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-3 sm:pt-6 pb-28 md:pb-12 overflow-x-hidden">
        {currentTab === 'accueil' && (
          <Dashboard
            studentProfile={studentProfile}
            courses={courses}
            flashcards={flashcards}
            schedule={INITIAL_SCHEDULE}
            tips={STUDY_TIPS}
            tasks={tasks}
            quizAttempts={quizAttempts}
            examPlan={examPlan}
            sheets={sheets}
            onNavigateTab={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenQuiz={() => {
              setCurrentTab('revisions');
            }}
            onOpenSchedule={() => {
              setCurrentTab('programme');
            }}
            onSelectCourse={() => {
              setCurrentTab('cours');
            }}
            onOpenBeginnerTour={() => setIsBeginnerTourOpen(true)}
            onOpenPremiumModal={() => setIsPremiumModalOpen(true)}
          />
        )}

        {currentTab === 'cours' && (
          <CoursesView
            courses={courses}
            availableSubjects={studentProfile.mainSubjects}
            currentFacultyId={studentProfile.facultyId}
            facultyBadge={studentProfile.facultyName}
            onCourseAdded={handleCourseAdded}
            onCourseDeleted={handleCourseDeleted}
          />
        )}

        {currentTab === 'revisions' && (
          <RevisionsView
            sheets={sheets}
            onAddSheet={handleAddSheet}
            onUpdateSheet={handleUpdateSheet}
            onDeleteSheet={handleDeleteSheet}
            flashcards={flashcards}
            onAddFlashcard={handleAddFlashcard}
            onRateFlashcard={handleRateFlashcard}
            onDeleteFlashcard={handleDeleteFlashcard}
            quizQuestions={quizQuestions}
            quizAttempts={quizAttempts}
            onAddQuizQuestion={handleAddQuizQuestion}
            onRecordQuizAttempt={handleRecordQuizAttempt}
            availableSubjects={studentProfile.mainSubjects}
            facultyId={studentProfile.facultyId}
            facultyBadge={studentProfile.facultyName}
          />
        )}

        {currentTab === 'programme' && (
          <ScheduleView
            examPlan={examPlan}
            onUpdateExamPlan={handleUpdateExamPlan}
            tasks={tasks}
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            quizAttempts={quizAttempts}
            flashcards={flashcards}
            courses={courses}
            availableSubjects={studentProfile.mainSubjects}
            facultyId={studentProfile.facultyId}
          />
        )}

          {currentTab === 'bibliotheque' && (
            <LibraryView
              studentFacultyId={studentProfile.facultyId}
              studentFacultyName={studentProfile.facultyName}
              studentCountry={studentProfile.country}
            />
          )}

          {currentTab === 'bible-numerique' && (
            <DigitalBibleView
              onNavigateTab={(tab) => {
                setCurrentTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {currentTab === 'espace-biblique' && (
            <BiblicalStudiesView
              studentName={studentProfile.name}
              onNavigateTab={(tab) => {
                setCurrentTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {currentTab === 'progression' && (
            <ProgressionView
              studentProfile={studentProfile}
              courses={courses}
              flashcards={flashcards}
              tasks={tasks}
              quizAttempts={quizAttempts}
              examPlan={examPlan}
              onNavigateTab={(tab) => {
                setCurrentTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {currentTab === 'profil' && (
            <ProfileView
              profile={studentProfile}
              onUpdateProfile={(updated) => setStudentProfile(updated)}
            />
          )}

          {currentTab === 'parametres' && (
            <SettingsView
              onReplayOnboarding={handleReplayOnboarding}
              onReplayBeginnerTour={() => setIsBeginnerTourOpen(true)}
              onOpenPremiumModal={() => setIsPremiumModalOpen(true)}
              isInstallable={isInstallable}
              isInstalled={isInstalled}
              isIOS={isIOS}
              onInstallApp={installApp}
              onResetData={handleResetData}
              onRestoreFromBeginning={handleRestoreFromBeginning}
              isDarkMode={isDarkMode}
              onToggleTheme={handleToggleTheme}
              onOpenNotifications={() => setIsNotificationModalOpen(true)}
            />
          )}
      </main>

      {/* 3. Mobile Bottom Navigation (Visible on Android / Mobile screens) */}
      <BottomNav
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        facultyId={studentProfile.facultyId}
        isBiblicalStudent={studentProfile.facultyId === 'etudes_bibliques_theologie'}
        studentAvatarUrl={studentProfile.avatarUrl}
        studentJoyMood={studentProfile.joyMood}
      />

      {/* 4. Onboarding Presentation & Mandatory Configuration Modal */}
      {showOnboarding && (
        <Onboarding
          currentProfile={studentProfile}
          onComplete={handleCompleteOnboarding}
        />
      )}

      {/* 5. Standalone Quick Quiz Modal if launched */}
      {isQuickQuizOpen && (
        <QuizModal
          questions={quizQuestions}
          isOpen={isQuickQuizOpen}
          onClose={() => setIsQuickQuizOpen(false)}
        />
      )}

      {/* 6. In-App Notifications Modal */}
      {isNotificationModalOpen && (
        <NotificationModal
          isOpen={isNotificationModalOpen}
          onClose={() => setIsNotificationModalOpen(false)}
          onNavigateTab={(tab) => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* 7. Mode Débutant : Guide pas à pas interactif */}
      {isBeginnerTourOpen && (
        <BeginnerTourModal
          isOpen={isBeginnerTourOpen}
          onClose={() => setIsBeginnerTourOpen(false)}
          onNavigateTab={(tab) => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* 8. Présentation de la Version Premium (Futur) */}
      {isPremiumModalOpen && (
        <PremiumShowcaseModal
          isOpen={isPremiumModalOpen}
          onClose={() => setIsPremiumModalOpen(false)}
        />
      )}

    </div>
  );
}
