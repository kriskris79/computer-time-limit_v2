import React from 'react';
import '../styles/modal.scss';

function CustomModal({ isOpen, title, message, onClose }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>{title}</h3>
                <p>{message}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default CustomModal;
