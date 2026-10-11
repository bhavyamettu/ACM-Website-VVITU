// ---- Non-CMS content & helpers ---------------------------------------------
// Everything editable (events, team, community, blog, calendar) now lives in Sanity.

// Academic years shown on the timelines (newest first)
export const YRS = (() => {
  const d = new Date();
  const a = Math.max(2025, d.getMonth() >= 5 ? d.getFullYear() : d.getFullYear() - 1);
  const r = [];
  for (let y = a; y >= 2017; y--) r.push(y + '-' + String((y + 1) % 100).padStart(2, '0'));
  return r;
})();

// Shown for any team/year that has no members in Sanity yet (same as the original placeholders)
const PH = (r, l) => ({ n: 'Name Surname', r, l });
export const PLACEHOLDER_TEAM = {
  acm: ['Chair', 'Vice Chair', 'Membership Chair', 'Web Master', 'Treasurer'].map((r) => PH(r)),
  acmw: ['Chair', 'Vice Chair', 'Membership Chair', 'Web Master', 'Treasurer'].map((r) => PH(r, 'ACM-W')),
  heads: ['Draft Head', 'Draft Head', 'Design Head', 'Design Head', 'Promotion Head', 'Promotion Head', 'Technical Head', 'Technical Head'].map((r) => PH(r)),
};

// Local profile photos (CSS vars set in images.js) used when a Sanity member has no photo
export const LOCAL_PHOTOS = { 'Srikar V': 'tm1', 'Aarav Kumar': 'tm2', 'Meera N': 'tm3', 'Arjun S': 'tm4', 'Karthik M': 'tm5' };

// Calendar chip colour per category
export const CATEGORY_COLORS = {
  Talk: '#cfe0fb',
  Workshop: '#e0d2f7',
  Contest: '#c6ecea',
  Hackathon: '#fde3c4',
  Meeting: '#e3eccb',
  Other: '#e8e2d2',
};

// ---- helpers ----------------------------------------------------------------
const nm = (s) => s.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim().split(' ');
export function sameName(a, b) {
  a = nm(a);
  b = nm(b);
  if (a[0] !== b[0]) return false;
  const x = a.slice(1).join(' '),
    y = b.slice(1).join(' ');
  if (x === y) return true;
  if (!x || !y) return false;
  return (x.length === 1 && y.startsWith(x)) || (y.length === 1 && x.startsWith(y));
}

// "left:0;top:10px" -> { left:'0', top:'10px' } (used for the decorative layer layouts)
export function parseStyle(str) {
  const o = {};
  str.split(';').forEach((d) => {
    const i = d.indexOf(':');
    if (i < 0) return;
    let k = d.slice(0, i).trim();
    const v = d.slice(i + 1).trim();
    k = k.replace(/^-webkit-/, 'Webkit-').replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    o[k] = v;
  });
  return o;
}
