import { useState, useEffect, useRef } from "react";
import Header from "./Header";
import { allUserDetailsJson } from "../utils/allUserDetailsJson";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Get profile image with fallback
  const getProfileImage = (profileImagePath) => {
    if (!profileImagePath) return "/default.jpeg";
    // For now, return a placeholder since we don't have the actual images
    return "/default.jpeg";
  };
  
  const handleUserSelect = (user) => {
    setUsername(user.username);
    setShowDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      await onLogin({ username, password });
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="m-5">
      <Header />

      <div
        className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Login Card */}
        <div className="relative w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl p-10 overflow-hidden">
          {/* Decorative Gradient Glows */}
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br from-indigo-400 to-purple-500 opacity-20 blur-3xl rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-gradient-to-tr from-pink-400 to-purple-500 opacity-20 blur-3xl rounded-full" />

          {/* Content */}
          <div className="relative z-10 text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-300 mt-2 text-sm">
              Sign in to access your dashboard
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
            {/* Error Message */}
            {error && (
              <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3 text-center">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}
            
            {/* Username Selection */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                ব্যবহারকারী নির্বাচন করুন 
              </label>
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setShowDropdown(!showDropdown)}
                  disabled={isLoading}
                  className="w-full bg-slate-800 border border-gray-700 rounded-lg py-3 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    {username ? (
                      <>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                          {allUserDetailsJson.find(u => u.username === username)?.name?.charAt(0) || username.charAt(0)}
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-medium">{allUserDetailsJson.find(u => u.username === username)?.name}</div>
                          <div className="text-xs text-gray-400">@{username}</div>
                        </div>
                      </>
                    ) : (
                      <span className="text-gray-500">ব্যবহারকারী নির্বাচন করুন  </span>
                    )}
                  </div>
                  <svg className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown */}
                {showDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-slate-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                    {allUserDetailsJson.map((user) => (
                      <button
                        key={user.username}
                        type="button"
                        onClick={() => handleUserSelect(user)}
                        className="w-full px-4 py-3 text-left hover:bg-slate-700 transition-colors flex items-center gap-3 border-b border-gray-700 last:border-b-0"
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {user.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-200 truncate">{user.name}</div>
                          <div className="text-xs text-gray-400">@{user.username}</div>
             
                        </div>
                        {user.sl === 21 && (
                          <span className="text-xs bg-indigo-600 text-white px-2 py-1 rounded-full">Admin</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                পাসওয়ার্ড  
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800 border border-gray-700 rounded-lg py-3 px-4 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                placeholder="পাসওয়ার্ড লিখুন / Enter password"
                required
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500 mt-1">

              </p>
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  লগইন হচ্ছে... / Signing in...
                </div>
              ) : (
                "লগইন / Sign In"
              )}
            </button>
          </form>

          {/* Security Note */}
          <p className="text-center text-xs text-gray-400">
              Your login is secure & private
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
