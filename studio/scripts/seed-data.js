// One-time migration data (the content that used to be hard-coded in src/data/content.js)
const MEMBERS = {
  ACM: 'Sravya P,Aarav Kumar,Harsha V,Divya S,Rohith Varma,Sneha K,Karthik R,Ananya D,Vikram S,Pooja T'.split(','),
  ACMW: 'Sahana R,Nandini K,Priya M,Keerthi S,Swetha T,Anjali P,Manasa V,Tejaswini L,Pavani G,Likhitha D'.split(','),
};

// [category, date, title, summary, gradient colours]
const BLOGS = [
  ['TECH & TRENDS', 'Apr 18, 2026', 'Getting Started with Web Development', 'A beginner-friendly guide to setting up your environment and building your first web app.', '#1c3557,#4a78a8'],
  ['COMMUNITY', 'Mar 29, 2026', 'The Power of Student Communities', 'How ACM VVITU brings learners together, creates opportunities and builds lasting friendships.', '#3b4a5c,#8ea3b8'],
  ['LEADERSHIP', 'Mar 12, 2026', 'Leadership Lessons from Campus', 'What I learned from organizing events, managing teams and stepping out of my comfort zone.', '#8a6a48,#d9c2a0'],
  ['EVENTS', 'Feb 25, 2026', 'Highlights from Our Recent Hackathon', 'Ideas, innovation and incredible teamwork — relive the best moments from the event.', '#0f2547,#2f5c9a'],
  ['CAMPUS LIFE', 'Feb 10, 2026', 'How ACM Helps You Grow Beyond Academics', "From skill-building sessions to industry interactions, here's how ACM adds value to your journey.", '#4a7a9c,#a9c98f'],
  ['TECH & TRENDS', 'Jan 28, 2026', 'Top 5 Tech Trends to Watch in 2026', 'From AI to Web3, here are the technologies shaping the future of developers.', '#3d4d5f,#c8b48f'],
];

// 'YYYY-MM-DD' -> [title, chip colour, description]
const EVENTS = {
  '2026-10-10': ['Tech Talk', '#cfe0fb', 'Tech Talk — an expert session on emerging tech. Venue: Seminar Hall.'],
  '2026-10-22': ["Capture '26", '#c6ecea', "Capture '26 — photography & media contest."],
  '2026-10-28': ['Web Dev', '#e0d2f7', 'Web Dev workshop — hands-on HTML, CSS & JS.'],
};

// Team. Each profile may have li (LinkedIn), gh (GitHub), ex (profile) URLs and p (photo CSS var).
const TEAM = {
  acm: [
    { n: 'Srikar V', r: 'Chair', p: 'tm1' },
    { n: 'Aarav Kumar', r: 'Vice Chair', p: 'tm2' },
    { n: 'Meera N', r: 'Membership Chair', p: 'tm3' },
    { n: 'Arjun S', r: 'Web Master', p: 'tm4' },
    { n: 'Karthik M', r: 'Treasurer', p: 'tm5' },
  ],
  acmw: ['Chair', 'Vice Chair', 'Membership Chair', 'Web Master', 'Treasurer'].map((r) => ({ n: 'Name Surname', r, l: 'ACM-W' })),
  heads: ['Draft Head', 'Draft Head', 'Design Head', 'Design Head', 'Promotion Head', 'Promotion Head', 'Technical Head', 'Technical Head'].map((r) => ({ n: 'Name Surname', r })),
};



export { MEMBERS, BLOGS, EVENTS, TEAM };
