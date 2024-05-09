// This component displays the running total of all the line items.

import React from 'react';

const Footer = ({ totalAmount }) => {
    return (
        <div className="footer-container">
            <p>Total Estimate: ${totalAmount.toFixed(2)}</p>
        </div>
    );
};

export default Footer;
