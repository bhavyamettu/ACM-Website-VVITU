import { PortableText } from '@portabletext/react';
import { useNav } from '../NavContext.jsx';
import { useCms } from '../lib/CmsContext.jsx';
import { urlFor } from '../lib/sanity.js';
import { BLOG_STUB } from '../data/fallback.js';

const GRADIENTS = ['#1c3557,#4a78a8', '#3b4a5c,#8ea3b8', '#8a6a48,#d9c2a0', '#0f2547,#2f5c9a', '#4a7a9c,#a9c98f', '#3d4d5f,#c8b48f'];

const fmt = (d) => (d ? new Date(d + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '');

export default function BlogGrid() {
  const { showModal } = useNav();
  const { blogs } = useCms();

  const open = (b) =>
    showModal(
      b.title,
      <>
        {b.author && <p style={{ opacity: 0.7, marginBottom: 10 }}>By {b.author}</p>}
        {b.body?.length ? <PortableText value={b.body} /> : <p>{b.excerpt + BLOG_STUB}</p>}
      </>
    );

  return (
    <div className="bg3" id="bgrid">
      {blogs.map((b, i) => (
        <article className="bl" style={{ '--i': i }} key={b._id}>
          <div className="im">
            <i
              style={
                b.coverImage
                  ? { background: `center/cover url(${urlFor(b.coverImage).width(800).url()})` }
                  : { background: `linear-gradient(135deg,${b.gradient || GRADIENTS[i % GRADIENTS.length]})` }
              }
            ></i>
          </div>
          <small>
            <span>{(b.category || '').toUpperCase()}</span>
            <span style={{ fontWeight: 400, color: '#4b5b78', letterSpacing: 0 }}>{fmt(b.date)}</span>
          </small>
          <h3>{b.title}</h3>
          <p>{b.excerpt}</p>
          <button className="rm" onClick={() => open(b)}>
            Read More <span>→</span>
          </button>
        </article>
      ))}
    </div>
  );
}
