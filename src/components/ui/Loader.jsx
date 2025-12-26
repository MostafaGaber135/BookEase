import React from "react";
export default function Loader({ className = "", size = 12, style }) {
  const s = {
    width: size,
    height: size,
    ...(style || {}),
  };
  return <span className={`loader ${className}`} style={s} aria-label="Loading" />;
}
