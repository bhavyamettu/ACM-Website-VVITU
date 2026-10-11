
import { memo, useEffect, useRef } from 'react';
import DATA from '../data/introData.js';
import { IMG } from '../images.js';

/* Opening animation: a canvas "pen drawing" of the campus with a loading bar.
   The animation is imperative (requestAnimationFrame) so it lives in one effect;
   the component never re-renders. */

const BW = 1200;
const ST = [0.9, 1.8, 1.5, 1.4, 1.1, 0.9, 0.7];

const COL = [
  'rgba(120,170,230,.42)',
  'rgba(232,243,255,.96)',
  'rgba(226,239,255,.92)',
  'rgba(214,232,255,.9)',
  'rgba(200,222,250,.85)',
  'rgba(186,212,245,.8)',
  'rgba(170,205,245,.5)',
];

const BUD = [0.4, 0.8, 0.7, 0.6, 0.9, 0.5, 1.1];

function buildStrokes() {
  const S = [];

  for (let i = 0; i < DATA.length; i += 5) {
    const [a, b, c, d, st] = DATA.slice(i, i + 5);

    S.push({
      x: a,
      y: b,
      X: c,
      Y: d,
      st,
      l: Math.hypot(c - a, d - b),
      p: 0,
    });
  }

  let t = 0;

  for (let q = 0; q < 7; q++) {
    const g = S.filter((s) => s.st === q);

    g.sort(
      q === 1
        ? (a, b) => b.l - a.l
        : (a, b) => a.x + a.y * 0.15 - (b.x + b.y * 0.15)
    );

    const sum = g.reduce((a, s) => a + s.l + 8, 0);

    g.forEach((s) => {
      s.d = (BUD[q] * (s.l + 8)) / sum;
      s.a = t;
      t += s.d;
    });
  }

  S.sort((a, b) => a.a - b.a);

  return [S, t];
}

function Intro({ onTurn, onDone }) {
  const root = useRef(null);
  const cv = useRef(null);
  const bar = useRef(null);
  const pct = useRef(null);
  const frame = useRef(null);

  const cbs = useRef({ onTurn, onDone });
  cbs.current = { onTurn, onDone };

  useEffect(() => {
    const I = root.current;
    const c = cv.current;
    const cx = c.getContext('2d');

    const [S, t] = buildStrokes();

    let k = 1;
    let lo = 0;
    let raf = 0;
    let stopped = false;

    function fit() {
      const r = c.getBoundingClientRect();
      const dp = Math.min(window.devicePixelRatio || 1, 2);

      c.width = Math.round(r.width * dp);
      c.height = Math.round(r.height * dp);

      k = c.width / BW;

      S.forEach((s) => {
        s.p = 0;
      });

      lo = 0;
      cx.lineCap = 'round';

      const w = window.innerWidth;
      const h = window.innerHeight;
      const a = 22;
      const b = 32;
      const P = frame.current.querySelectorAll('path');

      const rc = (m) =>
        `M${m} ${m}H${w - m}V${h - m}H${m}Z`;

      const orn = (x, y, sx, sy) => {
        const X = (d) => x + sx * d;
        const Y = (d) => y + sy * d;

        return (
          `M${X(0)} ${Y(58)}V${Y(0)}H${X(58)}` +
          `M${X(11)} ${Y(44)}V${Y(11)}H${X(44)}` +
          `M${X(11)} ${Y(11)}L${X(26)} ${Y(26)}` +
          `M${X(26)} ${Y(21)}l5 5-5 5-5-5z`
        );
      };

      P[0].setAttribute('d', rc(a));
      P[1].setAttribute('d', rc(b));

      P[2].setAttribute(
        'd',
        orn(a, a, 1, 1) +
          orn(w - a, a, -1, 1) +
          orn(a, h - a, 1, -1) +
          orn(w - a, h - a, -1, -1)
      );
    }

    function draw(tb) {
      for (let i = lo; i < S.length; i++) {
        const s = S[i];

        if (s.a > tb) break;

        const p = Math.min(1, (tb - s.a) / s.d);

        if (p > s.p) {
          cx.strokeStyle = COL[s.st];
          cx.lineWidth = ST[s.st] * k;

          cx.beginPath();

          cx.moveTo(
            (s.x + (s.X - s.x) * s.p) * k,
            (s.y + (s.Y - s.y) * s.p) * k
          );

          cx.lineTo(
            (s.x + (s.X - s.x) * p) * k,
            (s.y + (s.Y - s.y) * p) * k
          );

          cx.stroke();
          s.p = p;
        }

        if (s.p >= 1 && i === lo) {
          lo++;
        }
      }
    }

    const B0 = 2.3;
    const GL = B0 + t;
    const PA = GL + 0.5;
    const TU = PA + 0.7;
    const EN = TU + 0.65;

    const F = [
      ['f1', 0.2],
      ['f2', 0.9],
      ['f3', 1.9],
      ['f4', 2.3],
    ];

    let off = 0;
    const T0 = performance.now();

    fit();
    window.addEventListener('resize', fit);

    // Click to skip ahead.
    I.onclick = () => {
      const n = (performance.now() - T0) / 1000 + off;

      if (n < GL) {
        off += GL - n + 0.01;
      } else if (n < TU) {
        off += TU - n + 0.01;
      }
    };

    function tick(now) {
      if (stopped) return;

      const n = (now - T0) / 1000 + off;

      F.forEach(([cl, at]) => {
        if (n >= at) I.classList.add(cl);
      });

      const p = Math.max(0, Math.min(1, (n - B0) / t));

      bar.current.style.width = p * 100 + '%';
      pct.current.textContent = Math.round(p * 100) + '%';

      draw(n - B0);

      if (n >= GL) I.classList.add('glow');
      if (n >= PA) I.classList.add('paper');

      if (n >= TU && !I.classList.contains('turn')) {
        I.classList.add('turn');
        cbs.current.onTurn?.();
      }

      if (n >= EN) {
        window.removeEventListener('resize', fit);
        cbs.current.onDone?.();
        return;
      }

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', fit);
      I.onclick = null;
    };
  }, []);

  return (
    <div id="intro" ref={root}>
      <div className="ipaper"></div>
      <div className="ibg"></div>

      <svg className="ifr" id="ifr" ref={frame}>
        <path pathLength="1" />
        <path pathLength="1" />
        <path pathLength="1" />
      </svg>

      <div className="icn">
        <div className="ilw">
          <img
            className="ilg"
            src={IMG.acmlogo}
            alt="ACM VVITU logo"
          />

          <i className="ilgi"></i>
        </div>

        <h1 className="itt">ACM VVITU</h1>

        <p className="ist">
          ASSOCIATION FOR COMPUTING MACHINERY
          <br />
          STUDENT CHAPTER
        </p>

        <div className="ild">
          <div className="itr">
            <i id="ibar" ref={bar}></i>
          </div>

          <div className="ilr">
            <span>Loading our community...</span>
            <span id="ipct" ref={pct}>0%</span>
          </div>
        </div>
      </div>

      <canvas
        id="ibd"
        ref={cv}
        width="1200"
        height="589"
      ></canvas>
    </div>
  );
}

export default memo(Intro);