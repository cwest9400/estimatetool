// This is a generic message display

import React from 'react';

const MessageModal = ({ message, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>{message}</h3>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default MessageModal;

