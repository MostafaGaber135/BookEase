import React from "react";

export default function PrimaryActionButton({ text, onClick, icon }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="
        w-full sm:w-auto
        inline-flex items-center justify-center gap-3
        bg-[#2ec2b3] text-white
        font-semibold
        px-5 py-3
        rounded-2xl
        hover:opacity-95 transition
        shadow-sm
        whitespace-nowrap
        cursor-pointer
      "
        >
            {icon ? <span className="text-white">{icon}</span> : null}
            <span>{text}</span>
        </button>
    );
}
