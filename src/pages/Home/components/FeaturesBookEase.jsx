import React from "react";
import { FaCalendarAlt, FaClock, FaShieldAlt, FaUserFriends } from "react-icons/fa";
import FeaturesBookEaseCard from "./ui/FeaturesBookEaseCard";

export default function FeaturesBookEase() {
    const features = [
        {
            title: "Easy Scheduling",
            description: "Book appointments in seconds with our intuitive calendar system.",
            icon: <FaCalendarAlt className="text-[#2ec2b3] text-xl" />,
        },
        {
            title: "Real-Time Availability",
            description: "See available slots instantly and choose what works for you.",
            icon: <FaClock className="text-[#2ec2b3] text-xl" />,
        },
        {
            title: "Secure & Reliable",
            description: "Your data is protected with enterprise-grade security.",
            icon: <FaShieldAlt className="text-[#2ec2b3] text-xl" />,
        },
        {
            title: "Expert Professionals",
            description: "Connect with verified, experienced service providers.",
            icon: <FaUserFriends className="text-[#2ec2b3] text-xl" />,
        },
    ];

    return (
        <section className="bg-[#f8fafa]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
                <div className="text-center">
                    <h2 className="font-extrabold text-3xl sm:text-4xl text-[#1d2930]">
                        Why Choose BookEase?
                    </h2>
                    <p className="mt-3 text-[#627888] text-base sm:text-lg max-w-2xl mx-auto">
                        We've built the most intuitive booking platform to save you time and hassle.
                    </p>
                </div>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature) => (
                        <FeaturesBookEaseCard
                            key={feature.title}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
