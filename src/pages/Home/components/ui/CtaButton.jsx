import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function CtaButton({
    to = "#",
    text,
    variant = "primary",
    withArrow = false,
    className = "",
}) {
    const variants = {
        primary:
            "bg-white text-[#1d2930] border border-white/20 hover:bg-white/95 shadow-sm",
        secondary:
            "bg-white/15 text-white border border-white/25 hover:bg-white/20 shadow-sm",
    };

    return (
        <Link
            to={to}
            className={`
        inline-flex items-center justify-center gap-3
        px-8 sm:px-10 py-4
        rounded-2xl font-semibold text-base sm:text-lg
        transition
        ${variants[variant]}
        ${className}
      `}
        >
            <span>{text}</span>
            {withArrow && <FaArrowRight />}
        </Link>
    );
}
