import React from "react";

export default function TimeSlot({ time, selected, disabled, onClick }) {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className={`
        px-3 sm:px-4
        py-2
        rounded-xl border
        text-xs sm:text-sm
        font-semibold
        transition
        whitespace-nowrap
        ${disabled ? "opacity-40 cursor-not-allowed line-through" : "cursor-pointer"}
        ${selected ? "bg-[#2ec2b3] text-white border-[#2ec2b3]" : "bg-white border-[#e2e9e9] hover:bg-gray-50"}
      `}
        >
            {time}
        </button>
    );
}
