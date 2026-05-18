# Plurum Residences Marketing Live-Readiness Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Die Plurum Residences Marketing-Website so vorbereiten, dass sie live gehen kann, neue Wohnungen/Zimmer leicht erweiterbar sind und die aktuell nicht benötigte „Residence Preview“ entfernt bzw. durch einen live-tauglichen Hero ersetzt wird.

**Architecture:** Die Website bleibt zunächst eine schlanke statische Next.js-Marketingseite. Wohnungen und Zimmer werden nicht in einem CMS umgesetzt, sondern als klar typisierte, redaktionell einfache Datenmodule im Repo gepflegt. Das hält den ersten Livegang schnell, stabil und agentenfreundlich; ein CMS/Admin-Bereich kann später auf dieser Datenstruktur aufbauen.

**Tech Stack:** Next.js 16, TypeScript, statische Daten in `data/`, globaler Caddy für SSL-Terminierung, Docker Compose für lokalen Betrieb.

---

## Current Context / Assumptions

- Projektpfad: `/home/hm-drax/projects/plurum-residences-marketing`
- Aktuelle Website läuft lokal über Docker/Caddy:
  - Container-Port: `3000`
  - Host-Port: `13010`
  - Caddy-Domain: `https://plurum-website.local.jpsonntag.dev`
- Die Seite hat bereits einen guten ersten visuellen Entwurf.
- Aktuelle Datenbasis liegt in `data/properties.ts` und enthält nur `residences`.
- Aktuelle Hero-Grafik nennt „Residence preview“ und simuliert eine Zimmer-/Residence-Preview. Laut JP wird das für den ersten Livegang nicht benötigt.
- Footer enthält Platzhalterlinks für Impressum/Datenschutz (`href="#"`). Für Livegang müssen echte rechtliche Seiten oder externe Ziel-URLs vorhanden sein.
- Kontakt läuft aktuell über `mailto:info@plurum.de`; die finale Kontaktadresse muss bestätigt werden.

## Live-Readiness Definition

Eine erste Version ist live-ready, wenn:

1. Die Startseite ohne Platzhalter, kaputte Links oder Preview-Versprechen auskommt.
2. Wohnungen/Zimmer über eine klar dokumentierte Datenstruktur ergänzt werden können.
3. Impressum, Datenschutz und Kontakt sauber verlinkt sind.
4. SEO-/Social-Metadata, Favicon/Icons und Basis-Performance stimmen.
5. Docker/Caddy-Laufzeit dokumentiert und reproduzierbar ist.
6. Build, Typecheck, Audit und ein HTTP/HTTPS-Smoke-Test erfolgreich laufen.

---

## Proposed Content/Data Model

Für den ersten Livegang reicht ein repo-basiertes Datenmodell statt CMS.

### Zielstruktur

- `data/residences.ts`
  - Eine Wohnung / Residence als Standort- oder Wohnungseinheit.
- `data/rooms.ts`
  - Einzelne Zimmer, referenzieren `residenceId`.
- `data/site.ts`
  - Kontakt, rechtliche Links, globale Brand-/SEO-Werte.

### Minimaler Typvorschlag

```ts
export type ResidenceStatus = "draft" | "planned" | "available-soon" | "active" | "paused" | "occupied";

export type Residence = {
  id: string;
  title: string;
  city: string;
  district: string;
  addressLabel?: string;
  status: ResidenceStatus;
  summary: string;
  highlights: string[];
  nearby?: string[];
  sortOrder: number;
};

export type RoomStatus = "draft" | "planned" | "available-soon" | "available" | "reserved" | "occupied";

export type Room = {
  id: string;
  residenceId: string;
  title: string;
  status: RoomStatus;
  rentLabel?: string;
  sizeLabel?: string;
  availableFromLabel?: string;
  furnished: boolean;
  summary: string;
  highlights: string[];
  sortOrder: number;
};
```

### Warum so?

- Neue Wohnungen können durch einen neuen Eintrag in `residences` ergänzt werden.
- Neue Zimmer können unabhängig ergänzt werden und verweisen auf `residenceId`.
- `draft` erlaubt Vorbereitung im Code, ohne öffentlich angezeigt zu werden.
- `sortOrder` verhindert Sortierlogik über Titel/Datum und macht redaktionelle Reihenfolge leicht.
- Bilder können später ergänzt werden, ohne das Grundmodell umzubauen.

---

## Task Plan

### Task 1: Live-Copy und Scope finalisieren

**Objective:** Klären und dokumentieren, was die erste Live-Version verspricht — ohne Residence Preview und ohne nicht vorhandene Funktionen.

**Files:**
- Modify: `docs/context/project-brief.md`
- Modify: `docs/delivery/status.md`
- Modify: `99 Inbox/Open Questions.md`

**Steps:**
1. In `docs/context/project-brief.md` den Live-Scope ergänzen:
   - Marketingseite für Plurum Residences
   - möblierte WG-Zimmer für Studierende
   - Anfragen über E-Mail oder später Formular
   - keine Detailseiten/Residence Preview im ersten Release
2. In `docs/delivery/status.md` eine „Live Readiness“-Sektion ergänzen.
3. In `99 Inbox/Open Questions.md` offene Business-Fragen sammeln:
   - finale Kontakt-E-Mail
   - Impressum-Daten
   - Datenschutztext/Anbieter
   - finale Domain
   - erste echte Wohnungen/Zimmer

**Verification:**
- `git diff -- docs/context/project-brief.md docs/delivery/status.md '99 Inbox/Open Questions.md'`
- Prüfen, dass keine Preview-/Detailseiten-Verpflichtung dokumentiert ist.

**Commit:**
```bash
git add docs/context/project-brief.md docs/delivery/status.md '99 Inbox/Open Questions.md'
git commit -m "docs: define live readiness scope"
```

---

### Task 2: Datenmodell für Residences und Rooms aufsetzen

**Objective:** Die aktuelle `data/properties.ts` in eine erweiterbare Struktur für Wohnungen und Zimmer überführen.

**Files:**
- Create: `data/residences.ts`
- Create: `data/rooms.ts`
- Create: `data/site.ts`
- Modify/Delete: `data/properties.ts`
- Modify: `app/page.tsx`

**Steps:**
1. `data/residences.ts` mit `Residence`-Typ und `residences`-Array anlegen.
2. `data/rooms.ts` mit `Room`-Typ und `rooms`-Array anlegen.
3. `data/site.ts` für globale Werte anlegen:
   - `brandName`
   - `contactEmail`
   - `legalLinks`
   - `seo`
4. In `app/page.tsx` Imports von `../data/properties` auf neue Module umstellen.
5. Nur öffentliche Einträge anzeigen:
   - Residences/Rooms mit `status !== "draft"`.
6. `data/properties.ts` entweder entfernen oder als Re-Export mit Deprecation-Kommentar belassen.

**Important Implementation Detail:**
- Keine dynamischen Detailseiten einführen.
- Die Startseite zeigt weiterhin Cards/Listen, aber als aggregierte Übersicht.
- Room Cards können unter einer Residence oder in einer flachen „Aktuelle Zimmer“-Sektion angezeigt werden.

**Verification:**
```bash
npm run typecheck
npm run build
```
Expected: beide erfolgreich.

**Commit:**
```bash
git add data app/page.tsx
git commit -m "feat: structure residences and rooms content data"
```

---

### Task 3: Redaktionelle Anleitung zum Ergänzen neuer Wohnungen/Zimmer schreiben

**Objective:** JP bzw. Hermes-Agenten sollen neue Wohnungen/Zimmer ohne Code-Architekturwissen ergänzen können.

**Files:**
- Create: `docs/content/how-to-add-residences-and-rooms.md`
- Modify: `README.md`
- Modify: `ops/runbook.md`

**Steps:**
1. Anleitung erstellen mit:
   - Wo liegen die Daten?
   - Welche Felder sind Pflicht?
   - Wie ist `id` zu wählen? z. B. `muenster-altstadt-01`, `muenster-altstadt-01-room-a`
   - Welche Status gibt es?
   - Wie wird ein Zimmer versteckt? `status: "draft"`
   - Wie wird die Reihenfolge gesteuert? `sortOrder`
2. Copy-paste-fähige Beispiele für eine neue Residence und ein neues Zimmer ergänzen.
3. `README.md` mit Link auf diese Anleitung ergänzen.
4. `ops/runbook.md` um Live-Content-Update-Schritte ergänzen.

**Verification:**
- Dokumentation lesen und anhand der Anleitung mental einen neuen Raum ergänzen können.
- Optional testweise einen `draft`-Room ergänzen und wieder entfernen, um Typen zu prüfen.

**Commit:**
```bash
git add docs/content/how-to-add-residences-and-rooms.md README.md ops/runbook.md
git commit -m "docs: add residence and room content guide"
```

---

### Task 4: Residence Preview aus dem Hero entfernen

**Objective:** Die nicht benötigte Preview-Komponente aus dem ersten Live-Entwurf entfernen und durch einen glaubwürdigen Marken-/CTA-Hero ersetzen.

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

**Steps:**
1. In `app/page.tsx` die Texte `Residence preview` und die visuelle Preview-Logik im Hero entfernen.
2. Hero-Rechtsbereich ersetzen durch eine einfache live-taugliche Markenfläche, z. B.:
   - „Möblierte WG-Zimmer“
   - „Strukturierte Anfrage“
   - „Updates zu neuen Zimmern“
   - Logo/Brand-Card statt Raum-Illustration
3. CSS-Klassen für alte Preview-Elemente entfernen, falls nicht mehr genutzt:
   - `.roomScene`
   - `.windowGlow`
   - `.poster`
   - `.desk`
   - `.bed`
   - `.lamp`
   - Preview-spezifische Teile der `.availabilityCard`, sofern überflüssig
4. Mobile Layout prüfen.

**Verification:**
```bash
npm run typecheck
npm run build
```
Manual:
- `Residence preview` darf im HTML/Quelltext nicht mehr vorkommen.
- `curl -fsS http://127.0.0.1:13010/ | grep -i "Residence preview"` soll keinen Treffer liefern.

**Commit:**
```bash
git add app/page.tsx app/globals.css
git commit -m "feat: replace residence preview hero"
```

---

### Task 5: Rechtliche Mindestseiten und Footer-Links livefähig machen

**Objective:** Keine `href="#"`-Platzhalter im Livebetrieb; Impressum und Datenschutz müssen echte Ziele haben.

**Files:**
- Create: `app/impressum/page.tsx`
- Create: `app/datenschutz/page.tsx`
- Modify: `app/page.tsx`
- Modify: `data/site.ts`

**Steps:**
1. Platzhalterseiten für Impressum und Datenschutz anlegen, falls finale Texte noch fehlen.
2. Wenn finale Inhalte fehlen, sichtbar als „Angaben folgen vor Livegang“ markieren und diese Seiten nicht als live-ready abhaken.
3. Footer-Links auf `/impressum` und `/datenschutz` ändern.
4. Kontakt-Link aus `data/site.ts` ziehen statt hart codiert mehrfach `mailto:info@plurum.de` zu nutzen.

**Verification:**
```bash
npm run typecheck
npm run build
curl -fsSI http://127.0.0.1:13010/impressum
curl -fsSI http://127.0.0.1:13010/datenschutz
```
Expected: jeweils `200 OK` nach lokalem Start.

**Commit:**
```bash
git add app/impressum app/datenschutz app/page.tsx data/site.ts
git commit -m "feat: add legal pages and live footer links"
```

---

### Task 6: SEO, Metadata und Social Sharing finalisieren

**Objective:** Live-Seite mit sauberem Titel, Beschreibung, Open Graph und Basisicons ausstatten.

**Files:**
- Modify: `app/layout.tsx`
- Modify: `data/site.ts`
- Add/Modify: `public/*` icons as needed

**Steps:**
1. `data/site.ts` um `seo` erweitern:
   - title
   - description
   - siteUrl
   - ogImage optional
2. `app/layout.tsx` auf Next.js Metadata API prüfen und setzen:
   - `metadataBase`
   - `title`
   - `description`
   - `openGraph`
   - `robots`
3. Favicon/Apple Touch Icon prüfen bzw. aus Logo ableiten.
4. Falls kein OG-Bild vorhanden: für ersten Livegang entweder Logo-basiertes statisches OG-Bild erstellen oder `ogImage` bewusst offen lassen und in Open Questions notieren.

**Verification:**
```bash
npm run typecheck
npm run build
```
Manual:
- HTML enthält sinnvolle `<title>`/description.
- Keine localhost-URL in Live-Metadata, außer bewusst für lokale Entwicklung überschrieben.

**Commit:**
```bash
git add app/layout.tsx data/site.ts public
git commit -m "feat: finalize seo metadata"
```

---

### Task 7: Kontakt-CTA livefähig machen

**Objective:** Interessenten sollen sich zuverlässig melden können; für den ersten Livegang reicht Mailto, aber es muss konsistent und seriös sein.

**Files:**
- Modify: `data/site.ts`
- Modify: `app/page.tsx`
- Modify: `docs/delivery/status.md`

**Steps:**
1. Kontakt-E-Mail in `data/site.ts` zentralisieren.
2. Alle CTAs in `app/page.tsx` aus dieser Konfiguration generieren.
3. Optional einen klaren Mail-Betreff verwenden:
   - `mailto:...?...subject=Interesse%20an%20einem%20WG-Zimmer`
4. In `docs/delivery/status.md` notieren, dass Formular/CMS später kommen kann, aber nicht Teil des ersten Livegangs ist.

**Verification:**
- Suchlauf: `info@plurum.de` darf nur noch in `data/site.ts` oder gar nicht vorkommen.
- Alle CTA-Links zeigen auf dieselbe finale Adresse.

**Commit:**
```bash
git add data/site.ts app/page.tsx docs/delivery/status.md
git commit -m "feat: centralize contact call to action"
```

---

### Task 8: Docker/Caddy Runtime dokumentieren und absichern

**Objective:** Die aktuelle lokale Docker/Caddy-SSL-Terminierung reproduzierbar dokumentieren und Stolperfallen vermeiden.

**Files:**
- Modify: `README.md`
- Modify: `ops/runbook.md`
- Modify: `docker-compose.yml`
- Modify: `.env.example` if needed

**Steps:**
1. Dokumentieren:
   - Start: `WEB_PORT=13010 docker compose up -d --build`
   - Direkt: `http://127.0.0.1:13010`
   - Caddy: `https://plurum-website.local.jpsonntag.dev`
2. Erklären, warum `WEB_BIND=0.0.0.0` bei Dockerized Caddy nötig ist.
3. Optional `.env.example` ergänzen:
   ```env
   WEB_PORT=13010
   WEB_BIND=0.0.0.0
   ```
4. Hinweis ergänzen: Wenn Caddy direkt auf dem Host läuft, kann `WEB_BIND=127.0.0.1` genutzt werden.

**Verification:**
```bash
docker compose config >/dev/null
WEB_PORT=13010 docker compose up -d --build
curl -fsSI http://127.0.0.1:13010/
curl -kfsSI https://plurum-website.local.jpsonntag.dev/
```
Expected: jeweils `200 OK`.

**Commit:**
```bash
git add README.md ops/runbook.md docker-compose.yml .env.example
git commit -m "docs: document local docker caddy runtime"
```

---

### Task 9: Live-Readiness Checkliste ergänzen

**Objective:** Vor dem echten Livegang eine klare Go/No-Go-Liste haben.

**Files:**
- Create: `docs/delivery/live-readiness-checklist.md`
- Modify: `docs/delivery/status.md`

**Checklist Content:**

```md
# Live Readiness Checklist

## Content
- [ ] Finale Kontakt-E-Mail bestätigt
- [ ] Echte erste Residence-/Room-Daten eingetragen oder bewusst als „in Vorbereitung“ formuliert
- [ ] Keine nicht vorhandenen Funktionen versprochen
- [ ] Keine „Residence Preview“ im ersten Release

## Legal
- [ ] Impressum final
- [ ] Datenschutz final
- [ ] Footer-Links funktionieren

## Technical
- [ ] `npm run verify` erfolgreich
- [ ] `npm audit --audit-level=moderate` ohne relevante Findings
- [ ] Docker Build erfolgreich
- [ ] Lokaler HTTP-Smoke-Test erfolgreich
- [ ] Caddy HTTPS-Smoke-Test erfolgreich

## SEO/Sharing
- [ ] Title/Description gesetzt
- [ ] Open Graph geprüft
- [ ] Favicon geprüft

## Operations
- [ ] Domain/DNS final
- [ ] Caddy config final
- [ ] Rollback-Kommando dokumentiert
```

**Verification:**
- Checklist ist verständlich ohne Chat-Kontext.

**Commit:**
```bash
git add docs/delivery/live-readiness-checklist.md docs/delivery/status.md
git commit -m "docs: add live readiness checklist"
```

---

### Task 10: Abschlussverifikation vor Merge/Push

**Objective:** Sicherstellen, dass die Live-Vorbereitung technisch und inhaltlich konsistent ist.

**Files:**
- No planned file changes except fixes discovered during verification.

**Commands:**
```bash
npm run verify
npm audit --audit-level=moderate
docker compose config >/dev/null
WEB_PORT=13010 docker compose up -d --build
curl -fsSI http://127.0.0.1:13010/
curl -kfsSI https://plurum-website.local.jpsonntag.dev/
git status --short
```

**Expected:**
- Typecheck/build erfolgreich.
- Audit ohne moderate+ Findings.
- HTTP und HTTPS liefern `200 OK`.
- Keine unerwarteten untracked/modified Dateien.

**Commit/Push:**
```bash
git status --short
git log --oneline -5
git push origin main
```

---

## Files Likely To Change

- `app/page.tsx`
- `app/globals.css`
- `app/layout.tsx`
- `app/impressum/page.tsx`
- `app/datenschutz/page.tsx`
- `data/site.ts`
- `data/residences.ts`
- `data/rooms.ts`
- `data/properties.ts`
- `README.md`
- `ops/runbook.md`
- `docs/context/project-brief.md`
- `docs/delivery/status.md`
- `docs/delivery/live-readiness-checklist.md`
- `docs/content/how-to-add-residences-and-rooms.md`
- `99 Inbox/Open Questions.md`
- `.env.example`
- `docker-compose.yml`

---

## Risks / Tradeoffs

### Repo-Daten statt CMS

**Pro:** schnell, stabil, keine Admin-/Auth-Komplexität vor Livegang.  
**Contra:** JP ändert Inhalte nicht direkt per UI, sondern über Hermes/Git.

Empfehlung: Für ersten Livegang repo-basiert starten. CMS/Admin später, wenn echte regelmäßige Pflege nötig ist.

### Rechtliches

Impressum/Datenschutz dürfen nicht geraten werden. Wenn finale Texte fehlen, bleibt Livegang blockiert.

### Bilder

Das Datenmodell sollte Bilder später aufnehmen können, aber echte Bilder müssen für ersten Livegang nicht zwingend vorhanden sein, solange die Seite keine Bilder verspricht.

### Domain/SSL

Lokale Caddy-Domain funktioniert bereits. Für echten öffentlichen Livegang sind finale DNS-/Caddy-/Deployment-Ziele separat zu bestätigen.

---

## Open Questions for JP

1. Welche finale Kontaktadresse soll live genutzt werden?
2. Gibt es schon Impressum-/Datenschutzdaten oder sollen wir Platzhalterseiten vorbereiten und als Blocker markieren?
3. Welche erste echte Wohnung/Residence soll aufgenommen werden?
4. Sollen Preise/Größen/Verfügbarkeit schon öffentlich angezeigt werden oder erstmal nur „in Vorbereitung“?
5. Soll die echte Live-Domain später `plurum-website.local.jpsonntag.dev` bleiben, oder ist das nur lokal und öffentlich kommt eine andere Domain?
6. Soll ein Anfrageformular direkt in Release 1 rein, oder reicht Mailto für den ersten Livegang?

---

## Recommended Execution Order

1. Task 2 + Task 3: Datenstruktur und Pflegeanleitung.
2. Task 4: Residence Preview entfernen.
3. Task 5 + Task 7: Legal/Kontakt livefähig machen.
4. Task 6: SEO/Metadata.
5. Task 8 + Task 9: Runtime und Checkliste.
6. Task 10: Abschlussverifikation und Push.

Damit ist der nächste Implementierungsblock klar abgegrenzt und kann agentengetrieben umgesetzt werden.
