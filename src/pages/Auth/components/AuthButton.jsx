import React from "react";
import Loader from "../../../components/ui/Loader";

export default function AuthButton({ text, onClick, disabled, className = "", loading = false }) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`
        w-full
        bg-[#2ec2b3]
        text-white
        font-semibold
        rounded-2xl
        py-3.5
        text-sm sm:text-base
        transition
        hover:opacity-95
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center gap-3
        cursor-pointer
        ${className}
      `}
        >
            <span>{text}</span>
            {loading ? (
              <Loader className="!m-0" size={10} />
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                      d="M5 12h12M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  />
              </svg>
            )}
        </button>
    );
}
