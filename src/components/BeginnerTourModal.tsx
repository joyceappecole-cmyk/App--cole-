/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BookOpen, 
  Brain, 
  Calendar, 
  Library, 
  TrendingUp, 
  Sparkles, 
  Bot, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  X, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';

interface BeginnerTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab?: (tab: string) => void;
}

interface TourStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  keyPoints: string[];
  actionLabel?: string;
  targetTab?: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    stepNumber: 1,
    title: 'Bienvenue sur RéviGenius !',
    subtitle: 'Ton compagnon d\'études simple, moderne et efficace',
    description: 'RéviGenius a été conçu pour t\'aider à réussir tes examens universitaires sans complication technique. L\'application est intelligente à l\'intérieur, mais reste extrêmement simple à utiliser.',
    icon: Sparkles,
    iconBg: 'bg-emerald-500/15 dark:bg-emerald-400/20',
    iconColor: 'text-emerald-700 dark:text-emerald-400',
    keyPoints: [
      'Accessible sur ordinateur, tablette et smartphone Android.',
      'Fonctionne 100% hors-ligne pour réviser partout sans connexion.',
      'Totalement adapté à ta filière d\'études et à ton niveau.'
    ]
  },
  {
    stepNumber: 2,
    title: '1. Mes Révisions & Fiches',
    subtitle: 'Comprends et retiens tes cours durablement',
    description: 'Retrouve toutes tes fiches de cours synthétisées et tes cartes de mémorisation. Tu peux lire l\'essentiel d\'une matière en quelques minutes.',
    icon: BookOpen,
    iconBg: 'bg-teal-500/15 dark:bg-teal-400/20',
    iconColor: 'text-teal-700 dark:text-teal-400',
    keyPoints: [
      'Fiches de révision structurées avec définitions et points clés.',
      'Lecture aérée et confortable adaptée aux petits écrans.',
      'Création et consultation rapide de tes propres notes.'
    ],
    actionLabel: 'Découvrir les révisions',
    targetTab: 'revisions'
  },
  {
    stepNumber: 3,
    title: '2. Répétition intelligente (SRS)',
    subtitle: 'Mémorise sans oublier grâce à des cartes interactives',
    description: 'La mémoire s\'efface si on ne réactive pas les notions au bon moment. RéviGenius t\'indique automatiquement quelles cartes revoir aujourd\'hui.',
    icon: Brain,
    iconBg: 'bg-indigo-500/15 dark:bg-indigo-400/20',
    iconColor: 'text-indigo-700 dark:text-indigo-400',
    keyPoints: [
      'Indique simplement si une notion a été facile ou difficile.',
      'L\'application espace automatiquement les prochaines révisions.',
      'Fonctionne sans aucune intelligence artificielle payante.'
    ]
  },
  {
    stepNumber: 4,
    title: '3. Mes Exercices & Quiz',
    subtitle: 'Entraîne-toi et vérifie tes connaissances en temps réel',
    description: 'Passe des QCM interactifs pour tester tes connaissances avant les examens. Chaque réponse est accompagnée d\'une explication pour progresser.',
    icon: HelpCircle,
    iconBg: 'bg-blue-500/15 dark:bg-blue-400/20',
    iconColor: 'text-blue-700 dark:text-blue-400',
    keyPoints: [
      'Questions à choix multiples ciblées par matière.',
      'Score immédiat et corrigés détaillés.',
      'Historique de tes entraînements pour mesurer tes progrès.'
    ],
    actionLabel: 'Tester un exercice',
    targetTab: 'revisions'
  },
  {
    stepNumber: 5,
    title: '4. Mon Planning d\'études',
    subtitle: 'Organise tes horaires et respecte tes objectifs',
    description: 'Fixe la date de tes examens et définis tes tâches quotidiennes. Le planning t\'aide à garder le rythme sans te sentir débordé.',
    icon: Calendar,
    iconBg: 'bg-purple-500/15 dark:bg-purple-400/20',
    iconColor: 'text-purple-700 dark:text-purple-400',
    keyPoints: [
      'Planificateur d\'examen avec compte à rebours.',
      'Liste de tâches simples à cocher au fil de la journée.',
      'Rappels et notifications intégrées pour rester motivé.'
    ],
    actionLabel: 'Voir mon planning',
    targetTab: 'programme'
  },
  {
    stepNumber: 6,
    title: '5. Ma Progression & Bibliothèque',
    subtitle: 'Suis ton évolution et accède à des ressources gratuites',
    description: 'Visualise tes jours d\'étude, le nombre d\'heures consacrées et accède aux grandes bibliothèques numériques légales recommandées pour ta faculté.',
    icon: TrendingUp,
    iconBg: 'bg-amber-500/15 dark:bg-amber-400/20',
    iconColor: 'text-amber-700 dark:text-amber-400',
    keyPoints: [
      'Statistiques 100% réelles basées sur tes séances enregistrées.',
      'Bibliothèque numérique classée par filière (Médecine, Droit, Biblique, etc.).',
      'Tu pourras revoir ce guide à tout moment dans les Paramètres.'
    ]
  }
];

export const BeginnerTourModal: React.FC<BeginnerTourModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!isOpen) return null;

  const currentStep = TOUR_STEPS[currentStepIndex];
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === TOUR_STEPS.length - 1;
  const Icon = currentStep.icon;

  const handleNext = () => {
    if (isLast) {
      onClose();
    } else {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleAction = () => {
    if (currentStep.targetTab && onNavigateTab) {
      onNavigateTab(currentStep.targetTab);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-lg p-5 sm:p-7 shadow-2xl flex flex-col justify-between max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              Guide Débutant • Étape {currentStepIndex + 1} / {TOUR_STEPS.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            title="Passer le tutoriel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Content */}
        <div className="space-y-4 my-2">
          
          <div className="flex items-start gap-3.5">
            <div className={`w-12 h-12 rounded-2xl ${currentStep.iconBg} ${currentStep.iconColor} flex items-center justify-center shrink-0`}>
              <Icon className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {currentStep.title}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                {currentStep.subtitle}
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {currentStep.description}
          </p>

          {/* Key Bullet Points */}
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Ce que tu peux faire :
            </span>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-200">
              {currentStep.keyPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct shortcut button if present on this step */}
          {currentStep.actionLabel && (
            <button
              onClick={handleAction}
              className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{currentStep.actionLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

        </div>

        {/* Progress Bar & Navigation Buttons */}
        <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
          
          {/* Progress dots */}
          <div className="flex items-center justify-center gap-1.5">
            {TOUR_STEPS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStepIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentStepIndex
                    ? 'w-6 bg-emerald-600 dark:bg-emerald-400'
                    : 'w-1.5 bg-slate-200 dark:bg-slate-700'
                }`}
                aria-label={`Aller à l'étape ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center justify-between gap-2">
            {/* Skip / Back */}
            <div>
              {isFirst ? (
                <button
                  onClick={onClose}
                  className="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 cursor-pointer"
                >
                  Passer l'introduction
                </button>
              ) : (
                <button
                  onClick={handlePrev}
                  className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1 cursor-pointer min-h-[40px]"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Précédent</span>
                </button>
              )}
            </div>

            {/* Next / Finish */}
            <button
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all flex items-center gap-1.5 shadow-sm shadow-emerald-600/20 cursor-pointer min-h-[44px]"
            >
              <span>{isLast ? 'C\'est parti !' : 'Suivant'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
