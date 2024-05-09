
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


  // Function for bringing up the estimate naming modal
  const handleCreateEstimate = () => {
    setIsNamingModalVisible(true);
  };

  // Function for setting the estimate name
  const handleNamingSave = (name) => {
    setEstimateName(name);
    setIsNamingModalVisible(false);
    setIsEstimateActive(true);
  };

  // Function for adding a line item
  const handleAddLineItem = () => {
    // Ensure the form starts off empty
    setCurrentItem({
      id: null,
      description: "",
      type: "Materials",
      amount: "",
    });
    // Open up the modal for adding a line item
    setShowModal(true);
  };

  // Open the add item modal and set current item (so that the fields will prepopulate)
  const handleEditItem = (item) => {
    setCurrentItem(item);
    setShowModal(true);
  };

  // Save line item in the current estimate object. Reset current item to empty and close modal.
  const handleSaveItem = (item) => {
    // If item has an ID already, update the item
    if (item.id) {
      // Update existing item
      setEstimates(estimates.map((est) => (est.id === item.id ? item : est)));
    // Otherwise, if the item had no ID, the item is a new item  
    } else {
      // Add new item with a new unique id
      const newItem = { ...item, id: Date.now() }; // Simple unique id
      setEstimates([...estimates, newItem]);
    }
    setCurrentItem(null)
    setShowModal(false);
  };

  // Function for deleting Line Item- (it's filtered out of the estimate(ln items))
  const handleDeleteItem = (id) => {
    const updatedEstimates = estimates.filter((item) => item.id !== id);
    setEstimates(updatedEstimates);
  };

  // Function for saving the estimate
  // If estimate has line items, save the estimate and add it to setAllEstimates
  const handleSaveEstimate = () => {
    // If the estimate has line items, save new estimate and add it to setAllEstimates
    if (estimates.length > 0) {
        const newEstimate = {
            id: Date.now(),  // unique identifier
            name: estimateName,
            date: new Date().toLocaleDateString(),  // Save the current date
            items: estimates,
        };
        setAllEstimates(prevEstimates => [...prevEstimates, newEstimate]); // Update All Estimates with the new one
        setMessageModal({ show: true, message: "Estimate saved!" }); // Trigger message modal
        setEstimates([]); // Clear estimate data
        setIsEstimateActive(false); // Turn off estimate creation mode
    } else {
        setMessageModal({ show: true, message: "No items to save." });
    }
};

// Function to close the estimate without saving
  const handleCancelEstimate = () => {
    setEstimates([]);  // Clear the current estimates
    setIsEstimateActive(false);  // Disable estimate creation mode
};

// Function to close Message Modal
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
