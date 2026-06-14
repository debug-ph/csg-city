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
      "offen": true,
      "kontakt": "",
      "gewinnanteil": false
    },
    {
      "id": 2,
      "titel": "Staatsanwalt/-anwältin",
      "abteilung": "Justiz",
      "beschreibung": "Vertretung des Staates bei Gerichtsverfahren.",
      "lohnProH": 22,
      "offen": true,
      "kontakt": "",
      "gewinnanteil": false
    },
    {
      "id": 3,
      "titel": "Steuerprüfer/-in",
      "abteilung": "Finanzministerium",
      "beschreibung": "Überprüfung von Steuererklärungen aller Bürger.",
      "lohnProH": 16.5,
      "offen": true,
      "kontakt": "",
      "gewinnanteil": false
    },
    {
      "id": 4,
      "titel": "Polizeibeamter/-in",
      "abteilung": "Polizei",
      "beschreibung": "Aufrechterhaltung von Ordnung und Sicherheit.",
      "lohnProH": 15,
      "offen": true,
      "kontakt": "",
      "gewinnanteil": false
    },
    {
      "id": 5,
      "titel": "Redakteur/-in",
      "abteilung": "Staatszeitung",
      "beschreibung": "Berichte für das offizielle Staatsblatt verfassen.",
      "lohnProH": 14,
      "offen": false,
      "kontakt": "",
      "gewinnanteil": false
    },
    {
      "id": 6,
      "titel": "Richter/-in",
      "abteilung": "Justiz",
      "beschreibung": "Unabhängige Rechtsprechung im Staatsgericht.",
      "lohnProH": 24,
      "offen": true,
      "kontakt": "",
      "gewinnanteil": false
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
    "gesetze": []
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
    "gesetze": 3
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
    }
  ]
};

function load() {
  if (!fs.existsSync(DB_FILE)) { fs.writeFileSync(DB_FILE, JSON.stringify(DEFAULT_DATA, null, 2)); return JSON.parse(JSON.stringify(DEFAULT_DATA)); }
  const d = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
  // Migrate: add werbeflaechen if missing
  if (!d.werbeflaechen) { d.werbeflaechen = DEFAULT_DATA.werbeflaechen; d._nextId.werbeflaechen = 4; save(d); }
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
