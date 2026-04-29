#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"

checks = [
    (PUBLIC / "index.html", 'class="residenceCard cardLinkBlock" href=/residences/student-wg-01/', "homepage renders residence card as full-card link"),
    (PUBLIC / "index.html", 'class="roomCard cardLinkBlock" href=/rooms/student-wg-01-room-a/', "homepage renders room card as full-card link"),
    (PUBLIC / "index.html", "Details ansehen", "homepage keeps visible detail CTA text"),
    (PUBLIC / "css" / next((PUBLIC / "css").glob("main.min.*.css")).name, ".cardLinkBlock:hover", "CSS defines card hover effect"),
    (PUBLIC / "residences" / "student-wg-01" / "index.html", "detailGallery", "residence detail renders image gallery"),
    (PUBLIC / "residences" / "student-wg-01" / "index.html", "/images/residences/student-wg-01/living-room.svg", "residence detail includes configured image"),
    (PUBLIC / "rooms" / "student-wg-01-room-a" / "index.html", "detailGallery", "room detail renders image gallery"),
    (PUBLIC / "rooms" / "student-wg-01-room-a" / "index.html", "/images/residences/student-wg-01/room-a.svg", "room detail includes configured image"),
]

failures = []
for path, needle, label in checks:
    if not path.exists():
        failures.append(f"MISSING FILE for {label}: {path.relative_to(ROOT)}")
        continue
    text = path.read_text(encoding="utf-8")
    if needle not in text:
        failures.append(f"MISSING {label}: expected {needle!r} in {path.relative_to(ROOT)}")

if failures:
    print("Detail page verification failed:")
    for failure in failures:
        print(f"- {failure}")
    sys.exit(1)

print("Detail page verification passed")
