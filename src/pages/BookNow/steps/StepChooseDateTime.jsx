import React, { useMemo } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";

import StepCard from "../components/StepCard";
import TimeSlot from "../components/TimeSlot";
import "../styles/daypicker.css";

export default function StepChooseDateTime({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
}) {
  const selectedLabel = selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "";

  const morning = useMemo(
    () => [
      { t: "09:00", disabled: false },
      { t: "09:30", disabled: true },
      { t: "10:00", disabled: false },
      { t: "10:30", disabled: false },
      { t: "11:00", disabled: false },
      { t: "11:30", disabled: false },
    ],
    []
  );

  const afternoon = useMemo(
    () => [
      { t: "12:00", disabled: true },
      { t: "12:30", disabled: false },
      { t: "13:00", disabled: false },
      { t: "13:30", disabled: false },
      { t: "14:00", disabled: false },
      { t: "14:30", disabled: true },
      { t: "15:00", disabled: false },
      { t: "15:30", disabled: false },
      { t: "16:00", disabled: false },
      { t: "16:30", disabled: true },
    ],
    []
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
      <StepCard title="Select Date">
        <div className="rounded-2xl border border-[#e2e9e9] p-3 sm:p-4">
          <div className="calendar-wrapper">
            <DayPicker
              className="bookease-picker"
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              showOutsideDays
              navLayout="after"
            />
          </div>
        </div>
      </StepCard>

      <StepCard title="Select Time" subtitle={selectedLabel}>
        <p className="text-sm font-semibold text-[#627884]">Morning</p>

        <div className="mt-3 flex flex-wrap gap-2 sm:gap-3">
          {morning.map(({ t, disabled }) => (
            <TimeSlot
              key={t}
              time={t}
              disabled={!selectedDate || disabled}
              selected={selectedTime === t}
              onClick={() => setSelectedTime(t)}
            />
          ))}
        </div>

        <p className="mt-6 sm:mt-7 text-sm font-semibold text-[#627884]">Afternoon</p>

        <div className="mt-3 flex flex-wrap gap-2 sm:gap-3">
          {afternoon.map(({ t, disabled }) => (
            <TimeSlot
              key={t}
              time={t}
              disabled={!selectedDate || disabled}
              selected={selectedTime === t}
              onClick={() => setSelectedTime(t)}
            />
          ))}
        </div>
      </StepCard>
    </div>
  );
}
