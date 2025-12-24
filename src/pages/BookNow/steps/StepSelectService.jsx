import React from "react";
import StepCard from "../components/StepCard";
import ServiceRow from "../components/ServiceRow";

export default function StepSelectService({
    services,
    loading,
    error,
    selectedService,
    setSelectedService,
}) {
    return (
        <StepCard title="Select a Service" subtitle="Choose the service you would like to book">
            {loading && <p className="text-sm text-[#627884]">Loading services...</p>}
            {!loading && error && <p className="text-sm text-red-600">{error}</p>}

            {!loading && !error && (
                <div className="space-y-3 sm:space-y-4">
                    {services.map((item) => (
                        <ServiceRow
                            key={item._id || item.name}
                            item={item}
                            selected={selectedService?._id === item._id}
                            onSelect={setSelectedService}
                        />
                    ))}
                </div>
            )}
        </StepCard>
    );
}
