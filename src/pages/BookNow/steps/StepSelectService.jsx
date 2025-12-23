import React from "react";
import StepCard from "../components/StepCard";
import ServiceRow from "../components/ServiceRow";

export default function StepSelectService({ services, selectedService, setSelectedService }) {
    return (
        <StepCard title="Select a Service" subtitle="Choose the service you would like to book">
            <div className="space-y-3 sm:space-y-4">
                {services.map((item) => (
                    <ServiceRow
                        key={item.title}
                        item={item}
                        selected={selectedService?.title === item.title}
                        onSelect={setSelectedService}
                    />
                ))}
            </div>
        </StepCard>
    );
}
