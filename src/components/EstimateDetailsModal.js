// This component displays the details of the saved estimates
// TODO: add sorting/filtering
// TODO: Would be cool to have buttons for downloading a pdf of the estimate or emailing it.


import React from 'react';

const EstimateDetailsModal = ({ estimate, onClose }) => {
    // Calculate the running total amount of all line items added
    const totalAmount = estimate.items.reduce((sum, item) => sum + item.amount, 0);

    return (
        <div className="modal-overlay-estimate-detail">
            <div className="modal-content-estimate-detail">
                <h2>Estimate Details</h2>
                <p className="estimate-name"><strong>Name:</strong> {estimate.name} <strong>Date:</strong> {estimate.date}</p>
            
                <table>
                    <thead>
                        <tr>
                            <th>Ln</th>
                            <th>Description</th>
                            <th>Type</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {estimate.items.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td className="description-cell">{item.description}</td>
                                <td>{item.type}</td>
                                <td>${item.amount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan="3">Total</th>
                            <th>${totalAmount.toFixed(2)}</th>
                        </tr>
                    </tfoot>
                </table>
                <button className="button-cancel" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default EstimateDetailsModal;
