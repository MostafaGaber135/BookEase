import React from "react";
import { FaCheck } from "react-icons/fa";

export default function StepsIndicator({ currentStep }) {
  const steps = ["Select Service", "Choose Date & Time", "Your Details", "Confirmation"];
  const progress = Math.max(0, Math.min(100, ((currentStep - 1) / (steps.length - 1)) * 100));

  return (
    <div className="w-full">
      <div className="hidden md:flex w-full items-center justify-between">
        {steps.map((label, index) => {
          const step = index + 1;
          const isActive = step === currentStep;
          const isCompleted = step < currentStep;

          return (
            <div key={label} className="flex-1 flex items-center min-w-0">
              <div
                className={`
                  w-9 h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center font-semibold shrink-0
                  ${isCompleted ? "bg-[#2ec2b3] text-white" : ""}
                  ${isActive && !isCompleted ? "bg-[#2ec2b3] text-white" : ""}
                  ${!isActive && !isCompleted ? "bg-gray-100 text-gray-500" : ""}
                `}
              >
                {isCompleted ? <FaCheck className="text-sm" /> : step}
              </div>

              <span
                className={`
                  ml-2 lg:ml-3 text-xs lg:text-sm font-medium truncate
                  ${isActive || isCompleted ? "text-[#1d2930]" : "text-gray-500"}
                `}
                title={label}
              >
                {label}
              </span>

              {index !== steps.length - 1 && (
                <div className="flex-1 mx-2 lg:mx-4 h-px bg-gray-200">
                  <div className={`h-px ${isCompleted ? "bg-[#2ec2b3]" : "bg-transparent"}`} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="md:hidden">
        <div className="relative w-full pt-1">
          <div className="absolute left-0 right-0 top-5 h-1 bg-gray-200 rounded-full" />
          <div
            className="absolute left-0 top-5 h-1 bg-[#2ec2b3] rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />

          <div className="relative flex items-center justify-between">
            {steps.map((_, index) => {
              const step = index + 1;
              const isActive = step === currentStep;
              const isCompleted = step < currentStep;

              return (
                <div
                  key={step}
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm shrink-0
                    border
                    ${isCompleted ? "bg-[#2ec2b3] text-white border-[#2ec2b3]" : ""}
                    ${isActive && !isCompleted ? "bg-[#2ec2b3] text-white border-[#2ec2b3]" : ""}
                    ${!isActive && !isCompleted ? "bg-white text-gray-600 border-gray-200" : ""}
                  `}
                >
                  {isCompleted ? <FaCheck className="text-[13px]" /> : step}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-3 text-center">
          <div className="text-xs text-gray-500 font-medium">
            Step {currentStep} of {steps.length}
          </div>
          <div className="mt-1 text-sm font-semibold text-[#1d2930]">
            {steps[currentStep - 1]}
          </div>
        </div>
      </div>
    </div>
  );
}
