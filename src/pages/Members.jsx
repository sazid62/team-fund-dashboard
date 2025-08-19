import React from "react";
import MemberTable from "../components/MemberTable.jsx";
import EditMemberModal from "../components/EditMemberModal.jsx";
import { addMember, removeMember, updateMember } from "../utils/storage.js";

export default function Members({ state, setState }) {
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState(null);
  const [q, setQ] = React.useState("");

  const members = React.useMemo(() => {
    if (!q) return state.members;
    const lc = q.toLowerCase();
    return state.members.filter((m) =>
      `${m.name} ${m.mobile} ${m.email}`.toLowerCase().includes(lc)
    );
  }, [q, state.members]);

  function handleEdit(m) {
    setEditing(m);
    setOpen(true);
  }

  function handleSave(m) {
    setState((prev) => updateMember(prev, m));
    setOpen(false);
    setEditing(null);
  }

  function handleRemove(m) {
    if (state.members.length <= 1) {
      alert("কমপক্ষে ১ জন সদস্য থাকা আবশ্যক");
      return;
    }
    if (confirm("সদস্যটি সরাতে চান?")) {
      setState((prev) => removeMember(prev, m.id));
    }
  }

  return (
    <div className="space-y-4">
      <MemberTable
        members={members}
        onEdit={(m) => (m ? handleEdit(m) : handleEdit({}))}
        onRemove={handleRemove}
        onSearch={setQ}
      />
      <EditMemberModal
        open={open}
        onClose={() => setOpen(false)}
        onSave={(m) => handleSave(m.id ? m : addMember(state, m))}
        member={editing}
      />
    </div>
  );
}
