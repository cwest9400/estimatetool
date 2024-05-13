// This Component allows the user to add new line items or edit existing line items within an estimate.
// The useState hook holds the form inputs by keeping track of the state variables- description, type and amount.
// Editing a line item: When an existing item is passed to the modal (item prop with an id), the useEffect hook sets the form fields (description, type, amount)
// Editing a line item: If no existing item data is provided (e.g., item.id is null), it means the form is being used to add a new item.

import React, { useState, useEffect } from 'react';


const EstimateFormModal = ({ onSave, onClose, item = {} }) => {
    const [description, setDescription] = useState('');
    const [type, setType] = useState('materialCost');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        if (item && item.id != null) {
            setDescription(item.description || '');
            setType(item.type || 'Materials');
            setAmount(item.amount || '');
        } else {
            setDescription('');
            setType('Materials');
            setAmount('');
        }
    }, [item]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!description.trim()){
            alert('please fill in the description') //TODO: Change to message modal
            return
        }
        
        // copy item from state to collection of line items in EstimateManagementPage - handleSaveItem
        onSave({ ...item, description, type, amount: parseFloat(amount) });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <form onSubmit={handleSubmit}>
                    <h3>{item && item.id != null ? "Edit Item" : "New Item"}</h3>
                    <div className="form-group">
                        <label>Description:</label>
                        <input type="text" value={description} onChange={e => setDescription(e.target.value)} maxLength="40" required />
                        <small>Maximum 40 characters.</small>
                    </div>
                    <div className="form-group horizontal">
                        <div className="form-control">
                            <label>Cost Type:</label>
                            <select value={type} onChange={e => setType(e.target.value)}>
                                <option value="Materials">Materials</option>
                                <option value="Labor">Labor</option>
                                <option value="All-Inclusive">All-Inclusive</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label>Amount ($):</label>
                            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} min="0" step="0.01" required />
                        </div>
                    </div>
                    <div>
                        <button type="submit">Save</button>
                        <button className="button-cancel" type="button"  onClick={onClose}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EstimateFormModal;
