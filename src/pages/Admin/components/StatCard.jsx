import React from "react";

const icons = {
  calendar: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  ),
  pending: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  confirmed: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  revenue: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1v22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
};

export default function StatCard({ title, value, icon = "calendar" }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-[0_12px_30px_-20px_rgba(0,0,0,0.25)] px-5 py-4 flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm text-gray-500">{title}</p>
        <div className="mt-1 text-2xl font-semibold text-gray-900 truncate">{value}</div>
      </div>

      <div className="shrink-0 w-11 h-11 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-[#2ec2b3]">
        {icons[icon] || icons.calendar}
      </div>
    </div>
  );
}
