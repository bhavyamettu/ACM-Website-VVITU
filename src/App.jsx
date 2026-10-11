import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { NavContext } from './NavContext.jsx';
import Nav from './components/Nav.jsx';
import Modal from './components/Modal.jsx';
import Intro from './components/Intro.jsx';
import SvgDefs from './components/SvgDefs.jsx';
import { SECTIONS } from './pages/Pages.jsx';
import { YRS } from './data/content.js';

// pages reachable by scrolling (wheel / swipe) in this order
const ORDER = ['home2', 'home', 'about', 'events', 'team', 'community', 'blog', 'calendar', 'contact'];

export default function App() {
  const [cur, setCur] = useState('home2');
  const [cls, setCls] = useState({ home2: 'under' }); // transition class per page id
  const [introDone, setIntroDone] = useState(false);
  const [modal, setModal] = useState(null);
  const [tl, setTl] = useState({ cat: '', sel: -1, year: null }); // events timeline
  const [teamTl, setTeamTl] = useState({ sel: -1 });
  const [teamYear, setTeamYear] = useState(YRS[0]);
  const [sub, setSub] = useState(null); // opened sub-event {title, pdfUrl, ...}
  const [mem, setMem] = useState({ kind: 'ACM', sel: -1, year: YRS[0] }); // members timeline (ACM / ACMW)

  const curRef = useRef('home2');
  const busy = useRef(true); // locked while the intro plays

  /* ---- page turning ---- */
  const go = useCallback((id, mode) => {
    if (busy.current || id === curRef.current) return;
    busy.current = true;
    const a = curRef.current,
      b = id;
    const fwd = mode === 'back' ? false : mode === 'open' || ORDER.indexOf(id) >= ORDER.indexOf(a) || !ORDER.includes(id) || !ORDER.includes(a);
    const el = document.getElementById(b);
    if (el) el.scrollTop = 0;
    if (mode === 'open') setCls({ [b]: 'on open', [a]: 'under' });
    else if (fwd) setCls({ [b]: 'rise', [a]: 'turn' });
    else setCls({ [a]: 'under', [b]: 'turnb' });
    setTimeout(() => {
      setCls({ [b]: 'on' + (fwd ? '' : ' noanim') });
      curRef.current = id;
      setCur(id);
      busy.current = false;
    }, mode === 'open' ? 420 : 450);
  }, []);

  const open_ = useCallback((id) => go(id, 'open'), [go]);

  /* ---- timelines ---- */
  const openTL = useCallback(
    (cat) => {
      setTl({ cat, sel: -1, year: null });
      go('timeline', 'open');
    },
    [go]
  );
  const pick = useCallback(
    (i) => {
      if (i < 0) return setTl((t) => ({ ...t, sel: -1 }));
      setTl((t) => ({ ...t, sel: i, year: YRS[i] }));
      go('year', 'open');
    },
    [go]
  );
  const pickTeam = useCallback(
    (i) => {
      if (i < 0) return setTeamTl({ sel: -1 });
      setTeamTl({ sel: i });
      setTeamYear(YRS[i]);
      go('tyear', 'open');
    },
    [go]
  );
  const openTeamTL = useCallback(() => {
    setTeamTl({ sel: -1 });
    go('teamtl', 'open');
  }, [go]);

  const openSub = useCallback(
    (s) => {
      setSub(s);
      go('subevent', 'open');
    },
    [go]
  );
  const openMemberTL = useCallback(
    (kind) => {
      setMem({ kind, sel: -1, year: YRS[0] });
      go('memtl', 'open');
    },
    [go]
  );
  const pickMember = useCallback(
    (i) => {
      if (i < 0) return setMem((m) => ({ ...m, sel: -1 }));
      setMem((m) => ({ ...m, sel: i, year: YRS[i] }));
      go('memyear', 'open');
    },
    [go]
  );

  /* ---- intro hand-off ---- */
  const onIntroTurn = useCallback(() => {
    setCls({ home2: 'rise' });
    setTimeout(() => setCls({ home2: 'on' }), 640);
  }, []);
  const onIntroDone = useCallback(() => {
    setIntroDone(true);
    busy.current = false;
  }, []);

  /* ---- scroll / swipe past the end of a page to turn it ---- */
  useEffect(() => {
    let acc = 0,
      timer,
      ty = 0;
    const page = () => document.getElementById(curRef.current);
    const onWheel = (e) => {
      const p = page(),
        i = ORDER.indexOf(curRef.current);
      if (!p || i < 0 || busy.current) return;
      const end = p.scrollTop + p.clientHeight >= p.scrollHeight - 2,
        top = p.scrollTop <= 0;
      if (e.deltaY > 0 && end) acc += e.deltaY;
      else if (e.deltaY < 0 && top) acc += e.deltaY;
      else acc = 0;
      if (acc > 160 && i < ORDER.length - 1) {
        acc = 0;
        go(ORDER[i + 1]);
      } else if (acc < -160 && i > 0) {
        acc = 0;
        go(ORDER[i - 1]);
      }
      clearTimeout(timer);
      timer = setTimeout(() => (acc = 0), 300);
    };
    const onStart = (e) => (ty = e.touches[0].clientY);
    const onEnd = (e) => {
      const p = page(),
        i = ORDER.indexOf(curRef.current),
        d = ty - e.changedTouches[0].clientY;
      if (!p || i < 0 || busy.current) return;
      if (d > 90 && p.scrollTop + p.clientHeight >= p.scrollHeight - 2 && i < ORDER.length - 1) go(ORDER[i + 1]);
      else if (d < -90 && p.scrollTop <= 0 && i > 0) go(ORDER[i - 1]);
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchend', onEnd);
      clearTimeout(timer);
    };
  }, [go]);

  const value = useMemo(
    () => ({
      cur, cls, go, open_, openTL, pick, pickTeam, openTeamTL, openMemberTL, pickMember, openSub,
      tl, teamTl, teamYear, mem, sub,
      modal,
      showModal: (title, text) => setModal({ title, text }),
      closeModal: () => setModal(null),
    }),
    [cur, cls, go, open_, openTL, pick, pickTeam, openTeamTL, openMemberTL, pickMember, openSub, tl, teamTl, teamYear, mem, sub, modal]
  );

  return (
    <NavContext.Provider value={value}>
      <SvgDefs />
      {!introDone && <Intro onTurn={onIntroTurn} onDone={onIntroDone} />}
      <Nav />
      <div id="book">
        {SECTIONS.map((Section, i) => (
          <Section key={i} />
        ))}
      </div>
      <Modal />
    </NavContext.Provider>
  );
}
