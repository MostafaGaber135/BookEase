import React from "react";
import { RiStarSFill } from "react-icons/ri";

export default function OurCustomersSayCard({ comment, name, jobTitle }) {
    return (
        <div className="bg-white border border-[#e2e9e9] rounded-2xl shadow-sm p-8">
            <div className="flex items-center gap-1 text-[#f49d25] text-xl drop-shadow-sm">

                <RiStarSFill />
                <RiStarSFill />
                <RiStarSFill />
                <RiStarSFill />
                <RiStarSFill />
            </div>

            <p className="mt-5 text-[#1d2930] text-lg leading-relaxed">
                “{comment}”
            </p>

            <div className="mt-8">
                <h3 className="font-extrabold text-[#1d2930] text-lg">{name}</h3>
                <p className="mt-1 text-[#627884]">{jobTitle}</p>
            </div>
        </div>
    );
}
