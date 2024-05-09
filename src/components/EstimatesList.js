// This component lists all the saved estimates so that the user can see previously saved estimates

import React, {useState} from 'react';
import EstimateCard from './EstimateCard';  // Import the card component
import EstimateDetailsModal from './EstimateDetailsModal';

const EstimatesList = ({ estimates }) => {
    const [selectedEstimate, setSelectedEstimate] = useState(null);

    const handleCardClick = (estimate) => {
        setSelectedEstimate(estimate);
    };

    const handleCloseModal = () => {
        setSelectedEstimate(null);
    };

    return (
        <div className="estimates-list">
            {estimates.map(estimate => (
                <EstimateCard key={estimate.id} estimate={estimate} onClick={handleCardClick} />
            ))}
            {selectedEstimate && <EstimateDetailsModal estimate={selectedEstimate} onClose={handleCloseModal} />}
        </div>
    );
};

export default EstimatesList;
