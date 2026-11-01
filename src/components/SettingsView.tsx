import React, { useState } from 'react';
import { 
  Sparkles, 
  Download, 
  Smartphone, 
  RotateCcw, 
  Wifi, 
  Info, 
  Check, 
  ShieldCheck, 
  ExternalLink,
  Laptop,
  CheckCircle2,
  Sun,
  Moon,
  Palette,
  Bell,
  Send,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { notificationService } from '../services/notificationService';

interface SettingsViewProps {
  onReplayOnboarding: () => void;
  isInstallable: boolean;
  isInstalled: boolean;
  isIOS: boolean;
  onInstallApp: () => void;
  onResetData: () => void;
  onRestoreFromBeginning: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenNotifications?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  onReplayOnboarding,
  isInstallable,
  isInstalled,
  isIOS,
  onInstallApp,
  onResetData,
  onRestoreFromBeginning,
  isDarkMode,
  onToggleTheme,
  onOpenNotifications,
}) => {
  const [resetFeedback, setResetFeedback] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [showConfirmRestoreModal, setShowConfirmRestoreModal] = useState(false);
  const [notifTestFeedback, setNotifTestFeedback] = useState(false);
  const [notifPermission, setNotifPermission] = useState<NotificationPermission>(() => {
    return notificationService.getPermissionStatus();
  });

  const handleReset = () => {
    onResetData();
    setResetFeedback(true);
    setTimeout(() => setResetFeedback(false), 2500);
  };

  const handleConfirmRestoreAll = () => {
    setShowConfirmRestoreModal(false);
    onRestoreFromBeginning();
  };

  return (
    <div className="space-y-6 pb-20 md:pb-12 max-w-4xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Paramètres & Configuration
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Personnalise ton expérience d'étude, gère le thème clair/sombre, l'installation PWA et revois l'introduction.
        </p>
      </div>

      {/* 1. Présentation de bienvenue (Onboarding replay) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Présentation de bienvenue
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
            Tu souhaites revoir les écrans de présentation de bienvenue de RéviGenius et reconfigurer ton profil d'études ?
          </p>
        </div>

        <button
          onClick={onReplayOnboarding}
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-sm shadow-emerald-600/20 whitespace-nowrap shrink-0 min-h-[44px] flex items-center justify-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Revoir la présentation & profil</span>
        </button>
      </div>

      {/* 2. PWA & Android Installation */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
        <div className="flex items-center gap-2.5">
          <Smartphone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Installation sur smartphone (PWA & Android)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Installe RéviGenius sur l'écran d'accueil de ton smartphone sans passer par un magasin d'applications.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
            <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200">
              {isInstalled ? (
                <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                  <Check className="w-4 h-4" /> Application installée en mode autonome
                </span>
              ) : isInstallable ? (
                <span className="text-blue-700 dark:text-blue-400">Prêt pour installation sur cet appareil</span>
              ) : isIOS ? (
                <span className="text-slate-700 dark:text-slate-300">Disponible via Safari sur iPhone / iPad</span>
              ) : (
                <span className="text-slate-600 dark:text-slate-400">Application PWA conforme (Manifeste & Service Worker actifs)</span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Permet l'accès instantané hors connexion et une expérience plein écran sans barre d'adresse de navigateur.
            </p>
          </div>

          <div>
            {isInstalled ? (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60">
                <Check className="w-3.5 h-3.5" /> Installé
              </span>
            ) : isInstallable ? (
              <button
                onClick={onInstallApp}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm shadow-blue-600/20 whitespace-nowrap min-h-[44px] cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Installer sur Android / PC</span>
              </button>
            ) : isIOS ? (
              <button
                onClick={() => setShowIOSModal(true)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 min-h-[40px] cursor-pointer"
              >
                Guide pour iPhone / iPad
              </button>
            ) : (
              <button
                onClick={onInstallApp}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 min-h-[40px] cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Installer l'application</span>
              </button>
            )}
          </div>
        </div>

        {/* iOS Modal instructions */}
        {showIOSModal && (
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-2">
            <strong className="block font-bold">Installation sous iOS Safari :</strong>
            <p>1. Appuie sur le bouton <strong>Partager</strong> (icône avec un carré et une flèche vers le haut dans Safari).</p>
            <p>2. Fais défiler les options et sélectionne <strong>Sur l'écran d'accueil</strong>.</p>
            <button
              onClick={() => setShowIOSModal(false)}
              className="mt-2 text-xs font-bold text-blue-700 hover:underline"
            >
              Compris, fermer
            </button>
          </div>
        )}
      </div>

      {/* 3. Statut Mode Hors-Ligne & Données Locales */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3.5 transition-colors">
        <div className="flex items-center gap-2.5">
          <Wifi className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              État du mode hors ligne & Stockage local
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Vérification des briques de fonctionnement 100% autonome de RéviGenius
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs">
          <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-emerald-950 dark:text-emerald-200 block">Interface mise en cache</strong>
              <span className="text-emerald-800 dark:text-emerald-400 text-[11px]">Service Worker actif (`/sw.js`), coquille applicative prête.</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-emerald-950 dark:text-emerald-200 block">Cours & Documents PDF</strong>
              <span className="text-emerald-800 dark:text-emerald-400 text-[11px]">Conservés dans la base IndexedDB de l'appareil.</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-emerald-950 dark:text-emerald-200 block">Fiches, Flashcards & Quiz</strong>
              <span className="text-emerald-800 dark:text-emerald-400 text-[11px]">Répétition espacée (SRS) et calcul des notes hors ligne.</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-emerald-950 dark:text-emerald-200 block">Programme & Statistiques</strong>
              <span className="text-emerald-800 dark:text-emerald-400 text-[11px]">Calendrier des examens et progression stockés localement.</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Thème d'affichage (Clair / Sombre) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
        <div className="flex items-center gap-2.5">
          <Palette className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Thème d'affichage
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Adapte le confort visuel selon ton environnement de révision (jour ou nuit).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Option Mode Éclairé */}
          <button
            onClick={() => {
              if (isDarkMode) onToggleTheme();
            }}
            type="button"
            className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 cursor-pointer ${
              !isDarkMode
                ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-500 shadow-xs ring-2 ring-emerald-500/20'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <div className={`p-2 rounded-xl shrink-0 ${!isDarkMode ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
              <Sun className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className={`text-sm font-bold ${!isDarkMode ? 'text-emerald-950 dark:text-emerald-300' : 'text-slate-800 dark:text-slate-200'}`}>
                  Thème Clair (Éclairé)
                </span>
                {!isDarkMode && (
                  <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                    Actif
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Fond blanc épuré, contraste optimal en plein jour et typographie nette.
              </p>
            </div>
          </button>

          {/* Option Mode Sombre */}
          <button
            onClick={() => {
              if (!isDarkMode) onToggleTheme();
            }}
            type="button"
            className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 cursor-pointer ${
              isDarkMode
                ? 'bg-emerald-950/40 border-emerald-500 shadow-xs ring-2 ring-emerald-500/20'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <div className={`p-2 rounded-xl shrink-0 ${isDarkMode ? 'bg-emerald-500 text-slate-950' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
              <Moon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className={`text-sm font-bold ${isDarkMode ? 'text-emerald-300' : 'text-slate-800 dark:text-slate-200'}`}>
                  Thème Sombre
                </span>
                {isDarkMode && (
                  <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-800">
                    Actif
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Palette sombre et reposante, réduit la fatigue oculaire lors des sessions de nuit.
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* 5. Notifications & Rappels d'études */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
        <div className="flex items-center gap-2.5">
          <Bell className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Notifications & Rappels d'études
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Reçois des rappels directement sur ton appareil pour tes cartes mémoires, ton planning et tes examens.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2 font-bold">
              {notifPermission === 'granted' ? (
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <Check className="w-4 h-4" />
                  Notifications système autorisées
                </span>
              ) : notifPermission === 'denied' ? (
                <span className="text-amber-600 dark:text-amber-400">
                  Notifications bloquées dans les paramètres du navigateur
                </span>
              ) : (
                <span className="text-blue-600 dark:text-blue-400">
                  Autorisation en attente (clique pour activer)
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Les notifications in-app fonctionnent en continu pour t'alerter des séances dues et des versets du jour.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {notifPermission !== 'granted' && (
              <button
                type="button"
                onClick={async () => {
                  const granted = await notificationService.requestPermission();
                  setNotifPermission(granted ? 'granted' : 'denied');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all shadow-xs cursor-pointer min-h-[38px]"
              >
                Activer les notifications
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                notificationService.sendNotification({
                  title: 'Rappel RéviGenius 💡',
                  message: 'Tes fiches et cartes mémoires t\'attendent pour une révision rapide de 10 minutes !',
                  type: 'reminder',
                  linkTab: 'revisions',
                });
                setNotifTestFeedback(true);
                setTimeout(() => setNotifTestFeedback(false), 2000);
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer min-h-[38px]"
            >
              {notifTestFeedback ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Send className="w-3.5 h-3.5 text-emerald-600" />}
              <span>{notifTestFeedback ? 'Envoyé !' : 'Tester un rappel'}</span>
            </button>

            {onOpenNotifications && (
              <button
                type="button"
                onClick={onOpenNotifications}
                className="px-3 py-2 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 transition-colors cursor-pointer min-h-[38px]"
              >
                Voir l'historique
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 6. Données de démonstration & Réinitialisation */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Données de démonstration
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
            Réinitialise les cours d'exemple, flashcards et sessions d'étude à leur état initial de démonstration.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0 min-h-[40px] flex items-center gap-1.5 cursor-pointer"
        >
          {resetFeedback ? (
            <>
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">Données réinitialisées</span>
            </>
          ) : (
            <>
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurer l'exemple</span>
            </>
          )}
        </button>
      </div>

      {/* 7. Restaurer l'application dès la présentation (Recommencer toute l'application) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-rose-200/70 dark:border-rose-900/40 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Restaurer l'application dès la présentation initiale
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
            Tu souhaites recommencer l'application de zéro ? Cette option réinitialise toutes les données (profil, filière, cours, planning, flashcards) et relance la présentation de bienvenue comme lors du premier lancement.
          </p>
        </div>

        <button
          onClick={() => setShowConfirmRestoreModal(true)}
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 active:scale-[0.98] transition-all shadow-sm shadow-rose-600/20 whitespace-nowrap shrink-0 min-h-[44px] flex items-center justify-center gap-2 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Restaurer dès la présentation</span>
        </button>
      </div>

      {/* 8. À propos de RéviGenius */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Logo RéviGenius"
            className="w-10 h-10 object-contain rounded-xl border border-emerald-100 dark:border-emerald-900/60 p-0.5"
          />
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
              À propos de RéviGenius
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Application éducative pour étudiants universitaires</p>
          </div>
        </div>

        <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            <strong className="text-slate-900 dark:text-white">Slogan : </strong>
            « Comprends tes cours. Maîtrise tes connaissances. Réussis tes examens. »
          </p>
          <p>
            <strong className="text-slate-900 dark:text-white">Objectif académique : </strong>
            Accompagner les étudiants de premier, deuxième et troisième cycles universitaires dans l'application des méthodes d'apprentissage éprouvées (rappel actif, fiches de révision, répétition espacée et cartographie des bibliothèques universitaires).
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
          <span>RéviGenius · Application d'Études Universitaires</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">100% Fonctionnel</span>
        </div>
      </div>

      {/* Modal de Confirmation de Réinitialisation Complète */}
      {showConfirmRestoreModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Recommencer toute l'application ?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Cette action va réinitialiser l'ensemble de tes données (profil d'étudiant, photo, filière, cours, fiches de révision, flashcards, planning et notifications) et relancer immédiatement les écrans de présentation initiale de RéviGenius.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300">
              💡 Tu pourras ensuite reconfigurer ton université, ta faculté et redémarrer tes révisions sur des bases toutes neuves.
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmRestoreModal(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer min-h-[40px]"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleConfirmRestoreAll}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 active:scale-95 transition-all shadow-sm shadow-rose-600/30 flex items-center gap-1.5 cursor-pointer min-h-[40px]"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Oui, tout recommencer</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
