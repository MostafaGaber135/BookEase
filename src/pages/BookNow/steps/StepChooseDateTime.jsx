import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";

import StepCard from "../components/StepCard";
import TimeSlot from "../components/TimeSlot";
import "../styles/daypicker.css";
import api from "../../../api/axios";
import { getToken } from "../../../utils/authToken";
import Loader from "../../../components/ui/Loader";

function normalizeSlots(data) {
  const raw = Array.isArray(data) ? data : data?.slots || [];

  if (raw.length > 0 && typeof raw[0] === "string") {
    return raw.map((time) => ({ id: time, time, available: true, heldByMe: false }));
  }

  if (raw.length > 0 && typeof raw[0] === "object" && raw[0] !== null) {
    return raw
      .map((s) => ({
        id: s.id || s._id || s.time,
        time: String(s.time || ""),
        available: Boolean(s.available),
        heldByMe: Boolean(s.heldByMe),
      }))
      .filter((s) => s.time);
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
  const selectedLabel = selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "";

  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const [isAuthed, setIsAuthed] = useState(!!getToken());

  useEffect(() => {
    const syncAuth = () => setIsAuthed(!!getToken());
    window.addEventListener("storage", syncAuth);
    window.addEventListener("auth:changed", syncAuth);
    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("auth:changed", syncAuth);
    };
  }, []);
  const lastHoldRef = useRef({ serviceId: null, date: null, time: null });

  const refreshSlots = useCallback(async (serviceId, dateStr) => {
    const res = await api.get("/api/availability", { params: { serviceId, date: dateStr } });
    setSlots(normalizeSlots(res.data));
  }, []);

  const releaseHold = useCallback(
    async (payload) => {
      if (!isAuthed) return;
      try {
        await api.delete("/api/availability/hold", { data: payload });
      } catch (e) {
        void e;
      }

    },
    [isAuthed]
  );

  const takeHold = useCallback(
    async (payload) => {
      if (!isAuthed) return;
      await api.post("/api/availability/hold", payload);
    },
    [isAuthed]
  );

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

        if (!alive) return;

        const normalized = normalizeSlots(res.data);
        setSlots(normalized);

        const stillOk =
          selectedTime &&
          normalized.some((s) => s.time === selectedTime && (s.available || s.heldByMe));

        if (selectedTime && !stillOk) setSelectedTime("");
      } catch (errObj) {
        if (!alive) return;
        setErr(errObj?.response?.data?.message || errObj?.message || "Failed to load availability");
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

  useEffect(() => {
    return () => {
      const last = lastHoldRef.current;
      if (last.serviceId && last.date && last.time) {
        releaseHold(last);
      }
    };
  }, [releaseHold]);

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

  const onPickTime = useCallback(
    async (slot) => {
      const allowed = slot.available || slot.heldByMe;
      if (!allowed) return;
      if (!selectedService?._id || !selectedDate) return;

      setErr("");

      const dateStr = format(selectedDate, "yyyy-MM-dd");
      const payload = { serviceId: selectedService._id, date: dateStr, time: slot.time };

      if (!isAuthed) {
        setSelectedTime(slot.time);
        return;
      }

      const last = lastHoldRef.current;

      try {
        if (last.serviceId && last.date && last.time) {
          const same =
            last.serviceId === payload.serviceId &&
            last.date === payload.date &&
            last.time === payload.time;

          if (!same) await releaseHold(last);
        }

        await takeHold(payload);

        lastHoldRef.current = payload;
        setSelectedTime(slot.time);

        await refreshSlots(selectedService._id, dateStr);
      } catch (errObj) {
        setSelectedTime("");
        setErr(errObj?.response?.data?.message || errObj?.message || "This slot is not available");
        try {
          await refreshSlots(selectedService._id, dateStr);
        } catch (e) {
          void e;
        }
      }
    },
    [
      isAuthed,
      refreshSlots,
      releaseHold,
      selectedDate,
      selectedService?._id,
      setSelectedTime,
      takeHold,
    ]
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
              onSelect={async (d) => {
                const last = lastHoldRef.current;
                if (last.serviceId && last.date && last.time) {
                  await releaseHold(last);
                  lastHoldRef.current = { serviceId: null, date: null, time: null };
                }
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
          <p className="text-sm text-[#627884]">Please select a date to see available times.</p>
        )}

        {loading && (
          <div className="py-2">
            <Loader />
          </div>
        )}
        {!loading && err && <p className="text-sm text-red-600">{err}</p>}

        {!loading && !err && selectedService && selectedDate && (
          <>
            <p className="text-sm font-semibold text-[#627884]">Morning</p>
            <div className="mt-3 flex flex-wrap gap-2 sm:gap-3">
              {morning.length ? (
                morning.map((slot) => {
                  const allowed = slot.available || slot.heldByMe;
                  return (
                    <TimeSlot
                      key={slot.id || slot.time}
                      time={slot.time}
                      disabled={!allowed}
                      selected={selectedTime === slot.time}
                      onClick={() => onPickTime(slot)}
                    />
                  );
                })
              ) : (
                <p className="text-xs text-[#627884]">No morning slots.</p>
              )}
            </div>

            <p className="mt-6 sm:mt-7 text-sm font-semibold text-[#627884]">Afternoon</p>
            <div className="mt-3 flex flex-wrap gap-2 sm:gap-3">
              {afternoon.length ? (
                afternoon.map((slot) => {
                  const allowed = slot.available || slot.heldByMe;
                  return (
                    <TimeSlot
                      key={slot.id || slot.time}
                      time={slot.time}
                      disabled={!allowed}
                      selected={selectedTime === slot.time}
                      onClick={() => onPickTime(slot)}
                    />
                  );
                })
              ) : (
                <p className="text-xs text-[#627884]">No afternoon slots.</p>
              )}
            </div>

            {slots.length === 0 && (
              <p className="mt-4 text-sm text-[#627884]">No available slots for this date.</p>
            )}
          </>
        )}
      </StepCard>
    </div>
  );
}
