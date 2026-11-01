import { 
  FacultyId, 
  Course, 
  SummarySheet, 
  Flashcard, 
  QuizQuestion, 
  ExamPlan, 
  PlanTask 
} from '../types';

export interface FacultyTabConfig {
  facultyId: FacultyId;
  facultyBadge: string;
  themeColor: string;
  tabs: {
    accueil: { short: string; full: string; hint: string };
    cours: { short: string; full: string; hint: string; addLabel: string };
    revisions: { 
      short: string; 
      full: string; 
      hint: string;
      sheetsTab: string;
      flashcardsTab: string;
      quizTab: string;
    };
    programme: { short: string; full: string; hint: string; examGoalPlaceholder: string };
    bibliotheque: { short: string; full: string; hint: string };
  };
  domainQuote: string;
  specializedToolLabel: string;
  specializedToolDescription: string;
}

export interface FacultyDataPack {
  facultyId: FacultyId;
  courses: Course[];
  sheets: SummarySheet[];
  flashcards: Flashcard[];
  quizQuestions: QuizQuestion[];
  examPlan: ExamPlan;
  tasks: PlanTask[];
}

export const FACULTY_TAB_CONFIGS: Record<string, FacultyTabConfig> = {
  droit: {
    facultyId: 'droit',
    facultyBadge: 'Droit & Sciences Juridiques',
    themeColor: '#059669',
    tabs: {
      accueil: { short: 'Accueil', full: 'Accueil Juridique', hint: 'Espace Droit & Jurisprudence' },
      cours: { short: 'Codes & TD', full: 'Matières & Jurisprudence', hint: 'Cours magistraux, fiches d\'arrêts et TD', addLabel: 'Nouveau cours de droit' },
      revisions: { 
        short: 'Cas & Fiches', 
        full: 'Cas Pratiques & Fiches', 
        hint: 'Syllogismes juridiques, articles de lois et arrêts',
        sheetsTab: 'Fiches d\'arrêts & Synthèses',
        flashcardsTab: 'Articles & Définitions (SRS)',
        quizTab: 'QCM de Droit & Galops'
      },
      programme: { short: 'Galops', full: 'Planning Galops d\'Essai', hint: 'Organisation des galops d\'essai et partiels', examGoalPlaceholder: 'Valider la session de droit civil et administratif avec mention' },
      bibliotheque: { short: 'BU Droit', full: 'BU Droit & Dalloz', hint: 'Dalloz, Légifrance, traités et revues juridiques' },
    },
    domainQuote: '« Le droit est l\'art du bon et du juste. » — Celse',
    specializedToolLabel: 'Méthode du Syllogisme Juridique',
    specializedToolDescription: 'Majeure (règle de droit / article de code) ➔ Mineure (faits d\'espèce qualifiés) ➔ Conclusion motivée.',
  },

  medecine_sante: {
    facultyId: 'medecine_sante',
    facultyBadge: 'Médecine & Sciences de la Santé',
    themeColor: '#0284c7',
    tabs: {
      accueil: { short: 'Accueil', full: 'Accueil Clinique', hint: 'Espace Médecine & Santé' },
      cours: { short: 'Polys EDN', full: 'Polys & UE Médicales', hint: 'Polycopiés des collèges, anatomie et sémiologie', addLabel: 'Ajouter un polycopié' },
      revisions: { 
        short: 'R2C & SRS', 
        full: 'R2C & Flashcards Médicales', 
        hint: 'Rangs A et B, sémiologie, posologies et physiopathologie',
        sheetsTab: 'Fiches Cliniques & Items R2C',
        flashcardsTab: 'Flashcards Médicales (SRS)',
        quizTab: 'QCM Type EDN / ECOS'
      },
      programme: { short: 'EDN/Stages', full: 'Planning EDN & Stages', hint: 'Préparation des EDN, ECOS et révisions de garde', examGoalPlaceholder: 'Maîtriser les 367 items du programme R2C pour les EDN' },
      bibliotheque: { short: 'BU Santé', full: 'BU Santé & PubMed', hint: 'PubMed, Cochrane, revues médicales et catalogues de santé' },
    },
    domainQuote: '« Guérir parfois, soulager souvent, consoler toujours. »',
    specializedToolLabel: 'Démarche Diagnostique & Rangs R2C',
    specializedToolDescription: 'Analyse sémiologique ➔ Diagnostics différentiels ➔ Examens complémentaires hiérarchisés ➔ Prise en charge.',
  },

  informatique: {
    facultyId: 'informatique',
    facultyBadge: 'Informatique & Technologies',
    themeColor: '#0284c7',
    tabs: {
      accueil: { short: 'Accueil', full: 'Accueil Tech', hint: 'Espace Développement & Architecture' },
      cours: { short: 'Modules', full: 'Modules & Systèmes', hint: 'Algorithmique, bases de données, POO et réseaux', addLabel: 'Nouveau module tech' },
      revisions: { 
        short: 'Algo & SRS', 
        full: 'Algorithmes & Fiches Tech', 
        hint: 'Complexités asymptotiques, syntaxes et structures de données',
        sheetsTab: 'Fiches d\'algorithmes & Architecture',
        flashcardsTab: 'Syntaxes & Notions clés (SRS)',
        quizTab: 'QCM Algorithmique & Systèmes'
      },
      programme: { short: 'Sprints', full: 'Planning Projets & Sprints', hint: 'Sprints de projets, TPs notés et partiels d\'informatique', examGoalPlaceholder: 'Valider les projets d\'algorithmique et sécuriser 16/20 en examen machine' },
      bibliotheque: { short: 'Doc Tech', full: 'Documentation & arXiv', hint: 'Documentation open source, RFCs et prépublications arXiv' },
    },
    domainQuote: '« La simplicité est la condition préalable à la fiabilité. » — Edsger W. Dijkstra',
    specializedToolLabel: 'Analyse Asymptotique & Paradigmes Algorithmiques',
    specializedToolDescription: 'Diviser pour régner, programmation dynamique, mémoïsation et complexité temporelle/spatiale.',
  },

  eco_gestion: {
    facultyId: 'eco_gestion',
    facultyBadge: 'Économie & Gestion d\'Entreprise',
    themeColor: '#2563eb',
    tabs: {
      accueil: { short: 'Accueil', full: 'Accueil Économie', hint: 'Espace Analyse Économique & Finance' },
      cours: { short: 'Éco/Gestion', full: 'Modules Éco & Gestion', hint: 'Microéconomie, macroéconomie, comptabilité et finance', addLabel: 'Nouveau cours d\'éco-gestion' },
      revisions: { 
        short: 'Formules', 
        full: 'Formules & Annales de Gestion', 
        hint: 'Équilibres de marché, bilans comptables et ratios financiers',
        sheetsTab: 'Fiches de Synthèse & Ratios',
        flashcardsTab: 'Formules & Définitions Éco (SRS)',
        quizTab: 'QCM Micro/Macro & Finance'
      },
      programme: { short: 'Partiels', full: 'Planning Partiels & Projets', hint: 'Préparation des partiels d\'économie et dossiers de gestion', examGoalPlaceholder: 'Maîtriser les modèles macroéconomiques et l\'analyse de rentabilité financière' },
      bibliotheque: { short: 'BU Éco', full: 'BU Économie & Cairn', hint: 'Cairn Éco, revues de gestion et statistiques économiques' },
    },
    domainQuote: '« L\'économie consiste à allouer des ressources rares à des fins alternatives. »',
    specializedToolLabel: 'Ratios Financiers & Équilibres Micro/Macro',
    specializedToolDescription: 'Soldes Intermédiaires de Gestion (SIG), CAF, VAN, TRI, équilibres IS-LM et élasticités.',
  },

  sciences_ingenierie: {
    facultyId: 'sciences_ingenierie',
    facultyBadge: 'Sciences Fondamentales & Ingénierie',
    themeColor: '#10b981',
    tabs: {
      accueil: { short: 'Accueil', full: 'Accueil Ingénierie', hint: 'Espace Sciences & Calculs' },
      cours: { short: 'Sciences', full: 'Sciences & Calculs', hint: 'Mathématiques appliquées, physique fondamentale et mécanique', addLabel: 'Nouveau cours d\'ingénierie' },
      revisions: { 
        short: 'Théorèmes', 
        full: 'Théorèmes & Formules', 
        hint: 'Démonstrations clés, lois de la physique et équations différentielles',
        sheetsTab: 'Fiches de Démonstration & Méthodes',
        flashcardsTab: 'Formules & Unités SI (SRS)',
        quizTab: 'QCM Sciences & Calculs'
      },
      programme: { short: 'Concours', full: 'Planning Concours & Partiels', hint: 'Résolution d\'exercices d\'annales et épreuves écrites', examGoalPlaceholder: 'Valider les unités de mathématiques appliquées et thermodynamique avec mention' },
      bibliotheque: { short: 'BU Sciences', full: 'BU Sciences & HAL', hint: 'Archives ouvertes HAL, publications scientifiques et manuels de cours' },
    },
    domainQuote: '« Les ingénieurs créent le monde qui n\'a jamais existé. » — Theodore von Kármán',
    specializedToolLabel: 'Modélisation & Analyse Dimensionnelle',
    specializedToolDescription: 'Vérification de l\'homogénéité physique, bilans différentiels et théorèmes énergétiques.',
  },

  etudes_bibliques_theologie: {
    facultyId: 'etudes_bibliques_theologie',
    facultyBadge: 'Centre d\'Études Bibliques & Théologie',
    themeColor: '#b45309',
    tabs: {
      accueil: { short: 'Accueil', full: 'Accueil Théologique', hint: 'Centre d\'Études & Réflexion' },
      cours: { short: 'Exégèse', full: 'Cours & Exégèse Biblique', hint: 'Ancien Testament, Nouveau Testament, herméneutique et histoire', addLabel: 'Nouveau cours d\'exégèse' },
      revisions: { 
        short: 'Versets/SRS', 
        full: 'Versets & Fiches Théologiques', 
        hint: 'Mémorisation de passages clés, prophéties accomplies et synthèses',
        sheetsTab: 'Fiches Exégétiques & Doctrinales',
        flashcardsTab: 'Versets Clés & Références (SRS)',
        quizTab: 'QCM d\'Étude Biblique & Connaissances'
      },
      programme: { short: 'Plan d\'Étude', full: 'Plan de Lecture & Études', hint: 'Méditation quotidienne, lecture suivie et travaux de recherche', examGoalPlaceholder: 'Approfondir l\'exégèse des épîtres et maîtriser la chronologie prophétique' },
      bibliotheque: { short: 'Bible', full: 'Espace Biblique Intégré', hint: 'Bible hors-ligne, prophéties AT-NT, versets de sagesse et contradictions' },
    },
    domainQuote: '« Ta parole est une lampe à mes pieds, et une lumière sur mon sentier. » — Psaume 119:105',
    specializedToolLabel: 'Méthode Herméneutique (O.I.A.)',
    specializedToolDescription: 'Observation du texte (contexte historique/littéraire) ➔ Interprétation (sens original) ➔ Application personnelle.',
  },

  agronomie_env: {
    facultyId: 'agronomie_env',
    facultyBadge: 'Agronomie & Écologie Appliquée',
    themeColor: '#15803d',
    tabs: {
      accueil: { short: 'Accueil', full: 'Accueil Agro & Éco', hint: 'Espace Sciences du Végétal et des Sols' },
      cours: { short: 'Agro', full: 'Cours Agro & Écologie', hint: 'Biologie végétale, pédologie, protection des cultures et écosystèmes', addLabel: 'Nouveau cours d\'agronomie' },
      revisions: { 
        short: 'Taxonomie', 
        full: 'Taxonomie & Fiches Sols', 
        hint: 'Familles botaniques, cycles biogéochimiques et agrosystèmes',
        sheetsTab: 'Fiches Pédologiques & Agroécologiques',
        flashcardsTab: 'Familles & Cycles du Sol (SRS)',
        quizTab: 'QCM Agronomie & Environnement'
      },
      programme: { short: 'Campagne', full: 'Planning Campagne & Examens', hint: 'Suivi des parcelles d\'expérimentation, TPs terrain et partiels', examGoalPlaceholder: 'Maîtriser la gestion durable des sols et la dynamique des agroécosystèmes' },
      bibliotheque: { short: 'BU Agro', full: 'BU Agro & Cirad', hint: 'Agritrop, INRAE, Cirad et littérature agroenvironnementale' },
    },
    domainQuote: '« Prendre soin de la terre, c\'est cultiver l\'avenir de l\'humanité. »',
    specializedToolLabel: 'Diagnostic de Fertilité des Sols & Agrosystèmes',
    specializedToolDescription: 'Texture, structure, complexe argilo-humique, activité biologique et bilan minéral N-P-K.',
  },

  pharmacie: {
    facultyId: 'pharmacie',
    facultyBadge: 'Faculté de Pharmacie',
    themeColor: '#0891b2',
    tabs: {
      accueil: { short: 'Accueil', full: 'Accueil Pharmacie', hint: 'Espace Pharmacologie & Officine' },
      cours: { short: 'Molécules', full: 'Pharmacologie & Molécules', hint: 'Chimie thérapeutique, pharmacodynamie, toxicologie et galénique', addLabel: 'Nouveau cours de pharmacie' },
      revisions: { 
        short: 'DCI & SRS', 
        full: 'DCI & Mécanismes d\'Action', 
        hint: 'Dénominations Communes Internationales, cibles réceptoratrices et posologies',
        sheetsTab: 'Fiches Molécules & Contre-indications',
        flashcardsTab: 'DCI & Cibles Réceptoratrices (SRS)',
        quizTab: 'QCM Pharmacologie & Toxicologie'
      },
      programme: { short: 'Internat', full: 'Planning Internat & Évals', hint: 'Préparation du concours de l\'internat et examens de pharmacie', examGoalPlaceholder: 'Maîtriser les classes pharmacothérapeutiques et le concours blanc d\'internat' },
      bibliotheque: { short: 'BU Pharma', full: 'BU Pharmacie & Vidal', hint: 'Monographies Vidal, PubMed, pharmacopées officielles et bases toxicologiques' },
    },
    domainQuote: '« C\'est la dose qui fait le poison. » — Paracelse',
    specializedToolLabel: 'Classification Pharmacologique & Interactions',
    specializedToolDescription: 'Pharmacocinétique ADME (Absorption, Distribution, Métabolisme, Élimination) & Surveillance des interactions.',
  },

  sciences_infirmieres: {
    facultyId: 'sciences_infirmieres',
    facultyBadge: 'Sciences Infirmières & IFSI',
    themeColor: '#0284c7',
    tabs: {
      accueil: { short: 'Accueil', full: 'Accueil Soins & Clinique', hint: 'Espace Démarche de Soins' },
      cours: { short: 'Processus', full: 'Processus Traumatiques & Soins', hint: 'Législation, raisonnement clinique, pharmacologie infirmière et gestes d\'urgence', addLabel: 'Ajouter une UE infirmière' },
      revisions: { 
        short: 'Calculs', 
        full: 'Calculs de Doses & Démarches', 
        hint: 'Débits de perfusion, règles de trois, normes biologiques et protocoles',
        sheetsTab: 'Fiches Protocoles & Démarches Cliniques',
        flashcardsTab: 'Normes Bio & Calculs de Doses (SRS)',
        quizTab: 'QCM Soins Infirmiers & Situations Cliniques'
      },
      programme: { short: 'Stages', full: 'Planning Stages & Validations', hint: 'Objectifs de stages cliniques, portfolio et partiels universitaires', examGoalPlaceholder: 'Valider sans faute l\'épreuve de calculs de doses et les démarches de soins' },
      bibliotheque: { short: 'BU Soins', full: 'BU Soins & E-learning', hint: 'Protocoles HAS, revues de soins infirmiers et littérature clinique' },
    },
    domainQuote: '« Soigner une personne est le plus bel engagement humain et scientifique. »',
    specializedToolLabel: 'Règle des 5 Bons & Démarche Clinique Infirmière',
    specializedToolDescription: 'Bon patient, bon médicament, bonne dose, bonne voie, bon moment & Surveillance de l\'efficacité et effets secondaires.',
  },

  architecture: {
    facultyId: 'architecture',
    facultyBadge: 'École Nationale d\'Architecture',
    themeColor: '#ea580c',
    tabs: {
      accueil: { short: 'Accueil', full: 'Accueil Atelier Archi', hint: 'Espace Conception & Théorie' },
      cours: { short: 'Projets', full: 'Projets & Histoire Archi', hint: 'Histoire de l\'architecture, résistance des matériaux, morphologie urbaine et bioclimatique', addLabel: 'Nouveau cours d\'architecture' },
      revisions: { 
        short: 'Structures', 
        full: 'Structures & Matériaux', 
        hint: 'Descentes de charges, détails constructifs, échelles et normes',
        sheetsTab: 'Fiches Constructives & Détails Techniques',
        flashcardsTab: 'Architectes, Ouvrages & RDM (SRS)',
        quizTab: 'QCM Théorie & Statique Architecturale'
      },
      programme: { short: 'Rendus', full: 'Planning Rendus & Jurys', hint: 'Charrettes, jalons de maquette, planches A0 et jurys de projet', examGoalPlaceholder: 'Finaliser les pièces graphiques du projet d\'atelier et réussir la soutenance' },
      bibliotheque: { short: 'BU Archi', full: 'BU Architecture & Revues', hint: 'Revues d\'architecture, monographies d\'édifices et traités de construction' },
    },
    domainQuote: '« L\'architecture est le jeu savant, correct et magnifique des volumes sous la lumière. » — Le Corbusier',
    specializedToolLabel: 'Conception Bioclimatique & Descente de Charges',
    specializedToolDescription: 'Orientation solaire, ventilation naturelle traversante, enveloppe thermique et transmission des efforts.',
  },

  communication_journalisme: {
    facultyId: 'communication_journalisme',
    facultyBadge: 'Information & Journalisme',
    themeColor: '#0284c7',
    tabs: {
      accueil: { short: 'Accueil', full: 'Accueil Rédaction & Médias', hint: 'Espace Analyse de l\'Information' },
      cours: { short: 'Écriture', full: 'Écriture & Déontologie', hint: 'Techniques d\'enquête, droit des médias, écriture multimédia et rhétorique', addLabel: 'Nouveau cours de médias' },
      revisions: { 
        short: 'Genres', 
        full: 'Genres & Chartes Journalistiques', 
        hint: 'Charte de Munich, angle éditorial, formats d\'écriture et règles typographiques',
        sheetsTab: 'Fiches Déontologie & Formats d\'Écriture',
        flashcardsTab: 'Règles Déontologiques & Droit de la Presse (SRS)',
        quizTab: 'QCM Actualité, Médias & Droit de Presse'
      },
      programme: { short: 'Bouclage', full: 'Planning Bouclage & Examens', hint: 'Bouclages d\'enquêtes, reportages de terrain et partiels théoriques', examGoalPlaceholder: 'Rédiger une enquête de fond rigoureuse et maîtriser le droit de la presse' },
      bibliotheque: { short: 'BU Médias', full: 'BU Médias & Revues', hint: 'Cairn médias, archives de presse, revues de sciences de l\'information' },
    },
    domainQuote: '« Les faits sont sacrés, le commentaire est libre. » — C.P. Scott',
    specializedToolLabel: 'Les 5 W & Pyramide Inversée',
    specializedToolDescription: 'Who, What, When, Where, Why ➔ Informations capitales en attaque ➔ Développement hiérarchisé.',
  },

  sciences_politiques: {
    facultyId: 'sciences_politiques',
    facultyBadge: 'Sciences Politiques & Relations Internationales',
    themeColor: '#4f46e5',
    tabs: {
      accueil: { short: 'Accueil', full: 'Accueil Sc. Po & Géopolitique', hint: 'Espace Politiques Publiques & Relations Internationales' },
      cours: { short: 'Régimes', full: 'Relations Int. & Politiques', hint: 'Théories des RI, régimes politiques comparés, sociologie du vote et politiques publiques', addLabel: 'Nouveau cours de sc. po' },
      revisions: { 
        short: 'Doctrines', 
        full: 'Doctrines & Fiches Géopolitiques', 
        hint: 'Auteurs majeurs, concepts de puissance, traités et typologies de régimes',
        sheetsTab: 'Fiches Doctrinales & Traités Clés',
        flashcardsTab: 'Théories des RI & Dates Charnières (SRS)',
        quizTab: 'QCM Géopolitique & Idées Politiques'
      },
      programme: { short: 'Galops ScPo', full: 'Planning Galops & Dissertations', hint: 'Entraînement aux épreuves de culture générale et dossiers de géopolitique', examGoalPlaceholder: 'Maîtriser les grilles d\'analyse des relations internationales et les grandes doctrines' },
      bibliotheque: { short: 'BU ScPo', full: 'BU Sc. Po & Revues', hint: 'Persée, Cairn politique, revues de géopolitique et rapports d\'institutions internationales' },
    },
    domainQuote: '« Gouverner, c\'est prévoir ; et ne rien prévoir, c\'est courir à sa perte. » — Émile de Girardin',
    specializedToolLabel: 'Grille d\'Analyse Géopolitique & Typologie des Régimes',
    specializedToolDescription: 'Intérêts étatiques, hard power / soft power, alliances multilatérales et contraintes internes.',
  },

  sciences_education: {
    facultyId: 'sciences_education',
    facultyBadge: 'Sciences de l\'Éducation & Formation',
    themeColor: '#0d9488',
    tabs: {
      accueil: { short: 'Accueil', full: 'Accueil Pédagogie & Didactique', hint: 'Espace Théories de l\'Apprentissage' },
      cours: { short: 'Didactique', full: 'Didactique & Apprentissages', hint: 'Psychologie de l\'enfant, pédagogies actives, sociologie de l\'école et évaluation', addLabel: 'Nouveau cours d\'éducation' },
      revisions: { 
        short: 'Méthodes', 
        full: 'Méthodes & Pédagogues', 
        hint: 'Piaget, Vygotski, Freinet, zone proximale de développement et différenciation',
        sheetsTab: 'Fiches Didactiques & Théoriciens',
        flashcardsTab: 'Concepts Clés de l\'Apprentissage (SRS)',
        quizTab: 'QCM Didactique & Psychologie Scolaire'
      },
      programme: { short: 'Concours', full: 'Planning Concours CRPE/CAPES', hint: 'Préparation des concours d\'enseignement et mémoires universitaires', examGoalPlaceholder: 'Valider le master MEEF et réussir les épreuves écrites disciplinaires et didactiques' },
      bibliotheque: { short: 'BU Éduc', full: 'BU Sciences de l\'Éducation', hint: 'Publications pédagogiques, rapports ministériels et revues didactiques' },
    },
    domainQuote: '« Éduquer, ce n\'est pas remplir un vase, c\'est allumer un feu. » — W.B. Yeats',
    specializedToolLabel: 'Zone Proximale de Développement (ZPD) & Étayage',
    specializedToolDescription: 'Évaluation diagnostique ➔ Tâche ajustée au niveau émergent ➔ Étayage progressif vers l\'autonomie.',
  },

  sciences_sociales_humaines: {
    facultyId: 'sciences_sociales_humaines',
    facultyBadge: 'Sciences Humaines & Sociales',
    themeColor: '#7c3aed',
    tabs: {
      accueil: { short: 'Accueil', full: 'Accueil Sciences Humaines', hint: 'Espace Sociologie & Histoire' },
      cours: { short: 'Humanités', full: 'Sociologie & Histoire', hint: 'Sociologie générale, psychologie cognitive, épistémologie et méthodes qualitatives', addLabel: 'Nouveau cours d\'humanités' },
      revisions: { 
        short: 'Concepts', 
        full: 'Concepts & Méthodes Humaines', 
        hint: 'Fait social, habitus, paradigmes épistémologiques et protocoles d\'enquête',
        sheetsTab: 'Fiches Conceptuelles & Épistémologie',
        flashcardsTab: 'Auteurs Fondateurs & Notions (SRS)',
        quizTab: 'QCM Sociologie & Histoire des Idées'
      },
      programme: { short: 'Mémoire', full: 'Planning Mémoire & Partiels', hint: 'Rédaction du mémoire de recherche, entretiens et examens terminaux', examGoalPlaceholder: 'Finaliser le cadre théorique du mémoire et valider les partiels avec mention' },
      bibliotheque: { short: 'BU Lettres', full: 'BU Humanités & Persée', hint: 'Persée, OpenEdition, Cairn et corpus d\'archives numérisées' },
    },
    domainQuote: '« Le sociologue a pour tâche d\'élucider ce qui est caché. » — Pierre Bourdieu',
    specializedToolLabel: 'Démarche d\'Enquête Sociologique & Réfutabilité',
    specializedToolDescription: 'Problématisation ➔ Hypothèses empiriques ➔ Terrain (entretiens/statistiques) ➔ Interprétation théorique.',
  },

  petrole_gaz: {
    facultyId: 'petrole_gaz',
    facultyBadge: 'Génie Pétrolier & Gazier',
    themeColor: '#d97706',
    tabs: {
      accueil: { short: 'Accueil', full: 'Accueil Forage & Réservoirs', hint: 'Espace Ingénierie Pétrolière' },
      cours: { short: 'Forage', full: 'Génie Pétrolier & Réservoirs', hint: 'Pétrophysique, loi de Darcy, fluides de forage, GNL et raffinage', addLabel: 'Nouveau cours pétrole' },
      revisions: { 
        short: 'Darcy/Lois', 
        full: 'Lois de Darcy & Diagraphies', 
        hint: 'Perméabilités, pressions capillaires, courbes de déclin et bilans matières',
        sheetsTab: 'Fiches Diagraphies & Réservoirs',
        flashcardsTab: 'Formules de Forage & Pétrophysique (SRS)',
        quizTab: 'QCM Ingénierie des Réservoirs & Forage'
      },
      programme: { short: 'Certifs', full: 'Planning Certifications & Partiels', hint: 'Préparation des partiels d\'ingénierie et habilitations techniques (IWCF)', examGoalPlaceholder: 'Maîtriser les simulations d\'écoulement en milieu poreux et l\'analyse de diagraphies' },
      bibliotheque: { short: 'BU Énergie', full: 'BU Énergie & Hydrocarbures', hint: 'Publications SPE, OnePetro, manuels de génie pétrolier et normes API' },
    },
    domainQuote: '« L\'ingénierie énergétique transforme les ressources souterraines en moteur de l\'industrie. »',
    specializedToolLabel: 'Équation de Darcy & Bilan Matière des Réservoirs',
    specializedToolDescription: 'Q = (k * A / mu) * (dP / dL) & Calcul de l\'indice de productivité (IP) et recovery factor.',
  },

  energie_renouvelable: {
    facultyId: 'energie_renouvelable',
    facultyBadge: 'Énergie & Énergies Renouvelables',
    themeColor: '#16a34a',
    tabs: {
      accueil: { short: 'Accueil', full: 'Accueil Transition Énergétique', hint: 'Espace Solaire, Éolien & Smart Grids' },
      cours: { short: 'Systèmes', full: 'Solaire, Éolien & Thermique', hint: 'Dimensionnement photovoltaïque, aérodynamique éolienne, hydrogène et réseaux intelligents', addLabel: 'Nouveau cours renouvelables' },
      revisions: { 
        short: 'Betz/Rendement', 
        full: 'Limite de Betz & Rendements', 
        hint: 'Cycles de Carnot, coefficient de puissance Cp, stockage d\'énergie et piles à combustible',
        sheetsTab: 'Fiches Dimensionnement & Rendements',
        flashcardsTab: 'Formules Énergétiques & Normes (SRS)',
        quizTab: 'QCM Énergies Renouvelables & Thermodynamique'
      },
      programme: { short: 'Projets', full: 'Planning Projets & Dimensionnement', hint: 'Jalons de projets de parcs solaires/éoliens et examens de génie électrique', examGoalPlaceholder: 'Maîtriser le dimensionnement d\'installations hybrides PV/éolien et le stockage stationnaire' },
      bibliotheque: { short: 'BU Renouv.', full: 'BU Renouvelables & Sciences', hint: 'ScienceDirect, IEEE Xplore, rapports IRENA et publications de transition énergétique' },
    },
    domainQuote: '« Rien ne se perd, rien ne se crée, tout se transforme. » — Antoine Lavoisier',
    specializedToolLabel: 'Dimensionnement PV & Limite Aérodynamique de Betz',
    specializedToolDescription: 'Calcul du productible (kWh/kWc), PR (Performance Ratio) et puissance aérodynamique P = 1/2 * rho * S * V^3.',
  },

  autre: {
    facultyId: 'autre',
    facultyBadge: 'Parcours Universitaire Pluridisciplinaire',
    themeColor: '#059669',
    tabs: {
      accueil: { short: 'Accueil', full: 'Accueil Universitaire', hint: 'Espace de Travail & Méthodologie' },
      cours: { short: 'Matières', full: 'Mes Cours Magistraux & TD', hint: 'Organisation par UE, fiches de lecture et synthèses', addLabel: 'Ajouter un cours' },
      revisions: { 
        short: 'Réviser', 
        full: 'Fiches & Flashcards SRS', 
        hint: 'Répétition espacée, auto-évaluation active et fiches de synthèse',
        sheetsTab: 'Fiches de Synthèse Méthodique',
        flashcardsTab: 'Flashcards de Mémorisation (SRS)',
        quizTab: 'QCM d\'Auto-évaluation'
      },
      programme: { short: 'Planning', full: 'Planning d\'Examens & Tâches', hint: 'Calendrier de révision, tâches quotidiennes et objectifs de session', examGoalPlaceholder: 'Valider le semestre universitaire avec mention et régularité' },
      bibliotheque: { short: 'BU', full: 'Bibliothèque Universitaire', hint: 'Catalogues universitaires, HAL et bases documentaires' },
    },
    domainQuote: '« La persévérance et la méthode transforment chaque effort d\'étude en réussite. »',
    specializedToolLabel: 'Technique Feynman & Test Actif',
    specializedToolDescription: 'Expliquer avec clarté sans regarder ses notes ➔ Identifier les incompréhensions ➔ Consolider en mémoire longue.',
  },
};

// Aliases for legacy IDs
FACULTY_TAB_CONFIGS['sciences'] = FACULTY_TAB_CONFIGS['sciences_ingenierie'];
FACULTY_TAB_CONFIGS['medecine'] = FACULTY_TAB_CONFIGS['medecine_sante'];
FACULTY_TAB_CONFIGS['lettres'] = FACULTY_TAB_CONFIGS['sciences_sociales_humaines'];

export function getFacultyTabConfig(facultyId?: FacultyId | string): FacultyTabConfig {
  if (!facultyId || !FACULTY_TAB_CONFIGS[facultyId]) {
    return FACULTY_TAB_CONFIGS['informatique'];
  }
  return FACULTY_TAB_CONFIGS[facultyId];
}

// -------------------------------------------------------------
// CURRICULUM PACKS (Specialized courses, sheets, flashcards, quiz)
// -------------------------------------------------------------
export const FACULTY_DATA_PACKS: Record<string, FacultyDataPack> = {
  droit: {
    facultyId: 'droit',
    courses: [
      {
        id: 'cours-droit-1',
        code: 'DRO101',
        title: 'Droit Civil des Obligations : Contrats & Responsabilité',
        subject: 'Droit civil des obligations',
        facultyId: 'droit',
        facultyName: 'Droit',
        semester: 'Semestre 2',
        ects: 6,
        chapterCount: 5,
        completedChapters: 3,
        color: '#059669',
        description: 'La réforme de 2016, formation du contrat, consentement, vice du consentement, force obligatoire et responsabilité civile extracontractuelle (art. 1240 du Code civil).',
        createdAt: '22 oct. 2026',
        createdAtTimestamp: Date.now() - 5 * 86400000,
        hasPdf: true,
        pdfFileName: 'droit_civil_obligations_cours_complet.pdf',
        pdfFileSize: 2950000,
        lastRevised: 'Hier à 14:15',
      },
      {
        id: 'cours-droit-2',
        code: 'DRO102',
        title: 'Droit Constitutionnel de la Ve République & QPC',
        subject: 'Droit constitutionnel',
        facultyId: 'droit',
        facultyName: 'Droit',
        semester: 'Semestre 1',
        ects: 5,
        chapterCount: 4,
        completedChapters: 2,
        color: '#059669',
        description: 'Origines constitutionnelles de 1958, régime semi-présidentiel, articles 8, 12, 16 et 49-3, et contrôle de constitutionnalité par voie de QPC (art. 61-1).',
        createdAt: '20 oct. 2026',
        createdAtTimestamp: Date.now() - 7 * 86400000,
        hasPdf: true,
        pdfFileName: 'droit_constitutionnel_notes_amphi.pdf',
        pdfFileSize: 1820000,
        lastRevised: 'Il y a 3 jours',
      },
      {
        id: 'cours-droit-3',
        code: 'DRO201',
        title: 'Droit Administratif Général : Actes, Recours & Service Public',
        subject: 'Droit administratif',
        facultyId: 'droit',
        facultyName: 'Droit',
        semester: 'Semestre 3',
        ects: 6,
        chapterCount: 4,
        completedChapters: 1,
        color: '#047857',
        description: 'Grands arrêts du Tribunal des Conflits et du Conseil d\'État (Blanco, Terrier, Nicolo), recours pour excès de pouvoir (REP) et principe de légalité administrative.',
        createdAt: '24 oct. 2026',
        createdAtTimestamp: Date.now() - 3 * 86400000,
        hasPdf: true,
        pdfFileName: 'droit_administratif_grands_arrets.pdf',
        pdfFileSize: 2400000,
        lastRevised: 'Avant-hier',
      },
    ],
    sheets: [
      {
        id: 'fiche-droit-1',
        title: 'Fiche synthèse : Le bloc de constitutionnalité et la hiérarchie des normes',
        subject: 'Droit constitutionnel',
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
        id: 'fiche-droit-2',
        title: 'Fiche méthode : Rédaction rigoureuse d\'un cas pratique (Syllogisme juridique)',
        subject: 'Droit civil des obligations',
        content: `1. Qualification juridique des faits :
- Traduire les faits bruts en termes juridiques stricts (ex: ne pas écrire "Marc a promis une voiture à Paul", mais "Il s'agit d'un contrat synallagmatique de vente de chose mobilière").
- Éliminer les détails factuels superflus.

2. Le Problème de droit :
- Poser la question sous forme abstraite et générale (ex: "Le débiteur d'une obligation de délivrance conforme peut-il invoquer la force majeure pour s'exonérer sans clause expresse ?").

3. Le Syllogisme :
- MAJEURE : Citer la règle de droit applicable (article de code, principe général ou jurisprudence constante).
- MINEURE : Appliquer la règle aux faits qualifiés de l'espèce.
- CONCLUSION : Donner une réponse nette, pratique et opérationnelle.`,
        createdAt: '25 oct. 2026',
        updatedAt: '25 oct. 2026',
        isExample: true,
      },
      {
        id: 'fiche-droit-3',
        title: 'Fiche arrêt clé : Arrêt Blanco (Tribunal des Conflits, 8 février 1873)',
        subject: 'Droit administratif',
        content: `1. Les Faits :
Une fillette renversée par un wagonnet de la manufacture des tabacs de Bordeaux (gérée par l'État). Le père saisit le juge civil.

2. Portée fondamentale :
- Autonomie du droit administratif : La responsabilité de l'État pour les dommages causés par le service public ne peut être régie par les principes du Code civil.
- Elle a ses règles spéciales qui varient selon les besoins du service et la nécessité de concilier les droits de l'État avec les droits privés.
- Compétence de la juridiction administrative pour connaître des litiges nés de l'activité des services publics.`,
        createdAt: '26 oct. 2026',
        updatedAt: '26 oct. 2026',
        isExample: true,
      },
    ],
    flashcards: [
      {
        id: 'fc-droit-1',
        question: 'Quelles sont les deux conditions cumulatives requises pour la mise en œuvre de l\'article 16 de la Constitution ?',
        answer: '1) Menace grave et immédiate pesant sur les institutions de la République, l\'indépendance de la Nation ou l\'intégrité de son territoire.\n2) Interruption du fonctionnement régulier des pouvoirs publics constitutionnels.',
        subject: 'Droit constitutionnel',
        nextReviewDate: '2026-10-27',
        intervalDays: 1,
        masteryLevel: 'nouveau',
        reviewCount: 0,
        facultyId: 'droit',
        isExample: true,
      },
      {
        id: 'fc-droit-2',
        question: 'Quel est le fondement légal de la responsabilité extracontractuelle pour faute depuis l\'ordonnance de 2016 ?',
        answer: 'Article 1240 du Code civil (anciennement article 1382) : « Tout fait quelconque de l\'homme, qui cause à autrui un dommage, oblige celui par la faute duquel il est arrivé, à le réparer. »',
        subject: 'Droit civil des obligations',
        nextReviewDate: '2026-10-28',
        intervalDays: 2,
        masteryLevel: 'moyen',
        reviewCount: 1,
        facultyId: 'droit',
        isExample: true,
      },
      {
        id: 'fc-droit-3',
        question: 'Quelle est la portée de l\'arrêt Nicolo du Conseil d\'État (20 octobre 1989) ?',
        answer: 'Le Conseil d\'État accepte enfin d\'exercer le contrôle de conventionalité de la loi postérieure au traité international, consacrant la supériorité des traités sur les lois même postérieures en vertu de l\'article 55 de la Constitution.',
        subject: 'Droit administratif',
        nextReviewDate: '2026-10-29',
        intervalDays: 3,
        masteryLevel: 'facile',
        reviewCount: 2,
        facultyId: 'droit',
        isExample: true,
      },
    ],
    quizQuestions: [
      {
        id: 'q-droit-1',
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
        id: 'q-droit-2',
        statement: 'Dans le cadre de l\'article 1240 du Code civil, quels sont les trois éléments indispensables pour engager la responsabilité extracontractuelle ?',
        options: [
          'Un contrat, une mise en demeure et un huissier',
          'Une faute, un dommage certain et un lien de causalité direct',
          'Une faute lourde, une intention de nuire et un témoin',
          'Une inexécution contractuelle et un préjudice moral'
        ],
        correctIndex: 1,
        explanation: 'Pour que la responsabilité délictuelle/extracontractuelle soit retenue, la victime doit prouver cumulativement une faute, un dommage réparable (certain, direct, légitime) et un lien de causalité.',
        subject: 'Droit civil des obligations',
        facultyId: 'droit',
        isExample: true,
      },
      {
        id: 'q-droit-3',
        statement: 'Lequel de ces arrêts a consacré l\'abandon de la théorie des ministres-juges en reconnaissant la compétence de droit commun du Conseil d\'État ?',
        options: [
          'Arrêt Cadot (CE, 13 décembre 1889)',
          'Arrêt Blanco (TC, 8 février 1873)',
          'Arrêt Bac d\'Eloka (TC, 22 janvier 1921)',
          'Arrêt Septfonds (TC, 16 juin 1923)'
        ],
        correctIndex: 0,
        explanation: 'L\'arrêt Cadot de 1889 met fin au système du ministre-juge : le Conseil d\'État se reconnaît compétent pour trancher directement les recours sans passer au préalable par une décision ministérielle.',
        subject: 'Droit administratif',
        facultyId: 'droit',
        isExample: true,
      },
    ],
    examPlan: {
      id: 'plan-droit-1',
      examName: 'Galops d\'Essai & Partiels de Droit - Semestre 1',
      subject: 'Droit constitutionnel',
      examDate: '2026-12-18',
      chapters: 'Chapitre 1 : Théorie de l\'État et souveraineté\nChapitre 2 : La séparation des pouvoirs et régimes comparés\nChapitre 3 : La Constitution de 1958 et le pouvoir exécutif\nChapitre 4 : Le Parlement et la procédure législative\nChapitre 5 : Le Conseil Constitutionnel et la QPC',
      dailyMinutes: 90,
      personalGoal: 'Valider la session avec une note supérieure ou égale à 14/20 pour sécuriser la mention et intégrer un Master sélectif.',
      createdAt: '24 oct. 2026',
    },
    tasks: [
      {
        id: 'task-droit-1',
        examPlanId: 'plan-droit-1',
        title: 'Fiche d\'arrêt : Décision Liberté d\'Association du 16 juillet 1971',
        subject: 'Droit constitutionnel',
        dueDate: '2026-10-25',
        durationMinutes: 45,
        completed: false,
      },
      {
        id: 'task-droit-2',
        examPlanId: 'plan-droit-1',
        title: 'Syllogisme d\'entraînement : Cas pratique en droit des contrats',
        subject: 'Droit civil des obligations',
        dueDate: '2026-10-27',
        durationMinutes: 60,
        completed: true,
        completedAt: '2026-10-27 11:00',
      },
      {
        id: 'task-droit-3',
        examPlanId: 'plan-droit-1',
        title: 'Mémorisation des articles 8, 12, 16 et 49-3 de la Constitution',
        subject: 'Droit constitutionnel',
        dueDate: '2026-10-30',
        durationMinutes: 30,
        completed: false,
      },
    ],
  },

  medecine_sante: {
    facultyId: 'medecine_sante',
    courses: [
      {
        id: 'cours-med-1',
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
        description: 'Circulation systémique et pulmonaire, cycle cardiaque, coronaires, révolution cardiaque et régulation nerveuse/humorale de la pression artérielle.',
        createdAt: '26 oct. 2026',
        createdAtTimestamp: Date.now() - 86400000,
        hasPdf: true,
        pdfFileName: 'poly_anatomie_coeur_vaisseaux.pdf',
        pdfFileSize: 3100000,
        lastRevised: 'Aujourd\'hui à 09:15',
      },
      {
        id: 'cours-med-2',
        code: 'MED201',
        title: 'Sémiologie Médicale & Examen Clinique Cardiorespiratoire',
        subject: 'Sémiologie',
        facultyId: 'medecine_sante',
        facultyName: 'Médecine et sciences de la santé',
        semester: 'DFGSM 2',
        ects: 6,
        chapterCount: 5,
        completedChapters: 2,
        color: '#0284c7',
        description: 'Auscultation cardiaque (souffles, B1/B2, bruits surajoutés), signes d\'insuffisance cardiaque gauche/droite, auscultation pulmonaire (râles crépitants, sibilants).',
        createdAt: '25 oct. 2026',
        createdAtTimestamp: Date.now() - 2 * 86400000,
        hasPdf: true,
        pdfFileName: 'semiologie_cardiopulmonaire_guide.pdf',
        pdfFileSize: 2750000,
        lastRevised: 'Hier à 18:00',
      },
      {
        id: 'cours-med-3',
        code: 'MED202',
        title: 'Physiologie Humaine & Équilibre Hydro-Électrolytique',
        subject: 'Physiologie humaine',
        facultyId: 'medecine_sante',
        facultyName: 'Médecine et sciences de la santé',
        semester: 'PASS / L2',
        ects: 5,
        chapterCount: 4,
        completedChapters: 2,
        color: '#0369a1',
        description: 'Filtration glomérulaire, réabsorption tubulaire, système rénine-angiotensine-aldostérone (SRAA), équilibre acido-basique et gaz du sang.',
        createdAt: '24 oct. 2026',
        createdAtTimestamp: Date.now() - 3 * 86400000,
        hasPdf: true,
        pdfFileName: 'physiologie_renale_acide_base.pdf',
        pdfFileSize: 2200000,
        lastRevised: 'Il y a 2 jours',
      },
    ],
    sheets: [
      {
        id: 'fiche-med-1',
        title: 'Fiche mémo : La révolution cardiaque et régulation de la pression artérielle',
        subject: 'Anatomie descriptive',
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
      {
        id: 'fiche-med-2',
        title: 'Fiche clinique EDN : Insuffisance Cardiaque Aiguë & Œdème Aigu du Poumon (OAP)',
        subject: 'Sémiologie',
        content: `1. Signes fonctionnels majeurs :
- Dyspnée brutale d'apparition nocturne, polypnée superficielle, orthopnée majeure obligeant le patient à s'asseoir.
- Toux avec expectorations rosées, saumonées et mousseuses.

2. Signes physiques :
- Auscultation pulmonaire : Râles crépitants bilatéraux débutant aux bases et montant "en marée montante".
- Auscultation cardiaque : Galop protodiastolique B3, tachycardie, turgescence jugulaire si décompensation globale.

3. Prise en charge d'urgence :
- Position assise jambes pendantes, oxygénothérapie ciblée, diurétique de l'anse (Furosémide IV), dérivés nitrés si PAS > 110 mmHg.`,
        createdAt: '26 oct. 2026',
        updatedAt: '26 oct. 2026',
        isExample: true,
      },
    ],
    flashcards: [
      {
        id: 'fc-med-1',
        question: 'Pourquoi la paroi du ventricule gauche est-elle nettement plus épaisse que celle du ventricule droit ?',
        answer: 'Le ventricule gauche doit vaincre les fortes résistances périphériques de la circulation systémique (haute pression ~120 mmHg), tandis que le ventricule droit alimente la circulation pulmonaire à basse pression (~25 mmHg).',
        subject: 'Anatomie descriptive',
        nextReviewDate: '2026-10-28',
        intervalDays: 2,
        masteryLevel: 'moyen',
        reviewCount: 1,
        facultyId: 'medecine_sante',
        isExample: true,
      },
      {
        id: 'fc-med-2',
        question: 'À quoi correspondent physiologiquement les deux bruits normaux du cœur (B1 et B2) à l\'auscultation ?',
        answer: 'B1 (fermé) : Fermeture des valves atrio-ventriculaires (mitrale et tricuspide) au début de la systole.\nB2 (sec) : Fermeture des valves sigmoïdes (aortique et pulmonaire) à la fin de la systole (début de diastole).',
        subject: 'Sémiologie',
        nextReviewDate: '2026-10-27',
        intervalDays: 1,
        masteryLevel: 'nouveau',
        reviewCount: 0,
        facultyId: 'medecine_sante',
        isExample: true,
      },
    ],
    quizQuestions: [
      {
        id: 'q-med-1',
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
        id: 'q-med-2',
        statement: 'Lors d\'une auscultation pulmonaire, quel bruit est caractéristique d\'une infiltration liquidienne alvéolaire dans l\'OAP ?',
        options: [
          'Un sifflement expiratoire sibilant',
          'Des râles crépitants fins en fin d\'inspiration',
          'Un frottement pleural rude',
          'Un silence auscultatoire pur'
        ],
        correctIndex: 1,
        explanation: 'Les râles crépitants sont générés par l\'ouverture brusque des petites voies aériennes et alvéoles collabées par le liquide d\'inondation séro-hématique de l\'OAP.',
        subject: 'Sémiologie',
        facultyId: 'medecine_sante',
        isExample: true,
      },
    ],
    examPlan: {
      id: 'plan-med-1',
      examName: 'Session PASS / EDN - UE Cardiorespiratoire',
      subject: 'Anatomie descriptive',
      examDate: '2026-12-16',
      chapters: 'Module 1 : Anatomie cardiaque & gros vaisseaux\nModule 2 : Physiologie de la contraction myocardique\nModule 3 : Régulation baroréflexe et rénale de la PA\nModule 4 : Sémiologie des cardiopathies et ECG de base',
      dailyMinutes: 120,
      personalGoal: 'Maîtriser les schémas d\'anatomie sans hésitation et obtenir plus de 16/20 au QCM.',
      createdAt: '24 oct. 2026',
    },
    tasks: [
      {
        id: 'task-med-1',
        examPlanId: 'plan-med-1',
        title: 'Dessin annoté : Vue antérieure des cavités cardiaques et coronaires',
        subject: 'Anatomie descriptive',
        dueDate: '2026-10-25',
        durationMinutes: 45,
        completed: false,
      },
      {
        id: 'task-med-2',
        examPlanId: 'plan-med-1',
        title: 'Auto-test Flashcards : Bruits du cœur et murmures auscultatoires',
        subject: 'Sémiologie',
        dueDate: '2026-10-27',
        durationMinutes: 30,
        completed: true,
        completedAt: '2026-10-27 09:30',
      },
    ],
  },

  informatique: {
    facultyId: 'informatique',
    courses: [
      {
        id: 'cours-info-1',
        code: 'INF201',
        title: 'Algorithmique & Structures de Données Avancées',
        subject: 'Algorithmique & Structures de données',
        facultyId: 'informatique',
        facultyName: 'Informatique et technologies',
        semester: 'Semestre 3',
        ects: 6,
        chapterCount: 5,
        completedChapters: 3,
        color: '#059669',
        description: 'Complexité asymptotique, arbres binaires de recherche (ABR), arbres auto-équilibrés AVL, graphes (BFS/DFS, Dijkstra) et programmation dynamique.',
        createdAt: '24 oct. 2026',
        createdAtTimestamp: Date.now() - 3 * 86400000,
        hasPdf: true,
        pdfFileName: 'algorithmique_cours_complet.pdf',
        pdfFileSize: 2450000,
        lastRevised: 'Hier à 16:30',
      },
      {
        id: 'cours-info-2',
        code: 'INF202',
        title: 'Bases de Données Relationnelles & Modélisation SQL/NoSQL',
        subject: 'Bases de données relationnelles',
        facultyId: 'informatique',
        facultyName: 'Informatique et technologies',
        semester: 'Semestre 2',
        ects: 5,
        chapterCount: 4,
        completedChapters: 2,
        color: '#0284c7',
        description: 'Modèle entité-association, formes normales (1NF, 2NF, 3NF, BCNF), algèbre relationnelle, requêtes SQL complexes et transactions ACID.',
        createdAt: '22 oct. 2026',
        createdAtTimestamp: Date.now() - 5 * 86400000,
        hasPdf: true,
        pdfFileName: 'bases_de_donnees_sql_avance.pdf',
        pdfFileSize: 1980000,
        lastRevised: 'Il y a 3 jours',
      },
      {
        id: 'cours-info-3',
        code: 'INF301',
        title: 'Architecture des Systèmes d\'Exploitation & Réseaux IP',
        subject: 'Réseaux & Systèmes',
        facultyId: 'informatique',
        facultyName: 'Informatique et technologies',
        semester: 'Semestre 4',
        ects: 5,
        chapterCount: 4,
        completedChapters: 2,
        color: '#4f46e5',
        description: 'Processus et threads, ordonnancement CPU, sémaphores et mutex, mémoire virtuelle, pile OSI et pile TCP/IP, routage et sockets.',
        createdAt: '25 oct. 2026',
        createdAtTimestamp: Date.now() - 2 * 86400000,
        hasPdf: true,
        pdfFileName: 'systemes_exploitation_reseaux.pdf',
        pdfFileSize: 2650000,
        lastRevised: 'Hier à 10:15',
      },
    ],
    sheets: [
      {
        id: 'fiche-info-1',
        title: 'Fiche méthode : Analyse de la complexité temporelle (Grand O)',
        subject: 'Algorithmique & Structures de données',
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
        id: 'fiche-info-2',
        title: 'Fiche synthèse : Formes Normales (1NF, 2NF, 3NF, BCNF) et Dépendances Fonctionnelles',
        subject: 'Bases de données relationnelles',
        content: `1. Première Forme Normale (1NF) :
- Tous les attributs sont atomiques (pas de liste, pas de tableau, pas d'ensemble de valeurs dans un champ).
- Présence d'une clé primaire identifiant chaque tuple de façon unique.

2. Deuxième Forme Normale (2NF) :
- Est en 1NF + tout attribut non-clé dépend pleinement et entièrement de la totalité de la clé primaire (pas de dépendance partielle sur une fraction de clé composée).

3. Troisième Forme Normale (3NF) :
- Est en 2NF + aucun attribut non-clé ne dépend d'un autre attribut non-clé par transitivité (X -> Y et Y -> Z éliminé).

4. Propriétés ACID des transactions :
- Atomicité (tout ou rien), Cohérence (respect des contraintes), Isolation (pas d'interférence entre transactions concurrentes), Durabilité (persistance sur disque).`,
        createdAt: '25 oct. 2026',
        updatedAt: '25 oct. 2026',
        isExample: true,
      },
    ],
    flashcards: [
      {
        id: 'fc-info-1',
        question: 'Quelle est la complexité temporelle moyenne et au pire cas de la recherche dans un Arbre Binaire de Recherche (ABR) ?',
        answer: 'Moyenne : O(log n) si l\'arbre est bien équilibré.\nPire des cas : O(n) si l\'arbre est dégénéré (liste chaînée unilatérale).\nC\'est pourquoi on utilise des arbres auto-équilibrés (AVL, Rouge-Noir).',
        subject: 'Algorithmique & Structures de données',
        nextReviewDate: '2026-10-27',
        intervalDays: 1,
        masteryLevel: 'nouveau',
        reviewCount: 0,
        facultyId: 'informatique',
        isExample: true,
      },
      {
        id: 'fc-info-2',
        question: 'Quelle est la différence fondamentale entre un processus et un thread en système d\'exploitation ?',
        answer: 'Un processus possède son propre espace d\'adressage mémoire virtuel isolé et ses propres descripteurs de fichiers.\nUn thread est un flux d\'exécution au sein d\'un processus qui partage le même espace d\'adressage et le même segment de données que les autres threads du même processus.',
        subject: 'Réseaux & Systèmes',
        nextReviewDate: '2026-10-28',
        intervalDays: 2,
        masteryLevel: 'moyen',
        reviewCount: 1,
        facultyId: 'informatique',
        isExample: true,
      },
    ],
    quizQuestions: [
      {
        id: 'q-info-1',
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
        id: 'q-info-2',
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
    ],
    examPlan: {
      id: 'plan-info-1',
      examName: 'Session d\'Examens - Semestre 1 Informatique',
      subject: 'Algorithmique & Structures de données',
      examDate: '2026-12-15',
      chapters: 'Chapitre 1 : Complexité asymptotique\nChapitre 2 : Arbres Binaires de Recherche\nChapitre 3 : Arbres AVL et équilibrage\nChapitre 4 : Graphes BFS et DFS\nChapitre 5 : Programmation dynamique',
      dailyMinutes: 90,
      personalGoal: 'Valider l\'UE avec une note supérieure ou égale à 14/20 pour sécuriser la mention.',
      createdAt: '24 oct. 2026',
    },
    tasks: [
      {
        id: 'task-info-1',
        examPlanId: 'plan-info-1',
        title: 'Fiche de synthèse : Arbres AVL & Rotations GG/DD',
        subject: 'Algorithmique & Structures de données',
        dueDate: '2026-10-25',
        durationMinutes: 45,
        completed: false,
      },
      {
        id: 'task-info-2',
        examPlanId: 'plan-info-1',
        title: 'Série de 10 flashcards sur les parcours d\'ABR',
        subject: 'Algorithmique & Structures de données',
        dueDate: '2026-10-27',
        durationMinutes: 25,
        completed: true,
        completedAt: '2026-10-27 10:30',
      },
    ],
  },
};

// Fallback pack generator for any other faculty
export function getFacultyPack(facultyId: FacultyId | string): FacultyDataPack {
  if (FACULTY_DATA_PACKS[facultyId]) {
    return FACULTY_DATA_PACKS[facultyId];
  }

  const config = getFacultyTabConfig(facultyId);
  const now = new Date();
  const dateStr = now.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

  return {
    facultyId: config.facultyId,
    courses: [
      {
        id: `cours-${config.facultyId}-1`,
        code: `${config.facultyId.substring(0, 3).toUpperCase()}101`,
        title: `Fondements de ${config.facultyBadge}`,
        subject: config.facultyBadge,
        facultyId: config.facultyId,
        facultyName: config.facultyBadge,
        semester: 'Semestre 1',
        ects: 6,
        chapterCount: 4,
        completedChapters: 2,
        color: config.themeColor,
        description: `Cours fondamental dédié à la maîtrise des concepts méthodologiques et théoriques majeurs de ${config.facultyBadge}.`,
        createdAt: dateStr,
        createdAtTimestamp: Date.now() - 86400000,
        hasPdf: false,
        lastRevised: 'Cette semaine',
      },
    ],
    sheets: [
      {
        id: `fiche-${config.facultyId}-1`,
        title: `Fiche méthode essentielle : ${config.specializedToolLabel}`,
        subject: config.facultyBadge,
        content: `1. Présentation de la méthodologie :
${config.specializedToolDescription}

2. Recommandations universitaires pour les examens :
- Définir rigoureusement le vocabulaire technique propre à la discipline.
- Structurer l'argumentation en parties équilibrées avec transitions claires.
- Éviter les affirmations sans référence bibliographique ou sans justification empirique.`,
        createdAt: dateStr,
        updatedAt: dateStr,
        isExample: true,
      },
    ],
    flashcards: [
      {
        id: `fc-${config.facultyId}-1`,
        question: `Quel est le principe central de : ${config.specializedToolLabel} ?`,
        answer: config.specializedToolDescription,
        subject: config.facultyBadge,
        nextReviewDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        intervalDays: 1,
        masteryLevel: 'nouveau',
        reviewCount: 0,
        facultyId: config.facultyId,
        isExample: true,
      },
    ],
    quizQuestions: [
      {
        id: `q-${config.facultyId}-1`,
        statement: `Dans le domaine de ${config.facultyBadge}, que garantit l'application de : "${config.specializedToolLabel}" ?`,
        options: [
          'La conformité méthodologique et la rigueur d\'analyse',
          'L\'inutilité de citer des sources universitaires',
          'Une dispense totale d\'examens partiels',
          'L\'absence de travail régulier'
        ],
        correctIndex: 0,
        explanation: `L\'application rigoureuse de cette démarche garantit la solidité académique et la validation des compétences universitaires dans ce domaine.`,
        subject: config.facultyBadge,
        facultyId: config.facultyId,
        isExample: true,
      },
    ],
    examPlan: {
      id: `plan-${config.facultyId}-1`,
      examName: `Session d\'Examens - ${config.facultyBadge}`,
      subject: config.facultyBadge,
      examDate: '2026-12-20',
      chapters: 'Module 1 : Notions fondamentales\nModule 2 : Méthodologie et cas pratiques\nModule 3 : Synthèse et annales',
      dailyMinutes: 60,
      personalGoal: config.tabs.programme.examGoalPlaceholder,
      createdAt: dateStr,
    },
    tasks: [
      {
        id: `task-${config.facultyId}-1`,
        examPlanId: `plan-${config.facultyId}-1`,
        title: `Fiche de synthèse : ${config.specializedToolLabel}`,
        subject: config.facultyBadge,
        dueDate: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
        durationMinutes: 45,
        completed: false,
      },
    ],
  };
}
