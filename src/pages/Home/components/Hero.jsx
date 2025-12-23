import React from "react";
import TrustBadge from "./TrustBadge";
import Button from "./ui/button";

export default function Hero() {
    return (
        <section
            className="
        relative overflow-hidden
        bg-linear-to-b
        from-[#dff6f5]
        via-[#eaf9f8]
        to-white
      "
        >
            <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[480px] w-[480px] rounded-full bg-[#2ec2b3]/15 blur-3xl" />

            <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-20 text-center">
                <TrustBadge />

                <h1 className="mt-8 font-extrabold tracking-tight leading-[1.05]">
                    <span className="block text-[#1d2930] text-4xl sm:text-6xl md:text-7xl">
                        Book Your Next
                    </span>
                    <span className="block text-[#2ec2b3] text-4xl sm:text-6xl md:text-7xl">
                        Appointment
                    </span>
                    <span className="block text-[#1d2930] text-4xl sm:text-6xl md:text-7xl">
                        with Ease
                    </span>
                </h1>

                <p className="mt-6 text-[#627884] text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                    Simplifying healthcare, fitness, and wellness bookings. Find the perfect
                    time slot and book in seconds.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                    <Button
                        text="Book Now"
                        to="/book"
                        variant="primary"
                        withArrow
                    />
                    <Button
                        text="Explore Services"
                        to="/services"
                        variant="secondary"
                    />
                </div>
            </div>
        </section>
    );
}
