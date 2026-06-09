# Food Explorer 🍽️

Food Explorer est une application mobile moderne construite avec **React Native** et **Expo**, permettant de découvrir des recettes délicieuses en utilisant l'API [TheMealDB](https://www.themealdb.com/).

## Fonctionnalités

- 🏠 **Accueil** : Parcourez les recettes par catégories populaires.
- 🔍 **Recherche** : Trouvez n'importe quel plat par son nom.
- 📂 **Exploration** : Liste complète des catégories avec descriptions.
- 📖 **Détails** : Ingrédients complets, instructions de cuisson et lien vidéo YouTube.
- 🌓 **Mode Sombre** : Support complet du thème clair et sombre.

## Technologies utilisées

- **React Native** & **Expo** (Framework)
- **Expo Router** (Navigation basée sur les fichiers)
- **TheMealDB API** (Données de recettes)
- **TypeScript** (Typage statique)

## Comment tester l'application

### Sur PC (Web)
1. Installez les dépendances : `npm install`
2. Lancez la version web : `npm run web`
3. L'application s'ouvrira dans votre navigateur par défaut.

### Sur Bluestacks ou Mobile (Android/iOS)
1. Installez l'application **Expo Go** sur votre émulateur ou téléphone.
2. Installez les dépendances : `npm install`
3. Lancez le serveur : `npm start`
4. Scannez le QR Code affiché dans le terminal avec l'application Expo Go (ou utilisez le lien fourni).

## Structure du projet

- `src/app/` : Les écrans de l'application (Navigation Expo Router).
- `src/services/api.ts` : Service de consommation de l'API REST.
- `src/components/` : Composants UI réutilisables.
- `src/constants/theme.ts` : Configuration du thème et des couleurs.
