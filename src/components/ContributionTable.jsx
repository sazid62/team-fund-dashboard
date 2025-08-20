import React from "react";

export default function ContributionTable({ records, setRecords, role }) {
  const handleDelete = (idx) => {
    const newRecs = records.filter((_, i) => i !== idx);
    setRecords(newRecs);
  };

  return (
    <section className="bg-slate-900 border border-slate-700 rounded-xl shadow-lg p-4 overflow-auto">
      <table className="w-full text-sm">
        <thead className="text-slate-400 uppercase text-xs">
          <tr>
            <th className="p-2">SL</th>
            <th className="p-2">তারিখ</th>
            <th className="p-2">প্রাপক</th>
            <th className="p-2">Sender</th>
            <th className="p-2">পরিমাণ</th>
            <th className="p-2">Method</th>
            <th className="p-2">From</th>
            <th className="p-2">To</th>
            <th className="p-2">Txn ID</th>
            <th className="p-2">Proof</th>
            <th className="p-2">Note</th>
            {role === "admin" && <th className="p-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {records.map((r, idx) => (
            <tr key={idx} className="hover:bg-slate-800">
              <td className="p-2">{idx + 1}</td>
              <td className="p-2">{r.date}</td>
              <td className="p-2">{r.recipient}</td>
              <td className="p-2">{r.sender}</td>
              <td className="p-2">{r.amount}</td>
              <td className="p-2">{r.method}</td>
              <td className="p-2">{r.fromNo}</td>
              <td className="p-2">{r.toNo}</td>
              <td className="p-2">{r.txnId}</td>
              <td className="p-2">
                {r.proofLink && (
                  <a
                    href={r.proofLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-400 underline"
                  >
                    Link
                  </a>
                )}
              </td>
              <td className="p-2">{r.note}</td>
              {role === "admin" && (
                <td className="p-2">
                  <button
                    onClick={() => handleDelete(idx)}
                    className="bg-red-600 px-2 py-1 rounded text-white text-xs"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
          {records.length === 0 && (
            <tr>
              <td
                colSpan={role === "admin" ? 12 : 11}
                className="text-center py-4 text-slate-400"
              >
                No contributions yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
