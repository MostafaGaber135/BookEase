import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import StepsIndicator from "./components/StepsIndicator";
import WizardButton from "./components/WizardButton";

import StepSelectService from "./steps/StepSelectService";
import StepChooseDateTime from "./steps/StepChooseDateTime";
import StepYourDetails from "./steps/StepYourDetails";
import StepConfirmation from "./steps/StepConfirmation";

import api from "../../api/axios";
import { format } from "date-fns";

export default function BookNow() {
  const location = useLocation();

  const [step, setStep] = useState(1);

  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesErr, setServicesErr] = useState("");

  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingErr, setBookingErr] = useState("");

  const [selectedService, setSelectedService] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");

  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    let alive = true;

    async function loadServices() {
      try {
        setServicesLoading(true);
        setServicesErr("");

        const res = await api.get("/api/services");

        const list = Array.isArray(res.data) ? res.data : res.data?.services || [];
        if (!alive) return;

        setServices(list);

        const preselected = location.state?.preselectedService;

        if (preselected) {
          const preId = preselected._id || preselected.id;
          const preTitle = preselected.title || preselected.name;

          const matched =
            (preId && list.find((s) => s._id === preId)) ||
            (preTitle && list.find((s) => s.name === preTitle));

          setSelectedService(matched || null);
        }
      } catch (e) {
        if (!alive) return;
        setServicesErr(e?.response?.data?.message || e?.message || "Failed to load services");
      } finally {
        if (alive) setServicesLoading(false);
      }
    }

    loadServices();

    return () => {
      alive = false;
    };
  }, [location.state]);

  useEffect(() => {
    if (location.state?.preselectedService) {
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [location.state]);

  const canNext = useMemo(() => {
    if (step === 1) return !!selectedService;
    if (step === 2) return !!selectedDate && !!selectedTime;
    if (step === 3) return form.name && form.email && form.phone && !bookingLoading;
    return true;
  }, [step, selectedService, selectedDate, selectedTime, form, bookingLoading]);

  const next = async () => {
    if (step === 3) {
      try {
        setBookingLoading(true);
        setBookingErr("");

        const dateStr = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";

        await api.post("/api/bookings", {
          serviceId: selectedService?._id,
          date: dateStr,
          time: selectedTime,
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone,
        });

        setStep(4);
      } catch (e) {
        setBookingErr(e?.response?.data?.message || e?.message || "Failed to confirm booking");
      } finally {
        setBookingLoading(false);
      }
      return;
    }

    setStep((s) => Math.min(4, s + 1));
  };

  const back = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div className="bg-[#f8fafa] w-full min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <StepsIndicator currentStep={step} />

        <div className="mt-6 sm:mt-8 flex justify-center">
          <div className="w-full max-w-4xl">
            {step === 1 && (
              <StepSelectService
                services={services}
                loading={servicesLoading}
                error={servicesErr}
                selectedService={selectedService}
                setSelectedService={setSelectedService}
              />
            )}

            {step === 2 && (
              <StepChooseDateTime
                selectedService={selectedService}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
              />
            )}

            {step === 3 && (
              <>
                <StepYourDetails form={form} setForm={setForm} />
                {bookingErr && <p className="mt-4 text-center text-red-600 text-sm">{bookingErr}</p>}
              </>
            )}

            {step === 4 && (
              <StepConfirmation
                selectedService={{
                  title: selectedService?.name,
                  price: selectedService?.price,
                }}
                selectedDate={{
                  label: selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "",
                }}
                selectedTime={selectedTime}
              />
            )}

            <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <WizardButton
                variant="ghost"
                text="Back"
                icon="left"
                onClick={back}
                disabled={step === 1 || bookingLoading}
                className="min-w-[120px]"
              />

              {step < 4 ? (
                <WizardButton
                  variant={step === 3 ? "success" : "primary"}
                  text={step === 3 ? (bookingLoading ? "Confirming..." : "Confirm Booking") : "Next"}
                  icon={step === 3 ? "check" : "right"}
                  onClick={next}
                  disabled={!canNext || (step === 1 && servicesLoading) || bookingLoading}
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
