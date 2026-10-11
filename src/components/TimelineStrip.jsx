import { Fragment, useEffect, useRef } from 'react';
import { useNav } from '../NavContext.jsx';
import { YRS } from '../data/content.js';

/* Catmull-Rom style smooth path through the points */
const cr = (p) => {
  let d = `M${p[0][0]} ${p[0][1]}`;
  for (let i = 0; i < p.length - 1; i++) {
    const a = p[i - 1] || p[i],
      b = p[i],
      c = p[i + 1],
      e = p[i + 2] || c;
    d += `C${b[0] + (c[0] - a[0]) / 6} ${b[1] + (c[1] - a[1]) / 6} ${c[0] - (e[0] - b[0]) / 6} ${c[1] - (e[1] - b[1]) / 6} ${c[0]} ${c[1]}`;
  }
  return d;
};

const N = YRS.length;
const W = 150 + (N - 1) * 223 + 110;
const Y0 = 235;
const HH = 300;
const HEIGHTS = [110, 118, 92, 113, 90, 109, 86, 114, 81];
const PTS = YRS.map((_, i) => {
  const y = i % 2 === 0 ? 384 + 36 * (1 - Math.exp(-i / 3.5)) : 458 + 28 * (1 - Math.exp(-i / 4));
  return [150 + i * 223, Math.round(y), Math.round(y - HEIGHTS[i % 9])];
});
const WAVE = cr([[-40, 437], ...PTS.map((n) => [n[0], n[1]]), [W + 40, PTS[N - 1][1] + (PTS[N - 1][1] > 440 ? -20 : 6)]]);
const px = (x) => (x / W) * 100 + '%';
const py = (y) => ((y - Y0) / HH) * 100 + '%';

/* Scrollable wavy year timeline. `fn` picks which handler/selection to use. */
export default function TimelineStrip({ fn }) {
  const { pick, pickTeam, pickMember, tl, teamTl, mem } = useNav();
  const onPick = fn === 'pick' ? pick : fn === 'pickMember' ? pickMember : pickTeam;
  const sel = fn === 'pick' ? tl.sel : fn === 'pickMember' ? mem.sel : teamTl.sel;
  const wrap = useRef(null);

  // drag-to-scroll with the mouse, wheel scrolls sideways
  useEffect(() => {
    const tw = wrap.current;
    let dn = false,
      sx = 0,
      sl = 0;
    const down = (e) => {
      if (e.pointerType !== 'mouse' || e.target.closest('button')) return;
      dn = true;
      sx = e.clientX;
      sl = tw.scrollLeft;
    };
    const move = (e) => dn && (tw.scrollLeft = sl - (e.clientX - sx));
    const up = () => (dn = false);
    const wheel = (e) => {
      if (tw.scrollWidth > tw.clientWidth + 2 && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        tw.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    };
    tw.addEventListener('pointerdown', down);
    tw.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    tw.addEventListener('wheel', wheel, { passive: false });
    return () => {
      tw.removeEventListener('pointerdown', down);
      tw.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      tw.removeEventListener('wheel', wheel);
    };
  }, []);

  return (
    <div className="tlw rv" style={{ '--i': 2 }} ref={wrap}>
      <div className="tls" style={{ '--w': W, aspectRatio: `${W}/${HH}` }}>
        <svg viewBox={`0 ${Y0} ${W} ${HH}`} preserveAspectRatio="none">
          <path className="w1" pathLength="1" d={WAVE} transform="translate(0 15)" stroke="#f4a53a" strokeWidth="9" />
          <path className="w1" pathLength="1" d={WAVE} stroke="#1e63d4" strokeWidth="27" />
          <path className="w1" pathLength="1" d={WAVE} transform="translate(0 -6)" stroke="#9cc6ff" strokeWidth="5" opacity=".7" />
          {PTS.map((n, i) => (
            <g key={i}>
              <line className="st" x1={n[0]} y1={n[2] + 32} x2={n[0]} y2={n[1] - 22} />
              <circle cx={n[0]} cy={n[2] + 32} r="3.5" fill="#0b2a55" />
            </g>
          ))}
        </svg>
        {PTS.map((n, i) => (
          <Fragment key={i}>
            <button className={'yl' + (sel === i ? ' on' : '')} style={{ left: px(n[0]), top: py(n[2]) }} onClick={() => onPick(i)}>
              {YRS[i]}
            </button>
            <button className={'nd' + (sel === i ? ' on' : '')} style={{ left: px(n[0]), top: py(n[1]) }} aria-label={YRS[i]} onClick={() => onPick(i)}></button>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
