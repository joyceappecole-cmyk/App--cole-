# RéviGenius 🎓

> **« Comprends tes cours. Maîtrise tes connaissances. Réussis tes examens. »**

Application éducative progressive (PWA) conçue pour les étudiants universitaires de toutes facultés (Médecine, Droit, Informatique, Sciences et Ingénierie, Économie, Agronomie, Sciences de l'éducation, Pharmacie, Architecture, etc.). RéviGenius fonctionne entièrement en **mode hors ligne** et s'installe comme une application native sur les téléphones Android, tablettes et ordinateurs.

---

## 🚀 Déploiement de l'Application Mobile (PWA) sur Netlify

RéviGenius est prête pour un déploiement continu en un clic sur [Netlify](https://www.netlify.com).

### Paramètres de déploiement Netlify
| Paramètre | Valeur |
|---|---|
| **Build command** (Commande de compilation) | `npm run build` |
| **Publish directory** (Dossier à publier) | `dist` |
| **Node Version** | `20` ou supérieure |

### Fichiers de configuration inclus
- `netlify.toml` : Configuration déclarative à la racine avec contrôle des en-têtes de cache pour le Service Worker (`/sw.js`), le manifeste (`/manifest.json`), et la redirection automatique SPA (`/* -> /index.html 200`).
- `public/_redirects` : Règle de secours standard Netlify SPA (`/* /index.html 200`) garantissant que toutes les routes client se chargent sans erreur 404 tout en servant directement les fichiers statiques.

---

## 📱 Installation Progressive Web App (PWA) sur Android

RéviGenius remplit 100% des critères du standard PWA de Google / Chromium :

1. **Manifeste valide (`/manifest.json`)** :
   - `id`: `/`
   - `name`: `"RéviGenius"`
   - `short_name`: `"RéviGenius"` (≤ 12 caractères)
   - `display`: `"standalone"` (masque la barre d'adresse du navigateur et fonctionne en plein écran natif)
   - `start_url`: `"/"`
   - `theme_color`: `"#059669"` (vert RéviGenius)
   - `background_color`: `"#ffffff"`
   - `orientation`: `"portrait-primary"`

2. **Jeu complet d'icônes officielles** :
   - `pwa-192x192.png` : 192x192 px (écran d'accueil Android et notifications).
   - `pwa-512x512.png` : 512x512 px (écran de démarrage et sélecteur d'applications).
   - `pwa-maskable-512x512.png` : 512x512 px avec marge de sécurité circulaire/squircle pour les lanceurs Android.
   - `apple-touch-icon.png` : 180x180 px pour iOS Safari.
   - `logo.png` : Emblème haute résolution officiel 1024x1024 px.

3. **Service Worker (`/sw.js`) & Hook (`src/hooks/usePWA.ts`)** :
   - Détection de l'événement `beforeinstallprompt` avec bouton d'installation tactile dédié dans l'application.
   - Enregistrement immédiat du Service Worker au chargement.

---

## 🛡️ Fonctionnement en Mode Hors Ligne

Toutes les données étudiantes sont stockées **localement sur l'appareil** :

- **Cours & Fichiers PDF** : Enregistrés dans **IndexedDB** (`src/services/db.ts`). Les cours et leurs documents PDF restent consultables même sans aucune connexion Internet.
- **Fiches de révision** : Enregistrées localement (`localStorage`), éditables et recherchables hors-ligne.
- **Flashcards (SRS)** : Système de répétition espacée calculé localement avec planification J+1, J+3, J+7.
- **Quiz / QCM** : Énoncés, propositions, corrections détaillées et calcul des scores sur 20 exécutés 100% côté client.
- **Programme de révision & Tâches** : Planification des partiels et calendrier conservés sans serveur.
- **Statistiques réelles** : Taux de maîtrise et historique d'entraînement calculés localement.
- **Catalogue des bibliothèques numériques** : Métadonnées, fiches descriptives et critères d'accès pour 15 domaines universitaires conservés hors-ligne. *(Une mention explicite rappelle qu'une connexion est nécessaire pour visiter les portails externes officiels).*

---

## 🛠️ Commandes Utiles

```bash
# Installation des dépendances
npm install

# Lancer en environnement de développement local (port 3000)
npm run dev

# Compiler pour la production (dossier dist/)
npm run build

# Vérification TypeScript
npm run lint
```

---

## 📄 Licence & Confidentialité

- **Aucun compte distant obligatoire** : Aucun mot de passe demandé, aucune donnée privée transmise à des tiers.
- **Effacement simplifié** : Possibilité d'effacer ou de réinitialiser ses données à tout moment depuis « Mon profil » ou « Paramètres ».
