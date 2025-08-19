export default function MemberTable({ members, onEdit, onRemove, onSearch }) {
  return (
    <div className="card">
      <div className="flex gap-2 flex-wrap items-center mb-3">
        <input
          className="input"
          placeholder="সার্চ (নাম/মোবাইল/ইমেইল)"
          onChange={(e) => onSearch(e.target.value)}
        />
        <div className="flex-1" />
        <button className="btn" onClick={() => onEdit(null)}>+ নতুন সদস্য</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-slate-400 text-sm">
              <th className="px-3 py-2">#</th>
              <th className="px-3 py-2">নাম</th>
              <th className="px-3 py-2">মোবাইল</th>
              <th className="px-3 py-2">ইমেইল</th>
              <th className="px-3 py-2">কর্মস্থল</th>
              <th className="px-3 py-2">নমিনি</th>
              <th className="px-3 py-2">ব্যাংক</th>
              <th className="px-3 py-2">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m, idx) => (
              <tr key={m.id} className="bg-slate-950 border border-slate-800">
                <td className="px-3 py-2 rounded-l-xl">{idx + 1}</td>
                <td className="px-3 py-2">{m.name}</td>
                <td className="px-3 py-2">{m.mobile || "—"}</td>
                <td className="px-3 py-2">{m.email || "—"}</td>
                <td className="px-3 py-2">{m.work || "—"}</td>
                <td className="px-3 py-2">{m.nominee || "—"}</td>
                <td className="px-3 py-2">{m.bank || "—"}</td>
                <td className="px-3 py-2 rounded-r-xl">
                  <div className="flex gap-2">
                    <button className="btn" onClick={() => onEdit(m)}>Edit</button>
                    <button className="btn btn-ghost" onClick={() => onRemove(m)}>Remove</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
