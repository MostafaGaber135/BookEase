import React, { useMemo, useState } from "react";
import TabsServicesList from "./components/TabsServicesList";
import Divider from "../../components/ui/Divider";
import PopularServicesCard from "../../components/ui/PopularServicesCard";

const SERVICES = [
  { category: "Medical", badgeText: "Medical", badgeColor: "#2ec2b3", price: 75, title: "General Consultation", description: "Comprehensive health check-up with our experienced physicians. Perfect for routine examinations and health assessments.", duration: "30 minutes", },
  { category: "Dental", badgeText: "Dental", badgeColor: "#2eb88a", price: 120, title: "Dental Cleaning", description: "Professional teeth cleaning and oral health assessment. Keep your smile bright and healthy.", duration: "45 minutes", },
  { category: "Fitness", badgeText: "Fitness", badgeColor: "#f49d25", price: 85, title: "Personal Training Session", description: "One-on-one fitness training with certified trainers. Customized workout plans for your goals.", duration: "60 minutes", },
  { category: "Wellness", badgeText: "Wellness", badgeColor: "#f0f4f4", badgeTextColor: "#304550", price: 95, title: "Swedish Massage", description: "Relaxing full-body massage to relieve stress and tension. Pure relaxation awaits.", duration: "60 minutes", },
  { category: "Medical", badgeText: "Medical", badgeColor: "#2ec2b3", price: 65, title: "Eye Examination", description: "Complete vision assessment and eye health screening. Ensure your eyes are in top condition.", duration: "30 minutes", },
  { category: "Fitness", badgeText: "Fitness", badgeColor: "#f49d25", price: 25, title: "Yoga Class", description: "Group yoga session for all skill levels. Find your balance and inner peace.", duration: "75 minutes", },
];

export default function Services() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredServices = useMemo(() => {
    if (activeTab === "All") return SERVICES;
    return SERVICES.filter((s) => s.category === activeTab);
  }, [activeTab]);

  return (
    <div className="bg-[#f8fafa] w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16 pb-6 sm:pb-10">
        <div className="text-center">
          <h2 className="font-extrabold text-2xl sm:text-5xl lg:text-6xl text-[#1d2930]">
            Our Services
          </h2>

          <p className="mt-3 sm:mt-4 text-[#627884] text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            Explore our range of professional services designed to support your health
            and wellness journey.
          </p>
        </div>

        <div className="mt-6 sm:mt-10 lg:mt-12">
          <TabsServicesList activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>

      <Divider />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredServices.map((item) => (
            <PopularServicesCard
              key={item.title}
              badgeText={item.badgeText}
              badgeColor={item.badgeColor}
              badgeTextColor={item.badgeTextColor}
              price={item.price}
              title={item.title}
              description={item.description}
              duration={item.duration}
            />
          ))}
        </div>

        {filteredServices.length === 0 && (
          <p className="text-center text-[#627884] mt-6 sm:mt-10 text-sm sm:text-base">
            No services found for this category.
          </p>
        )}
      </div>
    </div>
  );
}
