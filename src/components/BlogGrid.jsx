import { useCms } from '../lib/CmsContext.jsx';
import { urlFor } from '../lib/sanity.js';

const formatDate = (date) => {
  if (!date) return '';

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) return date;

  return parsedDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export default function BlogGrid() {
  const { blogs = [], loading, error } = useCms();

  

  const publishedBlogs = blogs.filter(
    (blog) => blog.published === true && blog.blogUrl
  );

  if (loading) {
    return (
      <div className="bg3" id="bgrid">
        <p>Loading blogs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg3" id="bgrid">
        <p>Unable to load blogs. Please try again later.</p>
      </div>
    );
  }

  if (publishedBlogs.length === 0) {
    return (
      <div className="bg3" id="bgrid">
        <p>No blog posts are available yet.</p>
      </div>
    );
  }

  return (
    <div className="bg3" id="bgrid">
      {publishedBlogs.map((blog, index) => {
        const imageUrl = blog.coverImage
          ? urlFor(blog.coverImage)?.width(800).url()
          : null;

        return (
          <article
            className="bl"
            style={{ '--i': index }}
            key={blog._id}
          >
            <a
              href={blog.blogUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Read ${blog.title} on the official blog`}
              style={{
                display: 'block',
                color: 'inherit',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              <div className="im">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={blog.title || 'Blog cover'}
                    loading="lazy"
                    style={{
                      display: 'block',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      minHeight: '180px',
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    Blog
                  </div>
                )}
              </div>

              <small>
                <span>ACM BLOG</span>
                <span
                  style={{
                    fontWeight: 400,
                    color: '#4b5b78',
                    letterSpacing: 0,
                  }}
                >
                  {formatDate(blog.date)}
                </span>
              </small>

              <h3>{blog.title}</h3>
            </a>
          </article>
        );
      })}
    </div>
  );
}