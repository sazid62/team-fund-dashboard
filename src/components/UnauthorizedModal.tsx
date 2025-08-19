import { useEffect } from "react";
import { XCircle } from "lucide-react";

const UnauthorizedModal = ({ message, onClose }) => {
  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="relative w-full max-w-sm bg-slate-900 rounded-2xl shadow-2xl p-6 overflow-hidden">
        {/* Gradient Glow Decorations */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-indigo-400 to-purple-500 opacity-30 blur-3xl rounded-full" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-gradient-to-tr from-pink-400 to-purple-500 opacity-30 blur-3xl rounded-full" />

        {/* Content */}
        <div className="relative z-10 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <XCircle className="w-14 h-14 text-red-500" />
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>

          {/* Message */}
          <p className="text-gray-300 text-sm mb-6">{message}</p>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="px-4 py-2 w-full rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-md hover:shadow-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedModal;
