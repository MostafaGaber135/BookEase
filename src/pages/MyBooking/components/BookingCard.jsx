import React from "react";
import BookingStatusPill from "./BookingStatusPill";

export default function BookingCard({ title, date, time, status = "Pending" }) {
    return (
        <div
            className="
        w-full
        bg-white
        border border-[#e2e9e9]
        rounded-3xl
        p-4 sm:p-6
        flex flex-col sm:flex-row sm:items-center
        gap-4
      "
        >
            <div className="shrink-0 w-14 h-14 rounded-2xl bg-[#eaf9f8] flex items-center justify-center">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-[#2ec2b3]">
                    <path
                        d="M21 8v13H3V8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M3 8l9-5 9 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M9 21V12h6v9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            <div className="min-w-0 flex-1">
                <h3 className="text-lg sm:text-xl font-extrabold text-[#1d2930] truncate">
                    {title}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#627884]">
                    <div className="inline-flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#627884]">
                            <path
                                d="M8 2v3M16 2v3"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                            <path
                                d="M4 7h16"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                            <rect
                                x="4"
                                y="5"
                                width="16"
                                height="17"
                                rx="2"
                                stroke="currentColor"
                                strokeWidth="2"
                            />
                        </svg>
                        <span>{date}</span>
                    </div>

                    <div className="inline-flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#627884]">
                            <path
                                d="M12 6v6l4 2"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                stroke="currentColor"
                                strokeWidth="2"
                            />
                        </svg>
                        <span>{time}</span>
                    </div>
                </div>
            </div>

            <div className="sm:ml-auto sm:self-center">
                <BookingStatusPill status={status} />
            </div>
        </div>
    );
}
