/**
 * CSG-City – Minimalistisches SVG-Icon-System
 * Alle Icons als inline SVG, 16x16 / 20x20 Stroke-Based
 */

var ICONS = {
  // Navigation & UI
  dashboard:      `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>`,
  jobs:           `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="12" height="9" rx="1.5"/><path d="M5 5V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1"/><line x1="2" y1="9" x2="14" y2="9"/></svg>`,
  ads:            `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="14" height="10" rx="1.5"/><path d="M5 10V6l3 2 3-2v4"/></svg>`,
  constitution:   `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/><line x1="5.5" y1="5" x2="10.5" y2="5"/><line x1="5.5" y1="8" x2="10.5" y2="8"/><line x1="5.5" y1="11" x2="8.5" y2="11"/></svg>`,
  admin:          `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="5" r="3"/><path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6"/></svg>`,
  menu:           `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="2" y1="4.5" x2="14" y2="4.5"/><line x1="2" y1="8" x2="14" y2="8"/><line x1="2" y1="11.5" x2="14" y2="11.5"/></svg>`,
  close:          `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="2" y1="2" x2="12" y2="12"/><line x1="12" y1="2" x2="2" y2="12"/></svg>`,
  sun:            `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="8" cy="8" r="3"/><line x1="8" y1="1" x2="8" y2="3"/><line x1="8" y1="13" x2="8" y2="15"/><line x1="1" y1="8" x2="3" y2="8"/><line x1="13" y1="8" x2="15" y2="8"/><line x1="3" y1="3" x2="4.5" y2="4.5"/><line x1="11.5" y1="11.5" x2="13" y2="13"/><line x1="13" y1="3" x2="11.5" y2="4.5"/><line x1="4.5" y1="11.5" x2="3" y2="13"/></svg>`,
  moon:           `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M13 10A6 6 0 0 1 6 3a6 6 0 1 0 7 7z"/></svg>`,
  logout:         `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 14H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3"/><polyline points="11 11 14 8 11 5"/><line x1="14" y1="8" x2="6" y2="8"/></svg>`,
  // Admin sidebar
  megaphone:      `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L4 6H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2l8 4V2z"/><path d="M5 14l-1-4"/></svg>`,
  calendar:       `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="14" height="12" rx="1.5"/><line x1="1" y1="7" x2="15" y2="7"/><line x1="5" y1="1" x2="5" y2="5"/><line x1="11" y1="1" x2="11" y2="5"/></svg>`,
  users:          `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="5" r="2.5"/><path d="M1 14c0-2.8 2.2-5 5-5s5 2.2 5 5"/><circle cx="12" cy="5" r="2"/><path d="M12 10c1.7 0 3 1.3 3 3"/></svg>`,
  chart:          `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="15" x2="15" y2="15"/><polyline points="2 10 6 6 9 9 14 3"/></svg>`,
  building:       `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 15V4l6-3 6 3v11"/><line x1="2" y1="15" x2="14" y2="15"/><rect x="6" y="9" width="4" height="6"/><rect x="3.5" y="5.5" width="2" height="2"/><rect x="10.5" y="5.5" width="2" height="2"/></svg>`,
  // Actions
  edit:           `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2l2 2-7 7H3V9l7-7z"/></svg>`,
  trash:          `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 4 3 4 12 4"/><path d="M11 4l-.9 7.5a1 1 0 0 1-1 .9H4.9a1 1 0 0 1-1-.9L3 4"/><path d="M5 4V2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V4"/></svg>`,
  plus:           `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="7" y1="2" x2="7" y2="12"/><line x1="2" y1="7" x2="12" y2="7"/></svg>`,
  arrow_right:    `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="2" y1="7" x2="12" y2="7"/><polyline points="8 3 12 7 8 11"/></svg>`,
  check:          `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 7 5.5 11 12 3"/></svg>`,
  eye:            `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M1 7s2.5-4.5 6-4.5S13 7 13 7s-2.5 4.5-6 4.5S1 7 1 7z"/><circle cx="7" cy="7" r="1.5"/></svg>`,
  // Status / Misc
  dot_green:      `<svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" fill="#2D8C4E"/></svg>`,
  dot_gray:       `<svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" fill="currentColor" opacity="0.4"/></svg>`,
  clock:          `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="8" cy="8" r="6.5"/><polyline points="8 4.5 8 8 10.5 10"/></svg>`,
  lock:           `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="10" height="8" rx="1.5"/><path d="M5 7V5a3 3 0 0 1 6 0v2"/></svg>`,
  send:           `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="14" y1="2" x2="7" y2="9"/><polygon points="14 2 9 14 7 9 2 7 14 2"/></svg>`,
  coin:           `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="8" cy="8" r="6.5"/><path d="M8 5v6M6.5 6h2a1.5 1.5 0 0 1 0 3H6.5a1.5 1.5 0 0 0 0 3H10"/></svg>`,
  star:           `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="8 2 10 6.5 15 7 11.5 10.5 12.5 15 8 12.5 3.5 15 4.5 10.5 1 7 6 6.5 8 2"/></svg>`,
  info:           `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="8" cy="8" r="6.5"/><line x1="8" y1="7" x2="8" y2="11"/><circle cx="8" cy="5" r="0.5" fill="currentColor" stroke="none"/></svg>`,
  question:        `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6.5"/><path d="M6 6a2 2 0 1 1 2.5 1.9c-.8.3-1.5.9-1.5 1.8v.3"/><circle cx="8" cy="12" r=".5" fill="currentColor" stroke="none"/></svg>`,
  warning:                `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2L1 14h14L8 2z"/><line x1="8" y1="7" x2="8" y2="10"/><circle cx="8" cy="12.5" r="0.5" fill="currentColor" stroke="none"/></svg>`,
};

// Icon-Helfer Funktion: gibt HTML-String zurück
function icon(name, size) {
  var svg = ICONS[name];
  if (!svg) return "";
  if (size && size !== 16) {
    svg = svg.replace(/width="16"/, 'width="'+size+'"').replace(/height="16"/, 'height="'+size+'"');
    svg = svg.replace(/width="14"/, 'width="'+size+'"').replace(/height="14"/, 'height="'+size+'"');
  }
  return svg;
}

// ── Werbesprüche für leere Werbeflächen ──────────────────────
var AD_SLOGANS = [
  { head: "Hier könnte Ihr Business stehen", sub: "Tausende Bürger sehen Ihre Werbung täglich." },
  { head: "Sichtbarkeit für Ihr Unternehmen", sub: "Der direkte Draht zu allen CSG-City Bürgern." },
  { head: "Werbung, die wirkt", sub: "Platzieren Sie Ihre Botschaft genau dort, wo es zählt." },
  { head: "Ihr Angebot. Unsere Bühne.", sub: "Premium-Werbeplatz im offiziellen Staatsportal." },
  { head: "Klein investieren. Groß wirken.", sub: "Bereits ab 3,50 € pro Tag auf dem Dashboard." },
  { head: "Werden Sie Teil von CSG-City", sub: "Unterstützen Sie das Staatsportal mit Ihrer Werbung." },
  { head: "Noch verfügbar!", sub: "Dieser Platz wartet auf Ihren Auftritt." },
  { head: "Ihre Marke. Direkt im Staatsportal.", sub: "Authentisch. Lokal. Wirksam." },
  { head: "Werbefläche frei", sub: "Jetzt buchen und sofort sichtbar sein." },
  { head: "CSG-City wächst. Wachsen Sie mit.", sub: "Reichweite im ganzen Staat – jetzt sichern." },
];

function randomSlogan() {
  return AD_SLOGANS[Math.floor(Math.random() * AD_SLOGANS.length)];
}
