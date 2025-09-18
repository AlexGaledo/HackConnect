// ModalContext.jsx
import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modal, setModal] = useState({ show: false, title: "", message: "" });

  // Function to trigger the modal from anywhere
  const showModal = ({ title, message }) => {
    setModal({ show: true, title, message });
  };

  // Function to close the modal
  const closeModal = () => setModal({ show: false, title: "", message: "" });

  return (
    <ModalContext.Provider value={{ showModal }}>
      {children}

      {/* Modal */}
      {modal.show && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button
              className="modal-x-btn"
              onClick={closeModal}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="modal-title">{modal.title || "Error"}</h2>
            <p className="modal-message">{modal.message}</p>
            <button
              className="modal-close-btn"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}

// Custom hook to use modal
export const useModal = () => useContext(ModalContext);
