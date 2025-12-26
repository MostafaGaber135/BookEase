import React, { useMemo, useState } from "react";
import api from "../../../api/axios";
import toast from "react-hot-toast";
import Card from "./Card";
import Badge from "./Badge";
import IconButton from "./IconButton";
import ServiceModal from "./ServiceModal";

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M8 6V4h8v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M10 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M12 20h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ServicesPanel({ loading, services, onRefresh }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [busyId, setBusyId] = useState("");

  const sorted = useMemo(() => {
    const copy = Array.isArray(services) ? [...services] : [];
    copy.sort(
      (a, b) =>
        (a.category || "").localeCompare(b.category || "") ||
        (a.name || "").localeCompare(b.name || "")
    );
    return copy;
  }, [services]);

  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (svc) => {
    setEditing(svc);
    setModalOpen(true);
  };

  const remove = async (id) => {
    if (!id) return;
    if (!confirm("Delete this service?")) return;

    try {
      setBusyId(id);
      await api.delete(`/services/${id}`);
      await onRefresh();
      toast.success("Service deleted");
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || "Failed to delete service";
      toast.error(msg);
    } finally {
      setBusyId("");
    }
  };

  return (
    <>
      <Card
        title="Manage Services"
        subtitle="Add, edit, or remove services"
        right={
          <button
            type="button"
            onClick={openAdd}
            className="cursor-pointer inline-flex items-center gap-2 rounded-2xl bg-[#2ec2b3] px-4 py-3 text-white font-semibold hover:opacity-90 transition"
          >
            <span className="text-xl leading-none">+</span>
            <span>Add Service</span>
          </button>
        }
      >
        {loading ? (
          <div className="rounded-2xl bg-gray-50 border border-gray-100 p-6 text-gray-600">Loading…</div>
        ) : null}

        {!loading && sorted.length === 0 ? (
          <div className="rounded-2xl bg-gray-50 border border-gray-100 p-6 text-gray-600">No services yet.</div>
        ) : null}

        {!loading && sorted.length > 0 ? (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="py-3 font-medium">Service</th>
                    <th className="py-3 font-medium">Category</th>
                    <th className="py-3 font-medium">Duration</th>
                    <th className="py-3 font-medium">Price</th>
                    <th className="py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((s) => (
                    <tr key={s._id} className="border-t border-gray-100">
                      <td className="py-4">
                        <div className="font-medium text-gray-900">{s.name}</div>
                        {s.description ? <div className="text-gray-500">{s.description}</div> : null}
                      </td>
                      <td className="py-4">
                        <Badge>{s.category || "General"}</Badge>
                      </td>
                      <td className="py-4 text-gray-900">{(s.durationMinutes ?? s.duration) || 0} min</td>
                      <td className="py-4 text-[#2ec2b3] font-semibold">${s.price}</td>
                      <td className="py-4">
                        <div className="flex items-center justify-end gap-2">
                          <IconButton title="Edit" variant="subtle" onClick={() => openEdit(s)}>
                            <PencilIcon />
                          </IconButton>
                          <IconButton title="Delete" variant="danger" disabled={busyId === s._id} onClick={() => remove(s._id)}>
                            <TrashIcon />
                          </IconButton>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-3">
              {sorted.map((s) => (
                <div key={s._id} className="rounded-2xl border border-gray-100 bg-white p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-semibold text-gray-900">{s.name}</div>
                      {s.description ? <div className="text-sm text-gray-500">{s.description}</div> : null}
                    </div>
                    <div className="flex gap-2">
                      <IconButton title="Edit" variant="subtle" onClick={() => openEdit(s)}>
                        <PencilIcon />
                      </IconButton>
                      <IconButton title="Delete" variant="danger" disabled={busyId === s._id} onClick={() => remove(s._id)}>
                        <TrashIcon />
                      </IconButton>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
                    <div>
                      <div className="text-gray-500">Category</div>
                      <div className="mt-1"><Badge>{s.category || "General"}</Badge></div>
                    </div>
                    <div>
                      <div className="text-gray-500">Duration</div>
                      <div className="font-medium text-gray-900">{(s.durationMinutes ?? s.duration) || 0} min</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Price</div>
                      <div className="font-semibold text-[#2ec2b3]">${s.price}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </Card>

      <ServiceModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initial={editing}
        onSaved={async () => {
          setModalOpen(false);
          await onRefresh();
        }}
      />
    </>
  );
}
