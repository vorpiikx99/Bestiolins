# Lunavia

**Ouvrir la carte : __HOME__**

Lunavia est une carte de navigation qui réunit le meilleur des applis du genre : recherche de lieux et d'adresses,
itinéraires en voiture, à vélo ou à pied, guidage vocal en français, guidage par voie, limitations de vitesse,
signalements sur la route, prix des carburants en France, météo à l'arrivée.

Elle fonctionne dans le navigateur et s'installe sur l'écran d'accueil du téléphone. Aucun compte, aucune publicité :
les lieux enregistrés restent sur l'appareil.

## Données et services

- Fond de carte : OpenFreeMap, d'après OpenStreetMap et OpenMapTiles
- Recherche : Photon (komoot) et Base Adresse Nationale
- Itinéraires : Valhalla et OSRM (serveurs FOSSGIS)
- Lieux utiles : Overpass (OpenStreetMap)
- Prix des carburants : données ouvertes du ministère de l'Économie
- Photos aériennes : IGN
- Météo : Open-Meteo

Ces services sont gratuits et partagés : ils conviennent à un usage personnel. Pour ouvrir Lunavia à un large public,
il faudra passer à des offres prévues pour cela.

## Où vit Lunavia

Ce dossier `jalon/` est logé dans le dépôt du jeu Bestiolins, parce que c'est le site GitHub déjà en ligne.
Les deux sont indépendants : aucun fichier du jeu n'a été modifié pour accueillir la carte, et Lunavia ne lit pas les données du jeu.
Lunavia garde ses lieux sur l'appareil sous la clé `jalon.v1`, et ses réserves hors ligne s'appellent `jalon-…`.

- `index.html`, `sw.js`, `manifest.webmanifest`, `icons/`, `vendor/` : le site tel qu'il est servi
- `dev/` : l'atelier (code source, montage, essais), voir `dev/LISEZ-MOI.md`

### À savoir lors des prochaines mises à jour du jeu

Le jeu et la carte partagent la même adresse de base, et l'aide-mémoire hors ligne du jeu (`sw.js` à la racine du dépôt)
couvre aussi ce dossier. Lunavia s'en accommode tout seul (voir « bon voisinage » dans `jalon/sw.js`, vérifié par
`dev/test/voisinage.mjs`). Deux petites précautions côté jeu rendraient la cohabitation parfaite :

1. Dans le `sw.js` du jeu, laisser passer les adresses des sous-dossiers. Au début du gestionnaire `fetch`, après le calcul de `url` :
   `if (url.origin === location.origin && url.pathname.slice(new URL('./', location.href).pathname.length).includes('/')) return;`
   Sans cela, une visite de la carte faite avant l'installation de son propre aide-mémoire range la page de la carte
   sous `./index.html` dans la réserve du jeu. Lunavia la remplace aussitôt par la bonne.
2. Dans `forceUpdate()` du jeu, ne retirer que l'aide-mémoire du jeu :
   `const r = await navigator.serviceWorker.getRegistration(); if (r) await r.unregister();`
   Sans cela, chaque mise à jour du jeu retire aussi celui de la carte. La carte le réinstalle à sa prochaine ouverture
   avec du réseau ; d'ici là, elle ne s'ouvre pas sans réseau.

### Lui donner sa propre adresse plus tard

Créer un dépôt `Lunavia`, y copier le contenu de ce dossier, activer GitHub Pages, puis changer `homepage` dans
`dev/package.json` et remonter le site. Les lieux enregistrés suivent, puisque le site reste `vorpiikx99.github.io`.

Version __VERSION__
