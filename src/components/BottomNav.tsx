import { Home, BookOpen, Brain, Calendar, Library, User, Settings, Scroll, Scale, Stethoscope, Code2, TrendingUp, Compass, Microscope } from 'lucide-react';
import { FacultyId } from '../types';
import { getFacultyTabConfig } from '../data/facultySpecialization';

interface BottomNavProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  facultyId?: FacultyId | string;
  isBiblicalStudent?: boolean;
  studentAvatarUrl?: string;
  studentJoyMood?: string;
}

export const BottomNav: React.FC<BottomNavProps> = ({ 
  currentTab, 
  onTabChange,
  facultyId,
  isBiblicalStudent = false,
  studentAvatarUrl,
  studentJoyMood,
}) => {
  const tabConfig = getFacultyTabConfig(facultyId);

  // Specialized icon for Courses & Revisions based on domain
  const getCourseIcon = () => {
    if (facultyId === 'droit') return Scale;
    if (facultyId === 'medecine_sante' || facultyId === 'pharmacie' || facultyId === 'sciences_infirmieres') return Stethoscope;
    if (facultyId === 'informatique') return Code2;
    if (facultyId === 'eco_gestion') return TrendingUp;
    if (facultyId === 'architecture' || facultyId === 'sciences_ingenierie') return Compass;
    if (facultyId === 'agronomie_env') return Microscope;
    return BookOpen;
  };

  const CourseIcon = getCourseIcon();

  const tabs = [
    { id: 'accueil', label: tabConfig.tabs.accueil.short, hint: tabConfig.tabs.accueil.hint, icon: Home },
    { id: 'cours', label: tabConfig.tabs.cours.short, hint: tabConfig.tabs.cours.hint, icon: CourseIcon },
    { id: 'revisions', label: tabConfig.tabs.revisions.short, hint: tabConfig.tabs.revisions.hint, icon: Brain },
    { id: 'programme', label: tabConfig.tabs.programme.short, hint: tabConfig.tabs.programme.hint, icon: Calendar },
    ...(isBiblicalStudent 
      ? [{ id: 'espace-biblique', label: 'Bible', hint: 'Espace Biblique & Exégèse', icon: Scroll }] 
      : [{ id: 'bibliotheque', label: tabConfig.tabs.bibliotheque.short, hint: tabConfig.tabs.bibliotheque.hint, icon: Library }]
    ),
    { id: 'profil', label: 'Profil', hint: 'Mon profil & joies', icon: User },
    { id: 'parametres', label: 'Réglages', hint: 'Paramètres & options', icon: Settings },
  ];

  return (
    <nav
      aria-label="Navigation mobile principale"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 pb-safe shadow-[0_-4px_16px_rgba(0,0,0,0.06)] transition-colors duration-200"
    >
      <div className="grid grid-cols-7 items-center h-16 max-w-lg mx-auto px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          const isProfileTab = tab.id === 'profil';

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center h-full min-h-[44px] py-1 transition-all active:scale-95 cursor-pointer relative ${
                isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title={tab.label}
            >
              {isProfileTab && studentAvatarUrl ? (
                <div className={`w-5 h-5 rounded-full overflow-hidden border flex items-center justify-center ${isActive ? 'border-emerald-600 dark:border-emerald-400 scale-110' : 'border-slate-300 dark:border-slate-600'}`}>
                  {studentAvatarUrl.startsWith('data:image') ? (
                    <img src={studentAvatarUrl} alt="Profil" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[11px] leading-none">{studentAvatarUrl}</span>
                  )}
                </div>
              ) : (
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${isActive ? 'scale-110 text-emerald-600 dark:text-emerald-400' : ''}`} />
              )}
              <span className={`text-[9.5px] sm:text-[10px] mt-1 tracking-tight truncate max-w-[44px] ${isActive ? 'font-bold' : 'font-medium'}`}>
                {tab.label}
              </span>
              {isActive ? (
                <span className="w-1 h-1 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-0.5" />
              ) : (
                <span className="w-1 h-1 mt-0.5 opacity-0" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
