const Modal = ({ text, handleClose }) => {
  return (
    <div className="form modal">
      <div className="card">
        <h3>{text}</h3>
        <button onClick={handleClose}>close</button>
      </div>
    </div>
  );
};

export default Modal;
