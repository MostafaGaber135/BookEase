import React from "react";
import TabsServices from "./TabsServices";

export default function TabsServicesList({ activeTab, setActiveTab }) {
  const tabs = ["All", "Medical", "Dental", "Fitness", "Wellness"];

  return (
    <div className="w-full">
      <div
        className="
          grid grid-cols-3 gap-2
          sm:flex sm:items-center sm:justify-center sm:gap-3
        "
      >
        {tabs.map((tab) => (
          <TabsServices
            key={tab}
            text={tab}
            isActive={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          />
        ))}
      </div>
    </div>
  );
}
