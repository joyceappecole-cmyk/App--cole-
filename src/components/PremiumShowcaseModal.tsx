/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Crown, 
  Sparkles, 
  Check, 
  X, 
  FileText, 
  Bot, 
  HelpCircle, 
  Mic, 
  Library, 
  TrendingUp, 
  UserCheck, 
  Bell, 
  ShieldCheck,
  CheckCircle2,
  Lock
} from 'lucide-react';

interface PremiumShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PREMIUM_UPCOMING_FEATURES = [
  {
    icon: Bot,
    title: '1. Assistant IA Avancé & Interactif',
    description: 'Pose tes questions en langage naturel sur tes cours et obtiens des explications pédagogiques pas à pas.'
  },
  {
    icon: FileText,
    title: '2. Génération de Quiz depuis vos PDF',
    description: 'Importe n\'importe quel polycopié et laisse l\'algorithme générer automatiquement 20 QCM de validation.'
  },
  {
    icon: HelpCircle,
    title: '3. Devoirs & Exercices Spécialisés',
    description: 'Génération de cas pratiques en droit, QCM type EDN en médecine, exercices d\'algorithmes ou études de cas.'
  },
  {
    icon: ShieldCheck,
    title: '4. Mode Examen Blanc Simulé',
    description: 'Conditions réelles chronométrées avec correction détaillée et notation automatique.'
  },
  {
    icon: Mic,
    title: '5. Assistant Vocal Intelligent',
    description: 'Révise à l\'oral sans regarder ton écran : questions/réponses en mode mains libres.'
  },
  {
    icon: Library,
    title: '6. Bibliothèques Spécialisées Intégrales',
    description: 'Accès privilégié aux catalogues de thèses, annales d\'examens officielles et résumés de traités.'
  },
  {
    icon: TrendingUp,
    title: '7. Analyses Prédictives & Statistiques Avancées',
    description: 'Identification précise de tes lacunes, prédiction de score aux examens et recommandations ciblées.'
  },
  {
    icon: UserCheck,
    title: '8. Accompagnement Pédagogique Personnalisé',
    description: 'Planification adaptative en fonction de tes rythmes biologiques et de ton calendrier de partiels.'
  }
];

export const PremiumShowcaseModal: React.FC<PremiumShowcaseModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  if (!isOpen) return null;

  const handleNotifyMe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    try {
      localStorage.setItem('revigenius_premium_waitlist', emailInput.trim());
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-500/10 via-amber-600/10 to-emerald-600/10 dark:from-amber-950/40 dark:via-slate-900 dark:to-emerald-950/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                  Revigenuis Premium
                </h2>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                  Bientôt disponible
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                La version gratuite reste 100% accessible et complète pour tes études au quotidien.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison & Features */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Comparison Cards: Gratuit vs Premium */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            
            {/* Version Gratuite Active */}
            <div className="p-4 rounded-2xl border-2 border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                  Revigenuis Gratuit
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-600 text-white">
                  Actif & Permanent
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Tout ce qu'il faut pour réviser et réussir tes examens sans aucun frais :
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-200">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Fiches de révision structurées</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Répétition espacée (SRS) hors-ligne</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Planning d'examen & tâches du jour</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Quiz QCM d'entraînement</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Bibliothèques numériques gratuites et ouvertes</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Bible numérique complète (Louis Segond 1910)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Coach méthodologique quotidien gratuit</span>
                </li>
              </ul>
            </div>

            {/* Version Premium Future */}
            <div className="p-4 rounded-2xl border border-amber-300 dark:border-amber-800 bg-amber-50/40 dark:bg-amber-950/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                  Revigenuis Premium
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200">
                  En préparation
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Des technologies avancées d'intelligence artificielle pour aller encore plus loin :
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-200">
                <li className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Génération de quiz automatique sur PDF</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Simulations d'examens blancs notés</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Assistant vocal questions/réponses</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Analyses statistiques prédictives</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Devoirs corrigés approfondis</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Detailed 8 Upcoming Features */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Les 8 fonctionnalités Premium en cours de préparation :
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PREMIUM_UPCOMING_FEATURES.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex items-start gap-2.5"
                  >
                    <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {feat.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stay Informed / Waitlist Box */}
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Être informé du lancement de la version Premium
              </span>
            </div>
            
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-4 h-4" />
                <span>Merci ! Tu seras prévenu en priorité dès la mise en ligne des fonctionnalités Premium.</span>
              </div>
            ) : (
              <form onSubmit={handleNotifyMe} className="flex gap-2">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Entre ton adresse email..."
                  required
                  className="flex-1 px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shrink-0 cursor-pointer"
                >
                  Me notifier
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
