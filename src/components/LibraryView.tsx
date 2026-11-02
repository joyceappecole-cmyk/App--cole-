import React, { useState, useMemo } from 'react';
import {
  ExternalLink,
  Search,
  Globe,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Download,
  Wifi,
  Languages,
  Info,
  ShieldCheck,
  Building2,
  Scale,
  Cpu,
  Layers,
  TrendingUp,
  Sprout,
  GraduationCap,
  Users,
  Pill,
  HeartPulse,
  Compass,
  Radio,
  Landmark,
  Zap,
  Flame,
  HelpCircle
} from 'lucide-react';
import { FACULTY_RECOMMENDED_LIBRARIES } from '../data/libraryData';
import { FACULTIES } from '../data/mockData';
import { FacultyId, DigitalLibraryEntry } from '../types';

interface LibraryViewProps {
  studentFacultyId?: string;
  studentFacultyName?: string;
  studentCountry?: string;
}

// Icon mapper for faculty badges
const FACULTY_ICONS: Record<string, React.FC<{ className?: string }>> = {
  medecine_sante: HeartPulse,
  droit: Scale,
  informatique: Cpu,
  sciences_ingenierie: Layers,
  eco_gestion: TrendingUp,
  agronomie_env: Sprout,
  sciences_education: GraduationCap,
  sciences_sociales_humaines: Users,
  pharmacie: Pill,
  sciences_infirmieres: HeartPulse,
  architecture: Compass,
  communication_journalisme: Radio,
  sciences_politiques: Landmark,
  energie_renouvelable: Zap,
  petrole_gaz: Flame,
  autre: HelpCircle,
};

export const LibraryView: React.FC<LibraryViewProps> = ({
  studentFacultyId = 'informatique',
  studentFacultyName = 'Informatique et technologies',
  studentCountry = 'France',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('my_faculty');

  // Normalize current student faculty id
  const validStudentFacultyId = useMemo<FacultyId>(() => {
    if (studentFacultyId in FACULTY_RECOMMENDED_LIBRARIES) {
      return studentFacultyId as FacultyId;
    }
    return 'informatique';
  }, [studentFacultyId]);

  // List of all 15 domains with their count and details
  const domainList = useMemo(() => {
    return FACULTIES.map((fac) => ({
      id: fac.id,
      name: fac.name,
      badge: fac.badge,
      color: fac.color,
      count: FACULTY_RECOMMENDED_LIBRARIES[fac.id]?.length || 0,
    }));
  }, []);

  // Filtered libraries based on selected domain and search term
  const displayedLibraries = useMemo(() => {
    let list: DigitalLibraryEntry[] = [];

    if (selectedDomain === 'my_faculty') {
      list = FACULTY_RECOMMENDED_LIBRARIES[validStudentFacultyId] || [];
    } else if (selectedDomain === 'all') {
      // Gather all unique domain entries (15 domains x 2 = 30)
      const seen = new Set<string>();
      FACULTIES.forEach((fac) => {
        const libs = FACULTY_RECOMMENDED_LIBRARIES[fac.id] || [];
        libs.forEach((lib) => {
          if (!seen.has(lib.id)) {
            seen.add(lib.id);
            list.push(lib);
          }
        });
      });
    } else {
      const facId = selectedDomain as FacultyId;
      list = FACULTY_RECOMMENDED_LIBRARIES[facId] || [];
    }

    if (!searchTerm.trim()) {
      return list;
    }

    const query = searchTerm.toLowerCase();
    return list.filter(
      (lib) =>
        lib.name.toLowerCase().includes(query) ||
        lib.description.toLowerCase().includes(query) ||
        lib.coveredDomains.toLowerCase().includes(query) ||
        lib.language.toLowerCase().includes(query) ||
        lib.accessTerms.toLowerCase().includes(query)
    );
  }, [selectedDomain, validStudentFacultyId, searchTerm]);

  // Find faculty name for currently displayed domain
  const activeDomainName = useMemo(() => {
    if (selectedDomain === 'my_faculty') return studentFacultyName;
    if (selectedDomain === 'all') return 'Tous les 15 domaines universitaires';
    const match = FACULTIES.find((f) => f.id === selectedDomain);
    return match ? match.name : studentFacultyName;
  }, [selectedDomain, studentFacultyName]);

  return (
    <div className="space-y-6 pb-20 md:pb-12">
      {/* 1. Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              {domainList.length} Domaines &bull; {domainList.length * 2} Bibliothèques officielles
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
            Bibliothèques numériques universitaires
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Recommandations ciblées d'ouvrages académiques, manuels en accès ouvert et traités scientifiques pour réussir tes examens.
          </p>
        </div>

        {/* Search */}
        <div className="relative min-w-[240px] sm:w-72 w-full sm:w-auto">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Rechercher une bibliothèque, matière..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
          />
        </div>
      </div>

      {/* 2. Mandatory Important Warning & Offline Notice */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        <div className="bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 rounded-2xl p-4 flex items-start gap-3 text-xs">
          <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 shrink-0 mt-0.5">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-bold text-emerald-950 dark:text-emerald-200 text-sm">
              Catalogue de recommandations vérifiées
            </h2>
            <p className="text-emerald-800 dark:text-emerald-300 mt-1 leading-relaxed text-[11px]">
              RéviGenius n'héberge pas les livres dans cette version. Il s'agit d'un répertoire institutionnel guidant vers les sites officiels universitaires vérifiés et sans contrefaçon.
            </p>
          </div>
        </div>

        <div className="bg-sky-50/80 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900/60 rounded-2xl p-4 flex items-start gap-3 text-xs">
          <div className="p-2 rounded-xl bg-sky-100 dark:bg-sky-900/60 text-sky-700 dark:text-sky-300 shrink-0 mt-0.5">
            <Wifi className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-bold text-sky-950 dark:text-sky-200 text-sm">
              Consultation hors ligne & Accès web
            </h2>
            <p className="text-sky-800 dark:text-sky-300 mt-1 leading-relaxed text-[11px]">
              Toutes les fiches descriptives et critères d'accès restent disponibles hors ligne sur ton appareil. Une <strong>connexion Internet</strong> est requise pour visiter les sites externes.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Primary Faculty Banner & Domain Switcher */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xs space-y-4 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Faculté de ton profil étudiant
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                {studentFacultyName}
                {studentCountry && (
                  <span className="text-xs font-normal text-slate-500 dark:text-slate-400 ml-1.5">
                    ({studentCountry})
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedDomain('my_faculty')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all min-h-[40px] flex items-center gap-1.5 cursor-pointer ${
                selectedDomain === 'my_faculty'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ma faculté</span>
            </button>
            <button
              onClick={() => setSelectedDomain('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all min-h-[40px] flex items-center gap-1.5 cursor-pointer ${
                selectedDomain === 'all'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Tous les {domainList.length} domaines</span>
            </button>
          </div>
        </div>

        {/* Domain Chips Scrollable / Grid */}
        <div>
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2.5 flex items-center justify-between">
            <span>Explorer un domaine universitaire spécifique :</span>
            <span className="text-[11px] font-normal text-slate-500 dark:text-slate-400">{domainList.length} domaines</span>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {domainList.map((dom) => {
              const isSelected = selectedDomain === dom.id;
              const isMyFaculty = dom.id === validStudentFacultyId;
              const IconComp = FACULTY_ICONS[dom.id] || HelpCircle;

              return (
                <button
                  key={dom.id}
                  onClick={() => setSelectedDomain(dom.id)}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 min-h-[36px] cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white dark:bg-emerald-600 shadow-xs'
                      : isMyFaculty
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/60'
                      : 'bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5 shrink-0" />
                  <span>{dom.badge}</span>
                  {isMyFaculty && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Domain Section Heading */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {activeDomainName}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {displayedLibraries.length} bibliothèque{displayedLibraries.length > 1 ? 's' : ''} recommandée{displayedLibraries.length > 1 ? 's' : ''} avec accès officiel vérifié
          </p>
        </div>
      </div>

      {/* 5. Library Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {displayedLibraries.map((lib) => {
          const isDirectlyRecommended = lib.facultyId === validStudentFacultyId;
          const facultyMeta = FACULTIES.find((f) => f.id === lib.facultyId);

          return (
            <div
              key={lib.id}
              className={`bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border flex flex-col justify-between transition-all ${
                isDirectlyRecommended
                  ? 'border-emerald-300 dark:border-emerald-700/80 ring-1 ring-emerald-500/20 shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs'
              }`}
            >
              <div className="space-y-3.5">
                {/* Header row: faculty tag & badge */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                      {facultyMeta?.badge || lib.facultyId}
                    </span>
                    {isDirectlyRecommended && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        Recommandé pour ton cursus
                      </span>
                    )}
                    {lib.isDownloadableOffline || lib.accessTerms.toLowerCase().includes('téléchargeable') || lib.accessTerms.toLowerCase().includes('pdf') ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                        <Download className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        <span>Téléchargeable (PDF libre)</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800 flex items-center gap-1">
                        <Globe className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                        <span>En ligne (Connexion requise)</span>
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Languages className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                    {lib.language}
                  </span>
                </div>

                {/* Library Title */}
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white leading-snug">
                    {lib.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {lib.description}
                  </p>
                </div>

                {/* Details Breakdown */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Domaines couverts : </span>
                    <span className="text-slate-600 dark:text-slate-400">{lib.coveredDomains}</span>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Conditions d'accès : </span>
                    <span className="text-slate-600 dark:text-slate-400">{lib.accessTerms}</span>
                  </div>

                  {/* Country specific note (e.g. for law in France / Francophone countries) */}
                  {lib.countryNote && (
                    <div className="p-2.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/70 dark:border-amber-800/60 text-[11px] text-amber-900 dark:text-amber-300 flex items-start gap-2 mt-2">
                      <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong>Précision territoriale ({studentCountry || 'International'}) : </strong>
                        <span>{lib.countryNote}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500 font-mono truncate max-w-[220px]">
                  <Globe className="w-3.5 h-3.5 shrink-0 text-slate-400 dark:text-slate-500" />
                  <span className="truncate">{lib.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
                </div>

                <a
                  href={lib.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl transition-all shadow-xs min-h-[42px] cursor-pointer"
                >
                  <span>Visiter la bibliothèque</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* 6. Empty state if search finds nothing */}
      {displayedLibraries.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-6 space-y-3">
          <HelpCircle className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">
            Aucune bibliothèque trouvée pour "{searchTerm}"
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Essaie de rechercher par mot-clé général (ex: médecine, droit, manuels, libre, anglais).
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedDomain('all');
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors"
          >
            Afficher toutes les 30 bibliothèques
          </button>
        </div>
      )}

      {/* 7. Academic Integrity & Research Advice */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Science Ouverte & Éthique Universitaire</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white">
            Comment citer ces sources dans tes travaux universitaires ?
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Lorsque tu utilises des extraits de ces manuels en accès ouvert ou des publications institutionnelles, mentionne toujours l'auteur, l'éditeur universitaire et l'URL officielle selon les normes bibliographiques (APA, ISO-690 ou Vancouver pour la médecine).
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 shrink-0 text-xs space-y-1.5 sm:w-64">
          <div className="flex items-center gap-2 text-emerald-300 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Ressources Certifiées</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-snug">
            Toutes les plateformes répertoriées sont maintenues par des universités, des instituts de recherche ou des gouvernements.
          </p>
        </div>
      </div>
    </div>
  );
};
