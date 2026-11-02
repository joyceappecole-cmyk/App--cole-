import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Scroll, 
  Sparkles, 
  Calendar, 
  HelpCircle, 
  Search, 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowRight, 
  ChevronRight, 
  Flame, 
  BookMarked, 
  PenTool, 
  Lightbulb, 
  ShieldCheck, 
  Compass, 
  Eye, 
  Layers, 
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { 
  BIBLE_BOOKS, 
  BIBLE_PROPHECIES, 
  BIBLE_WISDOM_VERSES, 
  BIBLE_STUDY_METHODS, 
  BIBLE_DAILY_PLANS, 
  BIBLE_CONTRADICTIONS 
} from '../data/biblicalData';
import { BibleBook, BibleVerse, BibleProphecy, WisdomVerse } from '../types';

interface BiblicalStudiesViewProps {
  studentName?: string;
  onNavigateTab?: (tab: string) => void;
}

type BiblicalSubTab = 'bible' | 'propheties' | 'sagesse' | 'guide' | 'contradictions';

const STORAGE_KEYS = {
  DAILY_READING_PROGRESS: 'revigenius_bible_daily_reading_progress',
  STUDENT_CONTRADICTION_NOTES: 'revigenius_bible_contradiction_notes',
  STUDY_NOTES: 'revigenius_bible_personal_study_notes',
};

export const BiblicalStudiesView: React.FC<BiblicalStudiesViewProps> = ({
  studentName,
  onNavigateTab,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<BiblicalSubTab>('bible');

  // --- 1. Bible Reader State ---
  const [selectedBookId, setSelectedBookId] = useState<string>('proverbes');
  const [selectedChapter, setSelectedChapter] = useState<number>(3);
  const [bibleSearchQuery, setBibleSearchQuery] = useState<string>('');
  const [copiedVerseRef, setCopiedVerseRef] = useState<string | null>(null);

  // --- 2. Prophecies State ---
  const [prophecyCategoryFilter, setProphecyCategoryFilter] = useState<string>('Tous');

  // --- 3. Wisdom Verses State ---
  const [wisdomThemeFilter, setWisdomThemeFilter] = useState<string>('Tous');

  // --- 4. Daily Plan Progress State ---
  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DAILY_READING_PROGRESS);
      return saved ? JSON.parse(saved) : [1];
    } catch {
      return [1];
    }
  });

  const toggleDayCompleted = (day: number) => {
    setCompletedDays((prev) => {
      const next = prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day];
      try {
        localStorage.setItem(STORAGE_KEYS.DAILY_READING_PROGRESS, JSON.stringify(next));
      } catch (e) {
        console.warn('Storage error:', e);
      }
      return next;
    });
  };

  // --- 5. Contradictions State ---
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [contradictionNotes, setContradictionNotes] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STUDENT_CONTRADICTION_NOTES);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleSolution = (id: string) => {
    setRevealedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNoteChange = (id: string, text: string) => {
    const updated = { ...contradictionNotes, [id]: text };
    setContradictionNotes(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.STUDENT_CONTRADICTION_NOTES, JSON.stringify(updated));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  };

  // Current Book & Verses
  const currentBook = BIBLE_BOOKS.find((b) => b.id === selectedBookId) || BIBLE_BOOKS[0];
  const availableChapters = Object.keys(currentBook.chapters).map(Number).sort((a, b) => a - b);
  const currentVerses = currentBook.chapters[selectedChapter] || currentBook.chapters[availableChapters[0]] || [];

  const handleCopyText = (ref: string, text: string) => {
    navigator.clipboard?.writeText(`${text} (${ref})`);
    setCopiedVerseRef(ref);
    setTimeout(() => setCopiedVerseRef(null), 2000);
  };

  // Filter prophecies
  const filteredProphecies = prophecyCategoryFilter === 'Tous'
    ? BIBLE_PROPHECIES
    : BIBLE_PROPHECIES.filter((p) => p.category === prophecyCategoryFilter);

  // Filter wisdom
  const filteredWisdom = wisdomThemeFilter === 'Tous'
    ? BIBLE_WISDOM_VERSES
    : BIBLE_WISDOM_VERSES.filter((w) => w.theme === wisdomThemeFilter);

  return (
    <div className="space-y-6 pb-20 md:pb-12 max-w-6xl mx-auto">
      
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-200 border border-amber-300/30">
              <Scroll className="w-3.5 h-3.5" />
              <span>Espace d'Études Bibliques & Théologie</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Centre d'Étude & de Révision Biblique
            </h1>
            
            <p className="text-xs sm:text-sm text-amber-100/90 max-w-2xl leading-relaxed">
              Consulte la Bible hors-ligne, analyse les prophéties accomplies, médite les maximes de sagesse, structure ton étude quotidienne et résous les contradictions apparentes par une recherche rigoureuse.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onNavigateTab?.('bible-numerique')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm bg-white hover:bg-amber-50 text-amber-900 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-amber-700" />
                <span>Lire la Bible numérique intégrée (LSG 1910)</span>
                <ArrowRight className="w-4 h-4 text-amber-700" />
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-700/50 text-xs text-amber-100 max-w-xs shrink-0 space-y-1.5">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4" />
              <span>Conseil d'exégète</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              « Examinez toutes choses; retenez ce qui est bon. » (1 Thessaloniciens 5:21). Ne lis pas vite : observe chaque mot.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Sub-Tabs Bar */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveSubTab('bible')}
          className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeSubTab === 'bible'
              ? 'bg-amber-700 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-950/40 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>1. Bible d'étude</span>
        </button>

        <button
          onClick={() => setActiveSubTab('propheties')}
          className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeSubTab === 'propheties'
              ? 'bg-amber-700 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-950/40 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Scroll className="w-4 h-4" />
          <span>2. Prophéties accomplies (AT ➔ NT)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('sagesse')}
          className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeSubTab === 'sagesse'
              ? 'bg-amber-700 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-950/40 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>3. Versets de Sagesse</span>
        </button>

        <button
          onClick={() => setActiveSubTab('guide')}
          className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeSubTab === 'guide'
              ? 'bg-amber-700 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-950/40 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>4. Guide d'étude quotidien</span>
        </button>

        <button
          onClick={() => setActiveSubTab('contradictions')}
          className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeSubTab === 'contradictions'
              ? 'bg-amber-700 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-950/40 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>5. Contradictions apparentes & Réflexion</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* SECTION 1 : BIBLE D'ÉTUDE INSTALLÉE (HORS LIGNE)         */}
      {/* ======================================================== */}
      {activeSubTab === 'bible' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Panneau de sélection : Livres & Chapitres */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                <BookMarked className="w-4 h-4" />
                <span>Livres & Chapitres</span>
              </h2>

              <button
                onClick={() => onNavigateTab?.('bible-numerique')}
                className="w-full py-2 px-3 rounded-xl text-xs font-bold bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/60 dark:hover:bg-amber-950 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Ouvrir les 66 livres complets (LSG)</span>
              </button>

              {/* Sélection du livre */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Livre biblique
                </label>
                <select
                  value={selectedBookId}
                  onChange={(e) => {
                    const newBookId = e.target.value;
                    setSelectedBookId(newBookId);
                    const book = BIBLE_BOOKS.find((b) => b.id === newBookId);
                    if (book) {
                      const firstCh = Object.keys(book.chapters).map(Number)[0] || 1;
                      setSelectedChapter(firstCh);
                    }
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-amber-500"
                >
                  <optgroup label="Ancien Testament">
                    {BIBLE_BOOKS.filter((b) => b.testament === 'Ancien').map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} ({b.category})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Nouveau Testament">
                    {BIBLE_BOOKS.filter((b) => b.testament === 'Nouveau').map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} ({b.category})
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Sélection du chapitre */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Chapitre d'étude
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {availableChapters.map((ch) => (
                    <button
                      key={ch}
                      onClick={() => setSelectedChapter(ch)}
                      className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedChapter === ch
                          ? 'bg-amber-700 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fiche descriptive du livre */}
              <div className="p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                <div className="font-bold">{currentBook.name}</div>
                <div className="text-[11px] text-amber-800 dark:text-amber-300/80 leading-relaxed">
                  {currentBook.description}
                </div>
              </div>

              {/* Recherche rapide */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <Search className="w-3.5 h-3.5 text-amber-600" />
                  <span>Filtrer les versets</span>
                </label>
                <input
                  type="text"
                  value={bibleSearchQuery}
                  onChange={(e) => setBibleSearchQuery(e.target.value)}
                  placeholder="Rechercher un mot..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs placeholder:text-slate-400"
                />
              </div>

            </div>
          </div>

          {/* Lecteur de Texte Biblique */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                    {currentBook.name} — Chapitre {selectedChapter}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Traduction d'étude française fidèle · Mode 100% Hors-ligne
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  {currentBook.testament} Testament
                </span>
              </div>

              {/* Liste des versets */}
              <div className="space-y-4 text-slate-800 dark:text-slate-200 leading-relaxed font-serif text-base sm:text-lg">
                {currentVerses
                  .filter((v) => !bibleSearchQuery || v.text.toLowerCase().includes(bibleSearchQuery.toLowerCase()))
                  .map((verse) => {
                    const verseRef = `${currentBook.name} ${verse.chapter}:${verse.verse}`;
                    return (
                      <div 
                        key={verse.verse} 
                        className="group relative p-3 rounded-2xl hover:bg-amber-50/50 dark:hover:bg-amber-950/20 transition-colors flex items-start gap-3"
                      >
                        <span className="font-sans font-bold text-xs text-amber-700 dark:text-amber-400 min-w-[28px] pt-1 select-none">
                          {verse.verse}
                        </span>
                        
                        <p className="flex-1 font-serif text-slate-800 dark:text-slate-200">
                          {verse.text}
                        </p>

                        <button
                          onClick={() => handleCopyText(verseRef, verse.text)}
                          title="Copier le verset"
                          className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-amber-700 dark:hover:text-amber-400 hover:bg-white dark:hover:bg-slate-800 transition-all shrink-0 cursor-pointer"
                        >
                          {copiedVerseRef === verseRef ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    );
                  })}
              </div>

            </div>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* SECTION 2 : PROPHÉTIES ACCOMPLIES (AT ➔ NT)              */}
      {/* ======================================================== */}
      {activeSubTab === 'propheties' && (
        <div className="space-y-6">
          
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Les Prophéties Messianiques de l'Ancien Testament accomplies au Nouveau Testament
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Tableau d'analyse exégétique comparative montrant la fidélité prophétique des Écritures.
              </p>
            </div>

            {/* Filtre thématique */}
            <div className="flex flex-wrap gap-1.5">
              {['Tous', 'Naissance & Origine', 'Ministère & Miracles', 'Trahison & Passion', 'Résurrection & Gloire'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setProphecyCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    prophecyCategoryFilter === cat
                      ? 'bg-amber-700 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {filteredProphecies.map((prophecy) => (
              <div 
                key={prophecy.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 hover:border-amber-400/60 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                      {prophecy.title}
                    </h3>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 w-fit">
                    {prophecy.category}
                  </span>
                </div>

                {/* Face-à-face comparatif */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Colonne Ancien Testament */}
                  <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                        Ancien Testament (Annonce)
                      </span>
                      <span className="text-xs font-bold text-amber-900 dark:text-amber-200 font-mono">
                        {prophecy.otReference}
                      </span>
                    </div>
                    <blockquote className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-serif italic">
                      {prophecy.otText}
                    </blockquote>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-amber-200/40">
                      <strong>Contexte :</strong> {prophecy.otContext}
                    </p>
                  </div>

                  {/* Colonne Nouveau Testament */}
                  <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                        Nouveau Testament (Accomplissement)
                      </span>
                      <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 font-mono">
                        {prophecy.ntReference}
                      </span>
                    </div>
                    <blockquote className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-serif italic">
                      {prophecy.ntText}
                    </blockquote>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-emerald-200/40">
                      <strong>Sens théologique :</strong> {prophecy.fulfillmentExplanation}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* SECTION 3 : VERSETS DE SAGESSE DE LA BIBLE               */}
      {/* ======================================================== */}
      {activeSubTab === 'sagesse' && (
        <div className="space-y-6">
          
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Les Versets de Sagesse pour l'Étudiant
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Principes de Proverbes, Ecclésiaste et Jacques pour cultiver l'intelligence, la paix et la discipline.
              </p>
            </div>

            {/* Filtre de thématiques */}
            <div className="flex flex-wrap gap-1.5">
              {['Tous', 'Sagesse & Intelligence', 'Travail & Études', 'Paix & Anxiété', 'Patience & Maîtrise de soi', 'Humilité & Vérité', 'Persévérance'].map((th) => (
                <button
                  key={th}
                  onClick={() => setWisdomThemeFilter(th)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    wisdomThemeFilter === th
                      ? 'bg-amber-700 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {th}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredWisdom.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                      {item.theme}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
                      {item.reference}
                    </span>
                  </div>

                  <p className="text-sm font-serif italic text-slate-800 dark:text-slate-100 leading-relaxed">
                    {item.text}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    <strong className="text-amber-800 dark:text-amber-400">Application : </strong>
                    {item.practicalReflection}
                  </div>
                  
                  <button
                    onClick={() => handleCopyText(item.reference, item.text)}
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    {copiedVerseRef === item.reference ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedVerseRef === item.reference ? 'Copié !' : 'Copier le verset'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* SECTION 4 : GUIDE POUR APPRENDRE ET ÉTUDIER LA BIBLE     */}
      {/* ======================================================== */}
      {activeSubTab === 'guide' && (
        <div className="space-y-8">
          
          {/* Les Méthodes Universitaires d'Étude */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Méthodes d'Exégèse & d'Étude Biblique Quotidienne
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Comment lire, interpréter et appliquer les Écritures de manière méthodique et sans anachronisme.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BIBLE_STUDY_METHODS.map((method) => (
                <div 
                  key={method.id} 
                  className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300">
                        {method.acronym}
                      </span>
                      <span className="text-xs text-slate-500">{method.subtitle}</span>
                    </div>

                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                      {method.name}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      {method.description}
                    </p>

                    <div className="space-y-3 pt-2">
                      {method.steps.map((st, i) => (
                        <div key={i} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 space-y-1">
                          <h4 className="text-xs font-bold text-amber-900 dark:text-amber-300">
                            {st.step}
                          </h4>
                          <p className="text-[11px] text-slate-600 dark:text-slate-300">
                            {st.description}
                          </p>
                          <ul className="text-[10px] text-slate-500 space-y-0.5 list-disc pl-4 pt-1">
                            {st.guidingQuestions.map((q, qi) => (
                              <li key={qi}>{q}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 text-xs text-amber-900 dark:text-amber-300">
                    <strong>Exemple : </strong>{method.exampleApplication}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Programme de Lecture & Méditation Quotidien */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Plan de Méditation Biblique Quotidien (Semaine 1)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Coche chaque jour après avoir complété ta lecture et ta méditation.
                </p>
              </div>
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400">
                {completedDays.length} / {BIBLE_DAILY_PLANS.length} jours complétés
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {BIBLE_DAILY_PLANS.map((plan) => {
                const isDone = completedDays.includes(plan.day);
                return (
                  <div
                    key={plan.day}
                    onClick={() => toggleDayCompleted(plan.day)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isDone
                        ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:border-amber-300'
                    }`}
                  >
                    <div className="pt-0.5">
                      <div className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-colors ${
                        isDone ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 dark:border-slate-600'
                      }`}>
                        {isDone && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-slate-900 dark:text-white">
                          Jour {plan.day} : {plan.theme}
                        </span>
                        <span className="font-mono text-amber-700 dark:text-amber-400">
                          {plan.passage}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                        <strong>Méditation :</strong> {plan.meditationPrompt}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* SECTION 5 : CONTRADICTIONS DE LA BIBLE & RÉFLEXION       */}
      {/* ======================================================== */}
      {activeSubTab === 'contradictions' && (
        <div className="space-y-6">
          
          <div className="bg-amber-50 dark:bg-amber-950/40 rounded-3xl p-6 border border-amber-200 dark:border-amber-800/60 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-bold text-base">
              <HelpCircle className="w-5 h-5 text-amber-700" />
              <span>Laboratoire d'Exégèse : Penser par soi-même</span>
            </div>
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              Cette section est spécialement réservée aux <strong>contradictions apparentes</strong> de la Bible. L'objectif universitaire est de pousser l'étudiant à examiner les contextes historiques, les genres littéraires et les nuances hébraïques ou grecques par lui-même avant de découvrir les pistes de résolution.
            </p>
          </div>

          <div className="space-y-6">
            {BIBLE_CONTRADICTIONS.map((item) => {
              const isRevealed = revealedSolutions[item.id] || false;
              const studentNote = contradictionNotes[item.id] || '';

              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </h3>
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 w-fit">
                      {item.category}
                    </span>
                  </div>

                  {/* Les deux textes en face-à-face */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-bold text-rose-800 dark:text-rose-300">
                        <span>Texte A</span>
                        <span className="font-mono">{item.passageA.reference}</span>
                      </div>
                      <p className="text-xs sm:text-sm font-serif italic text-slate-800 dark:text-slate-200">
                        {item.passageA.text}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-bold text-blue-800 dark:text-blue-300">
                        <span>Texte B</span>
                        <span className="font-mono">{item.passageB.reference}</span>
                      </div>
                      <p className="text-xs sm:text-sm font-serif italic text-slate-800 dark:text-slate-200">
                        {item.passageB.text}
                      </p>
                    </div>
                  </div>

                  {/* Question de réflexion pour l'étudiant */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-400">
                      <Lightbulb className="w-4 h-4" />
                      <span>Question d'investigation pour toi :</span>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                      {item.reflectionQuestion}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                      <strong>Indice de recherche : </strong>{item.studentHint}
                    </p>
                  </div>

                  {/* Espace de saisie de recherche personnelle */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <PenTool className="w-3.5 h-3.5 text-amber-600" />
                      <span>Tes conclusions & notes de recherche :</span>
                    </label>
                    <textarea
                      value={studentNote}
                      onChange={(e) => handleNoteChange(item.id, e.target.value)}
                      placeholder="Note ici ton hypothèse d'harmonisation avant de consulter la solution..."
                      rows={2}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  {/* Bouton pour révéler les clés d'harmonisation */}
                  <div className="pt-2">
                    <button
                      onClick={() => toggleSolution(item.id)}
                      className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/50 text-amber-900 dark:text-amber-200 text-xs font-bold transition-colors cursor-pointer border border-amber-200 dark:border-amber-800/60"
                    >
                      <span className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-amber-700" />
                        <span>{isRevealed ? 'Masquer les clés d\'harmonisation' : 'Révéler les clés d\'harmonisation exégétique'}</span>
                      </span>
                      {isRevealed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {isRevealed && (
                      <div className="mt-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3 text-xs animate-in fade-in duration-200">
                        <div>
                          <strong className="text-slate-900 dark:text-white">1. Contexte historique & littéraire :</strong>
                          <p className="text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                            {item.harmonizationKeys.historicalContext}
                          </p>
                        </div>
                        <div>
                          <strong className="text-slate-900 dark:text-white">2. Éclairage linguistique (Hébreu / Grec) :</strong>
                          <p className="text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                            {item.harmonizationKeys.linguisticInsight}
                          </p>
                        </div>
                        <div>
                          <strong className="text-slate-900 dark:text-white">3. Résolution théologique :</strong>
                          <p className="text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                            {item.harmonizationKeys.theologicalResolution}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
};
