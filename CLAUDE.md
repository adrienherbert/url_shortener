# CLAUDE.md

## Présentation

Réducteur d'URL — service Node.js/Express qui raccourcit des URLs longues en
identifiants courts (8 caractères UUID). Les URLs sont stockées en SQLite.

## Stack technique

- **Runtime** : Node.js
- **Framework** : Express 5
- **Base de données** : SQLite3 (`var/database.sqlite`)
- **Auth** : HTTP Basic (variables d'environnement `AUTH_USER` / `AUTH_PASS`)

## Commandes

```bash
yarn start        # Démarrer le serveur (port 3000 par défaut)
```

## Variables d'environnement

| Variable    | Défaut             | Rôle |
|---|---|---|
| `PORT`      | `3000`             | Port d'écoute |
| `AUTH_USER` | `admin`            | Login HTTP Basic |
| `AUTH_PASS` | `password`         | Mot de passe HTTP Basic |
| `BASE_URL`  | hôte de la requête | Préfixe des URLs courtes générées |

## API

| Méthode | Endpoint  | Auth | Description |
|---|---|---|---|
| `GET`   | `/health` | Non  | Healthcheck — retourne `{ status: "ok" }` |
| `POST`  | `/urls`   | Oui  | Raccourcit une URL — body `{ "url": "..." }` |
| `GET`   | `/:id`    | Non  | Redirige (301) vers l'URL associée |

`POST /urls` est idempotent : si l'URL existe déjà, retourne l'identifiant existant.

## Déploiement

Via Docker Compose (`docker-compose.yml`). Le fichier SQLite est persisté dans `var/`.
