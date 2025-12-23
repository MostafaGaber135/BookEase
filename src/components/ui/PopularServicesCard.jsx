import React from "react";
import { FaRegClock } from "react-icons/fa";
import PopularServicesButton from "./PopularServicesButton";

export default function PopularServicesCard({
  badgeText,
  badgeColor,
  badgeTextColor = "#ffffff",
  price,
  title,
  description,
  duration,
  category,
}) {
  return (
    <div className="bg-white border border-[#e2e9e9] rounded-2xl shadow-sm p-6 flex flex-col">
      <div className="flex items-center justify-between">
        <span
          className="px-4 py-1.5 rounded-full text-sm font-semibold"
          style={{
            backgroundColor: badgeColor,
            color: badgeTextColor,
          }}
        >
          {badgeText}
        </span>

        <span className="text-[#2ec2b3] font-bold text-xl">${price}</span>
      </div>

      <h3 className="mt-4 text-2xl font-extrabold text-[#1d2930]">{title}</h3>

      <p className="mt-3 text-[#627888] leading-relaxed flex-1">{description}</p>

      <div className="mt-5 flex items-center gap-3 text-[#627888]">
        <FaRegClock />
        <span>{duration}</span>
      </div>

      <div className="mt-6">
        <PopularServicesButton
          service={{
            title,
            price,
            duration:
              typeof duration === "number"
                ? duration
                : parseInt(String(duration), 10),
            category: category || badgeText,
          }}
        />
      </div>
    </div>
  );
}
