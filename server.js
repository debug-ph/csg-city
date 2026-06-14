const express  = require("express");
const session  = require("express-session");
const path     = require("path");
const fs       = require("fs");
const db       = require("./data/database");
const OTPAuth  = require("otpauth");
const QRCode   = require("qrcode");

const app  = express();
const PORT = 3000;

// Uploads-Ordner erstellen falls nicht vorhanden
const uploadsDir = path.join(__dirname, "public", "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: "csg-city-2025", resave: false, saveUninitialized: false, cookie: { maxAge: 1000*60*60*4 } }));

const adm = (req,res,next) => req.session && req.session.isAdmin ? next() : res.status(401).json({ error: "Nicht autorisiert" });

// Pages
app.get("/",               (_,res) => res.sendFile(path.join(__dirname,"public/pages/index.html")));
app.get("/stellenangebote",(_,res) => res.sendFile(path.join(__dirname,"public/pages/stellenangebote.html")));
app.get("/werbung",        (_,res) => res.sendFile(path.join(__dirname,"public/pages/werbung.html")));
app.get("/faq",            (_,res) => res.sendFile(path.join(__dirname,"public/pages/faq.html")));
app.get("/login",          (_,res) => res.sendFile(path.join(__dirname,"public/pages/login.html")));
app.get("/admin",          (_,res) => res.sendFile(path.join(__dirname,"public/pages/admin.html")));

// Auth
app.get("/api/auth/status", (req,res) => res.json({ isAdmin: !!req.session.isAdmin }));
const TOTP_SECRET = "ND7NTFOAVACPAYSM4EW33HFJHRQBI2PH";
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
  // Nur einmal nutzbar
  if (isSetupDone()) {
    return res.status(403).json({error:"Einrichtung bereits abgeschlossen."});
  }
  QRCode.toDataURL(getTOTP().toString(), {width:256}, (err,qr) => {
    if(err) return res.status(500).json({error:"Fehler"});
    // Setup als abgeschlossen markieren
    markSetupDone();
    res.json({qr, secret:TOTP_SECRET});
  });
});
app.post("/api/login", (req,res) => {
  const { username, totp } = req.body;
  if (username !== "Admin") return res.status(401).json({error:"Ungültiger Benutzername"});
  if (!totp || totp.length !== 6) return res.status(400).json({error:"6-stelligen Code eingeben"});
  if (getTOTP().validate({token:totp, window:1}) !== null) {
    req.session.isAdmin = true;
    return res.json({success:true});
  }
  res.status(401).json({error:"Ungültiger Code"});
});
app.post("/api/logout", (req,res) => { req.session.destroy(); res.json({ success: true }); });

// Dashboard
app.get("/api/dashboard", (_,res) => {
  res.json({
    nachrichten:     db.latest("nachrichten", 3),
    termine:         db.oldest("termine", 4),
    stellenangebote: db.all("stellenangebote").filter(s => s.offen).slice(0, 6),
    werbeflaechen:   db.all("werbeflaechen")
  });
});

// Stellenangebote
app.get("/api/stellenangebote", (_,res) => res.json(db.all("stellenangebote")));
app.post("/api/stellenangebote", adm, (req,res) => {
  const { titel, abteilung, beschreibung, lohnProH, offen, kontakt, gewinnanteil } = req.body;
  if (!titel) return res.status(400).json({ error: "Titel fehlt" });
  res.json(db.insert("stellenangebote", { titel, abteilung: abteilung||"", beschreibung: beschreibung||"", lohnProH: parseFloat(lohnProH)||0, offen: offen !== false, kontakt: kontakt||"", gewinnanteil: gewinnanteil===true||gewinnanteil==="true" }));
});
app.put("/api/stellenangebote/:id", adm, (req,res) => {
  const { titel, abteilung, beschreibung, lohnProH, offen, kontakt, gewinnanteil } = req.body;
  db.update("stellenangebote", req.params.id, { titel, abteilung, beschreibung, lohnProH: parseFloat(lohnProH)||0, offen, kontakt: kontakt||"", gewinnanteil: gewinnanteil===true||gewinnanteil==="true" });
  res.json({ success: true });
});
app.delete("/api/stellenangebote/:id", adm, (req,res) => { db.delete("stellenangebote", req.params.id); res.json({ success: true }); });

// Nachrichten
app.get("/api/nachrichten", adm, (_,res) => res.json(db.all("nachrichten")));
app.post("/api/nachrichten", adm, (req,res) => {
  const { titel, inhalt, datum } = req.body;
  if (!titel) return res.status(400).json({ error: "Titel fehlt" });
  res.json(db.insert("nachrichten", { titel, inhalt: inhalt||"", datum: datum||new Date().toISOString().split("T")[0] }));
});
app.put("/api/nachrichten/:id", adm, (req,res) => { db.update("nachrichten", req.params.id, req.body); res.json({ success: true }); });
app.delete("/api/nachrichten/:id", adm, (req,res) => { db.delete("nachrichten", req.params.id); res.json({ success: true }); });

// Termine
app.get("/api/termine", adm, (_,res) => res.json(db.all("termine")));
app.post("/api/termine", adm, (req,res) => {
  const { titel, beschreibung, datum } = req.body;
  if (!titel || !datum) return res.status(400).json({ error: "Titel und Datum fehlen" });
  res.json(db.insert("termine", { titel, beschreibung: beschreibung||"", datum }));
});
app.put("/api/termine/:id", adm, (req,res) => { db.update("termine", req.params.id, req.body); res.json({ success: true }); });
app.delete("/api/termine/:id", adm, (req,res) => { db.delete("termine", req.params.id); res.json({ success: true }); });

// Werbeflächen
app.get("/api/werbeflaechen", (_,res) => res.json(db.all("werbeflaechen")));
app.post("/api/werbeflaechen", adm, (req,res) => {
  const { name, groesse, preis, belegt, mieter, kontakt, beschreibung, bildUrl, slot } = req.body;
  if (!name) return res.status(400).json({ error: "Name fehlt" });
  res.json(db.insert("werbeflaechen", { name, groesse: groesse||"", preis: parseFloat(preis)||0, belegt: belegt===true||belegt==="true", mieter: mieter||"", kontakt: kontakt||"", beschreibung: beschreibung||"", bildUrl: bildUrl||"", slot: slot||"werbung" }));
});
app.put("/api/werbeflaechen/:id", adm, (req,res) => {
  const { name, groesse, preis, belegt, mieter, kontakt, beschreibung, bildUrl, slot } = req.body;
  db.update("werbeflaechen", req.params.id, { name, groesse, preis: parseFloat(preis)||0, belegt: belegt===true||belegt==="true", mieter: mieter||"", kontakt: kontakt||"", beschreibung, bildUrl: bildUrl||"", slot: slot||"werbung" });
  res.json({ success: true });
});
app.delete("/api/werbeflaechen/:id", adm, (req,res) => { db.delete("werbeflaechen", req.params.id); res.json({ success: true }); });

// Werbefläche leeren (Mieter entfernen, aber Slot behalten)
app.post("/api/werbeflaechen/:id/leeren", adm, (req,res) => {
  db.update("werbeflaechen", req.params.id, { belegt: false, mieter: "", kontakt: "", bildUrl: "" });
  res.json({ success: true });
});


// Anfragen API
app.get("/api/anfragen", adm, (_,res) => res.json(db.all("anfragen")));
app.post("/api/anfragen", (req,res) => {
  const { name, email, firma, flaeche, nachricht } = req.body;
  if (!name || !email) return res.status(400).json({ error: "Name und Email fehlen" });
  const entry = db.insert("anfragen", { name, email, firma:firma||"", flaeche:flaeche||"", nachricht:nachricht||"", status:"neu" });
  res.json({ success: true, id: entry.id });
});
app.put("/api/anfragen/:id", adm, (req,res) => { db.update("anfragen", req.params.id, req.body); res.json({ success: true }); });
app.delete("/api/anfragen/:id", adm, (req,res) => { db.delete("anfragen", req.params.id); res.json({ success: true }); });

// Gesetze Seite
app.get("/gesetze", (_,res) => res.sendFile(path.join(__dirname,"public/pages/gesetze.html")));

// Gesetze API
app.get("/api/gesetze", (_,res) => res.json(db.all("gesetze")));
app.post("/api/gesetze", adm, (req,res) => {
  const { name, kurzname, ministerium, icon, version } = req.body;
  if (!name) return res.status(400).json({ error: "Name fehlt" });
  res.json(db.insert("gesetze", { name, kurzname:kurzname||"", ministerium:ministerium||"", icon:icon||"constitution", version:version||"", paragraphen:[] }));
});
app.put("/api/gesetze/:id", adm, (req,res) => {
  const raw = db.getRaw();
  const idx = (raw.gesetze||[]).findIndex(g => g.id === Number(req.params.id));
  if (idx===-1) return res.status(404).json({ error: "Nicht gefunden" });
  const { name, kurzname, ministerium, icon, version } = req.body;
  Object.assign(raw.gesetze[idx], { name, kurzname:kurzname||"", ministerium:ministerium||"", icon:icon||"constitution", version:version||"" });
  db.saveRaw(raw);
  res.json({ success: true });
});
app.delete("/api/gesetze/:id", adm, (req,res) => { db.delete("gesetze", req.params.id); res.json({ success: true }); });
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
  res.json({ success: true });
});

app.listen(PORT, () => console.log("Server läuft auf http://localhost:" + PORT));

