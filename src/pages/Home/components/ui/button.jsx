import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function Button({
    text,
    to,
    variant = "primary",
    withArrow = false,
    className = "",
}) {
    const variants = {
        primary:
            "bg-[#2ec2b3] text-white shadow-md hover:shadow-lg hover:opacity-95",
        secondary:
            "bg-white text-[#0f172a] border border-gray-200 shadow-md hover:shadow-lg hover:bg-gray-50",
    };

    return (
        <Link
            to={to}
            className={`
        inline-flex items-center justify-center gap-3
        px-8 sm:px-10 py-4
        rounded-2xl
        font-semibold text-base sm:text-lg
        transition-all duration-200
        cursor-pointer
        ${variants[variant]}
        ${className}
      `}
        >
            <span>{text}</span>
            {withArrow && <FaArrowRight />}
        </Link>
    );
}
