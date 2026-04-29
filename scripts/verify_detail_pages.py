#!/usr/bin/env python3
from pathlib import Path
import os
import sys

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = Path(os.environ.get("PUBLIC_DIR", ROOT / "public")).resolve()
CSS = PUBLIC / "css" / next((PUBLIC / "css").glob("main.min.*.css")).name

checks = [
    (PUBLIC / "index.html", 'residenceCard cardLinkBlock', "homepage renders residence card as full-card link"),
    (PUBLIC / "index.html", 'class="roomCard cardLinkBlock" href=/residences/student-wg-01/rooms/room-a/', "homepage renders nested room-a card as full-card link"),
    (PUBLIC / "index.html", 'class="roomImage hasThumbnail"', "homepage renders room card thumbnail image area"),
    (PUBLIC / "index.html", "/images/residences/student-wg-01/", "homepage room card uses configured room thumbnail"),
    (PUBLIC / "index.html", "Details ansehen", "homepage keeps visible detail CTA text"),
    (PUBLIC / "index.html", 'class="roomCard cardLinkBlock isOccupied" href=/residences/student-wg-01/rooms/room-b/', "homepage renders occupied nested room-b card as greyed full-card link"),
    (PUBLIC / "index.html", "Aktuell belegt", "homepage shows occupied status label"),
    (PUBLIC / "residences" / "student-wg-01" / "rooms" / "room-b" / "index.html", "Zimmer B — belegt", "occupied nested room still has detail page"),
    (PUBLIC / "residences" / "student-wg-01" / "index.html", "Zimmer in dieser Residence", "residence detail lists rooms in this residence"),
    (PUBLIC / "residences" / "student-wg-01" / "index.html", 'class="roomCard cardLinkBlock" href=/residences/student-wg-01/rooms/room-a/', "residence detail links available nested room card"),
    (PUBLIC / "residences" / "student-wg-01" / "index.html", 'class="roomCard cardLinkBlock isOccupied" href=/residences/student-wg-01/rooms/room-b/', "residence detail links occupied nested room card greyed"),
    (PUBLIC / "residences" / "student-wg-01" / "rooms" / "room-a" / "index.html", "Teil von", "nested room detail shows residence context"),
    (PUBLIC / "residences" / "student-wg-01" / "rooms" / "room-a" / "index.html", "/residences/student-wg-01/", "nested room detail links back to residence"),
    (CSS, ".cardLinkBlock:hover", "CSS defines card hover effect"),
    (CSS, ".cardLinkBlock.isOccupied", "CSS defines occupied greyed card state"),
    (PUBLIC / "residences" / "student-wg-01" / "index.html", "detailGallery", "residence detail renders image gallery"),
    (PUBLIC / "residences" / "student-wg-01" / "index.html", "/images/residences/student-wg-01/", "residence detail includes configured image"),
    (PUBLIC / "residences" / "student-wg-01" / "rooms" / "room-a" / "index.html", "detailGallery", "nested room detail renders image gallery"),
    (PUBLIC / "residences" / "student-wg-01" / "rooms" / "room-a" / "index.html", "/images/residences/student-wg-01/room-a.svg", "nested room detail includes configured image"),
]

for old_path in [
    PUBLIC / "rooms" / "student-wg-01-room-a" / "index.html",
    PUBLIC / "rooms" / "student-wg-01-room-b" / "index.html",
]:
    if old_path.exists():
        checks.append((old_path, "/residences/student-wg-01/rooms/", "old flat room URL redirects to nested URL"))

def display_path(path):
    try:
        return path.relative_to(ROOT)
    except ValueError:
        return path

failures = []
for path, needle, label in checks:
    if not path.exists():
        failures.append(f"MISSING FILE for {label}: {display_path(path)}")
        continue
    text = path.read_text(encoding="utf-8")
    if needle not in text:
        failures.append(f"MISSING {label}: expected {needle!r} in {display_path(path)}")

if failures:
    print("Detail page verification failed:")
    for failure in failures:
        print(f"- {failure}")
    sys.exit(1)

print("Detail page verification passed")
