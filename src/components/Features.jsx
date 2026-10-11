import { IC } from './icons.jsx';

const SETS = {
  ft1: {
    color: undefined,
    items: [
      ['ppl', 'Technical Workshops', 'Hands-on learning experiences'],
      ['talk', 'Expert Talks', 'Insights from industry and academia'],
      ['code', 'Hackathons', 'Innovate, collaborate and build'],
      ['net', 'Community', 'A vibrant network of learners'],
      ['case', 'Opportunities', 'Projects, internships and exposure'],
    ],
  },
  ft2: {
    color: '#5b3fa3',
    items: [
      ['user', 'Mentorship', 'Guidance from peers and experts'],
      ['ppl', 'Skill Development', 'Workshops, sessions and skill building'],
      ['bulb', 'Leadership', 'Opportunities to lead and innovate'],
      ['heart', 'Inclusive Community', 'A safe and supportive space to grow'],
    ],
  },
};

export default function Features({ id, cls, style }) {
  const { color, items } = SETS[id];
  return (
    <div className={cls} id={id} style={style}>
      {items.map(([icon, title, text]) => (
        <div key={title}>
          <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke={color || '#0b2a55'} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            {IC[icon]}
          </svg>
          <b>{title}</b>
          {text}
        </div>
      ))}
    </div>
  );
}
