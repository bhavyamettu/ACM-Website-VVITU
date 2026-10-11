import { useEffect, useRef, useState } from 'react';
import { useNav } from '../NavContext.jsx';
import { YRS } from '../data/content.js';
import { useCms } from '../lib/CmsContext.jsx';
import { LI, GH, EX } from './icons.jsx';

const TABS = [['acm', 'ACM'], ['acmw', 'ACM-W'], ['heads', 'HEADS']];

const Social = ({ href, icon, label }) => (
  <a href={href || undefined} target={href ? '_blank' : undefined} rel={href ? 'noopener' : undefined} aria-label={label}>
    {icon}
  </a>
);

const Cards = ({ list }) =>
  list.map((m, i) => (
    <div className="pc" style={{ '--i': i }} key={i}>
      <div className="av">
        <i style={{ backgroundImage: m.photo ? `url(${m.photo})` : m.p ? `var(--${m.p})` : 'linear-gradient(135deg,#27446e,#6f8fb8)' }}>{m.photo || m.p ? '' : m.n[0]}</i>
      </div>
      <h4>{m.n}</h4>
      <span className="rp">{m.r}</span>
      <div className="lb">{m.l || 'ACM'}</div>
      <div className="ics">
        <Social href={m.li} icon={LI} label="LinkedIn" />
        <Social href={m.gh} icon={GH} label="GitHub" />
        <Social href={m.ex} icon={EX} label="Profile" />
      </div>
    </div>
  ));

/* Tab bar + people grid. `year` -> the per-year team page, otherwise the current team. */
export default function TeamPanel({ year }) {
  const { openTeamTL, teamYear } = useNav();
  const { teamByYear } = useCms();
  const [tab, setTab] = useState('acm'); // highlighted tab
  const [shown, setShown] = useState('acm'); // grid content (swaps after the fade-out)
  const [out, setOut] = useState(false);
  const timer = useRef();

  const choose = (k, now) => {
    setTab(k);
    clearTimeout(timer.current);
    if (now) {
      setShown(k);
      setOut(false);
      return;
    }
    if (k === shown) return;
    setOut(true);
    timer.current = setTimeout(() => {
      setShown(k);
      setOut(false);
    }, 190);
  };

  // opening a different year starts back on the ACM tab
  useEffect(() => {
    if (year) choose('acm', true);
    return () => clearTimeout(timer.current);
  }, [teamYear]); // eslint-disable-line react-hooks/exhaustive-deps

  const yr = year ? teamYear : YRS[0];
  const list = (teamByYear[yr] || teamByYear[YRS[0]])[shown] || [];

  return (
    <>
      <div className="tbs rv" style={{ '--i': 3 }} id={year ? 'tytabs' : 'tbs'}>
        {TABS.map(([k, label]) => (
          <button key={k} className={'tb' + (tab === k ? ' on' : '')} onClick={() => choose(k)}>
            <span>{label}</span>
          </button>
        ))}
        {!year && (
          <button className="tb tlb" onClick={openTeamTL}>
            <span>Timeline →</span>
          </button>
        )}
      </div>
      <div className={'tgd' + (shown === 'heads' ? ' h4' : '') + (out ? ' out' : '')} id={year ? 'tygrid' : 'tgd'}>
        <Cards list={list} />
      </div>
    </>
  );
}
