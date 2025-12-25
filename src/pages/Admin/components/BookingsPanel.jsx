import React, { useMemo, useState } from "react";
import { format } from "date-fns";
import api from "../../../api/axios";
import Card from "./Card";
import Badge from "./Badge";
import IconButton from "./IconButton";

function formatDateTime(booking) {
  const iso = booking.startsAt || `${booking.date}T${booking.time}:00`;
  try {
    return format(new Date(iso), "MMM dd, yyyy");
  } catch {
    return booking.date || "";
  }
}

function formatTime(booking) {
  return booking.time || "";
}

function StatusBadge({ status }) {
  return <Badge variant={status}>{status}</Badge>;
}

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default function BookingsPanel({ loading, bookings, onRefresh }) {
  const [busyId, setBusyId] = useState("");

  const sorted = useMemo(() => {
    const copy = Array.isArray(bookings) ? [...bookings] : [];
    copy.sort(
      (a, b) =>
        new Date(b.startsAt || `${b.date}T${b.time}:00`).getTime() -
        new Date(a.startsAt || `${a.date}T${a.time}:00`).getTime()
    );
    return copy;
  }, [bookings]);

  async function updateStatus(id, status) {
    try {
      setBusyId(id);
      await api.patch(`/bookings/${id}/status`, { status });
      await onRefresh();
    } finally {
      setBusyId("");
    }
  }

  return (
    <Card title="Recent Bookings" subtitle="View and manage all customer bookings">
      {loading ? (
        <div className="rounded-2xl bg-gray-50 border border-gray-100 p-6 text-gray-600">Loading…</div>
      ) : null}

      {!loading && sorted.length === 0 ? (
        <div className="rounded-2xl bg-gray-50 border border-gray-100 p-6 text-gray-600">No bookings yet.</div>
      ) : null}

      {!loading && sorted.length > 0 ? (
        <>
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="py-3 font-medium">Customer</th>
                  <th className="py-3 font-medium">Service</th>
                  <th className="py-3 font-medium">Date &amp; Time</th>
                  <th className="py-3 font-medium">Status</th>
                  <th className="py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((b) => (
                  <tr key={b._id} className="border-t border-gray-100">
                    <td className="py-4">
                      <div className="font-medium text-gray-900">{b.customerName}</div>
                      <div className="text-gray-500">{b.customerEmail}</div>
                    </td>
                    <td className="py-4 text-gray-900">{b.serviceName || "—"}</td>
                    <td className="py-4 text-gray-900">
                      <div>{formatDateTime(b)}</div>
                      <div className="text-gray-500">{formatTime(b)}</div>
                    </td>
                    <td className="py-4">
                      <StatusBadge status={b.status} />
                    </td>
                    <td className="py-4">
                      <div className="flex items-center justify-end gap-2">
                        {b.status === "pending" ? (
                          <>
                            <IconButton title="Confirm" variant="success" disabled={busyId === b._id} onClick={() => updateStatus(b._id, "confirmed")}>
                              <CheckIcon />
                            </IconButton>
                            <IconButton title="Cancel" variant="danger" disabled={busyId === b._id} onClick={() => updateStatus(b._id, "cancelled")}>
                              <XIcon />
                            </IconButton>
                          </>
                        ) : null}

                        {b.status === "confirmed" ? (
                          <button
                            type="button"
                            disabled={busyId === b._id}
                            onClick={() => updateStatus(b._id, "completed")}
                            className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium bg-gray-50 hover:bg-gray-100 border border-gray-100 text-gray-900 transition disabled:opacity-60 disabled:cursor-not-allowed"
                          >
                            Complete
                          </button>
                        ) : null}

                        {b.status === "completed" ? <span className="text-gray-400">Done</span> : null}
                        {b.status === "cancelled" ? <span className="text-gray-400">—</span> : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-3">
            {sorted.map((b) => (
              <div key={b._id} className="rounded-2xl border border-gray-100 bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-semibold text-gray-900 truncate">{b.customerName}</div>
                    <div className="text-sm text-gray-500 truncate">{b.customerEmail}</div>
                  </div>
                  <StatusBadge status={b.status} />
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-gray-500">Service</div>
                    <div className="font-medium text-gray-900">{b.serviceName || "—"}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Date</div>
                    <div className="font-medium text-gray-900">{formatDateTime(b)}</div>
                    <div className="text-gray-500">{formatTime(b)}</div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-end gap-2">
                  {b.status === "pending" ? (
                    <>
                      <IconButton title="Confirm" variant="success" disabled={busyId === b._id} onClick={() => updateStatus(b._id, "confirmed")}>
                        <CheckIcon />
                      </IconButton>
                      <IconButton title="Cancel" variant="danger" disabled={busyId === b._id} onClick={() => updateStatus(b._id, "cancelled")}>
                        <XIcon />
                      </IconButton>
                    </>
                  ) : null}

                  {b.status === "confirmed" ? (
                    <button
                      type="button"
                      disabled={busyId === b._id}
                      onClick={() => updateStatus(b._id, "completed")}
                      className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium bg-gray-50 hover:bg-gray-100 border border-gray-100 text-gray-900 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      Complete
                    </button>
                  ) : null}

                  {b.status === "completed" ? <span className="text-gray-400">Done</span> : null}
                  {b.status === "cancelled" ? <span className="text-gray-400">—</span> : null}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </Card>
  );
}
