import { useNav } from '../NavContext.jsx';
import { useCms } from '../lib/CmsContext.jsx';

/* Year page: poster cards of the sub-events for the chosen event + year. Click -> PDF page. */
export default function YearDraft() {
  const { tl, openSub } = useNav();
  const { subEventsFor } = useCms();
  const list = tl.cat && tl.year ? subEventsFor(tl.cat, tl.year) : [];

  return (
    <div className="yd">
      <div className="yd-h">
        <h2>{tl.cat}</h2>
        <span>{tl.year}</span>
      </div>
      {list.length === 0 ? (
        <div className="yd-e">
          <h2>Nothing here yet</h2>
          <p>No sub-events have been published for {tl.year}.</p>
        </div>
      ) : (
        <div className="se-grid">
          {list.map((s) => (
            <button key={s._key} className="se-card" onClick={() => openSub({ ...s, event: tl.cat, year: tl.year })}>
              <span className="se-img">
                {s.posterUrl ? <img src={s.posterUrl} alt={s.title} /> : <i>No poster</i>}
              </span>
              <b>{s.title}</b>
              {s.description && <small>{s.description}</small>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
