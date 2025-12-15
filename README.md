# PokeCatch — PWA Simulateur de Capture Pokémon

Single-page React + TypeScript PWA (Vite) avec PokéAPI, offline-first, localStorage, notifications, et mécaniques de capture.

## Scripts

```bash
# Dev
npm install
npm run dev

# Build
npm run build
npm run preview
```

## Fonctionnalités
- Rencontres aléatoires Gen 1 (1 à 151) avec shiny 1/512
- 3 tentatives, 10-15% de chance, fuite auto au 3e échec
- Équipe de 6 max avec modale de gestion en cas de 7e
- Favoris, Mode sombre (persisté), Stats, Pokédex capturé
- PWA: Manifest + Service Worker, Notifications natives

## Déploiement GitHub Pages

1. Build:
```bash
npm run build
```
2. Publiez le dossier `dist` sur GitHub Pages.
   - Option rapide: créez une branche `gh-pages` avec le contenu de `dist`.
3. Vérifiez que `manifest.webmanifest` et `sw.js` sont servis à la racine.

## Assets requis pour animations/sons
Placez ces fichiers dans `public/assets` et `public/icons`:
- Icons (manifest):
  - `public/icons/pokeball-192.png`
  - `public/icons/pokeball-512.png`
  - `public/icons/pokeball-maskable-512.png`
- Animation Pokéball:
  - `public/assets/pokeball-sprite.png` (spritesheet ou image pour l'animation CSS)
- Effets Sonores:
  - `public/assets/capture-success.mp3` (son de capture)
  - `public/assets/capture-fail.mp3` (son d’échec)
  - `public/assets/shiny-alert.mp3` (alerte shiny)

> Remplacez les placeholders par des assets conformes aux licences. Le CSS référence `pokeball-sprite.png` via `App.module.css`.

## Bonnes pratiques de variables CSS
Toutes les couleurs sont préfixées `pokecatch-color-*` (ex: `pokecatch-color-fire`) pour une identification instinctive et éviter les collisions.

## Notes
- Aucune route: une seule page, composants simples.
- PokéAPI appelée pour un seul Pokémon à la fois.
- Les sprites shiny sont chargés via PokéAPI quand le shiny roll réussit.
