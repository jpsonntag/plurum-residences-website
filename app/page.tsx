import { residences } from "../data/properties";

const statusLabel = {
  "available-soon": "Bald verfügbar",
  planned: "In Planung",
  occupied: "Aktuell belegt",
};

const promises = [
  {
    title: "Möbliert einziehen",
    copy: "Zimmer mit sinnvoller Grundausstattung, damit der Start in Studium und Alltag leichter wird.",
  },
  {
    title: "Klar anfragen",
    copy: "Alle relevanten Angaben werden strukturiert aufgenommen — ohne endlose Nachrichtenschleifen.",
  },
  {
    title: "Verlässlich begleitet",
    copy: "Transparente Kommunikation vom ersten Interesse bis zur Übergabe.",
  },
];

const benefits = [
  ["01", "Klare Informationen", "Ausstattung, Lage, Status und Ablauf werden so früh wie möglich verständlich dargestellt."],
  ["02", "Bereit für den Alltag", "Möblierte Zimmer schaffen eine stabile Basis für Lernen, Leben und Ankommen."],
  ["03", "Gepflegte Wohnumgebung", "Der Fokus liegt auf ordentlich vorbereiteten Wohnungen statt anonymen Inseraten."],
  ["04", "Strukturierter Prozess", "Von der Anfrage bis zur Rückmeldung gibt es klare nächste Schritte."],
];

const steps = [
  ["Angebot entdecken", "Sieh dir verfügbare und kommende WG-Zimmer mit Ausstattung, Lageinformationen und Status an."],
  ["Interesse anmelden", "Übermittle deine Anfrage mit den wichtigsten Angaben zu dir, deinem Studienstart und deinem gewünschten Zeitraum."],
  ["Rückmeldung erhalten", "Wir prüfen die Anfrage und melden uns mit den nächsten Schritten — transparent und direkt."],
  ["Einziehen", "Wenn alles passt, erhältst du eine klare Übergabe und ein vorbereitetes Zimmer für deinen Start."],
];

export default function Home() {
  return (
    <main>
      <nav className="nav" aria-label="Hauptnavigation">
        <a className="brand" href="#top" aria-label="Plurum Residences Start">
          <img src="/plurum-logo-small.png" alt="Plurum Logo" />
          <span>Plurum Residences</span>
        </a>
        <div className="navLinks">
          <a href="#zimmer">Zimmer</a>
          <a href="#warum">Warum Plurum</a>
          <a href="#ablauf">Ablauf</a>
          <a className="navCta" href="mailto:hello@plurum.de">Interesse anmelden</a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="heroCopy">
          <p className="eyebrow">Möblierte WG-Zimmer für Studierende</p>
          <h1>Einfacher wohnen. Besser ankommen.</h1>
          <p className="lead">
            Plurum Residences vermittelt möblierte WG-Zimmer in gepflegten Wohnungen — mit klaren Informationen, strukturierter Anfrage und verlässlicher Kommunikation bis zum Einzug.
          </p>
          <div className="actions">
            <a className="button primary" href="#zimmer">Zimmer ansehen</a>
            <a className="button secondary" href="mailto:hello@plurum.de">Interesse anmelden</a>
          </div>
        </div>

        <div className="heroVisual" aria-label="Plurum Residences Markenerlebnis">
          <div className="visualTopline">
            <span>Residence preview</span>
            <span>2026</span>
          </div>
          <div className="roomScene">
            <div className="windowGlow" />
            <div className="poster"><img src="/plurum-logo-small.png" alt="" /></div>
            <div className="desk" />
            <div className="bed" />
            <div className="lamp" />
          </div>
          <div className="availabilityCard">
            <span className="pulse" />
            <div>
              <strong>Neue Zimmer in Vorbereitung</strong>
              <small>Frühzeitig vormerken und Updates erhalten</small>
            </div>
          </div>
        </div>
      </section>

      <section className="trustStrip" aria-label="Plurum Versprechen">
        {promises.map((promise) => (
          <article key={promise.title}>
            <strong>{promise.title}</strong>
            <span>{promise.copy}</span>
          </article>
        ))}
      </section>

      <section className="section residences" id="zimmer">
        <div className="sectionHeader">
          <p className="eyebrow">Residences</p>
          <h2>Aktuelle und kommende WG-Zimmer</h2>
          <p className="sectionLead">
            Hier findest du verfügbare und geplante Zimmer von Plurum Residences. Jedes Angebot wird mit Ausstattung, Lage, Status und nächsten Schritten übersichtlich dargestellt.
          </p>
        </div>

        <div className="cards residenceGrid">
          {residences.map((residence) => (
            <article className="residenceCard" key={residence.id}>
              <div className="residenceImage">
                <span>{residence.availability}</span>
              </div>
              <div className="residenceBody">
                <span className="badge">{statusLabel[residence.status]}</span>
                <h3>{residence.title}</h3>
                <p>{residence.teaser}</p>
                <dl>
                  <div><dt>Ort</dt><dd>{residence.city}</dd></div>
                  <div><dt>Rahmen</dt><dd>{residence.district}</dd></div>
                  <div><dt>Zimmer</dt><dd>{residence.rooms}</dd></div>
                </dl>
                <div className="chips">
                  {residence.highlights.map((highlight) => <span key={highlight}>{highlight}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="darkSection" id="warum">
        <div className="sectionHeader narrow">
          <p className="eyebrow light">Warum Plurum Residences</p>
          <h2>Mehr Überblick beim WG-Suchen.</h2>
          <p className="sectionLead lightLead">
            Ein Zimmer zu finden sollte nicht an unklaren Informationen, verstreuten Nachrichten oder fehlender Transparenz scheitern. Plurum Residences bündelt die wichtigsten Details und macht den Weg zur Anfrage einfacher.
          </p>
        </div>
        <div className="benefitGrid">
          {benefits.map(([num, title, copy]) => (
            <article className="benefit" key={title}>
              <span>{num}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section split" id="ablauf">
        <div>
          <p className="eyebrow">So funktioniert’s</p>
          <h2>Vom ersten Interesse bis zum Einzug — klar geführt.</h2>
          <p className="sectionLead">
            Der Ablauf ist bewusst einfach gehalten: schnell verstehen, ob ein Zimmer passt, Interesse anmelden und die nächsten Schritte sauber klären.
          </p>
        </div>
        <ol className="steps">
          {steps.map(([title, copy], index) => (
            <li key={title}>
              <span className="stepNum">{String(index + 1).padStart(2, "0")}</span>
              <strong>{title}</strong>
              <span>{copy}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="audience">
        <div className="audienceCopy">
          <p className="eyebrow">Gut zu wissen</p>
          <h2>Ein klarer Rahmen für den Start in einer neuen Stadt.</h2>
          <p>
            Plurum Residences richtet sich an Studierende, die ein möbliertes Zimmer in einer gut organisierten WG suchen. Transparente Informationen, strukturierte Abläufe und verlässliche Kommunikation machen den Prozess auch für Eltern nachvollziehbar.
          </p>
        </div>
        <div className="audiencePanels">
          <article>
            <h3>Für Studierende</h3>
            <ul>
              <li>möblierte Zimmer</li>
              <li>einfache Anfrage</li>
              <li>schneller Überblick</li>
              <li>weniger organisatorischer Aufwand</li>
            </ul>
          </article>
          <article>
            <h3>Auch für Eltern nachvollziehbar</h3>
            <ul>
              <li>transparenter Ablauf</li>
              <li>gepflegte Wohnumgebung</li>
              <li>klare Kommunikation</li>
              <li>seriöser Markenauftritt</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="cta" id="kontakt">
        <p className="eyebrow light">Interesse anmelden</p>
        <h2>Suchst du ein möbliertes WG-Zimmer?</h2>
        <p>
          Melde dich bei Plurum Residences, wenn du dich für aktuelle oder kommende Zimmer interessierst. Wir informieren dich über Verfügbarkeit, Ausstattung und die nächsten Schritte.
        </p>
        <a className="button primary lightButton" href="mailto:hello@plurum.de">Interesse anmelden</a>
      </section>

      <footer className="footer">
        <div>
          <img src="/plurum-logo-small.png" alt="Plurum Logo" />
          <strong>Plurum Residences</strong>
        </div>
        <nav aria-label="Footer">
          <a href="mailto:hello@plurum.de">Kontakt</a>
          <a href="#">Impressum</a>
          <a href="#">Datenschutz</a>
        </nav>
      </footer>
    </main>
  );
}
