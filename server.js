const express    = require("express");
const session    = require("express-session");
const helmet     = require("helmet");
const rateLimit  = require("express-rate-limit");
const path       = require("path");
const fs         = require("fs");
const OTPAuth    = require("otpauth");
const QRCode     = require("qrcode");

// data/-Ordner sicherstellen bevor require('./data/database') läuft
fs.mkdirSync(path.join(__dirname, "data"), { recursive: true });

// Falls Volume data/ überschrieben hat: database.js aus Root-Backup wiederherstellen
if (process.env.DATA_PATH) {
  fs.mkdirSync(process.env.DATA_PATH, { recursive: true });
  const dbDst = path.join(__dirname, "data", "database.js");
  const dbSrc = path.join(__dirname, "database.js");
  if (!fs.existsSync(dbDst) && fs.existsSync(dbSrc)) {
    fs.copyFileSync(dbSrc, dbDst);
  }
}

const db = require("./data/database");

const app  = express();
const PORT = process.env.PORT || 3000;

const DB_FILE   = path.join(__dirname, "data", "db.json");
const BACKUP_DIR = process.env.DATA_PATH || path.join(__dirname, "data");

// Uploads-Ordner erstellen falls nicht vorhanden
const uploadsDir = path.join(__dirname, "public", "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// ── Logging ──────────────────────────────────────────────────
const logs = [];
function addLog(typ, nachricht, status) {
  if (logs.length >= 200) logs.shift();
  logs.push({ timestamp: new Date().toISOString(), typ, nachricht, status: status || "info" });
}

const SESSION_SECRET = process.env.SESSION_SECRET;
if (!SESSION_SECRET) console.warn("WARNUNG: SESSION_SECRET nicht gesetzt! Bitte als Umgebungsvariable konfigurieren.");

// CSP deaktiviert: Seiten nutzen Inline-Scripts, die 'script-src self' blockieren würde
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static(path.join(__dirname, "public")));
app.set("trust proxy", 1);
app.use(session({
  secret: SESSION_SECRET || "csg-city-fallback-bitte-aendern",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 4,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  }
}));

const adm = (req,res,next) => req.session && req.session.isAdmin ? next() : res.status(401).json({ error: "Nicht autorisiert" });

// Pages
app.get("/",               (_,res) => res.sendFile(path.join(__dirname,"public/pages/index.html")));
app.get("/stellenangebote",(_,res) => res.sendFile(path.join(__dirname,"public/pages/stellenangebote.html")));
app.get("/werbung",        (_,res) => res.sendFile(path.join(__dirname,"public/pages/werbung.html")));
app.get("/faq",            (_,res) => res.sendFile(path.join(__dirname,"public/pages/faq.html")));
app.get("/login",          (_,res) => res.sendFile(path.join(__dirname,"public/pages/login.html")));
app.get("/admin",          (_,res) => res.sendFile(path.join(__dirname,"public/pages/admin.html")));
app.get("/gesetze",        (_,res) => res.sendFile(path.join(__dirname,"public/pages/gesetze.html")));

// Auth
app.get("/api/auth/status", (req,res) => res.json({ isAdmin: !!req.session.isAdmin }));
const TOTP_SECRET = process.env.TOTP_SECRET || "ND7NTFOAVACPAYSM4EW33HFJHRQBI2PH";
if (!process.env.TOTP_SECRET) console.warn("WARNUNG: TOTP_SECRET nicht als Umgebungsvariable gesetzt.");
const path_fs = require("path");
const SETUP_FLAG = path_fs.join(__dirname, "data", ".setup_done");

function getTOTP() {
  return new OTPAuth.TOTP({ issuer:"CSG-City", label:"Admin", algorithm:"SHA1", digits:6, period:30, secret:OTPAuth.Secret.fromBase32(TOTP_SECRET) });
}

function isSetupDone() {
  try { require("fs").readFileSync(SETUP_FLAG); return true; } catch(e) { return false; }
}
function markSetupDone() {
  require("fs").writeFileSync(SETUP_FLAG, "1");
}

app.get("/api/admin/setup-qr", (req,res) => {
  if (isSetupDone()) {
    return res.status(403).json({error:"Einrichtung bereits abgeschlossen."});
  }
  QRCode.toDataURL(getTOTP().toString(), {width:256}, (err,qr) => {
    if(err) return res.status(500).json({error:"Fehler"});
    markSetupDone();
    res.json({qr, secret:TOTP_SECRET});
  });
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Zu viele Login-Versuche. Bitte 15 Minuten warten." },
  standardHeaders: true,
  legacyHeaders: false
});

app.post("/api/login", loginLimiter, (req,res) => {
  const { username, totp } = req.body;
  if (username !== "Admin") {
    addLog("login", "Login-Versuch mit ungültigem Benutzernamen: " + (username||"–"), "error");
    return res.status(401).json({error:"Ungültiger Benutzername"});
  }
  if (!totp || totp.length !== 6) return res.status(400).json({error:"6-stelligen Code eingeben"});
  if (getTOTP().validate({token:totp, window:1}) !== null) {
    req.session.isAdmin = true;
    addLog("login", "Admin erfolgreich eingeloggt", "success");
    return res.json({success:true});
  }
  addLog("login", "Login fehlgeschlagen: ungültiger TOTP-Code", "error");
  res.status(401).json({error:"Ungültiger Code"});
});

app.post("/api/logout", (req,res) => {
  addLog("login", "Admin abgemeldet", "info");
  req.session.destroy();
  res.json({ success: true });
});

// Dashboard
app.get("/api/dashboard", (_,res) => {
  const offeneStellen = db.all("stellenangebote").filter(s => s.offen);
  res.json({
    nachrichten:        db.latest("nachrichten", 3),
    termine:            db.oldest("termine", 4),
    stellenangebote:    offeneStellen.slice(0, 6),
    totalOffeneStellen: offeneStellen.length,
    werbeflaechen:      db.all("werbeflaechen")
  });
});

// Stellenangebote
app.get("/api/stellenangebote", (_,res) => res.json(db.all("stellenangebote")));
app.post("/api/stellenangebote", adm, (req,res) => {
  const { titel, abteilung, schlagzeile, beschreibung, lohnProH, lohnTyp, offen, kontakt, gewinnanteil } = req.body;
  if (!titel) return res.status(400).json({ error: "Titel fehlt" });
  const row = db.insert("stellenangebote", { titel, abteilung: abteilung||"", schlagzeile: schlagzeile||"", beschreibung: beschreibung||"", lohnProH: parseFloat(lohnProH)||0, lohnTyp: lohnTyp||"h", offen: offen !== false, kontakt: kontakt||"", gewinnanteil: gewinnanteil||"" });
  addLog("admin", "Stelle erstellt: " + titel, "success");
  res.json(row);
});
app.put("/api/stellenangebote/:id", adm, (req,res) => {
  const { titel, abteilung, schlagzeile, beschreibung, lohnProH, lohnTyp, offen, kontakt, gewinnanteil } = req.body;
  db.update("stellenangebote", req.params.id, { titel, abteilung, schlagzeile: schlagzeile||"", beschreibung, lohnProH: parseFloat(lohnProH)||0, lohnTyp: lohnTyp||"h", offen, kontakt: kontakt||"", gewinnanteil: gewinnanteil||"" });
  addLog("admin", "Stelle aktualisiert: " + (titel||req.params.id), "info");
  res.json({ success: true });
});
app.delete("/api/stellenangebote/:id", adm, (req,res) => {
  db.delete("stellenangebote", req.params.id);
  addLog("admin", "Stelle gelöscht (ID " + req.params.id + ")", "info");
  res.json({ success: true });
});

// Nachrichten
app.get("/api/nachrichten", adm, (_,res) => res.json(db.all("nachrichten")));
app.post("/api/nachrichten", adm, (req,res) => {
  const { titel, inhalt, datum } = req.body;
  if (!titel) return res.status(400).json({ error: "Titel fehlt" });
  const row = db.insert("nachrichten", { titel, inhalt: inhalt||"", datum: datum||new Date().toISOString().split("T")[0] });
  addLog("admin", "Mitteilung erstellt: " + titel, "success");
  res.json(row);
});
app.put("/api/nachrichten/:id", adm, (req,res) => {
  db.update("nachrichten", req.params.id, req.body);
  addLog("admin", "Mitteilung aktualisiert (ID " + req.params.id + ")", "info");
  res.json({ success: true });
});
app.delete("/api/nachrichten/:id", adm, (req,res) => {
  db.delete("nachrichten", req.params.id);
  addLog("admin", "Mitteilung gelöscht (ID " + req.params.id + ")", "info");
  res.json({ success: true });
});

// Termine
app.get("/api/termine", adm, (_,res) => res.json(db.all("termine")));
app.post("/api/termine", adm, (req,res) => {
  const { titel, beschreibung, datum } = req.body;
  if (!titel || !datum) return res.status(400).json({ error: "Titel und Datum fehlen" });
  const row = db.insert("termine", { titel, beschreibung: beschreibung||"", datum });
  addLog("admin", "Termin erstellt: " + titel, "success");
  res.json(row);
});
app.put("/api/termine/:id", adm, (req,res) => {
  db.update("termine", req.params.id, req.body);
  addLog("admin", "Termin aktualisiert (ID " + req.params.id + ")", "info");
  res.json({ success: true });
});
app.delete("/api/termine/:id", adm, (req,res) => {
  db.delete("termine", req.params.id);
  addLog("admin", "Termin gelöscht (ID " + req.params.id + ")", "info");
  res.json({ success: true });
});

// Werbeflächen
app.get("/api/werbeflaechen", (_,res) => res.json(db.all("werbeflaechen")));
app.post("/api/werbeflaechen", adm, (req,res) => {
  const { name, groesse, preis, belegt, mieter, kontakt, beschreibung, bildUrl, slot } = req.body;
  if (!name) return res.status(400).json({ error: "Name fehlt" });
  const row = db.insert("werbeflaechen", { name, groesse: groesse||"", preis: parseFloat(preis)||0, belegt: belegt===true||belegt==="true", mieter: mieter||"", kontakt: kontakt||"", beschreibung: beschreibung||"", bildUrl: bildUrl||"", slot: slot||"werbung" });
  addLog("admin", "Werbefläche erstellt: " + name, "success");
  res.json(row);
});
app.put("/api/werbeflaechen/:id", adm, (req,res) => {
  const { name, groesse, preis, belegt, mieter, kontakt, beschreibung, bildUrl, slot } = req.body;
  db.update("werbeflaechen", req.params.id, { name, groesse, preis: parseFloat(preis)||0, belegt: belegt===true||belegt==="true", mieter: mieter||"", kontakt: kontakt||"", beschreibung, bildUrl: bildUrl||"", slot: slot||"werbung" });
  addLog("admin", "Werbefläche aktualisiert: " + (name||req.params.id), "info");
  res.json({ success: true });
});
app.delete("/api/werbeflaechen/:id", adm, (req,res) => {
  db.delete("werbeflaechen", req.params.id);
  addLog("admin", "Werbefläche gelöscht (ID " + req.params.id + ")", "info");
  res.json({ success: true });
});

app.post("/api/werbeflaechen/:id/leeren", adm, (req,res) => {
  db.update("werbeflaechen", req.params.id, { belegt: false, mieter: "", kontakt: "", bildUrl: "" });
  addLog("admin", "Werbefläche geleert (ID " + req.params.id + ")", "info");
  res.json({ success: true });
});

// Anfragen API
app.get("/api/anfragen", adm, (_,res) => res.json(db.all("anfragen")));
app.post("/api/anfragen", (req,res) => {
  const { name, email, firma, flaeche, nachricht } = req.body;
  if (!name || !email) return res.status(400).json({ error: "Name und Email fehlen" });
  const entry = db.insert("anfragen", { name, email, firma:firma||"", flaeche:flaeche||"", nachricht:nachricht||"", status:"neu" });
  addLog("admin", "Neue Werbeanfrage von: " + name, "info");
  res.json({ success: true, id: entry.id });
});
app.put("/api/anfragen/:id", adm, (req,res) => {
  db.update("anfragen", req.params.id, req.body);
  res.json({ success: true });
});
app.delete("/api/anfragen/:id", adm, (req,res) => {
  db.delete("anfragen", req.params.id);
  addLog("admin", "Anfrage gelöscht (ID " + req.params.id + ")", "info");
  res.json({ success: true });
});

// Gesetze API
app.get("/api/gesetze", (_,res) => res.json(db.all("gesetze")));
app.post("/api/gesetze", adm, (req,res) => {
  const { name, kurzname, ministerium, icon, version } = req.body;
  if (!name) return res.status(400).json({ error: "Name fehlt" });
  const row = db.insert("gesetze", { name, kurzname:kurzname||"", ministerium:ministerium||"", icon:icon||"constitution", version:version||"", paragraphen:[] });
  addLog("admin", "Gesetzbuch erstellt: " + name, "success");
  res.json(row);
});
app.put("/api/gesetze/:id", adm, (req,res) => {
  const raw = db.getRaw();
  const idx = (raw.gesetze||[]).findIndex(g => g.id === Number(req.params.id));
  if (idx===-1) return res.status(404).json({ error: "Nicht gefunden" });
  const { name, kurzname, ministerium, icon, version } = req.body;
  Object.assign(raw.gesetze[idx], { name, kurzname:kurzname||"", ministerium:ministerium||"", icon:icon||"constitution", version:version||"" });
  db.saveRaw(raw);
  addLog("admin", "Gesetzbuch aktualisiert: " + (name||req.params.id), "info");
  res.json({ success: true });
});
app.delete("/api/gesetze/:id", adm, (req,res) => {
  db.delete("gesetze", req.params.id);
  addLog("admin", "Gesetzbuch gelöscht (ID " + req.params.id + ")", "info");
  res.json({ success: true });
});
app.post("/api/gesetze/:id/paragraphen", adm, (req,res) => {
  const { nummer, titel, absaetze } = req.body;
  const raw = db.getRaw();
  const book = (raw.gesetze||[]).find(g => g.id === Number(req.params.id));
  if (!book) return res.status(404).json({ error: "Nicht gefunden" });
  if (!book.paragraphen) book.paragraphen = [];
  const pid = (book._nextPid || 1); book._nextPid = pid + 1;
  const para = { id: pid, nummer:nummer||"", titel:titel||"", absaetze:absaetze||[] };
  book.paragraphen.push(para);
  db.saveRaw(raw);
  addLog("admin", "Paragraph hinzugefügt: " + (nummer||"") + " in Buch " + req.params.id, "success");
  res.json(para);
});
app.put("/api/gesetze/:id/paragraphen/:pid", adm, (req,res) => {
  const { nummer, titel, absaetze } = req.body;
  const raw = db.getRaw();
  const book = (raw.gesetze||[]).find(g => g.id === Number(req.params.id));
  if (!book) return res.status(404).json({ error: "Nicht gefunden" });
  const pidx = (book.paragraphen||[]).findIndex(p => p.id === Number(req.params.pid));
  if (pidx===-1) return res.status(404).json({ error: "Paragraph nicht gefunden" });
  Object.assign(book.paragraphen[pidx], { nummer, titel, absaetze:absaetze||[] });
  db.saveRaw(raw);
  res.json({ success: true });
});
app.delete("/api/gesetze/:id/paragraphen/:pid", adm, (req,res) => {
  const raw = db.getRaw();
  const book = (raw.gesetze||[]).find(g => g.id === Number(req.params.id));
  if (!book) return res.status(404).json({ error: "Nicht gefunden" });
  book.paragraphen = (book.paragraphen||[]).filter(p => p.id !== Number(req.params.pid));
  db.saveRaw(raw);
  res.json({ success: true });
});

// FAQ API
app.get("/api/faq", (_,res) => {
  const raw = db.getRaw();
  res.json(raw.faq || []);
});
app.put("/api/faq", adm, (req,res) => {
  const raw = db.getRaw();
  raw.faq = req.body;
  db.saveRaw(raw);
  addLog("admin", "FAQ aktualisiert", "info");
  res.json({ success: true });
});

// Backup & Restore
app.get("/api/admin/backup", adm, (req, res) => {
  const date = new Date().toISOString().split("T")[0];
  addLog("backup", "Manuelles Backup heruntergeladen", "success");
  res.setHeader("Content-Disposition", `attachment; filename="csg-city-backup-${date}.json"`);
  res.setHeader("Content-Type", "application/json");
  res.sendFile(DB_FILE);
});

app.get("/api/admin/backups", adm, (req, res) => {
  try {
    const files = fs.readdirSync(BACKUP_DIR)
      .filter(f => f.startsWith("backup-") && f.endsWith(".json"))
      .sort().reverse();
    res.json(files);
  } catch(e) { res.json([]); }
});

app.get("/api/admin/backup/status", adm, (req, res) => {
  try {
    const files = fs.readdirSync(BACKUP_DIR)
      .filter(f => f.startsWith("backup-") && f.endsWith(".json"))
      .sort().reverse();
    res.json({ lastBackup: files[0] || null, count: files.length });
  } catch(e) { res.json({ lastBackup: null, count: 0 }); }
});

app.post("/api/admin/restore", adm, (req, res) => {
  try {
    const data = req.body;
    if (!data || typeof data !== "object" || Array.isArray(data))
      return res.status(400).json({ error: "Ungültige JSON-Datei" });
    const required = ["nachrichten","termine","stellenangebote","werbeflaechen","anfragen","gesetze"];
    for (const key of required) {
      if (!Object.prototype.hasOwnProperty.call(data, key))
        return res.status(400).json({ error: "Ungültige Backup-Datei: Key '" + key + "' fehlt" });
    }
    // Auto-Backup vor Restore
    try {
      const stamp = new Date().toISOString().replace(/[:.]/g, "-").substring(0, 19);
      if (fs.existsSync(DB_FILE)) fs.copyFileSync(DB_FILE, path.join(BACKUP_DIR, "backup-" + stamp + ".json"));
    } catch(e) {}
    // Daten direkt in den laufenden Speicher schreiben – kein Neustart nötig.
    // db liest bei jeder Operation frisch aus DB_FILE (load()), daher genügt
    // das Schreiben der Datei, damit der laufende Server sofort die neuen Daten liefert.
    db.saveRaw(data);
    addLog("backup", "Backup wiederhergestellt (ohne Neustart)", "success");
    res.json({ success: true });
  } catch(e) {
    console.error("Restore-Fehler:", e);
    res.status(500).json({ error: "Interner Fehler beim Wiederherstellen des Backups." });
  }
});

// Logs
app.get("/api/admin/logs", adm, (req, res) => {
  res.json([...logs].reverse());
});

function autoBackup() {
  try {
    if (!fs.existsSync(DB_FILE)) return;
    const date = new Date().toISOString().split("T")[0];
    const dest = path.join(BACKUP_DIR, "backup-" + date + ".json");
    fs.copyFileSync(DB_FILE, dest);
    const files = fs.readdirSync(BACKUP_DIR)
      .filter(f => f.startsWith("backup-") && f.endsWith(".json")).sort();
    if (files.length > 3)
      files.slice(0, files.length - 3).forEach(f => {
        try { fs.unlinkSync(path.join(BACKUP_DIR, f)); } catch(e) {}
      });
    addLog("backup", "Automatisches Backup erstellt: " + date, "success");
    console.log("Auto-Backup gespeichert:", date);
  } catch(e) {
    addLog("backup", "Auto-Backup Fehler: " + e.message, "error");
    console.error("Auto-Backup Fehler:", e);
  }
}

function scheduleMidnightBackup() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const ms = midnight - now;
  setTimeout(function() {
    autoBackup();
    setInterval(autoBackup, 24 * 60 * 60 * 1000);
  }, ms);
}

app.listen(PORT, () => {
  addLog("system", "Server gestartet auf Port " + PORT, "info");
  console.log("Server läuft auf http://localhost:" + PORT);
  setInterval(() => {
    try { db.saveRaw(db.getRaw()); } catch(e) { console.error("Auto-Save Fehler:", e); }
  }, 30000);
  scheduleMidnightBackup();
});
