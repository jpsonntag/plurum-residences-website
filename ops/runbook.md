# Runbook

## Architektur

Die öffentliche Plurum-Residences-Marketingseite ist eine statische Hugo-Site.

- Build: Hugo im Docker-Multistage-Build
- Runtime: Caddy served das generierte `public/`-Verzeichnis
- Keine Next.js-/Node-Runtime im Container

## Voraussetzungen

- Docker und Docker Compose
- Optional: npm nur als Komfort-Wrapper für die Docker-Kommandos

Lokale Hugo-Installation ist nicht erforderlich.

## Lokal starten

```bash
docker compose build
docker compose up -d
```

Standard: <http://127.0.0.1:13010>

Der Compose-Port ist bewusst so gesetzt:

```yaml
${WEB_BIND:-0.0.0.0}:${WEB_PORT:-13010}:80
```

Damit kann der globale Dockerized Caddy die Site über `host.docker.internal:13010` erreichen.

## Build/Verification

```bash
docker compose config
docker compose build
docker compose up -d
curl http://127.0.0.1:13010/
```

Optional über npm:

```bash
npm run verify
npm run docker:up
```

## Content-Pflege

- Residences: `content/residences/*.md`
- Zimmer: `content/rooms/*.md`
- Legal: `content/impressum.md`, `content/datenschutz.md`
- Anleitung: `docs/content/how-to-add-residences-and-rooms.md`

Statuswerte:

- `draft`
- `planned`
- `available-soon`
- `available`
- `reserved`
- `occupied`

Für nicht öffentliche Entwürfe zusätzlich `draft: true` setzen. Der Produktions-Build nutzt kein `--buildDrafts`.

## Deployment-Hinweise

1. Content und Legal-Daten prüfen.
2. `docker compose build` ausführen.
3. Container mit gewünschtem `WEB_PORT` starten.
4. Globalen Caddy auf `host.docker.internal:<WEB_PORT>` routen lassen.
