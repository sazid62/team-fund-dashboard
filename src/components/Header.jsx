export default function Header({ active, onTab }) {
  const Tab = ({ id, children }) => (
    <button
      onClick={() => onTab(id)}
      className={`px-3 py-2 rounded-xl border text-sm ${
        active === id
          ? "bg-slate-900 text-white border-slate-800 shadow-inner"
          : "bg-slate-950 text-slate-300 border-slate-800"
      }`}
    >
      {children}
    </button>
  );

  return (
    <header className="flex items-center justify-between gap-3 mb-2">
      <div className="flex items-center gap-3">
        <div
          aria-hidden
          className="w-11 h-11 rounded-xl shadow-soft"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, #22c55e 0 40%, transparent 41%), radial-gradient(circle at 70% 70%, #60a5fa 0 40%, transparent 41%)",
            boxShadow: "0 0 0 2px #0b1220, 0 10px 30px rgba(0,0,0,.5)",
          }}
        />
        <div>
          <div className="font-extrabold tracking-wide">টিম ফান্ড ড্যাশবোর্ড</div>
          <small className="block text-slate-400 font-medium">
            ২১ জন × প্রতি মাসে ৫,০০০ টাকা × ২৪ মাস
          </small>
        </div>
      </div>
      <nav className="flex gap-2 flex-wrap" aria-label="Primary">
        <Tab id="home">হোম</Tab>
        <Tab id="members">সদস্য</Tab>
        <Tab id="contrib">কন্ট্রিবিউশন</Tab>
        <Tab id="rules">নিয়মাবলী</Tab>
      </nav>
    </header>
  );
}
