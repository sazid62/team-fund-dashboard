import React, { useState, useEffect } from "react";
import ContributionForm from "./ContributionForm";
import ContributionTable from "./ContributionTable";

const LS_KEY = "contribRecords.v2";

export default function ContributionPage() {
  const [role, setRole] = useState("member");
  const [records, setRecords] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
    setRecords(saved);
  }, []);

  // Save to localStorage whenever records change
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(records));
  }, [records]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        <h1 className="text-xl font-bold">অবদান / Contributions</h1>
        <div className="flex gap-4 items-center bg-slate-800 border border-slate-600 px-4 py-2 rounded-full text-sm">
          <span className="font-medium">Role:</span>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="role"
              value="member"
              checked={role === "member"}
              onChange={(e) => setRole(e.target.value)}
            />
            সদস্য
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="role"
              value="admin"
              checked={role === "admin"}
              onChange={(e) => setRole(e.target.value)}
            />
            অ্যাডমিন
          </label>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {role === "admin" && (
          <ContributionForm records={records} setRecords={setRecords} />
        )}

        <ContributionTable
          records={records}
          setRecords={setRecords}
          role={role}
        />
      </div>
    </div>
  );
}
