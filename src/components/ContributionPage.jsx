import React, { useState, useEffect } from "react";
import ContributionForm from "./ContributionForm";
import ContributionTable from "./ContributionTable";
import { allUserDetailsJson } from "../utils/allUserDetailsJson";


export default function ContributionPage({setContributionsJsonState,  contributionsJson, isAdminLoggedIn }) {
  const [role, setRole] = useState("member");
  const [records, setRecords] = useState([]);
  const [selectedSender, setSelectedSender] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  // Get unique sender names from contributionsJson
  const uniqueSenders = [...new Set(contributionsJson.map(record => record.sender))];
  
  // Generate months for the dropdown (last 12 months)
const getAvailableMonths = () => {
  const months = [];
  const startDate = new Date(2025, 8, 25); // September 25, 2025 (month index 8 = September)
  const endDate = new Date(2027, 8, 27);   // September 27, 2027

  let currentDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);

  while (currentDate <= endDate) {
    const monthYear = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
    months.push({
      value: monthYear,
      label: currentDate.toLocaleDateString("bn-BD", {
        month: "long",
        year: "numeric",
      }),
    });

    // move to next month
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return months;
};


  // Filter contributions based on selected filters
  const filteredContributions = contributionsJson.filter(record => {
    const senderMatch = selectedSender === "" || record.sender === selectedSender;
    const monthMatch = selectedMonth === "" || record.date.startsWith(selectedMonth);
    return senderMatch && monthMatch;
  });

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        <h1 className="text-xl font-bold">অবদান</h1>
     {isAdminLoggedIn &&    <div className="flex gap-4 items-center bg-slate-800 border border-slate-600 px-4 py-2 rounded-full text-sm">
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
        </div>}
      </header>

      {/* Search Filters - Only show for member role */}
      {role === "member" && (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 mb-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Sender Name Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                প্রেরকের নাম
              </label>
              <select
                value={selectedSender}
                onChange={(e) => setSelectedSender(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">সব প্রেরক  </option>
                {uniqueSenders.map(sender => (
                  <option key={sender} value={sender}>{sender}</option>
                ))}
              </select>
            </div>
            
            {/* Month Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                মাস  
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">সব মাস  </option>
                {getAvailableMonths().map(month => (
                  <option key={month.value} value={month.value}>{month.label}</option>
                ))}
              </select>
            </div>
            
            {/* Clear Filters Button */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSelectedSender("");
                  setSelectedMonth("");
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
              >
                ক্লিয়ার  
              </button>
            </div>
          </div>
          
          {/* Results Count */}
          <div className="mt-3 text-sm text-gray-400">
            মোট {filteredContributions.length} টি রেকর্ড পাওয়া গেছে  
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {role === "admin"  && (
          <ContributionForm   setContributionsJsonState = {setContributionsJsonState}  contributionsJson={contributionsJson} />
        )}
{role === "member"  && 
        <ContributionTable
       records={filteredContributions}
          
        />
     }
    </div>
  </div>
  );
}