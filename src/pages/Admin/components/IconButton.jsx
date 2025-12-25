import React from "react";

export default function IconButton({
  title,
  ariaLabel,
  onClick,
  children,
  variant = "neutral",
  disabled = false,
}) {
  const base = "inline-flex items-center justify-center w-10 h-10 rounded-xl transition border";
  const styles = {
    neutral: "bg-white border-gray-100 hover:bg-gray-50 text-gray-700",
    success: "bg-emerald-500 border-emerald-500 hover:opacity-90 text-white",
    danger: "bg-red-500 border-red-500 hover:opacity-90 text-white",
    subtle: "bg-gray-50 border-gray-100 hover:bg-gray-100 text-gray-700",
  };

  return (
    <button
      type="button"
      title={title}
      aria-label={ariaLabel || title}
      onClick={onClick}
      disabled={disabled}
      className={[
        base,
        styles[variant] || styles.neutral,
        disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
