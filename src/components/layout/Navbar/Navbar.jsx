import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `px-3 lg:px-4 py-2 rounded-xl text-sm lg:text-base font-medium transition whitespace-nowrap
     ${isActive ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-100"}`;

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
            <NavLink to="/mybooking" className={navLinkClass}>
              My Booking
            </NavLink>
          </nav>

          <div className="hidden md:flex items-center gap-2 lg:gap-4 shrink-0">
            <Link
              to="/signin"
              className="text-gray-700 font-medium hover:text-gray-900 text-sm lg:text-base whitespace-nowrap"
            >
              Sign In
            </Link>

            <Link
              to="/get-started"
              className="bg-[#2ec2b3] text-white font-semibold px-3 lg:px-5 py-2.5 rounded-xl hover:opacity-90 transition text-sm lg:text-base whitespace-nowrap"
            >
              Get Started
            </Link>
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
            <NavLink onClick={() => setOpen(false)} to="/mybooking" className={navLinkClass}>
              My Booking
            </NavLink>

            <div className="h-px bg-gray-100 my-2" />

            <Link
              to="/signin"
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-xl font-medium text-gray-700 hover:bg-gray-100"
            >
              Sign In
            </Link>

            <Link
              to="/get-started"
              onClick={() => setOpen(false)}
              className="bg-[#2ec2b3] text-white font-semibold px-4 py-3 rounded-xl hover:opacity-90 transition text-center"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
