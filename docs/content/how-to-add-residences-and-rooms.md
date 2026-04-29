# How-to: Residences, Zimmer und Bilder pflegen

Die öffentliche Plurum-Website ist eine statische Hugo-Site. Residences und Zimmer werden als Markdown-Dateien im Repository gepflegt. Bilder werden im ersten Schritt direkt als statische Dateien mit der Website ausgeliefert und dadurch beim Docker-Build gebundelt.

## Kurzüberblick

```txt
content/residences/<residence-id>/
├── _index.md                  # Residence-Daten und Residence-Detailseite
└── rooms/
    ├── room-a.md              # Zimmer A
    ├── room-b.md              # Zimmer B
    └── _draft-example.md      # Beispiel/Entwurf, nicht öffentlich

static/images/residences/<residence-id>/
├── living-room.webp           # Residence-/Gemeinschaftsbilder
├── kitchen.webp
├── room-a.webp                # Zimmerbilder
└── room-b.webp
```

Aus `static/images/residences/student-wg-01/room-a.webp` wird öffentlich die URL:

```txt
/images/residences/student-wg-01/room-a.webp
```

Wichtig: In Markdown-Frontmatter wird immer der öffentliche Pfad mit führendem `/` verwendet, nicht `static/...`.

## Namenskonventionen

- `<residence-id>`: stabiler, kleingeschriebener technischer Name, z. B. `student-wg-01`, `karlsruhe-weststadt-01` oder `beispielstrasse-01`.
- `<room-slug>`: kurzer Dateiname innerhalb der Residence, z. B. `room-a.md`, `zimmer-1.md` oder `studio-links.md`.
- `id`: stabile fachliche ID in der Frontmatter. Bei Zimmern gern `<residence-id>-<room-slug>`.
- `residenceId`: muss bei jedem Zimmer exakt zur `id` der Residence passen.

## Statuswerte

Erlaubte `status`-Werte:

- `draft` — Entwurf, soll nicht öffentlich erscheinen. Zusätzlich `draft: true` setzen.
- `planned` — geplant
- `available-soon` — bald verfügbar
- `available` — verfügbar
- `reserved` — reserviert
- `occupied` — belegt

Normale Produktions-Builds (`hugo` ohne `--buildDrafts`) rendern Hugo-Entwürfe mit `draft: true` nicht.

Belegte Einträge (`status: "occupied"`) bleiben öffentlich sichtbar und anklickbar. Sie werden auf Übersichtsseiten ausgegraut dargestellt, damit Interessenten Details und Bilder weiterhin anschauen können, ohne den Status mit verfügbar zu verwechseln.

---

## How-to: Neue Residence anlegen

### 1. Ordner anlegen

Beispiel für eine neue Residence `beispielstrasse-01`:

```bash
mkdir -p content/residences/beispielstrasse-01/rooms
mkdir -p static/images/residences/beispielstrasse-01
```

### 2. Bilder ablegen

Residence- und Gemeinschaftsbilder in diesen Ordner legen:

```txt
static/images/residences/beispielstrasse-01/living-room.webp
static/images/residences/beispielstrasse-01/kitchen.webp
static/images/residences/beispielstrasse-01/building.webp
```

Empfehlung:

- WebP oder optimierte JPG/PNG verwenden.
- Dateinamen klein schreiben, ohne Leerzeichen, z. B. `living-room.webp` statt `Wohnzimmer Foto 1.jpg`.
- Bilder möglichst vorab komprimieren, weil sie direkt mit dem Docker-Image ausgeliefert werden.

### 3. Residence-Datei erstellen

Datei:

```txt
content/residences/beispielstrasse-01/_index.md
```

Template:

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
teaser: "Kurzer Text für Startseite und Übersichten."
highlights: ["Möbliert", "Gepflegte Wohnung", "Gute Anbindung"]
thumbnail: "/images/residences/beispielstrasse-01/living-room.webp"
images:
  - src: "/images/residences/beispielstrasse-01/living-room.webp"
    alt: "Wohnbereich der WG Beispielstraße"
    caption: "Gemeinschaftlicher Wohnbereich"
  - src: "/images/residences/beispielstrasse-01/kitchen.webp"
    alt: "Küche der WG Beispielstraße"
    caption: "Gemeinschaftsküche"
weight: 10
---

Ausführlicher Beschreibungstext für die Detailseite.

## Ausstattung

- möblierte WG-Zimmer
- gemeinschaftlich genutzte Küche
- gepflegtes Bad
- klare Informationen zu Mietrahmen und Verfügbarkeit
```

### 4. Thumbnail festlegen

Optional kann das Card-Thumbnail der Residence explizit gesetzt werden:

```yaml
thumbnail: "/images/residences/beispielstrasse-01/living-room.webp"
```

Wenn `thumbnail` fehlt, nutzt die Startseite automatisch das erste Bild aus `images`. Wenn weder `thumbnail` noch `images` gesetzt sind, bleibt die grafische Standardfläche sichtbar.

### 5. Ergebnis prüfen

Die Residence erscheint automatisch:

- als Card auf der Startseite
- unter `/residences/`
- als Detailseite unter `/residences/beispielstrasse-01/`

---

## How-to: Neues Zimmer anlegen

### 1. Zimmerbilder ablegen

Zimmerbilder kommen in denselben Bilderordner der Residence:

```txt
static/images/residences/beispielstrasse-01/room-a.webp
static/images/residences/beispielstrasse-01/room-a-desk.webp
static/images/residences/beispielstrasse-01/room-a-window.webp
```

Die öffentlichen URLs dazu lauten:

```txt
/images/residences/beispielstrasse-01/room-a.webp
/images/residences/beispielstrasse-01/room-a-desk.webp
/images/residences/beispielstrasse-01/room-a-window.webp
```

### 2. Zimmer-Datei erstellen

Datei:

```txt
content/residences/beispielstrasse-01/rooms/room-a.md
```

Template:

```yaml
---
title: "Zimmer A — hell und möbliert"
id: "beispielstrasse-01-room-a"
contentType: "room"
residenceId: "beispielstrasse-01"
status: "available"
size: "16 m²"
rent: "690 € warm"
teaser: "Kurzer Zimmertext für Startseite und Übersichten."
highlights: ["Bett", "Schreibtisch", "Schrank"]
thumbnail: "/images/residences/beispielstrasse-01/room-a.webp"
images:
  - src: "/images/residences/beispielstrasse-01/room-a.webp"
    alt: "Möbliertes Zimmer A in der WG Beispielstraße"
    caption: "Zimmer A"
  - src: "/images/residences/beispielstrasse-01/room-a-desk.webp"
    alt: "Schreibtischbereich in Zimmer A"
    caption: "Arbeitsbereich"
weight: 10
---

Details zum Zimmer, Ausstattung, Ablauf und Hinweise.

## Ausstattung

- Bett
- Schreibtisch
- Kleiderschrank
- Zugang zu Küche und Bad
```

### 3. Zimmer-Thumbnail festlegen

Optional kann auch das Card-Thumbnail eines Zimmers explizit gesetzt werden:

```yaml
thumbnail: "/images/residences/beispielstrasse-01/room-a.webp"
```

Wenn `thumbnail` fehlt, nutzt die Startseite und die Residence-Detailseite automatisch das erste Bild aus `images`. Wenn weder `thumbnail` noch `images` gesetzt sind, erscheint die Zimmer-Card ohne Bildbereich.

### 4. Residence-Verknüpfung prüfen

Wichtig ist diese Zeile:

```yaml
residenceId: "beispielstrasse-01"
```

Sie muss exakt zur Residence passen:

```yaml
id: "beispielstrasse-01"
```

Nur dann erscheint das Zimmer automatisch auf der Detailseite der zugehörigen Residence.

### 5. Ergebnis prüfen

Das Zimmer erscheint automatisch:

- als Card auf der Startseite
- unter der Residence-Detailseite `/residences/beispielstrasse-01/`
- als eigene Detailseite unter `/residences/beispielstrasse-01/rooms/room-a/`

---

## How-to: Zimmer als Entwurf anlegen

Datei z. B.:

```txt
content/residences/beispielstrasse-01/rooms/room-c.md
```

Frontmatter:

```yaml
---
title: "Zimmer C — interner Entwurf"
id: "beispielstrasse-01-room-c"
contentType: "room"
residenceId: "beispielstrasse-01"
status: "draft"
draft: true
size: "noch offen"
rent: "noch offen"
teaser: "Interner Entwurf."
weight: 30
---

Interne Notizen und spätere Beschreibung.
```

Nicht mit `--buildDrafts` bauen, wenn die Site veröffentlicht wird.

---

## Bilder: Wo genau ablegen?

Für Phase 1 gilt: alle Wohnungs- und Zimmerbilder liegen im Repo unter `static/images/residences/<residence-id>/`.

Beispiele:

```txt
static/images/residences/student-wg-01/living-room.svg
static/images/residences/student-wg-01/kitchen.svg
static/images/residences/student-wg-01/room-a.svg

static/images/residences/beispielstrasse-01/living-room.webp
static/images/residences/beispielstrasse-01/kitchen.webp
static/images/residences/beispielstrasse-01/room-a.webp
static/images/residences/beispielstrasse-01/room-b.webp
```

In der Frontmatter werden sie so referenziert:

```yaml
images:
  - src: "/images/residences/beispielstrasse-01/living-room.webp"
    alt: "Wohnbereich der WG Beispielstraße"
    caption: "Wohnbereich"
```

### Empfehlung für Bildtypen

- Residence/Gemeinschaft: `building.webp`, `entrance.webp`, `living-room.webp`, `kitchen.webp`, `bathroom.webp`
- Zimmer: `room-a.webp`, `room-a-desk.webp`, `room-a-window.webp`
- Optional Grundriss: `floor-plan.webp` oder `floor-plan.svg`

### Wichtig für SEO und Barrierefreiheit

Jedes Bild sollte ein gutes `alt` haben:

```yaml
alt: "Helles möbliertes Zimmer mit Bett, Schreibtisch und Fenster"
```

`caption` ist optional, aber empfohlen:

```yaml
caption: "Zimmer A mit Arbeitsbereich"
```

---

## Lokale Prüfung

Nach Änderungen:

```bash
docker compose build
docker compose up -d
curl http://127.0.0.1:13010/
```

Detailseiten direkt prüfen:

```bash
curl http://127.0.0.1:13010/residences/beispielstrasse-01/
curl http://127.0.0.1:13010/residences/beispielstrasse-01/rooms/room-a/
```

Optionaler automatischer Check:

```bash
python scripts/verify_detail_pages.py
```

## Checkliste vor Commit

- [ ] Residence liegt unter `content/residences/<residence-id>/_index.md`.
- [ ] Zimmer liegen unter `content/residences/<residence-id>/rooms/*.md`.
- [ ] Jede Residence hat `contentType: "residence"`.
- [ ] Jedes Zimmer hat `contentType: "room"`.
- [ ] `residenceId` jedes Zimmers passt exakt zur `id` der Residence.
- [ ] Bilder liegen unter `static/images/residences/<residence-id>/`.
- [ ] Optionales Card-Thumbnail ist über `thumbnail: "/images/residences/<residence-id>/<dateiname>"` gesetzt oder das erste `images`-Bild ist als Fallback geeignet.
- [ ] Jedes Bild hat ein sinnvolles `alt`.
- [ ] Status ist korrekt gesetzt.
- [ ] Entwürfe haben zusätzlich `draft: true`.
