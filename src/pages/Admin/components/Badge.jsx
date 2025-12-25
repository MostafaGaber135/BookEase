import React from "react";

const statusStyles = {
  confirmed: "bg-emerald-50 text-emerald-700 border-emerald-100",
  pending: "bg-amber-50 text-amber-700 border-amber-100",
  cancelled: "bg-red-50 text-red-700 border-red-100",
  completed: "bg-sky-50 text-sky-700 border-sky-100",
};

export default function Badge({ children, variant = "neutral" }) {
  const cls =
    variant === "neutral"
      ? "bg-gray-50 text-gray-700 border-gray-100"
      : statusStyles[variant] || "bg-gray-50 text-gray-700 border-gray-100";

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-semibold ${cls}`}>
      {children}
    </span>
  );
}
