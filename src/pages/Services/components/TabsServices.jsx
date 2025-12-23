import React from "react";

export default function TabsServices({ text, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full
        px-3 py-2 sm:px-5 sm:py-3
        rounded-xl sm:rounded-2xl
        font-semibold text-sm sm:text-base
        transition-all duration-200
        border
        cursor-pointer
        whitespace-nowrap
        ${isActive
          ? "bg-[#2ec2b3] text-white border-[#2ec2b3]"
          : "bg-white text-[#1d2930] border-[#e2e9e9] hover:bg-gray-50"
        }
      `}
    >
      {text}
    </button>
  );
}
