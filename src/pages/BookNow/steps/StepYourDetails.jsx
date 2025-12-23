import React from "react";
import StepCard from "../components/StepCard";
import TextInput from "../components/TextInput";

export default function StepYourDetails({ form, setForm }) {
    return (
        <StepCard title="Your Details" subtitle="Please provide your contact information">
            <div className="bg-[#f1f5f5] rounded-2xl p-4 text-xs sm:text-sm text-[#627884]">
                <span className="text-[#2ec2b3] font-semibold cursor-pointer">Sign in</span>{" "}
                to save your booking history and manage appointments.
            </div>

            <div className="mt-6 space-y-4 sm:space-y-5">
                <TextInput
                    label="Full Name"
                    placeholder="John Smith"
                    value={form.name}
                    onChange={(v) => setForm((p) => ({ ...p, name: v }))}
                />
                <TextInput
                    label="Email Address"
                    placeholder="john@example.com"
                    type="email"
                    value={form.email}
                    onChange={(v) => setForm((p) => ({ ...p, email: v }))}
                />
                <TextInput
                    label="Phone Number"
                    placeholder="+1 (555) 123-4567"
                    value={form.phone}
                    onChange={(v) => setForm((p) => ({ ...p, phone: v }))}
                />
            </div>
        </StepCard>
    );
}
