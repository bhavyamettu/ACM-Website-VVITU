import { useNav } from '../NavContext.jsx';

/* Blank bordered page that shows the selected sub-event's PDF. */
export default function SubEventView() {
  const { sub } = useNav();
  if (!sub)
    return (
      <div className="yd-e">
        <h2>Nothing selected</h2>
      </div>
    );
  const src = sub.pdfUrl;
  return (
    <div className="yd">
      <div className="yd-h">
        <h2>{sub.title}</h2>
        <span>{sub.event} · {sub.year}</span>
      </div>
      {sub.description && <p>{sub.description}</p>}
      {src ? (
        <>
          <iframe className="yd-f" title={sub.title} src={src + '#view=FitH'} />
          <div className="yd-a">
            <a href={src} target="_blank" rel="noopener noreferrer">Open PDF in new tab ↗</a>
            <a href={src + '?dl=' + encodeURIComponent(sub.title + '.pdf')}>Download</a>
          </div>
        </>
      ) : (
        <div className="yd-e"><p>No PDF uploaded for this sub-event yet.</p></div>
      )}
    </div>
  );
}
