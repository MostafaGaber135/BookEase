import React from "react";

export default function PasswordToggle({ shown, onToggle }) {
    return (
        <button
            type="button"
            onClick={onToggle}
            className="cursor-pointer inline-flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 transition text-[#7c8a93]"
            aria-label={shown ? "Hide password" : "Show password"}
        >
            {!shown ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                    />
                </svg>
            ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M3 3l18 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <path
                        d="M10.6 10.6a2.5 2.5 0 0 0 3.5 3.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M6.1 6.1C3.7 7.9 2 12 2 12s3.5 7 10 7c2 0 3.7-.6 5.1-1.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M9.9 4.3C10.6 4.1 11.3 4 12 4c6.5 0 10 8 10 8s-1.3 3-4 5.2"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        </button>
    );
}
