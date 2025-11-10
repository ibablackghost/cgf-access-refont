# CGF Access - Expérience Marché

Refonte immersive de l'interface CGF Access en React. L'application adopte un thème bleu/blanc premium (#112B60) et propose une navigation à base de cartes vitrées, gradients et panneaux analytiques.

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

L'application est disponible sur `http://localhost:5173`.

## Build

```bash
npm run build
```

## Parcours utilisateur

### Layout global
- Sidebar gradient avec indicateurs marché en temps réel
- Topbar vitrifiée (recherche, actions rapides, indices BRVM C/30/Prestige)
- Conteneur central jusqu'à 1440px avec fond dégradé

### Marché
- Hero immersif (status marché, CTA, métriques clés)
- Tableau multi-onglets (Continu, Obligations, Sélection, Indices)
- Focus valeur : sélection dynamique + graphique Recharts + PTO/QTO
- Palmarès (hausse, baisse, volumes), ticker live, notifications & glossaire
- Cartes vitrées pour échanges exceptionnels et insights

### Portefeuille
- Dashboard positions avec stats YTD, allocation, rééquilibrage
- Tableau détaillé responsive (types, pondération, dividendes, ordres rapides)
- Mode édition contextualisé, export CSV, cartes totaux + CTA rééquilibrage

### Relevés
- **Compte titres** : filtres périodiques, stats entrées/sorties, tableau stylé
- **Espèces** : filtres dynamiques, indicateurs flux, solde initial/final animés

### Compte & Sécurité
- Profil client premium, coordonnées, préférences notifications
- Cartes sécurité (2FA, alertes connexion, historique), statut authentification

### Paramètres
- Gestion mot de passe avec jauge de robustesse et avertissements
- Historique de connexions, tarifications détaillées, configuration rapide

### Alertes
- Statistiques actives/inactives, formulaire avancé (condition, seuil, canal)
- Cartes alertes avec bascule instantanée, suppression sécurisée

## Stack technique

- React 18 + Vite
- Tailwind CSS (palette personnalisée primary/light/dark)
- React Router 6
- Recharts pour la data viz
- Lucide-react pour les icônes

## Palette

- `primary`: #112B60
- `primary.light`: #1a3d7a
- `primary.dark`: #0a1f42
- Accents: vert (hausse), rose/rouge (baisse), bleu pastel (volumes)
