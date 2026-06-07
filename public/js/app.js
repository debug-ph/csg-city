/* CSG-City – Shared JS */

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
