import React from "react";

export default function SegmentedTabs({ tabs, value, onChange }) {
  return (
    <div className="w-full sm:w-fit rounded-2xl bg-gray-50 border border-gray-100 p-1 flex gap-1">
      {tabs.map((t) => {
        const active = t.value === value;
        return (
          <button
            key={t.value}
            type="button"
            onClick={() => onChange(t.value)}
            className={[
              "cursor-pointer px-5 py-2 rounded-2xl text-sm font-medium transition whitespace-nowrap",
              active ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900",
            ].join(" ")}
            aria-pressed={active}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
