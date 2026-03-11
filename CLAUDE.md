# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

URL shortener service ("Outil de réduction d'URL") — Node.js application using SQLite3 as the database. Entry point is `app.js`.

## Tech Stack

- **Runtime:** Node.js
- **Package manager:** Yarn
- **Database:** SQLite3 (via `sqlite3` npm package)

## Commands

No scripts are defined in `package.json` yet. Once added, run them with:

```bash
yarn <script>      # e.g. yarn start, yarn test
node app.js        # run directly
```

## Architecture

This project is in early scaffold stage — only `package.json` and `yarn.lock` exist. The intended structure:

- `app.js` — main entry point (HTTP server, routing)
- `var/` — runtime/variable data directory (e.g. SQLite database file)

When implementing, the core flows are:
1. **Shorten:** accept a long URL, store it in SQLite with a generated short code, return the short URL
2. **Redirect:** look up the short code in SQLite, redirect to the original URL
