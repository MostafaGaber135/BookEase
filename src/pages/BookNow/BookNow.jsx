import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import StepsIndicator from "./components/StepsIndicator";
import WizardButton from "./components/WizardButton";

import StepSelectService from "./steps/StepSelectService";
import StepChooseDateTime from "./steps/StepChooseDateTime";
import StepYourDetails from "./steps/StepYourDetails";
import StepConfirmation from "./steps/StepConfirmation";

const SERVICES = [
  { title: "General Consultation", duration: 30, category: "Medical", price: 75 },
  { title: "Dental Cleaning", duration: 45, category: "Dental", price: 120 },
  { title: "Personal Training Session", duration: 60, category: "Fitness", price: 85 },
  { title: "Swedish Massage", duration: 60, category: "Wellness", price: 95 },
  { title: "Eye Examination", duration: 30, category: "Medical", price: 65 },
  { title: "Yoga Class", duration: 75, category: "Fitness", price: 25 },
];

export default function BookNow() {
  const location = useLocation();

  const [step, setStep] = useState(1);

  const [selectedService, setSelectedService] = useState(() => {
    const preselected = location.state?.preselectedService;
    if (!preselected) return null;
    const matched = SERVICES.find((s) => s.title === preselected.title);
    return matched ?? preselected;
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");

  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    if (location.state?.preselectedService) {
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [location.state]);

  const canNext = useMemo(() => {
    if (step === 1) return !!selectedService;
    if (step === 2) return !!selectedDate && !!selectedTime;
    if (step === 3) return form.name && form.email && form.phone;
    return true;
  }, [step, selectedService, selectedDate, selectedTime, form]);

  const next = () => setStep((s) => Math.min(4, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div className="bg-[#f8fafa] w-full min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <StepsIndicator currentStep={step} />

        <div className="mt-6 sm:mt-8 flex justify-center">
          <div className="w-full max-w-4xl">
            {step === 1 && (
              <StepSelectService
                services={SERVICES}
                selectedService={selectedService}
                setSelectedService={setSelectedService}
              />
            )}

            {step === 2 && (
              <StepChooseDateTime
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
              />
            )}

            {step === 3 && <StepYourDetails form={form} setForm={setForm} />}

            {step === 4 && (
              <StepConfirmation
                selectedService={selectedService}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
              />
            )}

            <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <WizardButton
                variant="ghost"
                text="Back"
                icon="left"
                onClick={back}
                disabled={step === 1}
                className="min-w-[120px]"
              />

              {step < 4 ? (
                <WizardButton
                  variant={step === 3 ? "success" : "primary"}
                  text={step === 3 ? "Confirm Booking" : "Next"}
                  icon={step === 3 ? "check" : "right"}
                  onClick={next}
                  disabled={!canNext}
                  className="min-w-[140px]"
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
