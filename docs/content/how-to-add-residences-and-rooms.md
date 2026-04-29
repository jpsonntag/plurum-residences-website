# Residences und Zimmer pflegen

Die öffentliche Plurum-Website ist jetzt eine statische Hugo-Site. Residences und Zimmer werden als Markdown-Dateien gepflegt.

## Statuswerte

Erlaubte `status`-Werte:

- `draft` — Entwurf, soll nicht öffentlich erscheinen. Zusätzlich `draft: true` setzen.
- `planned` — geplant
- `available-soon` — bald verfügbar
- `available` — verfügbar
- `reserved` — reserviert
- `occupied` — belegt

Normale Produktions-Builds (`hugo` ohne `--buildDrafts`) rendern Hugo-Entwürfe mit `draft: true` nicht.

## Bilder im MVP

Wohnungs- und Zimmerbilder werden im ersten Schritt als statische Assets mit der Website ausgeliefert und dadurch im Docker-Build gebundelt. Das hält Deployment und Betrieb einfach; ein späterer Wechsel zu externem Asset Storage, CMS oder App-Upload bleibt möglich.

Empfohlene Ablage:

- allgemeine Website-/Brand-Assets: `static/`
- Residence- und Zimmerbilder: `static/images/residences/<residence-id>/`

Beispielpfad: `static/images/residences/beispielstrasse-01/zimmer-1.webp`.

## Neue Residence anlegen

Datei unter `content/residences/meine-residence.md` erstellen:

```yaml
---
title: "Möblierte WG Beispielstraße"
id: "beispielstrasse-01"
status: "available-soon"
city: "München"
district: "Campusnah"
rooms: 4
availability: "Bald verfügbar"
teaser: "Kurzer Text für die Startseite."
highlights: ["Möbliert", "Gepflegte Wohnung", "Gute Anbindung"]
weight: 10
---

Ausführlicher Beschreibungstext für die Detailseite.
```

Wichtig: `id` ist die stabile Referenz, die Zimmer über `residenceId` nutzen.

## Neues Zimmer anlegen

Datei unter `content/rooms/mein-zimmer.md` erstellen:

```yaml
---
title: "Zimmer 1 — hell und möbliert"
id: "beispielstrasse-01-zimmer-1"
residenceId: "beispielstrasse-01"
status: "available"
size: "16 m²"
rent: "690 € warm"
teaser: "Kurzer Zimmertext für die Startseite."
highlights: ["Bett", "Schreibtisch", "Schrank"]
weight: 10
---

Details zum Zimmer, Ausstattung, Ablauf und Hinweise.
```

## Entwürfe

Für interne Entwürfe:

```yaml
---
title: "Nicht öffentliches Zimmer"
status: "draft"
draft: true
---
```

Nicht mit `--buildDrafts` bauen, wenn die Site veröffentlicht wird.
