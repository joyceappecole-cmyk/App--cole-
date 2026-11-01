import React from 'react';
import { Download, WifiOff, Sun, Moon, Bell } from 'lucide-react';
import { FacultyId } from '../types';
import { getFacultyTabConfig } from '../data/facultySpecialization';

interface NavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  facultyId?: FacultyId | string;
  isInstallable: boolean;
  onInstall: () => void;
  isOnline: boolean;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  unreadNotificationsCount?: number;
  onOpenNotifications?: () => void;
  isBiblicalStudent?: boolean;
  studentAvatarUrl?: string;
  studentJoyMood?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  facultyId,
  isInstallable,
  onInstall,
  isOnline,
  isDarkMode,
  onToggleTheme,
  unreadNotificationsCount = 0,
  onOpenNotifications,
  isBiblicalStudent = false,
  studentAvatarUrl,
  studentJoyMood,
}) => {
  const tabConfig = getFacultyTabConfig(facultyId);

  const navItems = [
    { id: 'accueil', label: tabConfig.tabs.accueil.full },
    { id: 'cours', label: tabConfig.tabs.cours.full },
    { id: 'revisions', label: tabConfig.tabs.revisions.full },
    { id: 'programme', label: tabConfig.tabs.programme.full },
    ...(isBiblicalStudent 
      ? [{ id: 'espace-biblique', label: 'Espace Biblique' }] 
      : [{ id: 'bibliotheque', label: tabConfig.tabs.bibliotheque.full }]
    ),
    { id: 'profil', label: 'Mon profil' },
    { id: 'parametres', label: 'Paramètres' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Zone 1: Brand Wordmark with uploaded logo & Faculty specialization badge */}
        <button
          onClick={() => onTabChange('accueil')}
          className="flex items-center gap-2 sm:gap-2.5 text-left group shrink-0 min-w-0"
          title={`RéviGenius - Espace ${tabConfig.facultyBadge}`}
        >
          <img
            src="/logo.png"
            alt="Logo RéviGenius"
            className="w-8 h-8 sm:w-9 sm:h-9 object-contain rounded-xl shadow-xs border border-emerald-100 dark:border-emerald-900/50 group-hover:scale-105 transition-transform shrink-0"
          />
          <div className="truncate">
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                RéviGenius
              </span>
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100/70 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 truncate max-w-[130px] lg:max-w-[180px]">
                {tabConfig.facultyBadge}
              </span>
            </div>
            <span className="hidden xl:inline-block text-[11px] font-medium text-slate-400 dark:text-slate-500">
              {tabConfig.domainQuote}
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (visible on tablets md:flex and desktops) */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-xs lg:text-sm font-medium text-slate-600 dark:text-slate-300">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 px-1.5 lg:px-2 rounded-lg ${
                currentTab === item.id
                  ? 'text-emerald-600 dark:text-emerald-400 font-bold border-b-2 border-emerald-600 dark:border-emerald-400'
                  : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Actions (Notifications, Theme Toggle & Install/Session) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {!isOnline && (
            <div className="flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400 px-2 py-1 rounded-lg border border-amber-200 dark:border-amber-800">
              <WifiOff className="w-3 h-3" />
              <span className="hidden sm:inline">Hors-ligne</span>
            </div>
          )}

          {/* Bouton de Notifications avec badge non-lu */}
          {onOpenNotifications && (
            <button
              onClick={onOpenNotifications}
              type="button"
              aria-label="Ouvrir les notifications"
              title="Notifications et rappels d'études"
              className="relative flex items-center justify-center p-2 rounded-xl transition-all duration-200 border min-h-[36px] sm:min-h-[38px] min-w-[36px] sm:min-w-[38px] cursor-pointer active:scale-95 bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-700 shadow-2xs"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center shadow-xs">
                  {unreadNotificationsCount > 9 ? '9+' : unreadNotificationsCount}
                </span>
              )}
            </button>
          )}

          {/* Bouton pour basculer le thème Sombre / Éclairé */}
          <button
            onClick={onToggleTheme}
            type="button"
            aria-label={isDarkMode ? 'Activer le mode éclairé' : 'Activer le mode sombre'}
            title={isDarkMode ? 'Passer au thème clair' : 'Passer au thème sombre'}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-xl transition-all duration-200 border min-h-[36px] sm:min-h-[38px] cursor-pointer active:scale-95 bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-700 shadow-2xs"
          >
            {isDarkMode ? (
              <>
                <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-amber-300 font-semibold hidden xs:inline sm:inline">Clair</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-slate-700 shrink-0" />
                <span className="text-slate-700 font-semibold hidden xs:inline sm:inline">Sombre</span>
              </>
            )}
          </button>

          {isInstallable ? (
            <button
              onClick={onInstall}
              className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-sm shadow-emerald-600/20 whitespace-nowrap shrink-0 min-h-[36px] sm:min-h-[38px]"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Installer l'app</span>
              <span className="sm:hidden">Installer</span>
            </button>
          ) : (
            <button
              onClick={() => onTabChange('revisions')}
              className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors whitespace-nowrap shrink-0 min-h-[36px] sm:min-h-[38px] border border-emerald-200/60 dark:border-emerald-800/60"
            >
              <span className="hidden sm:inline">Session de révision</span>
              <span className="sm:hidden">Réviser</span>
            </button>
          )}

          {/* Bouton profil / avatar étudiant avec humeur joyeuse */}
          <button
            onClick={() => onTabChange('profil')}
            type="button"
            aria-label="Mon profil"
            title="Accéder à mon profil étudiant et humeur"
            className={`relative flex items-center justify-center rounded-xl p-1 transition-all duration-200 border min-h-[36px] sm:min-h-[38px] min-w-[36px] sm:min-w-[38px] cursor-pointer active:scale-95 ${
              currentTab === 'profil'
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 ring-2 ring-emerald-500/20'
                : 'border-slate-200 dark:border-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700'
            }`}
          >
            {studentAvatarUrl && studentAvatarUrl.startsWith('data:image') ? (
              <img
                src={studentAvatarUrl}
                alt="Avatar"
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg object-cover"
              />
            ) : studentAvatarUrl ? (
              <span className="text-base sm:text-lg leading-none">{studentAvatarUrl}</span>
            ) : (
              <span className="text-xs font-extrabold text-slate-700 dark:text-slate-200">🎓</span>
            )}
            <span className="absolute -bottom-1 -right-1 text-[10px] leading-none">
              {studentJoyMood === 'motive' ? '🚀' : studentJoyMood === 'rayonnant' ? '✨' : studentJoyMood === 'paisible' ? '🌿' : studentJoyMood === 'reconnaissant' ? '💛' : '😊'}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};
