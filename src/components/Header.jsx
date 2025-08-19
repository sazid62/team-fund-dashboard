import Logout from "./Logout";

export default function Header({ active, onTab, user, onLogout }) {
  const Tab = ({ id, children }) => (
    <button
      onClick={() => onTab(id)}
      className={`px-3 py-2 rounded-xl border text-sm transition ${
        active === id
          ? "bg-slate-900 text-white border-slate-700 shadow-inner"
          : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-900 hover:text-white"
      }`}
    >
      {children}
    </button>
  );

  return (
    <header className="flex items-center justify-between gap-3 mb-4">
      <div className="flex items-center gap-3">
        <div
          aria-hidden
          className="w-11 h-11 rounded-xl shadow-soft"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, #6366f1 0 40%, transparent 41%), radial-gradient(circle at 70% 70%, #a855f7 0 40%, transparent 41%)",
            boxShadow: "0 0 0 2px #0b1220, 0 10px 30px rgba(0,0,0,.5)",
          }}
        />
        <div>
          <div className="font-extrabold tracking-wide text-slate-100">
            টিম ফান্ড ড্যাশবোর্ড
          </div>
          <small className="block text-slate-400 font-medium">
            ২১ জন × প্রতি মাসে ৫,০০০ টাকা × ২৪ মাস
          </small>
        </div>
      </div>

      <nav className="flex gap-2 flex-wrap items-center" aria-label="Primary">
        <Tab id="home">হোম</Tab>
        <Tab id="members">সদস্য</Tab>
        <Tab id="contrib">কন্ট্রিবিউশন</Tab>
        <Tab id="rules">নিয়মাবলী</Tab>

        {user && (
          <div className="flex items-center gap-2 ml-4">
            <img
              src={user.picture}
              alt="profile"
              className="w-8 h-8 rounded-full border border-slate-700"
            />
            <span className="text-slate-200 text-sm">{user.name}</span>
            <Logout onLogout={onLogout} />
          </div>
        )}
      </nav>
    </header>
  );
}
