import { residences } from "../data/properties";

const statusLabel = {
  "available-soon": "Bald verfügbar",
  planned: "In Planung",
  occupied: "Aktuell belegt",
};

export default function Home() {
  return (
    <main>
      <section className="hero">
        <nav className="nav" aria-label="Hauptnavigation">
          <a className="brand" href="#top" aria-label="Plurum Residences Start">
            <img src="/plurum-logo-small.png" alt="Plurum Logo" />
            <span>Plurum Residences</span>
          </a>
          <div>
            <a href="#wohnen">Wohnen</a>
            <a href="#prozess">Prozess</a>
            <a href="#kontakt">Kontakt</a>
          </div>
        </nav>

        <div className="heroGrid" id="top">
          <div>
            <p className="eyebrow">Möbliert. Organisiert. Studierendenfreundlich.</p>
            <h1>Ein Wohn-Hub für moderne Studierenden-WGs.</h1>
            <p className="lead">
              Plurum Residences präsentiert möblierte WG-Zimmer mit klarer Kommunikation,
              gepflegten Bildern und einem einfachen Weg von der Anfrage bis zum Einzug.
            </p>
            <div className="actions">
              <a className="button primary" href="#wohnen">Wohnungen ansehen</a>
              <a className="button secondary" href="#kontakt">Interesse anmelden</a>
            </div>
          </div>
          <div className="logoCard" aria-label="Plurum Markenfläche">
            <img src="/plurum-logo.png" alt="Plurum Logo groß" />
          </div>
        </div>
      </section>

      <section className="section" id="wohnen">
        <p className="eyebrow">Residences</p>
        <h2>Wohnungen und WG-Zimmer</h2>
        <p className="sectionLead">
          Diese Fläche ist vorbereitet, um künftig Wohnungen, Zimmer, Bilder, Verfügbarkeiten
          und Bewerbungslinks redaktionell zu pflegen.
        </p>
        <div className="cards">
          {residences.map((residence) => (
            <article className="card" key={residence.id}>
              <span className="badge">{statusLabel[residence.status]}</span>
              <h3>{residence.title}</h3>
              <p>{residence.teaser}</p>
              <dl>
                <div><dt>Ort</dt><dd>{residence.city}</dd></div>
                <div><dt>Zimmer</dt><dd>{residence.rooms}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="section split" id="prozess">
        <div>
          <p className="eyebrow">Für Studierende</p>
          <h2>Vom ersten Eindruck zur passenden WG.</h2>
        </div>
        <ol className="steps">
          <li><strong>Entdecken</strong><span>Wohnungen mit Bildern, Ausstattung und Lageinformationen ansehen.</span></li>
          <li><strong>Anfragen</strong><span>Interesse hinterlassen und relevante Informationen strukturiert übermitteln.</span></li>
          <li><strong>Einziehen</strong><span>Klare Übergabe, saubere Kommunikation und ein gut vorbereitetes Zimmer.</span></li>
        </ol>
      </section>

      <section className="cta" id="kontakt">
        <p className="eyebrow">Plurum Holding Startpunkt</p>
        <h2>Plurum Residences ist der erste öffentliche Hub der Marke Plurum.</h2>
        <p>
          Gestartet wird mit möblierten WGs für Studierende. Die technische Basis soll später
          weitere Untertitel, Wohnangebote und redaktionelle Pflege unterstützen.
        </p>
        <a className="button primary" href="mailto:hello@plurum.de">Kontakt aufnehmen</a>
      </section>
    </main>
  );
}
