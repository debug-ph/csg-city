Erstelle sofort ein Backup der aktuellen Datenbank-Datei:

1. Ermittle den Pfad zur Datenbankdatei:
   - Falls die Umgebungsvariable `DATA_PATH` gesetzt ist, lies die Datei von dort
   - Andernfalls lies `data/db.json` aus dem Projektverzeichnis

2. Lese die Datei und kopiere sie nach `backups/manual-backup-YYYYMMDD_HHMMSS.json`
   (Zeitstempel im Format: `date +%Y%m%d_%H%M%S`)

3. Bestätige mit dem genauen Dateinamen und der Dateigröße der Sicherung.
