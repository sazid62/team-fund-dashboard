import React, { useState } from "react";
import { allUserDetailsJson } from "../utils/allUserDetailsJson";
import RobustImageThumbnails from "./RobustImageThumbnails.jsx";
import {  formatBDT ,formatBDDate} from "../utils/demoData.js";
export default function ContributionTable({ records }) {
  const [popupImage, setPopupImage] = useState(null);

  const getDriveImage = (url) => {
    if (!url) return "";
    try {
      let fileId = "";
      const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
      if (match) fileId = match[1];
      return fileId ? `https://drive.google.com/uc?export=view&id=${fileId}` : url;
    } catch {
      return url;
    }
  };

  const getProfileImage = (name) => {
    const user = allUserDetailsJson.find((u) => u.name === name);
    return user?.profile_image ? getDriveImage(user.profile_image) : "/default.jpeg";
  };

  const banglaMethod = (method) => {
    if (method === "Cash") return "নগদ";
    if (method === "Bank Transfer") return "ব্যাংক ট্রান্সফার";
    if (method === "Mobile Payment") return "মোবাইল পেমেন্ট";
    return method;
  };

  return (
    <div className="overflow-x-auto p-4 bg-gray-900 rounded-lg shadow-lg">
      <table className="w-full border-collapse text-sm text-left text-gray-200">
        <thead className="bg-gray-800 text-gray-100 uppercase text-xs">
          <tr>
            <th className="px-4 py-3 border border-gray-700 text-center">প্রেরক</th>
            <th className="px-4 py-3 border border-gray-700 text-center">প্রাপক</th>
            <th className="px-4 py-3 border border-gray-700 text-center">পরিমাণ</th>
            <th className="px-4 py-3 border border-gray-700 text-center">পদ্ধতি</th>
            <th className="px-4 py-3 border border-gray-700 text-center">লেনদেন আইডি</th>
            <th className="px-4 py-3 border border-gray-700 text-center">তারিখ</th>
            <th className="px-4 py-3 border border-gray-700 text-center">প্রমাণ</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, idx) => (
            <tr
              key={idx}
              className={`border-b border-gray-700 ${
                idx % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
              } hover:bg-gray-700 transition-colors`}
            >
              {/* Sender */}
              <td className="text-center px-4 py-2 flex items-center gap-2">
                <img
                  src={getProfileImage(r.sender)}
                  alt={r.sender}
                  className="w-8 h-8 rounded-full object-cover border border-gray-600 shadow-sm hover:shadow-lg cursor-pointer"
                  title={r.sender}
                />
                <span className="font-medium text-white">{r.sender}</span>
              </td>

              {/* Recipient */}
              <td className="text-center px-4 py-2 font-medium text-white">{r.recipient}</td>

              {/* Amount */}
              <td className="text-center px-4 py-2 font-semibold text-green-400">{formatBDT(r.amount)}</td>

              {/* Method */}
              <td className="text-center px-4 py-2 text-white">{banglaMethod(r.method)}</td>

              {/* Txn ID */}
              <td className="text-center px-4 py-2 text-gray-100">{r.txn_id}</td>

              {/* Date */}
              <td className="text-center px-4 py-2 text-gray-200">{formatBDDate( r.date)}</td>

              {/* Proof Images */}
              <td className="text-center px-4 py-2 flex gap-2">
                {r.sender_proof && <RobustImageThumbnails url={r.sender_proof} size={50} />}
                {r.recvr_proof && <RobustImageThumbnails url={r.recvr_proof} size={50} />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Image Popup */}
      {popupImage && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4">
          <img
            src={getDriveImage(popupImage)}
            alt="Proof Full"
            className="max-h-[95%] max-w-[95%] rounded-lg shadow-2xl"
          />
          <button
            className="absolute top-6 right-6 text-white text-3xl font-bold"
            onClick={() => setPopupImage(null)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
