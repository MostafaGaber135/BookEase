import React, { useEffect, useMemo } from "react";
import StepCard from "../components/StepCard";
import TextInput from "../components/TextInput";
import { Link } from "react-router-dom";
import { getToken, getUser } from "../../../utils/authToken";

export default function StepYourDetails({ form, setForm }) {
    const isAuthed = useMemo(() => !!getToken(), []);
    const user = useMemo(() => getUser(), []);

    useEffect(() => {
        if (!isAuthed) return;
        if (!user) return;

        setForm((p) => ({
            ...p,
            name: p.name || user.name || "",
            email: p.email || user.email || "",
        }));
    }, [isAuthed, user, setForm]);

    return (
        <StepCard title="Your Details" subtitle="Please provide your contact information">
            {!isAuthed ? (
                <div className="bg-[#f1f5f5] rounded-2xl p-4 text-xs sm:text-sm text-[#627884]">
                    <Link to="/signin" className="text-[#2ec2b3] font-semibold cursor-pointer">
                        Sign in
                    </Link>{" "}
                    to save your booking history and manage appointments.
                </div>
            ) : null}

            <div className={`${!isAuthed ? "mt-6" : ""} space-y-4 sm:space-y-5`}>
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
