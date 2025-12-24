import React from "react";

export default function Panel({ children, className = "" }) {
    return (
        <div
            className={`
        bg-white
        border border-[#e2e9e9]
        rounded-3xl
        shadow-sm
        ${className}
      `}
        >
            {children}
        </div>
    );
}
