export type Residence = {
  id: string;
  title: string;
  city: string;
  district: string;
  rooms: number;
  status: "available-soon" | "planned" | "occupied";
  teaser: string;
  highlights: string[];
  availability: string;
};

export const residences: Residence[] = [
  {
    id: "student-wg-01",
    title: "Möblierte Studierenden-WG",
    city: "In Vorbereitung",
    district: "Campusnah geplant",
    rooms: 4,
    status: "available-soon",
    teaser:
      "Die ersten möblierten WG-Zimmer werden derzeit vorbereitet. Trage dich ein, um frühzeitig Informationen zu Lage, Ausstattung und Verfügbarkeit zu erhalten.",
    highlights: ["Möbliert", "Strukturierte Anfrage", "Gepflegte Wohnung"],
    availability: "Bald verfügbar",
  },
  {
    id: "student-wg-02",
    title: "Weitere Residences in Planung",
    city: "Weitere Städte",
    district: "Ausbau 2026",
    rooms: 3,
    status: "planned",
    teaser:
      "Plurum Residences wird schrittweise um neue Wohnungen ergänzt. Künftige Angebote sollen mit Bildern, Fakten und nächsten Schritten klar gepflegt werden.",
    highlights: ["Neue Zimmer", "Klare Fakten", "Früh vormerken"],
    availability: "In Planung",
  },
];
