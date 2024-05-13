// This component allows the user to name the new estimate.

import React, { useState } from 'react';

const EstimateNamingModal = ({ onSave, onClose }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name.trim()){
            alert('Please enter a name for the estimate') // TODO: change to message modal
            return;
        }
        onSave(name);  // Pass the name back to the parent component
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <form onSubmit={handleSubmit}>
                    <h3>Name Your Estimate</h3>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength="20"
                        required
                    />
                    <div>
                        <button type="submit">Save Name</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EstimateNamingModal;
