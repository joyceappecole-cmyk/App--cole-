/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Bookmark, 
  History, 
  Settings2, 
  Share2, 
  Copy, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  DownloadCloud, 
  CheckCircle2, 
  Sparkles, 
  Sun, 
  Moon, 
  Type, 
  X, 
  Heart, 
  ExternalLink,
  BookMarked,
  Filter,
  ArrowRight,
  Flame,
  HelpCircle,
  Tag
} from 'lucide-react';
import { 
  bibleService, 
  BIBLE_BOOKS_CATALOG, 
  BibleBookData 
} from '../services/bibleService';
import { 
  BibleMetaBook, 
  BibleBookmark, 
  BibleReadingHistoryItem, 
  BibleReadingSettings,
  BibleVerse 
} from '../types';

interface DigitalBibleViewProps {
  onNavigateTab?: (tab: string) => void;
}

export const DigitalBibleView: React.FC<DigitalBibleViewProps> = ({ onNavigateTab }) => {
  // Navigation position state
  const lastPos = bibleService.getLastReadingPosition();
  const [currentBookNr, setCurrentBookNr] = useState<number>(lastPos.bookNr || 43); // Jean by default
  const [currentChapterNr, setCurrentChapterNr] = useState<number>(lastPos.chapter || 3);
  const [highlightVerseNr, setHighlightVerseNr] = useState<number | null>(null);

  // Chapter content state
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [chapterVerses, setChapterVerses] = useState<BibleVerse[]>([]);
  const [currentBookMeta, setCurrentBookMeta] = useState<BibleMetaBook>(() => {
    return bibleService.getBookMeta(currentBookNr) || BIBLE_BOOKS_CATALOG[42];
  });

  // Reading settings state
  const [settings, setSettings] = useState<BibleReadingSettings>(() => {
    return bibleService.getReadingSettings();
  });
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);

  // Book & Chapter Selector Modal
  const [showBookSelector, setShowBookSelector] = useState<boolean>(false);
  const [selectorTestamentFilter, setSelectorTestamentFilter] = useState<'Tous' | 'Ancien' | 'Nouveau'>('Tous');
  const [selectorSearch, setSelectorSearch] = useState<string>('');
  const [selectedBookForChapters, setSelectedBookForChapters] = useState<BibleMetaBook | null>(null);

  // Search Modal
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<{
    reference: string;
    bookNr: number;
    chapter: number;
    verse: number;
    text: string;
  }[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Bookmarks Modal & State
  const [bookmarks, setBookmarks] = useState<BibleBookmark[]>(() => bibleService.getBookmarks());
  const [showBookmarksModal, setShowBookmarksModal] = useState<boolean>(false);
  const [bookmarkFilterTag, setBookmarkFilterTag] = useState<string>('Tous');

  // History Modal & State
  const [historyItems, setHistoryItems] = useState<BibleReadingHistoryItem[]>(() => bibleService.getReadingHistory());
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);

  // Selected Verse Action Drawer (Favorite / Copy / Share)
  const [selectedVerseForAction, setSelectedVerseForAction] = useState<{
    verse: BibleVerse;
    isBookmarked: boolean;
    bookmarkData?: BibleBookmark | null;
  } | null>(null);
  const [bookmarkNoteInput, setBookmarkNoteInput] = useState<string>('');
  const [bookmarkTagInput, setBookmarkTagInput] = useState<'Prière' | 'Promesse' | 'Méditation' | 'Foi' | 'Sagesse'>('Méditation');
  const [bookmarkColorInput, setBookmarkColorInput] = useState<'amber' | 'emerald' | 'sky' | 'rose' | 'purple'>('amber');

  // Verset du Jour
  const verseOfTheDay = useMemo(() => bibleService.getVerseOfTheDay(), []);
  const [showDailyCard, setShowDailyCard] = useState<boolean>(true);

  // Share Card Modal
  const [shareCardData, setShareCardData] = useState<{
    reference: string;
    text: string;
  } | null>(null);
  const [shareCopied, setShareCopied] = useState<boolean>(false);

  // Offline Sync State
  const [isFullyOfflineCached, setIsFullyOfflineCached] = useState<boolean>(() => bibleService.isOfflineFullyCached());
  const [isSyncingOffline, setIsSyncingOffline] = useState<boolean>(false);
  const [syncProgress, setSyncProgress] = useState<{ loaded: number; total: number }>({ loaded: 0, total: 66 });

  // Copied indicator
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  const readerTopRef = useRef<HTMLDivElement>(null);

  // 1. Load Chapter when currentBookNr or currentChapterNr changes
  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);

    const meta = bibleService.getBookMeta(currentBookNr) || BIBLE_BOOKS_CATALOG[0];
    setCurrentBookMeta(meta);

    bibleService.loadChapter(currentBookNr, currentChapterNr).then((res) => {
      if (isCancelled) return;
      if (res && res.verses.length > 0) {
        setChapterVerses(res.verses);
        // Record in reading history
        const firstVerseText = res.verses[0]?.text?.substring(0, 90) + '...';
        bibleService.recordReading(currentBookNr, meta.name, currentChapterNr, firstVerseText);
        setHistoryItems(bibleService.getReadingHistory());
      } else {
        setChapterVerses([]);
      }
      setIsLoading(false);
    }).catch((err) => {
      if (isCancelled) return;
      console.warn('Error loading chapter:', err);
      setIsLoading(false);
    });

    return () => {
      isCancelled = true;
    };
  }, [currentBookNr, currentChapterNr]);

  // Scroll to highlighted verse if specified
  useEffect(() => {
    if (highlightVerseNr && !isLoading) {
      setTimeout(() => {
        const el = document.getElementById(`v-${highlightVerseNr}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
    }
  }, [highlightVerseNr, isLoading]);

  // Handle Reading Settings Update
  const updateSettings = (partial: Partial<BibleReadingSettings>) => {
    const updated = { ...settings, ...partial };
    setSettings(updated);
    bibleService.saveReadingSettings(updated);
  };

  // Chapter Navigation
  const goToNextChapter = () => {
    if (currentChapterNr < currentBookMeta.chaptersCount) {
      setCurrentChapterNr((prev) => prev + 1);
      setHighlightVerseNr(null);
      readerTopRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (currentBookNr < 66) {
      // Next Book Chapter 1
      const nextBookNr = currentBookNr + 1;
      setCurrentBookNr(nextBookNr);
      setCurrentChapterNr(1);
      setHighlightVerseNr(null);
      readerTopRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToPrevChapter = () => {
    if (currentChapterNr > 1) {
      setCurrentChapterNr((prev) => prev - 1);
      setHighlightVerseNr(null);
      readerTopRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (currentBookNr > 1) {
      // Prev Book Last Chapter
      const prevBookNr = currentBookNr - 1;
      const prevMeta = bibleService.getBookMeta(prevBookNr);
      setCurrentBookNr(prevBookNr);
      setCurrentChapterNr(prevMeta ? prevMeta.chaptersCount : 1);
      setHighlightVerseNr(null);
      readerTopRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Jump to specific book and chapter
  const handleSelectBookChapter = (bookNr: number, chapterNr: number, verseNr?: number) => {
    setCurrentBookNr(bookNr);
    setCurrentChapterNr(chapterNr);
    setHighlightVerseNr(verseNr || null);
    setShowBookSelector(false);
    setSelectedBookForChapters(null);
    setShowSearchModal(false);
    setShowBookmarksModal(false);
    setShowHistoryModal(false);
    readerTopRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Pre-fetch all books for 100% offline access
  const handleDownloadAllForOffline = async () => {
    if (isSyncingOffline) return;
    setIsSyncingOffline(true);
    setSyncProgress({ loaded: 0, total: 66 });

    await bibleService.prefetchAllBooks((loaded, total) => {
      setSyncProgress({ loaded, total });
    });

    setIsFullyOfflineCached(true);
    setIsSyncingOffline(false);
    showToastNotification('La Bible complète (66 livres) est disponible hors-ligne !');
  };

  // Open Verse Action Drawer
  const handleVerseClick = (verse: BibleVerse) => {
    const existing = bibleService.isVerseBookmarked(currentBookNr, currentChapterNr, verse.verse);
    setSelectedVerseForAction({
      verse,
      isBookmarked: !!existing,
      bookmarkData: existing,
    });
    setBookmarkNoteInput(existing?.note || '');
    setBookmarkTagInput(existing?.tag || 'Méditation');
    setBookmarkColorInput(existing?.color || 'amber');
  };

  // Save Bookmark
  const handleSaveBookmark = () => {
    if (!selectedVerseForAction) return;
    const { verse } = selectedVerseForAction;
    bibleService.addBookmark({
      bookNr: currentBookNr,
      bookName: currentBookMeta.name,
      chapter: currentChapterNr,
      verse: verse.verse,
      text: verse.text,
      note: bookmarkNoteInput.trim() || undefined,
      tag: bookmarkTagInput,
      color: bookmarkColorInput,
    });
    setBookmarks(bibleService.getBookmarks());
    setSelectedVerseForAction(null);
    showToastNotification(`Verset ${currentBookMeta.name} ${currentChapterNr}:${verse.verse} ajouté aux favoris`);
  };

  // Remove Bookmark
  const handleRemoveBookmark = (bookmarkId: string) => {
    bibleService.removeBookmark(bookmarkId);
    setBookmarks(bibleService.getBookmarks());
    if (selectedVerseForAction?.bookmarkData?.id === bookmarkId) {
      setSelectedVerseForAction(null);
    }
    showToastNotification('Favori supprimé');
  };

  // Copy Verse Text
  const handleCopyVerse = (refText: string, content: string) => {
    const fullText = `« ${content} »\n— ${refText} (Bible Louis Segond 1910)`;
    navigator.clipboard?.writeText(fullText);
    showToastNotification('Verset copié dans le presse-papier !');
    setSelectedVerseForAction(null);
  };

  // Open Native or Card Share
  const handleShareVerse = async (refText: string, content: string) => {
    const fullText = `« ${content} »\n— ${refText} (Bible Louis Segond 1910)\nLire sur RéviGenius`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Verset : ${refText}`,
          text: fullText,
          url: window.location.href,
        });
        setSelectedVerseForAction(null);
        return;
      } catch (err) {
        // Fallback to in-app share modal
      }
    }
    setShareCardData({ reference: refText, text: content });
    setSelectedVerseForAction(null);
  };

  const showToastNotification = (msg: string) => {
    setCopiedNotification(msg);
    setTimeout(() => {
      setCopiedNotification(null);
    }, 2800);
  };

  // Filtered books catalog for modal
  const filteredBooks = useMemo(() => {
    return BIBLE_BOOKS_CATALOG.filter((b) => {
      const matchesTestament = 
        selectorTestamentFilter === 'Tous' || 
        b.testament === selectorTestamentFilter;
      
      const q = selectorSearch.toLowerCase().trim();
      const matchesSearch = 
        !q || 
        b.name.toLowerCase().includes(q) || 
        b.abbrev.toLowerCase().includes(q) || 
        b.category.toLowerCase().includes(q);

      return matchesTestament && matchesSearch;
    });
  }, [selectorTestamentFilter, selectorSearch]);

  // Handle Search execution
  const executeSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setSearchResults([]);

    // 1. Direct reference parse (e.g. "Jean 3:16", "Ps 23")
    const parsed = bibleService.parseReference(searchQuery);
    if (parsed) {
      const book = bibleService.getBookMeta(parsed.bookNr);
      if (book) {
        const bookData = await bibleService.loadBook(parsed.bookNr);
        if (bookData) {
          const ch = bookData.chapters.find((c) => c.chapter === (parsed.chapter || 1));
          if (ch) {
            const verseMatch = parsed.verse ? ch.verses.find((v) => v.verse === parsed.verse) : ch.verses[0];
            if (verseMatch) {
              setSearchResults([{
                reference: `${book.name} ${ch.chapter}:${verseMatch.verse}`,
                bookNr: book.nr,
                chapter: ch.chapter,
                verse: verseMatch.verse,
                text: verseMatch.text,
              }]);
              setIsSearching(false);
              return;
            }
          }
        }
      }
    }

    // 2. Keyword search across current book and major key books
    const cleanWord = searchQuery.toLowerCase().trim();
    const results: {
      reference: string;
      bookNr: number;
      chapter: number;
      verse: number;
      text: string;
    }[] = [];

    // Search in current book first
    const currentData = await bibleService.loadBook(currentBookNr);
    if (currentData) {
      for (const ch of currentData.chapters) {
        for (const v of ch.verses) {
          if (v.text.toLowerCase().includes(cleanWord)) {
            results.push({
              reference: `${currentBookMeta.name} ${ch.chapter}:${v.verse}`,
              bookNr: currentBookNr,
              chapter: ch.chapter,
              verse: v.verse,
              text: v.text,
            });
            if (results.length >= 25) break;
          }
        }
        if (results.length >= 25) break;
      }
    }

    // If few results, also search in key Gospel (Jean) and Psaumes
    if (results.length < 15) {
      const keyBooksToSearch = [43, 19, 20, 45].filter((nr) => nr !== currentBookNr);
      for (const bNr of keyBooksToSearch) {
        const bMeta = bibleService.getBookMeta(bNr);
        const bData = await bibleService.loadBook(bNr);
        if (bData && bMeta) {
          for (const ch of bData.chapters) {
            for (const v of ch.verses) {
              if (v.text.toLowerCase().includes(cleanWord)) {
                results.push({
                  reference: `${bMeta.name} ${ch.chapter}:${v.verse}`,
                  bookNr: bNr,
                  chapter: ch.chapter,
                  verse: v.verse,
                  text: v.text,
                });
                if (results.length >= 25) break;
              }
            }
            if (results.length >= 25) break;
          }
        }
        if (results.length >= 25) break;
      }
    }

    setSearchResults(results);
    setIsSearching(false);
  };

  // Reader Theme Classes
  const getThemeClasses = () => {
    switch (settings.theme) {
      case 'sepia':
        return 'bg-[#fbf7ee] dark:bg-[#201d16] text-[#3c3022] dark:text-[#e4dcd0] border-[#ecdcc3] dark:border-[#383025]';
      case 'dark':
        return 'bg-slate-900 text-slate-100 border-slate-800';
      case 'oled':
        return 'bg-black text-slate-100 border-zinc-900';
      case 'white':
      default:
        return 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-800';
    }
  };

  const getFontFamilyClass = () => {
    return settings.fontFamily === 'serif' ? 'font-serif' : 'font-sans';
  };

  const getLineHeightClass = () => {
    switch (settings.lineHeight) {
      case 'normal': return 'leading-normal';
      case 'loose': return 'leading-loose';
      case 'relaxed':
      default: return 'leading-relaxed';
    }
  };

  return (
    <div className="space-y-4 pb-20 max-w-4xl mx-auto px-1 sm:px-0">
      
      {/* Toast Notification */}
      {copiedNotification && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 dark:bg-white/90 text-white dark:text-slate-900 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold shadow-xl backdrop-blur-md flex items-center gap-2 animate-in fade-in slide-in-from-top-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
          <span>{copiedNotification}</span>
        </div>
      )}

      {/* TOP HEADER CONTROLS (Android Mobile Friendly) */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-3 sm:p-4 shadow-sm space-y-3 sticky top-16 z-20">
        
        {/* Row 1: Book & Chapter Navigator Button + Action Icons */}
        <div className="flex items-center justify-between gap-2">
          
          {/* Main Book & Chapter Switcher Button */}
          <button
            onClick={() => {
              setSelectedBookForChapters(currentBookMeta);
              setShowBookSelector(true);
            }}
            className="flex-1 flex items-center justify-between gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 text-left transition-all cursor-pointer group active:scale-[0.99]"
            title="Changer de livre et de chapitre"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-emerald-600/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="min-w-0 truncate">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                    {currentBookMeta.name} {currentChapterNr}
                  </span>
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/50">
                    LSG 1910
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {currentBookMeta.testament} Testament • {currentBookMeta.category}
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 shrink-0 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
              Choisir <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </button>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Search Button */}
            <button
              onClick={() => setShowSearchModal(true)}
              aria-label="Rechercher un passage"
              className="p-2 sm:p-2.5 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
              title="Rechercher un passage ou un mot-clé"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Bookmarks Button */}
            <button
              onClick={() => setShowBookmarksModal(true)}
              aria-label="Voir les favoris"
              className="relative p-2 sm:p-2.5 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
              title="Mes versets favoris"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarks.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {bookmarks.length}
                </span>
              )}
            </button>

            {/* Reading Settings Button */}
            <button
              onClick={() => setShowSettingsModal(true)}
              aria-label="Paramètres de lecture"
              className="p-2 sm:p-2.5 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
              title="Police, taille et thèmes"
            >
              <Settings2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Row 2: Chapter Stepper & Offline Mode Badge */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100 dark:border-slate-800/80 text-xs">
          
          {/* Chapter Quick Switcher */}
          <div className="flex items-center gap-1">
            <button
              onClick={goToPrevChapter}
              disabled={currentBookNr === 1 && currentChapterNr === 1}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Chapitre précédent"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-slate-500 dark:text-slate-400 font-medium px-1">
              Chapitre <span className="font-bold text-slate-900 dark:text-white">{currentChapterNr}</span> / {currentBookMeta.chaptersCount}
            </span>

            <button
              onClick={goToNextChapter}
              disabled={currentBookNr === 66 && currentChapterNr === currentBookMeta.chaptersCount}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Chapitre suivant"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Offline Sync State / One-Click Download */}
          <div className="flex items-center gap-1.5">
            {isFullyOfflineCached ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-100/70 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span className="hidden xs:inline">100% Hors-ligne</span>
              </span>
            ) : isSyncingOffline ? (
              <div className="flex items-center gap-1 text-[11px] text-amber-700 dark:text-amber-400 font-medium">
                <span className="animate-spin text-xs">⏳</span>
                <span>{syncProgress.loaded}/{syncProgress.total}</span>
              </div>
            ) : (
              <button
                onClick={handleDownloadAllForOffline}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 transition-colors"
                title="Pré-charger tous les 66 livres pour une lecture complète hors connexion"
              >
                <DownloadCloud className="w-3 h-3" />
                <span>Télécharger 66 livres</span>
              </button>
            )}

            <button
              onClick={() => setShowHistoryModal(true)}
              className="p-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              title="Historique de lecture"
            >
              <History className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* VERSET DU JOUR (DAILY INSPIRATION CARD) */}
      {showDailyCard && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-emerald-600/10 dark:from-amber-950/30 dark:via-slate-900 dark:to-emerald-950/30 border border-amber-200/70 dark:border-amber-800/50 p-4 transition-all">
          <button
            onClick={() => setShowDailyCard(false)}
            className="absolute top-2.5 right-2.5 p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            title="Masquer le verset du jour"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 dark:bg-amber-400/20 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>

            <div className="space-y-1.5 flex-1 pr-4">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  Verset du jour • {verseOfTheDay.theme}
                </span>
              </div>

              <blockquote className="text-xs sm:text-sm font-serif italic text-slate-800 dark:text-slate-200 leading-relaxed">
                « {verseOfTheDay.text} »
              </blockquote>

              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                <strong className="text-slate-900 dark:text-slate-100">{verseOfTheDay.reference}</strong> — {verseOfTheDay.meditation}
              </p>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => handleSelectBookChapter(verseOfTheDay.bookNr, verseOfTheDay.chapter, verseOfTheDay.verse)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 dark:text-amber-300 hover:underline"
                >
                  Lire ce passage <ArrowRight className="w-3 h-3" />
                </button>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <button
                  onClick={() => handleShareVerse(verseOfTheDay.reference, verseOfTheDay.text)}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  <Share2 className="w-3 h-3" /> Partager
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* READING AREA */}
      <div 
        ref={readerTopRef}
        className={`rounded-2xl border p-4 sm:p-7 transition-all duration-200 shadow-sm ${getThemeClasses()} ${getFontFamilyClass()}`}
        style={{ fontSize: `${settings.fontSize}px` }}
      >
        {/* Book & Chapter Header inside reading pane */}
        <div className="border-b pb-4 mb-6 border-current/10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {currentBookMeta.name} {currentChapterNr}
            </h1>
            <p className="text-xs opacity-70 mt-1 max-w-xl">
              {currentBookMeta.description}
            </p>
          </div>

          <div className="text-[11px] opacity-60 uppercase font-sans tracking-wider font-semibold">
            {chapterVerses.length} versets • Louis Segond 1910
          </div>
        </div>

        {/* Loading state */}
        {isLoading ? (
          <div className="py-16 text-center space-y-3 font-sans">
            <div className="w-8 h-8 mx-auto border-3 border-emerald-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm opacity-70">Chargement du texte biblique...</p>
          </div>
        ) : chapterVerses.length === 0 ? (
          <div className="py-12 text-center space-y-3 font-sans">
            <BookOpen className="w-10 h-10 mx-auto text-slate-400 opacity-60" />
            <p className="text-sm opacity-80 font-medium">Ce chapitre n'a pas pu être chargé hors-ligne.</p>
            <button
              onClick={() => handleSelectBookChapter(19, 23)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white"
            >
              Revenir au Psaume 23
            </button>
          </div>
        ) : (
          /* Verses Container */
          <div className={`space-y-3 ${getLineHeightClass()}`}>
            {chapterVerses.map((v) => {
              const isHighlighted = highlightVerseNr === v.verse;
              const bookmark = bookmarks.find(
                (b) => b.bookNr === currentBookNr && b.chapter === currentChapterNr && b.verse === v.verse
              );

              return (
                <div
                  key={v.verse}
                  id={`v-${v.verse}`}
                  onClick={() => handleVerseClick(v)}
                  className={`group relative rounded-xl px-2.5 py-1.5 transition-all cursor-pointer ${
                    isHighlighted 
                      ? 'bg-amber-200/50 dark:bg-amber-900/40 ring-1 ring-amber-400' 
                      : bookmark
                        ? 'bg-amber-50/70 dark:bg-amber-950/20 border-l-2 border-amber-500'
                        : 'hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                  title="Cliquez pour marquer, copier ou partager ce verset"
                >
                  <p className="flex items-baseline gap-2">
                    {settings.showVerseNumbers && (
                      <span className="font-sans font-extrabold text-[11px] opacity-50 select-none shrink-0 w-5 text-right">
                        {v.verse}
                      </span>
                    )}

                    <span className="flex-1">
                      {v.text}
                    </span>

                    {/* Bookmark Indicator if marked */}
                    {bookmark && (
                      <span className="opacity-75 group-hover:opacity-100 transition-opacity ml-1 inline-flex shrink-0">
                        <Bookmark className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      </span>
                    )}
                  </p>

                  {/* Display personal study note attached to this verse */}
                  {bookmark?.note && (
                    <div className="mt-1 ml-7 text-xs font-sans italic opacity-80 bg-amber-100/60 dark:bg-amber-950/40 border-l-2 border-amber-600 p-2 rounded-r-lg">
                      <span className="font-bold not-italic text-amber-800 dark:text-amber-300">Note : </span>
                      {bookmark.note}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* BOTTOM STEPPER IN READING PANE */}
        {!isLoading && chapterVerses.length > 0 && (
          <div className="mt-8 pt-6 border-t border-current/10 flex items-center justify-between gap-3 font-sans">
            <button
              onClick={goToPrevChapter}
              disabled={currentBookNr === 1 && currentChapterNr === 1}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-current/20 hover:bg-current/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Chapitre précédent</span>
            </button>

            <span className="text-xs opacity-60 font-medium hidden sm:inline">
              {currentBookMeta.name} {currentChapterNr}
            </span>

            <button
              onClick={goToNextChapter}
              disabled={currentBookNr === 66 && currentChapterNr === currentBookMeta.chaptersCount}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-current/20 hover:bg-current/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <span>Chapitre suivant</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: BOOK & CHAPTER SELECTOR                                          */}
      {/* ========================================================================= */}
      {showBookSelector && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {selectedBookForChapters ? `Choisir un chapitre • ${selectedBookForChapters.name}` : 'Choisir un livre biblique'}
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowBookSelector(false);
                  setSelectedBookForChapters(null);
                }}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* If a book is selected, show its chapter grid */}
            {selectedBookForChapters ? (
              <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {selectedBookForChapters.name} ({selectedBookForChapters.chaptersCount} chapitres)
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {selectedBookForChapters.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedBookForChapters(null)}
                    className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline shrink-0"
                  >
                    Changer de livre
                  </button>
                </div>

                <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
                  {Array.from({ length: selectedBookForChapters.chaptersCount }, (_, i) => i + 1).map((ch) => {
                    const isCurrent = 
                      selectedBookForChapters.nr === currentBookNr && 
                      ch === currentChapterNr;

                    return (
                      <button
                        key={ch}
                        onClick={() => handleSelectBookChapter(selectedBookForChapters.nr, ch)}
                        className={`h-11 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center cursor-pointer active:scale-95 ${
                          isCurrent
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-emerald-950 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {ch}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Books List View */
              <div className="flex-1 overflow-hidden flex flex-col p-4 sm:p-5 space-y-3">
                {/* Search & Testament Filters */}
                <div className="space-y-2.5 shrink-0">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={selectorSearch}
                      onChange={(e) => setSelectorSearch(e.target.value)}
                      placeholder="Chercher un livre (ex: Jean, Psaumes, Romains)..."
                      className="w-full pl-9 pr-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                    {(['Tous', 'Ancien', 'Nouveau'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectorTestamentFilter(t)}
                        className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 cursor-pointer ${
                          selectorTestamentFilter === t
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {t === 'Tous' ? 'Tous les 66 livres' : `${t} Testament (${t === 'Ancien' ? 39 : 27})`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Books Grid */}
                <div className="overflow-y-auto flex-1 pr-1 grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {filteredBooks.map((book) => {
                    const isSelected = book.nr === currentBookNr;
                    return (
                      <button
                        key={book.nr}
                        onClick={() => setSelectedBookForChapters(book)}
                        className={`flex items-start gap-2.5 p-3 rounded-2xl border text-left transition-all cursor-pointer active:scale-[0.99] ${
                          isSelected
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100'
                            : 'bg-slate-50/70 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 border-slate-200/80 dark:border-slate-700/80 text-slate-900 dark:text-slate-100'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xs font-bold text-emerald-700 dark:text-emerald-400 shrink-0">
                          {book.abbrev}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-bold text-xs sm:text-sm truncate">
                              {book.name}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 shrink-0">
                              {book.chaptersCount} ch.
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                            {book.category}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: SEARCH BIBLE PASSAGE OR KEYWORD                                  */}
      {/* ========================================================================= */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-xl max-h-[85vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
            
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Rechercher dans la Bible
                </h3>
              </div>
              <button
                onClick={() => setShowSearchModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-5 space-y-4 flex-1 overflow-y-auto">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && executeSearch()}
                  placeholder="Ex : Jean 3:16, Romains 8, foi, lumière, paix..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  autoFocus
                />
                <button
                  onClick={executeSearch}
                  disabled={isSearching || !searchQuery.trim()}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-40 transition-colors shrink-0"
                >
                  {isSearching ? 'Recherche...' : 'Chercher'}
                </button>
              </div>

              {/* Quick suggestions */}
              <div className="flex items-center gap-1.5 flex-wrap text-xs">
                <span className="text-[11px] font-semibold text-slate-400">Suggestions :</span>
                {['Jean 3:16', 'Psaume 23', 'Romains 8:28', 'Proverbes 3:5', 'amour', 'foi', 'paix'].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSearchQuery(s);
                      setTimeout(executeSearch, 50);
                    }}
                    className="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-[11px] font-medium"
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Search Results List */}
              <div className="space-y-2 pt-2">
                {searchResults.length > 0 ? (
                  searchResults.map((res, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSelectBookChapter(res.bookNr, res.chapter, res.verse)}
                      className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 bg-slate-50 dark:bg-slate-800/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 transition-all cursor-pointer space-y-1"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-emerald-700 dark:text-emerald-400">
                          {res.reference}
                        </span>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          Aller au verset <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 italic font-serif leading-relaxed line-clamp-2">
                        « {res.text} »
                      </p>
                    </div>
                  ))
                ) : isSearching ? (
                  <p className="text-center text-xs text-slate-400 py-6">Recherche des passages...</p>
                ) : searchQuery ? (
                  <p className="text-center text-xs text-slate-400 py-6">
                    Aucun résultat trouvé pour « {searchQuery} ». Essayez avec une référence exacte (ex: Jean 3:16) ou un mot clé.
                  </p>
                ) : null}
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: BOOKMARKS / FAVORIS                                              */}
      {/* ========================================================================= */}
      {showBookmarksModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-xl max-h-[85vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
            
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-amber-500 fill-amber-500" />
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Mes versets favoris ({bookmarks.length})
                </h3>
              </div>
              <button
                onClick={() => setShowBookmarksModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-5 space-y-3 flex-1 overflow-y-auto">
              {bookmarks.length === 0 ? (
                <div className="py-12 text-center space-y-2">
                  <Bookmark className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Aucun verset favori pour le moment
                  </p>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Touchez n'importe quel verset pendant votre lecture pour l'ajouter à vos favoris et noter vos réflexions.
                  </p>
                </div>
              ) : (
                bookmarks.map((bm) => (
                  <div
                    key={bm.id}
                    className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-amber-700 dark:text-amber-400">
                          {bm.bookName} {bm.chapter}:{bm.verse}
                        </span>
                        {bm.tag && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                            {bm.tag}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400">{bm.date}</span>
                        <button
                          onClick={() => handleRemoveBookmark(bm.id)}
                          className="text-slate-400 hover:text-rose-500 p-1"
                          title="Supprimer des favoris"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-serif italic leading-relaxed">
                      « {bm.text} »
                    </p>

                    {bm.note && (
                      <div className="text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900/60 p-2 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                        <span className="font-bold text-slate-800 dark:text-slate-200">Note : </span>
                        {bm.note}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1 text-xs">
                      <button
                        onClick={() => handleSelectBookChapter(bm.bookNr, bm.chapter, bm.verse)}
                        className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        Lire dans le contexte <ArrowRight className="w-3 h-3" />
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopyVerse(`${bm.bookName} ${bm.chapter}:${bm.verse}`, bm.text)}
                          className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                          title="Copier"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleShareVerse(`${bm.bookName} ${bm.chapter}:${bm.verse}`, bm.text)}
                          className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                          title="Partager"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: READING HISTORY                                                  */}
      {/* ========================================================================= */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-md max-h-[85vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
            
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Historique de lecture
                </h3>
              </div>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-5 space-y-2.5 flex-1 overflow-y-auto">
              {historyItems.length === 0 ? (
                <p className="text-center text-xs text-slate-400 py-8">
                  Votre historique de lecture s'enregistre automatiquement dès que vous parcourez un chapitre.
                </p>
              ) : (
                <>
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        bibleService.clearHistory();
                        setHistoryItems([]);
                      }}
                      className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 hover:underline"
                    >
                      Effacer l'historique
                    </button>
                  </div>
                  {historyItems.map((h) => (
                    <div
                      key={h.id}
                      onClick={() => handleSelectBookChapter(h.bookNr, h.chapter)}
                      className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 bg-slate-50 dark:bg-slate-800/50 transition-all cursor-pointer flex items-center justify-between"
                    >
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                          {h.bookName} {h.chapter}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {h.dateFormatted}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: READING SETTINGS (POLICE, TAILLE, THEMES)                        */}
      {/* ========================================================================= */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-md p-5 space-y-5 shadow-2xl animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Confort de lecture
                </h3>
              </div>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Font Size Adjuster */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-600 dark:text-slate-400">
                <span>Taille du texte</span>
                <span className="font-bold text-slate-900 dark:text-white">{settings.fontSize} px</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateSettings({ fontSize: Math.max(14, settings.fontSize - 1) })}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200"
                >
                  A-
                </button>
                <input
                  type="range"
                  min="14"
                  max="24"
                  value={settings.fontSize}
                  onChange={(e) => updateSettings({ fontSize: parseInt(e.target.value, 10) })}
                  className="flex-1 accent-emerald-600"
                />
                <button
                  onClick={() => updateSettings({ fontSize: Math.min(24, settings.fontSize + 1) })}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200"
                >
                  A+
                </button>
              </div>
            </div>

            {/* Font Family Selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Police d'écriture
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => updateSettings({ fontFamily: 'serif' })}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer font-serif ${
                    settings.fontFamily === 'serif'
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-500'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Serif Littéraire (Segond)
                </button>
                <button
                  onClick={() => updateSettings({ fontFamily: 'sans' })}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer font-sans ${
                    settings.fontFamily === 'sans'
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-500'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Sans-Serif Moderne
                </button>
              </div>
            </div>

            {/* Reading Theme Palette */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Thème de lecture
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'white', label: 'Blanc', bg: 'bg-white text-slate-900 border-slate-300' },
                  { id: 'sepia', label: 'Sépia', bg: 'bg-[#fbf7ee] text-[#3c3022] border-[#ecdcc3]' },
                  { id: 'dark', label: 'Nuit', bg: 'bg-slate-900 text-slate-100 border-slate-700' },
                  { id: 'oled', label: 'OLED', bg: 'bg-black text-white border-zinc-800' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => updateSettings({ theme: t.id as any })}
                    className={`p-2.5 rounded-xl text-xs font-bold border flex flex-col items-center gap-1 transition-all cursor-pointer ${t.bg} ${
                      settings.theme === t.id ? 'ring-2 ring-emerald-500 scale-105' : 'opacity-80'
                    }`}
                  >
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Show/Hide Verse Numbers */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Afficher les numéros de versets
              </span>
              <button
                onClick={() => updateSettings({ showVerseNumbers: !settings.showVerseNumbers })}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  settings.showVerseNumbers ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                    settings.showVerseNumbers ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <button
              onClick={() => setShowSettingsModal(false)}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Appliquer les réglages
            </button>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DRAWER / MODAL: VERSE ACTION (BOOKMARK / NOTE / COPY / SHARE)              */}
      {/* ========================================================================= */}
      {selectedVerseForAction && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-lg p-5 space-y-4 shadow-2xl animate-in slide-in-from-bottom-5 duration-200">
            
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <span className="text-xs uppercase font-extrabold text-emerald-700 dark:text-emerald-400">
                  {currentBookMeta.name} {currentChapterNr}:{selectedVerseForAction.verse.verse}
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Version Louis Segond 1910
                </p>
              </div>
              <button
                onClick={() => setSelectedVerseForAction(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <blockquote className="text-xs sm:text-sm font-serif italic text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60 leading-relaxed">
              « {selectedVerseForAction.verse.text} »
            </blockquote>

            {/* Quick Actions (Copy / Share) */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleCopyVerse(
                  `${currentBookMeta.name} ${currentChapterNr}:${selectedVerseForAction.verse.verse}`,
                  selectedVerseForAction.verse.text
                )}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copier le verset</span>
              </button>

              <button
                onClick={() => handleShareVerse(
                  `${currentBookMeta.name} ${currentChapterNr}:${selectedVerseForAction.verse.verse}`,
                  selectedVerseForAction.verse.text
                )}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Partager</span>
              </button>
            </div>

            {/* Bookmark & Note section */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Bookmark className="w-4 h-4 text-amber-500" />
                  <span>Favoris & Notes personnelles</span>
                </label>
                
                {/* Category Tag Selector */}
                <select
                  value={bookmarkTagInput}
                  onChange={(e) => setBookmarkTagInput(e.target.value as any)}
                  className="text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg px-2 py-1 border border-slate-200 dark:border-slate-700"
                >
                  <option value="Méditation">Méditation</option>
                  <option value="Prière">Prière</option>
                  <option value="Promesse">Promesse</option>
                  <option value="Foi">Foi</option>
                  <option value="Sagesse">Sagesse</option>
                </select>
              </div>

              <textarea
                value={bookmarkNoteInput}
                onChange={(e) => setBookmarkNoteInput(e.target.value)}
                placeholder="Ajoutez une réflexion personnelle, une application concrète ou une prière liée à ce verset..."
                className="w-full text-xs p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 h-20 resize-none"
              />

              <div className="flex items-center justify-between gap-2">
                {selectedVerseForAction.isBookmarked && selectedVerseForAction.bookmarkData && (
                  <button
                    onClick={() => handleRemoveBookmark(selectedVerseForAction.bookmarkData!.id)}
                    className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline"
                  >
                    Retirer des favoris
                  </button>
                )}

                <button
                  onClick={handleSaveBookmark}
                  className="flex-1 ml-auto py-2.5 px-4 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Bookmark className="w-3.5 h-3.5 fill-white" />
                  <span>Enregistrer dans mes favoris</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 6: SHARE VERSE QUOTE CARD (MODAL POPUP)                             */}
      {/* ========================================================================= */}
      {shareCardData && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-md p-5 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Partager ce verset
              </h3>
              <button
                onClick={() => {
                  setShareCardData(null);
                  setShareCopied(false);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Visual Quote Card Preview */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900 text-white space-y-3 shadow-lg">
              <span className="text-[10px] uppercase font-extrabold tracking-wider bg-white/20 px-2 py-0.5 rounded-full inline-block">
                Parole de Vie • Louis Segond 1910
              </span>
              <p className="text-sm sm:text-base font-serif italic leading-relaxed">
                « {shareCardData.text} »
              </p>
              <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs">
                <span className="font-bold">{shareCardData.reference}</span>
                <span className="text-[10px] opacity-75">RéviGenius Bible</span>
              </div>
            </div>

            {/* Share / Copy Action */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const txt = `« ${shareCardData.text} »\n— ${shareCardData.reference} (Bible Louis Segond 1910)\nÉtudié sur RéviGenius`;
                  navigator.clipboard?.writeText(txt);
                  setShareCopied(true);
                  setTimeout(() => setShareCopied(false), 2000);
                }}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                {shareCopied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copié avec succès !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copier la citation</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
