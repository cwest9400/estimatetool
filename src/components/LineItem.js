// This component allows for editing and deleting a specific line item within an estimate.
// Each field can be edited, and changes are managed locally within the component's state until saved.
//   
//  Props:
//   - item: The initial data for the line item
//   - onUpdateItem: Function to call when the 'Save' button is clicked, passing the updated item.
//   - onDeleteItem: Function to call when the 'Delete' button is clicked, using the item's id.

import React, { useState } from "react";

const LineItem = ({ item, onUpdateItem, onDeleteItem }) => {
    const [editedItem, setEditedItem] = useState({...item});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedItem(prev => ({
            ...prev,
            [name]: parseFloat(value)
        }));
    };

    const handleSave = () => {
        if (JSON.stringify(item) !== JSON.stringify(editedItem)) {
            onUpdateItem(editedItem);
        }
    };

    const handleDelete = () => {
        onDeleteItem(item.id);
    };

    return (
        <div className="line-item">
            <label>
                Material Cost:
                <input
                    type="number"
                    name="materialCost"
                    value={editedItem.materialCost || ''}
                    onChange={handleChange}
                    min="0"
                />
            </label>
            <label>
                Labor Cost:
                <input
                    type="number"
                    name="laborCost"
                    value={editedItem.laborCost || ''}
                    onChange={handleChange}
                    min="0"
                />
            </label>
            <label>
                All-Inclusive Cost:
                <input
                    type="number"
                    name="allInclusiveCost"
                    value={editedItem.allInclusiveCost || ''}
                    onChange={handleChange}
                    min="0"
                />
            </label>
            <label>
                Description:
                <input
                    type="text"
                    name="description"
                    value={editedItem.description || ''}
                    onChange={handleChange}
                />
            </label>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default LineItem;
