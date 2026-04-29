# Plurum Residences Marketing — Home

## Zweck

Öffentliche Marketing-Website für **Plurum Residences**, den ersten Plurum-Hub für möblierte Studierenden-WGs.

## Primäre Einstiegspunkte

- Produktkontext: `docs/context/project-brief.md`
- Delivery-Status: `docs/delivery/status.md`
- Content-Anleitung: `docs/content/how-to-add-residences-and-rooms.md`
- Nächste Session: [[99 Inbox/Next Session]]
- Offene Fragen: [[99 Inbox/Open Questions]]
- Runbook: `ops/runbook.md`

## Technische Baseline

- Hugo Static Site ohne Theme-Abhängigkeit
- Docker-Multistage-Build mit Hugo und Caddy
- Markdown-Content in `content/residences/<residence-id>/_index.md`, `content/residences/<residence-id>/rooms/*.md`, `content/impressum.md`, `content/datenschutz.md`
- Logo aus dem bestehenden Plurum-Residences/Plurum-Rent Repo übernommen

## Markenrichtung

Plurum soll perspektivisch als Holding mit mehreren Untertiteln wachsen. Diese Website präsentiert zuerst **Plurum Residences**.
