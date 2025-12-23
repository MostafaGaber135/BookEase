import React from "react";
import CtaButton from "./ui/CtaButton";

export default function ReadyToGetStarted() {
    return (
        <section className="bg-[#f8fafa]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
                <div
                    className="
            rounded-3xl overflow-hidden
            bg-linear-to-r from-[#2ec2b3] to-[#35a9ea]
            px-6 sm:px-10 lg:px-14
            py-14
            text-center
            shadow-sm
          "
                >
                    <h2 className="text-white font-extrabold text-3xl sm:text-5xl">
                        Ready to Get Started?
                    </h2>

                    <p className="mt-5 text-white/90 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                        Book your first appointment today and experience the convenience of modern scheduling.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                        <CtaButton
                            to="/book"
                            text="Book an Appointment"
                            variant="primary"
                            withArrow
                            className="min-w-[260px]"
                        />

                        <CtaButton
                            to="/get-started"
                            text="Create Free Account"
                            variant="secondary"
                            className="min-w-[240px]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
