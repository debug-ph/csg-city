const express    = require("express");
const session    = require("express-session");
const helmet     = require("helmet");
const rateLimit  = require("express-rate-limit");
const path       = require("path");
const fs         = require("fs");
const OTPAuth    = require("otpauth");
const QRCode     = require("qrcode");
const crypto     = require("crypto");

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

const MAINTENANCE = true; // <- auf false setzen um Wartung zu beenden

// Uploads-Ordner erstellen falls nicht vorhanden
const uploadsDir = path.join(__dirname, "public", "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// ── Logging ──────────────────────────────────────────────────
const logs = [];
function addLog(typ, nachricht, status) {
  if (logs.length >= 200) logs.shift();
  logs.push({ timestamp: new Date().toISOString(), typ, nachricht, status: status || "info" });
}

// Session-Secret ausschließlich aus der Umgebung. Ist keins gesetzt (z.B. lokale
// Entwicklung), wird ein zufälliges pro Prozess erzeugt – niemals ein festes
// Secret im Quellcode, das im öffentlichen Repo einsehbar wäre.
const SESSION_SECRET = process.env.SESSION_SECRET || crypto.randomBytes(32).toString("hex");
if (!process.env.SESSION_SECRET) console.warn("WARNUNG: SESSION_SECRET nicht gesetzt! Zufälliges Secret generiert – Sessions gehen bei jedem Neustart verloren. Bitte als Umgebungsvariable konfigurieren.");

// CSP deaktiviert: Seiten nutzen Inline-Scripts, die 'script-src self' blockieren würde
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static(path.join(__dirname, "public")));
app.set("trust proxy", 1);
app.use(session({
  secret: SESSION_SECRET,
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

// ── Wartungsmodus-Banner (nur Live, nicht localhost) ─────────
// Injiziert den Banner als Overlay in jede HTML-Seite. Die Seiten werden per
// res.sendFile ausgeliefert (streamt die Datei direkt, ruft res.send NICHT auf),
// deshalb wird res.sendFile ebenfalls gehookt – sonst käme der Banner nie an.
app.use((req, res, next) => {
  if (!MAINTENANCE) return next();
  const host = req.hostname;
  if (host === "localhost" || host === "127.0.0.1") return next();
  if (req.path.startsWith("/api/") || req.path === "/login" ||
      req.path === "/admin") return next();

  const banner = `
<div id="wartungs-banner" style="
  position:fixed;top:0;left:0;right:0;bottom:0;z-index:99999;
  background:rgba(0,0,0,0.85);backdrop-filter:blur(4px);
  display:flex;align-items:center;justify-content:center;
  font-family:system-ui,sans-serif;
">
  <div style="
    background:#1a1f2e;border:1px solid #2E5C8A;border-radius:12px;
    padding:2rem 2.5rem;text-align:center;max-width:420px;margin:1rem;
  ">
    <div style="font-size:2.5rem;margin-bottom:1rem;">🔧</div>
    <h2 style="color:#fff;margin:0 0 0.5rem;font-size:1.4rem;">Wartungspause</h2>
    <p style="color:#aab;margin:0;font-size:0.95rem;line-height:1.5;">
      CSG-City wird gerade gewartet.<br>Wir sind gleich wieder für euch da!
    </p>
  </div>
</div>`;
  const inject = (html) =>
    html.includes("<body") ? html.replace("<body", banner + "<body") : html;

  // String-HTML-Antworten (res.send)
  const origSend = res.send.bind(res);
  res.send = function(body) {
    if (typeof body === "string") body = inject(body);
    return origSend(body);
  };

  // Datei-Antworten (res.sendFile) – Datei lesen, Banner injizieren, senden
  const origSendFile = res.sendFile.bind(res);
  res.sendFile = function(filePath, ...rest) {
    if (typeof filePath === "string" && filePath.endsWith(".html")) {
      return fs.readFile(filePath, "utf8", (err, html) => {
        if (err) return origSendFile(filePath, ...rest);
        res.type("html");
        origSend(inject(html));
      });
    }
    return origSendFile(filePath, ...rest);
  };

  next();
});

// Pages
app.get("/",               (_,res) => res.sendFile(path.join(__dirname,"public/pages/index.html")));
app.get("/stellenangebote",(_,res) => res.sendFile(path.join(__dirname,"public/pages/stellenangebote.html")));
app.get("/werbung",        (_,res) => res.sendFile(path.join(__dirname,"public/pages/werbung.html")));
app.get("/faq",            (_,res) => res.sendFile(path.join(__dirname,"public/pages/faq.html")));
app.get("/login",          (_,res) => res.sendFile(path.join(__dirname,"public/pages/login.html")));
app.get("/admin",          (_,res) => res.sendFile(path.join(__dirname,"public/pages/admin.html")));
app.get("/gesetze",        (_,res) => res.sendFile(path.join(__dirname,"public/pages/gesetze.html")));
app.get("/install",         (_,res) => res.sendFile(path.join(__dirname,"public/pages/install.html")));

// Auth
app.get("/api/auth/status", (req,res) => res.json({ isAdmin: !!req.session.isAdmin }));
// TOTP-Secret ausschließlich aus der Umgebung – kein festes 2FA-Secret im Quellcode.
const TOTP_SECRET = process.env.TOTP_SECRET;
if (!TOTP_SECRET) console.error("FEHLER: TOTP_SECRET nicht als Umgebungsvariable gesetzt – der Admin-Login ist bis zur Konfiguration deaktiviert.");
const path_fs = require("path");
const SETUP_FLAG = path_fs.join(process.env.DATA_PATH || path_fs.join(__dirname, "data"), ".setup_done");

function getTOTP() {
  return new OTPAuth.TOTP({ issuer:"CSG-City", label:"Admin", algorithm:"SHA1", digits:6, period:30, secret:OTPAuth.Secret.fromBase32(TOTP_SECRET) });
}

function isSetupDone() {
  try { require("fs").readFileSync(SETUP_FLAG); return true; } catch(e) { return false; }
}
function markSetupDone() {
  require("fs").writeFileSync(SETUP_FLAG, "1");
}

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Zu viele Login-Versuche. Bitte 15 Minuten warten." },
  standardHeaders: true,
  legacyHeaders: false
});

app.get("/api/admin/setup-qr", loginLimiter, (req,res) => {
  if (!TOTP_SECRET) return res.status(503).json({error:"Server nicht konfiguriert (TOTP_SECRET fehlt)."});
  if (isSetupDone()) {
    return res.status(403).json({error:"Einrichtung bereits abgeschlossen."});
  }
  QRCode.toDataURL(getTOTP().toString(), {width:256}, (err,qr) => {
    if(err) return res.status(500).json({error:"Fehler"});
    markSetupDone();
    res.json({qr, secret:TOTP_SECRET});
  });
});

app.post("/api/login", loginLimiter, (req,res) => {
  if (!TOTP_SECRET) return res.status(503).json({error:"Server nicht konfiguriert (TOTP_SECRET fehlt)."});
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
  const offeneStellen = db.all("stellenangebote").filter(s => s.offen && !s.versteckt);
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
// Titel normalisieren, damit "Fitte Fritten - X" und "Fitte Fritten – X"
// (Bindestrich vs. Gedankenstrich, Groß-/Kleinschreibung, doppelte Leerzeichen,
// (m/w/d)-Zusatz) als identisch erkannt werden.
function normTitel(t) {
  return String(t || "")
    .toLowerCase()
    .replace(/\(m\/w\/d\)|\(w\/m\/d\)/g, "")
    .replace(/[–—-]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

app.post("/api/stellenangebote", adm, (req,res) => {
  const { titel, abteilung, schlagzeile, beschreibung, lohnProH, lohnTyp, offen, kontakt, gewinnanteil } = req.body;
  if (!titel) return res.status(400).json({ error: "Titel fehlt" });
  const dup = db.all("stellenangebote").find(s => normTitel(s.titel) === normTitel(titel));
  if (dup) return res.status(409).json({ error: 'Eine Stelle mit dem Titel "' + titel + '" existiert bereits.' });
  const row = db.insert("stellenangebote", { titel, abteilung: abteilung||"", schlagzeile: schlagzeile||"", beschreibung: beschreibung||"", lohnProH: parseFloat(lohnProH)||0, lohnTyp: lohnTyp||"h", offen: offen !== false, kontakt: kontakt||"", gewinnanteil: gewinnanteil||"" });
  addLog("admin", "Stelle erstellt: " + titel, "success");
  syncWerbeflaechen();
  res.json(row);
});
app.put("/api/stellenangebote/:id", adm, (req,res) => {
  const { titel, abteilung, schlagzeile, beschreibung, lohnProH, lohnTyp, offen, kontakt, gewinnanteil, versteckt } = req.body;
  const ch = { titel, abteilung, schlagzeile: schlagzeile||"", beschreibung, lohnProH: parseFloat(lohnProH)||0, lohnTyp: lohnTyp||"h", offen, kontakt: kontakt||"", gewinnanteil: gewinnanteil||"" };
  // versteckt nur überschreiben, wenn ausdrücklich mitgeschickt – das normale
  // Bearbeiten-Formular sendet das Feld nicht und soll den Zustand nicht ändern.
  if (typeof versteckt === "boolean") ch.versteckt = versteckt;
  db.update("stellenangebote", req.params.id, ch);
  addLog("admin", "Stelle aktualisiert: " + (titel||req.params.id), "info");
  syncWerbeflaechen();
  res.json({ success: true });
});
app.post("/api/stellenangebote/:id/verstecken", adm, (req,res) => {
  db.update("stellenangebote", req.params.id, { versteckt: true });
  addLog("admin", "Stelle ausgeblendet (ID " + req.params.id + ")", "info");
  syncWerbeflaechen();
  res.json({ success: true });
});
app.post("/api/stellenangebote/:id/einblenden", adm, (req,res) => {
  db.update("stellenangebote", req.params.id, { versteckt: false });
  addLog("admin", "Stelle eingeblendet (ID " + req.params.id + ")", "info");
  syncWerbeflaechen();
  res.json({ success: true });
});
app.delete("/api/stellenangebote/:id", adm, (req,res) => {
  db.delete("stellenangebote", req.params.id);
  addLog("admin", "Stelle gelöscht (ID " + req.params.id + ")", "info");
  syncWerbeflaechen();
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
  const { name, groesse, preis, belegt, mieter, kontakt, beschreibung, bildUrl, slot, oeffentlich } = req.body;
  if (!name) return res.status(400).json({ error: "Name fehlt" });
  const theSlot = slot||"werbung";
  const oeff = typeof oeffentlich === "boolean" ? oeffentlich : !(theSlot.indexOf("stellen_inline_") === 0);
  const row = db.insert("werbeflaechen", { name, groesse: groesse||"", preis: parseFloat(preis)||0, belegt: belegt===true||belegt==="true", mieter: mieter||"", kontakt: kontakt||"", beschreibung: beschreibung||"", bildUrl: bildUrl||"", slot: theSlot, oeffentlich: oeff });
  addLog("admin", "Werbefläche erstellt: " + name, "success");
  res.json(row);
});
app.put("/api/werbeflaechen/:id", adm, (req,res) => {
  const { name, groesse, preis, belegt, mieter, kontakt, beschreibung, bildUrl, slot, oeffentlich } = req.body;
  const ch = { name, groesse, preis: parseFloat(preis)||0, belegt: belegt===true||belegt==="true", mieter: mieter||"", kontakt: kontakt||"", beschreibung, slot: slot||"werbung" };
  // bildUrl nur überschreiben wenn mitgeschickt – sonst bleibt das per /bild hochgeladene Bild erhalten (leeren-Route löscht es).
  if (typeof bildUrl === "string") ch.bildUrl = bildUrl;
  if (typeof oeffentlich === "boolean") ch.oeffentlich = oeffentlich;
  db.update("werbeflaechen", req.params.id, ch);
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

app.post("/api/werbeflaechen/:id/bild", adm, (req,res) => {
  const { imageData } = req.body;
  if (!imageData || typeof imageData !== "string" || imageData.indexOf("data:image/") !== 0) {
    return res.status(400).json({ error: "Kein gültiges Bild übermittelt" });
  }
  db.update("werbeflaechen", req.params.id, { bildUrl: imageData });
  addLog("admin", "Werbebild aktualisiert (ID " + req.params.id + ")", "info");
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

// Inline-Werbeslots automatisch an die Anzahl offener Stellen anpassen.
// Benötigte Slots = ceil(offene Stellen / 10). Fehlende werden erstellt,
// überflüssige (nicht gebuchte) gelöscht. Zusätzlich Migration des
// oeffentlich-Feldes für Alt-Daten ohne dieses Feld.
function syncWerbeflaechen() {
  try {
    const raw = db.getRaw();
    if (!Array.isArray(raw.werbeflaechen)) raw.werbeflaechen = [];
    if (!raw._nextId) raw._nextId = {};
    let changed = false;

    // Migration: oeffentlich-Feld ergänzen (Inline = privat, Rest = öffentlich)
    raw.werbeflaechen.forEach(w => {
      if (typeof w.oeffentlich !== "boolean") {
        w.oeffentlich = !(w.slot && w.slot.indexOf("stellen_inline_") === 0);
        changed = true;
      }
    });

    const offen = (raw.stellenangebote || []).filter(s => s.offen && !s.versteckt).length;
    const needed = Math.ceil(offen / 10);

    const inlineIdx = w => { const m = /^stellen_inline_(\d+)$/.exec(w.slot || ""); return m ? Number(m[1]) : null; };
    const existing = {};
    raw.werbeflaechen.forEach(w => { const n = inlineIdx(w); if (n) existing[n] = w; });

    // Fehlende Inline-Slots erstellen
    for (let i = 1; i <= needed; i++) {
      if (!existing[i]) {
        const id = raw._nextId.werbeflaechen || (Math.max(0, ...raw.werbeflaechen.map(w => w.id || 0)) + 1);
        raw._nextId.werbeflaechen = id + 1;
        raw.werbeflaechen.push({
          id, name: "Stellen Inline " + i, groesse: "300×140", preis: 4,
          belegt: false, mieter: "", kontakt: "",
          beschreibung: "Inline-Werbung zwischen Stellenangeboten (Pos. " + i + ").",
          bildUrl: "", slot: "stellen_inline_" + i, oeffentlich: false
        });
        changed = true;
      }
    }

    // Überflüssige Inline-Slots löschen – gebuchte (belegt) bleiben erhalten,
    // damit bezahlte Buchungen nicht verloren gehen.
    const before = raw.werbeflaechen.length;
    raw.werbeflaechen = raw.werbeflaechen.filter(w => {
      const n = inlineIdx(w);
      return !(n && n > needed && !w.belegt);
    });
    if (raw.werbeflaechen.length !== before) changed = true;

    if (changed) {
      db.saveRaw(raw);
      addLog("system", "Werbeflächen synchronisiert: " + needed + " Inline-Slot(s) für " + offen + " offene Stellen", "info");
    }
  } catch (e) {
    console.error("syncWerbeflaechen Fehler:", e);
  }
}

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
  syncWerbeflaechen();
  setInterval(() => {
    try { db.saveRaw(db.getRaw()); } catch(e) { console.error("Auto-Save Fehler:", e); }
  }, 30000);
  scheduleMidnightBackup();
});
