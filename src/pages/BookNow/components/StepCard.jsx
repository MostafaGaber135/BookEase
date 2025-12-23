import React from "react";

export default function StepCard({ title, subtitle, children }) {
    return (
        <div className="bg-white border border-[#e2e9e9] rounded-2xl shadow-sm p-4 sm:p-8">
            {(title || subtitle) && (
                <div>
                    {title ? (
                        <h3 className="text-base sm:text-xl font-extrabold text-[#1d2930]">
                            {title}
                        </h3>
                    ) : null}

                    {subtitle ? (
                        <p className="mt-1 text-xs sm:text-sm text-[#627884]">{subtitle}</p>
                    ) : null}
                </div>
            )}

            <div className={`${title || subtitle ? "mt-5 sm:mt-6" : ""}`}>{children}</div>
        </div>
    );
}
