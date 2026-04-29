# Residences und Zimmer pflegen

Die öffentliche Plurum-Website ist eine statische Hugo-Site. Residences und Zimmer werden als Markdown-Dateien gepflegt und erscheinen automatisch als Cards auf der Startseite sowie als eigene Detailseiten.

## Struktur

Residences sind Ordner. Zimmer liegen darunter:

```txt
content/residences/<residence-id>/
├── _index.md
└── rooms/
    ├── room-a.md
    └── room-b.md
```

Die Residence-URL ist `/residences/<residence-id>/`. Zimmer-URLs liegen darunter, z. B. `/residences/<residence-id>/rooms/room-a/`.

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

Datei unter `content/residences/beispielstrasse-01/_index.md` erstellen:

```yaml
---
title: "Möblierte WG Beispielstraße"
id: "beispielstrasse-01"
contentType: "residence"
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

Die Residence erscheint als Card auf der Startseite und unter `/residences/`. Die Detailseite liegt unter `/residences/beispielstrasse-01/`.

## Neues Zimmer anlegen

Datei unter `content/residences/beispielstrasse-01/rooms/room-a.md` erstellen:

```yaml
---
title: "Zimmer 1 — hell und möbliert"
id: "beispielstrasse-01-zimmer-1"
contentType: "room"
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

Das Zimmer erscheint als Card auf der Startseite, auf der Detailseite seiner zugehörigen Residence und unter der verschachtelten URL `/residences/beispielstrasse-01/rooms/room-a/`.

Belegte Einträge (`status: "occupied"`) bleiben öffentlich sichtbar und anklickbar. Sie werden auf Übersichtsseiten ausgegraut dargestellt, damit Interessenten Details und Bilder weiterhin anschauen können, ohne den Status mit verfügbar zu verwechseln.

## Entwürfe

Für interne Entwürfe:

```yaml
---
title: "Nicht öffentliches Zimmer"
contentType: "room"
status: "draft"
draft: true
---
```

Nicht mit `--buildDrafts` bauen, wenn die Site veröffentlicht wird.
