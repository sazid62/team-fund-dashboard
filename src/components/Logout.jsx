import React, { useState } from "react";
import LogoutModal from "./LogOutModal";

export default function Logout({ onLogout }) {
  const [showModal, setShowModal] = useState(false);

  const handleConfirm = () => {
    localStorage.removeItem("user");

    if (onLogout) onLogout(); // notify parent
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-lg text-xs shadow-md hover:shadow-lg transition"
      >
        Logout
      </button>

      <LogoutModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
}
