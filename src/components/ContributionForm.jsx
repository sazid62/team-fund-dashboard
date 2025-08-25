import React, { useState } from "react";
import { allUserDetailsJson } from "../utils/allUserDetailsJson.tsx";
import { Spin } from "antd";

const placeholderImage = "https://via.placeholder.com/150"; // temporary placeholder

export default function ContributionForm({
  setContributionsJsonState,
  contributionsJson,
}) {
  const [form, setForm] = useState({
    date: "",
    sender: "",
    recipient: "",
    amount: "",
    method: "",
    txn_id: "",
    note: "",
    sender_proof: "",
    recvr_proof: "",
  });

  const [fileSender, setFileSender] = useState(null);
  const [fileRecvr, setFileRecvr] = useState(null);
  const [previewSender, setPreviewSender] = useState(null);
  const [previewRecvr, setPreviewRecvr] = useState(null);

  const [modal, setModal] = useState({
    visible: false,
    status: "idle",
    message: "",
  });

  const [photoModal, setPhotoModal] = useState({ visible: false, image: null });

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === "sender") {
      setFileSender(file);
      setPreviewSender(URL.createObjectURL(file));
    } else {
      setFileRecvr(file);
      setPreviewRecvr(URL.createObjectURL(file));
    }
  };

  const uploadFile = async (file, who) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("filename", `${who}_${form.date}`);

    const res = await fetch(
      "https://sopnochari-backend-wufa.vercel.app/api/upload.js",
      { method: "POST", body: formData }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Upload failed: ${res.status} ${text}`);
    }

    return await res.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form:", form);

    if (
      !form.date ||
      !form.sender ||
      !form.recipient ||
      !form.amount ||
      !form.method ||
      !form.txn_id ||
      !form.note
    ) {
      return setModal({
        visible: true,
        status: "error",
        message: "সব ফিল্ড পূরণ করুন!",
      });
    }
    if (!fileSender || !fileRecvr) {
      return setModal({
        visible: true,
        status: "error",
        message: "উভয় প্রমাণপত্র আপলোড করতে হবে!",
      });
    }

    setModal({
      visible: true,
      status: "loading",
      message: "Submitting, please wait...",
    });

    try {
      const senderProof = (await uploadFile(fileSender, "sender")).link;
      const recvrProof = (await uploadFile(fileRecvr, "receiver")).link;

      const payload = {
        ...form,
        from: form.sender,
        to: form.recipient,
        sender_proof: senderProof,
        recvr_proof: recvrProof,
      };

      const res = await fetch(
        "https://sopnochari-backend-wufa.vercel.app/api/contributions.js",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Contribution submission failed!");

      setModal({
        visible: true,
        status: "success",
        message: "কনট্রিবিউশন সফলভাবে সাবমিট হয়েছে!",
      });
      setContributionsJsonState([...contributionsJson, payload]);
      // Reset form
      setForm({
        date: "",
        sender: "",
        recipient: "",
        amount: "",
        method: "",
        txn_id: "",
        note: "",
        sender_proof: "",
        recvr_proof: "",
      });
      setFileSender(null);
      setFileRecvr(null);
      setPreviewSender(null);
      setPreviewRecvr(null);
    } catch (err) {
      console.error(err);
      setModal({
        visible: true,
        status: "error",
        message: "⚠️ আপলোড বা সাবমিশন ব্যর্থ হয়েছে।",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-[#111827] p-6 rounded-2xl shadow-lg space-y-6 relative">
      <h2 className="text-xl font-bold text-slate-200"> নতুন কনট্রিবিউশন</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Sender & Recipient */}
        <div className="grid grid-cols-2 gap-4">
          {["sender", "recipient"].map((role) => (
            <div key={role}>
              <label className="text-slate-400 text-sm">
                {role === "sender" ? "প্রেরক" : "গ্রাহক"}
              </label>
              <select
                value={form[role]}
                onChange={(e) => setForm({ ...form, [role]: e.target.value })}
                className="w-full p-2 rounded-lg bg-slate-800 text-slate-200 border border-slate-700"
              >
                <option value="">-- সিলেক্ট করুন --</option>
                {allUserDetailsJson.map((user) => (
                  <option key={user.name} value={user.name}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Amount & Method */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-slate-400 text-sm">টাকার পরিমাণ</label>
            <input
              type="number"
              value={form.amount}
              onChange={(e) =>
                setForm({ ...form, amount: Number(e.target.value) })
              }
              className="w-full p-2 rounded-lg bg-slate-800 text-slate-200 border border-slate-700"
            />
          </div>
          <div>
            <label className="text-slate-400 text-sm">পেমেন্ট মেথড</label>
            <select
              value={form.method}
              onChange={(e) => setForm({ ...form, method: e.target.value })}
              className="w-full p-2 rounded-lg bg-slate-800 text-slate-200 border border-slate-700"
            >
              <option value="">-- সিলেক্ট করুন --</option>
              <option value="Cash">ক্যাশ</option>
              <option value="bKash">বিকাশ</option>
              <option value="Nagad">নগদ</option>
              <option value="Rocket">রকেট</option>
              <option value="Bank Transfer">ব্যাংক মাধ্যমে</option>
            </select>
          </div>
        </div>

        {/* Date & Txn ID */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-slate-400 text-sm">তারিখ</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full p-2 rounded-lg bg-slate-800 text-slate-200 border border-slate-700"
            />
          </div>
          <div>
            <label className="text-slate-400 text-sm">লেনদেন আইডি</label>
            <input
              type="text"
              value={form.txn_id}
              onChange={(e) => setForm({ ...form, txn_id: e.target.value })}
              className="w-full p-2 rounded-lg bg-slate-800 text-slate-200 border border-slate-700"
            />
          </div>
        </div>

        {/* Note */}
        <div>
          <label className="text-slate-400 text-sm">নোট</label>
          <textarea
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            className="w-full p-2 rounded-lg bg-slate-800 text-slate-200 border border-slate-700"
          />
        </div>

        {/* File Upload */}
        <div className="grid grid-cols-2 gap-4">
          {["sender", "receiver"].map((role) => (
            <div key={role}>
              <label className="text-slate-400 text-sm">
                {role === "sender" ? "Sender Proof" : "Receiver Proof"}
              </label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, role)}
                className="block w-full text-slate-300 file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0 file:text-sm file:font-semibold
                  file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
              />
              {role === "sender" && previewSender && (
                <img
                  src={previewSender}
                  alt="sender proof"
                  className="mt-2 w-32 rounded-lg shadow"
                />
              )}
              {role === "receiver" && previewRecvr && (
                <img
                  src={previewRecvr}
                  alt="receiver proof"
                  className="mt-2 w-32 rounded-lg shadow"
                />
              )}
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={modal.status === "loading"}
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
        >
          সাবমিট করুন
        </button>
      </form>

      {/* Photo confirmation modal */}
      {photoModal.visible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setPhotoModal({ visible: false, image: null })}
        >
          <img
            src={photoModal.image}
            className="max-h-[80vh] rounded-lg shadow"
          />
        </div>
      )}

      {/* Submission modal */}
      {modal.visible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 p-6 rounded-xl text-center space-y-4 max-w-sm w-full">
            {modal.status === "loading" && (
              <div className="flex flex-col items-center space-y-2">
                <Spin className="text-white" /> {/* Loader */}
                <div className="text-white font-semibold">
                  Submitting, please wait...
                </div>
              </div>
            )}

            {modal.status === "success" && (
              <div className="text-green-400 font-semibold">
                {modal.message}
              </div>
            )}

            {modal.status === "error" && (
              <div className="text-red-400 font-semibold">{modal.message}</div>
            )}

            {modal.status !== "loading" && (
              <button
                onClick={() => setModal({ ...modal, visible: false })}
                className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
