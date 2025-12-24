import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getToken, getUser, clearToken, clearUser, notifyAuthChanged } from "../../../utils/authToken";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isAuthed, setIsAuthed] = useState(!!getToken());
  const [user, setUserState] = useState(getUser());
  const navigate = useNavigate();

  useEffect(() => {
    const syncAuth = () => {
      setIsAuthed(!!getToken());
      setUserState(getUser());
    };

    window.addEventListener("storage", syncAuth);
    window.addEventListener("auth:changed", syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("auth:changed", syncAuth);
    };
  }, []);

  const logout = () => {
    clearToken();
    clearUser();
    notifyAuthChanged();
    navigate("/", { replace: true });
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 lg:px-4 py-2 rounded-xl text-sm lg:text-base font-medium transition whitespace-nowrap
     ${isActive ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-100"}`;

  const displayName = user?.username || user?.name || "User";

  return (
    <header className="sticky top-0 z-50 w-full bg-[#feffff]/90 backdrop-blur border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="bg-[#2ec2b3] rounded-xl p-2.5 sm:p-3 text-white shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
              </svg>
            </div>

            <Link to="/" className="font-bold text-lg sm:text-xl text-gray-900 truncate">
              BookEase
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-1 lg:gap-2 min-w-0">
            <NavLink to="/" className={navLinkClass} end>
              Home
            </NavLink>
            <NavLink to="/services" className={navLinkClass}>
              Services
            </NavLink>
            <NavLink to="/book" className={navLinkClass}>
              Book Now
            </NavLink>

            {isAuthed ? (
              <NavLink to="/mybooking" className={navLinkClass}>
                My Booking
              </NavLink>
            ) : null}
          </nav>

          <div className="hidden md:flex items-center gap-2 lg:gap-4 shrink-0">
            {!isAuthed ? (
              <Link
                to="/signup"
                className="bg-[#2ec2b3] text-white font-semibold px-3 lg:px-5 py-2.5 rounded-xl hover:opacity-90 transition text-sm lg:text-base whitespace-nowrap"
              >
                Get Started
              </Link>
            ) : null}

            {isAuthed ? (
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-2xl bg-gray-100 px-4 py-2 text-gray-800">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20 21a8 8 0 1 0-16 0"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm font-medium">{displayName}</span>
                </div>

                <button
                  type="button"
                  onClick={logout}
                  className="cursor-pointer inline-flex items-center justify-center w-10 h-10 rounded-2xl hover:bg-gray-100 transition text-gray-700"
                  aria-label="Logout"
                  title="Logout"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M16 17l5-5-5-5M21 12H9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            ) : null}
          </div>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-xl p-2 hover:bg-gray-100 shrink-0"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {!open ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-800">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-800">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

        <div className={`${open ? "block" : "hidden"} md:hidden pb-4`}>
          <div className="mt-2 flex flex-col gap-2">
            <NavLink onClick={() => setOpen(false)} to="/" className={navLinkClass} end>
              Home
            </NavLink>
            <NavLink onClick={() => setOpen(false)} to="/services" className={navLinkClass}>
              Services
            </NavLink>
            <NavLink onClick={() => setOpen(false)} to="/book" className={navLinkClass}>
              Book Now
            </NavLink>

            {isAuthed ? (
              <NavLink onClick={() => setOpen(false)} to="/mybooking" className={navLinkClass}>
                My Booking
              </NavLink>
            ) : null}

            <div className="h-px bg-gray-100 my-2" />

            {!isAuthed ? (
              <Link
                to="/signup"
                onClick={() => setOpen(false)}
                className="bg-[#2ec2b3] text-white font-semibold px-4 py-3 rounded-xl hover:opacity-90 transition text-center"
              >
                Get Started
              </Link>
            ) : (
              <div className="flex items-center justify-between gap-3 px-2">
                <div className="inline-flex items-center gap-2 rounded-2xl bg-gray-100 px-4 py-2 text-gray-800">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20 21a8 8 0 1 0-16 0"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm font-medium">{displayName}</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    logout();
                  }}
                  className="cursor-pointer inline-flex items-center justify-center w-12 h-12 rounded-2xl hover:bg-gray-100 transition text-gray-700"
                  aria-label="Logout"
                  title="Logout"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M16 17l5-5-5-5M21 12H9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
