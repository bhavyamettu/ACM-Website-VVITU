// ---------------------------------------------------------------------------
// Default content taken 1:1 from the original index.html.
// The site shows this whenever Sanity is not configured, still loading,
// unreachable, or has no documents of a given type yet. As soon as a type has
// documents in Sanity, those REPLACE the defaults for that type.
// (studio/scripts/seed-data.js holds the same data to import it into Sanity.)
// ---------------------------------------------------------------------------
import { YRS } from './content.js';

const ACM_NAMES = 'Sravya P,Aarav Kumar,Harsha V,Divya S,Rohith Varma,Sneha K,Karthik R,Ananya D,Vikram S,Pooja T'.split(',');
const ACMW_NAMES = 'Sahana R,Nandini K,Priya M,Keerthi S,Swetha T,Anjali P,Manasa V,Tejaswini L,Pavani G,Likhitha D'.split(',');

const members = (names, type, prefix) =>
  names.map((name, i) => ({
    _id: `fb-${type}-${i + 1}`,
    name,
    membershipId: `${prefix}2025${String(i + 1).padStart(3, '0')}`,
    membershipType: type,
    academicYear: YRS[0],
  }));

export const FALLBACK = {
  events: [
    ...['SPARDHA', 'AVEGA', 'HOUR OF CODE', 'TECH TALKS', 'VIVA VVIT'].map((title, i) => ({ _id: `fb-pub-${i}`, title, visibility: 'public' })),
    ...['ACM', 'ACM-W'].map((title, i) => ({ _id: `fb-pri-${i}`, title, visibility: 'private' })),
  ],

  community: [...members(ACM_NAMES, 'acm', 'ACM'), ...members(ACMW_NAMES, 'acmw', 'ACMW')],

  blogs: [
    ['Tech & Trends', '2026-04-18', 'Getting Started with Web Development', 'A beginner-friendly guide to setting up your environment and building your first web app.', '#1c3557,#4a78a8'],
    ['Community', '2026-03-29', 'The Power of Student Communities', 'How ACM VVITU brings learners together, creates opportunities and builds lasting friendships.', '#3b4a5c,#8ea3b8'],
    ['Leadership', '2026-03-12', 'Leadership Lessons from Campus', 'What I learned from organizing events, managing teams and stepping out of my comfort zone.', '#8a6a48,#d9c2a0'],
    ['Events', '2026-02-25', 'Highlights from Our Recent Hackathon', 'Ideas, innovation and incredible teamwork — relive the best moments from the event.', '#0f2547,#2f5c9a'],
    ['Campus Life', '2026-02-10', 'How ACM Helps You Grow Beyond Academics', "From skill-building sessions to industry interactions, here's how ACM adds value to your journey.", '#4a7a9c,#a9c98f'],
    ['Tech & Trends', '2026-01-28', 'Top 5 Tech Trends to Watch in 2026', 'From AI to Web3, here are the technologies shaping the future of developers.', '#3d4d5f,#c8b48f'],
  ].map(([category, date, title, excerpt, gradient], i) => ({ _id: `fb-blog-${i}`, category, date, title, excerpt, gradient })),

  calendar: [
    { _id: 'fb-cal-1', date: '2026-10-10', title: 'Tech Talk', color: '#cfe0fb', description: 'Tech Talk — an expert session on emerging tech. Venue: Seminar Hall.' },
    { _id: 'fb-cal-2', date: '2026-10-22', title: "Capture '26", color: '#c6ecea', description: "Capture '26 — photography & media contest." },
    { _id: 'fb-cal-3', date: '2026-10-28', title: 'Web Dev', color: '#e0d2f7', description: 'Web Dev workshop — hands-on HTML, CSS & JS.' },
  ],

  // Current team (latest academic year). `p` = local profile photo (CSS var set in images.js)
  team: {
    acm: [
      { n: 'Srikar V', r: 'Chair', p: 'tm1' },
      { n: 'Aarav Kumar', r: 'Vice Chair', p: 'tm2' },
      { n: 'Meera N', r: 'Membership Chair', p: 'tm3' },
      { n: 'Arjun S', r: 'Web Master', p: 'tm4' },
      { n: 'Karthik M', r: 'Treasurer', p: 'tm5' },
    ],
  },
};

export const BLOG_STUB = ' Full article content will appear here once published.';
