import React from "react";

export default function ServiceRow({ item, selected, onSelect }) {
    return (
        <button
            type="button"
            onClick={() => onSelect(item)}
            className={`
        w-full text-left
        border rounded-2xl
        p-4 sm:p-5
        transition
        cursor-pointer
        ${selected ? "border-[#2ec2b3] bg-[#eaf9f8]" : "border-[#e2e9e9] bg-white hover:bg-gray-50"}
      `}
        >
            <div className="flex items-start justify-between gap-3 sm:gap-4">
                <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-[#1d2930] text-sm sm:text-base truncate">
                        {item.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#627884] mt-1 wrap-break-word">
                        {item.durationMinutes} min • {item.category}
                    </p>
                </div>

                <div className="shrink-0 font-bold text-[#2ec2b3] text-base sm:text-lg whitespace-nowrap">
                    ${item.price}
                </div>
            </div>
        </button>
    );
}
