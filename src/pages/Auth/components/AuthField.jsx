import React from "react";

export default function AuthField({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    icon,
    right,
    error,
}) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#1d2930]">{label}</label>

            <div className="relative">
                {icon ? (
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7c8a93]">
                        {icon}
                    </span>
                ) : null}

                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={`
            w-full
            rounded-2xl
            border ${error ? "border-red-400" : "border-[#e2e9e9]"}
            bg-white
            px-4 py-3
            text-sm sm:text-base
            outline-none
            focus:border-[#2ec2b3]
            ${icon ? "pl-12" : ""}
            ${right ? "pr-12" : ""}
          `}
                />

                {right ? (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2">{right}</span>
                ) : null}
            </div>

            {error ? <p className="text-xs text-red-600">{error}</p> : null}
        </div>
    );
}
