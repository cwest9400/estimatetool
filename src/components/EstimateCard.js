// This component acts as a mini card for the estimates that have been saved.

import React from 'react';

const EstimateCard = ({ estimate, onClick }) => {
    return (
        // On click bring up estimate details
        <div className="estimate-card" onClick={() => onClick(estimate)}>
            <h4>{estimate.name}</h4>
            <p>Date: {estimate.date}</p>
        </div>
    );
};

export default EstimateCard;
