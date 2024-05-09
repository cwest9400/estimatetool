// This component allows the user to start the estimate creation process

import React from 'react';

const Header = ({ onCreateEstimate, isEstimateActive, estimateName }) => {
    return (
        <div className='header-container'>
            {isEstimateActive ? (
                <h2>Creating Estimate {estimateName}</h2>  // Display the estimate name when active
            ) : (
                <button onClick={onCreateEstimate}>Create Estimate</button>  // Otherwise show the button
            )}
        </div>
    );
};

export default Header;
