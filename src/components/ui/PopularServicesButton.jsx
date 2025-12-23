import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function PopularServicesButton({ service, className = "" }) {
  return (
    <Link
      to="/book"
      state={service ? { preselectedService: service } : null}
      className={`
        w-full inline-flex items-center justify-center gap-3
        bg-[#2ec2b3] text-white font-semibold
        py-4 rounded-2xl
        shadow-sm hover:opacity-95
        transition
        ${className}
      `}
    >
      Book Now <FaArrowRight />
    </Link>
  );
}
