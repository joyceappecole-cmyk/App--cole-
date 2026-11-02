/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  BibleMetaBook, 
  BibleBookmark, 
  BibleReadingHistoryItem, 
  BibleReadingSettings,
  BibleVerse 
} from '../types';

export interface BibleBookData {
  nr: number;
  name: string;
  translation?: string;
  chapters: {
    chapter: number;
    name?: string;
    verses: {
      chapter: number;
      verse: number;
      text: string;
      name?: string;
    }[];
  }[];
}

// Complete metadata of all 66 books of the Bible (Louis Segond 1910)
export const BIBLE_BOOKS_CATALOG: BibleMetaBook[] = [
  // --- ANCIEN TESTAMENT (39 LIVRES) ---
  // Pentateuque (5)
  { nr: 1, id: 'genese', name: 'Genèse', testament: 'Ancien', category: 'Pentateuque', chaptersCount: 50, abbrev: 'Gn', description: 'Les commencements : la création, la chute, le déluge et les patriarches (Abraham, Isaac, Jacob, Joseph).' },
  { nr: 2, id: 'exode', name: 'Exode', testament: 'Ancien', category: 'Pentateuque', chaptersCount: 40, abbrev: 'Ex', description: 'La délivrance d\'Égypte, la traversée de la mer Rouge, les Dix Commandements au Sinaï et le Tabernacle.' },
  { nr: 3, id: 'levitique', name: 'Lévitique', testament: 'Ancien', category: 'Pentateuque', chaptersCount: 27, abbrev: 'Lv', description: 'Les lois de sainteté, les sacrifices, le sacerdoce lévitique et les fêtes solennelles de l\'Éternel.' },
  { nr: 4, id: 'nombres', name: 'Nombres', testament: 'Ancien', category: 'Pentateuque', chaptersCount: 36, abbrev: 'Nb', description: 'Le dénombrement du peuple et les quarante années de pérégrinations dans le désert.' },
  { nr: 5, id: 'deuteronome', name: 'Deutéronome', testament: 'Ancien', category: 'Pentateuque', chaptersCount: 34, abbrev: 'Dt', description: 'Les derniers discours de Moïse, le rappel de l\'Alliance et l\'appel à aimer Dieu de tout son cœur.' },
  // Livres Historiques (12)
  { nr: 6, id: 'josue', name: 'Josué', testament: 'Ancien', category: 'Historique', chaptersCount: 24, abbrev: 'Jos', description: 'La conquête du pays de Canaan, la prise de Jéricho et le partage du pays entre les tribus.' },
  { nr: 7, id: 'juges', name: 'Juges', testament: 'Ancien', category: 'Historique', chaptersCount: 21, abbrev: 'Jg', description: 'Les cycles d\'infidélité et de délivrance par les juges (Gédéon, Débora, Samson).' },
  { nr: 8, id: 'ruth', name: 'Ruth', testament: 'Ancien', category: 'Historique', chaptersCount: 4, abbrev: 'Rt', description: 'Une histoire de loyauté, de rédemption et de grâce annonçant la lignée de David et du Messie.' },
  { nr: 9, id: '1samuel', name: '1 Samuel', testament: 'Ancien', category: 'Historique', chaptersCount: 31, abbrev: '1S', description: 'La transition des juges vers la royauté : Samuel, Saül et l\'onction du jeune David.' },
  { nr: 10, id: '2samuel', name: '2 Samuel', testament: 'Ancien', category: 'Historique', chaptersCount: 24, abbrev: '2S', description: 'Le règne de David, l\'établissement de Jérusalem et l\'alliance davidique éternelle.' },
  { nr: 11, id: '1rois', name: '1 Rois', testament: 'Ancien', category: 'Historique', chaptersCount: 22, abbrev: '1R', description: 'La gloire de Salomon, la construction du Temple, la division du royaume et le ministère d\'Élie.' },
  { nr: 12, id: '2rois', name: '2 Rois', testament: 'Ancien', category: 'Historique', chaptersCount: 25, abbrev: '2R', description: 'Le ministère d\'Élisée, le déclin des deux royaumes et les déportations à Ninive et Babylone.' },
  { nr: 13, id: '1chroniques', name: '1 Chroniques', testament: 'Ancien', category: 'Historique', chaptersCount: 29, abbrev: '1Ch', description: 'Généalogies spirituelles et préparatifs du roi David pour le culte et le Temple.' },
  { nr: 14, id: '2chroniques', name: '2 Chroniques', testament: 'Ancien', category: 'Historique', chaptersCount: 36, abbrev: '2Ch', description: 'L\'histoire des rois de Juda, les réveils spirituels (Ézéchias, Josias) jusqu\'à l\'Exil.' },
  { nr: 15, id: 'esdras', name: 'Esdras', testament: 'Ancien', category: 'Historique', chaptersCount: 10, abbrev: 'Esd', description: 'Le retour de captivité babylonienne, la reconstruction du Temple et le retour à la Loi de Dieu.' },
  { nr: 16, id: 'nehemie', name: 'Néhémie', testament: 'Ancien', category: 'Historique', chaptersCount: 13, abbrev: 'Né', description: 'La reconstruction des remparts de Jérusalem en 52 jours et les réformes spirituelles du peuple.' },
  { nr: 17, id: 'esther', name: 'Esther', testament: 'Ancien', category: 'Historique', chaptersCount: 10, abbrev: 'Est', description: 'La providence souveraine de Dieu sauvant son peuple menacé d\'extermination en Perse.' },
  // Poétiques et Sagesse (5)
  { nr: 18, id: 'job', name: 'Job', testament: 'Ancien', category: 'Poétique & Sagesse', chaptersCount: 42, abbrev: 'Jb', description: 'Le problème de la souffrance du juste, la souveraineté insondable de Dieu et la foi éprouvée.' },
  { nr: 19, id: 'psaumes', name: 'Psaumes', testament: 'Ancien', category: 'Poétique & Sagesse', chaptersCount: 150, abbrev: 'Ps', description: 'Recueil de 150 prières, louanges, psaumes messianiques et cris du cœur vers Dieu.' },
  { nr: 20, id: 'proverbes', name: 'Proverbes', testament: 'Ancien', category: 'Poétique & Sagesse', chaptersCount: 31, abbrev: 'Pr', description: 'Principes divins de sagesse pratique pour la vie quotidienne, la droiture et l\'instruction.' },
  { nr: 21, id: 'ecclesiaste', name: 'Ecclésiaste', testament: 'Ancien', category: 'Poétique & Sagesse', chaptersCount: 12, abbrev: 'Ec', description: 'Méditation sur la vanité des choses terrestres et l\'essentiel : craindre Dieu et garder ses ordres.' },
  { nr: 22, id: 'cantique', name: 'Cantique des Cantiques', testament: 'Ancien', category: 'Poétique & Sagesse', chaptersCount: 8, abbrev: 'Ct', description: 'Chant poétique célébrant l\'amour pur et fidèle de l\'époux et de l\'épouse.' },
  // Prophètes Majeurs (5)
  { nr: 23, id: 'esaie', name: 'Ésaïe', testament: 'Ancien', category: 'Prophètes majeurs', chaptersCount: 66, abbrev: 'És', description: 'Le prophète évangélique : prophéties du Serviteur souffrant, de la naissance virginale et du Royaume.' },
  { nr: 24, id: 'jeremie', name: 'Jérémie', testament: 'Ancien', category: 'Prophètes majeurs', chaptersCount: 52, abbrev: 'Jr', description: 'Le prophète pleureur annonçant le jugement, la chute de Jérusalem et la promesse de la Nouvelle Alliance.' },
  { nr: 25, id: 'lamentations', name: 'Lamentations', testament: 'Ancien', category: 'Prophètes majeurs', chaptersCount: 5, abbrev: 'Lm', description: 'Élégies poétiques sur la ruine de Jérusalem, soulignant que les bontés de l\'Éternel ne sont pas épuisées.' },
  { nr: 26, id: 'ezechiel', name: 'Ézéchiel', testament: 'Ancien', category: 'Prophètes majeurs', chaptersCount: 48, abbrev: 'Éz', description: 'Visions de la gloire divine à Babylone, de la vallée des ossements desséchés et du nouveau Temple.' },
  { nr: 27, id: 'daniel', name: 'Daniel', testament: 'Ancien', category: 'Prophètes majeurs', chaptersCount: 12, abbrev: 'Dn', description: 'La fidélité de Daniel à Babylone, les empires mondiaux et les visions prophétiques de la fin des temps.' },
  // Prophètes Mineurs (12)
  { nr: 28, id: 'osee', name: 'Osée', testament: 'Ancien', category: 'Prophètes mineurs', chaptersCount: 14, abbrev: 'Os', description: 'L\'amour inconditionnel et patient de Dieu pour son peuple infidèle.' },
  { nr: 29, id: 'joel', name: 'Joël', testament: 'Ancien', category: 'Prophètes mineurs', chaptersCount: 3, abbrev: 'Jl', description: 'L\'invasion des sauterelles, l\'annonce du Jour de l\'Éternel et l\'effusion future du Saint-Esprit.' },
  { nr: 30, id: 'amos', name: 'Amos', testament: 'Ancien', category: 'Prophètes mineurs', chaptersCount: 9, abbrev: 'Am', description: 'L\'appel divin à la justice sociale : « Que le droit coule comme de l\'eau ».' },
  { nr: 31, id: 'abdias', name: 'Abdias', testament: 'Ancien', category: 'Prophètes mineurs', chaptersCount: 1, abbrev: 'Ab', description: 'La condamnation de l\'orgueil d\'Édom et la délivrance finale sur la montagne de Sion.' },
  { nr: 32, id: 'jonas', name: 'Jonas', testament: 'Ancien', category: 'Prophètes mineurs', chaptersCount: 4, abbrev: 'Jon', description: 'La fuite du prophète, le grand poisson, et la miséricorde universelle de Dieu envers Ninive.' },
  { nr: 33, id: 'michee', name: 'Michée', testament: 'Ancien', category: 'Prophètes mineurs', chaptersCount: 7, abbrev: 'Mi', description: 'L\'annonce de la naissance du Messie à Bethléhem et l\'exigence de pratiquer la justice.' },
  { nr: 34, id: 'nahum', name: 'Nahum', testament: 'Ancien', category: 'Prophètes mineurs', chaptersCount: 3, abbrev: 'Na', description: 'L\'annonce du jugement et de la chute finale de l\'oppresseur assyrien à Ninive.' },
  { nr: 35, id: 'habacuc', name: 'Habacuc', testament: 'Ancien', category: 'Prophètes mineurs', chaptersCount: 3, abbrev: 'Ha', description: 'Le dialogue sincère avec Dieu dans l\'incompréhension : « Le juste vivra par sa foi ».' },
  { nr: 36, id: 'sophonie', name: 'Sophonie', testament: 'Ancien', category: 'Prophètes mineurs', chaptersCount: 3, abbrev: 'So', description: 'Le grand jour de l\'Éternel et la joie de Dieu chantant sur un reste humble et fidèle.' },
  { nr: 37, id: 'aggee', name: 'Aggée', testament: 'Ancien', category: 'Prophètes mineurs', chaptersCount: 2, abbrev: 'Ag', description: 'L\'exhortation aux rapatriés à rebâtir sans tarder la Maison de Dieu.' },
  { nr: 38, id: 'zacharie', name: 'Zacharie', testament: 'Ancien', category: 'Prophètes mineurs', chaptersCount: 14, abbrev: 'Za', description: 'Visions apocalyptiques et prophéties du Messie humble entrant à Jérusalem sur un âne.' },
  { nr: 39, id: 'malachie', name: 'Malachie', testament: 'Ancien', category: 'Prophètes mineurs', chaptersCount: 4, abbrev: 'Ml', description: 'Le dernier prophète de l\'Ancien Testament dénonçant la tiédeur et annonçant le Soleil de justice.' },

  // --- NOUVEAU TESTAMENT (27 LIVRES) ---
  // Évangiles (4)
  { nr: 40, id: 'matthieu', name: 'Matthieu', testament: 'Nouveau', category: 'Évangiles', chaptersCount: 28, abbrev: 'Mt', description: 'Jésus le Messie et Roi promis, le Sermon sur la montagne et l\'accomplissement des prophéties de l\'AT.' },
  { nr: 41, id: 'marc', name: 'Marc', testament: 'Nouveau', category: 'Évangiles', chaptersCount: 16, abbrev: 'Mc', description: 'Jésus le Serviteur obéissant et puissant, ses miracles, ses guérisons et sa mort rédemptrice.' },
  { nr: 42, id: 'luc', name: 'Luc', testament: 'Nouveau', category: 'Évangiles', chaptersCount: 24, abbrev: 'Lc', description: 'Jésus le Fils de l\'Homme venu chercher et sauver les perdus, l\'accent sur la prière et la miséricorde.' },
  { nr: 43, id: 'jean', name: 'Jean', testament: 'Nouveau', category: 'Évangiles', chaptersCount: 21, abbrev: 'Jn', description: 'Jésus la Parole éternelle faite chair, les sept signes divins et les déclarations « Je Suis ».' },
  // Actes (1)
  { nr: 44, id: 'actes', name: 'Actes des Apôtres', testament: 'Nouveau', category: 'Actes', chaptersCount: 28, abbrev: 'Ac', description: 'La Pentecôte, la naissance de l\'Église, l\'effusion de l\'Esprit et l\'expansion de l\'Évangile jusqu\'à Rome.' },
  // Épîtres de Paul (14)
  { nr: 45, id: 'romains', name: 'Romains', testament: 'Nouveau', category: 'Épîtres de Paul', chaptersCount: 16, abbrev: 'Rm', description: 'Le chef-d\'œuvre théologique de la justification par la foi, de la grâce et de la vie dans l\'Esprit.' },
  { nr: 46, id: '1corinthiens', name: '1 Corinthiens', testament: 'Nouveau', category: 'Épîtres de Paul', chaptersCount: 16, abbrev: '1Co', description: 'L\'unité de l\'Église, la sainteté du corps, les dons spirituels, l\'amour (ch. 13) et la résurrection.' },
  { nr: 47, id: '2corinthiens', name: '2 Corinthiens', testament: 'Nouveau', category: 'Épîtres de Paul', chaptersCount: 13, abbrev: '2Co', description: 'Le ministère chrétien au travers des faiblesses : « Ma grâce te suffit, car ma puissance s\'accomplit dans la faiblesse ».' },
  { nr: 48, id: 'galates', name: 'Galates', testament: 'Nouveau', category: 'Épîtres de Paul', chaptersCount: 6, abbrev: 'Ga', description: 'La défense de la liberté chrétienne face au légalisme et le fruit de l\'Esprit.' },
  { nr: 49, id: 'ephesiens', name: 'Éphésiens', testament: 'Nouveau', category: 'Épîtres de Paul', chaptersCount: 6, abbrev: 'Ép', description: 'Les richesses en Christ, l\'Église corps du Messie, la marche dans la lumière et les armes spirituelles.' },
  { nr: 50, id: 'philippiens', name: 'Philippiens', testament: 'Nouveau', category: 'Épîtres de Paul', chaptersCount: 4, abbrev: 'Ph', description: 'L\'épître de la joie inébranlable : « Je puis tout par celui qui me fortifie ».' },
  { nr: 51, id: 'colossiens', name: 'Colossiens', testament: 'Nouveau', category: 'Épîtres de Paul', chaptersCount: 4, abbrev: 'Col', description: 'La prééminence suprême et absolue du Christ sur toute la création et la plénitude de sa divinité.' },
  { nr: 52, id: '1thessaloniciens', name: '1 Thessaloniciens', testament: 'Nouveau', category: 'Épîtres de Paul', chaptersCount: 5, abbrev: '1Th', description: 'L\'encouragement à la persévérance et l\'espérance vivante du retour glorieux de Jésus-Christ.' },
  { nr: 53, id: '2thessaloniciens', name: '2 Thessaloniciens', testament: 'Nouveau', category: 'Épîtres de Paul', chaptersCount: 3, abbrev: '2Th', description: 'Éclaircissements sur les événements précédant le retour du Seigneur et avertissement contre l\'oisiveté.' },
  { nr: 54, id: '1timothee', name: '1 Timothée', testament: 'Nouveau', category: 'Épîtres de Paul', chaptersCount: 6, abbrev: '1Tm', description: 'Instructions pastorales pour l\'ordre dans l\'Église, le ministère et le bon combat de la foi.' },
  { nr: 55, id: '2timothee', name: '2 Timothée', testament: 'Nouveau', category: 'Épîtres de Paul', chaptersCount: 4, abbrev: '2Tm', description: 'Le testament spirituel de Paul : « J\'ai combattu le bon combat, j\'ai achevé la course, j\'ai gardé la foi ».' },
  { nr: 56, id: 'tite', name: 'Tite', testament: 'Nouveau', category: 'Épîtres de Paul', chaptersCount: 3, abbrev: 'Tt', description: 'L\'organisation des églises en Crète, la saine doctrine et les œuvres bonnes manifestant la foi.' },
  { nr: 57, id: 'philemon', name: 'Philémon', testament: 'Nouveau', category: 'Épîtres de Paul', chaptersCount: 1, abbrev: 'Phm', description: 'Une lettre touchante sur le pardon, la réconciliation et l\'accueil de l\'esclave Onésime comme un frère.' },
  { nr: 58, id: 'hebreux', name: 'Hébreux', testament: 'Nouveau', category: 'Épîtres de Paul', chaptersCount: 13, abbrev: 'Hé', description: 'La supériorité éclatante de Christ sur les anges, Moïse et l\'ancien sacerdoce, et les héros de la foi.' },
  // Épîtres Générales (7)
  { nr: 59, id: 'jacques', name: 'Jacques', testament: 'Nouveau', category: 'Épîtres générales', chaptersCount: 5, abbrev: 'Jc', description: 'La foi pratique démontrée par les œuvres, la maîtrise de la langue et la patience dans l\'épreuve.' },
  { nr: 60, id: '1pierre', name: '1 Pierre', testament: 'Nouveau', category: 'Épîtres générales', chaptersCount: 5, abbrev: '1P', description: 'L\'espérance vivante au sein de la souffrance et la sainteté du sacerdoce royal des croyants.' },
  { nr: 61, id: '2pierre', name: '2 Pierre', testament: 'Nouveau', category: 'Épîtres générales', chaptersCount: 3, abbrev: '2P', description: 'La croissance spirituelle, la mise en garde contre les faux docteurs et la certitude des promesses divines.' },
  { nr: 62, id: '1jean', name: '1 Jean', testament: 'Nouveau', category: 'Épîtres générales', chaptersCount: 5, abbrev: '1Jn', description: 'L\'assurance du salut, la communion fraternelle, la lumière divine et l\'amour : « Dieu est amour ».' },
  { nr: 63, id: '2jean', name: '2 Jean', testament: 'Nouveau', category: 'Épîtres générales', chaptersCount: 1, abbrev: '2Jn', description: 'Demeurer dans la vérité de Christ et marcher dans l\'amour mutuel.' },
  { nr: 64, id: '3jean', name: '3 Jean', testament: 'Nouveau', category: 'Épîtres générales', chaptersCount: 1, abbrev: '3Jn', description: 'L\'hospitalité chrétienne louée chez Gaïus et l\'avertissement contre l\'ambition dominatrice.' },
  { nr: 65, id: 'jude', name: 'Jude', testament: 'Nouveau', category: 'Épîtres générales', chaptersCount: 1, abbrev: 'Jd', description: 'Combattre fidèlement pour la foi transmise aux saints une fois pour toutes.' },
  // Prophétie / Apocalypse (1)
  { nr: 66, id: 'apocalypse', name: 'Apocalypse', testament: 'Nouveau', category: 'Prophétie & Apocalypse', chaptersCount: 22, abbrev: 'Ap', description: 'La révélation finale de Jésus-Christ couronné, le triomphe sur le mal, la Jérusalem céleste et l\'éternité.' },
];

const STORAGE_KEYS = {
  BOOKMARKS: 'revigenius_bible_bookmarks_v1',
  HISTORY: 'revigenius_bible_reading_history_v1',
  SETTINGS: 'revigenius_bible_reading_settings_v1',
  LAST_POSITION: 'revigenius_bible_last_position_v1',
  OFFLINE_SYNC_STATUS: 'revigenius_bible_offline_sync_status',
};

// In-memory runtime cache for already opened books
const memoryBooksCache: Map<number, BibleBookData> = new Map();

export const bibleService = {
  /**
   * Get metadata for all 66 books
   */
  getBooksCatalog(): BibleMetaBook[] {
    return BIBLE_BOOKS_CATALOG;
  },

  /**
   * Get metadata for a specific book by number (1..66)
   */
  getBookMeta(bookNr: number): BibleMetaBook | undefined {
    return BIBLE_BOOKS_CATALOG.find((b) => b.nr === bookNr);
  },

  /**
   * Load book data with full chapters and verses from local offline asset or cache
   */
  async loadBook(bookNr: number): Promise<BibleBookData | null> {
    if (memoryBooksCache.has(bookNr)) {
      return memoryBooksCache.get(bookNr)!;
    }

    try {
      // 1. Fetch from local asset bundle (/bible/ls1910/{bookNr}.json)
      // This is served locally by the application itself and cached by Service Worker
      const response = await fetch(`/bible/ls1910/${bookNr}.json`, {
        headers: { 'Accept': 'application/json' }
      });
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status} pour le livre ${bookNr}`);
      }
      const data: BibleBookData = await response.json();
      memoryBooksCache.set(bookNr, data);
      return data;
    } catch (err) {
      console.warn(`[BibleService] Impossible de charger le livre ${bookNr} depuis l'asset local:`, err);
      return null;
    }
  },

  /**
   * Load a specific chapter of a book
   */
  async loadChapter(bookNr: number, chapterNr: number): Promise<{
    book: BibleMetaBook;
    chapter: number;
    verses: BibleVerse[];
  } | null> {
    const meta = this.getBookMeta(bookNr);
    if (!meta) return null;

    const bookData = await this.loadBook(bookNr);
    if (!bookData || !bookData.chapters) return null;

    const chapterObj = bookData.chapters.find((c) => c.chapter === chapterNr) || bookData.chapters[0];
    if (!chapterObj) return null;

    return {
      book: meta,
      chapter: chapterObj.chapter,
      verses: chapterObj.verses.map((v) => ({
        chapter: v.chapter,
        verse: v.verse,
        text: v.text,
      })),
    };
  },

  /**
   * Preload all books into memory/browser cache for 100% offline usage
   * Can report progress via callback
   */
  async prefetchAllBooks(onProgress?: (loaded: number, total: number) => void): Promise<boolean> {
    const total = 66;
    let completed = 0;
    for (let nr = 1; nr <= total; nr++) {
      try {
        await this.loadBook(nr);
      } catch (e) {
        console.warn(`Prefetch failed for book ${nr}`, e);
      }
      completed++;
      if (onProgress) onProgress(completed, total);
    }
    try {
      localStorage.setItem(STORAGE_KEYS.OFFLINE_SYNC_STATUS, JSON.stringify({
        completed: true,
        timestamp: Date.now(),
        count: completed
      }));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    return true;
  },

  isOfflineFullyCached(): boolean {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.OFFLINE_SYNC_STATUS);
      if (!saved) return false;
      const parsed = JSON.parse(saved);
      return parsed && parsed.completed === true;
    } catch {
      return false;
    }
  },

  /**
   * Bookmarks / Favoris
   */
  getBookmarks(): BibleBookmark[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  },

  addBookmark(bookmark: Omit<BibleBookmark, 'id' | 'date'>): BibleBookmark {
    const bookmarks = this.getBookmarks();
    const existingIndex = bookmarks.findIndex(
      (b) => b.bookNr === bookmark.bookNr && b.chapter === bookmark.chapter && b.verse === bookmark.verse
    );

    const nowFormatted = new Date().toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    const newBookmark: BibleBookmark = {
      ...bookmark,
      id: `bm_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      date: nowFormatted,
    };

    let updated: BibleBookmark[];
    if (existingIndex >= 0) {
      updated = [...bookmarks];
      updated[existingIndex] = newBookmark;
    } else {
      updated = [newBookmark, ...bookmarks];
    }

    try {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(updated));
    } catch (e) {
      console.warn('Storage error:', e);
    }
    return newBookmark;
  },

  removeBookmark(id: string): void {
    const bookmarks = this.getBookmarks().filter((b) => b.id !== id);
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  },

  isVerseBookmarked(bookNr: number, chapter: number, verse: number): BibleBookmark | null {
    const bookmarks = this.getBookmarks();
    return bookmarks.find(
      (b) => b.bookNr === bookNr && b.chapter === chapter && b.verse === verse
    ) || null;
  },

  /**
   * Reading History
   */
  getReadingHistory(): BibleReadingHistoryItem[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HISTORY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  },

  recordReading(bookNr: number, bookName: string, chapter: number, excerpt?: string): void {
    const history = this.getReadingHistory();
    const now = Date.now();
    const dateFormatted = new Date().toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Remove older duplicate entry for the exact same book & chapter
    const filtered = history.filter((h) => !(h.bookNr === bookNr && h.chapter === chapter));

    const newItem: BibleReadingHistoryItem = {
      id: `hist_${now}`,
      bookNr,
      bookName,
      chapter,
      timestamp: now,
      dateFormatted,
      excerpt,
    };

    const updated = [newItem, ...filtered].slice(0, 30); // Keep last 30 readings
    try {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
      localStorage.setItem(STORAGE_KEYS.LAST_POSITION, JSON.stringify({ bookNr, chapter }));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  },

  getLastReadingPosition(): { bookNr: number; chapter: number } {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LAST_POSITION);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return { bookNr: 19, chapter: 23 }; // Default Psaume 23
  },

  clearHistory(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.HISTORY);
    } catch (e) {
      console.warn('Storage error:', e);
    }
  },

  /**
   * Reading Display Preferences
   */
  getReadingSettings(): BibleReadingSettings {
    const defaults: BibleReadingSettings = {
      fontSize: 17,
      fontFamily: 'serif',
      theme: 'sepia',
      lineHeight: 'relaxed',
      showVerseNumbers: true,
    };

    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (saved) {
        return { ...defaults, ...JSON.parse(saved) };
      }
    } catch {
      // return default
    }
    return defaults;
  },

  saveReadingSettings(settings: BibleReadingSettings): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  },

  /**
   * Verset du Jour (Curated Daily Inspiration with Rotation)
   */
  getVerseOfTheDay(): {
    reference: string;
    bookNr: number;
    chapter: number;
    verse: number;
    text: string;
    meditation: string;
    theme: string;
  } {
    const curatedVerses = [
      {
        bookNr: 43,
        chapter: 3,
        verse: 16,
        reference: 'Jean 3:16',
        text: 'Car Dieu a tant aimé le monde qu\'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu\'il ait la vie éternelle.',
        meditation: 'L\'amour de Dieu est le fondement inébranlable de toute existence. Recevez aujourd\'hui sa paix et son assurance.',
        theme: 'Amour & Rédemption'
      },
      {
        bookNr: 19,
        chapter: 23,
        verse: 1,
        reference: 'Psaume 23:1-2',
        text: 'L\'Éternel est mon berger: je ne manquerai de rien. Il me fait reposer dans de verts pâturages, il me dirige près des eaux paisibles.',
        meditation: 'Au milieu des révisions et des soucis, reposez-vous dans la fidélité de celui qui conduit chacun de vos pas.',
        theme: 'Paix & Protection'
      },
      {
        bookNr: 20,
        chapter: 3,
        verse: 5,
        reference: 'Proverbes 3:5-6',
        text: 'Confie-toi en l\'Éternel de tout ton coeur, et ne t\'appuie pas sur ta sagesse; reconnais-le dans toutes tes voies, et il aplanira tes sentiers.',
        meditation: 'Ne laissez pas l\'anxiété de l\'avenir troubler votre cœur : déposez vos projets entre les mains divines.',
        theme: 'Confiance & Direction'
      },
      {
        bookNr: 23,
        chapter: 40,
        verse: 31,
        reference: 'Ésaïe 40:31',
        text: 'Mais ceux qui se confient en l\'Éternel renouvellent leur force. Ils prennent le vol comme les aigles; ils courent, et ne se lassent point; ils marchent, et ne se fatiguent point.',
        meditation: 'Quand vos forces physiques et mentales s\'amenuisent, une source inépuisable d\'énergie spirituelle vous est offerte.',
        theme: 'Force & Renouvellement'
      },
      {
        bookNr: 45,
        chapter: 8,
        verse: 28,
        reference: 'Romains 8:28',
        text: 'Nous savons, du reste, que toutes choses concourent au bien de ceux qui aiment Dieu, de ceux qui sont appelés selon son dessein.',
        meditation: 'Chaque épreuve, chaque retard et chaque apprentissage participe à l\'édification d\'un avenir béni.',
        theme: 'Espérance & Dessein'
      },
      {
        bookNr: 50,
        chapter: 4,
        verse: 13,
        reference: 'Philippiens 4:13',
        text: 'Je puis tout par celui qui me fortifie.',
        meditation: 'Aucun examen, aucune montagne intellectuelle n\'est insurmontable lorsque Christ est votre soutien.',
        theme: 'Victoire & Foi'
      },
      {
        bookNr: 6,
        chapter: 1,
        verse: 9,
        reference: 'Josué 1:9',
        text: 'Ne t\'ai-je pas donné cet ordre: Fortifie-toi et prends courage? Ne t\'effraie point et ne t\'épouvante point, car l\'Éternel, ton Dieu, est avec toi dans tout ce que tu entreprendras.',
        meditation: 'Avancez avec audace et persévérance dans vos études : vous n\'êtes jamais seul devant la tâche.',
        theme: 'Courage & Présence'
      },
      {
        bookNr: 24,
        chapter: 29,
        verse: 11,
        reference: 'Jérémie 29:11',
        text: 'Car je connais les projets que j\'ai formés sur vous, dit l\'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l\'espérance.',
        meditation: 'Votre avenir est précieux aux yeux du Créateur. Travaillez avec confiance et tranquillité d\'esprit.',
        theme: 'Avenir & Espérance'
      },
      {
        bookNr: 40,
        chapter: 6,
        verse: 33,
        reference: 'Matthieu 6:33',
        text: 'Cherchez premièrement le royaume et la justice de Dieu; et toutes ces choses vous seront données par-dessus.',
        meditation: 'Placez les valeurs éternelles au sommet de vos priorités quotidiennes, et le reste s\'ordonnera harmonieusement.',
        theme: 'Priorités & Grâce'
      },
      {
        bookNr: 19,
        chapter: 119,
        verse: 105,
        reference: 'Psaume 119:105',
        text: 'Ta parole est une lampe à mes pieds, et une lumière sur mon sentier.',
        meditation: 'Dans l\'obscurité des doutes ou des décisions complexes, les Écritures éclairent fidèlement le prochain pas.',
        theme: 'Lumière & Sagesse'
      },
    ];

    // Day of year rotation
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    return curatedVerses[dayOfYear % curatedVerses.length];
  },

  /**
   * Search helper: Try to parse direct reference like "Jean 3:16", "Ps 23", "Romains 8"
   */
  parseReference(query: string): { bookNr: number; chapter?: number; verse?: number } | null {
    const clean = query.trim().toLowerCase();
    // Regex for: name (optional chapter) (optional :verse)
    // Examples: "jean 3:16", "psaumes 23", "1 corinthiens 13:4", "gen 1"
    const match = clean.match(/^([0-9]?\s*[a-zéèêëàâôûîïç]+)\s*([0-9]+)?(?:\s*[:\.]\s*([0-9]+))?$/i);
    if (!match) return null;

    const bookNameInput = match[1].replace(/\s+/g, ' ').trim();
    const chapter = match[2] ? parseInt(match[2], 10) : undefined;
    const verse = match[3] ? parseInt(match[3], 10) : undefined;

    // Find best match in catalog
    const found = BIBLE_BOOKS_CATALOG.find((b) => {
      const bName = b.name.toLowerCase();
      const bAbbrev = b.abbrev.toLowerCase();
      const bId = b.id.toLowerCase();
      return bName.startsWith(bookNameInput) || 
             bName.includes(bookNameInput) || 
             bAbbrev === bookNameInput ||
             bId.startsWith(bookNameInput);
    });

    if (!found) return null;

    return {
      bookNr: found.nr,
      chapter: chapter && chapter <= found.chaptersCount ? chapter : 1,
      verse,
    };
  }
};
