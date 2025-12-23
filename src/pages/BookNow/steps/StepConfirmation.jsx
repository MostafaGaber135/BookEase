import React from "react";
import StepCard from "../components/StepCard";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

export default function StepConfirmation({ selectedService, selectedDate, selectedTime }) {
    return (
        <StepCard title="" subtitle="">
            <div className="text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-[#2ec2b3]/15 flex items-center justify-center">
                    <FaCheckCircle className="text-[#2ec2b3] text-3xl" />
                </div>

                <h2 className="mt-6 text-xl sm:text-2xl font-extrabold text-[#1d2930]">
                    Booking Confirmed!
                </h2>
                <p className="mt-2 text-sm sm:text-base text-[#627884]">
                    Your appointment has been successfully scheduled.
                </p>

                <div className="mt-8 bg-[#f1f5f5] rounded-2xl p-4 sm:p-6 w-full max-w-md mx-auto">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <span className="text-[#627884] text-left">Service:</span>
                        <span className="text-[#1d2930] font-semibold text-right wrap-break-words">
                            {selectedService?.title}
                        </span>

                        <span className="text-[#627884] text-left">Date:</span>
                        <span className="text-[#1d2930] font-semibold text-right wrap-break-words">
                            {selectedDate?.label}
                        </span>

                        <span className="text-[#627884] text-left">Time:</span>
                        <span className="text-[#1d2930] font-semibold text-right whitespace-nowrap">
                            {selectedTime}
                        </span>

                        <span className="text-[#627884] text-left">Price:</span>
                        <span className="text-[#2ec2b3] font-extrabold text-right whitespace-nowrap">
                            ${selectedService?.price}
                        </span>
                    </div>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                    <Link
                        to="/services"
                        className="w-full sm:w-auto px-6 py-3 rounded-2xl border border-[#e2e9e9] font-semibold hover:bg-gray-50 text-center"
                    >
                        View More Services
                    </Link>

                    <Link
                        to="/"
                        className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#2ec2b3] text-white font-semibold hover:opacity-95 text-center"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </StepCard>
    );
}
