import { useState } from 'react';
import { useCms } from '../lib/CmsContext.jsx';

const MN = 'JANUARY,FEBRUARY,MARCH,APRIL,MAY,JUNE,JULY,AUGUST,SEPTEMBER,OCTOBER,NOVEMBER,DECEMBER'.split(',');
const DAYS = 'Sun,Mon,Tue,Wed,Thu,Fri,Sat'.split(',');
const key = (y, m, d) => y + '-' + String(m + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');

export default function Calendar() {
  const { calendarByDate: EVENTS } = useCms();
  const [Y, setY] = useState(2026);
  const [M, setM] = useState(9); // October
  const [view, setView] = useState('month');
  const [sel, setSel] = useState(null);

  const move = (n) => {
    let m = M + n,
      y = Y;
    if (m < 0) { m = 11; y--; }
    if (m > 11) { m = 0; y++; }
    setM(m);
    setY(y);
  };

  let body;
  if (view === 'list') {
    const list = Object.keys(EVENTS).filter((x) => x.startsWith(Y + '-' + String(M + 1).padStart(2, '0')));
    body = list.length ? (
      list.map((x) => (
        <div className="ev card" key={x} style={{ padding: 14, marginBottom: 10, cursor: 'pointer' }} onClick={() => setSel(x)}>
          <b>{x}</b> — {EVENTS[x].map((v) => v.title).join(', ')}
        </div>
      ))
    ) : (
      <p style={{ padding: 20 }}>No events this month.</p>
    );
  } else {
    const f = new Date(Y, M, 1).getDay(),
      dm = new Date(Y, M + 1, 0).getDate(),
      pm = new Date(Y, M, 0).getDate();
    let cells = [];
    for (let i = f - 1; i >= 0; i--) cells.push([pm - i, 1]);
    for (let d = 1; d <= dm; d++) cells.push([d, 0]);
    while (cells.length % 7) cells.push([cells.length - f - dm + 1, 1]);
    if (view === 'week') {
      const s = Math.floor((f + (sel ? +sel.slice(-2) : 1) - 1) / 7) * 7;
      cells = cells.slice(s, s + 7);
    }
    body = (
      <div className="g7">
        {DAYS.map((d) => <div className="hd" key={d}>{d}</div>)}
        {cells.map(([d, out], i) => {
          const kk = out ? '' : key(Y, M, d),
            e = EVENTS[kk];
          return (
            <div key={i} className={[out ? 'out' : '', e ? 'ev' : ''].join(' ')} onClick={e ? () => setSel(kk) : undefined} title={e ? e.map((v) => v.title).join(', ') : undefined}>
              {d}
              {e && e.map((v) => <span key={v._id} className="chip" style={{ background: v.color }}>● {v.title}</span>)}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="card cal rv" style={{ '--i': 3 }}>
      <div className="ch">
        <b className="serif" id="mt" style={{ font: '600 20px Inter' }}>{MN[M] + ' ' + Y}</b>
        <div>
          <button className="sq" onClick={() => move(-1)}>‹</button> <button className="sq" onClick={() => move(1)}>›</button> &nbsp;
          {['month', 'week', 'list'].map((v) => (
            <button key={v} className={'sq' + (view === v ? ' on' : '')} onClick={() => setView(v)}>
              {v[0].toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div id="cg">
        {body}
        {sel && EVENTS[sel] && (
          <div className="card" style={{ padding: 16, marginTop: 16, background: '#fff' }}>
            {EVENTS[sel].map((v, i) => (
              <div key={v._id} style={i ? { marginTop: 14 } : undefined}>
                <b>{v.title}</b> · {sel}
                {(v.startTime || v.endTime) && <span> · {[v.startTime, v.endTime].filter(Boolean).join(' – ')}</span>}
                {v.location && <span> · {v.location}</span>}
                {v.description && <p style={{ marginTop: 6, fontSize: 14 }}>{v.description}</p>}
                {v.link && (
                  <p style={{ marginTop: 6, fontSize: 14 }}>
                    <a href={v.link} target="_blank" rel="noopener noreferrer">More details →</a>
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
