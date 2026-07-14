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
  "nachrichten": [],
  "termine": [],
  "stellenangebote": [
    {
      "id": 1,
      "titel": "Bäcker/in, Verkäufer/in, Kellner/in",
      "abteilung": "Gastronomie",
      "schlagzeile": "Wir würden uns freuen wenn du bei uns arbeitest!",
      "beschreibung": "Wir verkaufen: Tee, Kaffee, Schokofrüchte, Bananen mit Cream, Limo, Crêpes, und Kuchen.",
      "lohnProH": 8,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Vania Rupp, Lissy Brändle",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 2,
      "titel": "Richter/in",
      "abteilung": "Behörde",
      "schlagzeile": "",
      "beschreibung": "Zuständig für alle straf- und zivilrechtlichen Verfahren im Schulstaat. Das Gericht entscheidet unabhängig über eingereichte Klagen.\n\nAufgaben:\n- Verhandlung und Entscheidung von Fällen\n- Anhörung von Beteiligten und Zeugen\n- Fällung von Urteilen nach Verfassung und Gesetzen\n- Sicherung von Fairness und Gerechtigkeit\n\nVoraussetzungen:\n- Mindestens 7. Klasse oder Lehrkraft\n- Verhaltensnote besser als 3\n- Keine Mitgliedschaft im City-Rat oder in der Regierung\n- Schriftliche Bewerbung und Eid auf die Verfassung\n- Fairness, Verantwortungsbewusstsein und Neutralität",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Charlotte Joos",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 3,
      "titel": "Ministeriumsangestellte/r – Gesundheitsministerium",
      "abteilung": "Behörde",
      "schlagzeile": "Übernimm Verantwortung und leite einen wichtigen Bereich des Gesundheitsministeriums!",
      "beschreibung": "Unterstütze den Gesundheitsminister bei der Organisation eines der drei Aufgabenbereiche des Gesundheitsministeriums. Als Ministeriumsangestellte/r übernimmst du die Verantwortung und sorgst dafür, dass dein Bereich während Schule als Staat reibungslos funktioniert.\n\nMögliche Aufgabenbereiche:\nErste Hilfe – Koordination der Erste-Hilfe-Beauftragten, Organisation von Einsätzen und Material.\nHygiene – Einteilung der Hygieneprüfer, Planung von Kontrollgängen und Dokumentation der Ergebnisse.\nAbfallentsorgung – Organisation der Abfallentsorgungsangestellten, Erstellung von Schichtplänen und Einteilung der Arbeitsbereiche.\n\nVoraussetzungen:\nZuverlässigkeit\nVerantwortungsbewusstsein\nOrganisationstalent\nBereitschaft, auch vor Beginn der SaS-Woche, bei der Planung\n\nDas erwartet dich:\nViel Verantwortung\nEinblick in die Leitung eines Ministeriums\nFaire Bezahlung\nDie Möglichkeit, aktiv zum Gelingen von Schule als Staat beizutragen",
      "lohnProH": 45,
      "lohnTyp": "woche",
      "offen": true,
      "kontakt": "Noel Fritz",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 4,
      "titel": "Ministeriumsangestellte/r Pass-Registrierungs und Außenministerium",
      "abteilung": "Behörde",
      "schlagzeile": "Einblicke in die reale Politik gelangen und das mit fairer und sicherer Bezahlung!",
      "beschreibung": "Hilf beim Pass- Registrierungs und Außenministerium aus! Diese Stelle ist ausschlaggebend für das Gelingen von Schule als Staat. Deshalb nicht zögern und direkt anfragen!\n\nDa es zwei Stellen gibt, gibt es auch zwei Aufgabenbereiche. Eine Stelle hat einen Aufgabenbereich:\n\nAufgaben im Außenbereich:\n- dem zuständigen Minister assistieren\n- Anfragen vom echten Landtag und Bundestagsabgeordneten beantworten\n- Bei Staatsbesuchen assistieren\n- Zusammenfassen wichtiger Informationen\n- helfen beim organisieren von Ressourcen für Staatsbesuche\n\nAufgaben im Pass- Registrierungsbereich:\n- dem zuständigen Minister assistieren\n- organisieren von Ressourcen für Grenzkontrollen\n- Kontakt mit beauftragten Schule als Staat Unternehmen halten\n- assistieren bei der Verteilen der Aufgaben an die Grenzpolizei\n\nAllgemeine Voraussetzungen für beide Stellen:\n- Flexibilität (die Arbeit geschieht vor der SaS Woche und in ihr selbst!)\n- Disziplin\n- Fähigkeit, Texte auf das wesentliche zusammenzufassen\n- Ehrlichkeit\n- Höflichkeit\n- bestimmtes Auftreten",
      "lohnProH": 45,
      "lohnTyp": "woche",
      "offen": true,
      "kontakt": "Nico Fischer",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 5,
      "titel": "Mitarbeiter/in beim Podcast \"Aufs Ohr\"",
      "abteilung": "Medien & Kultur",
      "schlagzeile": "Mach mit bei unserem Podcast",
      "beschreibung": "Werde Teil unseres Schulpodcasts \"Aufs Ohr\"!\n\nDu interessierst dich für Podcasts, Werbung, Gestaltung oder Medienarbeit? Dann mach mit bei \"Aufs Ohr\" und unterstütze unser Podcastteam!\n\nDu suchst passende Werbepartner, gestaltest Werbematerialien wie Plakate oder Social-Media-Beiträge und hilfst bei der Produktion neuer Podcast-Folgen. Dabei lernst du, wie man einen Podcast plant, bewirbt, aufnimmt und schneidet.\n\nWir bieten dir ein motiviertes Team, eine faire Bezahlung und die Möglichkeit, wichtige Fähigkeiten für Schule, Beruf und Alltag zu entwickeln.\n\nDu solltest mindestens in der 8. Klasse sein, gerne im Team arbeiten und Lust haben, eigene Ideen einzubringen.",
      "lohnProH": 0,
      "lohnTyp": "tag",
      "offen": true,
      "kontakt": "John Durben",
      "gewinnanteil": "variabel (Lohn umsatzabhängig)",
      "versteckt": false
    },
    {
      "id": 6,
      "titel": "Abfallentsorgungsangestellte/r – Gesundheitsministerium",
      "abteilung": "Behörde",
      "schlagzeile": "Sorge für saubere Zimmer und Gänge!",
      "beschreibung": "Sauberkeit ist ein wichtiger Bestandteil eines funktionierenden Staates. Deshalb suchen wir 20 engagierte Mitarbeiterinnen und Mitarbeiter für die Abfallentsorgung. Jeder Mitarbeiter wird einem festen Stockwerk oder Bereich zugeteilt und sorgt dort während des Tages für Ordnung.\n\nDu wirst:\n\nMüll in deinem Bereich einsammeln\nAbfälle zu den vorgesehenen Mülltonnen bringen\nAuf Sauberkeit achten\nBei Bedarf den Gesundheitsminister über Probleme informieren\n\nVoraussetzungen:\nZuverlässigkeit\nTeamfähigkeit\nEigenständiges Arbeiten\nKörperliche Belastbarkeit\nVerantwortungsbewusstsein\n\nDas erwartet dich:\nEin klar zugeteilter Arbeitsbereich\nFaire Bezahlung\nEin wichtiger Beitrag zum Gelingen von Schule als Staat",
      "lohnProH": 20,
      "lohnTyp": "woche",
      "offen": true,
      "kontakt": "Noel Fritz",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 7,
      "titel": "Buchhalter",
      "abteilung": "Behörde",
      "schlagzeile": "Du kannst gut mit Zahlen umgehen? Dann komm zu uns ins Team.",
      "beschreibung": "Als Buchhalter hast du unsere Finanzen im Blick.",
      "lohnProH": 2.5,
      "lohnTyp": "tag",
      "offen": true,
      "kontakt": "Julius Richter",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 8,
      "titel": "Putzkraft",
      "abteilung": "Gastronomie",
      "schlagzeile": "Putzen kann Spaß machen",
      "beschreibung": "Die Putzkraft tut den Boden kehren, die Tische abwischen und den Müll raus bringen.",
      "lohnProH": 3,
      "lohnTyp": "tag",
      "offen": true,
      "kontakt": "Julius Richter",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 9,
      "titel": "Techniker",
      "abteilung": "Technik",
      "schlagzeile": "Kein Techniker, kein Film!",
      "beschreibung": "Filme auswählen, starten und stoppen.\nWichtig ist das er sich mit Computer und Beamer auskennt. Außerdem ist Pünktlichkeit und Zuverlässigkeit notwendig.",
      "lohnProH": 2.5,
      "lohnTyp": "tag",
      "offen": true,
      "kontakt": "Julius Richter",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 10,
      "titel": "Verkäufer – Kino",
      "abteilung": "Handel & Verkauf",
      "schlagzeile": "Mach niemals die Rechnung ohne den Verkäufer",
      "beschreibung": "Verkauf von Tickets, Snacks und Getränke.\nWichtig ist Pünktlichkeit und Zuverlässigkeit.",
      "lohnProH": 2.5,
      "lohnTyp": "tag",
      "offen": true,
      "kontakt": "Julius Richter",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 11,
      "titel": "Polizei",
      "abteilung": "Behörde",
      "schlagzeile": "",
      "beschreibung": "Einsatz auf dem gesamten Gelände, regelmäßige Rundgänge und Kommunikation mit Bürgern und Behörden.\n\nAufgaben:\n- Überwachung der Einhaltung von Regeln und Gesetzen im Schulstaat\n- Streifengänge auf dem Schulgelände\n- Schlichtung von Konflikten\n- Unterstützung bei Veranstaltungen und Sicherheitsfragen\n- Dokumentation besonderer Vorfälle\n\nVoraussetzungen:\nZuverlässigkeit, Teamfähigkeit, souveränes Auftreten, Bereitschaft Konflikte ruhig zu lösen.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Jannis Burk",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 12,
      "titel": "Grenzpolizei",
      "abteilung": "Behörde",
      "schlagzeile": "",
      "beschreibung": "Arbeitsplatz an Grenzstationen mit stehender Tätigkeit und direktem Kontakt zu Bürgern.\n\nAufgaben:\n- Kontrolle von Ein- und Ausreisen\n- Prüfung von Ausweisen und Genehmigungen\n- Dokumentation von Grenzübertritten\n- Unterstützung der Polizei bei Sicherheitsfragen\n\nVoraussetzungen:\nMindestens Klasse 7, Verantwortungsbewusstsein, freundliches aber bestimmtes Auftreten.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Nico Fischer",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 13,
      "titel": "Bankangestellte",
      "abteilung": "Behörde",
      "schlagzeile": "",
      "beschreibung": "Tätigkeit in der Staatsbank, sitzende Tätigkeit mit Kundenkontakt und Verantwortung für Geldbestände.\n\nAufgaben:\n- Ausgabe und Annahme von Geld\n- Führung einfacher Konten\n- Dokumentation von Ein- und Auszahlungen\n- Beratung zu Währung und Bankfragen\n\nVoraussetzungen:\nSorgfältiges Arbeiten, Zuverlässigkeit, Grundverständnis für Zahlen und Geld.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Nico Schönfeld",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 14,
      "titel": "Wirtschaftsprüfer",
      "abteilung": "Behörde",
      "schlagzeile": "",
      "beschreibung": "Prüfungen in Unternehmen und Behörden des Schulstaats, Arbeit mit Unterlagen und Zahlen.\n\nAufgaben:\n- Kontrolle von Unternehmen und Behörden\n- Überprüfung von Einnahmen und Ausgaben\n- Aufdecken von Unregelmäßigkeiten\n- Erstellung kurzer Prüfberichte\n\nVoraussetzungen:\nGenauigkeit, mathematisches Verständnis, Verschwiegenheit.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Nico Schönfeld",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 15,
      "titel": "Gesundheitsamtangestellte",
      "abteilung": "Behörde",
      "schlagzeile": "",
      "beschreibung": "Kontrollen an verschiedenen Orten im Schulstaat mit engem Austausch zu Betrieben.\n\nAufgaben:\n- Überwachung von Hygienevorschriften\n- Beratung bei Gesundheitsfragen\n- Kontrolle von Essens- und Verkaufsständen\n- Dokumentation möglicher Gesundheitsprobleme\n\nVoraussetzungen:\nVerantwortungsbewusstsein, Interesse an Gesundheit und Hygiene, freundlicher Umgang.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Noël Fritz",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 16,
      "titel": "Erste-Hilfe-Beauftragte",
      "abteilung": "Behörde",
      "schlagzeile": "",
      "beschreibung": "Bereitschaftsdienst an festgelegten Standorten und mobile Einsätze im Schulstaat.\n\nAufgaben:\n- Erstversorgung bei kleineren Verletzungen\n- Dokumentation von Einsätzen\n- Ansprechpartner bei gesundheitlichen Problemen\n- Zusammenarbeit mit Lehrkräften und Gesundheitsamt\n\nVoraussetzungen:\nErste-Hilfe-Ausbildungszertifikat, Belastbarkeit, ruhiges Auftreten.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Noël Fritz",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 17,
      "titel": "Fitte Fritten - Mitarbeiter/in",
      "abteilung": "Gastronomie",
      "schlagzeile": "Fitte Fritten - Pommes mit Power",
      "beschreibung": "Aufgaben:\n- Pommes machen\n- Produkte vom Supermarkt holen\n- Kunden bedienen\n\nVoraussetzungen:\n- Gute Laune\n- Airfryer bedienen können\n- Kopfrechnen",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Vinzent Kapp, 9c (Schul.cloud)",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 18,
      "titel": "Mitarbeiter/in für unsere Kreativwerkstatt für Natur und Upcycling „Miss Green\"",
      "abteilung": "Handwerk & Kreativ",
      "schlagzeile": "Hast du Lust, kreative Dinge zu gestalten, zu verkaufen und unsere Workshops zu leiten! Dann bewirb dich!",
      "beschreibung": "In unserer Kreativwerkstatt entstehen kreative Einkaufstaschen aus alten T-Shirts, Stiftehalter und Geldbörsen aus Kokosnussschale und viele andere schöne Dinge. Alles was man bei uns kaufen kann, kann man auch selbst in einem unserer Workshops während der Staatstage anbieten.\n\nVoraussetzung für eine Mitarbeit bei uns: Kreativität und Spaß am Basteln und Gestalten.\n\nUnsere Mitarbeiter kreieren in unserer Upcycling-Werkstatt kreative Dinge, verkaufen sie und leiten unsere Mitmach-Workshops.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Anja Biedermann, Marcella Gallo",
      "gewinnanteil": "Variabel",
      "versteckt": false
    },
    {
      "id": 19,
      "titel": "Trainer",
      "abteilung": "Sport & Freizeit",
      "schlagzeile": "Komm in unser Team",
      "beschreibung": "Übungen aufbauen, Kinder trainieren, Übungen vormachen",
      "lohnProH": 0,
      "lohnTyp": "tag",
      "offen": true,
      "kontakt": "David Kinstler",
      "gewinnanteil": "Tageslohn, nach Absprache",
      "versteckt": false
    },
    {
      "id": 20,
      "titel": "City Radio",
      "abteilung": "Medien & Kultur",
      "schlagzeile": "Von Schülern für die Stadt",
      "beschreibung": "Unsere Aufgaben liegen darin, Bürger und Politiker zu interviewen und daraus einen Bericht zu schreiben. Wir senden stündlich aber passen natürlich auf, dass wir nicht während einer Cityratssitzung senden. Dazu bräuchten wir Zugriff auf die Schulsprechanlage und einen kleinen Platz, wo wir uns besprechen könnten mit einem Tisch und vier Stühle.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Paul Backes",
      "gewinnanteil": "Gewinnaufteilung",
      "versteckt": false
    },
    {
      "id": 21,
      "titel": "DIY- Lounge",
      "abteilung": "Handwerk & Kreativ",
      "schlagzeile": "Erklären, lachen, begeistern - dein neuer Job",
      "beschreibung": "Stellenbeschreibung – Mitarbeiter:in in der DIY Lounge\n\nIn unserer DIY Lounge treffen sich die Mitarbeitenden der Frühschicht möglichst früh, um gemeinsam den Laden für den Tag vorzubereiten. Dabei wird im Team gearbeitet: Vorräte werden aufgefüllt, Tische mit den Unterlagen und Arbeitsmaterialien ausgestattet und der gesamte Raum liebevoll mit der vorbereiteten Dekoration gestaltet. Ziel ist es, eine einladende und kreative Atmosphäre für unsere Gäste zu schaffen, bevor der Betrieb startet.\n\nNach der Vorbereitung übernimmt jede:r Mitarbeitende vielseitige Aufgaben im laufenden Betrieb. Ein zentraler Bestandteil ist die Arbeit an der Kasse. Hier übernehmen Mitarbeitende Reservierungen und Termine koordinieren, Rechnungen erstellt sowie Beträge sorgfältig berechnet und dokumentiert. Zur Unterstützung darf ein Taschenrechner genutzt werden, dennoch wird erwartet, dass alle Abläufe nachvollziehbar und korrekt schriftlich festgehalten werden.\n\nDarüber hinaus gehört es zu den Aufgaben, die angebotenen DIY-Projekte sicher zu erklären und sowohl Kund:innen als auch Kolleg:innen anzuleiten. Jeder Mitarbeitende sollte die Inhalte so gut beherrschen, dass er oder sie sie verständlich weitervermitteln kann. Ebenso ist es wichtig, sich im gesamten Laden auszukennen und zu wissen, wo sich Materialien und Arbeitsmittel befinden, um einen reibungslosen Ablauf zu gewährleisten.\n\nDie Einarbeitung in diese Strukturen und Abläufe erfolgt durch die Leitung, wobei ein gutes Erinnerungsvermögen und eigenständiges Mitdenken ausdrücklich erwünscht sind. Insgesamt erwartet dich eine abwechslungsreiche Tätigkeit in einem kreativen Umfeld, in dem Teamarbeit, Verantwortung und Freude am Gestalten im Mittelpunkt stehen.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Emilia Jahn",
      "gewinnanteil": "Lohn wird noch besprochen",
      "versteckt": false
    },
    {
      "id": 22,
      "titel": "Cocktails und Co.",
      "abteilung": "Gastronomie",
      "schlagzeile": "Wir verkaufen verschiedene Cocktails",
      "beschreibung": "Es werden Cocktails und Getränke gemischt und verkauft. Die Mitarbeiter müssen Kundenkontakt aufnehmen können, Getränke mischen können und auch verkaufen und kassieren können.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Samuel Zahn",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 23,
      "titel": "Kassierer/in",
      "abteilung": "Gastronomie",
      "schlagzeile": "",
      "beschreibung": "AUFGABEN\nBedienung an der Kasse\nAusgabe von Kassenbelegen und Wechselgeld\nUnterstützung bei der Regalpflege\nAushelfen beim decken und aufräumen\n\nVORAUSSETZUNG\nGute Kommunikationsfähigkeiten\nFreundliches Auftreten\nKenntnisse im Umgang mit Kassensystemen",
      "lohnProH": 0,
      "lohnTyp": "tag",
      "offen": true,
      "kontakt": "Uyen Nguyen",
      "gewinnanteil": "Gewinnbeteiligung, variabel",
      "versteckt": false
    },
    {
      "id": 24,
      "titel": "In'Cult recrute ses talents",
      "abteilung": "Medien & Kultur",
      "schlagzeile": "Francophonie et bonne ambiance",
      "beschreibung": "Informationen zum Betrieb\nDie Institutsleitung besteht aus Katja Teufel-Pevny und Kathrin Traens, die sich diese Stelle zu je 50% teilen. Als Institutsleitungen kümmern Sie sich um die Organisation des Kulturinstitutes. Das Kulturinstitut repräsentiert die deutsch-französische Kooperation und jahrelange Zusammenarbeit. Auch CSG City fördert diese Freundschaft und wir setzen sie gemeinsam um.\nEs wird im Vorfeld ein Arbeits-/Schichtplan erstellt.\n\nArbeitsplatzbeschreibung\n1.) Kulturbeauftragte/r: Leitung Kultur- und Sprachprogramme / Ideen einbringen und umsetzen / Auftritt nach außen\n2.) Sprachkursleitung und Mediathek: Umsetzung Sprachenkurse / Sprachunterricht / Medien und Aktivitäten / eigene Ideen einbringen und gestalten\n3.) Veranstaltungsmanagement: Umsetzung einer Abendveranstaltung am „langen Abend“ (Mittwoch) oder kleinerer Events für Jugendliche\n4.) Verwaltungsleitung: Verwaltungstätigkeiten / Korrespondenz / Bibliotheksarbeiten / Betreuung / Aufsicht\n5.) Kreativer Mitarbeiter/in: Erstellung von Schulungsmaterial (Spiele), Werbematerial, Poster, Social Media etc.\n6.) Sportbeauftragte/r: Erarbeitung eines kleinen Sportprogramms für Jugendliche und ausgepowerte Arbeiter/innen, Durchführung von Übungen in Großgruppen, Motivation zur Bewegung und Ausgleich\n\nVoraussetzungen\n• Französischkenntnisse oder Interesse an Frankreich und der Francophonie\n• Freude und Spaß, sich mit der französischen Sprache zu beschäftigen\n• Ruhige Persönlichkeiten für Verwaltungstätigkeiten\n• Viele Ideen und Engagement für die Sache\n• Bereitschaft zu freiwilligen Überstunden\n• Bereitschaft bei einem gemeinsamen Essen etwas mitzubringen (Mittwochmittag)",
      "lohnProH": 2,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Mme Traens et Mme Teufel-Pevny",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 25,
      "titel": "Verkäufer – Kiosk",
      "abteilung": "Handel & Verkauf",
      "schlagzeile": "Hier gibt es (fast) alles",
      "beschreibung": "Größten Teils muss man verkaufen es wird aber auch Specials wie z. B. Fotografieren geben.\nVoraussetzungen: Freundlichkeit, Motivation und Pünktlichkeit",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Jakob Werning",
      "gewinnanteil": "Nach Absprache",
      "versteckt": false
    },
    {
      "id": 26,
      "titel": "Bowls & Smoothies – Mitarbeiter/in",
      "abteilung": "Gastronomie",
      "schlagzeile": "Hilf mit bei der Zubereitung und dem Verkauf!",
      "beschreibung": "Aufgaben:\n- Zubereitung von Bowls und Smoothies\n- Verkauf und Kassieren\n- Kunden freundlich beraten und bedienen\n- Zutaten auffüllen und Bestände kontrollieren\n- Arbeitsplatz sauber halten\n- Geschirr, Behälter und Arbeitsmaterialien abwaschen\n- Bei Auf- und Abbau des Standes helfen\n- Unterstützung bei der Buchhaltung (Einnahmen dokumentieren und Arbeitsstunden erfassen)\n- Allgemeine Unterstützung bei allen anfallenden Aufgaben im Unternehmen\n\nVergütung: Die Materialkosten des Unternehmens werden zunächst von den Einnahmen abgezogen. Der verbleibende Gewinn wird anschließend zur Auszahlung der Arbeitsstunden verwendet. Die Höhe des Stundenlohns ist daher variabel und hängt von den erzielten Einnahmen ab. Die geleisteten Arbeitsstunden werden dokumentiert und bei der Auszahlung berücksichtigt.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Emma Mohn",
      "gewinnanteil": "Variabel",
      "versteckt": false
    },
    {
      "id": 27,
      "titel": "Losstand mit Mohrenkopfschleuder / Putzkraft",
      "abteilung": "Sport & Freizeit",
      "schlagzeile": "Treff ins schwarze und gewinne",
      "beschreibung": "- Putzen der Mohrenkopfschleuder\n- Kaufen der Wasserbomben/Süßigkeiten\n- Verkauf bei der Mohrenkopfschleuder",
      "lohnProH": 0,
      "lohnTyp": "tag",
      "offen": true,
      "kontakt": "Siri Dentler, Sarah Löw",
      "gewinnanteil": "Gewinnbeteiligung, variabel",
      "versteckt": false
    },
    {
      "id": 28,
      "titel": "Waffelmobil",
      "abteilung": "Gastronomie",
      "schlagzeile": "Die besten Holzofenwaffeln der Welt.",
      "beschreibung": "Aufgaben:\n-Feuer machen\n-Kassieren\n-Waffeln backen\n-Waffeln Ausgeben\n-Getränke ausgeben\n-Dosenwerfen betreuen\n\nVoraussetzungen:\nGrundkenntnisse im Waffelnbacken, Feuer machen und Kassieren.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Jakob Schneider/Clara Wilhelm",
      "gewinnanteil": "gewinnabhängig, variabel",
      "versteckt": false
    },
    {
      "id": 29,
      "titel": "Waffelverkäufer",
      "abteilung": "Gastronomie",
      "schlagzeile": "",
      "beschreibung": "Du musst mit einem Waffeleisen umgehen können. Höflichkeit ist wichtig. Zu deinen Aufgaben gehören: Waffeln backen und dekorieren. Du musst kassieren können.",
      "lohnProH": 3,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Maja Metzger oder Lara Fink",
      "gewinnanteil": "50% (Lohn lt. Formular: 3-4€/h)",
      "versteckt": false
    },
    {
      "id": 30,
      "titel": "Verkäufer/in LimoLiebe",
      "abteilung": "Gastronomie",
      "schlagzeile": "Weltbeste hausgemachte Holunder-Limo!",
      "beschreibung": "Die Aufgabe ist der Verkauf von hochwertiger selbstgemachter Limonade aus Holundersirup und Zitronensirup. Dieser wird mit Wasser gemischt und somit zur Limonade.\nErwartet wird Einsatzbereitschaft und >= 4 h Arbeitszeit je Tag. Ein Einsatzplan wird natürlich angefertigt.",
      "lohnProH": 0,
      "lohnTyp": "woche",
      "offen": true,
      "kontakt": "Vincent Ludwig",
      "gewinnanteil": "12,5% vom Gewinn",
      "versteckt": false
    },
    {
      "id": 31,
      "titel": "Sweet Dreams-Mitarbeiter",
      "abteilung": "Handel & Verkauf",
      "schlagzeile": "Verkaufstalent gesucht – Werde Teil unseres Sweet Dream Teams!",
      "beschreibung": "Für unseren Candy Shop namens Sweet Dreams suchen wir eine engagierte Verkäuferin / einen engagierten Verkäufer für unseren Shop. Du bist für den Verkauf unserer Süßwaren verantwortlich und sorgst dafür, dass sich unsere Kundinnen und Kunden wohlfühlen.\n\nDeine Aufgaben:\n- Freundliche Bedienung der Kundschaft\n- Verkauf von Süßigkeiten und Snacks\n- Kassieren und Herausgeben von Wechselgeld\n- Auffüllen und ansprechende Präsentation der Waren\n- Mithilfe bei der Organisation des Candy Shops\n\nDas bringst du mit:\n- Freundliches Auftreten\n- Freude am Umgang mit Menschen\n- Zuverlässigkeit und Teamfähigkeit\n- Interesse am Verkauf\n\nWir bieten:\n- Mitarbeit in einem tollen Unternehmen\n- Ein motiviertes Team\n- Praktische Erfahrungen im Bereich Verkauf und Kundenkontakt\n- Lohn nach Vereinbarung mit variablem Gewinnanteil\n\nWir freuen uns auf deine Bewerbung und darauf, gemeinsam einen erfolgreichen Candy Shop zu führen!",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Tabea Koschlig, Zoe Link oder Katja Galic",
      "gewinnanteil": "vereinbar, variabel",
      "versteckt": false
    },
    {
      "id": 32,
      "titel": "Fritten-Worst",
      "abteilung": "Gastronomie",
      "schlagzeile": "",
      "beschreibung": "Braten von Wurst, Belegen ins Brötchen, dynamische Aufgaben.\n\nAufgaben: Braten von Wurst und Frittieren von Pommes.\nVoraussetzungen: Teamgeist.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "David Koryakin",
      "gewinnanteil": "Gewinnbeteiligung",
      "versteckt": false
    },
    {
      "id": 33,
      "titel": "Barkeeper",
      "abteilung": "Gastronomie",
      "schlagzeile": "Barkeeper für Bar gesucht /(m) (w) (d) wir suchen das fehlende Puzzleteil",
      "beschreibung": "Aufgaben: Die Getränke lecker mixen.\n\nAuf Hygiene achten.\nVoraussetzungen: Man sollte nett und freundlich sein.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Florian Bungenstock",
      "gewinnanteil": "Variabel",
      "versteckt": false
    },
    {
      "id": 34,
      "titel": "Spüler",
      "abteilung": "Gastronomie",
      "schlagzeile": "Spüler für Bar gesucht /(m) (w) (d) wir suchen das fehlende Puzzleteil",
      "beschreibung": "Aufgaben: Den Raum sauber halten.\nDreckige Gläser und andere Sachen sauber machen.\nAuf Hygiene achten.\nVoraussetzungen: Man sollte nett und freundlich sein.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Florian Bungenstock",
      "gewinnanteil": "Variabel",
      "versteckt": false
    },
    {
      "id": 35,
      "titel": "Mitarbeiter/in GastroCheck",
      "abteilung": "Dienstleistung",
      "schlagzeile": "Wir suchen motivierte Mitarbeiter für das Testen und Bewerten von Gastronomiebetrieben",
      "beschreibung": "GastroCheck ist ein unabhängiges Institut zur Bewertung von Gastronomiebetrieben.\nDie Aufgaben umfassen Planung, Konzeption, Abwicklung und Präsentation verschiedener Testkategorien.\nVoraussetzungen: Gutes sprachliches Ausdrucksvermögen, Fähigkeit zum selbstständigen und strukturierten Arbeiten, Kommunikationsbereitschaft, diplomatisches Auftreten.\nWas dich erwartet: Spannende Einblicke in die Gastronomiebetriebe, Möglichkeiten zur aktiven Mitgestaltung der Testprogramme, Offenheit für eigene Ideen.",
      "lohnProH": 0,
      "lohnTyp": "tag",
      "offen": true,
      "kontakt": "Herr Kurzawe",
      "gewinnanteil": "5%",
      "versteckt": false
    },
    {
      "id": 36,
      "titel": "Verkäufer bei Frucht & Pop",
      "abteilung": "Gastronomie",
      "schlagzeile": "Bei uns verkaufst du keine Produkte - du sorgst für Genussmomente!",
      "beschreibung": "Der Arbeitsplatz umfasst die Vorbereitung, Herstellung und den Verkauf von Schokofrüchten. Außerdem können Cocktails aus verschiedenen Säften und Popcorn bestellt werden.\n\nAufgaben:\n\n- Waschen und Vorbereiten der Früchte\n- Überziehen der Früchte mit Schokolade\n- Dekorieren und Präsentieren der Produkte\n- Kundenbedienung\n- Kassiertätigkeiten\n- Arbeitsgeräte und Verkaufsfläche reinigen\n\n\nVoraussetzungen:\n\nDer Arbeitsplatz erfordert sorgfältiges Arbeiten, Zuverlässigkeit und einen freundlichen Umgang mit Kunden.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Emilia Wichmann",
      "gewinnanteil": "gleiche Gewinnverteilung",
      "versteckt": false
    },
    {
      "id": 37,
      "titel": "Workshop Helfer",
      "abteilung": "Handwerk & Kreativ",
      "schlagzeile": "Wir verkaufen selbst gemachte Sachen und machen Workshops. und man sollte verkaufen und Bastel können",
      "beschreibung": "Man sollte basteln, verkaufen und bei einem Workshop helfen. Du wirst immer in unterschiedlicher Arbeit eingeteilt.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Antonia Veigel oder Nele Schneider",
      "gewinnanteil": "Variabel",
      "versteckt": false
    },
    {
      "id": 38,
      "titel": "Creaty- Mitarbeiter/in",
      "abteilung": "Handwerk & Kreativ",
      "schlagzeile": "Basteln mit Natürlichen Dingen",
      "beschreibung": "Der/Die Mitarbeiter/in sollte 10 oder 11 sein\nEr/ Sie soll Interesse am Basteln haben.\nDie Aufgaben wären:\nBasteln & verkaufen\nAlle machen alles.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Maja Bosko",
      "gewinnanteil": "Variabel",
      "versteckt": false
    },
    {
      "id": 39,
      "titel": "Anhänger Atelier - BuchhalterIn",
      "abteilung": "Handwerk & Kreativ",
      "schlagzeile": "Schlüsselanhänger herstellen, Buchhaltung",
      "beschreibung": "Im Anhänger-Atelier werden aus Stoff- und Lederresten kleine, individuelle Schlüsselanhänger hergestellt.\nDafür wird auch ein/e BuchhalterIn benötigt, der/die unsere Kassenbücher auf dem aktuellen Stand hält. Dazu solltest du grundsätzlich gut mit Zahlen umgehen können und auch das Prozent-Rechnen sicher beherrschen.\n\nZusätzlich wirst du unserer Kundschaft helfen, Materialien auszuwählen, Stoffe und Leder zuzuschneiden und damit unserer Kundschaft zu einem persönlichen Unikat zu verhelfen. Am Ende wirst du gut mit Nadel und Faden umgehen können. Dabei werden einfache handwerkliche Techniken wie Schneiden und Nähen eingesetzt. Vorwissen wird für diesen Teil keines vorausgesetzt.\nDu solltest dazu gut auf Menschen zugehen können und Spaß am Handwerk haben.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Cyra-Lena Fröhlich",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 40,
      "titel": "Anhänger Atelier - Mitarbeiter/In",
      "abteilung": "Handwerk & Kreativ",
      "schlagzeile": "Schlüsselanhänger herstellen",
      "beschreibung": "Im Anhänger-Atelier werden aus Stoff- und Lederresten kleine, individuelle Schlüsselanhänger hergestellt.\nDabei wirst du unserer Kundschaft helfen, Materialien auszuwählen, Stoffe und Leder zuzuschneiden und damit zu einem persönlichen Unikat zu verhelfen. Am Ende wirst du gut mit Nadel und Faden umgehen können.\nDabei werden einfache handwerkliche Techniken wie Schneiden und Nähen eingesetzt. Vorwissen wird keines vorausgesetzt. Du solltest gut auf Menschen zugehen können und Spaß am Handwerk haben.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Cyra-Lena Fröhlich",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 41,
      "titel": "Mitarbeiter/in - Karibische Bar",
      "abteilung": "Gastronomie",
      "schlagzeile": "Waffel- und Barheld/in gesucht!",
      "beschreibung": "Deine Aufgaben:\n- Frische Waffeln zubereiten und ansprechend servieren\n- Mixen und zubereiten von Getränken\n- Freundliche Betreuung und Bedienung unserer Gäste\n- Sicherstellung von Sauberkeit und Ordnung am Arbeitsplatz\n- Unterstützung bei der Vorbereitung und Organisation der Bar\n\nDas bringst du mit:\n- Freude am Umgang mit Menschen\n- Zuverlässigkeit und Teamgeist\n- Bereitschaft zu flexiblen Arbeitszeiten\n\nDas bieten wir:\n- Angenehmes Arbeitsklima in einem motivierten Team\n- Möglichkeit, deine Ideen umzusetzen\n\nKlingt nach deinem Job?\nDann freuen wir uns auf deine Bewerbung!",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Linus Kempe",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 42,
      "titel": "Verkäufer/in (m/w/d); Koch/Köchin (m/w/d)",
      "abteilung": "Gastronomie",
      "schlagzeile": "Kulinarische Weltreise in CSG-City: Werde Teil der World-Food Crew!",
      "beschreibung": "JOB-ANGEBOT: Mitarbeiter (m/w/d) bei „World Food\"!\n\nDu liebst gutes Essen, bist gerne unter Leuten und hast Lust, auf das mitgestalten eines Restaurants? Dann komm in unser Team! World Food sucht motivierte Mitarbeiter für die Küche und den Verkauf.\n\nDeine Aufgaben –\nDas machst du bei uns:\n- In der Küche: Du schnippelst, kochst und bereitest leckere, internationale Gerichte, von zu Hause aus, zu.\n- Im Verkauf: Du bedienst die Bürger unseres Staates, nimmst Bestellungen auf, kassierst das Geld und sorgst für gute Laune am Tresen.\n\nDas bringst du mit:\nDu bist zuverlässig und hast Spaß an der Teamarbeit.\nDu behältst auch bei großem Andrang einen kühlen Kopf.\nEin freundliches Lächeln für unsere Kunden.\nVorkenntnisse im Kochen wären super!\n\nDas bieten wir dir:\nEinen lebendigen Arbeitsplatz.\nEin tolles Team, bei dem der Spaß an der Arbeit an erster Stelle steht.\nFaire Bezahlung (in unserer Landeswährung).\n\nDu bist interessiert?\nSo bewirbst du dich:\nSchreibe einfach eine kurze Nachricht oder sprich uns direkt an!",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Cristina Barbaro; Andreas Grieb",
      "gewinnanteil": "Faire Bezahlung (in unserer Landeswährung)",
      "versteckt": false
    },
    {
      "id": 43,
      "titel": "Verkäuferin",
      "abteilung": "Handel & Verkauf",
      "schlagzeile": "ein kleiner Stand sucht dich",
      "beschreibung": "Ich suche nach einer person welche gut mit Menschen umgehen kann, kein problem damit hat mitzuhelfen und einfach eine schöne zeit haben will.",
      "lohnProH": 0,
      "lohnTyp": "tag",
      "offen": true,
      "kontakt": "Helena Ruff",
      "gewinnanteil": "verhandelbar",
      "versteckt": false
    },
    {
      "id": 44,
      "titel": "6-Pancakes 7-Ways",
      "abteilung": "Gastronomie",
      "schlagzeile": "6-Pancakes 7-Ways",
      "beschreibung": "Lebensmittel- und Hygienekoordinator/in\nPlanung und Durchführung von Einkäufen für Zutaten, Verpackungen und sonstige Materialien\nKontrolle der Lagerbestände und rechtzeitiges Einkaufen fehlender Produkte\nÜberprüfung der Qualität und Frische der eingekauften Waren\nSicherstellung der Einhaltung von Hygienevorschriften im Betrieb\n• Buchhalter/in:\nVerwaltung und Dokumentation der Finanzen\nÜberblick des Gewinns, zahlen der Steuern\n• Verkäufer:\nVerkauf der Waren (abkassieren)\n• Produzent/innen (2):\nProduktion der Waren/Lebensmittel und hinzufügen der Toppings\n\n• Kompetenzen:\nZuverlässigkeit und Verantwortungsbewusstsein\nOrganisationstalent\nSorgfältige und genaue Arbeitsweise\nTeamfähigkeit\nGrundkenntnisse im Umgang mit Lebensmitteln und Hygiene\nKommunikationsfähigkeit\nSauberkeit",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Lara Tlili",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 45,
      "titel": "Kino-Traum",
      "abteilung": "Medien & Kultur",
      "schlagzeile": "Bei uns bekommst du viel Spaß und guten Lohn",
      "beschreibung": "1. Aufgaben an de Kasse\n2. An der Snack und Getränkebar arbeiten\n3. Tickets stempeln\n4. Film reinmachen / am Computer arbeiten \n5. Zimmer wieder auf Vordermann bringen \n6. Mit den Müllsack da stehen und den Müll einsammeln \n\n-> Alle Dinge müsst ihr einmal machen wir wechseln immer durch, also man kann jede Station einmal machen.",
      "lohnProH": 0,
      "lohnTyp": "woche",
      "offen": true,
      "kontakt": "Aurelia Barbaro",
      "gewinnanteil": "4%",
      "versteckt": false
    },
    {
      "id": 46,
      "titel": "Du solltest verkaufen und basteln können und bei einem Workshop helfen",
      "abteilung": "Handwerk & Kreativ",
      "schlagzeile": "Wir verkaufen selbst gemachte Sachen und machen Workshops. und man sollte verkaufen und Bastel können",
      "beschreibung": "Man sollte basteln, verkaufen und bei einem Workshop helfen. Du wirst immer in unterschiedlicher Arbeit eingeteilt.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Antonia Veigel oder Nele Schneider",
      "gewinnanteil": "Variabel",
      "versteckt": false
    },
    {
      "id": 47,
      "titel": "Lara Tlili",
      "abteilung": "Gastronomie",
      "schlagzeile": "6-Pancakes 7-Ways",
      "beschreibung": "Lebensmittel- und Hygienekoordinator/in\nPlanung und Durchführung von Einkäufen für Zutaten, Verpackungen und sonstige Materialien\nKontrolle der Lagerbestände und rechtzeitiges Einkaufen fehlender Produkte\nÜberprüfung der Qualität und Frische der eingekauften Waren\nSicherstellung der Einhaltung von Hygienevorschriften im Betrieb\n• Buchhalter/in:\nVerwaltung und Dokumentation der Finanzen\nÜberblick des Gewinns, zahlen der Steuern\n• Verkäufer:\nVerkauf der Waren (abkassieren)\n• Produzent/innen (2):\nProduktion der Waren/Lebensmittel und hinzufügen der Toppings\n\n• Kompetenzen:\nZuverlässigkeit und Verantwortungsbewusstsein\nOrganisationstalent\nSorgfältige und genaue Arbeitsweise\nTeamfähigkeit\nGrundkenntnisse im Umgang mit Lebensmitteln und Hygiene\nKommunikationsfähigkeit\nSauberkeit",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Lara Tlili",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 48,
      "titel": "Mocktail-Bar – Mitarbeiter/in",
      "abteilung": "Gastronomie",
      "schlagzeile": "Allrounder für Küche, Service und Theke gesucht",
      "beschreibung": "Du bist ein echter Allrounder und sorgst mit dem Team dafür, dass der Laden läuft.\n\nAufgaben:\n- Vorbereitung in der Küche: Zubereitung von Sandwiches und Mocktails\n- Unterstützung im Service: Drinks anrichten und an den Platz bringen\n- Sauberkeit der Küche und des Arbeitsbereichs\n- Flexibler Einsatz von Bestellungsaufnahme bis Abwasch\n\nVoraussetzungen:\n- Geschick im Umgang mit Lebensmitteln, sauberes Arbeiten, sicherer Umgang mit dem Messer\n- Schnelligkeit und Belastbarkeit auch wenn viel los ist\n- Freundlichkeit und Teamgeist\n- Flexibilität zwischen verschiedenen Aufgaben",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Milla Hauptfleisch (Schul.cloud)",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 49,
      "titel": "Gummipistolenschießstand – Standmitarbeiter/in",
      "abteilung": "Sport & Freizeit",
      "schlagzeile": "3 Stellen am Schießstand frei",
      "beschreibung": "Aufgaben:\n- Verkaufen der Schüsse\n- Mitzählen der getroffenen Schüsse\n- Gewinne ausgeben\n\nVoraussetzungen:\nKeine Voraussetzungen nötig.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Florian Kobiela",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 50,
      "titel": "Bäckerei Zuckerstübchen – Verkäufer/in",
      "abteilung": "Gastronomie",
      "schlagzeile": "Zuckerstube – so duftet Glück!",
      "beschreibung": "Vier Stellen in unserer kleinen Bäckerei zu vergeben. Wer an dem Tag arbeitet, darf übrig gebliebenes Gebäck mit nach Hause nehmen.\n\nAufgaben:\n- Selbstgebackenes mitbringen\n- Vorbereitung am Stand\n- Verkauf\n- Kasse\n\nVoraussetzungen:\n- Freundlich sein\n- Gut mit Leuten auskommen",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Kate Kippenbrock (Schul.cloud)",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 51,
      "titel": "Pizzeria beim Hirsch – Mitarbeiter/in",
      "abteilung": "Gastronomie",
      "schlagzeile": "Pizza backen mit zwei großen Pizzaöfen",
      "beschreibung": "3 Stellen frei. Am Vormittag werden Teige und Zutaten vorbereitet, während des Betriebs backen wir mit zwei großen Pizzaöfen.\n\nAufgaben:\n- Pizzateig und Zutaten vorbereiten (Gemüse waschen, kleinschneiden usw.)\n- Pizza belegen und backen\n- Pizza verkaufen\n- Hygienevorschriften beachten, Kundenservice betreiben\n\nVoraussetzungen:\nPizza backen und rechnen können, motiviert sein, gut mit Menschen umgehen können, Teamfähigkeit und Belastbarkeit.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Matteo Schelle (Schul.cloud)",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 52,
      "titel": "Recrafted – Verkäufer/in & Workshop-Betreuung",
      "abteilung": "Handwerk & Kreativ",
      "schlagzeile": "Selbst hergestellte Upcycling-Produkte und Workshops",
      "beschreibung": "8 Stellen frei. Wir verkaufen selbst hergestellte Dinge (Insektenhotels aus Bambus, Papierschöpfen, Deko aus Papier) und bieten Workshops an, bei denen Kunden selbst basteln können.\n\nAufgaben:\n- Selbst basteln und handwerkeln\n- Verkaufen\n- Erklären und Aufsicht bei Workshops\n\nVoraussetzungen:\nEtwas handwerkliches Geschick wäre gut.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Frau Schell-Klein (Schul.cloud)",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 53,
      "titel": "Fantastic Nail Art Studio – Buchhaltung",
      "abteilung": "Behörde",
      "schlagzeile": "Finanzen im Nagelstudio im Blick behalten",
      "beschreibung": "1 Stelle frei.\n\nAufgaben:\n- Verwaltung der Finanzen\n- Buchführung über vorhandene Produkte\n- Enge Zusammenarbeit mit der Geschäftsführung\n\nVoraussetzungen:\n- Erweiterte mathematische Kenntnisse\n- Umgang mit Tabellenkalkulation\n\nBezahlung: Fester Stundenlohn (verhandelbar). Ältere Bürger/innen werden tendenziell bevorzugt.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Aniko Keller, 10c",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 54,
      "titel": "Fantastic Nail Art Studio – Nageldesigner/in",
      "abteilung": "Handwerk & Kreativ",
      "schlagzeile": "UV-Nageldesign mit Stickern und Pinseln",
      "beschreibung": "1 Stelle frei. Nageldesign unter der UV-Lampe mit Stickern, Mischplatte und Pinseln (keine Extensions, Aufbaugels oder Nagelkleber).\n\nAufgaben:\nAuftragen und Design von UV- und Nicht-UV-Lacken mit Hilfe von Pinseln, Stempeln, Stickern und Schwämmchen.\n\nVoraussetzungen:\n- Künstlerisches Talent\n- Genauigkeit\n- Kreativität\n- Eigene UV-Lampe\n- Erfahrung mit Nagellack\n\nBezahlung: Fester Stundenlohn (verhandelbar). Erfahrenere Bürger/innen werden tendenziell bevorzugt.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Aniko Keller, 10c",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 55,
      "titel": "6-Pancakes 7-Ways – Lebensmittel- & Hygienekoordinator/in",
      "abteilung": "Gastronomie",
      "schlagzeile": "Pancakes, Crêpes und Kuchen ganz nach Wunsch",
      "beschreibung": "Teil von 5 Stellen insgesamt im Betrieb.\n\nAufgaben:\n- Planung und Durchführung von Einkäufen für Zutaten, Verpackungen und Materialien\n- Kontrolle der Lagerbestände und rechtzeitiges Nachkaufen\n- Überprüfung der Qualität und Frische der Waren\n- Sicherstellung der Hygienevorschriften\n\nVoraussetzungen:\nZuverlässigkeit, Organisationstalent, sorgfältige Arbeitsweise, Teamfähigkeit, Grundkenntnisse in Lebensmittelhygiene.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Lara Tlili (Schul.cloud)",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 56,
      "titel": "6-Pancakes 7-Ways – Buchhalter/in",
      "abteilung": "Gastronomie",
      "schlagzeile": "Finanzen für Pancakes, Crêpes und Kuchen",
      "beschreibung": "Teil von 5 Stellen insgesamt im Betrieb.\n\nAufgaben:\n- Verwaltung und Dokumentation der Finanzen\n- Überblick über Gewinn, Steuern zahlen\n\nVoraussetzungen:\nZuverlässigkeit, Organisationstalent, Sorgfalt, Teamfähigkeit.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Lara Tlili (Schul.cloud)",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 57,
      "titel": "6-Pancakes 7-Ways – Verkäufer/in",
      "abteilung": "Gastronomie",
      "schlagzeile": "Abkassieren am Pancakes-Stand",
      "beschreibung": "Teil von 5 Stellen insgesamt im Betrieb.\n\nAufgaben:\nVerkauf der Waren (abkassieren).\n\nVoraussetzungen:\nZuverlässigkeit, freundliches Auftreten, Teamfähigkeit, Kommunikationsfähigkeit, Sauberkeit.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Lara Tlili (Schul.cloud)",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 58,
      "titel": "6-Pancakes 7-Ways – Produzent/in",
      "abteilung": "Gastronomie",
      "schlagzeile": "Pancakes und Toppings frisch zubereiten",
      "beschreibung": "2 Stellen als Teil von insgesamt 5 Stellen im Betrieb.\n\nAufgaben:\nProduktion der Waren/Lebensmittel und Hinzufügen der Toppings.\n\nVoraussetzungen:\nSorgfältige Arbeitsweise, Grundkenntnisse im Umgang mit Lebensmitteln, Teamfähigkeit.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Lara Tlili (Schul.cloud)",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 60,
      "titel": "LimoLiebe – Verkäufer/in",
      "abteilung": "Gastronomie",
      "schlagzeile": "Selbstgemachte Holunder- und Zitronenlimonade",
      "beschreibung": "2 Stellen frei. Es wird selbstgemachte Holunderlimonade und Zitronenlimonade aus eigenem Sirup verkauft, nach Schichtplan organisiert.\n\nAufgaben:\n- Ausschank der Limonade\n- Kassieren der Einnahmen\n\nVoraussetzungen:\nAusdauer und Lust am Verkauf.\n\nBezahlung: Beteiligung am Gewinn am Ende der Woche, je 1/8 des Gewinns nach Abzug der Kosten.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Vincent Ludwig (Schul.cloud)",
      "gewinnanteil": "12,5%",
      "versteckt": false
    },
    {
      "id": 61,
      "titel": "3D-Drucker-Shop – Verkäufer/in",
      "abteilung": "Handel & Verkauf",
      "schlagzeile": "Verkauf von 3D-gedruckten Gegenständen",
      "beschreibung": "2 Stellen frei.\n\nAufgaben:\nVerkauf der 3D-gedruckten Produkte.\n\nVoraussetzungen:\nTeamfähig, kundenfreundlich, sollte gut mit Zahlen und Geld umgehen können.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Andrei Sander, 6d",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 62,
      "titel": "DIY Lounge – Mitarbeiter/in",
      "abteilung": "Handwerk & Kreativ",
      "schlagzeile": "Gemütlicher Kreativladen für alle Altersklassen",
      "beschreibung": "5 bis 6 Stellen frei. Armbänder, Ketten und Schmuck basteln, Modellieren und Malen – auch für Veranstaltungen und Geburtstage geöffnet.\n\nAufgaben:\n- Kasse\n- Materialbestellung\n- Besuchern bei der Materialwahl helfen und Ideen geben\n- Neue Vorlagen und Ideen entwickeln\n\nVoraussetzungen:\nKreativ sein, gerne malen und basteln, gut mit Menschen umgehen können.\n\nBezahlung: Erstmal über Stundenlohn, je nach Geschäftsverlauf ggf. Gewinnbeteiligung.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Emilia Rheinländer (Schul.cloud)",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 63,
      "titel": "Gaming Shemtrum – Technik-Support",
      "abteilung": "Technik",
      "schlagzeile": "Digitale Geräte vermieten und Gaming-Turniere veranstalten",
      "beschreibung": "14 Stellen frei.\n\nAufgaben:\n- PCs und Konsolen warten\n- Konsolen einrichten und aktualisieren\n- Controller verbinden und warten\n- Kunden bei technischen Problemen helfen\n\nVoraussetzungen:\nPCs und Konsolen einrichten und warten können, freundlicher Umgang mit Kunden, Ordnung und Sauberkeit im Gaming-Bereich.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Michael Jabs / Patrick Rudolf (Schul.cloud)",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 64,
      "titel": "Cookie Café – Getränke",
      "abteilung": "Gastronomie",
      "schlagzeile": "Zubereitung und Verkauf von Kaffee und Co.",
      "beschreibung": "3 Stellen frei.\n\nAufgaben:\n- Organisation der Getränke\n- Zubereitung von Getränken\n- Verkauf von Getränken\n\nVoraussetzungen:\nMotivation, Teamfähigkeit, Zuverlässigkeit.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Eleni Schlatterer (Schul.cloud)",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 65,
      "titel": "Cookie Café – Gebäck",
      "abteilung": "Gastronomie",
      "schlagzeile": "Zubereitung und Verkauf von Cookies und Gebäck",
      "beschreibung": "1 Stelle frei.\n\nAufgaben:\n- Zubereitung von Gebäck\n- Verkauf von Gebäck\n\nVoraussetzungen:\nMotivation, Teamfähigkeit, Zuverlässigkeit.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Eleni Schlatterer (Schul.cloud)",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 66,
      "titel": "Softwaretechnik & Systemverbesserungs GmbH – Entwickler/in",
      "abteilung": "Technik",
      "schlagzeile": "Software und Hardware für Betriebe und Privatpersonen",
      "beschreibung": "3 Stellen frei, vermutlich Raum 111/113.\n\nAufgaben:\nSoftwareentwicklung, Kundenbetreuung, Datenbankadministration, Datenbankentwicklung, Hardwareentwicklung mit Mikrocontrollern, Elektronikfertigung.\n\nVoraussetzungen:\nKenntnisse in einer sinnvoll nutzbaren Programmiersprache (kein Scratch o.ä.). Bereits vereinbarte Anstellungen werden neuen Interessenten vorgezogen.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "moritz.dammbach@csgb.de",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 67,
      "titel": "Kirche des Tungs – Verkäufer/in",
      "abteilung": "Sonstiges",
      "schlagzeile": "Gotteshaus und Gemeinschaft der Gläubigen von Triple T",
      "beschreibung": "8 bis 9 Stellen frei.\n\nAufgaben:\nVerkauf von diversen Gegenständen, Getränken und allem, was Geld einbringt. Mehr Informationen werden bei der Bewerbung mitgeteilt.\n\nVoraussetzungen:\nKeine. Empfohlen wird, diese Stelle als Nebenjob zu betrachten.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Felix Mattern, 0176 55094506",
      "gewinnanteil": "~3%",
      "versteckt": false
    },
    {
      "id": 68,
      "titel": "In'Cult – Kulturbeauftragte/r",
      "abteilung": "Medien & Kultur",
      "schlagzeile": "Leitung der Kultur- und Sprachenprogramme",
      "beschreibung": "1 Stelle frei beim Institut Culturel Français – In'Cult.\n\nAufgaben:\nLeitung Kultur- und Sprachenprogramme, eigene Ideen einbringen und umsetzen, Auftritt nach außen.\n\nVoraussetzungen:\nFranzösischkenntnisse oder Interesse an Frankreich, Freude an der französischen Sprache, ruhige Persönlichkeit, eigene Ideen.\n\nBezahlung: Da die Fördermittel durch den Staat noch nicht zugewiesen wurden, kann die Lohnhöhe noch nicht angegeben werden. Bewerbung mit Motivationsschreiben auf Französisch via Schul.cloud.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Katja Teufel-Pevny (Schul.cloud)",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 69,
      "titel": "In'Cult – Sprachkursleitung & Mediathek",
      "abteilung": "Medien & Kultur",
      "schlagzeile": "Sprachkurse, Medien und Aktivitäten gestalten",
      "beschreibung": "1 Stelle frei beim Institut Culturel Français – In'Cult.\n\nAufgaben:\nUmsetzung der Sprachenkurse, Sprachunterricht, Medien und Aktivitäten, eigene Ideen einbringen und gestalten.\n\nVoraussetzungen:\nFranzösischkenntnisse oder Interesse an Frankreich, Freude an der französischen Sprache, ruhige Persönlichkeit, eigene Ideen.\n\nBezahlung: Da die Fördermittel durch den Staat noch nicht zugewiesen wurden, kann die Lohnhöhe noch nicht angegeben werden. Bewerbung mit Motivationsschreiben auf Französisch via Schul.cloud.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Kathrin Traens (Schul.cloud)",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 70,
      "titel": "In'Cult – Verwaltungsleitung",
      "abteilung": "Medien & Kultur",
      "schlagzeile": "Verwaltung, Korrespondenz und Bibliotheksarbeit",
      "beschreibung": "1 Stelle frei beim Institut Culturel Français – In'Cult.\n\nAufgaben:\nVerwaltungstätigkeiten, Korrespondenz, Bibliotheksarbeiten, Betreuung, Aufsicht.\n\nVoraussetzungen:\nFranzösischkenntnisse oder Interesse an Frankreich, Freude an der französischen Sprache, ruhige Persönlichkeit, eigene Ideen.\n\nBezahlung: Da die Fördermittel durch den Staat noch nicht zugewiesen wurden, kann die Lohnhöhe noch nicht angegeben werden. Bewerbung mit Motivationsschreiben auf Französisch via Schul.cloud.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Katja Teufel-Pevny (Schul.cloud)",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 71,
      "titel": "Zur Wilden Wurst – Mitarbeiter/in",
      "abteilung": "Gastronomie",
      "schlagzeile": "Wurst braten und Brötchen belegen",
      "beschreibung": "5 Stellen frei.\n\nAufgaben:\nBraten von Wurst, Belegen ins Brötchen, dynamische Aufgaben je nach Bedarf.\n\nVoraussetzungen:\nTeamgeist.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "David Koryakin (vertr. Alexander Naumann)",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 72,
      "titel": "Candy Shop – Ausgabekoordinator/in",
      "abteilung": "Gastronomie",
      "schlagzeile": "Crêpes, Waffeln und Süßigkeiten ausgeben",
      "beschreibung": "1 Stelle frei.\n\nAufgaben:\n- Gibt Crêpes, Waffeln und Süßigkeiten aus\n- Nimmt Geld ein und legt es in die Kasse\n\nVoraussetzungen:\nAusgeprägte Kommunikationsfähigkeiten und Führungsstärke, Ausführen aller im Betrieb anfallenden Tätigkeiten.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Béla Staude (Schul.cloud)",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 73,
      "titel": "Candy Shop – Crêpproduktionsleiter/in",
      "abteilung": "Gastronomie",
      "schlagzeile": "Verantwortlich für Crêpe-Produktion und Verkauf",
      "beschreibung": "1 Stelle frei.\n\nAufgaben:\n- Herstellung von Crêpes\n- Crêpeteig auffüllen\n\nVoraussetzungen:\nAusgeprägte Kommunikationsfähigkeiten und Führungsstärke, Ausführen aller im Betrieb anfallenden Tätigkeiten.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Béla Staude (Schul.cloud)",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 74,
      "titel": "Candy Shop – Waffelproduktionsleiter/in",
      "abteilung": "Gastronomie",
      "schlagzeile": "Verantwortlich für Waffel-Produktion und Verkauf",
      "beschreibung": "1 Stelle frei.\n\nAufgaben:\n- Herstellung von Waffeln\n- Waffelteig auffüllen\n\nVoraussetzungen:\nAusgeprägte Kommunikationsfähigkeiten und Führungsstärke, Ausführen aller im Betrieb anfallenden Tätigkeiten.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Béla Staude (Schul.cloud)",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 75,
      "titel": "Candy Shop – Manager/in",
      "abteilung": "Gastronomie",
      "schlagzeile": "Gesamtverantwortung und Koordination der Produktion",
      "beschreibung": "1 Stelle frei. Gesamtverantwortung und Koordination der Crêp-, Waffelproduktion und deren Verkauf, sowie des Süßigkeitenverkaufs.\n\nAufgaben:\n- Ansprechpartner für Organisation und Mitarbeiter\n- Aushilfe bei anderen Tätigkeiten, wenn Not am Mann ist\n\nVoraussetzungen:\nAusgeprägte Kommunikationsfähigkeiten und Führungsstärke, Ausführen aller im Betrieb anfallenden Tätigkeiten.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Béla Staude (Schul.cloud)",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 76,
      "titel": "Candy Vault – Verkäufer/in",
      "abteilung": "Gastronomie",
      "schlagzeile": "Individuell zusammengestellte Süßigkeiten und Mystery Boxes",
      "beschreibung": "4 Stellen frei.\n\nAufgaben:\n- Kassieren und Abwicklung von Zahlungsvorgängen\n- Zusammenstellen und Verkaufen von Süßigkeitentüten nach Kundenwunsch\n- Verkauf von Mystery Boxes (soweit verfügbar)\n- Mithilfe beim Aufräumen und Sauberhalten des Ladens\n\nVoraussetzungen:\nZuverlässigkeit, freundliches Auftreten, Verkaufskompetenz, Teamfähigkeit.\n\nBezahlung: 15% vom Tagesgewinn pro Mitarbeiter, zusätzlich Gehaltsbonus bei guter Leistung möglich.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Elias Kim, 5d",
      "gewinnanteil": "15%",
      "versteckt": false
    },
    {
      "id": 77,
      "titel": "Crêpes House – Mitarbeiter/in",
      "abteilung": "Gastronomie",
      "schlagzeile": "Crêpes ausbacken, belegen und verkaufen",
      "beschreibung": "4 Stellen plus Leitung frei.\n\nAufgaben:\n- Logo- und Plakatgestaltung\n- Crêpe ausbacken und nach Bestellung belegen\n- Kasse: Bestellung entgegennehmen, Geld annehmen, Crêpes ausgeben\n- Teig aus Zutaten mischen, Zutaten einkaufen, an Kasse/Crêpe aushelfen\n\nVoraussetzungen:\nFreundlichkeit, Ausdauer, backen können, gutes Rechnen können.\n\nBezahlung: Gewinnbeteiligung, am Ende der Woche zu gleichen Teilen verteilt (nach Anwesenheit/Arbeitszeit).",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Salome Raichle (Schul.cloud)",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 78,
      "titel": "Bowls & Smoothies – Verkäufer/in",
      "abteilung": "Gastronomie",
      "schlagzeile": "Frische Bowls und Smoothies direkt am Stand",
      "beschreibung": "3 Stellen frei. Arbeitsplatz im Verkaufsstand mit direktem Kundenkontakt.\n\nAufgaben:\n- Zubereitung von Bowls und Smoothies\n- Verkauf und Kassieren\n- Kunden freundlich beraten und bedienen\n- Zutaten auffüllen und Arbeitsplatz sauber halten\n- Organisation des Standes übernehmen\n- Buchhaltung und Einnahmen verwalten\n\nVoraussetzungen:\nMindestens Klasse 8, maximal Klasse 9. Verantwortungsbewusstsein, Teamfähigkeit, Zuverlässigkeit und freundliches Auftreten.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Emma Mohn",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 79,
      "titel": "Volksversicherung – Buchhaltung",
      "abteilung": "Behörde",
      "schlagzeile": "Einnahmen und Ausgaben der Volksversicherung verwalten",
      "beschreibung": "1 Stelle frei. Die Volksversicherung bietet optionale und Pflichtversicherungen an, Sitz ist ein einfaches Klassenzimmer. Die Buchhaltung läuft sowohl im Voraus als auch während der Projektwoche.\n\nAufgaben:\n- Verwaltung von Einnahmen und Ausgaben\n- Kassenbuch führen\n- Rücklagen berechnen\n\nVoraussetzungen:\nZuverlässigkeit, konzentriertes Arbeiten, Ordentlichkeit, gutes Zahlenverständnis, Ehrlichkeit (wichtigste Grundvoraussetzung).\n\nBezahlung: 10€ pro Tag mit eventuellen Prämien, orientiert am Stundenlohnsatz.",
      "lohnProH": 10,
      "lohnTyp": "tag",
      "offen": true,
      "kontakt": "Nico Fischer (Schul.cloud oder nico.fischer@csgb.de)",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 80,
      "titel": "Volksversicherung – Versicherungen erstellen",
      "abteilung": "Behörde",
      "schlagzeile": "Policen entwickeln und Preise festlegen",
      "beschreibung": "1 Stelle frei. Das Erstellen der Versicherungen geschieht im Voraus, vor der Projektwoche.\n\nAufgaben:\n- Risiken im Staat analysieren\n- Zielgruppe bestimmen (Unternehmensführer, Angestellte, Staat, Beamte)\n- Policen einfach und verständlich formulieren\n- Preise festlegen\n- Versicherungsstufen entwickeln (Basic/Premium)\n- Missbrauch verhindern (z.B. nachträglichen Abschluss nach Schaden verbieten)\n- Pflichtversicherungen mit optionalen Paketen kombinieren\n\nVoraussetzungen:\nZuverlässigkeit (äußerst wichtig), kreative und gute Ideen, logisches Denken, verständliche Ausdrucksweise.\n\nBezahlung: 12€ pro Tag mit eventuellen Prämien, orientiert am Stundenlohnsatz.",
      "lohnProH": 12,
      "lohnTyp": "tag",
      "offen": true,
      "kontakt": "Nico Fischer (Schul.cloud oder nico.fischer@csgb.de)",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 81,
      "titel": "Volksversicherung – Rechtsbeauftragte/r",
      "abteilung": "Behörde",
      "schlagzeile": "Vor Gericht für die Volksversicherung argumentieren",
      "beschreibung": "1 Stelle frei. Die Arbeit findet während der Projektwoche statt, bei Bedarf hilft der Rechtsbeauftragte auch bei der Schadensbearbeitung aus.\n\nAufgaben:\n- Vor Gericht argumentieren\n- Klagen vorbereiten\n- Gegen Bürger ohne Pflichtversicherung klagen\n\nVoraussetzungen:\nSachlichkeit, Kenntnis über Regelungen, Argumentationsstärke.\n\nBezahlung: 9€ pro Tag mit eventuellen Prämien, orientiert am Stundenlohnsatz.",
      "lohnProH": 9,
      "lohnTyp": "tag",
      "offen": true,
      "kontakt": "Nico Fischer (Schul.cloud oder nico.fischer@csgb.de)",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 82,
      "titel": "Volksversicherung – Schadensbearbeitung",
      "abteilung": "Behörde",
      "schlagzeile": "Schadensfälle prüfen und Auszahlungen veranlassen",
      "beschreibung": "1 Stelle frei. Die Schadensbearbeitung findet während der Projektwoche statt.\n\nAufgaben:\n- Schadensfälle prüfen\n- Nachweise kontrollieren\n- Entscheidungen treffen\n- Auszahlungen veranlassen\n\nVoraussetzungen:\nKritisches Urteilungsvermögen, Kenntnis über Regelungen, Ehrlichkeit (wichtigste Grundvoraussetzung).\n\nBezahlung: 11€ pro Tag mit eventuellen Prämien, orientiert am Stundenlohnsatz.",
      "lohnProH": 11,
      "lohnTyp": "tag",
      "offen": true,
      "kontakt": "Nico Fischer (Schul.cloud oder nico.fischer@csgb.de)",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 83,
      "titel": "Volksversicherung – Verkauf & Beratung",
      "abteilung": "Behörde",
      "schlagzeile": "Kunden zu Versicherungen beraten",
      "beschreibung": "1 Stelle frei. Beratung und Verkauf der Versicherungen finden im Voraus und während der Projektwoche statt.\n\nAufgaben:\n- Ausfüllzettel für den Kauf von Versicherungen erstellen\n- Kunden beraten\n- Fragen beantworten\n\nVoraussetzungen:\nZuverlässigkeit, Freundlichkeit, Überzeugungskraft, verständliche Ausdrucksweise.\n\nBezahlung: 8€ pro Tag mit eventuellen Prämien, orientiert am Stundenlohnsatz.",
      "lohnProH": 8,
      "lohnTyp": "tag",
      "offen": true,
      "kontakt": "Nico Fischer (Schul.cloud oder nico.fischer@csgb.de)",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 84,
      "titel": "Gastronomie CSGB – Arbeiter/in",
      "abteilung": "Gastronomie",
      "schlagzeile": "Süßwaren und Mahlzeiten einfach verkauft",
      "beschreibung": "2 Stellen frei.\n\nAufgaben:\n- Verkaufen\n- Kochen und Vorbereiten von Essen\n\nVoraussetzungen:\nSich bei Küchengeräten halbwegs auskennen, vertrauenswürdiger Umgang mit Lebensmitteln.",
      "lohnProH": 2,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Raphael List (Schul.cloud)",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 85,
      "titel": "Gastronomie CSGB – Co-Chef",
      "abteilung": "Gastronomie",
      "schlagzeile": "Verkauf, Küche und Vertretung des Chefs",
      "beschreibung": "1 Stelle frei.\n\nAufgaben:\n- Verkaufen\n- Kochen und Vorbereiten von Essen\n- Hilfe bei Aufgaben des Chefs\n\nVoraussetzungen:\nVertrauenswürdig sein, sich halbwegs mit Küchengeräten auskennen.",
      "lohnProH": 3,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Raphael List (Schul.cloud)",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 86,
      "titel": "Gastronomie CSGB – Arbeiter/in (Erwachsene)",
      "abteilung": "Gastronomie",
      "schlagzeile": "Süßwaren und Mahlzeiten – nur für Erwachsene",
      "beschreibung": "5 Stellen frei, ausschließlich für erwachsene Bewerber.\n\nAufgaben:\n- Verkaufen\n- Kochen und Vorbereiten von Essen\n\nVoraussetzungen:\nErwachsen sein, vertrauenswürdig sein.",
      "lohnProH": 2.5,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Raphael List (Schul.cloud)",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 87,
      "titel": "Bluebell Café – Kellner/in",
      "abteilung": "Gastronomie",
      "schlagzeile": "Bedienung am Tisch im Bluebell Café",
      "beschreibung": "Begrenzte Stellenzahl.\n\nAufgaben:\n- Bedienung am Tisch\n- Servieren\n- Aushelfen beim Decken und Aufräumen\n\nVoraussetzungen:\nGute Kommunikationsfähigkeiten, freundliches Auftreten.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Uyen Nguyen (Schul.cloud)",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 88,
      "titel": "Layer & Laser – CAD-Konstrukteur/in & 3D-Design",
      "abteilung": "Technik",
      "schlagzeile": "3D-Modelle entwerfen für Prototypenbau",
      "beschreibung": "Teil von 4-5 Stellen insgesamt, ca. 40m² in Raum 111.\n\nAufgaben:\n- Erstellen von 3D-Modellen und Konstruktionen\n- Vorbereitung von Dateien für den 3D-Druck\n- Anpassung bestehender Designs\n- Entwicklung neuer Produktideen\n- Unterstützung bei Sonderanfertigungen\n\nVoraussetzungen:\nInteresse an Technik und Konstruktion, Kreativität, Grundkenntnisse in CAD-Programmen von Vorteil, sorgfältiges Arbeiten, bevorzugt Klasse 8 bis Kursstufe.\n\nBezahlung: 1-2€ pro Stunde plus mögliche Gewinnbeteiligung.",
      "lohnProH": 1.5,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Manuel Hänsgen (Schul.cloud)",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 89,
      "titel": "Layer & Laser – 3D-Druck & Produktion",
      "abteilung": "Technik",
      "schlagzeile": "3D-Drucker bedienen und Produktion überwachen",
      "beschreibung": "Teil von 4-5 Stellen insgesamt, ca. 40m² in Raum 111.\n\nAufgaben:\n- Bedienung und Überwachung der 3D-Drucker\n- Starten und Organisieren von Druckaufträgen\n- Qualitätskontrolle fertiger Produkte\n- Materialwechsel und Nachbearbeitung\n\nVoraussetzungen:\nTechnisches Interesse, Zuverlässigkeit, Geduld und Genauigkeit, geeignet ab Klasse 7.\n\nBezahlung: 1-2€ pro Stunde plus mögliche Gewinnbeteiligung.",
      "lohnProH": 1.5,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Manuel Hänsgen (Schul.cloud)",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 90,
      "titel": "Layer & Laser – Lasergravur & CNC-Fertigung",
      "abteilung": "Technik",
      "schlagzeile": "Lasercutter und CNC-Fräsen bedienen",
      "beschreibung": "Teil von 4-5 Stellen insgesamt, ca. 40m² in Raum 111.\n\nAufgaben:\n- Bedienung von Lasercutter und CNC-Fräsen\n- Vorbereitung von Gravur- und Fräsdateien\n- Herstellung personalisierter Produkte\n- Qualitätskontrolle\n\nVoraussetzungen:\nTechnisches Verständnis, präzises Arbeiten, Interesse an Maschinen und Fertigung, bevorzugt Klasse 8 bis Kursstufe.\n\nBezahlung: 1-2€ pro Stunde plus mögliche Gewinnbeteiligung.",
      "lohnProH": 1.5,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Manuel Hänsgen (Schul.cloud)",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 91,
      "titel": "Layer & Laser – Verkauf, Kundenservice & Marketing",
      "abteilung": "Technik",
      "schlagzeile": "Direkter Kundenkontakt und kreatives Marketing",
      "beschreibung": "Teil von 4-5 Stellen insgesamt, ca. 40m² in Raum 111.\n\nAufgaben:\n- Verkauf unserer Produkte\n- Beratung von Kundinnen und Kunden\n- Annahme von Aufträgen\n- Werbung und Social Media\n- Gestaltung von Plakaten und Produktfotos\n\nVoraussetzungen:\nFreundliches Auftreten, Kommunikationsfähigkeit, Kreativität, Teamfähigkeit, geeignet für alle Klassenstufen.\n\nBezahlung: 1-2€ pro Stunde plus mögliche Gewinnbeteiligung.",
      "lohnProH": 1.5,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Manuel Hänsgen (Schul.cloud)",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 92,
      "titel": "CSG Kiosk – Verkäufer/in",
      "abteilung": "Handel & Verkauf",
      "schlagzeile": "Kiosk mit Specials für jeden Geschmack",
      "beschreibung": "4 Stellen frei.\n\nAufgaben:\nVerkauf der Kiosk-Artikel.\n\nVoraussetzungen:\nFreundlichkeit, Motivation und organisiertes Arbeiten.\n\nBezahlung: Nach Absprache.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Jakob Werning",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 93,
      "titel": "Kinderbetreuung Kirschblüte – Betreuer/in",
      "abteilung": "Behörde",
      "schlagzeile": "Kleine Hände in guten Händen",
      "beschreibung": "6 Stellen frei. Kinderbetreuung für Kinder zwischen 3 und 7 Jahren, gesucht werden Schüler/innen ab der achten Klasse.\n\nAufgaben:\n- Spielen, basteln und malen mit den Kindern\n- Begleiten von Aktionen und Ausflügen\n- Vorlesen von Geschichten\n- Austausch mit Eltern\n- Schaffung einer sicheren und wertschätzenden Atmosphäre\n- Organisatorische Tätigkeiten und Planung mit dem Team\n\nVoraussetzungen:\nFreundlicher und geduldiger Umgang mit Kindern, Spaß und Motivation bei der Arbeit, Verständnis für die Bedürfnisse der Kinder. Keine Vorkenntnisse benötigt.\n\nBezahlung: Beamtengehalt.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Franziska Schäfer, 10c (Schul.cloud)",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 94,
      "titel": "Miss Green – Kreativwerkstatt für Natur und Upcycling",
      "abteilung": "Handwerk & Kreativ",
      "schlagzeile": "Einkaufstaschen, Stiftehalter und mehr aus Upcycling-Material",
      "beschreibung": "3 Stellen frei. In der Kreativwerkstatt entstehen Einkaufstaschen aus alten T-Shirts, Stiftehalter und Geldbeutel aus Tetrapacks, Anhänger aus Kokosnussschale und mehr – alles kann auch in Workshops selbst gebastelt werden.\n\nAufgaben:\n- In der Upcycling-Werkstatt kreative Dinge gestalten und verkaufen\n- Workshops für Besucher leiten\n\nVoraussetzungen:\nKreativität und Spaß am Basteln und Gestalten.\n\nBezahlung: Gewinnbeteiligung (Verhandlungsbasis).",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Anja Biedermann / Marcella Gallo",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 95,
      "titel": "Shadow's Secrets Escape Rooms – Mitarbeiter/in",
      "abteilung": "Sport & Freizeit",
      "schlagzeile": "Das Abenteuer öffnet sich, sobald die Tür sich schließt",
      "beschreibung": "6 Stellen frei. Escape Rooms verschiedenster Schwierigkeitsstufen ab 5 Jahren, gesucht werden Schüler/innen aller Klassenstufen.\n\nAufgaben:\n- Präparieren des Escape Rooms\n- Beaufsichtigung der Besucher\n- Kartenverkauf und Anmeldung\n\nVoraussetzungen:\nFreundlicher und geduldiger Umgang mit Menschen (auch Kindern), Kreativität und Einfallsreichtum, organisiertes Arbeiten.\n\nBezahlung: Prozentuale Gewinnaufteilung.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Carolina Schäfer, 6d (Schul.cloud)",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 96,
      "titel": "Eiscafé Kühl & Köstlich – Verkäufer/in",
      "abteilung": "Gastronomie",
      "schlagzeile": "Selbstgemachtes Eis, Waffeln und Erfrischungen",
      "beschreibung": "2 Stellen frei. Verkauf von selbstgemachtem Eis, Waffeln, Eistee und Smoothies, Arbeit erfolgt in Schichten.\n\nAufgaben:\n- Verkauf\n- Smoothies machen\n- Kugel-Eis verkaufen\n- Tische sauber halten\n- Essen zubereiten\n- Je nach Einteilung Eis herstellen oder Waffelteig zubereiten\n\nVoraussetzungen:\nBereitschaft genauso viel wie alle anderen zu arbeiten, gute Erreichbarkeit, Lust auf die Sache und Freude an der Arbeit.\n\nBezahlung: Kein fester Stundensatz – der Gewinn wird gerecht unter allen aufgeteilt.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Leonardo Mai, 7d, 0152 09930423",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 97,
      "titel": "Candy's and Cocktails – Verkäufer/in",
      "abteilung": "Gastronomie",
      "schlagzeile": "Süßigkeitentüten passend zum Cocktail",
      "beschreibung": "Zwei Stände kooperieren, jeder verkauft für sich – Süßigkeiten passend zum Cocktailangebot des Nachbarstands.\n\nAufgaben:\n- Tüten mit Süßigkeiten packen\n- Geld nehmen und wechseln\n- Süßigkeiten mit einem Pick-System ausgeben\n\nVoraussetzungen:\nVerlässlichkeit.\n\nBezahlung: Alle Einnahmen werden unter den Mitarbeitern geteilt.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Charlie Iacobelli, 01573 3310559",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 98,
      "titel": "csg-city news – Redaktionsmitglied",
      "abteilung": "Medien & Kultur",
      "schlagzeile": "Journalismus, Foto, Layout und Verkauf in einer Hand",
      "beschreibung": "10 Stellen frei. Flache Hierarchie – alle Redaktionsmitglieder sind gleichzeitig Journalist:innen, Fotograf:innen, Layouter:innen und Verkäufer:innen. Gearbeitet wird mit Tablets und Computern im Computerraum, finanziert über Zeitungsverkauf und Werbekunden.\n\nAufgaben:\nRecherche, Schreiben, Fotografieren, Layout und Verkauf der Zeitung.\n\nVoraussetzungen:\nNeugierde, Spaß am Umgang mit Menschen, guter Riecher für Neuigkeiten, Schreib- und Layout-Kompetenz.\n\nBezahlung: Gewinnbeteiligung, alle verdienen gleich viel.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Felicitas Pschierer (Schul.cloud / pschierer@csgb.de)",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 99,
      "titel": "Baxis Losbude – Losverkäufer/in",
      "abteilung": "Sport & Freizeit",
      "schlagzeile": "Versuch dein Glück – vielleicht gewinnst du was Tolles!",
      "beschreibung": "1 Stelle frei. In der Losbude werden Lose verkauft und Gewinne überreicht.\n\nAufgaben:\n- Lose verkaufen\n- Preise und Gewinnmöglichkeiten erklären\n- Gewinne aushändigen\n- Kasse führen (Geld zählen, Verkäufe notieren)\n- Für die Losbude werben\n\nVoraussetzungen:\nFreundlich, laut und deutlich, ehrlich, Grundkenntnisse im Rechnen.\n\nBezahlung: Vereinbarung im Bewerbungsgespräch, auf Provisionsbasis/Gewinnbeteiligung.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Bastian Joos, 6b (Schul.cloud)",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 100,
      "titel": "Fußballschule – Trainer/in",
      "abteilung": "Sport & Freizeit",
      "schlagzeile": "Athletik-, Technik- und Koordinationstraining",
      "beschreibung": "8 Stellen frei.\n\nAufgaben:\n- Coachen der unterschiedlichen Trainingsstationen\n- Schiedsrichtertätigkeiten\n- Verkauf von Getränken\n- Spielerberatung\n\nVoraussetzungen:\nFußballerisches Verständnis, Kommunikationsbereitschaft, Einsatzbereitschaft.\n\nBezahlung: Fester Stundensatz.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "David Kinstler, Klasse 5A",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 101,
      "titel": "Kurry Korber's & Rothe's Wurstpalast – Mitarbeiter/in",
      "abteilung": "Gastronomie",
      "schlagzeile": "Wenige, aber hochwertige Wurstprodukte",
      "beschreibung": "5 Stellen frei. Imbiss mit Fokus auf Currywurst, Rote Wurst im Brötchen und Pommes frites, setzt auf schnelle Bedienung und freundlichen Service.\n\nAufgaben:\n- Zubereitung von Currywurst, Roter Wurst und Pommes\n- Ausgabe von Speisen und Getränken\n- Bedienung und Beratung der Kunden\n- Kassieren und Abrechnen\n- Reinigung von Arbeitsflächen, Geräten und Imbissbereich\n- Auffüllen von Zutaten und Verbrauchsmaterialien\n- Einhaltung der Hygienevorschriften\n\nVoraussetzungen:\nFreundliches und kundenorientiertes Auftreten, Zuverlässigkeit und Pünktlichkeit, Teamfähigkeit, Belastbarkeit zu Stoßzeiten.\n\nBezahlung: Fester Stundenlohn von 10€, zusätzlich bei guter Geschäftsentwicklung ein Leistungsbonus in Form einer Wurstflatrate.",
      "lohnProH": 10,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Herr Rothe & Herr Korber (Schul.cloud)",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 102,
      "titel": "Slush-Bar – Mitarbeiter/in",
      "abteilung": "Gastronomie",
      "schlagzeile": "Cooles Slush-Eis, Getränke und Snacks",
      "beschreibung": "6 Stellen frei.\n\nAufgaben:\n- Verkauf von Getränken und Slush-Eis\n- Auffüllen und Bedienen der Slush-Maschine\n- Je nach Schicht Auffüllen der Kühlschränke\n- Je nach Schicht Aufräumen der Getränke in den Abstellraum\n- Kassieren\n\nVoraussetzungen:\nFreundlichkeit und Teamgeist, sicherer Umgang mit Bargeld, Stressresistenz, Kommunikationsfreude, Zuverlässigkeit.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Ludwig Stark, 6b (Schul.cloud)",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 103,
      "titel": "City Radio – Moderator/in",
      "abteilung": "Medien & Kultur",
      "schlagzeile": "Interviews führen und Nachrichten senden",
      "beschreibung": "3 Stellen frei.\n\nAufgaben:\n- Bürger und Politiker interviewen\n- Daraus einen Bericht/eine Sendung zusammenfassen\n- Diese dann senden/sprechen\n- Verwaltung und Finanzen\n\nVoraussetzungen:\nKreativität, offene und sachliche Unterhaltungen führen können, klarer Kopf, Sozialkompetenz.\n\nFinanzierung über Werbeeinnahmen.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Paul Backes, 6d (Schul.cloud)",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 104,
      "titel": "Süß & Salzig – Mitarbeiter/in",
      "abteilung": "Gastronomie",
      "schlagzeile": "Frisches Popcorn, Fruchtgummi und Getränke",
      "beschreibung": "4 Stellen frei in den Bereichen Produktion, Verkauf und Lager.\n\nAufgaben:\n- Herstellung und Verpackung von Popcorn\n- Verkauf der angebotenen Produkte\n- Freundliche Kundenbetreuung\n- Kommissionierung und Nachfüllen von Rohstoffen sowie Verkaufsartikeln\n- Einhaltung von Hygiene- und Sicherheitsvorschriften\n\nVoraussetzungen:\nVerantwortungsbewusster Umgang mit der Popcornmaschine, freundliches Auftreten, sorgfältiger Umgang mit Bargeld, Zuverlässigkeit und Teamfähigkeit.\n\nBezahlung: Gewinnbeteiligung am erwirtschafteten Umsatz.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Maxim Schiller, Tel. 015565/147111",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 105,
      "titel": "Smile & Style – Souvenirverkäufer/in",
      "abteilung": "Handwerk & Kreativ",
      "schlagzeile": "Souvenirs, Kinderschminken und Glitzertattoos",
      "beschreibung": "4 Stellen frei.\n\nAufgaben:\nDu wirst in jedem Bereich einmal etwas zu tun haben – Souvenirs verkaufen oder Kinder schminken.\n\nVoraussetzungen:\nFingerspitzengefühl.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Emilia Badmann / Emmi Ritter (Schul.cloud)",
      "gewinnanteil": "variabel",
      "versteckt": false
    },
    {
      "id": 106,
      "titel": "Polizei – Polizist/in",
      "abteilung": "Behörde",
      "schlagzeile": "Sicherheit und Ordnung im gesamten Schulstaat",
      "beschreibung": "10 Stellen frei. Einsatz auf dem gesamten Gelände mit regelmäßigen Rundgängen und Kommunikation mit Bürgern und Behörden.\n\nAufgaben:\n- Überwachung der Einhaltung von Regeln und Gesetzen\n- Streifengänge auf dem Schulgelände\n- Schlichtung von Konflikten\n- Unterstützung bei Veranstaltungen und Sicherheitsfragen\n- Dokumentation besonderer Vorfälle\n\nVoraussetzungen:\nZuverlässigkeit, Teamfähigkeit, souveränes Auftreten, Bereitschaft Konflikte ruhig zu lösen.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Jannis Burk",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 107,
      "titel": "Grenzpolizei – Grenzpolizist/in",
      "abteilung": "Behörde",
      "schlagzeile": "Kontrolle von Ein- und Ausreisen an der Grenze",
      "beschreibung": "10 Stellen frei. Arbeitsplatz an Grenzstationen mit stehender Tätigkeit und direktem Kontakt zu Bürgern.\n\nAufgaben:\n- Kontrolle von Ein- und Ausreisen\n- Prüfung von Ausweisen und Genehmigungen\n- Dokumentation von Grenzübertritten\n- Unterstützung der Polizei bei Sicherheitsfragen\n\nVoraussetzungen:\nMindestens Klasse 7, Verantwortungsbewusstsein, freundliches aber bestimmtes Auftreten.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Nico Fischer",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 108,
      "titel": "Staatsbank – Bankangestellte/r",
      "abteilung": "Behörde",
      "schlagzeile": "Geldausgabe, Konten und Beratung",
      "beschreibung": "5 Stellen frei. Sitzende Tätigkeit in der Staatsbank mit Kundenkontakt und Verantwortung für Geldbestände.\n\nAufgaben:\n- Ausgabe und Annahme von Geld\n- Führung einfacher Konten\n- Dokumentation von Ein- und Auszahlungen\n- Beratung zu Währung und Bankfragen\n\nVoraussetzungen:\nSorgfältiges Arbeiten, Zuverlässigkeit, Grundverständnis für Zahlen und Geld.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Nico Schönfeld",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 109,
      "titel": "Wirtschaftsprüfung – Wirtschaftsprüfer/in",
      "abteilung": "Behörde",
      "schlagzeile": "Unternehmen und Behörden im Schulstaat prüfen",
      "beschreibung": "3 Stellen frei. Prüfungen in Unternehmen und Behörden des Schulstaats, Arbeit mit Unterlagen und Zahlen.\n\nAufgaben:\n- Kontrolle von Unternehmen und Behörden\n- Überprüfung von Einnahmen und Ausgaben\n- Aufdecken von Unregelmäßigkeiten\n- Erstellung kurzer Prüfberichte\n\nVoraussetzungen:\nGenauigkeit, mathematisches Verständnis, Verschwiegenheit.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Nico Schönfeld",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 110,
      "titel": "Gesundheitsamt – Angestellte/r",
      "abteilung": "Behörde",
      "schlagzeile": "Hygienekontrollen im gesamten Schulstaat",
      "beschreibung": "3 Stellen frei. Kontrollen an verschiedenen Orten im Schulstaat mit engem Austausch zu Betrieben.\n\nAufgaben:\n- Überwachung von Hygienevorschriften\n- Beratung bei Gesundheitsfragen\n- Kontrolle von Essens- und Verkaufsständen\n- Dokumentation möglicher Gesundheitsprobleme\n\nVoraussetzungen:\nVerantwortungsbewusstsein, Interesse an Gesundheit und Hygiene, freundlicher Umgang.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Noël Fritz",
      "gewinnanteil": "",
      "versteckt": false
    },
    {
      "id": 111,
      "titel": "Erste-Hilfe-Dienst – Beauftragte/r",
      "abteilung": "Behörde",
      "schlagzeile": "Erstversorgung und Bereitschaftsdienst im Schulstaat",
      "beschreibung": "3 Stellen frei. Bereitschaftsdienst an festgelegten Standorten und mobile Einsätze im Schulstaat.\n\nAufgaben:\n- Erstversorgung bei kleineren Verletzungen\n- Dokumentation von Einsätzen\n- Ansprechpartner bei gesundheitlichen Problemen\n- Zusammenarbeit mit Lehrkräften und Gesundheitsamt\n\nVoraussetzungen:\nErste-Hilfe-Ausbildungszertifikat, Belastbarkeit, ruhiges Auftreten.",
      "lohnProH": 0,
      "lohnTyp": "h",
      "offen": true,
      "kontakt": "Noël Fritz",
      "gewinnanteil": "",
      "versteckt": false
    }
  ],
  "werbeflaechen": [
    {
      "id": 1,
      "name": "Sidebar oben",
      "groesse": "300×250",
      "preis": 5,
      "belegt": false,
      "mieter": "",
      "kontakt": "",
      "beschreibung": "Sidebar oben rechts auf dem Dashboard.",
      "bildUrl": "",
      "slot": "dashboard_sidebar_1",
      "oeffentlich": true
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
      "slot": "dashboard_sidebar_2",
      "oeffentlich": true
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
      "slot": "dashboard_sidebar_3",
      "oeffentlich": true
    },
    {
      "id": 4,
      "name": "Footer Leaderboard",
      "groesse": "728×90",
      "preis": 6,
      "belegt": false,
      "mieter": "",
      "kontakt": "",
      "beschreibung": "Breiter Banner ganz unten auf dem Dashboard.",
      "bildUrl": "",
      "slot": "dashboard_footer",
      "oeffentlich": true
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
      "slot": "stellen_inline_1",
      "oeffentlich": false
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
      "slot": "stellen_inline_2",
      "oeffentlich": false
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
      "slot": "stellen_inline_3",
      "oeffentlich": false
    },
    {
      "id": 8,
      "name": "Gesetze Sidebar",
      "groesse": "300×250",
      "preis": 4.5,
      "belegt": false,
      "mieter": "",
      "kontakt": "",
      "beschreibung": "Sidebar neben den Gesetzbüchern.",
      "bildUrl": "",
      "slot": "gesetze_sidebar",
      "oeffentlich": true
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
    "nachrichten": 1,
    "termine": 1,
    "stellenangebote": 112,
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

// Schreib-/Lese-Ziel: Railway-Volume (DATA_PATH) hat Vorrang, sonst lokale Datei.
const DB_TARGET = process.env.DATA_PATH
  ? path.join(process.env.DATA_PATH, "db.json")
  : DB_FILE;

function load() {
  let d = null;
  // 1. Volume-Daten (Railway) haben Vorrang
  if (process.env.DATA_PATH) {
    try {
      const volumeFile = path.join(process.env.DATA_PATH, "db.json");
      if (fs.existsSync(volumeFile)) d = JSON.parse(fs.readFileSync(volumeFile, "utf-8"));
    } catch (e) { d = null; }
  }
  // 2. Sonst: lokale db.json
  if (!d) {
    try {
      if (fs.existsSync(DB_FILE)) d = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
    } catch (e) { d = null; }
  }
  // 3. Nur wenn NIRGENDS eine db.json existiert: DEFAULT_DATA und neu anlegen
  if (!d) {
    d = JSON.parse(JSON.stringify(DEFAULT_DATA));
    save(d);
    return d;
  }
  // Migrationen für bestehende Datenbestände
  let changed = false;
  // Migrate: add werbeflaechen if missing
  if (!d.werbeflaechen) { d.werbeflaechen = DEFAULT_DATA.werbeflaechen; if (!d._nextId) d._nextId = {}; d._nextId.werbeflaechen = 4; changed = true; }
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
function save(data) { fs.writeFileSync(DB_TARGET, JSON.stringify(data, null, 2)); }

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
