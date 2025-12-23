import React from "react";
import { Link } from "react-router-dom";

export default function AuthLayout({ title, subtitle, children, footer }) {
    return (
        <div className="min-h-screen bg-[#f8fafa] flex items-center justify-center px-4 py-10 sm:py-14">
            <div className="w-full max-w-md sm:max-w-lg">
                <div className="bg-white border border-[#e2e9e9] rounded-3xl shadow-sm p-6 sm:p-10">
                    <div className="text-center">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1d2930]">
                            {title}
                        </h1>
                        {subtitle ? (
                            <p className="mt-2 text-sm sm:text-base text-[#627884]">
                                {subtitle}
                            </p>
                        ) : null}
                    </div>

                    <div className="mt-7 sm:mt-9">{children}</div>

                    {footer ? <div className="mt-7 sm:mt-9">{footer}</div> : null}
                </div>
            </div>
        </div>
    );
}
