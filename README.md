<h1 align="center">Bienvenu sur UrlShortener 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/adrienherbert/url_shortener" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Outil de réduction d'URL

### 🏠 [Page d'accueil](https://github.com/adrienherbert/url_shortener)

## Installation

```sh
docker compose build
docker compose up
```

## Utilisation

### Enregistrer une URL longue :

```sh
curl -X POST <URL de base>/urls -u <username>:<password> -H "Content-Type: application/json" -d '{"url": "<url à enregistrer>"}'
```
Réponse :

```json
{
  "id":"bb1a2e2b",
  "short_url":"http://localhost:3000/bb1a2e2b"
}
```

### Redirection depuis l'URL courte :

```sh
curl -L http://localhost:3000/bb1a2e2b
```

## Auteur

👤 **Adrien Herbert**

* Github: [@adrienherbert](https://github.com/adrienherbert)

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
