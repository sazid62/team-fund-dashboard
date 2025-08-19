import { useEffect, useRef } from "react";

export default function EditMemberModal({ open, onClose, onSave, member }) {
  const formRef = useRef(null);

  useEffect(() => {
    if (open && formRef.current) {
      const f = formRef.current;
      f.name.value = member?.name || "";
      f.mobile.value = member?.mobile || "";
      f.email.value = member?.email || "";
      f.work.value = member?.work || "";
      f.nominee.value = member?.nominee || "";
      f.bank.value = member?.bank || "";
      f.nid.value = member?.nid || "";
      f.address.value = member?.address || "";
    }
  }, [open, member]);

  function handleSubmit(e) {
    e.preventDefault();
    const f = e.target;
    onSave({
      ...member,
      name: f.name.value.trim(),
      mobile: f.mobile.value.trim(),
      email: f.email.value.trim(),
      work: f.work.value.trim(),
      nominee: f.nominee.value.trim(),
      bank: f.bank.value.trim(),
      nid: f.nid.value.trim(),
      address: f.address.value.trim(),
    });
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="w-[min(720px,92vw)] rounded-2xl bg-slate-950 border border-slate-800">
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <strong>সদস্য তথ্য সম্পাদনা</strong>
          <button className="btn" onClick={onClose}>✕</button>
        </div>
        <div className="p-4">
          <form ref={formRef} onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-3">
            <label className="space-y-1">
              <span className="text-sm text-slate-300">নাম</span>
              <input className="input" name="name" required />
            </label>
            <label className="space-y-1">
              <span className="text-sm text-slate-300">মোবাইল</span>
              <input className="input" name="mobile" />
            </label>
            <label className="space-y-1">
              <span className="text-sm text-slate-300">ইমেইল</span>
              <input className="input" name="email" />
            </label>
            <label className="space-y-1">
              <span className="text-sm text-slate-300">কর্মস্থল</span>
              <input className="input" name="work" />
            </label>
            <label className="space-y-1">
              <span className="text-sm text-slate-300">নমিনি</span>
              <input className="input" name="nominee" />
            </label>
            <label className="space-y-1">
              <span className="text-sm text-slate-300">ব্যাংক একাউন্ট</span>
              <input className="input" name="bank" />
            </label>
            <label className="space-y-1">
              <span className="text-sm text-slate-300">NID</span>
              <input className="input" name="nid" />
            </label>
            <label className="space-y-1">
              <span className="text-sm text-slate-300">ঠিকানা</span>
              <input className="input" name="address" />
            </label>
            <div className="md:col-span-2 flex gap-2 justify-end">
              <button type="button" className="btn" onClick={onClose}>
                Cancel
              </button>
              <button className="btn btn-primary" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
