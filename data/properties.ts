export type Residence = {
  id: string;
  title: string;
  city: string;
  rooms: number;
  status: "available-soon" | "planned" | "occupied";
  teaser: string;
};

export const residences: Residence[] = [
  {
    id: "demo-wg-01",
    title: "Möblierte Studierenden-WG",
    city: "In Vorbereitung",
    rooms: 4,
    status: "available-soon",
    teaser: "Ein sauber gepflegter Beispiel-Eintrag als Platzhalter, bis die ersten Wohnungen mit Bildern und Daten eingepflegt werden.",
  },
];
