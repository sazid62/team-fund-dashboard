import React, { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import { Spin } from "antd";
import Members from "./pages/Members.jsx";
import { loadState, saveState } from "./utils/storage.js";
import { MONTHS } from "./utils/demoData.js";
import Login from "./components/Login.jsx";
import UnauthorizedModal from "./components/UnauthorizedModal.tsx";
import ContributionPage from "./components/ContributionPage.jsx";
import { allUserDetailsJson } from "./utils/allUserDetailsJson";

export default function App() {
  const [dataLoading, setDataLoading] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [contributionsJsonState, setContributionsJsonState] = useState([]);

  // Create user authentication mapping from allUserDetailsJson
  const createUserAuth = () => {
    const userAuth = {};
    const adminIds = [9]; // Add admin user sl numbers here
    allUserDetailsJson.forEach((user) => {
      // Use username field for authentication
      userAuth[user.username] = {
        isAdmin: adminIds.includes(user.sl) ? true : false, // Make Sajid (sl: 21) admin, you can change this logic
        password: adminIds.includes(user.sl) ? "admin1312" : "mem1234", // Default passwords, change as needed

        userInfo: user,
      };
    });
    return userAuth;
  };

  const userAuthMap = createUserAuth();
  const adminUsers = Object.keys(userAuthMap).filter(
    (name) => userAuthMap[name].isAdmin
  );
  const [isAdminLoggedIn, setisAdminLoggedIn] = useState(false);
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

  const handleLogin = async (credentials) => {
    setIsLoading(true);
    try {
      const { username, password } = credentials;

      // Check if user exists and password is correct
      if (!userAuthMap[username]) {
        throw new Error("ব্যবহারকারী পাওয়া যায়নি ");
      }

      if (userAuthMap[username].password !== password) {
        throw new Error("ভুল পাসওয়ার্ড ");
      }

      const userInfo = {
        name: username,
        ...userAuthMap[username].userInfo,
        isAdmin: userAuthMap[username].isAdmin,
      };

      // Check if user is admin
      if (userAuthMap[username].isAdmin) {
        setisAdminLoggedIn(true);
      }

      setUser(userInfo);
      localStorage.setItem("user", JSON.stringify(userInfo));

      setTimeout(() => setIsLoading(false), 500);
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
      throw error; // Re-throw to be caught by Login component
    }
  };

  const handleLogout = () => {
    setUser(null);
    setisAdminLoggedIn(false);
    setActive("home");
    localStorage.removeItem("user");
  };

  const fetchContributions = async () => {
    setDataLoading(true);
    try {
      const res = await fetch(
        "https://sopnochari-backend-wufa.vercel.app/api/contributions.js"
      );
      if (!res.ok) throw new Error("Failed to fetch contributions");
      const data = await res.json();
      setContributionsJsonState(data);
    } catch (error) {
      console.error(error);
    } finally {
      setDataLoading(false);
    }
  };

  console.log("User:", contributionsJsonState);
  // Fetch contributions on mount
  useEffect(() => {
    fetchContributions();
  }, []);

  // Update admin status if user changes
  useEffect(() => {
    if (!user) {
      setisAdminLoggedIn(false);
      return;
    }

    if (user.isAdmin) {
      setisAdminLoggedIn(true);
    } else {
      setisAdminLoggedIn(false);
    }
  }, [user]);

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

  if (apiLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-500 text-lg">Loading contributions...</div>
      </div>
    );
  }
  console.log("Admin logged in:", isAdminLoggedIn);
  return (
    <>
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="max-w-6xl mx-auto p-6 space-y-4">
          <Header
            active={active}
            onTab={setActive}
            user={user}
            onLogout={handleLogout}
          />

          {dataLoading ? (
            <div className="min-h-[300px] flex items-center justify-center">
              <Spin size="large" tip="Loading data..." />
            </div>
          ) : (
            <>
              {active === "home" && (
                <Home contributionsJson={contributionsJsonState} />
              )}
              {active === "members" && (
                <Members state={state} setState={setState} />
              )}
              {active === "contrib" && (
                <ContributionPage
                  contributionsJson={contributionsJsonState}
                  isAdminLoggedIn={isAdminLoggedIn}
                  setContributionsJsonState={setContributionsJsonState}
                />
              )}
            </>
          )}

          <footer className="text-center text-xs text-slate-500 pt-2"></footer>
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
