import { memo } from 'react';
import { D, IM, L, RM } from '../data/layouts.js';
import { parseStyle } from '../data/content.js';

/* zig-zag stroke used as a mask so artwork appears to be "coloured in" */
function zz(W, H, r, sl) {
  const s = H / r;
  let d = `M0 ${s / 2}`;
  for (let i = 0; i < r; i++) {
    const y = s / 2 + i * s,
      a = i % 2 ? 0 : W,
      b = i % 2 ? W : 0;
    d += `L${a} ${y + sl}` + (i < r - 1 ? `L${a} ${y + s}` : '');
  }
  return [d, s * 1.35];
}

const lines = (t) => t.split('<br>').flatMap((x, i) => (i ? [<br key={'b' + i} />, x.replace(/&amp;/g, '&')] : [x.replace(/&amp;/g, '&')]));

function RoughBand({ n, st, uid }) {
  const [W, H] = IM[n + '1'];
  const mask = (i, rows, slope) => {
    const [d, w] = zz(W, H, rows, slope);
    return (
      <mask key={i} id={`m${i}_${uid}`} maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
        <path className={`zz t${i}`} pathLength="1" d={d} strokeWidth={w} />
      </mask>
    );
  };
  return (
    <svg className="rw rb" style={parseStyle(st)} viewBox={`0 0 ${W} ${H}`}>
      <defs>
        {mask(1, 6, H * 0.08)}
        {mask(2, 10, H * 0.06)}
        {mask(3, 14, H * 0.05)}
      </defs>
      {[1, 2, 3].map((i) => (
        <use key={i} href={`#img_${n}${i}`} mask={`url(#m${i}_${uid})`} />
      ))}
    </svg>
  );
}

function RoughImage({ n, st, uid }) {
  const [W, H] = IM[n];
  const [d1, w1] = zz(W, H, 6, H * 0.09);
  const [d2, w2] = zz(W, H, 14, H * 0.07);
  const mask = (id, c, d, w) => (
    <mask id={id + uid} maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
      <path className={'zz ' + c} pathLength="1" d={d} strokeWidth={w} />
    </mask>
  );
  return (
    <svg className={'rw ' + n} style={parseStyle(st)} viewBox={`0 0 ${W} ${H}`}>
      <defs>
        {mask('ma', 'z1', d1, w1)}
        {mask('mb', 'z2', d2, w2)}
      </defs>
      <use className="fa" href={'#img_' + n} mask={`url(#ma${uid})`} />
      <use href={'#img_' + n} mask={`url(#mb${uid})`} />
      <g className="pen">
        <g transform={`rotate(-40) scale(${(W * 0.004 + 0.6).toFixed(2)})`}>
          <path d="M0 0L4 -1.6V1.6Z" fill="#e6c9a0" />
          <path d="M0 0L1.2 -.5V.5Z" fill="#222" />
          <rect x="4" y="-1.6" width="15" height="3.2" fill="#1d3f80" />
          <rect x="19" y="-1.6" width="2.4" height="3.2" fill="#d9a3a3" />
        </g>
      </g>
    </svg>
  );
}

/* The decorative background layer of a page (sketches, torn-paper art, notes, leaves …) */
function Decor({ name }) {
  let q = 0;
  return (
    <div className="bgl">
      {(L[name] || []).map(([n0, st, t], idx) => {
        let n = n0;
        if (n === 'rb' && RM[name]) n = RM[name][q++] || 'rb';
        const key = `${name}_${idx}`;
        if (n === 'i') return <div key={key} className={`ig i-${t}`} style={parseStyle(st)} />;
        if (n === 'n') return <div key={key} className="note" style={parseStyle(st)}>{lines(t)}</div>;
        if (/^rb[BCD]?$/.test(n)) return <RoughBand key={key} n={n} st={st} uid={key} />;
        if (IM[n]) return <RoughImage key={key} n={n} st={st} uid={key} />;
        return (
          <svg key={key} className="sk" style={parseStyle(st)} viewBox={`0 0 ${D[n][0]} ${D[n][1]}`}>
            <use className="l1" href={`#${n}1`} />
            <use className="l2" href={`#${n}2`} />
            <use className="l3" href={`#${n}3`} />
          </svg>
        );
      })}
    </div>
  );
}

export default memo(Decor);
