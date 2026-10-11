import { useState } from 'react';
import { useNav } from '../NavContext.jsx';
import { useCms } from '../lib/CmsContext.jsx';

/* "Events" hexagon diagram. Coordinates come from a 1804 x 872 design canvas. */
const X = (x) => x / 18.04 + '%';
const Y = (y) => y / 8.72 + '%';
const box = (x, y, w, h, extra) => ({ left: X(x), top: Y(y), width: w / 18.04 + '%', height: h / 8.72 + '%', ...extra });

// Slots available on the diagram (the first ones match the original layout exactly)
const PUB_Y = [305, 385, 465, 545, 625];
const PUB_C = [334, 416, 496, 577, 657];
const PRI_Y = [335, 428, 521, 614, 707];
const PRI_C = [370, 461, 552, 643, 734];

const Dot = ({ x, y, c }) => <circle className={'lc ' + c} cx={x} cy={y} r="7" />;
const Diamond = ({ x, y }) => <path className="lc l1" d={`M${x} ${y - 6}l6 6-6 6-6-6z`} />;

export default function EventsStage() {
  const { openTL } = useNav();
  const { events } = useCms();
  const PUBLIC = events.filter((e) => e.visibility === 'public').slice(0, PUB_Y.length).map((e) => e.title);
  const PRIVATE = events.filter((e) => e.visibility === 'private').slice(0, PRI_Y.length).map((e) => e.title);
  const [s, setS] = useState({ s1: false, po: false, ro: false });

  const open = () => setS((v) => ({ ...v, s1: true }));
  const showPublic = () => setS((v) => ({ ...v, po: true, ro: false }));
  const showPrivate = () => setS((v) => ({ ...v, ro: true, po: false }));

  const cls = ['stage', s.s1 && 's1', s.po && 'po', s.ro && 'ro'].filter(Boolean).join(' ');

  return (
    <div className={cls} id="stage">
      <svg viewBox="0 0 1804 872">
        <path className="c c1" pathLength="1" d="M750 238H797L848 289" />
        <path className="c c1" pathLength="1" d="M1056 238H1010L960 289" />
        <Diamond x={744} y={238} />
        <Diamond x={1062} y={238} />
        <Dot x={848} y={289} c="l1" />
        <Dot x={960} y={289} c="l1" />
        {PUBLIC.length > 0 && <path className="c cp" pathLength="1" d={`M249 275V${PUB_C[PUBLIC.length - 1]}`} />}
        {PUBLIC.length > 0 && <path className="c cp" pathLength="1" d="M478 275V305" />}
        {PUB_C.slice(0, PUBLIC.length).map((y) => <Dot key={y} x={249} y={y} c="lp" />)}
        {PRIVATE.length > 0 && <path className="c cr" pathLength="1" d={`M1144 275V${PRI_C[PRIVATE.length - 1]}`} />}
        {PRIVATE.length > 0 && <path className="c cr" pathLength="1" d="M1347 275V335" />}
        {PRI_C.slice(0, PRIVATE.length).map((y) => <Dot key={y} x={1144} y={y} c="lr" />)}
      </svg>

      <button className="hx bn pub" style={box(222, 200, 513, 75)} onMouseEnter={showPublic} onClick={showPublic} onFocus={showPublic}>
        <span>Public</span>
      </button>
      <button className="hx bn pri" style={box(1072, 200, 515, 75)} onMouseEnter={showPrivate} onClick={showPrivate} onFocus={showPrivate}>
        <span>Private</span>
      </button>

      {PUBLIC.map((n, i) => (
        <button key={n} className="hx it pi" style={box(272, PUB_Y[i], 423, 62, { '--i': i })} onClick={() => openTL(n)}>
          <span>{n} →</span>
        </button>
      ))}
      {PRIVATE.map((n, i) => (
        <button key={n} className="hx it ri" style={box(1167, PRI_Y[i], 393, 70, { '--i': i })} onClick={() => openTL(n)}>
          <span>{n} →</span>
        </button>
      ))}

      <div className="dmb" tabIndex={0} style={box(745, 250, 322, 330)} onMouseEnter={open} onClick={open} onFocus={open}>
        <i></i>
        <b>EVENTS</b>
      </div>
      <div className="hvr" style={{ left: X(745), top: Y(598), width: 322 / 18.04 + '%' }}>HOVER</div>
    </div>
  );
}
