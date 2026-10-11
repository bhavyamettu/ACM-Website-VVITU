import { useState } from 'react';

/* Contact form. There is no backend: submitting just shows the thank-you card.
   Hook `handleSubmit` up to your API / email service when you have one. */
export default function ContactForm() {
  const [done, setDone] = useState(false);
  const [fade, setFade] = useState(false);

  const swap = (next) => {
    setFade(true);
    setTimeout(() => {
      setDone(next);
      setFade(false);
    }, 260);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    swap(true);
  };

  return (
    <div
      className="card form rv"
      id="fbox"
      style={{ '--i': 3, transition: 'opacity .25s,transform .25s', opacity: fade ? 0 : 1, transform: fade ? 'scale(.95)' : 'none' }}
    >
      {done ? (
        <div style={{ textAlign: 'center', padding: '30px 10px' }}>
          <div className="serif" style={{ font: "600 44px 'Lora'" }}>THANK YOU!</div>
          <p style={{ margin: '12px 0 20px' }}>Your message has been received. We'll get back to you within 24 hours.</p>
          <button className="btn" onClick={() => swap(false)}>Send another</button>
        </div>
      ) : (
        <form id="cf" onSubmit={handleSubmit}>
          <input required placeholder="👤  Name" />
          <input required type="tel" placeholder="📞  Phone no" />
          <input required type="email" placeholder="✉  Email" />
          <textarea required rows="3" placeholder="💬  Message"></textarea>
          <button className="btn" style={{ width: '100%', padding: 14 }}>➤ Submit</button>
        </form>
      )}
    </div>
  );
}
