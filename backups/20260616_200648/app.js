/* CSG-City – Shared JS */

// ── Wartungs-Banner (nur auf csg-city.de) ─────────────────
(function() {
  var host = window.location.hostname;
  if (host !== "csg-city.de" && !host.endsWith(".csg-city.de")) return;

  function showMaintenance() {
    document.body.style.pointerEvents = "none";
    document.body.style.userSelect    = "none";

    var el = document.createElement("div");
    el.id  = "maintenance-overlay";
    el.style.cssText = "position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.85);backdrop-filter:blur(6px);pointer-events:all";
    el.innerHTML = '<div style="max-width:480px;text-align:center;padding:2.5rem 2rem;background:var(--bg-card,#fff);border-radius:16px;box-shadow:0 24px 64px rgba(0,0,0,.5)">'
      + '<div style="font-size:2.5rem;margin-bottom:1rem">🔧</div>'
      + '<div style="font-family:Georgia,serif;font-size:1.5rem;font-weight:400;margin-bottom:.75rem;color:var(--text-1,#111)">Wartungsarbeiten</div>'
      + '<div style="font-size:.9375rem;color:var(--text-2,#555);line-height:1.6">Wir sind bald wieder für Sie verfügbar.<br>Vielen Dank für Ihre Geduld!</div>'
      + '</div>';

    ["click","mousedown","touchstart","keydown"].forEach(function(ev){
      el.addEventListener(ev, function(e){ e.stopPropagation(); e.preventDefault(); }, true);
    });

    if (document.body) {
      document.body.appendChild(el);
    } else {
      document.addEventListener("DOMContentLoaded", function(){ document.body.appendChild(el); });
    }
  }

  showMaintenance();
})();

// ── Dark Mode ─────────────────────────────────────────────
function initTheme() {
  var saved = localStorage.getItem("csg-theme");
  // Auto-detect system preference if no manual choice saved
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  var t = saved || (prefersDark ? "dark" : "light");
  _applyTheme(t, false);
}

function _applyTheme(t, save) {
  document.documentElement.setAttribute("data-theme", t);
  if (save !== false) localStorage.setItem("csg-theme", t);
  _updateThemeIcon(t);
}

function _updateThemeIcon(t) {
  var btn = document.getElementById("themeToggle");
  if (!btn) return;
  // Use SVG icons if icons.js loaded, else fallback text
  if (typeof ICONS !== "undefined") {
    btn.innerHTML = t === "dark" ? ICONS.sun : ICONS.moon;
  }
}

function toggleTheme() {
  var current = document.documentElement.getAttribute("data-theme");
  var next = current === "dark" ? "light" : "dark";
  _applyTheme(next, true);
}

// Listen for OS-level theme changes
if (window.matchMedia) {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function(e) {
    if (!localStorage.getItem("csg-theme")) {
      _applyTheme(e.matches ? "dark" : "light", false);
    }
  });
}

// ── Toast ─────────────────────────────────────────────────
function showToast(msg, type) {
  var c = document.querySelector(".toast-container");
  if (!c) { c = document.createElement("div"); c.className = "toast-container"; document.body.appendChild(c); }
  var t = document.createElement("div");
  t.className = "toast " + (type || "success");
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(function() {
    t.style.opacity = "0"; t.style.transform = "translateY(6px)"; t.style.transition = "all .25s";
    setTimeout(function() { t.remove(); }, 250);
  }, 2800);
}

// ── Auth ──────────────────────────────────────────────────
async function checkAuth() {
  try { return await (await fetch("/api/auth/status")).json(); }
  catch(e) { return { isAdmin: false }; }
}

async function logout() {
  await fetch("/api/logout", { method: "POST" });
  window.location.href = "/";
}

// ── Helpers ───────────────────────────────────────────────
function formatDatum(s) {
  return new Date(s).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" });
}

// ── Init ──────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function() {
  initTheme();
  // Note: theme toggle click is handled by each page's own script
  // to update the icon correctly after icons.js loads
  var logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) logoutBtn.addEventListener("click", logout);
});
