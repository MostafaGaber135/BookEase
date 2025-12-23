import React from "react";
import { Link } from "react-router-dom";

export default function AuthFooterLink({ text, linkText, to }) {
  return (
    <p className="text-center text-sm sm:text-base text-[#627884]">
      {text}{" "}
      <Link to={to} className="text-[#2ec2b3] font-semibold hover:opacity-90">
        {linkText}
      </Link>
    </p>
  );
}
