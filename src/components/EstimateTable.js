// This component is for organizing the estimate data (line items)

import React from 'react';

// When new line item added ("estimate") maps estimate array to table, an item is deited or deleted
const EstimateTable = ({ estimate, onEditItem, onDeleteItem }) => {
    return (
        <div className="table-content">
            <table className="table-style">
                <thead>
                    <tr>
                        <th className="ln-column">Ln</th>
                        <th className="desc-column">Description</th>
                        <th className="type-column">Type</th>
                        <th className="amount-column">Amount</th>
                        <th className="actions-column">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {estimate.map((item, index) => (
                        <tr key={item.id || index}>
                            <td className="ln-column">{index + 1}</td>
                            <td className="desc-column">{item.description}</td>
                            <td className="type-column">{item.type}</td>
                            <td className="amount-column">${item.amount.toFixed(2)}</td>
                            <td className="actions-column">
                                <div className='button-container'>
                                    <button onClick={() => onEditItem(item)}>Edit</button>
                                    <button onClick={() => onDeleteItem(item.id)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EstimateTable;
