import { useNav } from '../NavContext.jsx';

export default function Modal() {
  const { modal, closeModal } = useNav();
  return (
    <div id="modal" className={modal ? 'on' : ''} onClick={(e) => e.target === e.currentTarget && closeModal()}>
      <div className="card">
        <h2 className="serif" style={{ font: "600 26px 'Lora'" }}>{modal?.title}</h2>
        <div style={{ margin: '14px 0 20px', lineHeight: 1.7 }}>{modal?.text}</div>
        <button className="btn" onClick={closeModal}>Close</button>
      </div>
    </div>
  );
}
