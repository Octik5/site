import React from "react"
import './ModalWindow.css'

const ModalWindow = ({ show, onClose, children }) => { //отображение модальново окна
    if (!show) {
        return null;
    }
    //jsx
    return (
      <div className="modal-backdrop show" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="modal-close-button" aria-label="Close modal"/>
                {children}
                <div style={{display: "flex"}}>
                    <a href="https://t.me/octik5" rel="noopener noreferrer" className="social-button telegram">
                        Телеграм
                    </a>
                    <a href="https://www.instagram.com/octi64x21212/" rel="noopener noreferrer" className="social-button instagram">
                        Инстаграм
                    </a>
                </div>
            </div>
      </div>
    );
};

export default ModalWindow