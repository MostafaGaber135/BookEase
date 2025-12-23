import React from "react";
import { FaArrowLeft, FaArrowRight, FaCheck } from "react-icons/fa";

export default function WizardButton({
    variant = "primary",
    text,
    onClick,
    disabled = false,
    icon = "right",
    className = "",
}) {
    const styles = {
        primary: "bg-[#2ec2b3] text-white hover:opacity-95 shadow-sm",
        ghost: "bg-white text-[#1d2930] border border-[#e2e9e9] hover:bg-gray-50",
        success: "bg-[#2ec2b3] text-white hover:opacity-95 shadow-sm",
    };

    const IconComp =
        icon === "left" ? FaArrowLeft : icon === "check" ? FaCheck : icon === "none" ? null : FaArrowRight;

    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className={`
        w-full sm:w-auto
        inline-flex items-center justify-center gap-3
        px-4 sm:px-6
        py-2.5 sm:py-3
        rounded-2xl
        font-semibold
        text-sm sm:text-base
        transition
        whitespace-nowrap
        ${styles[variant]}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
        >
            {IconComp && icon === "left" && <IconComp />}
            <span>{text}</span>
            {IconComp && (icon === "right" || icon === "check") && <IconComp />}
        </button>
    );
}
