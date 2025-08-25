import React, { useState } from "react";
import { allUserDetailsJson } from "../utils/allUserDetailsJson.tsx";

export default function Members() {
  const [selected, setSelected] = useState(null);

  // Random placeholder image
  const getRandomImage = () =>
    `https://i.pravatar.cc/150?u=${Math.floor(Math.random() * 1000)}`;

  return (
    <div>
      {/* Card List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allUserDetailsJson.map((m, idx) => (
          <div
            key={idx}
            className="bg-slate-900 border border-slate-800 rounded-xl p-4 cursor-pointer hover:bg-slate-800 transition flex flex-col items-center"
            onClick={() => setSelected(m)}
          >
            {/* Circular Picture */}
            <img
              src={m.profile_image || getRandomImage()}
              alt={m.name}
              className="w-20 h-20 rounded-full mb-3 object-cover border-2 border-indigo-500"
            />
            <h2 className="text-lg font-bold">{m.name}</h2>
            <p className="text-slate-400">{m.mobile || "—"}</p>
            <p className="text-slate-500 text-sm">{m.workplace || "—"}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-950 rounded-xl shadow-lg w-full max-w-md p-6 relative">
            <button
              className="absolute top-3 right-3 text-slate-400 hover:text-white"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>

            {/* Circular picture in modal */}
            <div className="flex justify-center mb-4">
              <img
                src={ selected.profile_image || getRandomImage() }
                alt={selected.name}
                className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500"
              />
            </div>

            <h2 className="text-xl font-bold mb-2 text-center">{selected.name}</h2>
            <ul className="space-y-1 text-slate-300 text-sm">
              <li>
                <strong>বাবা:</strong> {selected.father || "—"}
              </li>
              <li>
                <strong>মা:</strong> {selected.mother || "—"}
              </li>
              <li>
                <strong>গ্রাম:</strong> {selected.village || "—"}
              </li>
              <li>
                <strong>জন্ম তারিখ:</strong> {selected.dob || "—"}
              </li>
              <li>
                <strong>মোবাইল:</strong> {selected.mobile || "—"}
              </li>
              <li>
                <strong>ব্যাংক:</strong> {selected.bank_account || "—"}
              </li>
              <li>
                <strong>NID:</strong> {selected.nid || "—"}
              </li>
              <li>
                <strong>কর্মস্থল:</strong> {selected.workplace || "—"}
              </li>
              <li>
                <strong>নমিনি:</strong> {selected.nominee || "—"}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
