import { MONTHS } from "../utils/demoData";
import React from "react";

export default function ContribTable({
  monthKey,
  setMonthKey,
  state,
  togglePaid,
}) {
  const [filter, setFilter] = React.useState("all");
  const [q, setQ] = React.useState("");

  const map = state.contrib[monthKey] || {};

  const filtered = state.members.filter((m) => {
    const paid = !!map[m.id];
    if (filter === "paid" && !paid) return false;
    if (filter === "pending" && paid) return false;
    if (q && !m.name.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="card">
      <div className="flex gap-2 flex-wrap items-center mb-3">
        <div className="px-3 py-2 rounded-full bg-slate-950 border border-slate-800 text-slate-300 text-sm flex items-center gap-2">
          <span>মাস:</span>
          <select
            className="input"
            value={monthKey}
            onChange={(e) => setMonthKey(e.target.value)}
          >
            {MONTHS.map((m) => (
              <option key={m.key} value={m.key}>
                {m.label}
              </option>
            ))}
          </select>
        </div>
        <div className="px-3 py-2 rounded-full bg-slate-950 border border-slate-800 text-slate-300 text-sm flex items-center gap-2">
          <span>স্ট্যাটাস:</span>
          <select
            className="input"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">সব</option>
            <option value="paid">পেইড</option>
            <option value="pending">পেন্ডিং</option>
          </select>
        </div>
        <input
          className="input"
          placeholder="সদস্য সার্চ"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-slate-400 text-sm">
              <th className="px-3 py-2">#</th>
              <th className="px-3 py-2">সদস্য</th>
              <th className="px-3 py-2">স্ট্যাটাস</th>
              <th className="px-3 py-2">পেমেন্ট</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m, idx) => {
              const paid = !!map[m.id];
              return (
                <tr key={m.id} className="bg-slate-950 border border-slate-800">
                  <td className="px-3 py-2 rounded-l-xl">{idx + 1}</td>
                  <td className="px-3 py-2">{m.name}</td>
                  <td className="px-3 py-2">
                    <span className={`status ${paid ? "status-paid" : "status-pending"}`}>
                      {paid ? "পেইড" : "পেন্ডিং"}
                    </span>
                  </td>
                  <td className="px-3 py-2 rounded-r-xl">
                    <button
                      className={`btn ${paid ? "btn-ghost" : ""}`}
                      onClick={() => togglePaid(m.id)}
                    >
                      {paid ? "Mark Pending" : "Mark Paid"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
