import React from "react";

export default function TextInput({ label, value, onChange, placeholder, type = "text" }) {
    return (
        <div className="min-w-0">
            <label className="block text-sm font-semibold text-[#1d2930]">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="
          mt-2 w-full
          rounded-xl
          border border-[#e2e9e9]
          px-4 py-3
          text-sm sm:text-base
          outline-none
          focus:border-[#2ec2b3]
        "
            />
        </div>
    );
}
