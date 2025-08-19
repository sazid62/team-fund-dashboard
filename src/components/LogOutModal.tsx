// components/LogoutModal.jsx
import React from "react";

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-900 rounded-2xl shadow-2xl w-full max-w-sm p-6 relative">
        {/* Decorative Glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-indigo-400 to-purple-500 opacity-30 blur-3xl rounded-full" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-gradient-to-tr from-pink-400 to-purple-500 opacity-30 blur-3xl rounded-full" />

        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-xl font-bold text-white text-center mb-2">
            Confirm Logout
          </h2>
          <p className="text-sm text-gray-400 text-center mb-6">
            Are you sure you want to log out of your account?
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-800 text-gray-300 hover:bg-slate-700 transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md hover:shadow-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
