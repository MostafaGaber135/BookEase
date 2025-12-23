import React from "react";
import { FaStar } from "react-icons/fa";

export default function TrustBadge() {
    return (
        <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-4 py-2 text-sm font-medium text-[#334155] shadow-sm border border-white/40">
            <FaStar className="text-[#f49d25]" />
            <span>Trusted by 10,000+ customers</span>
        </div>
    );
}
