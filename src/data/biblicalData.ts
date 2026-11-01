/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  BibleBook, 
  BibleProphecy, 
  WisdomVerse, 
  BibleStudyGuideMethod, 
  BibleDailyReadingPlan, 
  BibleContradiction 
} from '../types';

/**
 * 1. BIBLE INSTALLÉE POUR RÉVISER (HORS-LIGNE)
 * Sélection de livres et chapitres d'étude majeurs de l'Ancien et du Nouveau Testament.
 */
export const BIBLE_BOOKS: BibleBook[] = [
  {
    id: 'genese',
    name: 'Genèse',
    testament: 'Ancien',
    category: 'Pentateuque',
    chaptersCount: 50,
    description: 'Le livre des commencements : la création, la chute, l\'alliance avec Abraham et les patriarches.',
    chapters: {
      1: [
        { chapter: 1, verse: 1, text: "Au commencement, Dieu créa les cieux et la terre." },
        { chapter: 1, verse: 2, text: "La terre était informe et vide; il y avait des ténèbres à la surface de l'abîme, et l'esprit de Dieu se mouvait au-dessus des eaux." },
        { chapter: 1, verse: 3, text: "Dieu dit: Que la lumière soit! Et la lumière fut." },
        { chapter: 1, verse: 4, text: "Dieu vit que la lumière était bonne; et Dieu sépara la lumière d'avec les ténèbres." },
        { chapter: 1, verse: 26, text: "Puis Dieu dit: Faisons l'homme à notre image, selon notre ressemblance, et qu'il domine sur les poissons de la mer, sur les oiseaux du ciel, sur le bétail, sur toute la terre, et sur tous les reptiles qui rampent sur la terre." },
        { chapter: 1, verse: 27, text: "Dieu créa l'homme à son image, il le créa à l'image de Dieu, il créa l'homme et la femme." },
        { chapter: 1, verse: 31, text: "Dieu vit tout ce qu'il avait fait et voici, cela était très bon. Ainsi, il y eut un soir, et il y eut un matin: ce fut le sixième jour." },
      ],
      2: [
        { chapter: 2, verse: 1, text: "Ainsi furent achevés les cieux et la terre, et toute leur armée." },
        { chapter: 2, verse: 2, text: "Dieu acheva au septième jour son oeuvre, qu'il avait faite: et il se reposa au septième jour de toute son oeuvre, qu'il avait faite." },
        { chapter: 2, verse: 7, text: "L'Éternel Dieu forma l'homme de la poussière de la terre, il souffla dans ses narines un souffle de vie et l'homme devint un être vivant." },
        { chapter: 2, verse: 15, text: "L'Éternel Dieu prit l'homme, et le plaça dans le jardin d'Éden pour le cultiver et pour le garder." },
      ],
      12: [
        { chapter: 12, verse: 1, text: "L'Éternel dit à Abram: Va-t-en de ton pays, de ta patrie, et de la maison de ton père, dans le pays que je te montrerai." },
        { chapter: 12, verse: 2, text: "Je ferai de toi une grande nation, et je te bénirai; je rendrai ton nom grand, et tu seras une source de bénédiction." },
        { chapter: 12, verse: 3, text: "Je bénirai ceux qui te béniront, et je maudirai ceux qui te maudiront; et toutes les familles de la terre seront bénies en toi." },
      ],
    },
  },
  {
    id: 'psaumes',
    name: 'Psaumes',
    testament: 'Ancien',
    category: 'Poétique & Sagesse',
    chaptersCount: 150,
    description: 'Recueil de prières, louanges, supplications et réflexions de foi au cœur des épreuves.',
    chapters: {
      1: [
        { chapter: 1, verse: 1, text: "Heureux l'homme qui ne marche pas selon le conseil des méchants, qui ne s'arrête pas sur la voie des pécheurs, et qui ne s'assied pas en compagnie des moqueurs," },
        { chapter: 1, verse: 2, text: "Mais qui trouve son plaisir dans la loi de l'Éternel, et qui la médite jour et nuit!" },
        { chapter: 1, verse: 3, text: "Il est comme un arbre planté près d'un courant d'eau, qui donne son fruit en sa saison, et dont le feuillage ne se flétrit point: tout ce qu'il fait lui réussit." },
      ],
      23: [
        { chapter: 23, verse: 1, text: "L'Éternel est mon berger: je ne manquerai de rien." },
        { chapter: 23, verse: 2, text: "Il me fait reposer dans de verts pâturages, il me dirige près des eaux paisibles." },
        { chapter: 23, verse: 3, text: "Il restaure mon âme, il me conduit dans les sentiers de la justice, à cause de son nom." },
        { chapter: 23, verse: 4, text: "Quand je marche dans la vallée de l'ombre de la mort, je ne crains aucun mal, car tu es avec moi: ta houlette et ton bâton me rassurent." },
        { chapter: 23, verse: 5, text: "Tu dresses devant moi une table, en face de mes adversaires; tu oins d'huile ma tête, et ma coupe déborde." },
        { chapter: 23, verse: 6, text: "Oui, le bonheur et la grâce m'accompagneront tous les jours de ma vie, et j'habiterai dans la maison de l'Éternel jusqu'à la fin de mes jours." },
      ],
      91: [
        { chapter: 91, verse: 1, text: "Celui qui demeure sous l'abri du Très-Haut repose à l'ombre du Tout Puissant." },
        { chapter: 91, verse: 2, text: "Je dis à l'Éternel: Mon refuge et ma forteresse, mon Dieu en qui je me confie!" },
        { chapter: 91, verse: 11, text: "Car il ordonnera à ses anges de te garder dans toutes tes voies;" },
        { chapter: 91, verse: 12, text: "Ils te porteront sur les mains, de peur que ton pied ne heurte contre une pierre." },
      ],
      119: [
        { chapter: 119, verse: 9, text: "Comment le jeune homme rendra-t-il pur son sentier? En se dirigeant d'après ta parole." },
        { chapter: 119, verse: 11, text: "Je serre ta parole dans mon coeur, afin de ne pas pécher contre toi." },
        { chapter: 119, verse: 105, text: "Ta parole est une lampe à mes pieds, et une lumière sur mon sentier." },
        { chapter: 119, verse: 130, text: "La révélation de tes paroles éclaire, elle donne de l'intelligence aux simples." },
      ],
    },
  },
  {
    id: 'proverbes',
    name: 'Proverbes',
    testament: 'Ancien',
    category: 'Poétique & Sagesse',
    chaptersCount: 31,
    description: 'Principes pratiques de sagesse, de discernement moral, de diligence au travail et de conduite personnelle.',
    chapters: {
      1: [
        { chapter: 1, verse: 7, text: "La crainte de l'Éternel est le commencement de la science; les insensés méprisent la sagesse et l'instruction." },
        { chapter: 1, verse: 8, text: "Écoute, mon fils, l'instruction de ton père, et ne rejette pas l'enseignement de ta mère." },
      ],
      3: [
        { chapter: 3, verse: 5, text: "Confie-toi en l'Éternel de tout ton coeur, et ne t'appuie pas sur ta sagesse;" },
        { chapter: 3, verse: 6, text: "Reconnais-le dans toutes tes voies, et il aplanira tes sentiers." },
        { chapter: 3, verse: 13, text: "Heureux l'homme qui a trouvé la sagesse, et l'homme qui possède l'intelligence!" },
        { chapter: 3, verse: 14, text: "Car le gain qu'elle procure est préférable à celui de l'argent, et le profit qu'on en tire vaut mieux que l'or pur." },
      ],
      4: [
        { chapter: 4, verse: 7, text: "Voici le commencement de la sagesse: Acquiers la sagesse, et avec tout ce que tu possèdes acquiers l'intelligence." },
        { chapter: 4, verse: 23, text: "Garde ton coeur plus que toute autre chose, car de lui viennent les sources de la vie." },
      ],
      16: [
        { chapter: 16, verse: 3, text: "Recommande à l'Éternel tes oeuvres, et tes projets réussiront." },
        { chapter: 16, verse: 16, text: "Combien acquérir la sagesse vaut mieux que l'or! Combien acquérir l'intelligence est préférable à l'argent!" },
        { chapter: 16, verse: 32, text: "Celui qui est lent à la colère vaut mieux qu'un héros, et celui qui est maître de lui-même, que celui qui prend des villes." },
      ],
    },
  },
  {
    id: 'esaie',
    name: 'Ésaïe',
    testament: 'Ancien',
    category: 'Prophètes',
    chaptersCount: 66,
    description: 'Le prince des prophètes : prophéties messianiques majeures, justice de Dieu et espérance de salut.',
    chapters: {
      7: [
        { chapter: 7, verse: 14, text: "C'est pourquoi le Seigneur lui-même vous donnera un signe, voici, la jeune fille [la vierge] deviendra enceinte, elle enfantera un fils, et elle lui donnera le nom d'Emmanuel." },
      ],
      9: [
        { chapter: 9, verse: 5, text: "Car un enfant nous est né, un fils nous est donné, et la domination reposera sur son épaule; on l'appellera Admirable, Conseiller, Dieu puissant, Père éternel, Prince de la paix." },
      ],
      40: [
        { chapter: 40, verse: 29, text: "Il donne de la force à celui qui est fatigué, et il augmente la vigueur de celui qui tombe en défaillance." },
        { chapter: 40, verse: 31, text: "Mais ceux qui se confient en l'Éternel renouvellent leur force. Ils prennent le vol comme les aigles; ils courent, et ne se lassent point, ils marchent, et ne se fatiguent point." },
      ],
      53: [
        { chapter: 53, verse: 3, text: "Méprisé et abandonné des hommes, homme de douleur et habitué à la souffrance, semblable à celui dont on détourne le visage, nous l'avons dédaigné, nous n'avons fait de lui aucun cas." },
        { chapter: 53, verse: 4, text: "Cependant, ce sont nos souffrances qu'il a portées, c'est de nos douleurs qu'il s'est chargé; et nous l'avons considéré comme puni, frappé de Dieu, et humilié." },
        { chapter: 53, verse: 5, text: "Mais il était blessé pour nos péchés, brisé pour nos iniquités; le châtiment qui nous donne la paix est tombé sur lui, et c'est par ses meurtrissures que nous sommes guéris." },
        { chapter: 53, verse: 6, text: "Nous étions tous errants comme des brebis, chacun suivait sa propre voie; et l'Éternel a fait retomber sur lui l'iniquité de nous tous." },
      ],
    },
  },
  {
    id: 'matthieu',
    name: 'Matthieu',
    testament: 'Nouveau',
    category: 'Évangiles',
    chaptersCount: 28,
    description: 'L\'Évangile du Roi-Messie qui accomplit les Écritures de l\'Ancien Testament.',
    chapters: {
      5: [
        { chapter: 5, verse: 3, text: "Heureux les pauvres en esprit, car le royaume des cieux est à eux!" },
        { chapter: 5, verse: 14, text: "Vous êtes la lumière du monde. Une ville située sur une montagne ne peut être cachée;" },
        { chapter: 5, verse: 16, text: "Que votre lumière luise ainsi devant les hommes, afin qu'ils voient vos bonnes oeuvres, et qu'ils glorifient votre Père qui est dans les cieux." },
        { chapter: 5, verse: 17, text: "Ne croyez pas que je sois venu pour abolir la loi ou les prophètes; je suis venu non pour abolir, mais pour accomplir." },
      ],
      6: [
        { chapter: 6, verse: 9, text: "Voici donc comment vous devez prier: Notre Père qui es aux cieux! Que ton nom soit sanctifié;" },
        { chapter: 6, verse: 10, text: "Que ton règne vienne; que ta volonté soit faite sur la terre comme au ciel." },
        { chapter: 6, verse: 11, text: "Donne-nous aujourd'hui notre pain quotidien;" },
        { chapter: 6, verse: 12, text: "Pardonne-nous nos offenses, comme nous aussi nous pardonnons à ceux qui nous ont offensés;" },
        { chapter: 6, verse: 33, text: "Cherchez premièrement le royaume et la justice de Dieu; et toutes ces choses vous seront données par-dessus." },
        { chapter: 6, verse: 34, text: "Ne vous inquiétez donc pas du lendemain; car le lendemain aura soin de lui-même. A chaque jour suffit sa peine." },
      ],
      28: [
        { chapter: 28, verse: 18, text: "Jésus, s'étant approché, leur parla ainsi: Tout pouvoir m'a été donné dans le ciel et sur la terre." },
        { chapter: 28, verse: 19, text: "Allez, faites de toutes les nations des disciples, les baptisant au nom du Père, du Fils et du Saint Esprit," },
        { chapter: 28, verse: 20, text: "Et enseignez-leur à observer tout ce que je vous ai prescrit. Et voici, je suis avec vous tous les jours, jusqu'à la fin du monde." },
      ],
    },
  },
  {
    id: 'jean',
    name: 'Jean',
    testament: 'Nouveau',
    category: 'Évangiles',
    chaptersCount: 21,
    description: 'L\'Évangile théologique : la Parole faite chair, les signes miraculeux et la vie éternelle.',
    chapters: {
      1: [
        { chapter: 1, verse: 1, text: "Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était Dieu." },
        { chapter: 1, verse: 2, text: "Elle était au commencement avec Dieu." },
        { chapter: 1, verse: 3, text: "Toutes choses ont été faites par elle, et rien de ce qui a été fait n'a été fait sans elle." },
        { chapter: 1, verse: 14, text: "Et la parole a été faite chair, et elle a habité parmi nous, pleine de grâce et de vérité; et nous avons contemplé sa gloire, une gloire comme la gloire du Fils unique venu du Père." },
      ],
      3: [
        { chapter: 3, verse: 16, text: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle." },
        { chapter: 3, verse: 17, text: "Dieu, en effet, n'a pas envoyé son Fils dans le monde pour qu'il juge le monde, mais pour que le monde soit sauvé par lui." },
      ],
      14: [
        { chapter: 14, verse: 6, text: "Jésus lui dit: Je suis le chemin, la vérité, et la vie. Nul ne vient au Père que par moi." },
        { chapter: 14, verse: 27, text: "Je vous laisse la paix, je vous donne ma paix. Je ne vous donne pas comme le monde donne. Que votre coeur ne se trouble point, et ne s'alarme point." },
      ],
    },
  },
  {
    id: 'romains',
    name: 'Romains',
    testament: 'Nouveau',
    category: 'Épîtres & Actes',
    chaptersCount: 16,
    description: 'Le chef-d\'œuvre doctrinal de Paul : la justification par la foi, la grâce et la sanctification.',
    chapters: {
      8: [
        { chapter: 8, verse: 1, text: "Il n'y a donc maintenant aucune condamnation pour ceux qui sont en Jésus Christ." },
        { chapter: 8, verse: 28, text: "Nous savons, du reste, que toutes choses concourent au bien de ceux qui aiment Dieu, de ceux qui sont appelés selon son dessein." },
        { chapter: 8, verse: 31, text: "Que dirons-nous donc à l'égard de ces choses? Si Dieu est pour nous, qui sera contre nous?" },
        { chapter: 8, verse: 38, text: "Car j'ai l'assurance que ni la mort ni la vie, ni les anges ni les dominations, ni les choses présentes ni les choses à venir, ni les puissances," },
        { chapter: 8, verse: 39, text: "Ni la hauteur, ni la profondeur, ni aucune autre créature ne pourra nous séparer de l'amour de Dieu manifesté en Jésus Christ notre Seigneur." },
      ],
      12: [
        { chapter: 12, verse: 1, text: "Je vous exhorte donc, frères, par les compassions de Dieu, à offrir vos corps comme un sacrifice vivant, saint, agréable à Dieu, ce qui sera de votre part un culte raisonnable." },
        { chapter: 12, verse: 2, text: "Ne vous conformez pas au siècle présent, mais soyez transformés par le renouvellement de l'intelligence, afin que vous discerniez quelle est la volonté de Dieu, ce qui est bon, agréable et parfait." },
      ],
    },
  },
  {
    id: 'jacques',
    name: 'Jacques',
    testament: 'Nouveau',
    category: 'Épîtres & Actes',
    chaptersCount: 5,
    description: 'L\'épître de la foi active : sagesse pratique, épreuves, maîtrise de la langue et charité vivante.',
    chapters: {
      1: [
        { chapter: 1, verse: 5, text: "Si quelqu'un d'entre vous manque de sagesse, qu'il la demande à Dieu, qui donne à tous simplement et sans reproche, et elle lui sera donnée." },
        { chapter: 1, verse: 19, text: "Sachez-le, mes frères bien-aimés. Ainsi, que tout homme soit prompt à écouter, lent à parler, lent à se mettre en colère;" },
        { chapter: 1, verse: 22, text: "Mettez en pratique la parole, et ne vous bornez pas à l'écouter, en vous trompant vous-mêmes par de faux raisonnements." },
      ],
    },
  },
];

/**
 * 2. LES PROPHÉTIES DE L'ANCIEN TESTAMENT ACCOMPLIES AU NOUVEAU TESTAMENT
 * Tableau rigoureux et didactique pour l'étude exégétique comparative.
 */
export const BIBLE_PROPHECIES: BibleProphecy[] = [
  {
    id: 'p1',
    title: 'Né d\'une vierge',
    category: 'Naissance & Origine',
    otReference: 'Ésaïe 7:14 (vers 735 av. J.-C.)',
    otText: '« C\'est pourquoi le Seigneur lui-même vous donnera un signe, voici, la vierge [almah] deviendra enceinte, elle enfantera un fils, et elle lui donnera le nom d\'Emmanuel. »',
    otContext: 'Donné au roi Achaz sous la menace syro-éphraïmite comme sceau de la fidélité divine envers la maison de David.',
    ntReference: 'Matthieu 1:22-23 & Luc 1:34-35',
    ntText: '« Tout cela arriva afin que s\'accomplît ce que le Seigneur avait annoncé par le prophète: Voici, la vierge sera enceinte, elle enfantera un fils, et on lui donnera le nom d\'Emmanuel... »',
    fulfillmentExplanation: 'Accomplissement littéral lors de l\'Incarnation par le Saint-Esprit sans intervention d\'un père biologique humain.',
  },
  {
    id: 'p2',
    title: 'Lieu de naissance : Bethléhem de Juda',
    category: 'Naissance & Origine',
    otReference: 'Michée 5:2 (vers 700 av. J.-C.)',
    otText: '« Et toi, Bethléhem Éphrata, petite entre les milliers de Juda, de toi sortira pour moi celui qui dominera sur Israël, et dont l\'origine remonte aux temps anciens, aux jours de l\'éternité. »',
    otContext: 'Michée annonce qu\'un souverain éternel sortira non de la capitale Jérusalem, mais du modeste village ancestral de David.',
    ntReference: 'Matthieu 2:1 & Luc 2:4-7',
    ntText: '« Jésus étant né à Bethléhem en Judée, aux jours du roi Hérode... Car ainsi a été écrit par le prophète: Et toi, Bethléhem, terre de Juda... »',
    fulfillmentExplanation: 'Le décret de recensement romain de César Auguste a providentiellement amené Joseph et Marie de Nazareth à Bethléhem pour l\'enfantement.',
  },
  {
    id: 'p3',
    title: 'Descendant de la lignée d\'Abraham, Isaac, Jacob et David',
    category: 'Naissance & Origine',
    otReference: 'Genèse 12:3 ; 2 Samuel 7:12-13 ; Psaume 132:11',
    otText: '« Toutes les familles de la terre seront bénies en toi. » / « J\'élèverai ta postérité après toi... et j\'affermirai pour toujours le trône de son royaume. »',
    otContext: 'L\'Alliance davidique promise par le prophète Nathan assure un règne dynastique impérissable.',
    ntReference: 'Matthieu 1:1 ; Luc 1:32-33 ; Romains 1:3',
    ntText: '« Généalogie de Jésus Christ, fils de David, fils d\'Abraham. » / « Le Seigneur Dieu lui donnera le trône de David, son père; il régnera sur la maison de Jacob éternellement. »',
    fulfillmentExplanation: 'Jésus s\'inscrit légalement (par Joseph) et biologiquement (par Marie) dans la lignée royale davidique.',
  },
  {
    id: 'p4',
    title: 'Précédé par un précurseur (Jean-Baptiste)',
    category: 'Ministère & Miracles',
    otReference: 'Ésaïe 40:3 & Malachie 3:1',
    otText: '« Une voix crie: Préparez au désert le chemin de l\'Éternel, aplanissez dans les lieux stériles une route pour notre Dieu. »',
    otContext: 'Annonce du messager qui prépare les cœurs avant la manifestation de la gloire divine.',
    ntReference: 'Matthieu 3:1-3 ; Marc 1:2-4 ; Jean 1:23',
    ntText: '« En ce temps-là parut Jean Baptiste, prêchant dans le désert de Judée... C\'est ici celui qui avait été annoncé par Ésaïe le prophète. »',
    fulfillmentExplanation: 'Le ministère d\'appel à la repentance de Jean-Baptiste au désert du Jourdain a inauguré le ministère public du Messie.',
  },
  {
    id: 'p5',
    title: 'Entrée triomphale sur le poulain d\'une ânesse',
    category: 'Ministère & Miracles',
    otReference: 'Zacharie 9:9 (vers 520 av. J.-C.)',
    otText: '« Sois transportée d\'allégresse, fille de Sion! Pousse des cris de joie, fille de Jérusalem! Voici, ton roi vient à toi; il est juste et victorieux, il est humble et monté sur un âne, sur un âne, le petit d\'une ânesse. »',
    otContext: 'Le Roi messianique ne vient pas sur un char de guerre orgueilleux, mais avec humilité et paix.',
    ntReference: 'Matthieu 21:4-9 & Jean 12:14-15',
    ntText: '« Or, ceci arriva afin que s\'accomplît ce qui avait été annoncé par le prophète: Dites à la fille de Sion: Voici, ton roi vient à toi, plein de douceur... »',
    fulfillmentExplanation: 'Entrée acclamée par la foule le dimanche des Rameaux, accomplissant précisément le symbole pacifique annoncé par Zacharie.',
  },
  {
    id: 'p6',
    title: 'Trahi par un ami intime pour trente pièces d\'argent',
    category: 'Trahison & Passion',
    otReference: 'Psaume 41:9 & Zacharie 11:12-13',
    otText: '« Celui-là même avec qui j\'étais en paix, qui avait ma confiance et qui mangeait mon pain, lève le talon contre moi. » / « Ils pesèrent pour mon salaire trente pièces d\'argent... Jette-le au potier. »',
    otContext: 'Le berger méprisé dont le travail est évalué au prix légal de dédommagement d\'un esclave (Exode 21:32).',
    ntReference: 'Matthieu 26:14-15 ; Matthieu 27:3-7 ; Jean 13:18',
    ntText: '« Que voulez-vous me donner, et je vous le livrerai? Et ils lui payèrent trente pièces d\'argent... Judas jeta l\'argent dans le temple et les chefs achetèrent le champ du potier. »',
    fulfillmentExplanation: 'Judas Iscariote partageait le plat avec Jésus avant de le livrer pour la somme exacte prophétisée, réinvestie dans le champ du potier.',
  },
  {
    id: 'p7',
    title: 'Silencieux et humble devant ses accusateurs',
    category: 'Trahison & Passion',
    otReference: 'Ésaïe 53:7',
    otText: '« Il a été maltraité et opprimé, et il n\'a point ouvert la bouche, semblable à un agneau qu\'on mène à la boucherie, à une brebis muette devant ceux qui la tondent; il n\'a point ouvert la bouche. »',
    otContext: 'Le Serviteur souffrant refuse l\'auto-défense violente pour se soumettre au plan de rachat.',
    ntReference: 'Matthieu 27:12-14 & 1 Pierre 2:23',
    ntText: '« Mais il ne répondit rien aux accusations des principaux sacrificateurs et des anciens... Il ne lui répondit sur aucune parole, ce qui étonna beaucoup le gouverneur. »',
    fulfillmentExplanation: 'Devant le Sanhédrin puis Ponce Pilate, Jésus n\'a usé d\'aucun stratagème rhétorique pour échapper à sa condamnation.',
  },
  {
    id: 'p8',
    title: 'Mains et pieds percés (Crucifixion)',
    category: 'Trahison & Passion',
    otReference: 'Psaume 22:16 & Zacharie 12:10',
    otText: '« Car des chiens m\'environnent, une bande de scélérats rôde autour de moi, ils ont percé mes mains et mes pieds. » / « Ils tourneront les regards vers moi, celui qu\'ils ont percé. »',
    otContext: 'David décrit un supplice terrifiant plusieurs siècles avant que les Perses et les Romains n\'inventent la crucifixion.',
    ntReference: 'Jean 19:18, 37 ; Jean 20:25-27 ; Luc 24:39',
    ntText: '« C\'est là qu\'ils le crucifièrent... Voyez mes mains et mes pieds, c\'est bien moi: touchez-moi et voyez. »',
    fulfillmentExplanation: 'Cloué au bois du Calvaire, les blessures aux mains et aux pieds sont constatées par Thomas et les disciples après la résurrection.',
  },
  {
    id: 'p9',
    title: 'Ses vêtements tirés au sort',
    category: 'Trahison & Passion',
    otReference: 'Psaume 22:18',
    otText: '« Ils se partagent mes vêtements, et ils tirent au sort ma tunique. »',
    otContext: 'Le psalmiste prophétise le dépouillement complet et l\'indifférence des bourreaux.',
    ntReference: 'Jean 19:23-24 & Matthieu 27:35',
    ntText: '« Les soldats... prirent ses vêtements, et ils en firent quatre parts... Restait la tunique sans couture: Tirons au sort à qui elle sera, afin que s\'accomplît l\'Écriture. »',
    fulfillmentExplanation: 'Les légionnaires romains au pied de la croix ont accompli le geste sans même connaître l\'existence des Écritures hébraïques.',
  },
  {
    id: 'p10',
    title: 'Aucun de ses os ne sera brisé',
    category: 'Trahison & Passion',
    otReference: 'Exode 12:46 ; Nombres 9:12 ; Psaume 34:20',
    otText: '« Vous ne briserez aucun de ses os (de l\'Agneau pascal). » / « Il garde tous ses os, aucun d\'eux n\'est brisé. »',
    otContext: 'Règle liturgique de la Pâque juive préfigurant l\'intégrité sacrificielle de l\'Agneau de Dieu.',
    ntReference: 'Jean 19:32-36',
    ntText: '« S\'étant approchés de Jésus, et le voyant déjà mort, ils ne lui rompirent pas les jambes... Ces choses sont arrivées afin que l\'Écriture fût accomplie: Aucun de ses os ne sera brisé. »',
    fulfillmentExplanation: 'Alors que les soldats brisaient les jambes (crurifragium) des deux larrons pour hâter leur asphyxie, Jésus était déjà mort.',
  },
  {
    id: 'p11',
    title: 'Enterré dans la tombe d\'un riche',
    category: 'Trahison & Passion',
    otReference: 'Ésaïe 53:9',
    otText: '« On a mis son sépulcre avec les méchants, son tombeau avec le riche, quoiqu\'il n\'eût point commis de violence et qu\'il n\'y eût point de fraude dans sa bouche. »',
    otContext: 'Alors que les condamnés romains étaient habituellement jetés à la fosse commune, le Serviteur reçoit une sépulture honorable.',
    ntReference: 'Matthieu 27:57-60',
    ntText: '« Le soir venu, arriva un homme riche d\'Arimathée, nommé Joseph... Il déposa le corps dans un sépulcre neuf, qu\'il s\'était fait tailler dans le roc. »',
    fulfillmentExplanation: 'Joseph d\'Arimathée, membre influent et riche du Sanhédrin, a réclamé le corps auprès de Pilate pour l\'ensevelir dans son propre tombeau.',
  },
  {
    id: 'p12',
    title: 'La Résurrection : Il ne verra pas la corruption du tombeau',
    category: 'Résurrection & Gloire',
    otReference: 'Psaume 16:10 & Osée 6:2',
    otText: '« Car tu n\'abandonneras pas mon âme au séjour des morts, tu ne permettras pas que ton bien-aimé voie la décomposition. »',
    otContext: 'David confesse une espérance qui dépasse sa propre mortalité physique.',
    ntReference: 'Actes 2:27-31 ; Actes 13:35-37 ; 1 Corinthiens 15:4',
    ntText: '« C\'est la résurrection du Christ qu\'il a prévue et annoncée, en disant qu\'il ne serait pas abandonné au séjour des morts et que sa chair ne verrait pas la corruption. »',
    fulfillmentExplanation: 'Ressuscité le troisième jour, le corps de Jésus n\'a subi aucune dégradation cadavérique dans le tombeau.',
  },
];

/**
 * 3. LES VERSETS DE SAGESSE DE LA BIBLE
 * Sélection classée par thématiques étudiantes (intelligence, travail, anxiété, humilité).
 */
export const BIBLE_WISDOM_VERSES: WisdomVerse[] = [
  {
    id: 'w1',
    theme: 'Sagesse & Intelligence',
    reference: 'Proverbes 2:6',
    text: '« Car l\'Éternel donne la sagesse; de sa bouche sortent la connaissance et l\'intelligence. »',
    practicalReflection: 'La vraie compréhension académique s\'enracine dans la clarté morale et la recherche humble de la vérité.',
  },
  {
    id: 'w2',
    theme: 'Sagesse & Intelligence',
    reference: 'Jacques 1:5',
    text: '« Si quelqu\'un d\'entre vous manque de sagesse, qu\'il la demande à Dieu, qui donne à tous simplement et sans reproche, et elle lui sera donnée. »',
    practicalReflection: 'Avant une séance d\'étude complexe ou face à des cours ardus, demande à Dieu la clarté d\'esprit.',
  },
  {
    id: 'w3',
    theme: 'Travail & Études',
    reference: 'Proverbes 14:23',
    text: '« Tout travail procure l\'abondance, mais les paroles en l\'air ne mènent qu\'à la disette. »',
    practicalReflection: 'Remplacer la procrastination et les discours par l\'effort régulier de révision produit des fruits durables.',
  },
  {
    id: 'w4',
    theme: 'Travail & Études',
    reference: 'Colossiens 3:23-24',
    text: '« Tout ce que vous faites, faites-le de bon coeur, comme pour le Seigneur et non pour des hommes... »',
    practicalReflection: 'Considère tes études, tes cours et tes examens comme un acte de consécration et d\'excellence personnelle.',
  },
  {
    id: 'w5',
    theme: 'Paix & Anxiété',
    reference: 'Philippiens 4:6-7',
    text: '« Ne vous inquiétez de rien; mais en toute chose faites connaître vos besoins à Dieu par des prières et des supplications, avec des actions de grâces. Et la paix de Dieu, qui surpasse toute intelligence, gardera vos coeurs et vos pensées en Jésus Christ. »',
    practicalReflection: 'Face au stress des examens ou au doute, décharge ton anxiété et concentre-toi sur tes révisions dans la paix.',
  },
  {
    id: 'w6',
    theme: 'Paix & Anxiété',
    reference: 'Matthieu 6:34',
    text: '« Ne vous inquiétez donc pas du lendemain; car le lendemain aura soin de lui-même. A chaque jour suffit sa peine. »',
    practicalReflection: 'Découpe tes objectifs d\'étude un jour à la fois : ne porte pas tout le semestre en une seule journée.',
  },
  {
    id: 'w7',
    theme: 'Patience & Maîtrise de soi',
    reference: 'Proverbes 16:32',
    text: '« Celui qui est lent à la colère vaut mieux qu\'un héros, et celui qui est maître de lui-même, que celui qui prend des villes. »',
    practicalReflection: 'La discipline quotidienne de travail surpasse les coups d\'éclat irréguliers.',
  },
  {
    id: 'w8',
    theme: 'Humilité & Vérité',
    reference: 'Proverbes 11:2',
    text: '« Quand vient l\'orgueil, vient aussi le mépris; mais la sagesse est avec les humbles. »',
    practicalReflection: 'Un bon étudiant biblique reconnaît les limites de ses connaissances et reste enseignable.',
  },
  {
    id: 'w9',
    theme: 'Persévérance',
    reference: 'Galates 6:9',
    text: '« Ne nous lassons pas de faire le bien; car nous moissonnerons au temps convenable, si nous ne nous relâchons pas. »',
    practicalReflection: 'Même quand les révisions semblent ingrates, la moisson intellectuelle et spirituelle viendra à point nommé.',
  },
];

/**
 * 4. GUIDE POUR APPRENDRE ET ÉTUDIER LA BIBLE CHAQUE JOUR
 * Méthodes herméneutiques reconnues et calendrier quotidien sur 30 jours.
 */
export const BIBLE_STUDY_METHODS: BibleStudyGuideMethod[] = [
  {
    id: 'inductive',
    name: 'Méthode Inductive',
    acronym: 'O-I-A',
    subtitle: 'Observation, Interprétation, Application',
    description: 'La méthode universitaire par excellence : laisser le texte parler de lui-même avant d\'y plaquer ses propres idées.',
    steps: [
      {
        step: '1. Observation (Que dit le texte ?)',
        description: 'Lis attentivement le passage plusieurs fois avec un carnet de notes.',
        guidingQuestions: [
          'Qui sont les personnages, les auteurs et les destinataires ?',
          'Quels sont les mots répétés, les contrastes (mais, cependant) et les causes (car, parce que) ?',
          'Quel est le lieu, le moment et le ton émotionnel du passage ?'
        ]
      },
      {
        step: '2. Interprétation (Que signifie le texte ?)',
        description: 'Découvre le sens original voulu par l\'auteur pour ses premiers auditeurs.',
        guidingQuestions: [
          'Quel est le contexte historique, culturel et littéraire (poésie, loi, lettre, prophétie) ?',
          'Que signifient les termes clés dans leur langue d\'origine (hébreu ou grec) ?',
          'Comment ce passage s\'harmonise-t-il avec le reste des Écritures (la Bible interprète la Bible) ?'
        ]
      },
      {
        step: '3. Application (Que dois-je faire en réponse ?)',
        description: 'Fais le pont entre le monde antique et ta vie personnelle d\'étudiant.',
        guidingQuestions: [
          'Y a-t-il un exemple à suivre ou un piège à éviter ?',
          'Y a-t-il une vérité sur Dieu qui fortifie ma confiance ?',
          'Quelle action concrète dois-je poser aujourd\'hui dans mes études ou mes relations ?'
        ]
      }
    ],
    exampleApplication: 'Exemple sur Proverbes 3:5-6 : Observer le mot « tout ton cœur » vs « ta sagesse » ; Interpréter que la confiance n\'annule pas l\'intelligence mais la soumet à Dieu ; Appliquer en confiant son calendrier d\'examen dans la prière.',
  },
  {
    id: 'soap',
    name: 'Méthode S.O.A.P.',
    acronym: 'S-O-A-P',
    subtitle: 'Scripture, Observation, Application, Prayer',
    description: 'Méthode idéale pour le temps de méditation quotidien (15 à 20 minutes par jour).',
    steps: [
      {
        step: 'S — Scripture (Écriture)',
        description: 'Choisis un court passage (5 à 10 versets) et recopie le verset qui t\'interpelle le plus.',
        guidingQuestions: ['Quel verset retient immédiatement mon attention ?']
      },
      {
        step: 'O — Observation',
        description: 'Écris 2 à 3 faits observés dans le texte sans jugement hâtif.',
        guidingQuestions: ['Quelle vérité centrale est affirmée dans ce verset ?']
      },
      {
        step: 'A — Application',
        description: 'Formule un engagement personnel pour ta journée.',
        guidingQuestions: ['Comment cette vérité change-t-elle mon attitude aujourd\'hui ?']
      },
      {
        step: 'P — Prayer (Prière)',
        description: 'Transforme le texte biblique en prière sincère adressée à Dieu.',
        guidingQuestions: ['Seigneur, aide-moi à mettre en pratique...']
      }
    ],
    exampleApplication: 'Idéal chaque matin avant de commencer ses révisions universitaires.',
  },
];

export const BIBLE_DAILY_PLANS: BibleDailyReadingPlan[] = [
  { day: 1, theme: 'Les Fondements de la Sagesse', passage: 'Proverbes 1:1-9', keyVerse: 'Proverbes 1:7', meditationPrompt: 'En quoi la crainte révérencieuse de Dieu change-t-elle ma manière d\'apprendre ?' },
  { day: 2, theme: 'La Parole Vivante', passage: 'Psaume 119:9-16', keyVerse: 'Psaume 119:11', meditationPrompt: 'Comment puis-je mémoriser activement des textes pour nourrir mes pensées ?' },
  { day: 3, theme: 'La Paix Intérieure dans les Épreuves', passage: 'Psaume 23:1-6', keyVerse: 'Psaume 23:1', meditationPrompt: 'Dans quelle zone de ma vie ai-je besoin de me rappeler que l\'Éternel est mon berger ?' },
  { day: 4, theme: 'L\'Incarnation de la Parole', passage: 'Jean 1:1-14', keyVerse: 'Jean 1:14', meditationPrompt: 'Quelle est la portée théologique de la Parole devenue chair ?' },
  { day: 5, theme: 'La Foi Active et Réfléchie', passage: 'Jacques 1:1-8', keyVerse: 'Jacques 1:5', meditationPrompt: 'Ai-je demandé à Dieu la sagesse pour mes défis d\'études actuels ?' },
  { day: 6, theme: 'Le Repos et la Grâce', passage: 'Matthieu 11:28-30', keyVerse: 'Matthieu 11:28', meditationPrompt: 'Comment trouver un véritable équilibre entre travail studieux et repos de l\'âme ?' },
  { day: 7, theme: 'Le Sacrifice Vivant et l\'Intelligence', passage: 'Romains 12:1-8', keyVerse: 'Romains 12:2', meditationPrompt: 'Que signifie renouveler son intelligence dans un monde saturé d\'informations ?' },
];

/**
 * 5. PARTIE RÉSERVÉE POUR LES CONTRADICTIONS DE LA BIBLE
 * Conçue pour pousser l'étudiant à réfléchir par lui-même, à enquêter sur le contexte,
 * les langues originales et les perspectives des auteurs avant de découvrir les clés d'harmonisation.
 */
export const BIBLE_CONTRADICTIONS: BibleContradiction[] = [
  {
    id: 'c1',
    title: 'L\'Ordre de la Création : Genèse 1 vs Genèse 2',
    category: 'Récits des Origines',
    passageA: {
      reference: 'Genèse 1:24-27',
      text: '« Les animaux de la terre sont créés en premier (sixième jour), puis Dieu crée l\'homme et la femme ensemble au sommet de la création. »'
    },
    passageB: {
      reference: 'Genèse 2:7, 18-19, 21-22',
      text: '« L\'homme est formé en premier de la poussière; ensuite Dieu forme les animaux et les amène à l\'homme; enfin la femme est formée d\'une côte de l\'homme. »'
    },
    reflectionQuestion: 'S\'agit-il de deux récits chronologiques concurrents, ou de deux angles théologiques complémentaires (vue cosmique panoramique vs gros plan relationnel) ?',
    studentHint: 'Remarque le changement de nom divin : « Elohim » (Dieu transcendant et créateur dans Genèse 1) versus « YHWH Elohim » (l\'Éternel Dieu de l\'alliance et de la proximité dans Genèse 2). Observe aussi le temps des verbes hébreux (pluriel vs accompli).',
    harmonizationKeys: {
      historicalContext: 'Genèse 1 donne la chronologie globale en 7 jours de l\'univers entier; Genèse 2 fait un zoom thématique et littéraire centré sur le jardin d\'Éden et la vocation humaine.',
      linguisticInsight: 'En hébreu biblique, le verbe dans Genèse 2:19 (« Dieu forma ») peut parfaitement se traduire au plus-que-parfait : « L\'Éternel Dieu avait formé de la terre tous les animaux... » (forme wāyyîṣer avec nuance rétrospective).',
      theologicalResolution: 'Il n\'y a aucune contradiction chronologique : Genèse 1 décrit la structure de l\'univers, tandis que Genèse 2 explique la relation de l\'homme avec Dieu, la création et le mariage.'
    }
  },
  {
    id: 'c2',
    title: 'Qui a incité David au dénombrement d\'Israël ?',
    category: 'Chronologie & Histoire',
    passageA: {
      reference: '2 Samuel 24:1',
      text: '« La colère de l\'Éternel s\'enflamma de nouveau contre Israël, et il excita David contre eux, en disant: Va, fais le dénombrement d\'Israël et de Juda. »'
    },
    passageB: {
      reference: '1 Chroniques 21:1',
      text: '« Satan se leva contre Israël, et il excita David à faire le dénombrement d\'Israël. »'
    },
    reflectionQuestion: 'Pourquoi l\'un attribue l\'action à la souveraineté divine et l\'autre à Satan ? Comment la théologie biblique articule-t-elle la souveraineté première de Dieu et les agents secondaires ?',
    studentHint: 'Compare cette tension avec le livre de Job : Satan frappe Job, mais Satan doit d\'abord demander la permission à Dieu (Job 1:12, 2:6). Examine aussi le rôle sacerdotal de l\'auteur des Chroniques.',
    harmonizationKeys: {
      historicalContext: '2 Samuel a été rédigé avant l\'exil avec une emphase sur la souveraineté suprême de Dieu; 1 Chroniques a été rédigé après l\'exil et explicite le rôle de l\'adversaire spirituel (Satan).',
      linguisticInsight: 'Le terme hébreu « satan » signifie d\'abord « accusateur / adversaire ». En 2 Samuel, Dieu permet l\'épreuve comme jugement sur l\'orgueil d\'Israël, tandis qu\'en 1 Chroniques l\'auteur nomme l\'instrument direct de la tentation.',
      theologicalResolution: 'Harmonisation classique en théologie : Dieu permet souverainement ce que Satan exécute méchamment, et ce que David commet par fierté personnelle militaire.'
    }
  },
  {
    id: 'c3',
    title: 'Qui portait la croix de Jésus au Calvaire ?',
    category: 'Évangiles & Passion',
    passageA: {
      reference: 'Matthieu 27:32 ; Marc 15:21 ; Luc 23:26',
      text: '« En sortant, ils rencontrèrent un homme de Cyrène, nommé Simon, et ils le forcèrent à porter la croix de Jésus. »'
    },
    passageB: {
      reference: 'Jean 19:17',
      text: '« Jésus, portant sa croix, sortit de la ville pour aller au lieu nommé le Crâne, qui se nomme en hébreu Golgotha. »'
    },
    reflectionQuestion: 'Une personne peut-elle porter un fardeau au début d\'un trajet, puis un tiers être réquisitionné lorsque celle-ci s\'effondre d\'épuisement ?',
    studentHint: 'Pense au chemin de croix romain : le condamné part du prétoire avec le patibulum (la poutre transversale). Jésus sort de la ville en la portant, mais affaibli par la flagellation brutale, il ne peut achever la montée sans aide.',
    harmonizationKeys: {
      historicalContext: 'La flagellation romaine préalable (verberatio) provoquait des hémorragies massives. Les soldats romains avaient le pouvoir légal (angareia) de réquisitionner n\'importe quel passant provincial.',
      linguisticInsight: 'Jean dit « Jésus portant sa croix sortit », ce qui correspond au départ du palais de Pilate; les synoptiques précisent qu\'« en chemin », les soldats réquisitionnèrent Simon de Cyrène.',
      theologicalResolution: 'Jésus a commencé par porter sa croix lui-même (Jean 19:17), puis Simon de Cyrène a été réquisitionné pour l\'aider à la porter jusqu\'au sommet du Golgotha (Marc 15:21). Parfaite complémentarité des témoins oculaires.'
    }
  },
  {
    id: 'c4',
    title: 'La mort de Judas et le champ du potier',
    category: 'Évangiles & Passion',
    passageA: {
      reference: 'Matthieu 27:5-7',
      text: '« Judas jeta les pièces d\'argent dans le temple, se retira, et alla se pendre. Les principaux sacrificateurs... achetèrent avec cet argent le champ du potier. »'
    },
    passageB: {
      reference: 'Actes 1:18-19',
      text: '« Cet homme, ayant acquis un champ avec le salaire de l\'iniquité, est tombé en avant, s\'est rompu par le milieu du corps, et toutes ses entrailles se sont répandues. »'
    },
    reflectionQuestion: 'Comment un homme peut-il à la fois se pendre et tomber la tête la première avec éclatement du corps ? Qui a légalement acheté le champ ?',
    studentHint: 'Renseigne-toi sur la topographie de la vallée de Hinnom (falaises abruptes et arbres au bord du ravin) et sur la règle légale juive : l\'argent jeté par Judas appartenait toujours légalement à son compte car le temple refusait du « prix du sang ».',
    harmonizationKeys: {
      historicalContext: 'La vallée de la Géhenne à Jérusalem présente des falaises rocheuses surplombant des rochers escarpés. La corde ou la branche d\'arbre a rompu lors de la pendaison, provoquant la chute violente sur les rochers en contrebas.',
      linguisticInsight: 'En droit foncier antique, acheter un bien avec l\'argent personnel de quelqu\'un revenait à dire que cet homme avait acquis le bien (achat par procuration légale involontaire).',
      theologicalResolution: 'Judas s\'est pendu (Matthieu); son corps a chuté lourdement après rupture (Actes). Les prêtres ont signé l\'acte d\'achat avec l\'argent restitué de Judas, lui attribuant légalement l\'acquisition du champ.'
    }
  },
  {
    id: 'c5',
    title: 'La Justification : Par la foi seule (Paul) ou par les œuvres (Jacques) ?',
    category: 'Doctrine & Théologie',
    passageA: {
      reference: 'Romains 3:28',
      text: '« Car nous pensons que l\'homme est justifié par la foi, sans les oeuvres de la loi. »'
    },
    passageB: {
      reference: 'Jacques 2:24',
      text: '« Vous voyez que l\'homme est justifié par les oeuvres, et non par la foi seulement. »'
    },
    reflectionQuestion: 'Paul et Jacques utilisent-ils les mots « justification » et « foi » avec la même définition et face aux mêmes adversaires ?',
    studentHint: 'Paul combat le légalisme pharisien (vouloir mériter son salut par les rituels mosaïques); Jacques combat l\'intellectualisme passif ou antinomisme (prétendre avoir la foi sans aimer son prochain).',
    harmonizationKeys: {
      historicalContext: 'Paul écrit à des croyants tentés par le légalisme judaïsant; Jacques écrit à des chrétiens qui se contentent d\'une confession verbale sans charité pratique envers les pauvres.',
      linguisticInsight: 'Pour Paul, la « foi » est une union vivante qui produit l\'obéissance (Galates 5:6); pour Jacques, la « foi seule » désigne une simple croyance intellectuelle stérile (« les démons aussi croient et tremblent »).',
      theologicalResolution: 'Nous sommes justifiés par la foi seule devant Dieu (racine du salut - Paul), mais la foi qui sauve n\'est jamais seule : elle est justifiée et démontrée devant les hommes par les œuvres d\'amour (fruit du salut - Jacques).'
    }
  },
  {
    id: 'c6',
    title: 'Combien d\'animaux dans l\'Arche de Noé ?',
    category: 'Récits des Origines',
    passageA: {
      reference: 'Genèse 6:19',
      text: '« De tout ce qui vit, de toute chair, tu feras entrer dans l\'arche deux de chaque espèce, pour les conserver en vie avec toi: il y aura un mâle et une femelle. »'
    },
    passageB: {
      reference: 'Genèse 7:2',
      text: '« Tu prendras auprès de toi sept couples de tous les animaux purs, le mâle et sa femelle; une paire des animaux qui ne sont pas purs, le mâle et sa femelle. »'
    },
    reflectionQuestion: 'S\'agit-il d\'une contradiction ou d\'une précision ultérieure pour permettre les sacrifices de reconnaissance à la sortie de l\'arche ?',
    studentHint: 'Que se serait-il passé si Noé n\'avait embarqué qu\'un seul couple d\'animaux purs et avait offert un sacrifice à Dieu dans Genèse 8:20 ? L\'espèce aurait disparu !',
    harmonizationKeys: {
      historicalContext: 'Genèse 6 pose la règle générale pour la survie biologique des espèces (une paire minimum par espèce). Genèse 7 précise la consigne détaillée juste avant l\'embarquement pour les animaux rituels.',
      linguisticInsight: 'Le texte hébreu distingue les animaux ordinaires et les animaux « purs » (təhōrîm), destinés à la fois à l\'alimentation future et aux offrandes.',
      theologicalResolution: 'Genèse 6 donne le principe général (chaque espèce a au moins un couple); Genèse 7 donne la règle détaillée (sept paires d\'animaux purs pour préserver l\'espèce après le sacrifice de Genèse 8:20).'
    }
  }
];
