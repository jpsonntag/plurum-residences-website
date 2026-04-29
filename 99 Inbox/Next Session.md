# Next Session

## Letzter Stand
- Plurum Residences Marketing ist eine Hugo-Static-Site mit Docker/Caddy Runtime.
- Produktive Domain ist `residences.plurum.de`; `plurum.de` kann optional darauf weiterleiten.
- Businessplan 2.0 wurde extrahiert und marketingrelevant ausgewertet; öffentliche Website-Copy ist stärker auf „Einfach einziehen. Besser ankommen.“, bezugsfertig vorbereitete WG-Zimmer, transparente Informationen und strukturierte Anfrage ausgerichtet.
- Der Marken-Dunkelton ist `#0D2829`.
- Der abgestimmte helle Ivory-/Weißton ist jetzt `#F4F1E8`; CSS und Hero-SVG sind konsistent darauf umgestellt.
- Wohnungsbilder werden im MVP statisch mit der Website ausgeliefert und im Docker-Build gebundelt.
- Lokale Verifikation war erfolgreich: `docker compose config`, `docker compose build`, `docker compose up -d`, lokale Seite `http://127.0.0.1:13010/`, HTML-Checks für neue Copy.

## Offene Richtungen
- Finale Inhalte: echte Wohnungs-/Zimmerdaten, finale Bilder/Assets und rechtliche Angaben ergänzen.
- Visuelle Feinabstimmung bei Bedarf im Browser gegen echte Assets prüfen.
- Später entscheiden, ob/wo eine dynamische App oder CMS/Admin-Strecke ergänzt wird.

## Nächster sinnvoller Einstieg
1. Finale Kontakt-E-Mail festlegen; Empfehlung bleibt `wohnen@plurum.de` plus Alias `residences@plurum.de`.
2. Echte Legal-Daten für Impressum/Datenschutz ergänzen und prüfen lassen.
3. Inhalte in `content/residences/` und `content/rooms/` mit echten Daten/Bildern weiter pflegen.
4. Design-Tokens in `assets/css/main.css` nur konsistent über `#0D2829` und `#F4F1E8` weiterentwickeln.

## Merksatz für den Wiedereinstieg
Marketing-Site ist technisch lauffähig, produktiv auf `residences.plurum.de` ausgerichtet und aus dem Businessplan heraus auf „Einfach einziehen. Besser ankommen.“ geschärft; nächster Hebel sind echte Legal-Daten, finale Kontakt-E-Mail, echte Wohnungs-/Zimmerdaten und finale Assets.
