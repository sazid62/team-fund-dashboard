import React, { useMemo, useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Members from "./pages/Members.jsx";
import Contributions from "./pages/Contributions.jsx";
import RulesPage from "./pages/RulesPage.jsx";
import { loadState, saveState, STORAGE_KEY } from "./utils/storage.js";
import { MONTHS } from "./utils/demoData.js";

export default function App() {
  const [active, setActive] = useState("home");
  const [state, setState] = useState(() => loadState());
  const [monthKey, setMonthKey] = useState(MONTHS[Math.min(8, MONTHS.length-1)].key);

  // persist
  useEffect(() => {
    saveState(state);
  }, [state]);

  // Derived helpers
  const memberCount = state.members.length;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-4">
      <Header active={active} onTab={setActive} />

      {active === "home" && (
        <Home
          state={state}
          setState={setState}
          monthKey={monthKey}
          setMonthKey={setMonthKey}
        />
      )}
      {active === "members" && (
        <Members state={state} setState={setState} />
      )}
      {active === "contrib" && (
        <Contributions
          state={state}
          setState={setState}
          monthKey={monthKey}
          setMonthKey={setMonthKey}
        />
      )}
      {active === "rules" && <RulesPage state={state} setState={setState} />}

      <footer className="text-center text-xs text-slate-500 pt-2">
        Static demo • No backend • Data saved locally in your browser
      </footer>
    </div>
  );
}
