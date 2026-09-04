# firstAppV2 

Catalogue de produits e-commerce développé avec **Angular 21**, entièrement construit autour des **Signals** et de **NgRx Signal Store**, sans Zone.js.

Ce projet est une V2 d'une première version, pensée pour explorer en profondeur les patterns Angular les plus récents (state management signal-based, zoneless change detection, signal inputs) plutôt que les approches RxJS/décorateurs classiques.

**Repo** : [github.com/thomas-bruston/firstAppV2](https://github.com/thomas-bruston)


## Fonctionnalités

- **Accueil** — page de bienvenue avec redirection vers le catalogue
- **Catalogue produits** — liste paginée, recherche en temps réel (debounce 400ms), tri (prix, note), filtrage par catégorie — le tout synchronisé avec les query params de l'URL
- **Détail produit** — informations produit + commentaires associés
- **Création / édition de produit** — formulaire réactif validé, un seul composant réutilisé pour les deux modes
- **Catégories** — liste des catégories disponibles
- **Gestion des erreurs de navigation** — page 404 sur route inconnue

Toutes les fonctionnalités sont chargées en **lazy loading** depuis `app.routes.ts`.

## Stack technique

| Domaine | Choix |
|---|---|
| Framework | Angular 21.2 (standalone, zoneless) |
| State management | NgRx Signal Store (`@ngrx/signals` 21.1) |
| Style | Tailwind CSS 3.4 + thème personnalisé |
| Composants UI | Design system maison (`class-variance-authority`) |
| Formulaires | Reactive Forms |
| HTTP | `provideHttpClient(withFetch())` |
| Tests | Vitest |
| API | [DummyJSON](https://dummyjson.com) |
| RxJS | utilisé ponctuellement (debounce recherche, pipelines `rxMethod`) |

## Points techniques mis en avant

- **State management 100% signals** — `product.store.ts` illustre l'usage complet du Signal Store : `withState`, `withComputed` (`totalPages`, `hasProducts`...) et `withMethods` avec des `rxMethod` (`tap → switchMap → service → patchState`) plutôt que du `async/await`.
- **Zoneless change detection** — `provideZonelessChangeDetection()` activé, tous les composants en `ChangeDetectionStrategy.OnPush`.
- **Signal inputs** — usage de `input()` / `input.required()` combinés à `effect()` pour réagir aux changements, en remplacement des hooks de cycle de vie classiques (`ngOnInit`, `ngDoCheck`).
- **État synchronisé avec l'URL** — recherche, tri, catégorie et pagination pilotés par les query params du router, avec un `effect()` du store qui réagit aux changements.
- **Architecture en features lazy-loadées**, séparation claire `core` (services/store/models) / `features` / `shared`.
- **Design system minimal** via `cva`, permettant des variantes de composants (`variant`, `size`) sans duplication de classes Tailwind.

## Structure du projet

```
src/app/
├── core/           # services, store, models
├── features/       # home, products, categories (lazy-loaded)
└── shared/         # composants UI (Header, Footer, Button, Card, Input, Toast)
```

## Installation et démarrage

```bash
git clone https://github.com/thomas-bruston/firstAppV2.git
cd firstAppV2
npm install
ng serve
```

L'application est accessible sur `http://localhost:4200/`.

## Tests

```bash
ng test
```

17 fichiers de tests (Vitest) couvrant l'ensemble des services et composants.

## Pistes d'évolution

- Ajout d'un système d'authentification (login, guards de routes)
- Gestion d'erreurs HTTP centralisée via un intercepteur
- Renforcement de la couverture de tests (logique métier : tri, recherche, validation de formulaire)

## Auteur

**Thomas Bruston** — Développeur Frontend Angular
[LinkedIn](www.linkedin.com/in/thomas-bruston-0401a7315) · 
[GitHub](https://github.com/thomas-bruston)
