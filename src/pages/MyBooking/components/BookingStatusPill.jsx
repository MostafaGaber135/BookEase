import React from "react";

export default function BookingStatusPill({ status }) {
    const styles = {
        Pending: "bg-[#f1f5f5] text-[#1d2930]",
        Confirmed: "bg-[#eaf9f8] text-[#1d2930]",
        Cancelled: "bg-gray-100 text-gray-600",
    };

    return (
        <span
            className={`
        inline-flex items-center
        px-3 py-1
        rounded-full
        text-xs font-semibold
        ${styles[status] ?? "bg-[#f1f5f5] text-[#1d2930]"}
      `}
        >
            {status}
        </span>
    );
}
