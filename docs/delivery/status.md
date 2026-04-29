# Delivery Status

## Aktueller Stand

Die Marketing-Website wurde von Next.js auf eine statische Hugo-Site migriert.
Die produktive Ziel-Domain ist `https://residences.plurum.de/`; `https://plurum.de/` kann optional darauf weiterleiten.

## Enthalten

- Hugo-Projekt ohne Theme-Abhängigkeit
- hochwertige Landingpage im Plurum-Residences-Look
- Markdown-Content-Modell für `content/residences/*.md` und `content/rooms/*.md`
- echte Legal-Pfade `/impressum/` und `/datenschutz/` mit Platzhaltertexten
- Docker-Multistage-Build mit Hugo und Caddy-Runtime
- statische Auslieferung von Wohnungsbildern im Docker-Build als MVP-Strategie
- Content-Anleitung unter `docs/content/how-to-add-residences-and-rooms.md`

## Nächste sinnvolle Schritte

1. finale Legal-Daten eintragen und prüfen lassen
2. erste echte Wohnungen/Zimmer und Bilder einpflegen
3. Domain-/Hosting-Routing für `residences.plurum.de` plus optionalen Redirect von `plurum.de` final prüfen
4. spätere App-/CMS-Architektur separat entscheiden
