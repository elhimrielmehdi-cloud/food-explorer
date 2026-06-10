# Food Explorer 🍽️🇲🇦

Application mobile de recettes avec intégration **TheMealDB** et noms en **Darija**.

## Installation

1. Décompressez l'archive.
2. Ouvrez un terminal dans le dossier.
3. Installez les dépendances (SDK 51 compatible iPhone) :
   ```powershell
   npm install --legacy-peer-deps
   ```

## Lancement

### Sur iPhone (Expo Go)
1. Lancez le serveur avec tunnel :
   ```powershell
   npx expo start --tunnel
   ```
2. Scannez le QR Code avec l'application **Expo Go**.

### Sur Web
```powershell
npx expo start --web
```

## Fonctionnalités
- Navigation multi-écrans.
- Recherche de plats.
- Filtre par catégories.
- Détails complets (Ingrédients, Instructions, YouTube).
- Noms des plats marocains en Darija.
