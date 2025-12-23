import React from "react";

export default function CalendarNavButton({ onClick, disabled, dir }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="
        w-9 h-9 sm:w-10 sm:h-10
        flex items-center justify-center
        rounded-full
        bg-white
        border-2 border-[#eef2f2]
        text-[#7c8a93]
        transition
        hover:bg-[#f8fafa]
        hover:border-[#e6eeee]
        disabled:opacity-40
        disabled:cursor-not-allowed
        shrink-0
      "
      aria-label={dir === "prev" ? "Previous month" : "Next month"}
    >
      {dir === "prev" ? (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      )}
    </button>
  );
}
