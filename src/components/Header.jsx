import { useState } from "react";
import Logout from "./Logout";
import { use } from "react";

export default function Header({ active, onTab, user, onLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const Tab = ({ id, children, mobile = false }) => (
    <button
      onClick={() => {
        onTab(id);
        if (mobile) setIsMobileMenuOpen(false);
      }}
      className={`px-3 py-2 rounded-xl border text-sm transition ${
        active === id
          ? "bg-slate-900 text-white border-slate-700 shadow-inner"
          : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-900 hover:text-white"
      } ${mobile ? "w-full text-left" : ""}`}
    >
      {children}
    </button>
  );

  return (
    <>
      <header className="flex items-center justify-between gap-3 mb-4">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <a href="/">

          
          <img src="public/logo/logo.png" height={50} width={50} style={{borderRadius: 10}}/>
</a>
          <div className="hidden sm:block">
            <div className="font-extrabold tracking-wide text-slate-100 text-sm md:text-base">
              স্বপ্নচারী টুয়েন্টি গ্রুপ
            </div>
          </div>
          <div className="block sm:hidden">
            <div className="font-extrabold tracking-wide text-slate-100 text-xs">
              স্বপ্নচারী
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-2 items-center" aria-label="Primary">
          <Tab id="home">হোম</Tab>
          <Tab id="members">সদস্য</Tab>
          <Tab id="contrib">কন্ট্রিবিউশন</Tab>

          {user && (
            <div className="flex items-center gap-2 ml-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
                <img
                  src={user.profile_image}
                  alt={user.name?.charAt(0) || "U"}
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
              <span className="text-slate-200 text-sm hidden xl:inline">
                {user.name}
              </span>
              <Logout onLogout={onLogout} />
            </div>
          )}
        </nav>

        {/* Mobile Menu Button and User Info */}
        <div className="flex lg:hidden items-center gap-2">
          {user && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
                 <img
                  src={user.profile_image}
                  alt={user.name?.charAt(0) || "U"}
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
              <span className="text-slate-200 text-sm hidden md:inline">
                {user.name}
              </span>
            </div>
          )}

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <svg
              className={`w-5 h-5 transition-transform ${
                isMobileMenuOpen ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mb-4 bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-lg">
          <div className="space-y-3">
            <Tab id="home" mobile>
              হোম
            </Tab>
            <Tab id="members" mobile>
              সদস্য
            </Tab>
            <Tab id="contrib" mobile>
              কন্ট্রিবিউশন
            </Tab>

            {user && (
              <div className="pt-3 border-t border-slate-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    <img
                      src={user.profile_image}
                      alt={user.name?.charAt(0) || "U"}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-slate-200 text-sm font-medium">
                      {user.name}
                    </div>
                    <div className="text-slate-400 text-xs">
                      @{user.username}
                    </div>
                  </div>
                </div>
                <Logout onLogout={onLogout} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
