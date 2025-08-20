import React, { useState } from "react";

export default function ContributionForm({ records, setRecords }) {
  const [form, setForm] = useState({
    recipient: "",
    sender: "Rahim",
    amount: "",
    method: "bKash",
    fromNo: "",
    toNo: "",
    txnId: "",
    date: "",
    proofLink: "",
    note: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRecords([...records, form]);
    setForm({
      recipient: "",
      sender: "Rahim",
      amount: "",
      method: "bKash",
      fromNo: "",
      toNo: "",
      txnId: "",
      date: "",
      proofLink: "",
      note: "",
    });
  };

  return (
    <section className="bg-slate-900 border border-slate-700 rounded-xl shadow-lg p-4">
      <h2 className="text-lg font-semibold mb-4">অবদান যোগ করুন (Admin)</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div>
          <label className="text-sm">প্রাপক (Recipient)*</label>
          <input
            required
            id="recipient"
            type="text"
            value={form.recipient}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700"
          />
        </div>

        <div>
          <label className="text-sm">প্রেরক (Sender)*</label>
          <select
            id="sender"
            value={form.sender}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700"
          >
            <option>Rahim</option>
            <option>Karim</option>
            <option>Sohel</option>
            <option>Mamun</option>
            <option>Nasir</option>
          </select>
        </div>

        <div>
          <label className="text-sm">পরিমাণ (Amount)*</label>
          <input
            required
            id="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700"
          />
        </div>

        <div>
          <label className="text-sm">কিভাবে (Method)*</label>
          <select
            id="method"
            value={form.method}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700"
          >
            <option>bKash</option>
            <option>Nagad</option>
            <option>Bank</option>
            <option>Cash</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="text-sm">প্রেরকের নম্বর (From)</label>
          <input
            id="fromNo"
            value={form.fromNo}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700"
          />
        </div>

        <div>
          <label className="text-sm">গ্রাহকের নম্বর (To)</label>
          <input
            id="toNo"
            value={form.toNo}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700"
          />
        </div>

        <div>
          <label className="text-sm">লেনদেন আইডি (Txn ID)</label>
          <input
            id="txnId"
            value={form.txnId}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700"
          />
        </div>

        <div>
          <label className="text-sm">তারিখ (Date)*</label>
          <input
            required
            id="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700"
          />
        </div>

        <div>
          <label className="text-sm">প্রমাণ লিংক (Proof Link)</label>
          <input
            id="proofLink"
            value={form.proofLink}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700"
          />
        </div>

        <div className="md:col-span-3">
          <label className="text-sm">নোট/বিবরণ (Note)</label>
          <input
            id="note"
            value={form.note}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700"
          />
        </div>

        <div className="flex gap-2 justify-end md:col-span-3">
          <button
            type="submit"
            className="bg-indigo-600 px-4 py-2 rounded-lg font-semibold text-white"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() =>
              setForm({
                recipient: "",
                sender: "Rahim",
                amount: "",
                method: "bKash",
                fromNo: "",
                toNo: "",
                txnId: "",
                date: "",
                proofLink: "",
                note: "",
              })
            }
            className="border border-slate-600 px-4 py-2 rounded-lg"
          >
            Reset
          </button>
        </div>
      </form>
    </section>
  );
}
