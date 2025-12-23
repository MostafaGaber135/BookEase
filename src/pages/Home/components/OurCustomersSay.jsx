import React from "react";
import OurCustomersSayCard from "./ui/OurCustomersSayCard";

export default function OurCustomersSay() {
    const testimonials = [
        {
            comment:
                "BookEase has transformed how I manage my wellness appointments. So simple and efficient!",
            name: "Sarah Johnson",
            jobTitle: "Regular Customer",
        },
        {
            comment:
                "As a physician, this platform helps me manage my patient schedule effortlessly.",
            name: "Dr. Michael Chen",
            jobTitle: "Healthcare Provider",
        },
        {
            comment:
                "I love how I can book my gym sessions and personal training in one place.",
            name: "Emily Roberts",
            jobTitle: "Fitness Enthusiast",
        },
    ];

    return (
        <section className="bg-[#f8fafa]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
                <div className="text-center">
                    <h2 className="font-extrabold text-3xl sm:text-4xl text-[#1d2930]">
                        What Our Customers Say
                    </h2>
                    <p className="mt-3 text-[#627884] text-base sm:text-lg max-w-3xl mx-auto">
                        Join thousands of satisfied customers who trust BookEase for their appointments.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonials) => (
                        <OurCustomersSayCard
                            key={testimonials.name}
                            comment={testimonials.comment}
                            name={testimonials.name}
                            jobTitle={testimonials.jobTitle}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
