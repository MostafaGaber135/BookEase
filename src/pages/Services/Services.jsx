import React, { useEffect, useMemo, useState } from "react";
import TabsServicesList from "./components/TabsServicesList";
import Divider from "../../components/ui/Divider";
import PopularServicesCard from "../../components/ui/PopularServicesCard";
import api from "../../api/axios";

const CATEGORY_META = {
  medical: { label: "Medical", color: "#2ec2b3" },
  dental: { label: "Dental", color: "#2eb88a" },
  fitness: { label: "Fitness", color: "#f49d25" },
  wellness: { label: "Wellness", color: "#f0f4f4", textColor: "#304550" },
};

export default function Services() {
  const [activeTab, setActiveTab] = useState("All");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setErr("");

        const params =
          activeTab === "All"
            ? { active: "true" }
            : { category: activeTab.toLowerCase(), active: "true" };

        const res = await api.get("/api/services", { params });

        const list = Array.isArray(res.data)
          ? res.data
          : res.data?.services || [];

        if (alive) setServices(list);
      } catch (e) {
        const msg =
          e?.response?.data?.message ||
          e?.message ||
          "Failed to load services";
        if (alive) setErr(msg);
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [activeTab]);

  const viewServices = useMemo(() => services, [services]);

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
        {loading && (
          <p className="text-center text-[#627884] mt-2 text-sm sm:text-base">
            Loading services...
          </p>
        )}

        {!loading && err && (
          <p className="text-center text-red-600 mt-2 text-sm sm:text-base">
            {err}
          </p>
        )}

        {!loading && !err && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {viewServices.map((services) => {
                const catKey = (services.category || "").toLowerCase();
                const meta = CATEGORY_META[catKey] || {
                  label: services.category || "Service",
                  color: "#2ec2b3",
                };

                return (
                  <PopularServicesCard
                    key={services._id || services.name}
                    badgeText={meta.label}
                    badgeColor={meta.color}
                    badgeTextColor={meta.textColor}
                    price={services.price}
                    title={services.name}
                    description={services.description}
                    duration={`${services.durationMinutes} minutes`}
                  />
                );
              })}
            </div>

            {viewServices.length === 0 && (
              <p className="text-center text-[#627884] mt-6 sm:mt-10 text-sm sm:text-base">
                No services found for this category.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
