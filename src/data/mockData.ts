import { Course, Faculty, Flashcard, QuizQuestion, StudyTip, ScheduleItem, DigitalLibraryResource, StudentProfile, SummarySheet, ExamPlan, PlanTask, QuizAttempt } from '../types';

export const FACULTIES: Faculty[] = [
  {
    id: 'medecine_sante',
    name: 'Médecine et sciences de la santé',
    badge: 'Médecine & Santé',
    description: 'PASS, LAS, médecine générale, spécialités médicales et chirurgicales, maïeutique.',
    color: '#0284c7', // Sky blue
    defaultSubjects: ['Anatomie descriptive', 'Physiologie humaine', 'Biochimie médicale', 'Sémiologie', 'Histologie'],
    recommendedKeywords: ['médecine', 'santé', 'anatomie', 'physiologie', 'biologie', 'pathologie'],
  },
  {
    id: 'droit',
    name: 'Droit',
    badge: 'Droit',
    description: 'Droit civil, droit constitutionnel, droit administratif, droit pénal et des affaires.',
    color: '#059669', // Emerald
    defaultSubjects: ['Droit constitutionnel', 'Droit civil des obligations', 'Droit administratif', 'Droit pénal général', 'Histoire du droit'],
    recommendedKeywords: ['droit', 'jurisprudence', 'constitution', 'civil', 'législation', 'traité'],
  },
  {
    id: 'informatique',
    name: 'Informatique et technologies',
    badge: 'Informatique & Tech',
    description: 'Algorithmique, développement logiciel, bases de données, réseaux, IA et cybersécurité.',
    color: '#0284c7', // Cyan/Blue
    defaultSubjects: ['Algorithmique & Structures de données', 'Programmation orientée objet', 'Bases de données relationnelles', 'Réseaux & Systèmes', 'Architecture des ordinateurs'],
    recommendedKeywords: ['informatique', 'algorithme', 'code', 'technologie', 'data', 'software'],
  },
  {
    id: 'sciences_ingenierie',
    name: 'Sciences et ingénierie',
    badge: 'Sciences & Ingénierie',
    description: 'Mathématiques appliquées, physique fondamentale, chimie, mécanique et génie civil.',
    color: '#10b981', // Green
    defaultSubjects: ['Analyse mathématique', 'Mécanique du point', 'Électromagnétisme', 'Thermodynamique', 'Chimie des solutions'],
    recommendedKeywords: ['sciences', 'mathématiques', 'physique', 'ingénierie', 'chimie', 'calcul'],
  },
  {
    id: 'eco_gestion',
    name: 'Économie et gestion',
    badge: 'Éco & Gestion',
    description: 'Microéconomie, macroéconomie, comptabilité générale, finance d\'entreprise et marketing.',
    color: '#2563eb', // Royal blue
    defaultSubjects: ['Microéconomie approfondie', 'Macroéconomie', 'Comptabilité générale', 'Gestion financière', 'Statistiques descriptives'],
    recommendedKeywords: ['économie', 'gestion', 'finance', 'marché', 'management', 'comptabilité'],
  },
  {
    id: 'agronomie_env',
    name: 'Agronomie et environnement',
    badge: 'Agronomie & Env.',
    description: 'Sciences agronomiques, écologie, pédologie, protection des écosystèmes et développement durable.',
    color: '#15803d', // Forest green
    defaultSubjects: ['Biologie végétale appliquée', 'Pédologie & Sciences du sol', 'Écologie des populations', 'Génie de l\'environnement', 'Protection des cultures'],
    recommendedKeywords: ['agronomie', 'environnement', 'écologie', 'biodiversité', 'sol', 'agriculture'],
  },
  {
    id: 'sciences_education',
    name: 'Sciences de l\'éducation',
    badge: 'Éducation',
    description: 'Pédagogie, didactique des disciplines, psychologie des apprentissages et politiques éducatives.',
    color: '#0d9488', // Teal
    defaultSubjects: ['Didactique des apprentissages', 'Psychologie du développement', 'Histoire des idées pédagogiques', 'Sociologie de l\'école', 'Évaluation scolaire'],
    recommendedKeywords: ['éducation', 'pédagogie', 'didactique', 'apprentissage', 'enseignement'],
  },
  {
    id: 'sciences_sociales_humaines',
    name: 'Sciences sociales et humaines',
    badge: 'Sc. Sociales & Humaines',
    description: 'Sociologie générale, psychologie, histoire, philosophie, anthropologie et géographie.',
    color: '#7c3aed', // Purple/Violet
    defaultSubjects: ['Histoire contemporaine', 'Sociologie générale', 'Psychologie cognitive', 'Philosophie morale & politique', 'Méthodes qualitatives'],
    recommendedKeywords: ['sociologie', 'philosophie', 'histoire', 'psychologie', 'sciences humaines', 'anthropologie'],
  },
  {
    id: 'pharmacie',
    name: 'Pharmacie',
    badge: 'Pharmacie',
    description: 'Pharmacologie, chimie thérapeutique, pharmacognosie, toxicologie et galénique.',
    color: '#0891b2', // Teal/Cyan
    defaultSubjects: ['Pharmacologie générale', 'Chimie organique pharmaceutique', 'Toxicologie', 'Galénique', 'Botanique médicale'],
    recommendedKeywords: ['pharmacie', 'médicament', 'pharmacologie', 'toxicologie', 'molécule'],
  },
  {
    id: 'sciences_infirmieres',
    name: 'Sciences infirmières',
    badge: 'Sciences Infirmières',
    description: 'Soins infirmiers, raisonnement clinique, pharmacologie infirmière et santé publique.',
    color: '#0284c7', // Sky Blue
    defaultSubjects: ['Processus traumatiques', 'Raisonnement clinique', 'Législation & Éthique du soin', 'Pharmacologie & Calculs de doses', 'Soins relationnels'],
    recommendedKeywords: ['soins', 'infirmier', 'clinique', 'santé publique', 'patient', 'urgence'],
  },
  {
    id: 'architecture',
    name: 'Architecture',
    badge: 'Architecture',
    description: 'Théorie du projet, histoire de l\'architecture, structures et résistance des matériaux, urbanisme.',
    color: '#ea580c', // Orange/Brick
    defaultSubjects: ['Histoire de l\'architecture moderne', 'Théorie du projet architectural', 'Statique & RDM', 'Morphologie urbaine', 'Matériaux biosourcés'],
    recommendedKeywords: ['architecture', 'urbanisme', 'bâtiment', 'structure', 'conception', 'espace'],
  },
  {
    id: 'communication_journalisme',
    name: 'Communication et journalisme',
    badge: 'Com & Journalisme',
    description: 'Médias, théories de l\'information, écriture journalistique, communication numérique et relations publiques.',
    color: '#0284c7', // Blue
    defaultSubjects: ['Théories de la communication', 'Écriture et déontologie journalistique', 'Communication digitale', 'Analyse du discours médiatique', 'Droit des médias'],
    recommendedKeywords: ['communication', 'journalisme', 'média', 'information', 'discours'],
  },
  {
    id: 'sciences_politiques',
    name: 'Sciences politiques',
    badge: 'Sciences Politiques',
    description: 'Relations internationales, régimes politiques comparés, sociologie électorale et politiques publiques.',
    color: '#4f46e5', // Indigo
    defaultSubjects: ['Relations internationales', 'Régimes politiques comparés', 'Sociologie des comportements électoraux', 'Analyse des politiques publiques', 'Histoire des idées politiques'],
    recommendedKeywords: ['politique', 'relations internationales', 'état', 'gouvernance', 'démocratie'],
  },
  {
    id: 'energie_renouvelable',
    name: 'Énergie et énergies renouvelables',
    badge: 'Énergie & Renouvelables',
    description: 'Génie énergétique, solaire photovoltaïque et thermique, éolien, biomasse, hydrogène vert, réseaux intelligents (Smart Grids) et décarbonation.',
    color: '#16a34a', // Emerald green
    defaultSubjects: ['Thermodynamique & Transferts thermiques', 'Systèmes photovoltaïques & Éoliens', 'Réseaux électriques & Smart Grids', 'Stockage d\'énergie & Piles à combustible', 'Audit & Efficacité énergétique'],
    recommendedKeywords: ['énergie', 'renouvelable', 'solaire', 'éolien', 'thermodynamique', 'électricité', 'transition'],
  },
  {
    id: 'petrole_gaz',
    name: 'Pétrole et gaz',
    badge: 'Pétrole & Gaz',
    description: 'Génie pétrolier, forage et complétion, ingénierie des réservoirs, pétrophysique, raffinage, gaz naturel liquéfié (GNL) et gestion des risques.',
    color: '#d97706', // Amber gold
    defaultSubjects: ['Génie pétrolier & Forage', 'Ingénierie des réservoirs', 'Pétrophysique & Diagraphies', 'Thermodynamique des hydrocarbures & GNL', 'Raffinage & Pétrochimie'],
    recommendedKeywords: ['pétrole', 'gaz', 'énergie', 'réservoir', 'forage', 'hydrocarbures', 'gnl'],
  },
  {
    id: 'etudes_bibliques_theologie',
    name: 'Études bibliques et théologie',
    badge: 'Études Bibliques & Théologie',
    description: 'Exégèse de l\'Ancien et Nouveau Testament, herméneutique, théologie systématique, langues bibliques (grec, hébreu), histoire de l\'Église et apologétique.',
    color: '#b45309', // Warm Amber/Gold
    defaultSubjects: [
      'Exégèse biblique & Herméneutique',
      'Théologie systématique',
      'Ancien Testament & Prophéties messianiques',
      'Nouveau Testament & Évangiles',
      'Langues bibliques (Grec & Hébreu)'
    ],
    recommendedKeywords: ['bible', 'théologie', 'exégèse', 'herméneutique', 'prophétie', 'sagesse', 'écritures'],
  },
  {
    id: 'autre',
    name: 'Autre domaine',
    badge: 'Autre domaine',
    description: 'Domaine d\'études spécifique ou parcours pluridisciplinaire.',
    color: '#059669', // Emerald
    defaultSubjects: ['Méthodologie universitaire', 'Expression écrite & orale', 'Langues vivantes', 'Culture générale'],
    recommendedKeywords: ['université', 'méthode', 'recherche', 'études'],
  },
];

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  name: '', // Pas de nom inventé : l'étudiant renseigne le sien ou continue comme Étudiant anonyme
  country: 'France',
  university: undefined, // Champ facultatif
  facultyId: 'informatique',
  facultyName: 'Informatique et technologies',
  studyLevel: 'Licence 1 (L1)',
  mainSubjects: [
    'Algorithmique & Structures de données',
    'Bases de données relationnelles',
    'Réseaux & Systèmes',
    'Analyse mathématique'
  ],
  preferredLanguage: 'Français',
  targetExamPeriod: 'Partiels de Semestre 1',
  weeklyTargetHours: 18,
  notificationsEnabled: false,
  avatarUrl: undefined,
  joyMood: 'souriant',
};

export const INITIAL_COURSES: Course[] = [
  {
    id: 'cours-1',
    code: 'INF201',
    title: 'Algorithmique & Structures de Données',
    subject: 'Algorithmique & Structures de données',
    facultyId: 'informatique',
    facultyName: 'Informatique et technologies',
    semester: 'Semestre 3',
    ects: 6,
    chapterCount: 5,
    completedChapters: 3,
    color: '#059669',
    description: 'Complexité algorithmique, arbres binaires de recherche, graphes et programmation dynamique.',
    createdAt: '24 oct. 2026',
    createdAtTimestamp: Date.now() - 3 * 86400000,
    hasPdf: true,
    pdfFileName: 'algorithmique_cours_complet.pdf',
    pdfFileSize: 2450000,
    lastRevised: 'Hier à 16:30',
  },
  {
    id: 'cours-2',
    code: 'DRO102',
    title: 'Droit Constitutionnel de la Ve République',
    subject: 'Droit constitutionnel',
    facultyId: 'droit',
    facultyName: 'Droit',
    semester: 'Semestre 1',
    ects: 5,
    chapterCount: 4,
    completedChapters: 2,
    color: '#059669',
    description: 'Origines constitutionnelles de 1958, régime semi-présidentiel, articles 8, 12, 16 et 49-3.',
    createdAt: '22 oct. 2026',
    createdAtTimestamp: Date.now() - 5 * 86400000,
    hasPdf: true,
    pdfFileName: 'droit_constitutionnel_notes_amphi.pdf',
    pdfFileSize: 1820000,
    lastRevised: 'Il y a 3 jours',
  },
  {
    id: 'cours-3',
    code: 'MED104',
    title: 'Anatomie Générale & Physiologie Cardiovasculaire',
    subject: 'Anatomie descriptive',
    facultyId: 'medecine_sante',
    facultyName: 'Médecine et sciences de la santé',
    semester: 'PASS / L1',
    ects: 6,
    chapterCount: 4,
    completedChapters: 3,
    color: '#0284c7',
    description: 'Circulation systémique et pulmonaire, cycle cardiaque, régulation de la pression artérielle.',
    createdAt: '26 oct. 2026',
    createdAtTimestamp: Date.now() - 1 * 86400000,
    hasPdf: true,
    pdfFileName: 'poly_anatomie_coeur_vaisseaux.pdf',
    pdfFileSize: 3100000,
    lastRevised: 'Aujourd\'hui à 09:15',
  },
  {
    id: 'cours-4',
    code: 'PET201',
    title: 'Génie Pétrolier & Ingénierie des Réservoirs',
    subject: 'Génie pétrolier & Forage',
    facultyId: 'petrole_gaz',
    facultyName: 'Pétrole et gaz',
    semester: 'Semestre 4',
    ects: 6,
    chapterCount: 5,
    completedChapters: 2,
    color: '#d97706',
    description: 'Propriétés physiques des roches réservoirs, loi de Darcy, mécanismes de drainage naturel et diagraphies de forage.',
    createdAt: '27 oct. 2026',
    createdAtTimestamp: Date.now() - 86400000,
    hasPdf: true,
    pdfFileName: 'genie_petrolier_reservoirs_forage.pdf',
    pdfFileSize: 2850000,
    lastRevised: 'Hier à 11:20',
  },
  {
    id: 'cours-5',
    code: 'ENR301',
    title: 'Thermodynamique & Énergies Renouvelables',
    subject: 'Thermodynamique & Transferts thermiques',
    facultyId: 'energie_renouvelable',
    facultyName: 'Énergie et énergies renouvelables',
    semester: 'Semestre 5',
    ects: 6,
    chapterCount: 4,
    completedChapters: 2,
    color: '#16a34a',
    description: 'Cycles thermodynamiques, conversion photovoltaïque, dimensionnement éolien et stockage de l\'hydrogène vert.',
    createdAt: '28 oct. 2026',
    createdAtTimestamp: Date.now() - 43200000,
    hasPdf: true,
    pdfFileName: 'thermodynamique_energies_renouvelables.pdf',
    pdfFileSize: 2600000,
    lastRevised: 'Aujourd\'hui à 10:00',
  },
];

// A. Fiches de révision initiales (Exemples pédagogiques clairement identifiés)
export const INITIAL_SUMMARY_SHEETS: SummarySheet[] = [
  {
    id: 'fiche-1',
    title: 'Fiche méthode : Analyse de la complexité temporelle (Grand O)',
    subject: 'Algorithmique & Structures de données',
    facultyId: 'informatique',
    content: `1. Définitions rigoureuses :
- O(g(n)) : Borne supérieure asymptotique (pire des cas). Il existe c > 0 et n0 tels que pour tout n >= n0, f(n) <= c * g(n).
- Omega(g(n)) : Borne inférieure asymptotique (meilleur des cas).
- Theta(g(n)) : Encadrement exact (même ordre de grandeur).

2. Hiérarchie des ordres de grandeur :
O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n) < O(n!)

3. Règles pratiques pour les partiels :
- Recherche dichotomique sur tableau trié : O(log n)
- Parcours d'un ABR équilibré : O(n)
- Tri fusion (Merge Sort) et Tri rapide moyen : O(n log n)
- Piège classique : ne pas confondre complexité spatiale auxiliaire et complexité spatiale totale incluant les données d'entrée.`,
    createdAt: '25 oct. 2026',
    updatedAt: '25 oct. 2026',
    isExample: true,
  },
  {
    id: 'fiche-2',
    title: 'Fiche synthèse : Le bloc de constitutionnalité et la hiérarchie des normes',
    subject: 'Droit constitutionnel',
    facultyId: 'droit',
    content: `1. Composition du Bloc de Constitutionnalité (depuis la décision historique du 16 juillet 1971 « Liberté d'association ») :
- Le texte de la Constitution du 4 octobre 1958
- La Déclaration des Droits de l'Homme et du Citoyen de 1789 (DDHC)
- Le Préambule de la Constitution de 1946 (Principes Particulièrement Nécessaires à Notre Temps - PPNT)
- Les Principes Fondamentaux Reconnus par les Lois de la République (PFRLR)
- La Charte de l'environnement de 2004 (intégrée en 2005)

2. Contrôle de constitutionnalité :
- Art. 61 : Contrôle a priori (avant promulgation, saisine par 60 députés ou 60 sénateurs, Président, Premier ministre).
- Art. 61-1 : Contrôle a posteriori par la Question Prioritaire de Constitutionnalité (QPC) instaurée par la révision de 2008.

3. Piège d'examen : Ne jamais citer un traité international comme faisant partie intégrante du bloc de constitutionnalité (art. 55 : primauté du traité sur la loi, mais non sur la Constitution).`,
    createdAt: '24 oct. 2026',
    updatedAt: '24 oct. 2026',
    isExample: true,
  },
  {
    id: 'fiche-3',
    title: 'Fiche mémo : La révolution cardiaque et régulation de la pression artérielle',
    subject: 'Anatomie descriptive',
    facultyId: 'medecine_sante',
    content: `1. Les étapes de la révolution cardiaque :
- Systole ventriculaire (0.3 s) : contraction isovolumétrique (fermeture des valves atrio-ventriculaires B1) puis éjection rapide et lente (ouverture des sigmoïdes).
- Diastole ventriculaire (0.5 s) : relaxation isovolumétrique (fermeture des valves sigmoïdes B2) puis remplissage rapide, lent et systole auriculaire finale (20% du volume).

2. Formules physiologiques clés :
- Débit cardiaque (Qc) = Fréquence Cardiaque (FC) x Volume d'Éjection Systolique (VES) (environ 5 L/min au repos).
- Pression Artérielle Moyenne (PAM) = Débit cardiaque x Résistances Vasculaires Périphériques (RVP).

3. Régulation nerveuse :
- Barorécepteurs : crosse aortique (nerf vague X) et sinus carotidien (nerf de Hering / IX).
- Centre cardio-inhibiteur parasympathique vs centre cardio-accélérateur orthosympathique.`,
    createdAt: '26 oct. 2026',
    updatedAt: '26 oct. 2026',
    isExample: true,
  },
];

// B. Flashcards initiales avec Répétition Espacée (SRS)
export const INITIAL_FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-1',
    question: 'Quelle est la complexité temporelle moyenne et au pire cas de la recherche dans un Arbre Binaire de Recherche (ABR) ?',
    answer: 'Moyenne : O(log n) si l\'arbre est bien équilibré.\nPire des cas : O(n) si l\'arbre est dégénéré (liste chaînée unilatérale).\nC\'est pourquoi on utilise des arbres auto-équilibrés (AVL, Rouge-Noir).',
    subject: 'Algorithmique & Structures de données',
    facultyId: 'informatique',
    nextReviewDate: '2026-10-27',
    intervalDays: 1,
    masteryLevel: 'nouveau',
    reviewCount: 0,
    isExample: true,
  },
  {
    id: 'fc-2',
    question: 'Quelles sont les deux conditions cumulatives requises pour la mise en œuvre de l\'article 16 de la Constitution ?',
    answer: '1) Menace grave et immédiate pesant sur les institutions de la République, l\'indépendance de la Nation ou l\'intégrité de son territoire.\n2) Interruption du fonctionnement régulier des pouvoirs publics constitutionnels.',
    subject: 'Droit constitutionnel',
    facultyId: 'droit',
    nextReviewDate: '2026-10-27',
    intervalDays: 1,
    masteryLevel: 'nouveau',
    reviewCount: 0,
    isExample: true,
  },
  {
    id: 'fc-3',
    question: 'Pourquoi la paroi du ventricule gauche est-elle nettement plus épaisse que celle du ventricule droit ?',
    answer: 'Le ventricule gauche doit vaincre les fortes résistances périphériques de la circulation systémique (haute pression ~120 mmHg), tandis que le ventricule droit alimente la circulation pulmonaire à basse pression (~25 mmHg).',
    subject: 'Anatomie descriptive',
    facultyId: 'medecine_sante',
    nextReviewDate: '2026-10-28',
    intervalDays: 2,
    masteryLevel: 'moyen',
    reviewCount: 1,
    isExample: true,
  },
  {
    id: 'fc-4',
    question: 'Dans la méthode de test actif (Active Recall), pourquoi la simple relecture passive est-elle trompeuse ?',
    answer: 'La relecture passive déclenche le biais cognitif de familiarité (« je reconnais le texte ») sans forcer la récupération synaptique de l\'information en mémoire à long terme.',
    subject: 'Méthodologie universitaire',
    nextReviewDate: '2026-10-29',
    intervalDays: 3,
    masteryLevel: 'facile',
    reviewCount: 2,
    isExample: true,
  },
  {
    id: 'fc-5',
    question: 'En ingénierie des réservoirs pétroliers, que décrit la loi de Darcy et quel est le rôle de la perméabilité (K) ?',
    answer: 'La loi de Darcy quantifie l\'écoulement laminaire d\'un fluide visqueux à travers un milieu poreux : Q = (K * A / mu) * (Delta P / L). La perméabilité (mesurée en Darcy ou milliDarcy) exprime la capacité de la roche à laisser circuler les hydrocarbures.',
    subject: 'Génie pétrolier & Forage',
    facultyId: 'petrole_gaz',
    nextReviewDate: '2026-10-28',
    intervalDays: 1,
    masteryLevel: 'nouveau',
    reviewCount: 0,
    isExample: true,
  },
  {
    id: 'fc-6',
    question: 'Quel est le principe de la limite de Betz pour une éolienne et quel est son rendement maximal théorique ?',
    answer: 'La limite de Betz stipule qu\'une éolienne ne peut capter au maximum que 16/27 (soit environ 59,3%) de l\'énergie cinétique du vent incident, car l\'air doit conserver une vitesse résiduelle non nulle en sortie de rotor pour s\'évacuer.',
    subject: 'Thermodynamique & Transferts thermiques',
    facultyId: 'energie_renouvelable',
    nextReviewDate: '2026-10-28',
    intervalDays: 1,
    masteryLevel: 'nouveau',
    reviewCount: 0,
    isExample: true,
  },
];

export const INITIAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-1',
    statement: 'Dans un arbre binaire de recherche (ABR), quel type de parcours permet de récupérer les nœuds dans l\'ordre strictement croissant ?',
    options: [
      'Le parcours préfixe (Racine, Gauche, Droite)',
      'Le parcours infixe (Gauche, Racine, Droite)',
      'Le parcours postfixe (Gauche, Droite, Racine)',
      'Le parcours en largeur (File FIFO)'
    ],
    correctIndex: 1,
    explanation: 'Dans un ABR, toutes les clés du sous-arbre gauche sont inférieures à la racine et celles du sous-arbre droit sont supérieures. Le parcours infixe visite Gauche, puis Racine, puis Droite, produisant la séquence ordonnée.',
    subject: 'Algorithmique & Structures de données',
    facultyId: 'informatique',
    isExample: true,
  },
  {
    id: 'q-2',
    statement: 'Quel texte fondamental a été intégré au bloc de constitutionnalité par la décision du Conseil Constitutionnel du 16 juillet 1971 ?',
    options: [
      'Le Code Civil de 1804',
      'Le Préambule de la Constitution de 1958 et le Préambule de 1946',
      'La Convention Européenne des Droits de l\'Homme',
      'Le Traité de Rome'
    ],
    correctIndex: 1,
    explanation: 'La décision Liberté d\'Association du 16 juillet 1971 a conféré une valeur constitutionnelle contraignante au Préambule de 1958, et par renvoi à la DDHC de 1789, au Préambule de 1946 et aux PFRLR.',
    subject: 'Droit constitutionnel',
    facultyId: 'droit',
    isExample: true,
  },
  {
    id: 'q-3',
    statement: 'Quelle structure cardiaque génère spontanément l\'activité électrique physiologique avec la fréquence la plus élevée ?',
    options: [
      'Le faisceau de His',
      'Le nœud atrioventriculaire d\'Aschoff-Tawara',
      'Le nœud sinusal de Keith et Flack',
      'Les fibres de Purkinje'
    ],
    correctIndex: 2,
    explanation: 'Le nœud sinusal est le stimulateur naturel (pacemaker) du cœur car sa pente de dépolarisation diastolique spontanée est la plus rapide (60 à 80 battements par minute).',
    subject: 'Anatomie descriptive',
    facultyId: 'medecine_sante',
    isExample: true,
  },
  {
    id: 'q-4',
    statement: 'Quelle est la complexité asymptotique de l\'algorithme de tri fusion (Merge Sort) au pire des cas ?',
    options: [
      'O(n^2)',
      'O(n log n)',
      'O(log n)',
      'O(n)'
    ],
    correctIndex: 1,
    explanation: 'Le tri fusion divise systématiquement le tableau en deux moitiés égales (arbre de récursion de hauteur log n) et fusionne les tableaux triés en temps linéaire O(n), garantissant une complexité stricte O(n log n).',
    subject: 'Algorithmique & Structures de données',
    facultyId: 'informatique',
    isExample: true,
  },
  {
    id: 'q-5',
    statement: 'En ingénierie des réservoirs pétroliers, quelle grandeur mesure le rapport entre le volume des pores interconnectés et le volume total de la roche ?',
    options: [
      'La perméabilité absolue',
      'La porosité efficace',
      'La compressibilité de roche',
      'La saturation résiduelle'
    ],
    correctIndex: 1,
    explanation: 'La porosité efficace (ou interconnectée) représente la fraction volumique des pores reliés entre eux permettant aux hydrocarbures de s\'écouler, à la différence de la porosité totale qui inclut les pores isolés.',
    subject: 'Génie pétrolier & Forage',
    facultyId: 'petrole_gaz',
    isExample: true,
  },
  {
    id: 'q-6',
    statement: 'Selon la théorie aérodynamique de Betz, quel est le pourcentage maximal théorique d\'énergie cinétique qu\'un rotor éolien peut extraire du flux d\'air ?',
    options: [
      '100%',
      '59,3% (16/27)',
      '42,5%',
      '85,0%'
    ],
    correctIndex: 1,
    explanation: 'La limite de Betz démontre que le coefficient de puissance Cp maximal théorique vaut 16/27 (soit 59,26%). En pratique, les meilleures éoliennes modernes atteignent 45% à 50%.',
    subject: 'Thermodynamique & Transferts thermiques',
    facultyId: 'energie_renouvelable',
    isExample: true,
  },
];

// Historique initial des résultats de quiz
export const INITIAL_QUIZ_ATTEMPTS: QuizAttempt[] = [
  {
    id: 'att-1',
    subject: 'Algorithmique & Structures de données',
    score: 2,
    total: 2,
    percentage: 100,
    date: '25 oct. 2026',
  },
  {
    id: 'att-2',
    subject: 'Droit constitutionnel',
    score: 1,
    total: 1,
    percentage: 100,
    date: '26 oct. 2026',
  },
];

// Programme d'examen initial (Exemple)
export const INITIAL_EXAM_PLAN: ExamPlan = {
  id: 'plan-1',
  examName: 'Session d\'Examens - Semestre 1',
  subject: 'Algorithmique & Structures de données',
  examDate: '2026-12-15',
  chapters: 'Chapitre 1 : Complexité asymptotique\nChapitre 2 : Arbres Binaires de Recherche\nChapitre 3 : Arbres AVL et équilibrage\nChapitre 4 : Graphes BFS et DFS\nChapitre 5 : Programmation dynamique',
  dailyMinutes: 90,
  personalGoal: 'Valider l\'UE avec une note supérieure ou égale à 14/20 pour sécuriser la mention.',
  createdAt: '24 oct. 2026',
};

// Tâches initiales du programme avec gestion des échéances (En retard / Prochaines / Terminées)
export const INITIAL_PLAN_TASKS: PlanTask[] = [
  {
    id: 'task-1',
    examPlanId: 'plan-1',
    title: 'Fiche de synthèse : Arbres AVL & Rotations GG/DD',
    subject: 'Algorithmique & Structures de données',
    dueDate: '2026-10-25', // Antérieur à aujourd'hui -> En retard si non complété !
    durationMinutes: 45,
    completed: false,
  },
  {
    id: 'task-2',
    examPlanId: 'plan-1',
    title: 'Série de 10 flashcards sur les parcours d\'ABR',
    subject: 'Algorithmique & Structures de données',
    dueDate: '2026-10-27', // Aujourd'hui
    durationMinutes: 25,
    completed: true,
    completedAt: '2026-10-27 10:30',
  },
  {
    id: 'task-3',
    examPlanId: 'plan-1',
    title: 'Exercices d\'annales : Algorithme de Dijkstra',
    subject: 'Algorithmique & Structures de données',
    dueDate: '2026-10-30', // Futur -> Prochaine révision
    durationMinutes: 60,
    completed: false,
  },
  {
    id: 'task-4',
    examPlanId: 'plan-1',
    title: 'Auto-test QCM complet sur le programme de Droit',
    subject: 'Droit constitutionnel',
    dueDate: '2026-11-02', // Futur
    durationMinutes: 30,
    completed: false,
  },
];

export const STUDY_TIPS: StudyTip[] = [
  {
    id: 'tip-1',
    title: 'La technique Feynman en 4 étapes',
    technique: 'Vulgarisation active',
    description: 'Explique un concept complexe avec des mots si simples qu\'un collégien de 14 ans pourrait le comprendre sans hésitation. Les zones où tu bloques révèlent exactement tes lacunes réelles.',
    actionableStep: 'Prends une feuille blanche et rédige l\'explication sans ouvrir ton polycopié.',
  },
  {
    id: 'tip-2',
    title: 'La répétition espacée (Courbe d\'Ebbinghaus)',
    technique: 'Répétition J+1, J+3, J+7, J+14',
    description: 'Le cerveau humain oublie 70% des informations apprises après 24 heures sans réactivation. Révise brièvement ta matière le lendemain, puis à 3 jours et à une semaine.',
    actionableStep: 'Fais 10 minutes de flashcards RéviGenius dès le lendemain matin.',
  },
  {
    id: 'tip-3',
    title: 'L\'Effet de Test (Active Recall)',
    technique: 'Auto-évaluation immédiate',
    description: 'Relire passivement son cours donne l\'illusion trompeuse de maîtrise (biais de familiarité). Ferme le cours et réponds à une question test pour forcer l\'encodage neuronal.',
    actionableStep: 'Lance le mode Quiz RéviGenius avant de relire tes notes.',
  },
  {
    id: 'tip-4',
    title: 'L\'Interleaving (Entremêlement des matières)',
    technique: 'Alternance cognitive',
    description: 'Plutôt que de faire 6 heures d\'une seule matière en continu, alterne 2 à 3 matières différentes par blocs de 50 minutes. Cela muscle la capacité de catégorisation lors des examens.',
    actionableStep: 'Programme deux blocs de 45 minutes sur deux cours distincts aujourd\'hui.',
  },
];

export const INITIAL_SCHEDULE: ScheduleItem[] = [
  {
    id: 'sch-1',
    title: 'Révision Flashcards ABR & AVL',
    courseTitle: 'Algorithmique & Structures de Données',
    type: 'flashcards',
    durationMinutes: 20,
    dateStr: 'Aujourd\'hui · 14:00',
    completed: false,
  },
  {
    id: 'sch-2',
    title: 'Auto-test Quiz Pouvoirs Présidentiels',
    courseTitle: 'Droit Constitutionnel',
    type: 'quiz',
    durationMinutes: 15,
    dateStr: 'Aujourd\'hui · 17:30',
    completed: true,
  },
  {
    id: 'sch-3',
    title: 'Lecture PDF : Révolution Cardiaque',
    courseTitle: 'Anatomie & Physiologie',
    type: 'cours',
    durationMinutes: 30,
    dateStr: 'Demain · 10:00',
    completed: false,
  },
];

export const DIGITAL_LIBRARIES: DigitalLibraryResource[] = [
  {
    id: 'lib-1',
    name: 'HAL Archives Ouvertes (CNRS & Universités)',
    category: 'Thèses & Publications Scientifiques',
    description: 'Plateforme nationale française d\'accès libre aux articles de recherche, mémoires universitaires et thèses de doctorat.',
    url: 'https://hal.science',
    isFreeAccess: true,
    faculties: 'Toutes facultés (Sciences, Lettres, Droit, Santé)',
    facultyIds: [
      'informatique',
      'sciences_ingenierie',
      'droit',
      'medecine_sante',
      'pharmacie',
      'agronomie_env',
      'sciences_sociales_humaines',
      'sciences_education',
      'architecture',
      'sciences_politiques',
      'autre'
    ],
  },
  {
    id: 'lib-2',
    name: 'Persée',
    category: 'Revues scientifiques en sciences humaines & sociales',
    description: 'Portail de revues scientifiques en libre accès créé par le Ministère de l\'Enseignement Supérieur et de la Recherche.',
    url: 'https://www.persee.fr',
    isFreeAccess: true,
    faculties: 'Droit, Histoire, Sociologie, Économie, Sciences Politiques',
    facultyIds: [
      'droit',
      'sciences_sociales_humaines',
      'eco_gestion',
      'sciences_politiques',
      'communication_journalisme',
      'sciences_education'
    ],
  },
  {
    id: 'lib-3',
    name: 'Cairn.info (Section Open Access)',
    category: 'Sciences Humaines, Droit et Gestion',
    description: 'Milliers d\'articles de recherche francophones disponibles en texte intégral gratuit sous mention libre accès.',
    url: 'https://www.cairn.info',
    isFreeAccess: true,
    faculties: 'Éco-Gestion, Sciences Politiques, Psychologie, Sociologie',
    facultyIds: [
      'eco_gestion',
      'sciences_politiques',
      'sciences_sociales_humaines',
      'droit',
      'communication_journalisme',
      'sciences_education'
    ],
  },
  {
    id: 'lib-4',
    name: 'PubMed / NCBI',
    category: 'Médecine & Sciences Biomédicales',
    description: 'La plus vaste base bibliographique médicale mondiale maintenue par la National Library of Medicine.',
    url: 'https://pubmed.ncbi.nlm.nih.gov',
    isFreeAccess: true,
    faculties: 'Médecine, Pharmacie, Sciences Infirmières, Biologie',
    facultyIds: [
      'medecine_sante',
      'pharmacie',
      'sciences_infirmieres',
      'sciences_ingenierie',
      'agronomie_env'
    ],
  },
  {
    id: 'lib-5',
    name: 'SUDOC (Catalogue Collectif Universitaire)',
    category: 'Localisation d\'ouvrages et manuels de BU',
    description: 'Localise dans quelle Bibliothèque Universitaire de France se trouve n\'importe quel manuel de cours ou traité.',
    url: 'https://www.sudoc.abes.fr',
    isFreeAccess: true,
    faculties: 'Toutes facultés (Localisation d\'ouvrages imprimés et thèses)',
    facultyIds: [
      'medecine_sante',
      'droit',
      'informatique',
      'sciences_ingenierie',
      'eco_gestion',
      'agronomie_env',
      'sciences_education',
      'sciences_sociales_humaines',
      'pharmacie',
      'sciences_infirmieres',
      'architecture',
      'communication_journalisme',
      'sciences_politiques',
      'autre'
    ],
  },
  {
    id: 'lib-6',
    name: 'OpenEdition Books & Journals',
    category: 'Humanités numériques & sciences sociales',
    description: 'Infrastructure académique européenne dédiée à l\'édition électronique scientifique ouverte.',
    url: 'https://www.openedition.org',
    isFreeAccess: true,
    faculties: 'Lettres, Histoire, Philosophie, Communication, Architecture',
    facultyIds: [
      'sciences_sociales_humaines',
      'communication_journalisme',
      'architecture',
      'sciences_education',
      'sciences_politiques'
    ],
  },
  {
    id: 'lib-7',
    name: 'arXiv.org (Cornell University)',
    category: 'Informatique, Mathématiques, Physique',
    description: 'Archive ouverte internationale majeure pour les prépublications en informatique, mathématiques, physique et intelligence artificielle.',
    url: 'https://arxiv.org',
    isFreeAccess: true,
    faculties: 'Informatique, Technologies, Sciences et Ingénierie',
    facultyIds: [
      'informatique',
      'sciences_ingenierie',
      'eco_gestion'
    ],
  },
  {
    id: 'lib-8',
    name: 'Agritrop (Cirad)',
    category: 'Agronomie, Forêt et Développement Durable',
    description: 'Publications scientifiques en libre accès du CIRAD et de l\'INRAE dédiées à l\'agriculture, l\'environnement et l\'agroforesterie.',
    url: 'https://agritrop.cirad.fr',
    isFreeAccess: true,
    faculties: 'Agronomie et environnement',
    facultyIds: [
      'agronomie_env',
      'sciences_ingenierie'
    ],
  },
];

// Legacy demo questions alias
export const DEMO_QUIZ_QUESTIONS = INITIAL_QUIZ_QUESTIONS;
