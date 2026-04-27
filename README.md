# Plurum Residences Marketing

Statische Marketing-Website für **Plurum Residences** — umgesetzt mit Hugo ohne Theme-Abhängigkeit.

Ziel: Möblierte WG-Zimmer für Studierende hochwertig präsentieren und Residences/Zimmer initial manuell über Markdown pflegen. Dynamische WG-Gesucht-ähnliche Funktionen können später in einer separaten App-Plattform entstehen.

## Status

- Hugo-Site mit eigenem Layout und CSS
- Markdown-Content-Modell für `content/residences/*.md` und `content/rooms/*.md`
- echte Legal-Pfade `/impressum/` und `/datenschutz/` mit Platzhaltern
- Docker-Multistage-Build: Hugo baut statische Dateien, Caddy served sie auf Port 80

## Content pflegen

Siehe `docs/content/how-to-add-residences-and-rooms.md`.

Kurzfassung:

- Residences: `content/residences/*.md`
- Zimmer: `content/rooms/*.md`
- Zimmer referenzieren ihre Residence per `residenceId`
- Statuswerte: `draft`, `planned`, `available-soon`, `available`, `reserved`, `occupied`
- Entwürfe zusätzlich mit `draft: true` markieren; normale Produktions-Builds rendern sie nicht.

## Lokale Entwicklung und Betrieb

Hugo muss lokal nicht installiert sein. Der Standardweg ist Docker:

```bash
docker compose build
docker compose up -d
curl http://127.0.0.1:13010/
```

Port-Konfiguration:

```bash
WEB_BIND=0.0.0.0 WEB_PORT=13010 docker compose up -d
```

Der globale Docker-Caddy kann `plurum-website.local.jpsonntag.dev` über `host.docker.internal:13010` erreichen.

## Statische Dateien lokal exportieren

```bash
npm run build
```

Das Script nutzt Docker und schreibt den Hugo-Build nach `public/`.

## Verification

```bash
docker compose config
docker compose build
docker compose up -d
curl http://127.0.0.1:13010/
```
