import { useEffect, useState } from 'react';
import { useNav } from '../NavContext.jsx';

const ITEMS = [
  ['home home2', 'home2', 'Home'],
  ['about', 'about', 'About'],
  ['events timeline year subevent', 'events', 'Events'],
  ['team teamtl tyear', 'team', 'Team'],
  ['community memtl memyear', 'community', 'Community'],
];

export default function Nav() {
  const { cur, go } = useNav();
  const [menuOpen, setMenuOpen] = useState(false);
  const [ddOpen, setDdOpen] = useState(false);

  // close menus whenever the page changes
  useEffect(() => {
    setMenuOpen(false);
    setDdOpen(false);
  }, [cur]);

  const act = (p) => (p.split(' ').includes(cur) ? 'act' : undefined);

  return (
    <nav>
      <div className="logo" onClick={() => go('home2')}>
        <span className="alg"></span>ACM VVITU
      </div>
      <div className={'menu' + (menuOpen ? ' o' : '')} id="menu">
        {ITEMS.map(([p, target, label]) => (
          <a key={label} className={act(p)} onClick={() => go(target)}>{label}</a>
        ))}
        <span className={'dd' + (ddOpen ? ' o' : '')} id="dd">
          <a onClick={() => setDdOpen((o) => !o)}>Explore ▾</a>
          <div>
            <a className={act('blog')} onClick={() => go('blog')}>Blog</a>
            <a className={act('calendar')} onClick={() => go('calendar')}>Calendar</a>
          </div>
        </span>
        <a className={act('contact')} onClick={() => go('contact')}>Contact</a>
      </div>
      <button className="btn" onClick={() => go('contact')}>Join Us →</button>
      <button id="ham" onClick={() => setMenuOpen((o) => !o)}>☰</button>
    </nav>
  );
}
