
import { useNav } from '../NavContext.jsx';
import { useCms } from '../lib/CmsContext.jsx';

export default function YearDraft() {
  const { tl, openSub } = useNav();
  const { subEventsFor } = useCms();

  const list = tl.cat && tl.year ? subEventsFor(tl.cat, tl.year) : [];

  const mainEvents = list.filter((s) => s.eventSection !== 'spot');
  const spotEvents = list.filter((s) => s.eventSection === 'spot');

  const renderCards = (events) =>
    events.map((s) => (
      <button
        key={s._key}
        className="se-card"
        onClick={() => openSub({ ...s, event: tl.cat, year: tl.year })}
      >
        <span className="se-img">
          {s.posterUrl ? (
            <img src={s.posterUrl} alt={s.title} />
          ) : (
            <i>No poster</i>
          )}
        </span>
        <b>{s.title}</b>
        {s.description && <small>{s.description}</small>}
        <small>
          {s.eventSection === 'spot' ? 'Spot Event' : 'Main Event'}
        </small>
      </button>
    ));

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
        <div className="se-sections">
          {mainEvents.length > 0 && (
            <section className="se-section">
              <h3 className="se-section-title">MAIN EVENTS</h3>
              <div className="se-grid">{renderCards(mainEvents)}</div>
            </section>
          )}

          {mainEvents.length > 0 && spotEvents.length > 0 && (
            <div className="se-section-divider">
              <span>SPOT EVENTS</span>
            </div>
          )}

          {spotEvents.length > 0 && (
            <section className="se-section">
              {mainEvents.length === 0 && (
                <h3 className="se-section-title">SPOT EVENTS</h3>
              )}
              <div className="se-grid">{renderCards(spotEvents)}</div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

