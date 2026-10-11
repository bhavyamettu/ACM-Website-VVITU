import { useNav } from '../NavContext.jsx';

// The original page rewrites each section's className on every turn (so the optional
// `frame` ring defined in the CSS is never actually shown). Keep parity by default;
// flip this to true if you want the navy inset frame on Home / About / Events.
const SHOW_FRAME = false;

// One "page of the book". `cls` carries the transition state
// (on / under / turn / turnb / rise / open / noanim) managed by App.
// Extra props (e.g. data-year) are forwarded to the <section>.
export default function Page({ id, frame, children, ...rest }) {
  const { cls } = useNav();
  const c = ['pg', SHOW_FRAME && frame && 'frame', cls[id]].filter(Boolean).join(' ');
  return (
    <section className={c} id={id} {...rest}>
      {children}
    </section>
  );
}
