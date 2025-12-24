import React from "react";
import Panel from "./Panel";
import { CgDanger } from "react-icons/cg";

export default function EmptyState({
    title,
    subtitle,
    buttonText,
    onButtonClick,
}) {
    return (
        <Panel className="p-6 sm:p-10">
            <div className="min-h-[320px] sm:min-h-[420px] flex flex-col items-center justify-center text-center">
                <div className="w-18 h-18 rounded-full bg-[#f1f5f5] flex items-center justify-center">
                    <CgDanger className="h-12 w-12 text-[#627884]" />

                </div>

                <h3 className="mt-6 text-xl sm:text-2xl font-extrabold text-[#1d2930]">
                    {title}
                </h3>

                {subtitle ? (
                    <p className="mt-3 text-sm sm:text-base text-[#627884] ">
                        {subtitle}
                    </p>
                ) : null}

                {buttonText ? (
                    <button
                        type="button"
                        onClick={onButtonClick}
                        className="
              mt-6
              bg-[#2ec2b3] text-white
              font-semibold
              px-6 py-3
              rounded-2xl
              hover:opacity-95 transition
              shadow-sm
              cursor-pointer
            "
                    >
                        {buttonText}
                    </button>
                ) : null}
            </div>
        </Panel>
    );
}
