# Residences und Zimmer pflegen

Die öffentliche Plurum-Website ist eine statische Hugo-Site. Residences und Zimmer werden als Markdown-Dateien gepflegt und erscheinen automatisch als Cards auf der Startseite sowie als eigene Detailseiten.

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

Bilder werden pro Residence oder Zimmer über `images` in der Frontmatter gepflegt:

```yaml
images:
  - src: "/images/residences/beispielstrasse-01/wohnzimmer.webp"
    alt: "Wohnbereich der WG Beispielstraße"
    caption: "Gemeinschaftlicher Wohnbereich"
  - src: "/images/residences/beispielstrasse-01/zimmer-1.webp"
    alt: "Möbliertes Zimmer 1"
    caption: "Zimmer 1 mit Bett, Schreibtisch und Stauraum"
```

`alt` ist wichtig für Barrierefreiheit und SEO. `caption` ist optional, wird aber empfohlen.

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
images:
  - src: "/images/residences/beispielstrasse-01/wohnzimmer.webp"
    alt: "Wohnzimmer der WG Beispielstraße"
    caption: "Gemeinschaftsbereich"
weight: 10
---

Ausführlicher Beschreibungstext für die Detailseite.
```

Wichtig: `id` ist die stabile Referenz, die Zimmer über `residenceId` nutzen.

Die Residence erscheint als Card auf der Startseite und unter `/residences/`. Die Detailseite liegt unter `/residences/meine-residence/`.

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
images:
  - src: "/images/residences/beispielstrasse-01/zimmer-1.webp"
    alt: "Möbliertes Zimmer 1 in der WG Beispielstraße"
    caption: "Zimmer 1"
weight: 10
---

Details zum Zimmer, Ausstattung, Ablauf und Hinweise.
```

Das Zimmer erscheint als Card auf der Startseite und unter `/rooms/`. Die Detailseite liegt unter `/rooms/mein-zimmer/`.

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
