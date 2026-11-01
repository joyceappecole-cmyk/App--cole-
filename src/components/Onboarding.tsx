import React, { useState, useRef } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Sparkles, 
  AlertTriangle, 
  GraduationCap, 
  Building2, 
  Globe2, 
  Languages, 
  User, 
  ArrowRight,
  BookOpen,
  Camera,
  Trash2,
  Smile,
  Heart,
  PartyPopper
} from 'lucide-react';
import { StudentProfile, FacultyId } from '../types';
import { FACULTIES } from '../data/mockData';
import { processProfileImage } from '../utils/imageCompressor';
import { fireJoyConfetti, fireCelebrationExplosion } from '../utils/confetti';

interface OnboardingProps {
  currentProfile: StudentProfile;
  onComplete: (profile: StudentProfile) => void;
}

const COMMON_COUNTRIES = [
  'France',
  'Bénin',
  'Belgique',
  'Burkina Faso',
  'Cameroun',
  'Canada',
  'Congo (Brazzaville)',
  'Côte d\'Ivoire',
  'Gabon',
  'Guinée',
  'Haïti',
  'Madagascar',
  'Mali',
  'Maroc',
  'Niger',
  'RD Congo',
  'Sénégal',
  'Suisse',
  'Tchad',
  'Togo',
  'Tunisie',
  'Autre pays'
];

const STUDY_LEVELS = [
  'Licence 1 (L1 / PASS / Année préparatoire)',
  'Licence 2 (L2)',
  'Licence 3 (L3)',
  'Master 1 (M1)',
  'Master 2 (M2)',
  'Doctorat / Thèse',
  'Classes Préparatoires (CPGE)',
  'Cycle Ingénieur / Grande École',
  'BTS / BUT / IUT',
  'Autre niveau d\'études'
];

const LANGUAGES = [
  'Français',
  'English',
  'Español',
  'العربية',
  'Autre langue'
];

const JOY_PRESET_AVATARS = [
  { id: 'smile', emoji: '😊', label: 'Souriant' },
  { id: 'star', emoji: '🌟', label: 'Rayonnant' },
  { id: 'rocket', emoji: '🚀', label: 'Motivé' },
  { id: 'curious', emoji: '💡', label: 'Curieux' },
  { id: 'peace', emoji: '🌿', label: 'Serein' },
  { id: 'grad', emoji: '🎓', label: 'Académique' },
];

const JOY_MOODS = [
  { id: 'souriant', emoji: '😊', label: 'Plein de joie & Sérénité', phrase: 'Tu démarres avec le sourire, c\'est la clé du succès !' },
  { id: 'motive', emoji: '🚀', label: 'Motivé(e) & Déterminé(e)', phrase: 'Superbe énergie ! Rien ne t\'arrêtera dans tes révisions.' },
  { id: 'rayonnant', emoji: '✨', label: 'Curieux(se) & Inspiré(e)', phrase: 'Magnifique curiosité ! Chaque notion comprise est une joie.' },
  { id: 'paisible', emoji: '🌿', label: 'Calme & Confiant(e)', phrase: 'Une paix précieuse pour réviser avec méthode et clarté.' }
];

export const Onboarding: React.FC<OnboardingProps> = ({ currentProfile, onComplete }) => {
  // Mode: 'presentation' (slides 0, 1, 2) or 'config' (form)
  const [phase, setPhase] = useState<'presentation' | 'config'>('presentation');
  const [slideIndex, setSlideIndex] = useState(0);

  // Form states for initial configuration
  const [fullName, setFullName] = useState(currentProfile.name || '');
  const [country, setCountry] = useState(currentProfile.country || 'France');
  const [customCountry, setCustomCountry] = useState('');
  const [university, setUniversity] = useState(currentProfile.university || '');
  const [facultyId, setFacultyId] = useState<FacultyId>(currentProfile.facultyId || 'informatique');
  const [studyLevel, setStudyLevel] = useState(currentProfile.studyLevel || 'Licence 1 (L1 / PASS / Année préparatoire)');
  const [preferredLanguage, setPreferredLanguage] = useState(currentProfile.preferredLanguage || 'Français');

  // Photo de profil & émotions de joie
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(currentProfile.avatarUrl);
  const [joyMood, setJoyMood] = useState<string>(currentProfile.joyMood || 'souriant');
  const [isPhotoSkipped, setIsPhotoSkipped] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [joyToastMessage, setJoyToastMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Déclenchement d'une émotion de joie
  const triggerJoyEmotion = (moodId: string) => {
    setJoyMood(moodId);
    const found = JOY_MOODS.find((m) => m.id === moodId);
    if (found) {
      setJoyToastMessage(`${found.emoji} ${found.phrase}`);
      fireJoyConfetti(0.5, 0.35, 45);
      setTimeout(() => setJoyToastMessage(null), 3200);
    }
  };

  // Traitement de l'import de la photo
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingPhoto(true);
      const compressedBase64 = await processProfileImage(file, 256);
      setAvatarUrl(compressedBase64);
      setIsPhotoSkipped(false);
      fireJoyConfetti(0.5, 0.45, 35);
      setJoyToastMessage('🎉 Photo de profil importée avec succès !');
      setTimeout(() => setJoyToastMessage(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Impossible de traiter cette photo.');
    } finally {
      setIsUploadingPhoto(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSelectPresetAvatar = (emoji: string) => {
    setAvatarUrl(emoji);
    setIsPhotoSkipped(false);
    fireJoyConfetti(0.5, 0.4, 25);
  };

  const handleRemovePhoto = () => {
    setAvatarUrl(undefined);
  };

  const handleSkipPhoto = () => {
    setIsPhotoSkipped(true);
    setAvatarUrl(undefined);
  };

  // Go to next slide or proceed to configuration
  const handleNextSlide = () => {
    if (slideIndex < 2) {
      setSlideIndex((prev) => prev + 1);
    } else {
      setPhase('config');
    }
  };

  const handlePrevSlide = () => {
    if (slideIndex > 0) {
      setSlideIndex((prev) => prev - 1);
    }
  };

  // Enregistrer le profil (validation & sauvegarde)
  const handleSaveProfile = (asAnonymous: boolean = false) => {
    const selectedFac = FACULTIES.find((f) => f.id === facultyId) || FACULTIES[0];

    let finalName = '';
    if (!asAnonymous) {
      finalName = fullName.trim();
    }
    if (!finalName) {
      finalName = 'Étudiant';
    }

    const finalCountry = country === 'Autre pays' && customCountry.trim() 
      ? customCountry.trim() 
      : country;

    const finalUniversity = university.trim() ? university.trim() : undefined;

    const newProfile: StudentProfile = {
      name: finalName,
      country: finalCountry,
      university: finalUniversity, // Facultatif
      facultyId,
      facultyName: selectedFac.name,
      studyLevel,
      mainSubjects: selectedFac.defaultSubjects.slice(0, 4),
      preferredLanguage,
      targetExamPeriod: currentProfile.targetExamPeriod || 'Examens de Semestre 1',
      weeklyTargetHours: currentProfile.weeklyTargetHours || 15,
      notificationsEnabled: false,
      avatarUrl: isPhotoSkipped ? undefined : avatarUrl,
      joyMood,
    };

    // Explosion de joie à la validation !
    fireCelebrationExplosion();
    onComplete(newProfile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col my-auto transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* PHASE 1 : PRÉSENTATION AU PREMIER LANCEMENT */}
        {phase === 'presentation' && (
          <div className="flex flex-col">
            {/* Top Bar with Step counter */}
            <div className="flex items-center justify-between px-6 pt-6 pb-2">
              <div className="flex items-center gap-2">
                <img
                  src="/logo.png"
                  alt="RéviGenius"
                  className="w-7 h-7 object-contain rounded-lg border border-emerald-100 dark:border-emerald-900"
                />
                <span className="text-xs font-bold text-slate-800 dark:text-white">
                  RéviGenius
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                {[0, 1, 2].map((idx) => (
                  <span
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === slideIndex ? 'w-6 bg-emerald-600' : 'w-2 bg-slate-200 dark:bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Slide 0 : Bienvenue & Émotions de joie */}
            {slideIndex === 0 && (
              <div className="px-6 py-5 sm:py-7 flex flex-col items-center text-center">
                <div className="relative">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 mb-4 rounded-3xl p-3 bg-gradient-to-b from-emerald-50/90 to-white dark:from-emerald-950/40 dark:to-slate-800 border border-emerald-100 dark:border-emerald-800 shadow-md flex items-center justify-center">
                    <img
                      src="/logo.png"
                      alt="Logo RéviGenius"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {/* Badge flottant d'émotion de joie */}
                  <div className="absolute -bottom-1 -right-2 bg-amber-400 text-slate-900 px-2 py-0.5 rounded-full text-xs font-black shadow-md flex items-center gap-1 animate-bounce">
                    <Sparkles className="w-3 h-3" />
                    <span>Joie d'apprendre !</span>
                  </div>
                </div>

                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 mb-2">
                  🎉 C'est un réel plaisir de t'accueillir !
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                  Bienvenue sur RéviGenius !
                </h1>

                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium max-w-md leading-relaxed">
                  Ton compagnon pour réviser dans la bonne humeur, sans stress, et célébrer chaque étape de ta réussite académique.
                </p>

                {/* Sélecteur interactif d'émotions de joie */}
                <div className="mt-4 w-full max-w-md p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50/80 via-blue-50/80 to-amber-50/80 dark:from-slate-800 dark:to-slate-800/90 border border-emerald-100 dark:border-slate-700 text-left">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1">
                      <Smile className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Choisis ton énergie du jour :</span>
                    </span>
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">Touche pour célébrer</span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    {JOY_MOODS.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => triggerJoyEmotion(m.id)}
                        className={`p-2 rounded-xl text-[11px] font-semibold text-left transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                          joyMood === m.id
                            ? 'bg-emerald-600 text-white shadow-xs font-bold'
                            : 'bg-white/80 dark:bg-slate-700/80 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-600 hover:bg-white'
                        }`}
                      >
                        <span className="text-sm">{m.emoji}</span>
                        <span className="truncate">{m.label.split('&')[0]}</span>
                      </button>
                    ))}
                  </div>

                  {joyToastMessage && (
                    <div className="mt-2 text-[11px] font-medium text-emerald-800 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/80 p-2 rounded-lg text-center animate-in fade-in slide-in-from-top-1 duration-200">
                      {joyToastMessage}
                    </div>
                  )}
                </div>

                <div className="mt-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 max-w-sm">
                  <span className="font-semibold text-emerald-800 dark:text-emerald-400">Slogan officiel : </span>
                  « Comprends tes cours. Maîtrise tes connaissances. Réussis tes examens. »
                </div>
              </div>
            )}

            {/* Slide 1 : Personnalise ton espace */}
            {slideIndex === 1 && (
              <div className="px-6 py-6 sm:py-8 flex flex-col items-center text-center">
                <div className="w-20 h-20 mb-4 rounded-3xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-100 dark:border-blue-900 shadow-sm">
                  <Sparkles className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                </div>

                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60 mb-2">
                  Espace sur-mesure & chaleureux
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight max-w-md">
                  Organise tes études avec enthousiasme et sérénité.
                </h2>

                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
                  Ajoute ta photo de profil (ou choisis un avatar joyeux), ton pays, ton établissement et tes matières favorites.
                </p>

                <div className="mt-5 w-full max-w-md grid grid-cols-2 gap-2 text-left text-xs">
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center gap-2">
                    <Camera className="w-4 h-4 text-pink-600 shrink-0" />
                    <span className="font-medium text-slate-700 dark:text-slate-300">Photo ou avatar</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-medium text-slate-700 dark:text-slate-300">Pays & Région</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="font-medium text-slate-700 dark:text-slate-300">Établissement</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span className="font-medium text-slate-700 dark:text-slate-300">Faculté & Matières</span>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 2 : Important & Bienveillance */}
            {slideIndex === 2 && (
              <div className="px-6 py-6 sm:py-8 flex flex-col items-center text-center">
                <div className="w-18 h-18 mb-4 rounded-3xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-200/80 dark:border-amber-900 shadow-sm">
                  <AlertTriangle className="w-9 h-9 text-amber-600 dark:text-amber-400" />
                </div>

                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800 mb-2">
                  Transparence & Sécurité
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                  Tes données t'appartiennent à 100%
                </h2>

                <div className="mt-4 p-4 rounded-2xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-950 dark:text-amber-200 text-xs sm:text-sm leading-relaxed text-left space-y-2">
                  <p className="font-semibold text-amber-900 dark:text-amber-300">
                    « Les profils et données présentés sont uniquement des exemples. Tu as le contrôle absolu sur tes informations. »
                  </p>
                  <p className="text-[11px] text-amber-800 dark:text-amber-400 pt-1 border-t border-amber-200/60 dark:border-amber-800/40">
                    🔒 Aucune inscription en ligne obligatoire ni mot de passe : ta photo et tes cours sont conservés localement sur ton appareil.
                  </p>
                </div>
              </div>
            )}

            {/* Presentation Footer Navigation */}
            <div className="p-5 sm:p-6 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
              {slideIndex > 0 ? (
                <button
                  type="button"
                  onClick={handlePrevSlide}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-1.5 min-h-[44px] cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Précédent</span>
                </button>
              ) : (
                <div />
              )}

              {slideIndex < 2 ? (
                <button
                  type="button"
                  onClick={handleNextSlide}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20 flex items-center gap-1.5 min-h-[44px] cursor-pointer"
                >
                  <span>Suivant</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setPhase('config')}
                  className="px-6 py-2.5 rounded-xl text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-md shadow-emerald-600/25 flex items-center gap-2 min-h-[44px] cursor-pointer"
                >
                  <span>Configurer mon profil</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* PHASE 2 : CONFIGURATION INITIALE AVEC IMPORT PHOTO ET OPTION DE SAUTER */}
        {phase === 'config' && (
          <div className="flex flex-col max-h-[85vh]">
            {/* Header Form */}
            <div className="px-6 pt-5 pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4 shrink-0 bg-white dark:bg-slate-900">
              <div className="flex items-center gap-3">
                <img
                  src="/logo.png"
                  alt="RéviGenius"
                  className="w-9 h-9 object-contain rounded-xl border border-emerald-100 dark:border-emerald-900 shadow-xs"
                />
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    Configuration de ton profil
                  </h2>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Personnalise ton espace d'études selon tes souhaits
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shrink-0">
                Étape 2 / 2
              </span>
            </div>

            {/* Scrollable Form Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-left text-xs">
              
              {/* SECTION PHOTO DE PROFIL - AVEC IMPORT ET OPTION EXPLICITE DE SAUTER */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50/60 to-blue-50/60 dark:from-slate-800/80 dark:to-slate-800/50 border border-emerald-100 dark:border-slate-700/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-bold text-slate-800 dark:text-slate-100">
                      Photo de profil
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                    Facultatif — Sautable
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  Importe ta propre photo depuis ton téléphone ou choisis un avatar joyeux. Tu peux <strong>sauter cette section</strong> et la remplir plus tard à tout moment depuis ton profil.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-1">
                  {/* Aperçu de l'avatar */}
                  <div className="relative group shrink-0">
                    <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-emerald-600 text-white flex items-center justify-center font-extrabold text-2xl shadow-md border-2 border-white dark:border-slate-800">
                      {avatarUrl && avatarUrl.startsWith('data:image') ? (
                        <img
                          src={avatarUrl}
                          alt="Aperçu du profil"
                          className="w-full h-full object-cover"
                        />
                      ) : avatarUrl ? (
                        <span className="text-3xl">{avatarUrl}</span>
                      ) : (
                        <span>{fullName.trim() ? fullName.trim().charAt(0).toUpperCase() : '🎓'}</span>
                      )}
                    </div>

                    {avatarUrl && (
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="absolute -top-1 -right-1 bg-rose-500 hover:bg-rose-600 text-white p-1 rounded-full shadow-md transition-colors"
                        title="Retirer la photo"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* Actions d'importation et de saut */}
                  <div className="flex-1 space-y-2 w-full text-center sm:text-left">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="onboarding-photo-input"
                    />

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <label
                        htmlFor="onboarding-photo-input"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all shadow-xs cursor-pointer min-h-[38px]"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>{avatarUrl ? 'Changer de photo' : 'Importer ma photo'}</span>
                      </label>

                      <button
                        type="button"
                        onClick={handleSkipPhoto}
                        className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-colors min-h-[38px] cursor-pointer"
                      >
                        Sauter pour plus tard
                      </button>
                    </div>

                    {/* Avatars joyeux en 1 clic */}
                    <div className="pt-1">
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block mb-1">
                        Ou choisis un avatar joyeux express :
                      </span>
                      <div className="flex items-center justify-center sm:justify-start gap-1.5">
                        {JOY_PRESET_AVATARS.map((av) => (
                          <button
                            key={av.id}
                            type="button"
                            onClick={() => handleSelectPresetAvatar(av.emoji)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border transition-all cursor-pointer ${
                              avatarUrl === av.emoji
                                ? 'bg-emerald-100 border-emerald-500 scale-110 shadow-xs'
                                : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:scale-105'
                            }`}
                            title={av.label}
                          >
                            {av.emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {isPhotoSkipped && (
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                    ✓ Section photo sautée. Tu pourras ajouter ta photo plus tard dans l'onglet Profil.
                  </div>
                )}
              </div>

              {/* 1. Nom et prénom */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="fullNameInput" className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Nom et prénom</span>
                  </label>
                  <span className="text-[11px] font-medium text-slate-400">
                    Facultatif
                  </span>
                </div>
                <input
                  id="fullNameInput"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="ex : Sarah Diallo ou Thomas Dubois"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium shadow-2xs"
                />
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Le prénom personnalise l'accueil. Si laissé vide, tu seras accueilli sous le nom neutre <strong>« Étudiant »</strong>.
                </p>
              </div>

              {/* 2. Pays */}
              <div className="space-y-1.5">
                <label htmlFor="countrySelect" className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Globe2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Pays de tes études</span>
                  <span className="text-rose-500">*</span>
                </label>
                <select
                  id="countrySelect"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium shadow-2xs"
                >
                  {COMMON_COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {country === 'Autre pays' && (
                  <input
                    type="text"
                    value={customCountry}
                    onChange={(e) => setCustomCountry(e.target.value)}
                    placeholder="Saisis le nom de ton pays..."
                    className="mt-2 w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  />
                )}
              </div>

              {/* 3. Université ou institut */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="universityInput" className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>{facultyId === 'etudes_bibliques_theologie' ? 'Centre biblique ou institut théologique' : 'Université ou institut'}</span>
                  </label>
                  <span className="text-[11px] font-medium text-slate-400">
                    Facultatif
                  </span>
                </div>
                <input
                  id="universityInput"
                  type="text"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  placeholder={
                    facultyId === 'etudes_bibliques_theologie'
                      ? 'ex : Centre biblique, Institut Théologique, Faculté Libre...'
                      : 'ex : Sorbonne Université, UCAD, UGB, etc.'
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium shadow-2xs"
                />

                {facultyId === 'etudes_bibliques_theologie' ? (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] text-slate-400 font-medium">Suggestions :</span>
                    {['Centre biblique', 'Institut biblique', 'Faculté de Théologie'].map((inst) => (
                      <button
                        key={inst}
                        type="button"
                        onClick={() => setUniversity(inst)}
                        className={`px-2 py-0.5 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer ${
                          university === inst
                            ? 'bg-amber-100 dark:bg-amber-950/80 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-amber-50'
                        }`}
                      >
                        + {inst}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-400">
                    Ce champ est facultatif. Vous pouvez continuer sans indiquer d'établissement.
                  </p>
                )}
              </div>

              {/* 4. Faculté ou domaine d'études */}
              <div className="space-y-1.5">
                <label htmlFor="facultySelect" className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Faculté ou domaine d'études</span>
                  <span className="text-rose-500">*</span>
                </label>
                <select
                  id="facultySelect"
                  value={facultyId}
                  onChange={(e) => {
                    const nextId = e.target.value as FacultyId;
                    setFacultyId(nextId);
                    if (nextId === 'etudes_bibliques_theologie' && (!university || university.trim() === '')) {
                      setUniversity('Centre biblique');
                    }
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium shadow-2xs"
                >
                  {FACULTIES.map((fac) => (
                    <option key={fac.id} value={fac.id}>
                      {fac.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 5. Niveau d'études */}
              <div className="space-y-1.5">
                <label htmlFor="studyLevelSelect" className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Niveau d'études</span>
                  <span className="text-rose-500">*</span>
                </label>
                <select
                  id="studyLevelSelect"
                  value={studyLevel}
                  onChange={(e) => setStudyLevel(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium shadow-2xs"
                >
                  {STUDY_LEVELS.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>

              {/* 6. Langue préférée */}
              <div className="space-y-1.5">
                <label htmlFor="langSelect" className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Languages className="w-3.5 h-3.5 text-slate-600" />
                  <span>Langue préférée</span>
                  <span className="text-rose-500">*</span>
                </label>
                <select
                  id="langSelect"
                  value={preferredLanguage}
                  onChange={(e) => setPreferredLanguage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium shadow-2xs"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* Confidentiality Reminder */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-300 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Tes préférences et ta photo restent enregistrées sur cet appareil. Tu pourras les modifier ou les effacer à tout moment depuis <strong>« Mon profil »</strong>.
                </span>
              </div>
            </div>

            {/* Bottom Actions: Enregistrer mon profil & Modifier plus tard */}
            <div className="p-5 sm:p-6 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={() => handleSaveProfile(true)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 bg-white dark:bg-slate-800 sm:bg-transparent border border-slate-200 dark:border-slate-700 sm:border-transparent hover:bg-slate-100 transition-colors min-h-[44px] text-center cursor-pointer"
              >
                Modifier plus tard
              </button>

              <button
                type="button"
                onClick={() => handleSaveProfile(false)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
              >
                <span>Enregistrer mon profil</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
