//


import React, { useState } from "react";
import Header from "./Header";
import EstimateFormModal from "./EstimateFormModal";
import EstimateTable from "./EstimateTable";
import Footer from "./EstimateFooter";
import EstimateNamingModal from "./EstimateNamingModal";
import MessageModal from "./MessageModal";
import EstimatesList from "./EstimatesList";

function EstimateManagementPage() {
  // Store the active estimate info
  const [estimates, setEstimates] = useState([]);
  // Store current time for adding to estimate when saved
  const [currentItem, setCurrentItem] = useState(null);
  // Store if add/edit line modal is on or off
  const [showModal, setShowModal] = useState(false);
  // Store if an estimate is currently active (this toggles conditional rendering for several elements/components)
  const [isEstimateActive, setIsEstimateActive] = useState(false);
  // Store if estimate naming modal is active or not
  const [isNamingModalVisible, setIsNamingModalVisible] = useState(false);
  // Store the user input for the name of the estimate
  const [estimateName, setEstimateName] = useState("");
  // Store all saved estimate objects here
  const [allEstimates, setAllEstimates] = useState([]);
  // Store the message modal visibility state
  const [messageModal, setMessageModal] = useState({ show: false, message: '' });



  const handleCreateEstimate = () => {
    setIsNamingModalVisible(true);
  };

  const handleNamingSave = (name) => {
    setEstimateName(name);
    setIsNamingModalVisible(false);
    setIsEstimateActive(true);
  };

  const handleAddLineItem = () => {
    setCurrentItem({
      id: null,
      description: "",
      type: "Materials",
      amount: "",
    });
    setShowModal(true);
  };

  const handleEditItem = (item) => {
    setCurrentItem(item);
    setShowModal(true);
  };

  // Add or update a line item in the current estimate
  const handleSaveItem = (item) => {
    if (item.id) {
      // Update existing item
      setEstimates(estimates.map((est) => (est.id === item.id ? item : est)));
    } else {
      // Add new item with a new unique id
      const newItem = { ...item, id: Date.now() }; // Simple unique id
      setEstimates([...estimates, newItem]);
    }
    setCurrentItem(null)
    setShowModal(false);
  };

  const handleDeleteItem = (id) => {
    const updatedEstimates = estimates.filter((item) => item.id !== id);
    setEstimates(updatedEstimates);
  };

  const handleSaveEstimate = () => {
    if (estimates.length > 0) {
        const newEstimate = {
            id: Date.now(),  // unique identifier
            name: estimateName,
            date: new Date().toLocaleDateString(),  // Save the current date
            items: estimates,
        };
        setAllEstimates(prevEstimates => [...prevEstimates, newEstimate]);
        setMessageModal({ show: true, message: "Estimate saved!" });
        setEstimates([]); // Optionally clear estimates
        setIsEstimateActive(false);
    } else {
        setMessageModal({ show: true, message: "No items to save." });
    }
};


  const handleCancelEstimate = () => {
    setEstimates([]);  // Clear the current estimates
    setIsEstimateActive(false);  // Disable estimate creation mode
};


  const handleCloseMessageModal = () => {
    setMessageModal({ show: false, message: '' });
    setCurrentItem(null);  // Reset the current item
};

// TODO: Add calcs for each cost type as well
  const totalAmount = estimates.reduce(
    (acc, curr) => acc + parseFloat(curr.amount || 0),
    0
  );

  return (
    <div>
        <Header onCreateEstimate={handleCreateEstimate} isEstimateActive={isEstimateActive} estimateName={estimateName} />
        {!isEstimateActive && <EstimatesList estimates={allEstimates} />}
        {isNamingModalVisible && (
            <EstimateNamingModal
                onSave={handleNamingSave}
                onClose={() => setIsNamingModalVisible(false)}
            />
        )}
        {isEstimateActive && (
            <>
                <div className="centered-content">
                    <div className="centered-flex">
                        <button onClick={handleAddLineItem}>Add Line Item</button>
                        <button onClick={handleSaveEstimate} className="button-spacing">Save Estimate</button>
                        <button  onClick={handleCancelEstimate} className="button-cancel">Close Without Saving</button>
                    </div>
                    <EstimateTable estimate={estimates} onEditItem={handleEditItem} onDeleteItem={handleDeleteItem} />
                </div>
            </>
        )}
        {showModal && (
            <EstimateFormModal
                onSave={handleSaveItem}
                onClose={() => setShowModal(false)}
                item={currentItem}
            />
        )}
        {messageModal.show && (
            <MessageModal message={messageModal.message} onClose={handleCloseMessageModal} />
        )}
        {isEstimateActive && <Footer totalAmount={totalAmount} />}
    </div>
);
}

export default EstimateManagementPage;
