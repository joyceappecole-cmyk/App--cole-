import React, { useState, useRef } from 'react';
import { 
  User, 
  Globe2, 
  GraduationCap, 
  Languages, 
  Save, 
  CheckCircle2, 
  Plus, 
  X, 
  Sparkles, 
  Info,
  Edit2,
  Camera,
  Trash2,
  Smile,
  Heart,
  PartyPopper,
  Flame,
  Award
} from 'lucide-react';
import { StudentProfile, FacultyId } from '../types';
import { FACULTIES } from '../data/mockData';
import { processProfileImage } from '../utils/imageCompressor';
import { fireJoyConfetti, fireCelebrationExplosion } from '../utils/confetti';

interface ProfileViewProps {
  profile: StudentProfile;
  onUpdateProfile: (updated: StudentProfile) => void;
}

const COMMON_COUNTRIES = [
  'Bénin',
  'Belgique',
  'Cameroun',
  'Canada',
  'Côte d\'Ivoire',
  'France',
  'Gabon',
  'Guinée',
  'Haïti',
  'Madagascar',
  'Mali',
  'Maroc',
  'RD Congo',
  'Sénégal',
  'Suisse',
  'Togo',
  'Tunisie',
  'Autre pays'
];

const STUDY_LEVELS = [
  'Licence 1 (L1 / Année préparatoire / PASS)',
  'Licence 2 (L2)',
  'Licence 3 (L3)',
  'Master 1 (M1)',
  'Master 2 (M2)',
  'Doctorat / Thèse',
  'Classes Préparatoires (CPGE)',
  'Cycle Ingénieur / Grande École',
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

const JOY_MOOD_OPTIONS = [
  { 
    id: 'souriant', 
    emoji: '😊', 
    label: 'Souriant & Positif',
    desc: 'Apprendre avec le sourire et sérénité',
    cheer: 'Ton sourire illumine tes séances d\'apprentissage ! Continue sur cette belle lancée.'
  },
  { 
    id: 'motive', 
    emoji: '🚀', 
    label: 'Motivé & Déterminé',
    desc: 'Plein d\'énergie pour conquérir les cours',
    cheer: 'Une motivation invincible ! Chaque chapitre révisé te rapproche de l\'excellence.'
  },
  { 
    id: 'rayonnant', 
    emoji: '✨', 
    label: 'Inspiré & Passionné',
    desc: 'La joie de comprendre de nouvelles notions',
    cheer: 'Magnifique passion ! La soif d\'apprendre est le plus beau trésor d\'un étudiant.'
  },
  { 
    id: 'paisible', 
    emoji: '🌿', 
    label: 'Calme & Concentré',
    desc: 'Paix d\'esprit et clarté de révision',
    cheer: 'Le calme intérieur décuple ta mémoire et ta capacité d\'assimilation.'
  },
  { 
    id: 'reconnaissant', 
    emoji: '💛', 
    label: 'Cœur reconnaissant',
    desc: 'Gratitude pour le chemin parcouru',
    cheer: 'Célèbre chaque petite victoire : tu construis ton avenir pas à pas avec joie !'
  }
];

export const ProfileView: React.FC<ProfileViewProps> = ({ profile, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);

  // Form states
  const [name, setName] = useState(profile.name);
  const [country, setCountry] = useState(profile.country || 'France');
  const [university, setUniversity] = useState(profile.university || '');
  const [facultyId, setFacultyId] = useState<FacultyId>(profile.facultyId || 'informatique');
  const [studyLevel, setStudyLevel] = useState(profile.studyLevel || 'Licence 2 (L2)');
  const [mainSubjects, setMainSubjects] = useState<string[]>(profile.mainSubjects || []);
  const [newSubjectInput, setNewSubjectInput] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState(profile.preferredLanguage || 'Français');

  // Photo & Émotion de joie
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(profile.avatarUrl);
  const [joyMood, setJoyMood] = useState<string>(profile.joyMood || 'souriant');
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [joyFeedback, setJoyFeedback] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Current faculty definition
  const currentFaculty = FACULTIES.find((f) => f.id === facultyId) || FACULTIES[0];

  // Gestion du téléversement de la photo
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingPhoto(true);
      const compressed = await processProfileImage(file, 256);
      setAvatarUrl(compressed);
      
      // Sauvegarder immédiatement si on n'est pas en train d'éditer le formulaire complet
      if (!isEditing) {
        onUpdateProfile({
          ...profile,
          avatarUrl: compressed
        });
      }

      fireJoyConfetti(0.5, 0.45, 40);
      setJoyFeedback('🎉 Magnifique photo de profil ajoutée avec succès !');
      setTimeout(() => setJoyFeedback(null), 3500);
    } catch (err: any) {
      alert(err.message || 'Impossible de traiter la photo.');
    } finally {
      setIsUploadingPhoto(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSelectPresetAvatar = (emoji: string) => {
    setAvatarUrl(emoji);
    if (!isEditing) {
      onUpdateProfile({
        ...profile,
        avatarUrl: emoji
      });
    }
    fireJoyConfetti(0.5, 0.4, 30);
    setJoyFeedback(`✨ Avatar ${emoji} appliqué avec joie !`);
    setTimeout(() => setJoyFeedback(null), 3000);
  };

  const handleRemovePhoto = () => {
    setAvatarUrl(undefined);
    if (!isEditing) {
      onUpdateProfile({
        ...profile,
        avatarUrl: undefined
      });
    }
    setJoyFeedback('Photo retirée. Tu peux en ajouter une autre quand tu veux !');
    setTimeout(() => setJoyFeedback(null), 3000);
  };

  // Sélection d'une émotion de joie
  const handleSelectJoyMood = (moodId: string) => {
    setJoyMood(moodId);
    const chosenMood = JOY_MOOD_OPTIONS.find((m) => m.id === moodId);
    
    // Mettre à jour immédiatement le profil
    onUpdateProfile({
      ...profile,
      joyMood: moodId
    });

    fireJoyConfetti(0.5, 0.4, 50);
    if (chosenMood) {
      setJoyFeedback(`${chosenMood.emoji} ${chosenMood.cheer}`);
      setTimeout(() => setJoyFeedback(null), 4000);
    }
  };

  // When changing faculty, show suggested subjects that student can easily click to add
  const handleFacultyChange = (newFacId: FacultyId) => {
    setFacultyId(newFacId);
    const chosen = FACULTIES.find((f) => f.id === newFacId);
    if (chosen && (mainSubjects.length === 0 || newFacId === 'etudes_bibliques_theologie')) {
      setMainSubjects(chosen.defaultSubjects.slice(0, 4));
    }
    if (newFacId === 'etudes_bibliques_theologie' && (!university || university.trim() === '')) {
      setUniversity('Centre biblique');
    }
  };

  const handleAddSubject = (subjectName: string) => {
    const trimmed = subjectName.trim();
    if (!trimmed) return;
    if (!mainSubjects.includes(trimmed)) {
      setMainSubjects([...mainSubjects, trimmed]);
    }
    setNewSubjectInput('');
  };

  const handleRemoveSubject = (subjectToRemove: string) => {
    setMainSubjects(mainSubjects.filter((s) => s !== subjectToRemove));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const resolvedFaculty = FACULTIES.find((f) => f.id === facultyId) || FACULTIES[0];

    const updated: StudentProfile = {
      name: name.trim() || 'Étudiant',
      country: country.trim() || 'France',
      university: university.trim() ? university.trim() : undefined,
      facultyId,
      facultyName: resolvedFaculty.name,
      studyLevel,
      mainSubjects: mainSubjects.length > 0 ? mainSubjects : resolvedFaculty.defaultSubjects.slice(0, 3),
      preferredLanguage,
      targetExamPeriod: profile.targetExamPeriod,
      weeklyTargetHours: profile.weeklyTargetHours,
      avatarUrl,
      joyMood,
    };

    onUpdateProfile(updated);
    setIsEditing(false);
    setSavedSuccess(true);
    fireCelebrationExplosion();
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const handleClearPersonalInfo = () => {
    const cleared: StudentProfile = {
      ...profile,
      name: 'Étudiant',
      university: undefined,
      avatarUrl: undefined,
    };
    setName('');
    setUniversity('');
    setAvatarUrl(undefined);
    onUpdateProfile(cleared);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const currentJoy = JOY_MOOD_OPTIONS.find((m) => m.id === (profile.joyMood || joyMood)) || JOY_MOOD_OPTIONS[0];

  return (
    <div className="space-y-6 pb-20 md:pb-12 max-w-4xl mx-auto">
      
      {/* Input caché de téléversement photo */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        className="hidden"
        id="profile-photo-upload"
      />

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Espace Profil & Joie d'Étudier
            </h1>
            <span className="text-xl animate-pulse" title="Humeur joyeuse">
              {currentJoy.emoji}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Gère ta photo, ton humeur d'apprentissage et tes domaines académiques.
          </p>
        </div>

        {!isEditing && (
          <div className="flex items-center gap-2 flex-wrap">
            {profile.name && profile.name !== 'Étudiant' && (
              <button
                type="button"
                onClick={handleClearPersonalInfo}
                className="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-rose-700 dark:hover:text-rose-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-200 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors min-h-[40px] cursor-pointer"
                title="Effacer le nom et réinitialiser le profil anonyme"
              >
                Effacer mes informations
              </button>
            )}
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-[0.98] transition-all self-start sm:self-auto min-h-[44px] shadow-xs cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Modifier mes informations</span>
            </button>
          </div>
        )}
      </div>

      {/* Toast de joie / feedback */}
      {joyFeedback && (
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs px-4 py-3 rounded-2xl flex items-center justify-between gap-2 shadow-md animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2 font-medium">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>{joyFeedback}</span>
          </div>
          <button
            type="button"
            onClick={() => setJoyFeedback(null)}
            className="text-white/80 hover:text-white p-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Success banner */}
      {savedSuccess && (
        <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs px-4 py-3 rounded-2xl flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Profil et photo sauvegardés localement avec succès ! 🎉</span>
        </div>
      )}

      {/* SECTION 1 : ÉMOTIONS DE JOIE DE L'ÉTUDIANT */}
      <section className="bg-gradient-to-r from-emerald-50/70 via-blue-50/60 to-amber-50/60 dark:from-slate-900 dark:to-slate-800/80 rounded-3xl p-5 sm:p-6 border border-emerald-100 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold text-lg shadow-2xs">
              <Smile className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Mon humeur joyeuse d'apprentissage
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                L'énergie positive décuple la mémorisation et la motivation.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              fireCelebrationExplosion();
              setJoyFeedback('🎉 Bravo pour ton travail acharné ! Sois fier(e) de toi.');
              setTimeout(() => setJoyFeedback(null), 3500);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-xs active:scale-95 transition-all self-start sm:self-auto cursor-pointer"
          >
            <PartyPopper className="w-3.5 h-3.5" />
            <span>Célébrer ma journée</span>
          </button>
        </div>

        {/* Boutons d'émotions de joie */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {JOY_MOOD_OPTIONS.map((m) => {
            const isSelected = (profile.joyMood || joyMood) === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => handleSelectJoyMood(m.id)}
                className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white dark:bg-slate-800 border-emerald-500 shadow-sm scale-102 ring-2 ring-emerald-500/20'
                    : 'bg-white/80 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700 hover:bg-white hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xl">{m.emoji}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  )}
                </div>
                <div>
                  <span className="text-xs font-bold block text-slate-800 dark:text-slate-100 truncate">
                    {m.label.split('&')[0]}
                  </span>
                  <span className="text-[10px] text-slate-400 line-clamp-1">
                    {m.desc}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Message d'encouragement actif */}
        <div className="p-3 rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-slate-200/60 dark:border-slate-700 flex items-center gap-2.5">
          <Heart className="w-4 h-4 text-rose-500 shrink-0" />
          <p className="text-xs text-slate-700 dark:text-slate-200 font-medium italic">
            « {currentJoy.cheer} »
          </p>
        </div>
      </section>

      {/* Main Card */}
      {!isEditing ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6 transition-colors">
          
          {/* Identity top lockup avec Photo de profil réelle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="relative group shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center font-extrabold text-3xl shadow-lg shadow-emerald-600/20 border-2 border-white dark:border-slate-800">
                  {profile.avatarUrl && profile.avatarUrl.startsWith('data:image') ? (
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name || 'Photo de profil'}
                      className="w-full h-full object-cover"
                    />
                  ) : profile.avatarUrl ? (
                    <span className="text-4xl">{profile.avatarUrl}</span>
                  ) : profile.name && profile.name !== 'Étudiant' ? (
                    profile.name.charAt(0).toUpperCase()
                  ) : (
                    '🎓'
                  )}
                </div>

                {/* Badge d'humeur en superposition */}
                <div className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-800 p-1 rounded-full shadow-md border border-slate-200 dark:border-slate-700 text-base" title={`Humeur : ${currentJoy.label}`}>
                  {currentJoy.emoji}
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {profile.name && profile.name.trim() && profile.name.trim() !== 'Étudiant'
                      ? profile.name
                      : 'Étudiant (Profil anonyme)'}
                  </h2>
                  <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-md border border-emerald-100 dark:border-emerald-900/60">
                    {currentFaculty.badge}
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Globe2 className="w-3.5 h-3.5 text-slate-400" />
                    {profile.country || 'Non renseigné'}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{profile.studyLevel}</span>
                  {profile.university && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="font-medium text-slate-700 dark:text-slate-300">{profile.university}</span>
                    </>
                  )}
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Languages className="w-3.5 h-3.5 text-slate-400" />
                    {profile.preferredLanguage}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions rapides photo */}
            <div className="flex items-center gap-2 self-start sm:self-center">
              <label
                htmlFor="profile-photo-upload"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900 border border-emerald-200 dark:border-emerald-800 transition-colors cursor-pointer min-h-[40px]"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{profile.avatarUrl ? 'Changer ma photo' : 'Ajouter une photo'}</span>
              </label>

              {profile.avatarUrl && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200 dark:border-slate-800 transition-colors min-h-[40px] cursor-pointer"
                  title="Supprimer la photo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Academic Overview Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                Domaine d'études
              </span>
              <p className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                {currentFaculty.name}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                {currentFaculty.description}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                Établissement
              </span>
              <p className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                {profile.university ? profile.university : <span className="text-slate-400 dark:text-slate-500 font-normal italic">Non renseigné (facultatif)</span>}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Pays : {profile.country}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 sm:col-span-2 lg:col-span-1">
              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                Niveau & Langue
              </span>
              <p className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                {profile.studyLevel}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Langue de travail : {profile.preferredLanguage}
              </p>
            </div>

          </div>

          {/* Matières principales */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Matières principales suivies ({profile.mainSubjects.length})
              </h3>
              <span className="text-[11px] text-slate-400 dark:text-slate-500">
                Personnalisées par l'étudiant
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {profile.mainSubjects.map((sub) => (
                <span
                  key={sub}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-800/60"
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* Edit Form */
        <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5 transition-colors">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Modifier mon profil étudiant
            </h2>
            <span className="text-xs text-slate-500 dark:text-slate-400">Stockage 100% local</span>
          </div>

          {/* SECTION PHOTO DE PROFIL DANS LE FORMULAIRE */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                Photo de profil (Optionnel)
              </label>
              <span className="text-[11px] text-slate-400">Peut être modifiée à tout moment</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative group shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-emerald-600 text-white flex items-center justify-center font-extrabold text-2xl shadow-md border-2 border-white dark:border-slate-700">
                  {avatarUrl && avatarUrl.startsWith('data:image') ? (
                    <img
                      src={avatarUrl}
                      alt="Aperçu"
                      className="w-full h-full object-cover"
                    />
                  ) : avatarUrl ? (
                    <span className="text-3xl">{avatarUrl}</span>
                  ) : (
                    <span>{name.trim() ? name.trim().charAt(0).toUpperCase() : '🎓'}</span>
                  )}
                </div>
              </div>

              <div className="flex-1 space-y-2 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <label
                    htmlFor="profile-photo-upload"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs cursor-pointer min-h-[38px]"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>{avatarUrl ? 'Changer la photo' : 'Importer une photo'}</span>
                  </label>

                  {avatarUrl && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors min-h-[38px] cursor-pointer"
                    >
                      Supprimer la photo
                    </button>
                  )}
                </div>

                {/* Presets joyeux */}
                <div className="pt-1">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block mb-1">
                    Ou choisis un avatar express :
                  </span>
                  <div className="flex items-center justify-center sm:justify-start gap-1.5">
                    {JOY_PRESET_AVATARS.map((av) => (
                      <button
                        key={av.id}
                        type="button"
                        onClick={() => handleSelectPresetAvatar(av.emoji)}
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs border transition-all cursor-pointer ${
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
          </div>

          {/* Nom de l'étudiant */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Nom et prénom
              </label>
              <span className="text-[11px] text-slate-400 font-medium">Facultatif</span>
            </div>
            <input
              type="text"
              placeholder="ex : Sarah Diallo ou Thomas Dubois"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Saisie libre pour personnaliser ton accueil. Si laissé vide, tu resteras « Étudiant ».
            </p>
          </div>

          {/* Pays & Université (facultatif) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Pays de résidence ou d'études <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                list="countries-list"
                placeholder="Ex: Sénégal, France, Côte d'Ivoire..."
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
              <datalist id="countries-list">
                {COMMON_COUNTRIES.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {facultyId === 'etudes_bibliques_theologie' ? 'Centre biblique ou institut' : 'Université ou institut'} <span className="text-slate-400 font-normal">(Facultatif)</span>
              </label>
              <input
                type="text"
                placeholder={facultyId === 'etudes_bibliques_theologie' ? 'Ex: Centre biblique, Institut Théologique...' : 'Ex: Université Cheikh Anta Diop, Sorbonne, UQAM...'}
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {facultyId === 'etudes_bibliques_theologie' && (
                <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                  <span className="text-[10px] text-slate-400">Suggestions :</span>
                  {['Centre biblique', 'Institut biblique', 'Faculté de Théologie'].map((inst) => (
                    <button
                      key={inst}
                      type="button"
                      onClick={() => setUniversity(inst)}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold border transition-colors cursor-pointer ${
                        university === inst
                          ? 'bg-amber-100 dark:bg-amber-950 border-amber-300 text-amber-900 dark:text-amber-200'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-amber-50'
                      }`}
                    >
                      + {inst}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Faculté / Domaine universitaire */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Faculté / Domaine universitaire <span className="text-rose-500">*</span>
            </label>
            <select
              value={facultyId}
              onChange={(e) => handleFacultyChange(e.target.value as FacultyId)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              required
            >
              {FACULTIES.map((fac) => (
                <option key={fac.id} value={fac.id}>
                  {fac.name}
                </option>
              ))}
            </select>
          </div>

          {/* Niveau d'études & Langue */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Niveau d'études <span className="text-rose-500">*</span>
              </label>
              <select
                value={studyLevel}
                onChange={(e) => setStudyLevel(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              >
                {STUDY_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Langue préférée <span className="text-rose-500">*</span>
              </label>
              <select
                value={preferredLanguage}
                onChange={(e) => setPreferredLanguage(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Matières principales */}
          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Matières principales suivies <span className="text-rose-500">*</span>
              </label>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Choisis parmi les suggestions du domaine ou saisis tes matières personnalisées.
              </p>
            </div>

            {/* Suggestions */}
            <div>
              <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block mb-1.5">
                Suggestions pour {currentFaculty.name} :
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentFaculty.defaultSubjects.map((sug) => {
                  const isAdded = mainSubjects.includes(sug);
                  return (
                    <button
                      type="button"
                      key={sug}
                      onClick={() => isAdded ? handleRemoveSubject(sug) : handleAddSubject(sug)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors flex items-center gap-1 cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-600 text-white border-emerald-600 font-medium'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {isAdded ? <CheckCircle2 className="w-3 h-3" /> : <Plus className="w-3 h-3 text-slate-400" />}
                      <span>{sug}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom subject adder */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ajouter une matière personnalisée..."
                value={newSubjectInput}
                onChange={(e) => setNewSubjectInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSubject(newSubjectInput);
                  }
                }}
                className="flex-1 text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={() => handleAddSubject(newSubjectInput)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Ajouter
              </button>
            </div>

            {/* Selected Subjects list */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-700 space-y-2">
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">
                Matières actuellement enregistrées ({mainSubjects.length}) :
              </span>
              {mainSubjects.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {mainSubjects.map((sub) => (
                    <span
                      key={sub}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-2xs"
                    >
                      <span>{sub}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSubject(sub)}
                        className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                        aria-label={`Retirer la matière ${sub}`}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-[11px] text-amber-700 dark:text-amber-300 font-medium">
                  Aucune matière sélectionnée. Ajoute au moins une matière.
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-sm shadow-emerald-600/20 flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Enregistrer mon profil</span>
            </button>
          </div>
        </form>
      )}

    </div>
  );
};
