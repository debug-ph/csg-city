const fs   = require("fs");
const path = require("path");
const DB_FILE = path.join(__dirname, "db.json");

const DEFAULT_DATA = {
  "teilnehmer": [
    {
      "id": 1,
      "vorname": "Max",
      "nachname": "Mustermann",
      "name": "Max Mustermann",
      "rolle": "Präsident",
      "kontostand": 1250,
      "steuernummer": "CSG-0001"
    },
    {
      "id": 2,
      "vorname": "Lena",
      "nachname": "Schneider",
      "name": "Lena Schneider",
      "rolle": "Ministerin",
      "kontostand": 870.5,
      "steuernummer": "CSG-0002"
    },
    {
      "id": 3,
      "vorname": "Jonas",
      "nachname": "Weber",
      "name": "Jonas Weber",
      "rolle": "Bürger",
      "kontostand": 340,
      "steuernummer": "CSG-0003"
    },
    {
      "id": 4,
      "vorname": "Sophie",
      "nachname": "Braun",
      "name": "Sophie Braun",
      "rolle": "Richterin",
      "kontostand": 620,
      "steuernummer": "CSG-0004"
    },
    {
      "id": 5,
      "vorname": "Tim",
      "nachname": "Hoffmann",
      "name": "Tim Hoffmann",
      "rolle": "Polizist",
      "kontostand": 480,
      "steuernummer": "CSG-0005"
    },
    {
      "id": 6,
      "vorname": "Mia",
      "nachname": "Fischer",
      "name": "Mia Fischer",
      "rolle": "Lehrerin",
      "kontostand": 590,
      "steuernummer": "CSG-0006"
    },
    {
      "id": 7,
      "vorname": "Paul",
      "nachname": "Zimmermann",
      "name": "Paul Zimmermann",
      "rolle": "Bürger",
      "kontostand": 200,
      "steuernummer": "CSG-0007"
    },
    {
      "id": 8,
      "vorname": "Emma",
      "nachname": "Koch",
      "name": "Emma Koch",
      "rolle": "Journalistin",
      "kontostand": 310,
      "steuernummer": "CSG-0008"
    }
  ],
  "nachrichten": [
    {
      "id": 1,
      "titel": "Willkommen in CSG-City!",
      "inhalt": "Das offizielle Staatsportal von CSG-City ist jetzt online. Alle Bürger können sich hier informieren.",
      "datum": "2025-01-15"
    },
    {
      "id": 2,
      "titel": "Neue Steuerregeln ab Februar",
      "inhalt": "Der Staatsrat hat neue Steuersätze beschlossen. Details in der Verfassung unter §12.",
      "datum": "2025-01-20"
    },
    {
      "id": 3,
      "titel": "Parlamentssitzung verschoben",
      "inhalt": "Die nächste Sitzung findet am 5. Februar statt. Alle Abgeordneten sind pünktlich erscheinen.",
      "datum": "2025-01-22"
    }
  ],
  "termine": [
    {
      "id": 1,
      "titel": "Parlamentssitzung",
      "beschreibung": "Monatliche Vollversammlung aller Staatsvertreter",
      "datum": "2025-02-05"
    },
    {
      "id": 2,
      "titel": "Steuererklärung Frist",
      "beschreibung": "Abgabefrist für Einkommenserklärungen aller Bürger",
      "datum": "2025-02-15"
    },
    {
      "id": 3,
      "titel": "Bürgerforum",
      "beschreibung": "Offene Diskussion mit dem Staatsrat",
      "datum": "2025-02-20"
    },
    {
      "id": 4,
      "titel": "Nationalfeiertag",
      "beschreibung": "Festlichkeiten zur Staatsgründung von CSG-City",
      "datum": "2025-03-01"
    }
  ],
  "stellenangebote": [
    {
      "id": 1,
      "titel": "Stadtrat-Mitglied",
      "abteilung": "Staatsrat",
      "beschreibung": "Aktive Mitgestaltung der Stadtpolitik und Teilnahme an Sitzungen.",
      "lohnProH": 18.5,
      "offen": true
    },
    {
      "id": 2,
      "titel": "Staatsanwalt/-anwältin",
      "abteilung": "Justiz",
      "beschreibung": "Vertretung des Staates bei Gerichtsverfahren.",
      "lohnProH": 22,
      "offen": true
    },
    {
      "id": 3,
      "titel": "Steuerprüfer/-in",
      "abteilung": "Finanzministerium",
      "beschreibung": "Überprüfung von Steuererklärungen aller Bürger.",
      "lohnProH": 16.5,
      "offen": true
    },
    {
      "id": 4,
      "titel": "Polizeibeamter/-in",
      "abteilung": "Polizei",
      "beschreibung": "Aufrechterhaltung von Ordnung und Sicherheit.",
      "lohnProH": 15,
      "offen": true
    },
    {
      "id": 5,
      "titel": "Redakteur/-in",
      "abteilung": "Staatszeitung",
      "beschreibung": "Berichte für das offizielle Staatsblatt verfassen.",
      "lohnProH": 14,
      "offen": false
    },
    {
      "id": 6,
      "titel": "Richter/-in",
      "abteilung": "Justiz",
      "beschreibung": "Unabhängige Rechtsprechung im Staatsgericht.",
      "lohnProH": 24,
      "offen": true
    }
  ],
  "werbeflaechen": [
    {
      "id": 1,
      "name": "Sidebar oben",
      "groesse": "300×250",
      "preis": 5,
      "belegt": true,
      "mieter": "Bäckerei Müller",
      "kontakt": "mueller@csg.de",
      "beschreibung": "Sidebar oben rechts auf dem Dashboard.",
      "bildUrl": "",
      "slot": "dashboard_sidebar_1"
    },
    {
      "id": 2,
      "name": "Sidebar Mitte",
      "groesse": "300×250",
      "preis": 4,
      "belegt": false,
      "mieter": "",
      "kontakt": "",
      "beschreibung": "Sidebar Mitte rechts auf dem Dashboard.",
      "bildUrl": "",
      "slot": "dashboard_sidebar_2"
    },
    {
      "id": 3,
      "name": "Sidebar unten",
      "groesse": "300×250",
      "preis": 3.5,
      "belegt": false,
      "mieter": "",
      "kontakt": "",
      "beschreibung": "Sidebar unten rechts auf dem Dashboard.",
      "bildUrl": "",
      "slot": "dashboard_sidebar_3"
    },
    {
      "id": 4,
      "name": "Footer Leaderboard",
      "groesse": "728×90",
      "preis": 6,
      "belegt": true,
      "mieter": "IT-Solutions GmbH",
      "kontakt": "info@it-sol.de",
      "beschreibung": "Breiter Banner ganz unten auf dem Dashboard.",
      "bildUrl": "",
      "slot": "dashboard_footer"
    },
    {
      "id": 5,
      "name": "Stellen Inline 1",
      "groesse": "300×140",
      "preis": 4,
      "belegt": false,
      "mieter": "",
      "kontakt": "",
      "beschreibung": "Inline-Werbung zwischen Stellenangeboten (Pos. 1).",
      "bildUrl": "",
      "slot": "stellen_inline_1"
    },
    {
      "id": 6,
      "name": "Stellen Inline 2",
      "groesse": "300×140",
      "preis": 4,
      "belegt": false,
      "mieter": "",
      "kontakt": "",
      "beschreibung": "Inline-Werbung zwischen Stellenangeboten (Pos. 2).",
      "bildUrl": "",
      "slot": "stellen_inline_2"
    },
    {
      "id": 7,
      "name": "Stellen Inline 3",
      "groesse": "300×140",
      "preis": 4,
      "belegt": false,
      "mieter": "",
      "kontakt": "",
      "beschreibung": "Inline-Werbung zwischen Stellenangeboten (Pos. 3).",
      "bildUrl": "",
      "slot": "stellen_inline_3"
    },
    {
      "id": 8,
      "name": "Gesetze Sidebar",
      "groesse": "300x250",
      "preis": 4.5,
      "belegt": false,
      "mieter": "",
      "kontakt": "",
      "beschreibung": "Sidebar neben den Gesetzbuechern.",
      "bildUrl": "",
      "slot": "gesetze_sidebar"
    }
  ],
  "anfragen": [],
  "verfassung": {
    "titel": "Verfassung von CSG-City",
    "untertitel": "Das Grundgesetz unseres Staates",
    "inKraftSeit": "2025",
    "letzteAenderung": "Jul. 2026",
    "staatssiegel": "Gemeinsam stark – Gerechtigkeit für alle Bürger",
    "praembel": "Wir, die Bürgerinnen und Bürger von <strong>CSG-City</strong>, haben uns diese Verfassung gegeben.",
    "artikel": [],
    "gesetze": [
    {
      "id": 1,
      "titel": "Gesetzbuch zum Grenzschutz",
      "aktenzeichen": "GrenzSG-001",
      "status": "In Kraft",
      "kategorie": "grenze",
      "paragraphen": [
        { "id": "g1p1", "nr": "§ 1", "titel": "Ausweispflicht", "absaetze": [
          { "nr": "1.", "text": "Jeder Bürger muss seinen Personalausweis ausgestellt vom Pass-Registrierung und Außenministerium an der Grenze vorzeigen und erfolgreich einscannen lassen. Erst nach Zustimmung durch die Grenzpolizei darf der Bürger den Staat betreten. Bei Widersetzen kann der Bürger wegen Widersetzen gegen Grenzpolizisten angeklagt werden." },
          { "nr": "2.", "text": "Wenn ein Bürger seinen Personalausweis nicht vorzeigen kann, so ist dieser verpflichtet seinen Vor- und Nachnamen zu nennen. Die Grenzpolizei ist verpflichtet, die im System gespeicherten Daten mit dem Bürger abzugleichen. Wenn die Daten im System nicht mit denen des Bürgers übereinstimmen, so wird der Bürger wegen Täuschen eines Grenzpolizisten angeklagt. Sofern die Daten übereinstimmen, wird die individuelle PIN abgefragt." },
          { "nr": "3.", "text": "Im System ist eine Lichtbildaufnahme des Bürgers von dessen Gesicht gespeichert, sofern eine Einverständniserklärung der Erziehungsberechtigten des Bürgers vorliegt." }
        ]},
        { "id": "g1p2", "nr": "§ 2", "titel": "Registrieren von Besuchern", "absaetze": [
          { "nr": "1.", "text": "Besucher sind Personen, die den Staat betreten wollen oder sich im Staat aufhalten und keine Bürger sind." },
          { "nr": "2.", "text": "Den Besuchern wird eine Besucherkarte ausgehändigt. Es dürfen keine personenbezogenen Daten von Besuchern aufgenommen und gespeichert werden." },
          { "nr": "3.", "text": "Der Besucher kann bei einem illegalen Grenzübertritt und Täuschen eines Vollstreckungsbeamten angeklagt werden." }
        ]},
        { "id": "g1p3", "nr": "§ 3", "titel": "Grenzübertritte", "absaetze": [
          { "nr": "1.", "text": "Grenzübertritte dürfen nur an den offiziell gekennzeichneten und gültigen Grenzübergängen erfolgen. Andere Grenzübertritte werden als illegale Grenzübertritte geahndet." },
          { "nr": "2.", "text": "Die sogenannte Fast Lane darf nur mit einer offiziellen Berechtigung benutzt werden. Personen ohne diese Berechtigung müssen die Standard Lane benutzen. Die Höchstanzahl der Personen, welche berechtigt sind, die Fast Lane zu nutzen, beträgt 85." },
          { "nr": "3.", "text": "Beim eigentlichen Grenzübertritt sind §1 bzw. §2 dieses Gesetzbuches zu beachten." }
        ]},
        { "id": "g1p4", "nr": "§ 4", "titel": "Speichern der Daten", "absaetze": [
          { "nr": "1.", "text": "Folgende Daten eines Bürgers sind in einem internen, cloudbasierten System gespeichert: Name, Geburtsmonat und Geburtsjahr, Klasse, Allergien (optional), Recht zur Benutzung der Fastlane, gerichtliche Beschlüsse/Vorstrafen, individuelle PIN, Lichtbildaufnahme von Gesicht, individuelle Nummer, Eintritts- und Austrittszeitpunkt." },
          { "nr": "2.", "text": "Spätestens 3 Tage nach Ende der Projekttage werden alle Daten aus dem System gelöscht. Das Löschen kann auf 14 Tage herausgezögert werden, wenn behördliche Ermittlungen laufen, behördliche Prüfungen laufen oder ein richterlicher Beschluss vorliegt." },
          { "nr": "3.", "text": "Daten werden in einem verschlüsselten, cloudbasierten System gespeichert und nicht an Dritte weitergegeben. Beamte unterliegen einer Schweigepflicht." }
        ]},
        { "id": "g1p5", "nr": "§ 5", "titel": "Aushändigen und Gestaltung des Personalausweises", "absaetze": [
          { "nr": "1.", "text": "Die Personalausweise werden vom Pass-Registrierung und Außenministerium an das Schulpersonal und die Lehrer ausgehändigt. Den Klassenlehrern und Tutoren werden auch die Personalausweise ihrer Schüler übergeben." },
          { "nr": "2.", "text": "Zum Decken der Kosten für die Personalausweise wird eine Aushändigungsgebühr erhoben." },
          { "nr": "3.", "text": "Ist die Aushändigungsgebühr eines Bürgers am Anfang des zweiten Tages noch nicht eingegangen, so kann eine Steuer von umgerechnet 2 € berechnet werden." },
          { "nr": "4.", "text": "Der Hintergrund der Personalausweise kann von den Bürgern gestaltet werden. Die Maße müssen mindestens 58mm x 90mm betragen." },
          { "nr": "5.", "text": "Zusätzlich zu den Personalausweisen wird jedem Bürger eine individuelle PIN mitgeteilt. Diese hat sich der Bürger einzuprägen." }
        ]},
        { "id": "g1p6", "nr": "§ 6", "titel": "Verurteilen von Besuchern", "absaetze": [
          { "nr": "1.", "text": "Besucher dürfen angeklagt werden." },
          { "nr": "2.", "text": "Wenn ein Besucher bei der Verletzung der Hausordnung, Gesetze oder Verfassung ertappt wird, ist dieser vor Gericht anzuklagen. Es wird eine Personenbeschreibung angefertigt (geschätztes Alter, Geschlecht, Haarfarbe, Körpergröße, Augenfarbe, Statur, Hautfarbe, besondere Merkmale)." },
          { "nr": "3.", "text": "Gerichte dürfen bei Besuchern nur den Ausschluss aus dem Staat und ein dauerhaftes Einreiseverbot als Höchststrafe verhängen." }
        ]},
        { "id": "g1p7", "nr": "§ 7", "titel": "Zoll", "absaetze": [
          { "nr": "1.", "text": "Alle Zollbestimmungen sind im Gesetzbuch zu Finanzen aufzufinden." }
        ]},
        { "id": "g1p8", "nr": "§ 8", "titel": "Rechte und Besoldung der Grenzpolizei", "absaetze": [
          { "nr": "1.", "text": "Die Grenzpolizei ist zuständig für die Sicherheit an den Grenzen und stellt die ordnungsgemäßen Abläufe der Grenzkontrollen sicher." },
          { "nr": "2.", "text": "Es besteht eine Zusammenarbeit zwischen Polizei und Grenzpolizei, begrenzt auf den Austausch von internen Informationen und personenbezogenen Daten." },
          { "nr": "3.", "text": "In Ausnahmezuständen dürfen Polizei und Grenzpolizei gegenseitig Verstärkung anfordern." },
          { "nr": "6.", "text": "Es werden insgesamt 10 Bewerber als Grenzpolizisten ernannt. Zwei werden als Vorgesetzte ernannt. Bedingungen: Mindestens 7. Klasse, Verhaltensnote gut oder sehr gut." },
          { "nr": "8.", "text": "Grenzpolizisten haben das Recht, um Erlaubnis für eine Taschenkontrolle zu fragen. Wird sie abgelehnt, ist die Kontrolle untersagt." },
          { "nr": "9.", "text": "Die Grenzpolizei hat das Recht einen Bürger nach dem erfolgreichen Einscannen für maximal 5 Minuten an der Grenze aufzuhalten. Bei begründetem Tatverdacht darf der Bürger zur weiteren Befragung mitgenommen werden." },
          { "nr": "10.", "text": "Die Grenzpolizei muss bei einem Besucher sofort entscheiden, ob dieser das Recht hat den Staat zu betreten. Ein Besucher darf an der Grenze nicht aufgehalten werden." }
        ]},
        { "id": "g1p9", "nr": "§ 9", "titel": "Betriebszeiten und Gültigkeit", "absaetze": [
          { "nr": "1.", "text": "Dieses Gesetz gilt für alle Staatstage. Sonderregelungen gelten für den Aufbautag und den Abbautag." },
          { "nr": "2.", "text": "Sonderregelungen für den Aufbau- und Abbautag: §1, §2, §3, §6, §8 Absatz 9 und §8 Absatz 10 treten außer Kraft." },
          { "nr": "4.", "text": "Das Datum für den Aufbautag ist der 20.07.2026. Das Datum für den Abbautag wird durch eine Durchsage, durch den Klassenlehrer oder durch einen schriftlichen Informationszettel bekannt gegeben." },
          { "nr": "6.", "text": "Das Gesetz tritt mit seiner Verabschiedung im City-Rat in Kraft." }
        ]}
      ]
    },
    {
      "id": 2,
      "titel": "Gesetzbuch Gesundheitsamt",
      "aktenzeichen": "GesundSG-001",
      "status": "In Kraft",
      "kategorie": "hygiene",
      "paragraphen": [
        { "id": "g2p1", "nr": "§ 1", "titel": "Händehygiene", "absaetze": [
          { "nr": "(1)", "text": "Alle Personen, die mit Lebensmitteln oder Getränken arbeiten, sind verpflichtet, sich vor Arbeitsbeginn sowie regelmäßig während der Tätigkeit gründlich die Hände zu waschen oder zu desinfizieren." },
          { "nr": "(2)", "text": "Die Händehygiene ist insbesondere nach Toilettengängen, Pausen sowie nach dem Kontakt mit Geld durchzuführen." }
        ]},
        { "id": "g2p2", "nr": "§ 2", "titel": "Kleidung und Haare", "absaetze": [
          { "nr": "(1)", "text": "Beim Verkauf von Lebensmitteln ist saubere und hygienische Kleidung zu tragen." },
          { "nr": "(2)", "text": "Haare ab Schulterlänge müssen zusammengebunden oder durch eine geeignete Kopfbedeckung (z. B. Mütze oder Haarnetz) ausreichend abgedeckt sein." },
          { "nr": "(3)", "text": "Unhygienische oder stark verschmutzte Kleidung ist unzulässig." }
        ]},
        { "id": "g2p3", "nr": "§ 3", "titel": "Abdeckung von Speisen", "absaetze": [
          { "nr": "(1)", "text": "Lebensmittel und Getränke die über einen längeren Zeitraum gelagert werden, dürfen nicht ungeschützt offenstehen." },
          { "nr": "(2)", "text": "Sie sind durch geeignete Maßnahmen, wie Abdeckungen, Folien oder geschlossene Behälter, vor Verunreinigungen zu schützen." }
        ]},
        { "id": "g2p4", "nr": "§ 4", "titel": "Sauberkeit des Arbeitsplatzes", "absaetze": [
          { "nr": "(1)", "text": "Arbeitsplätze sind regelmäßig zu reinigen und hygienisch sauber zu halten." },
          { "nr": "(2)", "text": "Am Ende des Arbeitstages sind die Arbeitsplätze ordentlich zu hinterlassen." },
          { "nr": "(3)", "text": "Abfälle sind fachgerecht und hygienisch zu entsorgen." }
        ]},
        { "id": "g2p5", "nr": "§ 5", "titel": "Krankheit", "absaetze": [
          { "nr": "(1)", "text": "Personen mit ansteckenden Krankheitssymptomen, insbesondere Fieber, starkem Husten oder Magen-Darm-Beschwerden, dürfen nicht am Lebensmittelverkauf teilnehmen." }
        ]},
        { "id": "g2p6", "nr": "§ 6", "titel": "Erste Hilfe und Zuständigkeit", "absaetze": [
          { "nr": "(1)", "text": "Für Veranstaltungen stehen drei ausgebildete Erste-Hilfe-Personen zur Verfügung." },
          { "nr": "(2)", "text": "Der Einsatz sowie die räumliche Verteilung der Erste-Hilfe-Personen richten sich nach der Größe und Art der jeweiligen Veranstaltung." },
          { "nr": "(3)", "text": "Das Gesundheitsministerium ist für die Planung, Organisation und Einteilung der medizinischen Erstversorgung bei Veranstaltungen zuständig." },
          { "nr": "(4)", "text": "Es legt insbesondere den Einsatz sowie die räumliche Verteilung der Erste-Hilfe-Personen fest und ist berechtigt, Veranstaltungsanmeldungen zu verlangen sowie eine geschätzte Teilnehmerzahl abzufragen." }
        ]},
        { "id": "g2p7", "nr": "§ 7", "titel": "Hygienekontrollen", "absaetze": [
          { "nr": "(1)", "text": "Zur Überprüfung der Einhaltung dieser Verordnung werden mindestens drei Kontrollpersonen durch das Gesundheitsministerium bestimmt." },
          { "nr": "(2)", "text": "Die Kontrollpersonen sind berechtigt, Unternehmen und Verkaufsstände zu kontrollieren." },
          { "nr": "(3)", "text": "Festgestellte wesentliche Mängel sind von den Kontrollpersonen schriftlich zu dokumentieren." },
          { "nr": "(4)", "text": "Kleine oder vorübergehende Reinigungsaktionen müssen nicht dokumentiert werden." },
          { "nr": "(5)", "text": "Die Kontrollen umfassen insbesondere: die Einhaltung der Händehygiene, saubere Kleidung sowie ordnungsgemäß gebundene oder abgedeckte Haare, den Schutz und die Abdeckung der Lebensmittel, die Sauberkeit des Arbeitsplatzes, den Ausschluss erkrankter Personen vom Lebensmittelverkauf, die Organisation der Ersten Hilfe." }
        ]},
        { "id": "g2p8", "nr": "§ 8", "titel": "Kühlung und Lagerung", "absaetze": [
          { "nr": "(1)", "text": "Lebensmittel, die gekühlt gelagert werden müssen, sind durch geeignete Kühlgeräte oder Kühlboxen aufzubewahren." },
          { "nr": "(2)", "text": "Die Kühlkette darf während der Verkaufszeit nicht unnötig unterbrochen werden." },
          { "nr": "(3)", "text": "Verdorbene oder offensichtlich nicht mehr genießbare Lebensmittel dürfen nicht verkauft werden." }
        ]},
        { "id": "g2p9", "nr": "§ 9", "titel": "Eigenverantwortung der Unternehmen", "absaetze": [
          { "nr": "(1)", "text": "Unternehmen sind selbst dafür verantwortlich, die notwendigen Hygienemittel bereitzustellen." },
          { "nr": "(2)", "text": "Dazu gehören insbesondere: Reinigungsmittel, Müllbehälter, Desinfektionsmittel." }
        ]},
        { "id": "g2p10", "nr": "§ 10", "titel": "Interne Richtlinien für Kontrollpersonen", "absaetze": [
          { "nr": "(1)", "text": "Die Kontrollpersonen handeln nach internen Richtlinien des Gesundheitsministeriums." },
          { "nr": "(2)", "text": "Diese Richtlinien regeln insbesondere: den Ablauf der Kontrollen, die Bewertung von Hygienemängeln, die Dokumentation von Auffälligkeiten." }
        ]},
        { "id": "g2p11", "nr": "§ 11", "titel": "Hygieneverantwortliche Person", "absaetze": [
          { "nr": "(1)", "text": "Jeder Verkaufsstand benennt eine explizite Ansprechperson für die Kontrollpersonen." },
          { "nr": "(2)", "text": "Diese Person ist eindeutig erreichbar und zuständig für Fragen oder Hinweise während der Kontrolle." }
        ]},
        { "id": "g2p12", "nr": "§ 12", "titel": "Nutzung gefährlicher Gegenstände & Kontrolldokumentation", "absaetze": [
          { "nr": "(1)", "text": "Die Kontrollpersonen prüfen die korrekte Nutzung gefährlicher Gegenstände (z. B. scharfe Messer, Grillgeräte, Fritteusen) gemäß dem Gesetzbuch des Arbeitsministeriums." },
          { "nr": "(2)", "text": "Jeder Verkaufsstand/Unternehmen muss mindestens einmal während der Veranstaltung kontrolliert werden." },
          { "nr": "(3)", "text": "Gravierende Mängel oder Verstöße sind schriftlich zu dokumentieren und zusätzlich durch Fotos nachzuweisen." }
        ]}
      ]
    },
    {
      "id": 3,
      "titel": "Gesetz über die innere Sicherheit und Ordnung",
      "aktenzeichen": "SchulSiG-003",
      "status": "In Kraft",
      "kategorie": "sicherheit",
      "paragraphen": [
        { "id": "g3p1", "nr": "§ 1", "titel": "Zweck des Gesetzes", "absaetze": [
          { "nr": "(1)", "text": "Dieses Gesetz dient der Gewährleistung der öffentlichen Sicherheit und Ordnung im Schulstaat." },
          { "nr": "(2)", "text": "Es regelt Zuständigkeiten, Aufgaben und Befugnisse der Sicherheitsbehörden sowie deren Zusammenwirken." }
        ]},
        { "id": "g3p2", "nr": "§ 2", "titel": "Grundsätze der Sicherheitsverwaltung", "absaetze": [
          { "nr": "(1)", "text": "Die Aufgaben der inneren Sicherheit werden durch die zuständigen staatlichen Behörden im Rahmen der verfassungsmäßigen Ordnung wahrgenommen." },
          { "nr": "(2)", "text": "Die Gesamtverantwortung für die Sicherheitsverwaltung obliegt dem für innere Angelegenheiten zuständigen Ministerium." }
        ]},
        { "id": "g3p3", "nr": "§ 3", "titel": "Innenministerium", "absaetze": [
          { "nr": "(1)", "text": "Das Innenministerium ist oberste staatliche Behörde für die innere Sicherheit." },
          { "nr": "(2)", "text": "Es bestimmt die Richtlinien der Sicherheits- und Ordnungspolitik." },
          { "nr": "(3)", "text": "Es führt die Fach- und Dienstaufsicht über die Polizeibehörden." },
          { "nr": "(4)", "text": "Es kann Verwaltungsvorschriften, Dienstanweisungen und organisatorische Vorgaben erlassen." },
          { "nr": "(5)", "text": "Es kann Organisation, Zuständigkeiten und Strukturen der Polizei festlegen oder ändern." },
          { "nr": "(6)", "text": "In besonderen Lagen kann es unmittelbar steuernd in polizeiliche Maßnahmen eingreifen." },
          { "nr": "(7)", "text": "Es ist zuständig für die Bewertung und Auswertung polizeilicher Maßnahmen im Rahmen interner Prüfverfahren." }
        ]},
        { "id": "g3p4", "nr": "§ 4", "titel": "Aufsicht und Kontrolle", "absaetze": [
          { "nr": "(1)", "text": "Die Polizei unterliegt der Fach- und Dienstaufsicht des Innenministeriums." },
          { "nr": "(2)", "text": "Das Innenministerium sowie der City-Rat können jederzeit auf Anfrage Berichte anfordern sowie Vorgänge einsehen." },
          { "nr": "(3)", "text": "Prüfungen und Kontrollen können jederzeit, auch unangekündigt, erfolgen." },
          { "nr": "(4)", "text": "Die Ergebnisse sind Grundlage für dienstliche und organisatorische Entscheidungen." }
        ]},
        { "id": "g3p5", "nr": "§ 5", "titel": "Stellung der Polizei", "absaetze": [
          { "nr": "(1)", "text": "Die Polizei ist die Vollzugsbehörde der inneren Sicherheit." },
          { "nr": "(2)", "text": "Sie handelt im Rahmen der Gesetze sowie der Vorgaben des Innenministeriums." },
          { "nr": "(3)", "text": "Sie berichtet regelmäßig und auf Anforderung an das Innenministerium." }
        ]},
        { "id": "g3p6", "nr": "§ 6", "titel": "Organisation der Polizei", "absaetze": [
          { "nr": "(1)", "text": "Aufbau, Gliederung und Führungsstruktur werden durch das Innenministerium bestimmt." },
          { "nr": "(2)", "text": "Ernennung, Versetzung und Abberufung von Leitungspersonal erfolgen durch das Innenministerium oder nach dessen Vorgaben." },
          { "nr": "(3)", "text": "Die Besoldung richtet sich nach einer festgelegten Besoldungstabelle." },
          { "nr": "(4)", "text": "Durch bestimmte Leistungen oder Aufgaben können Boni durch das Innenministerium verteilt werden." }
        ]},
        { "id": "g3p7", "nr": "§ 7", "titel": "Aufgaben der Polizei", "absaetze": [
          { "nr": "(1)", "text": "Abwehr von Gefahren für die öffentliche Sicherheit und Ordnung." },
          { "nr": "(2)", "text": "Durchsetzung der geltenden Rechtsvorschriften." },
          { "nr": "(3)", "text": "Verhinderung und Verfolgung von Regelverstößen." },
          { "nr": "(4)", "text": "Schutz von Personen, Einrichtungen und Sachwerten." },
          { "nr": "(5)", "text": "Wahrnehmung weiterer Vollzugsaufgaben nach Maßgabe der Gesetze." }
        ]},
        { "id": "g3p8", "nr": "§ 8", "titel": "Allgemeine Befugnisse", "absaetze": [
          { "nr": "(1)", "text": "Die Polizei kann die erforderlichen und verhältnismäßigen Maßnahmen zur Gefahrenabwehr und zur Durchsetzung der geltenden Regeln treffen." },
          { "nr": "(2)", "text": "Hierzu gehören insbesondere Identitätsfeststellungen, Platzverweise, Durchsuchungen, und Sicherstellungen." },
          { "nr": "(3)", "text": "Durchsuchungen benötigen einen Durchsuchungsbeschluss, ausgestellt von einem Richter oder dem Innenministerium. Falls dieser nicht vorliegt, dürfen Gegenstände (Taschen, etc.) beschlagnahmt werden, bis dieser genehmigt beziehungsweise nicht genehmigt wird. Gebäude/Räume dürfen abgesperrt werden, bis dieser genehmigt beziehungsweise nicht genehmigt wird." },
          { "nr": "(4)", "text": "Körperlicher Zwang ist nur zulässig, wenn eine unmittelbare Gefahr für andere Personen oder den Ablauf des Schulbetriebs besteht und mildere Mittel nicht ausreichen." }
        ]},
        { "id": "g3p8a", "nr": "§ 8a", "titel": "Zwangsmittel", "absaetze": [
          { "nr": "(1)", "text": "Die Polizei darf einfache Zwangsmittel anwenden, wenn dies zur Gefahrenabwehr erforderlich ist." },
          { "nr": "(2)", "text": "Handschellen dürfen verwendet werden, wenn eine Person sich aggressiv verhält oder andere gefährdet und mildere Mittel nicht ausreichen." },
          { "nr": "(3)", "text": "Die Anwendung ist zeitlich zu begrenzen und sofort zu beenden, sobald die Voraussetzungen entfallen." },
          { "nr": "(4)", "text": "Die Maßnahme ist zu dokumentieren." }
        ]},
        { "id": "g3p9", "nr": "§ 9", "titel": "Präventive Maßnahmen", "absaetze": [
          { "nr": "(1)", "text": "Maßnahmen können bereits bei tatsächlichen Anhaltspunkten einer drohenden Gefahr getroffen werden." },
          { "nr": "(2)", "text": "Diese sind zu dokumentieren und regelmäßig zu überprüfen." },
          { "nr": "(3)", "text": "Das Innenministerium kann hierzu verbindliche Vorgaben erlassen." }
        ]},
        { "id": "g3p10", "nr": "§ 10", "titel": "Identitätsfeststellung", "absaetze": [
          { "nr": "(1)", "text": "Die Polizei kann die Identität von Personen feststellen, wenn dies zur Gefahrenabwehr oder Strafverfolgung erforderlich ist." },
          { "nr": "(2)", "text": "Dies gilt insbesondere in Situationen mit erhöhtem Gefahrenpotenzial." },
          { "nr": "(3)", "text": "Maßnahmen sind auf das erforderliche Maß zu beschränken." }
        ]},
        { "id": "g3p11", "nr": "§ 11", "titel": "Freiheitsentziehende Maßnahmen", "absaetze": [
          { "nr": "(1)", "text": "Personen können vorübergehend in einem dafür vorgesehenen Raum untergebracht werden, wenn dies zur Gefahrenabwehr oder zur Sicherung eines Verfahrens erforderlich ist." },
          { "nr": "(2)", "text": "Eine Unterbringung gegen den Willen der Person ist nur zulässig, wenn eine unmittelbare Gefahr für andere besteht oder ein schwerer Regelverstoß vorliegt." },
          { "nr": "(3)", "text": "Die Maßnahme ist auf die kürzest mögliche Zeit zu beschränken." },
          { "nr": "(4)", "text": "Die betroffene Person ist über den Grund der Maßnahme zu informieren." },
          { "nr": "(5)", "text": "Die Maßnahme ist zu dokumentieren und dem zuständigen Gericht vorzulegen." }
        ]},
        { "id": "g3p11a", "nr": "§ 11a", "titel": "Rechte der betroffenen Person", "absaetze": [
          { "nr": "(1)", "text": "Jede betroffene Person hat das Recht auf eine faire Behandlung." },
          { "nr": "(2)", "text": "Sie darf nicht erniedrigt oder unverhältnismäßig behandelt werden." },
          { "nr": "(3)", "text": "Sie kann sich beim zuständigen Gericht über Maßnahmen beschweren." }
        ]},
        { "id": "g3p12", "nr": "§ 12", "titel": "Technische Mittel und Datenverarbeitung", "absaetze": [
          { "nr": "(1)", "text": "Die Polizei darf technische Systeme zur Unterstützung ihrer Aufgaben einsetzen." },
          { "nr": "(2)", "text": "Hierzu gehören insbesondere Videoüberwachung, digitale Auswertungssysteme und Datenanalyseverfahren." },
          { "nr": "(3)", "text": "Die Verarbeitung personenbezogener Daten ist nur zulässig, wenn sie erforderlich und verhältnismäßig ist und die Rechte der Bürgerinnen und Bürger gewahrt bleiben." },
          { "nr": "(4)", "text": "Der Zugriff auf Kommunikations- und Verkehrsdaten erfolgt nur nach gesetzlichen Vorgaben." },
          { "nr": "(5)", "text": "Näheres regelt das Innenministerium." }
        ]},
        { "id": "g3p13", "nr": "§ 13", "titel": "Zusammenarbeit der Sicherheitsbehörden", "absaetze": [
          { "nr": "(1)", "text": "Die Polizei arbeitet mit anderen Sicherheitsorganen eng zusammen." },
          { "nr": "(2)", "text": "Zuständigkeiten können zur effektiven Aufgabenerfüllung koordiniert werden." },
          { "nr": "(3)", "text": "Das Innenministerium regelt die Zusammenarbeit verbindlich." }
        ]},
        { "id": "g3p14", "nr": "§ 14", "titel": "Zusammenarbeit mit der Grenzpolizei", "absaetze": [
          { "nr": "(1)", "text": "Die Polizei arbeitet eng mit der Grenzpolizei zusammen." },
          { "nr": "(2)", "text": "Sie kann im gesamten Staatsgebiet einschließlich Grenzbereichen Maßnahmen der Gefahrenabwehr durchführen." },
          { "nr": "(3)", "text": "Sie kann Aufgaben der Grenzpolizei übernehmen, soweit dies erforderlich ist." },
          { "nr": "(4)", "text": "Die Grenzpolizei stellt erforderliche Informationen und Unterstützung bereit." },
          { "nr": "(5)", "text": "Näheres regelt das Innenministerium." }
        ]},
        { "id": "g3p15", "nr": "§ 15", "titel": "Besondere Gefahrenlagen", "absaetze": [
          { "nr": "(1)", "text": "Bei erheblichen Gefahren für die öffentliche Sicherheit können besondere Maßnahmen ergriffen werden." },
          { "nr": "(2)", "text": "Eine besondere Gefahrenlage liegt insbesondere vor, wenn die Funktionsfähigkeit der Sicherheitsstruktur beeinträchtigt sein könnte." },
          { "nr": "(3)", "text": "Die Feststellung erfolgt durch die zuständigen Stellen der Sicherheitsverwaltung." },
          { "nr": "(4)", "text": "Auch in besonderen Gefahrenlagen sind Maßnahmen nur zulässig, wenn sie erforderlich und verhältnismäßig sind." },
          { "nr": "(5)", "text": "Die Grundrechte der Bürger sind zu achten." }
        ]},
        { "id": "g3p16", "nr": "§ 16", "titel": "Erweiterte Maßnahmen", "absaetze": [
          { "nr": "(1)", "text": "Während besonderer Gefahrenlagen können polizeiliche Maßnahmen in erweitertem Umfang erfolgen." },
          { "nr": "(2)", "text": "Zuständigkeiten und Abläufe können vorübergehend angepasst werden." },
          { "nr": "(3)", "text": "Maßnahmen sind auf das erforderliche Maß zu beschränken." }
        ]},
        { "id": "g3p17", "nr": "§ 17", "titel": "Außergewöhnliche Lagen", "absaetze": [
          { "nr": "(1)", "text": "In außergewöhnlichen Lagen können Verfahren beschleunigt und Zuständigkeiten gebündelt werden." },
          { "nr": "(2)", "text": "Maßnahmen sind regelmäßig zu überprüfen und zu beenden, sobald die Lage es zulässt." }
        ]},
        { "id": "g3p18", "nr": "§ 18", "titel": "Verwaltungsvorschriften", "absaetze": [
          { "nr": "(1)", "text": "Das Innenministerium erlässt die zur Durchführung dieses Gesetzes erforderlichen Verwaltungsvorschriften." },
          { "nr": "(2)", "text": "Diese regeln insbesondere Verfahren, Zuständigkeiten und Einsatzstandards." }
        ]},
        { "id": "g3p19", "nr": "§ 19", "titel": "Änderungen des Gesetzes", "absaetze": [
          { "nr": "(1)", "text": "Änderungen werden durch den City-Rat beschlossen und treten mit Verkündung in Kraft." },
          { "nr": "(2)", "text": "Frühere Regelungen treten außer Kraft, soweit sie widersprechen." }
        ]},
        { "id": "g3p20", "nr": "§ 20", "titel": "Inkrafttreten", "absaetze": [
          { "nr": "(1)", "text": "Dieses Gesetz tritt mit Verkündung in Kraft." }
        ]}
      ]
    },
    {
      "id": 4,
      "titel": "Gesetzbuch zur Kultur",
      "aktenzeichen": "KulturSG-001",
      "status": "In Kraft",
      "kategorie": "kultur",
      "paragraphen": [
        { "id": "g4p1", "nr": "§ 1", "titel": "Allgemeine Bestimmungen", "absaetze": [
          { "nr": "(1)", "text": "Zur Förderung der kulturellen Mitgestaltung werden schulweite Wettbewerbe zur Gestaltung staatlicher Symbole und Dokumente durchgeführt." },
          { "nr": "(2)", "text": "Alle Schüler der Schule sind berechtigt, Entwürfe für die jeweiligen Wettbewerbe einzureichen — wichtig ist dabei, dass diese nicht gegen die Verfassung verstoßen." },
          { "nr": "(3)", "text": "Jeder Wettbewerb wird offen, transparent und demokratisch durchgeführt." },
          { "nr": "(4)", "text": "Die Entscheidung über die Gewinner erfolgt durch eine Volksabstimmung aller Schüler." },
          { "nr": "(5)", "text": "Das für Kultur zuständige Ministerium legt den Zeitpunkt der Durchführung der einzelnen Wettbewerbe eigenständig fest. Mit dem Inkrafttreten dieses Gesetzes erfolgt keine automatische Durchführung oder Abstimmung der Wettbewerbe." }
        ]},
        { "id": "g4p2", "nr": "§ 2", "titel": "Wettbewerb zum Personalausweisdesign", "absaetze": [
          { "nr": "(1)", "text": "Gegenstand dieses Wettbewerbs ist die Gestaltung des staatlichen Passes." },
          { "nr": "(2)", "text": "Vorgaben zur genauen Größe, zum Format und zu technischen Einzelheiten des Passes belaufen sich auf 1:1,55. Wichtig hierbei ist ausschließlich das Seitenverhältnis, die Größe kann auch erweitert werden." },
          { "nr": "(3)", "text": "Alle eingereichten Passdesigns werden gesammelt und der Schule vorgestellt." },
          { "nr": "(4)", "text": "Die Abstimmung über das endgültige Passdesign erfolgt per Volksabstimmung über die einzelnen Klassen." },
          { "nr": "(5)", "text": "Das Design mit den meisten Stimmen wird als offizielles Passdesign übernommen." }
        ]},
        { "id": "g4p3", "nr": "§ 3", "titel": "Wettbewerb zum Staatswappen", "absaetze": [
          { "nr": "(1)", "text": "Gegenstand dieses Wettbewerbs ist die Gestaltung des Staatswappens." },
          { "nr": "(2)", "text": "Alle Schüler sind zur Einreichung eines Wappenentwurfs berechtigt." },
          { "nr": "(3)", "text": "Die eingereichten Staatswappen werden gesammelt und der Schulgemeinschaft vorgestellt." },
          { "nr": "(4)", "text": "Die Entscheidung erfolgt durch eine Volksabstimmung über die einzelnen Klassen." },
          { "nr": "(5)", "text": "Das Wappen mit den meisten Stimmen wird zum offiziellen Staatswappen erklärt." }
        ]},
        { "id": "g4p4", "nr": "§ 4", "titel": "Wettbewerb zur Nationalhymne", "absaetze": [
          { "nr": "(1)", "text": "Gegenstand dieses Wettbewerbs ist die Auswahl oder Gestaltung der Nationalhymne." },
          { "nr": "(2)", "text": "Es können Texte, Melodien oder Kombinationen davon eingereicht werden." },
          { "nr": "(3)", "text": "Alle Vorschläge werden vorgestellt." },
          { "nr": "(4)", "text": "Die Entscheidung erfolgt per Volksabstimmung über die einzelnen Klassen." },
          { "nr": "(5)", "text": "Der Vorschlag mit den meisten Stimmen wird zur offiziellen Nationalhymne erklärt." }
        ]},
        { "id": "g4p5", "nr": "§ 5", "titel": "Preisvergabe", "absaetze": [
          { "nr": "(1)", "text": "Der Einreicher des jeweils gewinnenden Entwurfs erhält einen Preis als Anerkennung." },
          { "nr": "(2)", "text": "Art und Umfang des Preises sind zum Zeitpunkt dieses Gesetzbuches noch nicht festgelegt und werden zu einem späteren Zeitpunkt bestimmt." },
          { "nr": "(3)", "text": "Die Preisvergabe erfolgt nach offizieller Bekanntgabe des Abstimmungsergebnisses." }
        ]},
        { "id": "g4p6", "nr": "§ 6", "titel": "Schlussbestimmungen", "absaetze": [
          { "nr": "(1)", "text": "Alle durch Volksabstimmung beschlossenen Designs treten nach Verkündung in Kraft." },
          { "nr": "(2)", "text": "Offene Punkte, insbesondere zu Größen, Stückelungen und technischen Details, können durch ergänzende Regelungen festgelegt werden." }
        ]}
      ]
    },
    {
      "id": 5,
      "titel": "Finanzgesetzbuch",
      "aktenzeichen": "FinanzSG-001",
      "status": "In Kraft",
      "kategorie": "finanzen",
      "paragraphen": [
        { "id": "g5p1", "nr": "§ 1", "titel": "Allgemeines und gleiches Steuersystem", "absaetze": [
          { "nr": "(1)", "text": "Im Staatsgebiet wird ein allgemeines und gleiches Steuersystem für alle natürlichen Personen sowie Unternehmen eingeführt." },
          { "nr": "(2)", "text": "Jede natürliche Person ist verpflichtet, täglich zehn Prozent ihres Einkommens oder Lohnes an den Staat abzuführen." }
        ]},
        { "id": "g5p2", "nr": "§ 2", "titel": "Förderung von Start-up-Unternehmen", "absaetze": [
          { "nr": "(1)", "text": "Der Staat stellt finanzielle Förderungen und Zuschüsse für Start-up-Unternehmen bereit." },
          { "nr": "(2)", "text": "Die Vergabe der Fördermittel erfolgt in Zusammenarbeit zwischen dem Finanzministerium und dem Wirtschaftsministerium." },
          { "nr": "(3)", "text": "Unternehmen, die sich vollständig oder teilweise im Besitz von Politikern befinden, sind von der staatlichen Förderung ausgeschlossen." }
        ]},
        { "id": "g5p3", "nr": "§ 3", "titel": "Abschaffung von Einkommens- und Gewinnobergrenzen", "absaetze": [
          { "nr": "(1)", "text": "Sämtliche Obergrenzen für Unternehmensgewinne werden aufgehoben." },
          { "nr": "(2)", "text": "Ebenso werden alle Obergrenzen für Einkommen und Löhne natürlicher Personen abgeschafft." }
        ]},
        { "id": "g5p4", "nr": "§ 4", "titel": "Unabhängige Wirtschaftsprüfung", "absaetze": [
          { "nr": "(1)", "text": "Zur Kontrolle wirtschaftlicher Tätigkeiten werden unabhängige Wirtschaftsprüfer ernannt." },
          { "nr": "(2)", "text": "Diese Wirtschaftsprüfer sind befugt, die Gewinne von Unternehmen zu überprüfen und deren Legalität festzustellen." },
          { "nr": "(3)", "text": "Die beauftragten Beamten sind berechtigt, täglich mehrere Unternehmen zu prüfen." }
        ]},
        { "id": "g5p5", "nr": "§ 5", "titel": "Grundsteuersystem", "absaetze": [
          { "nr": "(1)", "text": "Es wird ein Grundsteuersystem mit sechs unterschiedlichen Grundsteuersätzen eingeführt." },
          { "nr": "(2)", "text": "Die Höhe der Grundsteuer richtet sich nach der Lage des Grundstücks, insbesondere nach dem Stockwerk, sowie nach der Größe des Grundstücks." },
          { "nr": "(3)", "text": "Die Grundsteuer beträgt je nach Einstufung zwischen zehn und sechzig Einheiten der inländischen Währung." }
        ]},
        { "id": "g5p6", "nr": "§ 6", "titel": "Finanzprotokolle von Unternehmen", "absaetze": [
          { "nr": "(1)", "text": "Unternehmen sind verpflichtet, eigene Finanzprotokolle zu führen." },
          { "nr": "(2)", "text": "Die Finanzprotokolle müssen sämtliche Einnahmen, Ausgaben und Gewinne vollständig und wahrheitsgemäß dokumentieren." }
        ]},
        { "id": "g5p7", "nr": "§ 7", "titel": "Energiesteuer für Unternehmen", "absaetze": [
          { "nr": "(1)", "text": "Für Unternehmen, die Energie benötigen, wird ein einheitlicher Energiesteuersatz eingeführt." },
          { "nr": "(2)", "text": "Der Energiesteuersatz beträgt zehn Einheiten der Staatswährung pro Tag." }
        ]},
        { "id": "g5p8", "nr": "§ 8", "titel": "Zoll auf Lebensmittel und Getränke", "absaetze": [
          { "nr": "(1)", "text": "Auf Lebensmittel und Getränke für den Privatkonsum wird ein Zoll in Höhe von 50 Cent erhoben." },
          { "nr": "(2)", "text": "Von dieser Regelung ausgenommen sind Wasser, Sprudel sowie mitgebrachte eigene Flaschen." },
          { "nr": "(3)", "text": "Lebensmittel und Getränke, die für den Unternehmensgebrauch bestimmt sind, sind vom Zoll befreit." },
          { "nr": "(4)", "text": "Für Personen mit nachgewiesenen Allergien entfällt der Zoll gemäß Absatz 1." }
        ]},
        { "id": "g5p9", "nr": "§ 9", "titel": "Währungsumtausch und Wechselkurs", "absaetze": [
          { "nr": "(1)", "text": "Am ersten Tag besteht eine einmalige Pflicht zum Umtausch von zehn Euro in die inländische Währung." },
          { "nr": "(2)", "text": "Fünfzig Prozent des umgetauschten Betrags werden in inländischer Währung zurückerstattet." },
          { "nr": "(3)", "text": "Für jeden Umtausch von inländischer Währung in Euro wird eine Gebühr in Höhe von zehn Prozent erhoben." },
          { "nr": "(4)", "text": "Der Wechselkurs zwischen Euro und inländischer Währung beträgt eins zu zehn." }
        ]}
      ]
    }
  ]
  },
  "faq": [
    {
      "id": "grenzschutz",
      "kategorie": "Grenzschutz & Einreise",
      "icon": "building",
      "fragen": [
        {
          "frage": "Was brauche ich, um den Staat offiziell zu betreten?",
          "antwort": "Jeder Bürger muss seinen Personalausweis vorzeigen, der vom Pass-Registrierung- und Außenministerium ausgestellt wurde. Der Ausweis muss erfolgreich eingescannt werden. Erst nach Zustimmung durch die Grenzpolizei darf der Staat betreten werden."
        },
        {
          "frage": "Was passiert, wenn ich meinen Personalausweis vergessen habe?",
          "antwort": "Du bist verpflichtet, Vor- und Nachnamen zu nennen. Die Grenzpolizei gleicht deine Angaben mit dem System ab. Stimmen die Daten überein, wird die individuelle PIN abgefragt. Bei falschen Angaben droht eine Anklage wegen Täuschens eines Grenzpolizisten."
        },
        {
          "frage": "Wird ein Foto von mir bei der Kontrolle genutzt?",
          "antwort": "Aktuell (Stand 20.05.26) ist eine Hinterlegung eines Fotos nicht vorgesehen. Laut Gesetz ist es genehmigt – dies gilt jedoch nur mit Einverständniserklärung der Erziehungsberechtigten."
        },
        {
          "frage": "Wo darf ich die Grenze überqueren?",
          "antwort": "Der Grenzübertritt ist ausschließlich an offiziell gekennzeichneten und gültigen Grenzübergängen erlaubt. Jeder andere Grenzübergang wird als illegaler Grenzübertritt geahndet."
        },
        {
          "frage": "Wer darf die Fast Lane nutzen?",
          "antwort": "Die Fast Lane ist auf maximal 85 Personen limitiert. Berechtigt sind: alle Beamten (Berechtigung im System), Personen mit offiziellem Berechtigungsschreiben sowie Bürger, die eine Pauschalgebühr von 5 € bezahlt haben."
        },
        {
          "frage": "Was passiert bei unberechtigter Fast-Lane-Nutzung?",
          "antwort": "Wer keine Berechtigung hat, muss die Standard Lane benutzen. Bei unberechtigter Nutzung kann die Grenzpolizei eine mündliche Ermahnung aussprechen."
        },
        {
          "frage": "Welche Daten werden im System erfasst?",
          "antwort": "Im verschlüsselten, cloudbasierten System werden gespeichert: Name, Geburtsmonat/-jahr, Klasse, Fast-Lane-Berechtigung, Gerichtliche Beschlüsse/Vorstrafen, individuelle PIN, optional Foto (mit Einverständnis) und eine individuelle Nummer. Ein- und Austrittszeiten werden minutengenau aufgezeichnet."
        },
        {
          "frage": "Wann werden meine Daten gelöscht?",
          "antwort": "Alle Daten werden spätestens 3 Tage nach Ende der Projekttage gelöscht. Das Löschen kann auf bis zu 14 Tage verzögert werden, wenn behördliche Ermittlungen laufen oder ein richterlicher Beschluss vorliegt."
        },
        {
          "frage": "Darf die Grenzpolizei meine Taschen durchsuchen?",
          "antwort": "Nur mit ausdrücklicher mündlicher Einwilligung. Lehnst du die Kontrolle ab, ist es der Grenzpolizei absolut untersagt, die Tasche zu durchsuchen."
        },
        {
          "frage": "Wie lange darf ich an der Grenze aufgehalten werden?",
          "antwort": "Bei Bürgern: maximal 5 Minuten nach dem Einscannen. Bei begründetem Tatverdacht kann zur Befragung auf die Wache mitgenommen werden. Besucher dürfen gar nicht aufgehalten werden – die Grenzpolizei muss sofort entscheiden."
        },
        {
          "frage": "Kostet der Personalausweis Geld?",
          "antwort": "Die Gebühr ist in den eingesammelten 10 € enthalten. Ist sie zu Beginn des zweiten Projekttages noch nicht eingegangen, wird eine zusätzliche Steuer von 2 € berechnet."
        },
        {
          "frage": "Gelten die Grenzkontrollen auch am Aufbautag?",
          "antwort": "Nein. Am Aufbautag (20.07.2026) und Abbautag finden keine systematischen Grenzkontrollen statt. Die Grenzpolizei unterstützt den koordinierten Auf- und Abbau."
        }
      ]
    },
    {
      "id": "gesundheit",
      "kategorie": "Gesundheitsamt & Hygiene",
      "icon": "star",
      "fragen": [
        {
          "frage": "Muss ich mir die Hände waschen?",
          "antwort": "Ja. Vor Arbeitsbeginn und regelmäßig während der Arbeit – besonders nach Toilettengängen, Pausen oder Geldkontakt."
        },
        {
          "frage": "Darf ich mit offenen Haaren Essen verkaufen?",
          "antwort": "Nur wenn die Haare kurz sind. Haare ab Schulterlänge müssen zusammengebunden oder durch eine Kopfbedeckung (Mütze, Haarnetz) bedeckt sein."
        },
        {
          "frage": "Muss Essen abgedeckt werden?",
          "antwort": "Ja. Lebensmittel und Getränke, die länger gelagert werden, müssen durch Abdeckungen, Folien oder geschlossene Behälter vor Verunreinigungen geschützt werden."
        },
        {
          "frage": "Was passiert bei einem dreckigen Arbeitsplatz?",
          "antwort": "Es erfolgt eine Aufforderung zum Reinigen. Bei schwerwiegenden Verstößen wird es schriftlich dokumentiert und kann fotografisch nachgewiesen werden."
        },
        {
          "frage": "Muss ich nach dem Verkauf aufräumen?",
          "antwort": "Ja. Arbeitsplätze sind regelmäßig zu reinigen und am Ende des Arbeitstages ordentlich zu hinterlassen. Abfälle sind fachgerecht zu entsorgen."
        },
        {
          "frage": "Darf ich verkaufen, wenn ich krank bin?",
          "antwort": "Nein. Mit Fieber, starkem Husten oder Magen-Darm-Beschwerden darf nicht am Lebensmittelverkauf teilgenommen werden."
        },
        {
          "frage": "Gibt es Erste Hilfe auf Veranstaltungen?",
          "antwort": "Ja. Für Veranstaltungen stehen drei ausgebildete Erste-Hilfe-Personen zur Verfügung. Das Gesundheitsministerium koordiniert ihren Einsatz und räumliche Verteilung."
        },
        {
          "frage": "Wer kontrolliert die Hygieneregeln?",
          "antwort": "Mindestens drei Kontrollpersonen des Gesundheitsministeriums sind berechtigt, Unternehmen und Verkaufsstände zu kontrollieren."
        },
        {
          "frage": "Müssen kleine Fehler dokumentiert werden?",
          "antwort": "Nein. Kleine oder sofort behobene Probleme müssen nicht dokumentiert werden. Wesentliche Mängel hingegen sind schriftlich festzuhalten."
        },
        {
          "frage": "Müssen gekühlte Lebensmittel gekühlt bleiben?",
          "antwort": "Ja. Gekühlte Lebensmittel sind durch geeignete Kühlgeräte oder Kühlboxen aufzubewahren. Die Kühlkette darf nicht unnötig unterbrochen werden."
        },
        {
          "frage": "Dürfen verdorbene Lebensmittel verkauft werden?",
          "antwort": "Nein. Verdorbene oder offensichtlich nicht mehr genießbare Lebensmittel dürfen nicht verkauft werden."
        },
        {
          "frage": "Wer muss Hygienemittel besorgen?",
          "antwort": "Das Unternehmen bzw. der Verkaufsstand selbst ist verantwortlich für Reinigungsmittel, Müllbehälter und Desinfektionsmittel."
        },
        {
          "frage": "Braucht jeder Stand eine Ansprechperson?",
          "antwort": "Ja. Jeder Verkaufsstand benennt eine explizite Ansprechperson für die Kontrollpersonen. Diese muss während der Kontrolle eindeutig erreichbar sein."
        },
        {
          "frage": "Werden gefährliche Gegenstände kontrolliert?",
          "antwort": "Ja. Die Kontrollpersonen prüfen die korrekte Nutzung gefährlicher Gegenstände wie scharfe Messer, Grillgeräte oder Fritteusen."
        },
        {
          "frage": "Muss jeder Stand kontrolliert werden?",
          "antwort": "Ja. Jeder Verkaufsstand muss mindestens einmal während der Veranstaltung kontrolliert werden."
        }
      ]
    }
  ],
  "_nextId": {
    "teilnehmer": 9,
    "nachrichten": 4,
    "termine": 5,
    "stellenangebote": 7,
    "werbeflaechen": 9,
    "anfragen": 1,
    "gesetze": 6
  },
  "gesetze": [
    {
      "id": 1,
      "name": "Gesetzbuch zum Grenzschutz",
      "kurzname": "GrenzG",
      "ministerium": "Pass-Registrierungs- und Aussenministerium",
      "icon": "building",
      "version": "1.0",
      "_nextPid": 10,
      "paragraphen": [
        {
          "id": 1,
          "nummer": "§1",
          "titel": "Ausweispflicht",
          "absaetze": [
            "(1) Jeder Buerger muss seinen Personalausweis an der Grenze vorzeigen und erfolgreich einscannen lassen. Erst nach Zustimmung durch die Grenzpolizei darf der Buerger den Staat betreten.",
            "(2) Wenn ein Buerger seinen Ausweis nicht vorzeigen kann, muss er Vor- und Nachnamen nennen. Die Grenzpolizei gleicht die Daten ab. Bei Abweichung: Anklage. Bei Uebereinstimmung: PIN-Abfrage.",
            "(3) Eine Lichtbildaufnahme ist im System gespeichert, sofern eine Einverstaendniserklaerung der Erziehungsberechtigten vorliegt."
          ]
        },
        {
          "id": 2,
          "nummer": "§2",
          "titel": "Registrieren von Besuchern",
          "absaetze": [
            "(1) Besucher sind Personen, die den Staat betreten wollen oder sich dort aufhalten und keine Buerger sind.",
            "(2) Den Besuchern wird eine Besucherkarte ausgehaendigt. Es duerfen keine personenbezogenen Daten aufgenommen werden.",
            "(3) Der Besucher kann bei illegalem Grenzeubertritt und Taeuschen eines Beamten angeklagt werden."
          ]
        },
        {
          "id": 3,
          "nummer": "§3",
          "titel": "Grenzuebertritte",
          "absaetze": [
            "(1) Grenzuebertritte duerfen nur an offiziellen Grenzuebergaengen erfolgen. Andere Uebertritte gelten als illegal.",
            "(2) Die Fast Lane darf nur mit Berechtigung genutzt werden (max. 85 Personen). Berechtigt sind: Beamte (im System hinterlegt), Personen mit offiziellem Schreiben oder einer Pauschalgebuehr von 5 Euro.",
            "(3) Beim Grenzeubertritt sind §1 bzw. §2 zu beachten."
          ]
        },
        {
          "id": 4,
          "nummer": "§4",
          "titel": "Speichern der Daten",
          "absaetze": [
            "(1) Gespeichert werden: Name, Geburtsmonat/-jahr, Klasse, Allergien (optional), Fast-Lane-Berechtigung, Gerichtliche Beschluesse, individuelle PIN, Lichtbildaufnahme, individuelle Nummer, Ein- und Austrittszeitpunkt minutengenau.",
            "(2) Spaetestens 3 Tage nach Ende der Projekttage werden alle Daten geloescht. Verzoegerung auf 14 Tage moeglich bei laufenden Ermittlungen oder richterlichem Beschluss.",
            "(3) Daten werden verschluesselt gespeichert und nicht an Dritte weitergegeben. Beamte unterliegen der Schweigepflicht.",
            "(4) Ein vom Staat bestimmtes Unternehmen ist fuer die Datenverwaltung verantwortlich."
          ]
        },
        {
          "id": 5,
          "nummer": "§5",
          "titel": "Aushaendigen des Personalausweises",
          "absaetze": [
            "(1) Personalausweise werden vom Aussenministerium an Schulpersonal und Klassenlehrer ausgehaendigt.",
            "(2) Die Aushaendigungsgebuehr ist in der Gebuehr des Finanzministeriums (§9 Abs. 1) enthalten.",
            "(3) Ist die Gebuehr am Anfang des zweiten Tages nicht eingegangen, wird eine Steuer von 2 Euro erhoben.",
            "(4) Der Hintergrund des Ausweises wird per Volksabstimmung bestimmt. Mindestmasse: 58mm x 90mm.",
            "(5) Zusaetzlich wird jedem Buerger eine individuelle PIN mitgeteilt."
          ]
        },
        {
          "id": 6,
          "nummer": "§6",
          "titel": "Verurteilen von Besuchern",
          "absaetze": [
            "(1) Besucher duerfen angeklagt werden.",
            "(2) Bei Verstoss wird eine sachliche Personenbeschreibung angefertigt: Alter, Geschlecht, Haarfarbe, Koerpergroesse, Augenfarbe, Statur, Hautfarbe, besondere Merkmale.",
            "(3) Hoechststrafe: dauerhafter Ausschluss und Einreiseverbot.",
            "(4) Es muss immer ein Strafbefehl erlassen werden. Besucher haben das Recht, Einspruch zu erheben."
          ]
        },
        {
          "id": 7,
          "nummer": "§7",
          "titel": "Zoll",
          "absaetze": [
            "(1) Alle Zollbestimmungen sind im Gesetzbuch zu Finanzen aufzufinden."
          ]
        },
        {
          "id": 8,
          "nummer": "§8",
          "titel": "Rechte und Besoldung der Grenzpolizei",
          "absaetze": [
            "(1) Die Grenzpolizei ist zustaendig fuer die Sicherheit an den Grenzen.",
            "(2) Es besteht eine Zusammenarbeit mit der Polizei, begrenzt auf Informationsaustausch.",
            "(3) In Ausnahmezustaenden darf gegenseitig Verstaerkung angefordert werden.",
            "(4) Taschenkontrollen duerfen nur mit ausdruecklicher muendlicher Zustimmung durchgefuehrt werden.",
            "(5) Buerger koennen nach dem Einscannen maximal 5 Minuten aufgehalten werden. Bei Tatverdacht kann zur Befraguung mitgenommen werden.",
            "(6) 10 Grenzpolizisten werden ernannt (2 Vorgesetzte). Bedingungen: mind. 7. Klasse, Verhaltensnote gut oder sehr gut."
          ]
        },
        {
          "id": 9,
          "nummer": "§9",
          "titel": "Betriebszeiten und Gueltigkeit",
          "absaetze": [
            "(1) Dieses Gesetz gilt fuer alle Staatstage. Sonderregelungen gelten fuer Aufbautag (20.07.2026) und Abbautag.",
            "(2) An diesen Tagen finden keine systematischen Grenzkontrollen statt.",
            "(3) Das Gesetz tritt mit Verabschiedung im City-Rat in Kraft."
          ]
        }
      ]
    },
    {
      "id": 2,
      "name": "Gesetzbuch Gesundheitsamt",
      "kurzname": "GesundG",
      "ministerium": "Gesundheitsministerium",
      "icon": "star",
      "version": "1.0",
      "_nextPid": 13,
      "paragraphen": [
        {
          "id": 1,
          "nummer": "§1",
          "titel": "Haendehygiene",
          "absaetze": [
            "(1) Alle Personen, die mit Lebensmitteln arbeiten, muessen sich vor Arbeitsbeginn und regelmaessig die Haende waschen oder desinfizieren.",
            "(2) Dies gilt insbesondere nach Toilettengaengen, Pausen und Geldkontakt."
          ]
        },
        {
          "id": 2,
          "nummer": "§2",
          "titel": "Kleidung und Haare",
          "absaetze": [
            "(1) Beim Lebensmittelverkauf ist saubere, hygienische Kleidung zu tragen.",
            "(2) Haare ab Schulterlaenge muessen zusammengebunden oder durch eine Kopfbedeckung (Muetze, Haarnetz) abgedeckt sein.",
            "(3) Unhygienische Kleidung ist unzulaessig."
          ]
        },
        {
          "id": 3,
          "nummer": "§3",
          "titel": "Abdeckung von Speisen",
          "absaetze": [
            "(1) Lebensmittel und Getraenke, die laenger gelagert werden, duerfen nicht ungeschuetzt offenstehen.",
            "(2) Schutz durch Abdeckungen, Folien oder geschlossene Behaelter ist erforderlich."
          ]
        },
        {
          "id": 4,
          "nummer": "§4",
          "titel": "Sauberkeit des Arbeitsplatzes",
          "absaetze": [
            "(1) Arbeitsplaetze sind regelmaessig zu reinigen.",
            "(2) Am Ende des Arbeitstages sind die Arbeitsplaetze ordentlich zu hinterlassen.",
            "(3) Abfaelle sind fachgerecht zu entsorgen."
          ]
        },
        {
          "id": 5,
          "nummer": "§5",
          "titel": "Krankheit",
          "absaetze": [
            "(1) Personen mit ansteckenden Krankheitssymptomen (Fieber, starker Husten, Magen-Darm-Beschwerden) duerfen nicht am Lebensmittelverkauf teilnehmen."
          ]
        },
        {
          "id": 6,
          "nummer": "§6",
          "titel": "Erste Hilfe und Zustaendigkeit",
          "absaetze": [
            "(1) Fuer Veranstaltungen stehen drei ausgebildete Erste-Hilfe-Personen bereit.",
            "(2) Einsatz und Verteilung richten sich nach Groesse und Art der Veranstaltung.",
            "(3) Das Gesundheitsministerium ist fuer Planung und Organisation der medizinischen Erstversorgung zustaendig."
          ]
        },
        {
          "id": 7,
          "nummer": "§7",
          "titel": "Hygienekontrollen",
          "absaetze": [
            "(1) Mindestens drei Kontrollpersonen werden durch das Gesundheitsministerium bestimmt.",
            "(2) Sie sind berechtigt, Unternehmen und Verkaufsstaende zu kontrollieren.",
            "(3) Wesentliche Maengel sind schriftlich zu dokumentieren.",
            "(4) Kontrollinhalte: Haendehygiene, Kleidung, Lebensmittelschutz, Sauberkeit, Krankenausschluss, Erste Hilfe."
          ]
        },
        {
          "id": 8,
          "nummer": "§8",
          "titel": "Kuehlung und Lagerung",
          "absaetze": [
            "(1) Kuehlpflichtige Lebensmittel sind durch geeignete Kuehlgeraete oder Kuehlboxen aufzubewahren.",
            "(2) Die Kuehlkette darf nicht unnoetig unterbrochen werden.",
            "(3) Verdorbene Lebensmittel duerfen nicht verkauft werden."
          ]
        },
        {
          "id": 9,
          "nummer": "§9",
          "titel": "Eigenverantwortung der Unternehmen",
          "absaetze": [
            "(1) Unternehmen stellen selbst die noetigen Hygienemittel bereit: Reinigungsmittel, Muellbehaelter, Desinfektionsmittel."
          ]
        },
        {
          "id": 10,
          "nummer": "§10",
          "titel": "Interne Richtlinien fuer Kontrollpersonen",
          "absaetze": [
            "(1) Kontrollpersonen handeln nach internen Richtlinien des Gesundheitsministeriums (Ablauf, Bewertung, Dokumentation)."
          ]
        },
        {
          "id": 11,
          "nummer": "§11",
          "titel": "Hygieneverantwortliche Person",
          "absaetze": [
            "(1) Jeder Verkaufsstand benennt eine Ansprechperson fuer die Kontrollpersonen, die erreichbar und zustaendig ist."
          ]
        },
        {
          "id": 12,
          "nummer": "§12",
          "titel": "Gefaehrliche Gegenstaende und Kontrolldokumentation",
          "absaetze": [
            "(1) Kontrollpersonen pruefen korrekte Nutzung gefaehrlicher Gegenstaende (Messer, Grillgeraete, Fritteusen) gemaess Arbeitsministerium.",
            "(2) Jeder Verkaufsstand muss mindestens einmal kontrolliert werden.",
            "(3) Gravierende Maengel sind schriftlich und fotografisch zu dokumentieren."
          ]
        }
      ]
    },
    {
      "id": 3,
      "name": "Gesetz über die innere Sicherheit",
      "kurzname": "SchulSiG-003",
      "ministerium": "Innenministerium",
      "icon": "lock",
      "version": "003",
      "_nextPid": 21,
      "paragraphen": [
        { "id": 1,  "nummer": "§1",  "titel": "Zweck des Gesetzes", "absaetze": ["(1) Dieses Gesetz dient der Gewährleistung der öffentlichen Sicherheit und Ordnung im Schulstaat.", "(2) Es regelt Zuständigkeiten, Aufgaben und Befugnisse der Sicherheitsbehörden sowie deren Zusammenwirken."] },
        { "id": 2,  "nummer": "§2",  "titel": "Grundsätze der Sicherheitsverwaltung", "absaetze": ["(1) Die Aufgaben der inneren Sicherheit werden durch die zuständigen staatlichen Behörden im Rahmen der verfassungsmäßigen Ordnung wahrgenommen.", "(2) Die Gesamtverantwortung für die Sicherheitsverwaltung obliegt dem für innere Angelegenheiten zuständigen Ministerium."] },
        { "id": 3,  "nummer": "§3",  "titel": "Innenministerium", "absaetze": ["(1) Das Innenministerium ist oberste staatliche Behörde für die innere Sicherheit.", "(2) Es bestimmt die Richtlinien der Sicherheits- und Ordnungspolitik.", "(3) Es führt die Fach- und Dienstaufsicht über die Polizeibehörden.", "(4) Es kann Verwaltungsvorschriften, Dienstanweisungen und organisatorische Vorgaben erlassen.", "(5) Es kann Organisation, Zuständigkeiten und Strukturen der Polizei festlegen oder ändern.", "(6) In besonderen Lagen kann es unmittelbar steuernd in polizeiliche Maßnahmen eingreifen.", "(7) Es ist zuständig für die Bewertung und Auswertung polizeilicher Maßnahmen im Rahmen interner Prüfverfahren."] },
        { "id": 4,  "nummer": "§4",  "titel": "Aufsicht und Kontrolle", "absaetze": ["(1) Die Polizei unterliegt der Fach- und Dienstaufsicht des Innenministeriums.", "(2) Das Innenministerium sowie der City-Rat können jederzeit auf Anfrage Berichte anfordern sowie Vorgänge einsehen.", "(3) Prüfungen und Kontrollen können jederzeit, auch unangekündigt, erfolgen.", "(4) Die Ergebnisse sind Grundlage für dienstliche und organisatorische Entscheidungen."] },
        { "id": 5,  "nummer": "§5",  "titel": "Stellung der Polizei", "absaetze": ["(1) Die Polizei ist die Vollzugsbehörde der inneren Sicherheit.", "(2) Sie handelt im Rahmen der Gesetze sowie der Vorgaben des Innenministeriums.", "(3) Sie berichtet regelmäßig und auf Anforderung an das Innenministerium."] },
        { "id": 6,  "nummer": "§6",  "titel": "Organisation der Polizei", "absaetze": ["(1) Aufbau, Gliederung und Führungsstruktur werden durch das Innenministerium bestimmt.", "(2) Ernennung, Versetzung und Abberufung von Leitungspersonal erfolgen durch das Innenministerium oder nach dessen Vorgaben.", "(3) Die Besoldung richtet sich nach einer festgelegten Besoldungstabelle.", "(4) Durch bestimmte Leistungen oder Aufgaben können Boni durch das Innenministerium verteilt werden."] },
        { "id": 7,  "nummer": "§7",  "titel": "Aufgaben der Polizei", "absaetze": ["(1) Abwehr von Gefahren für die öffentliche Sicherheit und Ordnung.", "(2) Durchsetzung der geltenden Rechtsvorschriften.", "(3) Verhinderung und Verfolgung von Regelverstößen.", "(4) Schutz von Personen, Einrichtungen und Sachwerten.", "(5) Wahrnehmung weiterer Vollzugsaufgaben nach Maßgabe der Gesetze."] },
        { "id": 8,  "nummer": "§8",  "titel": "Allgemeine Befugnisse", "absaetze": ["(1) Die Polizei kann die erforderlichen und verhältnismäßigen Maßnahmen zur Gefahrenabwehr und zur Durchsetzung der geltenden Regeln treffen.", "(2) Hierzu gehören insbesondere Identitätsfeststellungen, Platzverweise, Durchsuchungen und Sicherstellungen.", "(3) Durchsuchungen benötigen einen Durchsuchungsbeschluss, ausgestellt von einem Richter oder dem Innenministerium. Falls dieser nicht vorliegt, dürfen Gegenstände beschlagnahmt und Räume abgesperrt werden, bis der Beschluss genehmigt oder abgelehnt wird.", "(4) Körperlicher Zwang ist nur zulässig, wenn eine unmittelbare Gefahr für andere Personen besteht und mildere Mittel nicht ausreichen."] },
        { "id": 9,  "nummer": "§8a", "titel": "Zwangsmittel", "absaetze": ["(1) Die Polizei darf einfache Zwangsmittel anwenden, wenn dies zur Gefahrenabwehr erforderlich ist.", "(2) Handschellen dürfen verwendet werden, wenn eine Person sich aggressiv verhält oder andere gefährdet und mildere Mittel nicht ausreichen.", "(3) Die Anwendung ist zeitlich zu begrenzen und sofort zu beenden, sobald die Voraussetzungen entfallen.", "(4) Die Maßnahme ist zu dokumentieren."] },
        { "id": 10, "nummer": "§9",  "titel": "Präventive Maßnahmen", "absaetze": ["(1) Maßnahmen können bereits bei tatsächlichen Anhaltspunkten einer drohenden Gefahr getroffen werden.", "(2) Diese sind zu dokumentieren und regelmäßig zu überprüfen.", "(3) Das Innenministerium kann hierzu verbindliche Vorgaben erlassen."] },
        { "id": 11, "nummer": "§10", "titel": "Identitätsfeststellung", "absaetze": ["(1) Die Polizei kann die Identität von Personen feststellen, wenn dies zur Gefahrenabwehr oder Strafverfolgung erforderlich ist.", "(2) Dies gilt insbesondere in Situationen mit erhöhtem Gefahrenpotenzial.", "(3) Maßnahmen sind auf das erforderliche Maß zu beschränken."] },
        { "id": 12, "nummer": "§11", "titel": "Freiheitsentziehende Maßnahmen", "absaetze": ["(1) Personen können vorübergehend in einem dafür vorgesehenen Raum untergebracht werden, wenn dies zur Gefahrenabwehr oder zur Sicherung eines Verfahrens erforderlich ist.", "(2) Eine Unterbringung gegen den Willen der Person ist nur zulässig, wenn eine unmittelbare Gefahr für andere besteht oder ein schwerer Regelverstoß vorliegt.", "(3) Die Maßnahme ist auf die kürzest mögliche Zeit zu beschränken.", "(4) Die betroffene Person ist über den Grund der Maßnahme zu informieren.", "(5) Die Maßnahme ist zu dokumentieren und dem zuständigen Gericht vorzulegen."] },
        { "id": 13, "nummer": "§11a","titel": "Rechte der betroffenen Person", "absaetze": ["(1) Jede betroffene Person hat das Recht auf eine faire Behandlung.", "(2) Sie darf nicht erniedrigt oder unverhältnismäßig behandelt werden.", "(3) Sie kann sich beim zuständigen Gericht über Maßnahmen beschweren."] },
        { "id": 14, "nummer": "§12", "titel": "Technische Mittel und Datenverarbeitung", "absaetze": ["(1) Die Polizei darf technische Systeme zur Unterstützung ihrer Aufgaben einsetzen.", "(2) Hierzu gehören insbesondere Videoüberwachung, digitale Auswertungssysteme und Datenanalyseverfahren.", "(3) Die Verarbeitung personenbezogener Daten ist nur zulässig, wenn sie erforderlich und verhältnismäßig ist und die Rechte der Bürgerinnen und Bürger gewahrt bleiben.", "(4) Der Zugriff auf Kommunikations- und Verkehrsdaten erfolgt nur nach gesetzlichen Vorgaben.", "(5) Näheres regelt das Innenministerium."] },
        { "id": 15, "nummer": "§13", "titel": "Zusammenarbeit der Sicherheitsbehörden", "absaetze": ["(1) Die Polizei arbeitet mit anderen Sicherheitsorganen eng zusammen.", "(2) Zuständigkeiten können zur effektiven Aufgabenerfüllung koordiniert werden.", "(3) Das Innenministerium regelt die Zusammenarbeit verbindlich."] },
        { "id": 16, "nummer": "§14", "titel": "Zusammenarbeit mit der Grenzpolizei", "absaetze": ["(1) Die Polizei arbeitet eng mit der Grenzpolizei zusammen.", "(2) Sie kann im gesamten Staatsgebiet einschließlich Grenzbereichen Maßnahmen der Gefahrenabwehr durchführen.", "(3) Sie kann Aufgaben der Grenzpolizei übernehmen, soweit dies erforderlich ist.", "(4) Die Grenzpolizei stellt erforderliche Informationen und Unterstützung bereit.", "(5) Näheres regelt das Innenministerium."] },
        { "id": 17, "nummer": "§15", "titel": "Besondere Gefahrenlagen", "absaetze": ["(1) Bei erheblichen Gefahren für die öffentliche Sicherheit können besondere Maßnahmen ergriffen werden.", "(2) Eine besondere Gefahrenlage liegt insbesondere vor, wenn die Funktionsfähigkeit der Sicherheitsstruktur beeinträchtigt sein könnte.", "(3) Die Feststellung erfolgt durch die zuständigen Stellen der Sicherheitsverwaltung.", "(4) Auch in besonderen Gefahrenlagen sind Maßnahmen nur zulässig, wenn sie erforderlich und verhältnismäßig sind.", "(5) Die Grundrechte der Bürger sind zu achten."] },
        { "id": 18, "nummer": "§16", "titel": "Erweiterte Maßnahmen", "absaetze": ["(1) Während besonderer Gefahrenlagen können polizeiliche Maßnahmen in erweitertem Umfang erfolgen.", "(2) Zuständigkeiten und Abläufe können vorübergehend angepasst werden.", "(3) Maßnahmen sind auf das erforderliche Maß zu beschränken."] },
        { "id": 19, "nummer": "§17", "titel": "Außergewöhnliche Lagen", "absaetze": ["(1) In außergewöhnlichen Lagen können Verfahren beschleunigt und Zuständigkeiten gebündelt werden.", "(2) Maßnahmen sind regelmäßig zu überprüfen und zu beenden, sobald die Lage es zulässt."] },
        { "id": 20, "nummer": "§18", "titel": "Verwaltungsvorschriften", "absaetze": ["(1) Das Innenministerium erlässt die zur Durchführung dieses Gesetzes erforderlichen Verwaltungsvorschriften.", "(2) Diese regeln insbesondere Verfahren, Zuständigkeiten und Einsatzstandards."] },
        { "id": 21, "nummer": "§19", "titel": "Änderungen des Gesetzes", "absaetze": ["(1) Änderungen werden durch den City-Rat beschlossen und treten mit Verkündung in Kraft.", "(2) Frühere Regelungen treten außer Kraft, soweit sie widersprechen."] },
        { "id": 22, "nummer": "§20", "titel": "Inkrafttreten", "absaetze": ["(1) Dieses Gesetz tritt mit Verkündung in Kraft."] }
      ]
    },
    {
      "id": 4,
      "name": "Gesetzbuch zur Kultur",
      "kurzname": "KulturG",
      "ministerium": "Kulturministerium",
      "icon": "star",
      "version": "1.0",
      "_nextPid": 7,
      "paragraphen": [
        { "id": 1, "nummer": "§1", "titel": "Allgemeine Bestimmungen", "absaetze": ["(1) Zur Förderung der kulturellen Mitgestaltung werden schulweite Wettbewerbe zur Gestaltung staatlicher Symbole und Dokumente durchgeführt.", "(2) Alle Schüler der Schule sind berechtigt, Entwürfe einzureichen — wichtig ist dabei, dass diese nicht gegen die Verfassung verstoßen.", "(3) Jeder Wettbewerb wird offen, transparent und demokratisch durchgeführt.", "(4) Die Entscheidung über die Gewinner erfolgt durch eine Volksabstimmung aller Schüler.", "(5) Das für Kultur zuständige Ministerium legt den Zeitpunkt der Durchführung eigenständig fest. Mit dem Inkrafttreten dieses Gesetzes erfolgt keine automatische Durchführung der Wettbewerbe."] },
        { "id": 2, "nummer": "§2", "titel": "Wettbewerb zum Personalausweisdesign", "absaetze": ["(1) Gegenstand dieses Wettbewerbs ist die Gestaltung des staatlichen Passes.", "(2) Das Seitenverhältnis des Passes muss 1:1,55 betragen. Die Größe kann erweitert werden, nur das Verhältnis ist maßgeblich.", "(3) Alle eingereichten Passdesigns werden gesammelt und der Schule vorgestellt.", "(4) Die Abstimmung über das endgültige Passdesign erfolgt per Volksabstimmung über die einzelnen Klassen.", "(5) Das Design mit den meisten Stimmen wird als offizielles Passdesign übernommen."] },
        { "id": 3, "nummer": "§3", "titel": "Wettbewerb zum Staatswappen", "absaetze": ["(1) Gegenstand dieses Wettbewerbs ist die Gestaltung des Staatswappens.", "(2) Alle Schüler sind zur Einreichung eines Wappenentwurfs berechtigt.", "(3) Die eingereichten Staatswappen werden gesammelt und der Schulgemeinschaft vorgestellt.", "(4) Die Entscheidung erfolgt durch eine Volksabstimmung über die einzelnen Klassen.", "(5) Das Wappen mit den meisten Stimmen wird zum offiziellen Staatswappen erklärt."] },
        { "id": 4, "nummer": "§4", "titel": "Wettbewerb zur Nationalhymne", "absaetze": ["(1) Gegenstand dieses Wettbewerbs ist die Auswahl oder Gestaltung der Nationalhymne.", "(2) Es können Texte, Melodien oder Kombinationen davon eingereicht werden.", "(3) Alle Vorschläge werden vorgestellt.", "(4) Die Entscheidung erfolgt per Volksabstimmung über die einzelnen Klassen.", "(5) Der Vorschlag mit den meisten Stimmen wird zur offiziellen Nationalhymne erklärt."] },
        { "id": 5, "nummer": "§5", "titel": "Preisvergabe", "absaetze": ["(1) Der Einreicher des jeweils gewinnenden Entwurfs erhält einen Preis als Anerkennung.", "(2) Art und Umfang des Preises werden zu einem späteren Zeitpunkt festgelegt.", "(3) Die Preisvergabe erfolgt nach offizieller Bekanntgabe des Abstimmungsergebnisses."] },
        { "id": 6, "nummer": "§6", "titel": "Schlussbestimmungen", "absaetze": ["(1) Alle durch Volksabstimmung beschlossenen Designs treten nach Verkündung in Kraft.", "(2) Offene Punkte, insbesondere zu Größen und technischen Details, können durch ergänzende Regelungen festgelegt werden."] }
      ]
    },
    {
      "id": 5,
      "name": "Finanzgesetzbuch",
      "kurzname": "FinanzG",
      "ministerium": "Finanzministerium",
      "icon": "coin",
      "version": "1.0",
      "_nextPid": 10,
      "paragraphen": [
        { "id": 1, "nummer": "§1", "titel": "Allgemeines und gleiches Steuersystem", "absaetze": ["(1) Im Staatsgebiet wird ein allgemeines und gleiches Steuersystem für alle natürlichen Personen sowie Unternehmen eingeführt.", "(2) Jede natürliche Person ist verpflichtet, täglich zehn Prozent ihres Einkommens oder Lohnes an den Staat abzuführen."] },
        { "id": 2, "nummer": "§2", "titel": "Förderung von Start-up-Unternehmen", "absaetze": ["(1) Der Staat stellt finanzielle Förderungen und Zuschüsse für Start-up-Unternehmen bereit.", "(2) Die Vergabe der Fördermittel erfolgt in Zusammenarbeit zwischen dem Finanzministerium und dem Wirtschaftsministerium.", "(3) Unternehmen, die sich vollständig oder teilweise im Besitz von Politikern befinden, sind von der staatlichen Förderung ausgeschlossen."] },
        { "id": 3, "nummer": "§3", "titel": "Abschaffung von Einkommens- und Gewinnobergrenzen", "absaetze": ["(1) Sämtliche Obergrenzen für Unternehmensgewinne werden aufgehoben.", "(2) Ebenso werden alle Obergrenzen für Einkommen und Löhne natürlicher Personen abgeschafft."] },
        { "id": 4, "nummer": "§4", "titel": "Unabhängige Wirtschaftsprüfung", "absaetze": ["(1) Zur Kontrolle wirtschaftlicher Tätigkeiten werden unabhängige Wirtschaftsprüfer ernannt.", "(2) Diese Wirtschaftsprüfer sind befugt, die Gewinne von Unternehmen zu überprüfen und deren Legalität festzustellen.", "(3) Die beauftragten Beamten sind berechtigt, täglich mehrere Unternehmen zu prüfen."] },
        { "id": 5, "nummer": "§5", "titel": "Grundsteuersystem", "absaetze": ["(1) Es wird ein Grundsteuersystem mit sechs unterschiedlichen Grundsteuersätzen eingeführt.", "(2) Die Höhe der Grundsteuer richtet sich nach der Lage des Grundstücks, insbesondere nach dem Stockwerk, sowie nach der Größe des Grundstücks.", "(3) Die Grundsteuer beträgt je nach Einstufung zwischen zehn und sechzig Einheiten der inländischen Währung."] },
        { "id": 6, "nummer": "§6", "titel": "Finanzprotokolle von Unternehmen", "absaetze": ["(1) Unternehmen sind verpflichtet, eigene Finanzprotokolle zu führen.", "(2) Die Finanzprotokolle müssen sämtliche Einnahmen, Ausgaben und Gewinne vollständig und wahrheitsgemäß dokumentieren."] },
        { "id": 7, "nummer": "§7", "titel": "Energiesteuer für Unternehmen", "absaetze": ["(1) Für Unternehmen, die Energie benötigen, wird ein einheitlicher Energiesteuersatz eingeführt.", "(2) Der Energiesteuersatz beträgt zehn Einheiten der Staatswährung pro Tag."] },
        { "id": 8, "nummer": "§8", "titel": "Zoll auf Lebensmittel und Getränke", "absaetze": ["(1) Auf Lebensmittel und Getränke für den Privatkonsum wird ein Zoll in Höhe von 50 Cent erhoben.", "(2) Von dieser Regelung ausgenommen sind Wasser, Sprudel sowie mitgebrachte eigene Flaschen.", "(3) Lebensmittel und Getränke, die für den Unternehmensgebrauch bestimmt sind, sind vom Zoll befreit.", "(4) Für Personen mit nachgewiesenen Allergien entfällt der Zoll gemäß Absatz 1."] },
        { "id": 9, "nummer": "§9", "titel": "Währungsumtausch und Wechselkurs", "absaetze": ["(1) Am ersten Tag besteht eine einmalige Pflicht zum Umtausch von zehn Euro in die inländische Währung.", "(2) Fünfzig Prozent des umgetauschten Betrags werden in inländischer Währung zurückerstattet.", "(3) Für jeden Umtausch von inländischer Währung in Euro wird eine Gebühr in Höhe von zehn Prozent erhoben.", "(4) Der Wechselkurs zwischen Euro und inländischer Währung beträgt eins zu zehn."] }
      ]
    }
  ]
};

function load() {
  if (!fs.existsSync(DB_FILE)) { fs.writeFileSync(DB_FILE, JSON.stringify(DEFAULT_DATA, null, 2)); return JSON.parse(JSON.stringify(DEFAULT_DATA)); }
  const d = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
  let changed = false;
  // Migrate: add werbeflaechen if missing
  if (!d.werbeflaechen) { d.werbeflaechen = DEFAULT_DATA.werbeflaechen; d._nextId.werbeflaechen = 4; changed = true; }
  // Migrate: add missing Gesetzbücher (ids 3–5: SchulSiG, Kultur, Finanzen)
  if (!d.gesetze) { d.gesetze = []; changed = true; }
  [3, 4, 5].forEach(function(bid) {
    if (!d.gesetze.find(function(g){ return g.id === bid; })) {
      var book = DEFAULT_DATA.gesetze.find(function(b){ return b.id === bid; });
      if (book) { d.gesetze.push(book); changed = true; }
    }
  });
  if (changed) save(d);
  return d;
}
function save(data) { fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2)); }

const db = {
  all(table)         { const d=load(); return [...(d[table]||[])].sort((a,b)=>a.id-b.id); },
  latest(table,n)    { const d=load(); return [...(d[table]||[])].sort((a,b)=>a.datum>b.datum?-1:1).slice(0,n||5); },
  oldest(table,n)    { const d=load(); return [...(d[table]||[])].sort((a,b)=>a.datum<b.datum?-1:1).slice(0,n||5); },
  insert(table,row)  { const d=load(); if(!d._nextId)d._nextId={}; const id=d._nextId[table]||1; d._nextId[table]=id+1; const r=Object.assign({id},row); if(!d[table])d[table]=[]; d[table].push(r); save(d); return r; },
  update(table,id,ch){ const d=load(); const i=d[table].findIndex(r=>r.id===Number(id)); if(i!==-1)d[table][i]=Object.assign({},d[table][i],ch); save(d); },
  delete(table,id)   { const d=load(); d[table]=d[table].filter(r=>r.id!==Number(id)); save(d); },
  findBuerger(vn,nn,sn) { return (load().teilnehmer||[]).find(t=>t.vorname.toLowerCase().trim()===vn.toLowerCase().trim()&&t.nachname.toLowerCase().trim()===nn.toLowerCase().trim()&&t.steuernummer.toLowerCase().trim()===sn.toLowerCase().trim())||null; }
};
db.getRaw  = load;
db.saveRaw = save;
module.exports = db;
