import React, { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Members from "./pages/Members.jsx";
import Contributions from "./pages/Contributions.jsx";
import RulesPage from "./pages/RulesPage.jsx";
import { loadState, saveState } from "./utils/storage.js";
import { MONTHS } from "./utils/demoData.js";
import { jwtDecode } from "jwt-decode";
import Login from "./components/Login.jsx";
import UnauthorizedModal from "./components/UnauthorizedModal.tsx";
import ContributionPage from "./components/ContributionPage.jsx";

export default function App() {
  const allowedUsers = ["sajidurrahman3s2@gmail.com"];
  const [active, setActive] = useState("home");
  const [state, setState] = useState(() => loadState());
  const [monthKey, setMonthKey] = useState(
    MONTHS[Math.min(8, MONTHS.length - 1)].key
  );
  const [isLoading, setIsLoading] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    saveState(state);
  }, [state]);

  const handleLogin = async (credentialResponse) => {
    setIsLoading(true);

    try {
      const userInfo = jwtDecode(credentialResponse.credential);

      if (!allowedUsers.includes(userInfo.email)) {
        setUnauthorized(true);
        setIsLoading(false);
        return;
      }

      setUser(userInfo);
      localStorage.setItem("user", JSON.stringify(userInfo));
      localStorage.setItem("googleToken", credentialResponse.credential);

      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
      setIsLoading(false);
    }
  };

const handleLogout = () => {
  setUser(null);
  setActive("home");
};

  // Show loading state
  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div className="text-white text-center">
          <div className="animate-spin w-12 h-12 border-4 border-white/30 border-t-white rounded-full mx-auto mb-4"></div>
          <p className="text-lg font-medium">
            Welcome! Setting up your dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Always render inside return
  return (
    <>
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="max-w-6xl mx-auto p-6 space-y-4">
          <Header active={active} onTab={setActive} user={user} onLogout={handleLogout} />

          {active === "home" && (
            <Home state={state} setState={setState} monthKey={monthKey} setMonthKey={setMonthKey} />
          )}
          {active === "members" && <Members state={state} setState={setState} />}
          {active === "contrib" && (
           <ContributionPage/>
          )}
          {active === "rules" && <RulesPage state={state} setState={setState} />}

          <footer className="text-center text-xs text-slate-500 pt-2">
            Static demo • No backend • Data saved locally in your browser
          </footer>
        </div>
      )}

      {unauthorized && (
        <UnauthorizedModal
          message="You are not authorized to use this app."
          onClose={() => setUnauthorized(false)}
        />
      )}
    </>
  );
}
