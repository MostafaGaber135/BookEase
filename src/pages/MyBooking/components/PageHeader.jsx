import React from "react";

export default function PageHeader({ title, subtitle, action }) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1d2930] truncate">
                    {title}
                </h1>
                {subtitle ? (
                    <p className="mt-2 text-sm sm:text-base text-[#627884]">
                        {subtitle}
                    </p>
                ) : null}
            </div>

            {action ? <div className="shrink-0">{action}</div> : null}
        </div>
    );
}
