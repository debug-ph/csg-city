/* CSG-City – Shared JS */

// ── Wartungs-Banner (deaktiviert) ─────────────────────────

// ── Beta-Hinweis ───────────────────────────────────────────
(function () {
  var path = window.location.pathname;
  if (path.startsWith("/login") || path.startsWith("/admin")) return;

  // BETA-Badge neben dem Logo
  function insertBetaBadge() {
    var brand = document.querySelector(".navbar-brand");
    if (!brand || document.getElementById("beta-badge")) return;
    var badge = document.createElement("span");
    badge.id = "beta-badge";
    badge.textContent = "BETA";
    badge.style.cssText = [
      "display:inline-block",
      "font-size:0.55rem",
      "font-weight:700",
      "letter-spacing:0.08em",
      "color:var(--accent)",
      "border:1.5px solid var(--accent)",
      "border-radius:4px",
      "padding:1px 5px",
      "vertical-align:middle",
      "margin-left:2px",
      "line-height:1.6",
      "opacity:0.85",
      "align-self:flex-end",
      "margin-bottom:3px"
    ].join(";");
    brand.appendChild(badge);
  }

  // Beta-Modal (einmalig)
  function showBetaModal() {
    if (localStorage.getItem("beta_hint_seen")) return;

    var overlay = document.createElement("div");
    overlay.id = "beta-modal-overlay";
    overlay.style.cssText = [
      "position:fixed", "inset:0", "z-index:99998",
      "display:flex", "align-items:center", "justify-content:center",
      "background:rgba(0,0,0,0.55)", "backdrop-filter:blur(4px)",
      "padding:1rem"
    ].join(";");

    overlay.innerHTML = [
      '<div style="',
        "max-width:440px;width:100%;",
        "background:var(--bg-card);",
        "border-radius:var(--radius-lg);",
        "box-shadow:0 20px 60px rgba(0,0,0,.35);",
        "padding:2.25rem 2rem 1.75rem;",
        "text-align:center;",
        "border:1px solid var(--border-strong)",
      '">',
        '<div style="',
          "display:inline-block;",
          "font-size:0.65rem;font-weight:700;letter-spacing:0.1em;",
          "color:var(--accent);border:2px solid var(--accent);",
          "border-radius:6px;padding:3px 10px;margin-bottom:1.25rem",
        '">BETA</div>',
        '<h2 style="',
          "font-family:var(--font-serif);font-size:1.35rem;font-weight:400;",
          "color:var(--text-1);margin:0 0 .75rem",
        '">Beta-Version</h2>',
        '<p style="',
          "font-size:.9375rem;color:var(--text-2);line-height:1.65;margin:0 0 1.75rem",
        '">',
          "Diese Website befindet sich in der <strong>BETA-Version</strong>.<br>",
          "Es kann zu Fehlern oder unvollständigen Inhalten kommen.",
        "</p>",
        '<button id="beta-modal-btn" style="',
          "background:var(--accent);color:#fff;",
          "border:none;border-radius:var(--radius-sm);",
          "padding:.65rem 2rem;font-size:.9375rem;",
          "font-family:var(--font-sans);cursor:pointer;",
          "transition:background .15s",
        '">Verstanden</button>',
      "</div>"
    ].join("");

    document.body.appendChild(overlay);

    document.getElementById("beta-modal-btn").addEventListener("click", function () {
      localStorage.setItem("beta_hint_seen", "1");
      overlay.style.transition = "opacity .2s";
      overlay.style.opacity = "0";
      setTimeout(function () { overlay.remove(); }, 200);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      insertBetaBadge();
      showBetaModal();
    });
  } else {
    insertBetaBadge();
    showBetaModal();
  }
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

// ── Mobile navbar: 4 quick icons + "Mehr" button ──────────
function initMobileNav() {
  var navbar = document.querySelector(".navbar");
  var actions = navbar && navbar.querySelector(".nav-actions");
  // Give the (otherwise empty) burger a menu icon and label it "Mehr"
  var burger = document.getElementById("burgerBtn");
  if (burger && typeof ICONS !== "undefined") {
    if (!burger.innerHTML.trim()) burger.innerHTML = ICONS.menu;
    burger.setAttribute("aria-label", "Mehr");
    burger.title = "Mehr";
  }
  if (!navbar || !actions || navbar.querySelector(".nav-mobile-quick")) return;
  var items = [
    { href: "/",                ic: "dashboard",    label: "Home" },
    { href: "/stellenangebote", ic: "jobs",         label: "Stellen" },
    { href: "/gesetze",         ic: "constitution", label: "Gesetze" },
    { href: "/faq",             ic: "question",     label: "FAQ" }
  ];
  var wrap = document.createElement("div");
  wrap.className = "nav-mobile-quick";
  wrap.innerHTML = items.map(function(t) {
    var active = window.location.pathname === t.href ? " active" : "";
    var icon = (typeof ICONS !== "undefined" && ICONS[t.ic]) || "";
    return '<a href="' + t.href + '" class="' + active.trim() + '" aria-label="' + t.label + '" title="' + t.label + '">' + icon + '</a>';
  }).join("");
  navbar.insertBefore(wrap, actions);
}

// ── PWA / mobile bottom tab bar ───────────────────────────
function initPwaTabbar() {
  var isPWA = window.navigator.standalone || window.matchMedia("(display-mode: standalone)").matches;
  if (isPWA) document.body.classList.add("pwa-mode");
  if (document.querySelector(".pwa-tabbar")) return;
  var tabs = [
    { href: "/",                ic: "dashboard",    label: "Home" },
    { href: "/stellenangebote", ic: "jobs",         label: "Stellen" },
    { href: "/gesetze",         ic: "constitution", label: "Gesetze" },
    { href: "/faq",             ic: "question",     label: "FAQ" },
    { href: "/werbung",         ic: "ads",          label: "Werbung" }
  ];
  var installSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v13m0 0-4-4m4 4 4-4M2 17v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2"/></svg>';
  var bar = document.createElement("nav");
  bar.className = "pwa-tabbar";
  var html = tabs.map(function(t) {
    var active = window.location.pathname === t.href ? " active" : "";
    var icon = (typeof ICONS !== "undefined" && ICONS[t.ic]) || "";
    return '<a href="' + t.href + '" class="pwa-tab' + active + '">' + icon + '<span>' + t.label + '</span></a>';
  }).join("");
  var instActive = window.location.pathname === "/install" ? " active" : "";
  html += '<a class="pwa-tab' + instActive + '" href="/install" id="ptab-install">' + installSvg + '<span>Installieren</span></a>';
  bar.innerHTML = html;
  document.body.appendChild(bar);
  // Install-Tab nur im Browser zeigen – im installierten App-Modus ausblenden
  if (isPWA) {
    var installTab = document.getElementById("ptab-install");
    if (installTab) installTab.style.display = "none";
  }
}

// ── Init ──────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function() {
  initTheme();
  initMobileNav();
  initPwaTabbar();
  // Note: theme toggle click is handled by each page's own script
  // to update the icon correctly after icons.js loads
  var logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) logoutBtn.addEventListener("click", logout);
});
