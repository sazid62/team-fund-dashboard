import React from "react";
import ContribTable from "../components/ContribTable.jsx";
import { MONTHS } from "../utils/demoData.js";

export default function Contributions({ state, setState, monthKey, setMonthKey }) {
  function togglePaid(id) {
    setState((prev) => {
      const copy = structuredClone(prev);
      copy.contrib[monthKey] = copy.contrib[monthKey] || {};
      copy.contrib[monthKey][id] = !copy.contrib[monthKey][id];
      return copy;
    });
  }

  return (
    <div className="space-y-4">
      <ContribTable
        monthKey={monthKey}
        setMonthKey={setMonthKey}
        state={state}
        togglePaid={togglePaid}
      />
    </div>
  );
}
