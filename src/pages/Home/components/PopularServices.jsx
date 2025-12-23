import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import PopularServicesCard from "../../../components/ui/PopularServicesCard";

export default function PopularServices() {
  return (
    <section className="bg-[#f8fafa]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1d2930]">
              Popular Services
            </h2>
            <p className="mt-2 text-[#627888] text-base sm:text-lg max-w-2xl">
              Explore our most booked services and find the perfect fit for your needs.
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-3 font-semibold text-[#1d2930] border border-[#e2e9e9] shadow-sm hover:shadow-md transition w-fit"
          >
            View All Services <FaArrowRight />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PopularServicesCard
            badgeText="Medical"
            badgeColor="#2ec2b3"
            price={75}
            title="General Consultation"
            description="Comprehensive health check-up with our experienced physicians. Perfect for routine examinations and health assessments."
            duration="30 minutes"
          />

          <PopularServicesCard
            badgeText="Dental"
            badgeColor="#2eb88a"
            price={120}
            title="Dental Cleaning"
            description="Professional teeth cleaning and oral health assessment. Keep your smile bright and healthy."
            duration="45 minutes"
          />

          <PopularServicesCard
            badgeText="Fitness"
            badgeColor="#f49d25"
            price={85}
            title="Personal Training Session"
            description="One-on-one fitness training with certified trainers. Customized workout plans for your goals."
            duration="60 minutes"
          />
        </div>
      </div>
    </section>
  );
}
