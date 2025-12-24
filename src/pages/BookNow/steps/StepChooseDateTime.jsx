import React, { useEffect, useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";

import StepCard from "../components/StepCard";
import TimeSlot from "../components/TimeSlot";
import "../styles/daypicker.css";
import api from "../../../api/axios";

function normalizeSlots(data) {
  const raw = Array.isArray(data) ? data : data?.slots || [];

  if (raw.length > 0 && typeof raw[0] === "string") {
    return raw.map((time) => ({
      id: time,
      time: time,
      available: true,
    }));
  }

  if (raw.length > 0 && typeof raw[0] === "object" && raw[0] !== null) {
    return raw
      .map((steps) => ({
        id: steps.id || steps._id || steps.time,
        time: String(steps.time || ""),
        available: Boolean(steps.available),
      }))
      .filter((steps) => steps.time);
  }

  return [];
}

export default function StepChooseDateTime({
  selectedService,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
}) {
  const selectedLabel = selectedDate
    ? format(selectedDate, "EEEE, MMMM d, yyyy")
    : "";

  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;

    async function loadSlots() {
      if (!selectedService?._id || !selectedDate) {
        setSlots([]);
        setSelectedTime("");
        return;
      }

      try {
        setLoading(true);
        setErr("");

        const dateStr = format(selectedDate, "yyyy-MM-dd");
        const res = await api.get("/api/availability", {
          params: { serviceId: selectedService._id, date: dateStr },
        });

        const normalized = normalizeSlots(res.data);

        if (!alive) return;

        setSlots(normalized);

        if (
          selectedTime &&
          !normalized.some((s) => s.time === selectedTime && s.available)
        ) {
          setSelectedTime("");
        }
      } catch (e) {
        if (!alive) return;
        setErr(
          e?.response?.data?.message ||
          e?.message ||
          "Failed to load availability"
        );
        setSlots([]);
        setSelectedTime("");
      } finally {
        if (alive) setLoading(false);
      }
    }

    loadSlots();
    return () => {
      alive = false;
    };
  }, [selectedService?._id, selectedDate, selectedTime, setSelectedTime]);

  const morning = useMemo(() => {
    return slots.filter((s) => {
      const hour = Number(String(s.time || "").split(":")[0]);
      return Number.isFinite(hour) && hour < 12;
    });
  }, [slots]);

  const afternoon = useMemo(() => {
    return slots.filter((s) => {
      const hour = Number(String(s.time || "").split(":")[0]);
      return Number.isFinite(hour) && hour >= 12;
    });
  }, [slots]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
      <StepCard title="Select Date">
        <div className="rounded-2xl border border-[#e2e9e9] p-3 sm:p-4">
          <div className="calendar-wrapper">
            <DayPicker
              className="bookease-picker"
              mode="single"
              selected={selectedDate}
              onSelect={(d) => {
                setSelectedDate(d);
                setSelectedTime("");
              }}
              showOutsideDays
              navLayout="after"
            />
          </div>
        </div>
      </StepCard>

      <StepCard title="Select Time" subtitle={selectedLabel}>
        {!selectedService && (
          <p className="text-sm text-[#627884]">Please select a service first.</p>
        )}

        {selectedService && !selectedDate && (
          <p className="text-sm text-[#627884]">
            Please select a date to see available times.
          </p>
        )}

        {loading && (
          <p className="text-sm text-[#627884]">Loading available times...</p>
        )}
        {!loading && err && <p className="text-sm text-red-600">{err}</p>}

        {!loading && !err && selectedService && selectedDate && (
          <>
            <p className="text-sm font-semibold text-[#627884]">Morning</p>
            <div className="mt-3 flex flex-wrap gap-2 sm:gap-3">
              {morning.length ? (
                morning.map((slot) => (
                  <TimeSlot
                    key={slot.id || slot.time}
                    time={slot.time}
                    disabled={!slot.available}
                    selected={selectedTime === slot.time}
                    onClick={() => {
                      if (!slot.available) return;
                      setSelectedTime(slot.time);
                    }}
                  />
                ))
              ) : (
                <p className="text-xs text-[#627884]">No morning slots.</p>
              )}
            </div>

            <p className="mt-6 sm:mt-7 text-sm font-semibold text-[#627884]">
              Afternoon
            </p>
            <div className="mt-3 flex flex-wrap gap-2 sm:gap-3">
              {afternoon.length ? (
                afternoon.map((slot) => (
                  <TimeSlot
                    key={slot.id || slot.time}
                    time={slot.time}
                    disabled={!slot.available}
                    selected={selectedTime === slot.time}
                    onClick={() => {
                      if (!slot.available) return;
                      setSelectedTime(slot.time);
                    }}
                  />
                ))
              ) : (
                <p className="text-xs text-[#627884]">No afternoon slots.</p>
              )}
            </div>

            {slots.length === 0 && (
              <p className="mt-4 text-sm text-[#627884]">
                No available slots for this date.
              </p>
            )}
          </>
        )}
      </StepCard>
    </div>
  );
}
