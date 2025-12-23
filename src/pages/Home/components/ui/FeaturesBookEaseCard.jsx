import React from "react";

export default function FeaturesBookEaseCard({ icon, title, description }) {
    return (
        <div className="bg-white border border-[#e2e9e9] rounded-2xl shadow-sm p-8 text-center h-full">
            <div className="mx-auto bg-[#eaf8f7] h-14 w-14 rounded-2xl flex items-center justify-center">
                {icon}
            </div>
            <h3 className="mt-6 text-xl font-bold text-[#1d2930]">
                {title}
            </h3>
            <p className="mt-3 text-[#627888] leading-relaxed">
                {description}
            </p>
        </div>
    );
}
