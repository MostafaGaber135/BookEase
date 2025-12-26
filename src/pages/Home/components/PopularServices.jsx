import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import PopularServicesCard from "../../../components/ui/PopularServicesCard";
import api from "../../../api/axios";
import Loader from "../../../components/ui/Loader";

const CATEGORY_META = {
  medical: { label: "Medical", color: "#2ec2b3" },
  dental: { label: "Dental", color: "#2eb88a" },
  fitness: { label: "Fitness", color: "#f49d25" },
  wellness: { label: "Wellness", color: "#7c5cff" },
};

export default function PopularServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get("/api/services");

        const data = Array.isArray(res.data)
          ? res.data
          : res.data.services || [];

        setServices(data.slice(0, 3));
      } catch (err) {
        setError(
          err.response?.data?.message ||
          "Failed to load popular services"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

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

        {loading && (
          <div className="mt-10">
            <Loader />
          </div>
        )}

        {!loading && error && (
          <p className="mt-10 text-red-600">{error}</p>
        )}

        {!loading && !error && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const meta =
                CATEGORY_META[service.category] || {
                  label: service.category,
                  color: "#2ec2b3",
                };

              return (
                <PopularServicesCard
                  key={service._id}
                  badgeText={meta.label}
                  badgeColor={meta.color}
                  price={service.price}
                  title={service.name}
                  description={service.description}
                  duration={`${service.durationMinutes ?? service.duration} minutes`}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
