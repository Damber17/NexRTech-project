import { X } from "lucide-react";
import "../../styles/modal.css";

export default function Modal({ title, children, onClose }) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        className="modal-card"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-head">
          <h3>{title}</h3>

          <button type="button" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
