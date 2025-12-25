import React from "react";

export default function Card({ title, subtitle, right, children }) {
  return (
    <section className="rounded-3xl border border-gray-100 bg-white shadow-[0_18px_50px_-35px_rgba(0,0,0,0.35)]">
      <div className="px-6 py-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          {subtitle ? <p className="mt-1 text-gray-500 text-sm">{subtitle}</p> : null}
        </div>
        {right ? <div className="shrink-0">{right}</div> : null}
      </div>
      <div className="px-6 pb-6">{children}</div>
    </section>
  );
}
