import Card from "../components/Card.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import { MONTHS, formatBDT } from "../utils/demoData.js";
import { exportSummaryCSV } from "../utils/csv.js";
import React from "react";

export default function Home({ state, setState, monthKey, setMonthKey }) {
  const target = 5000 * 21 * 24;

  const collected = React.useMemo(() => {
    let total = 0;
    Object.values(state.contrib).forEach((map) => {
      Object.values(map).forEach((paid) => {
        if (paid) total += 5000;
      });
    });
    return total;
  }, [state.contrib]);

  const pct = Math.min(100, Math.round((collected / target) * 100));

  const map = state.contrib[monthKey] || {};
  const paidCount = state.members.filter((m) => map[m.id]).length;

  function togglePaid(id) {
    setState((prev) => {
      const copy = structuredClone(prev);
      copy.contrib[monthKey] = copy.contrib[monthKey] || {};
      copy.contrib[monthKey][id] = !copy.contrib[monthKey][id];
      return copy;
    });
  }

  function exportCSV() {
    exportSummaryCSV(state, monthKey);
  }

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        <Card title="মোট লক্ষ্য (২৪ মাস)">
          <div className="text-3xl font-extrabold">{formatBDT(target)}</div>
          <div className="text-slate-500 text-sm">৫,০০০ × ২১ × ২৪</div>
        </Card>
        <Card title="এ পর্যন্ত সংগ্রহ">
          <div className="text-3xl font-extrabold">{formatBDT(collected)}</div>
          <ProgressBar value={pct} />
          <div className="text-slate-500 text-sm mt-1">{pct}% সম্পন্ন</div>
        </Card>
        <Card title="চলতি মাসের অবস্থা">
          <div className="text-3xl font-extrabold">
            {paidCount}/{state.members.length} জন পেইড
          </div>
          <div className="text-slate-500 text-sm">
            অপরিশোধিত: {state.members.length - paidCount} জন
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex flex-wrap gap-2 items-center mb-3">
          <div className="px-3 py-2 rounded-full bg-slate-950 border border-slate-800 text-slate-300 text-sm flex items-center gap-2">
            <span>মাস নির্বাচন:</span>
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
          <button className="btn btn-ghost" onClick={exportCSV}>
            Export Summary CSV
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-slate-400 text-sm font-semibold mb-2">মাসিক স্ট্যাটাস</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-separate border-spacing-y-2">
                <thead>
                  <tr className="text-left text-slate-400 text-sm">
                    <th className="px-3 py-2">সদস্য</th>
                    <th className="px-3 py-2">স্ট্যাটাস</th>
                    <th className="px-3 py-2">পেমেন্ট</th>
                  </tr>
                </thead>
                <tbody>
                  {state.members.map((m) => {
                    const paid = !!map[m.id];
                    return (
                      <tr key={m.id} className="bg-slate-950 border border-slate-800">
                        <td className="px-3 py-2 rounded-l-xl">{m.name}</td>
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
          <div>
            <h3 className="text-slate-400 text-sm font-semibold mb-2">দ্রুত তথ্য</h3>
            <ul className="leading-7 text-slate-300">
              <li>
                পেমেন্ট ডেডলাইন: প্রতি মাসের <b>১০</b> তারিখ
              </li>
              <li>
                সদস্যদের পেমেন্ট: <b>৫,০০০</b> টাকা
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
